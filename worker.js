// =============================================
// TaaKaa-Xi PRO v16.5 - شخصی‌سازی شده
// بخش ۱: Core System + Polyfills + Constants
// =============================================

// ==================== Core System ====================
const TaaKaa = {
  version: 'v16.5-pro',
  brand: 'TaaKaa-Xi',
  colors: { 
    primary: '#ff6b00', 
    secondary: '#0a0a0f',
    gradient: 'linear-gradient(135deg, #ff6b00, #ff8c42)'
  },
  defaultPass: 'taakaa',
  apiRoute: 'taakaa',
  createdAt: Date.now()
};

// ==================== Polyfills ====================
function b64e(s) {
  const e = new TextEncoder();
  const d = e.encode(s);
  let b = '';
  for (let i = 0; i < d.length; i++) b += String.fromCharCode(d[i]);
  return btoa(b);
}

function b64d(s) {
  const b = atob(s);
  const bytes = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) bytes[i] = b.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function genUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function valUUID(u) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(u);
}

// ==================== Constants ====================
const SYSTEM_CONFIG = {
  ADMIN_PASSWORD_HASH: null,
  TOTP_SECRET: genUUID(),
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_MINUTES: 5,
  SESSION_EXPIRY: 86400,
  PROTOCOLS: ['vless', 'trojan', 'shadowsocks'],
  DEFAULT_PROTOCOL: 'vless',
  ENCRYPTION: 'aes-256-gcm',
  PORTS: [443, 8443, 2053, 2083, 2087, 2096],
  SNI_LIST: [
    'www.google.com', 'www.cloudflare.com', 'www.microsoft.com',
    'www.apple.com', 'www.amazon.com', 'speed.cloudflare.com',
    'cdn.jsdelivr.net', 'www.bing.com'
  ],
  FINGERPRINTS: [
    'chrome', 'firefox', 'safari', 'edge', 'ios', 'android',
    'random', 'randomized', 'chrome_120', 'firefox_120',
    'safari_17', 'edge_120'
  ],
  FRAGMENT_ENABLED: true,
  FRAGMENT_SIZE: '1-5',
  FRAGMENT_COUNT: 3,
  FRAGMENT_DELAY: '1-3',
  WARP_ENABLED: false,
  WARP_PRO_ENABLED: false,
  ECH_ENABLED: true,
  OPERATORS: { mci: 'همراه اول', mtn: 'ایرانسل', rtl: 'رایتل' },
  DEFAULT_QUOTA: 5 * 1024 * 1024 * 1024,
  DEFAULT_DAILY_QUOTA: 1 * 1024 * 1024 * 1024,
  DEFAULT_EXPIRY_DAYS: 30,
  DNS_OVER_HTTPS: 'https://cloudflare-dns.com/dns-query',
  PROXY_FALLBACK_ENABLED: true,
  PROXY_CACHE_ENABLED: true,
  HOST_POOL: [],
  // TaaKaa-Xi اضافات
  CLEAN_IPS: '',
  OFFLINE_MODE: false,
  BRAND: 'TaaKaa-Xi',
  THEME: 'orange-dark'
};

// ==================== Crypto Utils ====================
async function hashPass(p) {
  const e = new TextEncoder();
  const d = e.encode(p + 'taakaa-salt-v16-pro-2024');
  const h = await crypto.subtle.digest('SHA-256', d);
  return Array.from(new Uint8Array(h)).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
}

async function verifyPass(p, h) {
  const ih = await hashPass(p);
  return ih === h;
}

function genToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
}

function genTOTP(secret) {
  const time = Math.floor(Date.now() / 30000);
  let hash = 0;
  const combined = secret + time.toString();
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash) + combined.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 1000000).toString().padStart(6, '0');
}

function verifyTOTP(token, secret) {
  const expected = genTOTP(secret);
  if (token === expected) return true;
  const prevTime = Math.floor((Date.now() - 30000) / 30000);
  let prevHash = 0;
  const prevCombined = secret + prevTime.toString();
  for (let i = 0; i < prevCombined.length; i++) {
    prevHash = ((prevHash << 5) - prevHash) + prevCombined.charCodeAt(i);
    prevHash |= 0;
  }
  const prevToken = (Math.abs(prevHash) % 1000000).toString().padStart(6, '0');
  return token === prevToken;
}

// ==================== Parser ====================
function parseBytes(input) {
  const str = String(input).toLowerCase().trim();
  const match = str.match(/^(\d+(?:\.\d+)?)\s*(pb|pt|tb|t|gb|g|mb|m|kb|k|b)?$/);
  if (!match) return SYSTEM_CONFIG.DEFAULT_QUOTA;
  const value = parseFloat(match[1]);
  const unit = (match[2] || 'gb').replace('pt', 'pb');
  const mult = {
    'b': 1, 'k': 1024, 'kb': 1024,
    'm': 1048576, 'mb': 1048576,
    'g': 1073741824, 'gb': 1073741824,
    't': 1099511627776, 'tb': 1099511627776,
    'p': 1125899906842624, 'pb': 1125899906842624
  };
  return Math.floor(value * (mult[unit] || mult['gb']));
}

function formatBytes(bytes) {
  if (bytes >= 1099511627776) return (bytes / 1099511627776).toFixed(2) + ' TB';
  if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + ' GB';
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
  if (bytes >= 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return bytes + ' B';
}

function parseDuration(input) {
  const str = String(input).toLowerCase().trim();
  const match = str.match(/^(\d+)\s*(y|year|years|m|month|months|d|day|days)?$/);
  if (!match) return SYSTEM_CONFIG.DEFAULT_EXPIRY_DAYS;
  const value = parseInt(match[1]);
  const unit = match[2] || 'd';
  const mult = { 'd': 1, 'day': 1, 'days': 1, 'm': 30, 'month': 30, 'months': 30, 'y': 365, 'year': 365, 'years': 365 };
  return value * (mult[unit] || 1);
}

function formatDuration(days) {
  if (days >= 365) {
    const y = Math.floor(days / 365);
    const m = Math.floor((days % 365) / 30);
    return y + ' سال' + (m > 0 ? ' و ' + m + ' ماه' : '');
  }
  if (days >= 30) {
    const m = Math.floor(days / 30);
    const d = days % 30;
    return m + ' ماه' + (d > 0 ? ' و ' + d + ' روز' : '');
  }
  return days + ' روز';
}

function getCookie(cookieHeader, name) {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].trim().split('=');
    if (parts[0] === name) return decodeURIComponent(parts[1] || '');
  }
  return null;
}
// =============================================
// TaaKaa-Xi PRO v16.5 - شخصی‌سازی شده
// بخش ۲: Storage Manager + Offline Cache
// =============================================

// ==================== Storage Manager ====================
class StorageManager {
  constructor(env) {
    // تغییر اسم KV و D1 به TAAKAA
    this.kv = env.TAAKAA_KV;
    this.d1 = env.TAAKAA_DB || null;
    this.memCache = {};
    this.offlineCache = {};
    
    // بارگذاری کش آفلاین از localStorage
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('taakaa_offline_cache');
        if (saved) {
          this.offlineCache = JSON.parse(saved);
        }
      }
    } catch (e) {}
  }

  async get(key) {
    // چک کردن کش حافظه
    if (this.memCache[key] && this.memCache[key].exp > Date.now()) {
      return this.memCache[key].data;
    }
    
    try {
      let data = await this.kv.get(key, 'json');
      if (data) {
        this.memCache[key] = { data: data, exp: Date.now() + 30000 };
        this._saveToOfflineCache(key, data);
        return data;
      }
      
      if (this.d1) {
        const result = await this.d1.prepare('SELECT value FROM storage WHERE key = ?').bind(key).first();
        if (result && result.value) {
          data = JSON.parse(result.value);
          this.memCache[key] = { data: data, exp: Date.now() + 30000 };
          this._saveToOfflineCache(key, data);
          return data;
        }
      }
    } catch (e) {
      console.error('Storage.get error:', e);
      // در صورت خطا، از کش آفلاین استفاده کن
      if (this.offlineCache[key]) {
        console.log('📡 Using offline cache for:', key);
        return this.offlineCache[key];
      }
    }
    
    // اگر هیچ داده‌ای نبود، از کش آفلاین برگردون
    if (this.offlineCache[key]) {
      return this.offlineCache[key];
    }
    
    return null;
  }

  async put(key, value, ttl) {
    const keys = Object.keys(this.memCache);
    if (keys.length > 500) {
      delete this.memCache[keys[0]];
    }
    
    this.memCache[key] = { data: value, exp: Date.now() + 30000 };
    this._saveToOfflineCache(key, value);
    
    try {
      await this.kv.put(key, JSON.stringify(value), {
        expirationTtl: ttl || SYSTEM_CONFIG.SESSION_EXPIRY
      });
      
      if (this.d1) {
        await this.d1.prepare(
          'INSERT OR REPLACE INTO storage (key, value, updated_at) VALUES (?, ?, ?)'
        ).bind(key, JSON.stringify(value), Date.now()).run();
      }
      return true;
    } catch (e) {
      console.error('Storage.put error:', e);
      // داده در کش آفلاین ذخیره شده، پس true برگردون
      return true;
    }
  }

  async delete(key) {
    delete this.memCache[key];
    delete this.offlineCache[key];
    this._saveOfflineCacheToStorage();
    
    try {
      await this.kv.delete(key);
      if (this.d1) {
        await this.d1.prepare('DELETE FROM storage WHERE key = ?').bind(key).run();
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async list(prefix) {
    try {
      const result = await this.kv.list({ prefix: prefix, limit: 1000 });
      return result.keys.map(function(k) { return k.name; });
    } catch (e) {
      // از کش آفلاین استفاده کن
      const keys = Object.keys(this.offlineCache).filter(k => k.startsWith(prefix));
      return keys;
    }
  }

  async getAllUsers() {
    const keys = await this.list('user:');
    const users = [];
    for (let i = 0; i < keys.length; i++) {
      const user = await this.get(keys[i]);
      if (user) users.push(user);
    }
    return users.sort(function(a, b) { return b.createdAt - a.createdAt; });
  }

  async getSystemConfig() {
    const config = await this.get('system:config');
    return config || JSON.parse(JSON.stringify(SYSTEM_CONFIG));
  }

  async saveSystemConfig(config) {
    return await this.put('system:config', config);
  }

  async getAdminPassword() {
    const config = await this.getSystemConfig();
    return config.ADMIN_PASSWORD_HASH || null;
  }

  async isFirstRun() {
    const config = await this.get('system:config');
    return config === null || config === undefined;
  }

  async setup(password) {
    const hash = await hashPassword(password);
    const config = JSON.parse(JSON.stringify(SYSTEM_CONFIG));
    config.ADMIN_PASSWORD_HASH = hash;
    config.setupAt = Date.now();
    config.version = 'v16.5-pro';
    config.brand = 'TaaKaa-Xi';
    await this.put('system:config', config);
    return config;
  }

  // ==================== Offline Cache Helpers ====================
  _saveToOfflineCache(key, value) {
    this.offlineCache[key] = value;
    this._saveOfflineCacheToStorage();
  }

  _saveOfflineCacheToStorage() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('taakaa_offline_cache', JSON.stringify(this.offlineCache));
      }
    } catch (e) {}
  }
      }
// =============================================
// TaaKaa-Xi PRO v16.5 - شخصی‌سازی شده
// بخش ۳: Session + Rate Limiter + User Manager
// =============================================

// ==================== Session Manager ====================
class SessionManager {
  constructor(storage) {
    this.storage = storage;
  }

  async create(userData) {
    const token = generateSessionToken();
    const session = {
      role: userData.role,
      ip: userData.ip,
      token: token,
      createdAt: Date.now(),
      lastAccess: Date.now()
    };
    await this.storage.put('session:' + token, session, SYSTEM_CONFIG.SESSION_EXPIRY);
    return token;
  }

  async validate(token) {
    if (!token) return null;
    const session = await this.storage.get('session:' + token);
    if (!session) return null;
    session.lastAccess = Date.now();
    await this.storage.put('session:' + token, session, SYSTEM_CONFIG.SESSION_EXPIRY);
    return session;
  }

  async destroy(token) {
    if (token) await this.storage.delete('session:' + token);
  }
}

// ==================== Rate Limiter ====================
class RateLimiter {
  constructor(storage) {
    this.storage = storage;
  }

  async check(key, maxAttempts, windowMin) {
    const record = await this.storage.get('ratelimit:' + key) || {
      attempts: 0,
      resetAt: Date.now() + windowMin * 60000
    };
    
    if (Date.now() > record.resetAt) {
      record.attempts = 1;
      record.resetAt = Date.now() + windowMin * 60000;
    } else {
      record.attempts++;
    }
    
    await this.storage.put('ratelimit:' + key, record, windowMin * 60);
    
    return {
      allowed: record.attempts <= maxAttempts,
      remaining: Math.max(0, maxAttempts - record.attempts),
      resetAt: record.resetAt
    };
  }
}

// ==================== User Manager ====================
class UserManager {
  constructor(storage) {
    this.storage = storage;
  }

  async create(data) {
    const uuid = (data.uuid && validateUUID(data.uuid)) ? data.uuid : generateUUID();
    const now = Date.now();
    const expiryDays = parseDuration(data.expiry || '30d');
    
    const user = {
      uuid: uuid,
      name: data.name || 'User-' + uuid.substring(0, 8),
      ip: data.ip || '',
      quotaTotal: parseBytes(data.quota || '5GB'),
      quotaDaily: parseBytes(data.dailyQuota || '1GB'),
      usageTotal: 0,
      dailyUsage: {},
      expiryDays: expiryDays,
      expiryDate: now + (expiryDays * 86400000),
      status: 'active',
      operator: data.operator || 'mtn',
      protocol: data.protocol || 'vless',
      createdAt: now,
      lastAccess: now,
      createdBy: data.adminUser || 'admin'
    };
    
    await this.storage.put('user:' + uuid, user);
    return user;
  }

  async get(uuid) {
    return await this.storage.get('user:' + uuid);
  }

  async update(uuid, updates) {
    const user = await this.get(uuid);
    if (!user) return null;
    
    if (updates.name !== undefined) user.name = updates.name;
    if (updates.ip !== undefined) user.ip = updates.ip;
    if (updates.quota) user.quotaTotal = parseBytes(updates.quota);
    if (updates.dailyQuota) user.quotaDaily = parseBytes(updates.dailyQuota);
    if (updates.expiry) {
      user.expiryDays = parseDuration(updates.expiry);
      user.expiryDate = Date.now() + (user.expiryDays * 86400000);
    }
    if (updates.status) user.status = updates.status;
    if (updates.operator) user.operator = updates.operator;
    if (updates.protocol) user.protocol = updates.protocol;
    
    await this.storage.put('user:' + uuid, user);
    return user;
  }

  async delete(uuid) {
    await this.storage.delete('user:' + uuid);
    return true;
  }

  async toggleStatus(uuid) {
    const user = await this.get(uuid);
    if (!user) return null;
    user.status = user.status === 'active' ? 'suspended' : 'active';
    await this.storage.put('user:' + uuid, user);
    return user;
  }

  async resetUsage(uuid) {
    const user = await this.get(uuid);
    if (!user) return null;
    user.usageTotal = 0;
    user.dailyUsage = {};
    await this.storage.put('user:' + uuid, user);
    return user;
  }

  async getStats(uuid) {
    const user = await this.get(uuid);
    if (!user) return null;
    
    const today = new Date().toISOString().split('T')[0];
    const todayUsage = (user.dailyUsage && user.dailyUsage[today]) ? user.dailyUsage[today] : 0;
    const daysLeft = user.expiryDate ? Math.max(0, Math.ceil((user.expiryDate - Date.now()) / 86400000)) : 0;
    
    return {
      ...user,
      quotaTotalFormatted: formatBytes(user.quotaTotal),
      usageTotalFormatted: formatBytes(user.usageTotal || 0),
      remainingFormatted: formatBytes(Math.max(0, user.quotaTotal - (user.usageTotal || 0))),
      todayUsageFormatted: formatBytes(todayUsage),
      usagePercent: user.quotaTotal > 0 ? Math.min(100, ((user.usageTotal || 0) / user.quotaTotal) * 100).toFixed(1) : '0.0',
      daysLeft: daysLeft,
      isExpired: daysLeft <= 0,
      isQuotaExceeded: (user.usageTotal || 0) >= user.quotaTotal
    };
  }

  async trackBytes(uuid, bytes) {
    if (!bytes || bytes <= 0) return;
    
    const user = await this.get(uuid);
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    if (!user.dailyUsage) user.dailyUsage = {};
    
    user.dailyUsage[today] = (user.dailyUsage[today] || 0) + bytes;
    user.usageTotal = (user.usageTotal || 0) + bytes;
    user.lastAccess = Date.now();
    
    await this.storage.put('user:' + uuid, user);
  }
        }
// =============================================
// TaaKaa-Xi PRO v16.5 - شخصی‌سازی شده
// بخش ۴: Config Generator + Scanner
// =============================================

// ==================== Config Generator ====================
function generateVlessConfig(user, config, domain) {
  const uuid = user.uuid;
  const sni = (config.SNI_LIST && config.SNI_LIST[0]) ? config.SNI_LIST[0] : 'www.google.com';
  const fp = (config.FINGERPRINTS && config.FINGERPRINTS[0]) ? config.FINGERPRINTS[0] : 'chrome';
  const port = (config.PORTS && config.PORTS[0]) ? config.PORTS[0] : 443;
  
  let link = 'vless://' + uuid + '@' + domain + ':' + port + '?';
  link += 'encryption=none&security=tls&sni=' + sni + '&fp=' + fp;
  link += '&type=ws&path=/ws&host=' + domain;
  
  if (config.FRAGMENT_ENABLED) {
    link += '&fragment=' + (config.FRAGMENT_SIZE || '1-5') + '-' + (config.FRAGMENT_COUNT || 3);
  }
  if (config.WARP_ENABLED) link += '&warp=true';
  
  link += '#TaaKaa-Xi-' + encodeURIComponent(user.name);
  return link;
}

function generateTrojanConfig(user, config, domain) {
  const password = user.uuid;
  const sni = (config.SNI_LIST && config.SNI_LIST[0]) ? config.SNI_LIST[0] : 'www.google.com';
  const fp = (config.FINGERPRINTS && config.FINGERPRINTS[0]) ? config.FINGERPRINTS[0] : 'chrome';
  const port = (config.PORTS && config.PORTS[0]) ? config.PORTS[0] : 443;
  
  let link = 'trojan://' + password + '@' + domain + ':' + port + '?';
  link += 'security=tls&sni=' + sni + '&fp=' + fp;
  link += '&type=ws&path=/trojan&host=' + domain;
  link += '#TaaKaa-Xi-' + encodeURIComponent(user.name) + '-Trojan';
  return link;
}

function generateShadowsocksConfig(user, config, domain) {
  const method = 'aes-256-gcm';
  const password = user.uuid.replace(/-/g, '').substring(0, 16);
  const port = (config.PORTS && config.PORTS[0]) ? config.PORTS[0] : 443;
  const raw = method + ':' + password + '@' + domain + ':' + port;
  const encoded = base64Encode(raw);
  return 'ss://' + encoded + '#TaaKaa-Xi-' + encodeURIComponent(user.name) + '-SS';
}

function generateSubscription(user, config, domain) {
  const configs = [
    generateVlessConfig(user, config, domain),
    generateTrojanConfig(user, config, domain),
    generateShadowsocksConfig(user, config, domain)
  ];
  return base64Encode(configs.join('\n'));
}

function generateClashYAML(user, config, domain) {
  const uuid = user.uuid;
  const sni = (config.SNI_LIST && config.SNI_LIST[0]) ? config.SNI_LIST[0] : 'www.google.com';
  
  return 'proxies:\n' +
    '  - name: "TaaKaa-Xi-' + user.name + '-VLESS"\n' +
    '    type: vless\n    server: ' + domain + '\n    port: 443\n    uuid: ' + uuid + '\n' +
    '    network: ws\n    ws-opts:\n      path: /ws\n      headers:\n        Host: ' + domain + '\n' +
    '    tls: true\n    servername: ' + sni + '\n    client-fingerprint: chrome\n\n' +
    '  - name: "TaaKaa-Xi-' + user.name + '-Trojan"\n' +
    '    type: trojan\n    server: ' + domain + '\n    port: 443\n    password: ' + uuid + '\n' +
    '    network: ws\n    ws-opts:\n      path: /trojan\n      headers:\n        Host: ' + domain + '\n' +
    '    tls: true\n    sni: ' + sni + '\n';
}

// ==================== IP Scanner ====================
const TEST_IPS = [
  { ip: '185.143.234.120', operator: 'mtn' },
  { ip: '185.143.233.120', operator: 'mtn' },
  { ip: '5.160.0.10', operator: 'mci' },
  { ip: '2.176.0.10', operator: 'mci' },
  { ip: '46.209.0.10', operator: 'rtl' },
  { ip: '185.143.232.120', operator: 'mtn' },
  { ip: '185.143.231.120', operator: 'mtn' },
  { ip: '5.160.1.10', operator: 'mci' },
  { ip: '5.74.0.10', operator: 'mtn' },
  { ip: '2.176.1.10', operator: 'mci' },
  { ip: '46.209.1.10', operator: 'rtl' },
  { ip: '188.212.0.10', operator: 'rtl' },
  { ip: '91.107.131.10', operator: 'rtl' },
  { ip: '188.121.96.10', operator: 'rtl' },
  { ip: '86.104.0.10', operator: 'mtn' },
  { ip: '86.104.1.10', operator: 'mtn' },
  { ip: '5.160.2.10', operator: 'mci' },
  { ip: '188.212.1.10', operator: 'rtl' },
  { ip: '91.107.130.10', operator: 'rtl' },
  { ip: '188.121.97.10', operator: 'rtl' }
];

async function scanIP(ip, timeout) {
  const to = timeout || 3000;
  const controller = new AbortController();
  const timer = setTimeout(function() { controller.abort(); }, to);
  
  try {
    const start = Date.now();
    const response = await fetch('https://' + ip + '/', {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    clearTimeout(timer);
    
    return { 
      ip: ip, 
      alive: response.status < 500, 
      latency: Date.now() - start,
      status: response.status
    };
  } catch (e) {
    clearTimeout(timer);
    return { 
      ip: ip, 
      alive: false, 
      latency: Infinity, 
      error: e.message 
    };
  }
}

async function quickScan() {
  const results = [];
  for (let i = 0; i < TEST_IPS.length; i++) {
    const r = await scanIP(TEST_IPS[i].ip, 2000);
    r.operator = TEST_IPS[i].operator;
    results.push(r);
  }
  return results.sort(function(a, b) { return a.latency - b.latency; });
}

async function fullScan() {
  const results = [];
  for (let i = 0; i < TEST_IPS.length; i++) {
    const r = await scanIP(TEST_IPS[i].ip, 3000);
    r.operator = TEST_IPS[i].operator;
    results.push(r);
  }
  return results.sort(function(a, b) { return a.latency - b.latency; });
               }
// =============================================
// TaaKaa-Xi PRO v16.5 - شخصی‌سازی شده
// بخش ۵: Proxy Handler + Subscription
// =============================================

// ==================== Proxy Handler ====================
class ProxyHandler {
  constructor(storage) {
    this.storage = storage;
    this.userManager = new UserManager(storage);
  }

  async handle(request, user) {
    const url = new URL(request.url);
    const path = url.pathname;
    const upgrade = request.headers.get('Upgrade') || '';

    if (!this.checkLimits(user)) {
      return new Response('Quota exceeded or suspended', { status: 429 });
    }

    if ((path === '/ws' || path === '/trojan' || path === '/ss') && upgrade.toLowerCase() === 'websocket') {
      return await this.handleWebSocketTunnel(request, user);
    }
    return await this.handleTCP(request, user);
  }

  checkLimits(user) {
    if (user.status !== 'active') return false;
    if (user.expiryDate && Date.now() > user.expiryDate) return false;
    if ((user.usageTotal || 0) >= user.quotaTotal) return false;
    
    const today = new Date().toISOString().split('T')[0];
    const todayUsage = (user.dailyUsage && user.dailyUsage[today]) ? user.dailyUsage[today] : 0;
    if (todayUsage >= user.quotaDaily) return false;
    
    return true;
  }

  async handleWebSocketTunnel(request, user) {
    const pair = new WebSocketPair();
    const clientSocket = pair[0];
    const serverSocket = pair[1];
    serverSocket.accept();
    const self = this;

    serverSocket.addEventListener('message', async function(event) {
      try {
        let bytes = 0;
        if (event.data instanceof ArrayBuffer) {
          bytes = event.data.byteLength;
        } else if (typeof event.data === 'string') {
          bytes = new TextEncoder().encode(event.data).length;
        }
        await self.userManager.trackBytes(user.uuid, bytes);
        serverSocket.send(event.data);
      } catch (e) {
        console.error('WS error:', e);
      }
    });

    serverSocket.addEventListener('close', function() {
      console.log('User ' + user.name + ' disconnected');
    });

    return new Response(null, { status: 101, webSocket: clientSocket });
  }

  async handleTCP(request, user) {
    try {
      const newHeaders = new Headers(request.headers);
      const config = await this.storage.getSystemConfig();
      
      if (config.WARP_ENABLED) {
        newHeaders.set('CF-WARP', 'enabled');
      }
      
      const modifiedRequest = new Request(request.url, {
        method: request.method,
        headers: newHeaders,
        body: request.body,
        redirect: request.redirect
      });
      
      const response = await fetch(modifiedRequest);
      
      const contentLength = parseInt(response.headers.get('Content-Length') || '0');
      if (contentLength > 0) {
        await this.userManager.trackBytes(user.uuid, contentLength);
      }
      
      return response;
    } catch (e) {
      return new Response('Proxy Error', { status: 502 });
    }
  }
}

// ==================== Subscription Handler ====================
async function handleSubscription(request, storage) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path.startsWith('/sub/')) {
    const uuid = path.split('/sub/')[1];
    if (!validateUUID(uuid)) return new Response('Invalid UUID', { status: 400 });
    
    const userManager = new UserManager(storage);
    const user = await userManager.get(uuid);
    if (!user) return new Response('User not found', { status: 404 });
    
    const config = await storage.getSystemConfig();
    const domain = url.hostname;
    const sub = generateSubscription(user, config, domain);
    
    return new Response(sub, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Subscription-Userinfo': 'upload=' + (user.usageTotal || 0) + '; download=' + (user.usageTotal || 0) + '; total=' + user.quotaTotal,
        'Profile-Update-Interval': '12'
      }
    });
  }

  if (path.startsWith('/clash/')) {
    const uuid = path.split('/clash/')[1];
    const userManager = new UserManager(storage);
    const user = await userManager.get(uuid);
    if (!user) return new Response('User not found', { status: 404 });
    
    const config = await storage.getSystemConfig();
    const domain = url.hostname;
    const clash = generateClashYAML(user, config, domain);
    
    return new Response(clash, {
      status: 200,
      headers: { 'Content-Type': 'text/yaml; charset=utf-8' }
    });
  }

  return null;
      }
// =============================================
// TaaKaa-Xi PRO v16.5 - شخصی‌سازی شده
// بخش ۶: CSS Styles (تم نارنجی-مشکی)
// =============================================

function getStyles() {
  return `
    :root {
      --primary: #ff6b00;
      --primary-hover: #e65c00;
      --primary-dark: #cc5500;
      --primary-light: #ff8c42;
      --bg-deep: #0a0a0f;
      --bg-card: #1a1a2e;
      --bg-card-hover: #222244;
      --text: #ffffff;
      --text2: #a0a0b8;
      --text3: #6b6b8a;
      --border: #2a2a3c;
      --border-hover: #3a3a5a;
      --success: #16a34a;
      --danger: #ef4444;
      --warning: #f59e0b;
      --radius: 16px;
      --radius-sm: 10px;
      --shadow: 0 10px 25px rgba(0,0,0,0.5);
      --shadow-glow: 0 0 30px rgba(255,107,0,0.15);
      --gradient-orange: linear-gradient(135deg, #ff6b00, #ff8c42);
      --gradient-dark: linear-gradient(135deg, #0a0a0f, #1a1a2e);
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      background: var(--bg-deep);
      background-image: radial-gradient(circle at 20% 10%, #1a1a2e, #0a0a0f);
      color: var(--text);
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      padding: 20px;
      min-height: 100vh;
      direction: rtl;
      line-height: 1.6;
    }
    
    .container { max-width: 1400px; margin: 0 auto; }
    
    /* ========== Header ========== */
    .header {
      background: rgba(26,26,46,0.8);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px 24px;
      margin-bottom: 20px;
      box-shadow: var(--shadow);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--gradient-orange);
    }
    
    .brand {
      background: var(--gradient-orange);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 1.8rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .brand-icon { -webkit-text-fill-color: initial; color: #ff6b00; }
    
    /* ========== Navigation ========== */
    .nav {
      display: flex;
      gap: 6px;
      background: var(--bg-card);
      padding: 6px;
      border-radius: 40px;
      border: 1px solid var(--border);
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    
    .nav a, .nav button {
      padding: 10px 18px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 14px;
      background: transparent;
      color: var(--text2);
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.3s ease;
      white-space: nowrap;
    }
    
    .nav a.active, .nav button.active {
      background: var(--gradient-orange);
      color: white;
      box-shadow: 0 4px 15px rgba(255,107,0,0.35);
    }
    
    .nav a:hover, .nav button:hover {
      background: rgba(255,107,0,0.15);
      color: var(--text);
    }
    
    /* ========== Cards ========== */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      box-shadow: var(--shadow);
      margin-bottom: 20px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .card:hover {
      transform: translateY(-3px);
      border-color: rgba(255,107,0,0.3);
      box-shadow: var(--shadow), var(--shadow-glow);
    }
    
    /* ========== Grids ========== */
    .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 20px; }
    .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px; }
    .grid3 { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 20px; margin-bottom: 20px; }
    
    /* ========== Stat Values ========== */
    .stat-val {
      font-size: 2rem;
      font-weight: 800;
      background: var(--gradient-orange);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 10px 0;
      line-height: 1.2;
    }
    
    .stat-label { color: var(--text2); font-size: 13px; font-weight: 500; }
    
    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
      box-shadow: var(--shadow);
      transition: all 0.3s ease;
    }
    
    .stat-card:hover {
      border-color: rgba(255,107,0,0.3);
      transform: translateY(-2px);
    }
    
    /* ========== Buttons ========== */
    .btn {
      background: var(--gradient-orange);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 30px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(255,107,0,0.25);
      font-size: 14px;
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(255,107,0,0.4);
    }
    
    .btn-sm { padding: 6px 14px; font-size: 13px; border-radius: 20px; }
    
    .btn-outline {
      background: transparent;
      border: 2px solid var(--primary);
      color: var(--primary);
      box-shadow: none;
    }
    
    .btn-outline:hover {
      background: var(--primary);
      color: white;
    }
    
    .btn-danger {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      box-shadow: 0 4px 15px rgba(239,68,68,0.3);
    }
    
    .btn-warn {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      box-shadow: 0 4px 15px rgba(245,158,11,0.3);
    }
    
    .btn-success {
      background: linear-gradient(135deg, #16a34a, #15803d);
      box-shadow: 0 4px 15px rgba(22,163,74,0.3);
    }
    
    /* ========== Tables ========== */
    table { width: 100%; border-collapse: collapse; }
    
    th, td {
      padding: 12px 16px;
      text-align: right;
      border-bottom: 1px solid var(--border);
    }
    
    th {
      color: var(--text2);
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    td { font-size: 14px; }
    
    tr:hover td { background: rgba(255,255,255,0.02); }
    
    /* ========== Badges ========== */
    .badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    }
    
    .badge-ok { background: rgba(22,163,74,0.15); color: var(--success); }
    .badge-err { background: rgba(239,68,68,0.15); color: var(--danger); }
    .badge-warn { background: rgba(245,158,11,0.15); color: var(--warning); }
    .badge-primary { background: rgba(255,107,0,0.15); color: var(--primary); }
    
    /* ========== Progress Bar ========== */
    .progress {
      height: 8px;
      background: #2a2a3c;
      border-radius: 10px;
      overflow: hidden;
      margin: 5px 0;
    }
    
    .progress-fill {
      height: 100%;
      background: var(--gradient-orange);
      border-radius: 10px;
      transition: width 0.6s ease;
    }
    
    .progress-fill.danger { background: linear-gradient(90deg, #ef4444, #dc2626); }
    .progress-fill.warning { background: linear-gradient(90deg, #f59e0b, #d97706); }
    
    /* ========== Form Elements ========== */
    input, select, textarea {
      width: 100%;
      padding: 12px 16px;
      background: var(--bg-deep);
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: var(--radius-sm);
      font-size: 14px;
      margin: 8px 0;
      font-family: inherit;
      transition: all 0.3s ease;
    }
    
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(255,107,0,0.1);
    }
    
    input::placeholder, textarea::placeholder { color: var(--text3); }
    
    label {
      color: var(--text2);
      font-size: 13px;
      font-weight: 500;
      display: block;
      margin-bottom: 4px;
    }
    
    /* ========== Toggle Switch ========== */
    .toggle {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 26px;
      flex-shrink: 0;
    }
    
    .toggle input { opacity: 0; width: 0; height: 0; }
    
    .toggle .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #3a3a4a;
      transition: 0.3s ease;
      border-radius: 34px;
    }
    
    .toggle .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background: white;
      transition: 0.3s ease;
      border-radius: 50%;
    }
    
    .toggle input:checked + .slider { background: var(--gradient-orange); }
    .toggle input:checked + .slider:before { transform: translateX(22px); }
    
    /* ========== Modal ========== */
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 1000;
      align-items: center;
      justify-content: center;
    }
    
    .modal-overlay.active { display: flex; }
    
    .modal {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      max-height: 90vh;
      overflow-y: auto;
      animation: modalSlideIn 0.3s ease;
    }
    
    @keyframes modalSlideIn {
      from { opacity: 0; transform: scale(0.95) translateY(20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    
    .modal h3 {
      margin-bottom: 20px;
      color: var(--text);
      font-size: 1.3rem;
      font-weight: 700;
    }
    
    /* ========== Flex Utilities ========== */
    .flex { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
    .flex-start { justify-content: flex-start; }
    .flex-end { justify-content: flex-end; }
    .flex-wrap { flex-wrap: wrap; }
    .flex-center { display: flex; align-items: center; justify-content: center; gap: 10px; }
    .gap-5 { gap: 5px; }
    .gap-10 { gap: 10px; }
    .gap-15 { gap: 15px; }
    .gap-20 { gap: 20px; }
    
    /* ========== Spacing ========== */
    .mt-10 { margin-top: 10px; }
    .mt-20 { margin-top: 20px; }
    .mt-30 { margin-top: 30px; }
    .mb-10 { margin-bottom: 10px; }
    .mb-20 { margin-bottom: 20px; }
    .mb-30 { margin-bottom: 30px; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    
    /* ========== Text ========== */
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .text-left { text-align: left; }
    .text-muted { color: var(--text2); }
    .text-primary { color: var(--primary); }
    .text-success { color: var(--success); }
    .text-danger { color: var(--danger); }
    .text-warning { color: var(--warning); }
    
    /* ========== Code Block ========== */
    .code-block {
      background: var(--bg-deep);
      padding: 16px;
      border-radius: var(--radius-sm);
      font-family: 'Courier New', monospace;
      direction: ltr;
      text-align: left;
      overflow-x: auto;
      font-size: 13px;
      border: 1px solid var(--border);
      word-break: break-all;
      max-height: 200px;
    }
    
    /* ========== Animations ========== */
    .fade-in { animation: fadeIn 0.5s ease; }
    .pulse { animation: pulse 2s infinite; }
    .slide-in { animation: slideIn 0.3s ease; }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    /* ========== Toast ========== */
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow);
      z-index: 9999;
      animation: slideIn 0.3s ease;
      display: flex;
      align-items: center;
      gap: 12px;
      max-width: 400px;
      font-weight: 500;
    }
    
    .toast-success { border-right: 4px solid var(--success); }
    .toast-error { border-right: 4px solid var(--danger); }
    .toast-warning { border-right: 4px solid var(--warning); }
    .toast-info { border-right: 4px solid var(--primary); }
    
    /* ========== Scanner ========== */
    .scanner-result {
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
    }
    
    .scanner-result:hover { border-color: var(--primary); }
    .scanner-result .ip { font-family: monospace; font-size: 14px; color: var(--text); }
    .scanner-result .latency { font-size: 13px; color: var(--text2); }
    .scanner-result .status { font-size: 13px; font-weight: 600; }
    .scanner-result .status.alive { color: var(--success); }
    .scanner-result .status.dead { color: var(--danger); }
    
    /* ========== Offline Indicator ========== */
    .offline-indicator {
      display: none;
      background: rgba(239,68,68,0.15);
      border: 1px solid rgba(239,68,68,0.3);
      color: var(--danger);
      padding: 8px 16px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 500;
      align-items: center;
      gap: 8px;
    }
    
    .offline-indicator.show { display: inline-flex; }
    
    /* ========== nginx 404 ========== */
    .nginx-404 {
      text-align: center;
      padding: 60px 20px;
    }
    
    .nginx-404 .logo {
      font-size: 48px;
      font-weight: bold;
      color: #ff6b00;
      margin-bottom: 20px;
    }
    
    .nginx-404 .logo span { color: #ffffff; }
    .nginx-404 h1 { font-size: 72px; color: #ff6b00; margin: 20px 0; }
    .nginx-404 p { color: #a0a0b8; font-size: 18px; margin: 10px 0; }
    
    /* ========== Responsive ========== */
    @media (max-width: 1024px) {
      .grid3 { grid-template-columns: 1fr 1fr; }
    }
    
    @media (max-width: 768px) {
      .grid4 { grid-template-columns: repeat(2, 1fr); }
      .grid2, .grid3 { grid-template-columns: 1fr; }
      .header { flex-direction: column; text-align: center; }
      .brand { font-size: 1.4rem; }
      .nav {
        overflow-x: auto;
        flex-wrap: nowrap;
        border-radius: 20px;
        padding: 4px;
        gap: 4px;
      }
      .nav a, .nav button { padding: 8px 12px; font-size: 12px; }
      body { padding: 10px; }
      .card { padding: 16px; }
    }
    
    @media (max-width: 480px) {
      .grid4 { grid-template-columns: 1fr; }
      .stat-val { font-size: 1.5rem; }
      .modal { padding: 20px; width: 95%; }
      .toast { right: 10px; left: 10px; top: 10px; max-width: none; }
    }
  `;
}

// ==================== JS Helper ====================
function getJS() {
  return `
    function showToast(msg, type) {
      var t = document.createElement('div');
      t.className = 'toast toast-' + (type || 'info');
      t.innerHTML = msg;
      document.body.appendChild(t);
      setTimeout(function() {
        t.style.opacity = '0';
        t.style.transform = 'translateX(50px)';
        setTimeout(function() { t.remove(); }, 300);
      }, 3000);
    }
    
    function openModal(id) {
      document.getElementById(id).classList.add('active');
    }
    
    function closeModal(id) {
      document.getElementById(id).classList.remove('active');
    }
    
    function copyText(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          showToast('✅ کپی شد!', 'success');
        });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        showToast('✅ کپی شد!', 'success');
      }
    }
    
    async function api(url, method, body) {
      var o = { method: method || 'GET', headers: {} };
      if (body) {
        o.headers['Content-Type'] = 'application/json';
        o.body = JSON.stringify(body);
      }
      var r = await fetch(url, o);
      return await r.json();
    }
    
    async function toggleUser(uuid) {
      var r = await api('/taakaa/api/toggle-user', 'POST', { uuid: uuid });
      if (r.success) {
        showToast('وضعیت تغییر کرد', 'success');
        setTimeout(function(){ location.reload(); }, 500);
      } else {
        showToast(r.error || 'خطا', 'error');
      }
    }
    
    async function deleteUser(uuid) {
      if (!confirm('آیا مطمئن هستید؟')) return;
      var r = await api('/taakaa/api/delete-user', 'POST', { uuid: uuid });
      if (r.success) {
        showToast('کاربر حذف شد', 'success');
        setTimeout(function(){ location.reload(); }, 500);
      } else {
        showToast(r.error || 'خطا', 'error');
      }
    }
    
    async function resetUsage(uuid) {
      var r = await api('/taakaa/api/reset-usage', 'POST', { uuid: uuid });
      if (r.success) {
        showToast('مصرف ریست شد', 'success');
        setTimeout(function(){ location.reload(); }, 500);
      } else {
        showToast(r.error || 'خطا', 'error');
      }
    }
    
    // ========== Scanner ==========
    async function quickScan() {
      var resultsDiv = document.getElementById('scan-results');
      if (!resultsDiv) return;
      
      resultsDiv.innerHTML = '<div class="pulse text-center" style="padding:30px;">⏳ در حال اسکن...</div>';
      
      try {
        var r = await api('/taakaa/api/quick-scan');
        if (r.success) {
          var html = '<div class="mb-20"><h4>نتایج اسکن:</h4></div>';
          
          var aliveCount = r.results.filter(function(x) { return x.alive; }).length;
          html += '<div class="flex" style="margin-bottom:15px;">' +
                  '<span>✅ زنده: ' + aliveCount + '</span>' +
                  '<span>❌ مرده: ' + (r.results.length - aliveCount) + '</span>' +
                  '</div>';
          
          html += '<div style="max-height:400px;overflow-y:auto;">';
          r.results.forEach(function(x) {
            var statusClass = x.alive ? 'alive' : 'dead';
            var statusText = x.alive ? '✅ زنده' : '❌ مرده';
            var latencyText = x.alive ? x.latency + 'ms' : '—';
            
            html += '<div class="scanner-result">' +
                    '<span class="ip">' + x.ip + '</span>' +
                    '<span class="latency">' + latencyText + '</span>' +
                    '<span class="status ' + statusClass + '">' + statusText + '</span>' +
                    '<button class="btn btn-sm" onclick="applyIP(\'' + x.ip + '\')">اعمال</button>' +
                    '</div>';
          });
          html += '</div>';
          
          if (r.bestIP) {
            html += '<div class="mt-20" style="background:var(--bg-deep);padding:16px;border-radius:var(--radius-sm);border:1px solid var(--primary);">' +
                    '🌟 بهترین IP: <strong>' + r.bestIP.ip + '</strong> (' + r.bestIP.latency + 'ms)' +
                    ' <button class="btn btn-sm" onclick="applyIP(\'' + r.bestIP.ip + '\')">اعمال</button>' +
                    '</div>';
          }
          
          resultsDiv.innerHTML = html;
        } else {
          resultsDiv.innerHTML = '<div style="color:var(--danger);">❌ خطا در اسکن</div>';
        }
      } catch(e) {
        resultsDiv.innerHTML = '<div style="color:var(--danger);">❌ خطا: ' + e.message + '</div>';
      }
    }
    
    function applyIP(ip) {
      var input = document.getElementById('clean-ips-input');
      if (input) {
        var current = input.value.trim();
        if (current) {
          input.value = current + '\\n' + ip;
        } else {
          input.value = ip;
        }
        showToast('IP ' + ip + ' اضافه شد', 'success');
      }
    }
    
    // ========== Offline Detection ==========
    function checkOnlineStatus() {
      var indicator = document.getElementById('offline-indicator');
      if (!indicator) return;
      
      if (!navigator.onLine) {
        indicator.classList.add('show');
        indicator.innerHTML = '📡 حالت آفلاین - نمایش داده‌های کش شده';
      } else {
        indicator.classList.remove('show');
      }
    }
    
    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);
    
    document.addEventListener('DOMContentLoaded', function() {
      checkOnlineStatus();
    });
  `;
}

// ==================== HTML Wrapper ====================
function wrapHTML(content, title) {
  return '<!DOCTYPE html>\n<html lang="fa" dir="rtl">\n<head>\n' +
    '<meta charset="UTF-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '<title>' + title + '</title>\n' +
    '<style>' + getStyles() + '</style>\n' +
    '</head>\n<body>\n' +
    '<div class="container">\n' + content + '\n</div>\n' +
    '<script>' + getJS() + '</script>\n' +
    '</body>\n</html>';
}

// ==================== nginx 404 Page ====================
function nginx404Page() {
  return `
    <div class="nginx-404">
      <div class="logo">
        <span>nginx</span>/TaaKaa-Xi
      </div>
      <h1>404</h1>
      <p>صفحه مورد نظر یافت نشد</p>
      <p style="font-size:14px;color:#6b6b8a;">The page you are looking for does not exist.</p>
      <a href="/taakaa" class="btn" style="margin-top:30px;">🏠 بازگشت به صفحه اصلی</a>
      <div style="margin-top:40px;color:#3a3a4a;font-size:13px;">
        <p>TaaKaa-Xi PRO v16.5 &bull; @TaaKaaOrg</p>
      </div>
    </div>
  `;
}

// ==================== Welcome to nginx Page ====================
function nginxWelcomePage() {
  return `
    <div style="text-align:center;padding:60px 20px;">
      <div style="font-size:48px;font-weight:bold;color:#ff6b00;margin-bottom:20px;">
        <span style="color:#ffffff;">welcome to</span> nginx
      </div>
      <p style="color:#a0a0b8;font-size:18px;margin:20px 0;">
        🚀 TaaKaa-Xi Gateway is ready<br>
        برای دسترسی به پنل مدیریت، <strong style="color:#ff6b00;">/taakaa</strong> را به آدرس اضافه کنید
      </p>
      <div style="margin-top:30px;padding:20px;background:var(--bg-card);border-radius:var(--radius);border:1px solid var(--border);display:inline-block;">
        <code style="color:#ff6b00;font-size:16px;">https://your-domain.workers.dev/taakaa</code>
      </div>
      <div style="margin-top:40px;color:#3a3a4a;font-size:13px;">
        <p>TaaKaa-Xi PRO v16.5 &bull; @TaaKaaOrg</p>
      </div>
    </div>
  `;
}
// =============================================
// TaaKaa-Xi PRO v16.5 - شخصی‌سازی شده
// بخش ۷: Pages + Export Default
// =============================================

// ==================== Pages ====================

// ===== Login Page =====
function loginPage(error) {
  var errorHTML = error ? '<div class="card" style="border:1px solid var(--danger);color:var(--danger);text-align:center;">' + error + '</div>' : '';
  
  var content = `
    <div class="header fade-in">
      <div class="brand">
        <span class="brand-icon">⚡</span> TaaKaa-Xi PRO v16.5
      </div>
      <span style="color:var(--text2);">🔐 ورود به پنل مدیریت</span>
    </div>
    
    <div style="max-width:450px;margin:60px auto;">
      <div class="card fade-in" style="padding:35px;">
        <div style="text-align:center;margin-bottom:25px;">
          <div style="font-size:48px;margin-bottom:10px;">🔐</div>
          <h2 style="font-size:24px;font-weight:800;background:var(--gradient-orange);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">ورود ادمین</h2>
          <p style="color:var(--text2);font-size:14px;margin-top:5px;">برای مدیریت سیستم وارد شوید</p>
        </div>
        
        ${errorHTML}
        
        <form method="POST" action="/taakaa/api/login">
          <div style="margin-bottom:15px;">
            <label>رمز عبور</label>
            <input type="password" name="password" placeholder="رمز عبور خود را وارد کنید" required autofocus style="padding:14px 16px;">
          </div>
          
          <div style="margin-bottom:20px;">
            <label>کد TOTP (اختیاری)</label>
            <input type="text" name="totp" placeholder="کد ۶ رقمی" maxlength="6" pattern="[0-9]{6}" inputmode="numeric" style="padding:14px 16px;">
          </div>
          
          <button type="submit" class="btn" style="width:100%;padding:14px;font-size:16px;justify-content:center;">
            🚀 ورود به پنل
          </button>
        </form>
        
        <div style="text-align:center;margin-top:20px;padding-top:20px;border-top:1px solid var(--border);">
          <p style="color:var(--text2);font-size:13px;">
            📢 کانال: @TaaKaaOrg | نسخه ۱۶.۵ پرو
          </p>
          <p style="color:var(--text3);font-size:11px;margin-top:5px;">
            🔒 ارتباط امن - رمزنگاری شده
          </p>
        </div>
      </div>
    </div>
  `;
  
  return wrapHTML(content, 'TaaKaa-Xi | ورود');
}

// ===== Setup Page =====
function setupPage(error) {
  var errorHTML = error ? '<div class="card" style="border:1px solid var(--danger);color:var(--danger);text-align:center;">' + error + '</div>' : '';
  
  var content = `
    <div class="header fade-in">
      <div class="brand">
        <span class="brand-icon">🛠️</span> راه‌اندازی اولیه TaaKaa-Xi
      </div>
      <span style="color:var(--text2);">تنظیمات اولیه سیستم</span>
    </div>
    
    <div style="max-width:500px;margin:40px auto;">
      <div class="card fade-in" style="padding:35px;">
        <div style="text-align:center;margin-bottom:25px;">
          <div style="font-size:48px;margin-bottom:10px;">🎉</div>
          <h2 style="font-size:24px;font-weight:800;background:var(--gradient-orange);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">خوش آمدید!</h2>
          <p style="color:var(--text2);font-size:14px;margin-top:5px;">این اولین اجرای شماست. رمز عبور ادمین را تنظیم کنید.</p>
        </div>
        
        ${errorHTML}
        
        <form method="POST" action="/taakaa/api/setup">
          <div style="margin-bottom:15px;">
            <label>رمز عبور جدید</label>
            <input type="password" name="password" placeholder="رمز عبور قوی وارد کنید" required minlength="6" style="padding:14px 16px;">
            <div style="color:var(--text3);font-size:11px;margin-top:5px;">حداقل ۶ کاراکتر</div>
          </div>
          
          <div style="margin-bottom:20px;">
            <label>تکرار رمز عبور</label>
            <input type="password" name="confirm" placeholder="رمز عبور را تکرار کنید" required minlength="6" style="padding:14px 16px;">
          </div>
          
          <button type="submit" class="btn" style="width:100%;padding:14px;font-size:16px;justify-content:center;">
            ✅ راه‌اندازی سیستم
          </button>
        </form>
        
        <div style="text-align:center;margin-top:20px;padding-top:20px;border-top:1px solid var(--border);">
          <p style="color:var(--text2);font-size:13px;">
            📢 کانال: @TaaKaaOrg
          </p>
        </div>
      </div>
    </div>
  `;
  
  return wrapHTML(content, 'TaaKaa-Xi | Setup');
}

// ===== Dashboard Page =====
function dashboardPage(users, config) {
  var activeUsers = users.filter(function(u) { return u.status === 'active'; }).length;
  var totalUsage = users.reduce(function(sum, u) { return sum + (u.usageTotal || 0); }, 0);
  var today = new Date().toISOString().split('T')[0];
  var todayUsage = users.reduce(function(sum, u) {
    return sum + ((u.dailyUsage && u.dailyUsage[today]) ? u.dailyUsage[today] : 0);
  }, 0);
  
  var recentActivity = users.sort(function(a, b) {
    return (b.lastAccess || 0) - (a.lastAccess || 0);
  }).slice(0, 5);
  
  var activityHTML = recentActivity.length > 0 ? recentActivity.map(function(u) {
    return '<div class="flex" style="padding:10px 0;border-bottom:1px solid var(--border);">' +
      '<span style="font-weight:500;">' + u.name + '</span>' +
      '<span style="color:var(--text2);font-size:12px;">' + (u.lastAccess ? new Date(u.lastAccess).toLocaleString('fa-IR') : '—') + '</span>' +
      '</div>';
  }).join('') : '<p style="color:var(--text2);text-align:center;padding:20px;">هنوز فعالیتی ثبت نشده</p>';
  
  var offlineHTML = '<span id="offline-indicator" class="offline-indicator" style="display:none;">📡 حالت آفلاین</span>';
  
  var content = `
    <div class="header fade-in">
      <div class="flex" style="gap:20px;flex-wrap:wrap;">
        <div class="brand">
          <span class="brand-icon">⚡</span> TaaKaa-Xi PRO v16.5
        </div>
        <span class="badge badge-ok" style="font-size:13px;">🟢 عملیاتی</span>
        ${offlineHTML}
      </div>
      <span style="color:var(--text2);">🏗️ تیم تاکا | @TaaKaaOrg</span>
    </div>
    
    <div class="nav fade-in">
      <a href="/taakaa" class="active">📊 داشبورد</a>
      <a href="/taakaa/users">👥 کاربران</a>
      <a href="/taakaa/settings">⚙️ تنظیمات</a>
      <a href="/taakaa/scanner">📡 اسکنر</a>
      <a href="/taakaa/info-protocols">📖 پروتکل‌ها</a>
      <a href="/taakaa/subscription">📦 اشتراک</a>
      <a href="/taakaa/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a>
    </div>
    
    <div class="grid4 fade-in">
      <div class="stat-card">
        <div class="stat-label">👥 کاربران</div>
        <div class="stat-val">${users.length}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <span class="badge badge-ok">${activeUsers} فعال</span>
          <span class="badge badge-err">${users.length - activeUsers} معلق</span>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-label">📊 ترافیک کل</div>
        <div class="stat-val">${formatBytes(totalUsage)}</div>
        <span style="color:var(--text2);font-size:12px;">امروز: ${formatBytes(todayUsage)}</span>
      </div>
      
      <div class="stat-card">
        <div class="stat-label">🛡️ Fragment</div>
        <div class="stat-val">${config.FRAGMENT_ENABLED ? '✅' : '❌'}</div>
        <span style="color:var(--text2);font-size:12px;">${config.FRAGMENT_ENABLED ? 'size: ' + (config.FRAGMENT_SIZE || '1-5') + ' | count: ' + (config.FRAGMENT_COUNT || 3) : 'غیرفعال'}</span>
      </div>
      
      <div class="stat-card">
        <div class="stat-label">🌐 WARP</div>
        <div class="stat-val">${config.WARP_ENABLED ? '✅' : '❌'}</div>
        <span style="color:var(--text2);font-size:12px;">Pro: ${config.WARP_PRO_ENABLED ? 'فعال' : 'غیرفعال'}</span>
      </div>
    </div>
    
    <div class="grid3 fade-in">
      <div class="card">
        <h3 style="margin-bottom:15px;color:var(--text);">🛡️ وضعیت امنیتی</h3>
        <div class="flex" style="margin:12px 0;padding:8px 0;border-bottom:1px solid var(--border);">
          <span>Fragment</span>
          <span class="badge ${config.FRAGMENT_ENABLED ? 'badge-ok' : 'badge-err'}">${config.FRAGMENT_ENABLED ? 'فعال' : 'غیرفعال'}</span>
        </div>
        <div class="flex" style="margin:12px 0;padding:8px 0;border-bottom:1px solid var(--border);">
          <span>ECH</span>
          <span class="badge ${config.ECH_ENABLED ? 'badge-ok' : 'badge-err'}">${config.ECH_ENABLED ? 'فعال' : 'غیرفعال'}</span>
        </div>
        <div class="flex" style="margin:12px 0;padding:8px 0;border-bottom:1px solid var(--border);">
          <span>TOTP 2FA</span>
          <span class="badge badge-ok">فعال</span>
        </div>
        <div class="flex" style="margin:12px 0;padding:8px 0;border-bottom:1px solid var(--border);">
          <span>Rate Limit</span>
          <span class="badge badge-warn">${SYSTEM_CONFIG.MAX_LOGIN_ATTEMPTS} تلاش</span>
        </div>
        <div class="flex" style="margin:12px 0;padding:8px 0;">
          <span>DNS over HTTPS</span>
          <span class="badge badge-ok">فعال</span>
        </div>
      </div>
      
      <div class="card">
        <h3 style="margin-bottom:15px;color:var(--text);">📋 فعالیت اخیر</h3>
        ${activityHTML}
      </div>
      
      <div class="card">
        <h3 style="margin-bottom:15px;color:var(--text);">📦 اطلاعات سیستم</h3>
        <div style="color:var(--text2);font-size:13px;line-height:2.2;">
          <p>🔹 نسخه: <strong style="color:var(--primary);">v16.5 PRO</strong></p>
          <p>🔹 پروتکل: <strong style="color:var(--primary);">${(config.DEFAULT_PROTOCOL || 'vless').toUpperCase()}</strong></p>
          <p>🔹 SNI: <strong style="color:var(--primary);">${(config.SNI_LIST && config.SNI_LIST[0]) ? config.SNI_LIST[0] : 'www.google.com'}</strong></p>
          <p>🔹 پورت: <strong style="color:var(--primary);">${(config.PORTS && config.PORTS[0]) ? config.PORTS[0] : 443}</strong></p>
          <p>🔹 Fingerprint: <strong style="color:var(--primary);">${(config.FINGERPRINTS && config.FINGERPRINTS[0]) ? config.FINGERPRINTS[0] : 'chrome'}</strong></p>
        </div>
      </div>
    </div>
    
    <p style="text-align:center;color:var(--text2);margin-top:20px;font-size:13px;">
      🏗️ توسعه توسط تیم TAAKAA | ۳ ماه توسعه | 📢 @TaaKaaOrg | ⚡ نسخه ۱۶.۵ پرو
    </p>
  `;
  
  return wrapHTML(content, 'TaaKaa-Xi | داشبورد');
}

// ===== Users Page (خلاصه) =====
function usersPage(users) {
  var rows = users.map(function(u) {
    var usagePercent = u.quotaTotal > 0 ? Math.min(100, ((u.usageTotal || 0) / u.quotaTotal) * 100) : 0;
    var daysLeft = u.expiryDate ? Math.max(0, Math.ceil((u.expiryDate - Date.now()) / 86400000)) : 0;
    var progressClass = usagePercent > 85 ? 'danger' : usagePercent > 60 ? 'warning' : '';
    
    return '<tr>' +
      '<td><strong>' + u.name + '</strong></td>' +
      '<td style="font-family:monospace;font-size:11px;direction:ltr;text-align:left;">' + u.uuid.substring(0, 18) + '...</td>' +
      '<td>' + (u.ip || '—') + '</td>' +
      '<td>' + formatBytes(u.usageTotal || 0) + ' / ' + formatBytes(u.quotaTotal) +
      '<div class="progress"><div class="progress-fill ' + progressClass + '" style="width:' + usagePercent + '%"></div></div>' +
      '<small>' + usagePercent.toFixed(1) + '%</small></td>' +
      '<td>' + formatBytes(u.quotaDaily) + '</td>' +
      '<td>' + formatDuration(daysLeft) + '</td>' +
      '<td><span class="badge ' + (u.status === 'active' ? 'badge-ok' : 'badge-err') + '">' + (u.status === 'active' ? '🟢 فعال' : '🔴 معلق') + '</span></td>' +
      '<td>' + (SYSTEM_CONFIG.OPERATORS[u.operator] || u.operator) + '</td>' +
      '<td>' +
      '<button class="btn btn-sm" onclick="editUser(\'' + u.uuid + '\')" title="ویرایش">✏️</button> ' +
      '<button class="btn btn-sm btn-outline" onclick="toggleUser(\'' + u.uuid + '\')" title="' + (u.status === 'active' ? 'تعلیق' : 'فعال‌سازی') + '">' + (u.status === 'active' ? '⏸️' : '▶️') + '</button> ' +
      '<button class="btn btn-sm btn-warn" onclick="resetUsage(\'' + u.uuid + '\')" title="ریست مصرف">🔄</button> ' +
      '<button class="btn btn-sm btn-danger" onclick="deleteUser(\'' + u.uuid + '\')" title="حذف">🗑️</button>' +
      '</td></tr>';
  }).join('');
  
  var offlineHTML = '<span id="offline-indicator" class="offline-indicator" style="display:none;">📡 حالت آفلاین</span>';
  
  var content = `
    <div class="header fade-in">
      <div class="brand">
        <span class="brand-icon">👥</span> مدیریت کاربران
        ${offlineHTML}
      </div>
      <button class="btn" onclick="openModal('add-user-modal')">➕ کاربر جدید</button>
    </div>
    
    <div class="nav fade-in">
      <a href="/taakaa">📊 داشبورد</a>
      <a href="/taakaa/users" class="active">👥 کاربران</a>
      <a href="/taakaa/settings">⚙️ تنظیمات</a>
      <a href="/taakaa/scanner">📡 اسکنر</a>
      <a href="/taakaa/info-protocols">📖 پروتکل‌ها</a>
      <a href="/taakaa/subscription">📦 اشتراک</a>
      <a href="/taakaa/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a>
    </div>
    
    <div class="card fade-in">
      <div class="flex" style="margin-bottom:20px;flex-wrap:wrap;">
        <h3 style="color:var(--text);">لیست کاربران (${users.length} کاربر)</h3>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <span class="badge badge-ok">فعال: ${users.filter(function(u){return u.status==='active';}).length}</span>
          <span class="badge badge-err">معلق: ${users.filter(function(u){return u.status!=='active';}).length}</span>
        </div>
      </div>
      
      <div style="overflow-x:auto;">
        <table>
          <thead>
            <tr>
              <th>نام</th>
              <th>UUID</th>
              <th>IP</th>
              <th>مصرف</th>
              <th>روزانه</th>
              <th>زمان</th>
              <th>وضعیت</th>
              <th>اپراتور</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      ${users.length === 0 ? '<p style="text-align:center;color:var(--text2);padding:40px;">هنوز کاربری ساخته نشده</p>' : ''}
    </div>
    
    <!-- Add User Modal -->
    <div id="add-user-modal" class="modal-overlay">
      <div class="modal fade-in">
        <h3>➕ ایجاد کاربر جدید</h3>
        <form onsubmit="event.preventDefault();createUser()" id="add-user-form">
          <input type="text" name="name" placeholder="نام کاربر" required>
          <input type="text" name="uuid" placeholder="UUID (اختیاری)">
          <input type="text" name="ip" placeholder="IP اختصاصی (اختیاری)">
          <input type="text" name="quota" placeholder="حجم کل (5GB, 1TB, 500mb)" value="5GB">
          <input type="text" name="dailyQuota" placeholder="حجم روزانه (1GB)" value="1GB">
          <input type="text" name="expiry" placeholder="مدت (30d, 1m, 1y)" value="30d">
          <select name="operator">
            <option value="mtn">ایرانسل</option>
            <option value="mci">همراه اول</option>
            <option value="rtl">رایتل</option>
          </select>
          <select name="protocol">
            <option value="vless">VLESS</option>
            <option value="trojan">Trojan</option>
            <option value="shadowsocks">Shadowsocks</option>
          </select>
          <div class="flex mt-20">
            <button type="submit" class="btn">✅ ایجاد</button>
            <button type="button" class="btn btn-outline" onclick="closeModal('add-user-modal')">انصراف</button>
          </div>
        </form>
      </div>
    </div>
    
    <div id="edit-user-modal" class="modal-overlay">
      <div class="modal fade-in">
        <h3>✏️ ویرایش کاربر</h3>
        <form onsubmit="event.preventDefault();saveEditUser()" id="edit-user-form">
          <input type="hidden" name="uuid" id="edit-uuid">
          <input type="text" name="name" id="edit-name" placeholder="نام کاربر" required>
          <input type="text" name="ip" id="edit-ip" placeholder="IP اختصاصی">
          <input type="text" name="quota" id="edit-quota" placeholder="حجم کل">
          <input type="text" name="dailyQuota" id="edit-dailyQuota" placeholder="حجم روزانه">
          <input type="text" name="expiry" id="edit-expiry" placeholder="مدت">
          <select name="operator" id="edit-operator">
            <option value="mtn">ایرانسل</option>
            <option value="mci">همراه اول</option>
            <option value="rtl">رایتل</option>
          </select>
          <div class="flex mt-20">
            <button type="submit" class="btn">💾 ذخیره</button>
            <button type="button" class="btn btn-outline" onclick="closeModal('edit-user-modal')">انصراف</button>
          </div>
        </form>
      </div>
    </div>
    
    <script>
      async function createUser() {
        var f = document.getElementById('add-user-form');
        var d = new FormData(f);
        var data = {};
        d.forEach(function(v,k){ data[k] = v; });
        var r = await api('/taakaa/api/create-user', 'POST', data);
        if(r.success){ showToast('✅ کاربر ایجاد شد', 'success'); closeModal('add-user-modal'); setTimeout(function(){ location.reload(); }, 500); }
        else showToast('❌ ' + (r.error || 'خطا'), 'error');
      }
      async function editUser(uuid) {
        var r = await api('/taakaa/api/get-user?uuid=' + uuid);
        if(r.success && r.user){
          document.getElementById('edit-uuid').value = r.user.uuid;
          document.getElementById('edit-name').value = r.user.name;
          document.getElementById('edit-ip').value = r.user.ip || '';
          document.getElementById('edit-quota').value = r.user.quotaTotal >= 1073741824 ? (r.user.quotaTotal/1073741824).toFixed(0)+'GB' : (r.user.quotaTotal/1048576).toFixed(0)+'MB';
          document.getElementById('edit-dailyQuota').value = r.user.quotaDaily >= 1073741824 ? (r.user.quotaDaily/1073741824).toFixed(0)+'GB' : (r.user.quotaDaily/1048576).toFixed(0)+'MB';
          document.getElementById('edit-expiry').value = r.user.expiryDays + 'd';
          document.getElementById('edit-operator').value = r.user.operator;
          openModal('edit-user-modal');
        }
      }
      async function saveEditUser() {
        var f = document.getElementById('edit-user-form');
        var d = new FormData(f);
        var data = {};
        d.forEach(function(v,k){ data[k] = v; });
        var r = await api('/taakaa/api/edit-user', 'POST', data);
        if(r.success){ showToast('✅ ذخیره شد', 'success'); closeModal('edit-user-modal'); setTimeout(function(){ location.reload(); }, 500); }
        else showToast('❌ ' + (r.error || 'خطا'), 'error');
      }
    </script>
  `;
  
  return wrapHTML(content, 'TaaKaa-Xi | کاربران');
}

// ===== Settings Page (خلاصه) =====
function settingsPage(config) {
  var offlineHTML = '<span id="offline-indicator" class="offline-indicator" style="display:none;">📡 حالت آفلاین</span>';
  
  var content = `
    <div class="header fade-in">
      <div class="brand">
        <span class="brand-icon">⚙️</span> تنظیمات سیستم
        ${offlineHTML}
      </div>
      <span style="color:var(--text2);">تنظیمات پیشرفته TaaKaa-Xi</span>
    </div>
    
    <div class="nav fade-in">
      <a href="/taakaa">📊 داشبورد</a>
      <a href="/taakaa/users">👥 کاربران</a>
      <a href="/taakaa/settings" class="active">⚙️ تنظیمات</a>
      <a href="/taakaa/scanner">📡 اسکنر</a>
      <a href="/taakaa/info-protocols">📖 پروتکل‌ها</a>
      <a href="/taakaa/subscription">📦 اشتراک</a>
      <a href="/taakaa/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a>
    </div>
    
    <div class="grid2">
      <div class="card fade-in">
        <h3 style="margin-bottom:20px;color:var(--text);">🛡️ تکنیک‌های عبور از فیلترینگ</h3>
        
        <form onsubmit="event.preventDefault();saveSettings()" id="settings-form">
          <div class="flex" style="margin:15px 0;">
            <div><strong>Fragment</strong><br><small style="color:var(--text2);">تکه‌تکه کردن پکت TLS Hello</small></div>
            <label class="toggle"><input type="checkbox" name="fragment_enabled" ${config.FRAGMENT_ENABLED ? 'checked' : ''}><span class="slider"></span></label>
          </div>
          
          <div style="margin:15px 0;"><label>Fragment Size</label><input type="text" name="fragment_size" value="${config.FRAGMENT_SIZE || '1-5'}"></div>
          <div style="margin:15px 0;"><label>Fragment Count</label><input type="number" name="fragment_count" value="${config.FRAGMENT_COUNT || 3}" min="1" max="10"></div>
          <div style="margin:15px 0;"><label>Fragment Delay</label><input type="text" name="fragment_delay" value="${config.FRAGMENT_DELAY || '1-3'}"></div>
          
          <div class="flex" style="margin:15px 0;">
            <div><strong>WARP</strong><br><small style="color:var(--text2);">مسیریابی Cloudflare WARP</small></div>
            <label class="toggle"><input type="checkbox" name="warp_enabled" ${config.WARP_ENABLED ? 'checked' : ''}><span class="slider"></span></label>
          </div>
          
          <div class="flex" style="margin:15px 0;">
            <div><strong>WARP Pro</strong></div>
            <label class="toggle"><input type="checkbox" name="warp_pro_enabled" ${config.WARP_PRO_ENABLED ? 'checked' : ''}><span class="slider"></span></label>
          </div>
          
          <div class="flex" style="margin:15px 0;">
            <div><strong>ECH</strong></div>
            <label class="toggle"><input type="checkbox" name="ech_enabled" ${config.ECH_ENABLED ? 'checked' : ''}><span class="slider"></span></label>
          </div>
          
          <div style="margin:15px 0;">
            <label>SNI</label>
            <select name="sni">
              ${SYSTEM_CONFIG.SNI_LIST.map(function(s) {
                return '<option value="' + s + '" ' + (config.SNI_LIST && config.SNI_LIST[0] === s ? 'selected' : '') + '>' + s + '</option>';
              }).join('')}
            </select>
          </div>
          
          <button type="submit" class="btn" style="width:100%;margin-top:20px;">💾 ذخیره تنظیمات</button>
        </form>
      </div>
      
      <div>
        <div class="card fade-in">
          <h3 style="margin-bottom:20px;color:var(--text);">🔐 تغییر رمز عبور</h3>
          <form onsubmit="event.preventDefault();changePassword()">
            <input type="password" name="current" placeholder="رمز فعلی" required>
            <input type="password" name="new_password" placeholder="رمز جدید" required minlength="6">
            <input type="password" name="confirm" placeholder="تکرار رمز جدید" required>
            <button type="submit" class="btn" style="width:100%;margin-top:10px;">🔑 تغییر رمز</button>
          </form>
        </div>
        
        <div class="card fade-in mt-20">
          <h3 style="margin-bottom:20px;color:var(--text);">💾 پشتیبان‌گیری</h3>
          <p style="color:var(--text2);font-size:13px;margin-bottom:15px;">دانلود فایل پشتیبان از تمام تنظیمات و کاربران</p>
          <button class="btn" onclick="downloadBackup()" style="width:100%;margin-top:10px;">📥 دانلود بکاپ</button>
        </div>
        
        <div class="card fade-in mt-20">
          <h3 style="margin-bottom:20px;color:var(--text);">🧹 اسکنر IP تمیز</h3>
          <p style="color:var(--text2);font-size:13px;margin-bottom:15px;">اسکن و پیدا کردن بهترین IP برای کانفیگ‌ها</p>
          <button class="btn" onclick="window.location.href='/taakaa/scanner'" style="width:100%;margin-top:10px;">📡 رفتن به اسکنر</button>
        </div>
      </div>
    </div>
    
    <script>
      async function saveSettings() {
        var f = document.getElementById('settings-form');
        var d = new FormData(f);
        var o = {};
        d.forEach(function(v,k){ o[k] = v; });
        o.fragment_enabled = d.get('fragment_enabled') === 'on';
        o.warp_enabled = d.get('warp_enabled') === 'on';
        o.warp_pro_enabled = d.get('warp_pro_enabled') === 'on';
        o.ech_enabled = d.get('ech_enabled') === 'on';
        var r = await api('/taakaa/api/update-settings', 'POST', o);
        if(r.success){ showToast('✅ تنظیمات ذخیره شد', 'success'); setTimeout(function(){ location.reload(); }, 500); }
        else showToast('❌ خطا در ذخیره سازی', 'error');
      }
      
      async function changePassword() {
        var f = document.querySelector('form[onsubmit*="changePassword"]');
        var d = new FormData(f);
        var o = {
          current: d.get('current'),
          new_password: d.get('new_password'),
          confirm: d.get('confirm')
        };
        if(o.new_password !== o.confirm){ showToast('❌ رمزهای جدید مطابقت ندارند', 'error'); return; }
        if(o.new_password.length < 6){ showToast('❌ رمز جدید حداقل ۶ کاراکتر باشد', 'error'); return; }
        var r = await api('/taakaa/api/change-password', 'POST', o);
        if(r.success){ showToast('✅ رمز با موفقیت تغییر کرد', 'success'); f.reset(); }
        else showToast('❌ ' + (r.error || 'خطا'), 'error');
      }
      
      async function downloadBackup() {
        var r = await api('/taakaa/api/backup-kv');
        var b = new Blob([JSON.stringify(r, null, 2)], { type: 'application/json' });
        var u = URL.createObjectURL(b);
        var a = document.createElement('a');
        a.href = u;
        a.download = 'taakaa-backup-' + new Date().toISOString().slice(0,10) + '.json';
        a.click();
        showToast('✅ دانلود شد', 'success');
      }
    </script>
  `;
  
  return wrapHTML(content, 'TaaKaa-Xi | تنظیمات');
}

// ===== Scanner Page =====
function scannerPage() {
  var offlineHTML = '<span id="offline-indicator" class="offline-indicator" style="display:none;">📡 حالت آفلاین</span>';
  
  var content = `
    <div class="header fade-in">
      <div class="brand">
        <span class="brand-icon">📡</span> اسکنر IP
        ${offlineHTML}
      </div>
      <span style="color:var(--text2);">پیدا کردن بهترین IP برای کانفیگ</span>
    </div>
    
    <div class="nav fade-in">
      <a href="/taakaa">📊 داشبورد</a>
      <a href="/taakaa/users">👥 کاربران</a>
      <a href="/taakaa/settings">⚙️ تنظیمات</a>
      <a href="/taakaa/scanner" class="active">📡 اسکنر</a>
      <a href="/taakaa/info-protocols">📖 پروتکل‌ها</a>
      <a href="/taakaa/subscription">📦 اشتراک</a>
      <a href="/taakaa/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a>
    </div>
    
    <div class="card fade-in">
      <div class="flex" style="margin-bottom:20px;flex-wrap:wrap;">
        <div>
          <h3 style="color:var(--text);">📡 اسکن IP</h3>
          <p style="color:var(--text2);font-size:13px;">اسکن خودکار IPهای سالم و پیدا کردن بهترین آن‌ها</p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn" onclick="quickScan()">⚡ اسکن سریع</button>
          <button class="btn btn-outline" onclick="fullScan()">🔍 اسکن کامل</button>
        </div>
      </div>
      
      <div id="scan-results" class="mt-20">
        <p style="color:var(--text2);text-align:center;padding:30px;">برای شروع اسکن، دکمه‌های بالا را بزنید</p>
      </div>
      
      <div id="best-ip-section" style="display:none;margin-top:20px;padding:20px;background:var(--bg-deep);border-radius:var(--radius-sm);border:1px solid var(--primary);">
        <h4 style="color:var(--primary);">🌟 بهترین IP:</h4>
        <div class="code-block" id="best-ip-display" style="margin-top:10px;"></div>
        <button class="btn btn-sm mt-10" onclick="applyBestIP()">✅ اعمال به تنظیمات</button>
      </div>
      
      <div style="margin-top:20px;padding:16px;background:var(--bg-deep);border-radius:var(--radius-sm);border:1px solid var(--border);">
        <label>IPهای تمیز (برای کانفیگ)</label>
        <textarea id="clean-ips-input" rows="3" style="font-family:monospace;resize:vertical;" placeholder="آی‌پی‌های پیدا شده در اینجا قرار می‌گیرند..."></textarea>
        <button class="btn btn-sm mt-10" onclick="saveCleanIPs()">💾 ذخیره IPها</button>
      </div>
    </div>
    
    <script>
      var bestIPData = null;
      
      async function fullScan() {
        document.getElementById('scan-results').innerHTML = '<div class="pulse text-center" style="padding:30px;">⏳ اسکن کامل در حال انجام... (حدود ۳۰ ثانیه)</div>';
        try {
          var r = await api('/taakaa/api/full-scan');
          if(r.success) displayResults(r);
          else document.getElementById('scan-results').innerHTML = '<div style="color:var(--danger);text-align:center;padding:30px;">❌ خطا در اسکن</div>';
        } catch(e) {
          document.getElementById('scan-results').innerHTML = '<div style="color:var(--danger);text-align:center;padding:30px;">❌ خطا: ' + e.message + '</div>';
        }
      }
      
      async function quickScan() {
        document.getElementById('scan-results').innerHTML = '<div class="pulse text-center" style="padding:30px;">⏳ در حال اسکن...</div>';
        try {
          var r = await api('/taakaa/api/quick-scan');
          if(r.success) displayResults(r);
          else document.getElementById('scan-results').innerHTML = '<div style="color:var(--danger);text-align:center;padding:30px;">❌ خطا در اسکن</div>';
        } catch(e) {
          document.getElementById('scan-results').innerHTML = '<div style="color:var(--danger);text-align:center;padding:30px;">❌ خطا: ' + e.message + '</div>';
        }
      }
      
      function displayResults(r) {
        var aliveCount = r.results.filter(function(x) { return x.alive; }).length;
        var html = '';
        html += '<div class="flex" style="margin-bottom:15px;padding:12px;background:var(--bg-deep);border-radius:var(--radius-sm);border:1px solid var(--border);">' +
                '<span>✅ زنده: <strong>' + aliveCount + '</strong></span>' +
                '<span>❌ مرده: <strong>' + (r.results.length - aliveCount) + '</strong></span>' +
                '<span>⏱ زمان: <strong>' + (r.results.reduce(function(s,x){ return s + (x.alive ? x.latency : 0); }, 0) / (aliveCount || 1)).toFixed(0) + 'ms</strong> میانگین</span>' +
                '</div>';
        
        html += '<div style="max-height:500px;overflow-y:auto;">';
        r.results.forEach(function(x) {
          var statusClass = x.alive ? 'badge-ok' : 'badge-err';
          var statusText = x.alive ? '✅ زنده' : '❌ مرده';
          var latencyText = x.alive ? x.latency + 'ms' : '—';
          html += '<div class="scanner-result">' +
                  '<span class="ip">' + x.ip + '</span>' +
                  '<span class="latency">' + latencyText + '</span>' +
                  '<span class="badge ' + statusClass + '">' + statusText + '</span>' +
                  '<button class="btn btn-sm" onclick="addIP(\'' + x.ip + '\')">➕</button>' +
                  '</div>';
        });
        html += '</div>';
        
        if(r.bestIP) {
          bestIPData = r.bestIP;
          html += '<div id="best-ip-section" style="margin-top:20px;padding:20px;background:var(--bg-deep);border-radius:var(--radius-sm);border:1px solid var(--primary);">' +
                  '<h4 style="color:var(--primary);">🌟 بهترین IP:</h4>' +
                  '<div class="code-block" style="margin-top:10px;">' + r.bestIP.ip + ' | Latency: ' + r.bestIP.latency + 'ms ⭐</div>' +
                  '<button class="btn btn-sm mt-10" onclick="applyBestIP()">✅ اعمال به تنظیمات</button>' +
                  '</div>';
        }
        document.getElementById('scan-results').innerHTML = html;
      }
      
      function addIP(ip) {
        var input = document.getElementById('clean-ips-input');
        var current = input.value.trim();
        if(current) input.value = current + '\\n' + ip;
        else input.value = ip;
        showToast('IP ' + ip + ' اضافه شد', 'success');
      }
      
      function applyBestIP() {
        if(bestIPData) addIP(bestIPData.ip);
      }
      
      async function saveCleanIPs() {
        var ips = document.getElementById('clean-ips-input').value.trim();
        if(!ips){ showToast('❌ لطفاً حداقل یک IP وارد کنید', 'error'); return; }
        var r = await api('/taakaa/api/update-settings', 'POST', { clean_ips: ips });
        if(r.success) showToast('✅ IPها ذخیره شدند', 'success');
        else showToast('❌ خطا در ذخیره سازی', 'error');
      }
    </script>
  `;
  
  return wrapHTML(content, 'TaaKaa-Xi | اسکنر');
}

// ===== Info Protocols Page =====
function infoProtocolsPage(config) {
  var content = `
    <div class="header fade-in">
      <div class="brand">
        <span class="brand-icon">📖</span> پروتکل‌های TaaKaa-Xi
      </div>
      <span style="color:var(--text2);">اطلاعات کامل پروتکل‌ها</span>
    </div>
    
    <div class="nav fade-in">
      <a href="/taakaa">📊 داشبورد</a>
      <a href="/taakaa/users">👥 کاربران</a>
      <a href="/taakaa/settings">⚙️ تنظیمات</a>
      <a href="/taakaa/scanner">📡 اسکنر</a>
      <a href="/taakaa/info-protocols" class="active">📖 پروتکل‌ها</a>
      <a href="/taakaa/subscription">📦 اشتراک</a>
      <a href="/taakaa/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a>
    </div>
    
    <div class="card fade-in">
      <h4 style="color:var(--primary);font-size:18px;margin-bottom:10px;">🔷 VLESS</h4>
      <p style="color:var(--text2);">پروتکل سبک با امنیت TLS. مناسب برای عبور از فیلترینگ</p>
      <div style="margin-top:10px;padding:12px;background:var(--bg-deep);border-radius:var(--radius-sm);border:1px solid var(--border);">
        <small style="color:var(--text3);">SNI: ${(config.SNI_LIST && config.SNI_LIST[0]) || 'www.google.com'}</small>
      </div>
    </div>
    
    <div class="card fade-in">
      <h4 style="color:var(--primary);font-size:18px;margin-bottom:10px;">🧩 Fragment</h4>
      <p style="color:var(--text2);">تکه‌تکه کردن پکت‌های TLS Hello برای عبور از فیلترینگ عمیق</p>
      <div style="margin-top:10px;">
        <span class="badge ${config.FRAGMENT_ENABLED ? 'badge-ok' : 'badge-err'}">${config.FRAGMENT_ENABLED ? '✅ فعال' : '❌ غیرفعال'}</span>
        ${config.FRAGMENT_ENABLED ? '<span style="color:var(--text2);font-size:13px;margin-right:10px;">size: ' + (config.FRAGMENT_SIZE || '1-5') + ' | count: ' + (config.FRAGMENT_COUNT || 3) + '</span>' : ''}
      </div>
    </div>
    
    <div class="card fade-in">
      <h4 style="color:var(--primary);font-size:18px;margin-bottom:10px;">🔐 ECH</h4>
      <p style="color:var(--text2);">رمزنگاری Client Hello برای مخفی‌سازی کامل اطلاعات اتصال</p>
      <div style="margin-top:10px;">
        <span class="badge ${config.ECH_ENABLED ? 'badge-ok' : 'badge-err'}">${config.ECH_ENABLED ? '✅ فعال' : '❌ غیرفعال'}</span>
      </div>
    </div>
    
    <div class="card fade-in">
      <h4 style="color:var(--primary);font-size:18px;margin-bottom:10px;">🌐 WARP</h4>
      <p style="color:var(--text2);">مسیریابی Cloudflare WARP برای افزایش امنیت و سرعت</p>
      <div style="margin-top:10px;">
        <span class="badge ${config.WARP_ENABLED ? 'badge-ok' : 'badge-err'}">${config.WARP_ENABLED ? '✅ فعال' : '❌ غیرفعال'}</span>
        ${config.WARP_ENABLED ? '<span style="color:var(--text2);font-size:13px;margin-right:10px;">Pro: ' + (config.WARP_PRO_ENABLED ? 'فعال' : 'غیرفعال') + '</span>' : ''}
      </div>
    </div>
    
    <p style="text-align:center;color:var(--text2);margin-top:30px;font-size:13px;">
      📢 @TaaKaaOrg | ⚡ نسخه ۱۶.۵ پرو
    </p>
  `;
  
  return wrapHTML(content, 'TaaKaa-Xi | پروتکل‌ها');
}

// ===== Subscription Page =====
function subscriptionPage(users, config, domain) {
  var opts = users.map(function(u) {
    return '<option value="' + u.uuid + '">' + u.name + '</option>';
  }).join('');
  
  var offlineHTML = '<span id="offline-indicator" class="offline-indicator" style="display:none;">📡 حالت آفلاین</span>';
  
  var content = `
    <div class="header fade-in">
      <div class="brand">
        <span class="brand-icon">📦</span> اشتراک
        ${offlineHTML}
      </div>
      <span style="color:var(--text2);">دریافت لینک اشتراک و کانفیگ</span>
    </div>
    
    <div class="nav fade-in">
      <a href="/taakaa">📊 داشبورد</a>
      <a href="/taakaa/users">👥 کاربران</a>
      <a href="/taakaa/settings">⚙️ تنظیمات</a>
      <a href="/taakaa/scanner">📡 اسکنر</a>
      <a href="/taakaa/info-protocols">📖 پروتکل‌ها</a>
      <a href="/taakaa/subscription" class="active">📦 اشتراک</a>
      <a href="/taakaa/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a>
    </div>
    
    <div class="card fade-in">
      <h3 style="color:var(--text);margin-bottom:15px;">🔗 دریافت لینک اشتراک</h3>
      <p style="color:var(--text2);font-size:13px;margin-bottom:15px;">کاربر مورد نظر را انتخاب کنید تا لینک اشتراک و کانفیگ‌ها را دریافت کنید</p>
      
      <select id="sub-user-select" onchange="updateSubscription()" style="padding:14px 16px;margin-bottom:15px;">
        <option value="">-- انتخاب کاربر --</option>
        ${opts}
      </select>
      
      <div id="subscription-links" style="display:none;">
        <div style="margin-top:20px;padding:16px;background:var(--bg-deep);border-radius:var(--radius-sm);border:1px solid var(--border);">
          <h4 style="color:var(--text);margin-bottom:10px;">📎 لینک اشتراک:</h4>
          <div class="flex">
            <input type="text" id="sub-url" readonly class="code-block" style="flex:1;margin:0;border-radius:var(--radius-sm) 0 0 var(--radius-sm);">
            <button class="btn btn-sm" onclick="copyText(document.getElementById('sub-url').value)" style="border-radius:0 var(--radius-sm) var(--radius-sm) 0;">📋</button>
          </div>
        </div>
        
        <div style="margin-top:15px;padding:16px;background:var(--bg-deep);border-radius:var(--radius-sm);border:1px solid var(--border);">
          <h4 style="color:var(--text);margin-bottom:10px;">📋 کانفیگ VLESS:</h4>
          <textarea id="vless-config" readonly class="code-block" style="height:60px;width:100%;resize:vertical;margin:0;"></textarea>
        </div>
        
        <div style="margin-top:15px;padding:16px;background:var(--bg-deep);border-radius:var(--radius-sm);border:1px solid var(--border);">
          <h4 style="color:var(--text);margin-bottom:10px;">📦 Base64 (سابسکریشن):</h4>
          <textarea id="sub-base64" readonly class="code-block" style="height:60px;width:100%;resize:vertical;margin:0;"></textarea>
        </div>
      </div>
    </div>
    
    <script>
      var DOMAIN = "${domain}";
      async function updateSubscription() {
        var u = document.getElementById('sub-user-select').value;
        if(!u){ document.getElementById('subscription-links').style.display = 'none'; return; }
        var r = await api('/taakaa/api/get-configs?uuid=' + u);
        if(r.success){
          document.getElementById('subscription-links').style.display = 'block';
          document.getElementById('sub-url').value = 'https://' + DOMAIN + '/sub/' + u;
          document.getElementById('vless-config').value = r.configs.vless;
          document.getElementById('sub-base64').value = r.configs.subscription;
        } else {
          showToast('❌ خطا در دریافت کانفیگ', 'error');
        }
      }
    </script>
  `;
  
  return wrapHTML(content, 'TaaKaa-Xi | اشتراک');
}

// ===== Owners Page =====
function ownersPage() {
  var content = `
    <div class="header fade-in" style="justify-content:center;">
      <div class="brand" style="font-size:2rem;">
        <span class="brand-icon">👑</span> TaaKaa-Xi
      </div>
    </div>
    
    <div class="card fade-in" style="max-width:600px;margin:40px auto;text-align:center;padding:40px;">
      <div style="font-size:64px;margin-bottom:20px;">🏗️</div>
      <h2 style="font-size:28px;font-weight:800;background:var(--gradient-orange);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">تیم TAAKAA</h2>
      <p style="color:var(--text2);margin:20px 0;font-size:16px;line-height:2;">
        ⚡ نسخه ۱۶.۵ پرو<br>
        ۳ ماه توسعه<br>
        پشتیبانی از VLESS / Trojan / Shadowsocks
      </p>
      <p style="color:var(--primary);font-size:20px;font-weight:bold;margin:20px 0;">
        📢 @TaaKaaOrg
      </p>
      <a href="/taakaa" class="btn" style="margin-top:20px;">🏠 بازگشت به داشبورد</a>
    </div>
  `;
  
  return wrapHTML(content, 'TaaKaa-Xi | Owners');
}

// ==================== Response Helpers ====================
function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function redirectResponse(url, cookie) {
  var headers = { Location: url };
  if (cookie) headers['Set-Cookie'] = cookie;
  return new Response(null, { status: 302, headers: headers });
}

function htmlResponse(html) {
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// ==================== Full Scan API ====================
async function handleFullScan() {
  var results = await fullScan();
  var bestIP = results.find(function(r) { return r.alive; });
  return jsonResponse({
    success: true,
    results: results,
    bestIP: bestIP,
    total: results.length,
    alive: results.filter(function(r) { return r.alive; }).length
  });
}

// ==================== EXPORT DEFAULT ====================
export default {
  async fetch(request, env, ctx) {
    var url = new URL(request.url);
    var path = url.pathname;
    var method = request.method;
    var cookieHeader = request.headers.get('Cookie') || '';
    var sessionToken = getCookie(cookieHeader, 'taakaa_session');
    var clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    var domain = url.hostname;

    var storage = new StorageManager(env);
    var sessionMgr = new SessionManager(storage);
    var rateLimiter = new RateLimiter(storage);
    var userMgr = new UserManager(storage);
    var proxyHandler = new ProxyHandler(storage);

    var rateCheck = await rateLimiter.check(
      'login_' + clientIP,
      SYSTEM_CONFIG.MAX_LOGIN_ATTEMPTS,
      SYSTEM_CONFIG.LOCKOUT_MINUTES
    );

    var isFirstRun = await storage.isFirstRun();

    // ===== مسیرهای عمومی =====
    if (path === '/' || path === '') {
      // اگر تنظیمات وجود نداره -> برو setup
      if (isFirstRun) return htmlResponse(setupPage());
      // اگر تنظیمات داره -> welcome to nginx
      return htmlResponse(nginxWelcomePage());
    }

    // ===== مسیر پنل =====
    if (path === '/taakaa' || path === '/taakaa/') {
      // اگر تنظیمات وجود نداره -> برو setup
      if (isFirstRun) return htmlResponse(setupPage());
      
      var session = null;
      if (sessionToken) session = await sessionMgr.validate(sessionToken);
      if (!session) return htmlResponse(loginPage());
      
      var config = await storage.getSystemConfig();
      var users = await storage.getAllUsers();
      return htmlResponse(dashboardPage(users, config));
    }

    // ===== Setup مستقیم =====
    if (path === '/taakaa/setup' || path === '/setup') {
      return htmlResponse(setupPage());
    }

    // ===== API Routes =====
    if (path === '/taakaa/api/login' && method === 'POST') {
      if (!rateCheck.allowed) {
        return jsonResponse({ success: false, error: 'تلاش‌ها تمام شد' }, 429);
      }

      var password, totpToken;
      var ct = request.headers.get('Content-Type') || '';

      if (ct.includes('application/json')) {
        var json = await request.json();
        password = json.password;
        totpToken = json.totp;
      } else {
        var body = await request.formData();
        password = body.get('password');
        totpToken = body.get('totp');
      }

      var adminHash = await storage.getAdminPassword();
      if (!adminHash) {
        return jsonResponse({ success: false, error: 'راه‌اندازی نشده' }, 500);
      }

      var validPassword = await verifyPass(password, adminHash);
      if (!validPassword) {
        return htmlResponse(loginPage('❌ رمز عبور اشتباه است'));
      }

      var sysConfig = await storage.getSystemConfig();
      if (totpToken && !verifyTOTP(totpToken, sysConfig.TOTP_SECRET)) {
        return htmlResponse(loginPage('❌ کد TOTP اشتباه است'));
      }

      var newSession = await sessionMgr.create({ role: 'admin', ip: clientIP });
      var cookie = 'taakaa_session=' + newSession +
        '; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=' +
        SYSTEM_CONFIG.SESSION_EXPIRY;

      return redirectResponse('/taakaa', cookie);
    }

    if (path === '/taakaa/api/setup' && method === 'POST') {
      var body = await request.formData();
      var password = body.get('password');
      var confirm = body.get('confirm');

      if (password !== confirm) {
        return htmlResponse(setupPage('❌ رمزها مطابقت ندارند'));
      }
      if (password.length < 6) {
        return htmlResponse(setupPage('❌ رمز عبور حداقل ۶ کاراکتر باشد'));
      }

      await storage.setup(password);
      var newSession = await sessionMgr.create({ role: 'admin', ip: clientIP });
      var cookie = 'taakaa_session=' + newSession +
        '; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=' +
        SYSTEM_CONFIG.SESSION_EXPIRY;

      return redirectResponse('/taakaa', cookie);
    }

    // ===== لاگ اوت =====
    if (path === '/taakaa/logout' || path === '/logout') {
      await sessionMgr.destroy(sessionToken);
      return redirectResponse('/', 'taakaa_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0');
    }

    // ===== بقیه مسیرهای پنل =====
    if (path.startsWith('/taakaa/')) {
      var session = null;
      if (sessionToken) session = await sessionMgr.validate(sessionToken);
      if (!session) {
        return htmlResponse(loginPage());
      }

      var cleanPath = path.replace('/taakaa', '');

      if (cleanPath === '/users' || cleanPath === '/users/') {
        var users = await storage.getAllUsers();
        return htmlResponse(usersPage(users));
      }

      if (cleanPath === '/settings' || cleanPath === '/settings/') {
        var config = await storage.getSystemConfig();
        return htmlResponse(settingsPage(config));
      }

      if (cleanPath === '/scanner' || cleanPath === '/scanner/') {
        return htmlResponse(scannerPage());
      }

      if (cleanPath === '/info-protocols' || cleanPath === '/info-protocols/') {
        var config = await storage.getSystemConfig();
        return htmlResponse(infoProtocolsPage(config));
      }

      if (cleanPath === '/subscription' || cleanPath === '/subscription/') {
        var config = await storage.getSystemConfig();
        var users = await storage.getAllUsers();
        return htmlResponse(subscriptionPage(users, config, domain));
      }

      if (cleanPath === '/owners' || cleanPath === '/owners/') {
        return htmlResponse(ownersPage());
      }

      // ===== API ها =====
      if (cleanPath === '/api/create-user' && method === 'POST') {
        var data = await request.json();
        var user = await userMgr.create(data);
        return jsonResponse({ success: true, user: user });
      }

      if (cleanPath === '/api/get-user') {
        var uuid = url.searchParams.get('uuid');
        var user = await userMgr.get(uuid);
        if (!user) return jsonResponse({ success: false, error: 'کاربر یافت نشد' }, 404);
        var stats = await userMgr.getStats(uuid);
        return jsonResponse({ success: true, user: stats });
      }

      if (cleanPath === '/api/edit-user' && method === 'POST') {
        var data = await request.json();
        var user = await userMgr.update(data.uuid, data);
        if (!user) return jsonResponse({ success: false, error: 'کاربر یافت نشد' }, 404);
        return jsonResponse({ success: true, user: user });
      }

      if (cleanPath === '/api/delete-user' && method === 'POST') {
        var data = await request.json();
        await userMgr.delete(data.uuid);
        return jsonResponse({ success: true });
      }

      if (cleanPath === '/api/toggle-user' && method === 'POST') {
        var data = await request.json();
        var user = await userMgr.toggleStatus(data.uuid);
        if (!user) return jsonResponse({ success: false, error: 'کاربر یافت نشد' }, 404);
        return jsonResponse({ success: true, user: user });
      }

      if (cleanPath === '/api/reset-usage' && method === 'POST') {
        var data = await request.json();
        var user = await userMgr.resetUsage(data.uuid);
        if (!user) return jsonResponse({ success: false, error: 'کاربر یافت نشد' }, 404);
        return jsonResponse({ success: true, user: user });
      }

      if (cleanPath === '/api/update-settings' && method === 'POST') {
        var data = await request.json();
        var config = await storage.getSystemConfig();

        if (data.fragment_enabled !== undefined) {
          config.FRAGMENT_ENABLED = data.fragment_enabled === true ||
            data.fragment_enabled === 'true' ||
            data.fragment_enabled === 'on';
        }
        if (data.fragment_size) config.FRAGMENT_SIZE = data.fragment_size;
        if (data.fragment_count) config.FRAGMENT_COUNT = parseInt(data.fragment_count);
        if (data.fragment_delay) config.FRAGMENT_DELAY = data.fragment_delay;
        if (data.warp_enabled !== undefined) {
          config.WARP_ENABLED = data.warp_enabled === true ||
            data.warp_enabled === 'true' ||
            data.warp_enabled === 'on';
        }
        if (data.warp_pro_enabled !== undefined) {
          config.WARP_PRO_ENABLED = data.warp_pro_enabled === true ||
            data.warp_pro_enabled === 'true' ||
            data.warp_pro_enabled === 'on';
        }
        if (data.ech_enabled !== undefined) {
          config.ECH_ENABLED = data.ech_enabled === true ||
            data.ech_enabled === 'true' ||
            data.ech_enabled === 'on';
        }
        if (data.sni) {
          config.SNI_LIST = [data.sni, ...config.SNI_LIST.filter(function(s) {
            return s !== data.sni;
          })];
        }
        if (data.clean_ips) {
          config.CLEAN_IPS = data.clean_ips;
        }

        await storage.saveSystemConfig(config);
        return jsonResponse({ success: true });
      }

      if (cleanPath === '/api/change-password' && method === 'POST') {
        var data = await request.json();
        var config = await storage.getSystemConfig();

        var validCurrent = await verifyPass(data.current, config.ADMIN_PASSWORD_HASH);
        if (!validCurrent) {
          return jsonResponse({ success: false, error: 'رمز فعلی اشتباه است' });
        }

        if (data.new_password !== data.confirm) {
          return jsonResponse({ success: false, error: 'رمزهای جدید مطابقت ندارند' });
        }

        config.ADMIN_PASSWORD_HASH = await hashPass(data.new_password);
        await storage.saveSystemConfig(config);
        return jsonResponse({ success: true });
      }

      if (cleanPath === '/api/backup-kv') {
        var config = await storage.getSystemConfig();
        var users = await storage.getAllUsers();
        return jsonResponse({
          exportedAt: new Date().toISOString(),
          version: 'v16.5-pro',
          config: config,
          users: users,
          totalUsers: users.length
        });
      }

      if (cleanPath === '/api/quick-scan') {
        var results = await quickScan();
        var bestIP = results.find(function(r) { return r.alive; });
        return jsonResponse({
          success: true,
          results: results,
          bestIP: bestIP,
          total: results.length,
          alive: results.filter(function(r) { return r.alive; }).length
        });
      }

      if (cleanPath === '/api/full-scan') {
        return await handleFullScan();
      }

      if (cleanPath === '/api/get-configs') {
        var uuid = url.searchParams.get('uuid');
        var user = await userMgr.get(uuid);
        if (!user) return jsonResponse({ success: false, error: 'کاربر یافت نشد' }, 404);

        var config = await storage.getSystemConfig();
        var stats = await userMgr.getStats(uuid);

        return jsonResponse({
          success: true,
          user: stats,
          configs: {
            vless: generateVlessConfig(user, config, domain),
            trojan: generateTrojanConfig(user, config, domain),
            shadowsocks: generateShadowsocksConfig(user, config, domain),
            subscription: generateSubscription(user, config, domain)
          }
        });
      }

      // ===== سابسکریپشن =====
      var subResult = await handleSubscription(request, storage);
      if (subResult) return subResult;

      // ===== WebSocket =====
      if (cleanPath === '/ws' || cleanPath === '/trojan' || cleanPath === '/ss') {
        var users = await storage.getAllUsers();
        var activeUser = users.find(function(u) { return u.status === 'active'; });
        if (!activeUser) {
          return new Response('هیچ کاربر فعالی وجود ندارد', { status: 503 });
        }
        return await proxyHandler.handle(request, activeUser);
      }

      // ===== 404 =====
      return htmlResponse(nginx404Page());
    }

    // ===== 404 نهایی =====
    return htmlResponse(nginx404Page());
  }
};
