// ============================================================
// TAAKAA-XI v6.0 – Cloudflare Worker (نسخه نهایی با UI حرفه‌ای)
// ============================================================
// آدرس پنل: YOUR_WORKER.workers.dev/TaaKaa
// ============================================================

// ===== هدرهای CORS =====
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400'
};

// ===== توابع کمکی =====
function generateUUID() {
  try {
    return crypto.randomUUID();
  } catch (e) {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

function base64Encode(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  let binary = '';
  for (let i = 0; i < data.length; i++) {
    binary += String.fromCharCode(data[i]);
  }
  return btoa(binary);
}

function validateUserId(userId) {
  return /^[a-zA-Z0-9_-]+$/.test(userId);
}

function checkAdminAuth(request, adminPass) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;
  const token = authHeader.replace(/^Bearer\s+/i, '');
  return token === adminPass;
}

function createCorsResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS
    }
  });
}

// ===== کلاس مدیریت کاربران =====
class UserManager {
  constructor(kv, db, ctx) {
    this.kv = kv;
    this.db = db;
    this.ctx = ctx;
  }

  async getUsers() {
    try {
      const data = await this.kv.get('users', 'json');
      return data || {};
    } catch (e) {
      console.error('Error reading users:', e);
      return {};
    }
  }

  async saveUsers(users) {
    try {
      await this.kv.put('users', JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users:', e);
    }
  }

  async createUser(userId, expiryDays, trafficGB) {
    if (!validateUserId(userId)) {
      return { success: false, error: 'UserId نامعتبر است' };
    }

    if (isNaN(expiryDays) || expiryDays < 1) expiryDays = 30;
    if (isNaN(trafficGB) || trafficGB < 1) trafficGB = 10;

    const users = await this.getUsers();
    if (users[userId]) {
      return { success: false, error: 'کاربر قبلاً وجود دارد' };
    }

    const uuid = generateUUID();
    const expiryDate = new Date(Date.now() + expiryDays * 86400000).toISOString();
    const trafficLimit = (trafficGB || 10) * 2500;
    const createdAt = new Date().toISOString();

    users[userId] = {
      uuid: uuid,
      expiryDate: expiryDate,
      trafficLimit: trafficLimit,
      trafficUsed: 0,
      createdAt: createdAt,
      isActive: true,
      devices: [],
      ipHistory: []
    };

    await this.saveUsers(users);
    
    if (this.ctx) {
      this.ctx.waitUntil(
        this.db.prepare(`
          INSERT INTO users (id, uuid, expiry_date, traffic_limit, created_at)
          VALUES (?, ?, ?, ?, ?)
        `).bind(userId, uuid, expiryDate, trafficLimit, createdAt).run()
      );
    }

    return { success: true, user: users[userId] };
  }

  async getUser(userId) {
    const users = await this.getUsers();
    return users[userId] || null;
  }

  async deleteUser(userId) {
    const users = await this.getUsers();
    if (!users[userId]) {
      return { success: false, error: 'کاربر یافت نشد' };
    }
    delete users[userId];
    await this.saveUsers(users);
    
    if (this.ctx) {
      this.ctx.waitUntil(
        this.db.prepare('DELETE FROM users WHERE id = ?').bind(userId).run()
      );
    }
    return { success: true };
  }

  async checkUserValidity(userId) {
    const user = await this.getUser(userId);
    if (!user) return { valid: false, reason: 'کاربر یافت نشد' };
    
    const now = new Date();
    const expiry = new Date(user.expiryDate);
    
    if (now > expiry) {
      user.isActive = false;
      const users = await this.getUsers();
      users[userId] = user;
      await this.saveUsers(users);
      return { valid: false, reason: 'مدت زمان اعتبار به پایان رسیده است' };
    }
    
    if (user.trafficUsed >= user.trafficLimit) {
      user.isActive = false;
      const users = await this.getUsers();
      users[userId] = user;
      await this.saveUsers(users);
      return { valid: false, reason: 'محدودیت حجم مصرف شده است' };
    }
    
    return { valid: true };
  }

  async recordUsage(userId, bytes) {
    if (!userId || typeof bytes !== 'number' || bytes <= 0) return;
    
    const users = await this.getUsers();
    if (!users[userId]) return;
    
    const requestCount = Math.ceil(bytes / 1024);
    users[userId].trafficUsed += requestCount;
    
    if (users[userId].trafficUsed >= users[userId].trafficLimit) {
      users[userId].isActive = false;
    }
    
    await this.saveUsers(users);
    
    if (this.ctx) {
      this.ctx.waitUntil(
        this.db.prepare(`
          INSERT INTO usage_logs (user_id, bytes, requests, timestamp)
          VALUES (?, ?, ?, ?)
        `).bind(userId, bytes, requestCount, new Date().toISOString()).run()
      );
    }
  }
}

// ===== کلاس کانفیگ‌سازی =====
class ConfigGenerator {
  constructor(env) {
    this.env = env;
  }

  getFlag(country) {
    const flags = {
      'US': '🇺🇸', 'DE': '🇩🇪', 'UK': '🇬🇧', 'FR': '🇫🇷',
      'CA': '🇨🇦', 'JP': '🇯🇵', 'SG': '🇸🇬', 'AU': '🇦🇺',
      'IR': '🇮🇷', 'RU': '🇷🇺', 'NL': '🇳🇱', 'IT': '🇮🇹',
      'ES': '🇪🇸', 'BR': '🇧🇷', 'IN': '🇮🇳', 'AE': '🇦🇪',
      'TR': '🇹🇷', 'default': '🌍'
    };
    return flags[country] || flags.default;
  }

  generateVLESS(userId, userData) {
    const uuid = userData.uuid || this.env.UUID;
    const country = userData.country || 'DE';
    const flag = this.getFlag(country);
    
    return {
      type: 'vless',
      uuid: uuid,
      address: this.env.PROXYIP,
      port: 443,
      encryption: 'none',
      flow: 'xtls-rprx-vision',
      network: 'tcp',
      security: 'tls',
      sni: this.env.PROXYIP,
      expiry: userData.expiryDate,
      userId: userId,
      country: country,
      flag: flag,
      fragment: this.env.ENABLE_FRAGMENT ? '2-5' : 'off',
      ech: this.env.ENABLE_ECH ? 'true' : 'false',
      warp: this.env.ENABLE_WARP ? 'true' : 'false'
    };
  }

  generateTrojan(userId, userData) {
    const country = userData.country || 'US';
    const flag = this.getFlag(country);
    
    return {
      type: 'trojan',
      password: userData.uuid || this.env.TR_PASS,
      address: this.env.PROXYIP,
      port: 443,
      sni: this.env.PROXYIP,
      security: 'tls',
      expiry: userData.expiryDate,
      userId: userId,
      country: country,
      flag: flag,
      fragment: this.env.ENABLE_FRAGMENT ? '3-7' : 'off',
      ech: this.env.ENABLE_ECH ? 'true' : 'false'
    };
  }

  generateVMess(userId, userData) {
    const uuid = userData.uuid || this.env.UUID;
    const country = userData.country || 'SG';
    const flag = this.getFlag(country);
    
    const vmessObj = {
      v: '2',
      ps: 'TAAKAA-' + userId + ' ' + flag + ' ' + country,
      add: this.env.PROXYIP,
      port: 443,
      id: uuid,
      aid: '0',
      net: 'tcp',
      type: 'none',
      host: this.env.PROXYIP,
      path: '/',
      tls: 'tls',
      sni: this.env.PROXYIP,
      fp: 'chrome'
    };
    
    const base64Str = base64Encode(JSON.stringify(vmessObj));
    const link = 'vmess://' + base64Str;
    
    return {
      type: 'vmess',
      link: link,
      expiry: userData.expiryDate,
      country: country,
      flag: flag
    };
  }

  generateShareLinks(userId, userData) {
    const links = [];
    const country = userData.country || 'DE';
    const flag = this.getFlag(country);
    
    if (this.env.ENABLE_VLESS) {
      const vless = this.generateVLESS(userId, userData);
      const link = 'vless://' + vless.uuid + '@' + vless.address + ':' + vless.port + '?encryption=' + vless.encryption + '&flow=' + vless.flow + '&security=' + vless.security + '&sni=' + vless.sni + '&fp=chrome&type=' + vless.network + '&path=/&fragment=' + vless.fragment + '&ech=' + vless.ech + '&warp=' + vless.warp + '#' + encodeURIComponent('TAAKAA-' + userId + ' ' + flag + ' ' + country);
      links.push({ type: 'vless', link: link, expiry: vless.expiry, country: country, flag: flag });
    }
    
    if (this.env.ENABLE_TROJAN) {
      const trojan = this.generateTrojan(userId, userData);
      const link = 'trojan://' + trojan.password + '@' + trojan.address + ':' + trojan.port + '?sni=' + trojan.sni + '&security=' + trojan.security + '&fragment=' + trojan.fragment + '&ech=' + trojan.ech + '#' + encodeURIComponent('TAAKAA-' + userId + ' ' + flag + ' ' + country);
      links.push({ type: 'trojan', link: link, expiry: trojan.expiry, country: country, flag: flag });
    }
    
    if (this.env.ENABLE_VMESS) {
      const vmess = this.generateVMess(userId, userData);
      links.push({ type: 'vmess', link: vmess.link, expiry: vmess.expiry, country: country, flag: flag });
    }
    
    return links;
  }

  generateFullConfig(userId, userData) {
    const links = this.generateShareLinks(userId, userData);
    const expiry = userData.expiryDate;
    const trafficLimit = userData.trafficLimit;
    const trafficUsed = userData.trafficUsed || 0;
    const trafficRemaining = trafficLimit - trafficUsed;
    
    return {
      userId: userId,
      expiry: expiry,
      trafficLimit: trafficLimit,
      trafficUsed: trafficUsed,
      trafficRemaining: trafficRemaining,
      trafficLimitGB: Math.round(trafficLimit / 2500 * 100) / 100,
      trafficUsedGB: Math.round(trafficUsed / 2500 * 100) / 100,
      trafficRemainingGB: Math.round(trafficRemaining / 2500 * 100) / 100,
      expiryDate: new Date(expiry).toLocaleDateString('fa-IR'),
      links: links,
      isActive: trafficRemaining > 0 && new Date(expiry) > new Date()
    };
  }
}

// ===== HTML پنل (UI شبیه NOVA-Proxy) =====
const HTML_PANEL = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>TAAKAA | پنل مدیریت پیشرفته</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    :root {
      --primary: #6C3CE1;
      --primary-dark: #5A2DBF;
      --primary-light: #8B6CE6;
      --secondary: #00D4FF;
      --accent: #FF6B6B;
      --success: #00FF88;
      --warning: #FFB800;
      --bg-dark: #0A0A12;
      --bg-card: rgba(255, 255, 255, 0.03);
      --text-primary: #FFFFFF;
      --text-secondary: rgba(255, 255, 255, 0.7);
      --text-muted: rgba(255, 255, 255, 0.4);
      --border-color: rgba(255, 255, 255, 0.06);
      --shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg-dark);
      color: var(--text-primary);
      min-height: 100vh;
      overflow-x: hidden;
      background-image: 
        radial-gradient(ellipse at 20% 50%, rgba(108, 60, 225, 0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 60%);
    }

    /* ===== اسکرول ===== */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.02);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--primary);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--primary-light);
    }

    /* ===== انیمیشن‌ها ===== */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(108, 60, 225, 0.2); }
      50% { box-shadow: 0 0 40px rgba(108, 60, 225, 0.4); }
    }

    .fade-in {
      animation: fadeIn 0.6s ease forwards;
    }

    /* ===== کانتینر اصلی ===== */
    .app-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }

    /* ===== صفحه لاگین ===== */
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .login-box {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 24px;
      padding: 48px 40px;
      max-width: 420px;
      width: 100%;
      box-shadow: var(--shadow);
      animation: fadeIn 0.8s ease;
    }

    .login-box .logo-icon {
      text-align: center;
      margin-bottom: 32px;
    }

    .login-box .logo-icon .icon {
      font-size: 48px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .login-box .logo-icon h1 {
      font-size: 28px;
      font-weight: 800;
      margin-top: 8px;
      background: linear-gradient(135deg, #fff 30%, var(--primary-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .login-box .logo-icon p {
      color: var(--text-secondary);
      font-size: 14px;
      margin-top: 4px;
    }

    .login-box .input-group {
      margin-bottom: 16px;
    }

    .login-box .input-group label {
      display: block;
      color: var(--text-secondary);
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 6px;
    }

    .login-box .input-group input {
      width: 100%;
      padding: 14px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      color: #fff;
      font-size: 15px;
      transition: all 0.3s;
    }

    .login-box .input-group input:focus {
      border-color: var(--primary);
      outline: none;
      box-shadow: 0 0 0 4px rgba(108, 60, 225, 0.15);
    }

    .login-box .input-group input::placeholder {
      color: var(--text-muted);
    }

    .login-box .btn-login {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      border: none;
      border-radius: 12px;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      margin-top: 8px;
    }

    .login-box .btn-login:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(108, 60, 225, 0.3);
    }

    .login-box .btn-login:active {
      transform: scale(0.98);
    }

    .login-box .error-msg {
      color: var(--accent);
      text-align: center;
      margin-top: 12px;
      font-size: 14px;
      display: none;
    }

    .login-box .footer-text {
      text-align: center;
      color: var(--text-muted);
      font-size: 12px;
      margin-top: 24px;
    }

    /* ===== هدر ===== */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      margin-bottom: 24px;
      backdrop-filter: blur(10px);
    }

    .header .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .header .brand .logo {
      font-size: 28px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 900;
    }

    .header .brand .badge {
      background: rgba(108, 60, 225, 0.2);
      color: var(--primary-light);
      padding: 2px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      border: 1px solid rgba(108, 60, 225, 0.2);
    }

    .header .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .header .user-info .online-dot {
      width: 8px;
      height: 8px;
      background: var(--success);
      border-radius: 50%;
      display: inline-block;
      animation: pulse 2s infinite;
    }

    .header .user-info .btn-logout {
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 13px;
      transition: all 0.3s;
    }

    .header .user-info .btn-logout:hover {
      background: rgba(255, 107, 107, 0.15);
      border-color: var(--accent);
      color: var(--accent);
    }

    /* ===== استتس بار ===== */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      padding: 20px 24px;
      transition: all 0.3s;
    }

    .stat-card:hover {
      border-color: rgba(108, 60, 225, 0.2);
      transform: translateY(-2px);
    }

    .stat-card .stat-label {
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-card .stat-value {
      font-size: 28px;
      font-weight: 700;
      margin-top: 4px;
    }

    .stat-card .stat-value.gradient-text {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* ===== گرید اصلی ===== */
    .main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    @media (max-width: 992px) {
      .main-grid {
        grid-template-columns: 1fr;
      }
    }

    /* ===== کارت‌ها ===== */
    .card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      padding: 24px;
      transition: all 0.3s;
    }

    .card:hover {
      border-color: rgba(108, 60, 225, 0.15);
    }

    .card .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .card .card-header .icon {
      width: 40px;
      height: 40px;
      background: rgba(108, 60, 225, 0.15);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: var(--primary-light);
    }

    .card .card-header h3 {
      font-size: 16px;
      font-weight: 600;
    }

    .card .card-header .sub {
      color: var(--text-muted);
      font-size: 13px;
      font-weight: 400;
    }

    /* ===== فرم ===== */
    .form-group {
      margin-bottom: 14px;
    }

    .form-group label {
      display: block;
      color: var(--text-secondary);
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 12px 14px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      color: #fff;
      font-size: 14px;
      transition: all 0.3s;
    }

    .form-group input:focus,
    .form-group select:focus {
      border-color: var(--primary);
      outline: none;
      box-shadow: 0 0 0 4px rgba(108, 60, 225, 0.1);
    }

    .form-group input::placeholder {
      color: var(--text-muted);
    }

    .form-group select option {
      background: #1a1a2e;
    }

    /* ===== دکمه‌ها ===== */
    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      width: 100%;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: #fff;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(108, 60, 225, 0.3);
    }

    .btn-success {
      background: linear-gradient(135deg, #00C853, #00E676);
      color: #fff;
    }

    .btn-success:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 200, 83, 0.3);
    }

    .btn-danger {
      background: linear-gradient(135deg, #D32F2F, #F44336);
      color: #fff;
    }

    .btn-danger:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(211, 47, 47, 0.3);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-secondary);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .btn-sm {
      padding: 6px 14px;
      font-size: 12px;
      width: auto;
    }

    /* ===== لینک‌های کانفیگ ===== */
    .config-link {
      background: rgba(0, 0, 0, 0.3);
      padding: 12px 16px;
      border-radius: 10px;
      margin: 6px 0;
      border: 1px solid rgba(255, 255, 255, 0.05);
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 12px;
      word-break: break-all;
      color: var(--success);
      position: relative;
    }

    .config-link .link-type {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      margin-right: 8px;
    }

    .config-link .link-type.vless {
      background: rgba(0, 255, 136, 0.15);
      color: #00ff88;
    }
    .config-link .link-type.trojan {
      background: rgba(255, 107, 107, 0.15);
      color: #ff6b6b;
    }
    .config-link .link-type.vmess {
      background: rgba(255, 184, 0, 0.15);
      color: #ffb800;
    }

    .config-link .copy-btn {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.05);
      border: none;
      border-radius: 6px;
      padding: 4px 12px;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 11px;
      transition: all 0.2s;
    }

    .config-link .copy-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }

    /* ===== لیست کاربران ===== */
    .user-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .user-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      margin-bottom: 6px;
      border: 1px solid rgba(255, 255, 255, 0.03);
      transition: all 0.2s;
    }

    .user-item:hover {
      background: rgba(0, 0, 0, 0.4);
    }

    .user-item .user-id {
      font-weight: 500;
      font-size: 14px;
    }

    .user-item .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .user-item .user-info span {
      font-size: 12px;
      color: var(--text-secondary);
    }

    .badge-status {
      padding: 2px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
    }

    .badge-status.active {
      background: rgba(0, 255, 136, 0.15);
      color: #00ff88;
    }
    .badge-status.expired {
      background: rgba(255, 68, 68, 0.15);
      color: #ff4444;
    }
    .badge-status.finished {
      background: rgba(255, 184, 0, 0.15);
      color: #ffb800;
    }

    /* ===== استتس پیام ===== */
    .status-msg {
      padding: 12px 16px;
      border-radius: 10px;
      margin-top: 12px;
      font-size: 14px;
      display: none;
    }

    .status-msg.success {
      display: block;
      background: rgba(0, 255, 136, 0.08);
      border: 1px solid rgba(0, 255, 136, 0.15);
      color: #00ff88;
    }

    .status-msg.error {
      display: block;
      background: rgba(255, 68, 68, 0.08);
      border: 1px solid rgba(255, 68, 68, 0.15);
      color: #ff4444;
    }

    .status-msg.info {
      display: block;
      background: rgba(255, 184, 0, 0.08);
      border: 1px solid rgba(255, 184, 0, 0.15);
      color: #ffb800;
    }

    /* ===== اطلاعات کاربر ===== */
    .user-info-display {
      display: none;
    }

    .user-info-display.show {
      display: block;
    }

    /* ===== مشاوره ===== */
    .consultation-result {
      margin-top: 16px;
      display: none;
    }

    .consultation-result.show {
      display: block;
    }

    .consultation-result .rec-card {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      padding: 12px 16px;
      margin: 6px 0;
      border-right: 3px solid var(--primary);
    }

    .consultation-result .rec-card .label {
      color: var(--text-muted);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .consultation-result .rec-card .value {
      color: var(--success);
      font-weight: 600;
      font-size: 14px;
    }

    /* ===== ریسپانسیو ===== */
    @media (max-width: 768px) {
      .app-container {
        padding: 12px;
      }
      
      .header {
        flex-direction: column;
        gap: 12px;
        padding: 16px;
      }
      
      .header .brand .logo {
        font-size: 20px;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .stat-card .stat-value {
        font-size: 20px;
      }
      
      .login-box {
        padding: 32px 24px;
        margin: 16px;
      }
      
      .user-item {
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .config-link {
        font-size: 10px;
        padding: 10px 12px;
      }
      
      .config-link .copy-btn {
        position: static;
        transform: none;
        margin-top: 8px;
      }
    }

    @media (max-width: 480px) {
      .stats-grid {
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      
      .stat-card {
        padding: 14px 16px;
      }
      
      .stat-card .stat-value {
        font-size: 18px;
      }
    }
  </style>
</head>
<body>

<div id="loginSection" class="login-page">
  <div class="login-box">
    <div class="logo-icon">
      <div class="icon">⚡</div>
      <h1>TAAKAA</h1>
      <p>پنل مدیریت پیشرفته</p>
    </div>
    <div class="input-group">
      <label>🔑 رمز عبور</label>
      <input type="password" id="loginPass" placeholder="رمز خود را وارد کنید..." onkeydown="if(event.key==='Enter') login()">
    </div>
    <button class="btn-login" onclick="login()">
      <i class="fas fa-arrow-left"></i> ورود به پنل
    </button>
    <div class="error-msg" id="loginError">❌ رمز عبور اشتباه است!</div>
    <div class="footer-text">TAAKAA · مدیریت کانفیگ</div>
  </div>
</div>

<div id="adminPanel" style="display:none;">
  <div class="app-container">
    <!-- هدر -->
    <div class="header fade-in">
      <div class="brand">
        <span class="logo">⚡ TAAKAA</span>
        <span class="badge">v6.0</span>
      </div>
      <div class="user-info">
        <span class="online-dot"></span>
        <span style="font-size:13px;color:var(--text-secondary);">مدیر</span>
        <button class="btn-logout" onclick="logout()">
          <i class="fas fa-sign-out-alt"></i> خروج
        </button>
      </div>
    </div>

    <!-- آمار -->
    <div class="stats-grid fade-in">
      <div class="stat-card">
        <div class="stat-label">👥 کل کاربران</div>
        <div class="stat-value gradient-text" id="statTotal">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">🟢 فعال</div>
        <div class="stat-value" style="color:var(--success);" id="statActive">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">📊 حجم باقی‌مانده</div>
        <div class="stat-value" style="color:var(--warning);" id="statTraffic">0 GB</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">🔗 کانفیگ‌های ساخته‌شده</div>
        <div class="stat-value" style="color:var(--secondary);" id="statConfigs">0</div>
      </div>
    </div>

    <!-- گرید اصلی -->
    <div class="main-grid fade-in">
      <!-- ساخت کانفیگ -->
      <div class="card">
        <div class="card-header">
          <div class="icon">⚡</div>
          <div>
            <h3>ساخت کانفیگ جدید</h3>
            <span class="sub">ایجاد لینک با تنظیمات دلخواه</span>
          </div>
        </div>
        <div class="form-group">
          <label>🆔 آیدی کاربر</label>
          <input type="text" id="userId" placeholder="مثال: 123456789">
        </div>
        <div class="form-group">
          <label>🌍 منطقه</label>
          <select id="countrySelect">
            <option value="DE">🇩🇪 آلمان</option>
            <option value="US">🇺🇸 آمریکا</option>
            <option value="UK">🇬🇧 انگلستان</option>
            <option value="FR">🇫🇷 فرانسه</option>
            <option value="CA">🇨🇦 کانادا</option>
            <option value="JP">🇯🇵 ژاپن</option>
            <option value="SG">🇸🇬 سنگاپور</option>
            <option value="AU">🇦🇺 استرالیا</option>
            <option value="NL">🇳🇱 هلند</option>
            <option value="IT">🇮🇹 ایتالیا</option>
            <option value="ES">🇪🇸 اسپانیا</option>
            <option value="BR">🇧🇷 برزیل</option>
            <option value="AE">🇦🇪 امارات</option>
            <option value="TR">🇹🇷 ترکیه</option>
          </select>
        </div>
        <div class="form-group">
          <label>📅 مدت اعتبار</label>
          <select id="expiryDays">
            <option value="7">۷ روز</option>
            <option value="15">۱۵ روز</option>
            <option value="30" selected>۳۰ روز</option>
            <option value="60">۶۰ روز</option>
            <option value="90">۹۰ روز</option>
          </select>
        </div>
        <div class="form-group">
          <label>📊 حجم (گیگابایت)</label>
          <select id="trafficGB">
            <option value="5">۵ GB</option>
            <option value="10" selected>۱۰ GB</option>
            <option value="20">۲۰ GB</option>
            <option value="50">۵۰ GB</option>
            <option value="100">۱۰۰ GB</option>
          </select>
        </div>
        <button class="btn btn-primary" onclick="generateConfig()">
          <i class="fas fa-bolt"></i> ساخت کانفیگ
        </button>
        <div id="statusMsg" class="status-msg"></div>
      </div>

      <!-- اطلاعات کاربر -->
      <div class="card">
        <div class="card-header">
          <div class="icon">📋</div>
          <div>
            <h3>اطلاعات کاربر</h3>
            <span class="sub">مشاهده جزئیات کانفیگ ساخته‌شده</span>
          </div>
        </div>
        <div id="userInfo" style="color:var(--text-muted); text-align:center; padding:30px 0; font-size:14px;">
          <i class="fas fa-inbox" style="font-size:32px; display:block; margin-bottom:12px; opacity:0.3;"></i>
          برای مشاهده اطلاعات، کانفیگ بسازید.
        </div>
      </div>
    </div>

    <!-- مشاوره -->
    <div class="card fade-in" style="margin-bottom:24px;">
      <div class="card-header">
        <div class="icon">📡</div>
        <div>
          <h3>مشاوره آفلاین</h3>
          <span class="sub">پیشنهاد بهترین کانفیگ بر اساس اپراتور شما</span>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr auto; gap:12px; align-items:end;">
        <div class="form-group" style="margin-bottom:0;">
          <label>📱 اپراتور</label>
          <select id="operatorSelect">
            <option value="">-- انتخاب کنید --</option>
            <option value="mobin-net">📶 مبین نت</option>
            <option value="rightel">📶 رایتل</option>
            <option value="irancell">📶 ایرانسل</option>
            <option value="shatel">📶 شاتل</option>
            <option value="mokhaberat">📶 مخابرات</option>
            <option value="hamrahe-aval">📶 همراه اول</option>
          </select>
        </div>
        <button class="btn btn-secondary" onclick="getConsultation()" style="width:auto; padding:12px 24px; white-space:nowrap;">
          <i class="fas fa-search"></i> دریافت
        </button>
      </div>
      <div class="consultation-result" id="consultationResult">
        <div id="consultationContent"></div>
      </div>
    </div>

    <!-- بخش مدیریت -->
    <div class="card fade-in">
      <div class="card-header">
        <div class="icon">🛠️</div>
        <div>
          <h3>مدیریت کاربران</h3>
          <span class="sub">افزودن، حذف و مشاهده کاربران</span>
        </div>
      </div>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
        <div>
          <div class="form-group">
            <label>🆔 آیدی کاربر جدید</label>
            <input type="text" id="newUserId" placeholder="123456789">
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div class="form-group">
              <label>📅 اعتبار (روز)</label>
              <input type="number" id="newExpiryDays" value="30">
            </div>
            <div class="form-group">
              <label>📊 حجم (GB)</label>
              <input type="number" id="newTrafficGB" value="10">
            </div>
          </div>
          <button class="btn btn-success" onclick="addUser()">
            <i class="fas fa-user-plus"></i> افزودن کاربر
          </button>
        </div>
        <div id="statsContent" style="color:var(--text-secondary); text-align:center; padding:20px 0;">
          <i class="fas fa-chart-pie" style="font-size:32px; display:block; margin-bottom:12px; opacity:0.3;"></i>
          در حال بارگذاری آمار...
        </div>
      </div>

      <div style="margin-top:16px;">
        <h4 style="font-size:14px; font-weight:600; margin-bottom:12px; color:var(--text-secondary);">
          <i class="fas fa-list"></i> لیست کاربران
        </h4>
        <div class="user-list" id="userList">
          <div style="color:var(--text-muted); text-align:center; padding:30px 0;">
            <i class="fas fa-spinner fa-spin" style="font-size:24px; display:block; margin-bottom:8px;"></i>
            در حال بارگذاری...
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// ===== تنظیمات =====
var ADMIN_PASS = 'Tentacion';

// ===== دیتابیس پیشنهادات =====
var OPERATOR_SUGGESTIONS = {
  'mobin-net': {
    name: 'مبین نت',
    flag: '📶',
    bestProtocol: 'VLESS + gRPC',
    bestFragment: '2-5',
    bestPort: '443',
    bestCountry: 'DE',
    description: 'مبین نت با VLESS و gRPC و Fragment 2-5 بهترین عملکرد را دارد.',
    configExample: 'vless://{uuid}@cdn.cloudflare.net:443?encryption=none&flow=xtls-rprx-vision&security=tls&sni=cdn.cloudflare.net&fp=chrome&type=grpc&serviceName=#TAAKAA'
  },
  'rightel': {
    name: 'رایتل',
    flag: '📶',
    bestProtocol: 'Trojan + WebSocket',
    bestFragment: '3-7',
    bestPort: '443',
    bestCountry: 'US',
    description: 'رایتل با Trojan و WebSocket و Fragment 3-7 بهترین پاسخ را میدهد.',
    configExample: 'trojan://{password}@cdn.cloudflare.net:443?sni=cdn.cloudflare.net&security=tls&type=ws&path=/&host=cdn.cloudflare.net#TAAKAA'
  },
  'irancell': {
    name: 'ایرانسل',
    flag: '📶',
    bestProtocol: 'VLESS + XTLS',
    bestFragment: '1-3',
    bestPort: '443',
    bestCountry: 'NL',
    description: 'ایرانسل با VLESS و XTLS و Fragment 1-3 بهترین عملکرد را دارد.',
    configExample: 'vless://{uuid}@cdn.cloudflare.net:443?encryption=none&flow=xtls-rprx-vision&security=tls&sni=cdn.cloudflare.net&fp=chrome&type=tcp#TAAKAA'
  },
  'shatel': {
    name: 'شاتل',
    flag: '📶',
    bestProtocol: 'VMess + WebSocket',
    bestFragment: '4-8',
    bestPort: '443',
    bestCountry: 'SG',
    description: 'شاتل با VMess و WebSocket و Fragment 4-8 بهترین پاسخ را میدهد.',
    configExample: 'vmess://...'
  },
  'mokhaberat': {
    name: 'مخابرات',
    flag: '📶',
    bestProtocol: 'Trojan + gRPC',
    bestFragment: '2-6',
    bestPort: '443',
    bestCountry: 'UK',
    description: 'مخابرات با Trojan و gRPC و Fragment 2-6 بهترین عملکرد را دارد.',
    configExample: 'trojan://{password}@cdn.cloudflare.net:443?sni=cdn.cloudflare.net&security=tls&type=grpc&serviceName=#TAAKAA'
  },
  'hamrahe-aval': {
    name: 'همراه اول',
    flag: '📶',
    bestProtocol: 'VLESS + WebSocket',
    bestFragment: '3-5',
    bestPort: '443',
    bestCountry: 'FR',
    description: 'همراه اول با VLESS و WebSocket و Fragment 3-5 بهترین پاسخ را دارد.',
    configExample: 'vless://{uuid}@cdn.cloudflare.net:443?encryption=none&flow=xtls-rprx-vision&security=tls&sni=cdn.cloudflare.net&fp=chrome&type=ws&path=/&host=cdn.cloudflare.net#TAAKAA'
  }
};

// ===== توابع =====
function showStatus(msg, type) {
  var div = document.getElementById('statusMsg');
  div.className = 'status-msg ' + type;
  div.textContent = msg;
  div.style.display = 'block';
  setTimeout(function() {
    div.className = 'status-msg';
    div.textContent = '';
    div.style.display = 'none';
  }, 6000);
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(function() {
    showStatus('✅ کپی شد!', 'success');
  }).catch(function() {
    showStatus('❌ خطا در کپی', 'error');
  });
}

// ===== لاگین =====
function login() {
  var pass = document.getElementById('loginPass').value;
  if (pass === ADMIN_PASS) {
    localStorage.setItem('adminToken', pass);
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('loginError').style.display = 'none';
    loadAdminData();
  } else {
    document.getElementById('loginError').style.display = 'block';
    document.getElementById('loginPass').value = '';
  }
}

function logout() {
  localStorage.removeItem('adminToken');
  document.getElementById('loginSection').style.display = 'flex';
  document.getElementById('adminPanel').style.display = 'none';
  document.getElementById('loginPass').value = '';
}

// ===== ساخت کانفیگ =====
async function generateConfig() {
  var userId = document.getElementById('userId').value.trim();
  var country = document.getElementById('countrySelect').value;
  var expiryDays = parseInt(document.getElementById('expiryDays').value);
  var trafficGB = parseInt(document.getElementById('trafficGB').value);

  if (!userId) {
    showStatus('❌ لطفاً آیدی کاربر را وارد کنید', 'error');
    return;
  }

  try {
    var res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId, country: country, expiryDays: expiryDays, trafficGB: trafficGB })
    });
    var data = await res.json();

    if (data.success) {
      showUserInfo(data.config);
      showStatus('✅ کانفیگ با موفقیت ساخته شد!', 'success');
      loadAdminData();
    } else {
      showStatus('❌ ' + data.error, 'error');
    }
  } catch (e) {
    showStatus('❌ خطا در ارتباط با سرور', 'error');
  }
}

function showUserInfo(config) {
  var div = document.getElementById('userInfo');
  var html = '';
  
  var statusText = config.isActive ? 'فعال' : 'غیرفعال';
  var flag = '🌍';
  var country = 'N/A';
  if (config.links && config.links.length > 0) {
    flag = config.links[0].flag || '🌍';
    country = config.links[0].country || 'N/A';
  }
  
  html += '<div style="padding:4px 0;">';
  html += '<div style="display:flex; align-items:center; gap:16px; margin-bottom:16px;">';
  html += '<span style="font-size:36px;">' + flag + '</span>';
  html += '<div><div style="font-size:20px; font-weight:700;">' + config.userId + '</div>';
  html += '<div style="display:flex; gap:8px; margin-top:4px; flex-wrap:wrap;">';
  html += '<span style="font-size:13px; color:var(--text-secondary);">' + country + '</span>';
  html += '<span class="badge-status ' + (config.isActive ? 'active' : 'expired') + '">' + statusText + '</span>';
  html += '</div></div></div>';
  
  html += '<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px;">';
  html += '<div style="background:rgba(0,0,0,0.2); padding:10px 14px; border-radius:10px;">';
  html += '<div style="color:var(--text-muted); font-size:10px; text-transform:uppercase;">📅 تاریخ انقضا</div>';
  html += '<div style="font-size:14px; font-weight:500;">' + config.expiryDate + '</div></div>';
  html += '<div style="background:rgba(0,0,0,0.2); padding:10px 14px; border-radius:10px;">';
  html += '<div style="color:var(--text-muted); font-size:10px; text-transform:uppercase;">📊 حجم مصرفی</div>';
  html += '<div style="font-size:14px; font-weight:500;">' + config.trafficUsedGB + ' / ' + config.trafficLimitGB + ' GB</div></div>';
  html += '<div style="background:rgba(0,0,0,0.2); padding:10px 14px; border-radius:10px; grid-column: span 2;">';
  html += '<div style="color:var(--text-muted); font-size:10px; text-transform:uppercase;">📊 حجم باقی‌مانده</div>';
  html += '<div style="color:var(--success); font-size:18px; font-weight:700;">' + config.trafficRemainingGB + ' GB</div></div></div>';
  
  html += '<hr style="border-color:rgba(255,255,255,0.05); margin:12px 0;">';
  html += '<div style="font-size:13px; color:var(--text-secondary); margin-bottom:10px;">🔗 لینک‌های کانفیگ:</div>';
  
  if (config.links) {
    for (var i = 0; i < config.links.length; i++) {
      var link = config.links[i];
      var typeClass = link.type;
      html += '<div class="config-link">';
      html += '<span class="link-type ' + typeClass + '">' + link.type + '</span>';
      html += '<span style="color:var(--text-secondary); font-size:11px;">' + link.flag + ' ' + link.country + '</span>';
      html += '<br><span style="font-size:11px; word-break:break-all;">' + link.link + '</span>';
      html += '<button class="copy-btn" onclick="copyText(\'' + link.link.replace(/'/g, "\\'") + '\')">📋 کپی</button>';
      html += '</div>';
    }
  }
  
  html += '</div>';
  div.innerHTML = html;
}

// ===== مشاوره =====
function getConsultation() {
  var operator = document.getElementById('operatorSelect').value;
  var resultDiv = document.getElementById('consultationResult');
  var contentDiv = document.getElementById('consultationContent');
  
  if (!operator) {
    showStatus('❌ لطفاً اپراتور خود را انتخاب کنید', 'error');
    return;
  }
  
  var data = OPERATOR_SUGGESTIONS[operator];
  if (!data) {
    showStatus('❌ اطلاعاتی برای این اپراتور یافت نشد', 'error');
    return;
  }
  
  resultDiv.classList.add('show');
  contentDiv.innerHTML = '';
  contentDiv.innerHTML += '<div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">';
  contentDiv.innerHTML += '<span style="font-size:28px;">' + data.flag + '</span>';
  contentDiv.innerHTML += '<div><h4 style="color:#fff; margin:0;">' + data.name + '</h4>';
  contentDiv.innerHTML += '<span style="color:var(--text-muted); font-size:12px;">پیشنهاد ویژه</span></div></div>';
  contentDiv.innerHTML += '<div class="rec-card"><div class="label">🔹 بهترین پروتکل</div><div class="value">' + data.bestProtocol + '</div></div>';
  contentDiv.innerHTML += '<div class="rec-card"><div class="label">🔹 بهترین Fragment</div><div class="value">' + data.bestFragment + '</div></div>';
  contentDiv.innerHTML += '<div class="rec-card"><div class="label">🔹 بهترین پورت</div><div class="value">' + data.bestPort + '</div></div>';
  contentDiv.innerHTML += '<div class="rec-card"><div class="label">🌍 بهترین منطقه</div><div class="value">' + data.bestCountry + '</div></div>';
  contentDiv.innerHTML += '<p style="color:var(--text-secondary); font-size:13px; margin:12px 0;">📝 ' + data.description + '</p>';
  contentDiv.innerHTML += '<div style="background:rgba(0,0,0,0.3); border-radius:8px; padding:12px; border:1px solid rgba(255,255,255,0.05);">';
  contentDiv.innerHTML += '<p style="color:var(--text-muted); font-size:10px; margin-bottom:4px;">📋 نمونه کانفیگ:</p>';
  contentDiv.innerHTML += '<code style="color:var(--success); font-size:11px; word-break:break-all;">' + data.configExample + '</code></div>';
  contentDiv.innerHTML += '<button class="btn btn-secondary" onclick="copyText(\'' + data.configExample.replace(/'/g, "\\'") + '\')" style="margin-top:10px; width:auto; padding:6px 16px; font-size:12px;">📋 کپی کانفیگ</button>';
}

// ===== مدیریت کاربران =====
async function loadAdminData() {
  try {
    var token = localStorage.getItem('adminToken') || '';
    var res = await fetch('/api/admin/users', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    var data = await res.json();
    if (data.success) {
      renderUserList(data.users);
      renderStats(data.users);
    }
  } catch (e) {
    console.error(e);
  }
}

function renderUserList(users) {
  var div = document.getElementById('userList');
  if (!users || Object.keys(users).length === 0) {
    div.innerHTML = '<div style="color:var(--text-muted); text-align:center; padding:30px 0;">هیچ کاربری ثبت نشده است</div>';
    return;
  }
  
  var html = '';
  var count = 0;
  for (var id in users) {
    count++;
    var user = users[id];
    var isActive = user.isActive && new Date(user.expiryDate) > new Date() && user.trafficUsed < user.trafficLimit;
    var statusClass = isActive ? 'active' : (new Date(user.expiryDate) <= new Date() ? 'expired' : 'finished');
    var statusText = isActive ? 'فعال' : (new Date(user.expiryDate) <= new Date() ? 'منقضی' : 'تمام‌شده');
    
    html += '<div class="user-item">';
    html += '<span class="user-id">🆔 ' + id + '</span>';
    html += '<div class="user-info">';
    html += '<span>📅 ' + new Date(user.expiryDate).toLocaleDateString('fa-IR') + '</span>';
    html += '<span>📊 ' + (Math.round(user.trafficUsed / 2500 * 100) / 100) + ' / ' + (Math.round(user.trafficLimit / 2500 * 100) / 100) + ' GB</span>';
    html += '<span class="badge-status ' + statusClass + '">' + statusText + '</span>';
    html += '<button class="btn btn-danger btn-sm" onclick="deleteUser(\'' + id + '\')"><i class="fas fa-trash"></i></button>';
    html += '</div></div>';
  }
  div.innerHTML = html;
  document.getElementById('statConfigs').textContent = count;
}

function renderStats(users) {
  var div = document.getElementById('statsContent');
  var totalUsers = Object.keys(users).length;
  var activeUsers = 0;
  var totalTraffic = 0;
  
  for (var id in users) {
    var u = users[id];
    if (u.isActive && new Date(u.expiryDate) > new Date() && u.trafficUsed < u.trafficLimit) {
      activeUsers++;
    }
    totalTraffic += (u.trafficLimit - u.trafficUsed);
  }
  
  document.getElementById('statTotal').textContent = totalUsers;
  document.getElementById('statActive').textContent = activeUsers;
  document.getElementById('statTraffic').textContent = (Math.round(totalTraffic / 2500 * 100) / 100) + ' GB';
  
  div.innerHTML = '';
}

async function deleteUser(userId) {
  if (!confirm('آیا از حذف کاربر ' + userId + ' مطمئن هستید؟')) return;
  
  try {
    var token = localStorage.getItem('adminToken') || '';
    var res = await fetch('/api/admin/delete', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ userId: userId })
    });
    var data = await res.json();
    if (data.success) {
      showStatus('✅ کاربر با موفقیت حذف شد', 'success');
      loadAdminData();
    } else {
      showStatus('❌ ' + data.error, 'error');
    }
  } catch (e) {
    showStatus('❌ خطا در ارتباط با سرور', 'error');
  }
}

async function addUser() {
  var userId = document.getElementById('newUserId').value.trim();
  var expiryDays = parseInt(document.getElementById('newExpiryDays').value);
  var trafficGB = parseInt(document.getElementById('newTrafficGB').value);

  if (!userId) {
    showStatus('❌ لطفاً آیدی کاربر را وارد کنید', 'error');
    return;
  }

  try {
    var token = localStorage.getItem('adminToken') || '';
    var res = await fetch('/api/admin/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ userId: userId, expiryDays: expiryDays, trafficGB: trafficGB })
    });
    var data = await res.json();
    if (data.success) {
      showStatus('✅ کاربر با موفقیت اضافه شد!', 'success');
      loadAdminData();
      document.getElementById('newUserId').value = '';
    } else {
      showStatus('❌ ' + data.error, 'error');
    }
  } catch (e) {
    showStatus('❌ خطا در ارتباط با سرور', 'error');
  }
}

// ===== بارگذاری اولیه =====
document.addEventListener('DOMContentLoaded', function() {
  var token = localStorage.getItem('adminToken');
  if (token === ADMIN_PASS) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    loadAdminData();
  }
});
</script>
</body>
</html>`;

// ===== Worker اصلی =====
export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;

      if (!env.KV) {
        return new Response(JSON.stri
