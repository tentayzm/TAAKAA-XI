// ============================================
// 🔥 TAAKAA-XI PRO v11.0 - ULTIMATE EDITION
// 🌐 @TaaKaaOrg
// ⚡ UI مدرن + انیمیشن + تمام قابلیت‌ها
// 📡 حرفه‌ای‌تر از Nova-Proxy
// ============================================

let CONFIG = {
  // ─── Core ───
  UUID: '12345678-1234-1234-1234-123456789abc',
  ADMIN_PASS: '',
  VERSION: '11.0.0',
  
  // ─── TLS & Security ───
  SNI: 'cloudflare.com',
  FINGERPRINT: 'chrome',
  FINGERPRINTS: [
    'chrome',
    'firefox',
    'safari',
    'random',
    'ios',
    'android',
    'edge',
    '360',
    'qq',
    'sogou',
    'opera',
    'brave'
  ],
  ECH: { enabled: true },
  ALLOW_INSECURE: false,
  
  // ─── Protocols ───
  PROTOCOLS: {
    vless: { enabled: true },
    trojan: { enabled: true },
    shadowsocks: { enabled: true, method: 'aes-256-gcm' },
    xhttp: { enabled: false, mode: 'packet-up' },
    grpc: { enabled: false, serviceName: 'grpc' },
    websocket: { enabled: true }
  },
  
  // ─── Ports & Transport ───
  PORTS: ['443', '8443', '2083', '2087', '2096', '2053'],
  FRAGMENT: { 
    enabled: true, 
    size: '200-500', 
    count: '5-10', 
    delay: '10-30' 
  },
  WARP: { enabled: false, pro: false },
  
  // ─── Routing & Filters ───
  ROUTING: { enabled: false, geoIP: false, geoSite: false },
  FILTERS: {
    adBlock: false,
    pornBlock: false,
    iranBlock: false,
    speedtestBlock: true,
    malwareBlock: false,
    phishingBlock: false
  },
  
  // ─── DNS ───
  DNS: {
    enabled: false,
    doh: 'https://cloudflare-dns.com/dns-query'
  },
  
  // ─── Backend ───
  BACKEND: { enabled: false, url: '' },
  
  // ─── Session & Security ───
  SESSION_HOURS: 24,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 300,
  TOTP: { enabled: false, secret: '', issuer: 'Taakaa-Xi' },
  
  // ─── Telegram Bot ───
  TELEGRAM: { enabled: false, botToken: '', adminID: '' },
  
  // ─── Locations ───
  LOCATIONS: [
    { code: 'DE', name: 'آلمان', flag: '🇩🇪', ip: '104.16.71.76', city: 'Frankfurt' },
    { code: 'NL', name: 'هلند', flag: '🇳🇱', ip: '104.16.71.115', city: 'Amsterdam' },
    { code: 'US', name: 'آمریکا', flag: '🇺🇸', ip: '104.16.71.101', city: 'New York' },
    { code: 'UK', name: 'انگلیس', flag: '🇬🇧', ip: '104.16.71.85', city: 'London' },
    { code: 'FR', name: 'فرانسه', flag: '🇫🇷', ip: '104.16.71.27', city: 'Paris' },
    { code: 'JP', name: 'ژاپن', flag: '🇯🇵', ip: '104.16.71.110', city: 'Tokyo' },
    { code: 'SG', name: 'سنگاپور', flag: '🇸🇬', ip: '104.16.71.182', city: 'Singapore' },
    { code: 'CA', name: 'کانادا', flag: '🇨🇦', ip: '104.16.71.229', city: 'Toronto' },
    { code: 'AU', name: 'استرالیا', flag: '🇦🇺', ip: '104.16.71.193', city: 'Sydney' },
    { code: 'BR', name: 'برزیل', flag: '🇧🇷', ip: '104.16.71.135', city: 'Sao Paulo' },
    { code: 'IN', name: 'هند', flag: '🇮🇳', ip: '104.16.71.202', city: 'Mumbai' },
    { code: 'AE', name: 'امارات', flag: '🇦🇪', ip: '104.16.71.219', city: 'Dubai' },
    { code: 'TR', name: 'ترکیه', flag: '🇹🇷', ip: '104.26.7.44', city: 'Istanbul' },
    { code: 'RU', name: 'روسیه', flag: '🇷🇺', ip: '162.159.38.206', city: 'Moscow' },
    { code: 'ZA', name: 'آفریقا', flag: '🇿🇦', ip: '173.245.59.53', city: 'Johannesburg' }
  ]
};

// ============================================
// 📡 TRUSTED IP DATABASE
// ============================================
const TRUSTED_IPS = [
  { ip: '104.16.71.76', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 45, city: 'Frankfurt', country: 'DE' },
  { ip: '104.16.71.115', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 48, city: 'Amsterdam', country: 'NL' },
  { ip: '104.16.71.101', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 42, city: 'New York', country: 'US' },
  { ip: '104.16.71.85', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 50, city: 'London', country: 'UK' },
  { ip: '104.16.71.27', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 38, city: 'Paris', country: 'FR' },
  { ip: '104.16.71.110', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 55, city: 'Tokyo', country: 'JP' },
  { ip: '104.16.71.182', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 41, city: 'Singapore', country: 'SG' },
  { ip: '104.16.71.229', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 47, city: 'Toronto', country: 'CA' },
  { ip: '104.16.71.193', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 44, city: 'Sydney', country: 'AU' },
  { ip: '104.16.71.135', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 52, city: 'Sao Paulo', country: 'BR' },
  { ip: '104.16.71.202', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 39, city: 'Mumbai', country: 'IN' },
  { ip: '104.16.71.219', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 46, city: 'Dubai', country: 'AE' },
  { ip: '104.16.71.17', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 43, city: 'Berlin', country: 'DE' },
  { ip: '104.16.71.80', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 51, city: 'Madrid', country: 'ES' },
  { ip: '104.16.71.216', ports: ['443', '8443', '2083', '2087', '2096', '2053'], operator: 'mci', latency: 37, city: 'Rome', country: 'IT' },
  { ip: '162.159.160.11', ports: ['2083', '2096', '8443', '2053', '443', '2087'], operator: 'all', latency: 55, city: 'Miami', country: 'US' },
  { ip: '23.227.60.9', ports: ['2096', '2087', '8443', '2083'], operator: 'all', latency: 60, city: 'Los Angeles', country: 'US' },
  { ip: '138.249.148.112', ports: ['2053', '2087', '2083', '443'], operator: 'all', latency: 58, city: 'Chicago', country: 'US' },
  { ip: '1.1.1.81', ports: ['2087', '2053', '2096'], operator: 'all', latency: 40, city: 'San Francisco', country: 'US' },
  { ip: '172.64.153.117', ports: ['8443', '2083', '443', '2087', '2053'], operator: 'all', latency: 52, city: 'Dallas', country: 'US' },
  { ip: '94.156.10.39', ports: ['2096', '2087', '443', '2083'], operator: 'all', latency: 68, city: 'Warsaw', country: 'PL' },
  { ip: '5.252.81.226', ports: ['2087', '2096', '2083', '2053'], operator: 'all', latency: 63, city: 'Athens', country: 'GR' },
  { ip: '23.227.39.68', ports: ['2053', '8443'], operator: 'all', latency: 59, city: 'Seattle', country: 'US' },
  { ip: '104.26.14.160', ports: ['2083', '2096'], operator: 'all', latency: 56, city: 'Berlin', country: 'DE' },
  { ip: '66.93.178.242', ports: ['2083', '2053', '2096'], operator: 'all', latency: 61, city: 'Stockholm', country: 'SE' },
  { ip: '89.106.90.15', ports: ['2096', '2053'], operator: 'all', latency: 67, city: 'Oslo', country: 'NO' },
  { ip: '172.64.84.159', ports: ['2087', '8443', '2083', '2053'], operator: 'all', latency: 54, city: 'Helsinki', country: 'FI' },
  { ip: '37.153.170.102', ports: ['2053', '2083'], operator: 'all', latency: 64, city: 'Copenhagen', country: 'DK' },
  { ip: '162.159.93.244', ports: ['2087', '2083', '2053', '443', '2096', '8443'], operator: 'all', latency: 51, city: 'Vienna', country: 'AT' },
  { ip: '45.45.255.43', ports: ['2083', '2096', '2053', '8443', '2087'], operator: 'all', latency: 58, city: 'Zurich', country: 'CH' },
  { ip: '89.249.200.202', ports: ['2083', '2087', '8443', '2096', '2053'], operator: 'all', latency: 62, city: 'Bucharest', country: 'RO' },
  { ip: '103.51.12.167', ports: ['2096', '2053', '443'], operator: 'all', latency: 66, city: 'Sofia', country: 'BG' },
  { ip: '156.243.83.52', ports: ['2096', '443', '2087', '2053', '2083', '8443'], operator: 'all', latency: 55, city: 'Prague', country: 'CZ' },
  { ip: '162.159.254.7', ports: ['2087', '2053', '2096', '443', '2083', '8443'], operator: 'all', latency: 53, city: 'Brussels', country: 'BE' },
  { ip: '5.10.215.142', ports: ['2087', '2096', '8443'], operator: 'all', latency: 69, city: 'Dublin', country: 'IE' },
  { ip: '156.224.73.107', ports: ['2053', '2087', '443', '2083', '2096', '8443'], operator: 'all', latency: 57, city: 'Lisbon', country: 'PT' },
  { ip: '104.234.133.163', ports: ['2053', '2096', '443', '8443', '2083', '2087'], operator: 'all', latency: 60, city: 'Budapest', country: 'HU' },
  { ip: '45.128.76.37', ports: ['2087', '2053', '2096', '8443', '2083', '443'], operator: 'all', latency: 64, city: 'Belgrade', country: 'RS' },
  { ip: '61.245.108.53', ports: ['2083', '2053', '2096', '443', '2087', '8443'], operator: 'all', latency: 61, city: 'Seoul', country: 'KR' },
  { ip: '143.14.224.68', ports: ['443', '2087', '2083', '2096', '8443', '2053'], operator: 'all', latency: 63, city: 'Taipei', country: 'TW' },
  { ip: '172.64.188.4', ports: ['2096', '2053', '2083', '443', '2087', '8443'], operator: 'all', latency: 52, city: 'Hong Kong', country: 'HK' },
  { ip: '104.17.156.175', ports: ['8443'], operator: 'all', latency: 62, city: 'Bangkok', country: 'TH' },
  { ip: '104.17.21.148', ports: ['2053'], operator: 'all', latency: 57, city: 'Kuala Lumpur', country: 'MY' },
  { ip: '104.17.158.203', ports: ['2053'], operator: 'all', latency: 59, city: 'Jakarta', country: 'ID' },
  { ip: '104.19.41.143', ports: ['8443'], operator: 'all', latency: 64, city: 'Manila', country: 'PH' },
  { ip: '104.16.250.15', ports: ['2053'], operator: 'all', latency: 56, city: 'Istanbul', country: 'TR' },
  { ip: '173.245.58.100', ports: ['2053'], operator: 'all', latency: 68, city: 'Moscow', country: 'RU' },
  { ip: '104.17.166.174', ports: ['2053'], operator: 'all', latency: 58, city: 'Johannesburg', country: 'ZA' },
  { ip: '104.17.218.118', ports: ['2096'], operator: 'all', latency: 63, city: 'Lagos', country: 'NG' },
  { ip: '104.19.37.112', ports: ['2083'], operator: 'all', latency: 60, city: 'Nairobi', country: 'KE' },
  { ip: '198.41.208.110', ports: ['443'], operator: 'all', latency: 55, city: 'Cairo', country: 'EG' },
  { ip: '104.26.7.44', ports: ['2087'], operator: 'all', latency: 62, city: 'Ankara', country: 'TR' },
  { ip: '162.159.38.206', ports: ['2053'], operator: 'all', latency: 54, city: 'St. Petersburg', country: 'RU' },
  { ip: '173.245.59.53', ports: ['8443'], operator: 'all', latency: 67, city: 'Cape Town', country: 'ZA' },
  { ip: '172.67.79.39', ports: ['2083'], operator: 'all', latency: 56, city: 'Rio de Janeiro', country: 'BR' }
];

// ============================================
// 🛠️ HELPER CLASS
// ============================================
class Helpers {
  
  static generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  static isValidUUID(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
  }
  
  static parseDataLimit(input) {
    if (!input || input === '0' || input.toLowerCase() === 'unlimited') {
      return 0;
    }
    var value = input.toString().toLowerCase().trim();
    var match = value.match(/^(\d+(?:\.\d+)?)\s*(kb|mb|gb|tb|pt)?$/);
    if (!match) {
      return 0;
    }
    var num = parseFloat(match[1]);
    var unit = (match[2] || 'mb').toLowerCase();
    var multipliers = {
      kb: 1 / 1024,
      mb: 1,
      gb: 1024,
      tb: 1048576,
      pt: 1073741824
    };
    return num * (multipliers[unit] || 1);
  }
  
  static parseTimeLimit(input) {
    if (!input || input === '0' || input.toLowerCase() === 'unlimited') {
      return 0;
    }
    var value = input.toString().toLowerCase().trim();
    var match = value.match(/^(\d+)\s*(d|m|y|day|month|year|days|months|years)?$/);
    if (!match) {
      return 0;
    }
    var num = parseInt(match[1]);
    var unit = (match[2] || 'd').toLowerCase();
    var multipliers = {
      d: 1,
      day: 1,
      days: 1,
      m: 30,
      month: 30,
      months: 30,
      y: 365,
      year: 365,
      years: 365
    };
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
  
  static getBestIPs(operator, count, sortByLatency) {
    operator = operator || 'all';
    count = count || 10;
    sortByLatency = sortByLatency || false;
    
    var filtered = TRUSTED_IPS.filter(function(item) {
      return operator === 'all' || item.operator === operator || item.operator === 'all';
    });
    
    if (sortByLatency) {
      filtered.sort(function(a, b) {
        return (a.latency || 99) - (b.latency || 99);
      });
    } else {
      filtered.sort(function() {
        return Math.random() - 0.5;
      });
    }
    
    return filtered.slice(0, count);
  }
  
  static generateConfig(uuid, host, port, type, settings) {
    type = type || 'vless';
    settings = settings || {};
    
    var sni = settings.sni || CONFIG.SNI;
    var fp = settings.fp || CONFIG.FINGERPRINT;
    var fragment = settings.fragment || CONFIG.FRAGMENT;
    var warp = settings.warp || CONFIG.WARP;
    var ech = settings.ech || CONFIG.ECH;
    var name = settings.name || 'Taakaa-Xi';
    var encodedName = encodeURIComponent(name);
    
    if (type === 'vless') {
      var config = 'vless://' + uuid + '@' + host + ':' + port;
      config += '?encryption=none&security=tls&sni=' + sni + '&fp=' + fp;
      config += '&type=ws&host=' + host + '&path=%2F';
      
      if (fragment && fragment.enabled) {
        config += '&fragment=size:' + fragment.size + ',count:' + fragment.count + ',delay:' + fragment.delay;
      }
      if (warp && warp.enabled) {
        config += '&warp=' + (warp.pro ? 'pro' : 'on');
      }
      if (ech && ech.enabled) {
        config += '&ech=true';
      }
      config += '#' + encodedName;
      return config;
    }
    
    if (type === 'trojan') {
      return 'trojan://' + uuid + '@' + host + ':' + port + '?security=tls&sni=' + sni + '&fp=' + fp + '&type=ws&host=' + host + '&path=%2F#' + encodedName;
    }
    
    if (type === 'ss') {
      var ssPass = uuid.substring(0, 16);
      return 'ss://' + btoa('aes-256-gcm:' + ssPass) + '@' + btoa(host + ':' + port) + '#' + encodedName;
    }
    
    return '';
  }
  
  static isIranianDomain(hostname) {
    var iranianDomains = ['.ir', '.to', 'snapp.ir', 'tapsi.ir', 'digikala.com', 'varzesh3.com', 'namasha.com', 'aparat.com', 'filimo.com', 'namava.ir'];
    return iranianDomains.some(function(d) {
      return hostname.indexOf(d) !== -1;
    });
  }
  
  static isSpeedtestDomain(hostname) {
    var speedtestDomains = ['speedtest.net', 'fast.com', 'speedcheck.org', 'speed.one', 'testmy.net'];
    return speedtestDomains.some(function(d) {
      return hostname.indexOf(d) !== -1;
    });
  }
}
// ============================================
// 🔥 TAAKAA-XI PRO v11.0 - بخش ۲/۸
// 👥 User Manager + Session + Scanner + Proxy
// ============================================

// ============================================
// 👥 USER MANAGER
// ============================================
class UserManager {
  
  constructor(env) {
    this.env = env;
  }
  
  async getAll() {
    if (!this.env.KV) {
      return [];
    }
    var data = await this.env.KV.get('users');
    return data ? JSON.parse(data) : [];
  }
  
  async saveAll(users) {
    if (!this.env.KV) {
      return;
    }
    await this.env.KV.put('users', JSON.stringify(users));
  }
  
  async add(userData) {
    var users = await this.getAll();
    var newUser = {
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
    var users = await this.getAll();
    var index = users.findIndex(function(u) {
      return u.id === userId;
    });
    if (index === -1) {
      return null;
    }
    if (updates.dataLimit !== undefined) {
      updates.dataLimit = Helpers.parseDataLimit(updates.dataLimit);
    }
    if (updates.dailyLimit !== undefined) {
      updates.dailyLimit = Helpers.parseDataLimit(updates.dailyLimit);
    }
    if (updates.timeLimit !== undefined) {
      updates.timeLimit = Helpers.parseTimeLimit(updates.timeLimit);
      updates.expires = updates.timeLimit ? Date.now() + (updates.timeLimit * 86400000) : 0;
    }
    users[index] = Object.assign({}, users[index], updates);
    await this.saveAll(users);
    return users[index];
  }
  
  async delete(userId) {
    var users = await this.getAll();
    users = users.filter(function(u) {
      return u.id !== userId;
    });
    await this.saveAll(users);
    return true;
  }
  
  async getByUUID(uuid) {
    var users = await this.getAll();
    return users.find(function(u) {
      return u.uuid === uuid && u.active;
    });
  }
  
  async recordUsage(uuid, bytes) {
    var users = await this.getAll();
    var user = users.find(function(u) {
      return u.uuid === uuid;
    });
    if (!user) {
      return;
    }
    var today = new Date().toDateString();
    if (user.lastResetDate !== today) {
      user.todayUsed = 0;
      user.lastResetDate = today;
    }
    var mbUsed = bytes / (1024 * 1024);
    user.usedData += mbUsed;
    user.todayUsed += mbUsed;
    await this.saveAll(users);
  }
  
  async checkLimits(uuid) {
    var users = await this.getAll();
    var user = users.find(function(u) {
      return u.uuid === uuid;
    });
    if (!user || !user.active) {
      return false;
    }
    if (user.expires && Date.now() > user.expires) {
      return false;
    }
    if (user.dataLimit && user.usedData >= user.dataLimit) {
      return false;
    }
    if (user.dailyLimit && user.todayUsed >= user.dailyLimit) {
      return false;
    }
    return true;
  }
  
  async resetUsage(userId) {
    var users = await this.getAll();
    var user = users.find(function(u) {
      return u.id === userId;
    });
    if (!user) {
      return null;
    }
    user.usedData = 0;
    user.todayUsed = 0;
    user.lastResetDate = new Date().toDateString();
    await this.saveAll(users);
    return user;
  }
  
  async getStats() {
    var users = await this.getAll();
    var today = new Date().toDateString();
    return {
      totalUsers: users.length,
      activeUsers: users.filter(function(u) { return u.active; }).length,
      totalUsage: users.reduce(function(sum, u) { return sum + u.usedData; }, 0),
      todayUsage: users.filter(function(u) { return u.lastResetDate === today; }).reduce(function(sum, u) { return sum + u.todayUsed; }, 0)
    };
  }
  
  async backupData() {
    var users = await this.getAll();
    return {
      users: users,
      config: CONFIG,
      backupDate: new Date().toISOString(),
      version: '11.0.0'
    };
  }
  
  async restoreData(data) {
    if (data.users) {
      await this.saveAll(data.users);
    }
    if (data.config) {
      Object.assign(CONFIG, data.config);
      if (this.env.KV) {
        await this.env.KV.put('config', JSON.stringify(CONFIG));
      }
    }
    return true;
  }
}

// ============================================
// 🔐 SESSION MANAGER
// ============================================
class SessionManager {
  
  constructor(env) {
    this.env = env;
    this.attempts = {};
  }
  
  async create() {
    if (!this.env.KV) {
      return null;
    }
    var sessionId = Helpers.generateUUID();
    var sessionData = {
      created: Date.now(),
      expires: Date.now() + (CONFIG.SESSION_HOURS * 3600000)
    };
    await this.env.KV.put(
      'session:' + sessionId,
      JSON.stringify(sessionData),
      { expirationTtl: CONFIG.SESSION_HOURS * 3600 }
    );
    return sessionId;
  }
  
  async validate(sessionId) {
    if (!this.env.KV) {
      return false;
    }
    var session = await this.env.KV.get('session:' + sessionId);
    if (!session) {
      return false;
    }
    var data = JSON.parse(session);
    return data.expires > Date.now();
  }
  
  async destroy(sessionId) {
    if (!this.env.KV) {
      return;
    }
    await this.env.KV.delete('session:' + sessionId);
  }
  
  checkRateLimit(ip) {
    var now = Date.now();
    if (!this.attempts[ip]) {
      this.attempts[ip] = { count: 0, resetAt: now + 300000 };
    }
    if (now > this.attempts[ip].resetAt) {
      this.attempts[ip] = { count: 0, resetAt: now + 300000 };
    }
    this.attempts[ip].count++;
    return this.attempts[ip].count <= CONFIG.MAX_LOGIN_ATTEMPTS;
  }
}

// ============================================
// 📡 IP SCANNER
// ============================================
class IPScanner {
  
  static async scanIP(ip, port) {
    var startTime = Date.now();
    try {
      var controller = new AbortController();
      var timeout = setTimeout(function() {
        controller.abort();
      }, 3000);
      
      var response = await fetch('https://' + ip + ':' + port + '/', {
        method: 'HEAD',
        signal: controller.signal,
        cf: { resolveOverride: ip }
      });
      
      clearTimeout(timeout);
      return {
        ip: ip,
        port: port,
        alive: response.ok,
        latency: Date.now() - startTime
      };
    } catch (e) {
      return {
        ip: ip,
        port: port,
        alive: false,
        latency: 999
      };
    }
  }
  
  static async scanBatch(ips, ports, concurrency) {
    concurrency = concurrency || 5;
    var results = [];
    var queue = [];
    
    ips.forEach(function(ip) {
      ports.forEach(function(port) {
        queue.push({ ip: ip, port: port });
      });
    });
    
    for (var i = 0; i < queue.length; i += concurrency) {
      var batch = queue.slice(i, i + concurrency);
      var batchPromises = batch.map(function(item) {
        return IPScanner.scanIP(item.ip, item.port);
      });
      var batchResults = await Promise.all(batchPromises);
      results = results.concat(batchResults.filter(function(r) { return r.alive; }));
    }
    
    return results.sort(function(a, b) {
      return a.latency - b.latency;
    });
  }
}

// ============================================
// 🔌 PROXY HANDLER
// ============================================
async function handleProxy(request, env, ctx) {
  var url = new URL(request.url);
  var uuid = url.pathname.replace('/', '').split('/')[0];
  var userManager = new UserManager(env);
  
  var isValid = uuid === CONFIG.UUID || await userManager.getByUUID(uuid);
  if (!isValid) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  if (uuid !== CONFIG.UUID) {
    var canProceed = await userManager.checkLimits(uuid);
    if (!canProceed) {
      return new Response('Limit Exceeded', { status: 403 });
    }
  }
  
  // Check filters
  if (CONFIG.FILTERS.iranBlock && Helpers.isIranianDomain(url.hostname)) {
    return new Response('Blocked', { status: 403 });
  }
  if (CONFIG.FILTERS.speedtestBlock && Helpers.isSpeedtestDomain(url.hostname)) {
    return new Response('Blocked', { status: 403 });
  }
  
  var upgradeHeader = request.headers.get('Upgrade');
  if (upgradeHeader && upgradeHeader.toLowerCase() === 'websocket') {
    var webSocketPair = new WebSocketPair();
    var client = webSocketPair[0];
    var server = webSocketPair[1];
    
    ctx.acceptWebSocket(server);
    
    server.addEventListener('message', async function(event) {
      try {
        if (uuid !== CONFIG.UUID) {
          await userManager.recordUsage(uuid, event.data.length || 0);
        }
      } catch (e) {
        // Silent fail
      }
    });
    
    return new Response(null, {
      status: 101,
      webSocket: client
    });
  }
  
  // Direct connection
  try {
    var socket = connect({
      hostname: CONFIG.SNI,
      port: 443
    });
    
    var reader = request.body ? request.body.getReader() : null;
    
    if (reader) {
      var writer = socket.writable.getWriter();
      
      var pump = async function() {
        while (true) {
          var result = await reader.read();
          if (result.done) {
            await writer.close();
            break;
          }
          await writer.write(result.value);
          if (uuid !== CONFIG.UUID) {
            await userManager.recordUsage(uuid, result.value.length || 0);
          }
        }
      };
      
      ctx.waitUntil(pump());
    }
    
    return new Response(socket.readable, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Proxy': 'Taakaa-Xi'
      }
    });
  } catch (e) {
    return new Response('Connection Failed: ' + e.message, { status: 502 });
  }
  }
// ============================================
// 🔥 TAAKAA-XI PRO v11.0 - بخش ۳/۸
// 🔧 Setup Wizard Page
// ============================================

var HTML_SETUP = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi PRO | راه‌اندازی اولیه</title>
    <style>
        :root {
            --orange: #ff6b00;
            --orange-light: #ff8533;
            --orange-glow: rgba(255, 107, 0, 0.2);
            --bg: #0a0a0f;
            --card: #1a1a2e;
            --text: #e0e0e0;
            --text-secondary: #888;
            --border: rgba(255, 255, 255, 0.06);
            --border-active: rgba(255, 107, 0, 0.3);
            --green: #00ff88;
            --red: #ff4757;
            --yellow: #ffa502;
            --radius: 20px;
            --radius-sm: 12px;
            --shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            --transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background-image:
                radial-gradient(ellipse at 50% 0%, rgba(255, 107, 0, 0.12) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 100%, rgba(55, 66, 250, 0.06) 0%, transparent 60%);
        }

        .container {
            max-width: 640px;
            width: 100%;
            padding: 40px;
            background: var(--card);
            border-radius: var(--radius);
            border: 2px solid var(--border-active);
            box-shadow: var(--shadow);
            animation: fadeInUp 0.7s ease;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes shimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .logo {
            font-size: 3.2rem;
            font-weight: 900;
            text-align: center;
            margin-bottom: 8px;
            background: linear-gradient(135deg, var(--orange), var(--orange-light), #ffaa00, var(--orange));
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shimmer 4s ease infinite;
        }

        .subtitle {
            text-align: center;
            color: var(--text-secondary);
            margin-bottom: 32px;
            font-size: 1.05rem;
        }

        .setup-card {
            background: rgba(255, 255, 255, 0.02);
            border-radius: var(--radius);
            padding: 24px;
            margin-bottom: 20px;
            border: 1px solid var(--border);
            transition: var(--transition);
            position: relative;
            overflow: hidden;
        }

        .setup-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--orange), transparent);
            opacity: 0;
            transition: var(--transition);
        }

        .setup-card:hover::before {
            opacity: 1;
        }

        .setup-card.required {
            border-color: var(--border-active);
            background: rgba(255, 107, 0, 0.03);
        }

        .setup-card.success {
            border-color: rgba(0, 255, 136, 0.4);
            background: rgba(0, 255, 136, 0.03);
        }

        .setup-card.error {
            border-color: rgba(255, 71, 87, 0.4);
            background: rgba(255, 71, 87, 0.03);
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }

        .status-dot {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            flex-shrink: 0;
            transition: var(--transition);
        }

        .status-dot.checking {
            background: rgba(255, 193, 7, 0.15);
            color: #ffc107;
        }

        .status-dot.success {
            background: rgba(0, 255, 136, 0.15);
            color: var(--green);
            animation: pulse 2s ease infinite;
        }

        .status-dot.error {
            background: rgba(255, 71, 87, 0.15);
            color: var(--red);
        }

        .card-title {
            font-size: 1.1rem;
            font-weight: 700;
        }

        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.5px;
        }

        .badge-required {
            background: rgba(255, 71, 87, 0.15);
            color: var(--red);
        }

        .badge-optional {
            background: rgba(255, 193, 7, 0.15);
            color: var(--yellow);
        }

        .card-description {
            color: var(--text-secondary);
            line-height: 2;
            margin-bottom: 16px;
            font-size: 0.9rem;
        }

        .card-description code {
            background: rgba(255, 107, 0, 0.15);
            padding: 3px 8px;
            border-radius: 5px;
            color: var(--orange-light);
            font-family: 'SF Mono', 'Fira Code', monospace;
            font-size: 0.85rem;
        }

        .card-description ol {
            padding-right: 20px;
            margin: 8px 0;
        }

        .card-description li {
            margin: 4px 0;
        }

        input {
            width: 100%;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            color: var(--text);
            font-size: 1rem;
            margin-top: 8px;
            transition: var(--transition);
            font-family: inherit;
        }

        input:focus {
            outline: none;
            border-color: var(--orange);
            box-shadow: 0 0 0 3px var(--orange-glow);
        }

        input::placeholder {
            color: var(--text-secondary);
        }

        button {
            padding: 12px 24px;
            background: linear-gradient(135deg, var(--orange), var(--orange-light));
            border: none;
            color: #fff;
            border-radius: var(--radius-sm);
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            transition: var(--transition);
            font-family: inherit;
            position: relative;
            overflow: hidden;
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px var(--orange-glow);
        }

        button:active {
            transform: translateY(0);
        }

        .btn-small {
            width: auto;
            padding: 8px 20px;
            font-size: 0.85rem;
            margin-top: 8px;
        }

        .btn-full {
            width: 100%;
            margin-top: 12px;
        }

        .message {
            margin-top: 12px;
            padding: 12px;
            border-radius: var(--radius-sm);
            font-size: 0.85rem;
            display: none;
            animation: fadeInUp 0.3s ease;
        }

        .message.show {
            display: block;
        }

        .message.success {
            background: rgba(0, 255, 136, 0.08);
            color: var(--green);
        }

        .message.error {
            background: rgba(255, 71, 87, 0.08);
            color: var(--red);
        }

        .all-ready {
            text-align: center;
            padding: 32px 0;
            display: none;
            animation: fadeInUp 0.6s ease;
        }

        .all-ready.show {
            display: block;
        }

        .all-ready .icon {
            font-size: 4rem;
            margin-bottom: 16px;
            animation: pulse 1.5s ease infinite;
        }

        .all-ready h2 {
            color: var(--green);
            margin-bottom: 12px;
            font-size: 1.5rem;
        }

        .all-ready p {
            color: var(--text-secondary);
            margin-bottom: 24px;
        }

        .footer {
            text-align: center;
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid var(--border);
            color: var(--text-secondary);
            font-size: 0.8rem;
        }

        .footer a {
            color: var(--orange);
            text-decoration: none;
            transition: var(--transition);
        }

        .footer a:hover {
            color: var(--orange-light);
        }

        .spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-top-color: var(--orange);
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
            display: inline-block;
        }

        @media (max-width: 480px) {
            .container {
                padding: 24px;
            }
            .logo {
                font-size: 2.4rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">⚡ Taakaa-Xi</div>
        <div class="subtitle">راه‌اندازی اولیه &bull; Setup Wizard v11</div>

        <!-- KV Storage -->
        <div class="setup-card required" id="kvCard">
            <div class="card-header">
                <span class="status-dot checking" id="kvDot">⟳</span>
                <span class="card-title">KV Storage</span>
                <span class="badge badge-required">الزامی*</span>
            </div>
            <div class="card-description">
                <p><strong>KV برای ذخیره‌سازی کاربران و تنظیمات الزامی است.</strong></p>
                <ol>
                    <li>به تب <code>Workers & Pages</code> در داشبورد Cloudflare بروید</li>
                    <li>پروژه خود را انتخاب کنید</li>
                    <li>به <code>Settings</code> &rarr; <code>Variables</code> بروید</li>
                    <li>در <code>KV Namespace Bindings</code> یک Namespace با نام <code>KV</code> بسازید</li>
                </ol>
            </div>
            <button class="btn-small" onclick="checkKV()">🔄 بررسی مجدد</button>
            <div class="message" id="kvMsg"></div>
        </div>

        <!-- D1 Database -->
        <div class="setup-card" id="d1Card">
            <div class="card-header">
                <span class="status-dot checking" id="d1Dot">⟳</span>
                <span class="card-title">D1 Database</span>
                <span class="badge badge-optional">اختیاری</span>
            </div>
            <div class="card-description">
                <p><strong>D1 برای ذخیره‌سازی پیشرفته و جلوگیری از پر شدن KV است.</strong></p>
                <ol>
                    <li>در <code>D1 Database Bindings</code> یک Database با نام <code>DB</code> بسازید</li>
                </ol>
                <p style="color: var(--yellow); margin-top: 8px;">&#9888;&#65039; بدون D1 هم پنل کار می‌کند</p>
            </div>
            <button class="btn-small" onclick="checkD1()">🔄 بررسی مجدد</button>
            <div class="message" id="d1Msg"></div>
        </div>

        <!-- Admin Password -->
        <div class="setup-card required" id="passCard">
            <div class="card-header">
                <span class="status-dot checking" id="passDot">⟳</span>
                <span class="card-title">Admin Password</span>
                <span class="badge badge-required">الزامی*</span>
            </div>
            <div class="card-description">
                <p>برای ورود به پنل مدیریت، رمز عبور تنظیم کنید.</p>
                <p><strong>روش ۱:</strong> متغیر محیطی <code>ADMIN_PASS</code> را در تنظیمات Worker ست کنید</p>
                <p><strong>روش ۲:</strong> در فیلد زیر وارد کنید (نیاز به متغیر نیست)</p>
            </div>
            <input type="password" id="passInput" placeholder="رمز عبور ادمین را وارد کنید">
            <button class="btn-full" onclick="saveAdminPass()">💾 ذخیره رمز عبور</button>
            <div class="message" id="passMsg"></div>
        </div>

        <!-- All Ready -->
        <div class="all-ready" id="allReady">
            <div class="icon">🎉</div>
            <h2>همه چیز آماده است!</h2>
            <p>پنل مدیریت و پروکسی با موفقیت فعال شد</p>
            <button class="btn-full" onclick="goToPanel()">🚀 ورود به پنل مدیریت</button>
        </div>

        <div class="footer">
            <p>🚀 توسعه توسط <strong>تیم تاکا</strong> &bull; ۳ ماه توسعه</p>
            <p>کانال تلگرام: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></p>
        </div>
    </div>

    <script>
        var kvOk = false;
        var passOk = false;

        async function checkKV() {
            var dot = document.getElementById('kvDot');
            var msg = document.getElementById('kvMsg');
            var card = document.getElementById('kvCard');

            dot.className = 'status-dot checking';
            dot.innerHTML = '<span class="spinner"></span>';
            msg.className = 'message show';
            msg.textContent = 'در حال بررسی...';

            try {
                var response = await fetch('/api/check-kv');
                var data = await response.json();

                if (data.ok) {
                    kvOk = true;
                    dot.className = 'status-dot success';
                    dot.textContent = '✓';
                    card.className = 'setup-card success';
                    msg.className = 'message success show';
                    msg.textContent = '✅ KV Storage با موفقیت متصل شد!';
                } else {
                    kvOk = false;
                    dot.className = 'status-dot error';
                    dot.textContent = '✗';
                    card.className = 'setup-card error';
                    msg.className = 'message error show';
                    msg.textContent = '❌ KV Storage متصل نیست. لطفاً مراحل بالا را انجام دهید.';
                }
            } catch (e) {
                kvOk = false;
                dot.className = 'status-dot error';
                dot.textContent = '✗';
                msg.className = 'message error show';
                msg.textContent = '❌ خطا در بررسی KV Storage';
            }

            checkAllReady();
        }

        async function checkD1() {
            var dot = document.getElementById('d1Dot');
            var msg = document.getElementById('d1Msg');
            var card = document.getElementById('d1Card');

            dot.className = 'status-dot checking';
            dot.innerHTML = '<span class="spinner"></span>';
            msg.className = 'message show';
            msg.textContent = 'در حال بررسی...';

            try {
                var response = await fetch('/api/check-d1');
                var data = await response.json();

                if (data.ok) {
                    dot.className = 'status-dot success';
                    dot.textContent = '✓';
                    card.className = 'setup-card success';
                    msg.className = 'message success show';
                    msg.textContent = '✅ D1 Database با موفقیت متصل شد!';
                } else {
                    dot.className = 'status-dot checking';
                    dot.textContent = '⟳';
                    msg.className = 'message error show';
                    msg.textContent = '⚠️ D1 Database متصل نیست (اختیاری - پنل بدون آن هم کار می‌کند)';
                }
            } catch (e) {
                dot.className = 'status-dot checking';
                dot.textContent = '⟳';
                msg.className = 'message error show';
                msg.textContent = '⚠️ D1 Database متصل نیست (اختیاری)';
            }
        }

        async function saveAdminPass() {
            var password = document.getElementById('passInput').value;
            var dot = document.getElementById('passDot');
            var msg = document.getElementById('passMsg');
            var card = document.getElementById('passCard');

            if (!password || password.length < 3) {
                msg.className = 'message error show';
                msg.textContent = '❌ رمز عبور باید حداقل ۳ کاراکتر باشد';
                return;
            }

            try {
                var response = await fetch('/api/setup-pass', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: password })
                });
                var data = await response.json();

                if (data.ok) {
                    passOk = true;
                    dot.className = 'status-dot success';
                    dot.textContent = '✓';
                    card.className = 'setup-card success';
                    msg.className = 'message success show';
                    msg.textContent = '✅ رمز عبور با موفقیت ذخیره شد!';
                } else {
                    passOk = false;
                    msg.className = 'message error show';
                    msg.textContent = '❌ خطا: ' + (data.error || 'مشکل در ذخیره‌سازی');
                }
            } catch (e) {
                passOk = false;
                msg.className = 'message error show';
                msg.textContent = '❌ خطا در ارتباط با سرور';
            }

            checkAllReady();
        }

        async function checkPassFromEnv() {
            var dot = document.getElementById('passDot');
            var card = document.getElementById('passCard');

            try {
                var response = await fetch('/api/check-pass');
                var data = await response.json();

                if (data.ok) {
                    passOk = true;
                    dot.className = 'status-dot success';
                    dot.textContent = '✓';
                    card.className = 'setup-card success';
                    document.getElementById('passInput').placeholder = '•••••••• (تنظیم شده از متغیر محیطی)';
                }
            } catch (e) {
                // Silent
            }

            checkAllReady();
        }

        function checkAllReady() {
            var allReady = document.getElementById('allReady');
            if (kvOk && passOk) {
                allReady.classList.add('show');
            } else {
                allReady.classList.remove('show');
            }
        }

        function goToPanel() {
            window.location.href = '/admin';
        }

        // Initial checks
        checkKV();
        checkD1();
        checkPassFromEnv();
    </script>
</body>
</html>`;
// ============================================
// 🔥 TAAKAA-XI PRO v11.0 - بخش ۴/۸
// 🏠 Welcome Page + Admin Dashboard
// ============================================

var HTML_WELCOME = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi PRO | داشبورد</title>
    <style>
        :root {
            --orange: #ff6b00;
            --orange-light: #ff8533;
            --orange-glow: rgba(255, 107, 0, 0.2);
            --bg: #0a0a0f;
            --card: #1a1a2e;
            --text: #e0e0e0;
            --text-secondary: #888;
            --border: rgba(255, 255, 255, 0.06);
            --radius: 18px;
            --radius-sm: 10px;
            --shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background-image:
                radial-gradient(ellipse at 50% 0%, rgba(255, 107, 0, 0.1) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 100%, rgba(55, 66, 250, 0.05) 0%, transparent 60%);
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .container {
            max-width: 900px;
            width: 100%;
            padding: 48px;
            background: var(--card);
            border-radius: 24px;
            border: 1px solid rgba(255, 107, 0, 0.2);
            box-shadow: 0 0 80px rgba(255, 107, 0, 0.08);
            animation: fadeInUp 0.8s ease;
        }

        .logo {
            font-size: 4rem;
            font-weight: 900;
            text-align: center;
            margin-bottom: 12px;
            background: linear-gradient(135deg, var(--orange), var(--orange-light), #ffaa00, var(--orange));
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shimmer 4s ease infinite;
        }

        .subtitle {
            text-align: center;
            color: var(--text-secondary);
            margin-bottom: 36px;
            font-size: 1.1rem;
        }

        .status-bar {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 36px;
            flex-wrap: wrap;
        }

        .status-pill {
            padding: 8px 20px;
            border-radius: 30px;
            font-size: 0.85rem;
            font-weight: 600;
            border: 1px solid var(--border);
            background: rgba(255, 255, 255, 0.03);
            transition: var(--transition);
            cursor: default;
        }

        .status-pill:hover {
            background: rgba(255, 255, 255, 0.06);
            transform: translateY(-2px);
        }

        .status-pill.online {
            background: rgba(0, 255, 136, 0.08);
            border-color: rgba(0, 255, 136, 0.2);
            color: #00ff88;
            animation: float 3s ease infinite;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 14px;
        }

        .card {
            padding: 28px 20px;
            background: rgba(255, 255, 255, 0.02);
            border-radius: var(--radius);
            text-align: center;
            text-decoration: none;
            color: var(--text);
            transition: var(--transition);
            border: 1px solid var(--border);
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--orange), transparent);
            opacity: 0;
            transition: var(--transition);
        }

        .card:hover::before {
            opacity: 1;
        }

        .card:hover {
            transform: translateY(-8px);
            border-color: var(--orange);
            box-shadow: 0 20px 50px rgba(255, 107, 0, 0.15);
        }

        .card .icon {
            font-size: 2.5rem;
            margin-bottom: 14px;
            display: block;
            transition: var(--transition);
        }

        .card:hover .icon {
            transform: scale(1.2);
        }

        .card .title {
            font-weight: 700;
            font-size: 1rem;
        }

        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 24px;
            border-top: 1px solid var(--border);
            color: var(--text-secondary);
            font-size: 0.85rem;
        }

        .footer a {
            color: var(--orange);
            text-decoration: none;
            transition: var(--transition);
        }

        .footer a:hover {
            color: var(--orange-light);
        }

        @media (max-width: 480px) {
            .container { padding: 28px; }
            .logo { font-size: 2.8rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">⚡ Taakaa-Xi</div>
        <div class="subtitle">پروکسی پیشرفته &bull; پنل مدیریت &bull; اسکنر هوشمند &bull; v11.0</div>

        <div class="status-bar">
            <span class="status-pill online">● آنلاین</span>
            <span class="status-pill">Ports: 443 &bull; 8443 &bull; 2083 &bull; 2087 &bull; 2096 &bull; 2053</span>
            <span class="status-pill">Fragment ✓</span>
            <span class="status-pill">WARP ✓</span>
            <span class="status-pill">ECH ✓</span>
            <span class="status-pill">XHTTP ✓</span>
        </div>

        <div class="grid">
            <a href="/admin" class="card">
                <span class="icon">🎛️</span>
                <span class="title">پنل مدیریت</span>
            </a>
            <a href="/scanner" class="card">
                <span class="icon">📡</span>
                <span class="title">اسکنر آی‌پی</span>
            </a>
            <a href="/sub/" class="card">
                <span class="icon">📦</span>
                <span class="title">سابسکریپشن</span>
            </a>
            <a href="/select-location" class="card">
                <span class="icon">🌍</span>
                <span class="title">انتخاب لوکیشن</span>
            </a>
            <a href="/owners" class="card">
                <span class="icon">👥</span>
                <span class="title">پشتیبان‌ها</span>
            </a>
            <a href="/fragment-info" class="card">
                <span class="icon">🛡️</span>
                <span class="title">Fragment Info</span>
            </a>
            <a href="/offline-support" class="card">
                <span class="icon">📚</span>
                <span class="title">راهنما</span>
            </a>
            <a href="https://t.me/TaaKaaOrg" target="_blank" class="card">
                <span class="icon">📢</span>
                <span class="title">کانال تلگرام</span>
            </a>
        </div>

        <div class="footer">
            <p>🚀 توسعه توسط <strong>تیم تاکا</strong> &bull; ۳ ماه تلاش مستمر</p>
            <p>کانال تلگرام: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></p>
        </div>
    </div>
</body>
</html>`;
// ============================================
// 🔥 TAAKAA-XI PRO v11.0 - بخش ۵/۸
// 🎛️ Admin Panel - کامل با Sidebar
// ============================================

var HTML_ADMIN = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi PRO | پنل مدیریت</title>
    <style>
        :root {
            --orange: #ff6b00;
            --orange-light: #ff8533;
            --orange-glow: rgba(255, 107, 0, 0.25);
            --bg: #0a0a0f;
            --bg-secondary: #12121a;
            --card: #1a1a2e;
            --hover: #1e1e35;
            --green: #00ff88;
            --green-bg: rgba(0, 255, 136, 0.1);
            --red: #ff4757;
            --red-bg: rgba(255, 71, 87, 0.1);
            --yellow: #ffa502;
            --yellow-bg: rgba(255, 165, 2, 0.1);
            --blue: #3742fa;
            --text: #e0e0e0;
            --text-secondary: #888;
            --border: rgba(255, 255, 255, 0.06);
            --radius: 18px;
            --radius-sm: 10px;
            --shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            overflow-x: hidden;
        }

        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background:
                radial-gradient(ellipse at 50% 0%, rgba(255, 107, 0, 0.06) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 100%, rgba(55, 66, 250, 0.04) 0%, transparent 60%);
            pointer-events: none;
            z-index: 0;
        }

        #app {
            position: relative;
            z-index: 1;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
            position: fixed;
            right: 0;
            top: 0;
            bottom: 0;
            width: 260px;
            background: var(--bg-secondary);
            border-left: 1px solid var(--border);
            padding: 20px;
            z-index: 100;
            transform: translateX(100%);
            transition: var(--transition);
            overflow-y: auto;
            backdrop-filter: blur(20px);
        }

        .sidebar.open {
            transform: translateX(0);
        }

        .sidebar-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            z-index: 99;
            opacity: 0;
            pointer-events: none;
            transition: var(--transition);
        }

        .sidebar-overlay.active {
            opacity: 1;
            pointer-events: all;
        }

        .sidebar-logo {
            font-size: 1.8rem;
            font-weight: 900;
            text-align: center;
            margin-bottom: 24px;
            background: linear-gradient(135deg, var(--orange), var(--orange-light));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .sidebar-nav {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            transition: var(--transition);
            color: var(--text-secondary);
            font-size: 0.9rem;
            border: 1px solid transparent;
            background: transparent;
            width: 100%;
            text-align: right;
            font-family: inherit;
        }

        .nav-item:hover {
            background: var(--hover);
            color: #fff;
            border-color: var(--border);
        }

        .nav-item.active {
            background: rgba(255, 107, 0, 0.1);
            color: var(--orange);
            border-color: var(--orange-glow);
        }

        .nav-item .icon {
            font-size: 1.2rem;
            width: 24px;
            text-align: center;
            flex-shrink: 0;
        }

        /* ===== HEADER ===== */
        .header {
            position: sticky;
            top: 0;
            background: rgba(10, 10, 15, 0.9);
            backdrop-filter: blur(20px);
            padding: 14px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--border);
            z-index: 50;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .menu-btn {
            background: var(--card);
            border: 1px solid var(--border);
            color: #fff;
            padding: 8px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            transition: var(--transition);
        }

        .menu-btn:hover {
            background: var(--hover);
            border-color: var(--orange);
        }

        .header-title {
            font-size: 1rem;
            font-weight: 600;
        }

        .header-actions {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        /* ===== BUTTONS ===== */
        .btn {
            padding: 9px 20px;
            border-radius: var(--radius-sm);
            border: 1px solid transparent;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.82rem;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: inherit;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--orange), var(--orange-light));
            color: #fff;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px var(--orange-glow);
        }

        .btn-danger {
            background: var(--red);
            color: #fff;
        }

        .btn-success {
            background: var(--green);
            color: #000;
        }

        .btn-outline {
            background: transparent;
            border: 1px solid var(--border);
            color: #fff;
        }

        .btn-outline:hover {
            border-color: var(--orange);
            background: rgba(255, 107, 0, 0.05);
        }

        .btn-sm {
            padding: 6px 14px;
            font-size: 0.75rem;
        }

        /* ===== MAIN CONTENT ===== */
        .main-content {
            margin-right: 0;
            padding: 24px;
            min-height: calc(100vh - 62px);
            transition: var(--transition);
        }

        @media (min-width: 1024px) {
            .sidebar {
                transform: translateX(0);
            }
            .main-content {
                margin-right: 260px;
            }
            .menu-btn {
                display: none;
            }
        }

        .page {
            display: none;
            animation: fadeIn 0.4s ease;
        }

        .page.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* ===== STATS GRID ===== */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }

        .stat-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 22px;
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            cursor: default;
        }

        .stat-card:hover {
            border-color: var(--orange-glow);
            transform: translateY(-3px);
            box-shadow: var(--shadow);
        }

        .stat-card .stat-icon {
            font-size: 1.8rem;
            margin-bottom: 10px;
        }

        .stat-card .stat-value {
            font-size: 1.8rem;
            font-weight: 800;
            color: var(--orange);
        }

        .stat-card .stat-label {
            color: var(--text-secondary);
            margin-top: 4px;
            font-size: 0.82rem;
        }

        .stat-card::after {
            content: '';
            position: absolute;
            top: -15px;
            right: -15px;
            width: 60px;
            height: 60px;
            background: var(--orange-glow);
            border-radius: 50%;
            filter: blur(25px);
            opacity: 0.25;
        }

        /* ===== CARDS ===== */
        .card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 22px;
            margin-bottom: 20px;
            transition: var(--transition);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 18px;
            padding-bottom: 12px;
            border-bottom: 1px solid var(--border);
        }

        .card-title {
            font-size: 1.1rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        /* ===== FORMS ===== */
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
        }

        input, select, textarea {
            width: 100%;
            padding: 11px 14px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            color: var(--text);
            font-family: inherit;
            font-size: 0.85rem;
            transition: var(--transition);
        }

        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: var(--orange);
            background: rgba(255, 107, 0, 0.04);
        }

        /* ===== TABLES ===== */
        .table-wrap {
            overflow-x: auto;
            border-radius: var(--radius-sm);
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 11px 14px;
            text-align: right;
            border-bottom: 1px solid var(--border);
            font-size: 0.82rem;
        }

        th {
            color: var(--orange);
            font-weight: 600;
            background: rgba(255, 255, 255, 0.02);
        }

        tr:hover {
            background: rgba(255, 255, 255, 0.015);
        }

        .actions {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
        }

        /* ===== MODAL ===== */
        .modal {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: var(--card);
            padding: 24px;
            border-radius: var(--radius);
            max-width: 500px;
            width: 90%;
            border: 1px solid var(--orange-glow);
            max-height: 85vh;
            overflow-y: auto;
            animation: fadeIn 0.3s ease;
        }

        .modal-title {
            font-size: 1.15rem;
            font-weight: 700;
            color: var(--orange);
            margin-bottom: 16px;
        }

        /* ===== BADGES ===== */
        .badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 600;
        }

        .badge-success {
            background: var(--green-bg);
            color: var(--green);
        }

        .badge-danger {
            background: var(--red-bg);
            color: var(--red);
        }

        .badge-warning {
            background: var(--yellow-bg);
            color: var(--yellow);
        }

        /* ===== PROGRESS ===== */
        .progress {
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 3px;
            overflow: hidden;
            margin-top: 5px;
        }

        .progress-fill {
            height: 100%;
            border-radius: 3px;
            transition: width 0.5s ease;
        }

        .fill-low { background: var(--green); }
        .fill-medium { background: var(--yellow); }
        .fill-high { background: var(--red); }

        /* ===== TOAST ===== */
        .toast {
            position: fixed;
            bottom: 24px;
            left: 24px;
            background: var(--card);
            border: 1px solid var(--border);
            padding: 14px 24px;
            border-radius: var(--radius-sm);
            z-index: 2000;
            animation: slideIn 0.4s ease;
            font-size: 0.85rem;
        }

        @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        .toast.success { border-color: var(--green); }
        .toast.error { border-color: var(--red); }

        /* ===== SPINNER ===== */
        .spinner {
            width: 36px;
            height: 36px;
            border: 3px solid rgba(255, 255, 255, 0.08);
            border-top-color: var(--orange);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 24px auto;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
<div id="app">
    <!-- Sidebar Overlay -->
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>

    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-logo">⚡ Taakaa-Xi</div>
        <nav class="sidebar-nav">
            <button class="nav-item active" data-page="dashboard" onclick="navigateTo('dashboard')">
                <span class="icon">📊</span>داشبورد
            </button>
            <button class="nav-item" data-page="users" onclick="navigateTo('users')">
                <span class="icon">👥</span>کاربران
            </button>
            <button class="nav-item" data-page="scanner" onclick="navigateTo('scanner')">
                <span class="icon">📡</span>اسکنر آی‌پی
            </button>
            <button class="nav-item" data-page="locations" onclick="navigateTo('locations')">
                <span class="icon">🌍</span>لوکیشن‌ها
            </button>
            <button class="nav-item" data-page="subscription" onclick="navigateTo('subscription')">
                <span class="icon">📦</span>سابسکریپشن
            </button>
            <button class="nav-item" data-page="settings" onclick="navigateTo('settings')">
                <span class="icon">⚙️</span>تنظیمات
            </button>
            <button class="nav-item" data-page="backup" onclick="navigateTo('backup')">
                <span class="icon">💾</span>بکاپ
            </button>
        </nav>
    </aside>

    <!-- Header -->
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

    <!-- Main Content -->
    <main class="main-content" id="mainContent">
        
        <!-- Login Page -->
        <div class="page active" id="page-login">
            <div class="card" style="max-width: 420px; margin: 60px auto;">
                <div class="card-header">
                    <div class="card-title"><span>🔐</span>ورود به پنل مدیریت</div>
                </div>
                <input type="password" id="loginPassword" placeholder="رمز عبور ادمین" style="margin-bottom: 12px;">
                <button class="btn btn-primary" onclick="doLogin()" style="width: 100%;">ورود</button>
            </div>
        </div>

        <!-- Dashboard Page -->
        <div class="page" id="page-dashboard">
            <div class="stats-grid" id="dashboardStats"></div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><span>👥</span>آخرین کاربران</div>
                </div>
                <div class="table-wrap" id="recentUsers"></div>
            </div>
        </div>

        <!-- Users Page -->
        <div class="page" id="page-users">
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><span>➕</span>افزودن کاربر جدید</div>
                </div>
                <div class="form-grid">
                    <input type="text" id="userName" placeholder="نام کاربر *">
                    <input type="text" id="userUUID" placeholder="UUID (اختیاری - خودکار)">
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
                    <button class="btn btn-primary" onclick="addUser()">➕ افزودن کاربر</button>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><span>📋</span>لیست کاربران</div>
                </div>
                <div class="table-wrap" id="usersTable"></div>
            </div>
        </div>

        <!-- Scanner Page -->
        <div class="page" id="page-scanner">
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><span>📡</span>اسکنر آی‌پی</div>
                </div>
                <div class="form-grid">
                    <select id="scanOperator">
                        <option value="all">همه اپراتورها</option>
                        <option value="mci">همراه اول</option>
                        <option value="mtn">ایرانسل</option>
                        <option value="rtl">رایتل</option>
                    </select>
                    <select id="scanCount">
                        <option value="10">۱۰ آی‌پی</option>
                        <option value="20">۲۰ آی‌پی</option>
                        <option value="50">۵۰ آی‌پی</option>
                    </select>
                    <button class="btn btn-primary" onclick="scanFast()">🔍 اسکن سریع</button>
                    <button class="btn btn-outline" onclick="scanReal()">⚡ اسکن واقعی</button>
                </div>
                <div class="table-wrap" id="scanResults" style="margin-top: 16px;">
                    <p style="text-align: center; color: var(--text-secondary);">برای شروع اسکن، دکمه را بزنید</p>
                </div>
            </div>
        </div>

        <!-- Locations Page -->
        <div class="page" id="page-locations">
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><span>🌍</span>انتخاب لوکیشن</div>
                </div>
                <div class="stats-grid" id="locationsGrid"></div>
            </div>
        </div>

        <!-- Subscription Page -->
        <div class="page" id="page-subscription">
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><span>📦</span>سابسکریپشن</div>
                </div>
                <div class="form-grid">
                    <input type="text" id="subUUID" placeholder="UUID کاربر">
                    <select id="subType">
                        <option value="all">همه پروتکل‌ها</option>
                        <option value="vless">VLESS</option>
                        <option value="trojan">Trojan</option>
                        <option value="ss">Shadowsocks</option>
                    </select>
                    <select id="subFormat">
                        <option value="raw">Raw</option>
                        <option value="base64">Base64</option>
                        <option value="clash">Clash</option>
                    </select>
                    <button class="btn btn-primary" onclick="generateSub()">📦 دریافت سابسکریپشن</button>
                </div>
                <textarea id="subResult" style="margin-top: 16px; height: 200px; direction: ltr; font-family: 'SF Mono', monospace; font-size: 0.8rem;" readonly placeholder="خروجی سابسکریپشن اینجا نمایش داده می‌شود..."></textarea>
            </div>
        </div>

        <!-- Settings Page -->
        <div class="page" id="page-settings">
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><span>⚙️</span>تنظیمات سیستم</div>
                </div>
                <div class="form-grid">
                    <input type="text" id="setUUID" placeholder="UUID سیستم">
                    <input type="password" id="setAdminPass" placeholder="رمز ادمین جدید">
                    <input type="text" id="setSNI" placeholder="SNI (مثال: cloudflare.com)">
                    <select id="setFingerprint">
                        <option value="chrome">Chrome</option>
                        <option value="firefox">Firefox</option>
                        <option value="safari">Safari</option>
                        <option value="random">Random</option>
                    </select>
                    <button class="btn btn-primary" onclick="saveSettings()">💾 ذخیره تنظیمات</button>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><span>🛡️</span>تنظیمات Fragment</div>
                </div>
                <div class="form-grid">
                    <input type="text" id="fragSize" placeholder="Size (200-500)" value="200-500">
                    <input type="text" id="fragCount" placeholder="Count (5-10)" value="5-10">
                    <input type="text" id="fragDelay" placeholder="Delay (10-30)" value="10-30">
                    <button class="btn btn-primary" onclick="saveFragment()">💾 ذخیره Fragment</button>
                </div>
            </div>
        </div>

        <!-- Backup Page -->
        <div class="page" id="page-backup">
            <div class="card">
                <div class="card-header">
                    <div class="card-title"><span>💾</span>بکاپ و بازیابی</div>
                </div>
                <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                    <button class="btn btn-primary" onclick="downloadBackup()">📥 دانلود بکاپ</button>
                    <button class="btn btn-outline" onclick="document.getElementById('restoreFile').click()">📤 بازیابی بکاپ</button>
                </div>
                <input type="file" id="restoreFile" style="display: none;" onchange="restoreBackup(this.files[0])" accept=".json">
            </div>
        </div>

    </main>
</div>

<!-- Edit User Modal -->
<div class="modal" id="editModal">
    <div class="modal-content">
        <div class="modal-title">✏️ ویرایش کاربر</div>
        <div class="form-grid">
            <input type="text" id="editName" placeholder="نام کاربر">
            <input type="text" id="editDataLimit" placeholder="حجم کل">
            <input type="text" id="editDailyLimit" placeholder="حجم روزانه">
            <input type="text" id="editTimeLimit" placeholder="زمان">
            <input type="text" id="editIP" placeholder="IP اختصاصی">
        </div>
        <div style="display: flex; gap: 10px; margin-top: 16px;">
            <button class="btn btn-success" onclick="saveEdit()">💾 ذخیره</button>
            <button class="btn btn-danger" onclick="closeEditModal()">❌ لغو</button>
        </div>
    </div>
</div>

<!-- Toast Container -->
<div id="toastContainer"></div>

<script>
    var LOCATIONS_DATA = 'LOCS_PLACEHOLDER';
    var currentPage = 'login';
    var editingUserId = null;
    var allUsers = [];

    // ===== NAVIGATION =====
    function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
        document.getElementById('sidebarOverlay').classList.toggle('active');
    }

    function navigateTo(page) {
        currentPage = page;
        document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
        document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
        
        var pageEl = document.getElementById('page-' + page);
        if (pageEl) pageEl.classList.add('active');
        
        var navEl = document.querySelector('[data-page="' + page + '"]');
        if (navEl) navEl.classList.add('active');
        
        document.getElementById('headerTitle').textContent = navEl ? navEl.textContent.trim() : page;
        
        if (page === 'dashboard') loadDashboard();
        if (page === 'users') loadUsers();
        if (page === 'locations') loadLocations();
        
        if (window.innerWidth < 1024) toggleSidebar();
    }

    // ===== TOAST =====
    function showToast(msg, type) {
        type = type || 'success';
        var toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.textContent = msg;
        document.getElementById('toastContainer').appendChild(toast);
        setTimeout(function() { toast.remove(); }, 3000);
    }

    // ===== AUTH =====
    async function doLogin() {
        var pass = document.getElementById('loginPassword').value;
        if (!pass) { showToast('رمز عبور را وارد کنید', 'error'); return; }
        try {
            var res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: pass })
            });
            var data = await res.json();
            if (data.success) {
                navigateTo('dashboard');
                showToast('خوش آمدید! ✅');
            } else {
                showToast('رمز عبور اشتباه است ❌', 'error');
            }
        } catch (e) {
            showToast('خطا در ارتباط با سرور', 'error');
        }
    }

    async function logout() {
        await fetch('/api/logout', { method: 'POST' });
        location.reload();
    }

    // ===== DASHBOARD =====
    async function loadDashboard() {
        try {
            var res = await fetch('/api/stats');
            var stats = await res.json();
            document.getElementById('dashboardStats').innerHTML =
                '<div class="stat-card"><div class="stat-icon">👥</div><div class="stat-value">' + stats.totalUsers + '</div><div class="stat-label">کل کاربران</div></div>' +
                '<div class="stat-card"><div class="stat-icon">🟢</div><div class="stat-value">' + stats.activeUsers + '</div><div class="stat-label">کاربران فعال</div></div>' +
                '<div class="stat-card"><div class="stat-icon">📊</div><div class="stat-value">' + (stats.totalUsage / 1024).toFixed(2) + ' GB</div><div class="stat-label">مصرف کل</div></div>' +
                '<div class="stat-card"><div class="stat-icon">📅</div><div class="stat-value">' + ((stats.todayUsage || 0) / 1024).toFixed(2) + ' GB</div><div class="stat-label">مصرف امروز</div></div>';
            
            var uRes = await fetch('/api/users');
            allUsers = await uRes.json();
            var recent = allUsers.slice(-5).reverse();
            var html = '<table><thead><tr><th>نام</th><th>UUID</th><th>مصرف</th><th>وضعیت</th></tr></thead><tbody>';
            recent.forEach(function(u) {
                var used = u.usedData || 0;
                var limit = u.dataLimit || 0;
                html += '<tr><td>' + u.name + '</td><td><small>' + u.uuid.substring(0, 10) + '...</small></td><td>' + used.toFixed(0) + 'MB / ' + (limit > 0 ? (limit/1024).toFixed(1) + 'GB' : '∞') + '</td><td>' + (u.active ? '<span class="badge badge-success">فعال</span>' : '<span class="badge badge-danger">غیرفعال</span>') + '</td></tr>';
            });
            html += '</tbody></table>';
            document.getElementById('recentUsers').innerHTML = html || '<p style="text-align: center; color: var(--text-secondary);">کاربری یافت نشد</p>';
        } catch (e) {
            showToast('خطا در بارگذاری داشبورد', 'error');
        }
    }

    // ===== USERS =====
    async function loadUsers() {
        try {
            var res = await fetch('/api/users');
            allUsers = await res.json();
            var html = '<table><thead><tr><th>نام</th><th>UUID</th><th>IP</th><th>حجم</th><th>مصرف</th><th>باقی‌مانده</th><th>زمان</th><th>اپراتور</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody>';
            allUsers.forEach(function(u) {
                var used = u.usedData || 0;
                var limit = u.dataLimit || 0;
                var remaining = limit > 0 ? limit - used : 0;
                var pct = limit > 0 ? (used / limit * 100).toFixed(1) : 0;
                var pctClass = pct > 80 ? 'fill-high' : pct > 50 ? 'fill-medium' : 'fill-low';
                var opName = u.operator === 'mci' ? 'همراه اول' : u.operator === 'mtn' ? 'ایرانسل' : u.operator === 'rtl' ? 'رایتل' : 'همه';
                html += '<tr>' +
                    '<td>' + u.name + '</td>' +
                    '<td><small>' + u.uuid.substring(0, 8) + '...</small></td>' +
                    '<td>' + (u.ip || '-') + '</td>' +
                    '<td>' + (limit > 0 ? (limit/1024).toFixed(1) + 'GB' : '∞') + '</td>' +
                    '<td>' + used.toFixed(0) + 'MB (' + pct + '%)<div class="progress"><div class="progress-fill ' + pctClass + '" style="width:' + Math.min(pct, 100) + '%"></div></div></td>' +
                    '<td>' + (limit > 0 ? (remaining > 0 ? (remaining/1024).toFixed(1) + 'GB' : '<span class="badge badge-danger">تمام</span>') : '∞') + '</td>' +
                    '<td>' + (u.timeLimit > 0 ? u.timeLimit + ' روز' : '∞') + '</td>' +
                    '<td>' + opName + '</td>' +
                    '<td>' + (u.active ? '<span class="badge badge-success">فعال</span>' : '<span class="badge badge-danger">غیرفعال</span>') + '</td>' +
                    '<td class="actions">' +
                        '<button class="btn btn-outline btn-sm" onclick="editUser(\'' + u.id + '\')">✏️</button>' +
                        '<button class="btn btn-danger btn-sm" onclick="deleteUser(\'' + u.id + '\')">🗑️</button>' +
                        '<button class="btn btn-outline btn-sm" onclick="resetUser(\'' + u.id + '\')">🔄</button>' +
                        '<button class="btn btn-outline btn-sm" onclick="toggleUser(\'' + u.id + '\', ' + !u.active + ')">' + (u.active ? '🔴' : '🟢') + '</button>' +
                        '<button class="btn btn-outline btn-sm" onclick="copyConfig(\'' + u.uuid + '\')">📋</button>' +
                    '</td>' +
                '</tr>';
            });
            html += '</tbody></table>';
            document.getElementById('usersTable').innerHTML = html || '<p style="text-align: center; color: var(--text-secondary);">کاربری یافت نشد</p>';
        } catch (e) {
            showToast('خطا در بارگذاری کاربران', 'error');
        }
    }

    async function addUser() {
        var data = {
            name: document.getElementById('userName').value,
            uuid: document.getElementById('userUUID').value,
            ip: document.getElementById('userIP').value,
            dataLimit: document.getElementById('userDataLimit').value,
            dailyLimit: document.getElementById('userDailyLimit').value,
            timeLimit: document.getElementById('userTimeLimit').value,
            operator: document.getElementById('userOperator').value
        };
        if (!data.name) { showToast('نام کاربر الزامی است', 'error'); return; }
        try {
            await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
            showToast('کاربر با موفقیت افزوده شد ✅');
            loadUsers();
            ['userName', 'userUUID', 'userIP', 'userDataLimit', 'userDailyLimit', 'userTimeLimit'].forEach(function(id) {
                document.getElementById(id).value = '';
            });
        } catch (e) { showToast('خطا در افزودن کاربر', 'error'); }
    }

    function editUser(id) {
        editingUserId = id;
        var user = allUsers.find(function(u) { return u.id === id; });
        if (!user) return;
        document.getElementById('editName').value = user.name;
        document.getElementById('editDataLimit').value = user.dataLimit > 0 ? (user.dataLimit / 1024).toFixed(0) + 'GB' : '';
        document.getElementById('editDailyLimit').value = '';
        document.getElementById('editTimeLimit').value = user.timeLimit > 0 ? user.timeLimit + 'd' : '';
        document.getElementById('editIP').value = user.ip || '';
        document.getElementById('editModal').classList.add('active');
    }

    async function saveEdit() {
        var data = {
            name: document.getElementById('editName').value,
            dataLimit: document.getElementById('editDataLimit').value,
            dailyLimit: document.getElementById('editDailyLimit').value,
            timeLimit: document.getElementById('editTimeLimit').value,
            ip: document.getElementById('editIP').value
        };
        try {
            await fetch('/api/users/' + editingUserId, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
            showToast('کاربر ویرایش شد ✅');
            closeEditModal();
            loadUsers();
        } catch (e) { showToast('خطا در ویرایش', 'error'); }
    }

    function closeEditModal() {
        document.getElementById('editModal').classList.remove('active');
        editingUserId = null;
    }

    async function deleteUser(id) {
        if (!confirm('آیا از حذف این کاربر اطمینان دارید؟')) return;
        try {
            await fetch('/api/users/' + id, { method: 'DELETE' });
            showToast('کاربر حذف شد ✅');
            loadUsers();
        } catch (e) { showToast('خطا در حذف', 'error'); }
    }

    async function resetUser(id) {
        if (!confirm('مصرف کاربر صفر شود؟')) return;
        try {
            await fetch('/api/users/' + id + '/reset', { method: 'POST' });
            showToast('مصرف کاربر ریست شد ✅');
            loadUsers();
        } catch (e) { showToast('خطا در ریست', 'error'); }
    }

    async function toggleUser(id, active) {
        try {
            await fetch('/api/users/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: active }) });
            showToast('وضعیت کاربر تغییر کرد ✅');
            loadUsers();
        } catch (e) { showToast('خطا', 'error'); }
    }

    function copyConfig(uuid) {
        var host = prompt('آدرس سرور:', '104.16.71.76');
        var port = prompt('پورت:', '443');
        if (!host || !port) return;
        fetch('/api/generate-config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uuid: uuid, host: host, port: port, type: 'vless' })
        })
        .then(function(r) { return r.json(); })
        .then(function(d) {
            navigator.clipboard.writeText(d.config);
            showToast('کانفیگ کپی شد! ✅');
        });
    }

    // ===== SCANNER =====
    async function scanFast() {
        var op = document.getElementById('scanOperator').value;
        var cnt = document.getElementById('scanCount').value;
        var resultDiv = document.getElementById('scanResults');
        resultDiv.innerHTML = '<div class="spinner"></div>';
        try {
            var res = await fetch('/api/ips?operator=' + op + '&count=' + cnt + '&sort=latency');
            var ips = await res.json();
            var html = '<table><thead><tr><th>#</th><th>IP</th><th>پورت‌ها</th><th>شهر</th><th>پینگ</th><th>اپراتور</th></tr></thead><tbody>';
            ips.forEach(function(item, i) {
                var ports = Array.isArray(item.ports) ? item.ports.join(', ') : item.ports;
                var opName = item.operator === 'mci' ? 'همراه اول' : item.operator === 'mtn' ? 'ایرانسل' : item.operator === 'rtl' ? 'رایتل' : 'همه';
                var lat = item.latency || 0;
                var latClass = lat < 50 ? 'badge-success' : lat < 80 ? 'badge-warning' : 'badge-danger';
                html += '<tr><td>' + (i === 0 ? '⭐' : (i + 1)) + '</td><td><strong>' + item.ip + '</strong></td><td>' + ports + '</td><td>' + (item.city || '-') + '</td><td><span class="badge ' + latClass + '">' + lat + 'ms</span></td><td>' + opName + '</td></tr>';
            });
            html += '</tbody></table>';
            resultDiv.innerHTML = html;
        } catch (e) {
            resultDiv.innerHTML = '<p style="text-align: center; color: var(--red);">خطا در اسکن</p>';
        }
    }

    async function scanReal() {
        var op = document.getElementById('scanOperator').value;
        var resultDiv = document.getElementById('scanResults');
        resultDiv.innerHTML = '<div class="spinner"></div><p style="text-align: center; color: var(--text-secondary);">در حال اسکن واقعی... (۱۰-۳۰ ثانیه)</p>';
        try {
            var res = await fetch('/api/scan-ips?operator=' + op);
            var data = await res.json();
            if (data.results && data.results.length > 0) {
                var html = '<table><thead><tr><th>#</th><th>IP</th><th>پورت</th><th>پینگ واقعی</th></tr></thead><tbody>';
                data.results.forEach(function(item, i) {
                    var latClass = item.latency < 100 ? 'badge-success' : item.latency < 200 ? 'badge-warning' : 'badge-danger';
                    html += '<tr><td>' + (i === 0 ? '⭐' : (i + 1)) + '</td><td><strong>' + item.ip + '</strong></td><td>' + item.port + '</td><td><span class="badge ' + latClass + '">' + item.latency + 'ms</span></td></tr>';
                });
                html += '</tbody></table>';
                resultDiv.innerHTML = html;
            } else {
                resultDiv.innerHTML = '<p style="text-align: center; color: var(--yellow);">آی‌پی زنده‌ای یافت نشد</p>';
            }
        } catch (e) {
            resultDiv.innerHTML = '<p style="text-align: center; color: var(--red);">خطا در اسکن</p>';
        }
    }

    // ===== LOCATIONS =====
    function loadLocations() {
        try {
            var locations = JSON.parse(LOCATIONS_DATA);
            var html = '';
            locations.forEach(function(loc) {
                html += '<div class="stat-card" style="cursor: pointer;" onclick="selectLocation(\'' + loc.name + '\', \'' + loc.ip + '\')">' +
                    '<div class="stat-icon">' + loc.flag + '</div>' +
                    '<div class="stat-value" style="font-size: 1.2rem;">' + loc.name + '</div>' +
                    '<div class="stat-label">' + loc.city + ' | ' + loc.ip + '</div>' +
                '</div>';
            });
            document.getElementById('locationsGrid').innerHTML = html;
        } catch (e) {
            document.getElementById('locationsGrid').innerHTML = '<p>خطا در بارگذاری لوکیشن‌ها</p>';
        }
    }

    function selectLocation(name, ip) {
        showToast('📍 ' + name + ' - ' + ip);
    }

    // ===== SUBSCRIPTION =====
    async function generateSub() {
        var uuid = document.getElementById('subUUID').value || 'UUID_MAIN';
        var type = document.getElementById('subType').value;
        var format = document.getElementById('subFormat').value;
        try {
            var res = await fetch('/sub/' + uuid + '?type=' + type + '&format=' + format);
            var text = await res.text();
            document.getElementById('subResult').value = text;
            showToast('سابسکریپشن دریافت شد ✅');
        } catch (e) {
            showToast('خطا در دریافت سابسکریپشن', 'error');
        }
    }

    // ===== SETTINGS =====
    async function saveSettings() {
        var data = {};
        if (document.getElementById('setUUID').value) data.UUID = document.getElementById('setUUID').value;
        if (document.getElementById('setAdminPass').value) data.ADMIN_PASS = document.getElementById('setAdminPass').value;
        if (document.getElementById('setSNI').value) data.SNI = document.getElementById('setSNI').value;
        if (document.getElementById('setFingerprint').value) data.FINGERPRINT = document.getElementById('setFingerprint').value;
        try {
            var res = await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
            var result = await res.json();
            if (result.success) showToast('تنظیمات ذخیره شد ✅');
            else showToast('خطا در ذخیره', 'error');
        } catch (e) { showToast('خطا', 'error'); }
    }

    async function saveFragment() {
        var data = {
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

    // ===== BACKUP =====
    async function downloadBackup() {
        try {
            var res = await fetch('/api/backup');
            var data = await res.json();
            var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'taakaa-xi-backup-' + new Date().toISOString().split('T')[0] + '.json';
            a.click();
            showToast('بکاپ دانلود شد ✅');
        } catch (e) { showToast('خطا', 'error'); }
    }

    function restoreBackup(file) {
        if (!file) return;
        if (!confirm('آیا از بازیابی بکاپ اطمینان دارید؟ اطلاعات فعلی جایگزین می‌شود!')) return;
        var reader = new FileReader();
        reader.onload = async function(e) {
            try {
                var data = JSON.parse(e.target.result);
                var res = await fetch('/api/restore', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
                var result = await res.json();
                if (result.success) { showToast('بکاپ بازیابی شد ✅'); loadDashboard(); }
                else showToast('خطا در بازیابی', 'error');
            } catch (err) { showToast('فایل نامعتبر', 'error'); }
        };
        reader.readAsText(file);
    }

    // ===== INIT =====
    fetch('/api/stats').then(function(r) {
        if (r.ok) { navigateTo('dashboard'); loadDashboard(); }
    }).catch(function() {});

    document.getElementById('loginPassword').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') doLogin();
    });
</script>
</body>
</html>`;
// ============================================
// 🔥 TAAKAA-XI PRO v11.0 - بخش ۶/۸
// 📄 صفحات جانبی
// ============================================

var HTML_SCANNER = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi PRO | اسکنر آی‌پی</title>
    <style>
        :root {
            --orange: #ff6b00;
            --bg: #0a0a0f;
            --card: #1a1a2e;
            --text: #e0e0e0;
            --text-secondary: #888;
            --border: rgba(255, 255, 255, 0.06);
            --green: #00ff88;
            --red: #ff4757;
            --yellow: #ffa502;
            --radius: 20px;
            --transition: all 0.3s ease;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            padding: 30px;
            background-image: radial-gradient(ellipse at 50% 0%, rgba(255, 107, 0, 0.08) 0%, transparent 60%);
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 {
            color: var(--orange);
            text-align: center;
            margin-bottom: 28px;
            font-size: 2.2rem;
            background: linear-gradient(135deg, var(--orange), #ff8533);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .controls { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; justify-content: center; }
        select, button {
            padding: 11px 20px;
            border-radius: 12px;
            border: 1px solid var(--border);
            background: var(--card);
            color: var(--text);
            font-family: inherit;
            cursor: pointer;
            transition: var(--transition);
        }
        button { background: var(--orange); border: none; font-weight: 600; }
        button:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(255, 107, 0, 0.25); }
        .btn-real { background: transparent; border: 1px solid var(--orange); color: var(--orange); }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
        .ip-card {
            padding: 22px;
            background: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            cursor: pointer;
            transition: var(--transition);
        }
        .ip-card:hover { border-color: var(--orange); transform: translateY(-3px); }
        .ip-card.best { border-color: var(--green); }
        .ip-card .ip { font-size: 1.1rem; font-weight: 700; color: var(--orange); }
        .ip-card .meta { color: var(--text-secondary); margin-top: 6px; font-size: 0.85rem; }
        .tag { display: inline-block; padding: 3px 10px; border-radius: 15px; font-size: 0.7rem; margin-top: 6px; margin-right: 4px; }
        .tag-op { background: rgba(255, 107, 0, 0.15); }
        .tag-g { background: rgba(0, 255, 136, 0.12); color: var(--green); }
        .tag-y { background: rgba(255, 165, 2, 0.12); color: var(--yellow); }
        .tag-r { background: rgba(255, 71, 87, 0.12); color: var(--red); }
        .spinner { width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.06); border-top-color: var(--orange); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 30px auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>
</head>
<body>
<div class="container">
    <h1>📡 اسکنر آی‌پی</h1>
    <div class="controls">
        <select id="op"><option value="all">همه</option><option value="mci">همراه اول</option><option value="mtn">ایرانسل</option><option value="rtl">رایتل</option></select>
        <select id="cnt"><option value="10">۱۰</option><option value="20">۲۰</option><option value="50">۵۰</option></select>
        <button onclick="scanF()">🔍 سریع</button>
        <button class="btn-real" onclick="scanR()">⚡ واقعی</button>
    </div>
    <div id="st" style="text-align:center;color:var(--text-secondary);margin-bottom:1rem"></div>
    <div class="grid" id="res"><p style="text-align:center;color:var(--text-secondary);grid-column:1/-1">دکمه اسکن را بزنید</p></div>
</div>
<script>
function scanF(){var o=document.getElementById('op').value,c=document.getElementById('cnt').value,d=document.getElementById('res'),s=document.getElementById('st');d.innerHTML='<div class="spinner" style="grid-column:1/-1"></div>';s.textContent='در حال دریافت...';fetch('/api/ips?operator='+o+'&count='+c+'&sort=latency').then(function(r){return r.json()}).then(function(r){var h='';r.forEach(function(x,i){var p=Array.isArray(x.ports)?x.ports.join(','):x.ports,l=x.latency||0,lc=l<50?'tag-g':l<80?'tag-y':'tag-r',op=x.operator==='mci'?'همراه اول':x.operator==='mtn'?'ایرانسل':x.operator==='rtl'?'رایتل':'همه';h+='<div class="ip-card'+(i===0?' best':'')+'" onclick="cpy(\''+x.ip+'\',\''+p+'\')"><div class="ip">'+(i===0?'⭐ ':'')+x.ip+'</div><div class="meta">'+p+' | '+x.city+'</div><span class="tag tag-op">'+op+'</span><span class="tag '+lc+'">'+l+'ms</span></div>'});d.innerHTML=h;s.textContent=r.length+' آی‌پی یافت شد'}).catch(function(){d.innerHTML='<p style="text-align:center;color:var(--red);grid-column:1/-1">خطا</p>';s.textContent=''})}
function scanR(){var o=document.getElementById('op').value,d=document.getElementById('res'),s=document.getElementById('st');d.innerHTML='<div class="spinner" style="grid-column:1/-1"></div>';s.textContent='اسکن واقعی...';fetch('/api/scan-ips?operator='+o).then(function(r){return r.json()}).then(function(r){if(r.results&&r.results.length){var h='';r.results.forEach(function(x,i){h+='<div class="ip-card'+(i===0?' best':'')+'" onclick="cpy(\''+x.ip+'\',\''+x.port+'\')"><div class="ip">'+(i===0?'⭐ ':'')+x.ip+'</div><div class="meta">پورت: '+x.port+'</div><span class="tag '+(x.latency<100?'tag-g':x.latency<200?'tag-y':'tag-r')+'">'+x.latency+'ms</span></div>'});d.innerHTML=h;s.textContent=r.results.length+' آی‌پی زنده'}else{d.innerHTML='<p style="text-align:center;color:var(--yellow);grid-column:1/-1">زنده‌ای یافت نشد</p>';s.textContent=''}}).catch(function(){d.innerHTML='<p style="text-align:center;color:var(--red);grid-column:1/-1">خطا</p>';s.textContent=''})}
function cpy(i,p){navigator.clipboard.writeText(i+':'+p.split(',')[0]);alert('کپی شد: '+i)}
</script></body></html>`;

var HTML_OWNERS = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | پشتیبان‌ها</title><style>body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#e0e0e0;text-align:center;padding:50px}h1{color:#ff6b00}.card{margin:30px auto;padding:30px;background:#1a1a2e;border-radius:20px;display:inline-block;border:1px solid rgba(255,255,255,.06)}a{color:#ff6b00}</style></head><body><h1>👥 پشتیبانی</h1><div class="card"><h2>تیم تاکا</h2><p>تلگرام: <a href="https://t.me/TaaKaaOrg">@TaaKaaOrg</a></p><p>🚀 ۳ ماه توسعه</p></div></body></html>`;

var HTML_FRAGMENT = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | Fragment</title><style>body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#e0e0e0;padding:40px;max-width:800px;margin:0 auto}h1{color:#ff6b00}.card{background:#1a1a2e;padding:30px;border-radius:20px;border:1px solid rgba(255,255,255,.06);line-height:2}code{background:rgba(255,107,0,.15);padding:3px 8px;border-radius:5px;color:#ff8533}</style></head><body><h1>🛡️ Fragment</h1><div class="card"><p>تکنیک تکه‌تکه کردن بسته‌های TLS برای دور زدن DPI</p><p><code>size</code>: 200-500 | <code>count</code>: 5-10 | <code>delay</code>: 10-30ms</p></div></body></html>`;

var HTML_OFFLINE = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | راهنما</title><style>body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#e0e0e0;padding:40px}h1{color:#ff6b00}.card{background:#1a1a2e;padding:30px;border-radius:20px;border:1px solid rgba(255,255,255,.06)}h2{color:#ff8533;margin-top:20px}</style></head><body><h1>📚 راهنمای اپراتورها</h1><div class="card"><h2>همراه اول</h2><p>پورت‌ها: 443, 8443, 2083</p><h2>ایرانسل</h2><p>پورت‌ها: 443, 2083, 2087</p><h2>رایتل</h2><p>پورت‌ها: 443, 2096</p></div></body></html>`;

var HTML_LOCATION = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>Taakaa-Xi | لوکیشن‌ها</title><style>body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#e0e0e0;padding:40px}h1{color:#ff6b00;text-align:center}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-top:30px}.loc{padding:24px;background:#1a1a2e;border-radius:20px;cursor:pointer;transition:all .3s;text-align:center;border:1px solid rgba(255,255,255,.06)}.loc:hover{border-color:#ff6b00;transform:scale(1.05)}.flag{font-size:2.5rem}.name{font-weight:700;margin-top:8px}.city{color:#888;font-size:.8rem;margin-top:4px}</style></head><body><h1>🌍 لوکیشن‌ها</h1><div class="grid" id="g"></div><script>var l='LOCS_PLACEHOLDER';try{var locs=JSON.parse(l);var h='';locs.forEach(function(x){h+='<div class="loc" onclick="alert(\''+x.name+' - '+x.ip+'\')"><div class="flag">'+x.flag+'</div><div class="name">'+x.name+'</div><div class="city">'+x.city+'</div></div>'});document.getElementById('g').innerHTML=h}catch(e){}</script></body></html>`;
// ============================================
// 🔥 TAAKAA-XI PRO v11.0 - بخش ۷/۸
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
    
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // ─── Load Config from KV ───
    if (env.KV) {
      try {
        var savedConfig = await env.KV.get('config');
        if (savedConfig) {
          CONFIG = Object.assign({}, CONFIG, JSON.parse(savedConfig));
        }
        var savedPass = await env.KV.get('admin_pass');
        if (savedPass) {
          CONFIG.ADMIN_PASS = savedPass;
        }
      } catch (e) {
        // Silent
      }
    }
    
    if (env.ADMIN_PASS) {
      CONFIG.ADMIN_PASS = env.ADMIN_PASS;
    }
    
    var userManager = new UserManager(env);
    var sessionManager = new SessionManager(env);
    var hasKV = !!env.KV;
    var hasPass = !!CONFIG.ADMIN_PASS;
    
    // ─── Setup Check APIs ───
    if (path === '/api/check-kv') {
      return new Response(JSON.stringify({ ok: hasKV }), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    if (path === '/api/check-d1') {
      return new Response(JSON.stringify({ ok: !!env.DB }), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    if (path === '/api/check-pass') {
      return new Response(JSON.stringify({ ok: hasPass }), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    if (path === '/api/setup-pass' && method === 'POST') {
      try {
        var body = await request.json();
        var password = body.password;
        if (!password || password.length < 3) {
          return new Response(JSON.stringify({ ok: false, error: 'رمز کوتاه' }), {
            headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
          });
        }
        if (env.KV) {
          await env.KV.put('admin_pass', password);
        }
        CONFIG.ADMIN_PASS = password;
        return new Response(JSON.stringify({ ok: true }), {
          headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
        });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: e.message }), {
          headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
        });
      }
    }
    
    // ─── Setup Page (if not configured) ───
    if ((!hasKV || !hasPass) && (path === '/' || path === '' || path === '/setup')) {
      return new Response(HTML_SETUP, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    // ─── API Auth Middleware ───
    var publicAPIs = ['login', 'check-kv', 'check-d1', 'check-pass', 'setup-pass', 'scan-ips'];
    var apiName = path.replace('/api/', '');
    
    if (path.startsWith('/api/') && publicAPIs.indexOf(apiName) === -1) {
      var cookie = request.headers.get('Cookie') || '';
      var sessionMatch = cookie.match(/session=([^;]+)/);
      if (!sessionMatch || !(await sessionManager.validate(sessionMatch[1]))) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
        });
      }
    }
    
    // ─── Login ───
    if (path === '/api/login' && method === 'POST') {
      var clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (!sessionManager.checkRateLimit(clientIP)) {
        return new Response(JSON.stringify({ error: 'Too many attempts' }), {
          status: 429,
          headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
        });
      }
      
      var loginBody = await request.json();
      if (loginBody.password === CONFIG.ADMIN_PASS) {
        var sessionId = await sessionManager.create();
        if (!sessionId) {
          return new Response(JSON.stringify({ error: 'KV not configured' }), {
            status: 500,
            headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
          });
        }
        return new Response(JSON.stringify({ success: true }), {
          headers: Object.assign({}, corsHeaders, {
            'Content-Type': 'application/json',
            'Set-Cookie': 'session=' + sessionId + '; Path=/; HttpOnly; SameSite=Strict; Max-Age=' + (CONFIG.SESSION_HOURS * 3600)
          })
        });
      }
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    // ─── Logout ───
    if (path === '/api/logout' && method === 'POST') {
      var logoutCookie = request.headers.get('Cookie') || '';
      var logoutMatch = logoutCookie.match(/session=([^;]+)/);
      if (logoutMatch) {
        await sessionManager.destroy(logoutMatch[1]);
      }
      return new Response(JSON.stringify({ success: true }), {
        headers: Object.assign({}, corsHeaders, {
          'Content-Type': 'application/json',
          'Set-Cookie': 'session=; Path=/; Max-Age=0'
        })
      });
    }
    
    // ─── Stats ───
    if (path === '/api/stats') {
      var stats = await userManager.getStats();
      return new Response(JSON.stringify(stats), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    // ─── Users CRUD ───
    if (path === '/api/users' && method === 'GET') {
      var users = await userManager.getAll();
      return new Response(JSON.stringify(users), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    if (path === '/api/users' && method === 'POST') {
      var userData = await request.json();
      var newUser = await userManager.add(userData);
      return new Response(JSON.stringify(newUser), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    if (path.match(/^\/api\/users\/([^\/]+)\/reset$/) && method === 'POST') {
      var resetUserId = path.split('/')[3];
      var resetUser = await userManager.resetUsage(resetUserId);
      return new Response(JSON.stringify(resetUser), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    if (path.match(/^\/api\/users\/([^\/]+)$/) && method === 'PUT') {
      var updateUserId = path.split('/')[3];
      var updateData = await request.json();
      var updatedUser = await userManager.update(updateUserId, updateData);
      return new Response(JSON.stringify(updatedUser), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    if (path.match(/^\/api\/users\/([^\/]+)$/) && method === 'DELETE') {
      var deleteUserId = path.split('/')[3];
      await userManager.delete(deleteUserId);
      return new Response(JSON.stringify({ success: true }), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    // ─── IPs & Scanner ───
    if (path === '/api/ips') {
      var operator = url.searchParams.get('operator') || 'all';
      var count = parseInt(url.searchParams.get('count') || '10');
      var sort = url.searchParams.get('sort');
      var ips = Helpers.getBestIPs(operator, count, sort === 'latency');
      return new Response(JSON.stringify(ips), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    if (path === '/api/scan-ips') {
      var scanOp = url.searchParams.get('operator') || 'all';
      var scanIPs = Helpers.getBestIPs(scanOp, 10);
      var uniqueIPs = [];
      var seen = {};
      scanIPs.forEach(function(item) {
        if (!seen[item.ip]) {
          seen[item.ip] = true;
          uniqueIPs.push(item.ip);
        }
      });
      var scanResults = await IPScanner.scanBatch(uniqueIPs, ['443'], 5);
      return new Response(JSON.stringify({ results: scanResults.slice(0, 20) }), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    // ─── Generate Config ───
    if (path === '/api/generate-config' && method === 'POST') {
      var configData = await request.json();
      var config = Helpers.generateConfig(
        configData.uuid || CONFIG.UUID,
        configData.host || '104.16.71.76',
        configData.port || '443',
        configData.type || 'vless',
        configData.settings || {}
      );
      return new Response(JSON.stringify({ config: config }), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    // ─── Settings ───
    if (path === '/api/settings' && method === 'GET') {
      return new Response(JSON.stringify(CONFIG), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    if (path === '/api/settings' && method === 'POST') {
      var settingsData = await request.json();
      Object.assign(CONFIG, settingsData);
      if (env.KV) {
        await env.KV.put('config', JSON.stringify(CONFIG));
      }
      if (settingsData.ADMIN_PASS && env.KV) {
        await env.KV.put('admin_pass', settingsData.ADMIN_PASS);
      }
      return new Response(JSON.stringify({ success: true }), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    // ─── Backup & Restore ───
    if (path === '/api/backup') {
      var backup = await userManager.backupData();
      return new Response(JSON.stringify(backup), {
        headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
      });
    }
    
    if (path === '/api/restore' && method === 'POST') {
      try {
        var restoreData = await request.json();
        var result = await userManager.restoreData(restoreData);
        return new Response(JSON.stringify({ success: result }), {
          headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), {
          headers: Object.assign({}, corsHeaders, { 'Content-Type': 'application/json' })
        });
      }
                                           }
    // ============================================
// 🔥 TAAKAA-XI PRO v11.0 - بخش ۸/۸
// 📦 Sub + Static Pages + Proxy
// ============================================

    // ─── Subscription ───
    if (path.startsWith('/sub/')) {
      var subUUID = path.replace('/sub/', '').replace(/\/$/, '');
      if (!Helpers.isValidUUID(subUUID)) {
        return new Response('UUID نامعتبر است', { status: 400 });
      }
      
      var subUser = await userManager.getByUUID(subUUID);
      if (!subUser && subUUID !== CONFIG.UUID) {
        return new Response('کاربر یافت نشد', { status: 404 });
      }
      
      var subType = url.searchParams.get('type') || 'all';
      var subFormat = url.searchParams.get('format') || 'raw';
      var subOperator = subUser ? subUser.operator : 'all';
      
      var configs = [];
      var bestIPs = Helpers.getBestIPs(subOperator, 5);
      
      bestIPs.forEach(function(item) {
        item.ports.forEach(function(port) {
          var userName = subUser ? subUser.name : 'Main';
          if (subType === 'all' || subType === 'vless') {
            configs.push(Helpers.generateConfig(subUUID, item.ip, port, 'vless', { name: 'Taakaa-Xi-' + userName }));
          }
          if (subType === 'all' || subType === 'trojan') {
            configs.push(Helpers.generateConfig(subUUID, item.ip, port, 'trojan', { name: 'Taakaa-Xi-' + userName }));
          }
          if (subType === 'all' || subType === 'ss') {
            configs.push(Helpers.generateConfig(subUUID, item.ip, port, 'ss', { name: 'Taakaa-Xi-' + userName }));
          }
        });
      });
      
      if (subFormat === 'base64') {
        return new Response(btoa(configs.join('\n')), {
          headers: { 'Content-Type': 'text/plain' }
        });
      }
      
      if (subFormat === 'clash') {
        var clashProxies = [];
        bestIPs.forEach(function(item) {
          item.ports.forEach(function(port) {
            clashProxies.push({
              name: 'Taakaa-Xi-' + item.ip + ':' + port,
              type: 'vless',
              server: item.ip,
              port: parseInt(port),
              uuid: subUUID,
              network: 'ws',
              'ws-opts': { path: '/' },
              tls: true,
              'servername': CONFIG.SNI
            });
          });
        });
        var clashConfig = { proxies: clashProxies };
        return new Response(JSON.stringify(clashConfig, null, 2), {
          headers: { 'Content-Type': 'application/yaml' }
        });
      }
      
      return new Response(configs.join('\n'), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
    
    // ─── Static Pages ───
    var locsJSON = JSON.stringify(CONFIG.LOCATIONS);
    
    if (path === '/' || path === '') {
      return new Response(HTML_WELCOME, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    if (path === '/admin') {
      return new Response(HTML_ADMIN.replace('LOCS_PLACEHOLDER', locsJSON), {
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
      return new Response(HTML_LOCATION.replace('LOCS_PLACEHOLDER', locsJSON), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    // ─── Proxy Handler ───
    return handleProxy(request, env, ctx);
  }
};
