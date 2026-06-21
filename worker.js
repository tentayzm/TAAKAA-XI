// ============================================================
// TAAKAA-XI v6.4 – بخش اول (Constants, Helpers, UserManager, ConfigGenerator)
// ============================================================

const GB = 1024 * 1024 * 1024;
const KB = 1024;
const CACHE_TTL = 5000;
const LOCK_TTL = 5;
const TOAST_DURATION = 6000;
const MAX_USERS_PER_PAGE = 50;
const DAY_MS = 86400000;
const MAX_TRAFFIC_GB = 1000;
const MAX_EXPIRY_DAYS = 365;
const MIN_EXPIRY_DAYS = 1;
const MIN_TRAFFIC_GB = 1;
const RATE_LIMIT_GENERATE = 10;
const RATE_LIMIT_LOGIN = 5;
const RATE_LIMIT_ADMIN = 100;
const RATE_LIMIT_SUB = 50;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400'
};

const RATE_LIMITS = {
  generate: RATE_LIMIT_GENERATE,
  login: RATE_LIMIT_LOGIN,
  admin: RATE_LIMIT_ADMIN,
  sub: RATE_LIMIT_SUB
};

const OPERATOR_CONFIG = {
  'irancell': { fragment: '1-3', network: 'tcp', country: 'NL' },
  'hamrahe-aval': { fragment: '3-5', network: 'ws', country: 'FR' },
  'rightel': { fragment: '3-7', network: 'ws', country: 'US' },
  'mobin-net': { fragment: '2-5', network: 'grpc', country: 'DE' },
  'shatel': { fragment: '4-8', network: 'ws', country: 'SG' },
  'mokhaberat': { fragment: '2-6', network: 'grpc', country: 'UK' }
};

const FLAG_MAP = {
  'US': '🇺🇸', 'DE': '🇩🇪', 'UK': '🇬🇧', 'FR': '🇫🇷',
  'CA': '🇨🇦', 'JP': '🇯🇵', 'SG': '🇸🇬', 'AU': '🇦🇺',
  'IR': '🇮🇷', 'RU': '🇷🇺', 'NL': '🇳🇱', 'IT': '🇮🇹',
  'ES': '🇪🇸', 'BR': '🇧🇷', 'IN': '🇮🇳', 'AE': '🇦🇪',
  'TR': '🇹🇷'
};
const DEFAULT_FLAG = '🌍';

function generateUUID() {
  try { return crypto.randomUUID(); } catch {
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
  for (let i = 0; i < data.length; i++) binary += String.fromCharCode(data[i]);
  return btoa(binary);
}

function validateUserId(userId) {
  return /^[a-zA-Z0-9_-]{1,64}$/.test(userId);
}

function validateExpiryDays(days) {
  return !isNaN(days) && days >= MIN_EXPIRY_DAYS && days <= MAX_EXPIRY_DAYS;
}

function validateTrafficGB(gb) {
  return !isNaN(gb) && gb >= MIN_TRAFFIC_GB && gb <= MAX_TRAFFIC_GB;
}

function sanitizeHTML(str) {
  if (!str) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return str.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function checkAdminAuth(request, adminPass) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;
  return authHeader.replace(/^Bearer\s+/i, '') === adminPass;
}

function createCorsResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
  });
}

async function checkRateLimit(env, ip, action) {
  try {
    const key = 'rate:' + action + ':' + ip;
    const current = parseInt(await env.KV.get(key) || '0');
    const limit = RATE_LIMITS[action] || 10;
    if (current >= limit) return false;
    await env.KV.put(key, String(current + 1), { expirationTtl: 3600 });
    return true;
  } catch { return true; }
}

async function logAdminAction(env, userId, action, details, ip) {
  try {
    await env.DB.prepare(
      'INSERT INTO audit_logs (user_id, action, details, ip, timestamp) VALUES (?, ?, ?, ?, ?)'
    ).bind(userId, action, JSON.stringify(details), ip, new Date().toISOString()).run();
  } catch {}
}

function getFlag(country) { return FLAG_MAP[country] || DEFAULT_FLAG; }

function buildVlessUrl(p) {
  return 'vless://' + p.uuid + '@' + p.address + ':' + p.port +
    '?encryption=' + p.encryption + '&flow=' + p.flow +
    '&security=' + p.security + '&sni=' + p.sni +
    '&fp=chrome&type=' + p.network + '&path=/&fragment=' + p.fragment +
    '&ech=' + p.ech + '&warp=' + p.warp + '#' + encodeURIComponent(p.name);
}

function buildTrojanUrl(p) {
  return 'trojan://' + p.password + '@' + p.address + ':' + p.port +
    '?sni=' + p.sni + '&security=' + p.security +
    '&fragment=' + p.fragment + '&ech=' + p.ech +
    '#' + encodeURIComponent(p.name);
}

// ===== کلاس مدیریت کاربران =====
class UserManager {
  constructor(kv, db, ctx) {
    this.kv = kv; this.db = db; this.ctx = ctx;
    this._usersCache = null; this._cacheTime = 0;
  }

  async getUsers() {
    const now = Date.now();
    if (this._usersCache && (now - this._cacheTime) < CACHE_TTL) return this._usersCache;
    try {
      const data = await this.kv.get('users', 'json');
      this._usersCache = data || {};
      this._cacheTime = now;
      return this._usersCache;
    } catch { return {}; }
  }

  async saveUsers(users) {
    try {
      await this.kv.put('users', JSON.stringify(users));
      this._usersCache = users;
      this._cacheTime = Date.now();
    } catch {}
  }

  async acquireLock(userId, ttl = 5) {
    try {
      const key = 'lock:user:' + userId;
      if (await this.kv.get(key)) return false;
      await this.kv.put(key, '1', { expirationTtl: ttl });
      return true;
    } catch { return true; }
  }

  async releaseLock(userId) {
    try { await this.kv.delete('lock:user:' + userId); } catch {}
  }

  async createUser(userId, expiryDays, trafficGB) {
    if (!validateUserId(userId)) return { success: false, error: 'UserId نامعتبر است' };
    let days = expiryDays, gb = trafficGB;
    if (!validateExpiryDays(days)) days = 30;
    if (!validateTrafficGB(gb)) gb = 10;

    const locked = await this.acquireLock(userId);
    if (!locked) return { success: false, error: 'در حال پردازش' };

    try {
      const users = await this.getUsers();
      if (users[userId]) return { success: false, error: 'کاربر قبلاً وجود دارد' };

      const uuid = generateUUID();
      const expiryDate = new Date(Date.now() + days * DAY_MS).toISOString();
      users[userId] = {
        uuid, expiryDate, trafficLimit: gb * GB, trafficUsed: 0,
        createdAt: new Date().toISOString(), isActive: true, devices: [], ipHistory: []
      };

      await this.saveUsers(users);
      if (this.ctx) {
        this.ctx.waitUntil(
          this.db.prepare(
            'INSERT INTO users (id, uuid, expiry_date, traffic_limit, created_at) VALUES (?, ?, ?, ?, ?)'
          ).bind(userId, uuid, expiryDate, gb * GB, new Date().toISOString()).run()
        );
      }
      return { success: true, user: users[userId] };
    } finally { await this.releaseLock(userId); }
  }

  async renewUser(userId, expiryDays, trafficGB, resetTraffic = false) {
    if (!validateUserId(userId)) return { success: false, error: 'UserId نامعتبر است' };
    const users = await this.getUsers();
    if (!users[userId]) return { success: false, error: 'کاربر یافت نشد' };

    let days = expiryDays, gb = trafficGB;
    if (!validateExpiryDays(days)) days = 30;
    if (!validateTrafficGB(gb)) gb = 10;

    const locked = await this.acquireLock(userId);
    if (!locked) return { success: false, error: 'در حال پردازش' };

    try {
      users[userId].expiryDate = new Date(Date.now() + days * DAY_MS).toISOString();
      users[userId].trafficLimit = gb * GB;
      if (resetTraffic) users[userId].trafficUsed = 0;
      users[userId].isActive = true;
      await this.saveUsers(users);
      return { success: true, user: users[userId] };
    } finally { await this.releaseLock(userId); }
  }

  async getUser(userId) {
    if (!userId) return null;
    const users = await this.getUsers();
    return users[userId] || null;
  }

  async deleteUser(userId) {
    const users = await this.getUsers();
    if (!users[userId]) return { success: false, error: 'کاربر یافت نشد' };
    delete users[userId];
    await this.saveUsers(users);
    if (this.ctx) {
      this.ctx.waitUntil(this.db.prepare('DELETE FROM users WHERE id = ?').bind(userId).run());
    }
    return { success: true };
  }

  async checkUserValidity(userId) {
    const user = await this.getUser(userId);
    if (!user) return { valid: false, reason: 'کاربر یافت نشد' };

    const now = new Date();
    if (now > new Date(user.expiryDate)) {
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
    const locked = await this.acquireLock(userId, 2);
    if (!locked) return;
    try {
      const users = await this.getUsers();
      if (!users[userId]) return;
      users[userId].trafficUsed += bytes;
      if (users[userId].trafficUsed >= users[userId].trafficLimit) {
        users[userId].isActive = false;
      }
      await this.saveUsers(users);
    } finally { await this.releaseLock(userId); }
  }

  async cleanupExpiredUsers() {
    const users = await this.getUsers();
    const now = new Date();
    let deleted = 0;
    for (const [id, user] of Object.entries(users)) {
      if (new Date(user.expiryDate) < now) { delete users[id]; deleted++; }
    }
    if (deleted > 0) await this.saveUsers(users);
    return deleted;
  }

  async backupUsers() {
    try {
      const users = await this.getUsers();
      await this.kv.put('users_backup', JSON.stringify({
        timestamp: new Date().toISOString(),
        count: Object.keys(users).length,
        data: users
      }));
      return true;
    } catch { return false; }
  }
}

// ===== کلاس ConfigGenerator =====
class ConfigGenerator {
  constructor(env) { this.env = env; }

  generateVLESS(userId, userData, operator) {
    const uuid = userData.uuid || this.env.UUID;
    const country = userData.country || 'DE';
    const flag = getFlag(country);
    const config = OPERATOR_CONFIG[operator] || {};
    const frag = config.fragment || '2-5';
    const network = config.network || 'tcp';

    return {
      type: 'vless', uuid, address: this.env.PROXYIP, port: 443,
      encryption: 'none', flow: 'xtls-rprx-vision', network,
      security: 'tls', sni: this.env.PROXYIP, expiry: userData.expiryDate,
      userId, country, flag,
      fragment: this.env.ENABLE_FRAGMENT !== 'false' ? frag : 'off',
      ech: this.env.ENABLE_ECH !== 'false' ? 'true' : 'false',
      warp: this.env.ENABLE_WARP !== 'false' ? 'true' : 'false'
    };
  }

  generateTrojan(userId, userData, operator) {
    const country = userData.country || 'US';
    const flag = getFlag(country);
    const config = OPERATOR_CONFIG[operator] || {};
    const frag = config.fragment || '3-7';

    return {
      type: 'trojan', password: userData.uuid || this.env.TR_PASS,
      address: this.env.PROXYIP, port: 443, sni: this.env.PROXYIP,
      security: 'tls', expiry: userData.expiryDate, userId, country, flag,
      fragment: this.env.ENABLE_FRAGMENT !== 'false' ? frag : 'off',
      ech: this.env.ENABLE_ECH !== 'false' ? 'true' : 'false'
    };
  }

  generateVMess(userId, userData) {
    const uuid = userData.uuid || this.env.UUID;
    const country = userData.country || 'SG';
    const flag = getFlag(country);
    const obj = {
      v: '2', ps: 'TAAKAA-' + userId + ' ' + flag + ' ' + country,
      add: this.env.PROXYIP, port: 443, id: uuid, aid: '0',
      net: 'tcp', type: 'none', host: this.env.PROXYIP, path: '/',
      tls: 'tls', sni: this.env.PROXYIP, fp: 'chrome'
    };
    return { type: 'vmess', link: 'vmess://' + base64Encode(JSON.stringify(obj)), expiry: userData.expiryDate, country, flag };
  }

  generateShareLinks(userId, userData, operator) {
    const links = [];
    const country = userData.country || 'DE';
    const flag = getFlag(country);
    const name = 'TAAKAA-' + userId + ' ' + flag + ' ' + country;

    if (this.env.ENABLE_VLESS !== 'false') {
      const v = this.generateVLESS(userId, userData, operator);
      links.push({ type: 'vless', link: buildVlessUrl({
        uuid: v.uuid, address: v.address, port: v.port,
        encryption: v.encryption, flow: v.flow, security: v.security,
        sni: v.sni, network: v.network, fragment: v.fragment,
        ech: v.ech, warp: v.warp, name: name
      }), expiry: v.expiry, country, flag });
    }

    if (this.env.ENABLE_TROJAN !== 'false') {
      const t = this.generateTrojan(userId, userData, operator);
      links.push({ type: 'trojan', link: buildTrojanUrl({
        password: t.password, address: t.address, port: t.port,
        sni: t.sni, security: t.security, fragment: t.fragment,
        ech: t.ech, name: name
      }), expiry: t.expiry, country, flag });
    }

    if (this.env.ENABLE_VMESS !== 'false') {
      const vmess = this.generateVMess(userId, userData);
      links.push({ type: 'vmess', link: vmess.link, expiry: vmess.expiry, country, flag });
    }

    return links;
  }

  generateFullConfig(userId, userData, operator) {
    const links = this.generateShareLinks(userId, userData, operator);
    const expiry = userData.expiryDate;
    const trafficLimit = userData.trafficLimit;
    const trafficUsed = userData.trafficUsed || 0;
    const trafficRemaining = trafficLimit - trafficUsed;

    return {
      userId, expiry, trafficLimit, trafficUsed, trafficRemaining,
      trafficLimitGB: Math.round(trafficLimit / GB * 100) / 100,
      trafficUsedGB: Math.round(trafficUsed / GB * 100) / 100,
      trafficRemainingGB: Math.round(trafficRemaining / GB * 100) / 100,
      expiryDate: new Date(expiry).toLocaleDateString('fa-IR'),
      links,
      isActive: trafficRemaining > 0 && new Date(expiry) > new Date()
    };
  }
  }
// ============================================================
// TAAKAA-XI v6.4 – بخش دوم (HTML_PANEL + Worker اصلی)
// ============================================================

const HTML_PANEL = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TAAKAA | پنل مدیریت</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--primary:#6C3CE1;--secondary:#00D4FF;--success:#00FF88;--bg:#0A0A12}
body{font-family:'Inter',sans-serif;background:var(--bg);color:#fff;min-height:100vh}
.app-container{max-width:1400px;margin:0 auto;padding:20px}
.card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:24px;margin-bottom:20px}
.btn{background:linear-gradient(135deg,var(--primary),#5A2DBF);border:none;border-radius:10px;padding:12px 24px;color:#fff;font-weight:600;cursor:pointer;width:100%}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(108,60,225,0.3)}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
@media(max-width:768px){.grid-2{grid-template-columns:1fr}}
input,select{width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;color:#fff;margin:6px 0}
.form-group{margin-bottom:12px}
.form-group label{display:block;color:rgba(255,255,255,0.7);font-size:12px;text-transform:uppercase;letter-spacing:0.5px}
.header{display:flex;justify-content:space-between;padding:16px 24px;background:rgba(255,255,255,0.03);border-radius:16px;margin-bottom:24px}
.logo{font-size:24px;font-weight:900;background:linear-gradient(135deg,var(--primary),var(--secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;margin-bottom:24px}
.stat-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:16px 20px}
.stat-label{color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase}
.stat-value{font-size:24px;font-weight:700}
.toast-container{position:fixed;top:20px;left:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;max-width:400px}
.toast{background:rgba(0,0,0,0.9);border-radius:12px;padding:14px 18px;color:#fff;font-size:14px;border-right:4px solid var(--success)}
.toast.error{border-right-color:#ff4444}
.toast.info{border-right-color:#ffb800}
</style>
</head>
<body>
<div id="loginSection" style="display:flex;align-items:center;justify-content:center;min-height:100vh">
  <div style="background:rgba(255,255,255,0.03);border-radius:24px;padding:48px 40px;max-width:420px;width:100%">
    <h1 style="text-align:center;font-size:28px;background:linear-gradient(135deg,var(--primary),var(--secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent">⚡ TAAKAA</h1>
    <p style="text-align:center;color:rgba(255,255,255,0.7);margin-bottom:32px">پنل مدیریت پیشرفته</p>
    <input type="password" id="loginPass" placeholder="رمز عبور" style="width:100%;padding:14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:#fff;margin-bottom:16px">
    <button class="btn" onclick="login()">ورود</button>
    <div id="loginError" style="color:#ff4444;text-align:center;margin-top:12px;display:none">رمز اشتباه است!</div>
  </div>
</div>
<div id="adminPanel" style="display:none">
<div class="app-container">
<div class="header"><span class="logo">⚡ TAAKAA</span><button onclick="logout()" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:8px 16px;color:#fff;cursor:pointer">خروج</button></div>
<div class="stats-grid">
<div class="stat-card"><div class="stat-label">👥 کل کاربران</div><div class="stat-value" id="statTotal">0</div></div>
<div class="stat-card"><div class="stat-label">🟢 فعال</div><div class="stat-value" style="color:var(--success)" id="statActive">0</div></div>
<div class="stat-card"><div class="stat-label">📊 حجم باقی‌مانده</div><div class="stat-value" style="color:#ffb800" id="statTraffic">0 GB</div></div>
</div>
<div class="grid-2">
<div class="card"><h3>ساخت کانفیگ</h3>
<div class="form-group"><label>🆔 آیدی کاربر</label><input type="text" id="userId" placeholder="123456789"></div>
<div class="form-group"><label>🌍 منطقه</label><select id="countrySelect"><option value="DE">🇩🇪 آلمان</option><option value="US">🇺🇸 آمریکا</option><option value="UK">🇬🇧 انگلستان</option><option value="FR">🇫🇷 فرانسه</option><option value="SG">🇸🇬 سنگاپور</option><option value="NL">🇳🇱 هلند</option><option value="TR">🇹🇷 ترکیه</option></select></div>
<div class="form-group"><label>📅 مدت اعتبار</label><select id="expiryDays"><option value="7">۷ روز</option><option value="15">۱۵ روز</option><option value="30" selected>۳۰ روز</option><option value="60">۶۰ روز</option><option value="90">۹۰ روز</option></select></div>
<div class="form-group"><label>📊 حجم</label><select id="trafficGB"><option value="5">۵ GB</option><option value="10" selected>۱۰ GB</option><option value="20">۲۰ GB</option><option value="50">۵۰ GB</option><option value="100">۱۰۰ GB</option></select></div>
<button class="btn" onclick="generateConfig()">⚡ ساخت کانفیگ</button>
<div id="statusMsg" style="margin-top:12px;display:none"></div>
</div>
<div class="card"><h3>اطلاعات کاربر</h3><div id="userInfo" style="color:rgba(255,255,255,0.4);text-align:center;padding:30px 0">کانفیگ بسازید</div></div>
</div>
<div class="card"><h3>🔗 لینک اشتراک</h3>
<div style="display:flex;gap:12px"><input type="text" id="subUserId" placeholder="آیدی کاربر" style="flex:1"><button class="btn" onclick="generateSubLink()" style="width:auto;padding:12px 24px">دریافت</button></div>
<div id="subResult" style="margin-top:12px;display:none"><code id="subLink" style="color:#00ff88;word-break:break-all"></code>
<button onclick="copyText(document.getElementById('subLink').textContent)" style="margin-top:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:4px 12px;color:#fff;cursor:pointer">📋 کپی</button></div>
</div>
<div class="card"><h3>🛠️ مدیریت کاربران</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
<div><div class="form-group"><label>🆔 آیدی جدید</label><input type="text" id="newUserId" placeholder="123456789"></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
<div class="form-group"><label>📅 اعتبار</label><input type="number" id="newExpiryDays" value="30"></div>
<div class="form-group"><label>📊 حجم</label><input type="number" id="newTrafficGB" value="10"></div>
</div>
<button class="btn" onclick="addUser()" style="background:linear-gradient(135deg,#00C853,#00E676)">➕ افزودن کاربر</button>
</div>
<div id="statsContent" style="color:rgba(255,255,255,0.4);text-align:center;padding:20px 0">در حال بارگذاری...</div>
</div>
<div style="margin-top:16px"><input type="text" id="userSearch" placeholder="🔍 جستجوی کاربر..." style="width:100%;padding:10px 14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;color:#fff;margin-bottom:12px" oninput="filterUsers()">
<div id="userList" style="color:rgba(255,255,255,0.4);text-align:center;padding:20px 0">در حال بارگذاری...</div>
</div>
</div>
</div>
</div>
<script>
let allUsers={},currentPage=1,pageSize=20;

function showToast(msg,type){const c=document.getElementById('toastContainer')||(function(){const d=document.createElement('div');d.id='toastContainer';d.className='toast-container';document.body.appendChild(d);return d})();const t=document.createElement('div');t.className='toast'+(type==='error'?' error':'')+(type==='info'?' info':'');t.innerHTML='<span>'+msg+'</span><button onclick="this.parentElement.remove()" style="margin-right:auto;background:none;border:none;color:rgba(255,255,255,0.4);cursor:pointer;font-size:16px">✕</button>';c.appendChild(t);setTimeout(()=>{if(t.parentElement)t.remove()},5000)}

function copyText(t){if(!t)return;navigator.clipboard.writeText(t).then(()=>showToast('✅ کپی شد!','success')).catch(()=>showToast('❌ خطا در کپی','error'))}

function login(){const p=document.getElementById('loginPass').value;if(p==='Tentacion'){localStorage.setItem('adminToken',p);document.getElementById('loginSection').style.display='none';document.getElementById('adminPanel').style.display='block';document.getElementById('loginError').style.display='none';loadAdminData();showToast('✅ ورود موفق','success')}else{document.getElementById('loginError').style.display='block'}}

function logout(){localStorage.removeItem('adminToken');location.reload()}

async function generateConfig(){const u=document.getElementById('userId').value.trim();if(!u){showToast('❌ آیدی کاربر الزامی است','error');return}try{const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:u,country:document.getElementById('countrySelect').value,expiryDays:parseInt(document.getElementById('expiryDays').value),trafficGB:parseInt(document.getElementById('trafficGB').value)})});const d=await r.json();if(d.success){showToast('✅ کانفیگ ساخته شد','success');document.getElementById('userInfo').innerHTML='<pre style="color:#00ff88;font-size:12px;word-break:break-all">'+JSON.stringify(d.config,null,2)+'</pre>';loadAdminData()}else{showToast('❌ '+d.error,'error')}}catch(e){showToast('❌ خطا در ارتباط','error')}}

function generateSubLink(){const u=document.getElementById('subUserId').value.trim();if(!u){showToast('❌ آیدی کاربر را وارد کنید','error');return}document.getElementById('subLink').textContent=window.location.origin+'/sub/'+u;document.getElementById('subResult').style.display='block';showToast('✅ لینک ساخته شد','success')}

async function loadAdminData(){try{const r=await fetch('/api/admin/users',{headers:{'Authorization':'Bearer '+(localStorage.getItem('adminToken')||'')}});const d=await r.json();if(d.success){allUsers=d.users||{};renderUserList(allUsers);renderStats(allUsers)}}catch(e){}}

function filterUsers(){const s=document.getElementById('userSearch').value.toLowerCase();if(!s){renderUserList(allUsers);return}const f={};for(const id in allUsers){if(id.toLowerCase().includes(s))f[id]=allUsers[id]}renderUserList(f)}

function renderUserList(users){const div=document.getElementById('userList');const e=Object.entries(users);if(e.length===0){div.innerHTML='<div style="color:rgba(255,255,255,0.4);text-align:center;padding:20px 0">هیچ کاربری یافت نشد</div>';return}const s=(currentPage-1)*pageSize,page=e.slice(s,s+pageSize);let html='';for(const[id,user]of page){const a=user.isActive&&new Date(user.expiryDate)>new Date()&&user.trafficUsed<user.trafficLimit;const c=a?'active':(new Date(user.expiryDate)<=new Date()?'expired':'finished');const t=a?'فعال':(new Date(user.expiryDate)<=new Date()?'منقضی':'تمام');html+='<div style="display:flex;justify-content:space-between;padding:10px 14px;background:rgba(0,0,0,0.2);border-radius:8px;margin-bottom:4px;align-items:center"><span>🆔 '+id+'</span><span style="font-size:12px;color:rgba(255,255,255,0.6)">📅 '+new Date(user.expiryDate).toLocaleDateString('fa-IR')+'</span><span style="font-size:12px;color:rgba(255,255,255,0.6)">📊 '+(Math.round(user.trafficUsed/1024/1024/1024*100)/100)+'/'+(Math.round(user.trafficLimit/1024/1024/1024*100)/100)+' GB</span><span style="padding:2px 10px;border-radius:12px;font-size:11px;'+(a?'background:rgba(0,255,136,0.15);color:#00ff88':'background:rgba(255,68,68,0.15);color:#ff4444')+'">'+t+'</span><button onclick="deleteUser(\''+id+'\')" style="background:rgba(255,68,68,0.2);border:none;border-radius:4px;padding:2px 10px;color:#ff4444;cursor:pointer">🗑️</button></div>'}const tp=Math.ceil(e.length/pageSize);if(tp>1){html+='<div style="display:flex;justify-content:center;gap:6px;margin-top:10px">';for(let i=1;i<=tp;i++){html+='<button onclick="currentPage='+i+';filterUsers()" style="padding:4px 12px;background:'+(i===currentPage?'var(--primary)':'rgba(255,255,255,0.05)')+';border:1px solid rgba(255,255,255,0.08);border-radius:6px;color:#fff;cursor:pointer">'+i+'</button>'}html+='</div>'}div.innerHTML=html}

function renderStats(users){const t=Object.keys(users).length;let a=0,tr=0;for(const id in users){const u=users[id];if(u.isActive&&new Date(u.expiryDate)>new Date()&&u.trafficUsed<u.trafficLimit)a++;tr+=(u.trafficLimit-u.trafficUsed)}document.getElementById('statTotal').textContent=t;document.getElementById('statActive').textContent=a;document.getElementById('statTraffic').textContent=(Math.round(tr/1024/1024/1024*100)/100)+' GB'}

async function deleteUser(id){if(!confirm('حذف کاربر '+id+'؟'))return;try{const r=await fetch('/api/admin/delete',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+(localStorage.getItem('adminToken')||'')},body:JSON.stringify({userId:id})});const d=await r.json();if(d.success){showToast('✅ حذف شد','success');loadAdminData()}else{showToast('❌ '+d.error,'error')}}catch(e){showToast('❌ خطا','error')}}

async function addUser(){const u=document.getElementById('newUserId').value.trim(),ed=parseInt(document.getElementById('newExpiryDays').value),tg=parseInt(document.getElementById('newTrafficGB').value);if(!u){showToast('❌ آیدی را وارد کنید','error');return}try{const r=await fetch('/api/admin/add',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+(localStorage.getItem('adminToken')||'')},body:JSON.stringify({userId:u,expiryDays:ed,trafficGB:tg})});const d=await r.json();if(d.success){showToast('✅ کاربر اضافه شد','success');loadAdminData();document.getElementById('newUserId').value=''}else{showToast('❌ '+d.error,'error')}}catch(e){showToast('❌ خطا','error')}}

setInterval(()=>{if(document.getElementById('adminPanel').style.display!=='none')loadAdminData()},30000);
document.addEventListener('DOMContentLoaded',function(){if(localStorage.getItem('adminToken')==='Tentacion'){document.getElementById('loginSection').style.display='none';document.getElementById('adminPanel').style.display='block';loadAdminData()}});
</script>
</body></html>`;

// ============================================================
// ===== WORKER اصلی =====
// ============================================================
export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;

      if (!env.KV) {
        return new Response(JSON.stringify({ error: 'KV تنظیم نشده' }), {
          status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
        });
      }

      const ENV_VARS = {
        UUID: env.UUID || '90cd4a77-141a-43c9-991b-08263cfe9c10',
        TR_PASS: env.TR_PASS || 'Tentacion',
        PROXYIP: env.PROXYIP || 'cdn.cloudflare.net',
        ADMIN_PASS: env.ADMIN_PASS || 'Tentacion',
        DEFAULT_EXPIRY_DAYS: parseInt(env.DEFAULT_EXPIRY_DAYS) || 30,
        DEFAULT_TRAFFIC_LIMIT: parseInt(env.DEFAULT_TRAFFIC_LIMIT) || 10,
        ENABLE_VLESS: env.ENABLE_VLESS !== 'false',
        ENABLE_TROJAN: env.ENABLE_TROJAN !== 'false',
        ENABLE_VMESS: env.ENABLE_VMESS !== 'false',
        ENABLE_FRAGMENT: env.ENABLE_FRAGMENT !== 'false',
        ENABLE_ECH: env.ENABLE_ECH !== 'false',
        ENABLE_WARP: env.ENABLE_WARP !== 'false'
      };

      const userManager = new UserManager(env.KV, env.DB, ctx);
      const configGenerator = new ConfigGenerator(ENV_VARS);

      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
      }

      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

      // ===== API: Login =====
      if (path === '/api/admin/login' && request.method === 'POST') {
        try {
          const body = await request.json();
          if (body.password === ENV_VARS.ADMIN_PASS) {
            return createCorsResponse({ success: true, token: ENV_VARS.ADMIN_PASS });
          }
          return createCorsResponse({ success: false, error: 'رمز اشتباه' }, 401);
        } catch (e) {
          return createCorsResponse({ success: false, error: e.message }, 500);
        }
      }

      // ===== API: Generate =====
      if (path === '/api/generate' && request.method === 'POST') {
        if (!await checkRateLimit(env, ip, 'generate')) {
          return createCorsResponse({ success: false, error: 'محدودیت درخواست' }, 429);
        }
        try {
          const body = await request.json();
          const { userId, country, expiryDays, trafficGB, operator } = body;
          if (!userId) return createCorsResponse({ success: false, error: 'آیدی کاربر الزامی است' }, 400);

          let user = await userManager.getUser(userId);
          if (!user) {
            const r = await userManager.createUser(userId, expiryDays || ENV_VARS.DEFAULT_EXPIRY_DAYS, trafficGB || ENV_VARS.DEFAULT_TRAFFIC_LIMIT);
            if (!r.success) return createCorsResponse(r, 400);
            user = r.user;
          } else {
            const r = await userManager.renewUser(userId, expiryDays || ENV_VARS.DEFAULT_EXPIRY_DAYS, trafficGB || ENV_VARS.DEFAULT_TRAFFIC_LIMIT, false);
            if (!r.success) return createCorsResponse(r, 400);
            user = r.user;
          }

          let finalCountry = country || 'DE';
          if (operator && OPERATOR_CONFIG[operator]) {
            finalCountry = OPERATOR_CONFIG[operator].country || finalCountry;
          }
          user.country = finalCountry;

          const users = await userManager.getUsers();
          users[userId] = user;
          await userManager.saveUsers(users);

          const config = configGenerator.generateFullConfig(userId, user, operator || '');
          return createCorsResponse({ success: true, config });
        } catch (e) {
          return createCorsResponse({ success: false, error: e.message }, 500);
        }
      }

      // ===== API: Admin Users =====
      if (path === '/api/admin/users' && request.method === 'GET') {
        if (!checkAdminAuth(request, ENV_VARS.ADMIN_PASS)) {
          return createCorsResponse({ error: 'Unauthorized' }, 401);
        }
        try {
          const users = await userManager.getUsers();
          return createCorsResponse({ success: true, users });
        } catch (e) {
          return createCorsResponse({ success: false, error: e.message }, 500);
        }
      }

      // ===== API: Admin Add =====
      if (path === '/api/admin/add' && request.method === 'POST') {
        if (!checkAdminAuth(request, ENV_VARS.ADMIN_PASS)) {
          return createCorsResponse({ error: 'Unauthorized' }, 401);
        }
        try {
          const body = await request.json();
          const r = await userManager.createUser(body.userId, body.expiryDays || ENV_VARS.DEFAULT_EXPIRY_DAYS, body.trafficGB || ENV_VARS.DEFAULT_TRAFFIC_LIMIT);
          return createCorsResponse(r);
        } catch (e) {
          return createCorsResponse({ success: false, error: e.message }, 500);
        }
      }

      // ===== API: Admin Delete =====
      if (path === '/api/admin/delete' && request.method === 'POST') {
        if (!checkAdminAuth(request, ENV_VARS.ADMIN_PASS)) {
          return createCorsResponse({ error: 'Unauthorized' }, 401);
        }
        try {
          const body = await request.json();
          const r = await userManager.deleteUser(body.userId);
          return createCorsResponse(r);
        } catch (e) {
          return createCorsResponse({ success: false, error: e.message }, 500);
        }
      }

      // ===== Subscription =====
      if (path.startsWith('/sub/')) {
        const segments = path.split('/');
        const userId = segments[2];
        if (!userId) return new Response('User ID required', { status: 400, headers: CORS_HEADERS });

        const user = await userManager.getUser(userId);
        if (!user) return new Response('User not found', { status: 404, headers: CORS_HEADERS });

        const validity = await userManager.checkUserValidity(userId);
        if (!validity.valid) return new Response(validity.reason, { status: 403, headers: CORS_HEADERS });

        const config = configGenerator.generateFullConfig(userId, user);
        const content = config.links.map(l => l.link).join('\n');
        return new Response(base64Encode(content), {
          headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-cache', ...CORS_HEADERS }
        });
      }

      // ===== Panel =====
      if (path === '/' || path === '/TaaKaa' || path === '/taakaa') {
        return new Response(HTML_PANEL, {
          headers: { 'Content-Type': 'text/html; charset=utf-8', ...CORS_HEADERS }
        });
      }

      // ===== Health =====
      if (path === '/health') {
        return new Response('OK', { status: 200, headers: CORS_HEADERS });
      }

      return new Response('Not Found', { status: 404, headers: CORS_HEADERS });
    } catch (error) {
      console.error('Worker Error:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      });
    }
  }
};
