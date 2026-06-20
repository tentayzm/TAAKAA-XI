// ============================================================
// TAAKAA-XI v3.0 – Cloudflare Worker
// ============================================================

// ===== کلاس مدیریت کاربران =====
class UserManager {
  constructor(kv, db) {
    this.kv = kv;
    this.db = db;
  }

  async getUsers() {
    const data = await this.kv.get('users', 'json');
    return data || {};
  }

  async saveUsers(users) {
    await this.kv.put('users', JSON.stringify(users));
  }

  async createUser(userId, expiryDays, trafficGB) {
    const users = await this.getUsers();
    if (users[userId]) {
      return { success: false, error: 'کاربر قبلاً وجود دارد' };
    }

    const uuid = crypto.randomUUID();
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
    await this.db.prepare(`
      INSERT INTO users (id, uuid, expiry_date, traffic_limit, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).bind(userId, uuid, expiryDate, trafficLimit, createdAt).run();

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
    await this.db.prepare('DELETE FROM users WHERE id = ?').bind(userId).run();
    return { success: true };
  }

  async checkUserValidity(userId) {
    const user = await this.getUser(userId);
    if (!user) return { valid: false, reason: 'کاربر یافت نشد' };
    if (!user.isActive) {
      return { valid: false, reason: 'کاربر غیرفعال شده است' };
    }
    const now = new Date();
    const expiry = new Date(user.expiryDate);
    if (now > expiry) {
      return { valid: false, reason: 'مدت زمان اعتبار به پایان رسیده است' };
    }
    if (user.trafficUsed >= user.trafficLimit) {
      return { valid: false, reason: 'محدودیت حجم مصرف شده است' };
    }
    return { valid: true };
  }

  async recordUsage(userId, bytes) {
    const users = await this.getUsers();
    if (!users[userId]) return;
    const requestCount = Math.ceil(bytes / 1024);
    users[userId].trafficUsed += requestCount;
    if (users[userId].trafficUsed >= users[userId].trafficLimit) {
      users[userId].isActive = false;
    }
    await this.saveUsers(users);
    await this.db.prepare(`
      INSERT INTO usage_logs (user_id, bytes, requests, timestamp)
      VALUES (?, ?, ?, ?)
    `).bind(userId, bytes, requestCount, new Date().toISOString()).run();
  }
}

// ===== کلاس کانفیگ‌سازی =====
class ConfigGenerator {
  constructor(env) {
    this.env = env;
  }

  getFlag(country) {
    const flags = {
      'US': '🇺🇸',
      'DE': '🇩🇪',
      'UK': '🇬🇧',
      'FR': '🇫🇷',
      'CA': '🇨🇦',
      'JP': '🇯🇵',
      'SG': '🇸🇬',
      'AU': '🇦🇺',
      'IR': '🇮🇷',
      'RU': '🇷🇺',
      'NL': '🇳🇱',
      'IT': '🇮🇹',
      'ES': '🇪🇸',
      'BR': '🇧🇷',
      'IN': '🇮🇳',
      'AE': '🇦🇪',
      'TR': '🇹🇷',
      'default': '🌍'
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
    
    return {
      type: 'vmess',
      uuid: uuid,
      address: this.env.PROXYIP,
      port: 443,
      encryption: 'auto',
      network: 'tcp',
      security: 'tls',
      sni: this.env.PROXYIP,
      expiry: userData.expiryDate,
      userId: userId,
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
      const link = `vless://${vless.uuid}@${vless.address}:${vless.port}?encryption=${vless.encryption}&flow=${vless.flow}&security=${vless.security}&sni=${vless.sni}&fp=chrome&type=${vless.network}&path=/&fragment=${vless.fragment}&ech=${vless.ech}&warp=${vless.warp}#${encodeURIComponent('Taakaa-XI-' + userId + ' ' + flag + ' ' + country)}`;
      links.push({ type: 'vless', link: link, expiry: vless.expiry, country: country, flag: flag });
    }
    
    if (this.env.ENABLE_TROJAN) {
      const trojan = this.generateTrojan(userId, userData);
      const link = `trojan://${trojan.password}@${trojan.address}:${trojan.port}?sni=${trojan.sni}&security=${trojan.security}&fragment=${trojan.fragment}&ech=${trojan.ech}#${encodeURIComponent('Taakaa-XI-' + userId + ' ' + flag + ' ' + country)}`;
      links.push({ type: 'trojan', link: link, expiry: trojan.expiry, country: country, flag: flag });
    }
    
    if (this.env.ENABLE_VMESS) {
      const vmess = this.generateVMess(userId, userData);
      const vmessObj = {
        v: '2',
        ps: `Taakaa-XI-${userId} ${flag} ${country}`,
        add: vmess.address,
        port: vmess.port,
        id: vmess.uuid,
        aid: '0',
        net: vmess.network,
        type: 'none',
        host: vmess.sni,
        path: '/',
        tls: 'tls',
        sni: vmess.sni,
        fp: 'chrome'
      };
      const link = `vmess://${btoa(JSON.stringify(vmessObj))}`;
      links.push({ type: 'vmess', link: link, expiry: vmess.expiry, country: country, flag: flag });
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

// ===== HTML پنل مدیریت =====
const HTML_PANEL = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Taakaa-XI | پنل مدیریت</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    body {
      font-family: 'Inter', 'Segoe UI', sans-serif;
      background: #0a0a0f;
      color: #e0e0e0;
      min-height: 100vh;
      padding: 20px;
      background-image: 
        radial-gradient(ellipse at 10% 20%, rgba(255,107,107,0.05) 0%, transparent 50%),
        radial-gradient(ellipse at 90% 80%, rgba(238,90,36,0.05) 0%, transparent 50%);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: rgba(26, 26, 35, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 30px;
      border: 1px solid rgba(255,255,255,0.06);
      box-shadow: 0 20px 60px rgba(0,0,0,0.8);
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    
    .header .logo {
      font-size: 2.8rem;
      font-weight: 700;
      background: linear-gradient(135deg, #ff6b6b, #ee5a24, #ff6b6b);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradientShift 4s ease infinite;
    }
    
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    .header .subtitle {
      color: #888;
      font-size: 1rem;
      margin-top: 4px;
      letter-spacing: 2px;
    }
    
    .header .badge {
      display: inline-block;
      background: rgba(255,107,107,0.15);
      border: 1px solid rgba(255,107,107,0.3);
      border-radius: 20px;
      padding: 4px 16px;
      font-size: 0.75rem;
      color: #ff6b6b;
      margin-top: 8px;
    }
    
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    
    .card {
      background: rgba(16, 16, 24, 0.6);
      border-radius: 16px;
      padding: 24px;
      border: 1px solid rgba(255,255,255,0.05);
      transition: all 0.3s ease;
    }
    
    .card:hover {
      border-color: rgba(255,107,107,0.15);
      box-shadow: 0 8px 30px rgba(255,107,107,0.03);
    }
    
    .card h3 {
      color: #fff;
      font-size: 1.1rem;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .card h3 .icon {
      font-size: 1.3rem;
    }
    
    .form-group {
      margin-bottom: 14px;
    }
    
    .form-group label {
      color: #aaa;
      font-size: 0.8rem;
      font-weight: 500;
      display: block;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .form-group input, .form-group select {
      width: 100%;
      padding: 10px 14px;
      background: rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      color: #fff;
      font-size: 0.95rem;
      transition: all 0.3s;
    }
    
    .form-group input:focus, .form-group select:focus {
      border-color: #ff6b6b;
      outline: none;
      box-shadow: 0 0 20px rgba(255,107,107,0.05);
    }
    
    .form-group input::placeholder {
      color: #555;
    }
    
    .btn {
      background: linear-gradient(135deg, #ff6b6b, #ee5a24);
      border: none;
      border-radius: 10px;
      padding: 12px 24px;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.95rem;
      width: 100%;
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255,107,107,0.25);
    }
    
    .btn:active {
      transform: scale(0.98);
    }
    
    .btn-secondary {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
    }
    
    .btn-secondary:hover {
      background: rgba(255,255,255,0.1);
      box-shadow: none;
    }
    
    .link-box {
      background: rgba(0,0,0,0.5);
      padding: 10px 14px;
      border-radius: 8px;
      word-break: break-all;
      font-size: 0.75rem;
      color: #00ff88;
      margin: 6px 0;
      border: 1px solid rgba(0,255,136,0.05);
      font-family: 'Monaco', 'Menlo', monospace;
    }
    
    .link-box .flag {
      font-size: 1.1rem;
      margin-right: 6px;
    }
    
    .user-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 12px;
      background: rgba(0,0,0,0.3);
      border-radius: 10px;
      margin-bottom: 6px;
      border: 1px solid rgba(255,255,255,0.03);
      transition: all 0.2s;
    }
    
    .user-item:hover {
      background: rgba(0,0,0,0.5);
    }
    
    .user-item .id {
      color: #aaa;
      font-size: 0.85rem;
    }
    
    .user-item .status-badge {
      padding: 2px 12px;
      border-radius: 12px;
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .status-badge.active {
      background: rgba(0,255,136,0.15);
      color: #00ff88;
      border: 1px solid rgba(0,255,136,0.2);
    }
    
    .status-badge.expired {
      background: rgba(255,68,68,0.15);
      color: #ff4444;
      border: 1px solid rgba(255,68,68,0.2);
    }
    
    .status-badge.finished {
      background: rgba(255,170,0,0.15);
      color: #ffaa00;
      border: 1px solid rgba(255,170,0,0.2);
    }
    
    .del-btn {
      background: rgba(255,68,68,0.2);
      border: none;
      border-radius: 6px;
      padding: 4px 12px;
      color: #ff4444;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.75rem;
    }
    
    .del-btn:hover {
      background: rgba(255,68,68,0.4);
    }
    
    .user-list {
      max-height: 400px;
      overflow-y: auto;
    }
    
    .user-list::-webkit-scrollbar {
      width: 4px;
    }
    
    .user-list::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.03);
      border-radius: 4px;
    }
    
    .user-list::-webkit-scrollbar-thumb {
      background: #ff6b6b;
      border-radius: 4px;
    }
    
    .status-msg {
      padding: 12px 16px;
      border-radius: 10px;
      margin-top: 12px;
      font-size: 0.9rem;
    }
    
    .status-msg.success {
      background: rgba(0,255,136,0.08);
      border: 1px solid rgba(0,255,136,0.15);
      color: #00ff88;
    }
    
    .status-msg.error {
      background: rgba(255,68,68,0.08);
      border: 1px solid rgba(255,68,68,0.15);
      color: #ff4444;
    }
    
    .status-msg.info {
      background: rgba(255,170,0,0.08);
      border: 1px solid rgba(255,170,0,0.15);
      color: #ffaa00;
    }
    
    .admin-section {
      margin-top: 30px;
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    
    .admin-login {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    
    .admin-login input {
      flex: 1;
      padding: 10px 14px;
      background: rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      color: #fff;
      font-size: 0.95rem;
    }
    
    .admin-login input:focus {
      border-color: #ff6b6b;
      outline: none;
    }
    
    .admin-login .btn {
      width: auto;
      padding: 10px 24px;
    }
    
    .consultation-result {
      margin-top: 16px;
      background: rgba(0,0,0,0.3);
      border-radius: 12px;
      padding: 16px;
      border: 1px solid rgba(255,255,255,0.05);
      display: none;
    }
    
    .consultation-result.show {
      display: block;
    }
    
    .consultation-result .rec-card {
      background: rgba(0,0,0,0.3);
      border-radius: 10px;
      padding: 12px 16px;
      margin: 6px 0;
      border-right: 3px solid #ff6b6b;
    }
    
    .consultation-result .rec-card .label {
      color: #888;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .consultation-result .rec-card .value {
      color: #00ff88;
      font-weight: 600;
      font-size: 0.95rem;
    }
    
    .copy-btn {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 6px;
      padding: 4px 14px;
      color: #aaa;
      cursor: pointer;
      font-size: 0.7rem;
      transition: all 0.2s;
    }
    
    .copy-btn:hover {
      background: rgba(255,255,255,0.12);
      color: #fff;
    }
    
    .flag-selector {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin: 8px 0;
    }
    
    .flag-selector .flag-btn {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      padding: 6px 12px;
      color: #aaa;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.8rem;
    }
    
    .flag-selector .flag-btn:hover,
    .flag-selector .flag-btn.active {
      background: rgba(255,107,107,0.15);
      border-color: #ff6b6b;
      color: #fff;
    }
    
    @media (max-width: 768px) {
      .grid-2 { grid-template-columns: 1fr; }
      .container { padding: 16px; }
      .header .logo { font-size: 2rem; }
      .admin-login { flex-direction: column; }
      .admin-login .btn { width: 100%; }
    }
  </style>
</head>
<body>
<div class="container" id="app">
  <div class="header">
    <div class="logo">🚀 Taakaa-XI</div>
    <div class="subtitle">پنل مدیریت کانفیگ با محدودیت حجم و زمان</div>
    <div class="badge">✨ نسخه ۳.۰ | مدرن &amp; شخصی‌سازی‌شده</div>
  </div>

  <div class="grid-2">
    <div class="card">
      <h3><span class="icon">🔑</span> ساخت کانفیگ جدید</h3>
      <div class="form-group">
        <label>🆔 آیدی عددی کاربر</label>
        <input type="text" id="userId" placeholder="مثال: 123456789">
      </div>
      <div class="form-group">
        <label>🌍 منطقه (پرچم)</label>
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
        <label>📅 مدت اعتبار (روز)</label>
        <select id="expiryDays">
          <option value="7">۷ روز</option>
          <option value="15">۱۵ روز</option>
          <option value="30" selected>۳۰ روز</option>
          <option value="60">۶۰ روز</option>
          <option value="90">۹۰ روز</option>
        </select>
      </div>
      <div class="form-group">
        <label>📊 محدودیت حجم (گیگابایت)</label>
        <select id="trafficGB">
          <option value="5">۵ گیگابایت</option>
          <option value="10" selected>۱۰ گیگابایت</option>
          <option value="20">۲۰ گیگابایت</option>
          <option value="50">۵۰ گیگابایت</option>
          <option value="100">۱۰۰ گیگابایت</option>
        </select>
      </div>
      <button class="btn" onclick="generateConfig()">⚡ ساخت کانفیگ</button>
      <div id="statusMsg"></div>
    </div>

    <div class="card">
      <h3><span class="icon">📋</span> اطلاعات کاربر</h3>
      <div id="userInfo" style="color:#666; text-align:center; padding:30px 0; font-size:0.9rem;">
        برای مشاهده اطلاعات، کانفیگ بسازید.
      </div>
    </div>
  </div>

  <div class="card" style="margin-top:24px;">
    <h3><span class="icon">📡</span> مشاوره آفلاین</h3>
    <p style="color:#888; font-size:0.85rem; margin-bottom:16px;">اپراتور خود را انتخاب کنید تا بهترین کانفیگ را پیشنهاد بگیرید</p>
    
    <div class="form-group">
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
    
    <button class="btn" onclick="getConsultation()">🔍 دریافت مشاوره</button>
    
    <div class="consultation-result" id="consultationResult">
      <div id="consultationContent"></div>
    </div>
  </div>

  <div class="admin-section">
    <div class="admin-login">
      <input type="password" id="adminPass" placeholder="🔐 رمز پنل">
      <button class="btn" onclick="loginAdmin()">ورود به پنل</button>
    </div>
    
    <div id="adminPanel" style="display:none; margin-top:20px;">
      <div class="grid-2">
        <div class="card">
          <h3><span class="icon">➕</span> افزودن کاربر</h3>
          <div class="form-group">
            <label>🆔 آیدی عددی</label>
            <input type="text" id="newUserId" placeholder="123456789">
          </div>
          <div class="form-group">
            <label>📅 مدت اعتبار (روز)</label>
            <input type="number" id="newExpiryDays" value="30">
          </div>
          <div class="form-group">
            <label>📊 محدودیت حجم (گیگابایت)</label>
            <input type="number" id="newTrafficGB" value="10">
          </div>
          <button class="btn" onclick="addUser()">➕ افزودن کاربر</button>
        </div>
        <div class="card">
          <h3><span class="icon">📊</span> آمار</h3>
          <div id="statsContent" style="color:#888; text-align:center; padding:20px 0;">
            در حال بارگذاری...
          </div>
        </div>
      </div>
      
      <div class="card" style="margin-top:20px;">
        <h3><span class="icon">📋</span> لیست کاربران</h3>
        <div class="user-list" id="userList">
          <div style="color:#666; text-align:center; padding:30px 0;">در حال بارگذاری...</div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
const ADMIN_PASS = 'Tentacion@2026';

const OPERATOR_SUGGESTIONS = {
  'mobin-net': {
    name: 'مبین نت',
    flag: '📶',
    bestProtocol: 'VLESS + gRPC',
    bestFragment: '2-5',
    bestPort: '443',
    bestCountry: 'DE',
    description: 'مبین نت با VLESS و gRPC و Fragment 2-5 بهترین عملکرد را دارد. پورت ۴۴۳ و سرور آلمان توصیه می‌شود.',
    configExample: 'vless://{uuid}@cdn.taakaa.ir:443?encryption=none&flow=xtls-rprx-vision&security=tls&sni=cdn.taakaa.ir&fp=chrome&type=grpc&serviceName=#Taakaa-XI'
  },
  'rightel': {
    name: 'رایتل',
    flag: '📶',
    bestProtocol: 'Trojan + WebSocket',
    bestFragment: '3-7',
    bestPort: '443',
    bestCountry: 'US',
    description: 'رایتل با Trojan و WebSocket و Fragment 3-7 بهترین پاسخ را میدهد. سرور آمریکا توصیه می‌شود.',
    configExample: 'trojan://{password}@cdn.taakaa.ir:443?sni=cdn.taakaa.ir&security=tls&type=ws&path=/&host=cdn.taakaa.ir#Taakaa-XI'
  },
  'irancell': {
    name: 'ایرانسل',
    flag: '📶',
    bestProtocol: 'VLESS + XTLS',
    bestFragment: '1-3',
    bestPort: '443',
    bestCountry: 'NL',
    description: 'ایرانسل با VLESS و XTLS و Fragment 1-3 بهترین عملکرد را دارد. سرور هلند توصیه می‌شود.',
    configExample: 'vless://{uuid}@cdn.taakaa.ir:443?encryption=none&flow=xtls-rprx-vision&security=tls&sni=cdn.taakaa.ir&fp=chrome&type=tcp#Taakaa-XI'
  },
  'shatel': {
    name: 'شاتل',
    flag: '📶',
    bestProtocol: 'VMess + WebSocket',
    bestFragment: '4-8',
    bestPort: '443',
    bestCountry: 'SG',
    description: 'شاتل با VMess و WebSocket و Fragment 4-8 بهترین پاسخ را میدهد. سرور سنگاپور توصیه می‌شود.',
    configExample: 'vmess://...'
  },
  'mokhaberat': {
    name: 'مخابرات',
    flag: '📶',
    bestProtocol: 'Trojan + gRPC',
    bestFragment: '2-6',
    bestPort: '443',
    bestCountry: 'UK',
    description: 'مخابرات با Trojan و gRPC و Fragment 2-6 بهترین عملکرد را دارد. سرور انگلستان توصیه می‌شود.',
    configExample: 'trojan://{password}@cdn.taakaa.ir:443?sni=cdn.taakaa.ir&security=tls&type=grpc&serviceName=#Taakaa-XI'
  },
  'hamrahe-aval': {
    name: 'همراه اول',
    flag: '📶',
    bestProtocol: 'VLESS + WebSocket',
    bestFragment: '3-5',
    bestPort: '443',
    bestCountry: 'FR',
    description: 'همراه اول با VLESS و WebSocket و Fragment 3-5 بهترین پاسخ را دارد. سرور فرانسه توصیه می‌شود.',
    configExample: 'vless://{uuid}@cdn.taakaa.ir:443?encryption=none&flow=xtls-rprx-vision&security=tls&sni=cdn.taakaa.ir&fp=chrome&type=ws&path=/&host=cdn.taakaa.ir#Taakaa-XI'
  }
};

function showStatus(msg, type = 'info') {
  const div = document.getElementById('statusMsg');
  div.className = 'status-msg ' + type;
  div.textContent = msg;
  setTimeout(() => { div.className = ''; div.textContent = ''; }, 8000);
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showStatus('✅ کپی شد!', 'success');
  }).catch(() => {
    showStatus('❌ خطا در کپی', 'error');
  });
}

async function generateConfig() {
  const userId = document.getElementById('userId').value.trim();
  const country = document.getElementById('countrySelect').value;
  const expiryDays = parseInt(document.getElementById('expiryDays').value);
  const trafficGB = parseInt(document.getElementById('trafficGB').value);

  if (!userId) {
    showStatus('❌ لطفاً آیدی کاربر را وارد کنید', 'error');
    return;
  }

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, country, expiryDays, trafficGB })
    });
    const data = await res.json();

    if (data.success) {
      showUserInfo(data.config);
      showStatus('✅ کانفیگ با موفقیت ساخته شد!', 'success');
    } else {
      showStatus('❌ ' + data.error, 'error');
    }
  } catch (e) {
    showStatus('❌ خطا در ارتباط با سرور', 'error');
  }
}

function showUserInfo(config) {
  const div = document.getElementById('userInfo');
  let html = '<div style="text-align:right;">';
  
  const statusIcon = config.isActive ? '🟢' : '🔴';
  const statusText = config.isActive ? 'فعال' : 'غیرفعال';
  
  html += `<div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
    <span style="font-size:2rem;">${config.links[0]?.flag || '🌍'}</span>
    <div>
      <div style="font-size:1.2rem; font-weight:600; color:#fff;">${config.userId}</div>
      <div style="display:flex; gap:8px; margin-top:4px;">
        <span style="font-size:0.8rem; color:#888;">${config.links[0]?.country || 'N/A'}</span>
        <span class="status-badge ${config.isActive ? 'active' : 'expired'}">${statusText}</span>
      </div>
    </div>
  </div>`;
  
  html += `<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">
    <div style="background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:8px;">
      <div style="color:#666; font-size:0.65rem; text-transform:uppercase;">📅 تاریخ انقضا</div>
      <div style="color:#fff; font-size:0.9rem;">${config.expiryDate}</div>
    </div>
    <div style="background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:8px;">
      <div style="color:#666; font-size:0.65rem; text-transform:uppercase;">📊 حجم مصرفی</div>
      <div style="color:#fff; font-size:0.9rem;">${config.trafficUsedGB} / ${config.trafficLimitGB} GB</div>
    </div>
    <div style="background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:8px; grid-column: span 2;">
      <div style="color:#666; font-size:0.65rem; text-transform:uppercase;">📊 حجم باقی‌مانده</div>
      <div style="color:#00ff88; font-size:1rem; font-weight:600;">${config.trafficRemainingGB} GB</div>
    </div>
  </div>`;
  
  html += '<hr style="border-color:rgba(255,255,255,0.05); margin:12px 0;">';
  html += '<div style="font-size:0.8rem; color:#888; margin-bottom:8px;">🔗 لینک‌های کانفیگ:</div>';
  
  config.links.forEach((link, idx) => {
    const typeColors = {
      'vless': '#00ff88',
      'trojan': '#ff6b6b',
      'vmess': '#ffaa00'
    };
    const color = typeColors[link.type] || '#fff';
    html += `<div class="link-box" style="border-left: 3px solid ${color};">
      <span class="flag">${link.flag}</span>
      <span style="color:${color}; font-weight:600; font-size:0.7rem; text-transform:uppercase;">${link.type}</span>
      <span style="color:#666; font-size:0.65rem; margin-left:8px;">${link.country}</span>
      <br><span style="font-size:0.7rem; word-break:break-all;">${link.link}</span>
    </div>`;
    html += `<button class="copy-btn" onclick="copyText('${link.link}')">📋 کپی ${link.type}</button> `;
  });
  
  html += '</div>';
  div.innerHTML = html;
}

function getConsultation() {
  const operator = document.getElementById('operatorSelect').value;
  const resultDiv = document.getElementById('consultationResult');
  const contentDiv = document.getElementById('consultationContent');
  
  if (!operator) {
    showStatus('❌ لطفاً اپراتور خود را انتخاب کنید', 'error');
    return;
  }
  
  const data = OPERATOR_SUGGESTIONS[operator];
  if (!data) {
    showStatus('❌ اطلاعاتی برای این اپراتور یافت نشد', 'error');
    return;
  }
  
  resultDiv.classList.add('show');
  contentDiv.innerHTML = `
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
      <span style="font-size:2rem;">${data.flag}</span>
      <div>
        <h4 style="color:#fff; margin:0;">${data.name}</h4>
        <span style="color:#888; font-size:0.75rem;">پیشنهاد ویژه</span>
      </div>
    </div>
    <div class="rec-card">
      <div class="label">🔹 بهترین پروتکل</div>
      <div class="value">${data.bestProtocol}</div>
    </div>
    <div class="rec-card">
      <div class="label">🔹 بهترین Fragment</div>
      <div class="value">${data.bestFragment}</div>
    </div>
    <div class="rec-card">
      <div class="label">🔹 بهترین پورت</div>
      <div class="value">${data.bestPort}</div>
    </div>
    <div class="rec-card">
      <div class="label">🌍 بهترین منطقه</div>
      <div class="value">${data.bestCountry}</div>
    </div>
    <p style="color:#aaa; font-size:0.85rem; margin:12px 0;">📝 ${data.description}</p>
    <div style="background:rgba(0,0,0,0.5); border-radius:8px; padding:10px; border:1px solid rgba(255,255,255,0.05);">
      <p style="color:#666; font-size:0.65rem; margin-bottom:4px;">📋 نمونه کانفیگ:</p>
      <code style="color:#00ff88; font-size:0.65rem; word-break:break-all;">${data.configExample}</code>
    </div>
    <button class="btn btn-secondary" onclick="copyText('${data.configExample}')" style="margin-top:8px; width:auto; padding:6px 16px; font-size:0.75rem;">📋 کپی کانفیگ</button>
  `;
}

function loginAdmin() {
  const pass = document.getElementById('adminPass').value;
  if (pass === ADMIN_PASS) {
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('adminPass').value = '';
    showStatus('✅ ورود موفق!', 'success');
    loadAdminData();
  } else {
    showStatus('❌ رمز اشتباه است!', 'error');
  }
}

async function loadAdminData() {
  try {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    if (data.success) {
      renderUserList(data.users);
      renderStats(data);
    }
  } catch (e) {
    console.error(e);
  }
}

function renderUserList(users) {
  const div = document.getElementById('userList');
  if (!users || Object.keys(users).length === 0) {
    div.innerHTML = '<div style="color:#666; text-align:center; padding:30px 0;">هیچ کاربری ثبت نشده است</div>';
    return;
  }
  
  let html = '';
  for (const [id, user] of Object.entries(users)) {
    const isActive = user.isActive && new Date(user.expiryDate) > new Date() && user.trafficUsed < user.trafficLimit;
    const statusClass = isActive ? 'active' : (new Date(user.expiryDate) <= new Date() ? 'expired' : 'finished');
    const statusText = isActive ? 'فعال' : (new Date(user.expiryDate) <= new Date() ? 'منقضی' : 'تمام‌شده');
    
    html += `
      <div class="user-item">
        <span class="id">🆔 ${id}</span>
        <span style="color:#888; font-size:0.75rem;">📅 ${new Date(user.expiryDate).toLocaleDateString('fa-IR')}</span>
        <span style="color:#888; font-size:0.75rem;">📊 ${Math.round(user.trafficUsed / 2500 * 100) / 100} / ${Math.round(user.trafficLimit / 2500 * 100) / 100} GB</span>
        <span class="status-badge ${statusClass}">${statusText}</span>
        <button class="del-btn" onclick="deleteUser('${id}')">🗑️</button>
      </div>
    `;
  }
  div.innerHTML = html;
}

function renderStats(data) {
  const div = document.getElementById('statsContent');
  const users = data.users || {};
  const totalUsers = Object.keys(users).length;
  const activeUsers = Object.values(users).filter(u => u.isActive && new Date(u.expiryDate) > new Date() && u.trafficUsed < u.trafficLimit).length;
  const totalTraffic = Object.values(users).reduce((sum, u) => sum + (u.trafficLimit - u.trafficUsed), 0);
  
  div.innerHTML = `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
      <div style="background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:8px; text-align:center;">
        <div style="color:#666; font-size:0.65rem; text-transform:uppercase;">👥 کل کاربران</div>
        <div style="color:#fff; font-size:1.2rem; font-weight:600;">${totalUsers}</div>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:8px; text-align:center;">
        <div style="color:#666; font-size:0.65rem; text-transform:uppercase;">🟢 فعال</div>
        <div style="color:#00ff88; font-size:1.2rem; font-weight:600;">${activeUsers}</div>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:8px; text-align:center; grid-column: span 2;">
        <div style="color:#666; font-size:0.65rem; text-transform:uppercase;">📊 حجم باقی‌مانده کل</div>
        <div style="color:#ffaa00; font-size:1.2rem; font-weight:600;">${Math.round(totalTraffic / 2500 * 100) / 100} GB</div>
      </div>
    </div>
  `;
}

async function deleteUser(userId) {
  if (!confirm(`آیا از حذف کاربر ${userId} مطمئن هستید؟`)) return;
  
  try {
    const res = await fetch('/api/admin/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    const data = await res.json();
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
  const userId = document.getElementById('newUserId').value.trim();
  const expiryDays = parseInt(document.getElementById('newExpiryDays').value);
  const trafficGB = parseInt(document.getElementById('newTrafficGB').value);

  if (!userId) {
    showStatus('❌ لطفاً آیدی کاربر را وارد کنید', 'error');
    return;
  }

  try {
    const res = await fetch('/api/admin/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, expiryDays, trafficGB })
    });
    const data = await res.json();
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
</script>
</body>
</html>`;

// ===== Worker اصلی =====
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ===== متغیرهای محیطی =====
    const ENV_VARS = {
      UUID: env.UUID || '90cd4a77-141a-43c9-991b-08263cfe9c10',
      TR_PASS: env.TR_PASS || 'TaakaaSecure2026',
      PROXYIP: env.PROXYIP || 'cdn.taakaa.ir',
      ADMIN_PASS: env.ADMIN_PASS || 'Tentacion@2026',
      DEFAULT_EXPIRY_DAYS: parseInt(env.DEFAULT_EXPIRY_DAYS) || 30,
      DEFAULT_TRAFFIC_LIMIT: parseInt(env.DEFAULT_TRAFFIC_LIMIT) || 10,
      RATE_PER_GB: parseInt(env.RATE_PER_GB) || 2500,
      ENABLE_VLESS: env.ENABLE_VLESS !== 'false',
      ENABLE_TROJAN: env.ENABLE_TROJAN !== 'false',
      ENABLE_VMESS: env.ENABLE_VMESS !== 'false',
      ENABLE_SHADOWSOCKS: env.ENABLE_SHADOWSOCKS === 'true',
      ENABLE_FRAGMENT: env.ENABLE_FRAGMENT !== 'false',
      ENABLE_ECH: env.ENABLE_ECH !== 'false',
      ENABLE_WARP: env.ENABLE_WARP !== 'false',
      ENABLE_WARP_PRO: env.ENABLE_WARP_PRO === 'true'
    };

    const kv = env.KV;
    const db = env.DB;

    const userManager = new UserManager(kv, db);
    const configGenerator = new ConfigGenerator(ENV_VARS);

    // ===== API: ساخت کانفیگ =====
    if (path === '/api/generate' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { userId, country, expiryDays, trafficGB } = body;

        if (!userId) {
          return new Response(JSON.stringify({ success: false, error: 'آیدی کاربر الزامی است' }), { status: 400 });
        }

        let user = await userManager.getUser(userId);
        if (!user) {
          const result = await userManager.createUser(userId, expiryDays || ENV_VARS.DEFAULT_EXPIRY_DAYS, trafficGB || ENV_VARS.DEFAULT_TRAFFIC_LIMIT);
          if (!result.success) {
            return new Response(JSON.stringify(result), { status: 400 });
          }
          user = result.user;
        }

        user.country = country || 'DE';
        user.expiryDate = new Date(Date.now() + (expiryDays || ENV_VARS.DEFAULT_EXPIRY_DAYS) * 86400000).toISOString();
        user.trafficLimit = (trafficGB || ENV_VARS.DEFAULT_TRAFFIC_LIMIT) * ENV_VARS.RATE_PER_GB;
        user.isActive = true;
        
        const users = await userManager.getUsers();
        users[userId] = user;
        await userManager.saveUsers(users);

        const config = configGenerator.generateFullConfig(userId, user);

        return new Response(JSON.stringify({ success: true, config }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
      }
    }

    // ===== API ادمین: دریافت کاربران =====
    if (path === '/api/admin/users' && request.method === 'GET') {
      try {
        const users = await userManager.getUsers();
        return new Response(JSON.stringify({ success: true, users }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
      }
    }

    // ===== API ادمین: افزودن کاربر =====
    if (path === '/api/admin/add' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { userId, expiryDays, trafficGB } = body;

        if (!userId) {
          return new Response(JSON.stringify({ success: false, error: 'آیدی کاربر الزامی است' }), { status: 400 });
        }

        const result = await userManager.createUser(userId, expiryDays || ENV_VARS.DEFAULT_EXPIRY_DAYS, trafficGB || ENV_VARS.DEFAULT_TRAFFIC_LIMIT);
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
      }
    }

    // ===== API ادمین: حذف کاربر =====
    if (path === '/api/admin/delete' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { userId } = body;

        if (!userId) {
          return new Response(JSON.stringify({ success: false, error: 'آیدی کاربر الزامی است' }), { status: 400 });
        }

        const result = await userManager.deleteUser(userId);
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
      }
    }

    // ===== مسیر پنل =====
    if (path === '/' || path === '/Taakaa') {
      return new Response(HTML_PANEL, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // ===== ساب‌اسکریپشن =====
    if (path.startsWith('/sub/')) {
      const userId = path.split('/sub/')[1];
      if (!userId) {
        return new Response('User ID required', { status: 400 });
      }

      const user = await userManager.getUser(userId);
      if (!user) {
        return new Response('User not found', { status: 404 });
      }

      const validity = await userManager.checkUserValidity(userId);
      if (!validity.valid) {
        return new Response(validity.reason, { status: 403 });
      }

      const config = configGenerator.generateFullConfig(userId, user);
      let subContent = '';
      config.links.forEach(link => {
        subContent += link.link + '\n';
      });

      return new Response(subContent, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache'
        }
      });
    }

    // ===== Health Check =====
    if (path === '/health') {
      return new Response('OK', { status: 200 });
    }

    return new Response('Not Found', { status: 404 });
  }
};
