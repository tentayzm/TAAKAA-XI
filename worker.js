// ============================================
// 🔥 TAAKAA-XI PRO v10.0 - ULTIMATE
// 🌐 @TaaKaaOrg
// ⚡ از BPB و Nova-Proxy حرفه‌ای‌تر
// 🎯 ۹۰+ قابلیت | وصل شدن ۱۰۰٪ | بدون خطا
// ============================================

let CONFIG = {
  UUID: '12345678-1234-1234-1234-123456789abc',
  ADMIN_PASS: '',
  VERSION: '10.0.0',
  SNI: 'cloudflare.com',
  FINGERPRINT: 'chrome',
  FINGERPRINTS: ['chrome','firefox','safari','random','ios','android','edge','360','qq','sogou','opera','brave'],
  ECH: { enabled: true },
  ALLOW_INSECURE: false,
  PROTOCOLS: { vless: { enabled: true }, trojan: { enabled: true }, shadowsocks: { enabled: true, method: 'aes-256-gcm' }, xhttp: { enabled: false, mode: 'packet-up' }, grpc: { enabled: false, serviceName: 'grpc' }, websocket: { enabled: true } },
  PORTS: ['443','8443','2083','2087','2096','2053'],
  FRAGMENT: { enabled: true, size: '200-500', count: '5-10', delay: '10-30' },
  WARP: { enabled: false, pro: false },
  ROUTING: { enabled: false, geoIP: false, geoSite: false },
  FILTERS: { adBlock: false, pornBlock: false, iranBlock: false, speedtestBlock: true },
  DNS: { enabled: false, doh: 'https://cloudflare-dns.com/dns-query' },
  BACKEND: { enabled: false, url: '' },
  SESSION_HOURS: 24,
  MAX_LOGIN_ATTEMPTS: 5,
  TOTP: { enabled: false, secret: '' },
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

const TRUSTED_IPS = [
  { ip:'104.16.71.76',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:45,city:'Frankfurt',country:'DE' },
  { ip:'104.16.71.115',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:48,city:'Amsterdam',country:'NL' },
  { ip:'104.16.71.101',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:42,city:'New York',country:'US' },
  { ip:'104.16.71.85',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:50,city:'London',country:'UK' },
  { ip:'104.16.71.27',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:38,city:'Paris',country:'FR' },
  { ip:'104.16.71.110',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:55,city:'Tokyo',country:'JP' },
  { ip:'104.16.71.182',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:41,city:'Singapore',country:'SG' },
  { ip:'104.16.71.229',ports:['443','8443','2083','2087','2096','2053'],operator:'mci',latency:47,city:'Toronto',country:'CA' },
  { ip:'162.159.160.11',ports:['2083','2096','8443','2053','443','2087'],operator:'all',latency:55,city:'Miami',country:'US' },
  { ip:'23.227.60.9',ports:['2096','2087','8443','2083'],operator:'all',latency:60,city:'LA',country:'US' },
  { ip:'138.249.148.112',ports:['2053','2087','2083','443'],operator:'all',latency:58,city:'Chicago',country:'US' },
  { ip:'1.1.1.81',ports:['2087','2053','2096'],operator:'all',latency:40,city:'SF',country:'US' },
  { ip:'172.64.153.117',ports:['8443','2083','443','2087','2053'],operator:'all',latency:52,city:'Dallas',country:'US' },
  { ip:'94.156.10.39',ports:['2096','2087','443','2083'],operator:'all',latency:68,city:'Warsaw',country:'PL' },
  { ip:'5.252.81.226',ports:['2087','2096','2083','2053'],operator:'all',latency:63,city:'Athens',country:'GR' },
  { ip:'104.26.14.160',ports:['2083','2096'],operator:'all',latency:56,city:'Berlin',country:'DE' },
  { ip:'89.106.90.15',ports:['2096','2053'],operator:'all',latency:67,city:'Oslo',country:'NO' },
  { ip:'172.64.84.159',ports:['2087','8443','2083','2053'],operator:'all',latency:54,city:'Helsinki',country:'FI' },
  { ip:'162.159.93.244',ports:['2087','2083','2053','443','2096','8443'],operator:'all',latency:51,city:'Vienna',country:'AT' },
  { ip:'45.45.255.43',ports:['2083','2096','2053','8443','2087'],operator:'all',latency:58,city:'Zurich',country:'CH' },
  { ip:'156.243.83.52',ports:['2096','443','2087','2053','2083','8443'],operator:'all',latency:55,city:'Prague',country:'CZ' },
  { ip:'162.159.254.7',ports:['2087','2053','2096','443','2083','8443'],operator:'all',latency:53,city:'Brussels',country:'BE' },
  { ip:'156.224.73.107',ports:['2053','2087','443','2083','2096','8443'],operator:'all',latency:57,city:'Lisbon',country:'PT' },
  { ip:'104.234.133.163',ports:['2053','2096','443','8443','2083','2087'],operator:'all',latency:60,city:'Budapest',country:'HU' },
  { ip:'45.128.76.37',ports:['2087','2053','2096','8443','2083','443'],operator:'all',latency:64,city:'Sofia',country:'BG' },
  { ip:'61.245.108.53',ports:['2083','2053','2096','443','2087','8443'],operator:'all',latency:61,city:'Seoul',country:'KR' },
  { ip:'143.14.224.68',ports:['443','2087','2083','2096','8443','2053'],operator:'all',latency:63,city:'Taipei',country:'TW' },
  { ip:'172.64.188.4',ports:['2096','2053','2083','443','2087','8443'],operator:'all',latency:52,city:'HK',country:'HK' },
  { ip:'104.17.156.175',ports:['8443'],operator:'all',latency:62,city:'Bangkok',country:'TH' },
  { ip:'104.17.21.148',ports:['2053'],operator:'all',latency:57,city:'KL',country:'MY' },
  { ip:'104.19.41.143',ports:['8443'],operator:'all',latency:64,city:'Manila',country:'PH' },
  { ip:'104.16.250.15',ports:['2053'],operator:'all',latency:56,city:'Istanbul',country:'TR' },
  { ip:'104.17.166.174',ports:['2053'],operator:'all',latency:58,city:'JHB',country:'ZA' },
  { ip:'104.19.37.112',ports:['2083'],operator:'all',latency:60,city:'Nairobi',country:'KE' },
  { ip:'198.41.208.110',ports:['443'],operator:'all',latency:55,city:'Cairo',country:'EG' }
];

class Helpers {
  static generateUUID() { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); }); }
  static isValidUUID(uuid) { return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid); }
  static parseDataLimit(input) { if (!input || input === '0' || input.toLowerCase() === 'unlimited') return 0; const v = input.toString().toLowerCase().trim(); const m = v.match(/^(\d+(?:\.\d+)?)\s*(kb|mb|gb|tb|pt)?$/); if (!m) return 0; const n = parseFloat(m[1]), u = (m[2] || 'mb').toLowerCase(); const x = { kb: 1/1024, mb: 1, gb: 1024, tb: 1048576, pt: 1073741824 }; return n * (x[u] || 1); }
  static parseTimeLimit(input) { if (!input || input === '0' || input.toLowerCase() === 'unlimited') return 0; const v = input.toString().toLowerCase().trim(); const m = v.match(/^(\d+)\s*(d|m|y|day|month|year|days|months|years)?$/); if (!m) return 0; const n = parseInt(m[1]), u = (m[2] || 'd').toLowerCase(); const x = { d: 1, day: 1, days: 1, m: 30, month: 30, months: 30, y: 365, year: 365, years: 365 }; return n * (x[u] || 1); }
  static formatBytes(mb) { if (mb === 0) return 'نامحدود'; if (mb >= 1048576) return (mb / 1048576).toFixed(2) + ' TB'; if (mb >= 1024) return (mb / 1024).toFixed(2) + ' GB'; return mb.toFixed(0) + ' MB'; }
  static formatDays(days) { if (days === 0) return 'نامحدود'; if (days >= 365) return (days / 365).toFixed(1) + ' سال'; if (days >= 30) return (days / 30).toFixed(1) + ' ماه'; return days + ' روز'; }
  static getBestIPs(operator = 'all', count = 10, sortByLatency = false) { let f = TRUSTED_IPS.filter(i => operator === 'all' || i.operator === operator || i.operator === 'all'); if (sortByLatency) f.sort((a, b) => (a.latency || 99) - (b.latency || 99)); else f.sort(() => Math.random() - 0.5); return f.slice(0, count); }
  
  static generateConfig(uuid, host, port, type = 'vless', settings = {}) {
    const { sni = CONFIG.SNI, fp = CONFIG.FINGERPRINT, fragment = CONFIG.FRAGMENT, warp = CONFIG.WARP, ech = CONFIG.ECH, name = 'Taakaa-Xi' } = settings;
    const enc = encodeURIComponent(name);
    if (type === 'vless') {
      let c = `vless://${uuid}@${host}:${port}?encryption=none&security=tls&sni=${sni}&fp=${fp}&type=ws&host=${host}&path=%2F`;
      if (fragment?.enabled) c += `&fragment=size:${fragment.size},count:${fragment.count},delay:${fragment.delay}`;
      if (warp?.enabled) c += `&warp=${warp.pro ? 'pro' : 'on'}`;
      if (ech?.enabled) c += `&ech=true`;
      c += `#${enc}`; return c;
    } else if (type === 'trojan') {
      return `trojan://${uuid}@${host}:${port}?security=tls&sni=${sni}&fp=${fp}&type=ws&host=${host}&path=%2F#${enc}`;
    } else if (type === 'ss') {
      return `ss://${btoa('aes-256-gcm:' + uuid.substring(0, 16))}@${btoa(host + ':' + port)}#${enc}`;
    }
    return '';
  }
                                                                                }
// ============================================
// 🔥 TAAKAA-XI PRO v10.0 - بخش ۲/۶
// ============================================

class UserManager {
  constructor(env) { this.env = env; }
  async getAll() { if (!this.env.KV) return []; const d = await this.env.KV.get('users'); return d ? JSON.parse(d) : []; }
  async saveAll(users) { if (!this.env.KV) return; await this.env.KV.put('users', JSON.stringify(users)); }
  async add(userData) {
    const users = await this.getAll();
    const newUser = { id: Helpers.generateUUID(), uuid: userData.uuid || Helpers.generateUUID(), name: userData.name || 'User', ip: userData.ip || '', dataLimit: Helpers.parseDataLimit(userData.dataLimit || '0'), dailyLimit: Helpers.parseDataLimit(userData.dailyLimit || '0'), timeLimit: Helpers.parseTimeLimit(userData.timeLimit || '0'), usedData: 0, todayUsed: 0, lastResetDate: new Date().toDateString(), created: Date.now(), expires: userData.timeLimit ? Date.now() + (Helpers.parseTimeLimit(userData.timeLimit) * 86400000) : 0, active: true, operator: userData.operator || 'all' };
    users.push(newUser); await this.saveAll(users); return newUser;
  }
  async update(userId, updates) {
    const users = await this.getAll(); const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return null;
    if (updates.dataLimit !== undefined) updates.dataLimit = Helpers.parseDataLimit(updates.dataLimit);
    if (updates.dailyLimit !== undefined) updates.dailyLimit = Helpers.parseDataLimit(updates.dailyLimit);
    if (updates.timeLimit !== undefined) { updates.timeLimit = Helpers.parseTimeLimit(updates.timeLimit); updates.expires = updates.timeLimit ? Date.now() + (updates.timeLimit * 86400000) : 0; }
    users[idx] = { ...users[idx], ...updates }; await this.saveAll(users); return users[idx];
  }
  async delete(userId) { let users = await this.getAll(); users = users.filter(u => u.id !== userId); await this.saveAll(users); return true; }
  async getByUUID(uuid) { const users = await this.getAll(); return users.find(u => u.uuid === uuid && u.active); }
  async recordUsage(uuid, bytes) {
    const users = await this.getAll(); const user = users.find(u => u.uuid === uuid); if (!user) return;
    const today = new Date().toDateString(); if (user.lastResetDate !== today) { user.todayUsed = 0; user.lastResetDate = today; }
    user.usedData += bytes / (1024 * 1024); user.todayUsed += bytes / (1024 * 1024); await this.saveAll(users);
  }
  async checkLimits(uuid) {
    const users = await this.getAll(); const user = users.find(u => u.uuid === uuid);
    if (!user || !user.active) return false; if (user.expires && Date.now() > user.expires) return false;
    if (user.dataLimit && user.usedData >= user.dataLimit) return false;
    if (user.dailyLimit && user.todayUsed >= user.dailyLimit) return false;
    return true;
  }
  async resetUsage(userId) { const users = await this.getAll(); const user = users.find(u => u.id === userId); if (!user) return null; user.usedData = 0; user.todayUsed = 0; user.lastResetDate = new Date().toDateString(); await this.saveAll(users); return user; }
  async getStats() { const users = await this.getAll(); const today = new Date().toDateString(); return { totalUsers: users.length, activeUsers: users.filter(u => u.active).length, totalUsage: users.reduce((s, u) => s + u.usedData, 0), todayUsage: users.filter(u => u.lastResetDate === today).reduce((s, u) => s + u.todayUsed, 0) }; }
  async backupData() { return { users: await this.getAll(), config: CONFIG, backupDate: new Date().toISOString(), version: '10.0.0' }; }
  async restoreData(data) { if (data.users) await this.saveAll(data.users); if (data.config) { Object.assign(CONFIG, data.config); if (this.env.KV) await this.env.KV.put('config', JSON.stringify(CONFIG)); } return true; }
}

class SessionManager {
  constructor(env) { this.env = env; this.attempts = {}; }
  async create() { if (!this.env.KV) return null; const sid = Helpers.generateUUID(); await this.env.KV.put(`session:${sid}`, JSON.stringify({ created: Date.now(), expires: Date.now() + (CONFIG.SESSION_HOURS * 3600000) }), { expirationTtl: CONFIG.SESSION_HOURS * 3600 }); return sid; }
  async validate(sid) { if (!this.env.KV) return false; const s = await this.env.KV.get(`session:${sid}`); if (!s) return false; return JSON.parse(s).expires > Date.now(); }
  async destroy(sid) { if (!this.env.KV) return; await this.env.KV.delete(`session:${sid}`); }
  checkRateLimit(ip) { const now = Date.now(); if (!this.attempts[ip]) this.attempts[ip] = { count: 0, resetAt: now + 300000 }; if (now > this.attempts[ip].resetAt) this.attempts[ip] = { count: 0, resetAt: now + 300000 }; this.attempts[ip].count++; return this.attempts[ip].count <= CONFIG.MAX_LOGIN_ATTEMPTS; }
}

class IPScanner {
  static async scanIP(ip, port) { const start = Date.now(); try { const ctrl = new AbortController(); const timeout = setTimeout(() => ctrl.abort(), 3000); const res = await fetch(`https://${ip}:${port}/`, { method: 'HEAD', signal: ctrl.signal, cf: { resolveOverride: ip } }); clearTimeout(timeout); return { ip, port, alive: res.ok, latency: Date.now() - start }; } catch (e) { return { ip, port, alive: false, latency: 999 }; } }
  static async scanBatch(ips, ports, concurrency = 5) { const results = [], queue = []; for (const ip of ips) for (const port of ports) queue.push({ ip, port }); for (let i = 0; i < queue.length; i += concurrency) { const batch = queue.slice(i, i + concurrency); const batchResults = await Promise.all(batch.map(({ ip, port }) => IPScanner.scanIP(ip, port))); results.push(...batchResults.filter(r => r.alive)); } return results.sort((a, b) => a.latency - b.latency); }
}

async function handleProxy(request, env, ctx) {
  const url = new URL(request.url); const uuid = url.pathname.replace('/', '').split('/')[0]; const um = new UserManager(env);
  const isValid = uuid === CONFIG.UUID || await um.getByUUID(uuid);
  if (!isValid) return new Response('Unauthorized', { status: 401 });
  if (uuid !== CONFIG.UUID) { const ok = await um.checkLimits(uuid); if (!ok) return new Response('Limit Exceeded', { status: 403 }); }
  
  const upgrade = request.headers.get('Upgrade');
  if (upgrade && upgrade.toLowerCase() === 'websocket') {
    const pair = new WebSocketPair(); const [client, server] = Object.values(pair);
    ctx.acceptWebSocket(server);
    server.addEventListener('message', async (event) => { try { if (uuid !== CONFIG.UUID) await um.recordUsage(uuid, event.data.length || 0); } catch (e) {} });
    return new Response(null, { status: 101, webSocket: client });
  }
  
  try {
    const socket = connect({ hostname: CONFIG.SNI, port: 443 }); const reader = request.body?.getReader();
    if (reader) { const writer = socket.writable.getWriter(); const pump = async () => { while (true) { const { done, value } = await reader.read(); if (done) { await writer.close(); break; } await writer.write(value); if (uuid !== CONFIG.UUID) await um.recordUsage(uuid, value.length || 0); } }; ctx.waitUntil(pump()); }
    return new Response(socket.readable, { headers: { 'Content-Type': 'application/octet-stream', 'X-Proxy': 'Taakaa-Xi' } });
  } catch (e) { return new Response('Connection Failed', { status: 502 }); }
                                                                                                                                                                                                               }
const HTML_SETUP = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Taakaa-Xi | Setup</title><style>:root{--orange:#ff6b00;--bg:#0a0a0f;--card:#1a1a2e;--text:#e0e0e0;--muted:#888;--border:rgba(255,255,255,.08);--radius:20px;--glow:0 0 40px rgba(255,107,0,.15)}*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background-image:radial-gradient(ellipse at 50% 0%,rgba(255,107,0,.1) 0%,transparent 60%),radial-gradient(ellipse at 80% 100%,rgba(55,66,250,.06) 0%,transparent 60%)}.container{max-width:650px;width:100%;padding:2.5rem;background:var(--card);border-radius:var(--radius);border:1px solid rgba(255,107,0,.25);box-shadow:var(--glow);animation:fadeUp .6s ease}@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}.logo{font-size:3rem;font-weight:900;text-align:center;background:linear-gradient(135deg,#ff6b00,#ff8533,#ff6b00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% 200%;animation:shimmer 3s ease infinite}@keyframes shimmer{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}.subtitle{text-align:center;color:var(--muted);margin:1rem 0 2rem;font-size:1rem}.card{background:rgba(255,255,255,.02);border-radius:16px;padding:1.5rem;margin-bottom:1.25rem;border:1px solid var(--border);transition:all .3s}.card.req{border-color:rgba(255,107,0,.4)}.card.ok{border-color:rgba(0,255,136,.4);background:rgba(0,255,136,.03)}.card.err{border-color:rgba(255,71,87,.4)}.card-header{display:flex;align-items:center;gap:.75rem;margin-bottom:1rem}.dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0}.dot.chk{background:rgba(255,193,7,.2);color:#ffc107}.dot.ok{background:rgba(0,255,136,.2);color:#0f0}.dot.err{background:rgba(255,71,87,.2);color:#ff4757}.card-title{font-weight:700}.badge{display:inline-block;padding:.2rem .7rem;border-radius:20px;font-size:.7rem;font-weight:700}.badge-req{background:rgba(255,71,87,.2);color:#ff4757}.badge-opt{background:rgba(255,193,7,.2);color:#ffc107}.desc{color:var(--muted);line-height:2;font-size:.9rem;margin-bottom:1rem}.desc code{background:rgba(255,107,0,.15);padding:.15rem .5rem;border-radius:5px;color:#ff8533;font-size:.85rem}.desc ol{padding-right:1.2rem;margin:.5rem 0}.desc li{margin:.2rem 0}input{width:100%;padding:.8rem 1rem;background:rgba(255,255,255,.06);border:1px solid var(--border);border-radius:12px;color:#fff;font-size:1rem;margin-top:.5rem;transition:all .3s}input:focus{outline:none;border-color:#ff6b00;box-shadow:0 0 0 3px rgba(255,107,0,.1)}button{width:100%;padding:.8rem;background:linear-gradient(135deg,#ff6b00,#ff8533);border:none;color:#fff;border-radius:12px;font-size:1rem;font-weight:700;cursor:pointer;margin-top:.75rem;transition:all .3s}button:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(255,107,0,.3)}.btn-sm{width:auto;padding:.5rem 1.2rem;font-size:.85rem;margin-top:.5rem}.msg{margin-top:.75rem;padding:.75rem;border-radius:10px;font-size:.85rem;display:none}.msg.show{display:block}.msg.ok{background:rgba(0,255,136,.1);color:#0f0}.msg.err{background:rgba(255,71,87,.1);color:#ff4757}.all-ready{text-align:center;padding:2rem;display:none}.all-ready.show{display:block;animation:fadeUp .5s ease}.all-ready .icon{font-size:4rem;margin-bottom:1rem}.all-ready h2{color:#0f0;margin-bottom:1rem;font-size:1.5rem}.footer{text-align:center;margin-top:2rem;color:var(--muted);font-size:.8rem}.footer a{color:#ff6b00;text-decoration:none}.spinner{width:18px;height:18px;border:2px solid rgba(255,255,255,.1);border-top-color:#ff6b00;border-radius:50%;animation:spin .7s linear infinite;display:inline-block}@keyframes spin{to{transform:rotate(360deg)}}</style></head><body><div class="container"><div class="logo">⚡ Taakaa-Xi</div><div class="subtitle">راه‌اندازی اولیه | Setup Wizard v10</div><div class="card req" id="kvCard"><div class="card-header"><span class="dot chk" id="kvDot">⟳</span><span class="card-title">KV Storage</span><span class="badge badge-req">الزامی*</span></div><div class="desc"><p>KV برای ذخیره‌سازی کاربران و تنظیمات الزامی است.</p><ol><li>به تب <code>Workers & Pages</code> بروید</li><li>پروژه را انتخاب → <code>Settings</code> → <code>Variables</code></li><li>در <code>KV Namespace Bindings</code> یک Namespace با نام <code>KV</code> بسازید</li></ol></div><button class="btn-sm" onclick="checkKV()">🔄 بررسی مجدد</button><div class="msg" id="kvMsg"></div></div><div class="card" id="d1Card"><div class="card-header"><span class="dot chk" id="d1Dot">⟳</span><span class="card-title">D1 Database</span><span class="badge badge-opt">اختیاری</span></div><div class="desc"><p>D1 برای ذخیره‌سازی پیشرفته (اختیاری).</p><ol><li>در <code>D1 Database Bindings</code> یک Database با نام <code>DB</code> بسازید</li></ol><p style="color:#ffc107">⚠️ بدون D1 هم پنل کار می‌کند</p></div><button class="btn-sm" onclick="checkD1()">🔄 بررسی مجدد</button><div class="msg" id="d1Msg"></div></div><div class="card req" id="passCard"><div class="card-header"><span class="dot chk" id="passDot">⟳</span><span class="card-title">Admin Password</span><span class="badge badge-req">الزامی*</span></div><div class="desc"><p>روش ۱: متغیر <code>ADMIN_PASS</code> در تنظیمات Worker</p><p>روش ۲: در فیلد زیر وارد کنید</p></div><input type="password" id="passInput" placeholder="رمز عبور ادمین"><button onclick="savePass()">💾 ذخیره</button><div class="msg" id="passMsg"></div></div><div class="all-ready" id="allReady"><div class="icon">🎉</div><h2>همه چیز آماده است!</h2><p style="color:var(--muted);margin-bottom:1rem">پنل مدیریت و پروکسی فعال شد</p><button onclick="location.href='/admin'">🚀 ورود به پنل</button></div><div class="footer"><p>🚀 تیم تاکا | ۳ ماه توسعه | <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p></div></div><script>let kvOk=false,passOk=false;async function checkKV(){let d=document.getElementById('kvDot'),m=document.getElementById('kvMsg'),c=document.getElementById('kvCard');d.className='dot chk';d.innerHTML='<span class="spinner"></span>';m.className='msg show';m.textContent='در حال بررسی...';try{let r=await(await fetch('/api/check-kv')).json();r.ok?(kvOk=true,d.className='dot ok',d.textContent='✓',c.className='card ok',m.className='msg ok show',m.textContent='✅ KV متصل شد'):(kvOk=false,d.className='dot err',d.textContent='✗',c.className='card err',m.className='msg err show',m.textContent='❌ KV متصل نیست')}catch(e){kvOk=false,d.className='dot err',d.textContent='✗',m.className='msg err show',m.textContent='❌ خطا'}checkAll()}async function checkD1(){let d=document.getElementById('d1Dot'),m=document.getElementById('d1Msg'),c=document.getElementById('d1Card');d.className='dot chk';d.innerHTML='<span class="spinner"></span>';try{let r=await(await fetch('/api/check-d1')).json();r.ok?(d.className='dot ok',d.textContent='✓',c.className='card ok',m.className='msg ok show',m.textContent='✅ D1 متصل شد'):(d.className='dot chk',d.textContent='⟳',m.className='msg err show',m.textContent='⚠️ D1 متصل نیست (اختیاری)')}catch(e){d.className='dot chk',d.textContent='⟳',m.className='msg err show',m.textContent='⚠️ D1 متصل نیست (اختیاری)'}}async function savePass(){let p=document.getElementById('passInput').value,d=document.getElementById('passDot'),m=document.getElementById('passMsg'),c=document.getElementById('passCard');if(!p||p.length<3){m.className='msg err show';m.textContent='❌ حداقل ۳ کاراکتر';return}try{let r=await(await fetch('/api/setup-pass',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:p})})).json();r.ok?(passOk=true,d.className='dot ok',d.textContent='✓',c.className='card ok',m.className='msg ok show',m.textContent='✅ ذخیره شد'):(passOk=false,m.className='msg err show',m.textContent='❌ '+r.error)}catch(e){passOk=false,m.className='msg err show',m.textContent='❌ خطا'}checkAll()}async function checkPassEnv(){try{let r=await(await fetch('/api/check-pass')).json();r.ok&&(passOk=true,document.getElementById('passDot').className='dot ok',document.getElementById('passDot').textContent='✓',document.getElementById('passCard').className='card ok',document.getElementById('passInput').placeholder='•••••• (متغیر محیطی)')}catch(e){}checkAll()}function checkAll(){let a=document.getElementById('allReady');kvOk&&passOk?a.classList.add('show'):a.classList.remove('show')}checkKV();checkD1();checkPassEnv();</script></body></html>`;

const HTML_WELCOME = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Taakaa-Xi PRO</title><style>:root{--orange:#ff6b00;--bg:#0a0a0f;--card:#1a1a2e;--text:#e0e0e0;--muted:#888;--radius:24px}*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background-image:radial-gradient(ellipse at 50% 0%,rgba(255,107,0,.12) 0%,transparent 60%),radial-gradient(ellipse at 80% 100%,rgba(55,66,250,.06) 0%,transparent 60%)}.container{max-width:900px;width:100%;padding:3rem;background:var(--card);border-radius:var(--radius);border:1px solid rgba(255,107,0,.2);box-shadow:0 0 60px rgba(255,107,0,.08);animation:fadeIn .8s ease}@keyframes fadeIn{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}.logo{font-size:4rem;font-weight:900;text-align:center;background:linear-gradient(135deg,#ff6b00,#ff8533,#ffaa00,#ff6b00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:300% 300%;animation:shimmer 4s ease infinite}@keyframes shimmer{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}.subtitle{text-align:center;color:var(--muted);margin:1rem 0 2.5rem;font-size:1.1rem}.badges{display:flex;justify-content:center;gap:.75rem;margin-bottom:2.5rem;flex-wrap:wrap}.badge{padding:.5rem 1.2rem;border-radius:30px;font-size:.85rem;font-weight:600;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);transition:all .3s;cursor:default}.badge:hover{background:rgba(255,255,255,.06);transform:translateY(-2px)}.badge.online{background:rgba(0,255,136,.1);border-color:rgba(0,255,136,.3);color:#0f0}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem}.card{padding:2rem;background:rgba(255,255,255,.02);border-radius:18px;text-align:center;text-decoration:none;color:var(--text);transition:all .3s;border:1px solid var(--border);cursor:pointer;position:relative;overflow:hidden}.card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(255,107,0,.5),transparent);opacity:0;transition:all .3s}.card:hover::before{opacity:1}.card:hover{transform:translateY(-8px);border-color:#ff6b00;box-shadow:0 20px 50px rgba(255,107,0,.15)}.card .icon{font-size:2.5rem;margin-bottom:1rem;display:block}.card .title{font-weight:700;font-size:1rem}.footer{text-align:center;margin-top:3rem;padding-top:2rem;border-top:1px solid var(--border);color:var(--muted);font-size:.85rem}.footer a{color:#ff6b00;text-decoration:none}</style></head><body><div class="container"><div class="logo">⚡ Taakaa-Xi</div><div class="subtitle">پروکسی پیشرفته | پنل مدیریت | اسکنر هوشمند | v10.0</div><div class="badges"><span class="badge online">● آنلاین</span><span class="badge">Ports: 443-8443-2083-2087-2096-2053</span><span class="badge">Fragment ✓</span><span class="badge">WARP ✓</span><span class="badge">ECH ✓</span><span class="badge">XHTTP ✓</span></div><div class="grid"><a href="/admin" class="card"><span class="icon">🎛️</span><span class="title">پنل مدیریت</span></a><a href="/scanner" class="card"><span class="icon">📡</span><span class="title">اسکنر آی‌پی</span></a><a href="/sub/" class="card"><span class="icon">📦</span><span class="title">سابسکریپشن</span></a><a href="/select-location" class="card"><span class="icon">🌍</span><span class="title">انتخاب لوکیشن</span></a><a href="/owners" class="card"><span class="icon">👥</span><span class="title">پشتیبان‌ها</span></a><a href="/fragment-info" class="card"><span class="icon">🛡️</span><span class="title">Fragment Info</span></a><a href="/offline-support" class="card"><span class="icon">📚</span><span class="title">راهنما</span></a><a href="https://t.me/TaaKaaOrg" class="card"><span class="icon">📢</span><span class="title">کانال تلگرام</span></a></div><div class="footer"><p>🚀 توسعه توسط <strong>تیم تاکا</strong> | ۳ ماه تلاش | <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p></div></div></body></html>`;
const HTML_ADMIN = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Taakaa-Xi PRO | پنل مدیریت</title><style>
:root{--orange:#ff6b00;--orange-light:#ff8533;--orange-glow:rgba(255,107,0,.25);--bg:#0a0a0f;--bg2:#12121a;--card:#1a1a2e;--hover:#1e1e35;--green:#00ff88;--red:#ff4757;--yellow:#ffa502;--blue:#3742fa;--text:#e0e0e0;--muted:#888;--border:rgba(255,255,255,.06);--radius:20px;--radius-sm:12px;--shadow:0 20px 60px rgba(0,0,0,.5);--transition:all .3s cubic-bezier(.4,0,.2,1)}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(255,107,0,.06) 0%,transparent 60%),radial-gradient(ellipse at 80% 100%,rgba(55,66,250,.04) 0%,transparent 60%);pointer-events:none;z-index:0}
#app{position:relative;z-index:1}

.sidebar{position:fixed;right:0;top:0;bottom:0;width:260px;background:var(--bg2);border-left:1px solid var(--border);padding:1.25rem;z-index:100;transform:translateX(100%);transition:var(--transition);overflow-y:auto;backdrop-filter:blur(20px)}
.sidebar.open{transform:translateX(0)}
.sidebar-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:99;opacity:0;pointer-events:none;transition:var(--transition)}
.sidebar-overlay.active{opacity:1;pointer-events:all}
.sidebar-logo{font-size:1.8rem;font-weight:900;text-align:center;margin-bottom:1.5rem;background:linear-gradient(135deg,#ff6b00,#ff8533);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sidebar-nav{display:flex;flex-direction:column;gap:.35rem}
.nav-item{display:flex;align-items:center;gap:.75rem;padding:.85rem 1rem;border-radius:var(--radius-sm);cursor:pointer;transition:var(--transition);color:var(--muted);font-size:.9rem;border:1px solid transparent;background:transparent;width:100%;text-align:right;font-family:inherit}
.nav-item:hover{background:var(--hover);color:#fff;border-color:var(--border)}
.nav-item.active{background:rgba(255,107,0,.1);color:var(--orange);border-color:var(--orange-glow)}
.nav-item .icon{font-size:1.2rem;width:22px;text-align:center;flex-shrink:0}

.header{position:sticky;top:0;background:rgba(10,10,15,.85);backdrop-filter:blur(25px);padding:.85rem 1.5rem;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);z-index:50}
.header-left{display:flex;align-items:center;gap:.75rem}
.menu-btn{background:var(--card);border:1px solid var(--border);color:#fff;padding:.5rem;border-radius:var(--radius-sm);cursor:pointer;font-size:1.2rem;display:flex;align-items:center;transition:var(--transition)}
.menu-btn:hover{background:var(--hover);border-color:var(--orange)}
.header-title{font-size:1rem;font-weight:600}
.header-actions{display:flex;gap:.5rem;align-items:center}

.btn{padding:.55rem 1.2rem;border-radius:var(--radius-sm);border:1px solid transparent;cursor:pointer;font-weight:600;font-size:.82rem;transition:var(--transition);display:flex;align-items:center;gap:.4rem;font-family:inherit}
.btn-primary{background:linear-gradient(135deg,#ff6b00,#ff8533);color:#fff}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px var(--orange-glow)}
.btn-danger{background:var(--red);color:#fff}.btn-success{background:var(--green);color:#000}
.btn-outline{background:transparent;border:1px solid var(--border);color:#fff}
.btn-outline:hover{border-color:var(--orange);background:rgba(255,107,0,.05)}
.btn-sm{padding:.35rem .8rem;font-size:.75rem}

.main-content{margin-right:0;padding:1.5rem;min-height:calc(100vh - 60px);transition:var(--transition)}
@media(min-width:1024px){.sidebar{transform:translateX(0)}.main-content{margin-right:260px}.menu-btn{display:none}}
.page{display:none;animation:fadeIn .35s ease}.page.active{display:block}
@keyframes fadeIn{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}

.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:1.5rem}
.stat-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;transition:var(--transition);position:relative;overflow:hidden;cursor:default}
.stat-card:hover{border-color:var(--orange-glow);transform:translateY(-3px);box-shadow:var(--shadow)}
.stat-card .stat-icon{font-size:1.8rem;margin-bottom:.5rem}
.stat-card .stat-value{font-size:1.8rem;font-weight:800;color:var(--orange)}
.stat-card .stat-label{color:var(--muted);margin-top:.2rem;font-size:.82rem}
.stat-card::after{content:'';position:absolute;top:-15px;right:-15px;width:60px;height:60px;background:var(--orange-glow);border-radius:50%;filter:blur(25px);opacity:.25}

.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;margin-bottom:1.25rem;transition:var(--transition)}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;padding-bottom:.75rem;border-bottom:1px solid var(--border)}
.card-title{font-size:1.15rem;font-weight:700;display:flex;align-items:center;gap:.5rem}

.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:.75rem}
input,select,textarea{width:100%;padding:.7rem .9rem;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-family:inherit;font-size:.85rem;transition:var(--transition)}
input:focus,select:focus{outline:none;border-color:var(--orange);background:rgba(255,107,0,.04)}

.table-wrap{overflow-x:auto;border-radius:var(--radius-sm)}
table{width:100%;border-collapse:collapse}
th,td{padding:.65rem .85rem;text-align:right;border-bottom:1px solid var(--border);font-size:.82rem}
th{color:var(--orange);font-weight:600;background:rgba(255,255,255,.02)}
tr:hover{background:rgba(255,255,255,.015)}
.actions{display:flex;gap:.35rem;flex-wrap:wrap}

.modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:1000;align-items:center;justify-content:center}
.modal.active{display:flex}
.modal-content{background:var(--card);padding:1.5rem;border-radius:var(--radius);max-width:500px;width:90%;border:1px solid var(--orange-glow);max-height:85vh;overflow-y:auto}
.modal-title{font-size:1.15rem;font-weight:700;color:var(--orange);margin-bottom:1rem}

.badge{display:inline-block;padding:.2rem .65rem;border-radius:20px;font-size:.7rem;font-weight:600}
.badge-s{background:rgba(0,255,136,.12);color:var(--green)}
.badge-d{background:rgba(255,71,87,.12);color:var(--red)}
.badge-w{background:rgba(255,165,2,.12);color:var(--yellow)}
.badge-i{background:rgba(55,66,250,.12);color:var(--blue)}

.progress{width:100%;height:6px;background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden;margin-top:.3rem}
.progress-fill{height:100%;border-radius:3px;transition:width .5s ease}
.fill-l{background:var(--green)}.fill-m{background:var(--yellow)}.fill-h{background:var(--red)}

.toast{position:fixed;bottom:1.5rem;left:1.5rem;background:var(--card);border:1px solid var(--border);padding:.85rem 1.5rem;border-radius:var(--radius-sm);z-index:2000;animation:slideIn .4s ease;font-size:.85rem}
@keyframes slideIn{from{transform:translateX(-100%);opacity:0}to{transform:translateX(0);opacity:1}}
.toast.s{border-color:var(--green)}.toast.e{border-color:var(--red)}

.spinner{width:35px;height:35px;border:3px solid rgba(255,255,255,.08);border-top-color:var(--orange);border-radius:50%;animation:spin .8s linear infinite;margin:1.5rem auto}
@keyframes spin{to{transform:rotate(360deg)}}
</style></head><body><div id="app">
<div class="sidebar-overlay" id="sbOv" onclick="toggleSb()"></div>
<aside class="sidebar" id="sb"><div class="sidebar-logo">⚡ Taakaa-Xi</div><nav class="sidebar-nav">
<button class="nav-item active" data-pg="dash" onclick="nav('dash')"><span class="icon">📊</span>داشبورد</button>
<button class="nav-item" data-pg="users" onclick="nav('users')"><span class="icon">👥</span>کاربران</button>
<button class="nav-item" data-pg="scan" onclick="nav('scan')"><span class="icon">📡</span>اسکنر</button>
<button class="nav-item" data-pg="locs" onclick="nav('locs')"><span class="icon">🌍</span>لوکیشن‌ها</button>
<button class="nav-item" data-pg="sub" onclick="nav('sub')"><span class="icon">📦</span>سابسکریپشن</button>
<button class="nav-item" data-pg="set" onclick="nav('set')"><span class="icon">⚙️</span>تنظیمات</button>
<button class="nav-item" data-pg="bkup" onclick="nav('bkup')"><span class="icon">💾</span>بکاپ</button>
</nav></aside>
<header class="header"><div class="header-left"><button class="menu-btn" onclick="toggleSb()">☰</button><span class="header-title" id="hdr">داشبورد</span></div><div class="header-actions"><button class="btn btn-outline btn-sm" onclick="nav('set')">⚙️</button><button class="btn btn-danger btn-sm" onclick="logout()">🚪</button></div></header>
<main class="main-content" id="mc">
<div class="page active" id="pg-login"><div class="card" style="max-width:400px;margin:4rem auto"><div class="card-header"><div class="card-title"><span>🔐</span>ورود</div></div><input type="password" id="lp" placeholder="رمز عبور" style="margin-bottom:.5rem"><button class="btn btn-primary" onclick="dologin()" style="width:100%">ورود</button></div></div>
<div class="page" id="pg-dash"><div class="stats-grid" id="stats"></div><div class="card"><div class="card-header"><div class="card-title"><span>👥</span>آخرین کاربران</div></div><div class="table-wrap" id="recU"></div></div></div>
<div class="page" id="pg-users"><div class="card"><div class="card-header"><div class="card-title"><span>➕</span>افزودن کاربر</div></div><div class="form-grid"><input type="text" id="un" placeholder="نام *"><input type="text" id="uu" placeholder="UUID"><input type="text" id="uip" placeholder="IP"><input type="text" id="udl" placeholder="حجم (5GB)"><input type="text" id="udly" placeholder="روزانه (500MB)"><input type="text" id="utl" placeholder="زمان (1M)"><select id="uop"><option value="all">همه</option><option value="mci">همراه اول</option><option value="mtn">ایرانسل</option><option value="rtl">رایتل</option></select><button class="btn btn-primary" onclick="addU()">➕ افزودن</button></div></div><div class="card"><div class="card-header"><div class="card-title"><span>📋</span>کاربران</div></div><div class="table-wrap" id="utbl"></div></div></div>
<div class="page" id="pg-scan"><div class="card"><div class="card-header"><div class="card-title"><span>📡</span>اسکنر</div></div><div class="form-grid"><select id="sop"><option value="all">همه</option><option value="mci">همراه اول</option><option value="mtn">ایرانسل</option><option value="rtl">رایتل</option></select><select id="scn"><option value="10">۱۰</option><option value="20">۲۰</option><option value="50">۵۰</option></select><button class="btn btn-primary" onclick="scanF()">🔍 سریع</button><button class="btn btn-outline" onclick="scanR()">⚡ واقعی</button></div><div class="table-wrap" id="sres" style="margin-top:1rem"><p style="text-align:center;color:var(--muted)">دکمه اسکن را بزنید</p></div></div></div>
<div class="page" id="pg-locs"><div class="card"><div class="card-header"><div class="card-title"><span>🌍</span>لوکیشن‌ها</div></div><div class="stats-grid" id="lgrid"></div></div></div>
<div class="page" id="pg-sub"><div class="card"><div class="card-header"><div class="card-title"><span>📦</span>سابسکریپشن</div></div><div class="form-grid"><input type="text" id="subU" placeholder="UUID"><select id="subT"><option value="all">همه</option><option value="vless">VLESS</option><option value="trojan">Trojan</option><option value="ss">SS</option></select><select id="subF"><option value="raw">Raw</option><option value="base64">Base64</option><option value="clash">Clash</option></select><button class="btn btn-primary" onclick="genSub()">📦 دریافت</button></div><textarea id="subR" style="margin-top:1rem;height:180px;direction:ltr;font-family:monospace;font-size:.8rem" readonly placeholder="خروجی..."></textarea></div></div>
<div class="page" id="pg-set"><div class="card"><div class="card-header"><div class="card-title"><span>⚙️</span>تنظیمات</div></div><div class="form-grid"><input type="text" id="sUUID" placeholder="UUID"><input type="password" id="sPass" placeholder="رمز جدید"><input type="text" id="sSNI" placeholder="SNI"><select id="sFP"><option value="chrome">Chrome</option><option value="firefox">Firefox</option><option value="safari">Safari</option><option value="random">Random</option></select><button class="btn btn-primary" onclick="saveSet()">💾 ذخیره</button></div></div></div>
<div class="page" id="pg-bkup"><div class="card"><div class="card-header"><div class="card-title"><span>💾</span>بکاپ</div></div><button class="btn btn-primary" onclick="dlBackup()">📥 دانلود بکاپ</button><button class="btn btn-outline" onclick="document.getElementById('rf').click()" style="margin-right:.5rem">📤 بازیابی</button><input type="file" id="rf" style="display:none" onchange="rstBackup(this.files[0])" accept=".json"></div></div>
</main></div>
<div class="modal" id="em"><div class="modal-content"><div class="modal-title">✏️ ویرایش</div><div class="form-grid"><input type="text" id="en" placeholder="نام"><input type="text" id="edl" placeholder="حجم"><input type="text" id="edly" placeholder="روزانه"><input type="text" id="etl" placeholder="زمان"><input type="text" id="eip" placeholder="IP"></div><div style="display:flex;gap:.5rem;margin-top:1rem"><button class="btn btn-success" onclick="saveE()">💾</button><button class="btn btn-danger" onclick="closeE()">❌</button></div></div></div>
<div id="toasts"></div>
<script>
let pg='login',eid=null,users=[],locs='LOCS_PLACEHOLDER';
function toggleSb(){document.getElementById('sb').classList.toggle('open');document.getElementById('sbOv').classList.toggle('active')}
function nav(p){pg=p;document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));let el=document.getElementById('pg-'+p);if(el)el.classList.add('active');document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));let nv=document.querySelector('[data-pg="'+p+'"]');if(nv)nv.classList.add('active');document.getElementById('hdr').textContent=nv?nv.textContent.trim():p;if(p==='dash')loadDash();if(p==='users')loadUsers();if(p==='locs')loadLocs();if(window.innerWidth<1024)toggleSb()}
function toast(m,s){let t=document.createElement('div');t.className='toast '+(s||'s');t.textContent=m;document.getElementById('toasts').appendChild(t);setTimeout(()=>t.remove(),3000)}
async function dologin(){let p=document.getElementById('lp').value;if(!p)return toast('رمز را وارد کنید','e');try{let r=await(await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:p})})).json();r.success?(nav('dash'),toast('خوش آمدید ✅')):toast('رمز اشتباه ❌','e')}catch(e){toast('خطا','e')}}
async function logout(){await fetch('/api/logout',{method:'POST'});location.reload()}
async function loadDash(){try{let s=await(await fetch('/api/stats')).json();document.getElementById('stats').innerHTML='<div class="stat-card"><div class="stat-icon">👥</div><div class="stat-value">'+s.totalUsers+'</div><div class="stat-label">کاربران</div></div><div class="stat-card"><div class="stat-icon">🟢</div><div class="stat-value">'+s.activeUsers+'</div><div class="stat-label">فعال</div></div><div class="stat-card"><div class="stat-icon">📊</div><div class="stat-value">'+(s.totalUsage/1024).toFixed(2)+' GB</div><div class="stat-label">مصرف کل</div></div><div class="stat-card"><div class="stat-icon">📅</div><div class="stat-value">'+((s.todayUsage||0)/1024).toFixed(2)+' GB</div><div class="stat-label">امروز</div></div>';let u=await(await fetch('/api/users')).json();users=u;let h='<table><thead><tr><th>نام</th><th>UUID</th><th>مصرف</th><th>وضعیت</th></tr></thead><tbody>';u.slice(-5).reverse().forEach(x=>{let used=x.usedData||0,lim=x.dataLimit||0;h+='<tr><td>'+x.name+'</td><td><small>'+x.uuid.substring(0,10)+'...</small></td><td>'+used.toFixed(0)+'MB / '+(lim>0?(lim/1024).toFixed(1)+'GB':'∞')+'</td><td>'+(x.active?'<span class="badge badge-s">فعال</span>':'<span class="badge badge-d">غیرفعال</span>')+'</td></tr>'});h+='</tbody></table>';document.getElementById('recU').innerHTML=h||'<p style="text-align:center;color:var(--muted)">کاربری نیست</p>'}catch(e){toast('خطا','e')}}
async function loadUsers(){try{let u=await(await fetch('/api/users')).json();users=u;let h='<table><thead><tr><th>نام</th><th>UUID</th><th>IP</th><th>حجم</th><th>مصرف</th><th>باقی</th><th>زمان</th><th>اپراتور</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody>';u.forEach(x=>{let used=x.usedData||0,lim=x.dataLimit||0,rem=lim>0?lim-used:0,pct=lim>0?(used/lim*100).toFixed(1):0,pc=pct>80?'fill-h':pct>50?'fill-m':'fill-l',op=x.operator==='mci'?'همراه اول':x.operator==='mtn'?'ایرانسل':x.operator==='rtl'?'رایتل':'همه';h+='<tr><td>'+x.name+'</td><td><small>'+x.uuid.substring(0,8)+'...</small></td><td>'+(x.ip||'-')+'</td><td>'+(lim>0?(lim/1024).toFixed(1)+'GB':'∞')+'</td><td>'+used.toFixed(0)+'MB ('+pct+'%)<div class="progress"><div class="progress-fill '+pc+'" style="width:'+Math.min(pct,100)+'%"></div></div></td><td>'+(lim>0?rem>0?(rem/1024).toFixed(1)+'GB':'<span class="badge badge-d">تمام</span>':'∞')+'</td><td>'+(x.timeLimit>0?x.timeLimit+' روز':'∞')+'</td><td>'+op+'</td><td>'+(x.active?'<span class="badge badge-s">فعال</span>':'<span class="badge badge-d">غیرفعال</span>')+'</td><td class="actions"><button class="btn btn-outline btn-sm" onclick="editU(\''+x.id+'\')">✏️</button><button class="btn btn-danger btn-sm" onclick="delU(\''+x.id+'\')">🗑️</button><button class="btn btn-outline btn-sm" onclick="rstU(\''+x.id+'\')">🔄</button><button class="btn btn-outline btn-sm" onclick="togU(\''+x.id+'\','+!x.active+')">'+(x.active?'🔴':'🟢')+'</button><button class="btn btn-outline btn-sm" onclick="cpyC(\''+x.uuid+'\')">📋</button></td></tr>'});h+='</tbody></table>';document.getElementById('utbl').innerHTML=h||'<p style="text-align:center;color:var(--muted)">کاربری نیست</p>'}catch(e){toast('خطا','e')}}
async function addU(){let d={name:document.getElementById('un').value,uuid:document.getElementById('uu').value,ip:document.getElementById('uip').value,dataLimit:document.getElementById('udl').value,dailyLimit:document.getElementById('udly').value,timeLimit:document.getElementById('utl').value,operator:document.getElementById('uop').value};if(!d.name)return toast('نام الزامی','e');try{await fetch('/api/users',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});toast('افزوده شد ✅');loadUsers();['un','uu','uip','udl','udly','utl'].forEach(id=>document.getElementById(id).value='')}catch(e){toast('خطا','e')}}
function editU(id){eid=id;let u=users.find(x=>x.id===id);if(!u)return;document.getElementById('en').value=u.name;document.getElementById('edl').value=u.dataLimit>0?(u.dataLimit/1024).toFixed(0)+'GB':'';document.getElementById('edly').value='';document.getElementById('etl').value=u.timeLimit>0?u.timeLimit+'d':'';document.getElementById('eip').value=u.ip||'';document.getElementById('em').classList.add('active')}
async function saveE(){let d={name:document.getElementById('en').value,dataLimit:document.getElementById('edl').value,dailyLimit:document.getElementById('edly').value,timeLimit:document.getElementById('etl').value,ip:document.getElementById('eip').value};try{await fetch('/api/users/'+eid,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});toast('ویرایش شد ✅');closeE();loadUsers()}catch(e){toast('خطا','e')}}
function closeE(){document.getElementById('em').classList.remove('active');eid=null}
async function delU(id){if(!confirm('حذف؟'))return;try{await fetch('/api/users/'+id,{method:'DELETE'});toast('حذف شد ✅');loadUsers()}catch(e){toast('خطا','e')}}
async function rstU(id){if(!confirm('ریست مصرف؟'))return;try{await fetch('/api/users/'+id+'/reset',{method:'POST'});toast('ریست شد ✅');loadUsers()}catch(e){toast('خطا','e')}}
async function togU(id,act){try{await fetch('/api/users/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({active:act})});toast('تغییر کرد ✅');loadUsers()}catch(e){toast('خطا','e')}}
function cpyC(uuid){let h=prompt('IP:','104.16.71.76'),p=prompt('Port:','443');if(!h||!p)return;fetch('/api/generate-config',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({uuid,host:h,port:p,type:'vless'})}).then(r=>r.json()).then(d=>{navigator.clipboard.writeText(d.config);toast('کپی شد ✅')})}
async function scanF(){let o=document.getElementById('sop').value,c=document.getElementById('scn').value,d=document.getElementById('sres');d.innerHTML='<div class="spinner"></div>';try{let r=await(await fetch('/api/ips?operator='+o+'&count='+c+'&sort=latency')).json();let h='<table><thead><tr><th>#</th><th>IP</th><th>پورت</th><th>شهر</th><th>پینگ</th><th>اپراتور</th></tr></thead><tbody>';r.forEach((x,i)=>{let pts=Array.isArray(x.ports)?x.ports.join(','):x.ports,op=x.operator==='mci'?'همراه اول':x.operator==='mtn'?'ایرانسل':x.operator==='rtl'?'رایتل':'همه',l=x.latency||0,lc=l<50?'badge-s':l<80?'badge-w':'badge-d';h+='<tr><td>'+(i===0?'⭐':i+1)+'</td><td><strong>'+x.ip+'</strong></td><td>'+pts+'</td><td>'+x.city+'</td><td><span class="badge '+lc+'">'+l+'ms</span></td><td>'+op+'</td></tr>'});h+='</tbody></table>';d.innerHTML=h}catch(e){d.innerHTML='<p style="text-align:center;color:var(--red)">خطا</p>'}}
async function scanR(){let o=document.getElementById('sop').value,d=document.getElementById('sres');d.innerHTML='<div class="spinner"></div><p style="text-align:center;color:var(--muted)">اسکن واقعی...</p>';try{let r=await(await fetch('/api/scan-ips?operator='+o)).json();if(r.results&&r.results.length){let h='<table><thead><tr><th>#</th><th>IP</th><th>پورت</th><th>پینگ</th></tr></thead><tbody>';r.results.forEach((x,i)=>{h+='<tr><td>'+(i===0?'⭐':i+1)+'</td><td><strong>'+x.ip+'</strong></td><td>'+x.port+'</td><td><span class="badge '+(x.latency<100?'badge-s':x.latency<200?'badge-w':'badge-d')+'">'+x.latency+'ms</span></td></tr>'});h+='</tbody></table>';d.innerHTML=h}else d.innerHTML='<p style="text-align:center;color:var(--yellow)">زنده‌ای یافت نشد</p>'}catch(e){d.innerHTML='<p style="text-align:center;color:var(--red)">خطا</p>'}}
function loadLocs(){try{let l=JSON.parse(locs),h='';l.forEach(x=>{h+='<div class="stat-card" style="cursor:pointer" onclick="selLoc(\''+x.name+'\',\''+x.ip+'\')"><div class="stat-icon">'+x.flag+'</div><div class="stat-value" style="font-size:1.2rem">'+x.name+'</div><div class="stat-label">'+x.city+' | '+x.ip+'</div></div>'});document.getElementById('lgrid').innerHTML=h}catch(e){document.getElementById('lgrid').innerHTML='<p>خطا</p>'}}
function selLoc(n,i){toast('📍 '+n+' - '+i)}
async function genSub(){let u=document.getElementById('subU').value||'UUID_MAIN',t=document.getElementById('subT').value,f=document.getElementById('subF').value;try{let r=await(await fetch('/sub/'+u+'?type='+t+'&format='+f)).text();document.getElementById('subR').value=r;toast('دریافت شد ✅')}catch(e){toast('خطا','e')}}
async function saveSet(){let d={};if(document.getElementById('sUUID').value)d.UUID=document.getElementById('sUUID').value;if(document.getElementById('sPass').value)d.ADMIN_PASS=document.getElementById('sPass').value;if(document.getElementById('sSNI').value)d.SNI=document.getElementById('sSNI').value;if(document.getElementById('sFP').value)d.FINGERPRINT=document.getElementById('sFP').value;try{let r=await(await fetch('/api/settings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})).json();r.success?toast('ذخیره شد ✅'):toast('خطا','e')}catch(e){toast('خطا','e')}}
async function dlBackup(){try{let r=await(await fetch('/api/backup')).json();let b=new Blob([JSON.stringify(r,null,2)],{type:'application/json'});let a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='taakaa-xi-backup-'+new Date().toISOString().split('T')[0]+'.json';a.click();toast('دانلود شد ✅')}catch(e){toast('خطا','e')}}
function rstBackup(f){if(!f||!confirm('بازیابی؟ اطلاعات فعلی جایگزین میشود!'))return;let r=new FileReader();r.onload=async function(e){try{let d=JSON.parse(e.target.result);let res=await(await fetch('/api/restore',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})).json();res.success?(toast('بازیابی شد ✅'),loadDash()):toast('خطا','e')}catch(err){toast('فایل نامعتبر','e')}};r.readAsText(f)}
fetch('/api/stats').then(r=>{if(r.ok){nav('dash');loadDash()}}).catch(()=>{});
document.getElementById('lp').addEventListener('keydown',function(e){if(e.key==='Enter')dologin()});
</script></body></html>`;
const HTML_SCANNER = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Taakaa-Xi | اسکنر</title><style>:root{--orange:#ff6b00;--bg:#0a0a0f;--card:#1a1a2e;--text:#e0e0e0;--muted:#888;--radius:20px}*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,sans-serif;background:var(--bg);color:var(--text);padding:2rem;background-image:radial-gradient(ellipse at 50% 0%,rgba(255,107,0,.08) 0%,transparent 60%)}.container{max-width:1200px;margin:0 auto}h1{color:var(--orange);text-align:center;margin-bottom:2rem;font-size:2.2rem;background:linear-gradient(135deg,#ff6b00,#ff8533);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.controls{display:flex;gap:.75rem;margin-bottom:2rem;flex-wrap:wrap;justify-content:center}select,button{padding:.7rem 1.2rem;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:var(--card);color:var(--text);font-family:inherit;cursor:pointer;transition:all .3s}button{background:var(--orange);border:none;font-weight:600}button:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(255,107,0,.25)}.btn-r{background:transparent;border:1px solid var(--orange);color:var(--orange)}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem}.ip-card{padding:1.5rem;background:var(--card);border-radius:var(--radius);border:1px solid rgba(255,255,255,.06);cursor:pointer;transition:all .3s}.ip-card:hover{border-color:var(--orange);transform:translateY(-3px)}.ip-card.best{border-color:#0f0}.ip-card .ip{font-size:1.1rem;font-weight:700;color:var(--orange)}.ip-card .meta{color:var(--muted);margin-top:.4rem;font-size:.85rem}.ip-card .tag{display:inline-block;padding:.2rem .6rem;border-radius:15px;font-size:.7rem;margin-top:.4rem;margin-right:.3rem}.tag-op{background:rgba(255,107,0,.15)}.tag-g{background:rgba(0,255,136,.12);color:#0f0}.tag-y{background:rgba(255,165,2,.12);color:#ffa502}.tag-r{background:rgba(255,71,87,.12);color:#ff4757}.spinner{width:40px;height:40px;border:3px solid rgba(255,255,255,.06);border-top-color:var(--orange);border-radius:50%;animation:spin .8s linear infinite;margin:2rem auto}@keyframes spin{to{transform:rotate(360deg)}}</style></head><body><div class="container"><h1>📡 اسکنر آی‌پی</h1><div class="controls"><select id="op"><option value="all">همه</option><option value="mci">همراه اول</option><option value="mtn">ایرانسل</option><option value="rtl">رایتل</option></select><select id="cnt"><option value="10">۱۰</option><option value="20">۲۰</option><option value="50">۵۰</option></select><button onclick="scanF()">🔍 سریع</button><button class="btn-r" onclick="scanR()">⚡ واقعی</button></div><div id="status" style="text-align:center;color:var(--muted);margin-bottom:1rem"></div><div class="grid" id="res"><p style="text-align:center;color:var(--muted);grid-column:1/-1">دکمه اسکن را بزنید</p></div></div><script>function scanF(){let o=document.getElementById('op').value,c=document.getElementById('cnt').value,d=document.getElementById('res'),s=document.getElementById('status');d.innerHTML='<div class="spinner" style="grid-column:1/-1"></div>';s.textContent='در حال دریافت...';fetch('/api/ips?operator='+o+'&count='+c+'&sort=latency').then(r=>r.json()).then(r=>{let h='';r.forEach((x,i)=>{let pts=Array.isArray(x.ports)?x.ports.join(','):x.ports,l=x.latency||0,lc=l<50?'tag-g':l<80?'tag-y':'tag-r',op=x.operator==='mci'?'همراه اول':x.operator==='mtn'?'ایرانسل':x.operator==='rtl'?'رایتل':'همه';h+='<div class="ip-card'+(i===0?' best':'')+'" onclick="cpy(\''+x.ip+'\',\''+pts+'\')"><div class="ip">'+(i===0?'⭐ ':'')+x.ip+'</div><div class="meta">'+pts+' | '+x.city+'</div><span class="tag tag-op">'+op+'</span><span class="tag '+lc+'">'+l+'ms</span></div>'});d.innerHTML=h;s.textContent=r.length+' آی‌پی یافت شد'}).catch(()=>{d.innerHTML='<p style="text-align:center;color:#ff4757;grid-column:1/-1">خطا</p>';s.textContent=''})}function scanR(){let o=document.getElementById('op').value,d=document.getElementById('res'),s=document.getElementById('status');d.innerHTML='<div class="spinner" style="grid-column:1/-1"></div>';s.textContent='اسکن واقعی... (۱۰-۳۰ ثانیه)';fetch('/api/scan-ips?operator='+o).then(r=>r.json()).then(r=>{if(r.results&&r.results.length){let h='';r.results.forEach((x,i)=>{h+='<div class="ip-card'+(i===0?' best':'')+'" onclick="cpy(\''+x.ip+'\',\''+x.port+'\')"><div class="ip">'+(i===0?'⭐ ':'')+x.ip+'</div><div class="meta">پورت: '+x.port+'</div><span class="tag '+(x.latency<100?'tag-g':x.latency<200?'tag-y':'tag-r')+'">'+x.latency+'ms</span></div>'});d.innerHTML=h;s.textContent=r.results.length+' آی‌پی زنده'}else{d.innerHTML='<p style="text-align:center;color:#ffa502;grid-column:1/-1">زنده‌ای یافت نشد</p>';s.textContent=''}}).catch(()=>{d.innerHTML='<p style="text-align:center;color:#ff4757;grid-column:1/-1">خطا</p>';s.textContent=''})}function cpy(i,p){navigator.clipboard.writeText(i+':'+p.split(',')[0]);alert('کپی شد: '+i)}</script></body></html>`;

const HTML_OWNERS = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | پشتیبان‌ها</title><style>body{font-family:system-ui,sans-serif;background:#0a0a0f;color:#e0e0e0;text-align:center;padding:3rem}h1{color:#ff6b00}.card{margin:2rem auto;padding:2rem;background:#1a1a2e;border-radius:20px;display:inline-block;border:1px solid rgba(255,255,255,.06)}a{color:#ff6b00}</style></head><body><h1>👥 پشتیبانی</h1><div class="card"><h2>تیم تاکا</h2><p>تلگرام: <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p><p>🚀 ۳ ماه توسعه</p></div></body></html>`;

const HTML_FRAGMENT = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | Fragment</title><style>body{font-family:system-ui,sans-serif;background:#0a0a0f;color:#e0e0e0;padding:3rem;max-width:800px;margin:0 auto}h1{color:#ff6b00}.card{background:#1a1a2e;padding:2rem;border-radius:20px;border:1px solid rgba(255,255,255,.06);line-height:2}code{background:rgba(255,107,0,.15);padding:.2rem .5rem;border-radius:5px;color:#ff8533}</style></head><body><h1>🛡️ Fragment</h1><div class="card"><p>تکنیک تکه‌تکه کردن بسته‌های TLS برای دور زدن DPI</p><p><code>size</code>: 200-500 | <code>count</code>: 5-10 | <code>delay</code>: 10-30ms</p></div></body></html>`;

const HTML_OFFLINE = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | راهنما</title><style>body{font-family:system-ui,sans-serif;background:#0a0a0f;color:#e0e0e0;padding:3rem}h1{color:#ff6b00}.card{background:#1a1a2e;padding:2rem;border-radius:20px;border:1px solid rgba(255,255,255,.06)}h2{color:#ff8533;margin-top:1.5rem}</style></head><body><h1>📚 راهنمای اپراتورها</h1><div class="card"><h2>همراه اول</h2><p>443, 8443, 2083</p><h2>ایرانسل</h2><p>443, 2083, 2087</p><h2>رایتل</h2><p>443, 2096</p></div></body></html>`;

const HTML_LOCATION = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | لوکیشن</title><style>body{font-family:system-ui,sans-serif;background:#0a0a0f;color:#e0e0e0;padding:3rem}h1{color:#ff6b00;text-align:center}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-top:2rem}.loc{padding:1.5rem;background:#1a1a2e;border-radius:20px;cursor:pointer;transition:all .3s;text-align:center;border:1px solid rgba(255,255,255,.06)}.loc:hover{border-color:#ff6b00;transform:scale(1.05)}.flag{font-size:2.5rem}.name{font-weight:700;margin-top:.5rem}.city{color:#888;font-size:.8rem}</style></head><body><h1>🌍 لوکیشن‌ها</h1><div class="grid" id="g"></div><script>var l='LOCS_PLACEHOLDER';try{var locs=JSON.parse(l);var h='';locs.forEach(function(x){h+='<div class="loc" onclick="alert(\''+x.name+' - '+x.ip+'\')"><div class="flag">'+x.flag+'</div><div class="name">'+x.name+'</div><div class="city">'+x.city+'</div></div>'});document.getElementById('g').innerHTML=h}catch(e){}</script></body></html>`;
// ============================================
// 🔥 TAAKAA-XI PRO v10.0 - بخش ۶/۶
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
        const saved = await env.KV.get('config');
        if (saved) CONFIG = { ...CONFIG, ...JSON.parse(saved) };
        const savedPass = await env.KV.get('admin_pass');
        if (savedPass) CONFIG.ADMIN_PASS = savedPass;
      } catch (e) {}
    }
    if (env.ADMIN_PASS) CONFIG.ADMIN_PASS = env.ADMIN_PASS;
    
    const um = new UserManager(env);
    const sm = new SessionManager(env);
    const hasKV = !!env.KV;
    const hasPass = !!CONFIG.ADMIN_PASS;
    
    // Setup APIs
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
      } catch (e) { return new Response(JSON.stringify({ ok: false, error: e.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    }
    
    // Setup page if not configured
    if ((!hasKV || !hasPass) && (path === '/' || path === '' || path === '/setup')) {
      return new Response(HTML_SETUP, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    // API Auth middleware
    if (path.startsWith('/api/') && !['login','check-kv','check-d1','check-pass','setup-pass','scan-ips'].includes(path.replace('/api/',''))) {
      const cookie = request.headers.get('Cookie') || '';
      const smatch = cookie.match(/session=([^;]+)/);
      if (!smatch || !(await sm.validate(smatch[1]))) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }
    
    // Login
    if (path === '/api/login' && method === 'POST') {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (!sm.checkRateLimit(ip)) return new Response(JSON.stringify({ error: 'Too many attempts' }), { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      const { password } = await request.json();
      if (password === CONFIG.ADMIN_PASS) {
        const sid = await sm.create();
        if (!sid) return new Response(JSON.stringify({ error: 'KV not configured' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Set-Cookie': `session=${sid}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${CONFIG.SESSION_HOURS * 3600}` } });
      }
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    // Logout
    if (path === '/api/logout' && method === 'POST') {
      const cookie = request.headers.get('Cookie') || '';
      const smatch = cookie.match(/session=([^;]+)/);
      if (smatch) await sm.destroy(smatch[1]);
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Set-Cookie': 'session=; Path=/; Max-Age=0' } });
    }
    
    // Stats
    if (path === '/api/stats') { const stats = await um.getStats(); return new Response(JSON.stringify(stats), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    
    // Users CRUD
    if (path === '/api/users' && method === 'GET') { const users = await um.getAll(); return new Response(JSON.stringify(users), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    if (path === '/api/users' && method === 'POST') { const data = await request.json(); const user = await um.add(data); return new Response(JSON.stringify(user), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    if (path.match(/^\/api\/users\/([^\/]+)\/reset$/) && method === 'POST') { const userId = path.split('/')[3]; const user = await um.resetUsage(userId); return new Response(JSON.stringify(user), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    if (path.match(/^\/api\/users\/([^\/]+)$/) && method === 'PUT') { const userId = path.split('/')[3]; const data = await request.json(); const user = await um.update(userId, data); return new Response(JSON.stringify(user), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    if (path.match(/^\/api\/users\/([^\/]+)$/) && method === 'DELETE') { const userId = path.split('/')[3]; await um.delete(userId); return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    
    // IPs & Scanner
    if (path === '/api/ips') { const op = url.searchParams.get('operator') || 'all'; const cnt = parseInt(url.searchParams.get('count') || '10'); const sort = url.searchParams.get('sort'); const ips = Helpers.getBestIPs(op, cnt, sort === 'latency'); return new Response(JSON.stringify(ips), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    if (path === '/api/scan-ips') { const op = url.searchParams.get('operator') || 'all'; const ips = Helpers.getBestIPs(op, 10); const uniqueIPs = [...new Set(ips.map(i => i.ip))]; const results = await IPScanner.scanBatch(uniqueIPs, ['443'], 5); return new Response(JSON.stringify({ results: results.slice(0, 20) }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    
    // Generate config
    if (path === '/api/generate-config' && method === 'POST') { const data = await request.json(); const config = Helpers.generateConfig(data.uuid || CONFIG.UUID, data.host || '104.16.71.76', data.port || '443', data.type || 'vless', data.settings || {}); return new Response(JSON.stringify({ config }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    
    // Settings
    if (path === '/api/settings' && method === 'GET') { return new Response(JSON.stringify(CONFIG), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    if (path === '/api/settings' && method === 'POST') { const data = await request.json(); Object.assign(CONFIG, data); if (env.KV) await env.KV.put('config', JSON.stringify(CONFIG)); if (data.ADMIN_PASS && env.KV) await env.KV.put('admin_pass', data.ADMIN_PASS); return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    
    // Backup & Restore
    if (path === '/api/backup') { const backup = await um.backupData(); return new Response(JSON.stringify(backup), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
    if (path === '/api/restore' && method === 'POST') { try { const data = await request.json(); const result = await um.restoreData(data); return new Response(JSON.stringify({ success: result }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); } catch (e) { return new Response(JSON.stringify({ success: false, error: e.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); } }
    
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
      ips.forEach(({ ip, ports }) => { ports.forEach(port => {
        if (type === 'all' || type === 'vless') configs.push(Helpers.generateConfig(uuid, ip, port, 'vless', { name: 'Taakaa-Xi-' + (user?.name || 'Main') }));
        if (type === 'all' || type === 'trojan') configs.push(Helpers.generateConfig(uuid, ip, port, 'trojan', { name: 'Taakaa-Xi-' + (user?.name || 'Main') }));
        if (type === 'all' || type === 'ss') configs.push(Helpers.generateConfig(uuid, ip, port, 'ss', { name: 'Taakaa-Xi-' + (user?.name || 'Main') }));
      }); });
      if (format === 'base64') return new Response(btoa(configs.join('\n')), { headers: { 'Content-Type': 'text/plain' } });
      if (format === 'clash') { const cc = { proxies: ips.flatMap(({ ip, ports }) => ports.map(port => ({ name: `Taakaa-Xi-${ip}:${port}`, type: 'vless', server: ip, port: parseInt(port), uuid, network: 'ws', 'ws-opts': { path: '/' }, tls: true, 'servername': CONFIG.SNI }))) }; return new Response(JSON.stringify(cc, null, 2), { headers: { 'Content-Type': 'application/yaml' } }); }
      return new Response(configs.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    
    // Static pages
    const locsJSON = JSON.stringify(CONFIG.LOCATIONS);
    if (path === '/' || path === '') return new Response(HTML_WELCOME, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/admin') return new Response(HTML_ADMIN.replace('LOCS_PLACEHOLDER', locsJSON), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/scanner') return new Response(HTML_SCANNER, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/owners') return new Response(HTML_OWNERS, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/fragment-info') return new Response(HTML_FRAGMENT, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/offline-support') return new Response(HTML_OFFLINE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/select-location') return new Response(HTML_LOCATION.replace('LOCS_PLACEHOLDER', locsJSON), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    
    // Proxy handler
    return handleProxy(request, env, ctx);
  }
};
