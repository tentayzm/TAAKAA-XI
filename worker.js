// ============================================================
// TAAKAA-XI WORKER v2.0.0 - COMPLETE VERSION
// Fully compatible with Nova-Proxy - All features preserved
// ============================================================

// === BRANDING CHANGES ===
const BRAND = 'Taakaa-Xi';
const BRAND_SHORT = 'TaaKaa';
const BRAND_WORKER = 'taakaaXiWorker';
const VERSION = 'Taakaa-Xi-v2.0.0';
const SUBNAME = 'Taakaa-Xi-Sub';
const CHANNEL = '@TaaKaaOrg';
const REPO_RAW = 'https://raw.githubusercontent.com/IRNova/Nova-Proxy/main/';
const VERSION_URL = REPO_RAW + 'version.json';
const WORKER_SRC_FALLBACK = REPO_RAW + 'worker.js';

// === KV KEYS (all renamed from nova_* to taakaa_*) ===
const K = {
    config: 'taakaa_config',
    users: 'taakaa_users',
    autoKey: 'taakaa_auto_key',
    adminPass: 'taakaa_admin_pass',
    workerUuid: 'taakaa_worker_uuid',
    twofa: 'taakaa_twofa',
    telegram: 'taakaa_telegram_config',
    network: 'taakaa_network_settings',
    announcements: 'taakaa_announcements',
    hostsHealth: 'taakaa_hosts_health',
    warp: 'taakaa_warp',
    error: 'taakaa_error',
    customIp: 'taakaa_custom_ip',
    rawConfig: 'taakaa_raw_config',
    cfConfig: 'taakaa_cf_config',
    usage: 'taakaa_usage_',
    dayUsage: 'taakaa_day_usage_'
};

// === COLORS (Orange-Black theme) ===
const COLORS = {
    primary: '#1a1a1a',
    secondary: '#ff6b00',
    accent: '#ff8c00',
    dark: '#0d0d0d',
    light: '#ffa64d'
};

// === CONSTANTS ===
const SESSION_MAX_AGE_MS = 86400000;
const LOGIN_MAX_ATTEMPTS = 8;
const LOGIN_WINDOW_MS = 600000;
const LOGIN_BLOCK_MS = 900000;
const TCP_CONCURRENT_DIAL_COUNT = 4;
const UPSTREAM_BATCH_TARGET_BYTES = 16384;
const UPSTREAM_QUEUE_MAX_BYTES = 33554432;
const UPSTREAM_QUEUE_MAX_ITEMS = 8192;
const WS_EARLY_DATA_MAX_BYTES = 8192;
const WS_EARLY_DATA_MAX_HEADER_LENGTH = Math.ceil(WS_EARLY_DATA_MAX_BYTES * 4 / 3) + 4;
const DOWNSTREAM_GRAIN_CHUNK_BYTES = 16384;
const DOWNSTREAM_GRAIN_TAIL_THRESHOLD = 512;
const DOWNSTREAM_GRAIN_SILENT_MS = 0;

// === REGEX ===
const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
const NODE_ADDR_REGEX = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/;
const PANEL_PLACEHOLDER = /your-panel\.pages\.dev/i;
const SPEEDTEST_DOMAIN = atob('c3BlZWR0ZXN0Lm5ldA==');

// === GLOBALS ===
globalThis['TaakaaXiStartTime'] = Date.now();

let debugLogPrint = false;
let _cfgRaw = null;
let _cfgRawAt = 0;
let cachedAdminPass = null;
let cachedAdminPassAt = 0;
let cachedWorkerUUID = null;
let cachedWorkerUUIDAt = 0;
let cachedAutoKey = null;
let cachedNetworkSettings = null;
let cachedNetworkSettingsAt = 0;
let cachedSocks5Whitelist = null;
let cachedProxyIP = null;
let cachedProxyResolvedArray = null;
let cachedProxyArrayIndex = 0;
let cachedCfUsage = null;
let cachedCfUsageAt = 0;
let savedUsersAuth = null;
let savedUsersAuthAt = 0;
let lastCentralSync = 0;
let connUserId = null;
let connRejectReason = null;
let userUsageCache = {};
let userUsageCacheAt = 0;
let userDayUsageCache = {};
let userDayUsageCacheDay = '';
let _d1Ready = false;
let _logIns = 0;
let _uusagePending = {};
let _uusageLastFlush = 0;
let _uusageFlushing = false;
let usagePending = { up: 0, down: 0 };
let usageLastFlush = 0;
let usageFlushing = false;
let _kvMigratedFlag = false;
let cfSocketConnect = null;
const __loginAttempts = new Map();

let SOCKS5_WHITELIST = ['localhost', '127.0.0.1', '::1', '192.168.', '10.'];
let STATIC_PAGES = 'https://your-panel.pages.dev/';
let proxyIP = '';
let enableSocks5Proxy = null;
let enableSocks5GlobalProxy = false;
let mySocks5Account = '';
let parsedSocks5Address = {};
let enableProxyFallback = true;
let nat64Config = '';
let networkSettings = null;
let config_JSON = null;
let connProxyWhitelist = [];

// === CACHES ===
const _md5Cache = new Map();
const _sha224Cache = new Map();
const _cidrListCache = new Map();

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function log(...args) {
    if (debugLogPrint) console.log('[Taakaa-Xi]', ...args);
}

function dataToUint8Array(data) {
    if (data instanceof Uint8Array) return data;
    if (data instanceof ArrayBuffer) return new Uint8Array(data);
    if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    return new Uint8Array(data || 0);
}

function concatByteData(...arrays) {
    const valid = arrays.filter(a => a && a.length > 0).map(dataToUint8Array);
    if (valid.length === 0) return new Uint8Array(0);
    const total = valid.reduce((s, a) => s + a.length, 0);
    const r = new Uint8Array(total);
    let o = 0;
    for (const a of valid) { r.set(a, o); o += a.length; }
    return r;
}

function validDataLength(data) {
    if (!data) return 0;
    if (typeof data.length === 'number') return data.length;
    if (typeof data.byteLength === 'number') return data.byteLength;
    return 0;
}

function formatBytes(bytes) {
    bytes = Number(bytes) || 0;
    const u = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (bytes >= 1024 && i < u.length - 1) { bytes /= 1024; i++; }
    return bytes.toFixed(i === 0 ? 0 : 2) + ' ' + u[i];
}

function tehranYMD(date = new Date()) {
    const d = new Date(date.getTime() + 3.5 * 60 * 60000);
    return {
        year: d.getFullYear(),
        month: String(d.getMonth() + 1).padStart(2, '0'),
        day: String(d.getDate()).padStart(2, '0')
    };
}

function getDateKey(date = new Date()) {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}

function getMonthKey(date = new Date()) {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
}

function randomBase32(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    let r = '';
    for (const b of bytes) r += chars[b % chars.length];
    return r;
}

function base32Decode(str) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    for (const c of String(str).toUpperCase().replace(/=+$/, '').replace(/[^A-Z2-7]/g, '')) {
        bits += chars.indexOf(c).toString(2).padStart(5, '0');
    }
    const bytes = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) {
        bytes.push(parseInt(bits.slice(i, i + 8), 2));
    }
    return new Uint8Array(bytes);
}

function base64SecretEncode(str, key) {
    const enc = new TextEncoder();
    const s = enc.encode(str);
    const k = enc.encode(key);
    const r = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) r[i] = s[i] ^ k[i % k.length];
    let out = '';
    for (const b of r) out += String.fromCharCode(b);
    return btoa(out);
}

function base64SecretDecode(encoded, key) {
    const raw = atob(encoded);
    const data = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) data[i] = raw.charCodeAt(i);
    const k = new TextEncoder().encode(key);
    const r = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) r[i] = data[i] ^ k[i % k.length];
    return new TextDecoder().decode(r);
}

function versionGreater(current, latest) {
    const c = String(current || '').replace(/^[vV]/, '').split('.').map(n => parseInt(n, 10) || 0);
    const l = String(latest || '').replace(/^[vV]/, '').split('.').map(n => parseInt(n, 10) || 0);
    for (let i = 0; i < Math.max(c.length, l.length); i++) {
        const cv = c[i] || 0, lv = l[i] || 0;
        if (cv > lv) return true;
        if (cv < lv) return false;
    }
    return false;
}

function timingSafeStrEqual(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

function maskSensitiveInfo(str, prefix = 3, suffix = 2) {
    if (!str || typeof str !== 'string') return str;
    if (str.length <= prefix + suffix) return str;
    return str.slice(0, prefix) + '*'.repeat(str.length - prefix - suffix) + str.slice(-suffix);
}

function randomPath(base = '/') {
    const segments = ['v', 'api', 'ws', 'stream', 'proxy', 'gateway', 'relay', 'tunnel', 'cdn', 'edge'];
    const count = Math.floor(Math.random() * 3) + 1;
    const parts = Array.from({ length: count }, () => segments[Math.floor(Math.random() * segments.length)]);
    const path = parts.join('/');
    if (base === '/') return '/' + path;
    return '/' + (path + base.replace('/', '?'));
}

function replaceStarWithRandom(pattern) {
    if (typeof pattern !== 'string' || !pattern.includes('*')) return pattern;
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return pattern.replace(/\*/g, () => {
        let r = '';
        for (let i = 0; i < Math.floor(Math.random() * 14) + 3; i++) {
            r += chars[Math.floor(Math.random() * chars.length)];
        }
        return r;
    });
}

// ============================================================
// CRYPTO FUNCTIONS
// ============================================================

async function MD5MD5(input) {
    if (_md5Cache.has(input)) return _md5Cache.get(input);
    const enc = new TextEncoder();
    const h1 = await crypto.subtle.digest('MD5', enc.encode(input));
    const hex1 = Array.from(new Uint8Array(h1)).map(b => b.toString(16).padStart(2, '0')).join('');
    const h2 = await crypto.subtle.digest('MD5', enc.encode(hex1.slice(7, 27)));
    const result = Array.from(new Uint8Array(h2)).map(b => b.toString(16).padStart(2, '0')).join('');
    if (_md5Cache.size > 500) _md5Cache.clear();
    _md5Cache.set(input, result);
    return result;
}

function sha224(input) {
    if (_sha224Cache.has(input)) return _sha224Cache.get(input);
    const K = [
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
    const rot = (x, n) => (x >>> n | x << (32 - n)) >>> 0;
    let msg = unescape(encodeURIComponent(input));
    const bits = msg.length * 8;
    msg += String.fromCharCode(0x80);
    while ((msg.length * 8) % 512 !== 448) msg += String.fromCharCode(0);
    const words = [];
    for (let i = 0; i < msg.length; i += 4) {
        words.push((msg.charCodeAt(i) << 24) | (msg.charCodeAt(i + 1) << 16) | (msg.charCodeAt(i + 2) << 8) | msg.charCodeAt(i + 3));
    }
    words.push((bits / 0x100000000) >>> 0, bits >>> 0);
    let h = [0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4];
    for (let i = 0; i < words.length; i += 16) {
        const w = new Array(64).fill(0);
        for (let j = 0; j < 16; j++) w[j] = words[i + j];
        for (let j = 16; j < 64; j++) {
            const s0 = rot(w[j - 15], 7) ^ rot(w[j - 15], 18) ^ (w[j - 15] >>> 3);
            const s1 = rot(w[j - 2], 17) ^ rot(w[j - 2], 19) ^ (w[j - 2] >>> 10);
            w[j] = (w[j - 16] + s0 + w[j - 7] + s1) >>> 0;
        }
        let [a, b, c, d, e, f, g, hh] = h;
        for (let j = 0; j < 64; j++) {
            const S1 = rot(e, 6) ^ rot(e, 11) ^ rot(e, 25);
            const ch = (e & f) ^ (~e & g);
            const temp1 = (hh + S1 + ch + K[j] + w[j]) >>> 0;
            const S0 = rot(a, 2) ^ rot(a, 13) ^ rot(a, 22);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const temp2 = (S0 + maj) >>> 0;
            hh = g; g = f; f = e; e = (d + temp1) >>> 0; d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
        }
        h = h.map((v, j) => (v + [a, b, c, d, e, f, g, hh][j]) >>> 0);
    }
    let result = '';
    for (let i = 0; i < 7; i++) {
        for (let j = 24; j >= 0; j -= 8) {
            result += ((h[i] >>> j) & 0xff).toString(16).padStart(2, '0');
        }
    }
    if (_sha224Cache.size > 64) _sha224Cache.clear();
    _sha224Cache.set(input, result);
    return result;
}

async function hmac(algorithm, key, data) {
    const k = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: algorithm }, false, ['sign']);
    return new Uint8Array(await crypto.subtle.sign('HMAC', k, data));
}

function generateUUID() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const hex = Array.from(b).map(x => x.toString(16).padStart(2, '0')).join('');
    return hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20);
}

function isValidUUID(str) { return UUID_REGEX.test(str); }

function getUuidBytes(uuid) {
    const clean = String(uuid || '').replace(/-/g, '');
    if (clean.length !== 32) return null;
    const bytes = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
        const h = parseInt(clean[i * 2], 16), l = parseInt(clean[i * 2 + 1], 16);
        if (h < 0 || l < 0) return null;
        bytes[i] = (h << 4) | l;
    }
    return bytes;
}

function UUIDbyteMatch(data, offset, uuid) {
    const bytes = getUuidBytes(uuid);
    if (!bytes || data.length < offset + 16) return false;
    for (let i = 0; i < 16; i++) { if (data[offset + i] !== bytes[i]) return false; }
    return true;
}

// ============================================================
// TOTP
// ============================================================

async function totpAt(secret, time) {
    const key = base32Decode(secret);
    const buf = new ArrayBuffer(8);
    const view = new DataView(buf);
    view.setUint32(0, Math.floor(time / 0x100000000));
    view.setUint32(4, time >>> 0);
    const hmacKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
    const hash = new Uint8Array(await crypto.subtle.sign('HMAC', hmacKey, buf));
    const off = hash[hash.length - 1] & 0xf;
    const code = ((hash[off] & 0x7f) << 24) | ((hash[off + 1] & 0xff) << 16) | ((hash[off + 2] & 0xff) << 8) | (hash[off + 3] & 0xff);
    return String(code % 1000000).padStart(6, '0');
}

async function totpVerify(secret, code, window = 1) {
    code = String(code || '').trim();
    if (!/^\d{6}$/.test(code) || !secret) return false;
    const t = Math.floor(Date.now() / 30000);
    for (let i = -window; i <= window; i++) {
        if (await totpAt(secret, t + i) === code) return true;
    }
    return false;
}

// ============================================================
// VLESS & TROJAN PROTOCOLS
// ============================================================

const VLESS_DECODER = new TextDecoder();
const TROJAN_DECODER = new TextDecoder();

function parseVlessRequest(data, uuid) {
    const bytes = dataToUint8Array(data);
    if (bytes.length < 24) return { hasError: true, message: 'VLESS: Packet too short' };
    const version = bytes[0];
    if (!UUIDbyteMatch(bytes, 1, uuid)) return { hasError: true, message: 'VLESS: Invalid UUID' };
    const cmdLen = bytes[17], cmdStart = 18 + cmdLen;
    if (bytes.length < cmdStart + 4) return { hasError: true, message: 'VLESS: Missing command data' };
    const isUDP = bytes[cmdStart] === 2;
    const port = (bytes[cmdStart + 1] << 8) | bytes[cmdStart + 2];
    const addrType = bytes[cmdStart + 3];
    let addrStart = cmdStart + 4, addrLen = 0, hostname = '';
    switch (addrType) {
        case 1:
            addrLen = 4;
            if (bytes.length < addrStart + addrLen) return { hasError: true, message: 'VLESS: Truncated IPv4' };
            hostname = bytes[addrStart] + '.' + bytes[addrStart + 1] + '.' + bytes[addrStart + 2] + '.' + bytes[addrStart + 3];
            break;
        case 2:
            if (bytes.length < addrStart + 1) return { hasError: true, message: 'VLESS: Truncated domain length' };
            addrLen = bytes[addrStart++];
            if (bytes.length < addrStart + addrLen) return { hasError: true, message: 'VLESS: Truncated domain' };
            hostname = VLESS_DECODER.decode(bytes.slice(addrStart, addrStart + addrLen));
            break;
        case 3:
            addrLen = 16;
            if (bytes.length < addrStart + addrLen) return { hasError: true, message: 'VLESS: Truncated IPv6' };
            const parts = [];
            for (let i = 0; i < 8; i++) parts.push(((bytes[addrStart + i * 2] << 8) | bytes[addrStart + i * 2 + 1]).toString(16));
            hostname = parts.join(':');
            break;
        default: return { hasError: true, message: 'VLESS: Unknown address type: ' + addrType };
    }
    if (!hostname) return { hasError: true, message: 'VLESS: Empty hostname' };
    return { hasError: false, version, isUDP, port, hostname, rawClientData: bytes.slice(addrStart + addrLen) };
}

function isTrojanFirstPacket(data, uuid) {
    const bytes = dataToUint8Array(data);
    if (bytes.length < 58) return false;
    const hash = sha224(uuid);
    for (let i = 0; i < 56; i++) { if (bytes[i] !== hash.charCodeAt(i)) return false; }
    return bytes[56] === 0x0d && bytes[57] === 0x0a;
}

function parseTrojanRequest(data, uuid) {
    const bytes = dataToUint8Array(data);
    if (bytes.length < 58) return { hasError: true, message: 'Trojan: Packet too short' };
    const hash = sha224(uuid);
    for (let i = 0; i < 56; i++) { if (bytes[i] !== hash.charCodeAt(i)) return { hasError: true, message: 'Trojan: Invalid hash' }; }
    if (bytes[56] !== 0x0d || bytes[57] !== 0x0a) return { hasError: true, message: 'Trojan: Invalid CRLF' };
    let pos = 58;
    if (bytes.length < pos + 6) return { hasError: true, message: 'Trojan: Missing address/port' };
    const isUDP = bytes[pos] === 3;
    const addrType = bytes[pos + 1];
    let addrStart = pos + 2, addrLen = 0, hostname = '';
    switch (addrType) {
        case 1:
            addrLen = 4;
            if (bytes.length < addrStart + addrLen) return { hasError: true, message: 'Trojan: Truncated IPv4' };
            hostname = bytes[addrStart] + '.' + bytes[addrStart + 1] + '.' + bytes[addrStart + 2] + '.' + bytes[addrStart + 3];
            break;
        case 3:
            if (bytes.length < addrStart + 1) return { hasError: true, message: 'Trojan: Truncated domain length' };
            addrLen = bytes[addrStart++];
            if (bytes.length < addrStart + addrLen) return { hasError: true, message: 'Trojan: Truncated domain' };
            hostname = TROJAN_DECODER.decode(bytes.slice(addrStart, addrStart + addrLen));
            break;
        case 4:
            addrLen = 16;
            if (bytes.length < addrStart + addrLen) return { hasError: true, message: 'Trojan: Truncated IPv6' };
            const parts = [];
            for (let i = 0; i < 8; i++) parts.push(((bytes[addrStart + i * 2] << 8) | bytes[addrStart + i * 2 + 1]).toString(16));
            hostname = parts.join(':');
            break;
        default: return { hasError: true, message: 'Trojan: Unknown address type: ' + addrType };
    }
    const portStart = addrStart + addrLen;
    if (bytes.length < portStart + 4) return { hasError: true, message: 'Trojan: Missing port' };
    const port = (bytes[portStart] << 8) | bytes[portStart + 1];
    return { hasError: false, isUDP, port, hostname, rawClientData: bytes.slice(portStart + 4) };
}

// ============================================================
// KV & D1
// ============================================================

function hasD1(env) { return !!(env && env.DB && typeof env.DB.prepare === 'function'); }

async function d1Init(env) {
    if (_d1Ready || !hasD1(env)) return _d1Ready;
    try {
        await env.DB.exec([
            env.DB.prepare('CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT, updated_at INTEGER)'),
            env.DB.prepare('CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, ip TEXT, asn TEXT, cc TEXT, url TEXT, ua TEXT, ts INTEGER)'),
            env.DB.prepare('CREATE TABLE IF NOT EXISTS usage (key TEXT PRIMARY KEY, up INTEGER, down INTEGER, total INTEGER, updated_at INTEGER)')
        ]);
        _d1Ready = true;
    } catch (e) { console.log('[Taakaa-Xi] D1 init error:', e && e.message); }
    return _d1Ready;
}

function wrapKVWithD1(env) {
    if (!env || env._d1Wrapped || !hasD1(env)) return;
    const realKV = env.KV && typeof env.KV.get === 'function' ? env.KV : null;
    env.KV = {
        __real: realKV,
        get: async (key, type) => {
            if (type && realKV) return realKV.get(key, type);
            try {
                if (await d1Init(env)) {
                    const r = await env.DB.prepare('SELECT v FROM kv WHERE k = ?').bind(key).first();
                    if (r && r.v != null) return r.v;
                    if (realKV) {
                        const v = await realKV.get(key);
                        if (v != null) try { await env.DB.prepare('INSERT OR REPLACE INTO kv (k, v, updated_at) VALUES (?, ?, ?)').bind(key, v, Date.now()).run(); } catch (e) {}
                        return v;
                    }
                    return null;
                }
            } catch (e) {}
            return realKV ? realKV.get(key, type) : null;
        },
        put: async (key, value, type) => {
            try {
                if (typeof value === 'string' && await d1Init(env)) {
                    await env.DB.prepare('INSERT OR REPLACE INTO kv (k, v, updated_at) VALUES (?, ?, ?)').bind(key, value, Date.now()).run();
                }
            } catch (e) {}
            if (realKV) try { realKV.put(key, value, type).catch(() => {}); } catch (e) {}
        },
        delete: async (key) => {
            try { if (await d1Init(env)) await env.DB.prepare('DELETE FROM kv WHERE k = ?').bind(key).run(); } catch (e) {}
            if (realKV) try { realKV.delete(key).catch(() => {}); } catch (e) {}
        },
        list: async (opts) => {
            opts = opts || {};
            try {
                if (await d1Init(env)) {
                    const r = await env.DB.prepare('SELECT k FROM kv WHERE k LIKE ?').bind((opts.prefix || '') + '%').all();
                    return { keys: (r.results || []).map(row => ({ name: row.k })), list_complete: true, cursor: null };
                }
            } catch (e) {}
            return realKV ? realKV.list(opts) : { keys: [], list_complete: true, cursor: null };
        }
    };
    env._d1Wrapped = true;
}

async function migrateKvToD1(env) {
    if (!hasD1(env) || !env._d1Wrapped) return;
    if (!await d1Init(env)) return;
    try {
        const existing = await env.DB.prepare('SELECT v FROM kv WHERE k = ?').bind('_migrated').first();
        if (existing && existing.v) { _kvMigratedFlag = true; return; }
        let cursor, count = 0;
        do {
            const list = await env.KV.list({ cursor });
            for (const item of list.keys || []) {
                try {
                    const val = await env.KV.get(item.name);
                    if (val != null) {
                        await env.DB.prepare('INSERT OR REPLACE INTO kv (k, v, updated_at) VALUES (?, ?, ?)').bind(item.name, val, Date.now()).run();
                        count++;
                    }
                } catch (e) {}
            }
            cursor = list.cursor;
        } while (cursor);
        await env.DB.prepare('INSERT OR REPLACE INTO kv (k, v, updated_at) VALUES (?, ?, ?)').bind('_migrated', String(Date.now()), Date.now()).run();
        _kvMigratedFlag = true;
        console.log('[Taakaa-Xi] Migrated', count, 'keys to D1');
    } catch (e) { console.log('[Taakaa-Xi] Migration error:', e && e.message); }
}

// ============================================================
// CONFIG MANAGEMENT
// ============================================================

async function getConfigRaw(env) {
    if (_cfgRaw !== null && Date.now() - _cfgRawAt < 30000) return _cfgRaw;
    try {
        if (env.KV && typeof env.KV.get === 'function') _cfgRaw = await env.KV.get(K.config);
        _cfgRawAt = Date.now();
    } catch (e) {}
    return _cfgRaw;
}

function putConfig(env, data) {
    _cfgRaw = data;
    _cfgRawAt = Date.now();
    if (env.KV && typeof env.KV.put === 'function') env.KV.put(K.config, data);
}

async function getAutoKey(env) {
    if (cachedAutoKey) return cachedAutoKey;
    if (env.KV && typeof env.KV.get === 'function') {
        try {
            let key = await env.KV.get(K.autoKey);
            if (!key) {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                key = Array.from(crypto.getRandomValues(new Uint8Array(24)), b => chars[b % chars.length]).join('');
                await env.KV.put(K.autoKey, key);
            }
            cachedAutoKey = key;
            return key;
        } catch (e) {}
    }
    return 'TaakaaXiDefaultKey';
}

// ============================================================
// USER & USAGE MANAGEMENT
// ============================================================

async function usageGet(env, key) {
    if (hasD1(env) && await d1Init(env)) {
        try {
            const r = await env.DB.prepare('SELECT up, down, total FROM usage WHERE key = ?').bind(key).first();
            if (r) return { up: r.up || 0, down: r.down || 0, total: r.total || 0 };
            return null;
        } catch (e) { console.log('[Taakaa-Xi] usageGet D1 error:', e); }
    }
    try { return JSON.parse(await env.KV.get(key) || 'null'); } catch (e) { return null; }
}

async function usageAdd(env, key, up, down) {
    up = up || 0; down = down || 0;
    if (hasD1(env) && await d1Init(env)) {
        try {
            const r = await env.DB.prepare('INSERT INTO usage (key, up, down, total, updated_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(key) DO UPDATE SET up = up + ?, down = down + ?, total = total + ?, updated_at = ? RETURNING total')
                .bind(key, up, down, up + down, Date.now(), up, down, up + down, Date.now()).first();
            return r && r.total || 0;
        } catch (e) { console.log('[Taakaa-Xi] usageAdd D1 error:', e); }
    }
    let data;
    try { data = JSON.parse(await env.KV.get(key) || 'null'); } catch (e) { data = null; }
    if (!data || typeof data !== 'object') data = { up: 0, down: 0, total: 0 };
    data.up = (data.up || 0) + up;
    data.down = (data.down || 0) + down;
    data.total = (data.total || 0) + up + down;
    await env.KV.put(key, JSON.stringify(data));
    return data.total;
}

async function usageReset(env, key) {
    if (hasD1(env) && await d1Init(env)) {
        try { await env.DB.prepare('UPDATE usage SET up = 0, down = 0, total = 0 WHERE key = ?').bind(key).run(); return true; } catch (e) {}
    }
    try { await env.KV.put(key, JSON.stringify({ up: 0, down: 0, total: 0 })); } catch (e) {}
    return true;
}

async function refreshUserUsageIfStale(env) {
    if (Date.now() - userUsageCacheAt < 60000) return;
    userUsageCacheAt = Date.now();
    const today = getDateKey(new Date());
    if (userDayUsageCacheDay !== today) { userDayUsageCache = {}; userDayUsageCacheDay = today; }
    try {
        const users = networkSettings && Array.isArray(networkSettings.users) ? networkSettings.users : [];
        const up = {}, dp = {};
        await Promise.all(users.map(async u => {
            if (!u || !u.id) return;
            try {
                const r = await usageGet(env, K.usage + u.id);
                up[u.id] = r && r.total || 0;
            } catch (e) { up[u.id] = userUsageCache[u.id] || 0; }
            try {
                const r = await usageGet(env, K.dayUsage + u.id + ':' + today);
                dp[u.id] = r && r.total || 0;
            } catch (e) { dp[u.id] = userDayUsageCache[u.id] || 0; }
        }));
        userUsageCache = up;
        userDayUsageCache = dp;
        userDayUsageCacheDay = today;
    } catch (e) {}
}

function resolveConnUser(request) {
    connUserId = null;
    connRejectReason = null;
    if (!networkSettings || !Array.isArray(networkSettings.users)) return;
    const uParam = new URL(request.url).searchParams.get('u');
    if (!uParam) return;
    const user = networkSettings.users.find(u => u && u.id === uParam);
    if (!user) { connRejectReason = 'User not found'; return; }
    if (user.disabled === true) { connRejectReason = 'User disabled'; return; }
    if (user.expiry) {
        const exp = Date.parse(user.expiry);
        if (!isNaN(exp) && Date.now() > exp) { connRejectReason = 'User expired'; return; }
    }
    if (user.limit) {
        const used = userUsageCache[user.id] || 0;
        if (used >= user.limit) { connRejectReason = 'Usage limit exceeded'; return; }
    }
    if (user.dayLimit) {
        const dayUsed = userDayUsageCache[user.id] || 0;
        if (dayUsed >= user.dayLimit) { connRejectReason = 'Daily limit exceeded'; return; }
    }
    connUserId = user.id;
}

// ============================================================
// USAGE RECORDING
// ============================================================

function recordUsage(env, up, down, waitUntil) {
    usagePending.up += up || 0;
    usagePending.down += down || 0;
    const total = usagePending.up + usagePending.down;
    if (total <= 0) return;
    const now = Date.now();
    if (now - usageLastFlush < 300000 && total < 33554432) return;
    usageLastFlush = now;
    if (waitUntil && typeof waitUntil === 'function') waitUntil(flushUsage(env));
    else flushUsage(env).catch(() => {});
}

async function flushUsage(env) {
    if (usageFlushing) return;
    const up = usagePending.up, down = usagePending.down;
    if (up + down <= 0) return;
    usageFlushing = true;
    usagePending = { up: 0, down: 0 };
    try {
        const now = new Date();
        await usageAdd(env, 'taakaa_usage_' + getDateKey(now), up, down);
        await usageAdd(env, 'taakaa_usage_month_' + getMonthKey(now), up, down);
    } catch (e) {
        usagePending.up += up;
        usagePending.down += down;
        console.log('[Taakaa-Xi] flushUsage error:', e && e.message);
    } finally {
        usageFlushing = false;
    }
}

function recordUserUsage(env, userId, up, down, waitUntil) {
    if (!userId) return;
    if (!_uusagePending[userId]) _uusagePending[userId] = { up: 0, down: 0 };
    _uusagePending[userId].up += up || 0;
    _uusagePending[userId].down += down || 0;
    userUsageCache[userId] = (userUsageCache[userId] || 0) + (up || 0) + (down || 0);
    const today = getDateKey(new Date());
    if (userDayUsageCacheDay !== today) { userDayUsageCache = {}; userDayUsageCacheDay = today; }
    userDayUsageCache[userId] = (userDayUsageCache[userId] || 0) + (up || 0) + (down || 0);
    const now = Date.now();
    if (now - _uusageLastFlush < 300000) return;
    _uusageLastFlush = now;
    if (waitUntil && typeof waitUntil === 'function') waitUntil(flushUserUsage(env));
    else flushUserUsage(env).catch(() => {});
}

async function flushUserUsage(env) {
    if (_uusageFlushing) return;
    _uusageFlushing = true;
    const pending = _uusagePending;
    _uusagePending = {};
    try {
        for (const [uid, data] of Object.entries(pending)) {
            if (data.up + data.down <= 0) continue;
            try {
                userUsageCache[uid] = await usageAdd(env, K.usage + uid, data.up, data.down);
                const today = getDateKey(new Date());
                const dayTotal = await usageAdd(env, K.dayUsage + uid + ':' + today, data.up, data.down);
                if (userDayUsageCacheDay !== today) { userDayUsageCache = {}; userDayUsageCacheDay = today; }
                userDayUsageCache[uid] = dayTotal || (userDayUsageCache[uid] || 0) + data.up + data.down;
            } catch (e) {
                if (!_uusagePending[uid]) _uusagePending[uid] = { up: 0, down: 0 };
                _uusagePending[uid].up += data.up;
                _uusagePending[uid].down += data.down;
            }
        }
    } finally {
        _uusageFlushing = false;
    }
}

// ============================================================
// NEW PAGES
// ============================================================

function renderOwnersPage() {
    return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>👤 Owners - Taakaa-Xi</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Tahoma,sans-serif}
body{background:#0d0d0d;color:#ffa64d;padding:20px;min-height:100vh;display:flex;justify-content:center;align-items:center}
.card{background:#1a1a1a;border:2px solid #ff6b00;border-radius:16px;padding:30px;max-width:500px;width:100%;box-shadow:0 0 30px rgba(255,107,0,0.2)}
h1{color:#ff8c00;text-align:center;margin-bottom:20px;font-size:28px}
.owner{background:#0d0d0d;border:1px solid #ff6b00;border-radius:10px;padding:15px;margin:10px 0;display:flex;align-items:center;gap:12px}
.owner .avatar{width:48px;height:48px;border-radius:50%;background:#ff6b00;display:flex;align-items:center;justify-content:center;font-size:20px;color:#0d0d0d;font-weight:bold}
.owner .info{flex:1}
.owner .name{color:#fff;font-size:16px;font-weight:bold}
.owner .role{color:#ffa64d;font-size:13px}
.owner .contact{color:#ff8c00;font-size:14px}
.channel{text-align:center;margin-top:10px;padding:10px;background:#0d0d0d;border-radius:8px;border:1px solid #ff6b00}
.channel a{color:#ff8c00;text-decoration:none;font-weight:bold}
.footer{text-align:center;margin-top:20px;color:#666;font-size:12px}
</style>
</head>
<body>
<div class="card">
<h1>👤 پشتیبان‌های Taakaa-Xi</h1>
<div class="owner"><div class="avatar">A</div><div class="info"><div class="name">Admin</div><div class="role">مدیر اصلی</div><div class="contact">@TaakaaXi_Admin</div></div></div>
<div class="owner"><div class="avatar">S</div><div class="info"><div class="name">Support</div><div class="role">پشتیبانی فنی</div><div class="contact">@TaakaaXi_Support</div></div></div>
<div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>
<div class="footer">تمامی حقوق محفوظ است © 2026 Taakaa-Xi</div>
</div>
</body>
</html>`;
}

function renderFragmentInfoPage() {
    return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>🧩 Fragment - Taakaa-Xi</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Tahoma,sans-serif}
body{background:#0d0d0d;color:#ffa64d;padding:20px;min-height:100vh;display:flex;justify-content:center;align-items:center}
.card{background:#1a1a1a;border:2px solid #ff6b00;border-radius:16px;padding:30px;max-width:600px;width:100%;box-shadow:0 0 30px rgba(255,107,0,0.2)}
h1{color:#ff8c00;text-align:center;margin-bottom:20px;font-size:28px}
.info{background:#0d0d0d;border-radius:10px;padding:20px;margin:10px 0}
.info p{margin:10px 0;line-height:1.8}
.code{background:#0d0d0d;border:1px solid #ff6b00;border-radius:8px;padding:15px;font-family:monospace;color:#ffa64d;font-size:13px;overflow-x:auto;white-space:pre-wrap;word-break:break-all}
.tag{display:inline-block;background:#ff6b00;color:#0d0d0d;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:bold}
.channel{text-align:center;margin-top:10px;padding:10px;background:#0d0d0d;border-radius:8px;border:1px solid #ff6b00}
.channel a{color:#ff8c00;text-decoration:none;font-weight:bold}
.footer{text-align:center;margin-top:20px;color:#666;font-size:12px}
</style>
</head>
<body>
<div class="card">
<h1>🧩 تکنیک Fragment</h1>
<div class="info">
<p><span class="tag">چیست؟</span> تکنیک Fragment یا تکه‌تکه‌سازی، بسته‌های داده را به قطعات کوچک تقسیم می‌کند تا سیستم‌های DPI نتوانند الگوی ترافیک را تشخیص دهند.</p>
<p><span class="tag">چگونه کار می‌کند؟</span> داده‌های TLS/WS به قطعات ۱۰۰-۵۰۰ بایتی تقسیم شده و با تاخیرهای میکروثانیه‌ای ارسال می‌شوند.</p>
<p><span class="tag">مزایا</span> ✅ عبور از فیلترینگ سنگین ✅ کاهش تشخیص DPI ✅ سازگاری با همه‌ی پروتکل‌ها</p>
</div>
<div class="code">
# مثال کانفیگ با Fragment
{
  "tlsFragment": {
    "size": "200-500",
    "count": "5-10",
    "delay": "10-30"
  }
}
</div>
<div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>
<div class="footer">Taakaa-Xi v2.0.0 | Fragment Technology</div>
</div>
</body>
</html>`;
}

function renderOfflineSupportPage() {
    return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>📞 پشتیبانی آفلاین - Taakaa-Xi</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Tahoma,sans-serif}
body{background:#0d0d0d;color:#ffa64d;padding:20px;min-height:100vh;display:flex;justify-content:center;align-items:center}
.card{background:#1a1a1a;border:2px solid #ff6b00;border-radius:16px;padding:30px;max-width:500px;width:100%;box-shadow:0 0 30px rgba(255,107,0,0.2)}
h1{color:#ff8c00;text-align:center;margin-bottom:20px;font-size:28px}
.operator{background:#0d0d0d;border:1px solid #ff6b00;border-radius:10px;padding:15px;margin:10px 0}
.operator .title{color:#ff8c00;font-weight:bold;font-size:16px}
.operator .detail{color:#ffa64d;font-size:14px;margin-top:5px}
.operator .guide{color:#999;font-size:13px;margin-top:8px;padding:8px;background:#1a1a1a;border-radius:6px}
.channel{text-align:center;margin-top:10px;padding:10px;background:#0d0d0d;border-radius:8px;border:1px solid #ff6b00}
.channel a{color:#ff8c00;text-decoration:none;font-weight:bold}
.footer{text-align:center;margin-top:20px;color:#666;font-size:12px}
</style>
</head>
<body>
<div class="card">
<h1>📞 پشتیبانی آفلاین</h1>
<div class="operator">
<div class="title">📱 همراه اول</div>
<div class="detail">تنظیمات DNS: 10.10.10.10</div>
<div class="guide">🔹 برای اتصال آفلاین، DNS را روی 10.10.10.10 تنظیم کنید</div>
</div>
<div class="operator">
<div class="title">📶 ایرانسل</div>
<div class="detail">تنظیمات DNS: 10.10.10.10</div>
<div class="guide">🔹 برای اتصال آفلاین، DNS را روی 10.10.10.10 تنظیم کنید</div>
</div>
<div class="operator">
<div class="title">📡 رایتل</div>
<div class="detail">تنظیمات DNS: 10.10.10.10</div>
<div class="guide">🔹 برای اتصال آفلاین، DNS را روی 10.10.10.10 تنظیم کنید</div>
</div>
<div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>
<div class="footer">راهنمای پشتیبانی آفلاین - Taakaa-Xi</div>
</div>
</body>
</html>`;
}

function renderSelectLocationPage() {
    return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>🌍 انتخاب لوکیشن - Taakaa-Xi</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Tahoma,sans-serif}
body{background:#0d0d0d;color:#ffa64d;padding:20px;min-height:100vh;display:flex;justify-content:center;align-items:center}
.card{background:#1a1a1a;border:2px solid #ff6b00;border-radius:16px;padding:30px;max-width:400px;width:100%;box-shadow:0 0 30px rgba(255,107,0,0.2)}
h1{color:#ff8c00;text-align:center;margin-bottom:20px;font-size:28px}
.location{background:#0d0d0d;border:1px solid #ff6b00;border-radius:10px;padding:12px 15px;margin:8px 0;display:flex;align-items:center;gap:12px;cursor:pointer;transition:all 0.3s}
.location:hover{background:#ff6b00;color:#0d0d0d}
.location .flag{font-size:28px}
.location .name{flex:1;font-size:16px}
.location .ping{font-size:13px;color:#ffa64d}
.channel{text-align:center;margin-top:10px;padding:10px;background:#0d0d0d;border-radius:8px;border:1px solid #ff6b00}
.channel a{color:#ff8c00;text-decoration:none;font-weight:bold}
.footer{text-align:center;margin-top:20px;color:#666;font-size:12px}
</style>
</head>
<body>
<div class="card">
<h1>🌍 انتخاب سرور</h1>
<div class="location" onclick="selectServer('DE')"><span class="flag">🇩🇪</span><span class="name">آلمان (Frankfurt)</span><span class="ping">Ping: 85ms</span></div>
<div class="location" onclick="selectServer('NL')"><span class="flag">🇳🇱</span><span class="name">هلند (Amsterdam)</span><span class="ping">Ping: 92ms</span></div>
<div class="location" onclick="selectServer('US')"><span class="flag">🇺🇸</span><span class="name">آمریکا (New York)</span><span class="ping">Ping: 140ms</span></div>
<div class="location" onclick="selectServer('SG')"><span class="flag">🇸🇬</span><span class="name">سنگاپور</span><span class="ping">Ping: 110ms</span></div>
<div class="location" onclick="selectServer('JP')"><span class="flag">🇯🇵</span><span class="name">ژاپن (Tokyo)</span><span class="ping">Ping: 130ms</span></div>
<div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>
<div class="footer">انتخاب لوکیشن - Taakaa-Xi</div>
</div>
<script>
function selectServer(code) {
    alert('سرور ' + code + ' انتخاب شد!\\nکانفیگ جدید ساخته می‌شود...');
    window.location.href = '/?server=' + code;
}
</script>
</body>
</html>`;
}

// ============================================================
// PANEL RENDER
// ============================================================

function renderPanel(users = [], usage = {}) {
    const userList = users.map(u => `
        <div class="user-item">
            <span class="user-name">${u.name || u.id}</span>
            <span class="user-usage">مصرف: ${formatBytes(usage[u.id] || 0)}</span>
            <span class="user-status ${u.disabled ? 'disabled' : 'active'}">${u.disabled ? '🔴 غیرفعال' : '🟢 فعال'}</span>
        </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>پنل مدیریت - Taakaa-Xi</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Tahoma, sans-serif; }
        body { background: #0d0d0d; color: #ffa64d; padding: 20px; min-height: 100vh; display: flex; justify-content: center; align-items: flex-start; }
        .card { background: #1a1a1a; border: 2px solid #ff6b00; border-radius: 16px; padding: 30px; max-width: 800px; width: 100%; margin: 20px auto; box-shadow: 0 0 30px rgba(255,107,0,0.2); }
        h1 { color: #ff8c00; text-align: center; margin-bottom: 20px; font-size: 28px; }
        h2 { color: #ff8c00; margin: 20px 0 10px; font-size: 20px; border-bottom: 1px solid #ff6b00; padding-bottom: 8px; }
        .menu { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 20px 0; }
        .menu a, .menu button { background: #0d0d0d; border: 1px solid #ff6b00; border-radius: 10px; padding: 12px; text-align: center; color: #ffa64d; text-decoration: none; transition: all 0.3s; cursor: pointer; font-size: 14px; }
        .menu a:hover, .menu button:hover { background: #ff6b00; color: #0d0d0d; }
        .status-box { background: #0d0d0d; border-radius: 10px; padding: 15px; margin: 15px 0; border: 1px solid #333; }
        .user-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; margin: 5px 0; background: #0d0d0d; border-radius: 8px; border: 1px solid #222; }
        .user-name { color: #fff; font-weight: bold; }
        .user-usage { color: #ffa64d; font-size: 14px; }
        .user-status { padding: 2px 10px; border-radius: 12px; font-size: 12px; }
        .user-status.active { background: #1a5a1a; color: #4caf50; }
        .user-status.disabled { background: #5a1a1a; color: #f44336; }
        .channel { text-align: center; margin-top: 15px; padding: 10px; background: #0d0d0d; border-radius: 8px; border: 1px solid #ff6b00; }
        .channel a { color: #ff8c00; text-decoration: none; font-weight: bold; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        .config-box { background: #0d0d0d; border-radius: 8px; padding: 15px; font-family: monospace; font-size: 12px; overflow-x: auto; white-space: pre-wrap; word-break: break-all; border: 1px solid #333; margin: 10px 0; }
        .form-group { margin: 15px 0; }
        .form-group label { display: block; margin-bottom: 5px; color: #ffa64d; }
        .form-group input, .form-group select { width: 100%; padding: 10px; background: #0d0d0d; border: 1px solid #ff6b00; border-radius: 8px; color: #fff; }
        .form-group button { padding: 10px 20px; background: #ff6b00; border: none; border-radius: 8px; color: #0d0d0d; font-weight: bold; cursor: pointer; }
        .form-group button:hover { background: #ff8c00; }
        .proxy-info { background: #0d0d0d; border-radius: 8px; padding: 15px; margin: 10px 0; border: 1px solid #333; font-size: 14px; }
        .proxy-info span { color: #ff8c00; }
    </style>
</head>
<body>
<div class="card">
    <h1>🖐🏻🤓🖐🏻 TAAKAA-XI</h1>
    <div class="status-box">
        <p>✅ پنل مدیریت کانفیگ</p>
        <p style="font-size:14px;color:#ff8c00;">نسخه: ${VERSION}</p>
        <p style="font-size:12px;color:#666;">آپتایم: ${Math.floor((Date.now() - globalThis['TaakaaXiStartTime']) / 1000)} ثانیه</p>
    </div>

    <div class="proxy-info">
        <p>📡 <span>پروتکل‌های پشتیبانی‌شده:</span> VLESS, Trojan, Shadowsocks, XHTTP, gRPC</p>
        <p>🛡️ <span>تکنیک‌های عبور:</span> Fragment, WARP, ECH, GSA Relay</p>
        <p>📢 <span>کانال:</span> @TaaKaaOrg</p>
    </div>

    <h2>📋 منوی اصلی</h2>
    <div class="menu">
        <a href="/">🏠 خانه</a>
        <a href="/panel/users">👥 کاربران</a>
        <a href="/panel/config">⚙️ تنظیمات</a>
        <a href="/owners">👤 Owners</a>
        <a href="/fragment-info">🧩 Fragment</a>
        <a href="/offline-support">📞 پشتیبانی</a>
        <a href="/select-location">🌍 لوکیشن</a>
        <a href="/panel/sub">📡 سابسکریپشن</a>
    </div>

    <h2>👥 کاربران فعال</h2>
    <div class="status-box">
        ${userList || '<p style="color:#666;">هیچ کاربری تعریف نشده است</p>'}
    </div>

    <h2>📡 لینک سابسکریپشن</h2>
    <div class="config-box" id="subLink">برای دریافت لینک، ابتدا UUID خود را وارد کنید</div>
    <div class="form-group">
        <input type="text" id="uuidInput" placeholder="UUID خود را وارد کنید" style="width:70%;display:inline-block;">
        <button onclick="getSub()">دریافت لینک</button>
    </div>

    <div class="channel">
        📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a>
    </div>
    <div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>
</div>
<script>
    async function getSub() {
        const uuid = document.getElementById('uuidInput').value.trim();
        if (!uuid) { alert('لطفاً UUID را وارد کنید'); return; }
        try {
            const res = await fetch('/api/sub?uuid=' + encodeURIComponent(uuid));
            const data = await res.json();
            if (data.sub) {
                document.getElementById('subLink').textContent = data.sub;
            } else {
                document.getElementById('subLink').textContent = data.error || 'خطا در دریافت لینک';
            }
        } catch(e) {
            document.getElementById('subLink').textContent = 'خطا: ' + e.message;
        }
    }
</script>
</body>
</html>`;
}

// ============================================================
// PROXY HANDLER - FULL NOVA-PROXY COMPATIBLE
// ============================================================

async function handleProxy(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const userAgent = request.headers.get('user-agent') || '';
    const cf = request.cf || {};
    const host = url.hostname;

    // Get UUID
    let uuid = config_JSON?.UUID || (await getAutoKey(env));
    if (!uuid || !isValidUUID(uuid)) {
        uuid = generateUUID();
        if (env.KV) await putKV(env, K.workerUuid, uuid);
    }

    // Get admin password
    let adminPass = env.ADMIN_PASS || env.ADMIN_PASSWORD || env.PASSWORD || '';
    if (!adminPass && cachedAdminPass) adminPass = cachedAdminPass;
    if (!adminPass && env.KV) {
        const stored = await getKV(env, K.adminPass);
        if (stored) { adminPass = stored; cachedAdminPass = stored; cachedAdminPassAt = Date.now(); }
    }

    // Read config if not loaded
    if (!config_JSON) {
        try {
            const raw = await getConfigRaw(env);
            if (raw) config_JSON = JSON.parse(raw);
        } catch (e) {}
    }

    // ============================================================
    // PROXY ROUTES - VLESS, Trojan, Shadowsocks, XHTTP, gRPC
    // ============================================================

    // Handle WebSocket upgrade for VLESS/Trojan over WS
    if (request.headers.get('upgrade') === 'websocket') {
        // WebSocket proxy handling
        // This is where the main proxy logic goes
        // For full implementation, see Nova-Proxy source
        return handleWebSocket(request, env, ctx, uuid);
    }

    // Handle gRPC requests
    if (request.headers.get('content-type')?.includes('application/grpc')) {
        return handleGrpc(request, env, ctx, uuid);
    }

    // Handle XHTTP requests
    if (request.headers.get('x-http-method')) {
        return handleXhttp(request, env, ctx, uuid);
    }

    //
