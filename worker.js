// ============================================================
// TaaKaa-XI v1.0 - بخش ۱: Constants + Utils + Obfuscation
// ============================================================

const _0x4a2f = ['TaaKaa-XI', 'پنل TaaKaa-XI', 'مدیریت', 'کاربران', 'ترافیک', 'لاگ‌ها', 'پشتیبان‌گیری', 'تنظیمات'];
const _0x9b8c = (s, n) => s.charCodeAt(n % s.length);
const _0x3d7e = (s) => {
  let r = 0;
  for (let i = 0; i < s.length; i++) r = ((r << 5) - r + s.charCodeAt(i)) | 0;
  return r;
};

// ====== CONSTANTS ======
const APP_NAME = 'TaaKaa-XI';
const APP_TAGLINE = 'سرویس برتر فیلترشکن';
const APP_VERSION = '1.0.0';
const APP_AUTHOR = 'TaaKaa-XI Team';
const BUILDER_TAG = 'This service isnt free-TaaKaa-XI';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// ====== FLAG HELPER ======
const FLAGS = {
  DE: '🇩🇪', NL: '🇳🇱', US: '🇺🇸', GB: '🇬🇧', FR: '🇫🇷',
  CA: '🇨🇦', JP: '🇯🇵', SG: '🇸🇬', TR: '🇹🇷', AE: '🇦🇪',
  IT: '🇮🇹', ES: '🇪🇸', SE: '🇸🇪', NO: '🇳🇴', FI: '🇫🇮',
  CH: '🇨🇭', AT: '🇦🇹', BE: '🇧🇪', DK: '🇩🇰', IE: '🇮🇪',
  PL: '🇵🇱', CZ: '🇨🇿', RO: '🇷🇴', HU: '🇭🇺', GR: '🇬🇷',
  PT: '🇵🇹', BR: '🇧🇷', AR: '🇦🇷', MX: '🇲🇽', AU: '🇦🇺',
  IN: '🇮🇳', HK: '🇭🇰', KR: '🇰🇷', TW: '🇹🇼', TH: '🇹🇭',
  MY: '🇲🇾', ID: '🇮🇩', PH: '🇵🇭', VN: '🇻🇳', RU: '🇷🇺',
  UA: '🇺🇦', IR: '🇮🇷', SA: '🇸🇦', EG: '🇪🇬', ZA: '🇿🇦',
};

function getFlag(code) {
  return FLAGS[code] || '🌐';
}

// ====== ENCODER / DECODER ======
const _enc = (str) => {
  try {
    return btoa(String.fromCharCode(...new TextEncoder().encode(str)));
  } catch {
    return btoa(str);
  }
};

const _dec = (b64) => {
  try {
    return new TextDecoder().decode(Uint8Array.from(atob(b64), c => c.charCodeAt(0)));
  } catch {
    return atob(b64);
  }
};

// ====== HASH (UUID-like) ======
const _h = (s) => {
  let h = _0x3d7e(s);
  const hex = '0123456789abcdef';
  let r = '';
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) r += '-';
    else if (i === 14) r += '4';
    else {
      const x = (h + _0x9b8c(s, i)) & 0xf;
      r += hex[(i === 19) ? (x & 0x3) | 0x8 : x];
      h = ((h << 5) - h + s.charCodeAt(i % s.length)) | 0;
    }
  }
  return r;
};

// ====== VALIDATORS ======
const isValidUUID = (u) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(u);

const isValidCountry = (c) => FLAGS.hasOwnProperty(c);

const isValidDays = (d) => Number.isInteger(d) && d > 0 && d <= 3650;

const isValidGB = (g) => Number.isInteger(g) && g > 0 && g <= 100000;

// ====== UTILS ======
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });

const text = (data, status = 200, contentType = 'text/plain') =>
  new Response(data, {
    status,
    headers: { 'Content-Type': contentType, ...CORS_HEADERS },
  });

const html = (data, status = 200) =>
  new Response(data, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...CORS_HEADERS },
  });

const error = (msg, status = 400) => json({ success: false, error: msg }, status);

const ok = (data = {}) => json({ success: true, ...data });

const getDate = (daysFromNow = 30) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString();
};

const parseGB = (bytes) => Math.round((bytes / (1024 ** 3)) * 100) / 100;

const safeJSON = (s, fallback = null) => {
  try { return JSON.parse(s); } catch { return fallback; }
};

// ====== RATE LIMIT (simple) ======
const _rateLimitMap = new Map();
const rateLimit = (key, max = 60, window = 60000) => {
  const now = Date.now();
  const record = _rateLimitMap.get(key) || { count: 0, reset: now + window };
  if (now > record.reset) {
    record.count = 0;
    record.reset = now + window;
  }
  record.count++;
  _rateLimitMap.set(key, record);
  return {
    allowed: record.count <= max,
    remaining: Math.max(0, max - record.count),
    reset: record.reset,
  };
};
// ============================================================
// TaaKaa-XI v1.0 - بخش ۲: UserManager + KV + Backup System
// ============================================================

class UserManager {
  constructor(kv, ctx) {
    this.kv = kv;
    this.ctx = ctx;
    this.cacheKey = 'TaaKaa-XI:users:v2';
    this.backupKey = 'TaaKaa-XI:backup:v2';
    this.logsKey = 'TaaKaa-XI:logs:v2';
  }

  // ====== GET ALL USERS ======
  async getUsers() {
    try {
      const data = await this.kv.get(this.cacheKey);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('TaaKaa-XI: getUsers error:', e);
      return await this.getBackup();
    }
  }

  // ====== GET ONE USER ======
  async getUser(userId) {
    const users = await this.getUsers();
    return users[userId] || null;
  }

  // ====== SAVE USERS (atomic) ======
  async saveUsers(users) {
    try {
      await this.autoBackup(users);
      await this.kv.put(this.cacheKey, JSON.stringify(users));
      return true;
    } catch (e) {
      console.error('TaaKaa-XI: saveUsers error:', e);
      return false;
    }
  }

  // ====== CREATE USER ======
  async createUser(userId, userData) {
    const users = await this.getUsers();
    if (users[userId]) {
      throw new Error('کاربر از قبل وجود دارد');
    }
    users[userId] = {
      ...userData,
      createdAt: new Date().toISOString(),
      lastAccess: null,
      accessCount: 0,
      trafficUsed: 0,
    };
    await this.saveUsers(users);
    await this.log(`کاربر ساخته شد: ${userId}`, 'info');
    return users[userId];
  }

  // ====== UPDATE USER ======
  async updateUser(userId, updates) {
    const users = await this.getUsers();
    if (!users[userId]) throw new Error('کاربر یافت نشد');
    users[userId] = { ...users[userId], ...updates };
    await this.saveUsers(users);
    return users[userId];
  }

  // ====== DELETE USER ======
  async deleteUser(userId) {
    const users = await this.getUsers();
    if (!users[userId]) throw new Error('کاربر یافت نشد');
    delete users[userId];
    await this.saveUsers(users);
    await this.log(`کاربر حذف شد: ${userId}`, 'warn');
    return true;
  }

  // ====== RENEW USER ======
  async renewUser(userId, days) {
    const user = await this.getUser(userId);
    if (!user) throw new Error('کاربر یافت نشد');
    const now = new Date();
    const expiry = new Date(user.expiryDate);
    const base = expiry > now ? expiry : now;
    base.setDate(base.getDate() + days);
    return await this.updateUser(userId, {
      expiryDate: base.toISOString(),
      trafficUsed: 0,
    });
  }

  // ====== CHECK VALIDITY ======
  async checkUserValidity(userId) {
    const user = await this.getUser(userId);
    if (!user) return { valid: false, reason: 'کاربر یافت نشد' };
    if (new Date(user.expiryDate) < new Date()) {
      return { valid: false, reason: 'اشتراک منقضی شده' };
    }
    if ((user.trafficUsed || 0) >= (user.trafficLimit || 0)) {
      return { valid: false, reason: 'ترافیک تمام شده' };
    }
    await this.updateUser(userId, {
      lastAccess: new Date().toISOString(),
      accessCount: (user.accessCount || 0) + 1,
    });
    return { valid: true, user };
  }

  // ====== USAGE TRACKING ======
  async trackUsage(userId, bytes) {
    const user = await this.getUser(userId);
    if (!user) return;
    await this.updateUser(userId, {
      trafficUsed: (user.trafficUsed || 0) + bytes,
    });
  }

  // ====== GET STATS ======
  async getStats() {
    const users = await this.getUsers();
    const arr = Object.values(users);
    const now = new Date();
    return {
      total: arr.length,
      active: arr.filter(u => new Date(u.expiryDate) > now).length,
      expired: arr.filter(u => new Date(u.expiryDate) <= now).length,
      totalTraffic: arr.reduce((s, u) => s + (u.trafficUsed || 0), 0),
      totalTrafficGB: parseGB(arr.reduce((s, u) => s + (u.trafficUsed || 0), 0)),
    };
  }

  // ====== BACKUP ======
  async autoBackup(users) {
    try {
      await this.kv.put(this.backupKey, JSON.stringify(users));
    } catch (e) {}
  }

  async getBackup() {
    try {
      const data = await this.kv.get(this.backupKey);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  // ====== LOGS ======
  async log(message, level = 'info') {
    try {
      const logs = await this.getLogs();
      logs.push({
        time: new Date().toISOString(),
        message,
        level,
      });
      if (logs.length > 1000) logs.shift();
      await this.kv.put(this.logsKey, JSON.stringify(logs));
    } catch (e) {}
  }

  async getLogs() {
    try {
      const data = await this.kv.get(this.logsKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // ====== CLEANUP EXPIRED ======
  async cleanupExpired() {
    const users = await this.getUsers();
    const now = new Date();
    let removed = 0;
    for (const [id, user] of Object.entries(users)) {
      if (new Date(user.expiryDate) < now) {
        delete users[id];
        removed++;
      }
    }
    if (removed > 0) await this.saveUsers(users);
    return removed;
  }
}
// ============================================================
// TaaKaa-XI v1.0 - بخش ۳: ConfigGenerator (VLESS/Trojan/VMess)
// ============================================================

class ConfigGenerator {
  constructor(env) {
    this.env = env;
    this.CLEAN_IPS = [
      '162.159.152.1', '162.159.153.1', '162.159.154.1',
      '162.159.192.1', '162.159.195.1',
      '104.16.0.1', '104.16.1.1', '104.16.16.1',
      '141.101.64.1', '141.101.65.1', '141.101.66.1',
      '198.41.192.1', '198.41.208.1',
      '188.114.96.1', '188.114.97.1', '188.114.98.1',
      '173.245.48.1', '173.245.49.1',
      '103.21.244.1', '103.21.245.1',
      '103.22.200.1', '103.22.201.1',
      '103.31.4.1', '103.31.5.1',
      '107.154.0.1', '107.154.1.1',
      '197.234.240.1', '197.234.241.1',
    ];
  }

  getProxyIP() {
    if (this.env.PROXYIP) return this.env.PROXYIP;
    return this.CLEAN_IPS[Math.floor(Math.random() * this.CLEAN_IPS.length)];
  }

  getProxyIPList() {
    const custom = this.env.PROXYIP ? [this.env.PROXYIP] : [];
    return [...custom, ...this.CLEAN_IPS].slice(0, 5);
  }

  generateVLESS(userId, userData, operator = 'default') {
    const uuid = userData.uuid || this.env.UUID || _h('TaaKaa-XI:' + userId);
    const country = userData.country || 'DE';
    const flag = getFlag(country);
    const address = this.getProxyIP();
    const frag = userData.fragment || '2-5';
    
    const params = new URLSearchParams();
    params.set('encryption', 'none');
    params.set('flow', 'xtls-rprx-vision');
    params.set('security', 'tls');
    params.set('sni', address);
    params.set('fp', 'chrome');
    params.set('type', 'tcp');
    params.set('path', '/');
    
    if (this.env.ENABLE_FRAGMENT !== 'false') {
      params.set('fragment', frag);
    }
    if (this.env.ENABLE_ECH !== 'false') {
      params.set('ech', 'true');
    }
    if (this.env.ENABLE_WARP !== 'false') {
      params.set('warp', 'true');
    }
    
    const configName = encodeURIComponent(
      `${BUILDER_TAG} ${flag} ${country}`
    );
    
    const link = `vless://${uuid}@${address}:443?${params.toString()}#${configName}`;
    
    return {
      type: 'vless',
      link,
      uuid,
      address,
      port: 443,
      expiry: userData.expiryDate,
      userId,
      country,
      flag,
    };
  }

  generateTrojan(userId, userData, operator = 'default') {
    const password = userData.password || userData.uuid || this.env.TR_PASS || 'TaaKaa-XI';
    const country = userData.country || 'US';
    const flag = getFlag(country);
    const address = this.getProxyIP();
    const frag = userData.fragment || '3-7';
    
    const params = new URLSearchParams();
    params.set('security', 'tls');
    params.set('sni', address);
    params.set('type', 'tcp');
    
    if (this.env.ENABLE_FRAGMENT !== 'false') {
      params.set('fragment', frag);
    }
    if (this.env.ENABLE_ECH !== 'false') {
      params.set('ech', 'true');
    }
    
    const configName = encodeURIComponent(
      `${BUILDER_TAG} ${flag} ${country}`
    );
    
    const link = `trojan://${password}@${address}:443?${params.toString()}#${configName}`;
    
    return {
      type: 'trojan',
      link,
      password,
      address,
      port: 443,
      expiry: userData.expiryDate,
      userId,
      country,
      flag,
    };
  }

  generateVMess(userId, userData) {
    const uuid = userData.uuid || this.env.UUID || _h('TaaKaa-XI:vmess:' + userId);
    const country = userData.country || 'SG';
    const flag = getFlag(country);
    const address = this.getProxyIP();
    
    const obj = {
      v: '2',
      ps: `${BUILDER_TAG} ${flag} ${country}`,
      add: address,
      port: '443',
      id: uuid,
      aid: '0',
      net: 'tcp',
      type: 'none',
      host: address,
      path: '/',
      tls: 'tls',
      sni: address,
      fp: 'chrome',
    };
    
    const link = `vmess://${_enc(JSON.stringify(obj))}`;
    
    return {
      type: 'vmess',
      link,
      uuid,
      address,
      port: 443,
      expiry: userData.expiryDate,
      userId,
      country,
      flag,
    };
  }

  generateFullConfig(userId, userData) {
    const configs = [];
    
    if (this.env.ENABLE_VLESS !== 'false') {
      configs.push(this.generateVLESS(userId, userData));
    }
    if (this.env.ENABLE_TROJAN !== 'false') {
      configs.push(this.generateTrojan(userId, userData));
    }
    if (this.env.ENABLE_VMESS !== 'false') {
      configs.push(this.generateVMess(userId, userData));
    }
    
    return {
      userId,
      links: configs,
      expiry: userData.expiryDate,
      country: userData.country || 'DE',
      flag: getFlag(userData.country || 'DE'),
      trafficLimit: userData.trafficLimit || 10737418240,
      trafficUsed: userData.trafficUsed || 0,
    };
  }
  }
// ============================================================
// TaaKaa-XI v1.0 - بخش ۴: Backend Proxy (VLESS WS Handler)
// ============================================================

class VLESSHandler {
  constructor(env) {
    this.env = env;
    this.uuid = env.UUID || '90cd4a77-141a-43c9-991b-08263cfe9c10';
  }

  isValidUUID(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
  }

  parseVlessHeader(buffer) {
    if (buffer.byteLength < 24) return null;
    
    const view = new DataView(buffer);
    const version = view.getUint8(0);
    if (version !== 0) return null;
    
    const uuid = new Uint8Array(buffer, 1, 16);
    const uuidStr = Array.from(uuid).map(b => b.toString(16).padStart(2, '0')).join('');
    const formatted = `${uuidStr.slice(0,8)}-${uuidStr.slice(8,12)}-${uuidStr.slice(12,16)}-${uuidStr.slice(16,20)}-${uuidStr.slice(20,32)}`;
    
    const addon = view.getUint8(17);
    const cmd = view.getUint8(18);
    const port = view.getUint16(19);
    
    let addrType = view.getUint8(21);
    let addr = '';
    let offset = 22;
    
    if (addrType === 1) {
      addr = `${view.getUint8(22)}.${view.getUint8(23)}.${view.getUint8(24)}.${view.getUint8(25)}`;
      offset = 26;
    } else if (addrType === 2) {
      const len = view.getUint8(22);
      const bytes = new Uint8Array(buffer, 23, len);
      addr = new TextDecoder().decode(bytes);
      offset = 23 + len;
    } else if (addrType === 3) {
      const bytes = new Uint8Array(buffer, 22, 16);
      const parts = [];
      for (let i = 0; i < 16; i += 2) {
        parts.push(((bytes[i] << 8) | bytes[i+1]).toString(16));
      }
      addr = parts.join(':');
      offset = 38;
    } else {
      return null;
    }
    
    return {
      uuid: formatted,
      cmd,
      port,
      addr,
      addrType,
      dataOffset: offset,
      isUDP: cmd === 2,
    };
  }

  buildVlessResponse() {
    return new Uint8Array([0, 0]);
  }

  async handleVlessWS(request) {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket', { status: 400 });
    }
    
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    let userUUID = pathSegments[pathSegments.length - 1];
    if (pathSegments[0] === 'vless' && pathSegments[1]) {
      userUUID = pathSegments[1];
    }
    
    if (!this.isValidUUID(userUUID)) {
      return new Response('Invalid UUID', { status: 400 });
    }
    
    const pair = new WebSocketPair();
    const [client, server] = [pair[0], pair[1]];
    
    server.accept();
    
    let remoteSocket = null;
    let remoteWriter = null;
    let isConnected = false;
    let bytesUp = 0;
    let bytesDown = 0;
    
    server.addEventListener('message', async (event) => {
      try {
        const data = new Uint8Array(event.data);
        
        if (!isConnected) {
          const header = this.parseVlessHeader(data);
          if (!header) {
            server.close(1002, 'Invalid VLESS header');
            return;
          }
          
          if (header.uuid.toLowerCase() !== userUUID.toLowerCase()) {
            server.close(1002, 'UUID mismatch');
            return;
          }
          
          try {
            const conn = await fetch(`http://${header.addr}:${header.port}`);
            remoteSocket = conn;
            isConnected = true;
            server.send(this.buildVlessResponse());
          } catch (e) {
            server.close(1002, 'Connection failed');
          }
        } else {
          if (remoteSocket) {
            // Forward data
          }
        }
      } catch (e) {
        server.close(1002, 'Error');
      }
    });
    
    server.addEventListener('close', () => {
      if (remoteSocket) {
        try { remoteSocket.close(); } catch {}
      }
    });
    
    return new Response(null, { status: 101, webSocket: client });
  }
        }
// ============================================================
// TaaKaa-XI v1.0 - بخش ۵: Trojan Handler + Multi-IP Fallback
// ============================================================

class TrojanHandler {
  constructor(env) {
    this.env = env;
    this.password = env.TR_PASS || 'TaaKaa-XI-Secret-2026';
  }

  async sha224(text) {
    const data = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest('SHA-224', data);
    return new Uint8Array(hash);
  }

  parseTrojanRequest(buffer) {
    if (buffer.byteLength < 65) return null;
    const view = new DataView(buffer);
    const viewArr = new Uint8Array(buffer);
    
    let firstCRLF = -1;
    for (let i = 0; i < buffer.byteLength - 1; i++) {
      if (viewArr[i] === 0x0d && viewArr[i+1] === 0x0a) {
        firstCRLF = i;
        break;
      }
    }
    if (firstCRLF === -1) return null;
    
    const hexHash = Array.from(viewArr.slice(0, firstCRLF))
      .map(b => b.toString(16).padStart(2, '0')).join('');
    
    let offset = firstCRLF + 2;
    const cmd = viewArr[offset];
    offset++;
    
    const addrType = viewArr[offset];
    offset++;
    
    let addr = '';
    if (addrType === 1) {
      addr = `${viewArr[offset]}.${viewArr[offset+1]}.${viewArr[offset+2]}.${viewArr[offset+3]}`;
      offset += 4;
    } else if (addrType === 3) {
      const len = viewArr[offset];
      offset++;
      addr = new TextDecoder().decode(viewArr.slice(offset, offset + len));
      offset += len;
    } else if (addrType === 4) {
      const parts = [];
      for (let i = 0; i < 16; i += 2) {
        parts.push(((viewArr[offset+i] << 8) | viewArr[offset+i+1]).toString(16));
      }
      addr = parts.join(':');
      offset += 16;
    } else {
      return null;
    }
    
    const port = (viewArr[offset] << 8) | viewArr[offset+1];
    offset += 2;
    
    if (viewArr[offset] !== 0x0d || viewArr[offset+1] !== 0x0a) {
      return null;
    }
    offset += 2;
    
    return {
      hexHash,
      cmd,
      addr,
      port,
      dataOffset: offset,
      isUDP: cmd === 0x03,
    };
  }

  async verifyPassword(hexHash, password) {
    const hash = await this.sha224(password);
    const computed = Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('');
    return computed.toLowerCase() === hexHash.toLowerCase();
  }

  async handleTrojanWS(request) {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket', { status: 400 });
    }
    
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    let userPass = pathSegments[pathSegments.length - 1];
    if (pathSegments[0] === 'trojan' && pathSegments[1]) {
      userPass = pathSegments[1];
    }
    
    const pair = new WebSocketPair();
    const [client, server] = [pair[0], pair[1]];
    
    server.accept();
    
    let remoteSocket = null;
    let isConnected = false;
    
    server.addEventListener('message', async (event) => {
      try {
        const data = new Uint8Array(event.data);
        
        if (!isConnected) {
          const header = this.parseTrojanRequest(data);
          if (!header) {
            server.close(1002, 'Invalid Trojan header');
            return;
          }
          
          const valid = await this.verifyPassword(header.hexHash, userPass);
          if (!valid) {
            server.close(1002, 'Invalid password');
            return;
          }
          
          try {
            const conn = await fetch(`http://${header.addr}:${header.port}`);
            remoteSocket = conn;
            isConnected = true;
          } catch (e) {
            server.close(1002, 'Connection failed');
          }
        }
      } catch (e) {
        server.close(1002, 'Error');
      }
    });
    
    server.addEventListener('close', () => {
      if (remoteSocket) {
        try { remoteSocket.close(); } catch {}
      }
    });
    
    return new Response(null, { status: 101, webSocket: client });
  }
  }
// ============================================================
// TaaKaa-XI v1.0 - بخش ۶: HTML Panel UI - Login + Dashboard
// ============================================================

const LOGIN_HTML = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ورود - TaaKaa-XI</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Vazirmatn', 'Tahoma', sans-serif;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.container {
  background: rgba(20, 20, 20, 0.95);
  border: 2px solid #ff6b1a;
  border-radius: 20px;
  padding: 40px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(255, 107, 26, 0.3);
}
.logo {
  text-align: center;
  margin-bottom: 30px;
}
.logo h1 {
  font-size: 42px;
  color: #ff6b1a;
  text-shadow: 0 0 20px rgba(255, 107, 26, 0.5);
  margin-bottom: 8px;
}
.logo p { color: #888; font-size: 14px; }
.input-group {
  margin-bottom: 20px;
}
.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #ff6b1a;
  font-size: 14px;
}
.input-group input {
  width: 100%;
  padding: 14px 18px;
  background: #0a0a0a;
  border: 2px solid #333;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  transition: all 0.3s;
  font-family: inherit;
}
.input-group input:focus {
  outline: none;
  border-color: #ff6b1a;
  box-shadow: 0 0 15px rgba(255, 107, 26, 0.3);
}
.btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #ff6b1a 0%, #ff8c42 100%);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 107, 26, 0.4);
}
.btn:active { transform: translateY(0); }
.error {
  background: rgba(255, 50, 50, 0.15);
  border: 1px solid #ff3232;
  color: #ff6b6b;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 14px;
  display: none;
}
.footer {
  text-align: center;
  margin-top: 25px;
  color: #666;
  font-size: 12px;
}
.builder-tag {
  color: #ff6b1a;
  font-weight: bold;
}
</style>
</head>
<body>
<div class="container">
  <div class="logo">
    <h1>⚡ TaaKaa-XI</h1>
    <p>${APP_TAGLINE}</p>
  </div>
  <div class="error" id="error"></div>
  <form id="loginForm">
    <div class="input-group">
      <label>🔑 رمز عبور ادمین</label>
      <input type="password" id="password" placeholder="رمز عبور خود را وارد کنید" required autocomplete="current-password">
    </div>
    <button type="submit" class="btn">ورود به پنل</button>
  </form>
  <div class="footer">
    <div>ساخته شده توسط <span class="builder-tag">${BUILDER_TAG}</span></div>
    <div style="margin-top: 5px;">نسخه ${APP_VERSION}</div>
  </div>
</div>
<script>
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const errorEl = document.getElementById('error');
  errorEl.style.display = 'none';
  
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    
    if (data.success && data.token) {
      localStorage.setItem('TaaKaa-XI-token', data.token);
      window.location.href = '/panel';
    } else {
      errorEl.textContent = data.error || 'رمز عبور اشتباه است';
      errorEl.style.display = 'block';
    }
  } catch (err) {
    errorEl.textContent = 'خطا در ارتباط با سرور';
    errorEl.style.display = 'block';
  }
});
</script>
</body>
</html>`;
// ============================================================
// TaaKaa-XI v1.0 - بخش ۷: Dashboard Body + Users + Logs UI (FIXED)
// ============================================================

const DASHBOARD_BODY = `
<div class="sidebar">
  <div class="logo">
    <h2>⚡ TaaKaa-XI</h2>
    <p>${BUILDER_TAG}</p>
  </div>
  <div class="nav-item active" onclick="showSection('dashboard')"><span>📊</span> <span class="nav-text">داشبورد</span></div>
  <div class="nav-item" onclick="showSection('users')"><span>👥</span> <span class="nav-text">کاربران</span></div>
  <div class="nav-item" onclick="showSection('addUser')"><span>➕</span> <span class="nav-text">افزودن کاربر</span></div>
  <div class="nav-item" onclick="showSection('logs')"><span>📜</span> <span class="nav-text">لاگ‌ها</span></div>
  <div class="nav-item" onclick="showSection('backup')"><span>💾</span> <span class="nav-text">پشتیبان‌گیری</span></div>
  <div class="nav-item" onclick="showSection('settings')"><span>⚙️</span> <span class="nav-text">تنظیمات</span></div>
</div>

<div class="main">
  <div class="header">
    <h1 id="pageTitle">📊 داشبورد</h1>
    <div class="user-info">
      <span>👤 ادمین</span>
      <button class="btn-logout" onclick="logout()">خروج</button>
    </div>
  </div>

  <!-- ====== DASHBOARD ====== -->
  <div id="dashboard" class="content-section active">
    <div class="stats-grid" id="statsGrid">
      <div class="stat-card">
        <div class="icon">👥</div>
        <div class="label">کل کاربران</div>
        <div class="value" id="totalUsers">0</div>
      </div>
      <div class="stat-card">
        <div class="icon">✅</div>
        <div class="label">کاربران فعال</div>
        <div class="value" id="activeUsers">0</div>
      </div>
      <div class="stat-card">
        <div class="icon">⏰</div>
        <div class="label">منقضی شده</div>
        <div class="value" id="expiredUsers">0</div>
      </div>
      <div class="stat-card">
        <div class="icon">🌍</div>
        <div class="label">کشورها</div>
        <div class="value" id="totalCountries">0</div>
      </div>
      <div class="stat-card">
        <div class="icon">📈</div>
        <div class="label">کل ترافیک (GB)</div>
        <div class="value" id="totalTraffic">0</div>
      </div>
      <div class="stat-card">
        <div class="icon">💾</div>
        <div class="label">وضعیت KV</div>
        <div class="value" id="kvStatus">✅</div>
      </div>
    </div>
    <div style="background:#1a1a1a;border:1px solid #ff6b1a;border-radius:15px;padding:25px;">
      <h2 style="color:#ff6b1a;margin-bottom:15px;">📌 اطلاعات سیستم</h2>
      <p>نسخه: <span style="color:#ff6b1a">${APP_VERSION}</span></p>
      <p>سرویس‌دهنده: <span style="color:#ff6b1a">${BUILDER_TAG}</span></p>
      <p>زمان: <span style="color:#ff6b1a" id="currentTime"></span></p>
    </div>
  </div>

  <!-- ====== USERS ====== -->
  <div id="users" class="content-section">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
      <h2 style="color:#ff6b1a;">لیست کاربران</h2>
      <input type="text" id="searchUser" placeholder="🔍 جستجو..." onkeyup="filterUsers()" 
        style="padding:10px 15px;background:#0a0a0a;border:1px solid #333;border-radius:8px;color:#fff;font-family:inherit;width:250px;">
    </div>
    <div style="overflow-x:auto;background:#1a1a1a;border:1px solid #ff6b1a;border-radius:15px;padding:15px;">
      <table id="usersTable" style="width:100%;border-collapse:collapse;">
        <thead><tr>
          <th>ID</th>
          <th>کشور</th>
          <th>انقضا</th>
          <th>ترافیک</th>
          <th>وضعیت</th>
          <th>عملیات</th>
        </tr></thead>
        <tbody id="usersBody"></tbody>
      </table>
    </div>
  </div>

  <!-- ====== ADD USER ====== -->
  <div id="addUser" class="content-section">
    <div style="background:#1a1a1a;border:1px solid #ff6b1a;border-radius:15px;padding:25px;max-width:600px;">
      <h2 style="color:#ff6b1a;margin-bottom:20px;">➕ افزودن کاربر جدید</h2>
      <form id="addUserForm" onsubmit="addUser(event)">
        <div class="form-group">
          <label>🆔 آیدی کاربر</label>
          <input type="text" id="newUserId" placeholder="شناسه یکتا" required>
        </div>
        <div class="form-group">
          <label>🌍 کشور</label>
          <select id="newCountry">
            <option value="DE">🇩🇪 آلمان</option>
            <option value="NL">🇳🇱 هلند</option>
            <option value="US">🇺🇸 آمریکا</option>
            <option value="GB">🇬🇧 انگلستان</option>
            <option value="FR">🇫🇷 فرانسه</option>
            <option value="CA">🇨🇦 کانادا</option>
            <option value="JP">🇯🇵 ژاپن</option>
            <option value="SG">🇸🇬 سنگاپور</option>
            <option value="TR">🇹🇷 ترکیه</option>
            <option value="AE">🇦🇪 امارات</option>
            <option value="IT">🇮🇹 ایتالیا</option>
            <option value="ES">🇪🇸 اسپانیا</option>
            <option value="SE">🇸🇪 سوئد</option>
            <option value="NO">🇳🇴 نروژ</option>
            <option value="FI">🇫🇮 فنلاند</option>
            <option value="CH">🇨🇭 سوئیس</option>
            <option value="AT">🇦🇹 اتریش</option>
            <option value="BE">🇧🇪 بلژیک</option>
            <option value="DK">🇩🇰 دانمارک</option>
            <option value="IE">🇮🇪 ایرلند</option>
            <option value="PL">🇵🇱 لهستان</option>
            <option value="CZ">🇨🇿 چک</option>
            <option value="RO">🇷🇴 رومانی</option>
            <option value="HU">🇭🇺 مجارستان</option>
            <option value="GR">🇬🇷 یونان</option>
            <option value="PT">🇵🇹 پرتغال</option>
            <option value="BR">🇧🇷 برزیل</option>
            <option value="AR">🇦🇷 آرژانتین</option>
            <option value="MX">🇲🇽 مکزیک</option>
            <option value="AU">🇦🇺 استرالیا</option>
            <option value="IN">🇮🇳 هند</option>
            <option value="HK">🇭🇰 هنگ‌کنگ</option>
            <option value="KR">🇰🇷 کره جنوبی</option>
            <option value="TW">🇹🇼 تایوان</option>
            <option value="TH">🇹🇭 تایلند</option>
            <option value="MY">🇲🇾 مالزی</option>
            <option value="ID">🇮🇩 اندونزی</option>
            <option value="PH">🇵🇭 فیلیپین</option>
            <option value="VN">🇻🇳 ویتنام</option>
            <option value="RU">🇷🇺 روسیه</option>
            <option value="UA">🇺🇦 اوکراین</option>
            <option value="IR">🇮🇷 ایران</option>
            <option value="SA">🇸🇦 عربستان</option>
            <option value="EG">🇪🇬 مصر</option>
            <option value="ZA">🇿🇦 آفریقای جنوبی</option>
          </select>
        </div>
        <div class="form-group">
          <label>📅 مدت (روز)</label>
          <input type="number" id="newDays" value="30" min="1" max="3650">
        </div>
        <div class="form-group">
          <label>📊 ترافیک (GB)</label>
          <input type="number" id="newTraffic" value="10" min="1" max="100000">
        </div>
        <button type="submit" class="btn">➕ افزودن کاربر</button>
      </form>
    </div>
  </div>

  <!-- ====== LOGS ====== -->
  <div id="logs" class="content-section">
    <div style="background:#1a1a1a;border:1px solid #ff6b1a;border-radius:15px;padding:25px;">
      <h2 style="color:#ff6b1a;margin-bottom:20px;">📜 لاگ‌ها</h2>
      <div id="logsList" style="max-height:400px;overflow-y:auto;font-size:14px;color:#aaa;"></div>
    </div>
  </div>

  <!-- ====== BACKUP ====== -->
  <div id="backup" class="content-section">
    <div style="background:#1a1a1a;border:1px solid #ff6b1a;border-radius:15px;padding:25px;">
      <h2 style="color:#ff6b1a;margin-bottom:20px;">💾 پشتیبان‌گیری</h2>
      <button class="btn" onclick="createBackup()" style="width:auto;padding:12px 30px;">📥 ایجاد پشتیبان</button>
      <div id="backupStatus" style="margin-top:15px;color:#aaa;"></div>
    </div>
  </div>

  <!-- ====== SETTINGS ====== -->
  <div id="settings" class="content-section">
    <div style="background:#1a1a1a;border:1px solid #ff6b1a;border-radius:15px;padding:25px;">
      <h2 style="color:#ff6b1a;margin-bottom:20px;">⚙️ تنظیمات</h2>
      <div class="form-group">
        <label>🔑 رمز عبور ادمین</label>
        <input type="password" id="changePassword" placeholder="رمز جدید">
        <button class="btn" onclick="changePassword()" style="width:auto;padding:10px 20px;margin-top:10px;">تغییر رمز</button>
      </div>
    </div>
  </div>
</div>

<style>
body {
  margin: 0;
  font-family: 'Vazirmatn', 'Tahoma', sans-serif;
  background: #0a0a0a;
  color: #fff;
  display: flex;
  height: 100vh;
  overflow: hidden;
  direction: rtl;
}
.sidebar {
  width: 220px;
  background: #111;
  padding: 20px 15px;
  border-left: 2px solid #ff6b1a;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
}
.sidebar .logo {
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #222;
  margin-bottom: 20px;
}
.sidebar .logo h2 {
  color: #ff6b1a;
  font-size: 22px;
  margin: 0;
}
.sidebar .logo p {
  color: #555;
  font-size: 10px;
  margin-top: 4px;
}
.nav-item {
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #aaa;
}
.nav-item:hover { background: #1a1a1a; color: #ff8c42; }
.nav-item.active { background: #ff6b1a; color: #fff; }
.nav-item span { font-size: 18px; }

.main {
  margin-right: 220px;
  flex: 1;
  padding: 20px 30px;
  height: 100vh;
  overflow-y: auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #222;
  margin-bottom: 25px;
}
.header h1 { color: #ff6b1a; font-size: 24px; margin: 0; }
.user-info { display: flex; align-items: center; gap: 15px; }
.btn-logout {
  background: #ff6b1a;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-family: inherit;
}
.btn-logout:hover { background: #ff8c42; }

.content-section { display: none; }
.content-section.active { display: block; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}
.stat-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  transition: 0.3s;
}
.stat-card:hover { border-color: #ff6b1a; }
.stat-card .icon { font-size: 32px; }
.stat-card .label { color: #888; font-size: 14px; margin-top: 8px; }
.stat-card .value { color: #ff6b1a; font-size: 28px; font-weight: bold; margin-top: 6px; }

.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  color: #aaa;
  font-size: 14px;
  margin-bottom: 6px;
}
.form-group input, .form-group select {
  width: 100%;
  padding: 12px 16px;
  background: #0a0a0a;
  border: 1px solid #333;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  font-family: inherit;
}
.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: #ff6b1a;
}

table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px 15px;
  text-align: right;
  border-bottom: 1px solid #222;
}
th { color: #ff6b1a; font-weight: bold; }
tr:hover { background: #111; }
.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}
.status-badge.active { background: #00ff8844; color: #00ff88; border: 1px solid #00ff88; }
.status-badge.expired { background: #ff444444; color: #ff4444; border: 1px solid #ff4444; }
.status-badge.finished { background: #ffaa0044; color: #ffaa00; border: 1px solid #ffaa00; }

.btn-sm {
  padding: 4px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-family: inherit;
}
.btn-sm.danger { background: #ff4444; color: #fff; }
.btn-sm.danger:hover { background: #ff6666; }
.btn-sm.success { background: #00cc88; color: #fff; }
.btn-sm.success:hover { background: #00ee99; }

#logsList div {
  padding: 8px 12px;
  border-bottom: 1px solid #1a1a1a;
  font-size: 13px;
}
#logsList .info { color: #00ccff; }
#logsList .warn { color: #ffaa00; }
#logsList .error { color: #ff4444; }
#logsList .success { color: #00ff88; }

@media (max-width: 768px) {
  .sidebar { width: 60px; }
  .sidebar .logo h2 { font-size: 0; }
  .sidebar .logo p { display: none; }
  .sidebar .nav-item span { font-size: 24px; }
  .sidebar .nav-item { justify-content: center; padding: 12px 0; }
  .sidebar .nav-item .nav-text { display: none; }
  .main { margin-right: 60px; padding: 15px; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
}
</style>

<script>
const API_BASE = '';

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('TaaKaa-XI-token');
  const res = await fetch(API_BASE + endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (token || ''),
      ...(options.headers || {}),
    },
  });
  return await res.json();
}

function showSection(section) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
  document.getElementById(section).classList.add('active');
  
  document.querySelectorAll('.nav-item').forEach(el => {
    const txt = el.textContent.trim();
    if (txt.includes('📊') && section === 'dashboard') el.classList.add('active');
    else if (txt.includes('👥') && section === 'users') el.classList.add('active');
    else if (txt.includes('➕') && section === 'addUser') el.classList.add('active');
    else if (txt.includes('📜') && section === 'logs') el.classList.add('active');
    else if (txt.includes('💾') && section === 'backup') el.classList.add('active');
    else if (txt.includes('⚙️') && section === 'settings') el.classList.add('active');
  });
  
  if (section === 'users') loadUsers();
  if (section === 'logs') loadLogs();
  if (section === 'dashboard') loadStats();
}

async function loadStats() {
  try {
    const data = await apiFetch('/api/stats');
    if (data.success) {
      document.getElementById('totalUsers').textContent = data.stats.total || 0;
      document.getElementById('activeUsers').textContent = data.stats.active || 0;
      document.getElementById('expiredUsers').textContent = data.stats.expired || 0;
      document.getElementById('totalTraffic').textContent = data.stats.totalTrafficGB || 0;
      document.getElementById('kvStatus').textContent = '✅';
    }
  } catch (e) {}
}

// ====== LOAD USERS (FIXED) ======
async function loadUsers() {
  try {
    const data = await apiFetch('/api/users');
    const users = data.users || {};
    const entries = Object.entries(users);
    
    const body = document.getElementById('usersBody');
    if (!body) return;
    
    if (entries.length === 0) {
      body.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#666;padding:30px;">هیچ کاربری ثبت نشده است</td></tr>';
      return;
    }
    
    const now = new Date();
    body.innerHTML = entries.map(([id, user]) => {
      const expiry = new Date(user.expiryDate);
      const isActive = expiry > now && (user.trafficUsed || 0) < (user.trafficLimit || 0);
      const statusClass = isActive ? 'active' : 'expired';
      const statusText = isActive ? 'فعال' : 'منقضی';
      const usedGB = parseGB(user.trafficUsed || 0);
      const limitGB = parseGB(user.trafficLimit || 10737418240);
      const flag = getFlag(user.country || 'DE');
      
      return `
        <tr>
          <td><strong>${id}</strong></td>
          <td>${flag} ${user.country || 'DE'}</td>
          <td>${expiry.toLocaleDateString('fa-IR')}</td>
          <td>${usedGB} / ${limitGB} GB</td>
          <td><span class="status-badge ${statusClass}">${statusText}</span></td>
          <td>
            <button class="btn-sm danger" onclick="deleteUser('${id}')">🗑️</button>
            <button class="btn-sm success" onclick="renewUser('${id}')">🔄</button>
          </td>
        </tr>
      `;
    }).join('');
  } catch (e) {
    console.error('loadUsers error:', e);
  }
}

function filterUsers() {
  const q = document.getElementById('searchUser').value.toLowerCase();
  const rows = document.querySelectorAll('#usersBody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}

async function addUser(e) {
  e.preventDefault();
  const userId = document.getElementById('newUserId').value.trim();
  const country = document.getElementById('newCountry').value;
  const days = parseInt(document.getElementById('newDays').value);
  const trafficGB = parseInt(document.getElementById('newTraffic').value);
  
  if (!userId) return alert('لطفاً آیدی کاربر را وارد کنید');
  
  try {
    const res = await apiFetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify({ userId, country, days, trafficGB }),
    });
    if (res.success) {
      alert('✅ کاربر با موفقیت اضافه شد');
      document.getElementById('newUserId').value = '';
      loadUsers();
      loadStats();
    } else {
      alert('❌ ' + (res.error || 'خطا در افزودن کاربر'));
    }
  } catch (e) {
    alert('❌ خطا در ارتباط با سرور');
  }
}

async function deleteUser(userId) {
  if (!confirm(`آیا از حذف کاربر ${userId} مطمئن هستید؟`)) return;
  try {
    const res = await apiFetch('/api/users/delete', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
    if (res.success) {
      loadUsers();
      loadStats();
    } else {
      alert('❌ ' + (res.error || 'خطا در حذف کاربر'));
    }
  } catch (e) {
    alert('❌ خطا در ارتباط با سرور');
  }
}

async function renewUser(userId) {
  const days = prompt('تعداد روز تمدید:', '30');
  if (!days) return;
  try {
    const res = await apiFetch('/api/users/renew', {
      method: 'POST',
      body: JSON.stringify({ userId, days: parseInt(days) }),
    });
    if (res.success) {
      alert('✅ کاربر تمدید شد');
      loadUsers();
      loadStats();
    } else {
      alert('❌ ' + (res.error || 'خطا در تمدید'));
    }
  } catch (e) {
    alert('❌ خطا در ارتباط با سرور');
  }
}

async function loadLogs() {
  try {
    const data = await apiFetch('/api/logs');
    if (data.success && data.logs) {
      const container = document.getElementById('logsList');
      container.innerHTML = data.logs.reverse().slice(0, 100).map(log => 
        `<div class="${log.level}">${new Date(log.time).toLocaleString('fa-IR')} - ${log.message}</div>`
      ).join('');
    }
  } catch (e) {}
}

async function createBackup() {
  try {
    const res = await apiFetch('/api/backup', { method: 'POST' });
    if (res.success) {
      document.getElementById('backupStatus').textContent = '✅ پشتیبان با موفقیت ایجاد شد';
    } else {
      document.getElementById('backupStatus').textContent = '❌ ' + (res.error || 'خطا در ایجاد پشتیبان');
    }
  } catch (e) {
    document.getElementById('backupStatus').textContent = '❌ خطا در ارتباط با سرور';
  }
}

async function changePassword() {
  const newPass = document.getElementById('changePassword').value.trim();
  if (!newPass || newPass.length < 4) {
    alert('رمز عبور باید حداقل ۴ کاراکتر باشد');
    return;
  }
  try {
    const res = await apiFetch('/api/settings/password', {
      method: 'POST',
      body: JSON.stringify({ password: newPass }),
    });
    if (res.success) {
      alert('✅ رمز عبور با موفقیت تغییر کرد');
      document.getElementById('changePassword').value = '';
    } else {
      alert('❌ ' + (res.error || 'خطا در تغییر رمز'));
    }
  } catch (e) {
    alert('❌ خطا در ارتباط با سرور');
  }
}

function logout() {
  localStorage.removeItem('TaaKaa-XI-token');
  window.location.href = '/login';
}

function getFlag(code) {
  const flags = {
    DE: '🇩🇪', NL: '🇳🇱', US: '🇺🇸', GB: '🇬🇧', FR: '🇫🇷',
    CA: '🇨🇦', JP: '🇯🇵', SG: '🇸🇬', TR: '🇹🇷', AE: '🇦🇪',
    IT: '🇮🇹', ES: '🇪🇸', SE: '🇸🇪', NO: '🇳🇴', FI: '🇫🇮',
    CH: '🇨🇭', AT: '🇦🇹', BE: '🇧🇪', DK: '🇩🇰', IE: '🇮🇪',
    PL: '🇵🇱', CZ: '🇨🇿', RO: '🇷🇴', HU: '🇭🇺', GR: '🇬🇷',
    PT: '🇵🇹', BR: '🇧🇷', AR: '🇦🇷', MX: '🇲🇽', AU: '🇦🇺',
    IN: '🇮🇳', HK: '🇭🇰', KR: '🇰🇷', TW: '🇹🇼', TH: '🇹🇭',
    MY: '🇲🇾', ID: '🇮🇩', PH: '🇵🇭', VN: '🇻🇳', RU: '🇷🇺',
    UA: '🇺🇦', IR: '🇮🇷', SA: '🇸🇦', EG: '🇪🇬', ZA: '🇿🇦',
  };
  return flags[code] || '🌐';
}

// ====== LOAD ======
document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  loadUsers();
  setInterval(() => {
    const el = document.getElementById('currentTime');
    if (el) el.textContent = new Date().toLocaleString('fa-IR');
  }, 1000);
});
</script>`;
// ============================================================
// TaaKaa-XI v1.0 - بخش ۸: Router + API Endpoints (FIXED)
// ============================================================

const _tokens = new Map();
const SESSION_TTL = 86400; // 24h

const createToken = (user = 'admin') => {
  const token = _h(Date.now() + ':' + Math.random() + ':' + user);
  _tokens.set(token, { user, created: Date.now() });
  // Cleanup after TTL
  setTimeout(() => _tokens.delete(token), SESSION_TTL * 1000);
  return token;
};

const verifyToken = (token) => {
  if (!token) return false;
  const data = _tokens.get(token);
  if (!data) return false;
  if (Date.now() - data.created > SESSION_TTL * 1000) {
    _tokens.delete(token);
    return false;
  }
  return true;
};

const getAuthToken = (request) => {
  const auth = request.headers.get('Authorization');
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7);
  return null;
};

// ====== MIDDLEWARE: AUTH CHECK ======
const checkAuth = (request) => {
  const token = getAuthToken(request);
  if (!verifyToken(token)) {
    return error('Unauthorized', 401);
  }
  return null;
};

// ====== API HANDLER ======
class APIHandler {
  constructor(request, env, ctx) {
    this.request = request;
    this.env = env;
    this.ctx = ctx;
    this.kv = env.KV;
    this.url = new URL(request.url);
    this.users = new UserManager(this.kv, ctx);
    this.configs = new ConfigGenerator(env);
  }

  // ====== ROUTE ======
  async handle() {
    const path = this.url.pathname;
    const method = this.request.method;

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // ====== PUBLIC ======
    if (path === '/api/login' && method === 'POST') {
      return this.login();
    }

    // ====== AUTH REQUIRED ======
    const authError = checkAuth(this.request);
    if (authError) return authError;

    // Stats
    if (path === '/api/stats' && method === 'GET') {
      return this.stats();
    }

    // Users
    if (path === '/api/users' && method === 'GET') {
      return this.listUsers();
    }
    if (path === '/api/users/create' && method === 'POST') {
      return this.createUser();
    }
    if (path === '/api/users/renew' && method === 'POST') {
      return this.renewUser();
    }
    if (path === '/api/users/delete' && method === 'POST') {
      return this.deleteUser();
    }

    // Logs
    if (path === '/api/logs' && method === 'GET') {
      return this.getLogs();
    }

    // Backup
    if (path === '/api/backup' && method === 'POST') {
      return this.backup();
    }

    // Settings
    if (path === '/api/settings/password' && method === 'POST') {
      return this.changePassword();
    }

    // ====== SUBSCRIPTION ======
    if (path.startsWith('/sub/')) {
      return this.subscription();
    }

    // ====== PAGES ======
    if (path === '/' || path === '/login') {
      return html(LOGIN_HTML);
    }
    if (path === '/panel' || path === '/admin') {
      return html(LOGIN_HTML + DASHBOARD_BODY);
    }

    // ====== WEBSOCKET PROXY ======
    if (method === 'GET' && this.request.headers.get('Upgrade') === 'websocket') {
      return this.handleWebSocket();
    }

    return error('Not found', 404);
  }

  // ====== LOGIN ======
  async login() {
    try {
      const { password } = await this.request.json();
      const adminPass = this.env.ADMIN_PASS || 'admin';
      if (password !== adminPass) {
        return error('رمز عبور اشتباه است', 401);
      }
      const token = createToken('admin');
      await this.users.log('ادمین وارد شد', 'success');
      return ok({ token });
    } catch (e) {
      return error('Invalid request');
    }
  }

  // ====== STATS ======
  async stats() {
    const stats = await this.users.getStats();
    return ok({ stats });
  }

  // ====== LIST USERS ======
  async listUsers() {
    const users = await this.users.getUsers();
    return ok({ users, count: Object.keys(users).length });
  }

  // ====== CREATE USER ======
  async createUser() {
    try {
      const body = await this.request.json();
      const { userId, country, days, trafficGB } = body;

      if (!userId) return error('آیدی کاربر الزامی است');
      if (!isValidCountry(country)) return error('کشور نامعتبر است');
      if (!isValidDays(days)) return error('مدت زمان نامعتبر است');
      if (!isValidGB(trafficGB)) return error('حجم نامعتبر است');

      const userData = {
        userId,
        country,
        expiryDate: getDate(days),
        trafficLimit: trafficGB * 1024 ** 3,
        uuid: _h('TaaKaa-XI:' + userId + ':' + Date.now()),
      };

      const user = await this.users.createUser(userId, userData);
      await this.users.log(`کاربر ${userId} ساخته شد`, 'success');
      return ok({ user });
    } catch (e) {
      return error(e.message || 'خطا در ایجاد کاربر');
    }
  }

  // ====== RENEW USER ======
  async renewUser() {
    try {
      const body = await this.request.json();
      const { userId, days } = body;

      if (!userId) return error('آیدی کاربر الزامی است');
      if (!isValidDays(days)) return error('مدت زمان نامعتبر است');

      const user = await this.users.renewUser(userId, days);
      await this.users.log(`کاربر ${userId} تمدید شد`, 'info');
      return ok({ user });
    } catch (e) {
      return error(e.message || 'خطا در تمدید کاربر');
    }
  }

  // ====== DELETE USER ======
  async deleteUser() {
    try {
      const body = await this.request.json();
      const { userId } = body;

      if (!userId) return error('آیدی کاربر الزامی است');

      await this.users.deleteUser(userId);
      await this.users.log(`کاربر ${userId} حذف شد`, 'warn');
      return ok({});
    } catch (e) {
      return error(e.message || 'خطا در حذف کاربر');
    }
  }

  // ====== GET LOGS ======
  async getLogs() {
    const logs = await this.users.getLogs();
    return ok({ logs });
  }

  // ====== BACKUP ======
  async backup() {
    try {
      const users = await this.users.getUsers();
      await this.users.autoBackup(users);
      await this.users.log('پشتیبان‌گیری انجام شد', 'success');
      return ok({ count: Object.keys(users).length });
    } catch (e) {
      return error('خطا در پشتیبان‌گیری');
    }
  }

  // ====== CHANGE PASSWORD ======
  async changePassword() {
    try {
      const body = await this.request.json();
      const { password } = body;

      if (!password || password.length < 4) {
        return error('رمز عبور باید حداقل ۴ کاراکتر باشد');
      }

      await this.kv.put('TaaKaa-XI:admin_pass', password);
      await this.users.log('رمز عبور تغییر کرد', 'info');
      return ok({});
    } catch (e) {
      return error('خطا در تغییر رمز عبور');
    }
  }

  // ====== SUBSCRIPTION ======
  async subscription() {
    const userId = this.url.pathname.split('/sub/')[1];
    if (!userId) return error('User ID required');

    const user = await this.users.getUser(userId);
    if (!user) return error('User not found', 404);

    const validity = await this.users.checkUserValidity(userId);
    if (!validity.valid) return error(validity.reason, 403);

    const config = this.configs.generateFullConfig(userId, user);
    let subContent = config.links.map(l => l.link).join('\n');

    const format = this.url.searchParams.get('format');
    if (format === 'clash') {
      return text(generateClashYaml(user, config), 200, 'text/yaml');
    }

    if (format === 'singbox') {
      return json(generateSingboxOutbound(user, config));
    }

    return text(_enc(subContent), 200, 'text/plain');
  }

  // ====== WEBSOCKET HANDLER ======
  async handleWebSocket() {
    const path = this.url.pathname;

    if (path.includes('/vless/')) {
      const handler = new VLESSHandler(this.env);
      return await handler.handleVlessWS(this.request);
    }

    if (path.includes('/trojan/')) {
      const handler = new TrojanHandler(this.env);
      return await handler.handleTrojanWS(this.request);
    }

    return error('Invalid websocket endpoint');
  }
}
// ============================================================
// TaaKaa-XI v1.0 - بخش ۹: Main Handler (export default)
// ============================================================

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;

      if (path === '/favicon.ico') {
        return new Response(getFaviconSVG(), {
          headers: { 'Content-Type': 'image/svg+xml', ...CORS_HEADERS }
        });
      }

      if (path === '/robots.txt') {
        return text('User-agent: *\nDisallow: /', 200, 'text/plain');
      }

      if (path === '/health' || path === '/ping') {
        return json({
          status: 'ok',
          app: APP_NAME,
          version: APP_VERSION,
          builder: BUILDER_TAG,
          time: new Date().toISOString(),
        });
      }

      const api = new APIHandler(request, env, ctx);
      return await api.handle();
      
    } catch (e) {
      console.error('TaaKaa-XI Main Error:', e);
      return json({
        success: false,
        error: 'Internal server error',
        builder: BUILDER_TAG,
      }, 500);
    }
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(handleCron(env, ctx));
  },
};

async function handleCron(env, ctx) {
  try {
    const users = new UserManager(env.KV, ctx);
    const removed = await users.cleanupExpired();
    console.log(`TaaKaa-XI Cron: ${removed} expired users cleaned`);
    await users.log('اجرای خودکار Cron', 'info');
  } catch (e) {
    console.error('TaaKaa-XI Cron Error:', e);
  }
}

function getFaviconSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff6b1a"/>
        <stop offset="100%" stop-color="#ff8c42"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#0a0a0a"/>
    <text x="50" y="65" font-size="50" text-anchor="middle" fill="url(#g)" 
      font-family="Arial Black, sans-serif" font-weight="900">⚡</text>
  </svg>`;
}

addEventListener('fetch', (event) => {
  event.respondWith(handleFetch(event.request));
});

async function handleFetch(request) {
  const env = typeof ENV !== 'undefined' ? ENV : globalThis;
  const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
  
  try {
    const api = new APIHandler(request, env, ctx);
    return await api.handle();
  } catch (e) {
    return json({ success: false, error: e.message, builder: BUILDER_TAG }, 500);
  }
}

console.log(`⚡ ${APP_NAME} v${APP_VERSION} started`);
console.log(`🏷️ ${BUILDER_TAG}`);
// ============================================================
// TaaKaa-XI v1.0 - بخش ۱۰: Templates + Helper Functions
// ============================================================

const CONFIG_TEMPLATES = {
  maxSecurity: {
    description: 'بالاترین امنیت، سرعت متوسط',
    fragment: '1-3',
    enableEch: true,
    enableWarp: true,
    sni: 'mozilla.org',
    flow: 'xtls-rprx-vision',
  },
  maxSpeed: {
    description: 'بالاترین سرعت، امنیت عادی',
    fragment: '',
    enableEch: false,
    enableWarp: false,
    sni: 'cloudflare.com',
    flow: '',
  },
  balanced: {
    description: 'تعادل بین سرعت و امنیت',
    fragment: '2-5',
    enableEch: true,
    enableWarp: false,
    sni: 'www.cloudflare.com',
    flow: 'xtls-rprx-vision',
  },
  iranBypass: {
    description: 'مخصوص ایران - Fragment سنگین',
    fragment: '5-10,tlshello',
    enableEch: true,
    enableWarp: true,
    sni: 'aparat.com',
    flow: 'xtls-rprx-vision',
  },
};

function generateClashYaml(user, config) {
  const proxyList = config.links.map(l => {
    if (l.type === 'vless') {
      return `  - name: "${l.country} - VLESS"
    type: vless
    server: ${l.address}
    port: 443
    uuid: ${l.uuid}
    flow: xtls-rprx-vision
    tls: true
    servername: ${l.address}
    skip-cert-verify: true
    network: tcp
    fragment: ${l.fragment || '2-5'}`;
    }
    return '';
  }).filter(Boolean).join('\n');

  return `mixed-port: 7890
allow-lan: true
mode: rule
log-level: info

proxies:
${proxyList}

proxy-groups:
  - name: "TaaKaa-XI"
    type: select
    proxies:
      - "DE - VLESS"
      - "US - VLESS"
      - "SG - VLESS"

rules:
  - MATCH,TaaKaa-XI`;
}

function generateSingboxOutbound(user, config) {
  const outbounds = config.links.map(l => {
    if (l.type === 'vless') {
      return {
        type: 'vless',
        tag: `${l.country} - VLESS`,
        server: l.address,
        server_port: 443,
        uuid: l.uuid,
        flow: 'xtls-rprx-vision',
        tls: { enabled: true, server_name: l.address, utls: { enabled: true, fingerprint: 'chrome' } },
        transport: { type: 'tcp' },
      };
    }
    return null;
  }).filter(Boolean);

  return {
    outbounds: [
      ...outbounds,
      { type: 'direct', tag: 'direct' },
      { type: 'block', tag: 'block' },
    ],
    route: {
      rules: [{ outbound: 'direct', network: 'udp', port: 53 }],
      final: outbounds.length > 0 ? outbounds[0].tag : 'direct',
    },
  };
}

// ====== راهنمای اپ‌های کلاینت ======
// 
// 🔷 v2rayNG (اندروید - رایگان - بهترین)
// ──────────────────────────────────────
// 1. دانلود از Google Play یا GitHub
// 2. لینک vless:// رو کپی کن
// 3. منو ≡ → + → Import config from clipboard
// 4. اتصال رو بزن ☁️
// 
// تنظیمات Fragment:
//    Settings → Custom Fragment → "2-5"
// 
// 🔷 v2rayN (ویندوز)
// ──────────────────────────────────────
// 1. دانلود از GitHub
// 2. Servers → Add [VMess/VLESS] server
// 3. لینک رو Paste کن یا دستی وارد کن
// 4. Enable Tun mode → Connect
// 
// 🔷 Clash for Windows (ویندوز - حرفه‌ای)
// ──────────────────────────────────────
// 1. /sub/USERID?format=clash رو باز کن
// 2. کد YAML رو کپی کن
// 3. Profiles → Import → Paste
// 4. Proxy → TaaKaa-XI رو انتخاب کن
// 
// 🔷 Clash Verge (ویندوز - جدید)
// ──────────────────────────────────────
// 1. Profiles → New → Type: URL
// 2. URL: https://yourdomain.com/sub/USERID?format=clash
// 3. Update → Enable
// 
// 🔷 Sing-box (iOS/Mac/Linux)
// ──────────────────────────────────────
// 1. دانلود از sing-box.ir
// 2. لینک vless رو کپی
// 3. + → Import from clipboard
// 
// 🔷 Shadowrocket (iOS - پولی)
// ──────────────────────────────────────
// 1. Add → Type: VLESS
// 2. لینک رو Paste کن
// 3. Connect
// 
// 🔷 V2Box (iOS - رایگان)
// ──────────────────────────────────────
// 1. Subscription → Add
// 2. URL: https://yourdomain.com/sub/USERID
// 3. Update → Connect
