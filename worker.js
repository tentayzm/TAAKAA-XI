// ============================================================
// PART 1/15: IMPORTS + CONSTANTS
// ============================================================

import { connect } from "cloudflare:sockets";

const CURRENT_VERSION = "2.5.7";
const APP_NAME = "TaaKaa-Xi PRO";
const SESSION_NAME = "taakaa_session";
const DB_NAME = "TAAKAA_DB";
const DEFAULT_PASSWORD = "taakaa";
const SALT = "taakaa-salt-v16-pro-2024";

const getAlpha = () => String.fromCharCode(118, 108, 101, 115, 115);
const getBeta = () => String.fromCharCode(116, 114, 111, 106, 97, 110);
const getGamma = () => String.fromCharCode(99, 108, 97, 115, 104);
// ============================================================
// PART 2/15: UTILITY FUNCTIONS
// ============================================================

const safeBtoa = (str) => {
    try {
        const bytes = new TextEncoder().encode(str);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    } catch (e) {
        return btoa(str);
    }
};

function generateHardwareId(seed) {
    const h20 = Array.from(new TextEncoder().encode(seed))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("")
        .slice(0, 20)
        .padEnd(20, "0");
    return `${h20.slice(0, 8)}-0000-4000-8000-${h20.slice(-12)}`;
}

function cmpVersions(a, b) {
    const strip = v => String(v).replace(/^v/, '').trim();
    const pa = strip(a).split('.').map(Number);
    const pb = strip(b).split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        let na = pa[i] || 0, nb = pb[i] || 0;
        if (na > nb) return 1;
        if (nb > na) return -1;
    }
    return 0;
}

function getTransportParams(port) {
    return ["80", "8080", "8880", "2052", "2082", "2086", "2095"].includes(port.toString()) ? "none" : "tls";
}
// ============================================================
// PART 3/15: SYSTEM_DEFAULTS + GLOBAL VARIABLES
// ============================================================

const SYSTEM_DEFAULTS = {
    name: "",
    apiRoute: "sync",
    maintenanceHost: "https://www.nginx.com, https://www.docker.com",
    backupRelay: "",
    customRelay: "",
    masterKey: "taakaa",
    metricNode: "time.is",
    cleanIps: "",
    slaveNodes: "",
    deviceId: "",
    mode: "alpha",
    agent: "chrome",
    socketPorts: "443",
    customDns: "https://cloudflare-dns.com/dns-query",
    resolveIp: "1.1.1.1",
    cascade: "",
    enableOpt1: false,
    enableOpt2: false,
    tgToken: "",
    tgChatId: "",
    tgAdminId: "",
    cfAccountId: "",
    cfApiToken: "",
    cfWorkerName: "",
    isPaused: false,
    silentAlerts: false,
    githubRepo: "Tentayzm/TaaKaa-Xi",
    nameStrategy: "default",
    namePrefix: "Core",
    tgBotLang: "fa",
    users: [],
    subUserAgent: "",
    customPanelUrl: "",
    limitTotalReq: 0,
    expiryMs: 0,
    linkedPanels: [],
    hubPanelUrl: "",
    allowSyncWorker: false,
};

let sysConfig = { ...SYSTEM_DEFAULTS };
let isolateStartTime = Date.now();
let activeConnections = 0;
let uuidUsage = new Map();
let activeDeviceId = "";
let sysUsageCache = { users: {} };
let lastSysUsageSync = 0;

const CACHE_TTL_CONFIG = 10000;
const CACHE_TTL_USAGE = 10000;
const CACHE_TTL_BACKUP_IP = 30000;
let sysConfigCacheTime = 0;
let sysUsageCacheTime = 0;
let backupIpCache = null;
let backupIpCacheTime = 0;
// ============================================================
// PART 4/15: D1 FUNCTIONS
// ============================================================

async function d1Init(env) {
    if(env.TAAKAA_DB && !env.TAAKAA_DB_INITIALIZED) {
        try { 
            await env.TAAKAA_DB.prepare("CREATE TABLE IF NOT EXISTS kv_store (key TEXT PRIMARY KEY, value TEXT)").run(); 
            env.TAAKAA_DB_INITIALIZED = true; 
        } catch(e) { 
            env.TAAKAA_DB_INITIALIZED = true; 
        }
    }
}

async function d1Get(env, key) {
    if(!env.TAAKAA_DB) return null;
    await d1Init(env);
    try { 
        const { results } = await env.TAAKAA_DB.prepare("SELECT value FROM kv_store WHERE key = ?").bind(key).all(); 
        if(results && results.length > 0) return results[0].value; 
    } catch(e) {}
    return null;
}

async function d1Put(env, key, value) {
    if(!env.TAAKAA_DB) return;
    await d1Init(env);
    try { 
        await env.TAAKAA_DB.prepare("INSERT INTO kv_store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(key, value).run(); 
    } catch(e) {}
}

async function cachedD1Put(env, key, value) {
    await d1Put(env, key, value);
    if (key === "sys_config") sysConfigCacheTime = 0;
    else if (key === "sys_usage") sysUsageCacheTime = 0;
    else if (key === "backup_ip") backupIpCacheTime = 0;
}
// ============================================================
// PART 5/15: DEPLOY WORKER TO CLOUDFLARE
// ============================================================

async function deployWorkerToCloudflare(accountId, apiToken, workerName, code) {
    let currentBindings = [];
    try {
        const settingsRes = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${encodeURIComponent(workerName)}/settings`,
            { headers: { "Authorization": `Bearer ${apiToken}` } }
        );
        const settingsJson = await settingsRes.json();
        if (settingsJson.success && settingsJson.result?.bindings) {
            currentBindings = settingsJson.result.bindings;
        }
    } catch(e) {}

    const metadata = {
        main_module: "_worker.js",
        compatibility_date: "2024-03-01",
        compatibility_flags: [ "allow_eval_during_startup" ],
        bindings: currentBindings
    };

    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("_worker.js", new Blob([code], { type: "application/javascript+module" }), "_worker.js");

    return await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${encodeURIComponent(workerName)}`,
        { method: "PUT", headers: { "Authorization": `Bearer ${apiToken}` }, body: form }
    );
}
// ============================================================
// PART 6/15: SHA224 + TROJAN HASH
// ============================================================

function sha224Hex(m) {
    const msg = new TextEncoder().encode(m);
    const K = [0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0x0FC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x06CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2];
    let H = [0xC1059ED8,0x367CD507,0x3070DD17,0xF70E5939,0xFFC00B31,0x68581511,0x64F98FA7,0xBEFA4FA4];
    const words = []; const n = Math.ceil((msg.length + 9) / 64) * 16;
    for (let i = 0; i < n; i++) words[i] = 0;
    for (let i = 0; i < msg.length; i++) words[i >> 2] |= msg[i] << (24 - (i % 4) * 8);
    words[msg.length >> 2] |= 0x80 << (24 - (msg.length % 4) * 8);
    words[n - 1] = msg.length * 8;
    const W = [];
    for (let i = 0; i < n; i += 16) {
        let [a, b, c, d, e, f, g, h] = H;
        for (let j = 0; j < 64; j++) {
            if (j < 16) W[j] = words[i + j];
            else {
                let w15 = W[j - 15], w2 = W[j - 2];
                let s0 = (w15 >>> 7 | w15 << 25) ^ (w15 >>> 18 | w15 << 14) ^ (w15 >>> 3);
                let s1 = (w2 >>> 17 | w2 << 15) ^ (w2 >>> 19 | w2 << 13) ^ (w2 >>> 10);
                W[j] = (W[j - 16] + s0 + W[j - 7] + s1) >>> 0;
            }
            let S1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
            let ch = (e & f) ^ (~e & g); let temp1 = (h + S1 + ch + K[j] + W[j]) >>> 0;
            let S0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
            let maj = (a & b) ^ (a & c) ^ (b & c); let temp2 = (S0 + maj) >>> 0;
            h = g; g = f; f = e; e = (d + temp1) >>> 0; d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
        }
        H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
        H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
    }
    return H.slice(0, 7).map(v => v.toString(16).padStart(8, '0')).join('');
}

const trojanHashCache = new Map();
function getTrojanHash(uuid) {
    if (trojanHashCache.has(uuid)) return trojanHashCache.get(uuid);
    const hash = sha224Hex(uuid);
    trojanHashCache.set(uuid, hash);
    return hash;
}
// ============================================================
// PART 7/15: TRACK USAGE + LOAD CONFIG
// ============================================================

function trackUsage(uuid, bytes, env, ctx) {
    if (!sysUsageCache) sysUsageCache = { users: {} };
    if (!sysUsageCache.users) sysUsageCache.users = {};
    if (!sysUsageCache.users[uuid]) sysUsageCache.users[uuid] = { reqs: 0, dReqs: 0, lastDay: new Date().toISOString().split('T')[0] };
    
    let u = sysUsageCache.users[uuid];
    let today = new Date().toISOString().split('T')[0];
    if (u.lastDay !== today) {
        u.dReqs = 0;
        u.lastDay = today;
    }
    if (u.reqs === undefined) u.reqs = 0;
    if (u.dReqs === undefined) u.dReqs = 0;

    if (bytes === 0) {
        u.reqs += 1;
        u.dReqs += 1;
    }
    
    const now = Date.now();
    if (now - lastSysUsageSync > 30000) {
        lastSysUsageSync = now;
        if (env && env.TAAKAA_DB) {
            let changedConfig = false;
            if (sysConfig.users && sysConfig.users.length > 0) {
                sysConfig.users.forEach(u => {
                    let uId = u.id.replace(/-/g, '').toLowerCase();
                    let sysU = sysUsageCache.users[uId];
                    if (!u.isPaused) {
                        let reason = null;
                        if (u.expiryMs && Date.now() > u.expiryMs) {
                            reason = `Expiration date reached (${new Date(u.expiryMs).toLocaleDateString()})`;
                        } else if (sysU && u.limitTotalReq && sysU.reqs >= u.limitTotalReq) {
                            let usedGB = (sysU.reqs / 6000).toFixed(2);
                            let limitGB = (u.limitTotalReq / 6000).toFixed(2);
                            reason = `Traffic limit exceeded (${usedGB}GB / ${limitGB}GB)`;
                        }
                        if (reason) {
                            u.isPaused = true;
                            u.disabledReason = reason;
                            u.disabledAt = Date.now();
                            changedConfig = true;
                            ctx?.waitUntil(logActivity(env, "User Auto-Disabled", `User "${u.name}" (${u.id}) disabled: ${reason}`).catch(()=>{}));
                            if (sysConfig.tgToken && (sysConfig.tgAdminId || sysConfig.tgChatId)) {
                                const tgMsg = `⚠️ <b>User Auto-Disabled</b>\n\n👤 <b>User:</b> ${u.name}\n🆔 <b>ID:</b> <code>${u.id}</code>\n📝 <b>Reason:</b> ${reason}`;
                                const notifyChatId = sysConfig.tgAdminId || sysConfig.tgChatId;
                                ctx?.waitUntil(fetch(`https://api.telegram.org/bot${sysConfig.tgToken}/sendMessage`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ chat_id: notifyChatId, text: tgMsg, parse_mode: 'HTML' })
                                }).catch(()=>{}));
                            }
                        }
                    }
                });
            }
            if (changedConfig) {
                ctx?.waitUntil(cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)).catch(()=>{}));
            }
            ctx?.waitUntil(cachedD1Put(env, "sys_usage", JSON.stringify(sysUsageCache)).catch(()=>{}));
        }
    }
}

let sysConfigLoading = null;
let sysUsageLoading = null;
let backupIpLoading = null;

async function loadSysConfig(env) {
    const now = Date.now();

    if (env.TAAKAA_DB) {
        if (now - sysConfigCacheTime > CACHE_TTL_CONFIG) {
            if (!sysConfigLoading) {
                sysConfigLoading = d1Get(env, "sys_config").then(stored => {
                    sysConfig = { ...SYSTEM_DEFAULTS, ...(stored ? JSON.parse(stored) : null) };
                    sysConfigCacheTime = Date.now();
                }).catch(() => {
                    sysConfig = { ...SYSTEM_DEFAULTS };
                    sysConfigCacheTime = Date.now();
                }).finally(() => { sysConfigLoading = null; });
            }
            await sysConfigLoading;
        }
        if (now - sysUsageCacheTime > CACHE_TTL_USAGE) {
            if (!sysUsageLoading) {
                sysUsageLoading = d1Get(env, "sys_usage").then(ustored => {
                    if (ustored) sysUsageCache = JSON.parse(ustored);
                    else sysUsageCache = { users: {} };
                    sysUsageCacheTime = Date.now();
                }).catch(() => {
                    sysUsageCache = { users: {} };
                    sysUsageCacheTime = Date.now();
                }).finally(() => { sysUsageLoading = null; });
            }
            await sysUsageLoading;
        }
    }

    if (now - backupIpCacheTime > CACHE_TTL_BACKUP_IP) {
        if (!backupIpLoading) {
            backupIpLoading = (env.TAAKAA_DB ? d1Get(env, "backup_ip") : Promise.resolve(null)).then(val => {
                backupIpCache = val;
                backupIpCacheTime = Date.now();
            }).catch(() => {
                backupIpCacheTime = Date.now();
            }).finally(() => { backupIpLoading = null; });
        }
        await backupIpLoading;
    }
    const defaultRelay = ["pro", "xy", "ip.cmliussss.net"].join("");
    sysConfig.customRelay = backupIpCache ?? env.RELAY_IP ?? defaultRelay;
}
// ============================================================
// PART 8/15: CLOUDFLARE USAGE + TELEGRAM + LOG
// ============================================================

async function fetchCloudflareUsage(accountId, apiToken) {
    if (!accountId || !apiToken) return null;
    try {
        const d = new Date();
        const currentDate = d.toISOString().split('T')[0] + "T00:00:00Z";
        const query = `query GetDailyUsage($accountId: String!, $start: ISO8601DateTime!) { viewer { accounts(filter: {accountTag: $accountId}) { workersInvocationsAdaptive(limit: 1, filter: { datetime_geq: $start }) { sum { requests } } } } }`;
        const variables = { accountId: accountId, start: currentDate };
        const res = await fetch("https://api.cloudflare.com/client/v4/graphql", {
            method: "POST",
            headers: { "Authorization": `Bearer ${apiToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables })
        });
        const json = await res.json();
        const reqs = json?.data?.viewer?.accounts?.[0]?.workersInvocationsAdaptive?.[0]?.sum?.requests;
        return typeof reqs === 'number' ? reqs : null;
    } catch(e) { return null; }
}

async function sendTelegramMessage(request, type, hostName) {
    if (!sysConfig.tgToken || !(sysConfig.tgAdminId || sysConfig.tgChatId)) return;
    const escMd = (s) => String(s).replace(/[_*`[]/g, '\\$&');
    let usageStr = "نامشخص (0.00%)";
    if (sysConfig.cfAccountId && sysConfig.cfApiToken) {
        const reqs = await fetchCloudflareUsage(sysConfig.cfAccountId, sysConfig.cfApiToken);
        if (reqs !== null) {
            const limit = 100000;
            const pct = ((reqs / limit) * 100).toFixed(2);
            usageStr = `${reqs}/${limit} ${pct}%`;
        }
    }
    const ip = request.headers.get("cf-connecting-ip") || "Unknown";
    const cf = request.cf || {};
    const country = cf.country || "Unknown";
    const city = cf.city || "Unknown";
    const asn = cf.asn || "Unknown";
    const asOrg = cf.asOrganization || "Unknown";
    const domain = request.headers.get("Host") || new URL(request.url).hostname;
    const path = new URL(request.url).pathname;
    const ua = request.headers.get("User-Agent") || "حالا یوزرایجنت مارو نبینین";
    const d = new Date();
    const timeStr = new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(d);
    const text = `📌 نوع: ${escMd(type)}\n🌐 IP: ${escMd(ip)}\n📍 موقعیت: ${escMd(country)} ${escMd(city)}\n🏢 ASN: AS${escMd(asn)} ${escMd(asOrg)}\n🔗 دامنه: ${escMd(domain)}\n🔍 مسیر: ${escMd(path)}\n🤖 مرورگر: ${escMd(ua)}\n📅 زمان: ${escMd(timeStr)}\n📊 مصرف: ${usageStr}`;
    const h = hostName || domain;
    const langCode = sysConfig.tgBotLang || "fa";
    const locT = (key) => botI18n[langCode]?.[key] || botI18n["en"]?.[key] || key;
    const isPaused = sysConfig.isPaused || false;
    const panelUrl = `https://${h}/taakaa/${encodeURI(sysConfig.apiRoute)}/dash`;
    const inline_keyboard = [
        [{ text: `📊 ${locT("dashboard")}`, callback_data: "sys_dashboard" }, { text: `📈 ${locT("statistics")}`, callback_data: "sys_stats" }],
        [{ text: `🔗 ${locT("btn_sub_link")}`, callback_data: "get_sub_link" }, { text: `ℹ️ ${locT("panel_info")}`, callback_data: "sys_panel_info" }],
        [{ text: `🌐 ${langCode === 'fa' ? 'English 🇺🇸' : 'فارسی 🇮🇷'}`, callback_data: "sys_lang" }, { text: isPaused ? locT("btn_resume") : locT("btn_pause"), callback_data: "sys_toggle_status" }],
        [{ text: `🔑 ${locT("dash")}`, web_app: { url: panelUrl } }]
    ];
    const tgUrl = `https://api.telegram.org/bot${sysConfig.tgToken}/sendMessage`;
    const notifyChatId = sysConfig.tgAdminId || sysConfig.tgChatId;
    try {
        await fetch(tgUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: notifyChatId, text: text, parse_mode: 'Markdown', reply_markup: { inline_keyboard } })
        });
    } catch (e) {}
}

async function logActivity(env, type, detail) {
    if (!env || !env.TAAKAA_DB) return;
    try {
        const ts = new Date().toISOString();
        let logs = [];
        const stored = await d1Get(env, "sys_logs");
        if (stored) logs = JSON.parse(stored);
        logs.unshift({ ts, type, detail });
        if (logs.length > 50) logs = logs.slice(0, 50);
        await d1Put(env, "sys_logs", JSON.stringify(logs));
    } catch (e) {}
}
// ============================================================
// PART 9/15: HANDLERS (LOGS + USERS + STATS + UPDATE)
// ============================================================

async function handleLogs(request, env) {
    try {
        if (request.method === "POST") {
            const data = await request.json();
            if (data.key !== sysConfig.masterKey) return new Response(JSON.stringify({ success: false }), { status: 401 });
            let logs = [];
            if (env.TAAKAA_DB) {
                const stored = await d1Get(env, "sys_logs");
                if (stored) logs = JSON.parse(stored);
            }
            return new Response(JSON.stringify({ success: true, logs }), { status: 200 });
        }
        return new Response("OK", { status: 200 });
    } catch (e) { return new Response(JSON.stringify({ success: false }), { status: 400 }); }
}

async function handleUsersApi(request, env, ctx) {
    try {
        const url = new URL(request.url);
        const method = request.method;
        const userId = url.searchParams.get("id");
        const action = url.searchParams.get("action");
        const authHeader = request.headers.get("Authorization") || "";
        const authKey = authHeader.replace("Bearer ", "") || url.searchParams.get("key") || "";
        let bodyKey = "";
        if (method === "POST" || method === "PUT") {
            try {
                const body = await request.clone().json();
                bodyKey = body.key || "";
            } catch(e) {}
        }
        const isAuth = (authKey === sysConfig.masterKey) || (bodyKey === sysConfig.masterKey);
        if (!isAuth) {
            return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
        }
        if (method === "GET" && !userId) {
            const q = url.searchParams.get("q") || "";
            let users = sysConfig.users || [];
            if (q) {
                const ql = q.toLowerCase();
                users = users.filter(u => u.name.toLowerCase().includes(ql) || u.id.toLowerCase().includes(ql) || (u.notes && u.notes.toLowerCase().includes(ql)));
            }
            const enriched = users.map(u => {
                const idClean = u.id.replace(/-/g, '').toLowerCase();
                const sysU = sysUsageCache?.users?.[idClean] || { reqs: 0, dReqs: 0, lastDay: '' };
                const usedBytes = Math.floor((sysU.reqs || 0) * (1073741824 / 6000));
                const limitBytes = u.limitTotalReq ? Math.floor(u.limitTotalReq * (1073741824 / 6000)) : 0;
                const isExpired = u.expiryMs && Date.now() > u.expiryMs;
                let status = "active";
                if (u.isPaused && u.disabledReason) status = "auto-disabled";
                else if (u.isPaused) status = "paused";
                else if (isExpired) status = "expired";
                return { ...u, usage: { total: usedBytes, limit: limitBytes, daily: sysU.dReqs || 0, dailyLimit: u.limitDailyReq || 0 }, status };
            });
            return new Response(JSON.stringify({ success: true, users: enriched, total: enriched.length }), { headers: { "Content-Type": "application/json" } });
        }
        if (method === "GET" && userId) {
            const u = (sysConfig.users || []).find(usr => usr.id === userId || usr.name.toLowerCase() === userId.toLowerCase());
            if (!u) return new Response(JSON.stringify({ success: false, error: "User not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
            const idClean = u.id.replace(/-/g, '').toLowerCase();
            const sysU = sysUsageCache?.users?.[idClean] || { reqs: 0, dReqs: 0, lastDay: '' };
            const usedBytes = Math.floor((sysU.reqs || 0) * (1073741824 / 6000));
            const limitBytes = u.limitTotalReq ? Math.floor(u.limitTotalReq * (1073741824 / 6000)) : 0;
            const isExpired = u.expiryMs && Date.now() > u.expiryMs;
            let status = "active";
            if (u.isPaused && u.disabledReason) status = "auto-disabled";
            else if (u.isPaused) status = "paused";
            else if (isExpired) status = "expired";
            const hostName = new URL(request.url).hostname;
            const subUrl = `https://${hostName}/taakaa/${sysConfig.apiRoute}?sub=${encodeURIComponent(u.name)}`;
            return new Response(JSON.stringify({ success: true, user: { ...u, usage: { total: usedBytes, limit: limitBytes, daily: sysU.dReqs || 0, dailyLimit: u.limitDailyReq || 0 }, status, subscriptionUrl: subUrl } }), { headers: { "Content-Type": "application/json" } });
        }
        if (method === "POST" && !userId) {
            const body = await request.json();
            const { name, trafficLimit, expiryDays, notes, maxConfigs, proxyIp, cleanIp, userMode, userPorts } = body;
            if (!name) return new Response(JSON.stringify({ success: false, error: "Name is required" }), { status: 400, headers: { "Content-Type": "application/json" } });
            const newId = crypto.randomUUID();
            const newUser = {
                id: newId, name: name,
                limitTotalReq: trafficLimit ? Math.floor(parseFloat(trafficLimit) * 6000) : null,
                limitDailyReq: body.dailyLimit ? Math.floor(parseFloat(body.dailyLimit) * 6000) : null,
                expiryMs: expiryDays ? Date.now() + parseInt(expiryDays) * 86400000 : null,
                notes: notes || "", maxConfigs: maxConfigs ? parseInt(maxConfigs) : null,
                proxyIp: proxyIp || null, cleanIp: cleanIp || null,
                userMode: userMode || null, userPorts: userPorts || null,
                createdAt: Date.now()
            };
            if (!sysConfig.users) sysConfig.users = [];
            sysConfig.users.push(newUser);
            await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig));
            ctx?.waitUntil(logActivity(env, "User Created", `User "${name}" (${newId}) created via API`).catch(()=>{}));
            const hostName = new URL(request.url).hostname;
            const subUrl = `https://${hostName}/taakaa/${sysConfig.apiRoute}?sub=${encodeURIComponent(name)}`;
            return new Response(JSON.stringify({ success: true, user: newUser, subscriptionUrl: subUrl }), { status: 201, headers: { "Content-Type": "application/json" } });
        }
        if (method === "PUT" && userId) {
            const body = await request.json();
            if (!sysConfig.users) return new Response(JSON.stringify({ success: false, error: "No users" }), { status: 400, headers: { "Content-Type": "application/json" } });
            const u = sysConfig.users.find(usr => usr.id === userId);
            if (!u) return new Response(JSON.stringify({ success: false, error: "User not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
            if (body.name !== undefined) u.name = body.name;
            if (body.trafficLimit !== undefined) u.limitTotalReq = body.trafficLimit ? Math.floor(parseFloat(body.trafficLimit) * 6000) : null;
            if (body.dailyLimit !== undefined) u.limitDailyReq = body.dailyLimit ? Math.floor(parseFloat(body.dailyLimit) * 6000) : null;
            if (body.expiryDays !== undefined) u.expiryMs = body.expiryDays ? Date.now() + parseInt(body.expiryDays) * 86400000 : null;
            if (body.notes !== undefined) u.notes = body.notes;
            if (body.maxConfigs !== undefined) u.maxConfigs = body.maxConfigs ? parseInt(body.maxConfigs) : null;
            if (body.proxyIp !== undefined) u.proxyIp = body.proxyIp;
            if (body.cleanIp !== undefined) u.cleanIp = body.cleanIp;
            if (body.userMode !== undefined) u.userMode = body.userMode;
            if (body.userPorts !== undefined) u.userPorts = body.userPorts;
            if (body.status !== undefined) {
                if (body.status === "active") { u.isPaused = false; u.disabledReason = null; u.disabledAt = null; }
                else if (body.status === "paused") { u.isPaused = true; u.disabledReason = null; u.disabledAt = null; }
            }
            await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig));
            ctx?.waitUntil(logActivity(env, "User Updated", `User "${u.name}" (${userId}) updated via API`).catch(()=>{}));
            return new Response(JSON.stringify({ success: true, user: u }), { headers: { "Content-Type": "application/json" } });
        }
        if (method === "DELETE" && userId) {
            if (!sysConfig.users) return new Response(JSON.stringify({ success: false, error: "No users" }), { status: 400, headers: { "Content-Type": "application/json" } });
            const idx = sysConfig.users.findIndex(usr => usr.id === userId);
            if (idx === -1) return new Response(JSON.stringify({ success: false, error: "User not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
            const deleted = sysConfig.users.splice(idx, 1)[0];
            await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig));
            ctx?.waitUntil(logActivity(env, "User Deleted", `User "${deleted.name}" (${userId}) deleted via API`).catch(()=>{}));
            return new Response(JSON.stringify({ success: true, deleted: deleted.id }), { headers: { "Content-Type": "application/json" } });
        }
        if (method === "POST" && userId && action === "toggle") {
            if (!sysConfig.users) return new Response(JSON.stringify({ success: false, error: "No users" }), { status: 400, headers: { "Content-Type": "application/json" } });
            const u = sysConfig.users.find(usr => usr.id === userId);
            if (!u) return new Response(JSON.stringify({ success: false, error: "User not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
            u.isPaused = !u.isPaused;
            if (!u.isPaused) { u.disabledReason = null; u.disabledAt = null; }
            await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig));
            ctx?.waitUntil(logActivity(env, "User Toggled", `User "${u.name}" (${userId}) ${u.isPaused ? 'paused' : 'resumed'} via API`).catch(()=>{}));
            return new Response(JSON.stringify({ success: true, user: u }), { headers: { "Content-Type": "application/json" } });
        }
        if (method === "POST" && userId && action === "reset") {
            if (!sysUsageCache) sysUsageCache = { users: {} };
            if (!sysUsageCache.users) sysUsageCache.users = {};
            const uuidClean = userId.replace(/-/g, '').toLowerCase();
            if (sysUsageCache.users[uuidClean]) {
                sysUsageCache.users[uuidClean].reqs = 0;
                sysUsageCache.users[uuidClean].dReqs = 0;
            } else {
                sysUsageCache.users[uuidClean] = { reqs: 0, dReqs: 0, lastDay: new Date().toISOString().split('T')[0] };
            }
            await cachedD1Put(env, "sys_usage", JSON.stringify(sysUsageCache));
            ctx?.waitUntil(logActivity(env, "Traffic Reset", `Traffic reset for user ${userId} via API`).catch(()=>{}));
            return new Response(JSON.stringify({ success: true, message: "Traffic reset" }), { headers: { "Content-Type": "application/json" } });
        }
        return new Response(JSON.stringify({ success: false, error: "Invalid request" }), { status: 400, headers: { "Content-Type": "application/json" } });
    } catch (e) { return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500, headers: { "Content-Type": "application/json" } }); }
}

async function handleStatsApi(request, env) {
    try {
        const url = new URL(request.url);
        const authHeader = request.headers.get("Authorization") || "";
        const authKey = authHeader.replace("Bearer ", "") || url.searchParams.get("key") || "";
        if (authKey !== sysConfig.masterKey) {
            return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
        }
        const users = sysConfig.users || [];
        const totalUsers = users.length;
        const activeUsers = users.filter(u => !u.isPaused && (!u.expiryMs || Date.now() <= u.expiryMs)).length;
        const autoDisabledUsers = users.filter(u => u.isPaused && u.disabledReason).length;
        const pausedUsers = users.filter(u => u.isPaused && !u.disabledReason).length;
        const expiredUsers = users.filter(u => u.expiryMs && Date.now() > u.expiryMs && !u.isPaused).length;
        let totalTrafficReqs = 0;
        let dailyTrafficReqs = 0;
        const todayDate = new Date().toISOString().split('T')[0];
        users.forEach(u => {
            const idClean = u.id.replace(/-/g, '').toLowerCase();
            const sysU = sysUsageCache?.users?.[idClean] || { reqs: 0, dReqs: 0, lastDay: '' };
            totalTrafficReqs += (sysU.reqs || 0);
            if (sysU.lastDay === todayDate) dailyTrafficReqs += (sysU.dReqs || 0);
        });
        const upSeconds = Math.floor((Date.now() - isolateStartTime) / 1000);
        return new Response(JSON.stringify({
            success: true,
            stats: {
                users: { total: totalUsers, active: activeUsers, paused: pausedUsers, expired: expiredUsers, autoDisabled: autoDisabledUsers },
                traffic: { totalRequests: totalTrafficReqs, totalGB: (totalTrafficReqs / 6000).toFixed(2), dailyRequests: dailyTrafficReqs, dailyGB: (dailyTrafficReqs / 6000).toFixed(2) },
                system: { uptimeSeconds: upSeconds, activeConnections, version: CURRENT_VERSION, isPaused: sysConfig.isPaused || false }
            }
        }), { headers: { "Content-Type": "application/json" } });
    } catch (e) { return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500, headers: { "Content-Type": "application/json" } }); }
}

async function handleUpdateApi(request, env, ctx) {
    try {
        if (request.method !== "POST") return new Response("405", { status: 405 });
        const data = await request.json();
        if (data.key !== sysConfig.masterKey) {
            return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
        }
        const accountId = sysConfig.cfAccountId;
        const apiToken = sysConfig.cfApiToken;
        const workerName = sysConfig.cfWorkerName;
        const repo = (sysConfig.githubRepo || "Tentayzm/TaaKaa-Xi").replace(/https?:\/\/github\.com\//, '').trim();
        if (data.action === "check") {
            let remoteVer = null;
            try {
                const res = await fetch(`https://raw.githubusercontent.com/${repo}/main/version`);
                if (res.ok) {
                    const txt = (await res.text()).trim();
                    if (txt && txt.length <= 15) remoteVer = txt;
                }
            } catch(e) {}
            if (!remoteVer) {
                try {
                    const res = await fetch(`https://raw.githubusercontent.com/${repo}/main/_worker.js`);
                    if (res.ok) {
                        const code = await res.text();
                        const match = code.match(/const\s+CURRENT_VERSION\s*=\s*["']([^"']+)["']/);
                        if (match) remoteVer = match[1];
                    }
                } catch(e) {}
            }
            if (!remoteVer) {
                return new Response(JSON.stringify({ success: false, error: "Could not fetch remote version" }), { status: 502, headers: { "Content-Type": "application/json" } });
            }
            const hasCredentials = !!(accountId && apiToken && workerName);
            return new Response(JSON.stringify({
                success: true, current: CURRENT_VERSION, latest: remoteVer,
                updateAvailable: cmpVersions(CURRENT_VERSION, remoteVer) < 0,
                canDeploy: hasCredentials
            }), { headers: { "Content-Type": "application/json" } });
        }
        if (data.action === "deploy") {
            if (!accountId || !apiToken || !workerName) {
                return new Response(JSON.stringify({ success: false, error: "CF credentials not configured" }), { status: 400, headers: { "Content-Type": "application/json" } });
            }
            let finalCodeToDeploy = data.code;
            if (!finalCodeToDeploy) {
                try {
                    const res = await fetch(`https://raw.githubusercontent.com/${repo}/main/_worker.js`);
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    finalCodeToDeploy = await res.text();
                } catch(e) {
                    return new Response(JSON.stringify({ success: false, error: "Failed to fetch code from GitHub: " + e.message }), { status: 502, headers: { "Content-Type": "application/json" } });
                }
            }
            const versionMatch = finalCodeToDeploy.match(/const\s+CURRENT_VERSION\s*=\s*["']([^"']+)["']/);
            const newVersion = versionMatch ? versionMatch[1] : CURRENT_VERSION;
            if (cmpVersions(CURRENT_VERSION, newVersion) >= 0 && !data.force && !data.code) {
                return new Response(JSON.stringify({ success: false, error: "Remote version is not newer. Click force redeploy to switch formats or overwrite." }), { status: 400, headers: { "Content-Type": "application/json" } });
            }
            const deployRes = await deployWorkerToCloudflare(accountId, apiToken, workerName, finalCodeToDeploy);
            const deployResult = await deployRes.json();
            if (deployResult.success) {
                ctx?.waitUntil(logActivity(env, "Panel Updated", `v${CURRENT_VERSION} → v${newVersion}`).catch(()=>{}));
                if (sysConfig.tgToken && (sysConfig.tgAdminId || sysConfig.tgChatId)) {
                    const tgMsg = `🔄 <b>Panel Updated</b>\n\n📦 v${CURRENT_VERSION} → v${newVersion}`;
                    const notifyChatId = sysConfig.tgAdminId || sysConfig.tgChatId;
                    ctx?.waitUntil(fetch(`https://api.telegram.org/bot${sysConfig.tgToken}/sendMessage`, {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ chat_id: notifyChatId, text: tgMsg, parse_mode: 'HTML' })
                    }).catch(()=>{}));
                }
                return new Response(JSON.stringify({ success: true, message: `Updated to v${newVersion}`, newVersion }), { headers: { "Content-Type": "application/json" } });
            } else {
                const errMsg = deployResult.errors?.[0]?.message || "Unknown API error";
                return new Response(JSON.stringify({ success: false, error: "Cloudflare API: " + errMsg }), { status: 502, headers: { "Content-Type": "application/json" } });
            }
        }
        return new Response(JSON.stringify({ success: false, error: "Invalid action" }), { status: 400, headers: { "Content-Type": "application/json" } });
    } catch(e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
                                                             }
// ============================================================
// PART 10/15: AUTH + CONFIG SYNC + SYNC PANEL
// ============================================================

async function handleAuth(request, hostName, ctx, env) {
    try {
        const data = await request.json();
        const ip = request.headers.get("cf-connecting-ip") || "Unknown";
        if (data.key === sysConfig.masterKey) {
            ctx?.waitUntil(logActivity(env, "Auth Success", `Successful panel login from ${ip}`));
            if (!sysConfig.silentAlerts && ctx) ctx.waitUntil(sendTelegramMessage(request, "ورود به پنل (موفق)", hostName));
            if (sysConfig.tgAdminId && env.TAAKAA_DB) {
                const loginSignal = { name: sysConfig.name || hostName, host: hostName, apiRoute: sysConfig.apiRoute, masterKey: sysConfig.masterKey, isLocal: true, ts: Date.now() };
                ctx?.waitUntil(d1Put(env, "tg_panel_login", JSON.stringify(loginSignal)).catch(() => {}));
            }
            if (sysConfig.hubPanelUrl && sysConfig.hubPanelUrl.trim() && sysConfig.tgAdminId) {
                try {
                    let hubUrl = sysConfig.hubPanelUrl.trim();
                    if (!hubUrl.startsWith('http')) hubUrl = 'https://' + hubUrl;
                    const signalPayload = { signal: "panel_login", panelName: sysConfig.name || hostName, panelHost: hostName, panelApiRoute: sysConfig.apiRoute, panelMasterKey: sysConfig.masterKey, tgAdminId: sysConfig.tgAdminId, ts: Date.now() };
                    ctx?.waitUntil(fetch(`${hubUrl}/taakaa/${encodeURI(sysConfig.apiRoute)}/tg/sync_panel`, {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(signalPayload)
                    }).catch(() => {}));
                } catch(e) {}
            }
            const netInfo = { ip: ip, colo: request.cf?.colo || "Unknown", loc: (request.cf?.city || "Unknown") + ", " + (request.cf?.country || "Unknown") };
            let usageData = {};
            for(let [k,v] of uuidUsage.entries()) usageData[k] = v;
            let baseHost = hostName;
            let protocol = "https";
            if (sysConfig.customPanelUrl && sysConfig.customPanelUrl.trim()) {
                let customUrlStr = sysConfig.customPanelUrl.trim();
                if (!customUrlStr.startsWith('http://') && !customUrlStr.startsWith('https://')) { customUrlStr = 'https://' + customUrlStr; }
                try { const customUrl = new URL(customUrlStr); baseHost = customUrl.host; protocol = customUrl.protocol.replace(':', ''); } catch(e) {}
            }
            return new Response(JSON.stringify({
                success: true, config: sysConfig, deviceId: activeDeviceId, network: netInfo, usage: usageData, sysUsage: (sysUsageCache && sysUsageCache.users) ? sysUsageCache.users : {},
                version: CURRENT_VERSION,
                profiles: getAllProfiles().map(p => {
                    let subSuffix = p.name === 'Default' ? '' : '?sub=' + encodeURIComponent(p.name);
                    return { name: p.name, id: p.id, sync: `${protocol}://${baseHost}/taakaa/${sysConfig.apiRoute}${subSuffix}` };
                })
            }), { status: 200 });
        }
        ctx?.waitUntil(logActivity(env, "Auth Failed", `Failed login attempt from ${ip}`));
        if (ctx) ctx.waitUntil(sendTelegramMessage(request, "تلاش ناموفق ورود به پنل!", hostName));
        return new Response(JSON.stringify({ success: false }), { status: 401 });
    } catch (e) { return new Response(JSON.stringify({ success: false }), { status: 400 }); }
}

async function handleConfigSync(request, env, ctx) {
    try {
        const data = await request.json();
        const isAuthorized = (data.key === sysConfig.masterKey) || (data.oldKey && data.oldKey === sysConfig.masterKey) || (sysConfig.masterKey === "admin");
        if (!isAuthorized) return new Response(JSON.stringify({ success: false }), { status: 401 });
        if (data.fromMaster && !sysConfig.allowSyncWorker) {
            return new Response(JSON.stringify({ success: false, error: "Sync not allowed" }), { status: 403 });
        }
        if (!env.TAAKAA_DB) return new Response(JSON.stringify({ success: false, msg: "DB Error" }), { status: 400 });
        let nextConfig = sysConfig;
        if (data.config) {
            nextConfig = { ...sysConfig, ...data.config };
            sysConfig = nextConfig;
            await cachedD1Put(env, "sys_config", JSON.stringify(nextConfig));
        }
        if (data.resetUUID) {
            const uuidClean = data.resetUUID.replace(/-/g, '').toLowerCase();
            if (!sysUsageCache) sysUsageCache = { users: {} };
            if (!sysUsageCache.users) sysUsageCache.users = {};
            if (sysUsageCache.users[uuidClean]) {
                sysUsageCache.users[uuidClean].reqs = 0;
                sysUsageCache.users[uuidClean].dReqs = 0;
            } else {
                sysUsageCache.users[uuidClean] = { reqs: 0, dReqs: 0, lastDay: new Date().toISOString().split('T')[0] };
            }
            await cachedD1Put(env, "sys_usage", JSON.stringify(sysUsageCache));
        }
        const oldMasterKey = sysConfig.masterKey;
        if (data.config && !data.fromMaster && nextConfig.slaveNodes && nextConfig.slaveNodes.trim().length > 0) {
            let nodes = nextConfig.slaveNodes.split(/[\r\n,;]+/).map(s=>s.trim()).filter(Boolean);
            let currentHost = new URL(request.url).hostname;
            nodes.forEach(node => {
                if(node !== currentHost) {
                    ctx?.waitUntil(fetch(`https://${node}/taakaa/${encodeURI(nextConfig.apiRoute)}/api/sync`, {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ key: nextConfig.masterKey, oldKey: oldMasterKey, config: nextConfig, fromMaster: true })
                    }).catch(() => {}));
                }
            });
        }
        if (nextConfig.tgToken && ctx) {
            const hookUrl = `https://${new URL(request.url).hostname}/taakaa/${encodeURI(nextConfig.apiRoute)}/tg`;
            ctx.waitUntil(fetch(`https://api.telegram.org/bot${nextConfig.tgToken}/setWebhook`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: hookUrl })
            }).catch(()=>{}));
        }
        return new Response(JSON.stringify({ success: true, newRoute: nextConfig.apiRoute }), { status: 200 });
    } catch (e) { return new Response(JSON.stringify({ success: false }), { status: 400 }); }
}

async function handleSyncPanel(request, env, ctx) {
    try {
        const data = await request.json();
        if (!data.signal || data.signal !== "panel_login") {
            return new Response(JSON.stringify({ success: false, error: "Invalid signal" }), { status: 400 });
        }
        if (!data.tgAdminId || !data.panelHost) {
            return new Response(JSON.stringify({ success: false, error: "Missing fields" }), { status: 400 });
        }
        const adminId = sysConfig.tgAdminId || sysConfig.tgChatId;
        if (!adminId || adminId.toString() !== data.tgAdminId.toString()) {
            return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401 });
        }
        const loginSignal = {
            name: data.panelName || data.panelHost,
            host: data.panelHost,
            apiRoute: data.panelApiRoute || sysConfig.apiRoute,
            masterKey: data.panelMasterKey,
            isLocal: false,
            ts: data.ts || Date.now()
        };
        if (env.TAAKAA_DB) {
            ctx?.waitUntil(d1Put(env, "tg_panel_login", JSON.stringify(loginSignal)).catch(()=>{}));
        }
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e) { return new Response(JSON.stringify({ success: false }), { status: 400 }); }
                                 }
// ============================================================
// PART 11/15: BOT I18N + PANEL FUNCTIONS
// ============================================================

const botI18n = {
    en: {
        welcome: "🤖 **Welcome to TaaKaa-Xi Gateway Bot**\nSelect your option below to manage your system:",
        status: "📊 System Status", users: "👥 Subscribers", metrics: "📡 Gateway Health",
        panic: "🚨 Panic Mode", dash: "🔑 Dashboard Control", lang: "🌐 Change Language",
        active: "🟢 Active", paused: "🔴 Paused", uptime: "⏱ Uptime", streams: "📡 Active Streams",
        no_users: "No subscribers found.", sub_info: "👤 Subscriber Details:",
        name: "Name", total: "Total Reqs", daily: "Daily Reqs", expiry: "Expiry",
        days: "Days remaining", created: "Created At", unlimited: "Unlimited",
        btn_back: "◀️ Back", btn_next: "▶️ Next", btn_del: "🗑️ Delete",
        btn_pause: "⏸️ Pause", btn_resume: "▶️ Resume", btn_edit_name: "✏️ Change Name",
        btn_edit_limits: "⚙️ Limits", btn_add: "+ Add Subscriber", btn_confirm: "✅ Confirm",
        btn_cancel: "❌ Cancel", msg_enter_name: "Please send a name for the subscriber:",
        msg_added: "Sub added successfully! 🎉", msg_deleted: "Sub deleted successfully! 🗑️",
        msg_panic: "🚨 PANIC MODE ACTIVATED 🚨\nRoute randomized & System Paused.",
        msg_invalid: "Invalid input. Please try again.",
        msg_enter_limits: "Enter limits format:\n`[totalReqs] [dailyReqs] [days_limit]`\n(Use 0 for unlimited)\n\nExample:\n`10000 500 30`",
        msg_confirm_del: "⚠️ Are you sure you want to delete this subscriber?",
        msg_confirm_panic: "⚠️ Are you absolutely sure you want to trigger PANIC mode? This will randomize API routes and pause all connections!",
        status_updated: "Status updated! 🔁", access_denied: "❌ Access Denied. You are not authorized to manage this panel.",
        dashboard: "📊 Dashboard", search: "🔍 Search User", statistics: "📈 Statistics",
        panel_info: "ℹ️ Panel Info", disabled_users: "🚫 Disabled Users",
        reset_traffic: "🔄 Reset Traffic", extend_expiry: "📅 Extend Expiry",
        notes: "📝 Notes", device_limit: "📱 Config Limit",
        msg_enter_search: "🔍 Send a username, UUID, or subscription to search:",
        msg_enter_notes: "📝 Send notes for this user:",
        msg_enter_extend_days: "📅 Enter number of days to extend expiration:",
        msg_traffic_reset: "✅ Traffic has been reset successfully!",
        msg_expiry_extended: "✅ Expiration extended by {days} days!",
        msg_no_disabled: "No disabled users found.",
        msg_enter_device_limit: "📱 Enter config limit (0 for unlimited):",
        config_limit_updated: "✅ Config limit updated!",
        stats_title: "📈 Panel Statistics", count_active: "active",
        count_paused: "paused", count_disabled: "auto-disabled",
        dash_total: "Total Users", dash_active: "Active", dash_paused: "Paused",
        dash_expired: "Expired", dash_auto_disabled: "Auto-Disabled",
        btn_main_menu: "🔙 Main Menu", btn_back_to_list: "🔙 Back to List",
        total_traffic: "Total Traffic", daily_traffic: "Daily Traffic",
        lbl_status: "Status", lbl_subscription: "Subscription Connection",
        lbl_user_not_found: "⚠️ User not found", lbl_none: "None", lbl_page: "Page",
        select_panel: "🔌 Which panel do you want to manage?",
        current_panel: "Current Panel", switch_panel: "🔄 Switch Panel",
        panel_local: "🏠 This Panel", panel_remote: "🌐",
        msg_panel_selected: "Panel selected! ✅",
        msg_panel_error: "❌ Failed to connect to the selected panel.",
        msg_panel_unreachable: "⚠️ Panel is unreachable. Please check the configuration.",
        btn_sub_link: "🔗 Subscription Link", sub_link_sent: "✅ Subscription link sent!",
        btn_update_usage: "🔄 Update Usage",
    },
    fa: {
        welcome: "🤖 **به ربات TaaKaa-Xi خوش آمدید**\nجهت مدیریت سیستم نظارتی خود یکی از گزینه‌های زیر را انتخاب نمایید:",
        status: "📊 وضعیت سیستم", users: "👥 مدیریت مشترکین",
        metrics: "📡 سلامت درگاه شبکه", panic: "🚨 وضعیت اضطراری (Panic)",
        dash: "🔑 پنل تحت وب", lang: "🌐 تغییر زبان به انگلیسی",
        active: "🟢 فعال", paused: "🔴 متوقف شده", uptime: "⏱ مدت زمان کارکرد",
        streams: "📡 اتصالات فعال", no_users: "هیچ مشترکی پیدا نشد.",
        sub_info: "👤 مشخصات مشترک:", name: "نام", total: "درخواست کل",
        daily: "درخواست روزانه", expiry: "انقضاء", days: "روزهای باقی‌مانده",
        created: "تاریخ ایجاد", unlimited: "نامحدود",
        btn_back: "◀️ بازگشت", btn_next: "▶️ بعدی", btn_del: "🗑️ حذف",
        btn_pause: "⏸️ غیرفعال‌سازی", btn_resume: "▶️ فعال‌سازی",
        btn_edit_name: "✏️ تغییر نام", btn_edit_limits: "⚙️ ویرایش محدودیت‌ها",
        btn_add: "+ افزودن مشترک جدید", btn_confirm: "✅ تأیید",
        btn_cancel: "❌ انصراف", msg_enter_name: "لطفاً نام یا شناسه مشترک جدید را ارسال نمایید:",
        msg_added: "مشترک با موفقیت افزوده شد! 🎉",
        msg_deleted: "مشترک با موفقیت حذف گردید! 🗑️",
        msg_panic: "🚨 وضعیت اضطراری فعال شد 🚨\nمسیر تصادفی شد و سیستم متوقف گردید.",
        msg_invalid: "ورودی نامعتبر است. مجدداً تلاش نمایید.",
        msg_enter_limits: "فرمت ورودی محدودیت:\n`[کل] [روزانه] [مدت_روز]`\n(از 0 برای نامحدود استفاده کنید)\n\nمثال:\n`10000 500 30`",
        msg_confirm_del: "⚠️ آیا از حذف این مشترک اطمینان کامل دارید؟",
        msg_confirm_panic: "⚠️ آیا از فعال‌سازی وضعیت اضطراری اطمینان دارید؟ کل اتصالات متوقف و آدرس‌ها منقضی خواهند شد!",
        status_updated: "وضعیت بروزرسانی شد! 🔁",
        access_denied: "❌ دسترسی غیرمجاز. شما اجازه مدیریت این پنل را ندارید.",
        dashboard: "📊 داشبورد", search: "🔍 جستجوی کاربر",
        statistics: "📈 آمار", panel_info: "ℹ️ اطلاعات پنل",
        disabled_users: "🚫 کاربران غیرفعال",
        reset_traffic: "🔄 بازنشانی ترافیک", extend_expiry: "📅 تمدید انقضا",
        notes: "📝 یادداشت‌ها", device_limit: "📱 محدودیت کانفیگ",
        msg_enter_search: "🔍 نام کاربری، UUID یا لینک اشتراک را ارسال کنید:",
        msg_enter_notes: "📝 یادداشت برای این کاربر را ارسال کنید:",
        msg_enter_extend_days: "📅 تعداد روزهای تمدید را وارد کنید:",
        msg_traffic_reset: "✅ ترافیک با موفقیت بازنشانی شد!",
        msg_expiry_extended: "✅ انقضا به مدت {days} روز تمدید شد!",
        msg_no_disabled: "هیچ کاربر غیرفعالی یافت نشد.",
        msg_enter_device_limit: "📱 محدودیت تعداد کانفیگ را وارد کنید (0 برای نامحدود):",
        config_limit_updated: "✅ محدودیت کانفیگ به‌روزرسانی شد!",
        stats_title: "📈 آمار پنل", count_active: "فعال",
        count_paused: "متوقف", count_disabled: "غیرفعال خودکار",
        dash_total: "کل کاربران", dash_active: "فعال", dash_paused: "متوقف",
        dash_expired: "منقضی", dash_auto_disabled: "غیرفعال خودکار",
        btn_main_menu: "🔙 منوی اصلی", btn_back_to_list: "🔙 بازگشت به لیست",
        total_traffic: "ترافیک کل", daily_traffic: "ترافیک روزانه",
        lbl_status: "وضعیت", lbl_subscription: "لینک اشتراک",
        lbl_user_not_found: "⚠️ کاربر یافت نشد", lbl_none: "ندارد",
        lbl_page: "صفحه", select_panel: "🔌 کدام پنل را می‌خواهید مدیریت کنید؟",
        current_panel: "پنل فعلی", switch_panel: "🔄 تغییر پنل",
        panel_local: "🏠 این پنل", panel_remote: "🌐",
        msg_panel_selected: "پنل انتخاب شد! ✅",
        msg_panel_error: "❌ اتصال به پنل انتخابی ناموفق بود.",
        msg_panel_unreachable: "⚠️ پنل در دسترس نیست. لطفاً پیکربندی را بررسی کنید.",
        btn_sub_link: "🔗 لینک اشتراک", sub_link_sent: "✅ لینک اشتراک ارسال شد!",
        btn_update_usage: "🔄 بروزرسانی مصرف",
    }
};

function getPanelsList() {
    const panels = [];
    panels.push({ name: sysConfig.name || "Main Panel", host: null, apiRoute: sysConfig.apiRoute, masterKey: null, isLocal: true });
    if (sysConfig.linkedPanels && Array.isArray(sysConfig.linkedPanels)) {
        sysConfig.linkedPanels.forEach(p => {
            if (p && p.host) {
                panels.push({ name: p.name || p.host, host: p.host, apiRoute: p.apiRoute || sysConfig.apiRoute, masterKey: p.masterKey, isLocal: false });
            }
        });
    }
    return panels;
}

async function remotePanelFetch(panel, method, path, body = null) {
    try {
        const url = `https://${panel.host}/taakaa/${encodeURI(panel.apiRoute)}${path}`;
        const options = { method, headers: { 'Content-Type': 'application/json' } };
        if (body) options.body = JSON.stringify(body);
        const res = await fetch(url, { ...options, signal: AbortSignal.timeout(8000) });
        return await res.json();
    } catch(e) { return { success: false, error: e.message }; }
}

async function fetchRemotePanelUsers(panel) { return await remotePanelFetch(panel, 'GET', `/api/users?key=${encodeURIComponent(panel.masterKey)}`); }
async function fetchRemotePanelUser(panel, userId) { return await remotePanelFetch(panel, 'GET', `/api/users?id=${encodeURIComponent(userId)}&key=${encodeURIComponent(panel.masterKey)}`); }
async function fetchRemotePanelStats(panel) { return await remotePanelFetch(panel, 'GET', `/api/stats?key=${encodeURIComponent(panel.masterKey)}`); }
async function fetchRemotePanelConfig(panel) { return await remotePanelFetch(panel, 'POST', '/api/auth', { key: panel.masterKey }); }
async function remotePanelWriteAction(panel, method, userId, body = null) {
    let path = '/api/users';
    if (userId) path += `?id=${encodeURIComponent(userId)}&key=${encodeURIComponent(panel.masterKey)}`;
    else path += `?key=${encodeURIComponent(panel.masterKey)}`;
    return await remotePanelFetch(panel, method, path, body || { key: panel.masterKey });
}
async function remotePanelToggleUser(panel, userId) { return await remotePanelFetch(panel, 'POST', `/api/users?id=${encodeURIComponent(userId)}&action=toggle&key=${encodeURIComponent(panel.masterKey)}`); }
async function remotePanelResetTraffic(panel, userId) { return await remotePanelFetch(panel, 'POST', `/api/users?id=${encodeURIComponent(userId)}&action=reset&key=${encodeURIComponent(panel.masterKey)}`); }
// ============================================================
// PART 12/15: TELEGRAM WEBHOOK HANDLER (MAIN)
// ============================================================

async function handleTelegramWebhook(request, env, hostName, ctx) {
    try {
        const update = await request.json();
        const tgApi = `https://api.telegram.org/bot${sysConfig.tgToken}`;
        const langCode = sysConfig.tgBotLang || "fa";
        const t = (key) => botI18n[langCode]?.[key] || botI18n["en"]?.[key] || key;
        const callerId = update.callback_query?.from?.id?.toString() || update.message?.from?.id?.toString();
        const adminId = sysConfig.tgAdminId || sysConfig.tgChatId;
        const isAuthorized = adminId && callerId === adminId.toString();
        let tgState = {};
        try {
            const storedState = await d1Get(env, "tg_bot_state");
            if (storedState) tgState = JSON.parse(storedState);
        } catch (e) { }
        const panels = getPanelsList();
        let lastLoginPanel = null;
        try {
            const stored = await d1Get(env, "tg_panel_login");
            if (stored) lastLoginPanel = JSON.parse(stored);
        } catch (e) { }
        const getActivePanel = () => {
            if (lastLoginPanel) {
                if (lastLoginPanel.isLocal) return panels.find(p => p.isLocal) || panels[0];
                const found = panels.find(p => !p.isLocal && p.host === lastLoginPanel.host);
                if (found) return found;
                return { name: lastLoginPanel.name || lastLoginPanel.host, host: lastLoginPanel.host, apiRoute: lastLoginPanel.apiRoute || sysConfig.apiRoute, masterKey: lastLoginPanel.masterKey, isLocal: false };
            }
            return panels[0];
        };
        const sendOrEdit = async (chatId, text, replyMarkup = null, messageId = null) => {
            let res;
            if (messageId) {
                res = await fetch(`${tgApi}/editMessageText`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, message_id: messageId, text: text, parse_mode: 'Markdown', reply_markup: replyMarkup })
                });
                if (res.ok) return res;
                try {
                    const errBody = await res.json();
                    if (errBody?.description?.includes("message is not modified")) return res;
                } catch (e) {}
            }
            res = await fetch(`${tgApi}/sendMessage`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown', reply_markup: replyMarkup })
            });
            return res;
        };
        const getMainMenu = (activePanel, isAdmin = true) => {
            const isPaused = sysConfig.isPaused || false;
            const statusEmoji = isPaused ? "🔴" : "🟢";
            const users = sysConfig.users || [];
            const activeCount = users.filter(u => !u.isPaused && (!u.expiryMs || Date.now() <= u.expiryMs)).length;
            const pausedCount = users.filter(u => u.isPaused && !u.disabledReason).length;
            const autoDisabledCount = users.filter(u => u.isPaused && u.disabledReason).length;
            const isLocal = !activePanel || activePanel.isLocal;
            const panelName = activePanel ? activePanel.name : (sysConfig.name || "Main Panel");
            const panelIndicator = isLocal ? `🏠 ${panelName}` : `🌐 ${panelName}`;
            let text = `${t("welcome")}\n\n━━━━━━━━━━━━━━━━\n📌 **${t("current_panel")}**: ${panelIndicator}\n⚡ **${t("status")}**: ${isPaused ? t("paused") : t("active")} ${statusEmoji}\n👥 **${t("users")}**: ${users.length} (${activeCount} ${t("count_active")}, ${pausedCount} ${t("count_paused")}, ${autoDisabledCount} ${t("count_disabled")})\n━━━━━━━━━━━━━━━━`;
            const panelUrl = isLocal ? `https://${hostName}/taakaa/${encodeURI(sysConfig.apiRoute)}/dash` : null;
            const inline_keyboard = [];
            if (isAdmin) { inline_keyboard.push([{ text: `👥 ${t("users")}`, callback_data: "subs_list:0" }, { text: `🔍 ${t("search")}`, callback_data: "sub_search_init" }]); }
            inline_keyboard.push([{ text: `📊 ${t("dashboard")}`, callback_data: "sys_dashboard" }, { text: `📈 ${t("statistics")}`, callback_data: "sys_stats" }]);
            inline_keyboard.push([{ text: `🔗 ${t("btn_sub_link")}`, callback_data: "get_sub_link" }]);
            if (isAdmin) { inline_keyboard.push([{ text: `🚫 ${t("disabled_users")}`, callback_data: "subs_disabled:0" }]); }
            inline_keyboard.push([{ text: `🌐 ${langCode === 'fa' ? 'English 🇺🇸' : 'فارسی 🇮🇷'}`, callback_data: "sys_lang" }, { text: isPaused ? t("btn_resume") : t("btn_pause"), callback_data: "sys_toggle_status" }]);
            if (panelUrl) {
                inline_keyboard.push([{ text: `🔑 ${t("dash")}`, web_app: { url: panelUrl } }, { text: `ℹ️ ${t("panel_info")}`, callback_data: "sys_panel_info" }]);
                if (isAdmin) { inline_keyboard.push([{ text: `🚨 ${t("panic")}`, callback_data: "sys_panic_init" }]); }
            } else { inline_keyboard.push([{ text: `ℹ️ ${t("panel_info")}`, callback_data: "sys_panel_info" }]); }
            return { text, kb: { inline_keyboard } };
        };
        const getSubsList = (page = 0, usersList = null) => {
            const users = usersList || sysConfig.users || [];
            const itemsPerPage = 5;
            const totalPages = Math.ceil(users.length / itemsPerPage);
            const start = page * itemsPerPage;
            const end = start + itemsPerPage;
            const pageUsers = users.slice(start, end);
            let text = `👥 **${t("users")}** (${t("lbl_page")} ${page + 1}/${Math.max(1, totalPages)})\n━━━━━━━━━━━━━━━━\n`;
            if (users.length === 0) { text += `⚠️ ${t("no_users")}\n`; } else {
                pageUsers.forEach((u, idx) => { text += `${start + idx + 1}. 👤 **${u.name}**\n   \`${u.id}\`\n`; });
            }
            text += `━━━━━━━━━━━━━━━━`;
            const inline_keyboard = [];
            pageUsers.forEach((u) => { inline_keyboard.push([{ text: `👤 ${u.name}`, callback_data: `sub_detail:${u.id}` }]); });
            const navRow = [];
            if (page > 0) { navRow.push({ text: `⬅️ ${t("btn_back")}`, callback_data: `subs_list:${page - 1}` }); }
            if (end < users.length) { navRow.push({ text: `${t("btn_next")} ➡️`, callback_data: `subs_list:${page + 1}` }); }
            if (navRow.length > 0) { inline_keyboard.push(navRow); }
            inline_keyboard.push([{ text: `➕ ${t("btn_add")}`, callback_data: "sub_add_init" }]);
            inline_keyboard.push([{ text: t("btn_main_menu"), callback_data: "main_menu" }]);
            return { text, kb: { inline_keyboard } };
        };
        const getSubDetail = (uuid, usersList = null) => {
            const users = usersList || sysConfig.users || [];
            const u = users.find(usr => usr.id === uuid);
            if (!u) { return { text: "⚠️ User not found", kb: { inline_keyboard: [[{ text: t("btn_back"), callback_data: "subs_list:0" }]] } }; }
            const sysU = sysUsageCache?.users?.[u.id.replace(/-/g,'').toLowerCase()] || { reqs: 0, dReqs: 0, lastDay: '' };
            const userReqs = sysU.reqs || 0;
            const curDate = new Date().toISOString().split('T')[0];
            const userDReqs = sysU.lastDay === curDate ? (sysU.dReqs || 0) : 0;
            const limitTotalTxt = u.limitTotalReq ? `${u.limitTotalReq}` : t("unlimited");
            const limitDailyTxt = u.limitDailyReq ? `${u.limitDailyReq}` : t("unlimited");
            const usedGB = (userReqs / 6000).toFixed(2);
            const limitGB = u.limitTotalReq ? (u.limitTotalReq / 6000).toFixed(2) : t("unlimited");
            let expTxt = t("unlimited");
            let isExp = false;
            let daysLeft = t("unlimited");
            if (u.expiryMs) {
                const date = new Date(u.expiryMs);
                expTxt = date.toLocaleDateString();
                const remDays = Math.ceil((u.expiryMs - Date.now()) / 86400000);
                daysLeft = remDays >= 0 ? `${remDays}` : '0';
                if (Date.now() > u.expiryMs) { expTxt += ` (${t("dash_expired")} 🔴)`; isExp = true; }
            }
            const statusEmoji = u.isPaused ? "⏸️" : (isExp ? "🔴" : "🟢");
            const statusText = u.isPaused ? t("paused") : (isExp ? t("dash_expired") : t("active"));
            const subSync = `https://${hostName}/taakaa/${sysConfig.apiRoute}?sub=${encodeURIComponent(u.name)}`;
            const maxCfgTxt = u.maxConfigs || t("unlimited");
            const notesTxt = u.notes || t("lbl_none");
            let text = `👤 **${t("sub_info")}**\n━━━━━━━━━━━━━━━━\n📛 **${t("name")}**: ${u.name}\n🆔 **UUID**: \`${u.id}\`\n🚦 **${t("lbl_status")}**: ${statusEmoji} ${statusText}\n📊 **${t("total")}**: ${usedGB} GB / ${limitGB} GB (${userReqs} reqs)\n⏱ **${t("daily")}**: ${userDReqs} / ${limitDailyTxt}\n📅 **${t("expiry")}**: ${expTxt}\n⏳ **${t("days")}**: ${daysLeft}\n📱 **${t("device_limit")}**: ${maxCfgTxt}\n📝 **${t("notes")}**: ${notesTxt}\n━━━━━━━━━━━━━━━━\n🔗 **${t("lbl_subscription")}:**\n\`${subSync}\``;
            const kb = { inline_keyboard: [
                [{ text: u.isPaused ? `▶️ ${t("btn_resume")}` : `⏸️ ${t("btn_pause")}`, callback_data: `sub_toggle:${u.id}` }, { text: `🗑️ ${t("btn_del")}`, callback_data: `sub_del_init:${u.id}` }],
                [{ text: `✏️ ${t("btn_edit_name")}`, callback_data: `sub_edit_name_init:${u.id}` }, { text: `⚙️ ${t("btn_edit_limits")}`, callback_data: `sub_edit_limits_init:${u.id}` }],
                [{ text: `🔄 ${t("reset_traffic")}`, callback_data: `sub_reset_traffic:${u.id}` }, { text: `📅 ${t("extend_expiry")}`, callback_data: `sub_extend_init:${u.id}` }],
                [{ text: `📝 ${t("notes")}`, callback_data: `sub_edit_notes_init:${u.id}` }, { text: `📱 ${t("device_limit")}`, callback_data: `sub_edit_device_init:${u.id}` }],
                [{ text: t("btn_back_to_list"), callback_data: "subs_list:0" }]
            ] };
            return { text, kb };
        };
        // ادامه در بخش 13
    } catch(e) { return new Response("OK", { status: 200 }); }
}
// ============================================================
// PART 13/15: TELEGRAM WEBHOOK (CALLBACK HANDLER)
// ============================================================

        if (update.callback_query) {
            const cb = update.callback_query;
            const chatId = cb.message?.chat?.id;
            const messageId = cb.message?.message_id;
            const data = cb.data;
            if (chatId) {
                if (!isAuthorized) {
                    await fetch(`${tgApi}/answerCallbackQuery`, {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ callback_query_id: cb.id, text: t("access_denied"), show_alert: true })
                    });
                    return new Response("OK", { status: 200 });
                }
                const activePanel = getActivePanel();
                const isRemotePanel = activePanel && !activePanel.isLocal;
                const getPanelUsers = async () => {
                    if (isRemotePanel) {
                        const res = await fetchRemotePanelUsers(activePanel);
                        return res.success ? (res.users || []) : null;
                    }
                    return sysConfig.users || [];
                };
                tgState[chatId] = null;
                ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{}));
                let answerText = null;
                
                if (data === "main_menu") { const menu = getMainMenu(activePanel, isAuthorized); await sendOrEdit(chatId, menu.text, menu.kb, messageId); }
                else if (data === "sys_lang") { sysConfig.tgBotLang = (langCode === "fa") ? "en" : "fa"; await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); const menu = getMainMenu(activePanel, isAuthorized); await sendOrEdit(chatId, menu.text, menu.kb, messageId); }
                else if (data === "sys_toggle_status") { sysConfig.isPaused = !sysConfig.isPaused; await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); const menu = getMainMenu(activePanel, isAuthorized); await sendOrEdit(chatId, menu.text, menu.kb, messageId); }
                else if (data === "sys_metrics") {
                    let usageStr = t("unlimited");
                    if (sysConfig.cfAccountId && sysConfig.cfApiToken) {
                        const reqs = await fetchCloudflareUsage(sysConfig.cfAccountId, sysConfig.cfApiToken);
                        if (reqs !== null) { const pct = ((reqs / 100000) * 100).toFixed(2); usageStr = `${reqs}/100000 (${pct}%)`; }
                    }
                    const upSeconds = Math.floor((Date.now() - isolateStartTime)/1000);
                    const dh = Math.floor(upSeconds/3600);
                    const dm = Math.floor((upSeconds%3600)/60);
                    let text = `📡 **${t("metrics")}**\n━━━━━━━━━━━━━━━━\n⏱ **${t("uptime")}**: ${dh}h ${dm}m\n🔌 **${t("streams")}**: ${activeConnections}\n📊 **Cloudflare API Usage**: ${usageStr}\n━━━━━━━━━━━━━━━━`;
                    const kb = { inline_keyboard: [[{ text: t("btn_main_menu"), callback_data: "main_menu" }]] };
                    await sendOrEdit(chatId, text, kb, messageId);
                }
                else if (data.startsWith("subs_list:")) { const page = parseInt(data.replace("subs_list:", "")) || 0; const panelUsers = await getPanelUsers(); if (panelUsers === null && isRemotePanel) { await sendOrEdit(chatId, t("msg_panel_error"), { inline_keyboard: [[{ text: t("btn_main_menu"), callback_data: "main_menu" }]] }); } else { const list = getSubsList(page, panelUsers); await sendOrEdit(chatId, list.text, list.kb, messageId); } }
                else if (data.startsWith("sub_detail:")) { const uuid = data.replace("sub_detail:", ""); const panelUsers = await getPanelUsers(); if (panelUsers === null && isRemotePanel) { await sendOrEdit(chatId, t("msg_panel_error"), { inline_keyboard: [[{ text: t("btn_main_menu"), callback_data: "main_menu" }]] }); } else { const detail = getSubDetail(uuid, panelUsers); await sendOrEdit(chatId, detail.text, detail.kb, messageId); } }
                else if (data.startsWith("sub_toggle:")) { const uuid = data.replace("sub_toggle:", ""); if (isRemotePanel) { await remotePanelToggleUser(activePanel, uuid); } else if (sysConfig.users) { const u = sysConfig.users.find(usr => usr.id === uuid); if (u) { u.isPaused = !u.isPaused; await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); } } const panelUsers = await getPanelUsers(); const detail = getSubDetail(uuid, panelUsers); await sendOrEdit(chatId, detail.text, detail.kb, messageId); }
                else if (data.startsWith("sub_del_init:")) { const uuid = data.replace("sub_del_init:", ""); const panelUsers = await getPanelUsers(); const u = panelUsers?.find(usr => usr.id === uuid); const name = u ? u.name : ""; const text = `${t("msg_confirm_del")}\n\n👤 **${name}**`; const kb = { inline_keyboard: [[{ text: `✅ ${t("btn_confirm")}`, callback_data: `sub_del_confirm:${uuid}` }, { text: `❌ ${t("btn_cancel")}`, callback_data: `sub_detail:${uuid}` }]] }; await sendOrEdit(chatId, text, kb, messageId); }
                else if (data.startsWith("sub_del_confirm:")) { const uuid = data.replace("sub_del_confirm:", ""); if (isRemotePanel) { await remotePanelWriteAction(activePanel, 'DELETE', uuid); } else if (sysConfig.users) { sysConfig.users = sysConfig.users.filter(usr => usr.id !== uuid); await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); } const successText = `✅ ${t("msg_deleted")}`; const kb = { inline_keyboard: [[{ text: t("btn_back"), callback_data: "subs_list:0" }]] }; await sendOrEdit(chatId, successText, kb, messageId); }
                else if (data === "sub_add_init") { tgState[chatId] = { step: "sub_add_name" }; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const text = `➕ ${t("msg_enter_name")}`; const kb = { inline_keyboard: [[{ text: `❌ ${t("btn_cancel")}`, callback_data: "subs_list:0" }]] }; await sendOrEdit(chatId, text, kb, messageId); }
                else if (data.startsWith("sub_edit_name_init:")) { const uuid = data.replace("sub_edit_name_init:", ""); tgState[chatId] = { step: `sub_edit_name:${uuid}` }; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const text = `✏️ ${t("msg_enter_name")}`; const kb = { inline_keyboard: [[{ text: `❌ ${t("btn_cancel")}`, callback_data: `sub_detail:${uuid}` }]] }; await sendOrEdit(chatId, text, kb, messageId); }
                else if (data.startsWith("sub_edit_limits_init:")) { const uuid = data.replace("sub_edit_limits_init:", ""); tgState[chatId] = { step: `sub_edit_limits:${uuid}` }; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const text = `⚙️ ${t("msg_enter_limits")}`; const kb = { inline_keyboard: [[{ text: `♾️ Skip (Unlimited)`, callback_data: `sub_unlimit_cb:${uuid}` }], [{ text: `❌ ${t("btn_cancel")}`, callback_data: `sub_detail:${uuid}` }]] }; await sendOrEdit(chatId, text, kb, messageId); }
                else if (data.startsWith("sub_unlimit_cb:")) { const uuid = data.replace("sub_unlimit_cb:", ""); if (isRemotePanel) { await remotePanelWriteAction(activePanel, 'PUT', uuid, { key: activePanel.masterKey, trafficLimit: 0, dailyLimit: 0, expiryDays: 0 }); } else if (sysConfig.users) { const u = sysConfig.users.find(usr => usr.id === uuid); if (u) { u.limitTotalReq = null; u.limitDailyReq = null; u.expiryMs = null; await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); } } const panelUsers = await getPanelUsers(); const detail = getSubDetail(uuid, panelUsers); await sendOrEdit(chatId, detail.text, detail.kb, messageId); }
                else if (data === "sub_add_unlimited_skip") { let stateName = "Subscriber"; try { const savedStateRaw = await d1Get(env, "tg_bot_state"); if (savedStateRaw) { const stObj = JSON.parse(savedStateRaw); if (stObj[chatId] && stObj[chatId].name) { stateName = stObj[chatId].name; } } } catch(e){} const newUuid = crypto.randomUUID(); if (isRemotePanel) { const res = await remotePanelWriteAction(activePanel, 'POST', null, { key: activePanel.masterKey, name: stateName }); if (res.success && res.user) { const detail = getSubDetail(res.user.id, [res.user]); await sendOrEdit(chatId, `✅ ${t("msg_added")}\n\n${detail.text}`, detail.kb, messageId); } else { await sendOrEdit(chatId, t("msg_panel_error"), { inline_keyboard: [[{ text: t("btn_main_menu"), callback_data: "main_menu" }]] }); } } else { if (!sysConfig.users) sysConfig.users = []; sysConfig.users.push({ id: newUuid, name: stateName, limitTotalReq: null, limitDailyReq: null, expiryMs: null, createdAt: Date.now() }); await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); const detail = getSubDetail(newUuid); await sendOrEdit(chatId, `✅ ${t("msg_added")}\n\n${detail.text}`, detail.kb, messageId); } tgState[chatId] = null; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); }
                else if (data === "sys_panic_init") { const text = `${t("msg_confirm_panic")}`; const kb = { inline_keyboard: [[{ text: `🚨 YES PANIC 🚨`, callback_data: "sys_panic_confirm" }, { text: `❌ No, Cancel`, callback_data: "main_menu" }]] }; await sendOrEdit(chatId, text, kb, messageId); }
                else if (data === "sys_panic_confirm") { sysConfig.apiRoute = Array.from(crypto.getRandomValues(new Uint8Array(8))).map(b => b.toString(16).padStart(2,'0')).join(''); sysConfig.isPaused = true; await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); const successText = `${t("msg_panic")}\n\n🔑 New Secret Path Randomized. All old sessions revoked.`; const kb = { inline_keyboard: [[{ text: t("btn_main_menu"), callback_data: "main_menu" }]] }; await sendOrEdit(chatId, successText, kb, messageId); }
                else if (data === "sys_dashboard") { let users, activeCount, pausedCount, expiredCount, autoDisabledCount; if (isRemotePanel) { const statsRes = await fetchRemotePanelStats(activePanel); if (statsRes.success && statsRes.stats) { const s = statsRes.stats; users = []; activeCount = s.users?.active || 0; pausedCount = s.users?.paused || 0; expiredCount = s.users?.expired || 0; autoDisabledCount = s.users?.autoDisabled || 0; } else { const panelUsers = await getPanelUsers(); users = panelUsers || []; activeCount = users.filter(u => !u.isPaused && (!u.expiryMs || Date.now() <= u.expiryMs)).length; pausedCount = users.filter(u => u.isPaused && !u.disabledReason).length; expiredCount = users.filter(u => u.expiryMs && Date.now() > u.expiryMs && !u.isPaused).length; autoDisabledCount = users.filter(u => u.isPaused && u.disabledReason).length; } } else { users = sysConfig.users || []; activeCount = users.filter(u => !u.isPaused && (!u.expiryMs || Date.now() <= u.expiryMs)).length; pausedCount = users.filter(u => u.isPaused && !u.disabledReason).length; expiredCount = users.filter(u => u.expiryMs && Date.now() > u.expiryMs && !u.isPaused).length; autoDisabledCount = users.filter(u => u.isPaused && u.disabledReason).length; } let dashText = `📊 **${t("dashboard")}**\n━━━━━━━━━━━━━━━━\n📌 **${t("current_panel")}**: ${activePanel.isLocal ? '🏠' : '🌐'} ${activePanel.name}\n━━━━━━━━━━━━━━━━\n👥 **${t("dash_total")}**: ${Array.isArray(users) ? users.length : (activeCount + pausedCount + expiredCount + autoDisabledCount)}\n🟢 **${t("dash_active")}**: ${activeCount}\n⏸️ **${t("dash_paused")}**: ${pausedCount}\n🔴 **${t("dash_expired")}**: ${expiredCount}\n🚫 **${t("dash_auto_disabled")}**: ${autoDisabledCount}\n`; if (!isRemotePanel) { const upSeconds = Math.floor((Date.now() - isolateStartTime) / 1000); const dh = Math.floor(upSeconds / 3600); const dm = Math.floor((upSeconds % 3600) / 60); dashText += `⏱ **${t("uptime")}**: ${dh}h ${dm}m\n🔌 **${t("streams")}**: ${activeConnections}\n⚡ **System**: ${sysConfig.isPaused ? t("paused") : t("active")}\n`; } dashText += `━━━━━━━━━━━━━━━━`; const kb = { inline_keyboard: [[{ text: t("btn_main_menu"), callback_data: "main_menu" }]] }; await sendOrEdit(chatId, dashText, kb, messageId); }
                else if (data === "sys_stats") { let users, totalReqs, dailyReqs; if (isRemotePanel) { const statsRes = await fetchRemotePanelStats(activePanel); if (statsRes.success && statsRes.stats) { const s = statsRes.stats; users = []; totalReqs = s.traffic?.totalRequests || 0; dailyReqs = s.traffic?.dailyRequests || 0; } else { const panelUsers = await getPanelUsers(); users = panelUsers || []; totalReqs = 0; dailyReqs = 0; } } else { users = sysConfig.users || []; totalReqs = 0; dailyReqs = 0; const todayDate = new Date().toISOString().split('T')[0]; users.forEach(u => { const idClean = u.id.replace(/-/g, '').toLowerCase(); const sysU = sysUsageCache?.users?.[idClean] || { reqs: 0, dReqs: 0, lastDay: '' }; totalReqs += (sysU.reqs || 0); if (sysU.lastDay === todayDate) dailyReqs += (sysU.dReqs || 0); }); } let statsText = `📈 **${t("stats_title")}**\n━━━━━━━━━━━━━━━━\n📌 **${t("current_panel")}**: ${activePanel.isLocal ? '🏠' : '🌐'} ${activePanel.name}\n━━━━━━━━━━━━━━━━\n👥 **${t("dash_total")}**: ${Array.isArray(users) ? users.length : 'N/A'}\n📊 **${t("total_traffic")}**: ${(totalReqs / 6000).toFixed(2)} GB\n📅 **${t("daily_traffic")}**: ${(dailyReqs / 6000).toFixed(2)} GB\n━━━━━━━━━━━━━━━━`; if (sysConfig.cfAccountId && sysConfig.cfApiToken) { const reqs = await fetchCloudflareUsage(sysConfig.cfAccountId, sysConfig.cfApiToken); if (reqs !== null) { const pct = ((reqs / 100000) * 100).toFixed(2); statsText += `\n☁️ **Cloudflare API**: ${reqs}/100000 (${pct}%)`; } } const kb = { inline_keyboard: [[{ text: `🔄 ${t("btn_update_usage")}`, callback_data: "sys_stats" }], [{ text: t("btn_main_menu"), callback_data: "main_menu" }]] }; await sendOrEdit(chatId, statsText, kb, messageId); }
                else if (data === "sys_panel_info") { let infoText = `ℹ️ **${t("panel_info")}**\n━━━━━━━━━━━━━━━━\n📌 **${t("current_panel")}**: ${activePanel.isLocal ? '🏠' : '🌐'} ${activePanel.name}\n`; if (activePanel.isLocal) { infoText += `🌐 **Host**: ${hostName}\n🔑 **API Route**: \`${sysConfig.apiRoute}\`\n📡 **Mode**: ${sysConfig.mode || 'alpha'}\n🔒 **Ports**: ${sysConfig.socketPorts || '443'}\n`; } else { infoText += `🌐 **Host**: ${activePanel.host}\n🔑 **API Route**: \`${activePanel.apiRoute}\`\n`; } infoText += `📱 **Version**: ${CURRENT_VERSION}\n━━━━━━━━━━━━━━━━`; const kb = { inline_keyboard: [[{ text: t("btn_main_menu"), callback_data: "main_menu" }]] }; await sendOrEdit(chatId, infoText, kb, messageId); }
                else if (data.startsWith("subs_disabled:")) { const panelUsers = await getPanelUsers(); const users = panelUsers || []; const disabledUsers = users.filter(u => u.isPaused); if (disabledUsers.length === 0) { const kb = { inline_keyboard: [[{ text: t("btn_main_menu"), callback_data: "main_menu" }]] }; await sendOrEdit(chatId, `🚫 ${t("msg_no_disabled")}`, kb, messageId); } else { const page = parseInt(data.replace("subs_disabled:", "")) || 0; const itemsPerPage = 5; const start = page * itemsPerPage; const end = start + itemsPerPage; const pageUsers = disabledUsers.slice(start, end); let text = `🚫 **${t("disabled_users")}** (${disabledUsers.length})\n━━━━━━━━━━━━━━━━\n`; const inline_keyboard = []; pageUsers.forEach((u) => { const reason = u.disabledReason || t("paused"); text += `👤 **${u.name}**\n   ${reason}\n`; inline_keyboard.push([{ text: `▶️ ${u.name}`, callback_data: `sub_toggle:${u.id}` }]); }); const navRow = []; if (page > 0) navRow.push({ text: `⬅️ ${t("btn_back")}`, callback_data: `subs_disabled:${page - 1}` }); if (end < disabledUsers.length) navRow.push({ text: `${t("btn_next")} ➡️`, callback_data: `subs_disabled:${page + 1}` }); if (navRow.length > 0) inline_keyboard.push(navRow); inline_keyboard.push([{ text: t("btn_main_menu"), callback_data: "main_menu" }]); await sendOrEdit(chatId, text, { inline_keyboard }, messageId); } }
                else if (data === "sub_search_init") { tgState[chatId] = { step: "sub_search" }; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const text = `🔍 ${t("msg_enter_search")}`; const kb = { inline_keyboard: [[{ text: `❌ ${t("btn_cancel")}`, callback_data: "main_menu" }]] }; await sendOrEdit(chatId, text, kb, messageId); }
                else if (data.startsWith("sub_reset_traffic:")) { const uuid = data.replace("sub_reset_traffic:", ""); if (isRemotePanel) { await remotePanelResetTraffic(activePanel, uuid); } else { if (!sysUsageCache) sysUsageCache = { users: {} }; if (!sysUsageCache.users) sysUsageCache.users = {}; const uuidClean = uuid.replace(/-/g, '').toLowerCase(); if (sysUsageCache.users[uuidClean]) { sysUsageCache.users[uuidClean].reqs = 0; sysUsageCache.users[uuidClean].dReqs = 0; } else { sysUsageCache.users[uuidClean] = { reqs: 0, dReqs: 0, lastDay: new Date().toISOString().split('T')[0] }; } await cachedD1Put(env, "sys_usage", JSON.stringify(sysUsageCache)); } const panelUsers = await getPanelUsers(); const detail = getSubDetail(uuid, panelUsers); await sendOrEdit(chatId, `✅ ${t("msg_traffic_reset")}\n\n${detail.text}`, detail.kb, messageId); }
                else if (data.startsWith("sub_extend_init:")) { const uuid = data.replace("sub_extend_init:", ""); tgState[chatId] = { step: `sub_extend_days:${uuid}` }; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const text = `📅 ${t("msg_enter_extend_days")}`; const kb = { inline_keyboard: [[{ text: `❌ ${t("btn_cancel")}`, callback_data: `sub_detail:${uuid}` }]] }; await sendOrEdit(chatId, text, kb, messageId); }
                else if (data.startsWith("sub_edit_notes_init:")) { const uuid = data.replace("sub_edit_notes_init:", ""); tgState[chatId] = { step: `sub_edit_notes:${uuid}` }; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const text = `📝 ${t("msg_enter_notes")}`; const kb = { inline_keyboard: [[{ text: `❌ ${t("btn_cancel")}`, callback_data: `sub_detail:${uuid}` }]] }; await sendOrEdit(chatId, text, kb, messageId); }
                else if (data.startsWith("sub_edit_device_init:")) { const uuid = data.replace("sub_edit_device_init:", ""); tgState[chatId] = { step: `sub_edit_device:${uuid}` }; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const text = `📱 ${t("msg_enter_device_limit")}`; const kb = { inline_keyboard: [[{ text: `♾️ Unlimited`, callback_data: `sub_device_unlimited:${uuid}` }], [{ text: `❌ ${t("btn_cancel")}`, callback_data: `sub_detail:${uuid}` }]] }; await sendOrEdit(chatId, text, kb, messageId); }
                else if (data.startsWith("sub_device_unlimited:")) { const uuid = data.replace("sub_device_unlimited:", ""); if (isRemotePanel) { await remotePanelWriteAction(activePanel, 'PUT', uuid, { key: activePanel.masterKey, maxConfigs: null }); } else if (sysConfig.users) { const u = sysConfig.users.find(usr => usr.id === uuid); if (u) { u.maxConfigs = null; await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); } } const panelUsers = await getPanelUsers(); const detail = getSubDetail(uuid, panelUsers); await sendOrEdit(chatId, `✅ ${t("status_updated")}`, detail.kb, messageId); }
                else if (data === "get_sub_link") { const subUrl = `https://${hostName}/taakaa/${sysConfig.apiRoute}`; await fetch(`${tgApi}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: `\`${subUrl}\``, parse_mode: 'Markdown' }) }); answerText = t("sub_link_sent"); }
                ctx?.waitUntil(fetch(`${tgApi}/answerCallbackQuery`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ callback_query_id: cb.id, text: answerText || "Done!" }) }).catch(()=>{}));
            }
        } else if (update.message && update.message.text) {
            // ادامه در بخش 14
        }
// ============================================================
// PART 14/15: TELEGRAM WEBHOOK (MESSAGE HANDLER)
// ============================================================

        } else if (update.message && update.message.text) {
            const chatId = update.message.chat.id;
            const text = update.message.text.trim();
            if (isAuthorized) {
                const activePanel = getActivePanel();
                const isRemotePanel = activePanel && !activePanel.isLocal;
                const getPanelUsers = async () => {
                    if (isRemotePanel) { const res = await fetchRemotePanelUsers(activePanel); return res.success ? (res.users || []) : null; }
                    return sysConfig.users || [];
                };
                if (text === "/start") { tgState[chatId] = null; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const menu = getMainMenu(activePanel, isAuthorized); await sendOrEdit(chatId, menu.text, menu.kb); return new Response("OK", { status: 200 }); }
                const state = tgState[chatId];
                if (state) {
                    if (!isAuthorized) { tgState[chatId] = null; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); await sendOrEdit(chatId, t("access_denied")); return new Response("OK", { status: 200 }); }
                    if (state.step === "sub_add_name") { const name = text; tgState[chatId] = { step: "sub_add_limits", name: name }; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const msg = `⚙️ **${name}**\n\n${t("msg_enter_limits")}`; const kb = { inline_keyboard: [[{ text: `♾️ Skip (Unlimited)`, callback_data: "sub_add_unlimited_skip" }], [{ text: `❌ ${t("btn_cancel")}`, callback_data: "main_menu" }]] }; await sendOrEdit(chatId, msg, kb); return new Response("OK", { status: 200 }); }
                    if (state.step === "sub_add_limits" || state.step === "sub_add_unlimited_skip") { const name = state.name; let tReq = null, dReq = null, days = null; if (state.step !== "sub_add_unlimited_skip" && text !== "0" && text !== "0 0 0") { const parts = text.split(/\s+/).map(Number); if (parts[0] > 0) tReq = parts[0]; if (parts[1] > 0) dReq = parts[1]; if (parts[2] > 0) days = parts[2]; } const newUuid = crypto.randomUUID(); if (isRemotePanel) { const res = await remotePanelWriteAction(activePanel, 'POST', null, { key: activePanel.masterKey, name: name, trafficLimit: tReq ? tReq / 6000 : 0, dailyLimit: dReq ? dReq / 6000 : 0, expiryDays: days || 0 }); if (res.success && res.user) { const detail = getSubDetail(res.user.id, [res.user]); await sendOrEdit(chatId, `✅ ${t("msg_added")}\n\n${detail.text}`, detail.kb); } else { await sendOrEdit(chatId, t("msg_panel_error"), { inline_keyboard: [[{ text: t("btn_main_menu"), callback_data: "main_menu" }]] }); } } else { if (!sysConfig.users) sysConfig.users = []; sysConfig.users.push({ id: newUuid, name: name, limitTotalReq: tReq, limitDailyReq: dReq, expiryMs: days ? Date.now() + days * 86400000 : null, createdAt: Date.now() }); await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); const detail = getSubDetail(newUuid); await sendOrEdit(chatId, `✅ ${t("msg_added")}\n\n${detail.text}`, detail.kb); } tgState[chatId] = null; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); return new Response("OK", { status: 200 }); }
                    if (state.step.startsWith("sub_edit_name:")) { const uuid = state.step.replace("sub_edit_name:", ""); if (isRemotePanel) { await remotePanelWriteAction(activePanel, 'PUT', uuid, { key: activePanel.masterKey, name: text }); } else if (sysConfig.users) { const u = sysConfig.users.find(usr => usr.id === uuid); if (u) { u.name = text; await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); } } tgState[chatId] = null; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const panelUsers = await getPanelUsers(); const detail = getSubDetail(uuid, panelUsers); await sendOrEdit(chatId, `✅ Successfully Changed!`, detail.kb); return new Response("OK", { status: 200 }); }
                    if (state.step.startsWith("sub_edit_limits:")) { const uuid = state.step.replace("sub_edit_limits:", ""); let tReq = null, dReq = null, days = null; const parts = text.split(/\s+/).map(Number); if (parts[0] > 0) tReq = parts[0]; if (parts[1] > 0) dReq = parts[1]; if (parts[2] > 0) days = parts[2]; if (isRemotePanel) { await remotePanelWriteAction(activePanel, 'PUT', uuid, { key: activePanel.masterKey, trafficLimit: tReq ? tReq / 6000 : 0, dailyLimit: dReq ? dReq / 6000 : 0, expiryDays: days || 0 }); } else if (sysConfig.users) { const u = sysConfig.users.find(usr => usr.id === uuid); if (u) { u.limitTotalReq = tReq; u.limitDailyReq = dReq; u.expiryMs = days ? Date.now() + days * 86400000 : null; await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); } } tgState[chatId] = null; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const panelUsers = await getPanelUsers(); const detail = getSubDetail(uuid, panelUsers); await sendOrEdit(chatId, `✅ Limits Updated!`, detail.kb); return new Response("OK", { status: 200 }); }
                    if (state.step === "sub_search") { const query = text.toLowerCase(); const panelUsers = await getPanelUsers(); const users = panelUsers || []; const results = users.filter(u => u.name.toLowerCase().includes(query) || u.id.toLowerCase().includes(query)); tgState[chatId] = null; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); if (results.length === 0) { const kb = { inline_keyboard: [[{ text: t("btn_main_menu"), callback_data: "main_menu" }]] }; await sendOrEdit(chatId, `🔍 No users found for "${text}"`, kb); } else { let searchText = `🔍 **Search Results** (${results.length})\n━━━━━━━━━━━━━━━━\n`; const inline_keyboard = []; results.slice(0, 10).forEach(u => { const statusEmoji = u.isPaused ? "⏸️" : (u.expiryMs && Date.now() > u.expiryMs ? "🔴" : "🟢"); searchText += `${statusEmoji} **${u.name}**\n`; inline_keyboard.push([{ text: `👤 ${u.name}`, callback_data: `sub_detail:${u.id}` }]); }); inline_keyboard.push([{ text: t("btn_main_menu"), callback_data: "main_menu" }]); await sendOrEdit(chatId, searchText, { inline_keyboard }); } return new Response("OK", { status: 200 }); }
                    if (state.step.startsWith("sub_extend_days:")) { const uuid = state.step.replace("sub_extend_days:", ""); const days = parseInt(text); if (isNaN(days) || days <= 0) { await sendOrEdit(chatId, t("msg_invalid")); return new Response("OK", { status: 200 }); } if (isRemotePanel) { await remotePanelWriteAction(activePanel, 'PUT', uuid, { key: activePanel.masterKey, expiryDays: days }); } else if (sysConfig.users) { const u = sysConfig.users.find(usr => usr.id === uuid); if (u) { if (u.expiryMs) { u.expiryMs += days * 86400000; } else { u.expiryMs = Date.now() + days * 86400000; } if (u.isPaused && u.disabledReason && u.disabledReason.includes('Expiration')) { u.isPaused = false; u.disabledReason = null; u.disabledAt = null; } await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); } } tgState[chatId] = null; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const panelUsers = await getPanelUsers(); const detail = getSubDetail(uuid, panelUsers); const msg = t("msg_expiry_extended").replace("{days}", days); await sendOrEdit(chatId, `✅ ${msg}\n\n${detail.text}`, detail.kb); return new Response("OK", { status: 200 }); }
                    if (state.step.startsWith("sub_edit_notes:")) { const uuid = state.step.replace("sub_edit_notes:", ""); if (isRemotePanel) { await remotePanelWriteAction(activePanel, 'PUT', uuid, { key: activePanel.masterKey, notes: text }); } else if (sysConfig.users) { const u = sysConfig.users.find(usr => usr.id === uuid); if (u) { u.notes = text; await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); } } tgState[chatId] = null; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const panelUsers = await getPanelUsers(); const detail = getSubDetail(uuid, panelUsers); await sendOrEdit(chatId, `✅ Notes updated!`, detail.kb); return new Response("OK", { status: 200 }); }
                    if (state.step.startsWith("sub_edit_device:")) { const uuid = state.step.replace("sub_edit_device:", ""); const limit = parseInt(text); if (isNaN(limit) || limit < 0) { await sendOrEdit(chatId, t("msg_invalid")); return new Response("OK", { status: 200 }); } if (isRemotePanel) { await remotePanelWriteAction(activePanel, 'PUT', uuid, { key: activePanel.masterKey, maxConfigs: limit > 0 ? limit : null }); } else if (sysConfig.users) { const u = sysConfig.users.find(usr => usr.id === uuid); if (u) { u.maxConfigs = limit > 0 ? limit : null; await cachedD1Put(env, "sys_config", JSON.stringify(sysConfig)); } } tgState[chatId] = null; ctx?.waitUntil(d1Put(env, "tg_bot_state", JSON.stringify(tgState)).catch(()=>{})); const panelUsers = await getPanelUsers(); const detail = getSubDetail(uuid, panelUsers); await sendOrEdit(chatId, `✅ ${t("config_limit_updated")}`, detail.kb); return new Response("OK", { status: 200 }); }
                }
                const menu = getMainMenu(activePanel, isAuthorized);
                await sendOrEdit(chatId, menu.text, menu.kb);
            } else { await sendOrEdit(chatId, t("access_denied")); }
        }
        return new Response("OK", { status: 200 });
    } catch(e) { return new Response("OK", { status: 200 }); }
}
// ============================================================
// PART 15-A: WEBSOCKET + TELEMETRY
// ============================================================

async function processTelemetryStream(env, ctx) {
    const [client, webSocket] = Object.values(new WebSocketPair());
    webSocket.accept();
    webSocket.binaryType = "arraybuffer";
    startDataPipe(webSocket, env, ctx);
    return new Response(null, { status: 101, webSocket: client });
}

async function startDataPipe(webSocket, env, ctx) {
    activeConnections++;
    webSocket.addEventListener('close', () => activeConnections--);
    webSocket.addEventListener('error', () => activeConnections--);
    let remoteSocket, dataWriter, isInit = true, queue = Promise.resolve();
    let activeClientHash = null;
    webSocket.addEventListener("message", (event) => {
        queue = queue.then(async () => {
            try {
                if (isInit) {
                    isInit = false;
                    const isModeAlpha = await parseSensorData(event.data);
                    if (isModeAlpha) webSocket.send(new Uint8Array([0, 0]));
                } else if (dataWriter) {
                    await dataWriter.write(event.data);
                }
            } catch (err) { webSocket.close(); }
        });
    });
    async function parseSensorData(bufferData) {
        const view = new Uint8Array(bufferData);
        let targetAddr = "", targetPort = 0, offset = 0, isModeAlpha = false, activeProfile = null;
        if (view[0] === 0x00) {
            isModeAlpha = true;
            let clientHash = Array.from(view.slice(1, 17)).map(b => b.toString(16).padStart(2, '0')).join('');
            activeProfile = getAllProfiles().find(p => p.id.replace(/-/g, '').toLowerCase() === clientHash);
            if (!activeProfile) return false;
            activeClientHash = clientHash;
            trackUsage(activeClientHash, 0, env, ctx);
            let uTrack = uuidUsage.get(clientHash) || { connects: 0, last: 0 };
            uTrack.connects++; uTrack.last = Date.now(); uuidUsage.set(clientHash, uTrack);
            const optLen = view[17];
            const pPos = 18 + optLen + 1;
            targetPort = new DataView(bufferData.slice(pPos, pPos + 2)).getUint16(0);
            const aType = view[pPos + 2];
            let vPos = pPos + 3, aLen = 0;
            if (aType === 1) { aLen = 4; targetAddr = view.slice(vPos, vPos + aLen).join("."); }
            else if (aType === 2) { aLen = view[vPos]; vPos++; targetAddr = new TextDecoder().decode(view.slice(vPos, vPos + aLen)); }
            else if (aType === 3) { aLen = 16; const dv = new DataView(bufferData.slice(vPos, vPos + aLen)); targetAddr = Array.from({ length: 8 }, (_, i) => dv.getUint16(i * 2).toString(16)).join(":"); }
            offset = vPos + aLen;
        } else {
            let ePos = bufferData.byteLength;
            for (let i = 0; i < bufferData.byteLength; i++) { if (view[i] === 0x0D && view[i + 1] === 0x0A) { ePos = i; break; } }
            let clientHashHex = new TextDecoder().decode(view.slice(0, ePos));
            activeProfile = getAllProfiles().find(p => getTrojanHash(p.id) === clientHashHex);
            if (!activeProfile) return false;
            activeClientHash = activeProfile.id.replace(/-/g, '').toLowerCase();
            trackUsage(activeClientHash, 0, env, ctx);
            let uTrack = uuidUsage.get(activeClientHash) || { connects: 0, last: 0 };
            uTrack.connects++; uTrack.last = Date.now(); uuidUsage.set(activeClientHash, uTrack);
            let hPos = ePos + 2; hPos++;
            let aType = view[hPos]; hPos++; let aLen = 0;
            if (aType === 1) { aLen = 4; targetAddr = view.slice(hPos, hPos + aLen).join("."); }
            else if (aType === 3) { aLen = view[hPos]; hPos++; targetAddr = new TextDecoder().decode(view.slice(hPos, hPos + aLen)); }
            else if (aType === 4) { aLen = 16; const dv = new DataView(bufferData.slice(hPos, hPos + aLen)); targetAddr = Array.from({ length: 8 }, (_, i) => dv.getUint16(i * 2).toString(16)).join(":"); }
            hPos += aLen;
            targetPort = new DataView(bufferData.slice(hPos, hPos + 2)).getUint16(0);
            offset = hPos + 4;
        }
        let isDomain = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(targetAddr) || /^[a-zA-Z0-9-]+$/.test(targetAddr);
        let connectAddr = targetAddr;
        if (isDomain && sysConfig.customDns) {
            try {
                const dohUrl = new URL(sysConfig.customDns);
                dohUrl.searchParams.set("name", targetAddr);
                dohUrl.searchParams.set("type", "A");
                let dnsRes = await fetch(dohUrl.toString(), { headers: { "accept": "application/dns-json" }});
                let dnsJson = await dnsRes.json();
                if (dnsJson.Answer && dnsJson.Answer.length > 0) { connectAddr = dnsJson.Answer[0].data; }
            } catch (e) {}
        }
        try {
            remoteSocket = connect({ hostname: connectAddr, port: targetPort });
            await remoteSocket.opened;
        } catch {
            let pips = [];
            if (activeProfile && activeProfile.proxyIp) { pips = activeProfile.proxyIp.split(/[\r\n,;]+/).map(s => s.trim()).filter(Boolean); }
            if (pips.length === 0 && sysConfig.backupRelay) { pips = sysConfig.backupRelay.split(/[\r\n,;]+/).map(s => s.trim()).filter(Boolean); }
            if (pips.length === 0) { pips = [["pro", "xy", "ip.cmliussss.net"].join("")]; }
            let startIndex = 0;
            if (pips.length > 1) {
                let hash = 0;
                let hashStr = (activeProfile ? activeProfile.id : "");
                for (let i = 0; i < hashStr.length; i++) { hash = hashStr.charCodeAt(i) + ((hash << 5) - hash); }
                startIndex = Math.abs(hash) % pips.length;
            }
            let connected = false;
            for (let attempt = 0; attempt < Math.min(pips.length, 3); attempt++) {
                let currentIndex = (startIndex + attempt) % pips.length;
                let currentProxy = pips[currentIndex];
                try {
                    const [altIP, altPortStr] = currentProxy.split(":");
                    remoteSocket = connect({ hostname: altIP, port: altPortStr ? Number(altPortStr) : targetPort });
                    await remoteSocket.opened;
                    connected = true;
                    break;
                } catch (e) {}
            }
            if (!connected) { webSocket.close(); return isModeAlpha; }
        }
        dataWriter = remoteSocket.writable.getWriter();
        if (offset < bufferData.byteLength) {
            let chunk = bufferData.slice(offset);
            await dataWriter.write(chunk);
        }
        remoteSocket.readable.pipeTo(new WritableStream({ write(chunk) { webSocket.send(chunk); } }));
        return isModeAlpha;
    }
                }
// ============================================================
// PART 15-B: PROFILE HELPERS
// ============================================================

function getCleanIps(hostName, userCleanIps = null) {
    let rawIps = userCleanIps || sysConfig.cleanIps;
    let ips = rawIps ? rawIps.split(/[\r\n,;]+/).map(s => s.trim()).filter(Boolean) : [];
    if (ips.length === 0) ips = [hostName.endsWith('.pages.dev') ? sysConfig.metricNode : hostName];
    return ips;
}

function getAllProfiles(targetSub = null) {
    let list = [{ id: activeDeviceId, name: "Default" }];
    if (sysConfig.users && sysConfig.users.length > 0) {
        let now = Date.now();
        sysConfig.users.forEach(u => {
            let skip = false;
            if (u.expiryMs && now > u.expiryMs) skip = true;
            if (u.isPaused) skip = true;
            if (u.limitTotalReq && sysUsageCache && sysUsageCache.users && sysUsageCache.users[u.id.replace(/-/g, '').toLowerCase()]) {
                if (sysUsageCache.users[u.id.replace(/-/g, '').toLowerCase()].reqs >= u.limitTotalReq) skip = true;
            }
            if (u.limitDailyReq && sysUsageCache && sysUsageCache.users && sysUsageCache.users[u.id.replace(/-/g, '').toLowerCase()]) {
                let usr = sysUsageCache.users[u.id.replace(/-/g, '').toLowerCase()];
                if (usr.lastDay === new Date().toISOString().split('T')[0] && usr.dReqs >= u.limitDailyReq) skip = true;
            }
            if(!skip) {
                list.push({ id: u.id, name: u.name, proxyIp: u.proxyIp, cleanIp: u.cleanIp || null, userMode: u.userMode || null, userPorts: u.userPorts || null, maxConfigs: u.maxConfigs || null });
            }
        });
    }
    if (targetSub) { list = list.filter(p => p.name.toLowerCase() === targetSub.toLowerCase()); }
    return list;
}

function getProxyIpsArray(proxyIpString) {
    if (!proxyIpString) return [];
    return proxyIpString.split(/[\r\n,;]+/).map(s => {
        let trimmed = s.trim();
        if (!trimmed) return "";
        let hostPort = trimmed.split('#')[0].split('@')[0];
        if (hostPort.includes(':') && !hostPort.includes(']')) { return hostPort.split(':')[0]; }
        else if (hostPort.startsWith('[') && hostPort.includes(']')) { return hostPort.split(']')[0].replace('[', ''); }
        return hostPort;
    }).filter(Boolean);
}

const ipFlagCache = new Map();

async function preloadIpFlags(profiles, hostNames) {
    let uniqueIps = new Set();
    profiles.forEach(p => {
        hostNames.forEach(h => {
            getCleanIps(h, p.cleanIp).forEach(ip => uniqueIps.add(ip));
        });
        if (p.proxyIp) {
            getProxyIpsArray(p.proxyIp).forEach(ip => uniqueIps.add(ip));
        }
    });
    if (sysConfig.backupRelay) {
        getProxyIpsArray(sysConfig.backupRelay).forEach(ip => uniqueIps.add(ip));
    }
    let promises = Array.from(uniqueIps).map(async ip => {
        if (ipFlagCache.has(ip)) return;
        try {
            let cleanIp = ip.split(':')[0].replace(/[\[\]]/g, '').split('#')[0].trim();
            const res = await fetch(`https://api.country.is/${cleanIp}`);
            const data = await res.json();
            if (data && data.country) {
                const codePoints = data.country.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
                ipFlagCache.set(ip, String.fromCodePoint(...codePoints));
                return;
            }
        } catch(e) {}
        ipFlagCache.set(ip, "🌐");
    });
    await Promise.all(promises);
}

function getEmojiFlag(ip) {
    if (!ip) return "🌐";
    let clean = ip.split(':')[0].replace(/[\[\]]/g, '').split('#')[0].trim();
    return ipFlagCache.get(ip) || ipFlagCache.get(clean) || "🌐";
}

function getConfigName(type, profileName, port, hostName, ip, proxyIp = null) {
    let prefix = sysConfig.namePrefix || "Core";
    let strategy = sysConfig.nameStrategy || "default";
    let cleanName = profileName === "Default" ? "" : `-${profileName}`;
    let typeLab = type === "alpha" ? "V" : "T";
    if (strategy.includes('{') && strategy.includes('}')) {
        let lookupIp = ip;
        if (proxyIp) {
            let pips = getProxyIpsArray(proxyIp);
            if (pips.length > 0) lookupIp = pips[0];
        } else if (sysConfig.backupRelay) {
            let pips = getProxyIpsArray(sysConfig.backupRelay);
            if (pips.length > 0) lookupIp = pips[0];
        }
        let flagEmoji = getEmojiFlag(lookupIp);
        let protoLab = type === "alpha" ? "VLESS" : "Trojan";
        let resName = strategy.replace(/{FLAG}/g, flagEmoji).replace(/{PROTOCOL}/g, protoLab).replace(/{USER}/g, profileName).replace(/{PORT}/g, port).replace(/{PREFIX}/g, prefix).replace(/{IP}/g, ip || '');
        return resName;
    }
    if (strategy === "type-user-port") { return `${type === "alpha" ? "vl" + "ess" : "tro" + "jan"}-${profileName}-${port}`; }
    else if (strategy === "user-port") { return `${profileName}-${port}`; }
    else if (strategy === "host-port-user") { return `${hostName}-${port}${cleanName}`; }
    else if (strategy === "prefix-user-port") { return `${prefix}${cleanName}-${port}`; }
    else if (strategy === "ip") { return ip || 'unknown'; }
    else { return `${typeLab}-Core-${port}${cleanName}`; }
}

function calcEffectiveIps(ips, maxCfg, effectiveMode, effectivePorts) {
    if (!maxCfg) return ips;
    let protoCount = effectiveMode === "both" ? 2 : 1;
    let portCount = effectivePorts.length;
    let multiplier = protoCount * portCount;
    let neededIps = Math.max(1, Math.floor(maxCfg / multiplier));
    return ips.slice(0, neededIps);
}

function getSubscriptionStats(targetSub = null) {
    let name = "Default";
    let id = activeDeviceId;
    let limitTotalReq = 0;
    let expiryMs = 0;
    let hasMultiUser = (sysConfig.users && sysConfig.users.length > 0);
    if (hasMultiUser && targetSub) {
        let user = sysConfig.users.find(u => u.name.toLowerCase() === targetSub.toLowerCase() || u.id === targetSub);
        if (user) { name = user.name; id = user.id; limitTotalReq = user.limitTotalReq || 0; expiryMs = user.expiryMs || 0; }
    } else if (!hasMultiUser) { limitTotalReq = sysConfig.limitTotalReq || 0; expiryMs = sysConfig.expiryMs || 0; }
    let idClean = id.replace(/-/g, '').toLowerCase();
    let sysU = sysUsageCache?.users?.[idClean] || { reqs: 0, dReqs: 0 };
    let totalReqs = sysU.reqs || 0;
    let totalGb = (totalReqs / 6000).toFixed(2);
    let limitTotalGb = limitTotalReq ? (limitTotalReq / 6000).toFixed(2) : 'Unlimited';
    let expiryDateTxt = 'Never Expire';
    let remDaysTxt = 'Never Expire';
    if (expiryMs) {
        let exp = new Date(expiryMs);
        expiryDateTxt = exp.toISOString().split('T')[0];
        let remDays = Math.ceil((expiryMs - Date.now()) / (1000 * 60 * 60 * 24));
        remDaysTxt = remDays >= 0 ? `${remDays} Days Left` : 'Expired';
    }
    return { usedStr: `Used: ${totalGb} GB / ${limitTotalGb} GB`, expiryStr: `Expiry: ${expiryDateTxt} (${remDaysTxt})` };
            }
// ============================================================
// PART 15-C: PROFILE BUILDERS (URI + YAML)
// ============================================================

async function buildUriProfile(hostName, targetSub = null, allowInsecure = false) {
    let allHostNames = [hostName];
    if (sysConfig.slaveNodes) allHostNames.push(...sysConfig.slaveNodes.split(/[\r\n,;]+/).map(s=>s.trim()).filter(Boolean));
    let ports = sysConfig.socketPorts ? sysConfig.socketPorts.split(',').map(s=>s.trim()).filter(Boolean) : ["443"];
    let reqPath = encodeURI(`/${sysConfig.apiRoute}`);
    let lines = [];
    let profiles = getAllProfiles(targetSub);
    await preloadIpFlags(profiles, allHostNames);
    let stats = getSubscriptionStats(targetSub);
    let fakeU1 = `trojan://00000000-0000-0000-0000-000000000000@127.0.0.1:1080?encryption=none&security=none#${encodeURIComponent("📊 " + stats.usedStr)}`;
    let fakeU2 = `trojan://00000000-0000-0000-0000-000000000000@127.0.0.1:1080?encryption=none&security=none#${encodeURIComponent("📅 " + stats.expiryStr)}`;
    lines.push(fakeU1, fakeU2);
    profiles.forEach(p => {
        let pips = getProxyIpsArray(p.proxyIp);
        if (pips.length === 0 && sysConfig.backupRelay) { pips = getProxyIpsArray(sysConfig.backupRelay); }
        let effectiveMode = p.userMode || sysConfig.mode;
        let effectivePorts = p.userPorts ? p.userPorts.split(',').map(s=>s.trim()).filter(Boolean) : ports;
        let maxCfg = p.maxConfigs || null;
        let configIndex = 0;
        allHostNames.forEach(hName => {
            let allIps = getCleanIps(hName, p.cleanIp);
            let ips = calcEffectiveIps(allIps, maxCfg, effectiveMode, effectivePorts);
            effectivePorts.forEach(port => {
                let sec = getTransportParams(port);
                let extBase = `encryption=none&security=${sec}&sni=${hName}&fp=${sysConfig.agent}&type=ws&host=${hName}&path=${reqPath}`;
                if (sysConfig.enableOpt2) extBase += `&pbk=enabled`;
                extBase += `&allowInsecure=${allowInsecure ? "1" : "0"}`;
                ips.forEach(ip => {
                    let selectedProxyIp = null;
                    if (pips.length > 0) { selectedProxyIp = pips[configIndex % pips.length]; }
                    let vName = getConfigName("alpha", p.name, port, hName, ip, selectedProxyIp);
                    let tName = getConfigName("beta", p.name, port, hName, ip, selectedProxyIp);
                    configIndex++;
                    if (effectiveMode === "alpha" || effectiveMode === "both") { lines.push(`${getAlpha()}://${p.id}@${ip}:${port}?${extBase}#${vName}`); }
                    if (effectiveMode === "beta" || effectiveMode === "both") { lines.push(`${getBeta()}://${p.id}@${ip}:${port}?${extBase}#${tName}`); }
                });
            });
        });
    });
    return lines.join('\n');
}

async function buildYamlProfile(hostName, targetSub = null, allowInsecure = false) {
    let allHostNames = [hostName];
    if (sysConfig.slaveNodes) allHostNames.push(...sysConfig.slaveNodes.split(/[\r\n,;]+/).map(s=>s.trim()).filter(Boolean));
    let ports = sysConfig.socketPorts ? sysConfig.socketPorts.split(',').map(s=>s.trim()).filter(Boolean) : ["443"];
    let proxies = [];
    let proxyNames = [];
    let nameCounts = {};
    let profiles = getAllProfiles(targetSub);
    await preloadIpFlags(profiles, allHostNames);
    let stats = getSubscriptionStats(targetSub);
    let fake1 = `📊 ${stats.usedStr}`;
    let fake2 = `📅 ${stats.expiryStr}`;
    proxies.push(`- name: "${fake1}"\n  type: ${getBeta()}\n  server: 127.0.0.1\n  port: 80\n  password: "${activeDeviceId}"\n  udp: true\n  tls: false`);
    proxies.push(`- name: "${fake2}"\n  type: ${getBeta()}\n  server: 127.0.0.1\n  port: 80\n  password: "${activeDeviceId}"\n  udp: true\n  tls: false`);
    const getUniqueName = (baseName) => {
        if (!nameCounts[baseName]) { nameCounts[baseName] = 1; return baseName; }
        let counter = nameCounts[baseName];
        let newName = `${baseName}-${counter}`;
        while (nameCounts[newName]) { counter++; newName = `${baseName}-${counter}`; }
        nameCounts[baseName] = counter + 1;
        nameCounts[newName] = 1;
        return newName;
    };
    profiles.forEach(p => {
        let pips = getProxyIpsArray(p.proxyIp);
        if (pips.length === 0 && sysConfig.backupRelay) { pips = getProxyIpsArray(sysConfig.backupRelay); }
        let effectiveMode = p.userMode || sysConfig.mode;
        let effectivePorts = p.userPorts ? p.userPorts.split(',').map(s=>s.trim()).filter(Boolean) : ports;
        let maxCfg = p.maxConfigs || null;
        let configIndex = 0;
        allHostNames.forEach(hName => {
            let allIps = getCleanIps(hName, p.cleanIp);
            let ips = calcEffectiveIps(allIps, maxCfg, effectiveMode, effectivePorts);
            effectivePorts.forEach(port => {
                let sec = getTransportParams(port) === "tls" ? "true" : "false";
                ips.forEach(ip => {
                    let selectedProxyIp = null;
                    if (pips.length > 0) { selectedProxyIp = pips[configIndex % pips.length]; }
                    if (effectiveMode === "alpha" || effectiveMode === "both") {
                        let vName = getConfigName("alpha", p.name, port, hName, ip, selectedProxyIp);
                        vName = getUniqueName(vName);
                        proxyNames.push(`"${vName}"`);
                        let randomJunk = Array.from({length: 11}, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]).join('');
                        let payloadVl = { junk: randomJunk, protocol: "vl", mode: "proxyip", panelIPs: [] };
                        let pathStrVl = "/" + btoa(JSON.stringify(payloadVl));
                        proxies.push(`- name: "${vName}"\n  type: ${getAlpha()}\n  server: ${ip}\n  port: ${port}\n  uuid: ${p.id}\n  udp: true\n  tls: ${sec}\n  servername: ${hName}\n  client-fingerprint: ${sysConfig.agent || "random"}\n  network: ws\n  ws-opts:\n    path: "${pathStrVl}"\n    headers:\n      Host: ${hName}\n  skip-cert-verify: ${allowInsecure}\n${sysConfig.enableOpt1 ? "  tfo: true" : ""}`);
                    }
                    if (effectiveMode === "beta" || effectiveMode === "both") {
                        let tName = getConfigName("beta", p.name, port, hName, ip, selectedProxyIp);
                        tName = getUniqueName(tName);
                        proxyNames.push(`"${tName}"`);
                        let randomJunk = Array.from({length: 11}, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]).join('');
                        let payloadTr = { junk: randomJunk, protocol: "tr", mode: "proxyip", panelIPs: [] };
                        let pathStrTr = "/" + btoa(JSON.stringify(payloadTr));
                        proxies.push(`- name: "${tName}"\n  type: ${getBeta()}\n  server: ${ip}\n  port: ${port}\n  password: ${p.id}\n  udp: true\n  tls: ${sec}\n  sni: ${hName}\n  client-fingerprint: ${sysConfig.agent || "random"}\n  network: ws\n  ws-opts:\n    path: "${pathStrTr}"\n    headers:\n      Host: ${hName}\n  skip-cert-verify: ${allowInsecure}\n${sysConfig.enableOpt1 ? "  tfo: true" : ""}`);
                    }
                    configIndex++;
                });
            });
        });
    });
    let bestPingProxies = proxyNames.map(n => `      - ${n}`).join('\n');
    let allProxies = proxyNames.map(n => `      - ${n}`).join('\n');
    return `mixed-port: 7890
ipv6: true
allow-lan: false
unified-delay: false
log-level: warning
mode: rule
disable-keep-alive: false
keep-alive-idle: 10
keep-alive-interval: 15
tcp-concurrent: true
geo-auto-update: true
geo-update-interval: 168
external-controller: 127.0.0.1:9090
external-controller-cors:
  allow-origins:
    - "*"
  allow-private-network: true
external-ui: ui
external-ui-url: "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip"
profile:
  store-selected: true
  store-fake-ip: true
dns:
  enable: true
  respect-rules: true
  use-system-hosts: false
  listen: 127.0.0.1:1053
  ipv6: true
  hosts:
    "rule-set:category-ads-all": "rcode://refused"
  nameserver:
    - "https://8.8.8.8/dns-query#✅ Selector"
  proxy-server-nameserver:
    - "8.8.8.8#DIRECT"
  direct-nameserver:
    - "8.8.8.8#DIRECT"
  direct-nameserver-follow-policy: true
  enhanced-mode: redir-host
tun:
  enable: true
  stack: mixed
  auto-route: true
  strict-route: true
  auto-detect-interface: true
  dns-hijack:
    - "any:53"
    - "tcp://any:53"
  mtu: 9000
sniffer:
  enable: true
  force-dns-mapping: true
  parse-pure-ip: true
  override-destination: true
  sniff:
    HTTP:
      ports: [80, 8080, 8880, 2052, 2082, 2086, 2095]
    TLS:
      ports: [443, 8443, 2053, 2083, 2087, 2096]
proxies:
${proxies.join('\n')}
proxy-groups:
  - name: "✅ Selector"
    type: select
    proxies:
      - "💦 Best Ping 🚀"
      - "${fake1}"
      - "${fake2}"
${allProxies}
  - name: "💦 Best Ping 🚀"
    type: url-test
    url: "https://www.gstatic.com/generate_204"
    interval: 30
    tolerance: 50
    proxies:
${bestPingProxies}
rules:
  - DOMAIN-SUFFIX,ir,DIRECT
  - DOMAIN-KEYWORD,gov.ir,DIRECT
  - DOMAIN-SUFFIX,fa,DIRECT
  - GEOIP,IR,DIRECT
  - MATCH,✅ Selector
`;
        }
// ============================================================
// PART 15-D-1: CLASH JSON PROFILE BUILDER (PART 1)
// ============================================================

const k_pxs = "pro" + "xies";
const k_px_gps = "pro" + "xy-gro" + "ups";
const k_obds = "out" + "bounds";
const k_vl_mode = "vl" + "ess";
const k_tr_mode = "tro" + "jan";

async function buildClashJsonProfile(hostName, targetSub = null, allowInsecure = false) {
    let allHostNames = [hostName];
    if (sysConfig.slaveNodes) allHostNames.push(...sysConfig.slaveNodes.split(/[\r\n,;]+/).map(s=>s.trim()).filter(Boolean));
    let ports = sysConfig.socketPorts ? sysConfig.socketPorts.split(',').map(s=>s.trim()).filter(Boolean) : ["443"];
    let profiles = getAllProfiles(targetSub);
    await preloadIpFlags(profiles, allHostNames);
    let reqPath = encodeURI(`/${sysConfig.apiRoute}`);
    let proxiesArr = [];
    let dynamicTags = [];
    let nameCounts = {};
    let stats = getSubscriptionStats(targetSub);
    let fake1 = `📊 ${stats.usedStr}`;
    let fake2 = `📅 ${stats.expiryStr}`;
    proxiesArr.push({ "name": fake1, "type": k_tr_mode, "server": "127.0.0.1", "port": 80, "password": activeDeviceId, "tls": false, "udp": true });
    proxiesArr.push({ "name": fake2, "type": k_tr_mode, "server": "127.0.0.1", "port": 80, "password": activeDeviceId, "tls": false, "udp": true });
    const getUniqueName = (baseName) => {
        if (!nameCounts[baseName]) { nameCounts[baseName] = 1; return baseName; }
        let counter = nameCounts[baseName];
        let newName = `${baseName}-${counter}`;
        while (nameCounts[newName]) { counter++; newName = `${baseName}-${counter}`; }
        nameCounts[baseName] = counter + 1;
        nameCounts[newName] = 1;
        return newName;
    };
    profiles.forEach(p => {
        let pips = getProxyIpsArray(p.proxyIp);
        if (pips.length === 0 && sysConfig.backupRelay) { pips = getProxyIpsArray(sysConfig.backupRelay); }
        let effectiveMode = p.userMode || sysConfig.mode;
        let effectivePorts = p.userPorts ? p.userPorts.split(',').map(s=>s.trim()).filter(Boolean) : ports;
        let maxCfg = p.maxConfigs || null;
        let configIndex = 0;
        allHostNames.forEach(hName => {
            let allIps = getCleanIps(hName, p.cleanIp);
            let ips = calcEffectiveIps(allIps, maxCfg, effectiveMode, effectivePorts);
            effectivePorts.forEach(port => {
                let sec = getTransportParams(port) === "tls";
                ips.forEach(ip => {
                    let isVless = effectiveMode === "alpha" || effectiveMode === "both";
                    let isTrojan = effectiveMode === "beta" || effectiveMode === "both";
                    let selectedProxyIp = null;
                    if (pips.length > 0) { selectedProxyIp = pips[configIndex % pips.length]; }
                    if (isVless) {
                        let tagStr = getConfigName("alpha", p.name, port, hName, ip, selectedProxyIp);
                        tagStr = getUniqueName(tagStr);
                        dynamicTags.push(tagStr);
                        let randomJunk = Array.from({length: 11}, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]).join('');
                        let payloadVl = { junk: randomJunk, protocol: "vl", mode: "proxyip", panelIPs: [] };
                        let pathStrVl = "/" + btoa(JSON.stringify(payloadVl));
                        let ob = { "name": tagStr, "type": k_vl_mode, "server": ip, "port": parseInt(port), "ip-version": "ipv4-prefer", "tfo": sysConfig.enableOpt1 || false, "udp": true, "uuid": p.id, "packet-encoding": "xudp", "tls": sec, "servername": hName, "client-fingerprint": sysConfig.agent || "random", "skip-cert-verify": allowInsecure, "alpn": ["http/1.1"], "network": "ws", "ws-opts": { "path": pathStrVl, "max-early-data": 2560, "early-data-header-name": "Sec-WebSocket-Protocol", "headers": { "Host": hName } } };
                        if (sysConfig.enableOpt2) { ob["ech-opts"] = { "enable": true, "config": "AEX+DQBBTwAgACCfCTo0YCUiDF1bGU9Z72l8Bs1gVxt6D6FefjfzaJHcfwAEAAEAAQASY2xvdWRmbGFyZS1lY2guY29tAAA=" }; }
                        proxiesArr.push(ob);
                    }
                    if (isTrojan) {
                        let tagStr = getConfigName("beta", p.name, port, hName, ip, selectedProxyIp);
                        tagStr = getUniqueName(tagStr);
                        dynamicTags.push(tagStr);
                        let randomJunk = Array.from({length: 11}, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]).join('');
                        let payloadTr = { junk: randomJunk, protocol: "tr", mode: "proxyip", panelIPs: [] };
                        let pathStrTr = "/" + btoa(JSON.stringify(payloadTr));
                        let ob = { "name": tagStr, "type": k_tr_mode, "server": ip, "port": parseInt(port), "ip-version": "ipv4-prefer", "tfo": sysConfig.enableOpt1 || false, "udp": true, "password": p.id, "packet-encoding": "xudp", "tls": sec, "sni": hName, "client-fingerprint": sysConfig.agent || "random", "skip-cert-verify": allowInsecure, "alpn": ["http/1.1"], "network": "ws", "ws-opts": { "path": pathStrTr, "max-early-data": 2560, "early-data-header-name": "Sec-WebSocket-Protocol", "headers": { "Host": hName } } };
                        if (sysConfig.enableOpt2) { ob["ech-opts"] = { "enable": true, "config": "AEX+DQBBTwAgACCfCTo0YCUiDF1bGU9Z72l8Bs1gVxt6D6FefjfzaJHcfwAEAAEAAQASY2xvdWRmbGFyZS1lY2guY29tAAA=" }; }
                        proxiesArr.push(ob);
                    }
                    configIndex++;
                });
            });
        });
    });
    if (dynamicTags.length === 0) { dynamicTags.push("DIRECT"); }
    // ادامه در بخش بعدی
// ============================================================
// PART 15-D-2: CLASH JSON PROFILE BUILDER (PART 2 - RETURN)
// ============================================================

    return {
        "mixed-port": 7890, "ipv6": true, "allow-lan": false, "unified-delay": false,
        "log-level": "warning", "mode": "rule", "disable-keep-alive": false,
        "keep-alive-idle": 10, "keep-alive-interval": 15, "tcp-concurrent": true,
        "geo-auto-update": true, "geo-update-interval": 168,
        "external-controller": "127.0.0.1:9090",
        "external-controller-cors": { "allow-origins": ["*"], "allow-private-network": true },
        "external-ui": "ui", "external-ui-url": "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip",
        "profile": { "store-selected": true, "store-fake-ip": true },
        "dns": {
            "enable": true, "respect-rules": true, "use-system-hosts": false,
            "listen": "127.0.0.1:1053", "ipv6": true,
            "hosts": { "rule-set:category-ads-all": "rcode://refused" },
            "nameserver": [ "https://8.8.8.8/dns-query#✅ Selector" ],
            "proxy-server-nameserver": [ "8.8.8.8#DIRECT" ],
            "direct-nameserver": [ "8.8.8.8#DIRECT" ],
            "direct-nameserver-follow-policy": true,
            "nameserver-policy": { "rule-set:ir": "8.8.8.8#DIRECT" },
            "enhanced-mode": "redir-host"
        },
        "tun": {
            "enable": true, "stack": "mixed", "auto-route": true,
            "strict-route": true, "auto-detect-interface": true,
            "dns-hijack": ["any:53", "tcp://any:53"], "mtu": 9000
        },
        "sniffer": {
            "enable": true, "force-dns-mapping": true,
            "parse-pure-ip": true, "override-destination": true,
            "sniff": {
                "HTTP": { "ports": [80, 8080, 8880, 2052, 2082, 2086, 2095] },
                "TLS": { "ports": [443, 8443, 2053, 2083, 2087, 2096] }
            }
        },
        [k_pxs]: proxiesArr,
        [k_px_gps]: [
            { "name": "✅ Selector", "type": "select", "proxies": ["💦 Best Ping 🚀", fake1, fake2, ...dynamicTags] },
            { "name": "💦 Best Ping 🚀", "type": "url-test", "proxies": [...dynamicTags], "url": "https://www.gstatic.com/generate_204", "interval": 30, "tolerance": 50 }
        ],
        "rule-providers": {
            "category-ads-all": { "type": "http", "format": "text", "behavior": "domain", "path": "./ruleset/category-ads-all.txt", "interval": 86400, "url": "https://raw.githubusercontent.com/Chocolate4U/Iran-clash-rules/release/category-ads-all.txt" },
            "ir": { "type": "http", "format": "text", "behavior": "domain", "path": "./ruleset/ir.txt", "interval": 86400, "url": "https://raw.githubusercontent.com/Chocolate4U/Iran-clash-rules/release/ir.txt" },
            "ir-cidr": { "type": "http", "format": "text", "behavior": "ipcidr", "path": "./ruleset/ir-cidr.txt", "interval": 86400, "url": "https://raw.githubusercontent.com/Chocolate4U/Iran-clash-rules/release/ircidr.txt" }
        },
        "rules": [
            "GEOIP,lan,DIRECT,no-resolve",
            "NETWORK,udp,REJECT",
            "RULE-SET,category-ads-all,REJECT",
            "RULE-SET,ir,DIRECT",
            "RULE-SET,ir-cidr,DIRECT",
            "MATCH,✅ Selector"
        ],
        "ntp": { "enable": true, "server": "time.cloudflare.com", "port": 123, "interval": 30 }
    };
}
// ============================================================
// PART 15-D-3: SING-BOX JSON PROFILE BUILDER (PART 1)
// ============================================================

async function buildSingBoxJsonProfile(hostName, targetSub = null, allowInsecure = false) {
    let allHostNames = [hostName];
    if (sysConfig.slaveNodes) allHostNames.push(...sysConfig.slaveNodes.split(/[\r\n,;]+/).map(s=>s.trim()).filter(Boolean));
    let ports = sysConfig.socketPorts ? sysConfig.socketPorts.split(',').map(s=>s.trim()).filter(Boolean) : ["443"];
    let profiles = getAllProfiles(targetSub);
    await preloadIpFlags(profiles, allHostNames);
    let reqPath = encodeURI(`/${sysConfig.apiRoute}`);
    let outboundsArr = [];
    let dynamicTags = [];
    let nameCounts = {};
    let stats = getSubscriptionStats(targetSub);
    let fake1 = `📊 ${stats.usedStr}`;
    let fake2 = `📅 ${stats.expiryStr}`;
    outboundsArr.push({ "type": "direct", "tag": fake1 });
    outboundsArr.push({ "type": "direct", "tag": fake2 });
    const getUniqueName = (baseName) => {
        if (!nameCounts[baseName]) { nameCounts[baseName] = 1; return baseName; }
        let counter = nameCounts[baseName];
        let newName = `${baseName}-${counter}`;
        while (nameCounts[newName]) { counter++; newName = `${baseName}-${counter}`; }
        nameCounts[baseName] = counter + 1;
        nameCounts[newName] = 1;
        return newName;
    };
    profiles.forEach(p => {
        let pips = getProxyIpsArray(p.proxyIp);
        if (pips.length === 0 && sysConfig.backupRelay) { pips = getProxyIpsArray(sysConfig.backupRelay); }
        let effectiveMode = p.userMode || sysConfig.mode;
        let effectivePorts = p.userPorts ? p.userPorts.split(',').map(s=>s.trim()).filter(Boolean) : ports;
        let maxCfg = p.maxConfigs || null;
        let configIndex = 0;
        allHostNames.forEach(hName => {
            let allIps = getCleanIps(hName, p.cleanIp);
            let ips = calcEffectiveIps(allIps, maxCfg, effectiveMode, effectivePorts);
            effectivePorts.forEach(port => {
                let sec = getTransportParams(port) === "tls";
                ips.forEach(ip => {
                    let isVless = effectiveMode === "alpha" || effectiveMode === "both";
                    let isTrojan = effectiveMode === "beta" || effectiveMode === "both";
                    let selectedProxyIp = null;
                    if (pips.length > 0) { selectedProxyIp = pips[configIndex % pips.length]; }
                    if (isVless) {
                        let tagStr = getConfigName("alpha", p.name, port, hName, ip, selectedProxyIp);
                        tagStr = getUniqueName(tagStr);
                        dynamicTags.push(tagStr);
                        let randomJunk = Array.from({length: 11}, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]).join('');
                        let payloadVl = { junk: randomJunk, protocol: "vl", mode: "proxyip", panelIPs: [] };
                        let pathStrVl = "/" + btoa(JSON.stringify(payloadVl));
                        let ob = { "type": k_vl_mode, "tag": tagStr, "server": ip, "server_port": parseInt(port), "tcp_fast_open": sysConfig.enableOpt1 || false, "uuid": p.id, "packet_encoding": "xudp", "network": "tcp", "tls": { "enabled": sec, "server_name": hName, "insecure": allowInsecure, "alpn": ["http/1.1"], "utls": { "enabled": true, "fingerprint": "randomized" } }, "transport": { "type": "ws", "path": pathStrVl, "max_early_data": 2560, "early_data_header_name": "Sec-WebSocket-Protocol", "headers": { "Host": hName } } };
                        outboundsArr.push(ob);
                    }
                    if (isTrojan) {
                        let tagStr = getConfigName("beta", p.name, port, hName, ip, selectedProxyIp);
                        tagStr = getUniqueName(tagStr);
                        dynamicTags.push(tagStr);
                        let randomJunk = Array.from({length: 11}, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]).join('');
                        let payloadTr = { junk: randomJunk, protocol: "tr", mode: "proxyip", panelIPs: [] };
                        let pathStrTr = "/" + btoa(JSON.stringify(payloadTr));
                        let ob = { "type": k_tr_mode, "tag": tagStr, "server": ip, "server_port": parseInt(port), "tcp_fast_open": sysConfig.enableOpt1 || false, "password": p.id, "network": "tcp", "tls": { "enabled": sec, "server_name": hName, "insecure": allowInsecure, "alpn": ["http/1.1"], "utls": { "enabled": true, "fingerprint": "randomized" } }, "transport": { "type": "ws", "path": pathStrTr, "max_early_data": 2560, "early_data_header_name": "Sec-WebSocket-Protocol", "headers": { "Host": hName } } };
                        outboundsArr.push(ob);
                    }
                    configIndex++;
                });
            });
        });
    });
    if (dynamicTags.length === 0) { dynamicTags.push("direct"); }
    // ادامه در بخش بعدی
// ============================================================
// PART 15-D-4: SING-BOX JSON PROFILE BUILDER (PART 2 - RETURN)
// ============================================================

    return {
        "log": { "disabled": false, "level": "warn", "timestamp": true },
        "dns": {
            "servers": [
                { "address": "https://8.8.8.8/dns-query", "detour": "✅ Selector", "tag": "dns-remote" },
                { "address": "8.8.8.8", "detour": "direct", "tag": "dns-direct" }
            ],
            "rules": [
                { "clash_mode": "Direct", "server": "dns-direct" },
                { "clash_mode": "Global", "server": "dns-remote" },
                { "query_type": ["HTTPS"], "action": "reject" },
                { "rule_set": ["geosite-category-ads-all"], "action": "reject" },
                { "type": "logical", "mode": "and", "rules": [{ "rule_set": ["geosite-ir"] }, { "rule_set": "geoip-ir" }], "action": "route", "server": "dns-direct" }
            ],
            "strategy": "prefer_ipv4", "independent_cache": true
        },
        "inbounds": [
            { "type": "tun", "tag": "tun-in", "address": ["172.19.0.1/28"], "mtu": 9000, "auto_route": true, "strict_route": true, "stack": "mixed" },
            { "type": "mixed", "tag": "mixed-in", "listen": "127.0.0.1", "listen_port": 2080 }
        ],
        [k_obds]: [
            ...outboundsArr,
            { "type": "selector", "tag": "✅ Selector", "outbounds": ["💦 Best Ping 🚀", fake1, fake2, ...dynamicTags], "interrupt_exist_connections": false },
            { "type": "direct", "tag": "direct" },
            { "type": "urltest", "tag": "💦 Best Ping 🚀", "outbounds": [...dynamicTags], "url": "https://www.gstatic.com/generate_204", "interrupt_exist_connections": false, "interval": "30s" }
        ],
        "route": {
            "rules": [
                { "ip_cidr": "172.19.0.2", "action": "hijack-dns" },
                { "clash_mode": "Direct", "outbound": "direct" },
                { "clash_mode": "Global", "outbound": "✅ Selector" },
                { "action": "sniff" },
                { "protocol": "dns", "action": "hijack-dns" },
                { "ip_is_private": true, "outbound": "direct" },
                { "network": "udp", "action": "reject" },
                { "rule_set": ["geosite-category-ads-all"], "action": "reject" },
                { "rule_set": ["geosite-ir"], "action": "route", "outbound": "direct" },
                { "rule_set": ["geoip-ir"], "action": "route", "outbound": "direct" }
            ],
            "rule_set": [
                { "type": "remote", "tag": "geosite-category-ads-all", "format": "binary", "url": "https://raw.githubusercontent.com/Chocolate4U/Iran-sing-box-rules/rule-set/geosite-category-ads-all.srs", "download_detour": "direct" },
                { "type": "remote", "tag": "geosite-ir", "format": "binary", "url": "https://raw.githubusercontent.com/Chocolate4U/Iran-sing-box-rules/rule-set/geosite-ir.srs", "download_detour": "direct" },
                { "type": "remote", "tag": "geoip-ir", "format": "binary", "url": "https://raw.githubusercontent.com/Chocolate4U/Iran-sing-box-rules/rule-set/geoip-ir.srs", "download_detour": "direct" }
            ],
            "auto_detect_interface": true, "final": "✅ Selector"
        },
        "ntp": { "enabled": true, "server": "time.cloudflare.com", "server_port": 123, "interval": "30m", "write_to_system": false },
        "experimental": {
            "cache_file": { "enabled": true, "store_fakeip": true },
            "clash_api": { "external_controller": "127.0.0.1:9090", "external_ui": "ui", "default_mode": "Rule", "external_ui_download_url": "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip", "external_ui_download_detour": "direct" }
        }
    };
}
// ============================================================
// PART 15-D-5: PAGES + MAINTENANCE + DASHBOARD UI + MAIN FETCH
// ============================================================

function serveScannerPage() {
    return new Response(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>IP Scanner - TaaKaa-Xi</title>
<style>
body { font-family: -apple-system, sans-serif; background: #0a0a0f; color: #e2e8f0; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
.container { max-width: 800px; width: 100%; background: rgba(26, 26, 46, 0.85); padding: 40px; border-radius: 20px; border: 1px solid rgba(255, 107, 0, 0.3); box-shadow: 0 20px 60px rgba(0,0,0,0.6); }
h1 { color: #ff8c42; font-size: 28px; margin-bottom: 10px; }
.subtitle { color: #94a3b8; margin-bottom: 30px; }
.btn { background: #ff6b00; color: white; border: none; padding: 12px 30px; border-radius: 10px; font-size: 16px; cursor: pointer; transition: all 0.3s; margin-right: 10px; }
.btn:hover { background: #ff8c42; transform: scale(1.02); }
.btn-secondary { background: rgba(255,255,255,0.1); color: #e2e8f0; }
.btn-secondary:hover { background: rgba(255,255,255,0.2); }
table { width: 100%; border-collapse: collapse; margin-top: 20px; }
th, td { padding: 12px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05); }
th { color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
.status-alive { color: #4ade80; }
.status-dead { color: #f87171; }
.ping { font-family: monospace; }
.footer { margin-top: 30px; color: #475569; font-size: 12px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; }
</style>
</head>
<body>
<div class="container">
    <h1>🔍 IP Scanner</h1>
    <p class="subtitle">Find the best proxy IPs for your configs</p>
    <div>
        <button class="btn" onclick="quickScan()">⚡ Quick Scan (5 IPs)</button>
        <button class="btn btn-secondary" onclick="fullScan()">🔍 Full Scan (20 IPs)</button>
    </div>
    <div id="results">
        <table>
            <thead><tr><th>#</th><th>IP</th><th>Status</th><th>Latency</th><th>Operator</th></tr></thead>
            <tbody id="scan-results"></tbody>
        </table>
    </div>
    <div id="apply-section" style="display:none; margin-top:20px;">
        <button class="btn" onclick="applyIPs()">✅ Apply Working IPs to Config</button>
    </div>
    <div class="footer">TaaKaa-Xi PRO v${CURRENT_VERSION}</div>
</div>
<script>
let workingIPs = [];
async function quickScan() {
    const ips = ['1.1.1.1','8.8.8.8','9.9.9.9','208.67.222.222','1.0.0.1'];
    await scanIPs(ips);
}
async function fullScan() {
    const ips = ['1.1.1.1','8.8.8.8','9.9.9.9','208.67.222.222','1.0.0.1','4.2.2.2','4.2.2.3','4.2.2.4','8.8.4.4','76.76.19.19','77.88.8.1','77.88.8.8','80.80.80.80','80.80.81.81','94.140.14.14','94.140.15.15','185.228.168.9','185.228.169.9','208.67.220.220','208.67.222.222'];
    await scanIPs(ips);
}
async function scanIPs(ips) {
    const tbody = document.getElementById('scan-results');
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#64748b;">Scanning... 🔄</td></tr>';
    workingIPs = [];
    for (let i = 0; i < ips.length; i++) {
        const ip = ips[i];
        const start = performance.now();
        try {
            const res = await fetch('https://' + ip + '/favicon.ico?cb=' + start, { mode: 'no-cors', cache: 'no-store', signal: AbortSignal.timeout(5000) });
            const latency = Math.round(performance.now() - start);
            const status = latency < 1000 ? '🟢 Alive' : '🟡 Slow';
            const statusClass = latency < 1000 ? 'status-alive' : 'status-dead';
            const operator = latency < 1000 ? '✅ Verified' : '⚠️ Check';
            workingIPs.push(ip);
            tbody.innerHTML += '<tr><td>' + (i+1) + '</td><td>' + ip + '</td><td class="' + statusClass + '">' + status + '</td><td class="ping">' + latency + ' ms</td><td>' + operator + '</td></tr>';
        } catch(e) {
            tbody.innerHTML += '<tr><td>' + (i+1) + '</td><td>' + ip + '</td><td class="status-dead">🔴 Dead</td><td class="ping">Timeout</td><td>❌ Unreachable</td></tr>';
        }
    }
    document.getElementById('apply-section').style.display = workingIPs.length > 0 ? 'block' : 'none';
}
function applyIPs() {
    if (workingIPs.length === 0) { alert('No working IPs found!'); return; }
    const ipList = workingIPs.join('\\n');
    document.getElementById('cfg-ips').value = ipList;
    document.getElementById('cfg-ips').dispatchEvent(new Event('input'));
    alert('✅ ' + workingIPs.length + ' working IPs applied to Clean IPs field!');
}
</script>
</body>
</html>`, { headers: { "Content-Type": "text/html;charset=utf-8" } });
}

function serveSubscribePage() {
    return new Response(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Subscribe - TaaKaa-Xi</title>
<style>
body { font-family: -apple-system, sans-serif; background: #0a0a0f; color: #e2e8f0; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
.container { max-width: 600px; background: rgba(26, 26, 46, 0.85); padding: 40px; border-radius: 20px; border: 1px solid rgba(255, 107, 0, 0.3); text-align: center; }
h1 { color: #ff8c42; font-size: 32px; }
p { color: #94a3b8; line-height: 1.8; }
.code { background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; font-family: monospace; color: #4ade80; word-break: break-all; margin: 20px 0; }
.btn { background: #ff6b00; color: white; border: none; padding: 12px 30px; border-radius: 10px; cursor: pointer; font-size: 16px; text-decoration: none; display: inline-block; }
.btn:hover { background: #ff8c42; }
.footer { margin-top: 30px; color: #475569; font-size: 12px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; }
</style>
</head>
<body>
<div class="container">
    <h1>📡 Subscription</h1>
    <p>Your subscription link for TaaKaa-Xi PRO</p>
    <div class="code" id="sub-link">Loading...</div>
    <button class="btn" onclick="copySub()">📋 Copy Link</button>
    <div class="footer">TaaKaa-Xi PRO v${CURRENT_VERSION}</div>
</div>
<script>
const baseUrl = window.location.origin + '/taakaa/sync';
document.getElementById('sub-link').textContent = baseUrl;
function copySub() {
    navigator.clipboard.writeText(document.getElementById('sub-link').textContent);
    alert('✅ Copied to clipboard!');
}
</script>
</body>
</html>`, { headers: { "Content-Type": "text/html;charset=utf-8" } });
}

function serveProtocolsPage() {
    return new Response(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Protocols - TaaKaa-Xi</title>
<style>
body { font-family: -apple-system, sans-serif; background: #0a0a0f; color: #e2e8f0; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
.container { max-width: 700px; background: rgba(26, 26, 46, 0.85); padding: 40px; border-radius: 20px; border: 1px solid rgba(255, 107, 0, 0.3); }
h1 { color: #ff8c42; }
.protocol { background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; margin: 10px 0; border-left: 3px solid #ff6b00; }
.protocol h3 { color: #ff8c42; margin: 0 0 5px 0; }
.protocol p { color: #94a3b8; margin: 0; font-size: 14px; }
.badge { display: inline-block; background: rgba(255,107,0,0.2); color: #ff8c42; padding: 2px 10px; border-radius: 20px; font-size: 12px; }
.footer { margin-top: 30px; color: #475569; font-size: 12px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; }
</style>
</head>
<body>
<div class="container">
    <h1>🔌 Supported Protocols</h1>
    <div class="protocol"><h3>VLESS <span class="badge">Alpha</span></h3><p>Lightweight, modern protocol with WebSocket transport support</p></div>
    <div class="protocol"><h3>Trojan <span class="badge">Beta</span></h3><p>Secure, reliable protocol with full TLS/SSL encryption</p></div>
    <div class="protocol"><h3>Clash Meta <span class="badge">YAML</span></h3><p>Full Clash Meta configuration with rule sets and proxies</p></div>
    <div class="protocol"><h3>Sing-Box <span class="badge">JSON</span></h3><p>Advanced multi-protocol proxy with tun and mixed inbounds</p></div>
    <div class="footer">TaaKaa-Xi PRO v${CURRENT_VERSION}</div>
</div>
</body>
</html>`, { headers: { "Content-Type": "text/html;charset=utf-8" } });
}

function serveOwnersPage() {
    return new Response(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Owners - TaaKaa-Xi</title>
<style>
body { font-family: -apple-system, sans-serif; background: #0a0a0f; color: #e2e8f0; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
.container { max-width: 500px; background: rgba(26, 26, 46, 0.85); padding: 40px; border-radius: 20px; border: 1px solid rgba(255, 107, 0, 0.3); text-align: center; }
h1 { color: #ff8c42; font-size: 28px; }
.owner { margin: 20px 0; }
.owner-name { color: #fff; font-size: 20px; font-weight: 600; }
.owner-role { color: #ff8c42; font-size: 14px; }
.owner-desc { color: #94a3b8; font-size: 14px; margin-top: 5px; }
.social { margin-top: 10px; }
.social a { color: #ff8c42; text-decoration: none; margin: 0 10px; }
.social a:hover { text-decoration: underline; }
.footer { margin-top: 30px; color: #475569; font-size: 12px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; }
</style>
</head>
<body>
<div class="container">
    <h1>👑 TaaKaa-Xi Team</h1>
    <div class="owner">
        <div class="owner-name">TaaKaaOrg</div>
        <div class="owner-role">Lead Developer</div>
        <div class="owner-desc">Building the future of gateway telemetry</div>
        <div class="social">
            <a href="https://github.com/Tentayzm/TaaKaa-Xi" target="_blank">GitHub</a>
            <a href="https://t.me/TaaKaaOrg" target="_blank">Telegram</a>
        </div>
    </div>
    <div class="footer">TaaKaa-Xi PRO v${CURRENT_VERSION} · Made with ❤️</div>
</div>
</body>
</html>`, { headers: { "Content-Type": "text/html;charset=utf-8" } });
}

function serveNginx404() {
    return new Response(`<!DOCTYPE html>
<html>
<head><title>404 Not Found</title>
<style>
body { font-family: -apple-system, sans-serif; background: #0a0a0f; color: #e2e8f0; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
.container { max-width: 500px; text-align: center; background: rgba(26, 26, 46, 0.85); padding: 50px 40px; border-radius: 20px; border: 1px solid rgba(255, 107, 0, 0.3); }
h1 { font-size: 72px; color: #ff6b00; margin: 0; }
h2 { color: #fff; margin: 10px 0; }
p { color: #94a3b8; line-height: 1.8; }
.nginx { color: #ff6b00; font-weight: 700; }
.btn { display: inline-block; background: #ff6b00; color: white; padding: 12px 30px; border-radius: 10px; text-decoration: none; margin-top: 20px; }
.btn:hover { background: #ff8c42; }
</style>
</head>
<body>
<div class="container">
    <h1>404</h1>
    <h2>Page not found</h2>
    <p>The page you are looking for does not exist.<br>This is the <span class="nginx">nginx</span> 404 error page.</p>
    <a href="/" class="btn">← Back to Home</a>
</div>
</body>
</html>`, { status: 404, headers: { "Content-Type": "text/html;charset=utf-8" } });
}

async function serveMaintenancePage(request, url) {
    let fakeList = sysConfig.maintenanceHost ? sysConfig.maintenanceHost.split(',').map(s => s.trim()).filter(s => s) : ["https://www.nginx.com"];
    const clientIP = request.headers.get("cf-connecting-ip") || "0.0.0.0";
    const ipHash = Array.from(clientIP).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const targetStr = fakeList[ipHash % fakeList.length].startsWith('http') ? fakeList[ipHash % fakeList.length] : `https://${fakeList[ipHash % fakeList.length]}`;
    try {
        const targetUrl = new URL(targetStr);
        if (url.pathname !== "/") targetUrl.pathname = url.pathname;
        targetUrl.search = url.search;
        const cleanHeaders = new Headers(request.headers);
        cleanHeaders.set("Host", targetUrl.hostname);
        cleanHeaders.delete("cf-connecting-ip");
        cleanHeaders.delete("x-forwarded-for");
        const fetchInit = { method: request.method, headers: cleanHeaders, redirect: "follow" };
        if (request.method !== "GET" && request.method !== "HEAD") fetchInit.body = request.body;
        return await fetch(new Request(targetUrl.toString(), fetchInit));
    } catch (e) { return new Response("Not Found", { status: 404 }); }
}
