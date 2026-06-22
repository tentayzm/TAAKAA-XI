// ============================================
// 🔥 Taakaa-Xi Ultimate v5.0 - بخش ۱/۵
// 🌐 @TaaKaaOrg
// ⚡ کانفیگ + دیتابیس + Helper ها
// ============================================

import { connect } from 'cloudflare:sockets';

let CONFIG = {
  UUID: '12345678-1234-1234-1234-123456789abc',
  ADMIN_PASS: '',
  SNI: 'cloudflare.com',
  FINGERPRINT: 'chrome',
  PORTS: ['443', '8443', '2083', '2087', '2096', '2053'],
  FRAGMENT: { enabled: true, size: '200-500', count: '5-10', delay: '10-30' },
  WARP: { enabled: false, pro: false },
  ECH: { enabled: true },
  XHTTP: { enabled: false, mode: 'packet-up' },
  GRPC: { enabled: false, serviceName: 'grpc' },
  SESSION_HOURS: 24,
  MAX_LOGIN_ATTEMPTS: 5,
  TOTP_ENABLED: false,
  TOTP_SECRET: ''
};

const TRUSTED_IPS = [
  { ip: '104.16.71.76', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 45 },
  { ip: '104.16.71.115', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 48 },
  { ip: '104.16.71.101', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 42 },
  { ip: '104.16.71.85', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 50 },
  { ip: '104.16.71.27', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 38 },
  { ip: '104.16.71.110', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 55 },
  { ip: '104.16.71.182', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 41 },
  { ip: '104.16.71.229', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 47 },
  { ip: '104.16.71.193', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 44 },
  { ip: '104.16.71.135', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 52 },
  { ip: '104.16.71.202', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 39 },
  { ip: '104.16.71.219', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 46 },
  { ip: '104.16.71.17', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 43 },
  { ip: '104.16.71.80', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 51 },
  { ip: '104.16.71.216', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 37 },
  { ip: '104.16.71.176', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 49 },
  { ip: '104.16.71.195', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 40 },
  { ip: '104.16.71.141', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 54 },
  { ip: '104.16.71.71', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 36 },
  { ip: '104.16.71.246', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 48 },
  { ip: '104.16.71.232', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 42 },
  { ip: '104.16.71.126', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 45 },
  { ip: '104.16.71.218', ports: ['443','8443','2083','2087','2096','2053'], operator: 'mci', latency: 50 },
  { ip: '162.159.160.11', ports: ['2083','2096','8443','2053','443','2087'], operator: 'all', latency: 55 },
  { ip: '23.227.60.9', ports: ['2096','2087','8443','2083'], operator: 'all', latency: 60 },
  { ip: '138.249.148.112', ports: ['2053','2087','2083','443'], operator: 'all', latency: 58 },
  { ip: '8.39.125.114', ports: ['2053','2083'], operator: 'all', latency: 62 },
  { ip: '45.192.222.103', ports: ['2083','2096','8443','2087','2053'], operator: 'all', latency: 57 },
  { ip: '172.64.68.108', ports: ['2053','2083'], operator: 'all', latency: 53 },
  { ip: '1.1.1.81', ports: ['2087','2053','2096'], operator: 'all', latency: 40 },
  { ip: '172.64.153.117', ports: ['8443','2083','443','2087','2053'], operator: 'all', latency: 52 },
  { ip: '94.156.10.39', ports: ['2096','2087','443','2083'], operator: 'all', latency: 68 },
  { ip: '5.252.81.226', ports: ['2087','2096','2083','2053'], operator: 'all', latency: 63 },
  { ip: '23.227.39.68', ports: ['2053','8443'], operator: 'all', latency: 59 },
  { ip: '104.26.14.160', ports: ['2083','2096'], operator: 'all', latency: 56 },
  { ip: '66.93.178.242', ports: ['2083','2053','2096'], operator: 'all', latency: 61 },
  { ip: '89.106.90.15', ports: ['2096','2053'], operator: 'all', latency: 67 },
  { ip: '172.64.84.159', ports: ['2087','8443','2083','2053'], operator: 'all', latency: 54 },
  { ip: '37.153.170.102', ports: ['2053','2083'], operator: 'all', latency: 64 },
  { ip: '162.159.93.244', ports: ['2087','2083','2053','443','2096','8443'], operator: 'all', latency: 51 },
  { ip: '45.45.255.43', ports: ['2083','2096','2053','8443','2087'], operator: 'all', latency: 58 },
  { ip: '89.249.200.202', ports: ['2083','2087','8443','2096','2053'], operator: 'all', latency: 62 },
  { ip: '103.51.12.167', ports: ['2096','2053','443'], operator: 'all', latency: 66 },
  { ip: '156.243.83.52', ports: ['2096','443','2087','2053','2083','8443'], operator: 'all', latency: 55 },
  { ip: '162.159.254.7', ports: ['2087','2053','2096','443','2083','8443'], operator: 'all', latency: 53 },
  { ip: '5.10.215.142', ports: ['2087','2096','8443'], operator: 'all', latency: 69 },
  { ip: '156.224.73.107', ports: ['2053','2087','443','2083','2096','8443'], operator: 'all', latency: 57 },
  { ip: '104.234.133.163', ports: ['2053','2096','443','8443','2083','2087'], operator: 'all', latency: 60 },
  { ip: '45.128.76.37', ports: ['2087','2053','2096','8443','2083','443'], operator: 'all', latency: 64 },
  { ip: '61.245.108.53', ports: ['2083','2053','2096','443','2087','8443'], operator: 'all', latency: 61 },
  { ip: '138.226.213.231', ports: ['8443','2087','2096','443','2083'], operator: 'all', latency: 56 },
  { ip: '143.14.224.68', ports: ['443','2087','2083','2096','8443','2053'], operator: 'all', latency: 63 },
  { ip: '172.64.188.4', ports: ['2096','2053','2083','443','2087','8443'], operator: 'all', latency: 52 },
  { ip: '159.242.242.87', ports: ['2087','2053','443'], operator: 'all', latency: 65 },
  { ip: '162.251.82.37', ports: ['8443','2087','2083','443'], operator: 'all', latency: 58 },
  { ip: '158.94.212.25', ports: ['2083','443','2096','2053','2087','8443'], operator: 'all', latency: 67 },
  { ip: '162.159.206.246', ports: ['2096','2053','2087'], operator: 'all', latency: 54 },
  { ip: '104.24.79.12', ports: ['2096','2087','8443','443','2083'], operator: 'all', latency: 60 },
  { ip: '62.146.255.112', ports: ['2083','2087','443','2096'], operator: 'all', latency: 66 },
  { ip: '172.67.144.187', ports: ['2087','2096','2053','2083'], operator: 'all', latency: 55 },
  { ip: '172.64.48.20', ports: ['2096','443'], operator: 'all', latency: 53 },
  { ip: '104.17.156.175', ports: ['8443'], operator: 'all', latency: 62 },
  { ip: '104.17.21.148', ports: ['2053'], operator: 'all', latency: 57 },
  { ip: '104.17.158.203', ports: ['2053'], operator: 'all', latency: 59 },
  { ip: '104.17.59.172', ports: ['2087'], operator: 'all', latency: 61 },
  { ip: '104.19.41.143', ports: ['8443'], operator: 'all', latency: 64 },
  { ip: '104.16.250.15', ports: ['2053'], operator: 'all', latency: 56 },
  { ip: '173.245.58.100', ports: ['2053'], operator: 'all', latency: 68 },
  { ip: '104.17.166.174', ports: ['2053'], operator: 'all', latency: 58 },
  { ip: '104.17.218.118', ports: ['2096'], operator: 'all', latency: 63 },
  { ip: '104.19.37.112', ports: ['2083'], operator: 'all', latency: 60 },
  { ip: '198.41.208.110', ports: ['443'], operator: 'all', latency: 55 },
  { ip: '104.26.7.44', ports: ['2087'], operator: 'all', latency: 62 },
  { ip: '162.159.38.206', ports: ['2053'], operator: 'all', latency: 54 },
  { ip: '173.245.59.53', ports: ['8443'], operator: 'all', latency: 67 },
  { ip: '172.67.79.39', ports: ['2083'], operator: 'all', latency: 56 },
  { ip: '8.35.211.4', ports: ['443','8443','2053'], operator: 'all', latency: 70 },
  { ip: '188.114.97.6', ports: ['443','8443','2053'], operator: 'all', latency: 65 },
  { ip: '104.21.33.108', ports: ['443'], operator: 'all', latency: 55 },
  { ip: '104.24.239.89', ports: ['443'], operator: 'all', latency: 58 },
  { ip: '104.21.194.180', ports: ['443'], operator: 'all', latency: 56 },
  { ip: '104.27.73.244', ports: ['443'], operator: 'all', latency: 60 },
  { ip: '162.159.19.3', ports: ['443'], operator: 'all', latency: 53 },
  { ip: '172.67.127.148', ports: ['443'], operator: 'all', latency: 54 },
  { ip: '104.18.162.75', ports: ['443'], operator: 'all', latency: 59 },
  { ip: '104.16.73.213', ports: ['443','8443','2053'], operator: 'all', latency: 62 },
  { ip: '69.84.182.49', ports: ['443','8443','2053'], operator: 'all', latency: 68 },
  { ip: '104.17.108.68', ports: ['443','8443','2053'], operator: 'all', latency: 61 },
  { ip: '172.64.229.36', ports: ['443','8443','2053'], operator: 'all', latency: 55 },
  { ip: '104.16.72.162', ports: ['443','8443','2053'], operator: 'all', latency: 63 },
  { ip: '45.130.125.76', ports: ['443','8443','2053'], operator: 'all', latency: 70 },
  { ip: '89.116.46.8', ports: ['443','8443','2053'], operator: 'all', latency: 66 },
  { ip: '141.193.213.21', ports: ['443','8443','2053'], operator: 'all', latency: 64 },
  { ip: '208.103.161.170', ports: ['443','8443','2053'], operator: 'all', latency: 69 }
];

class Helpers {
  static generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  
  static isValidUUID(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
  }
  
  static parseDataLimit(input) {
    if (!input || input === '0' || input.toLowerCase() === 'unlimited') return 0;
    const v = input.toString().toLowerCase().trim();
    const m = v.match(/^(\d+(?:\.\d+)?)\s*(kb|mb|gb|tb|pt)?$/);
    if (!m) return 0;
    const n = parseFloat(m[1]), u = (m[2] || 'mb').toLowerCase();
    const x = { kb: 1/1024, mb: 1, gb: 1024, tb: 1048576, pt: 1073741824 };
    return n * (x[u] || 1);
  }
  
  static parseTimeLimit(input) {
    if (!input || input === '0' || input.toLowerCase() === 'unlimited') return 0;
    const v = input.toString().toLowerCase().trim();
    const m = v.match(/^(\d+)\s*(d|m|y|day|month|year|days|months|years)?$/);
    if (!m) return 0;
    const n = parseInt(m[1]), u = (m[2] || 'd').toLowerCase();
    const x = { d: 1, day: 1, days: 1, m: 30, month: 30, months: 30, y: 365, year: 365, years: 365 };
    return n * (x[u] || 1);
  }
  
  static formatBytes(mb) {
    if (mb === 0) return 'نامحدود';
    if (mb >= 1048576) return (mb / 1048576).toFixed(2) + ' TB';
    if (mb >= 1024) return (mb / 1024).toFixed(2) + ' GB';
    return mb.toFixed(0) + ' MB';
  }
  
  static formatDays(days) {
    if (days === 0) return 'نامحدود';
    if (days >= 365) return (days / 365).toFixed(1) + ' سال';
    if (days >= 30) return (days / 30).toFixed(1) + ' ماه';
    return days + ' روز';
  }
  
  static getBestIPs(operator = 'all', count = 10, sortByLatency = false) {
    let f = TRUSTED_IPS.filter(i => operator === 'all' || i.operator === operator || i.operator === 'all');
    if (sortByLatency) f.sort((a, b) => (a.latency || 99) - (b.latency || 99));
    else f.sort(() => Math.random() - 0.5);
    return f.slice(0, count);
  }
  
  static generateConfig(uuid, host, port, type = 'vless', settings = {}) {
    const { sni = CONFIG.SNI, fp = CONFIG.FINGERPRINT, fragment = CONFIG.FRAGMENT, warp = CONFIG.WARP, ech = CONFIG.ECH, xhttp = CONFIG.XHTTP, grpc = CONFIG.GRPC, name = 'Taakaa-Xi' } = settings;
    const enc = encodeURIComponent(name);
    
    if (type === 'vless') {
      let c = `vless://${uuid}@${host}:${port}?encryption=none&security=tls&sni=${sni}&fp=${fp}`;
      if (xhttp?.enabled) c += `&type=xhttp&mode=${xhttp.mode || 'packet-up'}&host=${host}&path=%2F`;
      else if (grpc?.enabled) c += `&type=grpc&serviceName=${grpc.serviceName || 'grpc'}&host=${host}`;
      else c += `&type=ws&host=${host}&path=%2F`;
      if (fragment?.enabled) c += `&fragment=size:${fragment.size},count:${fragment.count},delay:${fragment.delay}`;
      if (warp?.enabled) c += `&warp=${warp.pro ? 'pro' : 'on'}`;
      if (ech?.enabled) c += `&ech=true`;
      c += `#${enc}`;
      return c;
    } else if (type === 'trojan') {
      return `trojan://${uuid}@${host}:${port}?security=tls&sni=${sni}&fp=${fp}&type=ws&host=${host}&path=%2F#${enc}`;
    } else if (type === 'ss') {
      return `ss://${btoa('aes-256-gcm:' + uuid.substring(0, 16))}@${btoa(host + ':' + port)}#${enc}`;
    }
    return '';
  }
    }
// ============================================
// 🔥 Taakaa-Xi Ultimate v5.0 - بخش ۲/۵
// 🌐 @TaaKaaOrg
// ⚡ مدیریت کاربران + نشست + اسکنر
// ============================================

class UserManager {
  constructor(env) { this.env = env; }
  
  async getAll() {
    if (!this.env.KV) return [];
    const d = await this.env.KV.get('users');
    return d ? JSON.parse(d) : [];
  }
  
  async saveAll(users) {
    if (!this.env.KV) return;
    await this.env.KV.put('users', JSON.stringify(users));
  }
  
  async add(userData) {
    const users = await this.getAll();
    const newUser = {
      id: Helpers.generateUUID(),
      uuid: userData.uuid || Helpers.generateUUID(),
      name: userData.name || 'User',
      ip: userData.ip || '',
      dataLimit: Helpers.parseDataLimit(userData.dataLimit || '0'),
      dailyLimit: Helpers.parseDataLimit(userData.dailyLimit || '0'),
      timeLimit: Helpers.parseTimeLimit(userData.timeLimit || '0'),
      usedData: 0,
      todayUsed: 0,
      lastResetDate: new Date().toDateString(),
      created: Date.now(),
      expires: userData.timeLimit ? Date.now() + (Helpers.parseTimeLimit(userData.timeLimit) * 86400000) : 0,
      active: true,
      operator: userData.operator || 'all'
    };
    users.push(newUser);
    await this.saveAll(users);
    return newUser;
  }
  
  async update(userId, updates) {
    const users = await this.getAll();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return null;
    if (updates.dataLimit !== undefined) updates.dataLimit = Helpers.parseDataLimit(updates.dataLimit);
    if (updates.dailyLimit !== undefined) updates.dailyLimit = Helpers.parseDataLimit(updates.dailyLimit);
    if (updates.timeLimit !== undefined) {
      updates.timeLimit = Helpers.parseTimeLimit(updates.timeLimit);
      updates.expires = updates.timeLimit ? Date.now() + (updates.timeLimit * 86400000) : 0;
    }
    users[idx] = { ...users[idx], ...updates };
    await this.saveAll(users);
    return users[idx];
  }
  
  async delete(userId) {
    let users = await this.getAll();
    users = users.filter(u => u.id !== userId);
    await this.saveAll(users);
    return true;
  }
  
  async getByUUID(uuid) {
    const users = await this.getAll();
    return users.find(u => u.uuid === uuid && u.active);
  }
  
  async recordUsage(uuid, bytes) {
    const users = await this.getAll();
    const user = users.find(u => u.uuid === uuid);
    if (!user) return;
    const today = new Date().toDateString();
    if (user.lastResetDate !== today) { user.todayUsed = 0; user.lastResetDate = today; }
    user.usedData += bytes / (1024 * 1024);
    user.todayUsed += bytes / (1024 * 1024);
    await this.saveAll(users);
  }
  
  async checkLimits(uuid) {
    const users = await this.getAll();
    const user = users.find(u => u.uuid === uuid);
    if (!user || !user.active) return false;
    if (user.expires && Date.now() > user.expires) return false;
    if (user.dataLimit && user.usedData >= user.dataLimit) return false;
    if (user.dailyLimit && user.todayUsed >= user.dailyLimit) return false;
    return true;
  }
  
  async resetUsage(userId) {
    const users = await this.getAll();
    const user = users.find(u => u.id === userId);
    if (!user) return null;
    user.usedData = 0;
    user.todayUsed = 0;
    user.lastResetDate = new Date().toDateString();
    await this.saveAll(users);
    return user;
  }
  
  async getStats() {
    const users = await this.getAll();
    const today = new Date().toDateString();
    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.active).length,
      totalUsage: users.reduce((s, u) => s + u.usedData, 0),
      todayUsage: users.filter(u => u.lastResetDate === today).reduce((s, u) => s + u.todayUsed, 0)
    };
  }
  
  async backupData() {
    return {
      users: await this.getAll(),
      config: CONFIG,
      backupDate: new Date().toISOString(),
      version: '5.0'
    };
  }
}

class SessionManager {
  constructor(env) { this.env = env; }
  
  async create() {
    if (!this.env.KV) return null;
    const sid = Helpers.generateUUID();
    await this.env.KV.put(`session:${sid}`, JSON.stringify({
      created: Date.now(),
      expires: Date.now() + (CONFIG.SESSION_HOURS * 3600000)
    }), { expirationTtl: CONFIG.SESSION_HOURS * 3600 });
    return sid;
  }
  
  async validate(sid) {
    if (!this.env.KV) return false;
    const s = await this.env.KV.get(`session:${sid}`);
    if (!s) return false;
    return JSON.parse(s).expires > Date.now();
  }
  
  async destroy(sid) {
    if (!this.env.KV) return;
    await this.env.KV.delete(`session:${sid}`);
  }
}

class IPScanner {
  static async scanIP(ip, port) {
    const start = Date.now();
    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 3000);
      const res = await fetch(`https://${ip}:${port}/`, {
        method: 'HEAD',
        signal: ctrl.signal,
        cf: { resolveOverride: ip }
      });
      clearTimeout(timeout);
      return { ip, port, alive: res.ok, latency: Date.now() - start };
    } catch (e) {
      return { ip, port, alive: false, latency: 999 };
    }
  }
  
  static async scanBatch(ips, ports, concurrency = 5) {
    const results = [];
    const queue = [];
    for (const ip of ips) for (const port of ports) queue.push({ ip, port });
    
    for (let i = 0; i < queue.length; i += concurrency) {
      const batch = queue.slice(i, i + concurrency);
      const batchResults = await Promise.all(batch.map(({ ip, port }) => IPScanner.scanIP(ip, port)));
      results.push(...batchResults.filter(r => r.alive));
    }
    return results.sort((a, b) => a.latency - b.latency);
  }
  
  static async getRecommended(operator = 'all', limit = 20) {
    const filtered = TRUSTED_IPS.filter(i => operator === 'all' || i.operator === operator || i.operator === 'all');
    return filtered.sort((a, b) => (a.latency || 99) - (b.latency || 99)).slice(0, limit);
  }
}

async function handleProxy(request, env, ctx) {
  const url = new URL(request.url);
  const uuid = url.pathname.replace('/', '').split('/')[0];
  const um = new UserManager(env);
  const isValid = uuid === CONFIG.UUID || await um.getByUUID(uuid);
  
  if (!isValid) return new Response('Unauthorized', { status: 401 });
  
  if (uuid !== CONFIG.UUID) {
    const ok = await um.checkLimits(uuid);
    if (!ok) return new Response('Limit Exceeded', { status: 403 });
  }
  
  const upgrade = request.headers.get('Upgrade');
  if (upgrade && upgrade.toLowerCase() === 'websocket') {
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    ctx.acceptWebSocket(server);
    
    server.addEventListener('message', async (event) => {
      try {
        if (uuid !== CONFIG.UUID) await um.recordUsage(uuid, event.data.length || 0);
      } catch (e) {}
    });
    
    return new Response(null, { status: 101, webSocket: client });
  }
  
  try {
    const socket = connect({ hostname: CONFIG.SNI, port: 443 });
    const reader = request.body?.getReader();
    
    if (reader) {
      const writer = socket.writable.getWriter();
      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) { await writer.close(); break; }
          await writer.write(value);
          if (uuid !== CONFIG.UUID) await um.recordUsage(uuid, value.length || 0);
        }
      };
      ctx.waitUntil(pump());
    }
    
    return new Response(socket.readable, {
      headers: { 'Content-Type': 'application/octet-stream', 'X-Proxy': 'Taakaa-Xi' }
    });
  } catch (e) {
    return new Response('Connection Failed: ' + e.message, { status: 502 });
  }
      }
// ============================================
// 🔥 Taakaa-Xi Ultimate v5.0 - بخش ۳/۵
// 🌐 @TaaKaaOrg
// ⚡ صفحات HTML
// ============================================

const HTML_SETUP = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Taakaa-Xi | راه‌اندازی</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Vazir','Tahoma',sans-serif;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem}.container{max-width:700px;width:100%;padding:3rem;background:rgba(255,255,255,0.05);border-radius:24px;backdrop-filter:blur(10px);border:2px solid rgba(255,107,0,0.3);box-shadow:0 20px 60px rgba(0,0,0,0.5)}.logo{font-size:3rem;font-weight:900;text-align:center;margin-bottom:.5rem;background:linear-gradient(135deg,#ff6b00,#ff8533);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.subtitle{text-align:center;color:#ff6b00;margin-bottom:2rem;font-size:1.1rem}.setup-card{background:rgba(255,255,255,0.03);border-radius:16px;padding:1.5rem;margin-bottom:1.5rem;border:1px solid rgba(255,255,255,0.1);transition:all .3s}.setup-card.required{border-color:rgba(255,107,0,0.5);background:rgba(255,107,0,0.05)}.setup-card.success{border-color:rgba(0,255,0,0.5);background:rgba(0,255,0,0.05)}.setup-card.error{border-color:rgba(255,0,0,0.5);background:rgba(255,0,0,0.05)}.card-header{display:flex;align-items:center;gap:.75rem;margin-bottom:1rem}.status-icon{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem}.status-icon.checking{background:rgba(255,193,7,0.2);color:#ffc107}.status-icon.success{background:rgba(0,255,0,0.2);color:#0f0}.status-icon.error{background:rgba(255,0,0,0.2);color:#f00}.card-title{font-size:1.1rem;font-weight:700}.card-badge{display:inline-block;padding:.25rem .75rem;border-radius:50px;font-size:.75rem;font-weight:600}.badge-required{background:rgba(255,0,0,0.2);color:#f44}.badge-optional{background:rgba(255,193,7,0.2);color:#ffc107}.card-desc{color:#aaa;line-height:1.8;margin-bottom:1rem;font-size:.95rem}.card-desc code{background:rgba(255,107,0,0.2);padding:.2rem .5rem;border-radius:4px;color:#ff8533;font-family:monospace}.card-desc ol{padding-right:1.5rem;margin:.5rem 0}.card-desc li{margin:.25rem 0}input{width:100%;padding:.75rem 1rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;font-size:1rem;margin-top:.5rem}input:focus{outline:none;border-color:#ff6b00}button{width:100%;padding:.75rem;background:linear-gradient(135deg,#ff6b00,#ff8533);border:none;color:#fff;border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer;margin-top:1rem;transition:all .3s}button:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(255,107,0,0.3)}.check-btn{width:auto;padding:.5rem 1.5rem;margin-top:.5rem;font-size:.9rem}.message{margin-top:.75rem;padding:.75rem;border-radius:8px;font-size:.9rem;display:none}.message.show{display:block}.message.success{background:rgba(0,255,0,0.1);color:#0f0}.message.error{background:rgba(255,0,0,0.1);color:#f00}.footer{text-align:center;margin-top:2rem;color:#888;font-size:.85rem}.footer a{color:#ff6b00;text-decoration:none}.spinner{width:20px;height:20px;border:3px solid rgba(255,255,255,0.1);border-top-color:#ff6b00;border-radius:50%;animation:spin .8s linear infinite;display:inline-block}@keyframes spin{to{transform:rotate(360deg)}}.all-ready{text-align:center;padding:2rem;display:none}.all-ready.show{display:block}.all-ready .icon{font-size:4rem;margin-bottom:1rem}.all-ready h2{color:#0f0;margin-bottom:1rem}</style></head><body><div class="container"><div class="logo">⚡ Taakaa-Xi</div><div class="subtitle">راه‌اندازی اولیه - Setup Wizard</div><div class="setup-card required" id="kvCard"><div class="card-header"><span class="status-icon checking" id="kvIcon">⟳</span><span class="card-title">KV Storage</span><span class="card-badge badge-required">الزامی*</span></div><div class="card-desc"><p><strong>KV برای ذخیره‌سازی کاربران و تنظیمات الزامی است.</strong></p><p style="margin-top:.5rem">مراحل تنظیم:</p><ol><li>به تب <code>Workers & Pages</code> در داشبورد Cloudflare بروید</li><li>پروژه خود را انتخاب کنید</li><li>به تب <code>Settings</code> سپس <code>Variables</code> بروید</li><li>در بخش <code>KV Namespace Bindings</code> یک Namespace جدید بسازید</li><li>نام متغیر را <code>KV</code> قرار دهید (دقیقاً KV)</li><li>Namespace را انتخاب و ذخیره کنید</li></ol></div><button class="check-btn" onclick="checkKV()">🔄 بررسی مجدد KV</button><div class="message" id="kvMsg"></div></div><div class="setup-card" id="d1Card"><div class="card-header"><span class="status-icon checking" id="d1Icon">⟳</span><span class="card-title">D1 Database</span><span class="card-badge badge-optional">اختیاری</span></div><div class="card-desc"><p><strong>D1 برای ذخیره‌سازی پیشرفته و جلوگیری از پر شدن KV است (اختیاری).</strong></p><p style="margin-top:.5rem">مراحل تنظیم:</p><ol><li>به تب <code>Workers & Pages</code> بروید</li><li>پروژه خود را انتخاب کنید</li><li>به تب <code>Settings</code> سپس <code>Variables</code> بروید</li><li>در بخش <code>D1 Database Bindings</code> یک Database جدید بسازید</li><li>نام متغیر را <code>DB</code> قرار دهید</li><li>Database را انتخاب و ذخیره کنید</li></ol><p style="color:#ffc107;margin-top:.5rem">⚠️ بدون D1 هم پنل کار می‌کند، فقط با KV</p></div><button class="check-btn" onclick="checkD1()">🔄 بررسی مجدد D1</button><div class="message" id="d1Msg"></div></div><div class="setup-card required" id="passCard"><div class="card-header"><span class="status-icon checking" id="passIcon">⟳</span><span class="card-title">Admin Password</span><span class="card-badge badge-required">الزامی*</span></div><div class="card-desc"><p><strong>برای ورود به پنل مدیریت، رمز عبور تنظیم کنید.</strong></p><p>می‌توانید از یکی از دو روش استفاده کنید:</p><p style="margin-top:.5rem">روش ۱: متغیر محیطی <code>ADMIN_PASS</code> را در تنظیمات Worker ست کنید</p><p>روش ۲: در فیلد زیر رمز را وارد کنید (اگر اینجا بنویسید، نیازی به متغیر نیست)</p></div><input type="password" id="adminPassInput" placeholder="رمز عبور ادمین را وارد کنید"><button onclick="saveAdminPass()">💾 ذخیره رمز عبور</button><div class="message" id="passMsg"></div></div><div class="all-ready" id="allReady"><div class="icon">🎉</div><h2>همه چیز آماده است!</h2><p style="color:#aaa;margin-bottom:1rem">پنل مدیریت و پروکسی فعال شد</p><button onclick="goToPanel()">🚀 ورود به پنل مدیریت</button></div><div class="footer"><p>🚀 توسعه داده شده توسط <strong>تیم تاکا</strong> | ۳ ماه توسعه</p><p>کانال تلگرام: <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p></div></div><script>let kvOk=false,passOk=false;async function checkKV(){let e=document.getElementById("kvIcon"),t=document.getElementById("kvMsg"),n=document.getElementById("kvCard");e.className="status-icon checking",e.innerHTML='<span class="spinner"></span>',t.className="message",t.innerHTML="در حال بررسی...",t.classList.add("show");try{let s=await(await fetch("/api/check-kv")).json();s.ok?(kvOk=!0,e.className="status-icon success",e.textContent="✓",n.className="setup-card success",t.className="message success show",t.textContent="✅ KV متصل شد!"):(kvOk=!1,e.className="status-icon error",e.textContent="✗",n.className="setup-card error",t.className="message error show",t.textContent="❌ KV متصل نیست")}catch(s){kvOk=!1,e.className="status-icon error",e.textContent="✗",t.className="message error show",t.textContent="❌ خطا"}checkAllReady()}async function checkD1(){let e=document.getElementById("d1Icon"),t=document.getElementById("d1Msg"),n=document.getElementById("d1Card");e.className="status-icon checking",e.innerHTML='<span class="spinner"></span>',t.className="message",t.innerHTML="در حال بررسی...",t.classList.add("show");try{let s=await(await fetch("/api/check-d1")).json();s.ok?(e.className="status-icon success",e.textContent="✓",n.className="setup-card success",t.className="message success show",t.textContent="✅ D1 متصل شد!"):(e.className="status-icon checking",e.textContent="⟳",t.className="message error show",t.textContent="⚠️ D1 متصل نیست (اختیاری)")}catch(s){e.className="status-icon checking",e.textContent="⟳",t.className="message error show",t.textContent="⚠️ D1 متصل نیست (اختیاری)"}}async function saveAdminPass(){let e=document.getElementById("adminPassInput").value,t=document.getElementById("passIcon"),n=document.getElementById("passMsg"),s=document.getElementById("passCard");if(!e||e.length<3){n.className="message error show",n.textContent="❌ رمز عبور باید حداقل ۳ کاراکتر باشد";return}try{let a=await(await fetch("/api/setup-pass",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e})})).json();a.ok?(passOk=!0,t.className="status-icon success",t.textContent="✓",s.className="setup-card success",n.className="message success show",n.textContent="✅ رمز عبور تنظیم شد!"):(passOk=!1,n.className="message error show",n.textContent="❌ خطا: "+(a.error||"مشکل در ذخیره"))}catch(a){passOk=!1,n.className="message error show",n.textContent="❌ خطا در ذخیره"}checkAllReady()}async function checkPassFromEnv(){let e=document.getElementById("passIcon"),t=document.getElementById("passCard");try{let n=await(await fetch("/api/check-pass")).json();n.ok&&(passOk=!0,e.className="status-icon success",e.textContent="✓",t.className="setup-card success",document.getElementById("adminPassInput").placeholder="•••••••• (از متغیر محیطی)")}catch(n){}checkAllReady()}function checkAllReady(){let e=document.getElementById("allReady");kvOk&&passOk?e.classList.add("show"):e.classList.remove("show")}function goToPanel(){window.location.href="/admin"}checkKV(),checkD1(),checkPassFromEnv()</script></body></html>`;

const HTML_WELCOME = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Taakaa-Xi | خانه</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Vazir','Tahoma',sans-serif;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center}.container{max-width:800px;margin:2rem;padding:3rem;background:rgba(255,255,255,0.05);border-radius:24px;backdrop-filter:blur(10px);border:1px solid rgba(255,107,0,0.3);box-shadow:0 20px 60px rgba(0,0,0,0.3)}.logo{font-size:3.5rem;font-weight:900;text-align:center;margin-bottom:1rem;background:linear-gradient(135deg,#ff6b00,#ff8533);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.subtitle{text-align:center;color:#ff6b00;margin-bottom:2rem;font-size:1.2rem}.status{display:flex;justify-content:center;gap:1rem;margin:2rem 0;flex-wrap:wrap}.status-badge{padding:.5rem 1.5rem;border-radius:50px;background:rgba(255,107,0,0.1);border:1px solid rgba(255,107,0,0.3);font-size:.9rem}.status-badge.active{background:rgba(0,255,0,0.1);border-color:rgba(0,255,0,0.3);color:#0f0}.links{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin:2rem 0}.link-card{padding:1.5rem;background:rgba(255,255,255,0.05);border-radius:16px;text-align:center;text-decoration:none;color:#fff;transition:all .3s;border:1px solid rgba(255,255,255,0.1)}.link-card:hover{transform:translateY(-5px);border-color:#ff6b00;box-shadow:0 10px 30px rgba(255,107,0,0.2)}.link-card .icon{font-size:2rem;margin-bottom:.5rem}.footer{text-align:center;margin-top:3rem;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.1);color:#888;font-size:.9rem}.footer a{color:#ff6b00;text-decoration:none}.pulse{animation:pulse 2s infinite}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}</style></head><body><div class="container"><div class="logo">⚡ Taakaa-Xi</div><div class="subtitle">پروکسی پیشرفته با پنل مدیریت</div><div class="status"><span class="status-badge active pulse">● فعال</span><span class="status-badge">Port: 443-8443-2083-2087-2096-2053</span><span class="status-badge">Fragment ✓</span><span class="status-badge">WARP ✓</span><span class="status-badge">ECH ✓</span></div><div class="links"><a href="/admin" class="link-card"><div class="icon">🎛️</div><div>پنل مدیریت</div></a><a href="/scanner" class="link-card"><div class="icon">📡</div><div>اسکنر آی‌پی</div></a><a href="/sub/" class="link-card"><div class="icon">📦</div><div>سابسکریپشن</div></a><a href="/select-location" class="link-card"><div class="icon">🌍</div><div>انتخاب لوکیشن</div></a><a href="/owners" class="link-card"><div class="icon">👥</div><div>پشتیبان‌ها</div></a><a href="/fragment-info" class="link-card"><div class="icon">🛡️</div><div>Fragment Info</div></a></div><div class="footer"><p>🚀 توسعه داده شده توسط <strong>تیم تاکا</strong> | ۳ ماه توسعه</p><p>کانال تلگرام: <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p></div></div></body></html>`;

const HTML_ADMIN = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Taakaa-Xi | پنل مدیریت</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Vazir','Tahoma',sans-serif;background:#1a1a2e;color:#fff;min-height:100vh}.header{background:linear-gradient(135deg,#ff6b00,#ff8533);padding:1.5rem 2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}.header h1{font-size:1.8rem}.header button{padding:.5rem 1.5rem;background:rgba(0,0,0,0.3);border:none;color:#fff;border-radius:8px;cursor:pointer}.container{max-width:1400px;margin:0 auto;padding:2rem}.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem}.stat-card{padding:1.5rem;background:rgba(255,255,255,0.05);border-radius:16px;text-align:center;border:1px solid rgba(255,255,255,0.1)}.stat-card .value{font-size:2rem;font-weight:700;color:#ff6b00}.stat-card .label{color:#888;margin-top:.5rem}.section{background:rgba(255,255,255,0.05);border-radius:16px;padding:1.5rem;margin-bottom:1.5rem;border:1px solid rgba(255,255,255,0.1)}.section h2{margin-bottom:1rem;padding-bottom:.5rem;border-bottom:1px solid rgba(255,255,255,0.1)}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}input,select{width:100%;padding:.75rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff}button{padding:.75rem 2rem;background:#ff6b00;border:none;color:#fff;border-radius:8px;cursor:pointer;font-weight:600}button:hover{background:#ff8533}table{width:100%;border-collapse:collapse;margin-top:1rem}th,td{padding:.75rem;text-align:right;border-bottom:1px solid rgba(255,255,255,0.1)}th{color:#ff6b00}.actions{display:flex;gap:.5rem;flex-wrap:wrap}.btn-danger{background:#dc3545}.btn-success{background:#28a745}.btn-warning{background:#ffc107;color:#000}.btn-info{background:#17a2b8}.spinner{width:40px;height:40px;border:4px solid rgba(255,255,255,0.1);border-top-color:#ff6b00;border-radius:50%;animation:spin 1s linear infinite;margin:2rem auto}@keyframes spin{to{transform:rotate(360deg)}}.modal{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:1000;align-items:center;justify-content:center}.modal.active{display:flex}.modal-content{background:#1a1a2e;padding:2rem;border-radius:16px;max-width:500px;width:90%;border:1px solid rgba(255,107,0,0.3)}</style></head><body><div class="header"><h1>🎛️ پنل مدیریت Taakaa-Xi</h1><div><button onclick="showBackup()">💾 بکاپ</button><button onclick="logout()">🚪 خروج</button></div></div><div class="container"><div id="loginSection" class="section"><h2>🔐 ورود به پنل</h2><div class="form-grid"><input type="password" id="adminPass" placeholder="رمز عبور"><button onclick="login()">ورود</button></div></div><div id="adminSection" style="display:none"><div class="stats" id="statsContainer"></div><div class="section"><h2>➕ افزودن کاربر</h2><div class="form-grid"><input type="text" id="userName" placeholder="نام کاربر"><input type="text" id="userUUID" placeholder="UUID (اختیاری)"><input type="text" id="userIP" placeholder="IP اختصاصی"><input type="text" id="userDataLimit" placeholder="حجم کل (مثال: 5GB)"><input type="text" id="userDailyLimit" placeholder="حجم روزانه (مثال: 500MB)"><input type="text" id="userTimeLimit" placeholder="زمان (مثال: 1M)"><select id="userOperator"><option value="all">همه اپراتورها</option><option value="mci">همراه اول</option><option value="mtn">ایرانسل</option><option value="rtl">رایتل</option></select><button onclick="addUser()">افزودن</button></div></div><div class="section"><h2>👥 لیست کاربران</h2><div id="usersTableContainer"><div class="spinner"></div></div></div><div class="section"><h2>⚙️ تنظیمات</h2><div class="form-grid"><input type="text" id="setUUID" placeholder="UUID سیستم"><input type="password" id="setPass" placeholder="رمز ادمین جدید"><input type="text" id="setSNI" placeholder="SNI"><select id="setFP"><option value="chrome">Chrome</option><option value="firefox">Firefox</option><option value="safari">Safari</option><option value="random">Random</option></select><button onclick="saveSettings()">💾 ذخیره</button></div></div></div></div><div id="editModal" class="modal"><div class="modal-content"><h2>✏️ ویرایش کاربر</h2><div class="form-grid" style="margin-top:1rem"><input type="text" id="editName" placeholder="نام"><input type="text" id="editDataLimit" placeholder="حجم کل"><input type="text" id="editDailyLimit" placeholder="حجم روزانه"><input type="text" id="editTimeLimit" placeholder="زمان"><button onclick="saveEdit()" class="btn-success">💾 ذخیره</button><button onclick="closeModal()" class="btn-danger">❌ لغو</button></div></div></div><div id="backupModal" class="modal"><div class="modal-content"><h2>💾 بکاپ اطلاعات</h2><pre id="backupData" style="background:rgba(0,0,0,0.3);padding:1rem;border-radius:8px;max-height:400px;overflow:auto;margin:1rem 0;font-size:.8rem;direction:ltr"></pre><button onclick="copyBackup()" class="btn-success">📋 کپی</button><button onclick="closeBackupModal()" class="btn-danger">❌ بستن</button></div></div><script>let ce=null;function login(){fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:document.getElementById("adminPass").value})}).then(e=>e.json()).then(e=>{e.success?(document.getElementById("loginSection").style.display="none",document.getElementById("adminSection").style.display="block",loadDashboard()):alert("رمز اشتباه!")})}function logout(){fetch("/api/logout",{method:"POST"}).then(()=>{document.getElementById("loginSection").style.display="block",document.getElementById("adminSection").style.display="none"})}function loadDashboard(){fetch("/api/stats").then(e=>e.json()).then(e=>{document.getElementById("statsContainer").innerHTML='<div class="stat-card"><div class="value">'+e.totalUsers+'</div><div class="label">کل کاربران</div></div><div class="stat-card"><div class="value">'+e.activeUsers+'</div><div class="label">فعال</div></div><div class="stat-card"><div class="value">'+(e.totalUsage/1024).toFixed(2)+' GB</div><div class="label">مصرف کل</div></div><div class="stat-card"><div class="value">'+((e.todayUsage||0)/1024).toFixed(2)+' GB</div><div class="label">مصرف امروز</div></div>'}),loadUsers()}function loadUsers(){fetch("/api/users").then(e=>e.json()).then(e=>{let t="<table><thead><tr><th>نام</th><th>UUID</th><th>IP</th><th>حجم</th><th>مصرف</th><th>باقی‌مانده</th><th>زمان</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody>";e.forEach(a=>{let l=a.usedData||0,n=a.dataLimit||0,o=n>0?n-l:0,s=n>0?(l/n*100).toFixed(1):0;t+='<tr><td>'+a.name+'</td><td><small>'+a.uuid.substring(0,8)+'...</small></td><td>'+(a.ip||"-")+"</td><td>"+(n>0?(n/1024).toFixed(1)+"GB":"∞")+"</td><td>"+l.toFixed(0)+"MB ("+s+"%)</td><td>"+(n>0?o>0?(o/1024).toFixed(1)+"GB":"تمام":"∞")+"</td><td>"+(a.timeLimit>0?a.timeLimit+" روز":"∞")+"</td><td>"+(a.active?"🟢":"🔴")+'</td><td class="actions"><button class="btn-warning" onclick="editUser(\''+a.id+"')\">✏️</button><button class=\"btn-danger\" onclick=\"deleteUser('"+a.id+"')\">🗑️</button><button class=\"btn-info\" onclick=\"resetUser('"+a.id+"')\">🔄</button><button onclick=\"toggleUser('"+a.id+"',"+!a.active+')">'+(a.active?"🔴":"🟢")+"</button><button onclick=\"showConfig('"+a.uuid+"')\">📋</button></td></tr>"});t+="</tbody></table>",document.getElementById("usersTableContainer").innerHTML=t})}function addUser(){fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:document.getElementById("userName").value,uuid:document.getElementById("userUUID").value,ip:document.getElementById("userIP").value,dataLimit:document.getElementById("userDataLimit").value,dailyLimit:document.getElementById("userDailyLimit").value,timeLimit:document.getElementById("userTimeLimit").value,operator:document.getElementById("userOperator").value})}).then(e=>e.json()).then(()=>{loadUsers(),["userName","userUUID","userIP","userDataLimit","userDailyLimit","userTimeLimit"].forEach(e=>document.getElementById(e).value="")})}function editUser(e){ce=e,fetch("/api/users").then(e=>e.json()).then(t=>{let a=t.find(t=>t.id===e);a&&(document.getElementById("editName").value=a.name,document.getElementById("editDataLimit").value=a.dataLimit>0?(a.dataLimit/1024).toFixed(0)+"GB":"",document.getElementById("editDailyLimit").value="",document.getElementById("editTimeLimit").value=a.timeLimit>0?a.timeLimit+"d":"",document.getElementById("editModal").classList.add("active"))})}function saveEdit(){fetch("/api/users/"+ce,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:document.getElementById("editName").value,dataLimit:document.getElementById("editDataLimit").value,dailyLimit:document.getElementById("editDailyLimit").value,timeLimit:document.getElementById("editTimeLimit").value})}).then(()=>{closeModal(),loadUsers()})}function closeModal(){document.getElementById("editModal").classList.remove("active"),ce=null}function deleteUser(e){confirm("حذف کاربر؟")&&fetch("/api/users/"+e,{method:"DELETE"}).then(()=>loadUsers())}function resetUser(e){confirm("ریست مصرف کاربر؟")&&fetch("/api/users/"+e+"/reset",{method:"POST"}).then(()=>loadUsers())}function toggleUser(e,t){fetch("/api/users/"+e,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({active:t})}).then(()=>loadUsers())}function showConfig(e){let t=prompt("آدرس سرور:","104.16.71.76"),a=prompt("پورت:","443");t&&a&&fetch("/api/generate-config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uuid:e,host:t,port:a,type:"vless"})}).then(e=>e.json()).then(e=>{navigator.clipboard.writeText(e.config),alert("کانفیگ کپی شد! ✅")})}function saveSettings(){let e={};document.getElementById("setUUID").value&&(e.UUID=document.getElementById("setUUID").value),document.getElementById("setPass").value&&(e.ADMIN_PASS=document.getElementById("setPass").value),document.getElementById("setSNI").value&&(e.SNI=document.getElementById("setSNI").value),document.getElementById("setFP").value&&(e.FINGERPRINT=document.getElementById("setFP").value),fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(e=>e.json()).then(e=>{e.success?alert("تنظیمات ذخیره شد! ✅"):alert("خطا!")})}function showBackup(){fetch("/api/backup").then(e=>e.json()).then(e=>{document.getElementById("backupData").textContent=JSON.stringify(e,null,2),document.getElementById("backupModal").classList.add("active")})}function copyBackup(){navigator.clipboard.writeText(document.getElementById("backupData").textContent),alert("بکاپ کپی شد! ✅")}function closeBackupModal(){document.getElementById("backupModal").classList.remove("active")}fetch("/api/stats").then(e=>{e.ok&&(document.getElementById("loginSection").style.display="none",document.getElementById("adminSection").style.display="block",loadDashboard())}).catch(()=>{})</script></body></html>`;
// ============================================
// 🔥 Taakaa-Xi Ultimate v5.0 - بخش ۴/۵
// 🌐 @TaaKaaOrg
// ⚡ اسکنر + صفحات جانبی
// ============================================

const HTML_SCANNER = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Taakaa-Xi | اسکنر آی‌پی</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Vazir','Tahoma',sans-serif;background:#1a1a2e;color:#fff;min-height:100vh;padding:2rem}.container{max-width:1200px;margin:0 auto}h1{color:#ff6b00;text-align:center;margin-bottom:2rem;font-size:2.5rem}.controls{display:flex;gap:1rem;margin-bottom:2rem;flex-wrap:wrap;justify-content:center}select,button{padding:.75rem 1.5rem;border-radius:8px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;font-size:1rem}button{background:#ff6b00;border:none;cursor:pointer;font-weight:600}button:hover{background:#ff8533}.btn-scan{background:#ff8533}.results{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem}.ip-card{padding:1.5rem;background:rgba(255,255,255,0.05);border-radius:16px;border:1px solid rgba(255,255,255,0.1);cursor:pointer;transition:all .3s}.ip-card:hover{border-color:#ff6b00;transform:translateY(-3px)}.ip-card.best{border-color:#0f0;background:rgba(0,255,0,0.05)}.ip-card .ip{font-size:1.2rem;font-weight:700;color:#ff6b00}.ip-card .ports{color:#888;margin-top:.5rem}.ip-card .latency{display:inline-block;padding:.25rem .75rem;border-radius:50px;background:rgba(255,107,0,0.2);margin-top:.5rem;font-size:.85rem}.ip-card .latency.fast{background:rgba(0,255,0,0.2);color:#0f0}.ip-card .latency.medium{background:rgba(255,193,7,0.2);color:#ffc107}.ip-card .latency.slow{background:rgba(255,0,0,0.2);color:#f00}.ip-card .operator{display:inline-block;padding:.25rem .75rem;border-radius:50px;background:rgba(255,107,0,0.2);margin-top:.5rem;font-size:.85rem;margin-right:.5rem}.spinner{width:50px;height:50px;border:5px solid rgba(255,255,255,0.1);border-top-color:#ff6b00;border-radius:50%;animation:spin 1s linear infinite;margin:2rem auto}@keyframes spin{to{transform:rotate(360deg)}}.status-bar{text-align:center;margin:1rem 0;color:#888}</style></head><body><div class="container"><h1>📡 اسکنر آی‌پی Taakaa-Xi</h1><div class="controls"><select id="operator"><option value="all">همه اپراتورها</option><option value="mci">همراه اول</option><option value="mtn">ایرانسل</option><option value="rtl">رایتل</option></select><select id="count"><option value="10">10 آی‌پی</option><option value="20">20 آی‌پی</option><option value="50">50 آی‌پی</option><option value="100">100 آی‌پی</option></select><button onclick="scanIPs()">🔍 اسکن سریع</button><button onclick="scanRealIPs()" class="btn-scan">⚡ اسکن واقعی</button></div><div id="statusBar" class="status-bar"></div><div id="results" class="results"><p style="text-align:center;color:#888;grid-column:1/-1">برای شروع اسکن، دکمه بالا را بزنید</p></div></div><script>function scanIPs(){let e=document.getElementById("operator").value,t=document.getElementById("count").value,n=document.getElementById("results"),a=document.getElementById("statusBar");n.innerHTML='<div class="spinner" style="grid-column:1/-1"></div>',a.textContent="در حال دریافت لیست آی‌پی های پیشنهادی...",fetch("/api/ips?operator="+e+"&count="+t+"&sort=latency").then(e=>e.json()).then(e=>{let t="";e.forEach((e,n)=>{let a=Array.isArray(e.ports)?e.ports.join(", "):e.ports,s=e.latency||0,o=s<50?"fast":s<80?"medium":"slow",l=e.operator==="mci"?"همراه اول":e.operator==="mtn"?"ایرانسل":e.operator==="rtl"?"رایتل":"همه";t+='<div class="ip-card'+(0===n?" best":"")+'" onclick="copyIP(\''+e.ip+"','"+a+"')\"><div class=\"ip\">"+(0===n?"⭐ ":"")+e.ip+'</div><div class="ports">پورت‌ها: '+a+'</div><span class="operator">'+l+'</span><span class="latency '+o+'">'+s+"ms</span></div>"}),n.innerHTML=t,a.textContent=e.length+" آی‌پی یافت شد | ★ = بهترین"}).catch(()=>{n.innerHTML='<p style="text-align:center;color:red;grid-column:1/-1">خطا!</p>',a.textContent=""})}function scanRealIPs(){let e=document.getElementById("operator").value,t=document.getElementById("results"),n=document.getElementById("statusBar");t.innerHTML='<div class="spinner" style="grid-column:1/-1"></div>',n.textContent="در حال اسکن واقعی... (ممکن است ۱۰-۳۰ ثانیه طول بکشد)",fetch("/api/scan-ips?operator="+e).then(e=>e.json()).then(e=>{if(e.results&&e.results.length>0){let a="";e.results.forEach((e,t)=>{let n=e.ports||"443",s=e.latency||0,o=s<100?"fast":s<200?"medium":"slow",l=e.operator==="mci"?"همراه اول":e.operator==="mtn"?"ایرانسل":e.operator==="rtl"?"رایتل":"همه";a+='<div class="ip-card'+(0===t?" best":"")+'" onclick="copyIP(\''+e.ip+"','"+n+"')\"><div class=\"ip\">"+(0===t?"⭐ ":"")+e.ip+'</div><div class="ports">پورت: '+n+'</div><span class="operator">'+l+'</span><span class="latency '+o+'">'+s+"ms</span></div>"}),t.innerHTML=a,n.textContent=e.results.length+" آی‌پی زنده یافت شد | ★ = سریعترین"}else t.innerHTML='<p style="text-align:center;color:#ffc107;grid-column:1/-1">آی‌پی زنده‌ای یافت نشد</p>',n.textContent=""}).catch(e=>{t.innerHTML='<p style="text-align:center;color:red;grid-column:1/-1">خطا در اسکن!</p>',n.textContent=""})}function copyIP(e,t){navigator.clipboard.writeText(e+":"+t.split(",")[0]),alert("IP کپی شد: "+e)}</script></body></html>`;

const HTML_OWNERS = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | پشتیبان‌ها</title><style>body{font-family:'Vazir',sans-serif;background:#1a1a2e;color:#fff;text-align:center;padding:3rem}h1{color:#ff6b00}.owner{margin:2rem;padding:2rem;background:rgba(255,255,255,0.05);border-radius:16px;display:inline-block}a{color:#ff6b00}</style></head><body><h1>👥 تیم پشتیبانی Taakaa-Xi</h1><div class="owner"><h2>تیم تاکا</h2><p>کانال تلگرام: <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p><p>🚀 ۳ ماه توسعه</p></div></body></html>`;

const HTML_FRAGMENT = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | Fragment</title><style>body{font-family:'Vazir',sans-serif;background:#1a1a2e;color:#fff;padding:3rem;max-width:800px;margin:0 auto}h1{color:#ff6b00}.info{background:rgba(255,255,255,0.05);padding:2rem;border-radius:16px;line-height:2}code{background:rgba(255,107,0,0.2);padding:.2rem .5rem;border-radius:4px}</style></head><body><h1>🛡️ تکنیک Fragment</h1><div class="info"><p>Fragment یک تکنیک پیشرفته برای تکه‌تکه کردن بسته‌های TLS است.</p><p>پارامترها:</p><ul><li><code>size</code>: اندازه تکه‌ها (مثال: 200-500)</li><li><code>count</code>: تعداد تکه‌ها (مثال: 5-10)</li><li><code>delay</code>: تاخیر بین تکه‌ها (مثال: 10-30 میلی‌ثانیه)</li></ul></div></body></html>`;

const HTML_OFFLINE = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | راهنما</title><style>body{font-family:'Vazir',sans-serif;background:#1a1a2e;color:#fff;padding:3rem}h1{color:#ff6b00}.guide{background:rgba(255,255,255,0.05);padding:2rem;border-radius:16px}h2{color:#ff8533;margin-top:1.5rem}</style></head><body><h1>📚 راهنمای اپراتورها</h1><div class="guide"><h2>همراه اول</h2><p>پورت‌ها: 443, 8443, 2083</p><h2>ایرانسل</h2><p>پورت‌ها: 443, 2083, 2087</p><h2>رایتل</h2><p>پورت‌ها: 443, 2096</p></div></body></html>`;

const HTML_LOCATION = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | لوکیشن</title><style>body{font-family:'Vazir',sans-serif;background:#1a1a2e;color:#fff;padding:3rem}h1{color:#ff6b00;text-align:center}.locations{display:flex;gap:2rem;flex-wrap:wrap;justify-content:center;margin-top:2rem}.location{padding:2rem;background:rgba(255,255,255,0.05);border-radius:16px;cursor:pointer;transition:all .3s;text-align:center;min-width:150px}.location:hover{border-color:#ff6b00;transform:scale(1.05)}.flag{font-size:3rem}</style></head><body><h1>🌍 انتخاب لوکیشن</h1><div class="locations"><div class="location" onclick="alert('آلمان انتخاب شد')"><div class="flag">🇩🇪</div><h3>آلمان</h3></div><div class="location" onclick="alert('هلند انتخاب شد')"><div class="flag">🇳🇱</div><h3>هلند</h3></div><div class="location" onclick="alert('آمریکا انتخاب شد')"><div class="flag">🇺🇸</div><h3>آمریکا</h3></div></div></body></html>`;
// ============================================
// 🔥 Taakaa-Xi Ultimate v5.0 - بخش ۵/۵
// 🌐 @TaaKaaOrg
// ⚡ Main Worker + تمام API ها
// ============================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };
    
    if (method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
    
    // Load config from KV
    if (env.KV) {
      try {
        const savedConfig = await env.KV.get('config');
        if (savedConfig) CONFIG = { ...CONFIG, ...JSON.parse(savedConfig) };
        const savedPass = await env.KV.get('admin_pass');
        if (savedPass) CONFIG.ADMIN_PASS = savedPass;
      } catch (e) {}
    }
    if (env.ADMIN_PASS) CONFIG.ADMIN_PASS = env.ADMIN_PASS;
    
    const um = new UserManager(env);
    const sm = new SessionManager(env);
    const hasKV = !!env.KV;
    const hasPass = !!CONFIG.ADMIN_PASS;
    
    // Setup check APIs
    if (path === '/api/check-kv') return new Response(JSON.stringify({ ok: hasKV }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    if (path === '/api/check-d1') return new Response(JSON.stringify({ ok: !!env.DB }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    if (path === '/api/check-pass') return new Response(JSON.stringify({ ok: hasPass }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    
    if (path === '/api/setup-pass' && method === 'POST') {
      try {
        const { password } = await request.json();
        if (!password || password.length < 3) return new Response(JSON.stringify({ ok: false, error: 'رمز کوتاه' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        if (env.KV) await env.KV.put('admin_pass', password);
        CONFIG.ADMIN_PASS = password;
        return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: e.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }
    
    // Show setup page
    if ((!hasKV || !hasPass) && (path === '/' || path === '' || path === '/setup')) {
      return new Response(HTML_SETUP, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    // API Routes
    if (path.startsWith('/api/')) {
      const apiPath = path.replace('/api/', '');
      
      if (apiPath !== 'login' && apiPath !== 'check-kv' && apiPath !== 'check-d1' && apiPath !== 'check-pass' && apiPath !== 'setup-pass' && apiPath !== 'scan-ips') {
        const cookie = request.headers.get('Cookie') || '';
        const smatch = cookie.match(/session=([^;]+)/);
        if (!smatch || !(await sm.validate(smatch[1]))) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
      }
      
      // Login
      if (apiPath === 'login' && method === 'POST') {
        const { password } = await request.json();
        if (password === CONFIG.ADMIN_PASS) {
          const sid = await sm.create();
          if (!sid) return new Response(JSON.stringify({ error: 'KV not configured' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Set-Cookie': `session=${sid}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${CONFIG.SESSION_HOURS * 3600}` }
          });
        }
        return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      // Logout
      if (apiPath === 'logout' && method === 'POST') {
        const cookie = request.headers.get('Cookie') || '';
        const smatch = cookie.match(/session=([^;]+)/);
        if (smatch) await sm.destroy(smatch[1]);
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Set-Cookie': 'session=; Path=/; Max-Age=0' } });
      }
      
      // Stats
      if (apiPath === 'stats') {
        const stats = await um.getStats();
        return new Response(JSON.stringify(stats), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      // Users CRUD
      if (apiPath === 'users' && method === 'GET') {
        const users = await um.getAll();
        return new Response(JSON.stringify(users), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      if (apiPath === 'users' && method === 'POST') {
        const data = await request.json();
        const user = await um.add(data);
        return new Response(JSON.stringify(user), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      if (apiPath.match(/^users\/([^\/]+)\/reset$/) && method === 'POST') {
        const userId = apiPath.split('/')[1];
        const user = await um.resetUsage(userId);
        return new Response(JSON.stringify(user), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      if (apiPath.match(/^users\/([^\/]+)$/) && method === 'PUT') {
        const userId = apiPath.split('/')[1];
        const data = await request.json();
        const user = await um.update(userId, data);
        return new Response(JSON.stringify(user), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      if (apiPath.match(/^users\/([^\/]+)$/) && method === 'DELETE') {
        const userId = apiPath.split('/')[1];
        await um.delete(userId);
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      // IPs
      if (apiPath === 'ips') {
        const operator = url.searchParams.get('operator') || 'all';
        const count = parseInt(url.searchParams.get('count') || '10');
        const sort = url.searchParams.get('sort');
        const ips = Helpers.getBestIPs(operator, count, sort === 'latency');
        return new Response(JSON.stringify(ips), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      // Real IP Scanner
      if (apiPath === 'scan-ips') {
        const operator = url.searchParams.get('operator') || 'all';
        const ips = Helpers.getBestIPs(operator, 10);
        const uniqueIPs = [...new Set(ips.map(i => i.ip))];
        const results = await IPScanner.scanBatch(uniqueIPs, ['443'], 5);
        return new Response(JSON.stringify({ results: results.slice(0, 20) }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      // Generate config
      if (apiPath === 'generate-config' && method === 'POST') {
        const data = await request.json();
        const config = Helpers.generateConfig(data.uuid || CONFIG.UUID, data.host || '104.16.71.76', data.port || '443', data.type || 'vless', data.settings || {});
        return new Response(JSON.stringify({ config }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      // Settings
      if (apiPath === 'settings' && method === 'GET') {
        return new Response(JSON.stringify(CONFIG), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      if (apiPath === 'settings' && method === 'POST') {
        const data = await request.json();
        Object.assign(CONFIG, data);
        if (env.KV) await env.KV.put('config', JSON.stringify(CONFIG));
        if (data.ADMIN_PASS && env.KV) await env.KV.put('admin_pass', data.ADMIN_PASS);
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      // Backup
      if (apiPath === 'backup') {
        const backup = await um.backupData();
        return new Response(JSON.stringify(backup), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }
    
    // Subscription
    if (path.startsWith('/sub/')) {
      const uuid = path.replace('/sub/', '').replace(/\/$/, '');
      if (!Helpers.isValidUUID(uuid)) return new Response('UUID نامعتبر', { status: 400 });
      
      const user = await um.getByUUID(uuid);
      if (!user && uuid !== CONFIG.UUID) return new Response('کاربر یافت نشد', { status: 404 });
      
      const type = url.searchParams.get('type') || 'all';
      const format = url.searchParams.get('format') || 'raw';
      const operator = user?.operator || 'all';
      let configs = [];
      const ips = Helpers.getBestIPs(operator, 5);
      
      ips.forEach(({ ip, ports }) => {
        ports.forEach(port => {
          if (type === 'all' || type === 'vless') configs.push(Helpers.generateConfig(uuid, ip, port, 'vless', { name: 'Taakaa-Xi-' + (user?.name || 'Main') }));
          if (type === 'all' || type === 'trojan') configs.push(Helpers.generateConfig(uuid, ip, port, 'trojan', { name: 'Taakaa-Xi-' + (user?.name || 'Main') }));
          if (type === 'all' || type === 'ss') configs.push(Helpers.generateConfig(uuid, ip, port, 'ss', { name: 'Taakaa-Xi-' + (user?.name || 'Main') }));
        });
      });
      
      if (format === 'base64') return new Response(btoa(configs.join('\n')), { headers: { 'Content-Type': 'text/plain' } });
      
      if (format === 'clash') {
        const cc = { proxies: ips.flatMap(({ ip, ports }) => ports.map(port => ({ name: `Taakaa-Xi-${ip}:${port}`, type: 'vless', server: ip, port: parseInt(port), uuid, network: 'ws', 'ws-opts': { path: '/' }, tls: true, 'servername': CONFIG.SNI }))) };
        return new Response(JSON.stringify(cc, null, 2), { headers: { 'Content-Type': 'application/yaml' } });
      }
      
      return new Response(configs.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    
    // Static Pages
    if (path === '/' || path === '') return new Response(HTML_WELCOME, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/admin') return new Response(HTML_ADMIN, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/scanner') return new Response(HTML_SCANNER, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/owners') return new Response(HTML_OWNERS, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/fragment-info') return new Response(HTML_FRAGMENT, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/offline-support') return new Response(HTML_OFFLINE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/select-location') return new Response(HTML_LOCATION, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    
    // Proxy Handler
    return handleProxy(request, env, ctx);
  }
};
