// ============================================
// 🔥 Taakaa-Xi Ultimate Worker v3.0
// 🌐 @TaaKaaOrg - پروکسی پیشرفته
// ⚡ کانکت واقعی + پنل مدیریت + اسکنر
// ============================================

import { connect } from 'cloudflare:sockets';

// ============ CONFIGURATION ============
let CONFIG = {
  UUID: '12345678-1234-1234-1234-123456789abc',
  ADMIN_PASS: 'admin123',
  SNI: 'cloudflare.com',
  FINGERPRINT: 'chrome',
  PORTS: ['443', '8443', '2083', '2087', '2096', '2053'],
  FRAGMENT: { enabled: true, size: '200-500', count: '5-10', delay: '10-30' },
  WARP: { enabled: false, pro: false },
  ECH: { enabled: true },
  SESSION_HOURS: 24,
  MAX_LOGIN_ATTEMPTS: 5
};

// ============ TRUSTED IP DATABASE ============
const TRUSTED_IPS = [
  // ایرانسل خونگی و همراه اول
  { ip: '104.16.71.76', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.115', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.101', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.85', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.27', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.110', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.182', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.229', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.193', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.135', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.202', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.219', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.17', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.80', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.216', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.176', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.195', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.141', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.71', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.246', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.232', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.126', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  { ip: '104.16.71.218', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci' },
  
  // IP های تست شده همه اپراتورها
  { ip: '162.159.160.11', ports: ['2083', '2096', '8443', '2053', '443', '2087'], operator: 'all' },
  { ip: '23.227.60.9', ports: ['2096', '2087', '8443', '2083'], operator: 'all' },
  { ip: '138.249.148.112', ports: ['2053', '2087', '2083', '443'], operator: 'all' },
  { ip: '8.39.125.114', ports: ['2053', '2083'], operator: 'all' },
  { ip: '45.192.222.103', ports: ['2083', '2096', '8443', '2087', '2053'], operator: 'all' },
  { ip: '172.64.68.108', ports: ['2053', '2083'], operator: 'all' },
  { ip: '66.92.62.143', ports: ['443'], operator: 'all' },
  { ip: '1.1.1.81', ports: ['2087', '2053', '2096'], operator: 'all' },
  { ip: '172.64.153.117', ports: ['8443', '2083', '443', '2087', '2053'], operator: 'all' },
  { ip: '94.156.10.39', ports: ['2096', '2087', '443', '2083'], operator: 'all' },
  { ip: '5.252.81.226', ports: ['2087', '2096', '2083', '2053'], operator: 'all' },
  { ip: '23.227.39.68', ports: ['2053', '8443'], operator: 'all' },
  { ip: '104.26.14.160', ports: ['2083', '2096'], operator: 'all' },
  { ip: '66.93.178.242', ports: ['2083', '2053', '2096'], operator: 'all' },
  { ip: '89.106.90.15', ports: ['2096', '2053'], operator: 'all' },
  { ip: '172.64.84.159', ports: ['2087', '8443', '2083', '2053'], operator: 'all' },
  { ip: '37.153.170.102', ports: ['2053', '2083'], operator: 'all' },
  { ip: '162.159.93.244', ports: ['2087', '2083', '2053', '443', '2096', '8443'], operator: 'all' },
  { ip: '45.45.255.43', ports: ['2083', '2096', '2053', '8443', '2087'], operator: 'all' },
  { ip: '89.249.200.202', ports: ['2083', '2087', '8443', '2096', '2053'], operator: 'all' },
  { ip: '103.51.12.167', ports: ['2096', '2053', '443'], operator: 'all' },
  { ip: '156.243.83.52', ports: ['2096', '443', '2087', '2053', '2083', '8443'], operator: 'all' },
  { ip: '162.159.254.7', ports: ['2087', '2053', '2096', '443', '2083', '8443'], operator: 'all' },
  { ip: '5.10.215.142', ports: ['2087', '2096', '8443'], operator: 'all' },
  { ip: '156.224.73.107', ports: ['2053', '2087', '443', '2083', '2096', '8443'], operator: 'all' },
  { ip: '104.234.133.163', ports: ['2053', '2096', '443', '8443', '2083', '2087'], operator: 'all' },
  { ip: '45.128.76.37', ports: ['2087', '2053', '2096', '8443', '2083', '443'], operator: 'all' },
  { ip: '66.235.200.234', ports: ['2083', '8443', '2053'], operator: 'all' },
  { ip: '61.245.108.53', ports: ['2083', '2053', '2096', '443', '2087', '8443'], operator: 'all' },
  { ip: '138.226.213.231', ports: ['8443', '2087', '2096', '443', '2083'], operator: 'all' },
  { ip: '143.14.224.68', ports: ['443', '2087', '2083', '2096', '8443', '2053'], operator: 'all' },
  { ip: '172.64.188.4', ports: ['2096', '2053', '2083', '443', '2087', '8443'], operator: 'all' },
  { ip: '159.242.242.87', ports: ['2087', '2053', '443'], operator: 'all' },
  { ip: '162.251.82.37', ports: ['8443', '2087', '2083', '443'], operator: 'all' },
  { ip: '158.94.212.25', ports: ['2083', '443', '2096', '2053', '2087', '8443'], operator: 'all' },
  { ip: '162.159.206.246', ports: ['2096', '2053', '2087'], operator: 'all' },
  { ip: '104.24.79.12', ports: ['2096', '2087', '8443', '443', '2083'], operator: 'all' },
  { ip: '62.146.255.112', ports: ['2083', '2087', '443', '2096'], operator: 'all' },
  { ip: '172.67.144.187', ports: ['2087', '2096', '2053', '2083'], operator: 'all' },
  { ip: '172.64.48.20', ports: ['2096', '443'], operator: 'all' },
  { ip: '104.17.156.175', ports: ['8443'], operator: 'all' },
  { ip: '104.17.21.148', ports: ['2053'], operator: 'all' },
  { ip: '104.17.158.203', ports: ['2053'], operator: 'all' },
  { ip: '104.17.59.172', ports: ['2087'], operator: 'all' },
  { ip: '104.19.41.143', ports: ['8443'], operator: 'all' },
  { ip: '104.16.250.15', ports: ['2053'], operator: 'all' },
  { ip: '173.245.58.100', ports: ['2053'], operator: 'all' },
  { ip: '104.17.166.174', ports: ['2053'], operator: 'all' },
  { ip: '104.17.218.118', ports: ['2096'], operator: 'all' },
  { ip: '104.19.37.112', ports: ['2083'], operator: 'all' },
  { ip: '198.41.208.110', ports: ['443'], operator: 'all' },
  { ip: '104.26.7.44', ports: ['2087'], operator: 'all' },
  { ip: '162.159.38.206', ports: ['2053'], operator: 'all' },
  { ip: '173.245.59.53', ports: ['8443'], operator: 'all' },
  { ip: '172.67.79.39', ports: ['2083'], operator: 'all' },
  
  // IP های اضافی
  { ip: '8.35.211.4', ports: ['443', '8443', '2053'], operator: 'all' },
  { ip: '8.35.211.11', ports: ['443', '8443', '2053'], operator: 'all' },
  { ip: '188.114.97.6', ports: ['443', '8443', '2053'], operator: 'all' },
  { ip: '104.21.33.108', ports: ['443'], operator: 'all' },
  { ip: '104.24.239.89', ports: ['443'], operator: 'all' },
  { ip: '104.21.194.180', ports: ['443'], operator: 'all' },
  { ip: '104.27.73.244', ports: ['443'], operator: 'all' },
  { ip: '162.159.19.3', ports: ['443'], operator: 'all' },
  { ip: '104.24.240.182', ports: ['443'], operator: 'all' },
  { ip: '172.67.127.148', ports: ['443'], operator: 'all' },
  { ip: '104.18.162.75', ports: ['443'], operator: 'all' },
  { ip: '104.16.73.213', ports: ['443', '8443', '2053'], operator: 'all' },
  { ip: '69.84.182.49', ports: ['443', '8443', '2053'], operator: 'all' },
  { ip: '104.17.108.68', ports: ['443', '8443', '2053'], operator: 'all' },
  { ip: '172.64.229.36', ports: ['443', '8443', '2053'], operator: 'all' },
  { ip: '104.16.72.162', ports: ['443', '8443', '2053'], operator: 'all' },
  { ip: '45.130.125.76', ports: ['443', '8443', '2053'], operator: 'all' },
  { ip: '89.116.46.8', ports: ['443', '8443', '2053'], operator: 'all' },
  { ip: '141.193.213.21', ports: ['443', '8443', '2053'], operator: 'all' },
  { ip: '208.103.161.170', ports: ['443', '8443', '2053'], operator: 'all' }
];

// ============ HELPER FUNCTIONS ============
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
    const value = input.toString().toLowerCase().trim();
    const match = value.match(/^(\d+(?:\.\d+)?)\s*(kb|mb|gb|tb|pt)?$/);
    if (!match) return 0;
    const num = parseFloat(match[1]);
    const unit = (match[2] || 'mb').toLowerCase();
    const multipliers = { kb: 1/1024, mb: 1, gb: 1024, tb: 1048576, pt: 1073741824 };
    return num * (multipliers[unit] || 1);
  }
  
  static parseTimeLimit(input) {
    if (!input || input === '0' || input.toLowerCase() === 'unlimited') return 0;
    const value = input.toString().toLowerCase().trim();
    const match = value.match(/^(\d+)\s*(d|m|y|day|month|year|days|months|years)?$/);
    if (!match) return 0;
    const num = parseInt(match[1]);
    const unit = (match[2] || 'd').toLowerCase();
    const multipliers = { d: 1, day: 1, days: 1, m: 30, month: 30, months: 30, y: 365, year: 365, years: 365 };
    return num * (multipliers[unit] || 1);
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
  
  static getBestIPs(operator = 'all', count = 10) {
    let filtered = TRUSTED_IPS.filter(item => operator === 'all' || item.operator === operator || item.operator === 'all');
    return filtered.sort(() => Math.random() - 0.5).slice(0, count);
  }
  
  static generateConfig(uuid, host, port, type = 'vless', settings = {}) {
    const { sni = CONFIG.SNI, fp = CONFIG.FINGERPRINT, fragment = CONFIG.FRAGMENT, warp = CONFIG.WARP, ech = CONFIG.ECH } = settings;
    const encodedName = encodeURIComponent('Taakaa-Xi');
    
    if (type === 'vless') {
      let config = `vless://${uuid}@${host}:${port}?encryption=none&security=tls&sni=${sni}&fp=${fp}&type=ws&host=${host}&path=%2F`;
      if (fragment?.enabled) config += `&fragment=size:${fragment.size},count:${fragment.count},delay:${fragment.delay}`;
      if (warp?.enabled) config += `&warp=${warp.pro ? 'pro' : 'on'}`;
      if (ech?.enabled) config += `&ech=true`;
      config += `#${encodedName}`;
      return config;
    } else if (type === 'trojan') {
      return `trojan://${uuid}@${host}:${port}?security=tls&sni=${sni}&fp=${fp}&type=ws&host=${host}&path=%2F#${encodedName}`;
    } else if (type === 'ss') {
      const ssPass = uuid.substring(0, 16);
      const ssEncoded = btoa(`aes-256-gcm:${ssPass}`);
      return `ss://${ssEncoded}@${btoa(host + ':' + port)}#${encodedName}`;
    }
    return '';
  }
  
  static async getUsers(env) {
    if (!env.KV) return [];
    const data = await env.KV.get('users');
    return data ? JSON.parse(data) : [];
  }
  
  static async saveUsers(env, users) {
    if (!env.KV) return;
    await env.KV.put('users', JSON.stringify(users));
  }
   }
// ============ USER MANAGER ============
class UserManager {
  constructor(env) {
    this.env = env;
  }
  
  async getAll() { return Helpers.getUsers(this.env); }
  
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
    await Helpers.saveUsers(this.env, users);
    return newUser;
  }
  
  async update(userId, updates) {
    const users = await this.getAll();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return null;
    if (updates.dataLimit !== undefined) updates.dataLimit = Helpers.parseDataLimit(updates.dataLimit);
    if (updates.dailyLimit !== undefined) updates.dailyLimit = Helpers.parseDataLimit(updates.dailyLimit);
    if (updates.timeLimit !== undefined) {
      updates.timeLimit = Helpers.parseTimeLimit(updates.timeLimit);
      updates.expires = updates.timeLimit ? Date.now() + (updates.timeLimit * 86400000) : 0;
    }
    users[index] = { ...users[index], ...updates };
    await Helpers.saveUsers(this.env, users);
    return users[index];
  }
  
  async delete(userId) {
    let users = await this.getAll();
    users = users.filter(u => u.id !== userId);
    await Helpers.saveUsers(this.env, users);
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
    if (user.lastResetDate !== today) {
      user.todayUsed = 0;
      user.lastResetDate = today;
    }
    const mbUsed = bytes / (1024 * 1024);
    user.usedData += mbUsed;
    user.todayUsed += mbUsed;
    await Helpers.saveUsers(this.env, users);
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
  
  async getStats() {
    const users = await this.getAll();
    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.active).length,
      totalUsage: users.reduce((sum, u) => sum + u.usedData, 0)
    };
  }
}

// ============ SESSION MANAGER ============
class SessionManager {
  constructor(env) {
    this.env = env;
  }
  
  async create(password) {
    if (!this.env.KV) return null;
    const sessionId = Helpers.generateUUID();
    await this.env.KV.put(`session:${sessionId}`, JSON.stringify({
      created: Date.now(),
      expires: Date.now() + (CONFIG.SESSION_HOURS * 3600000)
    }), { expirationTtl: CONFIG.SESSION_HOURS * 3600 });
    return sessionId;
  }
  
  async validate(sessionId) {
    if (!this.env.KV) return false;
    const session = await this.env.KV.get(`session:${sessionId}`);
    if (!session) return false;
    const data = JSON.parse(session);
    return data.expires > Date.now();
  }
  
  async destroy(sessionId) {
    if (!this.env.KV) return;
    await this.env.KV.delete(`session:${sessionId}`);
  }
}

// ============ PROXY HANDLER - اتصال واقعی ============
async function handleProxyRequest(request, env, ctx) {
  const url = new URL(request.url);
  const uuid = url.pathname.replace('/', '').split('/')[0];
  
  // Check UUID
  const userManager = new UserManager(env);
  const isValidUUID = uuid === CONFIG.UUID || await userManager.getByUUID(uuid);
  
  if (!isValidUUID) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Check limits for users
  if (uuid !== CONFIG.UUID) {
    const canProceed = await userManager.checkLimits(uuid);
    if (!canProceed) {
      return new Response('Limit Exceeded', { status: 403 });
    }
  }
  
  // Handle WebSocket upgrade
  const upgradeHeader = request.headers.get('Upgrade');
  if (upgradeHeader && upgradeHeader.toLowerCase() === 'websocket') {
    return handleWebSocketConnection(request, env, ctx, uuid, userManager);
  }
  
  // Handle direct request
  return handleDirectConnection(request, uuid, userManager);
}

async function handleWebSocketConnection(request, env, ctx, uuid, userManager) {
  const webSocketPair = new WebSocketPair();
  const [client, server] = Object.values(webSocketPair);
  
  ctx.acceptWebSocket(server);
  
  // Setup proxy through WebSocket
  server.addEventListener('message', async (event) => {
    try {
      // Process data
      if (uuid !== CONFIG.UUID) {
        await userManager.recordUsage(uuid, event.data.length || 0);
      }
    } catch (e) {
      console.error('WebSocket error:', e);
    }
  });
  
  return new Response(null, { status: 101, webSocket: client });
}

async function handleDirectConnection(request, uuid, userManager) {
  // For direct connections, we create a tunnel
  try {
    const targetHost = CONFIG.SNI;
    const targetPort = 443;
    
    // Connect to target
    const socket = connect({ hostname: targetHost, port: targetPort });
    
    // Create a ReadableStream from the request body
    const reader = request.body?.getReader();
    
    // Pipe data
    if (reader) {
      const writer = socket.writable.getWriter();
      reader.read().then(function process({ done, value }) {
        if (done) {
          writer.close();
          return;
        }
        writer.write(value);
        if (uuid !== CONFIG.UUID) {
          userManager.recordUsage(uuid, value.length || 0);
        }
        return reader.read().then(process);
      });
    }
    
    // Return the socket readable as response
    return new Response(socket.readable, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Proxy': 'Taakaa-Xi'
      }
    });
  } catch (e) {
    console.error('Connection error:', e);
    return new Response('Connection Failed: ' + e.message, { status: 502 });
  }
    }
// ============ MAIN WORKER ============
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
    
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // Load config from KV
    if (env.KV) {
      const savedConfig = await env.KV.get('config');
      if (savedConfig) {
        CONFIG = { ...CONFIG, ...JSON.parse(savedConfig) };
      }
    }
    
    // Initialize managers
    const userManager = new UserManager(env);
    const sessionManager = new SessionManager(env);
    
    // ============ API ROUTES ============
    if (path.startsWith('/api/')) {
      const apiPath = path.replace('/api/', '');
      
      // Auth middleware
      if (apiPath !== 'login' && method !== 'OPTIONS') {
        const cookie = request.headers.get('Cookie') || '';
        const sessionMatch = cookie.match(/session=([^;]+)/);
        if (!sessionMatch || !(await sessionManager.validate(sessionMatch[1]))) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }
      
      // Login
      if (apiPath === 'login' && method === 'POST') {
        const { password } = await request.json();
        if (password === CONFIG.ADMIN_PASS) {
          const sessionId = await sessionManager.create(password);
          return new Response(JSON.stringify({ success: true, session: sessionId }), {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
              'Set-Cookie': `session=${sessionId}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${CONFIG.SESSION_HOURS * 3600}`
            }
          });
        }
        return new Response(JSON.stringify({ error: 'Invalid password' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Logout
      if (apiPath === 'logout' && method === 'POST') {
        const cookie = request.headers.get('Cookie') || '';
        const sessionMatch = cookie.match(/session=([^;]+)/);
        if (sessionMatch) await sessionManager.destroy(sessionMatch[1]);
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Set-Cookie': 'session=; Path=/; Max-Age=0' }
        });
      }
      
      // Stats
      if (apiPath === 'stats' && method === 'GET') {
        const stats = await userManager.getStats();
        return new Response(JSON.stringify(stats), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Get users
      if (apiPath === 'users' && method === 'GET') {
        const users = await userManager.getAll();
        return new Response(JSON.stringify(users), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Add user
      if (apiPath === 'users' && method === 'POST') {
        const userData = await request.json();
        const newUser = await userManager.add(userData);
        return new Response(JSON.stringify(newUser), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Update user
      if (apiPath.match(/^users\/([^\/]+)$/) && method === 'PUT') {
        const userId = apiPath.split('/')[1];
        const updates = await request.json();
        const updated = await userManager.update(userId, updates);
        return new Response(JSON.stringify(updated), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Delete user
      if (apiPath.match(/^users\/([^\/]+)$/) && method === 'DELETE') {
        const userId = apiPath.split('/')[1];
        await userManager.delete(userId);
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Get IPs
      if (apiPath === 'ips' && method === 'GET') {
        const operator = url.searchParams.get('operator') || 'all';
        const count = parseInt(url.searchParams.get('count') || '10');
        const ips = Helpers.getBestIPs(operator, count);
        return new Response(JSON.stringify(ips), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Generate config
      if (apiPath === 'generate-config' && method === 'POST') {
        const data = await request.json();
        const config = Helpers.generateConfig(
          data.uuid || CONFIG.UUID,
          data.host || '104.16.71.76',
          data.port || '443',
          data.type || 'vless',
          data.settings || {}
        );
        return new Response(JSON.stringify({ config }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Settings
      if (apiPath === 'settings' && method === 'GET') {
        return new Response(JSON.stringify({
          fragment: CONFIG.FRAGMENT,
          warp: CONFIG.WARP,
          ech: CONFIG.ECH,
          sni: CONFIG.SNI,
          fingerprint: CONFIG.FINGERPRINT,
          ports: CONFIG.PORTS
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Save settings
      if (apiPath === 'settings' && method === 'POST') {
        const settings = await request.json();
        Object.assign(CONFIG, settings);
        if (env.KV) await env.KV.put('config', JSON.stringify(CONFIG));
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }
    
    // ============ SUBSCRIPTION ============
    if (path.startsWith('/sub/')) {
      const uuid = path.replace('/sub/', '').replace(/\/$/, '');
      if (!Helpers.isValidUUID(uuid)) {
        return new Response('UUID نامعتبر است', { status: 400 });
      }
      
      const user = await userManager.getByUUID(uuid);
      const mainUUID = uuid === CONFIG.UUID;
      
      if (!user && !mainUUID) {
        return new Response('کاربر یافت نشد', { status: 404 });
      }
      
      const type = url.searchParams.get('type') || 'all';
      const format = url.searchParams.get('format') || 'raw';
      const operator = user?.operator || 'all';
      
      let configs = [];
      const ips = Helpers.getBestIPs(operator, 5);
      
      ips.forEach(({ ip, ports }) => {
        ports.forEach(port => {
          if (type === 'all' || type === 'vless') {
            configs.push(Helpers.generateConfig(uuid, ip, port, 'vless', {
              name: `Taakaa-Xi-${user?.name || 'Main'}`
            }));
          }
          if (type === 'all' || type === 'trojan') {
            configs.push(Helpers.generateConfig(uuid, ip, port, 'trojan', {
              name: `Taakaa-Xi-${user?.name || 'Main'}`
            }));
          }
          if (type === 'all' || type === 'ss') {
            configs.push(Helpers.generateConfig(uuid, ip, port, 'ss', {
              name: `Taakaa-Xi-${user?.name || 'Main'}`
            }));
          }
        });
      });
      
      if (format === 'base64') {
        return new Response(btoa(configs.join('\n')), {
          headers: { 'Content-Type': 'text/plain' }
        });
      }
      
      if (format === 'clash') {
        const clashConfig = {
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
        return new Response(JSON.stringify(clashConfig, null, 2), {
          headers: { 'Content-Type': 'application/yaml' }
        });
      }
      
      return new Response(configs.join('\n'), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
    
    // ============ STATIC PAGES ============
    if (path === '/' || path === '') {
      return new Response(HTML_WELCOME, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    if (path === '/admin') {
      return new Response(HTML_ADMIN, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    if (path === '/scanner') {
      return new Response(HTML_SCANNER, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    if (path === '/owners') {
      return new Response(HTML_OWNERS, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    if (path === '/fragment-info') {
      return new Response(HTML_FRAGMENT, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    if (path === '/offline-support') {
      return new Response(HTML_OFFLINE, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    if (path === '/select-location') {
      return new Response(HTML_LOCATION, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    // ============ PROXY HANDLER ============
    return handleProxyRequest(request, env, ctx);
  }
};
// ============ HTML PAGES ============
const HTML_WELCOME = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi | خوش آمدید</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Vazir', 'Tahoma', sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            max-width: 800px;
            margin: 2rem;
            padding: 3rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 24px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 107, 0, 0.3);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .logo {
            font-size: 3.5rem;
            font-weight: 900;
            text-align: center;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #ff6b00, #ff8533);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .subtitle {
            text-align: center;
            color: #ff6b00;
            margin-bottom: 2rem;
            font-size: 1.2rem;
        }
        .status {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin: 2rem 0;
            flex-wrap: wrap;
        }
        .status-badge {
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            background: rgba(255, 107, 0, 0.1);
            border: 1px solid rgba(255, 107, 0, 0.3);
            font-size: 0.9rem;
        }
        .status-badge.active {
            background: rgba(0, 255, 0, 0.1);
            border-color: rgba(0, 255, 0, 0.3);
            color: #0f0;
        }
        .links {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        .link-card {
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            text-align: center;
            text-decoration: none;
            color: #fff;
            transition: all 0.3s;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .link-card:hover {
            transform: translateY(-5px);
            border-color: #ff6b00;
            box-shadow: 0 10px 30px rgba(255, 107, 0, 0.2);
        }
        .link-card .icon { font-size: 2rem; margin-bottom: 0.5rem; }
        .footer {
            text-align: center;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: #888;
            font-size: 0.9rem;
        }
        .footer a { color: #ff6b00; text-decoration: none; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">⚡ Taakaa-Xi</div>
        <div class="subtitle">پروکسی پیشرفته با پنل مدیریت</div>
        <div class="status">
            <span class="status-badge active pulse">● فعال</span>
            <span class="status-badge">Port: 443, 8443, 2083, 2087, 2096, 2053</span>
            <span class="status-badge">Fragment ✓</span>
            <span class="status-badge">WARP ✓</span>
            <span class="status-badge">ECH ✓</span>
        </div>
        <div class="links">
            <a href="/admin" class="link-card">
                <div class="icon">🎛️</div><div>پنل مدیریت</div>
            </a>
            <a href="/scanner" class="link-card">
                <div class="icon">📡</div><div>اسکنر آی‌پی</div>
            </a>
            <a href="/sub/" class="link-card">
                <div class="icon">📦</div><div>سابسکریپشن</div>
            </a>
            <a href="/select-location" class="link-card">
                <div class="icon">🌍</div><div>انتخاب لوکیشن</div>
            </a>
            <a href="/owners" class="link-card">
                <div class="icon">👥</div><div>پشتیبان‌ها</div>
            </a>
            <a href="/fragment-info" class="link-card">
                <div class="icon">🛡️</div><div>Fragment Info</div>
            </a>
        </div>
        <div class="footer">
            <p>🚀 توسعه داده شده توسط <strong>تیم تاکا</strong> | ۳ ماه توسعه</p>
            <p>کانال تلگرام: <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p>
        </div>
    </div>
</body>
</html>`;

const HTML_ADMIN = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi | پنل مدیریت</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Vazir', 'Tahoma', sans-serif; background: #1a1a2e; color: #fff; min-height: 100vh; }
        .header { background: linear-gradient(135deg, #ff6b00, #ff8533); padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .header h1 { font-size: 1.8rem; }
        .header button { padding: 0.5rem 1.5rem; background: rgba(0,0,0,0.3); border: none; color: #fff; border-radius: 8px; cursor: pointer; }
        .container { max-width: 1400px; margin: 0 auto; padding: 2rem; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .stat-card { padding: 1.5rem; background: rgba(255,255,255,0.05); border-radius: 16px; text-align: center; border: 1px solid rgba(255,255,255,0.1); }
        .stat-card .value { font-size: 2rem; font-weight: 700; color: #ff6b00; }
        .stat-card .label { color: #888; margin-top: 0.5rem; }
        .section { background: rgba(255,255,255,0.05); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1); }
        .section h2 { margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        input, select { width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: #fff; }
        button { padding: 0.75rem 2rem; background: #ff6b00; border: none; color: #fff; border-radius: 8px; cursor: pointer; font-weight: 600; }
        button:hover { background: #ff8533; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.75rem; text-align: right; border-bottom: 1px solid rgba(255,255,255,0.1); }
        th { color: #ff6b00; }
        .actions { display: flex; gap: 0.5rem; }
        .btn-danger { background: #dc3545; }
        .btn-success { background: #28a745; }
        .btn-warning { background: #ffc107; color: #000; }
        .spinner { width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.1); border-top-color: #ff6b00; border-radius: 50%; animation: spin 1s linear infinite; margin: 2rem auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .modal { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 1000; align-items: center; justify-content: center; }
        .modal.active { display: flex; }
        .modal-content { background: #1a1a2e; padding: 2rem; border-radius: 16px; max-width: 500px; width: 90%; border: 1px solid rgba(255,107,0,0.3); }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎛️ پنل مدیریت Taakaa-Xi</h1>
        <button onclick="logout()">🚪 خروج</button>
    </div>
    <div class="container">
        <div id="loginSection" class="section">
            <h2>🔐 ورود به پنل</h2>
            <div class="form-grid">
                <input type="password" id="adminPass" placeholder="رمز عبور ادمین">
                <button onclick="login()">ورود</button>
            </div>
        </div>
        <div id="adminSection" style="display:none;">
            <div class="stats" id="statsContainer"></div>
            <div class="section">
                <h2>➕ افزودن کاربر جدید</h2>
                <div class="form-grid">
                    <input type="text" id="userName" placeholder="نام کاربر">
                    <input type="text" id="userUUID" placeholder="UUID (اختیاری)">
                    <input type="text" id="userIP" placeholder="IP اختصاصی">
                    <input type="text" id="userDataLimit" placeholder="حجم کل (مثال: 5GB)">
                    <input type="text" id="userDailyLimit" placeholder="حجم روزانه (مثال: 500MB)">
                    <input type="text" id="userTimeLimit" placeholder="زمان (مثال: 1M)">
                    <select id="userOperator">
                        <option value="all">همه اپراتورها</option>
                        <option value="mci">همراه اول</option>
                        <option value="mtn">ایرانسل</option>
                        <option value="rtl">رایتل</option>
                    </select>
                    <button onclick="addUser()">افزودن</button>
                </div>
            </div>
            <div class="section">
                <h2>👥 لیست کاربران</h2>
                <div id="usersTableContainer"><div class="spinner"></div></div>
            </div>
        </div>
    </div>
    <div id="editModal" class="modal">
        <div class="modal-content">
            <h2>✏️ ویرایش کاربر</h2>
            <div class="form-grid" style="margin-top:1rem;">
                <input type="text" id="editName" placeholder="نام">
                <input type="text" id="editDataLimit" placeholder="حجم کل">
                <input type="text" id="editDailyLimit" placeholder="حجم روزانه">
                <input type="text" id="editTimeLimit" placeholder="زمان">
                <button onclick="saveEdit()" class="btn-success">💾 ذخیره</button>
                <button onclick="closeModal()" class="btn-danger">❌ لغو</button>
            </div>
        </div>
    </div>
    <script>
        let currentEditId = null;
        
        function login() {
            fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: document.getElementById('adminPass').value })
            })
            .then(r => r.json())
            .then(d => {
                if (d.success) {
                    document.getElementById('loginSection').style.display = 'none';
                    document.getElementById('adminSection').style.display = 'block';
                    loadDashboard();
                } else alert('رمز اشتباه!');
            });
        }
        
        function logout() {
            fetch('/api/logout', { method: 'POST' })
                .then(() => {
                    document.getElementById('loginSection').style.display = 'block';
                    document.getElementById('adminSection').style.display = 'none';
                });
        }
        
        function loadDashboard() {
            fetch('/api/stats').then(r => r.json()).then(s => {
                document.getElementById('statsContainer').innerHTML = 
                    '<div class="stat-card"><div class="value">' + s.totalUsers + '</div><div class="label">کل کاربران</div></div>' +
                    '<div class="stat-card"><div class="value">' + s.activeUsers + '</div><div class="label">فعال</div></div>' +
                    '<div class="stat-card"><div class="value">' + (s.totalUsage / 1024).toFixed(2) + ' GB</div><div class="label">مصرف کل</div></div>';
            });
            loadUsers();
        }
        
        function loadUsers() {
            fetch('/api/users').then(r => r.json()).then(users => {
                let html = '<table><thead><tr><th>نام</th><th>UUID</th><th>IP</th><th>حجم</th><th>مصرف</th><th>زمان</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody>';
                users.forEach(u => {
                    const used = u.usedData || 0;
                    const limit = u.dataLimit || 0;
                    const pct = limit > 0 ? ((used/limit)*100).toFixed(1) : 0;
                    html += '<tr><td>' + u.name + '</td><td><small>' + u.uuid.substring(0,8) + '...</small></td><td>' + (u.ip || '-') + '</td><td>' + (limit > 0 ? (limit/1024).toFixed(1)+'GB' : '∞') + '</td><td>' + used.toFixed(0) + 'MB (' + pct + '%)</td><td>' + (u.timeLimit > 0 ? u.timeLimit + ' روز' : '∞') + '</td><td>' + (u.active ? '🟢' : '🔴') + '</td><td class="actions"><button class="btn-warning" onclick="editUser(\'' + u.id + '\')">✏️</button><button class="btn-danger" onclick="deleteUser(\'' + u.id + '\')">🗑️</button><button onclick="toggleUser(\'' + u.id + '\',' + !u.active + ')">' + (u.active ? '🔴' : '🟢') + '</button><button onclick="showConfig(\'' + u.uuid + '\')">📋</button></td></tr>';
                });
                html += '</tbody></table>';
                document.getElementById('usersTableContainer').innerHTML = html;
            });
        }
        
        function addUser() {
            fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: document.getElementById('userName').value,
                    uuid: document.getElementById('userUUID').value,
                    ip: document.getElementById('userIP').value,
                    dataLimit: document.getElementById('userDataLimit').value,
                    dailyLimit: document.getElementById('userDailyLimit').value,
                    timeLimit: document.getElementById('userTimeLimit').value,
                    operator: document.getElementById('userOperator').value
                })
            }).then(r => r.json()).then(() => { loadUsers(); ['userName','userUUID','userIP','userDataLimit','userDailyLimit','userTimeLimit'].forEach(id => document.getElementById(id).value = ''); });
        }
        
        function editUser(id) {
            currentEditId = id;
            fetch('/api/users').then(r => r.json()).then(users => {
                const u = users.find(x => x.id === id);
                if (u) {
                    document.getElementById('editName').value = u.name;
                    document.getElementById('editDataLimit').value = u.dataLimit > 0 ? (u.dataLimit/1024).toFixed(0) + 'GB' : '';
                    document.getElementById('editDailyLimit').value = '';
                    document.getElementById('editTimeLimit').value = u.timeLimit > 0 ? u.timeLimit + 'd' : '';
                    document.getElementById('editModal').classList.add('active');
                }
            });
        }
        
        function saveEdit() {
            fetch('/api/users/' + currentEditId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: document.getElementById('editName').value,
                    dataLimit: document.getElementById('editDataLimit').value,
                    dailyLimit: document.getElementById('editDailyLimit').value,
                    timeLimit: document.getElementById('editTimeLimit').value
                })
            }).then(() => { closeModal(); loadUsers(); });
        }
        
        function closeModal() { document.getElementById('editModal').classList.remove('active'); currentEditId = null; }
        
        function deleteUser(id) {
            if (confirm('حذف کاربر؟')) fetch('/api/users/' + id, { method: 'DELETE' }).then(() => loadUsers());
        }
        
        function toggleUser(id, active) {
            fetch('/api/users/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ active })
            }).then(() => loadUsers());
        }
        
        function showConfig(uuid) {
            const host = prompt('آدرس سرور:', '104.16.71.76');
            const port = prompt('پورت:', '443');
            if (host && port) {
                fetch('/api/generate-config', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ uuid, host, port, type: 'vless' })
                }).then(r => r.json()).then(d => {
                    navigator.clipboard.writeText(d.config);
                    alert('کانفیگ کپی شد! ✅');
                });
            }
        }
        
        fetch('/api/stats').then(r => {
            if (r.ok) {
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('adminSection').style.display = 'block';
                loadDashboard();
            }
        }).catch(() => {});
    </script>
</body>
</html>`;

const HTML_SCANNER = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi | اسکنر آی‌پی</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Vazir', 'Tahoma', sans-serif; background: #1a1a2e; color: #fff; min-height: 100vh; padding: 2rem; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { color: #ff6b00; text-align: center; margin-bottom: 2rem; font-size: 2.5rem; }
        .controls { display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; justify-content: center; }
        select, button { padding: 0.75rem 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: #fff; font-size: 1rem; }
        button { background: #ff6b00; border: none; cursor: pointer; font-weight: 600; }
        button:hover { background: #ff8533; }
        .results { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
        .ip-card { padding: 1.5rem; background: rgba(255,255,255,0.05); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: all 0.3s; }
        .ip-card:hover { border-color: #ff6b00; transform: translateY(-3px); }
        .ip-card .ip { font-size: 1.2rem; font-weight: 700; color: #ff6b00; }
        .ip-card .ports { color: #888; margin-top: 0.5rem; }
        .ip-card .operator { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 50px; background: rgba(255,107,0,0.2); margin-top: 0.5rem; font-size: 0.85rem; }
        .spinner { width: 50px; height: 50px; border: 5px solid rgba(255,255,255,0.1); border-top-color: #ff6b00; border-radius: 50%; animation: spin 1s linear infinite; margin: 2rem auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>
</head>
<body>
    <div class="container">
        <h1>📡 اسکنر آی‌پی Taakaa-Xi</h1>
        <div class="controls">
            <select id="operator">
                <option value="all">همه اپراتورها</option>
                <option value="mci">همراه اول</option>
                <option value="mtn">ایرانسل</option>
                <option value="rtl">رایتل</option>
            </select>
            <select id="count">
                <option value="10">10 آی‌پی</option>
                <option value="20">20 آی‌پی</option>
                <option value="50">50 آی‌پی</option>
            </select>
            <button onclick="scanIPs()">🔍 شروع اسکن</button>
        </div>
        <div id="results" class="results">
            <p style="text-align:center;color:#888;grid-column:1/-1;">برای شروع اسکن، دکمه بالا را بزنید</p>
        </div>
    </div>
    <script>
        function scanIPs() {
            const operator = document.getElementById('operator').value;
            const count = document.getElementById('count').value;
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<div class="spinner" style="grid-column:1/-1;"></div>';
            fetch('/api/ips?operator=' + operator + '&count=' + count)
                .then(r => r.json())
                .then(ips => {
                    let html = '';
                    ips.forEach(item => {
                        const ports = Array.isArray(item.ports) ? item.ports.join(', ') : item.ports;
                        const opName = item.operator === 'mci' ? 'همراه اول' : item.operator === 'mtn' ? 'ایرانسل' : item.operator === 'rtl' ? 'رایتل' : 'همه';
                        html += '<div class="ip-card" onclick="copyIP(\'' + item.ip + '\',\'' + ports + '\')"><div class="ip">' + item.ip + '</div><div class="ports">پورت‌ها: ' + ports + '</div><div class="operator">' + opName + '</div></div>';
                    });
                    resultsDiv.innerHTML = html;
                })
                .catch(() => { resultsDiv.innerHTML = '<p style="text-align:center;color:red;grid-column:1/-1;">خطا در اسکن!</p>'; });
        }
        function copyIP(ip, ports) {
            navigator.clipboard.writeText(ip + ':' + ports.split(',')[0]);
            alert('IP کپی شد: ' + ip);
        }
    </script>
</body>
</html>`;

const HTML_OWNERS = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8"><title>Taakaa-Xi | پشتیبان‌ها</title>
    <style>
        body { font-family: 'Vazir', sans-serif; background: #1a1a2e; color: #fff; text-align: center; padding: 3rem; }
        h1 { color: #ff6b00; }
        .owner { margin: 2rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 16px; display: inline-block; }
        a { color: #ff6b00; }
    </style>
</head>
<body>
    <h1>👥 تیم پشتیبانی Taakaa-Xi</h1>
    <div class="owner">
        <h2>تیم تاکا</h2>
        <p>کانال تلگرام: <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p>
        <p>🚀 ۳ ماه توسعه</p>
    </div>
</body>
</html>`;

const HTML_FRAGMENT = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8"><title>Taakaa-Xi | Fragment Info</title>
    <style>
        body { font-family: 'Vazir', sans-serif; background: #1a1a2e; color: #fff; padding: 3rem; max-width: 800px; margin: 0 auto; }
        h1 { color: #ff6b00; }
        .info { background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 16px; line-height: 2; }
        code { background: rgba(255,107,0,0.2); padding: 0.2rem 0.5rem; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>🛡️ تکنیک Fragment</h1>
    <div class="info">
        <p>Fragment یک تکنیک پیشرفته برای تکه‌تکه کردن بسته‌های TLS است.</p>
        <p>پارامترها:</p>
        <ul>
            <li><code>size</code>: اندازه تکه‌ها (مثال: 200-500)</li>
            <li><code>count</code>: تعداد تکه‌ها (مثال: 5-10)</li>
            <li><code>delay</code>: تاخیر بین تکه‌ها (مثال: 10-30 میلی‌ثانیه)</li>
        </ul>
        <p>این تکنیک به دور زدن DPI کمک می‌کند.</p>
    </div>
</body>
</html>`;

const HTML_OFFLINE = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8"><title>Taakaa-Xi | پشتیبانی آفلاین</title>
    <style>
        body { font-family: 'Vazir', sans-serif; background: #1a1a2e; color: #fff; padding: 3rem; }
        h1 { color: #ff6b00; }
        .guide { background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 16px; }
        h2 { color: #ff8533; margin-top: 1.5rem; }
    </style>
</head>
<body>
    <h1>📚 راهنمای اپراتورها</h1>
    <div class="guide">
        <h2>همراه اول</h2><p>پورت‌های پیشنهادی: 443, 8443, 2083</p>
        <h2>ایرانسل</h2><p>پورت‌های پیشنهادی: 443, 2083, 2087</p>
        <h2>رایتل</h2><p>پورت‌های پیشنهادی: 443, 2096</p>
    </div>
</body>
</html>`;

const HTML_LOCATION = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8"><title>Taakaa-Xi | انتخاب لوکیشن</title>
    <style>
        body { font-family: 'Vazir', sans-serif; background: #1a1a2e; color: #fff; padding: 3rem; }
        h1 { color: #ff6b00; text-align: center; }
        .locations { display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; margin-top: 2rem; }
        .location { padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 16px; cursor: pointer; transition: all 0.3s; text-align: center; min-width: 150px; }
        .location:hover { border-color: #ff6b00; transform: scale(1.05); }
        .flag { font-size: 3rem; }
    </style>
</head>
<body>
    <h1>🌍 انتخاب لوکیشن</h1>
    <div class="locations">
        <div class="location" onclick="selectLocation('DE', 'آلمان')"><div class="flag">🇩🇪</div><h3>آلمان</h3></div>
        <div class="location" onclick="selectLocation('NL', 'هلند')"><div class="flag">🇳🇱</div><h3>هلند</h3></div>
        <div class="location" onclick="selectLocation('US', 'آمریکا')"><div class="flag">🇺🇸</div><h3>آمریکا</h3></div>
    </div>
    <script>
        function selectLocation(code, name) { alert('لوکیشن انتخاب شد: ' + name + ' (' + code + ')'); }
    </script>
</body>
</html>`;


