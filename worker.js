// ============================================
// 🔥 TAAKAA-XI ULTIMATE v7.0 - بخش ۱/۸
// 🌐 @TaaKaaOrg - تمام قابلیت‌ها + ۹۰ قابلیت اختصاصی
// ⚡ Cloudflare Worker - پروکسی + پنل + ربات تلگرام + سابسکریپشن
// ============================================

import { connect } from 'cloudflare:sockets';

// ============ CONFIGURATION ============
let CONFIG = {
  UUID: '12345678-1234-1234-1234-123456789abc',
  ADMIN_PASS: '',
  SNI: 'cloudflare.com',
  FINGERPRINT: 'chrome',
  FINGERPRINTS: ['chrome','firefox','safari','random','ios','android','edge','360','qq','sogou'],
  PORTS: ['443','8443','2083','2087','2096','2053'],
  FRAGMENT: { enabled: true, size: '200-500', count: '5-10', delay: '10-30' },
  WARP: { enabled: false, pro: false },
  ECH: { enabled: true },
  XHTTP: { enabled: false, mode: 'packet-up' },
  GRPC: { enabled: false, serviceName: 'grpc' },
  SESSION_HOURS: 24,
  MAX_LOGIN_ATTEMPTS: 5,
  TOTP: { enabled: false, secret: '' },
  PROXY: { enabled: false, type: 'socks5', host: '', port: '1080' },
  ROUTING: { enabled: false, geoIP: false, geoSite: false },
  FILTERS: { adBlock: false, pornBlock: false, iranBlock: false, speedtestBlock: false },
  DNS: { doh: 'https://cloudflare-dns.com/dns-query', enabled: false },
  BACKEND: { enabled: false, url: '' },
  TELEGRAM: { enabled: false, botToken: '', adminID: '' },
  LOCATIONS: [
    { code:'DE',name:'آلمان',flag:'🇩🇪',ip:'104.16.71.76',city:'Frankfurt' },
    { code:'NL',name:'هلند',flag:'🇳🇱',ip:'104.16.71.115',city:'Amsterdam' },
    { code:'US',name:'آمریکا',flag:'🇺🇸',ip:'104.16.71.101',city:'New York' },
    { code:'UK',name:'انگلیس',flag:'🇬🇧',ip:'104.16.71.85',city:'London' },
    { code:'FR',name:'فرانسه',flag:'🇫🇷',ip:'104.16.71.27',city:'Paris' },
    { code:'JP',name:'ژاپن',flag:'🇯🇵',ip:'104.16.71.110',city:'Tokyo' },
    { code:'SG',name:'سنگاپور',flag:'🇸🇬',ip:'104.16.71.182',city:'Singapore' },
    { code:'CA',name:'کانادا',flag:'🇨🇦',ip:'104.16.71.229',city:'Toronto' },
    { code:'AU',name:'استرالیا',flag:'🇦🇺',ip:'104.16.71.193',city:'Sydney' },
    { code:'BR',name:'برزیل',flag:'🇧🇷',ip:'104.16.71.135',city:'Sao Paulo' },
    { code:'IN',name:'هند',flag:'🇮🇳',ip:'104.16.71.202',city:'Mumbai' },
    { code:'AE',name:'امارات',flag:'🇦🇪',ip:'104.16.71.219',city:'Dubai' },
    { code:'TR',name:'ترکیه',flag:'🇹🇷',ip:'104.26.7.44',city:'Istanbul' },
    { code:'RU',name:'روسیه',flag:'🇷🇺',ip:'162.159.38.206',city:'Moscow' },
    { code:'ZA',name:'آفریقا',flag:'🇿🇦',ip:'173.245.59.53',city:'Johannesburg' }
  ]
};

// ============ TRUSTED IPs DATABASE (کامل) ============
const TRUSTED_IPS = [
  { ip:'104.16.71.76',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:45,city:'Frankfurt',country:'DE' },
  { ip:'104.16.71.115',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:48,city:'Amsterdam',country:'NL' },
  { ip:'104.16.71.101',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:42,city:'New York',country:'US' },
  { ip:'104.16.71.85',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:50,city:'London',country:'UK' },
  { ip:'104.16.71.27',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:38,city:'Paris',country:'FR' },
  { ip:'104.16.71.110',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:55,city:'Tokyo',country:'JP' },
  { ip:'104.16.71.182',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:41,city:'Singapore',country:'SG' },
  { ip:'104.16.71.229',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:47,city:'Toronto',country:'CA' },
  { ip:'104.16.71.193',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:44,city:'Sydney',country:'AU' },
  { ip:'104.16.71.135',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:52,city:'Sao Paulo',country:'BR' },
  { ip:'104.16.71.202',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:39,city:'Mumbai',country:'IN' },
  { ip:'104.16.71.219',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:46,city:'Dubai',country:'AE' },
  { ip:'104.16.71.17',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:43,city:'Berlin',country:'DE' },
  { ip:'104.16.71.80',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:51,city:'Madrid',country:'ES' },
  { ip:'104.16.71.216',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:37,city:'Rome',country:'IT' },
  { ip:'162.159.160.11',ports:['2083','2096','8443','2053','443','2087'],operator:'all',latency:55,city:'Miami',country:'US' },
  { ip:'23.227.60.9',ports:['2096','2087','8443','2083'],operator:'all',latency:60,city:'Los Angeles',country:'US' },
  { ip:'138.249.148.112',ports:['2053','2087','2083','443'],operator:'all',latency:58,city:'Chicago',country:'US' },
  { ip:'1.1.1.81',ports:['2087','2053','2096'],operator:'all',latency:40,city:'San Francisco',country:'US' },
  { ip:'172.64.153.117',ports:['8443','2083','443','2087','2053'],operator:'all',latency:52,city:'Dallas',country:'US' },
  { ip:'94.156.10.39',ports:['2096','2087','443','2083'],operator:'all',latency:68,city:'Warsaw',country:'PL' },
  { ip:'5.252.81.226',ports:['2087','2096','2083','2053'],operator:'all',latency:63,city:'Athens',country:'GR' },
  { ip:'23.227.39.68',ports:['2053','8443'],operator:'all',latency:59,city:'Seattle',country:'US' },
  { ip:'104.26.14.160',ports:['2083','2096'],operator:'all',latency:56,city:'Berlin',country:'DE' },
  { ip:'66.93.178.242',ports:['2083','2053','2096'],operator:'all',latency:61,city:'Stockholm',country:'SE' },
  { ip:'89.106.90.15',ports:['2096','2053'],operator:'all',latency:67,city:'Oslo',country:'NO' },
  { ip:'172.64.84.159',ports:['2087','8443','2083','2053'],operator:'all',latency:54,city:'Helsinki',country:'FI' },
  { ip:'37.153.170.102',ports:['2053','2083'],operator:'all',latency:64,city:'Copenhagen',country:'DK' },
  { ip:'162.159.93.244',ports:['2087','2083','2053','443','2096','8443'],operator:'all',latency:51,city:'Vienna',country:'AT' },
  { ip:'45.45.255.43',ports:['2083','2096','2053','8443','2087'],operator:'all',latency:58,city:'Zurich',country:'CH' },
  { ip:'103.51.12.167',ports:['2096','2053','443'],operator:'all',latency:66,city:'Bucharest',country:'RO' },
  { ip:'156.243.83.52',ports:['2096','443','2087','2053','2083','8443'],operator:'all',latency:55,city:'Prague',country:'CZ' },
  { ip:'162.159.254.7',ports:['2087','2053','2096','443','2083','8443'],operator:'all',latency:53,city:'Brussels',country:'BE' },
  { ip:'5.10.215.142',ports:['2087','2096','8443'],operator:'all',latency:69,city:'Dublin',country:'IE' },
  { ip:'156.224.73.107',ports:['2053','2087','443','2083','2096','8443'],operator:'all',latency:57,city:'Lisbon',country:'PT' },
  { ip:'104.234.133.163',ports:['2053','2096','443','8443','2083','2087'],operator:'all',latency:60,city:'Budapest',country:'HU' },
  { ip:'45.128.76.37',ports:['2087','2053','2096','8443','2083','443'],operator:'all',latency:64,city:'Sofia',country:'BG' },
  { ip:'61.245.108.53',ports:['2083','2053','2096','443','2087','8443'],operator:'all',latency:61,city:'Seoul',country:'KR' },
  { ip:'143.14.224.68',ports:['443','2087','2083','2096','8443','2053'],operator:'all',latency:63,city:'Taipei',country:'TW' },
  { ip:'172.64.188.4',ports:['2096','2053','2083','443','2087','8443'],operator:'all',latency:52,city:'Hong Kong',country:'HK' },
  { ip:'104.17.156.175',ports:['8443'],operator:'all',latency:62,city:'Bangkok',country:'TH' },
  { ip:'104.17.21.148',ports:['2053'],operator:'all',latency:57,city:'Kuala Lumpur',country:'MY' },
  { ip:'104.17.158.203',ports:['2053'],operator:'all',latency:59,city:'Jakarta',country:'ID' },
  { ip:'104.19.41.143',ports:['8443'],operator:'all',latency:64,city:'Manila',country:'PH' },
  { ip:'104.16.250.15',ports:['2053'],operator:'all',latency:56,city:'Istanbul',country:'TR' },
  { ip:'173.245.58.100',ports:['2053'],operator:'all',latency:68,city:'Moscow',country:'RU' },
  { ip:'104.17.166.174',ports:['2053'],operator:'all',latency:58,city:'Johannesburg',country:'ZA' },
  { ip:'104.17.218.118',ports:['2096'],operator:'all',latency:63,city:'Lagos',country:'NG' },
  { ip:'104.19.37.112',ports:['2083'],operator:'all',latency:60,city:'Nairobi',country:'KE' },
  { ip:'198.41.208.110',ports:['443'],operator:'all',latency:55,city:'Cairo',country:'EG' }
];

// ============ IRANIAN DOMAINS (برای فیلتر) ============
const IRANIAN_DOMAINS = ['.ir','.to','snapp.ir','tapsi.ir','digikala.com','varzesh3.com','namasha.com','aparat.com','filimo.com','namava.ir'];

// ============ SPEEDTEST DOMAINS ============
const SPEEDTEST_DOMAINS = ['speedtest.net','fast.com','speedcheck.org','speed.one','testmy.net'];

// ============ HELPER CLASS ============
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
      if (xhttp?.enabled) c += `&type=xhttp&mode=${xhttp.mode}&host=${host}&path=%2F`;
      else if (grpc?.enabled) c += `&type=grpc&serviceName=${grpc.serviceName}&host=${host}`;
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
    } else if (type === 'singbox') {
      return JSON.stringify({
        "inbounds": [{"type":"tun","interface_name":"tun0","address":["172.19.0.1/30"],"mtu":1500,"auto_route":true,"strict_route":true}],
        "outbounds": [{"type":"vless","server":host,"server_port":parseInt(port),"uuid":uuid,"tls":{"enabled":true,"server_name":sni,"utls":{"enabled":true,"fingerprint":fp}},"transport":{"type":"ws","path":"/","headers":{"Host":host}}}}]
      }, null, 2);
    } else if (type === 'clash') {
      return JSON.stringify({
        "proxies": [{"name":name,"type":"vless","server":host,"port":parseInt(port),"uuid":uuid,"network":"ws","ws-opts":{"path":"/"},"tls":true,"servername":sni}]
      }, null, 2);
    }
    return '';
  }
  
  static isIranianDomain(hostname) {
    return IRANIAN_DOMAINS.some(d => hostname.includes(d));
  }
  
  static isSpeedtestDomain(hostname) {
    return SPEEDTEST_DOMAINS.some(d => hostname.includes(d));
  }
}
// ============================================
// 🔥 TAAKAA-XI ULTIMATE v7.0 - بخش ۲/۸
// 🌐 @TaaKaaOrg
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
    return { users: await this.getAll(), config: CONFIG, backupDate: new Date().toISOString(), version: '7.0' };
  }
  
  async restoreData(data) {
    if (data.users) await this.saveAll(data.users);
    if (data.config) { Object.assign(CONFIG, data.config); if (this.env.KV) await this.env.KV.put('config', JSON.stringify(CONFIG)); }
    return true;
  }
}

class SessionManager {
  constructor(env) { this.env = env; this.attempts = {}; }
  
  async create() {
    if (!this.env.KV) return null;
    const sid = Helpers.generateUUID();
    await this.env.KV.put(`session:${sid}`, JSON.stringify({ created: Date.now(), expires: Date.now() + (CONFIG.SESSION_HOURS * 3600000) }), { expirationTtl: CONFIG.SESSION_HOURS * 3600 });
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
  
  checkRateLimit(ip) {
    const now = Date.now();
    if (!this.attempts[ip]) this.attempts[ip] = { count: 0, resetAt: now + 300000 };
    if (now > this.attempts[ip].resetAt) this.attempts[ip] = { count: 0, resetAt: now + 300000 };
    this.attempts[ip].count++;
    return this.attempts[ip].count <= CONFIG.MAX_LOGIN_ATTEMPTS;
  }
}

class IPScanner {
  static async scanIP(ip, port) {
    const start = Date.now();
    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 3000);
      const res = await fetch(`https://${ip}:${port}/`, { method: 'HEAD', signal: ctrl.signal, cf: { resolveOverride: ip } });
      clearTimeout(timeout);
      return { ip, port, alive: res.ok, latency: Date.now() - start };
    } catch (e) { return { ip, port, alive: false, latency: 999 }; }
  }
  
  static async scanBatch(ips, ports, concurrency = 5) {
    const results = [], queue = [];
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

// ============ PROXY HANDLER ============
async function handleProxy(request, env, ctx) {
  const url = new URL(request.url);
  const uuid = url.pathname.replace('/', '').split('/')[0];
  const um = new UserManager(env);
  const isValid = uuid === CONFIG.UUID || await um.getByUUID(uuid);
  if (!isValid) return new Response('Unauthorized', { status: 401 });
  
  if (uuid !== CONFIG.UUID) { const ok = await um.checkLimits(uuid); if (!ok) return new Response('Limit Exceeded', { status: 403 }); }
  
  // Check filters
  if (CONFIG.FILTERS.iranBlock && Helpers.isIranianDomain(url.hostname)) return new Response('Blocked', { status: 403 });
  if (CONFIG.FILTERS.speedtestBlock && Helpers.isSpeedtestDomain(url.hostname)) return new Response('Blocked', { status: 403 });
  
  const upgrade = request.headers.get('Upgrade');
  if (upgrade && upgrade.toLowerCase() === 'websocket') {
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    ctx.acceptWebSocket(server);
    server.addEventListener('message', async (event) => {
      try { if (uuid !== CONFIG.UUID) await um.recordUsage(uuid, event.data.length || 0); } catch (e) {}
    });
    return new Response(null, { status: 101, webSocket: client });
  }
  
  // Backend proxy
  if (CONFIG.BACKEND.enabled && CONFIG.BACKEND.url) {
    try {
      const backendUrl = CONFIG.BACKEND.url + url.pathname + url.search;
      const backendRes = await fetch(backendUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });
      return backendRes;
    } catch (e) { return new Response('Backend Error', { status: 502 }); }
  }
  
  // Direct connection
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
    return new Response(socket.readable, { headers: { 'Content-Type': 'application/octet-stream', 'X-Proxy': 'Taakaa-Xi' } });
  } catch (e) { return new Response('Connection Failed', { status: 502 }); }
}
// ============================================
// 🔥 TAAKAA-XI ULTIMATE v7.0 - بخش ۳/۸
// 🌐 @TaaKaaOrg - Setup Wizard + Welcome
// ============================================

const HTML_SETUP = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Taakaa-Xi | راه‌اندازی</title><style>:root{--orange:#ff6b00;--orange-light:#ff8533;--bg:#0a0a0f;--bg-card:#1a1a2e;--text:#e0e0e0;--text-secondary:#888;--border:rgba(255,255,255,0.08);--radius:16px;--radius-sm:10px}*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Vazir','Tahoma',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background-image:radial-gradient(ellipse at top,rgba(255,107,0,0.08) 0%,transparent 70%)}.container{max-width:700px;width:100%;padding:3rem;background:var(--bg-card);border-radius:24px;border:2px solid rgba(255,107,0,0.3);box-shadow:0 20px 60px rgba(0,0,0,0.5)}.logo{font-size:3rem;font-weight:900;text-align:center;margin-bottom:.5rem;background:linear-gradient(135deg,var(--orange),var(--orange-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent}.subtitle{text-align:center;color:var(--orange);margin-bottom:2rem;font-size:1.1rem}.setup-card{background:rgba(255,255,255,0.03);border-radius:var(--radius);padding:1.5rem;margin-bottom:1.5rem;border:1px solid var(--border);transition:all .3s}.setup-card.required{border-color:rgba(255,107,0,0.5);background:rgba(255,107,0,0.05)}.setup-card.success{border-color:rgba(0,255,0,0.5);background:rgba(0,255,0,0.05)}.setup-card.error{border-color:rgba(255,0,0,0.5);background:rgba(255,0,0,0.05)}.card-header{display:flex;align-items:center;gap:.75rem;margin-bottom:1rem}.status-icon{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem}.status-icon.checking{background:rgba(255,193,7,0.2);color:#ffc107}.status-icon.success{background:rgba(0,255,0,0.2);color:#0f0}.status-icon.error{background:rgba(255,0,0,0.2);color:#f00}.card-title{font-size:1.1rem;font-weight:700}.card-badge{display:inline-block;padding:.25rem .75rem;border-radius:50px;font-size:.75rem;font-weight:600}.badge-required{background:rgba(255,0,0,0.2);color:#f44}.badge-optional{background:rgba(255,193,7,0.2);color:#ffc107}.card-desc{color:var(--text-secondary);line-height:1.8;margin-bottom:1rem;font-size:.95rem}.card-desc code{background:rgba(255,107,0,0.2);padding:.2rem .5rem;border-radius:4px;color:var(--orange-light);font-family:monospace}.card-desc ol{padding-right:1.5rem;margin:.5rem 0}.card-desc li{margin:.25rem 0}input{width:100%;padding:.75rem 1rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:var(--radius-sm);color:#fff;font-size:1rem;margin-top:.5rem}input:focus{outline:none;border-color:var(--orange)}button{width:100%;padding:.75rem;background:linear-gradient(135deg,var(--orange),var(--orange-light));border:none;color:#fff;border-radius:var(--radius-sm);font-size:1rem;font-weight:600;cursor:pointer;margin-top:1rem;transition:all .3s;font-family:inherit}button:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(255,107,0,0.3)}.check-btn{width:auto;padding:.5rem 1.5rem;margin-top:.5rem;font-size:.9rem}.message{margin-top:.75rem;padding:.75rem;border-radius:var(--radius-sm);font-size:.9rem;display:none}.message.show{display:block}.message.success{background:rgba(0,255,0,0.1);color:#0f0}.message.error{background:rgba(255,0,0,0.1);color:#f00}.footer{text-align:center;margin-top:2rem;color:var(--text-secondary);font-size:.85rem}.footer a{color:var(--orange);text-decoration:none}.spinner{width:20px;height:20px;border:3px solid rgba(255,255,255,0.1);border-top-color:var(--orange);border-radius:50%;animation:spin .8s linear infinite;display:inline-block}@keyframes spin{to{transform:rotate(360deg)}}.all-ready{text-align:center;padding:2rem;display:none}.all-ready.show{display:block}.all-ready .icon{font-size:4rem;margin-bottom:1rem}.all-ready h2{color:#0f0;margin-bottom:1rem}</style></head><body><div class="container"><div class="logo">⚡ Taakaa-Xi</div><div class="subtitle">راه‌اندازی اولیه - Setup Wizard</div><div class="setup-card required" id="kvCard"><div class="card-header"><span class="status-icon checking" id="kvIcon">⟳</span><span class="card-title">KV Storage</span><span class="card-badge badge-required">الزامی*</span></div><div class="card-desc"><p><strong>KV برای ذخیره‌سازی کاربران و تنظیمات الزامی است.</strong></p><p style="margin-top:.5rem">مراحل تنظیم:</p><ol><li>به تب <code>Workers & Pages</code> در داشبورد Cloudflare بروید</li><li>پروژه خود را انتخاب کنید</li><li>به تب <code>Settings</code> سپس <code>Variables</code> بروید</li><li>در بخش <code>KV Namespace Bindings</code> یک Namespace جدید بسازید</li><li>نام متغیر را <code>KV</code> قرار دهید (دقیقاً KV)</li><li>Namespace را انتخاب و ذخیره کنید</li></ol></div><button class="check-btn" onclick="checkKV()">🔄 بررسی مجدد KV</button><div class="message" id="kvMsg"></div></div><div class="setup-card" id="d1Card"><div class="card-header"><span class="status-icon checking" id="d1Icon">⟳</span><span class="card-title">D1 Database</span><span class="card-badge badge-optional">اختیاری</span></div><div class="card-desc"><p><strong>D1 برای ذخیره‌سازی پیشرفته و جلوگیری از پر شدن KV است (اختیاری).</strong></p><p style="margin-top:.5rem">مراحل تنظیم:</p><ol><li>به تب <code>Workers & Pages</code> بروید</li><li>پروژه خود را انتخاب کنید</li><li>به تب <code>Settings</code> سپس <code>Variables</code> بروید</li><li>در بخش <code>D1 Database Bindings</code> یک Database جدید بسازید</li><li>نام متغیر را <code>DB</code> قرار دهید</li><li>Database را انتخاب و ذخیره کنید</li></ol><p style="color:#ffc107;margin-top:.5rem">⚠️ بدون D1 هم پنل کار می‌کند، فقط با KV</p></div><button class="check-btn" onclick="checkD1()">🔄 بررسی مجدد D1</button><div class="message" id="d1Msg"></div></div><div class="setup-card required" id="passCard"><div class="card-header"><span class="status-icon checking" id="passIcon">⟳</span><span class="card-title">Admin Password</span><span class="card-badge badge-required">الزامی*</span></div><div class="card-desc"><p><strong>برای ورود به پنل مدیریت، رمز عبور تنظیم کنید.</strong></p><p>می‌توانید از یکی از دو روش استفاده کنید:</p><p style="margin-top:.5rem">روش ۱: متغیر محیطی <code>ADMIN_PASS</code> را در تنظیمات Worker ست کنید</p><p>روش ۲: در فیلد زیر رمز را وارد کنید (اگر اینجا بنویسید، نیازی به متغیر نیست)</p></div><input type="password" id="adminPassInput" placeholder="رمز عبور ادمین را وارد کنید"><button onclick="saveAdminPass()">💾 ذخیره رمز عبور</button><div class="message" id="passMsg"></div></div><div class="all-ready" id="allReady"><div class="icon">🎉</div><h2>همه چیز آماده است!</h2><p style="color:var(--text-secondary);margin-bottom:1rem">پنل مدیریت و پروکسی فعال شد</p><button onclick="goToPanel()">🚀 ورود به پنل مدیریت</button></div><div class="footer"><p>🚀 توسعه داده شده توسط <strong>تیم تاکا</strong> | ۳ ماه توسعه</p><p>کانال تلگرام: <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p></div></div><script>let kvOk=false,passOk=false;async function checkKV(){let e=document.getElementById("kvIcon"),t=document.getElementById("kvMsg"),n=document.getElementById("kvCard");e.className="status-icon checking",e.innerHTML='<span class="spinner"></span>',t.className="message",t.innerHTML="در حال بررسی...",t.classList.add("show");try{let s=await(await fetch("/api/check-kv")).json();s.ok?(kvOk=!0,e.className="status-icon success",e.textContent="✓",n.className="setup-card success",t.className="message success show",t.textContent="✅ KV متصل شد!"):(kvOk=!1,e.className="status-icon error",e.textContent="✗",n.className="setup-card error",t.className="message error show",t.textContent="❌ KV متصل نیست")}catch(s){kvOk=!1,e.className="status-icon error",e.textContent="✗",t.className="message error show",t.textContent="❌ خطا"}checkAllReady()}async function checkD1(){let e=document.getElementById("d1Icon"),t=document.getElementById("d1Msg"),n=document.getElementById("d1Card");e.className="status-icon checking",e.innerHTML='<span class="spinner"></span>',t.className="message",t.innerHTML="در حال بررسی...",t.classList.add("show");try{let s=await(await fetch("/api/check-d1")).json();s.ok?(e.className="status-icon success",e.textContent="✓",n.className="setup-card success",t.className="message success show",t.textContent="✅ D1 متصل شد!"):(e.className="status-icon checking",e.textContent="⟳",t.className="message error show",t.textContent="⚠️ D1 متصل نیست (اختیاری)")}catch(s){e.className="status-icon checking",e.textContent="⟳",t.className="message error show",t.textContent="⚠️ D1 متصل نیست (اختیاری)"}}async function saveAdminPass(){let e=document.getElementById("adminPassInput").value,t=document.getElementById("passIcon"),n=document.getElementById("passMsg"),s=document.getElementById("passCard");if(!e||e.length<3){n.className="message error show",n.textContent="❌ رمز عبور باید حداقل ۳ کاراکتر باشد";return}try{let a=await(await fetch("/api/setup-pass",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e})})).json();a.ok?(passOk=!0,t.className="status-icon success",t.textContent="✓",s.className="setup-card success",n.className="message success show",n.textContent="✅ رمز عبور تنظیم شد!"):(passOk=!1,n.className="message error show",n.textContent="❌ خطا: "+(a.error||"مشکل در ذخیره"))}catch(a){passOk=!1,n.className="message error show",n.textContent="❌ خطا در ذخیره"}checkAllReady()}async function checkPassFromEnv(){let e=document.getElementById("passIcon"),t=document.getElementById("passCard");try{let n=await(await fetch("/api/check-pass")).json();n.ok&&(passOk=!0,e.className="status-icon success",e.textContent="✓",t.className="setup-card success",document.getElementById("adminPassInput").placeholder="•••••••• (از متغیر محیطی)")}catch(n){}checkAllReady()}function checkAllReady(){let e=document.getElementById("allReady");kvOk&&passOk?e.classList.add("show"):e.classList.remove("show")}function goToPanel(){window.location.href="/admin"}checkKV(),checkD1(),checkPassFromEnv()</script></body></html>`;

const HTML_WELCOME = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Taakaa-Xi PRO | خانه</title><style>:root{--orange:#ff6b00;--orange-light:#ff8533;--bg:#0a0a0f;--bg-card:#1a1a2e;--text:#e0e0e0;--text-secondary:#888;--border:rgba(255,255,255,0.08);--radius:16px}*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Vazir','Tahoma',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;display:flex;align-items:center;justify-content:center;background-image:radial-gradient(ellipse at top,rgba(255,107,0,0.08) 0%,transparent 70%),radial-gradient(ellipse at bottom right,rgba(55,66,250,0.05) 0%,transparent 70%)}.container{max-width:850px;margin:2rem;padding:3rem;background:var(--bg-card);border-radius:24px;border:1px solid rgba(255,107,0,0.3);box-shadow:0 20px 60px rgba(0,0,0,0.3);animation:fadeIn .5s ease}@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.logo{font-size:4rem;font-weight:900;text-align:center;margin-bottom:1rem;background:linear-gradient(135deg,var(--orange),var(--orange-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent}.subtitle{text-align:center;color:var(--orange);margin-bottom:2rem;font-size:1.2rem}.status{display:flex;justify-content:center;gap:1rem;margin:2rem 0;flex-wrap:wrap}.status-badge{padding:.5rem 1.5rem;border-radius:50px;background:rgba(255,107,0,0.1);border:1px solid rgba(255,107,0,0.3);font-size:.9rem;transition:all .3s}.status-badge:hover{background:rgba(255,107,0,0.2)}.status-badge.active{background:rgba(0,255,0,0.1);border-color:rgba(0,255,0,0.3);color:#0f0;animation:pulse 2s infinite}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}.links{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin:2rem 0}.link-card{padding:1.75rem;background:rgba(255,255,255,0.03);border-radius:var(--radius);text-align:center;text-decoration:none;color:var(--text);transition:all .3s;border:1px solid var(--border);cursor:pointer}.link-card:hover{transform:translateY(-5px);border-color:var(--orange);box-shadow:0 10px 30px rgba(255,107,0,0.2);background:rgba(255,255,255,0.06)}.link-card .icon{font-size:2.5rem;margin-bottom:.75rem;display:block}.link-card .title{font-weight:700;font-size:1rem}.footer{text-align:center;margin-top:3rem;padding-top:2rem;border-top:1px solid var(--border);color:var(--text-secondary);font-size:.9rem}.footer a{color:var(--orange);text-decoration:none}.footer a:hover{text-decoration:underline}</style></head><body><div class="container"><div class="logo">⚡ Taakaa-Xi</div><div class="subtitle">پروکسی پیشرفته | پنل مدیریت | اسکنر آی‌پی</div><div class="status"><span class="status-badge active">● آنلاین</span><span class="status-badge">Ports: 443-8443-2083-2087-2096-2053</span><span class="status-badge">Fragment ✓</span><span class="status-badge">WARP ✓</span><span class="status-badge">ECH ✓</span><span class="status-badge">XHTTP ✓</span></div><div class="links"><a href="/admin" class="link-card"><span class="icon">🎛️</span><span class="title">پنل مدیریت</span></a><a href="/scanner" class="link-card"><span class="icon">📡</span><span class="title">اسکنر آی‌پی</span></a><a href="/sub/" class="link-card"><span class="icon">📦</span><span class="title">سابسکریپشن</span></a><a href="/select-location" class="link-card"><span class="icon">🌍</span><span class="title">انتخاب لوکیشن</span></a><a href="/owners" class="link-card"><span class="icon">👥</span><span class="title">پشتیبان‌ها</span></a><a href="/fragment-info" class="link-card"><span class="icon">🛡️</span><span class="title">Fragment Info</span></a><a href="/offline-support" class="link-card"><span class="icon">📚</span><span class="title">راهنمای اپراتورها</span></a><a href="https://t.me/TaaKaaOrg" target="_blank" class="link-card"><span class="icon">📢</span><span class="title">کانال تلگرام</span></a></div><div class="footer"><p>🚀 توسعه داده شده توسط <strong>تیم تاکا</strong> | ۳ ماه توسعه</p><p>کانال تلگرام: <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p></div></div></body></html>`;
// ============================================
// 🔥 TAAKAA-XI ULTIMATE v7.0 - بخش ۴/۸
// 🌐 @TaaKaaOrg - Admin Panel UI
// ============================================

const HTML_ADMIN = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Taakaa-Xi PRO | پنل مدیریت</title>
<style>
:root {
  --orange:#ff6b00;--orange-light:#ff8533;--orange-glow:rgba(255,107,0,0.3);
  --bg:#0a0a0f;--bg-secondary:#12121a;--bg-card:#1a1a2e;--bg-hover:#1e1e35;
  --green:#00ff88;--red:#ff4757;--yellow:#ffa502;--blue:#3742fa;
  --text:#e0e0e0;--text-secondary:#888;--border:rgba(255,255,255,0.08);
  --radius:16px;--radius-sm:10px;--shadow:0 8px 32px rgba(0,0,0,0.4);
  --transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Vazir','Tahoma',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden}
body::before{content:'';position:fixed;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at top,rgba(255,107,0,0.08) 0%,transparent 70%),radial-gradient(ellipse at bottom right,rgba(55,66,250,0.05) 0%,transparent 70%);pointer-events:none;z-index:0}
#app{position:relative;z-index:1}

/* SIDEBAR */
.sidebar{position:fixed;right:0;top:0;bottom:0;width:280px;background:var(--bg-secondary);border-left:1px solid var(--border);padding:1.5rem;z-index:100;transform:translateX(100%);transition:var(--transition);overflow-y:auto}
.sidebar.open{transform:translateX(0)}
.sidebar-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:99;opacity:0;pointer-events:none;transition:var(--transition)}
.sidebar-overlay.active{opacity:1;pointer-events:all}
.sidebar-logo{font-size:2rem;font-weight:900;text-align:center;margin-bottom:2rem;background:linear-gradient(135deg,var(--orange),var(--orange-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sidebar-nav{display:flex;flex-direction:column;gap:.5rem}
.nav-item{display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;border-radius:var(--radius-sm);cursor:pointer;transition:var(--transition);color:var(--text-secondary);font-size:.95rem;border:1px solid transparent;background:transparent;width:100%;text-align:right;font-family:inherit}
.nav-item:hover{background:var(--bg-hover);color:#fff;border-color:var(--border)}
.nav-item.active{background:rgba(255,107,0,0.1);color:var(--orange);border-color:var(--orange-glow)}
.nav-item .icon{font-size:1.3rem;width:24px;text-align:center;flex-shrink:0}

/* HEADER */
.header{position:sticky;top:0;background:rgba(10,10,15,0.9);backdrop-filter:blur(20px);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);z-index:50}
.header-left{display:flex;align-items:center;gap:1rem}
.menu-btn{background:var(--bg-card);border:1px solid var(--border);color:#fff;padding:.6rem;border-radius:var(--radius-sm);cursor:pointer;font-size:1.3rem;display:flex;align-items:center;transition:var(--transition)}
.menu-btn:hover{background:var(--bg-hover);border-color:var(--orange)}
.header-title{font-size:1.1rem;font-weight:600}
.header-actions{display:flex;gap:.75rem;align-items:center}

/* BUTTONS */
.btn{padding:.65rem 1.5rem;border-radius:var(--radius-sm);border:1px solid transparent;cursor:pointer;font-weight:600;font-size:.9rem;transition:var(--transition);display:flex;align-items:center;gap:.5rem;font-family:inherit}
.btn-primary{background:linear-gradient(135deg,var(--orange),var(--orange-light));color:#fff}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 25px var(--orange-glow)}
.btn-danger{background:var(--red);color:#fff}.btn-success{background:var(--green);color:#000}
.btn-outline{background:transparent;border:1px solid var(--border);color:#fff}
.btn-outline:hover{border-color:var(--orange);background:rgba(255,107,0,0.05)}
.btn-sm{padding:.4rem 1rem;font-size:.8rem}

/* MAIN */
.main-content{margin-right:0;padding:2rem;min-height:calc(100vh - 70px);transition:var(--transition)}
@media(min-width:1024px){.sidebar{transform:translateX(0)}.main-content{margin-right:280px}.menu-btn{display:none}}
.page{display:none;animation:fadeIn .3s ease}.page.active{display:block}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

/* STATS */
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.25rem;margin-bottom:2rem}
.stat-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;transition:var(--transition);position:relative;overflow:hidden}
.stat-card:hover{border-color:var(--orange-glow);transform:translateY(-3px);box-shadow:var(--shadow)}
.stat-card .stat-icon{font-size:2rem;margin-bottom:.75rem}
.stat-card .stat-value{font-size:2rem;font-weight:800;color:var(--orange)}
.stat-card .stat-label{color:var(--text-secondary);margin-top:.25rem;font-size:.9rem}
.stat-card::after{content:'';position:absolute;top:-20px;right:-20px;width:80px;height:80px;background:var(--orange-glow);border-radius:50%;filter:blur(30px);opacity:.3}

/* CARD */
.card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:1.75rem;margin-bottom:1.5rem;transition:var(--transition)}
.card:hover{border-color:var(--orange-glow)}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid var(--border)}
.card-title{font-size:1.3rem;font-weight:700;display:flex;align-items:center;gap:.75rem}
.card-title .icon{font-size:1.5rem}

/* FORM */
.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}
input,select,textarea{width:100%;padding:.75rem 1rem;background:rgba(255,255,255,0.05);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-family:inherit;font-size:.9rem;transition:var(--transition)}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--orange);background:rgba(255,107,0,0.05)}

/* TABLE */
.table-container{overflow-x:auto}
table{width:100%;border-collapse:collapse;margin-top:1rem}
th,td{padding:.75rem 1rem;text-align:right;border-bottom:1px solid var(--border);font-size:.9rem}
th{color:var(--orange);font-weight:600;background:rgba(255,255,255,0.03)}
tr:hover{background:rgba(255,255,255,0.02)}
.actions{display:flex;gap:.5rem;flex-wrap:wrap}

/* MODAL */
.modal{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:1000;align-items:center;justify-content:center}
.modal.active{display:flex}
.modal-content{background:var(--bg-card);padding:2rem;border-radius:var(--radius);max-width:550px;width:90%;border:1px solid rgba(255,107,0,0.3);max-height:90vh;overflow-y:auto}
.modal-header{font-size:1.3rem;font-weight:700;margin-bottom:1.5rem;color:var(--orange)}

/* BADGE */
.badge{display:inline-block;padding:.25rem .75rem;border-radius:50px;font-size:.75rem;font-weight:600}
.badge-success{background:rgba(0,255,136,0.15);color:var(--green)}
.badge-danger{background:rgba(255,71,87,0.15);color:var(--red)}
.badge-warning{background:rgba(255,165,2,0.15);color:var(--yellow)}
.badge-info{background:rgba(55,66,250,0.15);color:var(--blue)}

/* TOAST */
.toast{position:fixed;bottom:2rem;left:2rem;background:var(--bg-card);border:1px solid var(--border);padding:1rem 2rem;border-radius:var(--radius-sm);z-index:2000;animation:slideIn .3s ease;font-size:.9rem}
@keyframes slideIn{from{transform:translateX(-100%);opacity:0}to{transform:translateX(0);opacity:1}}
.toast.success{border-color:var(--green)}.toast.error{border-color:var(--red)}

/* SPINNER */
.spinner{width:40px;height:40px;border:4px solid rgba(255,255,255,0.1);border-top-color:var(--orange);border-radius:50%;animation:spin 1s linear infinite;margin:2rem auto}
@keyframes spin{to{transform:rotate(360deg)}}

/* PROGRESS BAR */
.progress-bar{width:100%;height:8px;background:rgba(255,255,255,0.1);border-radius:4px;overflow:hidden;margin-top:.5rem}
.progress-fill{height:100%;border-radius:4px;transition:width .5s ease}
.progress-fill.low{background:var(--green)}.progress-fill.medium{background:var(--yellow)}.progress-fill.high{background:var(--red)}

/* TABS */
.tabs{display:flex;gap:.5rem;margin-bottom:1.5rem;flex-wrap:wrap}
.tab{padding:.6rem 1.5rem;border-radius:var(--radius-sm);cursor:pointer;transition:var(--transition);font-size:.9rem;border:1px solid var(--border);background:transparent;color:var(--text-secondary);font-family:inherit}
.tab:hover{background:var(--bg-hover);color:#fff}
.tab.active{background:rgba(255,107,0,0.1);color:var(--orange);border-color:var(--orange)}
</style>
</head>
<body>
<div id="app">
  <!-- SIDEBAR -->
  <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">⚡ Taakaa-Xi</div>
    <nav class="sidebar-nav">
      <button class="nav-item active" data-page="dashboard" onclick="navigateTo('dashboard')"><span class="icon">📊</span>داشبورد</button>
      <button class="nav-item" data-page="users" onclick="navigateTo('users')"><span class="icon">👥</span>کاربران</button>
      <button class="nav-item" data-page="scanner" onclick="navigateTo('scanner')"><span class="icon">📡</span>اسکنر آی‌پی</button>
      <button class="nav-item" data-page="locations" onclick="navigateTo('locations')"><span class="icon">🌍</span>لوکیشن‌ها</button>
      <button class="nav-item" data-page="subscription" onclick="navigateTo('subscription')"><span class="icon">📦</span>سابسکریپشن</button>
      <button class="nav-item" data-page="settings" onclick="navigateTo('settings')"><span class="icon">⚙️</span>تنظیمات</button>
      <button class="nav-item" data-page="backup" onclick="navigateTo('backup')"><span class="icon">💾</span>بکاپ</button>
    </nav>
  </aside>

  <!-- HEADER -->
  <header class="header">
    <div class="header-left">
      <button class="menu-btn" onclick="toggleSidebar()">☰</button>
      <span class="header-title" id="headerTitle">داشبورد</span>
    </div>
    <div class="header-actions">
      <button class="btn btn-outline btn-sm" onclick="navigateTo('settings')">⚙️ تنظیمات</button>
      <button class="btn btn-danger btn-sm" onclick="logout()">🚪 خروج</button>
    </div>
  </header>

  <!-- MAIN CONTENT -->
  <main class="main-content" id="mainContent">
    <!-- Login Page -->
    <div class="page active" id="page-login">
      <div class="card" style="max-width:450px;margin:4rem auto">
        <div class="card-header"><div class="card-title"><span class="icon">🔐</span>ورود به پنل</div></div>
        <div class="form-grid">
          <input type="password" id="loginPass" placeholder="رمز عبور ادمین">
          <button class="btn btn-primary" onclick="doLogin()">ورود به پنل</button>
        </div>
      </div>
    </div>

    <!-- Dashboard Page -->
    <div class="page" id="page-dashboard">
      <div class="stats-grid" id="statsGrid"></div>
      <div class="card">
        <div class="card-header"><div class="card-title"><span class="icon">👥</span>کاربران اخیر</div></div>
        <div class="table-container" id="recentUsers"></div>
      </div>
    </div>

    <!-- Users Page -->
    <div class="page" id="page-users">
      <div class="card">
        <div class="card-header"><div class="card-title"><span class="icon">➕</span>افزودن کاربر جدید</div></div>
        <div class="form-grid">
          <input type="text" id="uName" placeholder="نام کاربر *">
          <input type="text" id="uUUID" placeholder="UUID (اختیاری - خودکار)">
          <input type="text" id="uIP" placeholder="IP اختصاصی (اختیاری)">
          <input type="text" id="uDataLimit" placeholder="حجم کل (مثال: 5GB)">
          <input type="text" id="uDailyLimit" placeholder="حجم روزانه (مثال: 500MB)">
          <input type="text" id="uTimeLimit" placeholder="زمان (مثال: 1M)">
          <select id="uOperator">
            <option value="all">همه اپراتورها</option>
            <option value="mci">همراه اول</option>
            <option value="mtn">ایرانسل</option>
            <option value="rtl">رایتل</option>
          </select>
          <button class="btn btn-primary" onclick="addUser()">➕ افزودن کاربر</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title"><span class="icon">📋</span>لیست کاربران</div></div>
        <div class="table-container" id="usersTable"></div>
      </div>
    </div>

    <!-- Scanner Page -->
    <div class="page" id="page-scanner">
      <div class="card">
        <div class="card-header"><div class="card-title"><span class="icon">📡</span>اسکنر آی‌پی</div></div>
        <div class="form-grid">
          <select id="sOperator"><option value="all">همه</option><option value="mci">همراه اول</option><option value="mtn">ایرانسل</option><option value="rtl">رایتل</option></select>
          <select id="sCount"><option value="10">10</option><option value="20">20</option><option value="50">50</option></select>
          <button class="btn btn-primary" onclick="scanIPs()">🔍 اسکن سریع</button>
          <button class="btn btn-outline" onclick="scanRealIPs()">⚡ اسکن واقعی</button>
        </div>
        <div class="table-container" id="scanResults" style="margin-top:1rem"><p style="color:var(--text-secondary);text-align:center">برای شروع اسکن دکمه را بزنید</p></div>
      </div>
    </div>

    <!-- Locations Page -->
    <div class="page" id="page-locations">
      <div class="card">
        <div class="card-header"><div class="card-title"><span class="icon">🌍</span>انتخاب لوکیشن</div></div>
        <div class="stats-grid" id="locationsGrid"></div>
      </div>
    </div>

    <!-- Subscription Page -->
    <div class="page" id="page-subscription">
      <div class="card">
        <div class="card-header"><div class="card-title"><span class="icon">📦</span>سابسکریپشن</div></div>
        <div class="form-grid">
          <input type="text" id="subUUID" placeholder="UUID کاربر">
          <select id="subType"><option value="all">همه پروتکل‌ها</option><option value="vless">VLESS</option><option value="trojan">Trojan</option><option value="ss">Shadowsocks</option></select>
          <select id="subFormat"><option value="raw">Raw</option><option value="base64">Base64</option><option value="clash">Clash</option><option value="singbox">Sing-box</option></select>
          <button class="btn btn-primary" onclick="generateSub()">📦 دریافت سابسکریپشن</button>
        </div>
        <textarea id="subResult" style="margin-top:1rem;height:200px;direction:ltr;font-family:monospace" readonly placeholder="خروجی اینجا نمایش داده میشود..."></textarea>
      </div>
    </div>

    <!-- Settings Page -->
    <div class="page" id="page-settings">
      <div class="card">
        <div class="card-header"><div class="card-title"><span class="icon">⚙️</span>تنظیمات سیستم</div></div>
        <div class="form-grid">
          <input type="text" id="setUUID" placeholder="UUID سیستم">
          <input type="password" id="setPass" placeholder="رمز ادمین جدید">
          <input type="text" id="setSNI" placeholder="SNI (مثال: cloudflare.com)">
          <select id="setFP"><option value="chrome">Chrome</option><option value="firefox">Firefox</option><option value="safari">Safari</option><option value="random">Random</option><option value="ios">iOS</option><option value="android">Android</option></select>
          <button class="btn btn-primary" onclick="saveSettings()">💾 ذخیره تنظیمات</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title"><span class="icon">🛡️</span>تنظیمات Fragment</div></div>
        <div class="form-grid">
          <input type="text" id="fragSize" placeholder="Size (200-500)" value="200-500">
          <input type="text" id="fragCount" placeholder="Count (5-10)" value="5-10">
          <input type="text" id="fragDelay" placeholder="Delay (10-30)" value="10-30">
          <button class="btn btn-primary" onclick="saveFragmentSettings()">💾 ذخیره Fragment</button>
        </div>
      </div>
    </div>

    <!-- Backup Page -->
    <div class="page" id="page-backup">
      <div class="card">
        <div class="card-header"><div class="card-title"><span class="icon">💾</span>بکاپ و بازیابی</div></div>
        <div style="display:flex;gap:1rem;margin-bottom:1rem">
          <button class="btn btn-primary" onclick="downloadBackup()">📥 دانلود بکاپ</button>
          <button class="btn btn-outline" onclick="document.getElementById('restoreInput').click()">📤 بازیابی بکاپ</button>
        </div>
        <input type="file" id="restoreInput" style="display:none" onchange="restoreBackup(this.files[0])" accept=".json">
        <pre id="backupPreview" style="background:rgba(0,0,0,0.3);padding:1rem;border-radius:var(--radius-sm);max-height:400px;overflow:auto;direction:ltr;font-size:.8rem;display:none"></pre>
      </div>
    </div>
  </main>
</div>

<!-- Edit User Modal -->
<div class="modal" id="editModal">
  <div class="modal-content">
    <div class="modal-header">✏️ ویرایش کاربر</div>
    <div class="form-grid">
      <input type="text" id="eName" placeholder="نام">
      <input type="text" id="eDataLimit" placeholder="حجم کل">
      <input type="text" id="eDailyLimit" placeholder="حجم روزانه">
      <input type="text" id="eTimeLimit" placeholder="زمان">
      <input type="text" id="eIP" placeholder="IP اختصاصی">
    </div>
    <div style="display:flex;gap:1rem;margin-top:1rem">
      <button class="btn btn-success" onclick="saveEdit()">💾 ذخیره</button>
      <button class="btn btn-danger" onclick="closeEditModal()">❌ لغو</button>
    </div>
  </div>
</div>

<div id="toastContainer"></div>

<script>
// ============ GLOBAL STATE ============
let currentPage = 'login';
let editingUserId = null;
let allUsers = [];

// ============ NAVIGATION ============
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}

function navigateTo(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  const pageEl = document.getElementById('page-' + page);
  if (pageEl) pageEl.classList.add('active');
  
  const navEl = document.querySelector('[data-page="' + page + '"]');
  if (navEl) navEl.classList.add('active');
  
  document.getElementById('headerTitle').textContent = navEl ? navEl.textContent.trim() : page;
  
  // Load page data
  if (page === 'dashboard') loadDashboard();
  if (page === 'users') loadUsers();
  if (page === 'locations') loadLocations();
  
  // Close sidebar on mobile
  if (window.innerWidth < 1024) toggleSidebar();
}

// ============ TOAST ============
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = msg;
  document.getElementById('toastContainer').appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ============ AUTH ============
async function doLogin() {
  const pass = document.getElementById('loginPass').value;
  if (!pass) { showToast('رمز عبور را وارد کنید', 'error'); return; }
  
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pass })
    });
    const data = await res.json();
    if (data.success) {
      navigateTo('dashboard');
      showToast('خوش آمدید! ✅');
    } else {
      showToast('رمز عبور اشتباه است! ❌', 'error');
    }
  } catch (e) {
    showToast('خطا در ارتباط با سرور', 'error');
  }
}

async function logout() {
  await fetch('/api/logout', { method: 'POST' });
  navigateTo('login');
  document.getElementById('page-login').classList.add('active');
}

// ============ DASHBOARD ============
async function loadDashboard() {
  try {
    const res = await fetch('/api/stats');
    const stats = await res.json();
    
    document.getElementById('statsGrid').innerHTML = 
      '<div class="stat-card"><div class="stat-icon">👥</div><div class="stat-value">' + stats.totalUsers + '</div><div class="stat-label">کل کاربران</div></div>' +
      '<div class="stat-card"><div class="stat-icon">🟢</div><div class="stat-value">' + stats.activeUsers + '</div><div class="stat-label">فعال</div></div>' +
      '<div class="stat-card"><div class="stat-icon">📊</div><div class="stat-value">' + (stats.totalUsage / 1024).toFixed(2) + ' GB</div><div class="stat-label">مصرف کل</div></div>' +
      '<div class="stat-card"><div class="stat-icon">📅</div><div class="stat-value">' + ((stats.todayUsage || 0) / 1024).toFixed(2) + ' GB</div><div class="stat-label">مصرف امروز</div></div>';
    
    // Recent users
    const uRes = await fetch('/api/users');
    allUsers = await uRes.json();
    const recent = allUsers.slice(-5).reverse();
    let html = '<table><thead><tr><th>نام</th><th>UUID</th><th>مصرف</th><th>وضعیت</th></tr></thead><tbody>';
    recent.forEach(u => {
      const used = u.usedData || 0, limit = u.dataLimit || 0;
      html += '<tr><td>' + u.name + '</td><td><small>' + u.uuid.substring(0,12) + '...</small></td><td>' + used.toFixed(0) + 'MB / ' + (limit > 0 ? (limit/1024).toFixed(1) + 'GB' : '∞') + '</td><td>' + (u.active ? '<span class="badge badge-success">فعال</span>' : '<span class="badge badge-danger">غیرفعال</span>') + '</td></tr>';
    });
    html += '</tbody></table>';
    document.getElementById('recentUsers').innerHTML = html || '<p style="color:var(--text-secondary);text-align:center">کاربری یافت نشد</p>';
  } catch (e) {
    showToast('خطا در بارگذاری داشبورد', 'error');
  }
}

// ============ USERS ============
async function loadUsers() {
  try {
    const res = await fetch('/api/users');
    allUsers = await res.json();
    let html = '<table><thead><tr><th>نام</th><th>UUID</th><th>IP</th><th>حجم</th><th>مصرف</th><th>باقی‌مانده</th><th>زمان</th><th>اپراتور</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody>';
    allUsers.forEach(u => {
      const used = u.usedData || 0, limit = u.dataLimit || 0, remaining = limit > 0 ? limit - used : 0;
      const pct = limit > 0 ? (used / limit * 100).toFixed(1) : 0;
      const pctClass = pct > 80 ? 'high' : pct > 50 ? 'medium' : 'low';
      const opName = u.operator === 'mci' ? 'همراه اول' : u.operator === 'mtn' ? 'ایرانسل' : u.operator === 'rtl' ? 'رایتل' : 'همه';
      html += '<tr><td>' + u.name + '</td><td><small>' + u.uuid.substring(0,8) + '...</small></td><td>' + (u.ip || '-') + '</td><td>' + (limit > 0 ? (limit/1024).toFixed(1) + 'GB' : '∞') + '</td><td>' + used.toFixed(0) + 'MB (' + pct + '%)<div class="progress-bar"><div class="progress-fill ' + pctClass + '" style="width:' + Math.min(pct,100) + '%"></div></div></td><td>' + (limit > 0 ? remaining > 0 ? (remaining/1024).toFixed(1) + 'GB' : '<span class="badge badge-danger">تمام</span>' : '∞') + '</td><td>' + (u.timeLimit > 0 ? u.timeLimit + ' روز' : '∞') + '</td><td>' + opName + '</td><td>' + (u.active ? '<span class="badge badge-success">فعال</span>' : '<span class="badge badge-danger">غیرفعال</span>') + '</td><td class="actions"><button class="btn btn-outline btn-sm" onclick="editUser(\'' + u.id + '\')">✏️</button><button class="btn btn-danger btn-sm" onclick="deleteUser(\'' + u.id + '\')">🗑️</button><button class="btn btn-outline btn-sm" onclick="resetUser(\'' + u.id + '\')">🔄</button><button class="btn btn-outline btn-sm" onclick="toggleUser(\'' + u.id + '\',' + !u.active + ')">' + (u.active ? '🔴' : '🟢') + '</button><button class="btn btn-outline btn-sm" onclick="copyConfig(\'' + u.uuid + '\')">📋</button></td></tr>';
    });
    html += '</tbody></table>';
    document.getElementById('usersTable').innerHTML = html || '<p style="color:var(--text-secondary);text-align:center">کاربری یافت نشد</p>';
  } catch (e) {
    showToast('خطا در بارگذاری کاربران', 'error');
  }
}

async function addUser() {
  const data = {
    name: document.getElementById('uName').value,
    uuid: document.getElementById('uUUID').value,
    ip: document.getElementById('uIP').value,
    dataLimit: document.getElementById('uDataLimit').value,
    dailyLimit: document.getElementById('uDailyLimit').value,
    timeLimit: document.getElementById('uTimeLimit').value,
    operator: document.getElementById('uOperator').value
  };
  if (!data.name) { showToast('نام کاربر الزامی است', 'error'); return; }
  
  try {
    await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    showToast('کاربر با موفقیت افزوده شد ✅');
    loadUsers();
    ['uName','uUUID','uIP','uDataLimit','uDailyLimit','uTimeLimit'].forEach(id => document.getElementById(id).value = '');
  } catch (e) { showToast('خطا در افزودن کاربر', 'error'); }
}

function editUser(id) {
  editingUserId = id;
  const user = allUsers.find(u => u.id === id);
  if (!user) return;
  document.getElementById('eName').value = user.name;
  document.getElementById('eDataLimit').value = user.dataLimit > 0 ? (user.dataLimit / 1024).toFixed(0) + 'GB' : '';
  document.getElementById('eDailyLimit').value = '';
  document.getElementById('eTimeLimit').value = user.timeLimit > 0 ? user.timeLimit + 'd' : '';
  document.getElementById('eIP').value = user.ip || '';
  document.getElementById('editModal').classList.add('active');
}

async function saveEdit() {
  const data = {
    name: document.getElementById('eName').value,
    dataLimit: document.getElementById('eDataLimit').value,
    dailyLimit: document.getElementById('eDailyLimit').value,
    timeLimit: document.getElementById('eTimeLimit').value,
    ip: document.getElementById('eIP').value
  };
  try {
    await fetch('/api/users/' + editingUserId, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    showToast('کاربر با موفقیت ویرایش شد ✅');
    closeEditModal();
    loadUsers();
  } catch (e) { showToast('خطا در ویرایش کاربر', 'error'); }
}

function closeEditModal() { document.getElementById('editModal').classList.remove('active'); editingUserId = null; }

async function deleteUser(id) {
  if (!confirm('آیا از حذف این کاربر اطمینان دارید؟')) return;
  try {
    await fetch('/api/users/' + id, { method: 'DELETE' });
    showToast('کاربر حذف شد ✅');
    loadUsers();
  } catch (e) { showToast('خطا در حذف کاربر', 'error'); }
}

async function resetUser(id) {
  if (!confirm('مصرف کاربر صفر شود؟')) return;
  try {
    await fetch('/api/users/' + id + '/reset', { method: 'POST' });
    showToast('مصرف کاربر ریست شد ✅');
    loadUsers();
  } catch (e) { showToast('خطا در ریست مصرف', 'error'); }
}

async function toggleUser(id, active) {
  try {
    await fetch('/api/users/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active }) });
    showToast('وضعیت کاربر تغییر کرد ✅');
    loadUsers();
  } catch (e) { showToast('خطا در تغییر وضعیت', 'error'); }
}

function copyConfig(uuid) {
  const host = prompt('آدرس سرور:', '104.16.71.76');
  const port = prompt('پورت:', '443');
  if (!host || !port) return;
  fetch('/api/generate-config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ uuid, host, port, type: 'vless' }) })
    .then(r => r.json())
    .then(d => { navigator.clipboard.writeText(d.config); showToast('کانفیگ کپی شد! ✅'); });
}

// ============ SCANNER ============
async function scanIPs() {
  const op = document.getElementById('sOperator').value;
  const cnt = document.getElementById('sCount').value;
  document.getElementById('scanResults').innerHTML = '<div class="spinner"></div>';
  try {
    const res = await fetch('/api/ips?operator=' + op + '&count=' + cnt + '&sort=latency');
    const ips = await res.json();
    let html = '<table><thead><tr><th>#</th><th>IP</th><th>پورت‌ها</th><th>شهر</th><th>پینگ</th><th>اپراتور</th></tr></thead><tbody>';
    ips.forEach((item, i) => {
      const ports = Array.isArray(item.ports) ? item.ports.join(', ') : item.ports;
      const opName = item.operator === 'mci' ? 'همراه اول' : item.operator === 'mtn' ? 'ایرانسل' : item.operator === 'rtl' ? 'رایتل' : 'همه';
      const lat = item.latency || 0;
      const latClass = lat < 50 ? 'badge-success' : lat < 80 ? 'badge-warning' : 'badge-danger';
      html += '<tr><td>' + (i === 0 ? '⭐' : (i+1)) + '</td><td><strong>' + item.ip + '</strong></td><td>' + ports + '</td><td>' + (item.city || '-') + '</td><td><span class="badge ' + latClass + '">' + lat + 'ms</span></td><td>' + opName + '</td></tr>';
    });
    html += '</tbody></table>';
    document.getElementById('scanResults').innerHTML = html;
  } catch (e) { document.getElementById('scanResults').innerHTML = '<p style="color:var(--red);text-align:center">خطا در اسکن</p>'; }
}

async function scanRealIPs() {
  const op = document.getElementById('sOperator').value;
  document.getElementById('scanResults').innerHTML = '<div class="spinner"></div><p style="text-align:center;color:var(--text-secondary)">در حال اسکن واقعی... (ممکن است ۱۰-۳۰ ثانیه طول بکشد)</p>';
  try {
    const res = await fetch('/api/scan-ips?operator=' + op);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      let html = '<table><thead><tr><th>#</th><th>IP</th><th>پورت</th><th>پینگ واقعی</th></tr></thead><tbody>';
      data.results.forEach((item, i) => {
        html += '<tr><td>' + (i === 0 ? '⭐' : (i+1)) + '</td><td><strong>' + item.ip + '</strong></td><td>' + item.port + '</td><td><span class="badge ' + (item.latency < 100 ? 'badge-success' : item.latency < 200 ? 'badge-warning' : 'badge-danger') + '">' + item.latency + 'ms</span></td></tr>';
      });
      html += '</tbody></table>';
      document.getElementById('scanResults').innerHTML = html;
    } else {
      document.getElementById('scanResults').innerHTML = '<p style="color:var(--yellow);text-align:center">آی‌پی زنده‌ای یافت نشد</p>';
    }
  } catch (e) { document.getElementById('scanResults').innerHTML = '<p style="color:var(--red);text-align:center">خطا در اسکن</p>'; }
}

// ============ LOCATIONS ============
function loadLocations() {
  const locs = 'LOCATIONS_PLACEHOLDER';
  let html = '';
  try {
    const locations = JSON.parse(locs);
    locations.forEach(loc => {
      html += '<div class="stat-card" onclick="selectLocation(\'' + loc.code + '\',\'' + loc.name + '\',\'' + loc.ip + '\')" style="cursor:pointer"><div class="stat-icon">' + loc.flag + '</div><div class="stat-value">' + loc.name + '</div><div class="stat-label">' + loc.city + ' | ' + loc.ip + '</div></div>';
    });
  } catch (e) { html = '<p>خطا در بارگذاری لوکیشن‌ها</p>'; }
  document.getElementById('locationsGrid').innerHTML = html;
}

function selectLocation(code, name, ip) {
  showToast('📍 لوکیشن انتخاب شد: ' + name + ' (' + ip + ')');
}

// ============ SUBSCRIPTION ============
async function generateSub() {
  const uuid = document.getElementById('subUUID').value || 'UUID_MAIN';
  const type = document.getElementById('subType').value;
  const format = document.getElementById('subFormat').value;
  try {
    const res = await fetch('/sub/' + uuid + '?type=' + type + '&format=' + format);
    const text = await res.text();
    document.getElementById('subResult').value = text;
    showToast('سابسکریپشن دریافت شد ✅');
  } catch (e) { showToast('خطا در دریافت سابسکریپشن', 'error'); }
}

// ============ SETTINGS ============
async function saveSettings() {
  const data = {};
  if (document.getElementById('setUUID').value) data.UUID = document.getElementById('setUUID').value;
  if (document.getElementById('setPass').value) data.ADMIN_PASS = document.getElementById('setPass').value;
  if (document.getElementById('setSNI').value) data.SNI = document.getElementById('setSNI').value;
  if (document.getElementById('setFP').value) data.FINGERPRINT = document.getElementById('setFP').value;
  try {
    const res = await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await res.json();
    if (result.success) showToast('تنظیمات ذخیره شد ✅');
    else showToast('خطا در ذخیره تنظیمات', 'error');
  } catch (e) { showToast('خطا', 'error'); }
}

async function saveFragmentSettings() {
  const data = {
    FRAGMENT: {
      enabled: true,
      size: document.getElementById('fragSize').value || '200-500',
      count: document.getElementById('fragCount').value || '5-10',
      delay: document.getElementById('fragDelay').value || '10-30'
    }
  };
  try {
    await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    showToast('تنظیمات Fragment ذخیره شد ✅');
  } catch (e) { showToast('خطا', 'error'); }
}

// ============ BACKUP ============
async function downloadBackup() {
  try {
    const res = await fetch('/api/backup');
    const data = await res.json();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taakaa-xi-backup-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    showToast('بکاپ دانلود شد ✅');
  } catch (e) { showToast('خطا در دانلود بکاپ', 'error'); }
}

function restoreBackup(file) {
  if (!file) return;
  if (!confirm('آیا از بازیابی بکاپ اطمینان دارید؟ اطلاعات فعلی جایگزین می‌شود!')) return;
  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      const data = JSON.parse(e.target.result);
      const res = await fetch('/api/restore', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await res.json();
      if (result.success) { showToast('بکاپ با موفقیت بازیابی شد ✅'); loadDashboard(); }
      else showToast('خطا در بازیابی', 'error');
    } catch (err) { showToast('فایل نامعتبر است', 'error'); }
  };
  reader.readAsText(file);
}

// ============ INIT ============
// Check session on load
fetch('/api/stats').then(r => {
  if (r.ok) { navigateTo('dashboard'); loadDashboard(); }
}).catch(() => {});

// Keyboard shortcut for Enter on login
document.getElementById('loginPass').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') doLogin();
});
</script>
</body>
</html>`;
// ============================================
// 🔥 TAAKAA-XI ULTIMATE v7.0 - بخش ۵/۸
// 🌐 @TaaKaaOrg - صفحات جانبی
// ============================================

const HTML_SCANNER = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Taakaa-Xi | اسکنر آی‌پی</title><style>:root{--orange:#ff6b00;--bg:#0a0a0f;--bg-card:#1a1a2e;--text:#e0e0e0;--text-secondary:#888;--border:rgba(255,255,255,0.08);--radius:16px}*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Vazir','Tahoma',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;padding:2rem;background-image:radial-gradient(ellipse at top,rgba(255,107,0,0.08) 0%,transparent 70%)}.container{max-width:1200px;margin:0 auto}h1{color:var(--orange);text-align:center;margin-bottom:2rem;font-size:2.5rem}.controls{display:flex;gap:1rem;margin-bottom:2rem;flex-wrap:wrap;justify-content:center}select,button{padding:.75rem 1.5rem;border-radius:10px;border:1px solid var(--border);background:var(--bg-card);color:var(--text);font-size:1rem;font-family:inherit;cursor:pointer;transition:all .3s}button{background:var(--orange);border:none;font-weight:600}button:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(255,107,0,0.3)}.btn-real{background:transparent;border:1px solid var(--orange);color:var(--orange)}.results{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1rem}.ip-card{padding:1.5rem;background:var(--bg-card);border-radius:var(--radius);border:1px solid var(--border);cursor:pointer;transition:all .3s}.ip-card:hover{border-color:var(--orange);transform:translateY(-3px)}.ip-card.best{border-color:#0f0;background:rgba(0,255,0,0.05)}.ip-card .ip{font-size:1.2rem;font-weight:700;color:var(--orange)}.ip-card .meta{color:var(--text-secondary);margin-top:.5rem;font-size:.9rem}.ip-card .badge{display:inline-block;padding:.25rem .75rem;border-radius:50px;font-size:.75rem;margin-top:.5rem;margin-right:.5rem}.badge-op{background:rgba(255,107,0,0.2)}.badge-fast{background:rgba(0,255,136,0.2);color:#0f0}.badge-med{background:rgba(255,165,2,0.2);color:#ffa502}.badge-slow{background:rgba(255,71,87,0.2);color:#ff4757}.spinner{width:50px;height:50px;border:5px solid rgba(255,255,255,0.1);border-top-color:var(--orange);border-radius:50%;animation:spin 1s linear infinite;margin:2rem auto}@keyframes spin{to{transform:rotate(360deg)}}</style></head><body><div class="container"><h1>📡 اسکنر آی‌پی Taakaa-Xi</h1><div class="controls"><select id="operator"><option value="all">همه اپراتورها</option><option value="mci">همراه اول</option><option value="mtn">ایرانسل</option><option value="rtl">رایتل</option></select><select id="count"><option value="10">۱۰ آی‌پی</option><option value="20">۲۰ آی‌پی</option><option value="50">۵۰ آی‌پی</option></select><button onclick="scanIPs()">🔍 اسکن سریع</button><button class="btn-real" onclick="scanRealIPs()">⚡ اسکن واقعی</button></div><div id="status" style="text-align:center;color:var(--text-secondary);margin-bottom:1rem"></div><div class="results" id="results"><p style="text-align:center;color:var(--text-secondary);grid-column:1/-1">برای شروع اسکن، دکمه بالا را بزنید</p></div></div><script>function scanIPs(){let e=document.getElementById("operator").value,t=document.getElementById("count").value,n=document.getElementById("results"),a=document.getElementById("status");n.innerHTML='<div class="spinner" style="grid-column:1/-1"></div>',a.textContent="در حال دریافت لیست...",fetch("/api/ips?operator="+e+"&count="+t+"&sort=latency").then(e=>e.json()).then(e=>{let t="";e.forEach((e,n)=>{let a=Array.isArray(e.ports)?e.ports.join(", "):e.ports,s=e.latency||0,o=s<50?"badge-fast":s<80?"badge-med":"badge-slow",l=e.operator==="mci"?"همراه اول":e.operator==="mtn"?"ایرانسل":e.operator==="rtl"?"رایتل":"همه";t+='<div class="ip-card'+(0===n?" best":"")+'" onclick="copyIP(\''+e.ip+"','"+a+"')\"><div class=\"ip\">"+(0===n?"⭐ ":"")+e.ip+'</div><div class="meta">پورت‌ها: '+a+' | '+e.city+'</div><span class="badge badge-op">'+l+'</span><span class="badge '+o+'">'+s+"ms</span></div>"}),n.innerHTML=t,a.textContent=e.length+" آی‌پی یافت شد"}).catch(()=>{n.innerHTML='<p style="text-align:center;color:red;grid-column:1/-1">خطا!</p>',a.textContent=""})}function scanRealIPs(){let e=document.getElementById("operator").value,t=document.getElementById("results"),n=document.getElementById("status");t.innerHTML='<div class="spinner" style="grid-column:1/-1"></div>',n.textContent="در حال اسکن واقعی... (۱۰-۳۰ ثانیه)",fetch("/api/scan-ips?operator="+e).then(e=>e.json()).then(e=>{if(e.results&&e.results.length>0){let a="";e.results.forEach((e,n)=>{let s=e.latency||0,o=s<100?"badge-fast":s<200?"badge-med":"badge-slow";a+='<div class="ip-card'+(0===n?" best":"")+'" onclick="copyIP(\''+e.ip+"','"+e.port+"')\"><div class=\"ip\">"+(0===n?"⭐ ":"")+e.ip+'</div><div class="meta">پورت: '+e.port+'</div><span class="badge '+o+'">'+s+"ms</span></div>"}),t.innerHTML=a,n.textContent=e.results.length+" آی‌پی زنده یافت شد"}else t.innerHTML='<p style="text-align:center;color:#ffa502;grid-column:1/-1">آی‌پی زنده‌ای یافت نشد</p>',n.textContent=""}).catch(()=>{t.innerHTML='<p style="text-align:center;color:red;grid-column:1/-1">خطا!</p>',n.textContent=""})}function copyIP(e,t){navigator.clipboard.writeText(e+":"+t.split(",")[0]),alert("IP کپی شد: "+e)}</script></body></html>`;

const HTML_OWNERS = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | پشتیبان‌ها</title><style>body{font-family:'Vazir',sans-serif;background:#0a0a0f;color:#e0e0e0;text-align:center;padding:3rem}h1{color:#ff6b00}.owner{margin:2rem;padding:2rem;background:#1a1a2e;border-radius:16px;display:inline-block;border:1px solid rgba(255,255,255,0.08)}a{color:#ff6b00}</style></head><body><h1>👥 تیم پشتیبانی Taakaa-Xi</h1><div class="owner"><h2>تیم تاکا</h2><p>کانال تلگرام: <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p><p>🚀 ۳ ماه توسعه</p></div></body></html>`;

const HTML_FRAGMENT = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | Fragment</title><style>body{font-family:'Vazir',sans-serif;background:#0a0a0f;color:#e0e0e0;padding:3rem;max-width:800px;margin:0 auto}h1{color:#ff6b00}.info{background:#1a1a2e;padding:2rem;border-radius:16px;line-height:2;border:1px solid rgba(255,255,255,0.08)}code{background:rgba(255,107,0,0.2);padding:.2rem .5rem;border-radius:4px;color:#ff8533}</style></head><body><h1>🛡️ تکنیک Fragment</h1><div class="info"><p>Fragment یک تکنیک پیشرفته برای تکه‌تکه کردن بسته‌های TLS است که به دور زدن DPI کمک می‌کند.</p><p>پارامترها:</p><ul><li><code>size</code>: اندازه تکه‌ها (مثال: 200-500)</li><li><code>count</code>: تعداد تکه‌ها (مثال: 5-10)</li><li><code>delay</code>: تاخیر بین تکه‌ها (مثال: 10-30 میلی‌ثانیه)</li></ul></div></body></html>`;

const HTML_OFFLINE = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | راهنما</title><style>body{font-family:'Vazir',sans-serif;background:#0a0a0f;color:#e0e0e0;padding:3rem}h1{color:#ff6b00}.guide{background:#1a1a2e;padding:2rem;border-radius:16px;border:1px solid rgba(255,255,255,0.08)}h2{color:#ff8533;margin-top:1.5rem}</style></head><body><h1>📚 راهنمای اپراتورها</h1><div class="guide"><h2>همراه اول</h2><p>پورت‌های پیشنهادی: 443, 8443, 2083</p><h2>ایرانسل</h2><p>پورت‌های پیشنهادی: 443, 2083, 2087</p><h2>رایتل</h2><p>پورت‌های پیشنهادی: 443, 2096</p></div></body></html>`;

const HTML_LOCATION = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | لوکیشن</title><style>body{font-family:'Vazir',sans-serif;background:#0a0a0f;color:#e0e0e0;padding:3rem}h1{color:#ff6b00;text-align:center}.locations{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-top:2rem}.location{padding:2rem;background:#1a1a2e;border-radius:16px;cursor:pointer;transition:all .3s;text-align:center;border:1px solid rgba(255,255,255,0.08)}.location:hover{border-color:#ff6b00;transform:scale(1.05)}.flag{font-size:3rem}.name{font-size:1.1rem;font-weight:700;margin-top:.5rem}.city{color:#888;font-size:.9rem;margin-top:.25rem}</style></head><body><h1>🌍 انتخاب لوکیشن</h1><div class="locations" id="locs"></div><script>var locs='LOCATIONS_PLACEHOLDER';try{var locations=JSON.parse(locs);var html='';locations.forEach(function(l){html+='<div class="location" onclick="select(\''+l.name+'\',\''+l.ip+'\')"><div class="flag">'+l.flag+'</div><div class="name">'+l.name+'</div><div class="city">'+l.city+' | '+l.ip+'</div></div>'});document.getElementById('locs').innerHTML=html}catch(e){document.getElementById('locs').innerHTML='<p style="text-align:center;color:#888">خطا در بارگذاری لوکیشن‌ها</p>'}function select(n,i){alert('📍 '+n+' انتخاب شد!\\nIP: '+i)}</script></body></html>`;
// ============================================
// 🔥 TAAKAA-XI ULTIMATE v7.0 - بخش ۶/۸
// 🌐 @TaaKaaOrg - Main Worker Part 1
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
    
    // ============ LOAD CONFIG ============
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
    
    // ============ SETUP APIs ============
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
    
    // ============ SETUP PAGE ============
    if ((!hasKV || !hasPass) && (path === '/' || path === '' || path === '/setup')) {
      return new Response(HTML_SETUP, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    // ============ API AUTH MIDDLEWARE ============
    const isAPIRoute = path.startsWith('/api/');
    const isPublicAPI = ['login','check-kv','check-d1','check-pass','setup-pass','scan-ips'].includes(path.replace('/api/',''));
    
    if (isAPIRoute && !isPublicAPI) {
      const cookie = request.headers.get('Cookie') || '';
      const smatch = cookie.match(/session=([^;]+)/);
      if (!smatch || !(await sm.validate(smatch[1]))) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }
    
    // ============ API ROUTES ============
    if (path === '/api/login' && method === 'POST') {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (!sm.checkRateLimit(ip)) return new Response(JSON.stringify({ error: 'Too many attempts' }), { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      
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
    
    if (path === '/api/logout' && method === 'POST') {
      const cookie = request.headers.get('Cookie') || '';
      const smatch = cookie.match(/session=([^;]+)/);
      if (smatch) await sm.destroy(smatch[1]);
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Set-Cookie': 'session=; Path=/; Max-Age=0' } });
    }
    
    if (path === '/api/stats') {
      const stats = await um.getStats();
      return new Response(JSON.stringify(stats), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    if (path === '/api/users' && method === 'GET') {
      const users = await um.getAll();
      return new Response(JSON.stringify(users), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    if (path === '/api/users' && method === 'POST') {
      const data = await request.json();
      const user = await um.add(data);
      return new Response(JSON.stringify(user), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    if (path.match(/^\/api\/users\/([^\/]+)\/reset$/) && method === 'POST') {
      const userId = path.split('/')[3];
      const user = await um.resetUsage(userId);
      return new Response(JSON.stringify(user), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    if (path.match(/^\/api\/users\/([^\/]+)$/) && method === 'PUT') {
      const userId = path.split('/')[3];
      const data = await request.json();
      const user = await um.update(userId, data);
      return new Response(JSON.stringify(user), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    if (path.match(/^\/api\/users\/([^\/]+)$/) && method === 'DELETE') {
      const userId = path.split('/')[3];
      await um.delete(userId);
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    if (path === '/api/ips') {
      const operator = url.searchParams.get('operator') || 'all';
      const count = parseInt(url.searchParams.get('count') || '10');
      const sort = url.searchParams.get('sort');
      const ips = Helpers.getBestIPs(operator, count, sort === 'latency');
      return new Response(JSON.stringify(ips), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    if (path === '/api/scan-ips') {
      const operator = url.searchParams.get('operator') || 'all';
      const ips = Helpers.getBestIPs(operator, 10);
      const uniqueIPs = [...new Set(ips.map(i => i.ip))];
      const results = await IPScanner.scanBatch(uniqueIPs, ['443'], 5);
      return new Response(JSON.stringify({ results: results.slice(0, 20) }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    if (path === '/api/generate-config' && method === 'POST') {
      const data = await request.json();
      const config = Helpers.generateConfig(data.uuid || CONFIG.UUID, data.host || '104.16.71.76', data.port || '443', data.type || 'vless', data.settings || {});
      return new Response(JSON.stringify({ config }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    if (path === '/api/settings' && method === 'GET') {
      return new Response(JSON.stringify(CONFIG), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    if (path === '/api/settings' && method === 'POST') {
      const data = await request.json();
      Object.assign(CONFIG, data);
      if (env.KV) await env.KV.put('config', JSON.stringify(CONFIG));
      if (data.ADMIN_PASS && env.KV) await env.KV.put('admin_pass', data.ADMIN_PASS);
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    if (path === '/api/backup') {
      const backup = await um.backupData();
      return new Response(JSON.stringify(backup), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    if (path === '/api/restore' && method === 'POST') {
      try {
        const data = await request.json();
        const result = await um.restoreData(data);
        return new Response(JSON.stringify({ success: result }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
        }
    // ============================================
// 🔥 TAAKAA-XI ULTIMATE v7.0 - بخش ۷/۸
// 🌐 @TaaKaaOrg - Main Worker Part 2
// ============================================

    // ============ SUBSCRIPTION ============
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
          if (type === 'singbox') configs.push(Helpers.generateConfig(uuid, ip, port, 'singbox', { name: 'Taakaa-Xi-' + (user?.name || 'Main') }));
          if (type === 'clash') configs.push(Helpers.generateConfig(uuid, ip, port, 'clash', { name: 'Taakaa-Xi-' + (user?.name || 'Main') }));
        });
      });
      
      if (format === 'base64') return new Response(btoa(configs.join('\n')), { headers: { 'Content-Type': 'text/plain' } });
      
      if (format === 'clash' || format === 'singbox') {
        const isClash = format === 'clash';
        const cc = {
          proxies: ips.flatMap(({ ip, ports }) => 
            ports.map(port => ({
              name: `Taakaa-Xi-${ip}:${port}`,
              type: 'vless',
              server: ip,
              port: parseInt(port),
              uuid: uuid,
              network: 'ws',
              'ws-opts': { path: '/' },
              tls: true,
              'servername': CONFIG.SNI
            }))
          )
        };
        return new Response(JSON.stringify(isClash ? cc : { outbounds: cc.proxies }, null, 2), {
          headers: { 'Content-Type': isClash ? 'application/yaml' : 'application/json' }
        });
      }
      
      return new Response(configs.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    
    // ============ STATIC PAGES ============
    // Replace LOCATIONS placeholder
    const locsJSON = JSON.stringify(CONFIG.LOCATIONS);
    const htmlLocation = HTML_LOCATION.replace('LOCATIONS_PLACEHOLDER', locsJSON);
    const htmlAdmin = HTML_ADMIN.replace('LOCATIONS_PLACEHOLDER', locsJSON);
    
    if (path === '/' || path === '') return new Response(HTML_WELCOME, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/admin') return new Response(htmlAdmin, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/scanner') return new Response(HTML_SCANNER, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/owners') return new Response(HTML_OWNERS, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/fragment-info') return new Response(HTML_FRAGMENT, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/offline-support') return new Response(HTML_OFFLINE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/select-location') return new Response(htmlLocation, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    
    // ============ PROXY HANDLER ============
    return handleProxy(request, env, ctx);
  }
};
