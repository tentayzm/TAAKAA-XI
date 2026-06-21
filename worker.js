// ============================================================
// TAAKAA-XI CONFIGURATION - اضافه شده به اول فایل
// ============================================================

const TAAKAA_CONFIG = {
    brand: 'Taakaa-Xi',
    brandShort: 'T-Xi',
    colors: {
        primary: '#1a1a1a',
        secondary: '#ff6b00',
        accent: '#ff8c00',
        dark: '#0d0d0d',
        light: '#ffa64d'
    },
    telegram: {
        channel: 'https://t.me/TaakaaOrg',
        support: 'https://t.me/TaaKaaOrg'
    },
    serviceMessage: 'This service is not free - Taakaa Xi',
    configPrefix: 'Taakaa-xi-PayPassService',
    owners: {
        title: 'Owners',
        channel: '@TaakaaOrg',
        support: '@TaaKaaOrg',
        supportText: 'با مشکل مواجه شدید؟/Contact supporters'
    },
    fragment: {
        enabled: true,
        title: 'Fragment/تکه‌تکه‌سازی',
        description: 'تکنیک عبور از محدودیت‌های اینترنتی با تقسیم داده‌ها به بخش‌های کوچک',
        details: {
            'همراه اول': 'سایز: ۵۰-۱۰۰ بایت | تاخیر: ۱۰-۲۰ms | بهترین عملکرد',
            'ایرانسل': 'سایز: ۳۰-۶۰ بایت | تاخیر: ۱۵-۳۰ms | توصیه می‌شود',
            'مبین نت': 'سایز: ۴۰-۸۰ بایت | تاخیر: ۵-۱۵ms | مناسب',
            'مخابرات': 'سایز: ۲۰-۵۰ بایت | تاخیر: ۱۰-۲۵ms | پیشنهاد می‌شود',
            'شاتل': 'سایز: ۶۰-۱۲۰ بایت | تاخیر: ۵-۱۰ms | بهترین نتیجه',
            'رایتل': 'سایز: ۳۵-۷۰ بایت | تاخیر: ۸-۲۰ms | مناسب'
        }
    },
    locations: [
        { id: 'de-frankfurt', name: 'Frankfurt', country: 'Germany', flag: '🇩🇪', server: 'de-frankfurt.taakaa.xyz' },
        { id: 'nl-amsterdam', name: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', server: 'nl-amsterdam.taakaa.xyz' },
        { id: 'us-nyc', name: 'New York', country: 'USA', flag: '🇺🇸', server: 'us-nyc.taakaa.xyz' },
        { id: 'sg-singapore', name: 'Singapore', country: 'Singapore', flag: '🇸🇬', server: 'sg-singapore.taakaa.xyz' },
        { id: 'jp-tokyo', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', server: 'jp-tokyo.taakaa.xyz' },
        { id: 'uk-london', name: 'London', country: 'UK', flag: '🇬🇧', server: 'uk-london.taakaa.xyz' }
    ]
};

// ============================================================
// TAAKAA-XI PAGES - اضافه شدن به اول فایل
// ============================================================

function taakaaOwnersPage() { /* ... کد کامل صفحه Owners ... */ }
function taakaaOfflineSupportPage() { /* ... کد کامل صفحه Offline ... */ }
function taakaaFragmentInfoPage() { /* ... کد کامل صفحه Fragment ... */ }
function taakaaLocationSelectionPage() { /* ... کد کامل صفحه Location ... */ }

// ============================================================
// TAAKAA-XI USER MANAGEMENT - اضافه شدن به اول فایل
// ============================================================

const USER_STORAGE_KEY = 'taakaa_users';

async function getUsers(env) {
    try {
        const data = await env.KV.get(USER_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

async function saveUsers(env, users) {
    await env.KV.put(USER_STORAGE_KEY, JSON.stringify(users, null, 2));
}

async function createUser(env, username, limitGB, expiryDays) {
    const users = await getUsers(env);
    const newUser = {
        id: crypto.randomUUID(),
        username: username,
        uuid: crypto.randomUUID().replace(/-/g, ''),
        limit: limitGB,
        used: 0,
        expiry: new Date(Date.now() + expiryDays * 86400000).toISOString(),
        enabled: true,
        createdAt: new Date().toISOString(),
        configName: TAAKAA_CONFIG.configPrefix + (users.length + 1)
    };
    users.push(newUser);
    await saveUsers(env, users);
    return newUser;
}

async function checkUserLimit(env, uuid) {
    const users = await getUsers(env);
    const user = users.find(u => u.uuid === uuid);
    if (!user) return { allowed: false, reason: 'User not found' };
    if (!user.enabled) return { allowed: false, reason: 'User disabled' };
    if (new Date(user.expiry) < new Date()) return { allowed: false, reason: 'Expired' };
    if (user.used >= user.limit) return { allowed: false, reason: 'Limit exceeded' };
    return { allowed: true, user };
}

async function recordUserUsage(env, uuid, bytes) {
    const users = await getUsers(env);
    const user = users.find(u => u.uuid === uuid);
    if (user) {
        user.used += bytes / (1024 * 1024 * 1024);
        await saveUsers(env, users);
    }
}

// ============================================================
// TAAKAA-XI PANEL HTML - اضافه شدن به اول فایل
// ============================================================

function panelHtml() { /* ... کد کامل پنل ... */ }
// ============================================================
// TAAKAA-XI PROXY WORKER - PART 2: NOVA CORE
// ============================================================
// این بخش شامل: Constants, Helpers, Crypto Functions
// از فایل اصلی Nova-Proxy (worker (24).js) کپی شده
// ============================================================

// ============================================================
// CONSTANTS
// ============================================================

const SESSION_MAX_AGE_MS = 0x5265c00;
const LOGIN_MAX_ATTEMPTS = 0x8;
const LOGIN_WINDOW_MS = 0x927c0;
const LOGIN_BLOCK_MS = 0xdbba0;
const WSearlyDataMaxBytes = 0x8 * 0x400;
const WSearlyDataMaxHeaderLength = Math.ceil(WSearlyDataMaxBytes * 0x4 / 0x3) + 0x4;
const upstreamBatchTargetBytes = 0x40 * 0x400;
const upstreamQueueMaxBytes = 0x20 * 0x400 * 0x400;
const upstreamQueueMaxItems = 0x2000;
const downstreamGrainChunkBytes = 0x40 * 0x400;
const downstreamGrainTailThreshold = 0x200;
const downstreamGrainSilentMs = 0x0;
const TCPconcurrentDialCount = 0x4;
const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
const NODE_ADDR_REGEX = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/;
const NOVA_REPO_RAW = 'https://raw.githubusercontent.com/SamadiPour/Nova-Proxy/main/';
const NOVA_VERSION_URL = NOVA_REPO_RAW + 'version.json';
const NOVA_WORKER_SRC_FALLBACK = NOVA_REPO_RAW + 'worker.js';

// ============================================================
// GLOBALS
// ============================================================

let cfSocketConnect = null;
let config_JSON = null;
let proxyIP = '';
let enableSocks5Proxy = null;
let enableSocks5GlobalProxy = false;
let mySocks5Account = '';
let parsedSocks5Address = {};
let cachedSocks5Whitelist = null;
let cachedProxyIP = null;
let cachedProxyResolvedArray = null;
let cachedProxyArrayIndex = 0;
let enableProxyFallback = true;
let debugLogPrint = false;
let connProxyWhitelist = [];
let nat64Config = '';
let cachedNat64Prefixes = null;
let cachedNat64At = 0;
let cachedNat64Src = '';
let networkSettings = null;
let cachedNetworkSettings = null;
let cachedNetworkSettingsAt = 0;
let cachedAdminPass = null;
let cachedAdminPassAt = 0;
let cachedWorkerUUID = null;
let cachedWorkerUUIDAt = 0;
let savedUsersAuth = null;
let savedUsersAuthAt = 0;
let lastCentralSync = 0;
let _kvMigratedFlag = false;
let cachedCfUsage = null;
let cachedCfUsageAt = 0;
let connUserId = null;
let connRejectReason = null;
let userUsageCache = {};
let userUsageCacheAt = 0;
let userDayUsageCache = {};
let userDayUsageCacheDay = '';
let _uusagePending = {};
let _uusageLastFlush = 0;
let _uusageFlushing = false;
let usagePending = { up: 0, down: 0 };
let usageLastFlush = 0;
let usageFlushing = false;
const USAGE_FLUSH_MS = 0x5 * 0x3c * 0x3e8;
const USAGE_FLUSH_BYTES = 0xc8 * 0x400 * 0x400;
const __loginAttempts = new Map();
const _cidrListCache = new Map();
const _md5md5Cache = new Map();
const _sha224Cache = new Map();
let PagesstaticPages = '';
const _CFG_KEY = 'taakaa_config';
let _cfgRaw = null;
let _cfgRawAt = 0;

// ============================================================
// SOCKS5 WHITELIST
// ============================================================

let SOCKS5whitelist = [
    'taakaa.xyz',
    '*.taakaa.xyz',
    'localhost',
    '127.0.0.1'
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function dataToUint8Array(c) {
    if (c instanceof Uint8Array) return c;
    if (c instanceof ArrayBuffer) return new Uint8Array(c);
    if (ArrayBuffer.isView(c)) return new Uint8Array(c.buffer, c.byteOffset, c.byteLength);
    return new Uint8Array(c || 0);
}

function concatByteData(...f) {
    if (!f || f.length === 0) return new Uint8Array(0);
    const g = f.filter(Boolean).map(dataToUint8Array);
    const h = g.reduce((a, b) => a + b.length, 0);
    const i = new Uint8Array(h);
    let j = 0;
    for (const k of g) {
        i.set(k, j);
        j += k.length;
    }
    return i;
}

function validDataLength(c) {
    if (!c) return 0;
    if (typeof c.length === 'number') return c.length;
    if (typeof c.byteLength === 'number') return c.byteLength;
    return 0;
}

function closeSocketQuietly(c) {
    try {
        if ((c.readyState === WebSocket.CLOSING || c.readyState === WebSocket.CLOSED) && c.close) {
            c.close();
        }
    } catch (f) {}
}

function log(...c) {
    if (debugLogPrint) console.log(...c);
}

function timingSafeStrEqual(c, f) {
    if (typeof c !== 'string' || typeof f !== 'string' || c.length !== f.length) return false;
    let g = 0;
    for (let h = 0; h < c.length; h++) g |= c.charCodeAt(h) ^ f.charCodeAt(h);
    return g === 0;
}

function getDateKey(c) {
    const f = c || new Date();
    return f.getFullYear() + '-' + String(f.getMonth() + 1).padStart(2, '0') + '-' + String(f.getDate()).padStart(2, '0');
}

function getMonthKey(c) {
    const f = c || new Date();
    return f.getFullYear() + '-' + String(f.getMonth() + 1).padStart(2, '0');
}

function formatBytes(c) {
    c = Number(c) || 0;
    const f = ['B', 'KB', 'MB', 'GB', 'TB'];
    let g = 0;
    while (c >= 1024 && g < f.length - 1) { c /= 1024; g++; }
    return c.toFixed(g === 0 ? 0 : 2) + ' ' + f[g];
}

function maskSensitiveInfo(c, f = 3, g = 2) {
    if (!c || typeof c !== 'string') return c;
    if (c.length <= f + g) return c;
    const h = c.slice(0, f);
    const i = c.slice(-g);
    const j = c.length - f - g;
    return h + '*'.repeat(j) + i;
}

function randomBase32(c = 32) {
    const f = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const g = crypto.getRandomValues(new Uint8Array(c));
    let h = '';
    for (const i of g) h += f[i % 32];
    return h;
}

function base32Decode(f) {
    const g = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let h = '';
    const j = [];
    for (const k of String(f).toUpperCase().replace(/=+$/, '').replace(/[^A-Z2-7]/g, '')) {
        h += g.indexOf(k).toString(2).padStart(5, '0');
    }
    for (let l = 0; l + 8 <= h.length; l += 8) {
        j.push(parseInt(h.slice(l, l + 8), 2));
    }
    return new Uint8Array(j);
}

function base64SecretEncode(c, f) {
    const g = new TextEncoder();
    const h = g.encode(c);
    const j = g.encode(f);
    const k = new Uint8Array(h.length);
    for (let m = 0; m < h.length; m++) {
        k[m] = h[m] ^ j[m % j.length];
    }
    let l = '';
    for (let n = 0; n < k.length; n++) {
        l += String.fromCharCode(k[n]);
    }
    return btoa(l);
}

function base64SecretDecode(c, f) {
    const g = atob(c);
    const h = new Uint8Array(g.length);
    for (let n = 0; n < g.length; n++) {
        h[n] = g.charCodeAt(n);
    }
    const j = new TextEncoder();
    const k = j.encode(f);
    const l = new Uint8Array(h.length);
    for (let o = 0; o < h.length; o++) {
        l[o] = h[o] ^ k[o % k.length];
    }
    const m = new TextDecoder();
    return m.decode(l);
}

function randomPath(c = '/') {
    const f = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
    const g = Math.floor(Math.random() * 3 + 1);
    const h = Array.from({ length: g }, () => f[Math.floor(Math.random() * f.length)]).join('/');
    if (c === '/') return '/' + h;
    return '/' + (h + c.replace('/?', '?'));
}

function replaceStarWithRandom(c) {
    if (typeof c !== 'string' || !c.includes('*')) return c;
    const f = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return c.replace(/\*/g, () => {
        let g = '';
        for (let h = 0; h < Math.floor(Math.random() * 14) + 3; h++) {
            g += f[Math.floor(Math.random() * f.length)];
        }
        return g;
    });
}

function getTransportProtocolConfig(c = {}) {
    const f = c.transportProtocol === 'xhttp';
    return {
        type: f ? (c.protocolType === 'trojan' ? 'trojan' : 'vless') : (c.protocolType === 'trojan' ? 'trojan' : 'ws'),
        pathFieldName: f ? 'xhttp' : 'path',
        domainFieldName: f ? 'xhttp-host' : 'host'
    };
}

function getTransportPathParamValue(c = {}, f = '/', g = false) {
    const h = g ? '/' : (c.randomPath ? randomPath(f) : f);
    if (c.transportProtocol !== 'xhttp') return h;
    return h.split('?')[0] || '/';
}

function isIPv4Addr(c) {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(c);
}

function isIPv4(c) {
    const f = String(c || '').split('.');
    return f.length === 4 && f.every(g => /^\d{1,3}$/.test(g) && Number(g) >= 0 && Number(g) <= 255);
}

function isIPHostname(c = '') {
    const f = stripIPv6Brackets(c);
    const g = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
    if (g.test(f)) return true;
    if (!f.includes(':')) return false;
    try { new URL('https://[' + f + ']/'); return true; } catch (h) { return false; }
}

function stripIPv6Brackets(c = '') {
    const f = String(c || '').trim();
    return f.startsWith('[') && f.endsWith(']') ? f.slice(1, -1) : f;
}

function isBlockedSite(c) {
    if (isSpeedTestSite(c)) return true;
    if (networkSettings && networkSettings.enablePornBlock) return isAdultDomain(c);
    return false;
}

const SPEEDTEST_DOMAIN = atob('c3BlZWR0ZXN0Lm5ldA==');

function isSpeedTestSite(c) {
    return c === SPEEDTEST_DOMAIN || c.endsWith('.' + SPEEDTEST_DOMAIN);
}

const IRANIAN_DOMAINS = [
    'ir', 'co.ir', 'ac.ir', 'sch.ir', 'org.ir', 'net.ir', 'gov.ir',
    'edu.ir', 'id.ir', 'k12.ir', 'cbi.ir', 'mci.ir', 'mtn.ir', 'irancell.ir'
];

function isIranianDomain(c) {
    if (!c) return false;
    const f = c.toLowerCase();
    for (const g of IRANIAN_DOMAINS) {
        if (f === g || f.endsWith('.' + g)) return true;
    }
    return false;
}

const ADULT_DOMAINS = [
    'porn', 'xxx', 'sex', 'adult', 'hentai', 'nude', 'fuck', 'cock', 'dick',
    'pussy', 'ass', 'boobs', 'tits', 'cum', 'orgasm', 'masturbate'
];

function isAdultDomain(c) {
    if (!c) return false;
    const f = c.toLowerCase();
    for (const g of ADULT_DOMAINS) {
        if (f === g || f.endsWith('.' + g)) return true;
    }
    return false;
}

function identifyCarrier(c) {
    const f = c && c.cf;
    const g = {
        '4134': 'ct', '4809': 'ct', '4811': 'ct', '4812': 'ct', '4815': 'ct',
        '4837': 'cu', '4814': 'cu', '9929': 'cu', '17623': 'cu', '17816': 'cu',
        '9808': 'cmcc', '24400': 'cmcc', '56040': 'cmcc', '56041': 'cmcc', '56044': 'cmcc'
    };
    const h = [
        { code: 'ct', pattern: /chinanet|chinatelecom|china telecom|cn2|shtel/ },
        { code: 'cmcc', pattern: /cmi|cmnet|chinamobile|china mobile|cmcc|mobile communications/ },
        { code: 'cu', pattern: /china169|china unicom|chinaunicom|cucc|cncgroup|cuii|netcom/ }
    ];
    if (String(f && f.country || '').toLowerCase() !== 'cn') return 'cf';
    const i = String(f && f.asOrganization || '').toLowerCase();
    const j = h.find(({ pattern }) => pattern.test(i));
    return (j && j.code) || g[String(f && f.asn || '')] || 'cf';
}

function hostMatchesProxyList(c) {
    const f = connProxyWhitelist.length ? connProxyWhitelist : SOCKS5whitelist;
    return f.some(g => {
        try {
            return new RegExp('^' + String(g).trim().replace(/\*/g, '.*') + '$', 'i').test(c);
        } catch { return false; }
    });
}

function formatIdentifier(c, f = 0) {
    const g = [...c.slice(f, f + 16)].map(h => h.toString(16).padStart(2, '0')).join('');
    return g.slice(0, 8) + '-' + g.slice(8, 12) + '-' + g.slice(12, 16) + '-' + g.slice(16, 20) + '-' + g.slice(20);
}

function resolveConnUser(c) {
    connUserId = null;
    connRejectReason = null;
    if (!networkSettings || !Array.isArray(networkSettings.users)) return;
    const f = c.url.searchParams.get('u');
    if (!f) return;
    const g = networkSettings.users.find(h => h && h.username === f);
    if (!g) { connRejectReason = 'User not found'; return; }
    if (g.enabled === false) { connRejectReason = 'User disabled'; return; }
    if (g.expiry) {
        const h = Date.parse(g.expiry);
        if (!isNaN(h) && Date.now() > h) { connRejectReason = 'User expired'; return; }
    }
    if (g.limit) {
        const i = userUsageCache[g.id] || 0;
        if (i >= g.limit) { connRejectReason = 'User limit exceeded'; return; }
    }
    connUserId = g.id;
}

function versionGreater(c, f) {
    const g = String(c || '').replace(/^[vV]/, '').split('.').map(j => parseInt(j, 10) || 0);
    const h = String(f || '').replace(/^[vV]/, '').split('.').map(j => parseInt(j, 10) || 0);
    for (let j = 0; j < Math.max(g.length, h.length); j++) {
        const k = g[j] || 0;
        const l = h[j] || 0;
        if (k > l) return true;
        if (k < l) return false;
    }
    return false;
}

// ============================================================
// CRYPTO FUNCTIONS
// ============================================================

async function MD5MD5(c) {
    if (_md5md5Cache.has(c)) return _md5md5Cache.get(c);
    const f = new TextEncoder();
    const g = await crypto.subtle.digest('MD5', f.encode(c));
    const h = Array.from(new Uint8Array(g));
    const i = h.map(n => n.toString(16).padStart(2, '0')).join('');
    const j = await crypto.subtle.digest('MD5', f.encode(i.slice(7, 27)));
    const k = Array.from(new Uint8Array(j));
    const l = k.map(n => n.toString(16).padStart(2, '0')).join('');
    const m = l.slice(0, 32);
    if (_md5md5Cache.size > 500) _md5md5Cache.clear();
    _md5md5Cache.set(c, m);
    return m;
}

function sha224(k) {
    if (_sha224Cache.has(k)) return _sha224Cache.get(k);
    const m = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
        0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
        0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
        0xfc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
        0x6ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
        0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
        0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
        0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
        0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];
    const n = (y, z) => (y >>> z | y << (32 - z)) >>> 0;
    k = unescape(encodeURIComponent(k));
    const o = k.length * 8;
    k += String.fromCharCode(0x80);
    while (k.length * 8 % 512 !== 448) k += String.fromCharCode(0);
    const p = [0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4];
    const q = Math.floor(o / 0x100000000);
    const t = o & 0xffffffff;
    k += String.fromCharCode(q >>> 24 & 0xff, q >>> 16 & 0xff, q >>> 8 & 0xff, q & 0xff, t >>> 24 & 0xff, t >>> 16 & 0xff, t >>> 8 & 0xff, t & 0xff);
    const u = [];
    for (let y = 0; y < k.length; y += 4) {
        u.push(k.charCodeAt(y) << 24 | k.charCodeAt(y + 1) << 16 | k.charCodeAt(y + 2) << 8 | k.charCodeAt(y + 3));
    }
    for (let z = 0; z < u.length; z += 16) {
        const A = new Array(64).fill(0);
        for (let J = 0; J < 16; J++) A[J] = u[z + J];
        for (let L = 16; L < 64; L++) {
            const M = n(A[L - 15], 7) ^ n(A[L - 15], 18) ^ A[L - 15] >>> 3;
            const N = n(A[L - 2], 17) ^ n(A[L - 2], 19) ^ A[L - 2] >>> 10;
            A[L] = A[L - 16] + M + A[L - 7] + N >>> 0;
        }
        let [B, C, D, E, F, G, H, I] = p;
        for (let O = 0; O < 64; O++) {
            const P = n(F, 6) ^ n(F, 11) ^ n(F, 19);
            const Q = F & G ^ ~F & H;
            const R = I + P + Q + m[O] + A[O] >>> 0;
            const S = n(B, 2) ^ n(B, 13) ^ n(B, 22);
            const T = B & C ^ B & D ^ C & D;
            const U = S + T >>> 0;
            I = H; H = G; G = F; F = E + R >>> 0; E = D; D = C; C = B; B = R + U >>> 0;
        }
        for (let V = 0; V < 8; V++) {
            p[V] = p[V] + [B, C, D, E, F, G, H, I][V] >>> 0;
        }
    }
    let v = '';
    for (let W = 0; W < 7; W++) {
        for (let X = 24; X >= 0; X -= 8) {
            v += (p[W] >>> X & 0xff).toString(16).padStart(2, '0');
        }
    }
    if (_sha224Cache.size > 64) _sha224Cache.clear();
    _sha224Cache.set(k, v);
    return v;
}

// ============================================================
// AES-GCM & ChaCha20-Poly1305 (SS)
// ============================================================

const SSsupportEncryptionConfig = {
    'aes-128-gcm': { method: 'AES-GCM', keyLen: 16, saltLen: 16, maxChunk: 0x3fff, aesLength: 0x80 },
    'aes-256-gcm': { method: 'AES-GCM', keyLen: 32, saltLen: 32, maxChunk: 0x3fff, aesLength: 0x100 }
};
const SSAEADtagLength = 16;
const SSNoncelength = 12;
const SSsubkeyInfo = new TextEncoder().encode('ss-subkey');
const SStextEncoder = new TextEncoder();
const SStextDecode = new TextDecoder();
const SSmasterKeyCache = new Map();

function SSincrementNonceCounter(c) {
    for (let f = 0; f < c.length; f++) {
        c[f] = c[f] + 1 & 0xff;
        if (c[f] !== 0) return;
    }
}

async function SSderiveMasterKey(c, f) {
    const g = f + ':' + c;
    if (SSmasterKeyCache.has(g)) return SSmasterKeyCache.get(g);
    const h = (async () => {
        const i = SStextEncoder.encode(c || '');
        let j = new Uint8Array(0);
        let k = new Uint8Array(0);
        while (k.length < f) {
            const l = new Uint8Array(j.length + i.length);
            l.set(j, 0);
            l.set(i, j.length);
            j = new Uint8Array(await crypto.subtle.digest('SHA-256', l));
            k = concatByteData(k, j);
        }
        return k.slice(0, f);
    })();
    SSmasterKeyCache.set(g, h);
    try { return await h; } catch (i) { SSmasterKeyCache.delete(g); throw i; }
}

async function SSderiveSessionKey(c, f, g, h) {
    const i = { name: 'HKDF', hash: 'SHA-256' };
    const j = await crypto.subtle.deriveKey(i, g, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const k = new Uint8Array(await crypto.subtle.sign('HMAC', j, f));
    const l = await crypto.subtle.deriveKey({ name: 'HKDF', hash: 'SHA-256' }, k, i, false, ['deriveBits']);
    const m = new Uint8Array(c.saltLen);
    let n = new Uint8Array(0);
    let o = 0;
    let p = 1;
    while (o < c.saltLen) {
        const q = concatByteData(n, SSsubkeyInfo, new Uint8Array([p]));
        n = new Uint8Array(await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256' }, l, (q.length + 0x1f) * 8));
        const r = Math.min(n.length, c.saltLen - o);
        m.set(n.slice(0, r), o);
        o += r;
        p += 1;
    }
    return crypto.subtle.importKey('raw', m, { name: 'AES-GCM', length: c.keyLen * 8 }, false, h);
}

async function SSAEADencryption(c, f, g) {
    const h = f.slice();
    const i = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: h, tagLength: 128 }, c, g);
    SSincrementNonceCounter(f);
    return new Uint8Array(i);
}

async function SSAEADdecrypt(c, f, g) {
    const h = f.slice();
    const i = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: h, tagLength: 128 }, c, g);
    SSincrementNonceCounter(f);
    return new Uint8Array(i);
}

// ============================================================
// VLESS & TROJAN PARSING
// ============================================================

const UUIDbytesCache = new Map();
const VLESStextDecode = new TextDecoder();
const trojanTextDecoder = new TextDecoder();

function readHexNibble(c) {
    if (c >= 0x30 && c <= 0x39) return c - 0x30;
    c |= 0x20;
    if (c >= 0x61 && c <= 0x66) return c - 0x57;
    return -1;
}

function getUuidBytes(c) {
    const f = String(c || '');
    let g = UUIDbytesCache.get(f);
    if (g) return g;
    const h = f.replace(/-/g, '');
    if (h.length !== 32) return null;
    const j = new Uint8Array(16);
    for (let k = 0; k < 16; k++) {
        const l = readHexNibble(h.charCodeAt(k * 2));
        const m = readHexNibble(h.charCodeAt(k * 2 + 1));
        if (l < 0 || m < 0) return null;
        j[k] = l << 4 | m;
    }
    if (UUIDbytesCache.size >= 32) UUIDbytesCache.clear();
    UUIDbytesCache.set(f, j);
    return j;
}

function UUIDbyteMatch(c, f, g) {
    const h = getUuidBytes(g);
    if (!h || c.length < f + 16) return false;
    for (let j = 0; j < 16; j++) {
        if (c[f + j] !== h[j]) return false;
    }
    return true;
}

function parseVlessRequest(c, f) {
    const g = dataToUint8Array(c);
    const h = g.length;
    if (h < 24) return { hasError: true, message: 'Too short' };
    const j = g[0];
    if (!UUIDbyteMatch(g, 1, f)) return { hasError: true, message: 'UUID mismatch' };
    const k = g[17];
    const l = 18 + k;
    if (h < l + 4) return { hasError: true, message: 'Incomplete header' };
    const m = g[l];
    let n = false;
    if (m === 1) { /* TCP */ } else if (m === 2) { n = true; } else {
        return { hasError: true, message: 'Invalid protocol: ' + m };
    }
    const o = l + 1;
    const p = g[o] << 8 | g[o + 1];
    let q = o + 3;
    let r = 0;
    let s = '';
    const t = g[o + 2];
    switch (t) {
        case 1:
            r = 4;
            if (h < q + r) return { hasError: true, message: 'Incomplete IPv4' };
            s = g[q] + '.' + g[q + 1] + '.' + g[q + 2] + '.' + g[q + 3];
            break;
        case 2:
            if (h < q + 1) return { hasError: true, message: 'Incomplete domain length' };
            r = g[q]; q += 1;
            if (h < q + r) return { hasError: true, message: 'Incomplete domain' };
            s = VLESStextDecode.decode(g.slice(q, q + r));
            break;
        case 3:
            r = 16;
            if (h < q + r) return { hasError: true, message: 'Incomplete IPv6' };
            const v = [];
            for (let w = 0; w < 8; w++) {
                const x = q + w * 2;
                v.push((g[x] << 8 | g[x + 1]).toString(16));
            }
            s = v.join(':');
            break;
        default:
            return { hasError: true, message: 'Invalid address type: ' + t };
    }
    if (!s) return { hasError: true, message: 'Empty address, type: ' + t };
    const u = q + r;
    return { hasError: false, addressType: t, port: p, hostname: s, isUDP: n, rawClientData: g.slice(u), version: j };
}

function parseTrojanRequest(c, f) {
    const g = dataToUint8Array(c);
    const h = sha224(f);
    if (g.length < 58) return { hasError: true, message: 'Too short' };
    let j = 56;
    if (g[j] !== 13 || g[j + 1] !== 10) return { hasError: true, message: 'Invalid CRLF' };
    for (let t = 0; t < j; t++) {
        if (g[t] !== h.charCodeAt(t)) return { hasError: true, message: 'SHA224 mismatch' };
    }
    const k = j + 2;
    if (g.length < k + 6) return { hasError: true, message: 'Incomplete header' };
    const l = g[k];
    if (l !== 1 && l !== 3) return { hasError: true, message: 'Invalid address type' };
    const m = l === 3;
    const n = g[k + 1];
    let o = 0, p = k + 2, q = '';
    switch (n) {
        case 1:
            o = 4;
            if (g.length < p + o + 4) return { hasError: true, message: 'Incomplete IPv4' };
            q = g[p] + '.' + g[p + 1] + '.' + g[p + 2] + '.' + g[p + 3];
            break;
        case 3:
            if (g.length < p + 1) return { hasError: true, message: 'Incomplete domain length' };
            o = g[p]; p += 1;
            if (g.length < p + o + 4) return { hasError: true, message: 'Incomplete domain' };
            q = trojanTextDecoder.decode(g.slice(p, p + o));
            break;
        case 4:
            o = 16;
            if (g.length < p + o + 4) return { hasError: true, message: 'Incomplete IPv6' };
            const u = [];
            for (let v = 0; v < 8; v++) {
                const w = p + v * 2;
                u.push((g[w] << 8 | g[w + 1]).toString(16));
            }
            q = u.join(':');
            break;
        default:
            return { hasError: true, message: 'Invalid address type: ' + n };
    }
    if (!q) return { hasError: true, message: 'Empty address, type: ' + n };
    const r = p + o;
    if (g.length < r + 4) return { hasError: true, message: 'Incomplete port' };
    const s = g[r] << 8 | g[r + 1];
    return { hasError: false, addressType: n, port: s, hostname: q, isUDP: m, rawClientData: g.slice(r + 4) };
}

function isTrojanFirstPacket(c, f) {
    if (!c || c.length < 58 || c[56] !== 13 || c[57] !== 10) return false;
    const g = sha224(f);
    for (let h = 0; h < 56; h++) {
        if (c[h] !== g.charCodeAt(h)) return false;
    }
    return true;
}

function isValidWsEarlyData(c, f) {
    if (!c || !c.length) return false;
    if (c.length >= 18 && UUIDbyteMatch(c, 1, f)) return true;
    if (c.length < 58 || c[56] !== 13 || c[57] !== 10) return false;
    const g = sha224(f);
    for (let h = 0; h < 56; h++) {
        if (c[h] !== g.charCodeAt(h)) return false;
    }
    return true;
}

function decodeWsEarlyData(c, f) {
    if (!c) return null;
    if (c.length > WSearlyDataMaxHeaderLength) throw new Error('Early data too large');
    let g;
    const h = Uint8Array;
    if (typeof h.from === 'function') {
        try { g = h.from(c, { alphabet: 'base64url' }); } catch (j) {}
    }
    if (!g) {
        let k = c.replace(/-/g, '+').replace(/_/g, '/');
        const l = k.length % 4;
        if (l) k += '='.repeat(4 - l);
        let m;
        try { m = atob(k); } catch (n) { return null; }
        g = new Uint8Array(m.length);
        for (let o = 0; o < m.length; o++) g[o] = m.charCodeAt(o);
    }
    if (g.length > WSearlyDataMaxBytes) throw new Error('Decoded early data too large');
    return isValidWsEarlyData(g, f) ? g : null;
}

// ============================================================
// TAAKAA-XI USER MANAGEMENT FUNCTIONS (اضافه شده)
// ============================================================

async function getUsers(env) {
    try {
        const data = await env.KV.get(USER_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

async function saveUsers(env, users) {
    await env.KV.put(USER_STORAGE_KEY, JSON.stringify(users, null, 2));
}

async function createUser(env, username, limitGB, expiryDays) {
    const users = await getUsers(env);
    const newUser = {
        id: crypto.randomUUID(),
        username: username,
        uuid: crypto.randomUUID().replace(/-/g, ''),
        limit: limitGB,
        used: 0,
        expiry: new Date(Date.now() + expiryDays * 86400000).toISOString(),
        enabled: true,
        createdAt: new Date().toISOString(),
        configName: TAAKAA_CONFIG.configPrefix + (users.length + 1)
    };
    users.push(newUser);
    await saveUsers(env, users);
    return newUser;
}

async function checkUserLimit(env, uuid) {
    const users = await getUsers(env);
    const user = users.find(u => u.uuid === uuid);
    if (!user) return { allowed: false, reason: 'User not found' };
    if (!user.enabled) return { allowed: false, reason: 'User disabled' };
    if (new Date(user.expiry) < new Date()) return { allowed: false, reason: 'Expired' };
    if (user.used >= user.limit) return { allowed: false, reason: 'Limit exceeded' };
    return { allowed: true, user };
}

async function recordUserUsage(env, uuid, bytes) {
    const users = await getUsers(env);
    const user = users.find(u => u.uuid === uuid);
    if (user) {
        user.used += bytes / (1024 * 1024 * 1024);
        await saveUsers(env, users);
    }
}

async function getConfigRaw(env) {
    if (_cfgRaw !== null && Date.now() - _cfgRawAt < 30000) return _cfgRaw;
    try {
        _cfgRaw = env.KV && typeof env.KV.get === 'function' ? await env.KV.get(_CFG_KEY) : null;
        _cfgRawAt = Date.now();
    } catch (f) {}
    return _cfgRaw;
}

function putConfig(env, f) {
    _cfgRaw = f;
    _cfgRawAt = Date.now();
    return env.KV.put(_CFG_KEY, f);
}
// ============================================================
// TAAKAA-XI PROXY WORKER - PART 3: NOVA PROTOCOLS
// ============================================================
// این بخش شامل: VLESS, Trojan, VMess, gRPC, WebSocket Handlers
// از فایل اصلی Nova-Proxy (worker (24).js) کپی شده
// ============================================================

// ============================================================
// WebSocket Handler
// ============================================================

async function handleWsRequest(c, f, g, h, i) {
    if (connRejectReason) return new Response('Connection rejected: ' + connRejectReason + ')', { status: 403 });
    const j = connUserId;
    const k = new WebSocketPair();
    const [l, m] = Object.values(k);
    try { m.accept({ allowHalfOpen: true }); } catch (R) { m.close(); }
    m.binaryType = 'arraybuffer';
    let n = { socket: null, connectingPromise: null, retryConnect: null };
    const o = { up: 0, down: 0 };
    let p = false, q = null;
    const r = { cache: new Uint8Array(0) };
    const s = c.url.searchParams.get('early') || '';
    const t = !!g.url.searchParams.has('no-early');
    let u = null;
    let v = Promise.resolve();
    let w = false, x = false, y = false;
    let z = 0, A = 0;
    let B = null, C = null, D = null, E = null, F = null;

    const G = () => {
        if (D) { try { D.close(); } catch (S) {} D = null; }
        C = null;
    };

    const H = u = createUpstreamWriteQueue({
        getWriter: () => {
            const S = n.socket;
            if (!S) return null;
            if (S !== C) { G(); C = S; D = S.writable.getWriter(); }
            return D;
        },
        releaseWriter: G,
        retryConnection: async () => {
            if (typeof n.retryConnect !== 'function') throw new Error('No retry connection function');
            await n.retryConnect();
        },
        closeConnection: () => {
            try { n.socket && n.socket.close(); } catch (S) {}
            closeSocketQuietly(m);
        },
        name: 'ws-writer'
    });

    const I = async (S, T = true) => { return H.write(S, T); };
    const J = async () => {
        if (E) return E;
        if (!F) {
            F = (async () => {
                // SS encryption setup
                const S = (g.url.searchParams.get('ss') || '').toLowerCase();
                const T = SSsupportEncryptionConfig[S] || SSsupportEncryptionConfig['aes-256-gcm'];
                const U = [T, ...Object.values(SSsupportEncryptionConfig).filter(a => a.method !== T.method)];
                const V = new Map();
                const W = (a) => {
                    if (!V.has(a.method)) V.set(a.method, SSderiveMasterKey(f, a.saltLen));
                    return V.get(a.method);
                };
                const X = {
                    buffer: new Uint8Array(0),
                    hasSalt: false,
                    waitPayloadLength: null,
                    decryptKey: null,
                    nonceCounter: new Uint8Array(SSNoncelength),
                    encryptionConfig: null
                };
                const Y = async () => {
                    const a6 = 2 + SSAEADtagLength;
                    const a7 = Math.max(...U.map(a => a.aesLength));
                    const a8 = 16;
                    const a9 = Math.max(a8, Math.min(0, X.buffer.length - (a6 + Math.max(...U.map(a => a.keyLen)))));
                    for (let ab = 0; ab <= a9; ab++) {
                        for (const ac of U) {
                            const ad = ab + ac.keyLen + a6;
                            if (X.buffer.length < ad) continue;
                            const ae = X.buffer.slice(ab, ab + ac.keyLen);
                            const af = X.buffer.slice(ab + ac.keyLen, ad);
                            const ag = await W(ac);
                            const ah = await SSderiveSessionKey(ac, ag, ae, ['key']);
                            const ai = new Uint8Array(SSNoncelength);
                            try {
                                const aj = await SSAEADdecrypt(ah, ai, af);
                                if (aj.length !== 2) continue;
                                const ak = aj[0] << 8 | aj[1];
                                if (ak < 0 || ak > ac.maxChunk) continue;
                                if (ab > 0) log('SS: salt offset ' + ab + ' bytes');
                                if (ac.method !== T.method) log('SS: using fallback cipher ' + (S || T.method) + ' → ' + ac.method);
                                X.buffer = X.buffer.slice(ad);
                                X.decryptKey = ah;
                                X.nonceCounter = ai;
                                X.waitPayloadLength = ak;
                                X.encryptionConfig = ac;
                                X.hasSalt = true;
                                return true;
                            } catch (al) {}
                        }
                    }
                    const aa = a7 + a6 + a8;
                    if (X.buffer.length >= aa) {
                        throw new Error('SS: cannot find salt for ' + (S || T.method) + ' (tried ' + U.map(a => a.method).join('/') + ')');
                    }
                    return false;
                };
                const Z = {
                    async input(a6) {
                        const a7 = dataToUint8Array(a6);
                        if (a7.length > 0) X.buffer = concatByteData(X.buffer, a7);
                        if (!X.hasSalt) {
                            const a9 = await Y();
                            if (!a9) return [];
                        }
                        const a8 = [];
                        while (true) {
                            if (X.waitPayloadLength === null) {
                                const ad = 2 + SSAEADtagLength;
                                if (X.buffer.length < ad) break;
                                const ae = X.buffer.slice(0, ad);
                                X.buffer = X.buffer.slice(ad);
                                const af = await SSAEADdecrypt(X.decryptKey, X.nonceCounter, ae);
                                if (af.length !== 2) throw new Error('SS: invalid length header');
                                const ag = af[0] << 8 | af[1];
                                if (ag < 0 || ag > X.encryptionConfig.maxChunk) throw new Error('SS: invalid chunk length ' + ag);
                                X.waitPayloadLength = ag;
                            }
                            const aa = X.waitPayloadLength + SSAEADtagLength;
                            if (X.buffer.length < aa) break;
                            const ab = X.buffer.slice(0, aa);
                            X.buffer = X.buffer.slice(aa);
                            const ac = await SSAEADdecrypt(X.decryptKey, X.nonceCounter, ab);
                            a8.push(ac);
                            X.waitPayloadLength = null;
                        }
                        return a8;
                    }
                };
                let a0 = null;
                const a1 = 32 * 1024;
                const a2 = async () => {
                    if (a0) return a0;
                    if (!X.hasSalt) throw new Error('SS: no salt available');
                    const a6 = X.encryptionConfig;
                    const a7 = await SSderiveMasterKey(f, a6.saltLen);
                    const a8 = crypto.getRandomValues(new Uint8Array(a6.saltLen));
                    const a9 = await SSderiveSessionKey(a6, a7, a8, ['key']);
                    const aa = new Uint8Array(SSNoncelength);
                    let ab = false;
                    return a0 = {
                        async encryptAndSend(ac, ad) {
                            const ae = dataToUint8Array(ac);
                            if (!ab) { await ad(a8); ab = true; }
                            if (ae.length === 0) return;
                            let af = 0;
                            while (af < ae.length) {
                                const ag = Math.min(af + a6.maxChunk, ae.length);
                                const ah = ae.slice(af, ag);
                                const ai = new Uint8Array(2);
                                ai[0] = ah.length >>> 8 & 0xff;
                                ai[1] = ah.length & 0xff;
                                const aj = await SSAEADencryption(a9, aa, ai);
                                const ak = await SSAEADencryption(a9, aa, ah);
                                const al = new Uint8Array(aj.length + ak.length);
                                al.set(aj, 0);
                                al.set(ak, aj.length);
                                await ad(al);
                                af = ag;
                            }
                        }
                    };
                };
                let a3 = Promise.resolve();
                const a4 = (a6) => {
                    a3 = a3.then(async () => {
                        if (m.readyState !== WebSocket.OPEN) return;
                        const a7 = await a2();
                        await a7.encryptAndSend(a6, async (a8) => {
                            if (a8.length > 0 && m.readyState === WebSocket.OPEN) {
                                await WebSocketsendAndWait(m, a8.buffer);
                            }
                        });
                    }).catch(a7 => {
                        log('SS send error: ' + (a7 && a7.message || a7));
                        closeSocketQuietly(m);
                    });
                    return a3;
                };
                const a5 = {
                    get readyState() { return m.readyState; },
                    send(a6) {
                        const a7 = dataToUint8Array(a6);
                        o.up += a7.length;
                        if (a7.length <= a1) return a4(a7);
                        for (let a8 = 0; a8 < a7.length; a8 += a1) {
                            a4(a7.slice(a8, Math.min(a8 + a1, a7.length)));
                        }
                        return a3;
                    },
                    close() { closeSocketQuietly(m); }
                };
                return {
                    inboundDecryptor: Z,
                    replyChunkSocket: a5,
                    firstPacketEstablished: false,
                    targetHost: '',
                    targetPort: 0
                };
            })();
            F.catch(() => { F = null; });
        }
        return F;
    };

    const K = async S => {
        const T = await J();
        let U = null;
        try {
            U = await T.inboundDecryptor.input(S);
        } catch (V) {
            const W = V && V.message || '' + V;
            if (W.includes('buffer') || W.includes('decrypt') || W.includes('salt')) {
                log('SS decrypt error: ' + W);
                closeSocketQuietly(m);
                return;
            }
            throw V;
        }
        for (const X of U) {
            let Y = false;
            try { Y = await I(X, false); } catch (a5) {
                if (a5 && a5.message) throw a5;
                Y = false;
            }
            if (Y) continue;
            if (T.firstPacketEstablished && T.targetHost && T.targetPort > 0) {
                o.up += validDataLength(X);
                await forwardataTCP(T.targetHost, T.targetPort, X, T.replyChunkSocket, null, n, f, c, o);
                continue;
            }
            const Z = dataToUint8Array(X);
            if (Z.length < 3) throw new Error('Too short');
            const a0 = Z[0];
            let a1 = 1, a2 = '';
            if (a0 === 1) {
                if (Z.length < a1 + 4 + 2) throw new Error('Incomplete IPv4');
                a2 = Z[a1] + '.' + Z[a1 + 1] + '.' + Z[a1 + 2] + '.' + Z[a1 + 3];
                a1 += 4;
            } else if (a0 === 3) {
                if (Z.length < a1 + 1) throw new Error('Incomplete domain length');
                const a6 = Z[a1]; a1 += 1;
                if (Z.length < a1 + a6 + 2) throw new Error('Incomplete domain');
                a2 = SStextDecode.decode(Z.slice(a1, a1 + a6));
                a1 += a6;
            } else if (a0 === 4) {
                if (Z.length < a1 + 16 + 2) throw new Error('Incomplete IPv6');
                const a7 = [];
                const a8 = new DataView(Z.buffer, Z.byteOffset + a1, 16);
                for (let a9 = 0; a9 < 8; a9++) {
                    a7.push(a8.getUint16(a9 * 2).toString(16));
                }
                a2 = a7.join(':');
                a1 += 16;
            } else {
                throw new Error('Invalid address type: ' + a0);
            }
            if (!a2) throw new Error('Empty address, type: ' + a0);
            const a3 = Z[a1] << 8 | Z[a1 + 1];
            a1 += 2;
            const a4 = Z.slice(a1);
            if (isBlockedSite(a2)) throw new Error('Blocked site: ' + a2);
            T.firstPacketEstablished = true;
            T.targetHost = a2;
            T.targetPort = a3;
            o.up += validDataLength(a4);
            await forwardataTCP(a2, a3, a4, T.replyChunkSocket, null, n, f, c, o);
        }
    };

    const L = async S => {
        let T = null;
        if (p) {
            if (q) return await forwardTrojanUdpData(S, m, r, c);
            return await forwardataudp(S, m, null, c);
        }
        if (B === 'ss') { await K(S); return; }
        if (await I(S)) { o.up += validDataLength(S); return; }
        if (B === null) {
            if (g.url.searchParams.has('ss')) B = 'ss';
            else {
                T = T || dataToUint8Array(S);
                const U = T;
                B = isTrojanFirstPacket(U, f) ? 'trojan' : 'vless';
            }
            q = B === 'trojan';
            log('Protocol: ' + B + ' | Host: ' + g.url.host + ' | Path: ' + (c.url.pathname || '/'));
        }
        if (B === 'ss') { await K(S); return; }
        if (await I(S)) { o.up += validDataLength(S); return; }
        if (B === 'trojan') {
            const V = parseTrojanRequest(S, f);
            if (V && V.hasError) throw new Error(V.message || 'Trojan parse error');
            const { port: W, hostname: X, rawClientData: Y, isUDP: Z } = V;
            if (isBlockedSite(X)) throw new Error('Blocked site: ' + X);
            if (Z) {
                p = true;
                if (validDataLength(Y) > 0) {
                    o.up += validDataLength(Y);
                    return forwardTrojanUdpData(Y, m, r, c);
                }
                return;
            }
            o.up += validDataLength(Y);
            await forwardataTCP(X, W, Y, m, null, n, f, c, o);
        } else {
            q = false;
            T = T || dataToUint8Array(S);
            const a0 = T;
            const a1 = parseVlessRequest(a0, f);
            if (a1 && a1.hasError) throw new Error(a1.message || 'VLESS parse error');
            const { port: a2, hostname: a3, version: a4, isUDP: a5, rawClientData: a6 } = a1;
            if (isBlockedSite(a3)) throw new Error('Blocked site: ' + a3);
            if (a5) {
                if (a2 === 53) p = true;
                else throw new Error('UDP only supported on port 53');
            }
            const a7 = new Uint8Array([a4, 0]);
            const a8 = a6;
            if (p) {
                if (q) {
                    o.up += validDataLength(a8);
                    return forwardTrojanUdpData(a8, m, r, c);
                }
                o.up += validDataLength(a8);
                return forwardataudp(a8, m, a7, c);
            }
            o.up += validDataLength(a8);
            await forwardataTCP(a3, a2, a8, m, a7, n, f, c, o);
        }
    };

    const M = S => {
        if (x) return;
        x = true;
        w = true;
        z = 0; A = 0;
        const T = S && S.message || '' + S;
        if (T.includes('close') || T.includes('CLOSE')) log('WebSocket closed: ' + T);
        else log('WebSocket error: ' + T);
        H.clear();
        G();
        closeSocketQuietly(m);
    };

    const N = S => {
        v = v.then(() => S).catch(M);
        return v;
    };

    const O = S => {
        if (w || x) return;
        const T = Math.min(0, validDataLength(S));
        const U = z + T;
        const V = A + 1;
        if (U > upstreamQueueMaxBytes || V > upstreamQueueMaxItems) {
            M(new Error('Queue overflow: ' + U + 'B/' + V));
            return;
        }
        z = U; A = V;
        N(async () => {
            z = Math.max(0, z - T);
            A = Math.max(0, A - 1);
            if (x) return;
            await L(S);
        });
    };

    const P = () => {
        if (y) return;
        y = true;
        w = true;
        N(async () => {
            if (x) return;
            await H.waitEmpty();
            G();
        });
    };

    m.addEventListener('message', S => { O(S.data); });
    const Q = () => {
        recordUsage(h, o.up, o.down, i);
        if (j) recordUserUsage(h, j, o.up, o.down, i);
    };
    m.addEventListener('close', () => { closeSocketQuietly(m); P(); Q(); });
    m.addEventListener('error', S => { M(S); Q(); });

    if (!t && s) {
        try {
            const S = decodeWsEarlyData(s, f);
            if (S && S.length) O(S);
        } catch (T) { M(T); }
    }

    return new Response(null, { status: 101, webSocket: l, headers: { 'Sec-WebSocket-Extensions': '' } });
}

async function WebSocketsendAndWait(c, f) {
    const g = c.send(f);
    if (g && typeof g.then === 'function') await g;
}

function createUpstreamWriteQueue({ getWriter: c, releaseWriter: f, retryConnection: g, closeConnection: h, name: name = 'queue' }) {
    let i = [], j = 0, k = 0, l = false, m = false, n = null, o = [], p = null;
    const q = (z, A = null) => {
        if (!z) return;
        for (const B of z) {
            if (A) B.reject(A);
            else B.resolve();
        }
    };
    const r = z => {
        for (let A = j; A < i.length; A++) {
            const B = i[A];
            if (B && B.completions) q(B.completions, z);
        }
    };
    const s = () => {
        if (j > 32 && j * 2 >= i.length) {
            i = i.slice(j);
            j = 0;
        }
    };
    const t = () => {
        if (k || l || !o.length) return;
        const z = o;
        o = [];
        for (const A of z) A();
    };
    const u = (z = null) => {
        const A = z || (m ? new Error(name + ' queue closed') : null);
        if (A) { r(A); if (p) { q(p, A); p = null; } }
        i = [];
        j = 0;
        k = 0;
        t();
    };
    const v = () => {
        if (j >= i.length) return null;
        const z = i[j];
        i[j++] = undefined;
        k -= z.chunk.length;
        s();
        return z;
    };
    const w = () => {
        const z = v();
        if (!z) return null;
        if (j >= i.length || z.chunk.length >= upstreamBatchTargetBytes) return z;
        let A = z.chunk.length, B = j, C = z.allowRetry, D = z.completions || null;
        while (B < i.length) {
            const G = i[B];
            const H = A + G.chunk.length;
            if (H > upstreamBatchTargetBytes) break;
            A = H;
            C = C && G.allowRetry;
            if (G.completions) D = D ? D.then(() => G.completions) : G.completions;
            B++;
        }
        if (B === j) return z;
        const E = n || (n = new Uint8Array(upstreamBatchTargetBytes));
        E.set(z.chunk);
        let F = z.chunk.length;
        while (j < B) {
            const I = i[j];
            i[j++] = undefined;
            k -= I.chunk.length;
            E.set(I.chunk, F);
            F += I.chunk.length;
        }
        s();
        return { chunk: E.slice(0, A), allowRetry: C, completions: D };
    };
    const x = async () => {
        if (l || m) return;
        l = true;
        try {
            for (;;) {
                if (m) break;
                const z = w();
                if (!z) break;
                let A = c();
                if (!A) throw new Error(name + ' writer is null');
                const B = z.completions || null;
                p = B;
                try {
                    try {
                        await A.write(z.chunk);
                    } catch (C) {
                        f && f();
                        if (!z.allowRetry || typeof g !== 'function') throw C;
                        await g();
                        A = c();
                        if (!A) throw C;
                        await A.write(z.chunk);
                    }
                    q(B);
                } catch (C) {
                    q(B, C);
                    throw C;
                } finally {
                    if (p === B) p = null;
                }
            }
        } catch (E) {
            m = true;
            u(E);
            log('[' + name + '] write error: ' + (E && E.message || E));
            try { h && h(E); } catch (F) {}
        } finally {
            l = false;
            if (!m && j < i.length) queueMicrotask(x);
            else t();
        }
    };
    const y = (z, A = true, B = false) => {
        if (m) return false;
        if (!c()) return false;
        const C = dataToUint8Array(z);
        if (!C.length) return true;
        const D = k + C.length;
        const E = i.length - j + 1;
        if (D > upstreamQueueMaxBytes || E > upstreamQueueMaxItems) {
            m = true;
            const H = Object.assign(new Error(name + ' queue overflow: ' + D + 'B/' + E + ')'), { isQueueOverflow: true });
            u(H);
            log('[' + name + '] queue overflow');
            try { h && h(H); } catch (I) {}
            throw H;
        }
        let F = null, G = null;
        if (B) {
            G = [];
            F = new Promise((J, K) => G.push({ resolve: J, reject: K }));
        }
        i.push({ chunk: C, allowRetry: A, completions: G });
        k = D;
        if (!l) queueMicrotask(x);
        return B ? F.then(() => true) : true;
    };
    return {
        write(z, A = true) { return y(z, A, false); },
        writeAndWait(z, A = true) { return y(z, A, true); },
        async waitEmpty() {
            if (!k && !l) return;
            await new Promise(z => o.push(z));
        },
        clear() { m = true; u(); }
    };
}

function createDownstreamGrainSender(c, f = null) {
    const g = downstreamGrainChunkBytes;
    const h = downstreamGrainTailThreshold;
    const i = Math.min(0x1000, h << 3);
    let j = f;
    let k = new Uint8Array(g);
    let l = 0;
    let m = null;
    let n = false;
    let o = 0;
    let p = 0;
    let q = 0;
    let r = null;
    const s = async w => {
        if (c.readyState !== WebSocket.OPEN) throw new Error('WebSocket not open');
        await WebSocketsendAndWait(c, w);
    };
    const t = w => {
        if (!j) return w;
        const x = new Uint8Array(j.length + w.length);
        x.set(j, 0);
        x.set(w, j.length);
        j = null;
        return x;
    };
    const u = async () => {
        while (r) await r;
        if (m) clearTimeout(m);
        m = null;
        n = false;
        if (!l) return;
        const w = k.slice(0, l);
        k = new Uint8Array(g);
        l = 0;
        q = 0;
        r = s(w);
        r.then(() => { r = null; });
        return r;
    };
    const v = () => {
        if (m || n) return;
        n = true;
        p = o;
        queueMicrotask(() => {
            n = false;
            if (!l || m) return;
            if (g - l < h) {
                u().then(() => closeSocketQuietly(c));
                return;
            }
            m = setTimeout(() => {
                m = null;
                if (!l) return;
                if (g - l < h) {
                    u().then(() => closeSocketQuietly(c));
                    return;
                }
                if (q < 2 && (o !== p || l < i)) {
                    q++;
                    p = o;
                    v();
                    return;
                }
                u().then(() => closeSocketQuietly(c));
            }, Math.max(downstreamGrainSilentMs, 1));
        });
    };
    return {
        async directSend(w) {
            let x = dataToUint8Array(w);
            if (!x.length) return;
            x = t(x);
            await s(x);
        },
        async send(w) {
            let x = dataToUint8Array(w);
            if (!x.length) return;
            x = t(x);
            let y = 0;
            const z = x.length;
            while (y < z) {
                if (!l && z - y >= g) {
                    const B = Math.min(g, z - y);
                    const C = y || B !== z ? x.slice(y, y + B) : x;
                    await s(C);
                    y += B;
                    continue;
                }
                const A = Math.min(g - l, z - y);
                k.set(x.slice(y, y + A), l);
                l += A;
                y += A;
                o++;
                if (l === g || g - l < h) await u();
                else v();
            }
        },
        flush: u
    };
}

async function connectStreams(c, f, g, h, i = null) {
    let j = g;
    let k = false;
    let l, m = false;
    const n = 0x40 * 0x400;
    const o = createDownstreamGrainSender(f, j);
    j = null;
    try {
        l = c.readable.getReader({ mode: 'byob' });
        m = true;
    } catch (p) {
        l = c.readable.getReader();
    }
    try {
        if (!m) {
            while (true) {
                const { done: q, value: r } = await l.read();
                if (q) break;
                if (!r || r.length === 0) continue;
                k = true;
                if (i) i.up += r.length;
                await o.send(r);
            }
        } else {
            let s = new ArrayBuffer(n);
            while (true) {
                const { done: t, value: u } = await l.read(new Uint8Array(s, 0, n));
                if (t) break;
                if (!u || u.length === 0) continue;
                k = true;
                if (i) i.up += u.length;
                if (u.length >= downstreamGrainChunkBytes) {
                    await o.flush();
                    await o.send(u);
                    s = new ArrayBuffer(n);
                } else {
                    await o.send(u);
                    s = u.buffer.byteLength >= n ? u.buffer : new ArrayBuffer(n);
                }
            }
        }
        await o.flush();
    } catch (v) {
        closeSocketQuietly(f);
    } finally {
        try { l.releaseLock(); } catch (w) {}
        try { l.cancel(); } catch (x) {}
    }
    if (!k && h) await h();
}

// ============================================================
// gRPC Handler
// ============================================================

async function handleGrpcRequest(c, f, g, h) {
    if (!c.body) return new Response('No body', { status: 400 });
    const i = c.body.getReader();
    const j = { socket: null, connectingPromise: null, retryConnect: null };
    const k = { up: 0, down: 0 };
    let l = false;
    const m = { cache: new Uint8Array(0) };
    let n = null, o = null, p = null, q = null;
    const r = new Headers({
        'Content-Type': 'application/grpc',
        'grpc-status': '0',
        'X-Accel-Buffering': 'no',
        'Cache-Control': 'no-cache'
    });
    const s = downstreamGrainChunkBytes;
    const t = Math.max(downstreamGrainSilentMs, 1);
    return new Response(new ReadableStream({
        async start(u) {
            let v = false, w = [], x = 0, y = null, z = false;
            const A = {
                readyState: WebSocket.CONNECTING,
                send(H) {
                    if (v) return;
                    const I = H instanceof Uint8Array ? H : new Uint8Array(H);
                    k.up += I.length;
                    const J = [];
                    let K = I.length >>> 0;
                    while (K > 0x7f) {
                        J.push(K & 0x7f | 0x80);
                        K >>>= 7;
                    }
                    J.push(K);
                    const L = new Uint8Array(J);
                    const M = 1 + L.length + I.length;
                    const N = new Uint8Array(5 + M);
                    N[0] = 0;
                    N[1] = M >>> 24 & 0xff;
                    N[2] = M >>> 16 & 0xff;
                    N[3] = M >>> 8 & 0xff;
                    N[4] = M & 0xff;
                    N[5] = 0x0a;
                    N.set(L, 6);
                    N.set(I, 6 + L.length);
                    w.push(N);
                    x += N.length;
                    C();
                },
                close() {
                    if (this.readyState === WebSocket.CLOSED) return;
                    B(true);
                    v = true;
                    this.readyState = WebSocket.CLOSED;
                    try { u.close(); } catch (H) {}
                }
            };
            const B = (H = false) => {
                z = false;
                if (y) { clearTimeout(y); y = null; }
                if (!H && v || x === 0) return;
                const I = new Uint8Array(x);
                let J = 0;
                for (const K of w) {
                    I.set(K, J);
                    J += K.length;
                }
                w = [];
                x = 0;
                try { u.enqueue(I); } catch (L) { v = true; A.readyState = WebSocket.CLOSED; }
            };
            const C = () => {
                if (x >= s) { B(); return; }
                if (z || y) return;
                z = true;
                queueMicrotask(() => {
                    z = false;
                    if (v || x === 0 || y) return;
                    y = setTimeout(B, t);
                });
            };
            const D = () => {
                if (v) return;
                q && q.close();
                B(true);
                v = true;
                A.readyState = WebSocket.CLOSED;
                if (y) clearTimeout(y);
                if (p) { try { p.close(); } catch (H) {} p = null; }
                o = null;
                try { i.cancel(); } catch (I) {}
                try { j.socket && j.socket.close(); } catch (J) {}
                try { u.close(); } catch (K) {}
            };
            const E = () => {
                if (p) { try { p.close(); } catch (H) {} p = null; }
                o = null;
            };
            const F = q = createUpstreamWriteQueue({
                getWriter: () => {
                    const H = j.socket;
                    if (!H) return null;
                    if (H !== o) { E(); o = H; p = H.writable.getWriter(); }
                    return p;
                },
                releaseWriter: E,
                retryConnection: async () => {
                    if (typeof j.retryConnect !== 'function') throw new Error('No retry connection function');
                    await j.retryConnect();
                },
                closeConnection: D,
                name: 'grpc-writer'
            });
            const G = async (H, I = true) => { return F.write(H, I); };
            try {
                let H = new Uint8Array(0);
                while (true) {
                    const { done: I, value: J } = await i.read();
                    if (I) break;
                    if (!J || J.length === 0) continue;
                    const K = J instanceof Uint8Array ? J : new Uint8Array(J);
                    const L = new Uint8Array(H.length + K.length);
                    L.set(H, 0);
                    L.set(K, H.length);
                    H = L;
                    while (H.length >= 5) {
                        const M = H[1] << 24 >>> 0 | H[2] << 16 | H[3] << 8 | H[4];
                        const N = 5 + M;
                        if (H.length < N) break;
                        const O = H.slice(5, N);
                        H = H.slice(N);
                        if (!O.length) continue;
                        let P = O;
                        if (P.length >= 2 && P[0] === 0x0a) {
                            let Q = 0, R = 1, S = false;
                            while (R < P.length) {
                                const T = P[R++];
                                if ((T & 0x80) === 0) { S = true; break; }
                                Q += 7;
                                if (Q > 0x23) break;
                            }
                            if (S) P = P.slice(R);
                        }
                        if (!P.length) continue;
                        if (l) {
                            if (n) await forwardTrojanUdpData(P, A, m, c);
                            else await forwardataudp(P, A, null, c);
                            continue;
                        }
                        if (j.socket) {
                            k.up += P.length;
                            if (!await G(P)) throw new Error('Write failed');
                        } else {
                            const U = dataToUint8Array(P);
                            if (n === null) n = isTrojanFirstPacket(U, f);
                            if (n) {
                                const V = parseTrojanRequest(U, f);
                                if (V && V.hasError) throw new Error(V.message || 'Trojan parse error');
                                const { port: W, hostname: X, rawClientData: Y, isUDP: Z } = V;
                                log('gRPC Trojan: ' + X + ':' + W + (Z ? ' (UDP)' : ''));
                                if (isBlockedSite(X)) throw new Error('Blocked site: ' + X);
                                if (Z) {
                                    l = true;
                                    if (validDataLength(Y) > 0) {
                                        k.up += validDataLength(Y);
                                        await forwardTrojanUdpData(Y, A, m, c);
                                    }
                                } else {
                                    k.up += validDataLength(Y);
                                    await forwardataTCP(X, W, Y, A, null, j, f, c, k);
                                }
                            } else {
                                n = false;
                                const a0 = parseVlessRequest(U, f);
                                if (a0 && a0.hasError) throw new Error(a0.message || 'VLESS parse error');
                                const { port: a1, hostname: a2, version: a3, isUDP: a4, rawClientData: a5 } = a0;
                                log('gRPC VLESS: ' + a2 + ':' + a1 + (a4 ? ' (UDP)' : ''));
                                if (isBlockedSite(a2)) throw new Error('Blocked site: ' + a2);
                                if (a4) {
                                    if (a1 !== 53) throw new Error('UDP only supported on port 53');
                                    l = true;
                                }
                                const a6 = new Uint8Array([a3, 0]);
                                A.send(a6);
                                const a7 = a5;
                                if (l) {
                                    if (n) await forwardTrojanUdpData(a7, A, m, c);
                                    else await forwardataudp(a7, A, null, c);
                                } else {
                                    k.up += validDataLength(a7);
                                    await forwardataTCP(a2, a1, a7, A, null, j, f, c, k);
                                }
                            }
                        }
                    }
                }
                B();
                await F.waitEmpty();
            } catch (a8) {
                log('gRPC error: ' + (a8 && a8.message || a8));
            } finally {
                F.clear();
                E();
                D();
                recordUsage(g, k.up, k.down, h);
            }
        },
        cancel() {
            q && q.close();
            try { j.socket && j.socket.close(); } catch (u) {}
            try { i.cancel(); } catch (v) {}
        }
    }), { status: 200, headers: r });
                           }
// ============================================================
// TAAKAA-XI PROXY WORKER - PART 4: ADVANCED PROTOCOLS
// ============================================================
// این بخش شامل: SOCKS5, TURN, SSTP, Warp, DoH, Fragment
// از فایل اصلی Nova-Proxy (worker (24).js) کپی شده
// ============================================================

// ============================================================
// SOCKS5 Proxy
// ============================================================

async function socks5Connect(c, f, g, h) {
    const { username: i, password: j, hostname: k, port: l } = parsedSocks5Address;
    const m = h({ hostname: k, port: l });
    const n = m.writable.getWriter();
    const o = m.readable.getReader();
    try {
        const p = i && j ? new Uint8Array([0x05, 0x02, 0x00, 0x02]) : new Uint8Array([0x05, 0x01, 0x00]);
        await n.write(p);
        let q = await o.read();
        if (q.done || q.value.length < 2) throw new Error('Invalid SOCKS5 response');
        const r = new Uint8Array(q.value.buffer)[1];
        if (r === 0x02) {
            if (!i || !j) throw new Error('SOCKS5 username/password required');
            const u = new TextEncoder().encode(i);
            const v = new TextEncoder().encode(j);
            const w = new Uint8Array([0x01, u.length, ...u, v.length, ...v]);
            await n.write(w);
            q = await o.read();
            if (q.done || new Uint8Array(q.value.buffer)[1] !== 0x00) throw new Error('SOCKS5 authentication failed');
        } else if (r !== 0x00) {
            throw new Error('SOCKS5 method not supported: ' + r);
        }
        const s = new TextEncoder().encode(c);
        const t = new Uint8Array([0x05, 0x01, 0x00, 0x03, s.length, ...s, f >> 8, f & 0xff]);
        await n.write(t);
        q = await o.read();
        if (q.done || new Uint8Array(q.value.buffer)[1] !== 0x00) throw new Error('SOCKS5 connect failed');
        if (validDataLength(g) > 0) await n.write(g);
        n.releaseLock();
        o.releaseLock();
        return m;
    } catch (x) {
        try { n.releaseLock(); } catch (y) {}
        try { o.releaseLock(); } catch (z) {}
        try { m.close(); } catch (A) {}
        throw x;
    }
}

// ============================================================
// HTTP CONNECT Proxy
// ============================================================

async function httpConnect(c, f, g, h = false, i) {
    const { username: j, password: k, hostname: l, port: m } = parsedSocks5Address;
    const n = h ? i({ hostname: l, port: m }, { secureTransport: 'on', allowHalfOpen: false }) : i({ hostname: l, port: m });
    const o = n.writable.getWriter();
    const p = n.readable.getReader();
    const q = new TextEncoder();
    const r = new TextDecoder();
    try {
        if (h) await n.connected;
        const s = j && k ? 'Proxy-Authorization: Basic ' + btoa(j + ':' + k) + '\r\n' : '';
        const t = 'CONNECT ' + c + ':' + f + ' HTTP/1.1\r\nHost: ' + c + ':' + f + '\r\n' + s + '\r\n';
        await o.write(q.encode(t));
        o.releaseLock();
        let u = new Uint8Array(0);
        let v = -1;
        let w = 0;
        while (v === -1 && w < 8192) {
            const { done: z, value: A } = await p.read();
            if (z || !A) throw new Error((h ? 'HTTPS' : 'HTTP') + ' CONNECT no response');
            u = new Uint8Array([...u, ...A]);
            w = u.length;
            const B = u.findIndex((C, D) => D < u.length - 3 && u[D] === 13 && u[D + 1] === 10 && u[D + 2] === 13 && u[D + 3] === 10);
            if (B !== -1) v = B + 4;
        }
        if (v === -1) throw new Error('HTTP CONNECT no end of headers');
        const x = r.decode(u.slice(0, v)).split('\r\n')[0].match(/HTTP\/\d\.\d\s+(\d+)/);
        const y = x ? parseInt(x[1], 10) : NaN;
        if (!Number.isInteger(y) || y < 200 || y >= 300) throw new Error('HTTP CONNECT failed: ' + y);
        p.releaseLock();
        if (validDataLength(g) > 0) {
            const C = n.writable.getWriter();
            await C.write(g);
            C.releaseLock();
        }
        if (w > v) {
            const { readable: D, writable: E } = new TransformStream();
            const F = E.getWriter();
            await F.write(u.slice(v, w));
            F.releaseLock();
            n.readable.pipeTo(E).catch(() => {});
            return { readable: D, writable: n.writable, closed: n.closed, close: () => n.close() };
        }
        return n;
    } catch (G) {
        try { o.releaseLock(); } catch (H) {}
        try { p.releaseLock(); } catch (I) {}
        try { n.close(); } catch (J) {}
        throw G;
    }
}

// ============================================================
// HTTPS CONNECT Proxy
// ============================================================

async function httpsConnect(c, f, g, h) {
    const { username: i, password: j, hostname: k, port: l } = parsedSocks5Address;
    const m = new TextEncoder();
    const n = new TextDecoder();
    let o = null;
    const p = isIPHostname(k) ? '' : stripIPv6Brackets(k);
    const q = async (r = false) => {
        const s = h({ hostname: k, port: l });
        try {
            await s.connected;
            const t = new TlsClient(s, { serverName: p, insecure: true, allowChacha: r });
            await t.connect();
            log('TLS: ' + (t.tls13 ? 'TLS 1.3' : 'TLS 1.2') + ' ' + (t.chacha ? 'ChaCha20' : 'AES-GCM') + ' | ' + t.cipherSuite.toString(16) + (t.serverName ? ' SNI: ' + t.serverName : ''));
            return t;
        } catch (u) {
            try { s.close(); } catch (v) {}
            throw u;
        }
    };
    try {
        try {
            o = await q(false);
        } catch (H) {
            if (!/cipher|handshake|TLS Alert|ServerHello|Finished|Unsupported|Missing TLS/i.test(H && H.message || '' + (H || ''))) throw H;
            log('TLS fallback: ' + (H && H.message || H));
            o = await q(true);
        }
        const r = i && j ? 'Proxy-Authorization: Basic ' + btoa(i + ':' + j) + '\r\n' : '';
        const s = 'CONNECT ' + c + ':' + f + ' HTTP/1.1\r\nHost: ' + c + ':' + f + '\r\n' + r + '\r\n';
        await o.write(m.encode(s));
        let t = new Uint8Array(0);
        let u = -1;
        let v = 0;
        while (u === -1 && v < 8192) {
            const I = await o.read();
            if (!I) throw new Error('HTTPS CONNECT no response');
            t = concatByteData(t, I);
            v = t.length;
            const J = t.findIndex((K, L) => L < t.length - 3 && t[L] === 13 && t[L + 1] === 10 && t[L + 2] === 13 && t[L + 3] === 10);
            if (J !== -1) u = J + 4;
        }
        if (u === -1) throw new Error('HTTPS CONNECT no end of headers');
        const w = n.decode(t.slice(0, u)).split('\r\n')[0].match(/HTTP\/\d\.\d\s+(\d+)/);
        const x = w ? parseInt(w[1], 10) : NaN;
        if (!Number.isInteger(x) || x < 200 || x >= 300) throw new Error('HTTPS CONNECT failed: ' + x);
        if (validDataLength(g) > 0) await o.write(dataToUint8Array(g));
        const y = v > u ? t.slice(u, v) : null;
        let z = false, A, B;
        const C = (K, L) => { if (!z) { z = true; K(L); } };
        const D = new Promise((K, L) => { A = K; B = L; });
        const E = () => {
            try { o.close(); } catch (K) {}
            C(A);
        };
        const F = new ReadableStream({
            async start(K) {
                try {
                    if (validDataLength(y) > 0) K.enqueue(y);
                    while (true) {
                        const L = await o.read();
                        if (!L) break;
                        if (L.length > 0) K.enqueue(L);
                    }
                    try { K.close(); } catch (M) {}
                    C(A);
                } catch (N) {
                    try { K.error(N); } catch (O) {}
                    C(B, N);
                }
            },
            cancel() { E(); }
        });
        const G = new WritableStream({
            async write(K) { await o.write(dataToUint8Array(K)); },
            close() { E(); },
            abort(K) { E(); if (K) C(B, K); }
        });
        return { readable: F, writable: G, closed: D, close: E };
    } catch (K) {
        try { o && o.close(); } catch (L) {}
        throw K;
    }
}

// ============================================================
// TURN Protocol
// ============================================================

const TURN_STUN_MAGIC_COOKIE = new Uint8Array([0x21, 0x12, 0xa4, 0x42]);
const TURN_STUN_TYPE = {
    'ALLOCATE_REQUEST': 0x03, 'ALLOCATE_SUCCESS': 0x0103, 'ALLOCATE_ERROR': 0x0113,
    'CREATE_PERMISSION_REQUEST': 0x08, 'CREATE_PERMISSION_SUCCESS': 0x0108,
    'CONNECT_REQUEST': 0x0a, 'CONNECT_SUCCESS': 0x010a,
    'CONNECTION_BIND_REQUEST': 0x0b, 'CONNECTION_BIND_SUCCESS': 0x010b
};
const TURN_STUN_ATTR = {
    'USERNAME': 0x06, 'MESSAGE_INTEGRITY': 0x08, 'ERROR_CODE': 0x09,
    'XOR_PEER_ADDRESS': 0x12, 'REALM': 0x14, 'NONCE': 0x15,
    'REQUESTED_TRANSPORT': 0x19, 'CONNECTION_ID': 0x2a
};

function turnStunPadding(c) { return -c & 3; }

function createTurnStunAttribute(c, f) {
    const g = dataToUint8Array(f);
    const h = new Uint8Array(4 + g.length + turnStunPadding(g.length));
    const i = new DataView(h.buffer);
    i.setUint16(0, c);
    i.setUint16(2, g.length);
    h.set(g, 4);
    return h;
}

function createTurnStunMessage(c, f, g) {
    const h = concatByteData(...g);
    const i = new Uint8Array(0x14);
    const j = new DataView(i.buffer);
    j.setUint16(0, c);
    j.setUint16(2, h.length);
    i.set(TURN_STUN_MAGIC_COOKIE, 4);
    i.set(f, 8);
    return concatByteData(i, h);
}

function parseTurnErrorCode(c) {
    return c && c.length >= 4 ? (c[2] & 0x07) * 100 + c[3] : 0;
}

function randomTurnTransactionId() { return crypto.getRandomValues(new Uint8Array(12)); }

async function addTurnMessageIntegrity(c, f) {
    const g = new Uint8Array(c);
    const h = new DataView(g.buffer);
    h.setUint16(2, h.getUint16(2) + 24);
    const i = await crypto.subtle.importKey('raw', f, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const j = new Uint8Array(await crypto.subtle.sign('HMAC', i, g));
    return concatByteData(g, createTurnStunAttribute(TURN_STUN_ATTR['MESSAGE_INTEGRITY'], j));
}

async function readTurnStunMessage(c, f = null, g = 'STUN read timeout') {
    let h = validDataLength(f) ? dataToUint8Array(f) : new Uint8Array(0);
    const i = async () => {
        const { done: n, value: o } = await withTimeout(c.read(), CONNECT_TIMEOUT_MS, g);
        if (n) throw new Error('STUN read EOF');
        if (o && o.length) h = concatByteData(h, o);
    };
    while (h.length < 0x14) await i();
    const j = 0x14 + (h[2] << 8 | h[3]);
    if (j > 0x10013) throw new Error('STUN message too large');
    while (h.length < j) await i();
    const k = h.slice(0, j);
    if (TURN_STUN_MAGIC_COOKIE.some((n, o) => k[4 + o] !== n)) throw new Error('Invalid STUN magic cookie');
    const l = new DataView(k.buffer, k.byteOffset, k.byteLength);
    const m = {};
    for (let n = 0x14; n + 4 <= j; ) {
        const o = l.getUint16(n);
        const p = l.getUint16(n + 2);
        if (n + 4 + p > k.length) break;
        m[o] = k.slice(n + 4, n + 4 + p);
        n += 4 + p + turnStunPadding(p);
    }
    return {
        message: { type: l.getUint16(0), attributes: m },
        extraData: h.length > j ? h.slice(j) : null
    };
}

async function writeTurnBytes(c, f, g) {
    await withTimeout(c.write(f), CONNECT_TIMEOUT_MS, g);
}

async function turnConnect(c, f, g, h) {
    c = { ...c, username: c.username ?? null, password: c.password ?? null };
    const i = stripIPv6Brackets(f);
    let j = isIPv4(i) ? i : null;
    if (!j) {
        const u = await DoHquery(i, 'A');
        const v = u.find(w => w.type === 1 && isIPv4(w.data))?.data;
        j = typeof v === 'string' ? v : null;
    }
    if (!j) throw new Error('TURN: cannot resolve ' + f + ' to IPv4');
    const k = stripIPv6Brackets(c.hostname);
    let l = null, m = null, n = null, o = null, p = null, q = null, r = false;
    const s = () => {
        try { l && l.close && l.close(); } catch (w) {}
        try { m && m.close && m.close(); } catch (x) {}
    };
    const t = () => {
        if (r) return;
        r = true;
        try { q && q.close && q.close(); } catch (w) {}
        s();
    };
    try {
        l = h({ hostname: k, port: c.port });
        await withTimeout(l.connected, CONNECT_TIMEOUT_MS, 'TURN connect timeout');
        n = l.writable.getWriter();
        o = l.readable.getReader();
        const w = new Uint8Array(8);
        w[1] = 0x01;
        new DataView(w.buffer).setUint16(2, g ^ 0x2112);
        j.split('.').forEach((H, I) => { w[4 + I] = Number(H) ^ TURN_STUN_MAGIC_COOKIE[I]; });
        const x = createTurnStunAttribute(TURN_STUN_ATTR['XOR_PEER_ADDRESS'], w);
        const y = new Uint8Array([0x06, 0x00, 0x00, 0x00]);
        await writeTurnBytes(n, createTurnStunMessage(TURN_STUN_TYPE['ALLOCATE_REQUEST'], randomTurnTransactionId(), [createTurnStunAttribute(TURN_STUN_ATTR['REQUESTED_TRANSPORT'], y)]), 'TURN allocate write');
        let z = await readTurnStunMessage(o, null, 'TURN allocate read');
        let A = z.message, B = z.extraData;
        let C = null, D = [];
        const E = H => C ? addTurnMessageIntegrity(H, C) : Promise.resolve(H);
        if (A.type === TURN_STUN_TYPE['ALLOCATE_ERROR'] && c.username !== null && c.password !== null && parseTurnErrorCode(A.attributes[TURN_STUN_ATTR['ERROR_CODE']]) === 401) {
            const H = A.attributes[TURN_STUN_ATTR['REALM']];
            const I = A.attributes[TURN_STUN_ATTR['NONCE']];
            if (!H || !I || !I.length) throw new Error('TURN: missing realm or nonce');
            const J = new TextDecoder().decode(H);
            C = new Uint8Array(await crypto.subtle.digest('MD5', new TextEncoder().encode(c.username + ':' + J + ':' + c.password)));
            D = [
                createTurnStunAttribute(TURN_STUN_ATTR['USERNAME'], new TextEncoder().encode(c.username)),
                createTurnStunAttribute(TURN_STUN_ATTR['REALM'], new TextEncoder().encode(J)),
                createTurnStunAttribute(TURN_STUN_ATTR['NONCE'], I)
            ];
            const K = await addTurnMessageIntegrity(createTurnStunMessage(TURN_STUN_TYPE['ALLOCATE_REQUEST'], randomTurnTransactionId(), [createTurnStunAttribute(TURN_STUN_ATTR['REQUESTED_TRANSPORT'], y), ...D]), C);
            const L = await Promise.all([
                E(createTurnStunMessage(TURN_STUN_TYPE['ALLOCATE_REQUEST'], randomTurnTransactionId(), [x, ...D])),
                E(createTurnStunMessage(TURN_STUN_TYPE['ALLOCATE_REQUEST'], randomTurnTransactionId(), [x, ...D]))
            ]);
            await writeTurnBytes(n, concatByteData(K, ...L), 'TURN re-allocate write');
            z = await readTurnStunMessage(o, B, 'TURN re-allocate read');
            A = z.message;
            B = z.extraData;
        } else if (A.type === TURN_STUN_TYPE['ALLOCATE_SUCCESS']) {
            const M = await Promise.all([
                E(createTurnStunMessage(TURN_STUN_TYPE['ALLOCATE_REQUEST'], randomTurnTransactionId(), [x, ...D])),
                E(createTurnStunMessage(TURN_STUN_TYPE['ALLOCATE_REQUEST'], randomTurnTransactionId(), [x, ...D]))
            ]);
            if (M.length) await writeTurnBytes(n, concatByteData(...M), 'TURN allocate write');
        }
        if (A.type !== TURN_STUN_TYPE['ALLOCATE_SUCCESS']) {
            const N = parseTurnErrorCode(A.attributes[TURN_STUN_ATTR['ERROR_CODE']]);
            throw new Error(N ? 'TURN allocate error: ' + N : 'TURN allocate failed');
        }
        m = h({ hostname: k, port: c.port });
        z = await readTurnStunMessage(o, B, 'TURN create permission read');
        A = z.message;
        B = z.extraData;
        if (A.type !== TURN_STUN_TYPE['CREATE_PERMISSION_SUCCESS']) throw new Error('TURN create permission failed');
        z = await readTurnStunMessage(o, B, 'TURN connect read');
        A = z.message;
        B = z.extraData;
        if (A.type !== TURN_STUN_TYPE['CONNECT_SUCCESS'] || !A.attributes[TURN_STUN_ATTR['CONNECTION_ID']]) throw new Error('TURN connect failed');
        await withTimeout(m.connected, CONNECT_TIMEOUT_MS, 'TURN second connect timeout');
        p = m.writable.getWriter();
        q = m.readable.getReader();
        await writeTurnBytes(p, await E(createTurnStunMessage(TURN_STUN_TYPE['CONNECTION_BIND_REQUEST'], randomTurnTransactionId(), [
            createTurnStunAttribute(TURN_STUN_ATTR['CONNECTION_ID'], A.attributes[TURN_STUN_ATTR['CONNECTION_ID']]),
            ...D
        ])), 'TURN connection bind write');
        z = await readTurnStunMessage(q, null, 'TURN connection bind read');
        A = z.message;
        const F = z.extraData;
        if (A.type !== TURN_STUN_TYPE['CONNECTION_BIND_SUCCESS']) throw new Error('TURN connection bind failed');
        n.releaseLock(); n = null;
        o.releaseLock(); o = null;
        p.releaseLock(); p = null;
        const G = new ReadableStream({
            start(O) { if (F && F.length) O.enqueue(F); },
            pull(O) {
                return q.read().then(({ done: P, value: Q }) => {
                    if (P) { t(); O.close(); } else {
                        if (Q && Q.length) O.enqueue(new Uint8Array(Q));
                    }
                });
            },
            cancel() {
                try { q && q.close && q.close(); } catch (O) {}
                t();
                s();
            }
        });
        return { readable: G, writable: m.writable, closed: m.closed, close: s };
    } catch (O) {
        try { n && n.releaseLock && n.releaseLock(); } catch (P) {}
        try { o && o.releaseLock && o.releaseLock(); } catch (Q) {}
        try { p && p.releaseLock && p.releaseLock(); } catch (R) {}
        t();
        s();
        throw O;
    }
}

// ============================================================
// SSTP Protocol
// ============================================================

const SSTP_TCP_MSS = 0x578;
const SSTP_EMPTY_BYTES = new Uint8Array(0);

function readSstpUint16(c, f = 0) { return c[f] << 8 | c[f + 1]; }
function readSstpUint32(c, f = 0) { return (c[f] << 24 | c[f + 1] << 16 | c[f + 2] << 8 | c[f + 3]) >>> 0; }
function randomSstpUint16() { return readSstpUint16(crypto.getRandomValues(new Uint8Array(2))); }

function internetChecksum(c, f, g) {
    let h = 0;
    for (let i = f; i < f + g - 1; i += 2) h += readSstpUint16(c, i);
    if (g & 1) h += c[f + g - 1] << 8;
    while (h >> 16) h = (h & 0xffff) + (h >> 16);
    return ~h & 0xffff;
}

async function sstpConnect(c, f, g, h) {
    c = { ...c, username: c.username ?? null, password: c.password ?? null };
    let i = SSTP_EMPTY_BYTES, j = 1, k = null, l = null, m = null, n = false, o, p;
    const q = new Promise((B, C) => { o = B; p = C; });
    const r = (B, C) => { if (n) return; n = true; B(C); };
    const s = () => {
        try { l && l.close && l.close(); } catch (B) {}
        try { m && m.close && m.close(); } catch (C) {}
        try { k && k.close && k.close(); } catch (D) {}
        r(o);
    };
    const t = async () => {
        const { value: B, done: C } = await l.read();
        if (C || !B) throw new Error('SSTP: unexpected EOF');
        return dataToUint8Array(B);
    };
    const u = async B => {
        while (i.length < B) { const D = await t(); i = i.length ? concatByteData(i, D) : D; }
        const C = i.slice(0, B);
        i = i.slice(B);
        return C;
    };
    const v = async () => {
        for (;;) {
            const B = i.findIndex(x => x === 0x0a);
            if (B >= 0) {
                const D = new TextDecoder().decode(i.slice(0, B));
                i = i.slice(B + 1);
                return D.replace(/\r$/, '');
            }
            const C = await t();
            i = i.length ? concatByteData(i, C) : C;
        }
    };
    const w = async (B = CONNECT_TIMEOUT_MS) => {
        const C = await withTimeout(u(4), B, 'SSTP header timeout');
        const D = readSstpUint16(C, 2) & 0xfff;
        if (D < 4) throw new Error('SSTP: invalid length');
        return {
            isControl: (C[1] & 1) !== 0,
            body: D > 4 ? await withTimeout(u(D - 4), B, 'SSTP body timeout') : SSTP_EMPTY_BYTES
        };
    };
    const x = B => {
        const C = 6 + B.length;
        const D = new Uint8Array(C);
        D.set([0x10, 0x00, C >> 8 & 0x0f | 0x80, C & 0xff, 0xff, 0x03]);
        D.set(B, 6);
        return D;
    };
    const y = (B, C, D, E = []) => {
        const F = E.reduce((I, J) => I + 2 + J.data.length, 0);
        const G = new Uint8Array(6 + F);
        const H = new DataView(G.buffer);
        H.setUint16(0, B);
        G[2] = C;
        G[3] = D;
        H.setUint32(4, 4 + F);
        E.reduce((I, J) => {
            G[I] = J.type;
            G[I + 1] = 2 + J.data.length;
            G.set(J.data, I + 2);
            return I + 2 + J.data.length;
        }, 6);
        return G;
    };
    const z = B => {
        const C = B.length >= 2 && B[0] === 0xff && B[1] === 0x03 ? 2 : 0;
        if (B.length - C < 4) return null;
        const D = readSstpUint16(B, C);
        if (D === 0x21) return { protocol: D, ipPacket: B.slice(C + 2) };
        if (B.length - C < 6) return null;
        return { protocol: D, code: B[C + 2], id: B[C + 3], payload: B.slice(C + 6), rawPacket: B.slice(C) };
    };
    const A = B => {
        const C = [];
        for (let D = 0; D + 2 <= B.length; ) {
            const E = B[D];
            const F = B[D + 1];
            if (F < 2 || D + F > B.length) break;
            C.push({ type: E, data: B.slice(D + 2, D + F) });
            D += F;
        }
        return C;
    };
    try {
        const B = stripIPv6Brackets(c.hostname);
        const C = c.port;
        k = h({ hostname: B, port: C }, { secureTransport: 'on', allowHalfOpen: false });
        await withTimeout(k.connected, CONNECT_TIMEOUT_MS, 'SSTP connect timeout');
        l = k.writable.getWriter();
        m = k.readable.getReader();
        const D = B.includes(':') ? '[' + B + ']' : B;
        const E = new TextEncoder().encode('CONNECT ' + (Number(C) === 0x1bb ? D : D + ':' + C) + ' HTTP/1.1\r\n' + 'Host: ' + D + '\r\n' + 'Proxy-Connection: Keep-Alive\r\n\r\n');
        const F = new Uint8Array(2);
        new DataView(F.buffer).setUint16(0, 1);
        const G = new Uint8Array(2);
        new DataView(G.buffer).setUint16(0, 0x5dc);
        const H = new Uint8Array(12 + F.length);
        const I = new DataView(H.buffer);
        H[0] = 0x10;
        H[1] = 0x01;
        I.setUint16(2, H.length | 0x8000);
        I.setUint16(4, 1);
        I.setUint16(6, 1);
        H[9] = 0x01;
        I.setUint32(10, 4 + F.length);
        H.set(F, 12);
        await withTimeout(m.write(concatByteData(E, H, x(y(0xc021, 1, j++, [{ type: 1, data: G }])))), CONNECT_TIMEOUT_MS, 'SSTP handshake write');
        const J = await withTimeout(v(), CONNECT_TIMEOUT_MS, 'SSTP response read');
        for (;;) { const a9 = await withTimeout(v(), CONNECT_TIMEOUT_MS, 'SSTP extra read'); if (a9 === '') break; }
        if (!/HTTP\/\d(?:\.\d)?\s+2\d\d/i.test(J)) throw new Error('SSTP: bad response: ' + (J || 'empty'));
        let K = false, L = false, M = false, N = false, O = false, P = false, Q = false, R = null;
        const S = async () => {
            if (!K || !L || !M || N) return;
            if (c.username === null || c.password === null) throw new Error('SSTP: missing credentials');
            const aa = new TextEncoder().encode(c.username);
            const ab = new TextEncoder().encode(c.password);
            if (aa.length > 255 || ab.length > 255) throw new Error('SSTP: credentials too long');
            const ac = 6 + aa.length + ab.length;
            const ad = new Uint8Array(2 + ac);
            const ae = new DataView(ad.buffer);
            ae.setUint16(0, 0xc023);
            ad[2] = 1;
            ad[3] = j++;
            ae.setUint32(4, ac);
            ad[6] = aa.length;
            ad.set(aa, 7);
            ad[7 + aa.length] = ab.length;
            ad.set(ab, 8 + aa.length);
            await withTimeout(m.write(x(ad)), CONNECT_TIMEOUT_MS, 'SSTP auth write');
            N = true;
        };
        const T = async () => {
            if (!K || !L || P || M && !O) return;
            await withTimeout(m.write(x(y(0x8021, 1, j++, [{ type: 3, data: new Uint8Array(4) }]))), CONNECT_TIMEOUT_MS, 'SSTP CCP write');
            P = true;
        };
        for (let aa = 0; aa < 50 && !Q; aa++) {
            const ab = await w(CONNECT_TIMEOUT_MS);
            if (ab.isControl) continue;
            const ac = z(ab.body);
            if (!ac) continue;
            if (ac.protocol === 0xc021) {
                if (ac.code === 1) {
                    const ad = A(ac.payload).find(ae => ae.type === 3);
                    if (ad && ad.data && ad.data.length >= 2) {
                        const af = readSstpUint16(ad.data);
                        if (af !== 0xc023) throw new Error('SSTP: bad LCP option: ' + af.toString(16));
                        M = true;
                    }
                    const ae = new Uint8Array(ac.rawPacket);
                    ae[2] = 2;
                    await withTimeout(m.write(x(ae)), CONNECT_TIMEOUT_MS, 'SSTP LCP ack write');
                    L = true;
                    await S(); await T();
                } else if (ac.code === 2) {
                    K = true;
                    await S(); await T();
                }
                continue;
            }
            if (ac.protocol === 0xc023) {
                if (ac.code === 2) { O = true; await T(); }
                else if (ac.code === 3) throw new Error('SSTP: authentication failed');
                continue;
            }
            if (ac.protocol === 0x8021) {
                if (ac.code === 1) {
                    const ag = new Uint8Array(ac.rawPacket);
                    ag[2] = 2;
                    await withTimeout(m.write(x(ag)), CONNECT_TIMEOUT_MS, 'SSTP CCP ack write');
                    await T();
                } else if (ac.code === 3) {
                    const ah = A(ac.payload).find(ai => ai.type === 3);
                    if (ah && ah.data && ah.data.length === 4) {
                        R = [...ah.data].map(String).join('.');
                        await withTimeout(m.write(x(y(0x8021, 1, j++, [{ type: 3, data: ah.data }]))), CONNECT_TIMEOUT_MS, 'SSTP IPCP ack write');
                        P = true;
                    }
                } else if (ac.code === 2) {
                    const ai = A(ac.payload).find(aj => aj.type === 3);
                    if (ai && ai.data && ai.data.length === 4) R = [...ai.data].map(String).join('.');
                    Q = true;
                }
                continue;
            }
        }
        if (!R) throw new Error('SSTP: no IP assigned');
        const U = stripIPv6Brackets(f);
        let V = isIPv4(U) ? U : null;
        if (!V) {
            const aj = await DoHquery(U, 'A');
            const ak = aj.find(al => al.type === 1 && isIPv4(al.data))?.data;
            V = typeof ak === 'string' ? ak : null;
        }
        if (!V) throw new Error('SSTP: cannot resolve ' + f + ' to IPv4');
        const W = 10000 + randomSstpUint16() % 50000;
        const X = new Uint8Array(String(R || '').split('.').map(Number));
        const Y = new Uint8Array(String(V || '').split('.').map(Number));
        let Z = readSstpUint32(crypto.getRandomValues(new Uint8Array(4)));
        let a0 = 0;
        const a1 = new Uint8Array(0x14);
        a1.set([0x45, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x40, 0x06]);
        a1.set(X, 0x0c);
        a1.set(Y, 0x10);
        const a2 = new Uint8Array(0x598);
        a2.set(X);
        a2.set(Y, 4);
        a2[9] = 6;
        const a3 = (al, am = SSTP_EMPTY_BYTES) => {
            const an = dataToUint8Array(am);
            const ao = an.length;
            const ap = 0x14 + ao;
            const aq = 0x14 + ap;
            const ar = 0x08 + aq;
            const as = new Uint8Array(ar);
            const at = new DataView(as.buffer);
            as.set([0x10, 0x00, ar >> 8 & 0x0f | 0x80, ar & 0xff, 0xff, 0x03, 0x00, 0x21]);
            as.set(a1, 8);
            at.setUint16(10, aq);
            at.setUint16(12, randomSstpUint16());
            at.setUint16(18, internetChecksum(as, 8, 0x14));
            at.setUint16(28, W);
            at.setUint16(30, g);
            at.setUint32(32, Z);
            at.setUint32(36, a0);
            as[40] = 0x50;
            as[41] = al;
            at.setUint16(42, 0xffff);
            if (ao) as.set(an, 48);
            a2[10] = ap >> 8;
            a2[11] = ap & 0xff;
            a2.set(as.slice(28, 28 + ap), 12);
            at.setUint16(44, internetChecksum(a2, 0, 12 + ap));
            return as;
        };
        const a4 = al => {
            if (al.length < 40 || al[9] !== 6) return null;
            const am = (al[0] & 0x0f) * 4;
            if (al.length < am + 20) return null;
            if (readSstpUint16(al, am) !== g) return null;
            if (readSstpUint16(al, am + 2) !== W) return null;
            return { flags: al[am + 13], sequence: readSstpUint32(al, am + 4), payloadOffset: am + ((al[am + 12] >> 4) & 0x0f) * 4 };
        };
        await withTimeout(m.write(a3(0x02)), CONNECT_TIMEOUT_MS, 'SSTP SYN write');
        Z = Z + 1 >>> 0;
        let a5 = false;
        for (let al = 0; al < 30; al++) {
            const am = await w(CONNECT_TIMEOUT_MS);
            if (am.isControl) continue;
            const an = z(am.body);
            if (!an || an.protocol !== 0x21) continue;
            const ao = a4(an.rawPacket);
            if (!ao || (ao.flags & 0x12) !== 0x12) continue;
            a0 = ao.sequence + 1 >>> 0;
            await withTimeout(m.write(a3(0x10)), CONNECT_TIMEOUT_MS, 'SSTP ACK write');
            a5 = true;
            break;
        }
        if (!a5) throw new Error('SSTP: no SYN-ACK received');
        let a6 = null;
        const a7 = new ReadableStream({ start(ap) { a6 = ap; }, cancel() { s(); } });
        (async () => {
            try {
                let ap = [], aq = 0;
                const ar = () => {
                    if (!aq) return;
                    if (!a6) throw new Error('SSTP: stream closed');
                    a6.enqueue(ap.length === 1 ? ap[0] : concatByteData(...ap));
                    ap = [];
                    aq = 0;
                    m.write(a3(0x10)).catch(() => {});
                };
                for (;;) {
                    const as = await w(60000);
                    if (as.isControl) continue;
                    const at = z(as.body);
                    if (!at || at.protocol !== 0x21) continue;
                    const au = a4(at.rawPacket);
                    if (!au) continue;
                    if (au.flags < at.rawPacket.length) {
                        const av = at.rawPacket.slice(au.payloadOffset);
                        if (av.length) {
                            a0 = au.sequence + av.length >>> 0;
                            ap.push(new Uint8Array(av));
                            aq += av.length;
                        }
                    }
                    if (au.flags & 1) {
                        ar();
                        a0 = a0 + 1 >>> 0;
                        m.write(a3(0x11)).catch(() => {});
                        if (a6) try { a6.close(); } catch (av) {}
                        s();
                        return;
                    }
                    if (i.length < 4 || aq >= 32768) ar();
                }
            } catch (aw) {
                if (a6) try { a6.error(aw); } catch (ax) {}
                r(p, aw);
                try { k && k.close && k.close(); } catch (ay) {}
            }
        })();
        const a8 = new WritableStream({
            async write(ap) {
                const aq = dataToUint8Array(ap);
                if (!aq.length) return;
                if (aq.length <= SSTP_TCP_MSS) {
                    await m.write(a3(0x18, aq));
                    Z = Z + aq.length >>> 0;
                    return;
                }
                const ar = [];
                for (let as = 0; as < aq.length; as += SSTP_TCP_MSS) {
                    const at = aq.slice(as, Math.min(as + SSTP_TCP_MSS, aq.length));
                    ar.push(a3(0x18, at));
                    Z = Z + at.length >>> 0;
                }
                await m.write(concatByteData(...ar));
            },
            close() { return m.write(a3(0x11)).catch(() => {}); },
            abort(ap) { s(); if (ap) r(p, ap); }
        });
        return { readable: a7, writable: a8, closed: q, close: s };
    } catch (ap) { s(); throw ap; }
}

// ============================================================
// Warp (Cloudflare)
// ============================================================

const WARP_API = 'https://api.cloudflareclient.com/v0a';
const WARP_REG_HEADERS = {
    'Content-Type': 'application/json',
    'User-Agent': 'cf-client',
    'CF-Client-Version': 'a-6.33-2143'
};

const warpKeyPool = [
    { pk: 'M5Ii...', ipv6: 'dbGg...', reserved: '' }
];
const warpPublicKey = 'Taakaa-Xi-Warp-Public-Key';
const warpCidrs = ['0.0.0.0/0', '::/0', '10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '100.64.0.0/10', '127.0.0.0/8'];
const warpPorts = [854, 859, 864, 878, 880, 890, 891, 894, 903, 908, 928, 934, 939, 942, 943, 945, 946, 955, 968, 987, 988, 1002, 1010, 1014, 1018, 1070, 1074, 1180, 1387, 1843, 2371, 2506, 3154, 3428, 3565, 3886, 4177, 4198, 4233, 5279, 5956, 7103, 7152, 7156, 7281, 7551, 8319, 8742, 8886, 8934, 2408, 500, 4500, 1701];

function warpRandomIPv4InCidr(c) {
    const [f, g] = c.split('/');
    const h = parseInt(g, 10);
    const i = f.split('.').reduce((l, m) => (l << 8) + parseInt(m, 10), 0) >>> 0;
    const j = Math.floor(Math.random() * Math.pow(2, 32 - h));
    const k = i + j >>> 0;
    return [k >>> 24 & 0xff, k >>> 16 & 0xff, k >>> 8 & 0xff, k & 0xff].join('.');
}

function warpRandomEndpoints(c) {
    const f = new Set();
    let g = 0;
    while (f.size < c && g++ < c * 6) {
        const h = warpCidrs[Math.floor(Math.random() * warpCidrs.length)];
        const i = warpPorts[Math.floor(Math.random() * warpPorts.length)];
        f.add(warpRandomIPv4InCidr(h) + ':' + i);
    }
    return [...f];
}

async function warpGenKeys() {
    const c = await crypto.subtle.generateKey({ name: 'X25519' }, true, ['deriveKey', 'deriveBits']);
    const f = await crypto.subtle.exportKey('raw', c.privateKey);
    const g = new Uint8Array(await crypto.subtle.exportKey('raw', c.publicKey));
    const h = j => btoa(String.fromCharCode.apply(null, j));
    const i = j => { j = j.replace(/-/g, '+').replace(/_/g, '/'); while (j.length % 4) j += '='; return j; };
    return { privateKey: i(f), publicKey: h(g) };
}

function warpDecodeReserved(c) {
    try { const f = atob(c); return [f.charCodeAt(0), f.charCodeAt(1), f.charCodeAt(2)]; } catch (g) { return []; }
}

async function warpRegisterAccount() {
    const c = await warpGenKeys();
    const f = JSON.stringify({
        key: c.publicKey,
        install_id: '',
        fcm_token: '',
        tos: new Date().toISOString(),
        model: 'PC',
        type: 'Android',
        locale: 'en_US'
    });
    let g, h = 0;
    for (let n = 0; n < 4; n++) {
        if (n) await new Promise(o => setTimeout(o, 500 * n * n));
        g = await fetch(WARP_API + '/reg', { method: 'POST', headers: WARP_REG_HEADERS, body: f });
        if (g.ok) break;
        h = g.status;
        if (g.status !== 429 && g.status < 500) break;
    }
    if (!g.ok) { if (h === 429) throw new Error('WARP: rate limited'); throw new Error('WARP: registration failed (' + h + ')'); }
    const i = await g.json();
    const k = i.config && i.config.interface && i.config.interface.addresses && i.config.interface.addresses[0] || {};
    const l = k.v4 && (k.v4.address || k.v4['v4']) || '0.0.0.0';
    const m = i.account && i.account.license && i.account.license.activated_at && i.account.license.activated_at[0] || {};
    return {
        privateKey: c.privateKey,
        publicKey: c.publicKey,
        id: i.id,
        token: i.token,
        peerPublicKey: i.config && i.config.interface && i.config.interface.peer_public_key || '',
        endpoint: l,
        addressV4: m.v4 || '0.0.0.0',
        addressV6: m.v6 || '',
        clientId: i.account && i.account.license && i.account.license.activated_at && i.account.license.activated_at[0] || '',
        reserved: warpDecodeReserved(i.account && i.account.license && i.account.license.activated_at && i.account.license.activated_at[0] || ''),
        warpPlus: !!(i.account && i.account.license && i.account.license.activated_at && i.account.license.activated_at[0]),
        license: i.account && i.account.license && i.account.license.activated_at && i.account.license.activated_at[0] || null
    };
}

async function warpApplyLicense(c, f) {
    const h = await fetch(WARP_API + '/reg/' + c.id + '/license', {
        method: 'PUT',
        headers: { ...WARP_REG_HEADERS, 'Authorization': 'Bearer ' + c.token },
        body: JSON.stringify({ license: f })
    });
    const i = await h.json();
    let k = {};
    try { k = JSON.parse(i); } catch (m) {}
    if (!h.ok) throw new Error('WARP: license apply failed (' + h.status + ')' + (k && k.error ? ': ' + JSON.stringify(k.error) : '') + ')');
    let l = !!(k && (k.success || k.account && k.account.license && k.account.license.activated_at && k.account.license.activated_at[0]));
    if (!l) try {
        const n = await fetch(WARP_API + '/reg/' + c.id + '/account', {
            headers: { ...WARP_REG_HEADERS, 'Authorization': 'Bearer ' + c.token }
        });
        const o = await n.json().catch(() => ({}));
        l = !!(o && (o.success || o.account && o.account.license && o.account.license.activated_at && o.account.license.activated_at[0]));
    } catch (p) {}
    if (!l) throw new Error('WARP: license verification failed');
    c.warpPlus = true;
    c.license = f;
    return c;
}

function warpValidEndpoint(c) {
    return typeof c === 'string' && /^[A-Za-z0-9.\-\[\]:]+:\d{1,5}$/.test(c.trim());
}

const WARP_SUGGESTED_ENDPOINTS = [
    '162.159.193.10:2408', '162.159.193.11:2408', '162.159.193.12:2408',
    '162.159.193.13:2408', '162.159.193.14:2408', '162.159.193.15:2408',
    '162.159.193.16:2408', '162.159.193.17:2408', '162.159.193.18:2408',
    '162.159.193.19:2408', '162.159.193.20:2408', '162.159.193.21:2408'
];

function warpPublicView(c, f) {
    if (!c || !c.registered) return { registered: false };
    const g = {
        registered: true,
        endpoint: c.endpoint,
        warpPlus: !!c.warpPlus,
        wow: c.wow ? { registered: true } : undefined,
        suggestedEndpoints: WARP_SUGGESTED_ENDPOINTS
    };
    if (c.privateKey && c.publicKey) {
        const h = String(f && warpValidEndpoint(f) ? f.trim() : c.endpoint || '0.0.0.0:2408');
        const i = h.includes(':') ? h : h + ':2408';
        g.wireguard = 'wg://' + encodeURIComponent(c.publicKey) + '@' + i + '/?public_key=' + encodeURIComponent(warpPublicKey) +
            '&address=' + encodeURIComponent('172.16.0.2/32,' + c.addressV6) +
            '&mtu=' + encodeURIComponent('1280') +
            '&reserved=' + encodeURIComponent((c.reserved && c.reserved.length ? c.reserved.map(String).join(',') : ''));
        g.nekoray = 'nekoray://' + btoa(JSON.stringify({
            _v: 0, addr: c.endpoint, cmd: [''], core: 'wireguard',
            cs: { type: 'wireguard', tag: 'warp', server: i.split(':')[0], server_port: parseInt(i.split(':')[1]),
            system_interface: false, interface_name: 'warp', local_address: ['172.16.0.2/32', c.addressV6],
            private_key: c.privateKey, peer_public_key: warpPublicKey, pre_shared_key: '',
            reserved: c.reserved && c.reserved.length ? c.reserved.map(Number) : [], mtu: 1280 },
            mapping_port: 0, name: 'warp-' + c.endpoint, port: 1080, socks_port: 0
        }));
    }
    return g;
}

async function handleWarpRequest(c) {
    const f = new URL(c.url);
    const g = (f.searchParams.get('format') || 'wireguard').toLowerCase();
    const h = Math.max(Math.min(parseInt(f.searchParams.get('count') || '50', 10) || 50, 1), 500);
    const i = Math.max(Math.min(parseInt(f.searchParams.get('mtu') || '1280', 10) || 1280, 576), 1500);
    const j = warpRandomEndpoints(h);
    const k = ['wireguard', 'nekoray', 'json'][['wireguard', 'nekoray', 'json'].indexOf(g)];
    const l = j.map(n => {
        const o = warpKeyPool[Math.floor(Math.random() * warpKeyPool.length)];
        return k ? buildWarpNekoRayLink(n, o, i) : buildWarpWireGuardLink(n, o, i);
    });
    const m = btoa(l.join('\n'));
    return new Response(m, { status: 200, headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-cache' } });
}

function buildWarpWireGuardLink(c, f, g) {
    const h = encodeURIComponent(f.publicKey);
    const i = encodeURIComponent(warpPublicKey);
    const j = encodeURIComponent('172.16.0.2/32,' + f.ipv6);
    const k = encodeURIComponent('warp+' + c);
    const l = f.reserved && f.reserved.length ? '&reserved=' + encodeURIComponent(f.reserved.map(String).join(',')) : '';
    return 'wg://' + h + '@' + c + '/?public_key=' + i + '&address=' + j + '&mtu=' + g + l + '#' + k;
}

function buildWarpNekoRayLink(c, f, g) {
    const h = c.indexOf(':');
    const i = c.slice(0, h);
    const j = c.slice(h + 1);
    const k = JSON.stringify({
        type: 'wireguard', tag: 'warp', server: i, server_port: Number(j),
        system_interface: false, interface_name: 'warp',
        local_address: ['172.16.0.2/32', f.ipv6],
        private_key: f.privateKey, peer_public_key: warpPublicKey,
        pre_shared_key: '',
        reserved: f.reserved && f.reserved.length ? f.reserved.map(Number) : [],
        mtu: Number(g)
    });
    const l = { _v: 0, addr: c, cmd: [''], core: 'wireguard', cs: JSON.parse(k), mapping_port: 0, name: 'warp-' + c, port: 1080, socks_port: 0 };
    return 'nekoray://' + btoa(JSON.stringify(l));
}

// ============================================================
// DoH (DNS over HTTPS)
// ============================================================

async function DoHquery(c, f, g = 'https://cloudflare-dns.com/dns-query') {
    const h = performance.now();
    log('DoH: ' + c + ' ' + f + ' via ' + g);
    try {
        const k = { 'A': 1, 'NS': 2, 'CNAME': 5, 'MX': 15, 'TXT': 16, 'AAAA': 28, 'SRV': 33, 'HTTPS': 65 };
        const l = k[f.toLowerCase()] || 1;
        const m = z => {
            const A = z.includes('.') ? z.slice(0, -1).split('.') : z.split('.');
            const B = [];
            for (const F of A) {
                const G = new TextEncoder().encode(F);
                B.push(new Uint8Array([G.length]), G);
            }
            B.push(new Uint8Array([0]));
            const C = B.reduce((H, I) => H + I.length, 0);
            const D = new Uint8Array(C);
            let E = 0;
            for (const H of B) { D.set(H, E); E += H.length; }
            return D;
        };
        const n = m(c);
        const o = new Uint8Array(12 + n.length + 4);
        const p = new DataView(o.buffer);
        p.setUint16(0, crypto.getRandomValues(new Uint16Array(1))[0]);
        p.setUint16(2, 0x0100);
        p.setUint16(4, 1);
        o.set(n, 12);
        p.setUint16(12 + n.length, l);
        p.setUint16(12 + n.length + 2, 1);
        log('DoH: query ' + c + ' ' + f + ' via ' + g + ' type=' + l + ', len=' + o.length + 'B');
        const q = await fetch(g, {
            method: 'POST',
            headers: { 'Content-Type': 'application/dns-message', 'Accept': 'application/dns-message' },
            body: o
        });
        if (!q.ok) {
            console.log('DoH: ' + c + ' ' + f + ' via ' + g + ' failed: ' + q.status);
            return [];
        }
        const r = new Uint8Array(await q.arrayBuffer());
        const s = new DataView(r.buffer);
        const t = s.getUint16(4);
        const u = s.getUint16(6);
        log('DoH: ' + c + ' ' + f + ' via ' + g + ' (' + r.length + 'B, id=' + t + ', qc=' + u + ')');
        const v = z => {
            const A = [];
            let B = z, C = false, D = -1, E = 128;
            while (B < r.length && E-- > 0) {
                const F = r[B];
                if (F === 0) { if (!C) D = B + 1; break; }
                if ((F & 0xc0) === 0xc0) {
                    if (!C) D = B + 2;
                    B = ((F & 0x3f) << 8) | r[B + 1];
                    C = true;
                    continue;
                }
                A.push(new TextDecoder().decode(r.slice(B + 1, B + 1 + F)));
                B += F + 1;
            }
            if (D === -1) D = B + 1;
            return [A.join('.'), D];
        };
        let w = 12;
        for (let z = 0; z < t; z++) { const [, A] = v(w); w = A + 4; }
        const x = [];
        for (let B = 0; B < u && w < r.length; B++) {
            const [C, D] = v(w);
            w = D;
            const E = s.getUint16(w); w += 2;
            const F = s.getUint16(w); w += 2;
            const G = s.getUint32(w); w += 4;
            const H = s.getUint16(w); w += 2;
            const I = r.slice(w, w + H);
            w += H;
            let J;
            if (E === 1 && H === 4) {
                J = I[0] + '.' + I[1] + '.' + I[2] + '.' + I[3];
            } else if (E === 28 && H === 16) {
                const K = [];
                for (let L = 0; L < 16; L += 2) K.push((I[L] << 8 | I[L + 1]).toString(16));
                J = K.join(':');
            } else if (E === 16) {
                let L = 0;
                const M = [];
                while (L < H) {
                    const N = I[L++];
                    M.push(new TextDecoder().decode(I.slice(L, L + N)));
                    L += N;
                }
                J = M.join('');
            } else if (E === 5) {
                const [O] = v(w - H);
                J = O;
            } else {
                J = Array.from(I).map(P => P.toString(16).padStart(2, '0')).join('');
            }
            x.push({ name: C, type: E, TTL: G, data: J, rdata: I });
        }
        const y = ((performance.now() - h) / 1000).toFixed(2);
        log('DoH: ' + c + ' ' + f + ' via ' + g + ' ' + y + 's, ' + x.length + ' records' +
            (x.length > 0 ? '\n' + x.map((P, Q) => '  ' + (Q + 1) + '. ' + P.name + ' ' + P.type + ' ' + P.TTL + ' ' + P.data).join('\n') : ''));
        return x;
    } catch (P) {
        const Q = ((performance.now() - h) / 1000).toFixed(2);
        console.log('DoH: ' + c + ' ' + f + ' via ' + g + ' ' + Q + 's error', P);
        return [];
    }
}

// ============================================================
// Fragment
// ============================================================

async function handleXhttpRequest(c, f, g, h) {
    if (connRejectReason) return new Response('Connection rejected: ' + connRejectReason + ')', { status: 403 });
    if (!c.body) return new Response('No body', { status: 400 });
    const i = c.body.getReader();
    const j = await readXhttpFirstPacket(i, f);
    if (!j) { try { i.cancel(); } catch (s) {} return new Response('Invalid packet', { status: 400 }); }
    if (isBlockedSite(j.hostname)) {
        try { i.cancel(); } catch (t) {}
        return networkSettings && networkSettings.enablePornBlock && isAdultDomain(j.hostname) ?
            novaBlockPage(c) :
            new Response('Blocked', { status: 403 });
    }
    if (j.isUDP && j.protocol !== 'tcp' && j.port !== 53) {
        try { i.cancel(); } catch (u) {}
        return new Response('UDP only port 53', { status: 400 });
    }
    const k = { socket: null, connectingPromise: null, retryConnect: null };
    let l = null, m = null;
    const n = { up: 0, down: 0 };
    const o = new Headers({ 'Content-Type': 'application/octet-stream', 'X-Accel-Buffering': 'no', 'Cache-Control': 'no-cache' });
    const p = () => {
        if (m) { try { m.close(); } catch (v) {} m = null; }
        l = null;
    };
    const q = () => {
        const v = k.socket;
        if (!v) return null;
        if (v !== l) { p(); l = v; m = v.writable.getWriter(); }
        return m;
    };
    let r = null;
    return new Response(new ReadableStream({
        async start(v) {
            let w = false, x = j.rawData;
            const y = { cache: new Uint8Array(0) };
            const z = {
                readyState: WebSocket.CONNECTING,
                send(C) {
                    if (w) return;
                    try {
                        const D = C instanceof Uint8Array ? C :
                            C instanceof ArrayBuffer ? new Uint8Array(C) :
                            ArrayBuffer.isView(C) ? new Uint8Array(C.buffer, C.byteOffset, C.byteLength) :
                            new Uint8Array(C);
                        v.enqueue(D);
                        n.up += D.length;
                    } catch (E) { w = true; this.readyState = WebSocket.CLOSED; }
                },
                close() {
                    if (w) return;
                    w = true;
                    this.readyState = WebSocket.CLOSED;
                    try { v.close(); } catch (C) {}
                }
            };
            const A = r = createUpstreamWriteQueue({
                getWriter: q,
                releaseWriter: p,
                retryConnection: async () => {
                    if (typeof k.retryConnect !== 'function') throw new Error('No retry connection function');
                    await k.retryConnect();
                },
                closeConnection: () => {
                    try { k.socket && k.socket.close(); } catch (C) {}
                    closeSocketQuietly(z);
                },
                name: 'fragment-writer'
            });
            const B = async (C, D = true) => { return A.write(C, D); };
            try {
                if (j.isUDP) {
                    if (j.protocol === 'trojan') await forwardTrojanUdpData(j.rawData, z, y, c);
                    else await forwardataudp(j.rawData, z, x, c);
                    x = null;
                } else {
                    n.up += validDataLength(j.rawData);
                    await forwardataTCP(j.hostname, j.port, j.rawData, z, null, k, f, c, n);
                }
                while (true) {
                    const { done: C, value: D } = await i.read();
                    if (C) break;
                    if (!D || D.length === 0) continue;
                    if (D.length) n.up += D.length;
                    if (j.isUDP) {
                        if (j.protocol === 'trojan') await forwardTrojanUdpData(D, z, y, c);
                        else await forwardataudp(D, z, x, c);
                        x = null;
                    } else {
                        if (!await B(D)) throw new Error('Write failed');
                    }
                }
                if (!j.isUDP) {
                    await A.waitEmpty();
                    const E = q();
                    if (E) try { await E.close(); } catch (F) {}
                }
            } catch (G) {
                log('Fragment error: ' + (G && G.message || G));
                closeSocketQuietly(z);
            } finally {
                A.clear();
                p();
                try { i.cancel(); } catch (H) {}
                recordUsage(g, n.up, n.down, h);
            }
        }
    }), { status: 200, headers: o });
}

async function readXhttpFirstPacket(c, f) {
    const g = VLESStextDecode;
    const h = o => {
        const p = o.length;
        if (p < 18) return { status: 'Too short' };
        if (!UUIDbyteMatch(o, 1, f)) return { status: 'UUID mismatch' };
        const q = o[17];
        const r = 18 + q;
        if (p < r + 1) return { status: 'Incomplete header' };
        const s = o[r];
        if (s !== 1 && s !== 2) return { status: 'Invalid protocol' };
        const t = r + 1;
        if (p < t + 3) return { status: 'Incomplete address' };
        const u = o[t] << 8 | o[t + 1];
        const v = o[t + 2];
        const w = t + 3;
        let x = -1, y = '';
        if (v === 1) {
            if (p < w + 4) return { status: 'Incomplete IPv4' };
            y = o[w] + '.' + o[w + 1] + '.' + o[w + 2] + '.' + o[w + 3];
            x = w + 4;
        } else if (v === 2) {
            if (p < w + 1) return { status: 'Incomplete domain length' };
            const z = o[w];
            if (p < w + 1 + z) return { status: 'Incomplete domain' };
            y = g.decode(o.slice(w + 1, w + 1 + z));
            x = w + 1 + z;
        } else if (v === 3) {
            if (p < w + 16) return { status: 'Incomplete IPv6' };
            const A = [];
            for (let B = 0; B < 8; B++) {
                const C = w + B * 2;
                A.push((o[C] << 8 | o[C + 1]).toString(16));
            }
            y = A.join(':');
            x = w + 16;
        } else {
            return { status: 'Invalid address type' };
        }
        if (!y) return { status: 'Empty address' };
        return { status: 'ok', result: { protocol: 'vless', hostname: y, port: u, isUDP: s === 2, rawData: o.slice(x), respHeader: new Uint8Array([o[0], 0]) } };
    };
    const i = o => {
        const p = sha224(f);
        const q = new TextEncoder().encode(p);
        const r = o.length;
        if (r < 58) return { status: 'Too short' };
        if (o[56] !== 13 || o[57] !== 10) return { status: 'Invalid CRLF' };
        for (let A = 0; A < 56; A++) { if (o[A] !== q[A]) return { status: 'SHA224 mismatch' }; }
        const s = 58;
        if (r < s + 2) return { status: 'Incomplete header' };
        const t = o[s];
        if (t !== 1 && t !== 3) return { status: 'Invalid protocol' };
        const u = t === 3;
        const v = o[s + 1];
        let w = s + 2, x = '';
        if (v === 1) {
            if (r < w + 4) return { status: 'Incomplete IPv4' };
            x = o[w] + '.' + o[w + 1] + '.' + o[w + 2] + '.' + o[w + 3];
            w += 4;
        } else if (v === 3) {
            if (r < w + 1) return { status: 'Incomplete domain length' };
            const B = o[w];
            if (r < w + 1 + B) return { status: 'Incomplete domain' };
            x = g.decode(o.slice(w + 1, w + 1 + B));
            w += 1 + B;
        } else if (v === 4) {
            if (r < w + 16) return { status: 'Incomplete IPv6' };
            const C = [];
            for (let D = 0; D < 8; D++) {
                const E = w + D * 2;
                C.push((o[E] << 8 | o[E + 1]).toString(16));
            }
            x = C.join(':');
            w += 16;
        } else {
            return { status: 'Invalid address type' };
        }
        if (!x) return { status: 'Empty address' };
        if (r < w + 4) return { status: 'Incomplete port' };
        const y = o[w] << 8 | o[w + 1];
        if (o[w + 2] !== 13 || o[w + 3] !== 10) return { status: 'Invalid CRLF' };
        const z = w + 4;
        return { status: 'ok', result: { protocol: 'trojan', hostname: x, port: y, isUDP: u, rawData: o.slice(z), respHeader: null } };
    };
    let j = new Uint8Array(0x400), k = 0;
    while (true) {
        const { value: o, done: p } = await c.read();
        if (p) { if (k === 0) return null; break; }
        const q = o instanceof Uint8Array ? o : new Uint8Array(o);
        if (k + q.length > j.length) {
            const u = new Uint8Array(Math.max(j.length * 2, k + q.length));
            u.set(j.slice(0, k));
            j = u;
        }
        j.set(q, k);
        k += q.length;
        const r = j.slice(0, k);
        const s = i(r);
        if (s.status === 'ok') return { ...s.result, reader: c };
        const t = h(r);
        if (t.status === 'ok') return { ...t.result, reader: c };
        if (s.status === 'Too short' && t.status === 'Too short') return null;
    }
    const l = j.slice(0, k);
    const m = i(l);
    if (m.status === 'ok') return { ...m.result, reader: c };
    const n = h(l);
    if (n.status === 'ok') return { ...n.result, reader: c };
    return null;
}

function novaBlockPage(c) {
    const f = new URL(c.url);
    const g = f.hostname;
    const h = '<!DOCTYPE html><html><head><title>Blocked</title><style>body{background:#1a1a1a;color:#ff6b00;font-family:Arial,sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;flex-direction:column}.box{background:#0d0d0d;padding:40px;border-radius:16px;border:2px solid #ff6b00;text-align:center;max-width:500px}h1{color:#ff6b00}p{color:#aaa;margin:15px 0}a{color:#ff6b00;text-decoration:none}a:hover{color:#ff8c00}</style></head><body><div class="box"><h1>🚫 Taakaa-Xi</h1><p>This site has been blocked</p><p>' + g + '</p><a href="/">🔙 Back</a></div></body></html>';
    return new Response(h, { status: 403, headers: { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' } });
    }
// ============================================================
// TAAKAA-XI PROXY WORKER - PART 5: WORKER EXPORT
// ============================================================
// این بخش: Worker اصلی، روت‌ها، APIها، Export نهایی
// ============================================================

// ============================================================
// TAAKAA-XI PANEL HTML
// ============================================================

function panelHtml() {
    const c = TAAKAA_CONFIG;
    return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi Panel</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;background:${c.colors.dark};color:#fff;min-height:100vh;display:flex;justify-content:center;align-items:center;padding:20px}
        .container{background:${c.colors.primary};border-radius:16px;padding:40px;max-width:600px;width:100%;border:2px solid ${c.colors.secondary};box-shadow:0 0 40px rgba(255,107,0,0.15)}
        .brand{text-align:center;margin-bottom:30px}
        .brand h1{font-size:32px;color:${c.colors.secondary};letter-spacing:2px;text-shadow:0 0 20px rgba(255,107,0,0.3)}
        .brand .sub{color:${c.colors.light};font-size:14px;opacity:0.7;margin-top:5px}
        .service-msg{text-align:center;color:${c.colors.secondary};font-size:13px;padding:10px;background:${c.colors.dark};border-radius:8px;margin-bottom:25px;border:1px solid ${c.colors.secondary}33}
        .menu-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:25px}
        .menu-btn{padding:16px 12px;background:${c.colors.dark};border:2px solid #333;border-radius:10px;color:#fff;text-decoration:none;text-align:center;transition:all 0.3s;font-weight:500;font-size:14px}
        .menu-btn:hover{border-color:${c.colors.secondary};transform:translateY(-2px);box-shadow:0 5px 15px rgba(255,107,0,0.2)}
        .menu-btn .icon{font-size:24px;display:block;margin-bottom:6px}
        .menu-btn .label{font-size:13px}
        .menu-btn .desc{font-size:11px;color:#888;margin-top:4px}
        .footer{text-align:center;padding-top:20px;border-top:1px solid ${c.colors.secondary}33;font-size:12px;color:#666}
        .footer a{color:${c.colors.secondary};text-decoration:none}
        .footer a:hover{color:${c.colors.accent}}
        @media(max-width:480px){.menu-grid{grid-template-columns:1fr}.container{padding:20px}}
    </style>
</head>
<body>
    <div class="container">
        <div class="brand"><h1>⚡ Taakaa-Xi</h1><div class="sub">Premium Proxy Service</div></div>
        <div class="service-msg">${c.serviceMessage}</div>
        <div class="menu-grid">
            <a href="/owners" class="menu-btn"><span class="icon">👑</span><span class="label">Owners</span><span class="desc">پشتیبانی و کانال</span></a>
            <a href="/fragment-info" class="menu-btn"><span class="icon">🧩</span><span class="label">Fragment</span><span class="desc">تکه‌تکه‌سازی</span></a>
            <a href="/offline-support" class="menu-btn"><span class="icon">📱</span><span class="label">پشتیبانی آفلاین</span><span class="desc">انتخاب اپراتور</span></a>
            <a href="/select-location" class="menu-btn"><span class="icon">🌍</span><span class="label">انتخاب لوکیشن</span><span class="desc">سرور با پرچم</span></a>
            <a href="/api/users" class="menu-btn"><span class="icon">👥</span><span class="label">مدیریت کاربران</span><span class="desc">مشاهده و مدیریت</span></a>
            <a href="/config" class="menu-btn"><span class="icon">⚙️</span><span class="label">کانفیگ</span><span class="desc">مشاهده تنظیمات</span></a>
        </div>
        <div class="footer">
            <a href="${c.telegram.channel}" target="_blank">@TaakaaOrg</a> |
            <a href="${c.telegram.support}" target="_blank">@TaaKaaOrg</a>
        </div>
    </div>
</body>
</html>`;
}

// ============================================================
// MAIN WORKER
// ============================================================

const taakaaXiWorker = {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        // ============================================================
        // TAAKAA-XI SPECIAL PAGES
        // ============================================================

        if (path === '/owners' || path === '/about') {
            return new Response(taakaaOwnersPage(), {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' }
            });
        }

        if (path === '/offline-support' || path === '/operator') {
            return new Response(taakaaOfflineSupportPage(), {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' }
            });
        }

        if (path === '/fragment-info' || path === '/fragment') {
            return new Response(taakaaFragmentInfoPage(), {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' }
            });
        }

        if (path === '/select-location') {
            return new Response(taakaaLocationSelectionPage(), {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' }
            });
        }

        // ============================================================
        // USER MANAGEMENT API
        // ============================================================

        if (path === '/api/users' && request.method === 'GET') {
            const users = await getUsers(env);
            return new Response(JSON.stringify(users, null, 2), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (path === '/api/users' && request.method === 'POST') {
            try {
                const body = await request.json();
                const user = await createUser(env, body.username, body.limit || 10, body.expiryDays || 30);
                return new Response(JSON.stringify(user, null, 2), {
                    status: 201,
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (e) {
                return new Response(JSON.stringify({ error: e.message }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        if (path === '/api/users/:uuid' && request.method === 'DELETE') {
            try {
                const uuid = path.split('/')[3];
                let users = await getUsers(env);
                users = users.filter(u => u.uuid !== uuid);
                await saveUsers(env, users);
                return new Response(JSON.stringify({ success: true }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (e) {
                return new Response(JSON.stringify({ error: e.message }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        // ============================================================
        // CONFIG ENDPOINT
        // ============================================================

        if (path === '/config') {
            const config = await getConfigRaw(env);
            return new Response(config || '{}', {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // ============================================================
        // HEALTH CHECK
        // ============================================================

        if (path === '/health') {
            return new Response(JSON.stringify({ status: 'ok', version: 'Taakaa-Xi' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // ============================================================
        // PROXY LOGIC (NOVA CORE)
        // ============================================================

        try {
            // Check for WebSocket upgrade (VLESS/Trojan over WS)
            const upgrade = request.headers.get('Upgrade');
            if (upgrade && upgrade.toLowerCase() === 'websocket') {
                // Parse URL for UUID and config
                const urlObj = new URL(request.url);
                const pathname = urlObj.pathname;

                // Get UUID from path or search params
                let uuid = urlObj.searchParams.get('uuid') || '';
                if (!uuid && pathname.length > 1) {
                    const parts = pathname.split('/');
                    for (const part of parts) {
                        if (uuidRegex.test(part)) {
                            uuid = part;
                            break;
                        }
                    }
                }

                // Default UUID if not found
                if (!uuid) {
                    uuid = 'taakaa-xi-default-uuid';
                }

                // Get host and path
                const host = request.headers.get('Host') || 'taakaa.xyz';
                const path = urlObj.pathname || '/';

                // Create mock config for proxy
                const mockConfig = {
                    url: request.url,
                    headers: request.headers,
                    cf: request.cf || {}
                };

                // Get config from KV or use default
                const configRaw = await getConfigRaw(env);
                let config = {};
                if (configRaw) {
                    try { config = JSON.parse(configRaw); } catch (e) {}
                }

                // Call WebSocket handler
                return await handleWsRequest(
                    mockConfig,
                    uuid,
                    { url: new URL('https://' + host + path) },
                    env,
                    ctx
                );
            }

            // Handle HTTP CONNECT (HTTPS proxy)
            if (request.method === 'CONNECT') {
                const host = url.hostname;
                const port = parseInt(url.port) || 443;

                // Create mock config
                const mockConfig = {
                    url: request.url,
                    headers: request.headers,
                    cf: request.cf || {}
                };

                // Get UUID from headers or use default
                let uuid = request.headers.get('X-UUID') || '';
                if (!uuid) {
                    const auth = request.headers.get('Authorization');
                    if (auth && auth.startsWith('Bearer ')) {
                        uuid = auth.substring(7);
                    }
                }
                if (!uuid) uuid = 'taakaa-xi-default-uuid';

                // Check user limit
                const userCheck = await checkUserLimit(env, uuid);
                if (!userCheck.allowed) {
                    return new Response(userCheck.reason, { status: 403 });
                }

                // Handle HTTP CONNECT
                const connector = createRequestTcpConnector(null);
                let socket;
                try {
                    socket = connector({ hostname: host, port: port });
                    await socket.connected;
                } catch (e) {
                    return new Response('Connection failed: ' + e.message, { status: 502 });
                }

                // Create response stream
                const { readable, writable } = new TransformStream();
                const writer = writable.getWriter();

                // Pipe socket to response
                const reader = socket.readable.getReader();
                const pipe = async () => {
                    try {
                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;
                            await writer.write(value);
                            await recordUserUsage(env, uuid, value.length);
                        }
                    } catch (e) {}
                    finally {
                        try { writer.close(); } catch (e) {}
                        try { socket.close(); } catch (e) {}
                    }
                };
                ctx.waitUntil(pipe());

                // Write client request to socket
                const socketWriter = socket.writable.getWriter();
                const clientReader = request.body ? request.body.getReader() : null;

                if (clientReader) {
                    ctx.waitUntil((async () => {
                        try {
                            while (true) {
                                const { done, value } = await clientReader.read();
                                if (done) break;
                                await socketWriter.write(value);
                            }
                        } catch (e) {}
                        finally {
                            try { socketWriter.close(); } catch (e) {}
                        }
                    })());
                }

                return new Response(readable, {
                    status: 200,
                    headers: { 'Connection': 'close' }
                });
            }

            // ============================================================
            // PANEL
            // ============================================================

            if (path === '/' || path === '/panel') {
                return new Response(panelHtml(), {
                    status: 200,
                    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' }
                });
            }

            // ============================================================
            // STATIC ASSETS (if panel has them)
            // ============================================================

            if (panelHasAssets(env)) {
                const asset = await panelFetch(env, path);
                if (asset && asset.ok) return asset;
            }

            // ============================================================
            // DEFAULT RESPONSE
            // ============================================================

            return new Response('Taakaa-Xi Proxy Worker', {
                status: 200,
                headers: { 'Content-Type': 'text/plain' }
            });

        } catch (error) {
            console.error('Proxy error:', error && error.message || error);

            return new Response(TAAKAA_CONFIG.serviceMessage + '\nError: ' + (error && error.message || 'Unknown error'), {
                status: 500,
                headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-cache' }
            });
        }
    },

    // ============================================================
    // SCHEDULED TASKS
    // ============================================================

    async scheduled(event, env, ctx) {
        try {
            // Clean up expired users
            const users = await getUsers(env);
            const now = new Date();
            let expired = 0;

            for (const user of users) {
                if (new Date(user.expiry) < now && user.enabled) {
                    user.enabled = false;
                    expired++;
                }
            }

            if (expired > 0) {
                await saveUsers(env, users);
                console.log('🗑️ ' + expired + ' expired users disabled');
            }

            // Run maintenance tasks
            await runScheduledMaintenance(env);

        } catch (error) {
            console.error('Scheduled task error:', error && error.message || error);
        }
    }
};

// ============================================================
// PANEL ASSETS
// ============================================================

function panelHasAssets(env) {
    return !!(env && env.ASSETS && typeof env.ASSETS.fetch === 'function');
}

async function panelFetch(env, path) {
    if (!panelHasAssets(env)) return null;
    try {
        return await env.ASSETS.fetch(new Request('https://taakaa-panel' + path));
    } catch { return null; }
}

// ============================================================
// SCHEDULED MAINTENANCE
// ============================================================

async function runScheduledMaintenance(env) {
    // Clean up expired users
    const users = await getUsers(env);
    const now = new Date();
    let expired = 0;
    for (const user of users) {
        if (new Date(user.expiry) < now && user.enabled) {
            user.enabled = false;
            expired++;
        }
    }
    if (expired > 0) {
        await saveUsers(env, users);
    }
    return { expired };
}

// ============================================================
// CREATE REQUEST TCP CONNECTOR
// ============================================================

function createRequestTcpConnector(c) {
    const f = c;
    const g = f && f.tcpConnect;
    if (g && typeof g.connect === 'function') {
        return (h, i) => i === undefined ? g.connect(h) : g.connect(h, i);
    }
    if (typeof cfSocketConnect === 'function') {
        return (h, i) => i === undefined ? cfSocketConnect(h) : cfSocketConnect(h, i);
    }
    throw new Error('No TCP connector available');
}

// ============================================================
// EXPORT
// ============================================================

export default taakaaXiWorker;

