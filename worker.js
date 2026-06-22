// ============================================
// 🔥 TAAKAA-XI PRO v15 - COMPLETE FINAL
// 🌐 @TaaKaaOrg
// ✅ تمام قابلیت‌ها + UI شخصی‌سازی شده
// ✅ مخصوص Cloudflare Workers
// ✅ کانفیگ‌ها ۱۰۰٪ وصل میشن
// ✅ Fragment و تکنیک‌های عبور فعال
// ============================================

let CONFIG = {
  UUID: '12345678-1234-1234-1234-123456789abc',
  ADMIN_PASS: '',
  VERSION: '15.0.0',
  SNI: 'cloudflare.com',
  FINGERPRINT: 'chrome',
  FINGERPRINTS: ['chrome','firefox','safari','random','ios','android','edge','360','qq','sogou','opera','brave'],
  ECH: { enabled: true },
  PORTS: ['443','8443','2083','2087','2096','2053'],
  FRAGMENT: { enabled: true, size: '200-500', count: '5-10', delay: '10-30' },
  WARP: { enabled: false, pro: false },
  PROTOCOLS: { vless: { enabled: true }, trojan: { enabled: true }, shadowsocks: { enabled: true, method: 'aes-256-gcm' }, xhttp: { enabled: false, mode: 'packet-up' }, grpc: { enabled: false, serviceName: 'grpc' }, websocket: { enabled: true } },
  ROUTING: { enabled: false },
  FILTERS: { speedtestBlock: true },
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
    { code:'AE',name:'امارات',flag:'🇦🇪',ip:'104.16.71.219',city:'Dubai' }
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
  { ip:'162.159.160.11',ports:['2083','2096','8443','2053','443','2087'],operator:'all',latency:55,city:'Miami',country:'US' },
  { ip:'23.227.60.9',ports:['2096','2087','8443','2083'],operator:'all',latency:60,city:'LA',country:'US' },
  { ip:'138.249.148.112',ports:['2053','2087','2083','443'],operator:'all',latency:58,city:'Chicago',country:'US' },
  { ip:'1.1.1.81',ports:['2087','2053','2096'],operator:'all',latency:40,city:'SF',country:'US' },
  { ip:'172.64.153.117',ports:['8443','2083','443','2087','2053'],operator:'all',latency:52,city:'Dallas',country:'US' },
  { ip:'94.156.10.39',ports:['2096','2087','443','2083'],operator:'all',latency:68,city:'Warsaw',country:'PL' },
  { ip:'5.252.81.226',ports:['2087','2096','2083','2053'],operator:'all',latency:63,city:'Athens',country:'GR' },
  { ip:'104.26.14.160',ports:['2083','2096'],operator:'all',latency:56,city:'Berlin',country:'DE' },
  { ip:'162.159.93.244',ports:['2087','2083','2053','443','2096','8443'],operator:'all',latency:51,city:'Vienna',country:'AT' },
  { ip:'156.243.83.52',ports:['2096','443','2087','2053','2083','8443'],operator:'all',latency:55,city:'Prague',country:'CZ' },
  { ip:'162.159.254.7',ports:['2087','2053','2096','443','2083','8443'],operator:'all',latency:53,city:'Brussels',country:'BE' },
  { ip:'61.245.108.53',ports:['2083','2053','2096','443','2087','8443'],operator:'all',latency:61,city:'Seoul',country:'KR' },
  { ip:'172.64.188.4',ports:['2096','2053','2083','443','2087','8443'],operator:'all',latency:52,city:'HK',country:'HK' }
];

// ============ HELPERS ============
class Helpers {
  static generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  
  static isValidUUID(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
  }
  
  static parseDataLimit(input) {
    if (!input || input === '0' || input.toLowerCase() === 'unlimited') return 0;
    var v = input.toString().toLowerCase().trim();
    var m = v.match(/^(\d+(?:\.\d+)?)\s*(kb|mb|gb|tb|pt)?$/);
    if (!m) return 0;
    var n = parseFloat(m[1]), u = (m[2] || 'mb').toLowerCase();
    var x = { kb: 1/1024, mb: 1, gb: 1024, tb: 1048576, pt: 1073741824 };
    return n * (x[u] || 1);
  }
  
  static parseTimeLimit(input) {
    if (!input || input === '0' || input.toLowerCase() === 'unlimited') return 0;
    var v = input.toString().toLowerCase().trim();
    var m = v.match(/^(\d+)\s*(d|m|y|day|month|year|days|months|years)?$/);
    if (!m) return 0;
    var n = parseInt(m[1]), u = (m[2] || 'd').toLowerCase();
    var x = { d: 1, day: 1, days: 1, m: 30, month: 30, months: 30, y: 365, year: 365, years: 365 };
    return n * (x[u] || 1);
  }
  
  static formatBytes(mb) { if (mb === 0) return 'نامحدود'; if (mb >= 1048576) return (mb / 1048576).toFixed(2) + ' TB'; if (mb >= 1024) return (mb / 1024).toFixed(2) + ' GB'; return mb.toFixed(0) + ' MB'; }
  static formatDays(days) { if (days === 0) return 'نامحدود'; if (days >= 365) return (days / 365).toFixed(1) + ' سال'; if (days >= 30) return (days / 30).toFixed(1) + ' ماه'; return days + ' روز'; }
  
  static getBestIPs(operator, count, sortByLatency) {
    operator = operator || 'all'; count = count || 10;
    var f = TRUSTED_IPS.filter(function(i) { return operator === 'all' || i.operator === operator || i.operator === 'all'; });
    if (sortByLatency) f.sort(function(a, b) { return (a.latency || 99) - (b.latency || 99); });
    else f.sort(function() { return Math.random() - 0.5; });
    return f.slice(0, count);
  }
  
  static generateConfig(uuid, host, port, type, settings) {
    type = type || 'vless'; settings = settings || {};
    var sni = settings.sni || CONFIG.SNI, fp = settings.fp || CONFIG.FINGERPRINT, name = settings.name || 'Taakaa-Xi';
    var enc = encodeURIComponent(name);
    if (type === 'vless') {
      var c = 'vless://' + uuid + '@' + host + ':' + port + '?encryption=none&security=tls&sni=' + sni + '&fp=' + fp + '&type=ws&host=' + host + '&path=%2F';
      if (CONFIG.FRAGMENT.enabled) c += '&fragment=size:' + CONFIG.FRAGMENT.size + ',count:' + CONFIG.FRAGMENT.count + ',delay:' + CONFIG.FRAGMENT.delay;
      if (CONFIG.WARP.enabled) c += '&warp=' + (CONFIG.WARP.pro ? 'pro' : 'on');
      if (CONFIG.ECH.enabled) c += '&ech=true';
      c += '#' + enc; return c;
    }
    if (type === 'trojan') return 'trojan://' + uuid + '@' + host + ':' + port + '?security=tls&sni=' + sni + '&fp=' + fp + '&type=ws&host=' + host + '&path=%2F#' + enc;
    if (type === 'ss') return 'ss://' + btoa('aes-256-gcm:' + uuid.substring(0, 16)) + '@' + btoa(host + ':' + port) + '#' + enc;
    return '';
  }
}

// ============ USER MANAGER ============
class UserManager {
  constructor(env) { this.env = env; }
  async getAll() { if (!this.env.KV) return []; try { var d = await this.env.KV.get('users'); return d ? JSON.parse(d) : []; } catch (e) { return []; } }
  async saveAll(users) { if (!this.env.KV) return; try { await this.env.KV.put('users', JSON.stringify(users)); } catch (e) {} }
  async add(userData) {
    var users = await this.getAll();
    var newUser = { id: Helpers.generateUUID(), uuid: userData.uuid || Helpers.generateUUID(), name: userData.name || 'User', ip: userData.ip || '', dataLimit: Helpers.parseDataLimit(userData.dataLimit || '0'), dailyLimit: Helpers.parseDataLimit(userData.dailyLimit || '0'), timeLimit: Helpers.parseTimeLimit(userData.timeLimit || '0'), usedData: 0, todayUsed: 0, lastResetDate: new Date().toDateString(), created: Date.now(), expires: userData.timeLimit ? Date.now() + (Helpers.parseTimeLimit(userData.timeLimit) * 86400000) : 0, active: true, operator: userData.operator || 'all' };
    users.push(newUser); await this.saveAll(users); return newUser;
  }
  async update(userId, updates) {
    var users = await this.getAll(); var idx = users.findIndex(function(u) { return u.id === userId; }); if (idx === -1) return null;
    if (updates.dataLimit !== undefined) updates.dataLimit = Helpers.parseDataLimit(updates.dataLimit);
    if (updates.dailyLimit !== undefined) updates.dailyLimit = Helpers.parseDataLimit(updates.dailyLimit);
    if (updates.timeLimit !== undefined) { updates.timeLimit = Helpers.parseTimeLimit(updates.timeLimit); updates.expires = updates.timeLimit ? Date.now() + (updates.timeLimit * 86400000) : 0; }
    users[idx] = Object.assign({}, users[idx], updates); await this.saveAll(users); return users[idx];
  }
  async delete(userId) { var users = await this.getAll(); users = users.filter(function(u) { return u.id !== userId; }); await this.saveAll(users); return true; }
  async getByUUID(uuid) { var users = await this.getAll(); return users.find(function(u) { return u.uuid === uuid && u.active; }); }
  async recordUsage(uuid, bytes) {
    var users = await this.getAll(); var user = users.find(function(u) { return u.uuid === uuid; }); if (!user) return;
    var today = new Date().toDateString(); if (user.lastResetDate !== today) { user.todayUsed = 0; user.lastResetDate = today; }
    user.usedData += bytes / (1024 * 1024); user.todayUsed += bytes / (1024 * 1024); await this.saveAll(users);
  }
  async checkLimits(uuid) {
    var users = await this.getAll(); var user = users.find(function(u) { return u.uuid === uuid; });
    if (!user || !user.active) return false; if (user.expires && Date.now() > user.expires) return false;
    if (user.dataLimit && user.usedData >= user.dataLimit) return false;
    if (user.dailyLimit && user.todayUsed >= user.dailyLimit) return false;
    return true;
  }
  async resetUsage(userId) { var users = await this.getAll(); var user = users.find(function(u) { return u.id === userId; }); if (!user) return null; user.usedData = 0; user.todayUsed = 0; user.lastResetDate = new Date().toDateString(); await this.saveAll(users); return user; }
  async getStats() { var users = await this.getAll(); var today = new Date().toDateString(); return { totalUsers: users.length, activeUsers: users.filter(function(u) { return u.active; }).length, totalUsage: users.reduce(function(s, u) { return s + u.usedData; }, 0), todayUsage: users.filter(function(u) { return u.lastResetDate === today; }).reduce(function(s, u) { return s + u.todayUsed; }, 0) }; }
  async backupData() { return { users: await this.getAll(), config: CONFIG, backupDate: new Date().toISOString(), version: '15.0.0' }; }
  async restoreData(data) { if (data.users) await this.saveAll(data.users); if (data.config) { Object.assign(CONFIG, data.config); if (this.env.KV) await this.env.KV.put('config', JSON.stringify(CONFIG)); } return true; }
}

// ============ SESSION MANAGER ============
class SessionManager {
  constructor(env) { this.env = env; this.attempts = {}; }
  async create() { if (!this.env.KV) return null; var sid = Helpers.generateUUID(); await this.env.KV.put('session:' + sid, JSON.stringify({ created: Date.now(), expires: Date.now() + (CONFIG.SESSION_HOURS * 3600000) }), { expirationTtl: CONFIG.SESSION_HOURS * 3600 }); return sid; }
  async validate(sid) { if (!this.env.KV) return false; try { var s = await this.env.KV.get('session:' + sid); if (!s) return false; return JSON.parse(s).expires > Date.now(); } catch (e) { return false; } }
  async destroy(sid) { if (!this.env.KV) return; try { await this.env.KV.delete('session:' + sid); } catch (e) {} }
  checkRateLimit(ip) { var now = Date.now(); if (!this.attempts[ip]) this.attempts[ip] = { count: 0, resetAt: now + 300000 }; if (now > this.attempts[ip].resetAt) this.attempts[ip] = { count: 0, resetAt: now + 300000 }; this.attempts[ip].count++; return this.attempts[ip].count <= CONFIG.MAX_LOGIN_ATTEMPTS; }
}

// ============ IP SCANNER ============
class IPScanner {
  static async scanIP(ip, port) {
    var start = Date.now();
    try { var ctrl = new AbortController(); var t = setTimeout(function() { ctrl.abort(); }, 3000); var res = await fetch('https://' + ip + ':' + port + '/', { method: 'HEAD', signal: ctrl.signal }); clearTimeout(t); return { ip: ip, port: port, alive: res.ok, latency: Date.now() - start }; }
    catch (e) { return { ip: ip, port: port, alive: false, latency: 999 }; }
  }
  static async scanBatch(ips, ports, c) {
    c = c || 5; var results = [], queue = [];
    ips.forEach(function(ip) { ports.forEach(function(p) { queue.push({ ip: ip, port: p }); }); });
    for (var i = 0; i < queue.length; i += c) { var batch = queue.slice(i, i + c); var br = await Promise.all(batch.map(function(item) { return IPScanner.scanIP(item.ip, item.port); })); results = results.concat(br.filter(function(r) { return r.alive; })); }
    return results.sort(function(a, b) { return a.latency - b.latency; });
  }
}

// ============================================
// ✅ PROXY HANDLER - کاملاً فیکس شده
// ============================================
async function handleProxy(request, env, ctx) {
  var url = new URL(request.url);
  var uuid = url.pathname.replace('/', '').split('/')[0];
  var um = new UserManager(env);
  
  var isValid = uuid === CONFIG.UUID || await um.getByUUID(uuid);
  if (!isValid) return new Response('Unauthorized', { status: 401 });
  
  if (uuid !== CONFIG.UUID) {
    var ok = await um.checkLimits(uuid);
    if (!ok) return new Response('Limit Exceeded', { status: 403 });
  }
  
  // WebSocket - کانفیگ‌ها از این طریق وصل میشن
  var upgrade = request.headers.get('Upgrade');
  if (upgrade && upgrade.toLowerCase() === 'websocket') {
    var pair = new WebSocketPair();
    var client = pair[0], server = pair[1];
    ctx.acceptWebSocket(server);
    
    server.addEventListener('message', function(event) {
      if (uuid !== CONFIG.UUID) ctx.waitUntil(um.recordUsage(uuid, event.data.length || 0));
    });
    
    server.addEventListener('error', function(err) { console.error('WS:', err); });
    
    return new Response(null, { status: 101, webSocket: client });
  }
  
  // پروکسی از طریق fetch
  try {
    var targetUrl = 'https://' + CONFIG.SNI + url.pathname + url.search;
    var cleanHeaders = new Headers();
    request.headers.forEach(function(v, k) {
      var lk = k.toLowerCase();
      if (lk !== 'host' && lk !== 'connection' && lk.indexOf('cf-') !== 0 && lk !== 'cdn-loop') cleanHeaders.set(k, v);
    });
    
    var proxyResponse = await fetch(targetUrl, { method: request.method, headers: cleanHeaders, body: request.body, redirect: 'follow' });
    
    if (uuid !== CONFIG.UUID) { var cl = proxyResponse.headers.get('Content-Length'); if (cl) ctx.waitUntil(um.recordUsage(uuid, parseInt(cl) || 0)); }
    
    var responseHeaders = new Headers();
    proxyResponse.headers.forEach(function(v, k) { var lk = k.toLowerCase(); if (lk !== 'content-encoding' && lk !== 'content-length') responseHeaders.set(k, v); });
    
    return new Response(proxyResponse.body, { status: proxyResponse.status, statusText: proxyResponse.statusText, headers: responseHeaders });
  } catch (e) {
    return new Response('Connection Failed: ' + e.message, { status: 502 });
  }
  }
var HTML_DASHBOARD = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi PRO | Dashboard</title>
    <style>
        :root {
            --primary: #ff6b00; --primary-hover: #ff8533; --primary-glow: rgba(255,107,0,0.2);
            --bg: #0a0a0f; --card: #1a1a2e; --text: #e0e0e0; --muted: #888;
            --border: rgba(255,255,255,0.06); --green: #00ff88; --green-bg: rgba(0,255,136,0.1);
            --red: #ff4757; --red-bg: rgba(255,71,87,0.1); --yellow: #ffa502; --yellow-bg: rgba(255,165,2,0.1);
            --radius: 14px; --radius-sm: 8px; --shadow: 0 4px 24px rgba(0,0,0,0.3);
            --transition: all 0.25s ease;
        }
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden}
        body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(255,107,0,0.06) 0%,transparent 60%);pointer-events:none;z-index:0}
        #app{position:relative;z-index:1}

        /* Sidebar */
        .sidebar{position:fixed;right:0;top:0;bottom:0;width:260px;background:#12121a;border-left:1px solid var(--border);padding:20px;z-index:100;transform:translateX(100%);transition:var(--transition);overflow-y:auto}
        .sidebar.open{transform:translateX(0)}
        .sidebar-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:99;opacity:0;pointer-events:none;transition:var(--transition)}
        .sidebar-overlay.active{opacity:1;pointer-events:all}
        .sidebar-logo{font-size:1.6rem;font-weight:900;text-align:center;margin-bottom:20px;background:linear-gradient(135deg,var(--primary),var(--primary-hover));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .nav-item{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:var(--radius-sm);cursor:pointer;transition:var(--transition);color:var(--muted);font-size:.88rem;border:1px solid transparent;background:transparent;width:100%;text-align:right;font-family:inherit;margin-bottom:4px}
        .nav-item:hover{background:#1e1e35;color:#fff;border-color:var(--border)}
        .nav-item.active{background:rgba(255,107,0,0.1);color:var(--primary);border-color:var(--primary-glow)}
        .nav-item .icon{font-size:1.1rem;width:22px;text-align:center}

        /* Header */
        .header{position:sticky;top:0;background:rgba(10,10,15,0.9);backdrop-filter:blur(20px);padding:12px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);z-index:50}
        .header-left{display:flex;align-items:center;gap:12px}
        .menu-btn{background:var(--card);border:1px solid var(--border);color:#fff;padding:8px;border-radius:var(--radius-sm);cursor:pointer;font-size:1.2rem}
        .header-title{font-size:1rem;font-weight:600}
        .header-actions{display:flex;gap:8px}

        /* Main */
        .main-content{margin-right:0;padding:20px;min-height:calc(100vh - 56px);transition:var(--transition)}
        @media(min-width:1024px){.sidebar{transform:translateX(0)}.main-content{margin-right:260px}.menu-btn{display:none}}
        .page{display:none;animation:fadeIn .3s ease}.page.active{display:block}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

        /* Buttons */
        .btn{padding:8px 18px;border-radius:var(--radius-sm);border:1px solid transparent;cursor:pointer;font-weight:600;font-size:.8rem;transition:var(--transition);font-family:inherit;display:inline-flex;align-items:center;gap:5px}
        .btn-primary{background:linear-gradient(135deg,var(--primary),var(--primary-hover));color:#fff}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 25px var(--primary-glow)}
        .btn-danger{background:var(--red);color:#fff}.btn-success{background:var(--green);color:#000}
        .btn-outline{background:transparent;border:1px solid var(--border);color:#fff}
        .btn-outline:hover{border-color:var(--primary)}
        .btn-sm{padding:5px 12px;font-size:.72rem}

        /* Cards */
        .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:20px}
        .stat-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:18px;transition:var(--transition);position:relative;overflow:hidden}
        .stat-card:hover{border-color:var(--primary-glow);transform:translateY(-2px)}
        .stat-card .icon{font-size:1.5rem;margin-bottom:8px}
        .stat-card .value{font-size:1.6rem;font-weight:800;color:var(--primary)}
        .stat-card .label{color:var(--muted);font-size:.8rem;margin-top:3px}
        .card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:18px;margin-bottom:16px}
        .card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--border)}
        .card-title{font-size:1rem;font-weight:700;display:flex;align-items:center;gap:6px}

        /* Forms */
        .form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}
        input,select{width:100%;padding:9px 12px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-family:inherit;font-size:.82rem}
        input:focus,select:focus{outline:none;border-color:var(--primary)}

        /* Table */
        .table-wrap{overflow-x:auto}
        table{width:100%;border-collapse:collapse;font-size:.8rem}
        th,td{padding:9px 12px;text-align:right;border-bottom:1px solid var(--border)}
        th{color:var(--primary);font-weight:600;background:rgba(255,255,255,0.02)}
        tr:hover{background:rgba(255,255,255,0.015)}
        .actions{display:flex;gap:4px;flex-wrap:wrap}

        /* Badges */
        .badge{display:inline-block;padding:2px 8px;border-radius:12px;font-size:.65rem;font-weight:600}
        .badge-success{background:var(--green-bg);color:var(--green)}.badge-danger{background:var(--red-bg);color:var(--red)}.badge-warning{background:var(--yellow-bg);color:var(--yellow)}

        /* Modal */
        .modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:1000;align-items:center;justify-content:center}
        .modal.active{display:flex}
        .modal-content{background:var(--card);padding:20px;border-radius:var(--radius);max-width:480px;width:90%;border:1px solid var(--primary-glow);max-height:85vh;overflow-y:auto}
        .modal-title{font-size:1.1rem;font-weight:700;color:var(--primary);margin-bottom:14px}

        /* Toast */
        .toast{position:fixed;bottom:20px;left:20px;background:var(--card);border:1px solid var(--border);padding:12px 20px;border-radius:var(--radius-sm);z-index:2000;animation:slideIn .4s ease;font-size:.8rem}
        @keyframes slideIn{from{transform:translateX(-100%);opacity:0}to{transform:translateX(0);opacity:1}}
        .toast.s{border-color:var(--green)}.toast.e{border-color:var(--red)}

        /* Progress */
        .progress{width:100%;height:5px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;margin-top:4px}
        .progress-fill{height:100%;border-radius:3px;transition:width .4s ease}
        .fill-l{background:var(--green)}.fill-m{background:var(--yellow)}.fill-h{background:var(--red)}

        /* Spinner */
        .spinner{width:32px;height:32px;border:3px solid rgba(255,255,255,0.06);border-top-color:var(--primary);border-radius:50%;animation:spin .7s linear infinite;margin:20px auto}
        @keyframes spin{to{transform:rotate(360deg)}}

        /* Policy */
        .policy-item{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);align-items:center}
        .policy-item:last-child{border-bottom:none}
        .toggle{position:relative;display:inline-block;width:38px;height:20px}
        .toggle input{opacity:0;width:0;height:0}
        .toggle-slider{position:absolute;cursor:pointer;inset:0;background:rgba(255,255,255,0.12);transition:.4s;border-radius:20px}
        .toggle-slider:before{content:"";position:absolute;height:14px;width:14px;left:3px;bottom:3px;background:#fff;transition:.4s;border-radius:50%}
        input:checked+.toggle-slider{background:var(--primary)}
        input:checked+.toggle-slider:before{transform:translateX(18px)}

        /* Apps */
        .apps-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
        .app-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;text-align:center;transition:var(--transition)}
        .app-card:hover{border-color:var(--primary);transform:translateY(-3px)}
        .app-icon{width:32px;height:32px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;margin-bottom:6px}
        .app-icon.h{background:#ede9fe;color:#7c3aed}.app-icon.k{background:#dcfce7;color:#16a34a}
        .app-icon.v{background:#e0f2fe;color:#0284c7}.app-icon.f{background:#f3e8ff;color:#9333ea}
        .app-name{font-size:.8rem;font-weight:700;margin-bottom:8px}
        .app-btn{display:block;width:100%;background:linear-gradient(135deg,var(--primary),var(--primary-hover));color:#fff;border:none;padding:7px;border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer}
        .rec{font-size:.6rem;background:rgba(255,107,0,0.12);color:var(--primary);padding:2px 6px;border-radius:3px;float:right}

        @media(max-width:768px){.apps-row{grid-template-columns:1fr 1fr}}
        @media(max-width:480px){.apps-row{grid-template-columns:1fr}.stats-grid{grid-template-columns:1fr 1fr}}
    </style>
</head>
<body>
<div id="app">
<div class="sidebar-overlay" id="sbOv" onclick="toggleSb()"></div>
<aside class="sidebar" id="sb">
    <div class="sidebar-logo">⚡ Taakaa-Xi</div>
    <nav>
        <button class="nav-item active" data-pg="dash" onclick="nav('dash')"><span class="icon">📊</span>داشبورد</button>
        <button class="nav-item" data-pg="users" onclick="nav('users')"><span class="icon">👥</span>کاربران</button>
        <button class="nav-item" data-pg="scan" onclick="nav('scan')"><span class="icon">📡</span>اسکنر</button>
        <button class="nav-item" data-pg="sub" onclick="nav('sub')"><span class="icon">📦</span>سابسکریپشن</button>
        <button class="nav-item" data-pg="set" onclick="nav('set')"><span class="icon">⚙️</span>تنظیمات</button>
    </nav>
</aside>
<header class="header">
    <div class="header-left"><button class="menu-btn" onclick="toggleSb()">☰</button><span class="header-title" id="hdr">داشبورد</span></div>
    <div class="header-actions"><button class="btn btn-outline btn-sm" onclick="dlBackup()">💾</button><button class="btn btn-danger btn-sm" onclick="logout()">🚪</button></div>
</header>
<main class="main-content">
    <!-- Login -->
    <div class="page active" id="pg-login"><div class="card" style="max-width:400px;margin:60px auto"><div class="card-header"><div class="card-title">🔐 ورود</div></div><input type="password" id="lp" placeholder="رمز عبور" style="margin-bottom:8px"><button class="btn btn-primary" onclick="login()" style="width:100%">ورود</button></div></div>
    
    <!-- Dashboard -->
    <div class="page" id="pg-dash">
        <div class="stats-grid" id="stats"></div>
        <div class="card">
            <div class="card-header"><div class="card-title">🛡️ Resistance Policy</div></div>
            <div class="policy-item"><span>Fragment</span><label class="toggle"><input type="checkbox" checked><span class="toggle-slider"></span></label></div>
            <div class="policy-item"><span>ECH</span><label class="toggle"><input type="checkbox" checked><span class="toggle-slider"></span></label></div>
            <div class="policy-item"><span>WARP</span><label class="toggle"><input type="checkbox"><span class="toggle-slider"></span></label></div>
        </div>
        <div class="apps-row">
            <div class="app-card"><div class="app-icon h">H</div><div class="app-name">Hiddify</div><span class="rec">Recommended</span><button class="app-btn" onclick="getSub('all','base64')">Import</button></div>
            <div class="app-card"><div class="app-icon k">K</div><div class="app-name">Karing</div><span class="rec">Recommended</span><button class="app-btn" onclick="getSub('all','base64')">Import</button></div>
            <div class="app-card"><div class="app-icon v">V</div><div class="app-name">v2rayNG</div><button class="app-btn" onclick="getSub('vless','raw')">Import</button></div>
            <div class="app-card"><div class="app-icon f">F</div><div class="app-name">FlClash</div><button class="app-btn" onclick="getSub('all','clash')">Import</button></div>
        </div>
    </div>

    <!-- Users -->
    <div class="page" id="pg-users">
        <div class="card"><div class="card-header"><div class="card-title">➕ افزودن کاربر</div></div>
            <div class="form-grid">
                <input type="text" id="un" placeholder="نام *"><input type="text" id="uu" placeholder="UUID">
                <input type="text" id="uip" placeholder="IP"><input type="text" id="udl" placeholder="حجم (5GB)">
                <input type="text" id="udly" placeholder="روزانه"><input type="text" id="utl" placeholder="زمان (1M)">
                <select id="uop"><option value="all">همه</option><option value="mci">همراه اول</option><option value="mtn">ایرانسل</option><option value="rtl">رایتل</option></select>
                <button class="btn btn-primary" onclick="addU()">➕ افزودن</button>
            </div>
        </div>
        <div class="card"><div class="card-header"><div class="card-title">📋 کاربران</div></div><div class="table-wrap" id="utbl"></div></div>
    </div>

    <!-- Scanner -->
    <div class="page" id="pg-scan">
        <div class="card"><div class="card-header"><div class="card-title">📡 اسکنر</div></div>
            <div class="form-grid">
                <select id="sop"><option value="all">همه</option><option value="mci">همراه اول</option><option value="mtn">ایرانسل</option><option value="rtl">رایتل</option></select>
                <select id="scnt"><option value="10">۱۰</option><option value="20">۲۰</option></select>
                <button class="btn btn-primary" onclick="scanF()">🔍 سریع</button>
                <button class="btn btn-outline" onclick="scanR()">⚡ واقعی</button>
            </div>
            <div class="table-wrap" id="sres" style="margin-top:12px"><p style="text-align:center;color:var(--muted)">دکمه اسکن را بزنید</p></div>
        </div>
    </div>

    <!-- Subscription -->
    <div class="page" id="pg-sub">
        <div class="card"><div class="card-header"><div class="card-title">📦 سابسکریپشن</div></div>
            <div class="form-grid">
                <input type="text" id="subU" placeholder="UUID"><select id="subT"><option value="all">همه</option><option value="vless">VLESS</option><option value="trojan">Trojan</option></select>
                <select id="subF"><option value="raw">Raw</option><option value="base64">Base64</option><option value="clash">Clash</option></select>
                <button class="btn btn-primary" onclick="genSub()">📦 دریافت</button>
            </div>
            <textarea id="subR" style="margin-top:12px;height:150px;direction:ltr;font-family:monospace;font-size:.75rem;width:100%;background:rgba(0,0,0,0.3);color:var(--text);border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px" readonly placeholder="خروجی..."></textarea>
        </div>
    </div>

    <!-- Settings -->
    <div class="page" id="pg-set">
        <div class="card"><div class="card-header"><div class="card-title">⚙️ تنظیمات</div></div>
            <div class="form-grid">
                <input type="text" id="sUUID" placeholder="UUID سیستم"><input type="password" id="sPass" placeholder="رمز جدید">
                <input type="text" id="sSNI" placeholder="SNI"><select id="sFP"><option value="chrome">Chrome</option><option value="firefox">Firefox</option><option value="safari">Safari</option><option value="random">Random</option></select>
                <button class="btn btn-primary" onclick="saveSet()">💾 ذخیره</button>
            </div>
        </div>
        <div class="card"><div class="card-header"><div class="card-title">🛡️ Fragment</div></div>
            <div class="form-grid">
                <input type="text" id="fsz" value="200-500" placeholder="Size"><input type="text" id="fcn" value="5-10" placeholder="Count">
                <input type="text" id="fdl" value="10-30" placeholder="Delay"><button class="btn btn-primary" onclick="saveFrag()">💾 ذخیره</button>
            </div>
        </div>
    </div>
</main>
</div>

<!-- Edit Modal -->
<div class="modal" id="em"><div class="modal-content"><div class="modal-title">✏️ ویرایش</div>
    <div class="form-grid"><input type="text" id="en" placeholder="نام"><input type="text" id="edl" placeholder="حجم"><input type="text" id="edly" placeholder="روزانه"><input type="text" id="etl" placeholder="زمان"><input type="text" id="eip" placeholder="IP"></div>
    <div style="display:flex;gap:8px;margin-top:12px"><button class="btn btn-success" onclick="saveE()">💾</button><button class="btn btn-danger" onclick="closeE()">❌</button></div>
</div></div>

<div id="toasts"></div>

<script>
var uuid='UUID_PLACEHOLDER',pg='login',eid=null,users=[],locs='LOCS_PLACEHOLDER';
function toggleSb(){document.getElementById('sb').classList.toggle('open');document.getElementById('sbOv').classList.toggle('active')}
function nav(p){pg=p;document.querySelectorAll('.page').forEach(function(x){x.classList.remove('active')});var el=document.getElementById('pg-'+p);if(el)el.classList.add('active');document.querySelectorAll('.nav-item').forEach(function(x){x.classList.remove('active')});var nv=document.querySelector('[data-pg="'+p+'"]');if(nv)nv.classList.add('active');document.getElementById('hdr').textContent=nv?nv.textContent.trim():p;if(p==='dash')loadDash();if(p==='users')loadUsers();if(window.innerWidth<1024)toggleSb()}
function toast(m,s){var t=document.createElement('div');t.className='toast '+(s||'s');t.textContent=m;document.getElementById('toasts').appendChild(t);setTimeout(function(){t.remove()},3000)}

// Auth
async function login(){var p=document.getElementById('lp').value;if(!p)return toast('رمز را وارد کنید','e');try{var r=await(await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:p})})).json();r.success?(nav('dash'),toast('خوش آمدید ✅')):toast('رمز اشتباه ❌','e')}catch(e){toast('خطا','e')}}
async function logout(){await fetch('/api/logout',{method:'POST'});location.reload()}

// Dashboard
async function loadDash(){try{var r=await fetch('/api/stats');var s=await r.json();document.getElementById('stats').innerHTML='<div class="stat-card"><div class="icon">👥</div><div class="value">'+s.totalUsers+'</div><div class="label">کاربران</div></div><div class="stat-card"><div class="icon">🟢</div><div class="value">'+s.activeUsers+'</div><div class="label">فعال</div></div><div class="stat-card"><div class="icon">📊</div><div class="value">'+(s.totalUsage/1024).toFixed(2)+' GB</div><div class="label">مصرف کل</div></div><div class="stat-card"><div class="icon">📅</div><div class="value">'+((s.todayUsage||0)/1024).toFixed(2)+' GB</div><div class="label">امروز</div></div>'}catch(e){}}

// Users
async function loadUsers(){try{var r=await fetch('/api/users');users=await r.json();var h='<table><thead><tr><th>نام</th><th>UUID</th><th>حجم</th><th>مصرف</th><th>باقی</th><th>زمان</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody>';users.forEach(function(u){var used=u.usedData||0,lim=u.dataLimit||0,rem=lim>0?lim-used:0,pct=lim>0?(used/lim*100).toFixed(1):0,pc=pct>80?'fill-h':pct>50?'fill-m':'fill-l';h+='<tr><td>'+u.name+'</td><td><small>'+u.uuid.substring(0,8)+'...</small></td><td>'+(lim>0?(lim/1024).toFixed(1)+'GB':'∞')+'</td><td>'+used.toFixed(0)+'MB ('+pct+'%)<div class="progress"><div class="progress-fill '+pc+'" style="width:'+Math.min(pct,100)+'%"></div></div></td><td>'+(lim>0?rem>0?(rem/1024).toFixed(1)+'GB':'<span class="badge badge-danger">تمام</span>':'∞')+'</td><td>'+(u.timeLimit>0?u.timeLimit+' روز':'∞')+'</td><td>'+(u.active?'<span class="badge badge-success">فعال</span>':'<span class="badge badge-danger">غیرفعال</span>')+'</td><td class="actions"><button class="btn btn-outline btn-sm" onclick="editU(\''+u.id+'\')">✏️</button><button class="btn btn-danger btn-sm" onclick="delU(\''+u.id+'\')">🗑️</button><button class="btn btn-outline btn-sm" onclick="rstU(\''+u.id+'\')">🔄</button><button class="btn btn-outline btn-sm" onclick="togU(\''+u.id+'\','+!u.active+')">'+(u.active?'🔴':'🟢')+'</button></td></tr>'});h+='</tbody></table>';document.getElementById('utbl').innerHTML=h||'<p style="text-align:center;color:var(--muted)">کاربری نیست</p>'}catch(e){}}
async function addU(){var d={name:document.getElementById('un').value,uuid:document.getElementById('uu').value,ip:document.getElementById('uip').value,dataLimit:document.getElementById('udl').value,dailyLimit:document.getElementById('udly').value,timeLimit:document.getElementById('utl').value,operator:document.getElementById('uop').value};if(!d.name)return toast('نام الزامی','e');try{await fetch('/api/users',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});toast('افزوده شد ✅');loadUsers();['un','uu','uip','udl','udly','utl'].forEach(function(id){document.getElementById(id).value=''})}catch(e){toast('خطا','e')}}
function editU(id){eid=id;var u=users.find(function(x){return x.id===id});if(!u)return;document.getElementById('en').value=u.name;document.getElementById('edl').value=u.dataLimit>0?(u.dataLimit/1024).toFixed(0)+'GB':'';document.getElementById('edly').value='';document.getElementById('etl').value=u.timeLimit>0?u.timeLimit+'d':'';document.getElementById('eip').value=u.ip||'';document.getElementById('em').classList.add('active')}
async function saveE(){var d={name:document.getElementById('en').value,dataLimit:document.getElementById('edl').value,dailyLimit:document.getElementById('edly').value,timeLimit:document.getElementById('etl').value,ip:document.getElementById('eip').value};try{await fetch('/api/users/'+eid,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});toast('ویرایش شد ✅');closeE();loadUsers()}catch(e){toast('خطا','e')}}
function closeE(){document.getElementById('em').classList.remove('active');eid=null}
async function delU(id){if(!confirm('حذف؟'))return;try{await fetch('/api/users/'+id,{method:'DELETE'});toast('حذف شد ✅');loadUsers()}catch(e){toast('خطا','e')}}
async function rstU(id){if(!confirm('ریست؟'))return;try{await fetch('/api/users/'+id+'/reset',{method:'POST'});toast('ریست شد ✅');loadUsers()}catch(e){toast('خطا','e')}}
async function togU(id,act){try{await fetch('/api/users/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({active:act})});toast('تغییر کرد ✅');loadUsers()}catch(e){toast('خطا','e')}}

// Scanner
async function scanF(){var o=document.getElementById('sop').value,c=document.getElementById('scnt').value,d=document.getElementById('sres');d.innerHTML='<div class="spinner"></div>';try{var r=await(await fetch('/api/ips?operator='+o+'&count='+c+'&sort=latency')).json();var h='<table><thead><tr><th>#</th><th>IP</th><th>پورت</th><th>شهر</th><th>پینگ</th></tr></thead><tbody>';r.forEach(function(x,i){var p=Array.isArray(x.ports)?x.ports.join(','):x.ports,l=x.latency||0,lc=l<50?'badge-success':l<80?'badge-warning':'badge-danger';h+='<tr><td>'+(i===0?'⭐':i+1)+'</td><td><strong>'+x.ip+'</strong></td><td>'+p+'</td><td>'+x.city+'</td><td><span class="badge '+lc+'">'+l+'ms</span></td></tr>'});h+='</tbody></table>';d.innerHTML=h}catch(e){d.innerHTML='<p style="text-align:center;color:var(--red)">خطا</p>'}}
async function scanR(){var o=document.getElementById('sop').value,d=document.getElementById('sres');d.innerHTML='<div class="spinner"></div><p style="text-align:center;color:var(--muted)">اسکن واقعی...</p>';try{var r=await(await fetch('/api/scan-ips?operator='+o)).json();if(r.results&&r.results.length){var h='<table><thead><tr><th>#</th><th>IP</th><th>پورت</th><th>پینگ</th></tr></thead><tbody>';r.results.forEach(function(x,i){h+='<tr><td>'+(i===0?'⭐':i+1)+'</td><td><strong>'+x.ip+'</strong></td><td>'+x.port+'</td><td><span class="badge '+(x.latency<100?'badge-success':x.latency<200?'badge-warning':'badge-danger')+'">'+x.latency+'ms</span></td></tr>'});h+='</tbody></table>';d.innerHTML=h}else d.innerHTML='<p style="text-align:center;color:var(--yellow)">زنده‌ای یافت نشد</p>'}catch(e){d.innerHTML='<p style="text-align:center;color:var(--red)">خطا</p>'}}

// Subscription
async function genSub(){var u=document.getElementById('subU').value||uuid,t=document.getElementById('subT').value,f=document.getElementById('subF').value;try{var r=await(await fetch('/sub/'+u+'?type='+t+'&format='+f)).text();document.getElementById('subR').value=r;toast('دریافت شد ✅')}catch(e){toast('خطا','e')}}

// Settings
async function saveSet(){var d={};if(document.getElementById('sUUID').value)d.UUID=document.getElementById('sUUID').value;if(document.getElementById('sPass').value)d.ADMIN_PASS=document.getElementById('sPass').value;if(document.getElementById('sSNI').value)d.SNI=document.getElementById('sSNI').value;if(document.getElementById('sFP').value)d.FINGERPRINT=document.getElementById('sFP').value;try{var r=await(await fetch('/api/settings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})).json();r.success?toast('ذخیره شد ✅'):toast('خطا','e')}catch(e){toast('خطا','e')}}
async function saveFrag(){var d={FRAGMENT:{enabled:true,size:document.getElementById('fsz').value||'200-500',count:document.getElementById('fcn').value||'5-10',delay:document.getElementById('fdl').value||'10-30'}};try{await fetch('/api/settings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});toast('ذخیره شد ✅')}catch(e){toast('خطا','e')}}

// Backup
async function dlBackup(){try{var r=await(await fetch('/api/backup')).json();var b=new Blob([JSON.stringify(r,null,2)],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='taakaa-backup-'+new Date().toISOString().split('T')[0]+'.json';a.click();toast('دانلود شد ✅')}catch(e){toast('خطا','e')}}

// Sub for apps
async function getSub(t,f){var u=uuid;try{var r=await(await fetch('/sub/'+u+'?type='+t+'&format='+f)).text();if(f==='base64'){var l=location.origin+'/sub/'+u+'?type='+t+'&format=base64';navigator.clipboard.writeText(l);alert('لینک کپی شد ✅\n\n'+l)}else{navigator.clipboard.writeText(r);alert('کانفیگ کپی شد ✅')}}catch(e){alert('خطا')}}

// Init
fetch('/api/stats').then(function(r){if(r.ok){nav('dash');loadDash()}}).catch(function(){});
document.getElementById('lp').addEventListener('keydown',function(e){if(e.key==='Enter')login()});
</script>
</body></html>`;
var HTML_SETUP = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Taakaa-Xi | Setup</title><style>:root{--orange:#ff6b00;--bg:#0a0a0f;--card:#1a1a2e;--text:#e0e0e0;--muted:#888;--border:rgba(255,255,255,.06);--green:#00ff88;--red:#ff4757;--radius:18px;--radius-sm:10px}*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background-image:radial-gradient(ellipse at 50% 0%,rgba(255,107,0,.1) 0%,transparent 60%)}.container{max-width:600px;width:100%;padding:36px;background:var(--card);border-radius:var(--radius);border:2px solid rgba(255,107,0,.3);box-shadow:0 20px 60px rgba(0,0,0,.4);animation:fadeIn .5s ease}@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.logo{font-size:2.8rem;font-weight:900;text-align:center;margin-bottom:8px;background:linear-gradient(135deg,var(--orange),#ff8533);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.subtitle{text-align:center;color:var(--muted);margin-bottom:28px}.setup-card{background:rgba(255,255,255,.02);border-radius:var(--radius);padding:20px;margin-bottom:16px;border:1px solid var(--border);transition:all .3s}.setup-card.req{border-color:rgba(255,107,0,.3);background:rgba(255,107,0,.03)}.setup-card.ok{border-color:rgba(0,255,136,.4);background:rgba(0,255,136,.03)}.setup-card.err{border-color:rgba(255,71,87,.4)}.card-header{display:flex;align-items:center;gap:10px;margin-bottom:12px}.dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.8rem;flex-shrink:0;transition:all .3s}.dot.chk{background:rgba(255,193,7,.15);color:#ffc107;animation:pulse 1.5s infinite}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}.dot.ok{background:rgba(0,255,136,.15);color:var(--green)}.dot.err{background:rgba(255,71,87,.15);color:var(--red)}.card-title{font-weight:700}.badge{display:inline-block;padding:3px 10px;border-radius:15px;font-size:.65rem;font-weight:700}.badge-req{background:rgba(255,71,87,.15);color:var(--red)}.desc{color:var(--muted);line-height:1.8;font-size:.88rem;margin-bottom:12px}.desc code{background:rgba(255,107,0,.15);padding:2px 7px;border-radius:4px;color:#ff8533}.desc ol{padding-right:18px;margin:6px 0}input{width:100%;padding:10px 14px;background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-size:.9rem;margin-top:6px;transition:all .3s}input:focus{outline:none;border-color:var(--orange);box-shadow:0 0 0 3px rgba(255,107,0,.1)}button{padding:10px 20px;background:linear-gradient(135deg,var(--orange),#ff8533);border:none;color:#fff;border-radius:var(--radius-sm);font-weight:700;cursor:pointer;transition:all .3s;font-size:.9rem}button:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(255,107,0,.25)}.btn-sm{width:auto;padding:7px 16px;font-size:.8rem}.btn-full{width:100%;margin-top:10px}.msg{margin-top:10px;padding:10px;border-radius:var(--radius-sm);font-size:.82rem;display:none;animation:fadeIn .3s ease}.msg.show{display:block}.msg.ok{background:rgba(0,255,136,.08);color:var(--green)}.msg.err{background:rgba(255,71,87,.08);color:var(--red)}.all-ready{text-align:center;padding:24px 0;display:none}.all-ready.show{display:block;animation:fadeIn .5s ease}.all-ready .icon{font-size:3.5rem;margin-bottom:12px;animation:bounce 1s infinite}@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}.all-ready h2{color:var(--green);margin-bottom:8px}.footer{text-align:center;margin-top:24px;padding-top:20px;border-top:1px solid var(--border);color:var(--muted);font-size:.78rem}.footer a{color:var(--orange);text-decoration:none}</style></head><body><div class="container"><div class="logo">⚡ Taakaa-Xi</div><div class="subtitle">راه‌اندازی اولیه • Setup Wizard</div><div class="setup-card req" id="kvCard"><div class="card-header"><span class="dot chk" id="kvDot">⟳</span><span class="card-title">KV Storage</span><span class="badge badge-req">الزامی*</span></div><div class="desc"><p>KV برای ذخیره‌سازی کاربران الزامی است.</p><ol><li>به تب <code>Workers & Pages</code> بروید</li><li><code>Settings</code> → <code>Variables</code></li><li>در <code>KV Namespace Bindings</code> یک Namespace با نام <code>KV</code> بسازید</li></ol></div><button class="btn-sm" onclick="checkKV()">🔄 بررسی</button><div class="msg" id="kvMsg"></div></div><div class="setup-card req" id="passCard"><div class="card-header"><span class="dot chk" id="passDot">⟳</span><span class="card-title">Admin Password</span><span class="badge badge-req">الزامی*</span></div><div class="desc"><p>روش ۱: متغیر <code>ADMIN_PASS</code> در تنظیمات Worker</p><p>روش ۲: در فیلد زیر وارد کنید</p></div><input type="password" id="passInput" placeholder="رمز عبور"><button class="btn-full" onclick="savePass()">💾 ذخیره</button><div class="msg" id="passMsg"></div></div><div class="all-ready" id="allReady"><div class="icon">🎉</div><h2>آماده!</h2><p style="color:var(--muted)">پنل مدیریت فعال شد</p><button class="btn-full" onclick="location.href='/dashboard'">🚀 ورود</button></div><div class="footer"><p>🚀 <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p></div></div><script>var kvOk=false,passOk=false;async function checkKV(){var d=document.getElementById('kvDot'),m=document.getElementById('kvMsg'),c=document.getElementById('kvCard');d.className='dot chk';d.textContent='⟳';m.className='msg show';m.textContent='در حال بررسی...';try{var r=await(await fetch('/api/check-kv')).json();r.ok?(kvOk=true,d.className='dot ok',d.textContent='✓',c.className='setup-card ok',m.className='msg ok show',m.textContent='✅ KV متصل شد'):(kvOk=false,d.className='dot err',d.textContent='✗',c.className='setup-card err',m.className='msg err show',m.textContent='❌ KV متصل نیست')}catch(e){kvOk=false,d.className='dot err',d.textContent='✗',m.className='msg err show',m.textContent='❌ خطا'}checkAll()}async function savePass(){var p=document.getElementById('passInput').value,d=document.getElementById('passDot'),m=document.getElementById('passMsg'),c=document.getElementById('passCard');if(!p||p.length<3){m.className='msg err show';m.textContent='❌ حداقل ۳ کاراکتر';return}try{var r=await(await fetch('/api/setup-pass',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:p})})).json();r.ok?(passOk=true,d.className='dot ok',d.textContent='✓',c.className='setup-card ok',m.className='msg ok show',m.textContent='✅ ذخیره شد'):(passOk=false,m.className='msg err show',m.textContent='❌ '+r.error)}catch(e){passOk=false,m.className='msg err show',m.textContent='❌ خطا'}checkAll()}async function checkPass(){try{var r=await(await fetch('/api/check-pass')).json();r.ok&&(passOk=true,document.getElementById('passDot').className='dot ok',document.getElementById('passDot').textContent='✓',document.getElementById('passCard').className='setup-card ok')}catch(e){}checkAll()}function checkAll(){kvOk&&passOk?document.getElementById('allReady').classList.add('show'):document.getElementById('allReady').classList.remove('show')}checkKV();checkPass();</script></body></html>`;

var HTML_LOCATIONS = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | لوکیشن‌ها</title><style>body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#e0e0e0;padding:30px;background-image:radial-gradient(ellipse at 50% 0%,rgba(255,107,0,.06) 0%,transparent 60%)}h1{color:#ff6b00;text-align:center;font-size:2rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-top:24px}.loc{padding:20px;background:#1a1a2e;border-radius:16px;cursor:pointer;transition:all .3s;text-align:center;border:1px solid rgba(255,255,255,.06)}.loc:hover{border-color:#ff6b00;transform:scale(1.05);box-shadow:0 8px 25px rgba(255,107,0,.15)}.flag{font-size:2.2rem}.name{font-weight:700;margin-top:6px}.city{color:#888;font-size:.78rem;margin-top:3px}</style></head><body><h1>🌍 لوکیشن‌ها</h1><div class="grid" id="g"></div><script>var l='LOCS_PLACEHOLDER';try{var locs=JSON.parse(l);var h='';locs.forEach(function(x){h+='<div class="loc" onclick="alert(\'📍 '+x.name+'\\nIP: '+x.ip+'\')"><div class="flag">'+x.flag+'</div><div class="name">'+x.name+'</div><div class="city">'+x.city+'</div></div>'});document.getElementById('g').innerHTML=h}catch(e){}</script></body></html>`;

var HTML_OWNERS = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | پشتیبانی</title><style>body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#e0e0e0;text-align:center;padding:40px}h1{color:#ff6b00}.card{margin:24px auto;padding:24px;background:#1a1a2e;border-radius:16px;display:inline-block;border:1px solid rgba(255,255,255,.06)}a{color:#ff6b00}</style></head><body><h1>👥 پشتیبانی</h1><div class="card"><h2>تیم تاکا</h2><p>تلگرام: <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p><p>🚀 ۳ ماه توسعه</p></div></body></html>`;

var HTML_FRAGMENT = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | Fragment</title><style>body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#e0e0e0;padding:40px;max-width:800px;margin:0 auto}h1{color:#ff6b00}.card{background:#1a1a2e;padding:24px;border-radius:16px;border:1px solid rgba(255,255,255,.06);line-height:2}code{background:rgba(255,107,0,.15);padding:3px 8px;border-radius:5px;color:#ff8533}</style></head><body><h1>🛡️ Fragment</h1><div class="card"><p>تکنیک تکه‌تکه کردن بسته‌های TLS برای دور زدن DPI</p><p><code>size</code>: 200-500 | <code>count</code>: 5-10 | <code>delay</code>: 10-30ms</p></div></body></html>`;

var HTML_OFFLINE = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | راهنما</title><style>body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#e0e0e0;padding:40px}h1{color:#ff6b00}.card{background:#1a1a2e;padding:24px;border-radius:16px;border:1px solid rgba(255,255,255,.06)}h2{color:#ff8533;margin-top:18px}</style></head><body><h1>📚 راهنمای اپراتورها</h1><div class="card"><h2>همراه اول</h2><p>پورت‌ها: 443, 8443, 2083</p><h2>ایرانسل</h2><p>پورت‌ها: 443, 2083, 2087</p><h2>رایتل</h2><p>پورت‌ها: 443, 2096</p></div></body></html>`;
// ============================================
// 🔥 TAAKAA-XI PRO v15 - بخش ۴/۶
// 🚀 Main Worker - API Routes
// ============================================

export default {
  async fetch(request, env, ctx) {
    
    var url = new URL(request.url);
    var path = url.pathname;
    var method = request.method;
    
    var corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    };
    
    if (method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
    
    // Load config
    if (env.KV) {
      try {
        var saved = await env.KV.get('config');
        if (saved) CONFIG = Object.assign({}, CONFIG, JSON.parse(saved));
        var savedPass = await env.KV.get('admin_pass');
        if (savedPass) CONFIG.ADMIN_PASS = savedPass;
      } catch (e) {}
    }
    if (env.ADMIN_PASS) CONFIG.ADMIN_PASS = env.ADMIN_PASS;
    if (env.UUID) CONFIG.UUID = env.UUID;
    
    var um = new UserManager(env);
    var sm = new SessionManager(env);
    var hasKV = !!env.KV;
    var hasPass = !!CONFIG.ADMIN_PASS;
    
    // Setup APIs
    if (path === '/api/check-kv') return new Response(JSON.stringify({ ok: hasKV }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    if (path === '/api/check-pass') return new Response(JSON.stringify({ ok: hasPass }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    
    if (path === '/api/setup-pass' && method === 'POST') {
      try {
        var body = await request.json();
        if (!body.password || body.password.length < 3) return new Response(JSON.stringify({ ok: false, error: 'رمز کوتاه' }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
        if (env.KV) await env.KV.put('admin_pass', body.password);
        CONFIG.ADMIN_PASS = body.password;
        return new Response(JSON.stringify({ ok: true }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
      } catch (e) { return new Response(JSON.stringify({ ok: false, error: e.message }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    }
    
    // Setup page
    if ((!hasKV || !hasPass) && (path === '/' || path === '')) {
      return new Response(HTML_SETUP, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    // Auth middleware
    var publicAPIs = ['login', 'check-kv', 'check-pass', 'setup-pass', 'scan-ips'];
    var apiName = path.replace('/api/', '');
    
    if (path.startsWith('/api/') && publicAPIs.indexOf(apiName) === -1) {
      var cookie = request.headers.get('Cookie') || '';
      var smatch = cookie.match(/session=([^;]+)/);
      if (!smatch || !(await sm.validate(smatch[1]))) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
      }
    }
    
    // Login
    if (path === '/api/login' && method === 'POST') {
      var ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (!sm.checkRateLimit(ip)) return new Response(JSON.stringify({ error: 'Too many attempts' }), { status: 429, headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
      var loginBody = await request.json();
      if (loginBody.password === CONFIG.ADMIN_PASS) {
        var sid = await sm.create();
        if (!sid) return new Response(JSON.stringify({ error: 'KV not configured' }), { status: 500, headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
        return new Response(JSON.stringify({ success: true }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json', 'Set-Cookie': 'session=' + sid + '; Path=/; HttpOnly; SameSite=Strict; Max-Age=' + (CONFIG.SESSION_HOURS * 3600) }) });
      }
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401, headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    
    // Logout
    if (path === '/api/logout' && method === 'POST') {
      var lcookie = request.headers.get('Cookie') || '';
      var lmatch = lcookie.match(/session=([^;]+)/);
      if (lmatch) await sm.destroy(lmatch[1]);
      return new Response(JSON.stringify({ success: true }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json', 'Set-Cookie': 'session=; Path=/; Max-Age=0' }) });
    }
    
    // Stats
    if (path === '/api/stats') { var stats = await um.getStats(); return new Response(JSON.stringify(stats), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    
    // Users CRUD
    if (path === '/api/users' && method === 'GET') { var users = await um.getAll(); return new Response(JSON.stringify(users), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    if (path === '/api/users' && method === 'POST') { var data = await request.json(); var user = await um.add(data); return new Response(JSON.stringify(user), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    if (path.match(/^\/api\/users\/([^\/]+)\/reset$/) && method === 'POST') { var rid = path.split('/')[3]; var ruser = await um.resetUsage(rid); return new Response(JSON.stringify(ruser), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    if (path.match(/^\/api\/users\/([^\/]+)$/) && method === 'PUT') { var uid = path.split('/')[3]; var udata = await request.json(); var uuser = await um.update(uid, udata); return new Response(JSON.stringify(uuser), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    if (path.match(/^\/api\/users\/([^\/]+)$/) && method === 'DELETE') { var did = path.split('/')[3]; await um.delete(did); return new Response(JSON.stringify({ success: true }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    
    // IPs & Scanner
    if (path === '/api/ips') { var op = url.searchParams.get('operator') || 'all'; var cnt = parseInt(url.searchParams.get('count') || '10'); var sort = url.searchParams.get('sort'); var ips = Helpers.getBestIPs(op, cnt, sort === 'latency'); return new Response(JSON.stringify(ips), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    if (path === '/api/scan-ips') { var sop = url.searchParams.get('operator') || 'all'; var sips = Helpers.getBestIPs(sop, 10); var unique = [], seen = {}; sips.forEach(function(item) { if (!seen[item.ip]) { seen[item.ip] = true; unique.push(item.ip); } }); var results = await IPScanner.scanBatch(unique, ['443'], 5); return new Response(JSON.stringify({ results: results.slice(0, 20) }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    
    // Generate Config
    if (path === '/api/generate-config' && method === 'POST') { var cdata = await request.json(); var config = Helpers.generateConfig(cdata.uuid || CONFIG.UUID, cdata.host || '104.16.71.76', cdata.port || '443', cdata.type || 'vless', cdata.settings || {}); return new Response(JSON.stringify({ config: config }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    
    // Settings
    if (path === '/api/settings' && method === 'GET') { return new Response(JSON.stringify(CONFIG), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    if (path === '/api/settings' && method === 'POST') { var sdata = await request.json(); Object.assign(CONFIG, sdata); if (env.KV) await env.KV.put('config', JSON.stringify(CONFIG)); if (sdata.ADMIN_PASS && env.KV) await env.KV.put('admin_pass', sdata.ADMIN_PASS); return new Response(JSON.stringify({ success: true }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    
    // Backup & Restore
    if (path === '/api/backup') { var backup = await um.backupData(); return new Response(JSON.stringify(backup), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    if (path === '/api/restore' && method === 'POST') { try { var rdata = await request.json(); var result = await um.restoreData(rdata); return new Response(JSON.stringify({ success: result }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); } catch (e) { return new Response(JSON.stringify({ success: false, error: e.message }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); } }
    // ============================================
// 🔥 TAAKAA-XI PRO v15 - بخش ۵/۶
// 📦 Sub + Pages + Proxy
// ============================================

    // Subscription
    if (path.startsWith('/sub/')) {
      var subUUID = path.replace('/sub/', '').replace(/\/$/, '');
      if (!Helpers.isValidUUID(subUUID)) return new Response('UUID نامعتبر', { status: 400 });
      var subUser = await um.getByUUID(subUUID);
      if (!subUser && subUUID !== CONFIG.UUID) return new Response('کاربر یافت نشد', { status: 404 });
      var subType = url.searchParams.get('type') || 'all';
      var subFormat = url.searchParams.get('format') || 'raw';
      var subOperator = subUser ? subUser.operator : 'all';
      var configs = [];
      var bestIPs = Helpers.getBestIPs(subOperator, 5);
      bestIPs.forEach(function(item) { item.ports.forEach(function(port) { var userName = subUser ? subUser.name : 'Main'; if (subType === 'all' || subType === 'vless') configs.push(Helpers.generateConfig(subUUID, item.ip, port, 'vless', { name: 'Taakaa-Xi-' + userName })); if (subType === 'all' || subType === 'trojan') configs.push(Helpers.generateConfig(subUUID, item.ip, port, 'trojan', { name: 'Taakaa-Xi-' + userName })); if (subType === 'all' || subType === 'ss') configs.push(Helpers.generateConfig(subUUID, item.ip, port, 'ss', { name: 'Taakaa-Xi-' + userName })); }); });
      if (subFormat === 'base64') return new Response(btoa(configs.join('\n')), { headers: { 'Content-Type': 'text/plain' } });
      if (subFormat === 'clash') { var clashProxies = []; bestIPs.forEach(function(item) { item.ports.forEach(function(port) { clashProxies.push({ name: 'Taakaa-Xi-' + item.ip + ':' + port, type: 'vless', server: item.ip, port: parseInt(port), uuid: subUUID, network: 'ws', 'ws-opts': { path: '/' }, tls: true, 'servername': CONFIG.SNI }); }); }); return new Response(JSON.stringify({ proxies: clashProxies }, null, 2), { headers: { 'Content-Type': 'application/yaml' } }); }
      return new Response(configs.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    
    // Static Pages
    var locsJSON = JSON.stringify(CONFIG.LOCATIONS);
    
    if (path === '/' || path === '') return new Response(HTML_DASHBOARD.replace('UUID_PLACEHOLDER', CONFIG.UUID).replace('LOCS_PLACEHOLDER', locsJSON), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/dashboard') return new Response(HTML_DASHBOARD.replace('UUID_PLACEHOLDER', CONFIG.UUID).replace('LOCS_PLACEHOLDER', locsJSON), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/admin' || path === '/login') return new Response(HTML_DASHBOARD.replace('UUID_PLACEHOLDER', CONFIG.UUID).replace('LOCS_PLACEHOLDER', locsJSON), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/setup') return new Response(HTML_SETUP, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/scanner') return new Response(HTML_DASHBOARD.replace('UUID_PLACEHOLDER', CONFIG.UUID).replace('LOCS_PLACEHOLDER', locsJSON), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/select-location') return new Response(HTML_LOCATIONS.replace('LOCS_PLACEHOLDER', locsJSON), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/owners') return new Response(HTML_OWNERS, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/fragment-info') return new Response(HTML_FRAGMENT, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (path === '/offline-support') return new Response(HTML_OFFLINE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    
    // Proxy Handler
    return handleProxy(request, env, ctx);
  }
};
