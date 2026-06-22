// =============================================
// TAAKAA-XI PRO v16 - Cloudflare Worker
// بخش ۱: تنظیمات و ابزارهای پایه
// =============================================

// ==================== تنظیمات اصلی ====================
const SYSTEM_CONFIG = {
  ADMIN_PASSWORD_HASH: null,
  TOTP_SECRET: 'JBSWY3DPEHPK3PXP',
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
  FINGERPRINTS: ['chrome', 'firefox', 'safari', 'edge', 'ios', 'android', 'random', 'randomized', 'chrome_120', 'firefox_120', 'safari_17', 'edge_120'],
  FRAGMENT: {
    enabled: true,
    size: '1-5',
    count: 3,
    delay: '1-3',
    packets: 'tlshello'
  },
  WARP_ENABLED: false,
  WARP_PRO_ENABLED: false,
  ECH_ENABLED: true,
  OPERATORS: { mci: 'همراه اول', mtn: 'ایرانسل', rtl: 'رایتل' },
  DEFAULT_QUOTA: 5 * 1024 * 1024 * 1024,
  DEFAULT_DAILY_QUOTA: 1 * 1024 * 1024 * 1024,
  DEFAULT_EXPIRY_DAYS: 30,
  ROUTING: { iranBlock: true, speedtest: true, adblock: true, malware: true, geoip: 'ir', geosite: 'category-ads' },
  DNS_OVER_HTTPS: 'https://cloudflare-dns.com/dns-query'
};

// ==================== CryptoUtils (رفع btoa/atob) ====================
class CryptoUtils {
  static generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static validateUUID(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
  }

  static async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'taakaa-salt-v16-2024');
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static async verifyPassword(password, hash) {
    const inputHash = await this.hashPassword(password);
    return inputHash === hash;
  }

  static generateSessionToken() {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static generateTOTP(secret) {
    const time = Math.floor(Date.now() / 30000);
    const hmac = this._simpleHMAC(secret, time.toString());
    return (parseInt(hmac.substring(0, 6), 16) % 1000000).toString().padStart(6, '0');
  }

  static verifyTOTP(token, secret) {
    const expected = this.generateTOTP(secret);
    if (token === expected) return true;
    const prevTime = Math.floor((Date.now() - 30000) / 30000);
    const prevHMAC = this._simpleHMAC(secret, prevTime.toString());
    const prevToken = (parseInt(prevHMAC.substring(0, 6), 16) % 1000000).toString().padStart(6, '0');
    return token === prevToken;
  }

  static _simpleHMAC(key, message) {
    let hash = 0;
    const combined = key + message;
    for (let i = 0; i < combined.length; i++) {
      hash = ((hash << 5) - hash) + combined.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }

  static base64Encode(str) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      let binary = '';
      for (let i = 0; i < data.length; i++) {
        binary += String.fromCharCode(data[i]);
      }
      return btoa(binary);
    } catch (e) {
      return str;
    }
  }

  static base64Decode(str) {
    try {
      const binary = atob(str);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new TextDecoder().decode(bytes);
    } catch (e) {
      return str;
    }
  }
}

// ==================== SmartParser ====================
class SmartParser {
  static parseBytes(input) {
    const str = String(input).toLowerCase().trim();
    const match = str.match(/^(\d+(?:\.\d+)?)\s*(pb|pt|tb|t|gb|g|mb|m|kb|k|b)?$/);
    if (!match) return SYSTEM_CONFIG.DEFAULT_QUOTA;
    const value = parseFloat(match[1]);
    const unit = (match[2] || 'gb').replace('pt', 'pb');
    const mult = { 'b': 1, 'k': 1024, 'kb': 1024, 'm': 1048576, 'mb': 1048576, 'g': 1073741824, 'gb': 1073741824, 't': 1099511627776, 'tb': 1099511627776, 'p': 1125899906842624, 'pb': 1125899906842624 };
    return Math.floor(value * (mult[unit] || mult['gb']));
  }

  static formatBytes(bytes) {
    if (bytes >= 1099511627776) return (bytes / 1099511627776).toFixed(2) + ' TB';
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + ' GB';
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
    if (bytes >= 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return bytes + ' B';
  }

  static parseDuration(input) {
    const str = String(input).toLowerCase().trim();
    const match = str.match(/^(\d+)\s*(y|year|years|m|month|months|d|day|days)?$/);
    if (!match) return SYSTEM_CONFIG.DEFAULT_EXPIRY_DAYS;
    const value = parseInt(match[1]);
    const unit = match[2] || 'd';
    const mult = { 'd': 1, 'day': 1, 'days': 1, 'm': 30, 'month': 30, 'months': 30, 'y': 365, 'year': 365, 'years': 365 };
    return value * (mult[unit] || 1);
  }

  static formatDuration(days) {
    if (days >= 365) {
      const y = Math.floor(days / 365);
      const m = Math.floor((days % 365) / 30);
      return `${y} سال` + (m > 0 ? ` و ${m} ماه` : '');
    }
    if (days >= 30) {
      const m = Math.floor(days / 30);
      const d = days % 30;
      return `${m} ماه` + (d > 0 ? ` و ${d} روز` : '');
    }
    return `${days} روز`;
  }

  static formatPercent(used, total) {
    if (!total || total <= 0) return '0%';
    return Math.min(100, (used / total) * 100).toFixed(1) + '%';
  }
}
// =============================================
// TAAKAA-XI PRO v16 - Cloudflare Worker
// بخش ۲: مدیریت داده و کاربران
// =============================================

// ==================== StorageManager ====================
class StorageManager {
  constructor(env) {
    this.kv = env.TAAKAA_KV;
    this.d1 = env.TAAKAA_DB || null;
    this.cache = new Map();
  }

  async get(key) {
    if (this.cache.has(key)) return this.cache.get(key);
    try {
      let data = await this.kv.get(key, 'json');
      if (data) {
        this.cache.set(key, data);
        return data;
      }
      if (this.d1) {
        const result = await this.d1.prepare('SELECT value FROM storage WHERE key = ?').bind(key).first();
        if (result?.value) {
          data = JSON.parse(result.value);
          this.cache.set(key, data);
          return data;
        }
      }
    } catch (e) {}
    return null;
  }

  async put(key, value, ttl) {
    this.cache.set(key, value);
    try {
      await this.kv.put(key, JSON.stringify(value), { expirationTtl: ttl || SYSTEM_CONFIG.SESSION_EXPIRY });
      if (this.d1) {
        await this.d1.prepare('INSERT OR REPLACE INTO storage (key, value, updated_at) VALUES (?, ?, ?)')
          .bind(key, JSON.stringify(value), Date.now()).run();
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async delete(key) {
    this.cache.delete(key);
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
      const result = await this.kv.list({ prefix, limit: 1000 });
      return result.keys.map(k => k.name);
    } catch (e) {
      return [];
    }
  }

  async isFirstRun() {
    const config = await this.get('system:config');
    return config === null || config === undefined;
  }

  async getAllUsers() {
    const keys = await this.list('user:');
    const users = await Promise.all(keys.map(k => this.get(k)));
    return users.filter(u => u).sort((a, b) => b.createdAt - a.createdAt);
  }

  async getSystemConfig() {
    const config = await this.get('system:config');
    return config || { ...SYSTEM_CONFIG };
  }

  async saveSystemConfig(config) {
    return await this.put('system:config', config);
  }

  async getAdminPassword() {
    const config = await this.getSystemConfig();
    return config.ADMIN_PASSWORD_HASH || null;
  }

  async setup(password) {
    const hash = await CryptoUtils.hashPassword(password);
    const config = {
      ...SYSTEM_CONFIG,
      ADMIN_PASSWORD_HASH: hash,
      setupAt: Date.now(),
      version: 'v16'
    };
    await this.put('system:config', config);
    return config;
  }
}

// ==================== SessionManager ====================
class SessionManager {
  constructor(storage) {
    this.storage = storage;
  }

  async create(userData) {
    const token = CryptoUtils.generateSessionToken();
    const session = { ...userData, token, createdAt: Date.now(), lastAccess: Date.now() };
    await this.storage.put(`session:${token}`, session, SYSTEM_CONFIG.SESSION_EXPIRY);
    return token;
  }

  async validate(token) {
    if (!token) return null;
    const session = await this.storage.get(`session:${token}`);
    if (!session) return null;
    session.lastAccess = Date.now();
    await this.storage.put(`session:${token}`, session, SYSTEM_CONFIG.SESSION_EXPIRY);
    return session;
  }

  async destroy(token) {
    if (token) await this.storage.delete(`session:${token}`);
  }
}

// ==================== RateLimiter ====================
class RateLimiter {
  constructor(storage) {
    this.storage = storage;
  }

  async check(key, maxAttempts, windowMin) {
    const record = await this.storage.get(`ratelimit:${key}`) || { attempts: 0, resetAt: Date.now() + windowMin * 60000 };
    if (Date.now() > record.resetAt) {
      record.attempts = 1;
      record.resetAt = Date.now() + windowMin * 60000;
    } else {
      record.attempts++;
    }
    await this.storage.put(`ratelimit:${key}`, record, windowMin * 60);
    return {
      allowed: record.attempts <= maxAttempts,
      remaining: Math.max(0, maxAttempts - record.attempts),
      resetAt: record.resetAt
    };
  }
}

// ==================== UserManager ====================
class UserManager {
  constructor(storage) {
    this.storage = storage;
  }

  async create(data) {
    const uuid = data.uuid && CryptoUtils.validateUUID(data.uuid) ? data.uuid : CryptoUtils.generateUUID();
    const now = Date.now();
    const expiryDays = SmartParser.parseDuration(data.expiry || '30d');
    const user = {
      uuid,
      name: data.name || `User-${uuid.substring(0, 8)}`,
      ip: data.ip || '',
      quotaTotal: SmartParser.parseBytes(data.quota || '5GB'),
      quotaDaily: SmartParser.parseBytes(data.dailyQuota || '1GB'),
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
    await this.storage.put(`user:${uuid}`, user);
    return user;
  }

  async get(uuid) {
    return await this.storage.get(`user:${uuid}`);
  }

  async update(uuid, updates) {
    const user = await this.get(uuid);
    if (!user) return null;
    if (updates.name !== undefined) user.name = updates.name;
    if (updates.ip !== undefined) user.ip = updates.ip;
    if (updates.quota) user.quotaTotal = SmartParser.parseBytes(updates.quota);
    if (updates.dailyQuota) user.quotaDaily = SmartParser.parseBytes(updates.dailyQuota);
    if (updates.expiry) {
      user.expiryDays = SmartParser.parseDuration(updates.expiry);
      user.expiryDate = Date.now() + (user.expiryDays * 86400000);
    }
    if (updates.status) user.status = updates.status;
    if (updates.operator) user.operator = updates.operator;
    if (updates.protocol) user.protocol = updates.protocol;
    await this.storage.put(`user:${uuid}`, user);
    return user;
  }

  async delete(uuid) {
    await this.storage.delete(`user:${uuid}`);
    return true;
  }

  async toggleStatus(uuid) {
    const user = await this.get(uuid);
    if (!user) return null;
    user.status = user.status === 'active' ? 'suspended' : 'active';
    await this.storage.put(`user:${uuid}`, user);
    return user;
  }

  async resetUsage(uuid) {
    const user = await this.get(uuid);
    if (!user) return null;
    user.usageTotal = 0;
    user.dailyUsage = {};
    await this.storage.put(`user:${uuid}`, user);
    return user;
  }

  async getStats(uuid) {
    const user = await this.get(uuid);
    if (!user) return null;
    const today = new Date().toISOString().split('T')[0];
    const todayUsage = user.dailyUsage?.[today] || 0;
    const daysLeft = user.expiryDate ? Math.max(0, Math.ceil((user.expiryDate - Date.now()) / 86400000)) : 0;
    return {
      ...user,
      quotaTotalFormatted: SmartParser.formatBytes(user.quotaTotal),
      usageTotalFormatted: SmartParser.formatBytes(user.usageTotal || 0),
      remainingFormatted: SmartParser.formatBytes(Math.max(0, user.quotaTotal - (user.usageTotal || 0))),
      todayUsageFormatted: SmartParser.formatBytes(todayUsage),
      usagePercent: SmartParser.formatPercent(user.usageTotal || 0, user.quotaTotal),
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
    await this.storage.put(`user:${uuid}`, user);
  }
      }
// =============================================
// TAAKAA-XI PRO v16 - Cloudflare Worker
// بخش ۳: تولید کانفیگ و پروکسی
// =============================================

// ==================== ConfigGenerator ====================
class ConfigGenerator {
  static generateVless(user, config, domain) {
    const uuid = user.uuid;
    const sni = (config.SNI_LIST && config.SNI_LIST[0]) || 'www.google.com';
    const fp = (config.FINGERPRINTS && config.FINGERPRINTS[0]) || 'chrome';
    const port = (config.PORTS && config.PORTS[0]) || 443;
    let link = `vless://${uuid}@${domain}:${port}?encryption=none&security=tls&sni=${sni}&fp=${fp}&type=ws&path=/ws&host=${domain}`;
    if (config.FRAGMENT?.enabled) link += `&fragment=${config.FRAGMENT.size}-${config.FRAGMENT.count}`;
    if (config.WARP_ENABLED) link += `&warp=true`;
    link += `#TAAKAA-XI-${encodeURIComponent(user.name)}`;
    return link;
  }

  static generateTrojan(user, config, domain) {
    const password = user.uuid;
    const sni = (config.SNI_LIST && config.SNI_LIST[0]) || 'www.google.com';
    const fp = (config.FINGERPRINTS && config.FINGERPRINTS[0]) || 'chrome';
    const port = (config.PORTS && config.PORTS[0]) || 443;
    return `trojan://${password}@${domain}:${port}?security=tls&sni=${sni}&fp=${fp}&type=ws&path=/trojan&host=${domain}#TAAKAA-XI-${encodeURIComponent(user.name)}-Trojan`;
  }

  static generateShadowsocks(user, config, domain) {
    const method = 'aes-256-gcm';
    const password = user.uuid.replace(/-/g, '').substring(0, 16);
    const port = (config.PORTS && config.PORTS[0]) || 443;
    const raw = `${method}:${password}@${domain}:${port}`;
    const encoded = CryptoUtils.base64Encode(raw);
    return `ss://${encoded}#TAAKAA-XI-${encodeURIComponent(user.name)}-SS`;
  }

  static generateAllConfigs(user, config, domain) {
    return [
      this.generateVless(user, config, domain),
      this.generateTrojan(user, config, domain),
      this.generateShadowsocks(user, config, domain)
    ];
  }

  static generateSubscription(user, config, domain) {
    const configs = this.generateAllConfigs(user, config, domain);
    return CryptoUtils.base64Encode(configs.join('\n'));
  }

  static generateClashYAML(user, config, domain) {
    const uuid = user.uuid;
    const sni = (config.SNI_LIST && config.SNI_LIST[0]) || 'www.google.com';
    return `proxies:
  - name: "TAAKAA-XI-${user.name}-VLESS"
    type: vless
    server: ${domain}
    port: 443
    uuid: ${uuid}
    network: ws
    ws-opts:
      path: /ws
      headers:
        Host: ${domain}
    tls: true
    servername: ${sni}
    client-fingerprint: chrome

  - name: "TAAKAA-XI-${user.name}-Trojan"
    type: trojan
    server: ${domain}
    port: 443
    password: ${uuid}
    network: ws
    ws-opts:
      path: /trojan
      headers:
        Host: ${domain}
    tls: true
    sni: ${sni}

  - name: "TAAKAA-XI-${user.name}-SS"
    type: ss
    server: ${domain}
    port: 443
    cipher: aes-256-gcm
    password: "${uuid.replace(/-/g, '').substring(0, 16)}"
    plugin: v2ray-plugin
    plugin-opts:
      mode: websocket
      tls: true
      host: ${domain}
      path: /ss
`;
  }

  static generateFragmentConfig(user, config, domain) {
    const uuid = user.uuid;
    const sni = (config.SNI_LIST && config.SNI_LIST[0]) || 'www.google.com';
    return JSON.stringify({
      dns: { servers: ["https://dns.google/dns-query", "https://cloudflare-dns.com/dns-query"] },
      inbounds: [{ port: 10808, listen: "127.0.0.1", protocol: "socks", settings: { auth: "noauth", udp: true } }],
      outbounds: [{
        protocol: "vless",
        settings: { vnext: [{ address: domain, port: 443, users: [{ id: uuid, encryption: "none" }] }] },
        streamSettings: {
          network: "ws",
          security: "tls",
          tlsSettings: { serverName: sni, fingerprint: "chrome", allowInsecure: false },
          wsSettings: { path: "/ws", headers: { Host: domain } },
          fragment: config.FRAGMENT?.enabled ? {
            packets: "tlshello",
            length: config.FRAGMENT?.size || "1-5",
            interval: config.FRAGMENT?.delay || "1-3"
          } : null
        },
        tag: "TAAKAA-XI"
      }]
    }, null, 2);
  }
}

// ==================== ProxyHandler ====================
class ProxyHandler {
  constructor(storage) {
    this.storage = storage;
    this.userManager = new UserManager(storage);
  }

  _checkLimits(user) {
    if (!user || user.status !== 'active') return false;
    if (user.expiryDate && Date.now() > user.expiryDate) return false;
    if ((user.usageTotal || 0) >= user.quotaTotal) return false;
    const today = new Date().toISOString().split('T')[0];
    if ((user.dailyUsage?.[today] || 0) >= user.quotaDaily) return false;
    return true;
  }

  async handle(request, user) {
    if (!user) return new Response('Unauthorized', { status: 401 });
    if (!this._checkLimits(user)) {
      return new Response('محدودیت حجم یا زمان', { status: 429 });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const upgrade = request.headers.get('Upgrade') || '';

    if (path === '/ws' && upgrade.toLowerCase() === 'websocket') {
      return await this._handleWebSocket(request, user, 'vless');
    }
    if (path === '/trojan' && upgrade.toLowerCase() === 'websocket') {
      return await this._handleWebSocket(request, user, 'trojan');
    }
    if (path === '/ss' && upgrade.toLowerCase() === 'websocket') {
      return await this._handleWebSocket(request, user, 'shadowsocks');
    }

    return await this._handleTCP(request, user);
  }

  async _handleWebSocket(request, user, protocol) {
    try {
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);
      server.accept();

      server.addEventListener('message', async (event) => {
        try {
          const bytes = event.data?.byteLength || event.data?.length || 0;
          if (bytes > 0) await this.userManager.trackBytes(user.uuid, bytes);
          server.send(event.data);
        } catch (e) {
          console.error('WS message error:', e);
        }
      });

      server.addEventListener('close', () => {
        console.log(`User ${user.name} disconnected from ${protocol}`);
      });

      server.addEventListener('error', (e) => {
        console.error('WS error:', e);
      });

      return new Response(null, { status: 101, webSocket: client });
    } catch (e) {
      console.error('WebSocket error:', e);
      return new Response('WebSocket error', { status: 500 });
    }
  }

  async _handleTCP(request, user) {
    try {
      const headers = new Headers(request.headers);
      if (SYSTEM_CONFIG.WARP_ENABLED) {
        headers.set('CF-WARP', 'enabled');
      }
      
      const modified = new Request(request.url, {
        method: request.method,
        headers: headers,
        body: request.body,
        redirect: 'follow'
      });

      const response = await fetch(modified);
      
      const contentLength = parseInt(response.headers.get('Content-Length') || '0');
      if (contentLength > 0) {
        await this.userManager.trackBytes(user.uuid, contentLength);
      }
      
      return response;
    } catch (e) {
      return new Response('Proxy Error: ' + e.message, { status: 502 });
    }
  }
}

// ==================== IPScanner ====================
class IPScanner {
  static TEST_IPS = [
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

  static async scanIP(ip, timeout = 3000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const start = Date.now();
      const response = await fetch(`https://${ip}/`, {
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      clearTimeout(timer);
      return { ip, alive: response.status < 500, latency: Date.now() - start, status: response.status };
    } catch (e) {
      clearTimeout(timer);
      return { ip, alive: false, latency: Infinity, error: e.message };
    }
  }

  static async quickScan() {
    const ips = this.TEST_IPS.slice(0, 8);
    const results = await Promise.all(ips.map(item => this.scanIP(item.ip, 2000)));
    return results.map((r, i) => ({ ...r, operator: ips[i].operator, location: ips[i].location }))
      .sort((a, b) => a.latency - b.latency);
  }

  static async fullScan() {
    const results = await Promise.all(this.TEST_IPS.map(item => this.scanIP(item.ip)));
    return results.map((r, i) => ({ ...r, operator: this.TEST_IPS[i].operator, location: this.TEST_IPS[i].location }))
      .sort((a, b) => a.latency - b.latency);
  }
                                                 }
// =============================================
// TAAKAA-XI PRO v16 - Cloudflare Worker
// بخش ۴: صفحات HTML
// =============================================

// ==================== HTMLGenerator ====================
class HTMLGenerator {
  static style() {
    return `
    :root { --primary: #ff6b00; --primary-hover: #e65c00; --bg-deep: #0a0a0f; --bg-card: #1a1a2e; --text: #ffffff; --text2: #a0a0b8; --border: #2a2a3c; --success: #16a34a; --danger: #ef4444; --warning: #f59e0b; --radius: 16px; --shadow: 0 10px 25px rgba(0,0,0,0.5); }
    *{margin:0;padding:0;box-sizing:border-box}
    body{ background:var(--bg-deep); background-image:radial-gradient(circle at 20% 10%, #1a1a2e, #0a0a0f); color:var(--text); font-family:'Segoe UI',system-ui,sans-serif; padding:20px; min-height:100vh; direction:rtl; line-height:1.6; }
    .container{max-width:1400px;margin:0 auto}
    .header{ background:rgba(26,26,46,0.7); backdrop-filter:blur(12px); border:1px solid var(--border); border-radius:var(--radius); padding:20px; margin-bottom:20px; box-shadow:var(--shadow); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px; }
    .brand{ background:linear-gradient(135deg, #ff6b00, #ff8c42); -webkit-background-clip:text; -webkit-text-fill-color:transparent; font-size:1.8rem; font-weight:800; }
    .nav{ display:flex; gap:8px; background:var(--bg-card); padding:6px; border-radius:40px; border:1px solid var(--border); flex-wrap:wrap; margin-bottom:20px; }
    .nav a,.nav button{ padding:10px 18px; border-radius:30px; font-weight:600; font-size:14px; background:transparent; color:var(--text2); border:none; cursor:pointer; text-decoration:none; transition:0.2s; white-space:nowrap; }
    .nav a.active,.nav button.active{ background:var(--primary); color:white; box-shadow:0 4px 12px rgba(255,107,0,0.4); }
    .card{ background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius); padding:24px; box-shadow:var(--shadow); margin-bottom:20px; transition:transform 0.2s; }
    .card:hover{transform:translateY(-2px)}
    .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:20px}
    .grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-bottom:20px}
    .grid3{display:grid;grid-template-columns:2fr 1fr 1fr;gap:20px;margin-bottom:20px}
    .stat-val{ font-size:2rem; font-weight:800; background:linear-gradient(to left,#fff,#ddd); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin:10px 0; }
    .btn{ background:linear-gradient(135deg,#ff6b00,#ff8c42); color:white; border:none; padding:12px 24px; border-radius:30px; font-weight:600; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:0.2s; box-shadow:0 4px 12px rgba(255,107,0,0.3); font-size:14px; }
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
    input,select,textarea{ width:100%;padding:12px;background:var(--bg-deep);border:1px solid var(--border); color:var(--text);border-radius:8px;font-size:14px;margin:8px 0;font-family:inherit; }
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
    .code-block{ background:var(--bg-deep);padding:16px;border-radius:8px; font-family:'Courier New',monospace;direction:ltr;text-align:left; overflow-x:auto;font-size:13px;border:1px solid var(--border);word-break:break-all; }
    .fade-in{animation:fadeIn 0.5s ease}
    @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @media(max-width:768px){ .grid4{grid-template-columns:repeat(2,1fr)} .grid2,.grid3{grid-template-columns:1fr} }
    @media(max-width:480px){ .grid4{grid-template-columns:1fr} body{padding:10px} }
    `;
  }

  static js() {
    return `
    function showToast(msg, type='info'){
      const t=document.createElement('div');
      t.className='toast toast-'+type;
      t.innerHTML=msg;document.body.appendChild(t);
      setTimeout(()=>t.remove(),3000);
    }
    function openModal(id){document.getElementById(id).classList.add('active')}
    function closeModal(id){document.getElementById(id).classList.remove('active')}
    async function api(url,method='GET',body=null){
      const o={method,headers:{}};
      if(body){o.headers['Content-Type']='application/json';o.body=JSON.stringify(body)}
      const r=await fetch(url,o);return await r.json();
    }
    function copyText(text){
      navigator.clipboard.writeText(text).then(()=>showToast('✅ کپی شد!','success'));
    }
    async function toggleUser(uuid){
      const r=await api('/api/toggle-user','POST',{uuid});
      if(r.success){showToast('وضعیت تغییر کرد','success');setTimeout(()=>location.reload(),500);}
      else showToast(r.error,'error');
    }
    async function deleteUser(uuid){
      if(!confirm('مطمئنی؟'))return;
      const r=await api('/api/delete-user','POST',{uuid});
      if(r.success){showToast('حذف شد','success');setTimeout(()=>location.reload(),500);}
      else showToast(r.error,'error');
    }
    async function resetUsage(uuid){
      const r=await api('/api/reset-usage','POST',{uuid});
      if(r.success){showToast('ریست شد','success');setTimeout(()=>location.reload(),500);}
    }
    `;
  }

  static wrap(content, title, extraHead = '') {
    return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${title}</title>
  <style>${this.style()}</style>
  ${extraHead}
</head>
<body>
  <div class="container">
    ${content}
  </div>
  <script>${this.js()}</script>
</body>
</html>`;
  }
}

// ==================== صفحات HTML ====================
function loginPage(config, error = '') {
  const errorHtml = error ? `<div class="card" style="border:1px solid var(--danger);color:var(--danger);">${error}</div>` : '';
  const content = `
    <div class="header"><span class="brand">⚡ TAAKAA-XI PRO v16</span><span style="color:var(--text2);">ورود به پنل مدیریت</span></div>
    <div style="max-width:450px;margin:80px auto;">
      <div class="card fade-in">
        <h2 style="text-align:center;margin-bottom:20px;">🔐 ورود ادمین</h2>
        ${errorHtml}
        <form method="POST" action="/api/login">
          <input type="password" name="password" placeholder="رمز عبور" required autofocus>
          <input type="text" name="totp" placeholder="کد TOTP (اختیاری)" maxlength="6" pattern="[0-9]{6}">
          <button type="submit" class="btn" style="width:100%;margin-top:15px;">🚀 ورود</button>
        </form>
        <p style="text-align:center;margin-top:15px;color:var(--text2);font-size:13px;">📢 کانال: @TaaKaaOrg | نسخه ۱۶ پرو</p>
      </div>
    </div>
  `;
  return HTMLGenerator.wrap(content, 'TAAKAA-XI | ورود');
}

function setupPage(config, error = '') {
  const errorHtml = error ? `<div class="card" style="border:1px solid var(--danger);color:var(--danger);">${error}</div>` : '';
  const content = `
    <div class="header"><span class="brand">🛠️ راه‌اندازی اولیه TAAKAA-XI</span></div>
    <div style="max-width:500px;margin:40px auto;">
      <div class="card fade-in">
        <h2 style="text-align:center;">🎉 خوش آمدید!</h2>
        <p style="color:var(--text2);text-align:center;">این اولین اجرای شماست. رمز عبور ادمین را تنظیم کنید.</p>
        ${errorHtml}
        <form method="POST" action="/api/setup">
          <input type="password" name="password" placeholder="رمز عبور جدید" required minlength="6">
          <input type="password" name="confirm" placeholder="تکرار رمز عبور" required minlength="6">
          <button type="submit" class="btn" style="width:100%;margin-top:15px;">✅ راه‌اندازی</button>
        </form>
      </div>
    </div>
  `;
  return HTMLGenerator.wrap(content, 'TAAKAA-XI | Setup');
}

function dashboardPage(stats, users, config) {
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalUsage = users.reduce((sum, u) => sum + (u.usageTotal || 0), 0);
  const today = new Date().toISOString().split('T')[0];
  const todayUsage = users.reduce((sum, u) => sum + (u.dailyUsage?.[today] || 0), 0);
  
  const recentActivity = users.sort((a, b) => (b.lastAccess || 0) - (a.lastAccess || 0)).slice(0, 5);
  const activityHtml = recentActivity.length > 0 
    ? recentActivity.map(u => `<div class="flex" style="padding:8px 0;border-bottom:1px solid var(--border);"><span>${u.name}</span><span style="color:var(--text2);font-size:12px;">${u.lastAccess ? new Date(u.lastAccess).toLocaleString('fa-IR') : '—'}</span></div>`).join('')
    : '<p style="color:var(--text2);">هنوز فعالیتی ثبت نشده</p>';
  
  const chartBars = Array.from({length: 7}, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split('T')[0];
    const usage = users.reduce((sum, u) => sum + (u.dailyUsage?.[key] || 0), 0);
    const maxH = 120;
    const maxUsage = Math.max(1, ...Array.from({length: 7}, (_, j) => {
      const dj = new Date(); dj.setDate(dj.getDate() - (6 - j));
      return users.reduce((sum, u) => sum + (u.dailyUsage?.[dj.toISOString().split('T')[0]] || 0), 0);
    }));
    const h = Math.max(4, (usage / maxUsage) * maxH);
    return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;"><div style="width:100%;max-width:40px;height:${h}px;background:linear-gradient(180deg,#ff6b00,#ff8c42);border-radius:6px 6px 0 0;transition:0.3s;" title="${SmartParser.formatBytes(usage)}"></div><small style="color:var(--text2);font-size:11px;">${d.toLocaleDateString('fa-IR',{weekday:'short'})}</small></div>`;
  }).join('');
  
  const content = `
    <div class="header fade-in">
      <div class="flex" style="gap:20px;"><span class="brand">⚡ TAAKAA-XI PRO v16</span><span class="badge badge-ok" style="font-size:13px;">🟢 عملیاتی</span></div>
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
      <div class="card"><div style="color:var(--text2);font-size:13px;">👥 کاربران</div><div class="stat-val">${users.length}</div><span class="badge badge-ok">${activeUsers} فعال</span><span class="badge badge-err" style="margin-right:4px;">${users.length - activeUsers} معلق</span></div>
      <div class="card"><div style="color:var(--text2);font-size:13px;">📊 ترافیک کل</div><div class="stat-val">${SmartParser.formatBytes(totalUsage)}</div><span style="color:var(--text2);font-size:12px;">امروز: ${SmartParser.formatBytes(todayUsage)}</span></div>
      <div class="card"><div style="color:var(--text2);font-size:13px;">🛡️ Fragment</div><div class="stat-val">${config.FRAGMENT?.enabled ? '✅' : '❌'}</div><span style="color:var(--text2);font-size:12px;">${config.FRAGMENT?.enabled ? 'size: ' + config.FRAGMENT.size + ' | count: ' + config.FRAGMENT.count : 'غیرفعال'}</span></div>
      <div class="card"><div style="color:var(--text2);font-size:13px;">🌐 WARP</div><div class="stat-val">${config.WARP_ENABLED ? '✅' : '❌'}</div><span style="color:var(--text2);font-size:12px;">Pro: ${config.WARP_PRO_ENABLED ? 'فعال' : 'غیرفعال'}</span></div>
    </div>
    <div class="card fade-in">
      <h3 style="margin-bottom:15px;">📈 مصرف ۷ روز اخیر</h3>
      <div style="display:flex;align-items:flex-end;gap:8px;height:150px;padding:10px 0;">${chartBars}</div>
      <p style="text-align:center;color:var(--text2);font-size:12px;margin-top:10px;">مجموع: ${SmartParser.formatBytes(totalUsage)}</p>
    </div>
    <div class="grid3 fade-in">
      <div class="card">
        <h3 style="margin-bottom:15px;">🛡️ وضعیت امنیتی</h3>
        <div class="flex" style="margin:12px 0;"><span>Fragment</span><span class="badge ${config.FRAGMENT?.enabled ? 'badge-ok' : 'badge-err'}">${config.FRAGMENT?.enabled ? 'فعال' : 'غیرفعال'}</span></div>
        <div class="flex" style="margin:12px 0;"><span>ECH</span><span class="badge ${config.ECH_ENABLED ? 'badge-ok' : 'badge-err'}">${config.ECH_ENABLED ? 'فعال' : 'غیرفعال'}</span></div>
        <div class="flex" style="margin:12px 0;"><span>TOTP 2FA</span><span class="badge badge-ok">فعال</span></div>
        <div class="flex" style="margin:12px 0;"><span>Rate Limit</span><span class="badge badge-warn">${SYSTEM_CONFIG.MAX_LOGIN_ATTEMPTS} تلاش</span></div>
        <div class="flex" style="margin:12px 0;"><span>DNS over HTTPS</span><span class="badge badge-ok">فعال</span></div>
      </div>
      <div class="card"><h3 style="margin-bottom:15px;">📋 فعالیت اخیر</h3>${activityHtml}</div>
      <div class="card">
        <h3 style="margin-bottom:15px;">📦 اطلاعات سیستم</h3>
        <div style="color:var(--text2);font-size:13px;line-height:2;">
          <p>🔹 نسخه: <strong>v16 PRO</strong></p>
          <p>🔹 پروتکل: <strong>${config.DEFAULT_PROTOCOL?.toUpperCase() || 'VLESS'}</strong></p>
          <p>🔹 SNI: <strong>${config.SNI_LIST?.[0] || 'www.google.com'}</strong></p>
          <p>🔹 پورت: <strong>${config.PORTS?.[0] || 443}</strong></p>
          <p>🔹 Fingerprint: <strong>${config.FINGERPRINTS?.[0] || 'chrome'}</strong></p>
          <p>🔹 اپراتورها: <strong>ایرانسل / همراه اول / رایتل</strong></p>
        </div>
      </div>
    </div>
    <p style="text-align:center;color:var(--text2);margin-top:20px;font-size:13px;">🏗️ توسعه توسط تیم TAAKAA | ۳ ماه توسعه | 📢 @TaaKaaOrg | ⚡ نسخه ۱۶ پرو</p>
  `;
  return HTMLGenerator.wrap(content, 'TAAKAA-XI | داشبورد');
}

function usersPage(users, config) {
  const rows = users.map(u => {
    const stats = { usagePercent: u.quotaTotal > 0 ? Math.min(100, ((u.usageTotal || 0) / u.quotaTotal) * 100) : 0, daysLeft: u.expiryDate ? Math.max(0, Math.ceil((u.expiryDate - Date.now()) / 86400000)) : 0 };
    return `<tr><td><strong>${u.name}</strong></td><td style="font-family:monospace;font-size:11px;direction:ltr;text-align:left;">${u.uuid.substring(0, 18)}...</td><td>${u.ip || '—'}</td><td>${SmartParser.formatBytes(u.usageTotal || 0)} / ${SmartParser.formatBytes(u.quotaTotal)}<div class="progress"><div class="progress-fill" style="width:${stats.usagePercent}%"></div></div><small>${stats.usagePercent.toFixed(1)}%</small></td><td>${SmartParser.formatBytes(u.quotaDaily)}</td><td>${SmartParser.formatDuration(stats.daysLeft)}</td><td><span class="badge ${u.status === 'active' ? 'badge-ok' : 'badge-err'}">${u.status === 'active' ? '🟢 فعال' : '🔴 معلق'}</span></td><td>${SYSTEM_CONFIG.OPERATORS[u.operator] || u.operator}</td><td><button class="btn btn-sm" onclick="editUser('${u.uuid}')" title="ویرایش">✏️</button><button class="btn btn-sm btn-outline" onclick="toggleUser('${u.uuid}')" title="${u.status === 'active' ? 'تعلیق' : 'فعال‌سازی'}">${u.status === 'active' ? '⏸️' : '▶️'}</button><button class="btn btn-sm btn-warn" onclick="resetUsage('${u.uuid}')" title="ریست مصرف">🔄</button><button class="btn btn-sm btn-danger" onclick="deleteUser('${u.uuid}')" title="حذف">🗑️</button></td></tr>`;
  }).join('');
  
  const content = `
    <div class="header fade-in"><span class="brand">👥 مدیریت کاربران</span><div class="flex" style="gap:10px;"><button class="btn" onclick="openModal('add-user-modal')">➕ کاربر جدید</button></div></div>
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
      <div style="overflow-x:auto;"><table><thead><tr><th>نام</th><th>UUID</th><th>IP</th><th>مصرف</th><th>روزانه</th><th>زمان</th><th>وضعیت</th><th>اپراتور</th><th>عملیات</th></tr></thead><tbody>${rows}</tbody></table></div>
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
          <select name="operator"><option value="mtn">ایرانسل</option><option value="mci">همراه اول</option><option value="rtl">رایتل</option></select>
          <select name="protocol"><option value="vless">VLESS</option><option value="trojan">Trojan</option><option value="shadowsocks">Shadowsocks</option></select>
          <div class="flex mt-20"><button type="submit" class="btn">✅ ایجاد</button><button type="button" class="btn btn-outline" onclick="closeModal('add-user-modal')">انصراف</button></div>
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
          <select name="operator" id="edit-operator"><option value="mtn">ایرانسل</option><option value="mci">همراه اول</option><option value="rtl">رایتل</option></select>
          <div class="flex mt-20"><button type="submit" class="btn">💾 ذخیره</button><button type="button" class="btn btn-outline" onclick="closeModal('edit-user-modal')">انصراف</button></div>
        </form>
      </div>
    </div>
    <script>
      async function createUser(){
        const f=document.getElementById('add-user-form');
        const d=new FormData(f);
        const data={}; d.forEach((v,k)=>data[k]=v);
        const r=await api('/api/create-user','POST',data);
        if(r.success){showToast('✅ کاربر ایجاد شد','success');closeModal('add-user-modal');setTimeout(()=>location.reload(),500);}
        else showToast('❌ '+r.error,'error');
      }
      async function editUser(uuid){
        const r=await api('/api/get-user?uuid='+uuid);
        if(r.success){
          document.getElementById('edit-uuid').value=r.user.uuid;
          document.getElementById('edit-name').value=r.user.name;
          document.getElementById('edit-ip').value=r.user.ip||'';
          document.getElementById('edit-quota').value=SmartParser.formatBytes(r.user.quotaTotal);
          document.getElementById('edit-dailyQuota').value=SmartParser.formatBytes(r.user.quotaDaily);
          document.getElementById('edit-expiry').value=r.user.expiryDays+'d';
          document.getElementById('edit-operator').value=r.user.operator;
          openModal('edit-user-modal');
        }
      }
      async function saveEditUser(){
        const f=document.getElementById('edit-user-form');
        const d=new FormData(f);
        const data={}; d.forEach((v,k)=>data[k]=v);
        const r=await api('/api/edit-user','POST',data);
        if(r.success){showToast('✅ ذخیره شد','success');closeModal('edit-user-modal');setTimeout(()=>location.reload(),500);}
        else showToast('❌ '+r.error,'error');
      }
    </script>
  `;
  return HTMLGenerator.wrap(content, 'TAAKAA-XI | کاربران');
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
          <div class="flex" style="margin:15px 0;"><div><strong>Fragment</strong><br><small style="color:var(--text2);">تکه‌تکه کردن پکت TLS Hello</small></div><label class="toggle"><input type="checkbox" name="fragment_enabled" ${config.FRAGMENT?.enabled ? 'checked' : ''}><span class="slider"></span></label></div>
          <div style="margin:15px 0;"><label>Fragment Size</label><input type="text" name="fragment_size" value="${config.FRAGMENT?.size || '1-5'}"></div>
          <div style="margin:15px 0;"><label>Fragment Count</label><input type="number" name="fragment_count" value="${config.FRAGMENT?.count || 3}" min="1" max="10"></div>
          <div style="margin:15px 0;"><label>Fragment Delay</label><input type="text" name="fragment_delay" value="${config.FRAGMENT?.delay || '1-3'}"></div>
          <div class="flex" style="margin:15px 0;"><div><strong>WARP</strong><br><small style="color:var(--text2);">مسیریابی از طریق Cloudflare WARP</small></div><label class="toggle"><input type="checkbox" name="warp_enabled" ${config.WARP_ENABLED ? 'checked' : ''}><span class="slider"></span></label></div>
          <div class="flex" style="margin:15px 0;"><div><strong>WARP Pro</strong><br><small style="color:var(--text2);">نسخه حرفه‌ای با مسیریابی بهتر</small></div><label class="toggle"><input type="checkbox" name="warp_pro_enabled" ${config.WARP_PRO_ENABLED ? 'checked' : ''}><span class="slider"></span></label></div>
          <div class="flex" style="margin:15px 0;"><div><strong>ECH</strong><br><small style="color:var(--text2);">Encrypted Client Hello</small></div><label class="toggle"><input type="checkbox" name="ech_enabled" ${config.ECH_ENABLED ? 'checked' : ''}><span class="slider"></span></label></div>
          <div style="margin:15px 0;"><label>SNI</label><select name="sni">${SYSTEM_CONFIG.SNI_LIST.map(s => `<option value="${s}" ${(config.SNI_LIST?.[0] || '') === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
          <div style="margin:15px 0;"><label>Fingerprint</label><select name="fingerprint">${SYSTEM_CONFIG.FINGERPRINTS.map(f => `<option value="${f}" ${(config.FINGERPRINTS?.[0] || '') === f ? 'selected' : ''}>${f}</option>`).join('')}</select></div>
          <div style="margin:15px 0;"><label>Port</label><select name="port">${SYSTEM_CONFIG.PORTS.map(p => `<option value="${p}" ${(config.PORTS?.[0] || '') === p ? 'selected' : ''}>${p}</option>`).join('')}</select></div>
          <button type="submit" class="btn" style="width:100%;margin-top:20px;">💾 ذخیره تنظیمات</button>
        </form>
      </div>
      <div>
        <div class="card fade-in">
          <h3 style="margin-bottom:15px;">🔐 تغییر رمز عبور</h3>
          <form onsubmit="event.preventDefault();changePassword()" id="password-form">
            <input type="password" name="current" placeholder="رمز فعلی" required>
            <input type="password" name="new_password" placeholder="رمز جدید" required minlength="6">
            <input type="password" name="confirm" placeholder="تکرار رمز جدید" required>
            <button type="submit" class="btn" style="width:100%;margin-top:10px;">🔑 تغییر رمز</button>
          </form>
        </div>
        <div class="card fade-in mt-20">
          <h3 style="margin-bottom:15px;">🔄 تغییر UUID سیستم</h3>
          <p style="color:var(--text2);font-size:13px;">UUID جدید برای همه کاربران جدید استفاده می‌شود.</p>
          <button class="btn btn-outline" onclick="changeSystemUUID()" style="width:100%;margin-top:10px;">🎲 تولید UUID جدید</button>
        </div>
        <div class="card fade-in mt-20">
          <h3 style="margin-bottom:15px;">💾 بکاپ</h3>
          <p style="color:var(--text2);font-size:13px;">دانلود تمام داده‌ها به صورت JSON</p>
          <button class="btn" onclick="downloadBackup()" style="width:100%;margin-top:10px;">📥 دانلود بکاپ</button>
        </div>
      </div>
    </div>
    <script>
      async function saveSettings(){
        const f=document.getElementById('settings-form');
        const d=new FormData(f);
        const data={}; d.forEach((v,k)=>data[k]=v);
        data.fragment_enabled = d.get('fragment_enabled') === 'on';
        data.warp_enabled = d.get('warp_enabled') === 'on';
        data.warp_pro_enabled = d.get('warp_pro_enabled') === 'on';
        data.ech_enabled = d.get('ech_enabled') === 'on';
        const r=await api('/api/update-settings','POST',data);
        if(r.success)showToast('✅ تنظیمات ذخیره شد','success');
        else showToast('❌ '+r.error,'error');
      }
      async function changePassword(){
        const f=document.getElementById('password-form');
        const d=new FormData(f);
        const data={current:d.get('current'),new_password:d.get('new_password'),confirm:d.get('confirm')};
        const r=await api('/api/change-password','POST',data);
        if(r.success)showToast('✅ رمز تغییر کرد','success');
        else showToast('❌ '+r.error,'error');
      }
      async function changeSystemUUID(){
        const r=await api('/api/change-system-uuid','POST');
        if(r.success)showToast('✅ UUID جدید: '+r.newUUID,'success');
      }
      async function downloadBackup(){
        const r=await api('/api/backup-kv');
        const blob=new Blob([JSON.stringify(r,null,2)],{type:'application/json'});
        const url=URL.createObjectURL(blob);
        const a=document.createElement('a');a.href=url;
        a.download='taakaa-backup-'+new Date().toISOString()+'.json';
        a.click();showToast('✅ بکاپ دانلود شد','success');
      }
    </script>
  `;
  return HTMLGenerator.wrap(content, 'TAAKAA-XI | تنظیمات');
}

function infoProtocolsPage(config) {
  const content = `
    <div class="header fade-in"><span class="brand">📖 اطلاعات پروتکل‌ها و تکنیک‌ها</span></div>
    <div class="nav fade-in">
      <a href="/">📊 داشبورد</a>
      <a href="/users">👥 کاربران</a>
      <a href="/settings">⚙️ تنظیمات</a>
      <a href="/scanner">📡 اسکنر</a>
      <a href="/info-protocols" class="active">📖 پروتکل‌ها</a>
      <a href="/subscription">📦 اشتراک</a>
      <a href="/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a>
    </div>
    <div class="card fade-in protocol-card"><h4>🔷 VLESS Protocol</h4><p><strong>VLESS</strong> یک پروتکل پراکسی سبک و بدون رمزنگاری داخلی است که برای عبور از فیلترینگ طراحی شده.<br>🔹 <strong>مزایا:</strong> سرعت بالا، مصرف CPU کم، امنیت از طریق TLS تامین می‌شود.<br>🔹 <strong>نحوه کار:</strong> ترافیک در قالب WebSocket + TLS ارسال می‌شود.<br>🔹 <strong>امنیت:</strong> رمزنگاری توسط TLS 1.3 با Certificate معتبر Cloudflare.<br>🔹 <strong>SNI:</strong> از ${config.SNI_LIST?.[0] || 'www.google.com'} برای پنهان‌سازی مقصد استفاده می‌کند.<br>🔹 <strong>Fingerprint:</strong> fingerprint مرورگر Chrome شبیه‌سازی می‌شود.</p></div>
    <div class="card fade-in protocol-card"><h4>🔶 Trojan Protocol</h4><p><strong>Trojan</strong> پروتکلی که ترافیک خود را شبیه به HTTPS معمولی نشان می‌دهد.<br>🔹 <strong>مزایا:</strong> تشخیص سخت‌تر توسط DPI، شباهت کامل به ترافیک وب.<br>🔹 <strong>نحوه کار:</strong> ابتدا یک Handshake TLS انجام می‌شود، سپس رمز عبور در هدر ارسال می‌شود.<br>🔹 <strong>رمز عبور:</strong> از UUID کاربر به عنوان رمز عبور استفاده می‌شود.<br>🔹 <strong>مسیر:</strong> /trojan روی WebSocket.</p></div>
    <div class="card fade-in protocol-card"><h4>🔵 Shadowsocks Protocol</h4><p><strong>Shadowsocks</strong> پروتکل SOCKS5 پروکسی با رمزنگاری قوی.<br>🔹 <strong>رمزنگاری:</strong> ${config.ENCRYPTION || 'aes-256-gcm'} - یکی از قوی‌ترین الگوریتم‌ها.<br>🔹 <strong>مزایا:</strong> سادگی، پشتیبانی گسترده در کلاینت‌ها.<br>🔹 <strong>نحوه کار:</strong> رمزنگاری end-to-end با کلید مشترک.</p></div>
    <div class="card fade-in protocol-card"><h4>🧩 Fragment (تکه‌تکه کردن پکت‌ها)</h4><p><strong>Fragment</strong> تکنیکی برای شکستن پکت‌های TLS Hello به قطعات کوچک‌تر است.<br>🔹 <strong>هدف:</strong> جلوگیری از تشخیص الگوی TLS توسط سیستم‌های DPI.<br>🔹 <strong>نحوه کار:</strong> بسته اولیه TLS به ${config.FRAGMENT?.count || 3} قطعه با سایز ${config.FRAGMENT?.size || '1-5'} بایت شکسته می‌شود.<br>🔹 <strong>تاخیر:</strong> بین هر قطعه ${config.FRAGMENT?.delay || '1-3'} میلی‌ثانیه تاخیر اعمال می‌شود.<br>🔹 <strong>وضعیت:</strong> <span class="badge ${config.FRAGMENT?.enabled ? 'badge-ok' : 'badge-err'}">${config.FRAGMENT?.enabled ? '✅ فعال' : '❌ غیرفعال'}</span></p></div>
    <div class="card fade-in protocol-card"><h4>🔐 ECH (Encrypted Client Hello)</h4><p><strong>ECH</strong> یا Encrypted Client Hello یک استاندارد جدید برای رمزنگاری کامل دست‌دهی TLS است.<br>🔹 <strong>هدف:</strong> مخفی کردن کامل SNI از دید ISP و سیستم‌های نظارتی.<br>🔹 <strong>نحوه کار:</strong> کل فرآیند Client Hello با کلید عمومی سرور رمزنگاری می‌شود.<br>🔹 <strong>وضعیت:</strong> <span class="badge ${config.ECH_ENABLED ? 'badge-ok' : 'badge-err'}">${config.ECH_ENABLED ? '✅ فعال' : '❌ غیرفعال'}</span></p></div>
    <div class="card fade-in protocol-card"><h4>🌐 Cloudflare WARP</h4><p><strong>WARP</strong> سرویس VPN رایگان Cloudflare که ترافیک را از شبکه آن‌ها عبور می‌دهد.<br>🔹 <strong>وضعیت WARP:</strong> <span class="badge ${config.WARP_ENABLED ? 'badge-ok' : 'badge-err'}">${config.WARP_ENABLED ? '✅ فعال' : '❌ غیرفعال'}</span><br>🔹 <strong>وضعیت WARP Pro:</strong> <span class="badge ${config.WARP_PRO_ENABLED ? 'badge-ok' : 'badge-err'}">${config.WARP_PRO_ENABLED ? '✅ فعال' : '❌ غیرفعال'}</span></p></div>
    <p style="text-align:center;color:var(--text2);margin-top:20px;font-size:13px;">📢 برای اطلاعات بیشتر به کانال @TaaKaaOrg مراجعه کنید | ⚡ TAAKAA-XI PRO v16</p>
  `;
  return HTMLGenerator.wrap(content, 'TAAKAA-XI | اطلاعات پروتکل‌ها');
}

function scannerPage() {
  const content = `
    <div class="header fade-in"><span class="brand">📡 اسکنر IP</span></div>
    <div class="nav fade-in">
      <a href="/">📊 داشبورد</a>
      <a href="/users">👥 کاربران</a>
      <a href="/settings">⚙️ تنظیمات</a>
      <a href="/scanner" class="active">📡 اسکنر</a>
      <a href="/info-protocols">📖 پروتکل‌ها</a>
      <a href="/subscription">📦 اشتراک</a>
      <a href="/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a>
    </div>
    <div class="card fade-in">
      <h3>📡 اسکن IP های Cloudflare</h3>
      <p style="color:var(--text2);">دیتابیس ۲۰ IP تست شده برای اپراتورهای ایران</p>
      <div class="flex flex-wrap mt-20" style="gap:10px;"><button class="btn" onclick="quickScan()">⚡ اسکن سریع (۵ IP)</button><button class="btn" onclick="fullScan()">🔍 اسکن کامل (۲۰ IP)</button></div>
      <div id="scan-results" class="mt-20"><p style="color:var(--text2);">منتظر شروع اسکن...</p></div>
      <div id="best-ip-section" style="display:none;margin-top:20px;"><h4>🌟 بهترین IP پیدا شده:</h4><div class="code-block" id="best-ip-display"></div></div>
    </div>
    <div class="card fade-in mt-20">
      <h3>📍 انتخاب لوکیشن</h3>
      <p style="color:var(--text2);margin-bottom:15px;">کشورهای در دسترس Cloudflare:</p>
      <div style="display:flex;gap:15px;flex-wrap:wrap;font-size:32px;justify-content:center;">
        <span class="flag" onclick="showToast('📍 آلمان انتخاب شد','info')" title="آلمان">🇩🇪</span>
        <span class="flag" onclick="showToast('📍 هلند انتخاب شد','info')" title="هلند">🇳🇱</span>
        <span class="flag" onclick="showToast('📍 انگلستان انتخاب شد','info')" title="انگلستان">🇬🇧</span>
        <span class="flag" onclick="showToast('📍 آمریکا انتخاب شد','info')" title="آمریکا">🇺🇸</span>
        <span class="flag" onclick="showToast('📍 فرانسه انتخاب شد','info')" title="فرانسه">🇫🇷</span>
        <span class="flag" onclick="showToast('📍 ژاپن انتخاب شد','info')" title="ژاپن">🇯🇵</span>
        <span class="flag" onclick="showToast('📍 سنگاپور انتخاب شد','info')" title="سنگاپور">🇸🇬</span>
        <span class="flag" onclick="showToast('📍 امارات انتخاب شد','info')" title="امارات">🇦🇪</span>
        <span class="flag" onclick="showToast('📍 ترکیه انتخاب شد','info')" title="ترکیه">🇹🇷</span>
        <span class="flag" onclick="showToast('📍 هند انتخاب شد','info')" title="هند">🇮🇳</span>
        <span class="flag" onclick="showToast('📍 برزیل انتخاب شد','info')" title="برزیل">🇧🇷</span>
        <span class="flag" onclick="showToast('📍 استرالیا انتخاب شد','info')" title="استرالیا">🇦🇺</span>
      </div>
    </div>
    <script>
      async function quickScan(){
        document.getElementById('scan-results').innerHTML='<div class="pulse" style="text-align:center;padding:20px;">⏳ در حال اسکن ۵ IP...</div>';
        const r=await api('/api/quick-scan');
        if(r.success)displayResults(r);
        else document.getElementById('scan-results').innerHTML='<p style="color:var(--danger);">خطا در اسکن</p>';
      }
      async function fullScan(){
        document.getElementById('scan-results').innerHTML='<div class="pulse" style="text-align:center;padding:20px;">⏳ در حال اسکن ۲۰ IP... (ممکن است چند ثانیه طول بکشد)</div>';
        const r=await api('/api/full-scan');
        if(r.success)displayResults(r);
        else document.getElementById('scan-results').innerHTML='<p style="color:var(--danger);">خطا در اسکن</p>';
      }
      function displayResults(data){
        let html='<table><thead><tr><th>IP</th><th>اپراتور</th><th>وضعیت</th><th>Latency</th></tr></thead><tbody>';
        data.results.forEach(r=>{ html+='<tr><td style="font-family:monospace;direction:ltr;">'+r.ip+'</td><td>'+getOperatorName(r.operator)+'</td><td><span class="badge '+(r.alive?'badge-ok':'badge-err')+'">'+(r.alive?'✅ زنده':'❌ مرده')+'</span></td><td>'+(r.alive?r.latency+'ms':'—')+'</td></tr>'; });
        html+='</tbody></table>';
        document.getElementById('scan-results').innerHTML=html;
        if(data.bestIP){ document.getElementById('best-ip-section').style.display='block'; document.getElementById('best-ip-display').innerHTML='IP: '+data.bestIP.ip+' | اپراتور: '+getOperatorName(data.bestIP.operator)+' | Latency: '+data.bestIP.latency+'ms ⭐'; }
      }
      function getOperatorName(code){ const names={mci:'همراه اول',mtn:'ایرانسل',rtl:'رایتل'}; return names[code]||code; }
    </script>
  `;
  return HTMLGenerator.wrap(content, 'TAAKAA-XI | اسکنر');
}

function subscriptionPage(users, config, domain) {
  const userOptions = users.map(u => `<option value="${u.uuid}">${u.name} (${u.uuid.substring(0, 8)}...)</option>`).join('');
  const content = `
    <div class="header fade-in"><span class="brand">📦 اشتراک و کانفیگ</span></div>
    <div class="nav fade-in">
      <a href="/">📊 داشبورد</a>
      <a href="/users">👥 کاربران</a>
      <a href="/settings">⚙️ تنظیمات</a>
      <a href="/scanner">📡 اسکنر</a>
      <a href="/info-protocols">📖 پروتکل‌ها</a>
      <a href="/subscription" class="active">📦 اشتراک</a>
      <a href="/logout" style="background:rgba(239,68,68,0.15);color:var(--danger);">🚪 خروج</a>
    </div>
    <div class="card fade-in">
      <h3>🔗 لینک اشتراک</h3>
      <p style="color:var(--text2);">یک کاربر انتخاب کنید:</p>
      <select id="sub-user-select" onchange="updateSubscription()" style="margin:10px 0;"><option value="">-- انتخاب کاربر --</option>${userOptions}</select>
      <div id="subscription-links" style="display:none;">
        <h4 style="margin-top:20px;">📎 لینک مستقیم:</h4>
        <div class="flex" style="gap:10px;"><input type="text" id="sub-url" readonly class="code-block" style="flex:1;"><button class="btn btn-sm" onclick="copyText(document.getElementById('sub-url').value)">📋 کپی</button></div>
        <h4 style="margin-top:20px;">📋 کانفیگ VLESS:</h4>
        <div class="flex" style="gap:10px;"><textarea id="vless-config" readonly class="code-block" style="flex:1;height:80px;"></textarea><button class="btn btn-sm" onclick="copyText(document.getElementById('vless-config').value)">📋</button></div>
        <h4 style="margin-top:20px;">📋 کانفیگ Trojan:</h4>
        <div class="flex" style="gap:10px;"><textarea id="trojan-config" readonly class="code-block" style="flex:1;height:80px;"></textarea><button class="btn btn-sm" onclick="copyText(document.getElementById('trojan-config').value)">📋</button></div>
        <h4 style="margin-top:20px;">📋 کانفیگ Shadowsocks:</h4>
        <div class="flex" style="gap:10px;"><textarea id="ss-config" readonly class="code-block" style="flex:1;height:80px;"></textarea><button class="btn btn-sm" onclick="copyText(document.getElementById('ss-config').value)">📋</button></div>
        <h4 style="margin-top:20px;">📦 Subscription Base64:</h4>
        <div class="flex" style="gap:10px;"><textarea id="sub-base64" readonly class="code-block" style="flex:1;height:60px;"></textarea><button class="btn btn-sm" onclick="copyText(document.getElementById('sub-base64').value)">📋</button></div>
        <h4 style="margin-top:20px;">📦 Clash YAML:</h4>
        <div class="flex" style="gap:10px;"><textarea id="clash-yaml" readonly class="code-block" style="flex:1;height:100px;"></textarea><button class="btn btn-sm" onclick="copyText(document.getElementById('clash-yaml').value)">📋</button></div>
      </div>
    </div>
    <div class="grid4 fade-in mt-20">
      <div class="card" style="text-align:center;"><div style="font-size:32px;">H</div><strong>Hiddify</strong><br><small style="color:var(--text2);">پیشنهادی</small><br><button class="btn btn-sm mt-10" onclick="showToast('لینک اشتراک را در Hiddify وارد کنید','info')">📥 Import</button></div>
      <div class="card" style="text-align:center;"><div style="font-size:32px;">K</div><strong>Karing</strong><br><small style="color:var(--text2);">پیشنهادی</small><br><button class="btn btn-sm mt-10" onclick="showToast('لینک اشتراک را در Karing وارد کنید','info')">📥 Import</button></div>
      <div class="card" style="text-align:center;"><div style="font-size:32px;">V</div><strong>v2rayNG</strong><br><small style="color:var(--text2);">Android</small><br><button class="btn btn-sm mt-10" onclick="showToast('لینک اشتراک را در v2rayNG وارد کنید','info')">📥 Import</button></div>
      <div class="card" style="text-align:center;"><div style="font-size:32px;">F</div><strong>FlClash</strong><br><small style="color:var(--text2);">Android</small><br><button class="btn btn-sm mt-10" onclick="showToast('لینک اشتراک را در FlClash وارد کنید','info')">📥 Import</button></div>
    </div>
    <script>
      const DOMAIN = '${domain}';
      let allUsers = ${JSON.stringify(users.map(u => ({uuid: u.uuid, name: u.name})))};
      async function updateSubscription(){
        const uuid = document.getElementById('sub-user-select').value;
        if(!uuid){document.getElementById('subscription-links').style.display='none';return;}
        const r = await api('/api/get-configs?uuid='+uuid);
        if(r.success){
          document.getElementById('subscription-links').style.display='block';
          document.getElementById('sub-url').value = 'https://'+DOMAIN+'/sub/'+uuid;
          document.getElementById('vless-config').value = r.configs.vless;
          document.getElementById('trojan-config').value = r.configs.trojan;
          document.getElementById('ss-config').value = r.configs.shadowsocks;
          document.getElementById('sub-base64').value = r.configs.subscription;
          document.getElementById('clash-yaml').value = r.configs.clash;
        }
      }
    </script>
  `;
  return HTMLGenerator.wrap(content, 'TAAKAA-XI | اشتراک');
}

function ownersPage() {
  const content = `
    <div class="header fade-in" style="text-align:center;"><span class="brand">👑 TAAKAA-XI Owners</span></div>
    <div class="card fade-in" style="text-align:center;max-width:600px;margin:40px auto;">
      <h2>🏗️ تیم توسعه TAAKAA</h2>
      <p style="color:var(--text2);margin:20px 0;line-height:2;">
        ⚡ <strong>TAAKAA-XI PRO v16</strong>
        <br>🔹 توسعه: ۳ ماه کار مداوم
        <br>🔹 تکنولوژی: Cloudflare Workers + KV + D1
        <br>🔹 پروتکل‌ها: VLESS | Trojan | Shadowsocks
        <br>🔹 قابلیت‌ها: Fragment | ECH | WARP | Fingerprint
        <br>🔹 امنیت: TOTP 2FA | Rate Limiting | Session Management
      </p>
      <p style="color:var(--primary);font-size:18px;font-weight:bold;">📢 کانال رسمی: @TaaKaaOrg</p>
      <a href="/" class="btn mt-20">🏠 بازگشت به داشبورد</a>
    </div>
  `;
  return HTMLGenerator.wrap(content, 'TAAKAA-XI | Owners');
                                    }
// =============================================
// TAAKAA-XI PRO v16 - Cloudflare Worker
// بخش ۵: Helper Functions و Export Default
// =============================================

// ==================== Helper Functions ====================
function getCookie(cookieHeader, name) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function redirectResponse(url, cookie = null) {
  const headers = { Location: url };
  if (cookie) headers['Set-Cookie'] = cookie;
  return new Response(null, { status: 302, headers });
}

function htmlResponse(html) {
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// ==================== EXPORT DEFAULT ====================
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const cookieHeader = request.headers.get('Cookie') || '';
    const sessionToken = getCookie(cookieHeader, 'taakaa_session');
    
    const storage = new StorageManager(env);
    const sessionMgr = new SessionManager(storage);
    const rateLimiter = new RateLimiter(storage);
    const userMgr = new UserManager(storage);
    const proxyHandler = new ProxyHandler(storage);
    
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const domain = url.hostname;
    
    // Rate Limiting Check
    const rateCheck = await rateLimiter.check(
      `login_${clientIP}`,
      SYSTEM_CONFIG.MAX_LOGIN_ATTEMPTS,
      SYSTEM_CONFIG.LOCKOUT_MINUTES
    );
    
    // First Run Setup
    const isFirstRun = await storage.isFirstRun();
    if (isFirstRun && path !== '/api/setup') {
      if (path === '/') return htmlResponse(setupPage());
      return htmlResponse(setupPage());
    }
    
    // Session Validation
    let session = null;
    if (sessionToken) {
      session = await sessionMgr.validate(sessionToken);
    }
    
    // ==================== Public Pages ====================
    if (path === '/' || path === '') {
      if (!session) return htmlResponse(loginPage());
      const config = await storage.getSystemConfig();
      const users = await storage.getAllUsers();
      return htmlResponse(dashboardPage(null, users, config));
    }
    
    if (path === '/setup') {
      if (!isFirstRun) return redirectResponse('/');
      return htmlResponse(setupPage());
    }
    
    if (path === '/owners') {
      return htmlResponse(ownersPage());
    }
    
    if (path === '/info-protocols') {
      const config = await storage.getSystemConfig();
      return htmlResponse(infoProtocolsPage(config));
    }
    
    // ==================== Protected Pages ====================
    if (!session) {
      if (path.startsWith('/api/')) {
        return jsonResponse({ success: false, error: 'لطفاً وارد شوید' }, 401);
      }
      return htmlResponse(loginPage());
    }
    
    // ==================== API: Auth ====================
    if (path === '/api/login' && method === 'POST') {
      if (!rateCheck.allowed) {
        return jsonResponse({
          success: false,
          error: `تعداد تلاش‌ها تمام شد. ${Math.ceil((rateCheck.resetAt - Date.now()) / 60000)} دقیقه دیگر تلاش کنید.`
        }, 429);
      }
      
      const body = await request.formData();
      const password = body.get('password');
      const totpToken = body.get('totp');
      
      const adminHash = await storage.getAdminPassword();
      if (!adminHash) {
        return jsonResponse({ success: false, error: 'سیستم راه‌اندازی نشده' }, 500);
      }
      
      const validPassword = await CryptoUtils.verifyPassword(password, adminHash);
      if (!validPassword) {
        return htmlResponse(loginPage(null, '❌ رمز عبور اشتباه است'));
      }
      
      const config = await storage.getSystemConfig();
      if (config.TOTP_SECRET) {
        const validTOTP = CryptoUtils.verifyTOTP(totpToken, config.TOTP_SECRET);
        if (!validTOTP && totpToken) {
          return htmlResponse(loginPage(null, '❌ کد TOTP اشتباه است'));
        }
      }
      
      const newSession = await sessionMgr.create({
        role: 'admin',
        ip: clientIP,
        loginAt: Date.now()
      });
      
      const cookie = `taakaa_session=${newSession}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SYSTEM_CONFIG.SESSION_EXPIRY}`;
      return redirectResponse('/', cookie);
    }
    
    if (path === '/api/setup' && method === 'POST') {
      if (!isFirstRun) {
        return jsonResponse({ success: false, error: 'قبلاً راه‌اندازی شده' });
      }
      
      const body = await request.formData();
      const password = body.get('password');
      const confirm = body.get('confirm');
      
      if (password !== confirm) {
        return htmlResponse(setupPage(null, '❌ رمزها مطابقت ندارند'));
      }
      
      if (password.length < 6) {
        return htmlResponse(setupPage(null, '❌ رمز باید حداقل ۶ کاراکتر باشد'));
      }
      
      await storage.setup(password);
      
      const newSession = await sessionMgr.create({
        role: 'admin',
        ip: clientIP,
        loginAt: Date.now()
      });
      
      const cookie = `taakaa_session=${newSession}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SYSTEM_CONFIG.SESSION_EXPIRY}`;
      return redirectResponse('/', cookie);
    }
    
    if (path === '/logout') {
      await sessionMgr.destroy(sessionToken);
      const cookie = 'taakaa_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0';
      return redirectResponse('/', cookie);
    }
    
    // ==================== API: Users ====================
    if (path === '/users') {
      const config = await storage.getSystemConfig();
      const users = await storage.getAllUsers();
      return htmlResponse(usersPage(users, config));
    }
    
    if (path === '/api/create-user' && method === 'POST') {
      const data = await request.json();
      const user = await userMgr.create(data);
      return jsonResponse({ success: true, user });
    }
    
    if (path === '/api/get-user') {
      const uuid = url.searchParams.get('uuid');
      const user = await userMgr.get(uuid);
      if (!user) return jsonResponse({ success: false, error: 'کاربر یافت نشد' }, 404);
      return jsonResponse({ success: true, user });
    }
    
    if (path === '/api/edit-user' && method === 'POST') {
      const data = await request.json();
      const user = await userMgr.update(data.uuid, data);
      if (!user) return jsonResponse({ success: false, error: 'کاربر یافت نشد' }, 404);
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
      if (!user) return jsonResponse({ success: false, error: 'کاربر یافت نشد' }, 404);
      return jsonResponse({ success: true, user });
    }
    
    if (path === '/api/reset-usage' && method === 'POST') {
      const data = await request.json();
      const user = await userMgr.resetUsage(data.uuid);
      if (!user) return jsonResponse({ success: false, error: 'کاربر یافت نشد' }, 404);
      return jsonResponse({ success: true, user });
    }
    
    // ==================== API: Settings ====================
    if (path === '/settings') {
      const config = await storage.getSystemConfig();
      return htmlResponse(settingsPage(config));
    }
    
    if (path === '/api/update-settings' && method === 'POST') {
      const data = await request.json();
      const config = await storage.getSystemConfig();
      
      if (data.fragment_enabled !== undefined) config.FRAGMENT.enabled = data.fragment_enabled === true || data.fragment_enabled === 'true' || data.fragment_enabled === 'on';
      if (data.fragment_size) config.FRAGMENT.size = data.fragment_size;
      if (data.fragment_count) config.FRAGMENT.count = parseInt(data.fragment_count);
      if (data.fragment_delay) config.FRAGMENT.delay = data.fragment_delay;
      if (data.warp_enabled !== undefined) config.WARP_ENABLED = data.warp_enabled === true || data.warp_enabled === 'true' || data.warp_enabled === 'on';
      if (data.warp_pro_enabled !== undefined) config.WARP_PRO_ENABLED = data.warp_pro_enabled === true || data.warp_pro_enabled === 'true' || data.warp_pro_enabled === 'on';
      if (data.ech_enabled !== undefined) config.ECH_ENABLED = data.ech_enabled === true || data.ech_enabled === 'true' || data.ech_enabled === 'on';
      if (data.sni) config.SNI_LIST = [data.sni, ...(config.SNI_LIST || []).filter(s => s !== data.sni)].slice(0, 8);
      if (data.fingerprint) config.FINGERPRINTS = [data.fingerprint, ...(config.FINGERPRINTS || []).filter(f => f !== data.fingerprint)].slice(0, 12);
      if (data.port) config.PORTS = [parseInt(data.port), ...(config.PORTS || []).filter(p => p !== parseInt(data.port))].slice(0, 6);
      
      await storage.saveSystemConfig(config);
      return jsonResponse({ success: true, config });
    }
    
    if (path === '/api/change-password' && method === 'POST') {
      const data = await request.json();
      const config = await storage.getSystemConfig();
      
      const validCurrent = await CryptoUtils.verifyPassword(data.current, config.ADMIN_PASSWORD_HASH);
      if (!validCurrent) {
        return jsonResponse({ success: false, error: 'رمز فعلی اشتباه است' });
      }
      
      if (data.new_password !== data.confirm) {
        return jsonResponse({ success: false, error: 'رمزها مطابقت ندارند' });
      }
      
      config.ADMIN_PASSWORD_HASH = await CryptoUtils.hashPassword(data.new_password);
      await storage.saveSystemConfig(config);
      
      return jsonResponse({ success: true });
    }
    
    if (path === '/api/change-system-uuid' && method === 'POST') {
      const newUUID = CryptoUtils.generateUUID();
      return jsonResponse({ success: true, newUUID });
    }
    
    if (path === '/api/backup-kv') {
      const config = await storage.getSystemConfig();
      const users = await storage.getAllUsers();
      
      return jsonResponse({
        exportedAt: new Date().toISOString(),
        version: 'v16',
        config,
        users,
        totalUsers: users.length
      });
    }
    
    // ==================== API: Scanner ====================
    if (path === '/scanner') {
      return htmlResponse(scannerPage());
    }
    
    if (path === '/api/quick-scan') {
      const results = await IPScanner.quickScan();
      const bestIP = results.find(r => r.alive);
      return jsonResponse({
        success: true,
        results,
        bestIP,
        total: results.length,
        alive: results.filter(r => r.alive).length
      });
    }
    
    if (path === '/api/full-scan') {
      const results = await IPScanner.fullScan();
      const bestIP = results.find(r => r.alive);
      return jsonResponse({
        success: true,
        results,
        bestIP,
        total: results.length,
        alive: results.filter(r => r.alive).length
      });
    }
    
    // ==================== API: Subscription ====================
    if (path === '/subscription') {
      const config = await storage.getSystemConfig();
      const users = await storage.getAllUsers();
      return htmlResponse(subscriptionPage(users, config, domain));
    }
    
    if (path === '/api/get-configs') {
      const uuid = url.searchParams.get('uuid');
      const user = await userMgr.get(uuid);
      if (!user) return jsonResponse({ success: false, error: 'کاربر یافت نشد' }, 404);
      
      const config = await storage.getSystemConfig();
      
      return jsonResponse({
        success: true,
        configs: {
          vless: ConfigGenerator.generateVless(user, config, domain),
          trojan: ConfigGenerator.generateTrojan(user, config, domain),
          shadowsocks: ConfigGenerator.generateShadowsocks(user, config, domain),
          subscription: ConfigGenerator.generateSubscription(user, config, domain),
          clash: ConfigGenerator.generateClashYAML(user, config, domain)
        }
      });
    }
    
    // ==================== Subscription Endpoint ====================
    if (path.startsWith('/sub/')) {
      const uuid = path.split('/sub/')[1];
      if (!CryptoUtils.validateUUID(uuid)) {
        return new Response('Invalid UUID', { status: 400 });
      }
      
      const user = await userMgr.get(uuid);
      if (!user) return new Response('User not found', { status: 404 });
      
      const config = await storage.getSystemConfig();
      const sub = ConfigGenerator.generateSubscription(user, config, domain);
      
      return new Response(sub, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Subscription-Userinfo': `upload=${user.usageTotal || 0}; download=${user.usageTotal || 0}; total=${user.quotaTotal}`,
          'Profile-Update-Interval': '12'
        }
      });
    }
    
    if (path.startsWith('/clash/')) {
      const uuid = path.split('/clash/')[1];
      const user = await userMgr.get(uuid);
      if (!user) return new Response('User not found', { status: 404 });
      
      const config = await storage.getSystemConfig();
      const clash = ConfigGenerator.generateClashYAML(user, config, domain);
      
      return new Response(clash, {
        status: 200,
        headers: { 'Content-Type': 'application/yaml; charset=utf-8' }
      });
    }
    
    // ==================== Proxy Handling ====================
    if (path === '/ws' || path === '/trojan' || path === '/ss') {
      const users = await storage.getAllUsers();
      const activeUser = users.find(u => u.status === 'active');
      
      if (!activeUser) {
        return new Response('No active users', { status: 503 });
      }
      
      return await proxyHandler.handle(request, activeUser);
    }
    
    // ==================== 404 ====================
    return htmlResponse(`
      <div style="text-align:center;padding:100px 20px;">
        <h1 style="font-size:72px;color:var(--primary);">404</h1>
        <p style="color:var(--text2);">صفحه مورد نظر یافت نشد</p>
        <a href="/" class="btn mt-20">🏠 بازگشت به خانه</a>
      </div>
    `);
  }
};

