// =============================================
// TAAKAA-XI PRO v16 - Complete Worker
// تمام ۸ پورت + رفع باگ‌ها
// =============================================

// ==================== Polyfills ====================
const base64Encode = (str) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  let binary = '';
  data.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary);
};

const base64Decode = (str) => {
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
};

// ==================== UUID Utils ====================
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function validateUUID(uuid) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}

// ==================== Constants ====================
const SYSTEM_CONFIG = {
  ADMIN_PASSWORD_HASH: null,
  TOTP_SECRET: generateUUID(),
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
  HOST_POOL: []
};

// ==================== Crypto Utils ====================
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'taakaa-salt-v16-pro-2024');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(password, hash) {
  const inputHash = await hashPassword(password);
  return inputHash === hash;
}

function generateSessionToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateTOTP(secret) {
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
  const expected = generateTOTP(secret);
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

// ==================== Smart Parser ====================
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

// ==================== Cookie Parser ====================
function getCookie(cookieHeader, name) {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) return decodeURIComponent(value || '');
  }
  return null;
}

// ==================== Storage Manager ====================
class StorageManager {
  constructor(env) {
    this.kv = env.TAAKAA_KV;
    this.d1 = env.TAAKAA_DB || null;
    this.memCache = {};
  }

  async get(key) {
    if (this.memCache[key] && this.memCache[key].exp > Date.now()) {
      return this.memCache[key].data;
    }
    try {
      let data = await this.kv.get(key, 'json');
      if (data) {
        this.memCache[key] = { data, exp: Date.now() + 30000 };
        return data;
      }
      if (this.d1) {
        const result = await this.d1.prepare('SELECT value FROM storage WHERE key = ?').bind(key).first();
        if (result && result.value) {
          data = JSON.parse(result.value);
          this.memCache[key] = { data, exp: Date.now() + 30000 };
          return data;
        }
      }
    } catch (e) {
      console.error('Storage.get error:', e);
    }
    return null;
  }

  async put(key, value, ttl) {
    const keys = Object.keys(this.memCache);
    if (keys.length > 500) {
      delete this.memCache[keys[0]];
    }
    this.memCache[key] = { data: value, exp: Date.now() + 30000 };
    try {
      await this.kv.put(key, JSON.stringify(value), { expirationTtl: ttl || SYSTEM_CONFIG.SESSION_EXPIRY });
      if (this.d1) {
        await this.d1.prepare('INSERT OR REPLACE INTO storage (key, value, updated_at) VALUES (?, ?, ?)')
          .bind(key, JSON.stringify(value), Date.now()).run();
      }
      return true;
    } catch (e) {
      console.error('Storage.put error:', e);
      return false;
    }
  }

  async delete(key) {
    delete this.memCache[key];
    try {
      await this.kv.delete(key);
      if (this.d1) await this.d1.prepare('DELETE FROM storage WHERE key = ?').bind(key).run();
      return true;
    } catch (e) { return false; }
  }

  async list(prefix) {
    try {
      const result = await this.kv.list({ prefix, limit: 1000 });
      return result.keys.map(k => k.name);
    } catch (e) { return []; }
  }

  async getAllUsers() {
    const keys = await this.list('user:');
    const users = [];
    for (const key of keys) {
      const user = await this.get(key);
      if (user) users.push(user);
    }
    return users.sort((a, b) => b.createdAt - a.createdAt);
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
    config.version = 'v16-pro';
    await this.put('system:config', config);
    return config;
  }
}

// ==================== Session Manager ====================
class SessionManager {
  constructor(storage) {
    this.storage = storage;
  }

  async create(userData) {
    const token = generateSessionToken();
    const session = {
      ...userData,
      token,
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
      uuid,
      name: data.name || 'User-' + uuid.substring(0, 8),
      ip: data.ip || '',
      quotaTotal: parseBytes(data.quota || '5GB'),
      quotaDaily: parseBytes(data.dailyQuota || '1GB'),
      usageTotal: 0,
      dailyUsage: {},
      expiryDays,
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
      daysLeft,
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
  link += '#TAAKAA-XI-' + encodeURIComponent(user.name);
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
  link += '#TAAKAA-XI-' + encodeURIComponent(user.name) + '-Trojan';
  return link;
}

function generateShadowsocksConfig(user, config, domain) {
  const method = 'aes-256-gcm';
  const password = user.uuid.replace(/-/g, '').substring(0, 16);
  const port = (config.PORTS && config.PORTS[0]) ? config.PORTS[0] : 443;
  const raw = method + ':' + password + '@' + domain + ':' + port;
  const encoded = base64Encode(raw);
  return 'ss://' + encoded + '#TAAKAA-XI-' + encodeURIComponent(user.name) + '-SS';
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
    '  - name: "TAAKAA-XI-' + user.name + '-VLESS"\n' +
    '    type: vless\n' +
    '    server: ' + domain + '\n' +
    '    port: 443\n' +
    '    uuid: ' + uuid + '\n' +
    '    network: ws\n' +
    '    ws-opts:\n' +
    '      path: /ws\n' +
    '      headers:\n' +
    '        Host: ' + domain + '\n' +
    '    tls: true\n' +
    '    servername: ' + sni + '\n' +
    '    client-fingerprint: chrome\n\n' +
    '  - name: "TAAKAA-XI-' + user.name + '-Trojan"\n' +
    '    type: trojan\n' +
    '    server: ' + domain + '\n' +
    '    port: 443\n' +
    '    password: ' + uuid + '\n' +
    '    network: ws\n' +
    '    ws-opts:\n' +
    '      path: /trojan\n' +
    '      headers:\n' +
    '        Host: ' + domain + '\n' +
    '    tls: true\n' +
    '    sni: ' + sni + '\n';
}

// ==================== IP Scanner ====================
const TEST_IPS = [
  { ip: '185.143.234.120', operator: 'mtn', location: 'IR' },
  { ip: '185.143.233.120', operator: 'mtn', location: 'IR' },
  { ip: '185.143.232.120', operator: 'mtn', location: 'IR' },
  { ip: '185.143.231.120', operator: 'mtn', location: 'IR' },
  { ip: '5.160.0.10', operator: 'mci', location: 'IR' },
  { ip: '5.160.1.10', operator: 'mci', location: 'IR' },
  { ip: '5.74.0.10', operator: 'mtn', location: 'IR' },
  { ip: '2.176.0.10', operator: 'mci', location: 'IR' },
  { ip: '2.176.1.10', operator: 'mci', location: 'IR' },
  { ip: '46.209.0.10', operator: 'rtl', location: 'IR' },
  { ip: '188.212.0.10', operator: 'rtl', location: 'IR' },
  { ip: '91.107.131.10', operator: 'rtl', location: 'IR' },
  { ip: '188.121.96.10', operator: 'rtl', location: 'IR' },
  { ip: '86.104.0.10', operator: 'mtn', location: 'IR' },
  { ip: '86.104.1.10', operator: 'mtn', location: 'IR' },
  { ip: '5.160.2.10', operator: 'mci', location: 'IR' },
  { ip: '46.209.1.10', operator: 'rtl', location: 'IR' },
  { ip: '188.212.1.10', operator: 'rtl', location: 'IR' },
  { ip: '91.107.130.10', operator: 'rtl', location: 'IR' },
  { ip: '188.121.97.10', operator: 'rtl', location: 'IR' }
];

async function scanIP(ip, timeout = 3000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const start = Date.now();
    const response = await fetch('https://' + ip + '/', {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    clearTimeout(timer);
    return { ip, alive: response.status < 500, latency: Date.now() - start, status: response.status };
  } catch (e) {
    clearTimeout(timer);
    return { ip, alive: false, latency: Infinity, error: e.message };
  }
}

async function quickScan() {
  const ips = TEST_IPS.slice(0, 5);
  const results = await Promise.all(ips.map(item => scanIP(item.ip, 2000)));
  return results.map((r, i) => ({
    ...r,
    operator: ips[i].operator,
    location: ips[i].location
  })).sort((a, b) => a.latency - b.latency);
}

async function fullScan() {
  const results = await Promise.all(TEST_IPS.map(item => scanIP(item.ip, 3000)));
  return results.map((r, i) => ({
    ...r,
    operator: TEST_IPS[i].operator,
    location: TEST_IPS[i].location
  })).sort((a, b) => a.latency - b.latency);
}

// ==================== Host Pool Manager ====================
async function getPoolHosts(storage) {
  const raw = await storage.get('system:hostpool');
  if (raw && Array.isArray(raw) && raw.length > 0) {
    return [...new Set(raw.filter(Boolean))];
  }
  const config = await storage.getSystemConfig();
  if (config.HOST_POOL && config.HOST_POOL.length > 0) {
    return config.HOST_POOL;
  }
  return [];
}

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
      return new Response('Quota exceeded or user suspended', { status: 429 });
    }

    if (path === '/ws' && upgrade.toLowerCase() === 'websocket') {
      return await this.handleWebSocketTunnel(request, user, 'vless');
    }
    if (path === '/trojan' && upgrade.toLowerCase() === 'websocket') {
      return await this.handleWebSocketTunnel(request, user, 'trojan');
    }
    if (path === '/ss' && upgrade.toLowerCase() === 'websocket') {
      return await this.handleWebSocketTunnel(request, user, 'shadowsocks');
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

  async handleWebSocketTunnel(request, user, protocol) {
    const config = await this.storage.getSystemConfig();
    const poolHosts = await getPoolHosts(this.storage);
    
    const pair = new WebSocketPair();
    const clientSocket = pair[0];
    const serverSocket = pair[1];
    
    serverSocket.accept();
    
    serverSocket.addEventListener('message', async (event) => {
      try {
        const bytes = (event.data instanceof ArrayBuffer) ? event.data.byteLength : 
                      (typeof event.data === 'string' ? new TextEncoder().encode(event.data).length : 0);
        await this.userManager.trackBytes(user.uuid, bytes);

        if (poolHosts.length > 0 && config.PROXY_FALLBACK_ENABLED) {
          const promises = poolHosts.map(host => 
            fetch('https://' + host + '/relay', {
              method: 'POST',
              headers: { 'Content-Type': 'application/octet-stream' },
              body: event.data
            }).catch(() => null)
          );
          const validPromises = promises.filter(p => p !== null);
          if (validPromises.length > 0) {
            try {
              const result = await Promise.any(validPromises);
              if (result && result.ok) {
                const responseData = await result.arrayBuffer();
                serverSocket.send(responseData);
                return;
              }
            } catch (e) {
              console.error('All proxies failed:', e);
            }
          }
        }
        
        serverSocket.send(event.data);
      } catch (e) {
        console.error('WS tunnel error:', e);
      }
    });

    serverSocket.addEventListener('close', () => {
      console.log('User ' + user.name + ' disconnected from ' + protocol);
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

// ==================== HTML Generator ====================
function getStyles() {
  return `
    :root {
      --primary: #ff6b00;
      --primary-hover: #e65c00;
      --bg-deep: #0a0a0f;
      --bg-card: #1a1a2e;
      --text: #ffffff;
      --text2: #a0a0b8;
      --border: #2a2a3c;
      --success: #16a34a;
      --danger: #ef4444;
      --warning: #f59e0b;
      --radius: 16px;
      --shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    *{margin:0;padding:0;box-sizing:border-box}
    body{
      background:var(--bg-deep);
      background-image:radial-gradient(circle at 20% 10%, #1a1a2e, #0a0a0f);
      color:var(--text);
      font-family:'Segoe UI',system-ui,sans-serif;
      padding:20px;
      min-height:100vh;
      direction:rtl;
      line-height:1.6;
    }
    .container{max-width:1400px;margin:0 auto}
    .header{
      background:rgba(26,26,46,0.7);
      backdrop-filter:blur(12px);
      border:1px solid var(--border);
      border-radius:var(--radius);
      padding:20px;
      margin-bottom:20px;
      box-shadow:var(--shadow);
      display:flex;
      justify-content:space-between;
      align-items:center;
      flex-wrap:wrap;
      gap:15px;
    }
    .brand{
      background:linear-gradient(135deg, #ff6b00, #ff8c42);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      font-size:1.8rem;
      font-weight:800;
    }
    .nav{
      display:flex;
      gap:8px;
      background:var(--bg-card);
      padding:6px;
      border-radius:40px;
      border:1px solid var(--border);
      flex-wrap:wrap;
      margin-bottom:20px;
    }
    .nav a,.nav button{
      padding:10px 18px;
      border-radius:30px;
      font-weight:600;
      font-size:14px;
      background:transparent;
      color:var(--text2);
      border:none;
      cursor:pointer;
      text-decoration:none;
      transition:0.2s;
      white-space:nowrap;
    }
    .nav a.active,.nav button.active{
      background:var(--primary);
      color:white;
      box-shadow:0 4px 12px rgba(255,107,0,0.4);
    }
    .nav a:hover,.nav button:hover{
      background:rgba(255,107,0,0.2);
      color:var(--text);
    }
    .card{
      background:var(--bg-card);
      border:1px solid var(--border);
      border-radius:var(--radius);
      padding:24px;
      box-shadow:var(--shadow);
      margin-bottom:20px;
      transition:transform 0.2s;
    }
    .card:hover{transform:translateY(-2px)}
    .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:20px}
    .grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-bottom:20px}
    .grid3{display:grid;grid-template-columns:2fr 1fr 1fr;gap:20px;margin-bottom:20px}
    .stat-val{
      font-size:2rem;
      font-weight:800;
      background:linear-gradient(to left,#fff,#ddd);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      margin:10px 0;
    }
    .btn{
      background:linear-gradient(135deg,#ff6b00,#ff8c42);
      color:white;
      border:none;
      padding:12px 24px;
      border-radius:30px;
      font-weight:600;
      cursor:pointer;
      text-decoration:none;
      display:inline-flex;
      align-items:center;
      gap:8px;
      transition:0.2s;
      box-shadow:0 4px 12px rgba(255,107,0,0.3);
      font-size:14px;
    }
    .btn:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(255,107,0,0.4)}
    .btn-sm{padding:6px 14px;font-size:13px}
    .btn-outline{background:transparent;border:1px solid var(--primary);color:var(--primary);box-shadow:none}
    .btn-danger{background:linear-gradient(135deg,#ef4444,#dc2626);box-shadow:0 4px 12px rgba(239,68,68,0.3)}
    .btn-warn{background:linear-gradient(135deg,#f59e0b,#d97706);box-shadow:0 4px 12px rgba(245,158,11,0.3)}
    table{width:100%;border-collapse:collapse}
    th,td{padding:12px 16px;text-align:right;border-bottom:1px solid var(--border)}
    th{color:var(--text2);font-size:13px;font-weight:600}
    td{font-size:14px}
    .badge{padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;display:inline-block}
    .badge-ok{background:rgba(22,163,74,0.15);color:var(--success)}
    .badge-err{background:rgba(239,68,68,0.15);color:var(--danger)}
    .badge-warn{background:rgba(245,158,11,0.15);color:var(--warning)}
    .progress{height:8px;background:#2a2a3c;border-radius:10px;overflow:hidden;margin:5px 0}
    .progress-fill{height:100%;background:linear-gradient(90deg,#ff6b00,#ff8c42);border-radius:10px;transition:0.3s}
    input,select,textarea{
      width:100%;
      padding:12px;
      background:var(--bg-deep);
      border:1px solid var(--border);
      color:var(--text);
      border-radius:8px;
      font-size:14px;
      margin:8px 0;
      font-family:inherit;
    }
    input:focus,select:focus,textarea:focus{
      outline:none;
      border-color:var(--primary);
      box-shadow:0 0 0 3px rgba(255,107,0,0.1);
    }
    .toggle{position:relative;display:inline-block;width:44px;height:24px}
    .toggle input{opacity:0;width:0;height:0}
    .toggle .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#3a3a4a;transition:0.3s;border-radius:34px}
    .toggle .slider:before{position:absolute;content:"";height:18px;width:18px;left:3px;bottom:3px;background:white;transition:0.3s;border-radius:50%}
    .toggle input:checked+.slider{background:var(--primary)}
    .toggle input:checked+.slider:before{transform:translateX(20px)}
    .modal-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:1000;align-items:center;justify-content:center}
    .modal-overlay.active{display:flex}
    .modal{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:24px;width:90%;max-width:500px;box-shadow:0 20px 40px rgba(0,0,0,0.5);max-height:90vh;overflow-y:auto}
    .flex{display:flex;justify-content:space-between;align-items:center;gap:10px}
    .flex-wrap{flex-wrap:wrap}
    .mt-10{margin-top:10px}.mt-20{margin-top:20px}.mb-10{margin-bottom:10px}.mb-20{margin-bottom:20px}
    .text-center{text-align:center}
    .code-block{
      background:var(--bg-deep);
      padding:16px;
      border-radius:8px;
      font-family:'Courier New',monospace;
      direction:ltr;
      text-align:left;
      overflow-x:auto;
      font-size:13px;
      border:1px solid var(--border);
      word-break:break-all;
    }
    .fade-in{animation:fadeIn 0.5s ease}
    .pulse{animation:pulse 2s infinite}
    @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%{opacity:1}50%{opacity:0.5}100%{opacity:1}}
    @keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
    .toast{
      position:fixed;top:20px;right:20px;padding:16px 24px;
      background:var(--bg-card);border:1px solid var(--border);
      border-radius:12px;box-shadow:var(--shadow);z-index:9999;
      animation:slideIn 0.3s ease;display:flex;align-items:center;gap:10px;
    }
    .flag{font-size:28px;cursor:pointer;transition:transform 0.2s}
    .flag:hover{transform:scale(1.3)}
    .protocol-card{
      background:var(--bg-deep);border:1px solid var(--border);
      border-radius:12px;padding:20px;margin:10px 0;
    }
    .protocol-card h4{color:var(--primary);margin-bottom:10px}
    .protocol-card p{color:var(--text2);font-size:13px;line-height:1.8}
    @media(max-width:768px){
      .grid4{grid-template-columns:repeat(2,1fr)}
      .grid2,.grid3{grid-template-columns:1fr}
    }
    @media(max-width:480px){
      .grid4{grid-template-columns:1fr}
      body{padding:10px}
      .header{flex-direction:column}
      .nav{overflow-x:auto;flex-wrap:nowrap}
    }
  `;
}

function getJS() {
  return `
    function showToast(msg, type){
      var t = document.createElement('div');
      t.className = 'toast';
      t.style.borderRight = '4px solid ' + (type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--primary)');
      t.innerHTML = msg;
      document.body.appendChild(t);
      setTimeout(function(){ t.remove(); }, 3000);
    }
    function openModal(id){ document.getElementById(id).classList.add('active'); }
    function closeModal(id){ document.getElementById(id).classList.remove('active'); }
    function copyText(text){
      navigator.clipboard.writeText(text).then(function(){
        showToast('✅ کپی شد!', 'success');
      });
    }
    async function api(url, method, body){
      var o = { method: method || 'GET', headers: {} };
      if (body) { o.headers['Content-Type'] = 'application/json'; o.body = JSON.stringify(body); }
      var r = await fetch(url, o);
      return await r.json();
    }
    async function toggleUser(uuid){
      var r = await api('/api/toggle-user', 'POST', { uuid: uuid });
      if (r.success) { showToast('وضعیت تغییر کرد', 'success'); setTimeout(function(){ location.reload(); }, 500); }
      else showToast(r.error || 'خطا', 'error');
    }
    async function deleteUser(uuid){
      if (!confirm('آیا مطمئن هستید؟')) return;
      var r = await api('/api/delete-user', 'POST', { uuid: uuid });
      if (r.success) { showToast('کاربر حذف شد', 'success'); setTimeout(function(){ location.reload(); }, 500); }
      else showToast(r.error || 'خطا', 'error');
    }
    async function resetUsage(uuid){
      var r = await api('/api/reset-usage', 'POST', { uuid: uuid });
      if (r.success) { showToast('مصرف ریست شد', 'success'); setTimeout(function(){ location.reload(); }, 500); }
      else showToast(r.error || 'خطا', 'error');
    }
  `;
}

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

// ==================== Pages ====================
function loginPage(error) {
  const errorHTML = error ? '<div class="card" style="border:1px solid var(--danger);color:var(--danger);text-align:center;">' + error + '</div>' : '';
  const content = `
    <div class="header">
      <span class="brand">⚡ TAAKAA-XI PRO v16</span>
      <span style="color:var(--text2);">ورود به پنل مدیریت</span>
    </div>
    <div style="max-width:450px;margin:80px auto;">
      <div class="card fade-in">
        <h2 style="text-align:center;margin-bottom:20px;">🔐 ورود ادمین</h2>
        ${errorHTML}
        <form method="POST" action="/api/login">
          <input type="password" name="password" placeholder="رمز عبور" required autofocus>
          <input type="text" name="totp" placeholder="کد TOTP (اختیاری)" maxlength="6" pattern="[0-9]{6}" inputmode="numeric">
          <button type="submit" class="btn" style="width:100%;margin-top:15px;">🚀 ورود</button>
        </form>
        <p style="text-align:center;margin-top:15px;color:var(--text2);font-size:13px;">
          📢 کانال: @TaaKaaOrg | نسخه ۱۶ پرو
        </p>
      </div>
    </div>
  `;
  return wrapHTML(content, 'TAAKAA-XI | ورود');
}

function setupPage(error) {
  const errorHTML = error ? '<div class="card" style="border:1px solid var(--danger);color:var(--danger);text-align:center;">' + error + '</div>' : '';
  const content = `
    <div class="header">
      <span class="brand">🛠️ راه‌اندازی اولیه TAAKAA-XI</span>
    </div>
    <div style="max-width:500px;margin:40px auto;">
      <div class="card fade-in">
        <h2 style="text-align:center;">🎉 خوش آمدید!</h2>
        <p style="color:var(--text2);text-align:center;">این اولین اجرای شماست. رمز عبور ادمین را تنظیم کنید.</p>
        ${errorHTML}
        <form method="POST" action="/api/setup">
          <input type="password" name="password" placeholder="رمز عبور جدید" required minlength="6">
          <input type="password" name="confirm" placeholder="تکرار رمز عبور" required minlength="6">
          <button type="submit" class="btn" style="width:100%;margin-top:15px;">✅ راه‌اندازی</button>
        </form>
      </div>
    </div>
  `;
  return wrapHTML(content, 'TAAKAA-XI | Setup');
}

function dashboardPage(users, config) {
  const activeUsers = users.filter(function(u) { return u.status === 'active'; }).length;
  const totalUsage = users.reduce(function(sum, u) { return sum + (u.usageTotal || 0); }, 0);
  const today = new Date().toISOString().split('T')[0];
  const todayUsage = users.reduce(function(sum, u) {
    return sum + ((u.dailyUsage && u.dailyUsage[today]) ? u.dailyUsage[today] : 0);
  }, 0);
  
  const recentActivity = users.sort(function(a, b) {
    return (b.lastAccess || 0) - (a.lastAccess || 0);
  }).slice(0, 5);
  
  const activityHTML = recentActivity.length > 0 ? recentActivity.map(function(u) {
    return '<div class="flex" style="padding:8px 0;border-bottom:1px solid var(--border);">' +
      '<span>' + u.name + '</span>' +
      '<span style="color:var(--text2);font-size:12px;">' + (u.lastAccess ? new Date(u.lastAccess).toLocaleString('fa-IR') : '—') + '</span>' +
      '</div>';
  }).join('') : '<p style="color:var(--text2);">هنوز فعالیتی ثبت نشده</p>';
  
  const content = `
    <div class="header fade-in">
      <div class="flex" style="gap:20px;">
        <span class="brand">⚡ TAAKAA-XI PRO v16</span>
        <span class="badge badge-ok" style="font-size:13px;">🟢 عملیاتی</span>
      </div>
      <span style="color:var(--text2);">🏗️ تیم تاکا | @TaaKaaOrg</span>
    </div>
    <div class="nav fade-in">
      <a href="/" class="active">📊 داشبورد</a>
      <a href="/users">👥 کاربران</a>
      <a href="/settings">⚙️ تنظیمات</a>
      <a href="/scanner">📡 اسکنر</a>
      <a href="/info-protocols">📖 پروتکل‌ها</a>
      <a href="/subscription">📦 اشتراک</a>
      <a href="/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a>
    </div>
    <div class="grid4 fade-in">
      <div class="card">
        <div style="color:var(--text2);font-size:13px;">👥 کاربران</div>
        <div class="stat-val">${users.length}</div>
        <span class="badge badge-ok">${activeUsers} فعال</span>
        <span class="badge badge-err" style="margin-right:4px;">${users.length - activeUsers} معلق</span>
      </div>
      <div class="card">
        <div style="color:var(--text2);font-size:13px;">📊 ترافیک کل</div>
        <div class="stat-val">${formatBytes(totalUsage)}</div>
        <span style="color:var(--text2);font-size:12px;">امروز: ${formatBytes(todayUsage)}</span>
      </div>
      <div class="card">
        <div style="color:var(--text2);font-size:13px;">🛡️ Fragment</div>
        <div class="stat-val">${config.FRAGMENT_ENABLED ? '✅' : '❌'}</div>
        <span style="color:var(--text2);font-size:12px;">${config.FRAGMENT_ENABLED ? 'size: ' + (config.FRAGMENT_SIZE || '1-5') + ' | count: ' + (config.FRAGMENT_COUNT || 3) : 'غیرفعال'}</span>
      </div>
      <div class="card">
        <div style="color:var(--text2);font-size:13px;">🌐 WARP</div>
        <div class="stat-val">${config.WARP_ENABLED ? '✅' : '❌'}</div>
        <span style="color:var(--text2);font-size:12px;">Pro: ${config.WARP_PRO_ENABLED ? 'فعال' : 'غیرفعال'}</span>
      </div>
    </div>
    <div class="grid3 fade-in">
      <div class="card">
        <h3 style="margin-bottom:15px;">🛡️ وضعیت امنیتی</h3>
        <div class="flex" style="margin:12px 0;"><span>Fragment</span><span class="badge ${config.FRAGMENT_ENABLED ? 'badge-ok' : 'badge-err'}">${config.FRAGMENT_ENABLED ? 'فعال' : 'غیرفعال'}</span></div>
        <div class="flex" style="margin:12px 0;"><span>ECH</span><span class="badge ${config.ECH_ENABLED ? 'badge-ok' : 'badge-err'}">${config.ECH_ENABLED ? 'فعال' : 'غیرفعال'}</span></div>
        <div class="flex" style="margin:12px 0;"><span>TOTP 2FA</span><span class="badge badge-ok">فعال</span></div>
        <div class="flex" style="margin:12px 0;"><span>Rate Limit</span><span class="badge badge-warn">${SYSTEM_CONFIG.MAX_LOGIN_ATTEMPTS} تلاش</span></div>
        <div class="flex" style="margin:12px 0;"><span>DNS over HTTPS</span><span class="badge badge-ok">فعال</span></div>
      </div>
      <div class="card">
        <h3 style="margin-bottom:15px;">📋 فعالیت اخیر</h3>
        ${activityHTML}
      </div>
      <div class="card">
        <h3 style="margin-bottom:15px;">📦 اطلاعات سیستم</h3>
        <div style="color:var(--text2);font-size:13px;line-height:2;">
          <p>🔹 نسخه: <strong>v16 PRO</strong></p>
          <p>🔹 پروتکل: <strong>${(config.DEFAULT_PROTOCOL || 'vless').toUpperCase()}</strong></p>
          <p>🔹 SNI: <strong>${(config.SNI_LIST && config.SNI_LIST[0]) ? config.SNI_LIST[0] : 'www.google.com'}</strong></p>
          <p>🔹 پورت: <strong>${(config.PORTS && config.PORTS[0]) ? config.PORTS[0] : 443}</strong></p>
          <p>🔹 Fingerprint: <strong>${(config.FINGERPRINTS && config.FINGERPRINTS[0]) ? config.FINGERPRINTS[0] : 'chrome'}</strong></p>
        </div>
      </div>
    </div>
    <p style="text-align:center;color:var(--text2);margin-top:20px;font-size:13px;">
      🏗️ توسعه توسط تیم TAAKAA | ۳ ماه توسعه | 📢 @TaaKaaOrg | ⚡ نسخه ۱۶ پرو
    </p>
  `;
  return wrapHTML(content, 'TAAKAA-XI | داشبورد');
}

function usersPage(users) {
  const rows = users.map(function(u) {
    const usagePercent = u.quotaTotal > 0 ? Math.min(100, ((u.usageTotal || 0) / u.quotaTotal) * 100) : 0;
    const daysLeft = u.expiryDate ? Math.max(0, Math.ceil((u.expiryDate - Date.now()) / 86400000)) : 0;
    return '<tr>' +
      '<td><strong>' + u.name + '</strong></td>' +
      '<td style="font-family:monospace;font-size:11px;direction:ltr;text-align:left;">' + u.uuid.substring(0, 18) + '...</td>' +
      '<td>' + (u.ip || '—') + '</td>' +
      '<td>' + formatBytes(u.usageTotal || 0) + ' / ' + formatBytes(u.quotaTotal) +
      '<div class="progress"><div class="progress-fill" style="width:' + usagePercent + '%"></div></div>' +
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
  
  const content = `
    <div class="header fade-in">
      <span class="brand">👥 مدیریت کاربران</span>
      <button class="btn" onclick="openModal('add-user-modal')">➕ کاربر جدید</button>
    </div>
    <div class="nav fade-in">
      <a href="/">📊 داشبورد</a>
      <a href="/users" class="active">👥 کاربران</a>
      <a href="/settings">⚙️ تنظیمات</a>
      <a href="/scanner">📡 اسکنر</a>
      <a href="/info-protocols">📖 پروتکل‌ها</a>
      <a href="/subscription">📦 اشتراک</a>
      <a href="/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a>
    </div>
    <div class="card fade-in">
      <h3 style="margin-bottom:20px;">لیست کاربران (${users.length} کاربر)</h3>
      <div style="overflow-x:auto;">
        <table>
          <thead><tr><th>نام</th><th>UUID</th><th>IP</th><th>مصرف</th><th>روزانه</th><th>زمان</th><th>وضعیت</th><th>اپراتور</th><th>عملیات</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      ${users.length === 0 ? '<p style="text-align:center;color:var(--text2);padding:40px;">هنوز کاربری ساخته نشده</p>' : ''}
    </div>
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
      async function createUser(){
        var f = document.getElementById('add-user-form');
        var d = new FormData(f);
        var data = {};
        d.forEach(function(v,k){ data[k] = v; });
        var r = await api('/api/create-user', 'POST', data);
        if(r.success){ showToast('✅ کاربر ایجاد شد', 'success'); closeModal('add-user-modal'); setTimeout(function(){ location.reload(); }, 500); }
        else showToast('❌ ' + (r.error || 'خطا'), 'error');
      }
      async function editUser(uuid){
        var r = await api('/api/get-user?uuid=' + uuid);
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
      async function saveEditUser(){
        var f = document.getElementById('edit-user-form');
        var d = new FormData(f);
        var data = {};
        d.forEach(function(v,k){ data[k] = v; });
        var r = await api('/api/edit-user', 'POST', data);
        if(r.success){ showToast('✅ ذخیره شد', 'success'); closeModal('edit-user-modal'); setTimeout(function(){ location.reload(); }, 500); }
        else showToast('❌ ' + (r.error || 'خطا'), 'error');
      }
    </script>
  `;
  return wrapHTML(content, 'TAAKAA-XI | کاربران');
}

function settingsPage(config) {
  const content = `
    <div class="header fade-in"><span class="brand">⚙️ تنظیمات سیستم</span></div>
    <div class="nav fade-in">
      <a href="/">📊 داشبورد</a>
      <a href="/users">👥 کاربران</a>
      <a href="/settings" class="active">⚙️ تنظیمات</a>
      <a href="/scanner">📡 اسکنر</a>
      <a href="/info-protocols">📖 پروتکل‌ها</a>
      <a href="/subscription">📦 اشتراک</a>
      <a href="/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a>
    </div>
    <div class="grid2">
      <div class="card fade-in">
        <h3 style="margin-bottom:20px;">🛡️ تکنیک‌های عبور از فیلترینگ</h3>
        <form onsubmit="event.preventDefault();saveSettings()" id="settings-form">
          <div class="flex" style="margin:15px 0;"><div><strong>Fragment</strong><br><small style="color:var(--text2);">تکه‌تکه کردن پکت TLS Hello</small></div><label class="toggle"><input type="checkbox" name="fragment_enabled" ${config.FRAGMENT_ENABLED ? 'checked' : ''}><span class="slider"></span></label></div>
          <div style="margin:15px 0;"><label>Fragment Size</label><input type="text" name="fragment_size" value="${config.FRAGMENT_SIZE || '1-5'}"></div>
          <div style="margin:15px 0;"><label>Fragment Count</label><input type="number" name="fragment_count" value="${config.FRAGMENT_COUNT || 3}" min="1" max="10"></div>
          <div style="margin:15px 0;"><label>Fragment Delay</label><input type="text" name="fragment_delay" value="${config.FRAGMENT_DELAY || '1-3'}"></div>
          <div class="flex" style="margin:15px 0;"><div><strong>WARP</strong><br><small style="color:var(--text2);">مسیریابی Cloudflare WARP</small></div><label class="toggle"><input type="checkbox" name="warp_enabled" ${config.WARP_ENABLED ? 'checked' : ''}><span class="slider"></span></label></div>
          <div class="flex" style="margin:15px 0;"><div><strong>WARP Pro</strong></div><label class="toggle"><input type="checkbox" name="warp_pro_enabled" ${config.WARP_PRO_ENABLED ? 'checked' : ''}><span class="slider"></span></label></div>
          <div class="flex" style="margin:15px 0;"><div><strong>ECH</strong></div><label class="toggle"><input type="checkbox" name="ech_enabled" ${config.ECH_ENABLED ? 'checked' : ''}><span class="slider"></span></label></div>
          <div style="margin:15px 0;"><label>SNI</label><select name="sni">${SYSTEM_CONFIG.SNI_LIST.map(function(s){ return '<option value="' +
// =============================================
// TAAKAA-XI PRO v16 - Complete Worker
// پارت ۱: Polyfills, Utils, Crypto, Parser
// =============================================

const base64Encode = (str) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  let binary = '';
  data.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary);
};

const base64Decode = (str) => {
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
};

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function validateUUID(uuid) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}

const SYSTEM_CONFIG = {
  ADMIN_PASSWORD_HASH: null,
  TOTP_SECRET: generateUUID(),
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
  HOST_POOL: []
};

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'taakaa-salt-v16-pro-2024');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(password, hash) {
  const inputHash = await hashPassword(password);
  return inputHash === hash;
}

function generateSessionToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateTOTP(secret) {
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
  const expected = generateTOTP(secret);
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
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) return decodeURIComponent(value || '');
  }
  return null;
                                                                                                                   }
                                                                                                                  // =============================================
// TAAKAA-XI PRO v16 - Complete Worker
// پارت ۲: Storage, Session, Rate Limiter, User Manager
// =============================================

class StorageManager {
  constructor(env) {
    this.kv = env.TAAKAA_KV;
    this.d1 = env.TAAKAA_DB || null;
    this.memCache = {};
  }

  async get(key) {
    if (this.memCache[key] && this.memCache[key].exp > Date.now()) {
      return this.memCache[key].data;
    }
    try {
      let data = await this.kv.get(key, 'json');
      if (data) {
        this.memCache[key] = { data, exp: Date.now() + 30000 };
        return data;
      }
      if (this.d1) {
        const result = await this.d1.prepare('SELECT value FROM storage WHERE key = ?').bind(key).first();
        if (result && result.value) {
          data = JSON.parse(result.value);
          this.memCache[key] = { data, exp: Date.now() + 30000 };
          return data;
        }
      }
    } catch (e) {
      console.error('Storage.get error:', e);
    }
    return null;
  }

  async put(key, value, ttl) {
    const keys = Object.keys(this.memCache);
    if (keys.length > 500) {
      delete this.memCache[keys[0]];
    }
    this.memCache[key] = { data: value, exp: Date.now() + 30000 };
    try {
      await this.kv.put(key, JSON.stringify(value), { expirationTtl: ttl || SYSTEM_CONFIG.SESSION_EXPIRY });
      if (this.d1) {
        await this.d1.prepare('INSERT OR REPLACE INTO storage (key, value, updated_at) VALUES (?, ?, ?)')
          .bind(key, JSON.stringify(value), Date.now()).run();
      }
      return true;
    } catch (e) {
      console.error('Storage.put error:', e);
      return false;
    }
  }

  async delete(key) {
    delete this.memCache[key];
    try {
      await this.kv.delete(key);
      if (this.d1) await this.d1.prepare('DELETE FROM storage WHERE key = ?').bind(key).run();
      return true;
    } catch (e) { return false; }
  }

  async list(prefix) {
    try {
      const result = await this.kv.list({ prefix, limit: 1000 });
      return result.keys.map(k => k.name);
    } catch (e) { return []; }
  }

  async getAllUsers() {
    const keys = await this.list('user:');
    const users = [];
    for (const key of keys) {
      const user = await this.get(key);
      if (user) users.push(user);
    }
    return users.sort((a, b) => b.createdAt - a.createdAt);
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
    config.version = 'v16-pro';
    await this.put('system:config', config);
    return config;
  }
}

class SessionManager {
  constructor(storage) {
    this.storage = storage;
  }

  async create(userData) {
    const token = generateSessionToken();
    const session = { ...userData, token, createdAt: Date.now(), lastAccess: Date.now() };
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

class UserManager {
  constructor(storage) {
    this.storage = storage;
  }

  async create(data) {
    const uuid = (data.uuid && validateUUID(data.uuid)) ? data.uuid : generateUUID();
    const now = Date.now();
    const expiryDays = parseDuration(data.expiry || '30d');
    const user = {
      uuid, name: data.name || 'User-' + uuid.substring(0, 8),
      ip: data.ip || '',
      quotaTotal: parseBytes(data.quota || '5GB'),
      quotaDaily: parseBytes(data.dailyQuota || '1GB'),
      usageTotal: 0, dailyUsage: {},
      expiryDays, expiryDate: now + (expiryDays * 86400000),
      status: 'active', operator: data.operator || 'mtn',
      protocol: data.protocol || 'vless',
      createdAt: now, lastAccess: now,
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
// TAAKAA-XI PRO v16 - Complete Worker
// پارت ۳: Config Generator, Scanner, Proxy Handler
// =============================================

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
  link += '#TAAKAA-XI-' + encodeURIComponent(user.name);
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
  link += '#TAAKAA-XI-' + encodeURIComponent(user.name) + '-Trojan';
  return link;
}

function generateShadowsocksConfig(user, config, domain) {
  const method = 'aes-256-gcm';
  const password = user.uuid.replace(/-/g, '').substring(0, 16);
  const port = (config.PORTS && config.PORTS[0]) ? config.PORTS[0] : 443;
  const raw = method + ':' + password + '@' + domain + ':' + port;
  const encoded = base64Encode(raw);
  return 'ss://' + encoded + '#TAAKAA-XI-' + encodeURIComponent(user.name) + '-SS';
}

function generateSubscription(user, config, domain) {
  const configs = [
    generateVlessConfig(user, config, domain),
    generateTrojanConfig(user, config, domain),
    generateShadowsocksConfig(user, config, domain)
  ];
  return base64Encode(configs.join('\n'));
}

const TEST_IPS = [
  { ip: '185.143.234.120', operator: 'mtn' },
  { ip: '185.143.233.120', operator: 'mtn' },
  { ip: '5.160.0.10', operator: 'mci' },
  { ip: '2.176.0.10', operator: 'mci' },
  { ip: '46.209.0.10', operator: 'rtl' }
];

async function scanIP(ip, timeout = 3000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const start = Date.now();
    const response = await fetch('https://' + ip + '/', {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    clearTimeout(timer);
    return { ip, alive: response.status < 500, latency: Date.now() - start };
  } catch (e) {
    clearTimeout(timer);
    return { ip, alive: false, latency: Infinity };
  }
}

async function quickScan() {
  const results = await Promise.all(TEST_IPS.map(item => scanIP(item.ip, 2000)));
  return results.map((r, i) => ({ ...r, operator: TEST_IPS[i].operator })).sort((a, b) => a.latency - b.latency);
}

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

    if (path === '/ws' && upgrade.toLowerCase() === 'websocket') {
      return await this.handleWebSocketTunnel(request, user);
    }
    if (path === '/trojan' && upgrade.toLowerCase() === 'websocket') {
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
    
    serverSocket.addEventListener('message', async (event) => {
      try {
        const bytes = (event.data instanceof ArrayBuffer) ? event.data.byteLength : 
                      (typeof event.data === 'string' ? new TextEncoder().encode(event.data).length : 0);
        await this.userManager.trackBytes(user.uuid, bytes);
        serverSocket.send(event.data);
      } catch (e) {
        console.error('WS error:', e);
      }
    });

    return new Response(null, { status: 101, webSocket: clientSocket });
  }

  async handleTCP(request, user) {
    try {
      const newHeaders = new Headers(request.headers);
      const config = await this.storage.getSystemConfig();
      if (config.WARP_ENABLED) newHeaders.set('CF-WARP', 'enabled');
      
      const modifiedRequest = new Request(request.url, {
        method: request.method,
        headers: newHeaders,
        body: request.body,
        redirect: request.redirect
      });
      
      const response = await fetch(modifiedRequest);
      const contentLength = parseInt(response.headers.get('Content-Length') || '0');
      if (contentLength > 0) await this.userManager.trackBytes(user.uuid, contentLength);
      return response;
    } catch (e) {
      return new Response('Proxy Error', { status: 502 });
    }
  }
}

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
  return null;
                                              }
                                                                                                                    // =============================================
// TAAKAA-XI PRO v16 - Complete Worker
// پارت ۴: HTML Pages + Export Default
// =============================================

function getStyles() {
  return ':root{--primary:#ff6b00;--bg-deep:#0a0a0f;--bg-card:#1a1a2e;--text:#fff;--text2:#a0a0b8;--border:#2a2a3c;--success:#16a34a;--danger:#ef4444;--warning:#f59e0b;--radius:16px;--shadow:0 10px 25px rgba(0,0,0,0.5)}*{margin:0;padding:0;box-sizing:border-box}body{background:var(--bg-deep);background-image:radial-gradient(circle at 20% 10%,#1a1a2e,#0a0a0f);color:var(--text);font-family:system-ui,sans-serif;padding:20px;min-height:100vh;direction:rtl;line-height:1.6}.container{max-width:1400px;margin:0 auto}.header{background:rgba(26,26,46,0.7);backdrop-filter:blur(12px);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:20px;box-shadow:var(--shadow);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:15px}.brand{background:linear-gradient(135deg,#ff6b00,#ff8c42);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:1.8rem;font-weight:800}.nav{display:flex;gap:8px;background:var(--bg-card);padding:6px;border-radius:40px;border:1px solid var(--border);flex-wrap:wrap;margin-bottom:20px}.nav a,.nav button{padding:10px 18px;border-radius:30px;font-weight:600;font-size:14px;background:transparent;color:var(--text2);border:none;cursor:pointer;text-decoration:none;transition:0.2s;white-space:nowrap}.nav a.active,.nav button.active{background:var(--primary);color:#fff;box-shadow:0 4px 12px rgba(255,107,0,0.4)}.card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow);margin-bottom:20px}.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:20px}.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-bottom:20px}.stat-val{font-size:2rem;font-weight:800;background:linear-gradient(to left,#fff,#ddd);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:10px 0}.btn{background:linear-gradient(135deg,#ff6b00,#ff8c42);color:#fff;border:none;padding:12px 24px;border-radius:30px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:0.2s;box-shadow:0 4px 12px rgba(255,107,0,0.3);font-size:14px}.btn:hover{transform:translateY(-2px)}.btn-sm{padding:6px 14px;font-size:13px}.btn-outline{background:transparent;border:1px solid var(--primary);color:var(--primary);box-shadow:none}.btn-danger{background:linear-gradient(135deg,#ef4444,#dc2626)}.btn-warn{background:linear-gradient(135deg,#f59e0b,#d97706)}table{width:100%;border-collapse:collapse}th,td{padding:12px 16px;text-align:right;border-bottom:1px solid var(--border)}th{color:var(--text2);font-size:13px}td{font-size:14px}.badge{padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;display:inline-block}.badge-ok{background:rgba(22,163,74,0.15);color:var(--success)}.badge-err{background:rgba(239,68,68,0.15);color:var(--danger)}.progress{height:8px;background:#2a2a3c;border-radius:10px;overflow:hidden;margin:5px 0}.progress-fill{height:100%;background:linear-gradient(90deg,#ff6b00,#ff8c42);border-radius:10px}input,select,textarea{width:100%;padding:12px;background:var(--bg-deep);border:1px solid var(--border);color:var(--text);border-radius:8px;font-size:14px;margin:8px 0;font-family:inherit}.toggle{position:relative;display:inline-block;width:44px;height:24px}.toggle input{opacity:0;width:0;height:0}.toggle .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#3a3a4a;transition:0.3s;border-radius:34px}.toggle .slider:before{position:absolute;content:"";height:18px;width:18px;left:3px;bottom:3px;background:#fff;transition:0.3s;border-radius:50%}.toggle input:checked+.slider{background:var(--primary)}.toggle input:checked+.slider:before{transform:translateX(20px)}.modal-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:1000;align-items:center;justify-content:center}.modal-overlay.active{display:flex}.modal{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:24px;width:90%;max-width:500px;box-shadow:0 20px 40px rgba(0,0,0,0.5);max-height:90vh;overflow-y:auto}.flex{display:flex;justify-content:space-between;align-items:center;gap:10px}.mt-10{margin-top:10px}.mt-20{margin-top:20px}.mb-20{margin-bottom:20px}.text-center{text-align:center}.code-block{background:var(--bg-deep);padding:16px;border-radius:8px;font-family:monospace;direction:ltr;text-align:left;overflow-x:auto;font-size:13px;border:1px solid var(--border);word-break:break-all}.fade-in{animation:fadeIn 0.5s ease}.pulse{animation:pulse 2s infinite}@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%{opacity:1}50%{opacity:0.5}100%{opacity:1}}@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}.toast{position:fixed;top:20px;right:20px;padding:16px 24px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;box-shadow:var(--shadow);z-index:9999;animation:slideIn 0.3s ease}.flag{font-size:28px;cursor:pointer;transition:transform 0.2s}.flag:hover{transform:scale(1.3)}@media(max-width:768px){.grid4{grid-template-columns:repeat(2,1fr)}.grid2{grid-template-columns:1fr}}@media(max-width:480px){.grid4{grid-template-columns:1fr}body{padding:10px}.header{flex-direction:column}}';
}

function getJS() {
  return 'function showToast(m,t){var d=document.createElement("div");d.className="toast";d.style.borderRight="4px solid "+(t==="success"?"var(--success)":t==="error"?"var(--danger)":"var(--primary)");d.innerHTML=m;document.body.appendChild(d);setTimeout(function(){d.remove()},3000)}function openModal(i){document.getElementById(i).classList.add("active")}function closeModal(i){document.getElementById(i).classList.remove("active")}function copyText(t){navigator.clipboard.writeText(t).then(function(){showToast("✅ کپی شد!","success")})}async function api(u,m,b){var o={method:m||"GET",headers:{}};if(b){o.headers["Content-Type"]="application/json";o.body=JSON.stringify(b)}var r=await fetch(u,o);return await r.json()}async function toggleUser(u){var r=await api("/api/toggle-user","POST",{uuid:u});if(r.success){showToast("وضعیت تغییر کرد","success");setTimeout(function(){location.reload()},500)}else showToast(r.error||"خطا","error")}async function deleteUser(u){if(!confirm("آیا مطمئن هستید؟"))return;var r=await api("/api/delete-user","POST",{uuid:u});if(r.success){showToast("کاربر حذف شد","success");setTimeout(function(){location.reload()},500)}else showToast(r.error||"خطا","error")}async function resetUsage(u){var r=await api("/api/reset-usage","POST",{uuid:u});if(r.success){showToast("مصرف ریست شد","success");setTimeout(function(){location.reload()},500)}else showToast(r.error||"خطا","error")}';
}

function wrapHTML(content, title) {
  return '<!DOCTYPE html>\n<html lang="fa" dir="rtl">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>' + title + '</title>\n<style>' + getStyles() + '</style>\n</head>\n<body>\n<div class="container">\n' + content + '\n</div>\n<script>' + getJS() + '</script>\n</body>\n</html>';
}

function loginPage(error) {
  const e = error ? '<div class="card" style="border:1px solid var(--danger);color:var(--danger);text-align:center;">' + error + '</div>' : '';
  return wrapHTML('<div class="header"><span class="brand">⚡ TAAKAA-XI PRO v16</span><span style="color:var(--text2);">ورود به پنل</span></div><div style="max-width:450px;margin:80px auto;"><div class="card fade-in"><h2 class="text-center mb-20">🔐 ورود ادمین</h2>' + e + '<form method="POST" action="/api/login"><input type="password" name="password" placeholder="رمز عبور" required autofocus><input type="text" name="totp" placeholder="کد TOTP (اختیاری)" maxlength="6"><button type="submit" class="btn" style="width:100%;margin-top:15px;">🚀 ورود</button></form><p class="text-center mt-20" style="color:var(--text2);font-size:13px;">📢 @TaaKaaOrg | نسخه ۱۶ پرو</p></div></div>', 'TAAKAA-XI | ورود');
}

function setupPage(error) {
  const e = error ? '<div class="card" style="border:1px solid var(--danger);color:var(--danger);text-align:center;">' + error + '</div>' : '';
  return wrapHTML('<div class="header"><span class="brand">🛠️ راه‌اندازی TAAKAA-XI</span></div><div style="max-width:500px;margin:40px auto;"><div class="card fade-in"><h2 class="text-center">🎉 خوش آمدید!</h2><p class="text-center" style="color:var(--text2);">اولین اجرا. رمز عبور را تنظیم کنید.</p>' + e + '<form method="POST" action="/api/setup"><input type="password" name="password" placeholder="رمز عبور جدید" required minlength="6"><input type="password" name="confirm" placeholder="تکرار رمز عبور" required><button type="submit" class="btn" style="width:100%;margin-top:15px;">✅ راه‌اندازی</button></form></div></div>', 'TAAKAA-XI | Setup');
}

function dashboardPage(users, config) {
  const active = users.filter(u => u.status === 'active').length;
  const totalUse = users.reduce((s, u) => s + (u.usageTotal || 0), 0);
  const today = new Date().toISOString().split('T')[0];
  const todayUse = users.reduce((s, u) => s + ((u.dailyUsage && u.dailyUsage[today]) ? u.dailyUsage[today] : 0), 0);
  const activity = users.sort((a, b) => (b.lastAccess || 0) - (a.lastAccess || 0)).slice(0, 5);
  const actHTML = activity.length ? activity.map(u => '<div class="flex" style="padding:8px 0;border-bottom:1px solid var(--border);"><span>' + u.name + '</span><span style="color:var(--text2);font-size:12px;">' + (u.lastAccess ? new Date(u.lastAccess).toLocaleString('fa-IR') : '—') + '</span></div>').join('') : '<p style="color:var(--text2);">بدون فعالیت</p>';
  
  return wrapHTML(
    '<div class="header fade-in"><div class="flex" style="gap:20px;"><span class="brand">⚡ TAAKAA-XI PRO v16</span><span class="badge badge-ok">🟢 عملیاتی</span></div><span style="color:var(--text2);">🏗️ @TaaKaaOrg</span></div>' +
    '<div class="nav fade-in"><a href="/" class="active">📊 داشبورد</a><a href="/users">👥 کاربران</a><a href="/settings">⚙️ تنظیمات</a><a href="/scanner">📡 اسکنر</a><a href="/info-protocols">📖 پروتکل‌ها</a><a href="/subscription">📦 اشتراک</a><a href="/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a></div>' +
    '<div class="grid4 fade-in">' +
    '<div class="card"><div style="color:var(--text2);font-size:13px;">👥 کاربران</div><div class="stat-val">' + users.length + '</div><span class="badge badge-ok">' + active + ' فعال</span></div>' +
    '<div class="card"><div style="color:var(--text2);">📊 ترافیک</div><div class="stat-val">' + formatBytes(totalUse) + '</div><span style="color:var(--text2);font-size:12px;">امروز: ' + formatBytes(todayUse) + '</span></div>' +
    '<div class="card"><div style="color:var(--text2);">🛡️ Fragment</div><div class="stat-val">' + (config.FRAGMENT_ENABLED ? '✅' : '❌') + '</div></div>' +
    '<div class="card"><div style="color:var(--text2);">🌐 WARP</div><div class="stat-val">' + (config.WARP_ENABLED ? '✅' : '❌') + '</div></div>' +
    '</div>' +
    '<div class="card fade-in"><h3>📋 فعالیت اخیر</h3>' + actHTML + '</div>' +
    '<p class="text-center" style="color:var(--text2);margin-top:20px;font-size:13px;">🏗️ TAAKAA | @TaaKaaOrg | ⚡ v16 PRO</p>',
    'TAAKAA-XI | داشبورد'
  );
}

function usersPage(users) {
  const rows = users.map(u => {
    const pct = u.quotaTotal > 0 ? Math.min(100, ((u.usageTotal || 0) / u.quotaTotal) * 100) : 0;
    const days = u.expiryDate ? Math.max(0, Math.ceil((u.expiryDate - Date.now()) / 86400000)) : 0;
    return '<tr><td><strong>' + u.name + '</strong></td><td style="font-family:monospace;font-size:11px;direction:ltr;">' + u.uuid.substring(0, 16) + '...</td><td>' + (u.ip || '—') + '</td><td>' + formatBytes(u.usageTotal || 0) + ' / ' + formatBytes(u.quotaTotal) + '<div class="progress"><div class="progress-fill" style="width:' + pct + '%"></div></div><small>' + pct.toFixed(1) + '%</small></td><td>' + formatBytes(u.quotaDaily) + '</td><td>' + formatDuration(days) + '</td><td><span class="badge ' + (u.status === 'active' ? 'badge-ok' : 'badge-err') + '">' + (u.status === 'active' ? '🟢 فعال' : '🔴 معلق') + '</span></td><td><button class="btn btn-sm" onclick="editUser(\'' + u.uuid + '\')">✏️</button> <button class="btn btn-sm btn-outline" onclick="toggleUser(\'' + u.uuid + '\')">' + (u.status === 'active' ? '⏸️' : '▶️') + '</button> <button class="btn btn-sm btn-warn" onclick="resetUsage(\'' + u.uuid + '\')">🔄</button> <button class="btn btn-sm btn-danger" onclick="deleteUser(\'' + u.uuid + '\')">🗑️</button></td></tr>';
  }).join('');
  
  return wrapHTML(
    '<div class="header fade-in"><span class="brand">👥 مدیریت کاربران</span><button class="btn" onclick="openModal(\'add-user-modal\')">➕ کاربر جدید</button></div>' +
    '<div class="nav fade-in"><a href="/">📊 داشبورد</a><a href="/users" class="active">👥 کاربران</a><a href="/settings">⚙️ تنظیمات</a><a href="/scanner">📡 اسکنر</a><a href="/info-protocols">📖 پروتکل‌ها</a><a href="/subscription">📦 اشتراک</a><a href="/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a></div>' +
    '<div class="card fade-in"><h3 class="mb-20">لیست کاربران (' + users.length + ')</h3><div style="overflow-x:auto;"><table><thead><tr><th>نام</th><th>UUID</th><th>IP</th><th>مصرف</th><th>روزانه</th><th>زمان</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody>' + rows + '</tbody></table></div>' + (users.length === 0 ? '<p class="text-center" style="color:var(--text2);padding:40px;">بدون کاربر</p>' : '') + '</div>' +
    '<div id="add-user-modal" class="modal-overlay"><div class="modal fade-in"><h3>➕ ایجاد کاربر</h3><form onsubmit="event.preventDefault();createUser()" id="add-user-form"><input type="text" name="name" placeholder="نام" required><input type="text" name="uuid" placeholder="UUID (اختیاری)"><input type="text" name="ip" placeholder="IP"><input type="text" name="quota" placeholder="حجم (5GB)" value="5GB"><input type="text" name="dailyQuota" placeholder="روزانه (1GB)" value="1GB"><input type="text" name="expiry" placeholder="مدت (30d)" value="30d"><select name="operator"><option value="mtn">ایرانسل</option><option value="mci">همراه اول</option><option value="rtl">رایتل</option></select><div class="flex mt-20"><button type="submit" class="btn">✅ ایجاد</button><button type="button" class="btn btn-outline" onclick="closeModal(\'add-user-modal\')">انصراف</button></div></form></div></div>' +
    '<div id="edit-user-modal" class="modal-overlay"><div class="modal fade-in"><h3>✏️ ویرایش کاربر</h3><form onsubmit="event.preventDefault();saveEditUser()" id="edit-user-form"><input type="hidden" name="uuid" id="edit-uuid"><input type="text" name="name" id="edit-name" required><input type="text" name="ip" id="edit-ip"><input type="text" name="quota" id="edit-quota"><input type="text" name="dailyQuota" id="edit-dailyQuota"><input type="text" name="expiry" id="edit-expiry"><div class="flex mt-20"><button type="submit" class="btn">💾 ذخیره</button><button type="button" class="btn btn-outline" onclick="closeModal(\'edit-user-modal\')">انصراف</button></div></form></div></div>' +
    '<script>async function createUser(){var f=document.getElementById("add-user-form");var d=new FormData(f);var o={};d.forEach(function(v,k){o[k]=v});var r=await api("/api/create-user","POST",o);if(r.success){showToast("✅ ایجاد شد","success");closeModal("add-user-modal");setTimeout(function(){location.reload()},500)}else showToast("❌ "+(r.error||"خطا"),"error")}async function editUser(uuid){var r=await api("/api/get-user?uuid="+uuid);if(r.success&&r.user){document.getElementById("edit-uuid").value=r.user.uuid;document.getElementById("edit-name").value=r.user.name;document.getElementById("edit-ip").value=r.user.ip||"";document.getElementById("edit-quota").value=r.user.quotaTotal>=1073741824?(r.user.quotaTotal/1073741824).toFixed(0)+"GB":(r.user.quotaTotal/1048576).toFixed(0)+"MB";document.getElementById("edit-dailyQuota").value=r.user.quotaDaily>=1073741824?(r.user.quotaDaily/1073741824).toFixed(0)+"GB":(r.user.quotaDaily/1048576).toFixed(0)+"MB";document.getElementById("edit-expiry").value=r.user.expiryDays+"d";openModal("edit-user-modal")}}async function saveEditUser(){var f=document.getElementById("edit-user-form");var d=new FormData(f);var o={};d.forEach(function(v,k){o[k]=v});var r=await api("/api/edit-user","POST",o);if(r.success){showToast("✅ ذخیره شد","success");closeModal("edit-user-modal");setTimeout(function(){location.reload()},500)}else showToast("❌ "+(r.error||"خطا"),"error")}</script>',
    'TAAKAA-XI | کاربران'
  );
}

function settingsPage(config) {
  return wrapHTML(
    '<div class="header fade-in"><span class="brand">⚙️ تنظیمات</span></div>' +
    '<div class="nav fade-in"><a href="/">📊 داشبورد</a><a href="/users">👥 کاربران</a><a href="/settings" class="active">⚙️ تنظیمات</a><a href="/scanner">📡 اسکنر</a><a href="/info-protocols">📖 پروتکل‌ها</a><a href="/subscription">📦 اشتراک</a><a href="/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a></div>' +
    '<div class="grid2"><div class="card fade-in"><h3 class="mb-20">🛡️ تکنیک‌های عبور</h3><form onsubmit="event.preventDefault();saveSettings()" id="settings-form">' +
    '<div class="flex" style="margin:15px 0;"><div><strong>Fragment</strong></div><label class="toggle"><input type="checkbox" name="fragment_enabled" ' + (config.FRAGMENT_ENABLED ? 'checked' : '') + '><span class="slider"></span></label></div>' +
    '<div style="margin:15px 0;"><label>Size</label><input type="text" name="fragment_size" value="' + (config.FRAGMENT_SIZE || '1-5') + '"></div>' +
    '<div style="margin:15px 0;"><label>Count</label><input type="number" name="fragment_count" value="' + (config.FRAGMENT_COUNT || 3) + '"></div>' +
    '<div style="margin:15px 0;"><label>Delay</label><input type="text" name="fragment_delay" value="' + (config.FRAGMENT_DELAY || '1-3') + '"></div>' +
    '<div class="flex" style="margin:15px 0;"><div><strong>WARP</strong></div><label class="toggle"><input type="checkbox" name="warp_enabled" ' + (config.WARP_ENABLED ? 'checked' : '') + '><span class="slider"></span></label></div>' +
    '<div class="flex" style="margin:15px 0;"><div><strong>ECH</strong></div><label class="toggle"><input type="checkbox" name="ech_enabled" ' + (config.ECH_ENABLED ? 'checked' : '') + '><span class="slider"></span></label></div>' +
    '<button type="submit" class="btn" style="width:100%;margin-top:20px;">💾 ذخیره</button></form></div>' +
    '<div><div class="card fade-in"><h3>🔐 تغییر رمز</h3><form onsubmit="event.preventDefault();changePassword()"><input type="password" name="current" placeholder="رمز فعلی" required><input type="password" name="new_password" placeholder="رمز جدید" required><input type="password" name="confirm" placeholder="تکرار" required><button type="submit" class="btn" style="width:100%;margin-top:10px;">🔑 تغییر</button></form></div>' +
    '<div class="card fade-in mt-20"><h3>💾 بکاپ</h3><button class="btn" onclick="downloadBackup()" style="width:100%;margin-top:10px;">📥 دانلود</button></div></div></div>' +
    '<script>async function saveSettings(){var f=document.getElementById("settings-form");var d=new FormData(f);var o={};d.forEach(function(v,k){o[k]=v});o.fragment_enabled=d.get("fragment_enabled")==="on";o.warp_enabled=d.get("warp_enabled")==="on";o.ech_enabled=d.get("ech_enabled")==="on";var r=await api("/api/update-settings","POST",o);if(r.success)showToast("✅ ذخیره شد","success");else showToast("❌ خطا","error")}async function changePassword(){var f=document.querySelector("#password-form, form[onsubmit*=\'changePassword\']");if(!f)return;var d=new FormData(f);var o={current:d.get("current"),new_password:d.get("new_password"),confirm:d.get("confirm")};var r=await api("/api/change-password","POST",o);if(r.success)showToast("✅ تغییر کرد","success");else showToast("❌ "+(r.error||"خطا"),"error")}async function downloadBackup(){var r=await api("/api/backup-kv");var b=new Blob([JSON.stringify(r,null,2)],{type:"application/json"});var u=URL.createObjectURL(b);var a=document.createElement("a");a.href=u;a.download="taakaa-backup-"+new Date().toISOString()+".json";a.click();showToast("✅ دانلود شد","success")}</script>',
    'TAAKAA-XI | تنظیمات'
  );
}

function scannerPage() {
  return wrapHTML(
    '<div class="header fade-in"><span class="brand">📡 اسکنر IP</span></div>' +
    '<div class="nav fade-in"><a href="/">📊 داشبورد</a><a href="/users">👥 کاربران</a><a href="/settings">⚙️ تنظیمات</a><a href="/scanner" class="active">📡 اسکنر</a><a href="/info-protocols">📖 پروتکل‌ها</a><a href="/subscription">📦 اشتراک</a><a href="/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a></div>' +
    '<div class="card fade-in"><h3>📡 اسکن IP</h3><button class="btn" onclick="quickScan()">⚡ اسکن سریع</button><div id="scan-results" class="mt-20"><p style="color:var(--text2);">منتظر اسکن...</p></div><div id="best-ip-section" style="display:none;margin-top:20px;"><h4>🌟 بهترین IP:</h4><div class="code-block" id="best-ip-display"></div></div></div>' +
    '<script>async function quickScan(){document.getElementById("scan-results").innerHTML=\'<div class="pulse text-center" style="padding:20px;">⏳ در حال اسکن...</div>\';var r=await api("/api/quick-scan");if(r.success){var h="<table><thead><tr><th>IP</th><th>اپراتور</th><th>وضعیت</th><th>Latency</th></tr></thead><tbody>";r.results.forEach(function(x){h+="<tr><td style=\'font-family:monospace;direction:ltr;\'>"+x.ip+"</td><td>"+(x.operator==="mci"?"همراه اول":x.operator==="mtn"?"ایرانسل":"رایتل")+"</td><td><span class=\'badge "+(x.alive?"badge-ok":"badge-err")+"\'>"+(x.alive?"✅ زنده":"❌ مرده")+"</span></td><td>"+(x.alive?x.latency+"ms":"—")+"</td></tr>"});h+="</tbody></table>";document.getElementById("scan-results").innerHTML=h;if(r.bestIP){document.getElementById("best-ip-section").style.display="block";document.getElementById("best-ip-display").innerHTML="IP: "+r.bestIP.ip+" | Latency: "+r.bestIP.latency+"ms ⭐"}}}</script>',
    'TAAKAA-XI | اسکنر'
  );
}

function infoProtocolsPage(config) {
  return wrapHTML(
    '<div class="header fade-in"><span class="brand">📖 پروتکل‌ها</span></div>' +
    '<div class="nav fade-in"><a href="/">📊 داشبورد</a><a href="/users">👥 کاربران</a><a href="/settings">⚙️ تنظیمات</a><a href="/scanner">📡 اسکنر</a><a href="/info-protocols" class="active">📖 پروتکل‌ها</a><a href="/subscription">📦 اشتراک</a><a href="/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a></div>' +
    '<div class="card fade-in"><h4 style="color:var(--primary);">🔷 VLESS</h4><p style="color:var(--text2);">پروتکل سبک با امنیت TLS. SNI: ' + ((config.SNI_LIST && config.SNI_LIST[0]) || 'google.com') + '</p></div>' +
    '<div class="card fade-in"><h4 style="color:var(--primary);">🧩 Fragment</h4><p style="color:var(--text2);">تکه‌تکه کردن پکت‌ها. وضعیت: ' + (config.FRAGMENT_ENABLED ? '✅ فعال' : '❌ غیرفعال') + '</p></div>' +
    '<div class="card fade-in"><h4 style="color:var(--primary);">🔐 ECH</h4><p style="color:var(--text2);">رمزنگاری Client Hello. وضعیت: ' + (config.ECH_ENABLED ? '✅ فعال' : '❌ غیرفعال') + '</p></div>' +
    '<div class="card fade-in"><h4 style="color:var(--primary);">🌐 WARP</h4><p style="color:var(--text2);">مسیریابی Cloudflare. وضعیت: ' + (config.WARP_ENABLED ? '✅ فعال' : '❌ غیرفعال') + '</p></div>' +
    '<p class="text-center" style="color:var(--text2);margin-top:20px;">📢 @TaaKaaOrg | ⚡ v16 PRO</p>',
    'TAAKAA-XI | پروتکل‌ها'
  );
}

function subscriptionPage(users, config, domain) {
  const opts = users.map(u => '<option value="' + u.uuid + '">' + u.name + '</option>').join('');
  return wrapHTML(
    '<div class="header fade-in"><span class="brand">📦 اشتراک</span></div>' +
    '<div class="nav fade-in"><a href="/">📊 داشبورد</a><a href="/users">👥 کاربران</a><a href="/settings">⚙️ تنظیمات</a><a href="/scanner">📡 اسکنر</a><a href="/info-protocols">📖 پروتکل‌ها</a><a href="/subscription" class="active">📦 اشتراک</a><a href="/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a></div>' +
    '<div class="card fade-in"><h3>🔗 لینک اشتراک</h3><select id="sub-user-select" onchange="updateSubscription()" style="margin:10px 0;"><option value="">-- انتخاب کاربر --</option>' + opts + '</select><div id="subscription-links" style="display:none;"><h4 class="mt-20">📎 لینک:</h4><div class="flex"><input type="text" id="sub-url" readonly class="code-block" style="flex:1;"><button class="btn btn-sm" onclick="copyText(document.getElementById(\'sub-url\').value)">📋</button></div><h4 class="mt-20">📋 VLESS:</h4><textarea id="vless-config" readonly class="code-block" style="height:60px;"></textarea><h4 class="mt-20">📦 Base64:</h4><textarea id="sub-base64" readonly class="code-block" style="height:60px;"></textarea></div></div>' +
    '<script>var DOMAIN="' + domain + '";async function updateSubscription(){var u=document.getElementById("sub-user-select").value;if(!u){document.getElementById("subscription-links").style.display="none";return}var r=await api("/api/get-configs?uuid="+u);if(r.success){document.getElementById("subscription-links").style.display="block";document.getElementById("sub-url").value="https://"+DOMAIN+"/sub/"+u;document.getElementById("vless-config").value=r.configs.vless;document.getElementById("sub-base64").value=r.configs.subscription}}</script>',
    'TAAKAA-XI | اشتراک'
  );
}

function ownersPage() {
  return wrapHTML(
    '<div class="header fade-in text-center"><span class="brand">👑 TAAKAA-XI</span></div><div class="card fade-in text-center" style="max-width:600px;margin:40px auto;"><h2>🏗️ تیم TAAKAA</h2><p style="color:var(--text2);margin:20px 0;">⚡ v16 PRO | ۳ ماه توسعه | VLESS/Trojan/SS</p><p style="color:var(--primary);font-size:18px;font-weight:bold;">📢 @TaaKaaOrg</p><a href="/" class="btn mt-20">🏠 بازگشت</a></div>',
    'TAAKAA-XI | Owners'
  );
}

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
  });
}

function redirectResponse(url, cookie) {
  const headers = { Location: url };
  if (cookie) headers['Set-Cookie'] = cookie;
  return new Response(null, { status: 302, headers });
}

function htmlResponse(html) {
  return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

// ==================== EXPORT DEFAULT ====================
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const cookieHeader = request.headers.get('Cookie') || '';
    const sessionToken = getCookie(cookieHeader, 'taakaa_session');
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const domain = url.hostname;

    const storage = new StorageManager(env);
    const sessionMgr = new SessionManager(storage);
    const rateLimiter = new RateLimiter(storage);
    const userMgr = new UserManager(storage);
    const proxyHandler = new ProxyHandler(storage);

    const rateCheck = await rateLimiter.check('login_' + clientIP, SYSTEM_CONFIG.MAX_LOGIN_ATTEMPTS, SYSTEM_CONFIG.LOCKOUT_MINUTES);

    const isFirstRun = await storage.isFirstRun();
    if (isFirstRun && path !== '/api/setup') return htmlResponse(setupPage());

    let session = null;
    if (sessionToken) session = await sessionMgr.validate(sessionToken);

    if (path === '/' || path === '') {
      if (!session) return htmlResponse(loginPage());
      const config = await storage.getSystemConfig();
      const users = await storage.getAllUsers();
      return htmlResponse(dashboardPage(users, config));
    }

    if (path === '/setup') return htmlResponse(setupPage());
    if (path === '/owners') return htmlResponse(ownersPage());

    if (path === '/api/login' && method === 'POST') {
      if (!rateCheck.allowed) return jsonResponse({ success: false, error: 'تلاش‌ها تمام شد' }, 429);
      let password, totpToken;
      const ct = request.headers.get('Content-Type') || '';
      if (ct.includes('application/json')) {
        const json = await request.json();
        password = json.password;
        totpToken = json.totp;
      } else {
        const body = await request.formData();
        password = body.get('password');
        totpToken = body.get('totp');
      }
      const adminHash = await storage.getAdminPassword();
      if (!adminHash) return jsonResponse({ success: false, error: 'راه‌اندازی نشده' }, 500);
      const validPassword = await verifyPassword(password, adminHash);
      if (!validPassword) return htmlResponse(loginPage('❌ رمز اشتباه'));
      const config = await storage.getSystemConfig();
      if (totpToken && !verifyTOTP(totpToken, config.TOTP_SECRET)) return htmlResponse(loginPage('❌ TOTP اشتباه'));
      const newSession = await sessionMgr.create({ role: 'admin', ip: clientIP, loginAt: Date.now() });
      const cookie = 'taakaa_session=' + newSession + '; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=' + SYSTEM_CONFIG.SESSION_EXPIRY;
      return redirectResponse('/', cookie);
    }

    if (path === '/api/setup' && method === 'POST') {
      const body = await request.formData();
      const password = body.get('password');
      const confirm = body.get('confirm');
      if (password !== confirm) return htmlResponse(setupPage('❌ رمزها مطابقت ندارند'));
      if (password.length < 6) return htmlResponse(setupPage('❌ حداقل ۶ کاراکتر'));
      await storage.setup(password);
      const newSession = await sessionMgr.create({ role: 'admin', ip: clientIP, loginAt: Date.now() });
      const cookie = 'taakaa_session=' + newSession + '; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=' + SYSTEM_CONFIG.SESSION_EXPIRY;
      return redirectResponse('/', cookie);
    }

    if (path === '/logout') {
      await sessionMgr.destroy(sessionToken);
      return redirectResponse('/', 'taakaa_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0');
    }

    if (!session) {
      if (path.startsWith('/api/')) return jsonResponse({ success: false, error: 'لطفاً وارد شوید' }, 401);
      return htmlResponse(loginPage());
    }

    if (path === '/users') {
      const users = await storage.getAllUsers();
      return htmlResponse(usersPage(users));
    }

    if (path === '/settings') {
      const config = await storage.getSystemConfig();
      return htmlResponse(settingsPage(config));
    }

    if (path === '/scanner') return htmlResponse(scannerPage());

    if (path === '/info-protocols') {
      const config = await storage.getSystemConfig();
      return htmlResponse(infoProtocolsPage(config));
    }

    if (path === '/subscription') {
      const config = await storage.getSystemConfig();
      const users = await storage.getAllUsers();
      return htmlResponse(subscriptionPage(users, config, domain));
    }

    if (path === '/api/create-user' && method === 'POST') {
      const data = await request.json();
      const user = await userMgr.create(data);
      return jsonResponse({ success: true, user });
    }

    if (path === '/api/get-user') {
      const uuid = url.searchParams.get('uuid');
      const user = await userMgr.get(uuid);
      if (!user) return jsonResponse({ success: false, error: 'یافت نشد' }, 404);
      return jsonResponse({ success: true, user });
    }

    if (path === '/api/edit-user' && method === 'POST') {
      const data = await request.json();
      const user = await userMgr.update(data.uuid, data);
      if (!user) return jsonResponse({ success: false, error: 'یافت نشد' }, 404);
      return jsonResponse({ success: true, user });
    }

    if (path === '/api/delete-user' && method === 'POST') {
      const data = await request.json();
      await userMgr.delete(data.uuid);
      return jsonResponse({ success: true });
    }

    if (path === '/api/toggle-user' && method === 'POST') {
      const data = await request.json();
      const user = await userMgr.toggleStatus(data.uuid);
      if (!user) return jsonResponse({ success: false, error: 'یافت نشد' }, 404);
      return jsonResponse({ success: true, user });
    }

    if (path === '/api/reset-usage' && method === 'POST') {
      const data = await request.json();
      const user = await userMgr.resetUsage(data.uuid);
      if (!user) return jsonResponse({ success: false, error: 'یافت نشد' }, 404);
      return jsonResponse({ success: true, user });
    }

    if (path === '/api/update-settings' && method === 'POST') {
      const data = await request.json();
      const config = await storage.getSystemConfig();
      if (data.fragment_enabled !== undefined) config.FRAGMENT_ENABLED = data.fragment_enabled === true || data.fragment_enabled === 'true' || data.fragment_enabled === 'on';
      if (data.fragment_size) config.FRAGMENT_SIZE = data.fragment_size;
      if (data.fragment_count) config.FRAGMENT_COUNT = parseInt(data.fragment_count);
      if (data.fragment_delay) config.FRAGMENT_DELAY = data.fragment_delay;
      if (data.warp_enabled !== undefined) config.WARP_ENABLED = data.warp_enabled === true || data.warp_enabled === 'true' || data.warp_enabled === 'on';
      if (data.ech_enabled !== undefined) config.ECH_ENABLED = data.ech_enabled === true || data.ech_enabled === 'true' || data.ech_enabled === 'on';
      await storage.saveSystemConfig(config);
      return jsonResponse({ success: true });
    }

    if (path === '/api/change-password' && method === 'POST') {
      const data = await request.json();
      const config = await storage.getSystemConfig();
      const validCurrent = await verifyPassword(data.current, config.ADMIN_PASSWORD_HASH);
      if (!validCurrent) return jsonResponse({ success: false, error: 'رمز فعلی اشتباه' });
      if (data.new_password !== data.confirm) return jsonResponse({ success: false, error: 'رمزها مطابقت ندارند' });
      config.ADMIN_PASSWORD_HASH = await hashPassword(data.new_password);
      await storage.saveSystemConfig(config);
      return jsonResponse({ success: true });
    }

    if (path === '/api/backup-kv') {
      const config = await storage.getSystemConfig();
      const users = await storage.getAllUsers();
      return jsonResponse({ exportedAt: new Date().toISOString(), version: 'v16-pro', config, users, totalUsers: users.length });
    }

    if (path === '/api/quick-scan') {
      const results = await quickScan();
      const bestIP = results.find(r => r.alive);
      return jsonResponse({ success: true, results, bestIP, total: results.length, alive: results.filter(r => r.alive).length });
    }

    if (path === '/api/get-configs') {
      const uuid = url.searchParams.get('uuid');
      const user = await userMgr.get(uuid);
      if (!user) return jsonResponse({ success: false, error: 'یافت نشد' }, 404);
      const config = await storage.getSystemConfig();
      return jsonResponse({
        success: true,
        configs: {
          vless: generateVlessConfig(user, config, domain),
          trojan: generateTrojanConfig(user, config, domain),
          shadowsocks: generateShadowsocksConfig(user, config, domain),
          subscription: generateSubscription(user, config, domain)
        }
      });
    }

    const subResult = await handleSubscription(request, storage);
    if (subResult) return subResult;

    if (path === '/ws' || path === '/trojan') {
      const users = await storage.getAllUsers();
      const activeUser = users.find(u => u.status === 'active');
      if (!activeUser) return new Response('No active users', { status: 503 });
      return await proxyHandler.handle(request, activeUser);
    }

    return htmlResponse('<div class="text-center" style="padding:100px 20px;"><h1 style="font-size:72px;color:var(--primary);">404</h1><p style="color:var(--text2);">صفحه یافت نشد</p><a href="/" class="btn mt-20">🏠 بازگشت</a></div>');
  }
};
                                                                                                                    
