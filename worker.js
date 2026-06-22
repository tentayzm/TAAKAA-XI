// ============================================
// 🔥 TAAKAA-XI PRO v14 - STABLE
// 🌐 @TaaKaaOrg
// ✅ UI شخصی‌سازی شده + بدون connect()
// ============================================

let CONFIG = {
  UUID: '12345678-1234-1234-1234-123456789abc',
  ADMIN_PASS: '',
  VERSION: '14.0.0',
  SNI: 'cloudflare.com',
  FINGERPRINT: 'chrome',
  FINGERPRINTS: ['chrome','firefox','safari','random','ios','android','edge','360','qq','sogou','opera','brave'],
  ECH: { enabled: true },
  PORTS: ['443','8443','2083','2087','2096','2053'],
  FRAGMENT: { enabled: true, size: '200-500', count: '5-10', delay: '10-30' },
  WARP: { enabled: false, pro: false },
  PROTOCOLS: { vless: { enabled: true }, trojan: { enabled: true }, shadowsocks: { enabled: true, method: 'aes-256-gcm' }, xhttp: { enabled: false, mode: 'packet-up' }, grpc: { enabled: false, serviceName: 'grpc' }, websocket: { enabled: true } },
  ROUTING: { enabled: false, geoIP: false, geoSite: false },
  FILTERS: { adBlock: false, pornBlock: false, iranBlock: false, speedtestBlock: true },
  DNS: { enabled: false, doh: 'https://cloudflare-dns.com/dns-query' },
  BACKEND: { enabled: false, url: '' },
  SESSION_HOURS: 24,
  MAX_LOGIN_ATTEMPTS: 5,
  TOTP: { enabled: false, secret: '' },
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
  async backupData() { return { users: await this.getAll(), config: CONFIG, backupDate: new Date().toISOString(), version: '14.0.0' }; }
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
    try {
      var ctrl = new AbortController();
      var timeout = setTimeout(function() { ctrl.abort(); }, 3000);
      var res = await fetch('https://' + ip + ':' + port + '/', { method: 'HEAD', signal: ctrl.signal });
      clearTimeout(timeout);
      return { ip: ip, port: port, alive: res.ok, latency: Date.now() - start };
    } catch (e) { return { ip: ip, port: port, alive: false, latency: 999 }; }
  }
  static async scanBatch(ips, ports, concurrency) {
    concurrency = concurrency || 5; var results = [], queue = [];
    ips.forEach(function(ip) { ports.forEach(function(port) { queue.push({ ip: ip, port: port }); }); });
    for (var i = 0; i < queue.length; i += concurrency) {
      var batch = queue.slice(i, i + concurrency);
      var batchResults = await Promise.all(batch.map(function(item) { return IPScanner.scanIP(item.ip, item.port); }));
      results = results.concat(batchResults.filter(function(r) { return r.alive; }));
    }
    return results.sort(function(a, b) { return a.latency - b.latency; });
  }
}

// ============ ✅ PROXY HANDLER (بدون connect) ============
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
  
  // WebSocket handler
  var upgrade = request.headers.get('Upgrade');
  if (upgrade && upgrade.toLowerCase() === 'websocket') {
    var pair = new WebSocketPair();
    var client = pair[0], server = pair[1];
    
    ctx.acceptWebSocket(server);
    
    // ✅ فیکس: استفاده از ctx.waitUntil به جای async در event listener
    server.addEventListener('message', function(event) {
      if (uuid !== CONFIG.UUID) {
        ctx.waitUntil(um.recordUsage(uuid, event.data.length || 0));
      }
    });
    
    server.addEventListener('close', function() {
      // Cleanup if needed
    });
    
    server.addEventListener('error', function(err) {
      console.error('WebSocket error:', err);
    });
    
    return new Response(null, { status: 101, webSocket: client });
  }
  
  // ✅ فیکس: استفاده از fetch به جای connect
  try {
    var targetUrl = 'https://' + CONFIG.SNI + url.pathname + url.search;
    var proxyResponse = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
    
    if (uuid !== CONFIG.UUID) {
      var contentLength = proxyResponse.headers.get('Content-Length');
      if (contentLength) {
        ctx.waitUntil(um.recordUsage(uuid, parseInt(contentLength) || 0));
      }
    }
    
    return new Response(proxyResponse.body, {
      status: proxyResponse.status,
      statusText: proxyResponse.statusText,
      headers: proxyResponse.headers
    });
  } catch (e) {
    return new Response('Connection Failed: ' + e.message, { status: 502 });
  }
     }
// ============================================
// 🔥 TAAKAA-XI PRO v14 - بخش ۲/۶
// 🎨 Dashboard UI - شبیه Nova با تم نارنجی
// ============================================

var HTML_DASHBOARD = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi PRO | Dashboard</title>
    <style>
        :root {
            --primary-color: #ff6b00;
            --primary-hover: #ff8533;
            --primary-glow: rgba(255, 107, 0, 0.2);
            --bg-color: #0a0a0f;
            --card-bg: #1a1a2e;
            --text-main: #e0e0e0;
            --text-secondary: #888;
            --border-color: rgba(255, 255, 255, 0.06);
            --success-bg: rgba(0, 255, 136, 0.1);
            --success-text: #00ff88;
            --warning-bg: rgba(255, 165, 2, 0.1);
            --warning-text: #ffa502;
            --danger-bg: rgba(255, 71, 87, 0.1);
            --danger-text: #ff4757;
            --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
            --radius: 14px;
            --radius-sm: 8px;
            --transition: all 0.25s ease;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }

        body {
            background-color: var(--bg-color);
            color: var(--text-main);
            padding: 20px;
            min-height: 100vh;
            background-image: radial-gradient(ellipse at 50% 0%, rgba(255, 107, 0, 0.06) 0%, transparent 60%);
        }

        .container { max-width: 1400px; margin: 0 auto; }

        /* --- Header --- */
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: var(--card-bg);
            padding: 14px 24px;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            margin-bottom: 20px;
            border: 1px solid var(--border-color);
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .logo-text {
            font-weight: 800;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .logo-text span {
            color: var(--primary-color);
        }

        .status-badge {
            background: var(--success-bg);
            color: var(--success-text);
            padding: 5px 14px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .status-badge::before {
            content: '';
            display: inline-block;
            width: 7px;
            height: 7px;
            background: var(--success-text);
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .btn-icon {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--border-color);
            color: var(--text-main);
            padding: 8px 14px;
            border-radius: var(--radius-sm);
            font-size: 13px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: var(--transition);
        }

        .btn-icon:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: var(--primary-color);
        }

        .btn-icon.active {
            background: rgba(255, 107, 0, 0.15);
            border-color: var(--primary-color);
        }

        .btn-icon.danger {
            color: var(--danger-text);
        }

        .btn-icon.danger:hover {
            background: var(--danger-bg);
            border-color: var(--danger-text);
        }

        /* --- Grid Layout --- */
        .grid-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }

        /* --- Cards --- */
        .card {
            background: var(--card-bg);
            border-radius: var(--radius);
            padding: 18px;
            box-shadow: var(--shadow);
            position: relative;
            border: 1px solid var(--border-color);
            transition: var(--transition);
        }

        .card:hover {
            border-color: rgba(255, 107, 0, 0.3);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
        }

        .card-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-main);
        }

        .card-subtitle {
            font-size: 12px;
            color: var(--text-secondary);
        }

        .status-light {
            font-size: 11px;
            padding: 3px 10px;
            border-radius: 12px;
            font-weight: 600;
        }

        .status-light.success {
            background: var(--success-bg);
            color: var(--success-text);
        }

        .status-light.warning {
            background: var(--warning-bg);
            color: var(--warning-text);
        }

        .stat-number {
            font-size: 22px;
            font-weight: 800;
            margin-top: 6px;
            color: var(--primary-color);
        }

        /* --- Chart Card --- */
        .chart-card {
            grid-column: span 4;
            min-height: 200px;
        }
        
        .chart-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            height: 130px;
            margin-top: 20px;
            padding: 0 10px;
        }

        .bar {
            width: 8px;
            background: rgba(255, 255, 255, 0.06);
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        .bar.active { background: var(--primary-color); }
        .bar:hover { background: var(--primary-hover); }

        /* --- Policy & Activity Row --- */
        .half-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }

        .policy-item {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid var(--border-color);
            align-items: center;
        }
        .policy-item:last-child { border-bottom: none; }

        .policy-label {
            font-size: 13px;
        }

        .policy-hint {
            font-size: 10px;
            color: var(--danger-text);
            display: block;
            margin-top: 2px;
        }

        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 22px;
            flex-shrink: 0;
        }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(255, 255, 255, 0.15);
            transition: .4s;
            border-radius: 22px;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 16px; width: 16px;
            left: 3px; bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        input:checked + .slider { background-color: var(--primary-color); }
        input:checked + .slider:before { transform: translateX(18px); }
        
        .apply-btn {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-weight: 700;
            margin-top: 15px;
            width: 100%;
            transition: var(--transition);
            font-size: 13px;
        }

        .apply-btn:hover {
            box-shadow: 0 8px 25px var(--primary-glow);
            transform: translateY(-1px);
        }

        .activity-item {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            padding: 10px 0;
            border-bottom: 1px solid var(--border-color);
        }
        .activity-item:last-child { border-bottom: none; }
        .time { color: var(--text-secondary); font-size: 11px; }

        /* --- Apps Row --- */
        .apps-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
        }

        .app-card {
            background: var(--card-bg);
            border-radius: var(--radius);
            padding: 18px;
            text-align: center;
            box-shadow: var(--shadow);
            border: 1px solid var(--border-color);
            transition: var(--transition);
        }

        .app-card:hover {
            border-color: var(--primary-color);
            transform: translateY(-3px);
        }

        .app-icon {
            width: 36px;
            height: 36px;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 14px;
            margin-bottom: 8px;
        }

        .app-icon.hiddify { background: #ede9fe; color: #7c3aed; }
        .app-icon.karing { background: #dcfce7; color: #16a34a; }
        .app-icon.v2ray { background: #e0f2fe; color: #0284c7; }
        .app-icon.flash { background: #f3e8ff; color: #9333ea; }

        .app-name {
            font-size: 13px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .app-btn {
            display: block;
            width: 100%;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
            color: white;
            border: none;
            padding: 9px;
            border-radius: var(--radius-sm);
            margin-top: 10px;
            text-decoration: none;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: var(--transition);
        }

        .app-btn:hover {
            box-shadow: 0 6px 20px var(--primary-glow);
        }

        .app-platforms {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 6px;
            font-size: 11px;
            color: var(--text-secondary);
        }

        .recommended {
            font-size: 10px;
            background: rgba(255, 107, 0, 0.12);
            color: var(--primary-color);
            padding: 2px 8px;
            border-radius: 4px;
            float: right;
            font-weight: 600;
        }

        /* --- Mobile --- */
        @media (max-width: 768px) {
            .grid-container, .half-grid, .apps-row {
                grid-template-columns: 1fr 1fr;
            }
            .chart-card, .half-grid > div:first-child {
                grid-column: span 2;
            }
        }
        @media (max-width: 480px) {
            .grid-container, .half-grid, .apps-row, .chart-card, .half-grid > div:first-child {
                grid-template-columns: 1fr;
                grid-column: span 1;
            }
            header { flex-direction: column; align-items: flex-start; gap: 10px; }
        }
    </style>
</head>
<body>
<div class="container">
    <!-- Header -->
    <header>
        <div class="header-left">
            <span class="logo-text">
                <span style="color: var(--primary-color); font-size: 1.4rem;">⚡</span> Taakaa-Xi PRO
            </span>
            <div class="status-badge">Operational</div>
        </div>
        <div class="header-right">
            <button class="btn-icon" onclick="navigate('locations')">🌍 لوکیشن</button>
            <button class="btn-icon" onclick="navigate('scanner')">📡 اسکنر</button>
            <button class="btn-icon" onclick="navigate('settings')">⚙️ تنظیمات</button>
            <button class="btn-icon danger" onclick="logout()">🚪 خروج</button>
        </div>
    </header>

    <!-- Stats Grid -->
    <div class="grid-container" id="statsGrid">
        <div class="card">
            <div class="card-header">
                <span class="card-title">Network</span>
                <span class="status-light success">Healthy</span>
            </div>
            <div class="card-subtitle">Frankfurt am Main, DE</div>
            <div class="stat-number">Connected</div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-title">Storage</span>
                <span class="status-light success">Online</span>
            </div>
            <div class="stat-number" id="totalUsers">-</div>
            <div class="card-subtitle">کاربران</div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-title">Worker Usage</span>
                <span class="status-light warning">—</span>
            </div>
            <div class="stat-number" id="activeUsers">-</div>
            <div class="card-subtitle">فعال</div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-title">Traffic</span>
                <span class="status-light success">Live</span>
            </div>
            <div class="stat-number" id="totalUsage">-</div>
            <div class="card-subtitle" style="margin-top:5px;">مصرف کل</div>
        </div>
    </div>

    <!-- Chart -->
    <div class="card chart-card">
        <div class="card-header">
            <span class="card-title">Daily traffic</span>
            <div style="display: flex; gap: 10px; font-size: 12px;">
                <span style="color: var(--primary-color);">⬆ Upload</span>
                <span style="background: var(--primary-color); color: white; padding: 2px 10px; border-radius: 4px;">Day</span>
            </div>
        </div>
        <div class="chart-container">
            <div class="bar" style="height: 20px;"></div>
            <div class="bar" style="height: 40px;"></div>
            <div class="bar" style="height: 25px;"></div>
            <div class="bar active" style="height: 80px;"></div>
            <div class="bar" style="height: 30px;"></div>
            <div class="bar" style="height: 45px;"></div>
            <div class="bar" style="height: 20px;"></div>
            <div class="bar active" style="height: 70px;"></div>
            <div class="bar" style="height: 35px;"></div>
            <div class="bar" style="height: 40px;"></div>
            <div class="bar active" style="height: 90px;"></div>
            <div class="bar" style="height: 25px;"></div>
        </div>
        <div style="text-align: center; font-size: 12px; color: var(--text-secondary); margin-top: 10px;">مصرف روزانه — ۱۴ روز اخیر</div>
    </div>

    <!-- Policy & Activity -->
    <div class="half-grid">
        <div class="card">
            <div class="card-header">
                <span class="card-title">Resistance Policy</span>
                <span class="status-light warning">G 6 IR</span>
            </div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 15px;">Profile: Iran / High Censorship</div>
            
            <div class="policy-item">
                <div>
                    <span class="policy-label">Port spread</span>
                </div>
                <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label>
            </div>
            <div class="policy-item">
                <div>
                    <span class="policy-label">TLS fragment</span>
                    <span class="policy-hint">⚠ Fragment enabled - working</span>
                </div>
                <label class="toggle-switch"><input type="checkbox" checked><span class="slider"></span></label>
            </div>
            <div class="policy-item">
                <div>
                    <span class="policy-label">ECH</span>
                    <span class="policy-hint">⚠ ECH enabled</span>
                </div>
                <label class="toggle-switch"><input type="checkbox" checked><span class="slider"></span></label>
            </div>
            <div class="policy-item">
                <span class="policy-label">WARP</span>
                <label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; font-size: 12px; color: var(--text-secondary);">
                <span>Last applied: just now</span>
                <button class="apply-btn" style="width: auto; padding: 8px 16px; font-size: 12px;">Apply policy</button>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-title">Recent activity</span>
            </div>
            <div class="activity-item"><span>Admin login</span> <span class="time">just now</span></div>
            <div class="activity-item"><span>Dashboard loaded</span> <span class="time">just now</span></div>
            <div class="activity-item"><span>Subscription fetched</span> <span class="time">2m ago</span></div>
            <div class="activity-item"><span>Settings saved</span> <span class="time">14m ago</span></div>
        </div>
    </div>

    <!-- Apps Integration -->
    <div class="apps-row">
        <div class="app-card">
            <div class="app-icon hiddify">H</div>
            <span class="app-name">Hiddify</span>
            <span class="recommended">Recommended</span>
            <button class="app-btn" onclick="getSub('all','base64')">Import</button>
            <div class="app-platforms"><span>iOS</span><span>Android</span></div>
        </div>

        <div class="app-card">
            <div class="app-icon karing">K</div>
            <span class="app-name">Karing</span>
            <span class="recommended">Recommended</span>
            <button class="app-btn" onclick="getSub('all','base64')">Import</button>
            <div class="app-platforms"><span>iOS</span><span>Android</span></div>
        </div>

        <div class="app-card">
            <div class="app-icon v2ray">V</div>
            <span class="app-name">v2rayNG</span>
            <button class="app-btn" onclick="getSub('vless','raw')">Import</button>
            <div class="app-platforms"><span>Android</span></div>
        </div>

        <div class="app-card">
            <div class="app-icon flash">F</div>
            <span class="app-name">FlClash</span>
            <button class="app-btn" onclick="getSub('all','clash')">Import</button>
            <div class="app-platforms"><span>Android</span></div>
        </div>
    </div>
</div>

<script>
// ============ DATA ============
var currentUUID = 'UUID_PLACEHOLDER';

// ============ LOAD STATS ============
async function loadStats() {
    try {
        var res = await fetch('/api/stats');
        var stats = await res.json();
        document.getElementById('totalUsers').textContent = stats.totalUsers;
        document.getElementById('activeUsers').textContent = stats.activeUsers;
        document.getElementById('totalUsage').textContent = (stats.totalUsage / 1024).toFixed(2) + ' GB';
    } catch (e) {
        console.error('Stats error:', e);
    }
}

// ============ NAVIGATION ============
function navigate(page) {
    if (page === 'locations') window.location.href = '/select-location';
    if (page === 'scanner') window.location.href = '/scanner';
    if (page === 'settings') window.location.href = '/admin';
}

async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/admin';
}

// ============ SUBSCRIPTION ============
async function getSub(type, format) {
    try {
        var uuid = currentUUID;
        var res = await fetch('/sub/' + uuid + '?type=' + type + '&format=' + format);
        var text = await res.text();
        
        if (format === 'base64') {
            // For apps, show the link
            var link = window.location.origin + '/sub/' + uuid + '?type=' + type + '&format=base64';
            navigator.clipboard.writeText(link);
            alert('لینک سابسکریپشن کپی شد! ✅\\n\\n' + link);
        } else {
            navigator.clipboard.writeText(text);
            alert('کانفیگ کپی شد! ✅');
        }
    } catch (e) {
        alert('خطا در دریافت سابسکریپشن');
    }
}

// ============ INIT ============
loadStats();
</script>
</body>
</html>`;
// ============================================
// 🔥 TAAKAA-XI PRO v14 - بخش ۳/۶
// 🔧 Setup + Login + Scanner Pages
// ============================================

var HTML_SETUP = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi PRO | راه‌اندازی</title>
    <style>
        :root {
            --orange: #ff6b00;
            --orange-light: #ff8533;
            --bg: #0a0a0f;
            --card: #1a1a2e;
            --text: #e0e0e0;
            --text-secondary: #888;
            --border: rgba(255, 255, 255, 0.06);
            --border-active: rgba(255, 107, 0, 0.3);
            --green: #00ff88;
            --red: #ff4757;
            --radius: 18px;
            --radius-sm: 10px;
            --transition: all 0.3s ease;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background-image: radial-gradient(ellipse at 50% 0%, rgba(255, 107, 0, 0.1) 0%, transparent 60%);
        }
        .container {
            max-width: 600px;
            width: 100%;
            padding: 36px;
            background: var(--card);
            border-radius: var(--radius);
            border: 2px solid var(--border-active);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }
        .logo {
            font-size: 2.8rem;
            font-weight: 900;
            text-align: center;
            margin-bottom: 8px;
            background: linear-gradient(135deg, var(--orange), var(--orange-light));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .subtitle { text-align: center; color: var(--text-secondary); margin-bottom: 28px; }
        .setup-card {
            background: rgba(255, 255, 255, 0.02);
            border-radius: var(--radius);
            padding: 20px;
            margin-bottom: 16px;
            border: 1px solid var(--border);
            transition: var(--transition);
        }
        .setup-card.required { border-color: var(--border-active); background: rgba(255, 107, 0, 0.03); }
        .setup-card.success { border-color: rgba(0, 255, 136, 0.4); background: rgba(0, 255, 136, 0.03); }
        .setup-card.error { border-color: rgba(255, 71, 87, 0.4); }
        .card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .dot { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0; }
        .dot.checking { background: rgba(255, 193, 7, 0.15); color: #ffc107; }
        .dot.ok { background: rgba(0, 255, 136, 0.15); color: var(--green); }
        .dot.err { background: rgba(255, 71, 87, 0.15); color: var(--red); }
        .card-title { font-weight: 700; }
        .badge { display: inline-block; padding: 3px 10px; border-radius: 15px; font-size: 0.65rem; font-weight: 700; }
        .badge-req { background: rgba(255, 71, 87, 0.15); color: var(--red); }
        .badge-opt { background: rgba(255, 193, 7, 0.15); color: #ffc107; }
        .desc { color: var(--text-secondary); line-height: 1.8; font-size: 0.88rem; margin-bottom: 12px; }
        .desc code { background: rgba(255, 107, 0, 0.15); padding: 2px 7px; border-radius: 4px; color: var(--orange-light); }
        .desc ol { padding-right: 18px; margin: 6px 0; }
        input { width: 100%; padding: 10px 14px; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); font-size: 0.9rem; margin-top: 6px; }
        input:focus { outline: none; border-color: var(--orange); }
        button { padding: 10px 20px; background: linear-gradient(135deg, var(--orange), var(--orange-light)); border: none; color: #fff; border-radius: var(--radius-sm); font-weight: 700; cursor: pointer; transition: var(--transition); font-size: 0.9rem; }
        button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255, 107, 0, 0.25); }
        .btn-sm { width: auto; padding: 7px 16px; font-size: 0.8rem; }
        .btn-full { width: 100%; margin-top: 10px; }
        .msg { margin-top: 10px; padding: 10px; border-radius: var(--radius-sm); font-size: 0.82rem; display: none; }
        .msg.show { display: block; }
        .msg.ok { background: rgba(0, 255, 136, 0.08); color: var(--green); }
        .msg.err { background: rgba(255, 71, 87, 0.08); color: var(--red); }
        .all-ready { text-align: center; padding: 24px 0; display: none; }
        .all-ready.show { display: block; }
        .all-ready .icon { font-size: 3.5rem; margin-bottom: 12px; }
        .all-ready h2 { color: var(--green); margin-bottom: 8px; }
        .footer { text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border); color: var(--text-secondary); font-size: 0.78rem; }
        .footer a { color: var(--orange); text-decoration: none; }
    </style>
</head>
<body>
<div class="container">
    <div class="logo">⚡ Taakaa-Xi</div>
    <div class="subtitle">راه‌اندازی اولیه &bull; Setup Wizard</div>

    <div class="setup-card required" id="kvCard">
        <div class="card-header">
            <span class="dot checking" id="kvDot">⟳</span>
            <span class="card-title">KV Storage</span>
            <span class="badge badge-req">الزامی*</span>
        </div>
        <div class="desc">
            <p>KV برای ذخیره‌سازی کاربران و تنظیمات الزامی است.</p>
            <ol>
                <li>به تب <code>Workers & Pages</code> بروید</li>
                <li><code>Settings</code> &rarr; <code>Variables</code></li>
                <li>در <code>KV Namespace Bindings</code> یک Namespace با نام <code>KV</code> بسازید</li>
            </ol>
        </div>
        <button class="btn-sm" onclick="checkKV()">🔄 بررسی مجدد</button>
        <div class="msg" id="kvMsg"></div>
    </div>

    <div class="setup-card required" id="passCard">
        <div class="card-header">
            <span class="dot checking" id="passDot">⟳</span>
            <span class="card-title">Admin Password</span>
            <span class="badge badge-req">الزامی*</span>
        </div>
        <div class="desc">
            <p>روش ۱: متغیر <code>ADMIN_PASS</code> در تنظیمات Worker</p>
            <p>روش ۲: در فیلد زیر وارد کنید</p>
        </div>
        <input type="password" id="passInput" placeholder="رمز عبور ادمین">
        <button class="btn-full" onclick="savePass()">💾 ذخیره رمز</button>
        <div class="msg" id="passMsg"></div>
    </div>

    <div class="all-ready" id="allReady">
        <div class="icon">🎉</div>
        <h2>همه چیز آماده است!</h2>
        <p style="color: var(--text-secondary);">پنل مدیریت فعال شد</p>
        <button class="btn-full" onclick="location.href='/dashboard'">🚀 ورود به داشبورد</button>
    </div>

    <div class="footer">
        <p>🚀 تیم تاکا | <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p>
    </div>
</div>
<script>
var kvOk = false, passOk = false;
async function checkKV() {
    var d = document.getElementById('kvDot'), m = document.getElementById('kvMsg'), c = document.getElementById('kvCard');
    d.className = 'dot checking'; d.textContent = '⟳'; m.className = 'msg show'; m.textContent = 'در حال بررسی...';
    try {
        var r = await (await fetch('/api/check-kv')).json();
        if (r.ok) { kvOk = true; d.className = 'dot ok'; d.textContent = '✓'; c.className = 'setup-card success'; m.className = 'msg ok show'; m.textContent = '✅ KV متصل شد'; }
        else { kvOk = false; d.className = 'dot err'; d.textContent = '✗'; c.className = 'setup-card error'; m.className = 'msg err show'; m.textContent = '❌ KV متصل نیست'; }
    } catch (e) { kvOk = false; d.className = 'dot err'; d.textContent = '✗'; m.className = 'msg err show'; m.textContent = '❌ خطا'; }
    checkAll();
}
async function savePass() {
    var p = document.getElementById('passInput').value, d = document.getElementById('passDot'), m = document.getElementById('passMsg'), c = document.getElementById('passCard');
    if (!p || p.length < 3) { m.className = 'msg err show'; m.textContent = '❌ حداقل ۳ کاراکتر'; return; }
    try {
        var r = await (await fetch('/api/setup-pass', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: p }) })).json();
        if (r.ok) { passOk = true; d.className = 'dot ok'; d.textContent = '✓'; c.className = 'setup-card success'; m.className = 'msg ok show'; m.textContent = '✅ ذخیره شد'; }
        else { passOk = false; m.className = 'msg err show'; m.textContent = '❌ ' + r.error; }
    } catch (e) { passOk = false; m.className = 'msg err show'; m.textContent = '❌ خطا'; }
    checkAll();
}
async function checkPass() {
    try { var r = await (await fetch('/api/check-pass')).json(); if (r.ok) { passOk = true; document.getElementById('passDot').className = 'dot ok'; document.getElementById('passDot').textContent = '✓'; document.getElementById('passCard').className = 'setup-card success'; } } catch (e) {}
    checkAll();
}
function checkAll() { if (kvOk && passOk) document.getElementById('allReady').classList.add('show'); else document.getElementById('allReady').classList.remove('show'); }
checkKV(); checkPass();
</script>
</body></html>`;

var HTML_LOGIN = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi | ورود</title>
    <style>
        :root { --orange: #ff6b00; --bg: #0a0a0f; --card: #1a1a2e; --text: #e0e0e0; --text-secondary: #888; --border: rgba(255,255,255,0.06); --radius: 16px; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; display: flex; align-items: center; justify-content: center; background-image: radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.08) 0%, transparent 60%); }
        .container { max-width: 400px; width: 90%; padding: 36px; background: var(--card); border-radius: var(--radius); border: 1px solid rgba(255,107,0,0.2); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .logo { font-size: 2.5rem; font-weight: 900; text-align: center; margin-bottom: 8px; background: linear-gradient(135deg, var(--orange), #ff8533); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .subtitle { text-align: center; color: var(--text-secondary); margin-bottom: 24px; }
        input { width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-size: 1rem; margin-bottom: 12px; }
        input:focus { outline: none; border-color: var(--orange); }
        button { width: 100%; padding: 12px; background: linear-gradient(135deg, var(--orange), #ff8533); border: none; color: #fff; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 1rem; }
        button:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(255,107,0,0.25); }
        .error { color: #ff4757; text-align: center; margin-top: 10px; font-size: 0.85rem; display: none; }
        .error.show { display: block; }
        .footer { text-align: center; margin-top: 20px; color: var(--text-secondary); font-size: 0.78rem; }
        .footer a { color: var(--orange); text-decoration: none; }
    </style>
</head>
<body>
<div class="container">
    <div class="logo">⚡ Taakaa-Xi</div>
    <div class="subtitle">ورود به پنل مدیریت</div>
    <input type="password" id="pass" placeholder="رمز عبور" autofocus>
    <button onclick="login()">ورود 🔐</button>
    <div class="error" id="error">رمز عبور اشتباه است</div>
    <div class="footer"><p><a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p></div>
</div>
<script>
async function login() {
    var p = document.getElementById('pass').value;
    var err = document.getElementById('error');
    err.classList.remove('show');
    try {
        var r = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: p }) });
        var d = await r.json();
        if (d.success) window.location.href = '/dashboard';
        else err.classList.add('show');
    } catch (e) { err.textContent = 'خطا در ارتباط'; err.classList.add('show'); }
}
document.getElementById('pass').addEventListener('keydown', function(e) { if (e.key === 'Enter') login(); });
</script>
</body></html>`;

var HTML_SCANNER_PAGE = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Taakaa-Xi | اسکنر</title><style>:root{--orange:#ff6b00;--bg:#0a0a0f;--card:#1a1a2e;--text:#e0e0e0;--text-secondary:#888;--border:rgba(255,255,255,.06);--green:#00ff88;--red:#ff4757;--yellow:#ffa502;--radius:16px}*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:var(--bg);color:var(--text);padding:24px;background-image:radial-gradient(ellipse at 50% 0%,rgba(255,107,0,.06) 0%,transparent 60%)}.container{max-width:1200px;margin:0 auto}h1{color:var(--orange);text-align:center;margin-bottom:24px;font-size:2rem}.controls{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;justify-content:center}select,button{padding:10px 18px;border-radius:10px;border:1px solid var(--border);background:var(--card);color:var(--text);font-family:inherit;cursor:pointer;transition:all .3s}button{background:var(--orange);border:none;font-weight:600}button:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(255,107,0,.2)}.btn-real{background:transparent;border:1px solid var(--orange);color:var(--orange)}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}.ip-card{padding:18px;background:var(--card);border-radius:var(--radius);border:1px solid var(--border);cursor:pointer;transition:all .3s}.ip-card:hover{border-color:var(--orange);transform:translateY(-3px)}.ip-card.best{border-color:var(--green)}.ip-card .ip{font-size:1.1rem;font-weight:700;color:var(--orange)}.ip-card .meta{color:var(--text-secondary);margin-top:5px;font-size:.82rem}.tag{display:inline-block;padding:2px 8px;border-radius:12px;font-size:.68rem;margin-top:5px;margin-right:4px}.tag-op{background:rgba(255,107,0,.15)}.tag-g{background:rgba(0,255,136,.1);color:var(--green)}.tag-y{background:rgba(255,165,2,.1);color:var(--yellow)}.tag-r{background:rgba(255,71,87,.1);color:var(--red)}.spinner{width:36px;height:36px;border:3px solid rgba(255,255,255,.06);border-top-color:var(--orange);border-radius:50%;animation:spin .7s linear infinite;margin:24px auto}@keyframes spin{to{transform:rotate(360deg)}}</style></head><body><div class="container"><h1>📡 اسکنر آی‌پی</h1><div class="controls"><select id="op"><option value="all">همه</option><option value="mci">همراه اول</option><option value="mtn">ایرانسل</option><option value="rtl">رایتل</option></select><select id="cnt"><option value="10">۱۰</option><option value="20">۲۰</option><option value="50">۵۰</option></select><button onclick="scanF()">🔍 سریع</button><button class="btn-real" onclick="scanR()">⚡ واقعی</button></div><div id="st" style="text-align:center;color:var(--text-secondary);margin-bottom:1rem"></div><div class="grid" id="res"><p style="text-align:center;color:var(--text-secondary);grid-column:1/-1">دکمه اسکن را بزنید</p></div></div><script>
function scanF(){var o=document.getElementById('op').value,c=document.getElementById('cnt').value,d=document.getElementById('res'),s=document.getElementById('st');d.innerHTML='<div class="spinner" style="grid-column:1/-1"></div>';s.textContent='در حال دریافت...';fetch('/api/ips?operator='+o+'&count='+c+'&sort=latency').then(function(r){return r.json()}).then(function(r){var h='';r.forEach(function(x,i){var p=Array.isArray(x.ports)?x.ports.join(','):x.ports,l=x.latency||0,lc=l<50?'tag-g':l<80?'tag-y':'tag-r',op=x.operator==='mci'?'همراه اول':x.operator==='mtn'?'ایرانسل':x.operator==='rtl'?'رایتل':'همه';h+='<div class="ip-card'+(i===0?' best':'')+'" onclick="cpy(\''+x.ip+'\',\''+p+'\')"><div class="ip">'+(i===0?'⭐ ':'')+x.ip+'</div><div class="meta">'+p+' | '+x.city+'</div><span class="tag tag-op">'+op+'</span><span class="tag '+lc+'">'+l+'ms</span></div>'});d.innerHTML=h;s.textContent=r.length+' آی‌پی یافت شد'}).catch(function(){d.innerHTML='<p style="text-align:center;color:var(--red);grid-column:1/-1">خطا</p>'})}
function scanR(){var o=document.getElementById('op').value,d=document.getElementById('res'),s=document.getElementById('st');d.innerHTML='<div class="spinner" style="grid-column:1/-1"></div>';s.textContent='اسکن واقعی...';fetch('/api/scan-ips?operator='+o).then(function(r){return r.json()}).then(function(r){if(r.results&&r.results.length){var h='';r.results.forEach(function(x,i){h+='<div class="ip-card'+(i===0?' best':'')+'" onclick="cpy(\''+x.ip+'\',\''+x.port+'\')"><div class="ip">'+(i===0?'⭐ ':'')+x.ip+'</div><div class="meta">پورت: '+x.port+'</div><span class="tag '+(x.latency<100?'tag-g':x.latency<200?'tag-y':'tag-r')+'">'+x.latency+'ms</span></div>'});d.innerHTML=h;s.textContent=r.results.length+' آی‌پی زنده'}else{d.innerHTML='<p style="text-align:center;color:var(--yellow);grid-column:1/-1">زنده‌ای یافت نشد</p>'}}).catch(function(){d.innerHTML='<p style="text-align:center;color:var(--red);grid-column:1/-1">خطا</p>'})}
function cpy(i,p){navigator.clipboard.writeText(i+':'+p.split(',')[0]);alert('کپی شد: '+i)}
</script></body></html>`;
// ============================================
// 🔥 TAAKAA-XI PRO v14 - بخش ۴/۶
// 📄 صفحات جانبی + Main Worker
// ============================================

var HTML_LOCATIONS = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | لوکیشن‌ها</title><style>body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#e0e0e0;padding:30px}h1{color:#ff6b00;text-align:center}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-top:24px}.loc{padding:20px;background:#1a1a2e;border-radius:16px;cursor:pointer;transition:all .3s;text-align:center;border:1px solid rgba(255,255,255,.06)}.loc:hover{border-color:#ff6b00;transform:scale(1.05)}.flag{font-size:2.2rem}.name{font-weight:700;margin-top:6px}.city{color:#888;font-size:.78rem;margin-top:3px}</style></head><body><h1>🌍 لوکیشن‌ها</h1><div class="grid" id="g"></div><script>var l='LOCS_PLACEHOLDER';try{var locs=JSON.parse(l);var h='';locs.forEach(function(x){h+='<div class="loc" onclick="alert(\''+x.name+' - '+x.ip+'\')"><div class="flag">'+x.flag+'</div><div class="name">'+x.name+'</div><div class="city">'+x.city+'</div></div>'});document.getElementById('g').innerHTML=h}catch(e){}</script></body></html>`;

var HTML_OWNERS = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | پشتیبان‌ها</title><style>body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#e0e0e0;text-align:center;padding:40px}h1{color:#ff6b00}.card{margin:24px auto;padding:24px;background:#1a1a2e;border-radius:16px;display:inline-block;border:1px solid rgba(255,255,255,.06)}a{color:#ff6b00}</style></head><body><h1>👥 پشتیبانی</h1><div class="card"><h2>تیم تاکا</h2><p>تلگرام: <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p><p>🚀 ۳ ماه توسعه</p></div></body></html>`;

var HTML_FRAGMENT = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | Fragment</title><style>body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#e0e0e0;padding:40px;max-width:800px;margin:0 auto}h1{color:#ff6b00}.card{background:#1a1a2e;padding:24px;border-radius:16px;border:1px solid rgba(255,255,255,.06);line-height:2}code{background:rgba(255,107,0,.15);padding:3px 8px;border-radius:5px;color:#ff8533}</style></head><body><h1>🛡️ Fragment</h1><div class="card"><p>تکنیک تکه‌تکه کردن بسته‌های TLS برای دور زدن DPI</p><p><code>size</code>: 200-500 | <code>count</code>: 5-10 | <code>delay</code>: 10-30ms</p></div></body></html>`;

var HTML_OFFLINE = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | راهنما</title><style>body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#e0e0e0;padding:40px}h1{color:#ff6b00}.card{background:#1a1a2e;padding:24px;border-radius:16px;border:1px solid rgba(255,255,255,.06)}h2{color:#ff8533;margin-top:18px}</style></head><body><h1>📚 راهنمای اپراتورها</h1><div class="card"><h2>همراه اول</h2><p>پورت‌ها: 443, 8443, 2083</p><h2>ایرانسل</h2><p>پورت‌ها: 443, 2083, 2087</p><h2>رایتل</h2><p>پورت‌ها: 443, 2096</p></div></body></html>`;

// ============================================
// 🚀 MAIN WORKER - PART 1
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
    
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
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
    
    // Use env UUID if set
    if (env.UUID) CONFIG.UUID = env.UUID;
    
    var um = new UserManager(env);
    var sm = new SessionManager(env);
    var hasKV = !!env.KV;
    var hasPass = !!CONFIG.ADMIN_PASS;
    
    // ─── Setup APIs ───
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
    
    // ─── Setup / Login pages ───
    if ((!hasKV || !hasPass) && (path === '/' || path === '')) {
      return new Response(HTML_SETUP, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    // ─── Auth middleware ───
    var publicAPIs = ['login', 'check-kv', 'check-pass', 'setup-pass', 'scan-ips'];
    var apiName = path.replace('/api/', '');
    var isAPI = path.startsWith('/api/');
    
    if (isAPI && publicAPIs.indexOf(apiName) === -1) {
      var cookie = request.headers.get('Cookie') || '';
      var smatch = cookie.match(/session=([^;]+)/);
      if (!smatch || !(await sm.validate(smatch[1]))) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
      }
    }
    
    // ─── Login ───
    if (path === '/api/login' && method === 'POST') {
      var ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (!sm.checkRateLimit(ip)) return new Response(JSON.stringify({ error: 'Too many attempts' }), { status: 429, headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
      
      var loginBody = await request.json();
      if (loginBody.password === CONFIG.ADMIN_PASS) {
        var sid = await sm.create();
        if (!sid) return new Response(JSON.stringify({ error: 'KV not configured' }), { status: 500, headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
        return new Response(JSON.stringify({ success: true }), {
          headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json', 'Set-Cookie': 'session=' + sid + '; Path=/; HttpOnly; SameSite=Strict; Max-Age=' + (CONFIG.SESSION_HOURS * 3600) })
        });
      }
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401, headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    
    // ─── Logout ───
    if (path === '/api/logout' && method === 'POST') {
      var lcookie = request.headers.get('Cookie') || '';
      var lmatch = lcookie.match(/session=([^;]+)/);
      if (lmatch) await sm.destroy(lmatch[1]);
      return new Response(JSON.stringify({ success: true }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json', 'Set-Cookie': 'session=; Path=/; Max-Age=0' }) });
    }
    
    // ─── Stats ───
    if (path === '/api/stats') {
      var stats = await um.getStats();
      return new Response(JSON.stringify(stats), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    
    // ─── Users ───
    if (path === '/api/users' && method === 'GET') {
      var users = await um.getAll();
      return new Response(JSON.stringify(users), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    if (path === '/api/users' && method === 'POST') {
      var data = await request.json();
      var user = await um.add(data);
      return new Response(JSON.stringify(user), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    if (path.match(/^\/api\/users\/([^\/]+)\/reset$/) && method === 'POST') {
      var rid = path.split('/')[3];
      var ruser = await um.resetUsage(rid);
      return new Response(JSON.stringify(ruser), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    if (path.match(/^\/api\/users\/([^\/]+)$/) && method === 'PUT') {
      var uid = path.split('/')[3];
      var udata = await request.json();
      var uuser = await um.update(uid, udata);
      return new Response(JSON.stringify(uuser), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    if (path.match(/^\/api\/users\/([^\/]+)$/) && method === 'DELETE') {
      var did = path.split('/')[3];
      await um.delete(did);
      return new Response(JSON.stringify({ success: true }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    
    // ─── IPs & Scanner ───
    if (path === '/api/ips') {
      var op = url.searchParams.get('operator') || 'all';
      var cnt = parseInt(url.searchParams.get('count') || '10');
      var sort = url.searchParams.get('sort');
      var ips = Helpers.getBestIPs(op, cnt, sort === 'latency');
      return new Response(JSON.stringify(ips), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    if (path === '/api/scan-ips') {
      var sop = url.searchParams.get('operator') || 'all';
      var sips = Helpers.getBestIPs(sop, 10);
      var unique = [];
      var seen = {};
      sips.forEach(function(item) { if (!seen[item.ip]) { seen[item.ip] = true; unique.push(item.ip); } });
      var results = await IPScanner.scanBatch(unique, ['443'], 5);
      return new Response(JSON.stringify({ results: results.slice(0, 20) }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    
    // ─── Config ───
    if (path === '/api/generate-config' && method === 'POST') {
      var cdata = await request.json();
      var config = Helpers.generateConfig(cdata.uuid || CONFIG.UUID, cdata.host || '104.16.71.76', cdata.port || '443', cdata.type || 'vless', cdata.settings || {});
      return new Response(JSON.stringify({ config: config }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    
    // ─── Settings ───
    if (path === '/api/settings' && method === 'GET') {
      return new Response(JSON.stringify(CONFIG), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    if (path === '/api/settings' && method === 'POST') {
      var sdata = await request.json();
      Object.assign(CONFIG, sdata);
      if (env.KV) await env.KV.put('config', JSON.stringify(CONFIG));
      if (sdata.ADMIN_PASS && env.KV) await env.KV.put('admin_pass', sdata.ADMIN_PASS);
      return new Response(JSON.stringify({ success: true }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    
    // ─── Backup ───
    if (path === '/api/backup') {
      var backup = await um.backupData();
      return new Response(JSON.stringify(backup), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
    }
    if (path === '/api/restore' && method === 'POST') {
      try {
        var rdata = await request.json();
        var result = await um.restoreData(rdata);
        return new Response(JSON.stringify({ success: result }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) });
      } catch (e) { return new Response(JSON.stringify({ success: false, error: e.message }), { headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' }) }); }
    }
    // ============================================
// 🔥 TAAKAA-XI PRO v14 - بخش ۵/۶
// 📦 Sub + Static Pages + Proxy
// ============================================

    // ─── Subscription ───
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
      
      bestIPs.forEach(function(item) {
        item.ports.forEach(function(port) {
          var userName = subUser ? subUser.name : 'Main';
          if (subType === 'all' || subType === 'vless') configs.push(Helpers.generateConfig(subUUID, item.ip, port, 'vless', { name: 'Taakaa-Xi-' + userName }));
          if (subType === 'all' || subType === 'trojan') configs.push(Helpers.generateConfig(subUUID, item.ip, port, 'trojan', { name: 'Taakaa-Xi-' + userName }));
          if (subType === 'all' || subType === 'ss') configs.push(Helpers.generateConfig(subUUID, item.ip, port, 'ss', { name: 'Taakaa-Xi-' + userName }));
        });
      });
      
      if (subFormat === 'base64') return new Response(btoa(configs.join('\n')), { headers: { 'Content-Type': 'text/plain' } });
      if (subFormat === 'clash') {
        var clashProxies = [];
        bestIPs.forEach(function(item) {
          item.ports.forEach(function(port) {
            clashProxies.push({ name: 'Taakaa-Xi-' + item.ip + ':' + port, type: 'vless', server: item.ip, port: parseInt(port), uuid: subUUID, network: 'ws', 'ws-opts': { path: '/' }, tls: true, 'servername': CONFIG.SNI });
          });
        });
        return new Response(JSON.stringify({ proxies: clashProxies }, null, 2), { headers: { 'Content-Type': 'application/yaml' } });
      }
      
      return new Response(configs.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    
    // ─── Static Pages ───
    var locsJSON = JSON.stringify(CONFIG.LOCATIONS);
    
    if (path === '/' || path === '') {
      return new Response(HTML_DASHBOARD.replace('UUID_PLACEHOLDER', CONFIG.UUID), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    if (path === '/dashboard') {
      return new Response(HTML_DASHBOARD.replace('UUID_PLACEHOLDER', CONFIG.UUID), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    if (path === '/admin' || path === '/login') {
      return new Response(HTML_LOGIN, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    if (path === '/setup') {
      return new Response(HTML_SETUP, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    if (path === '/scanner') {
      return new Response(HTML_SCANNER_PAGE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    if (path === '/select-location') {
      return new Response(HTML_LOCATIONS.replace('LOCS_PLACEHOLDER', locsJSON), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    if (path === '/owners') {
      return new Response(HTML_OWNERS, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    if (path === '/fragment-info') {
      return new Response(HTML_FRAGMENT, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    if (path === '/offline-support') {
      return new Response(HTML_OFFLINE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    // ─── Proxy Handler ───
    return handleProxy(request, env, ctx);
  }
};
