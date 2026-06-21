// ============================================================
// TAAKAA-XI CONFIGURATION
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
// TAAKAA-XI CONSTANTS (REPLACED NOVA WITH TAAKAA)
// ============================================================

const TAAKAA_REPO_RAW = 'https://raw.githubusercontent.com/TaakaaOrg/Taakaa-Xi/main/';
const TAAKAA_VERSION_URL = TAAKAA_REPO_RAW + 'version.json';
const TAAKAA_WORKER_SRC_FALLBACK = TAAKAA_REPO_RAW + 'worker.js';

let cfSocketConnect = null;
try {
    import('cloudflare:sockets')['then'](c => {
        if (c && typeof c.connect === 'function') cfSocketConnect = c.connect;
    })['catch'](() => {});
} catch (d) {}

const Version = 'Taakaa-Xi-v2.0.0';
let config_JSON, proxyIP = '', enableSocks5Proxy = null, enableSocks5GlobalProxy = false;
let mySocks5Account = '', parsedSocks5Address = {}, cachedSocks5Whitelist = null;
let cachedProxyIP, cachedProxyResolvedArray, cachedProxyArrayIndex = 0;
let enableProxyFallback = true, debugLogPrint = false, connProxyWhitelist = [];
let nat64Config = '', cachedNat64Prefixes = null, cachedNat64At = 0, cachedNat64Src = '';
let networkSettings = null, cachedNetworkSettings = null, cachedNetworkSettingsAt = 0;
let cachedAdminPass = null, cachedAdminPassAt = 0;
const _CFG_KEY = 'taakaa_config';
let _cfgRaw = null, _cfgRawAt = 0;

let cachedWorkerUUID = null, cachedWorkerUUIDAt = 0;
let savedUsersAuth = null, savedUsersAuthAt = 0, lastCentralSync = 0;
let SOCKS5whitelist = [
    'taakaa.xyz',
    '*.taakaa.xyz',
    'localhost',
    '127.0.0.1'
];
let PagesstaticPages = '';

globalThis['TaakaaXiStartTime'] = Date['now']();

const SESSION_MAX_AGE_MS = 0x5265c00;
const LOGIN_MAX_ATTEMPTS = 0x8;
const LOGIN_WINDOW_MS = 0x927c0;
const LOGIN_BLOCK_MS = 0xdbba0;
const __loginAttempts = new Map();
const WSearlyDataMaxBytes = 0x8 * 0x400;
const WSearlyDataMaxHeaderLength = Math['ceil'](WSearlyDataMaxBytes * 0x4 / 0x3) + 0x4;
const upstreamBatchTargetBytes = 0x40 * 0x400;
const upstreamQueueMaxBytes = 0x20 * 0x400 * 0x400;
const upstreamQueueMaxItems = 0x2000;
const downstreamGrainChunkBytes = 0x40 * 0x400;
const downstreamGrainTailThreshold = 0x200;
const downstreamGrainSilentMs = 0x0;
const TCPconcurrentDialCount = 0x4;
const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
const NODE_ADDR_REGEX = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/;
// ============================================================
// TAAKAA-XI HELPERS
// ============================================================

function versionGreater(c, f) {
    const g = String(c || '')['replace'](/^[vV]/, '')['split']('.').map(j => parseInt(j, 10) || 0);
    const h = String(f || '')['replace'](/^[vV]/, '')['split']('.').map(j => parseInt(j, 10) || 0);
    for (let j = 0; j < Math['max'](g['length'], h['length']); j++) {
        const k = g[j] || 0;
        const l = h[j] || 0;
        if (k > l) return true;
        if (k < l) return false;
    }
    return false;
}

let cachedAutoKey = null;
const _md5md5Cache = new Map(), _sha224Cache = new Map();
let _kvMigratedFlag = false, cachedCfUsage = null, cachedCfUsageAt = 0;
const _cidrListCache = new Map();

// ============================================================
// TAAKAA-XI MAIN WORKER
// ============================================================

const taakaaXiWorker = {
    async 'fetch'(f, g, h) {
        try {
            wrapKVWithD1(g);
            if (!_kvMigratedFlag && g['KV'] && h && typeof h['waitUntil'] === 'function') {
                h['waitUntil'](migrateKvToD1(g));
            }
            
            let j = f['url']['replace'](/%5[Cc]/g, '')['replace](/\\/g, '');
            const l = j['indexOf']('#');
            const o = l === -1 ? j : j['substring'](0, l);
            
            if (!o['includes']('?') && /%3f/i['test'](o)) {
                const H = l === -1 ? '' : j['substring'](l);
                j = o['replace'](/%3f/i, '?') + H;
            }
            
            const p = new URL(j);
            const q = f['headers']['get']('Host') || 'taakaa.xyz';
            const s = (f['headers']['get']('X-Forwarded-For') || '')['split']();
            const t = (f['headers']['get']('CF-Connecting-IP') || '')['split']();
            
            let w = g['ADMIN_PASSWORD'] || g['PASSWORD'] || g['ADMIN_PASS'] || g['ADMIN_KEY'] || g['ADMIN'] || g['SECRET'] || g['KEY'];
            let x = w;
            let z = g['AUTO_KEY'];
            
            if (!z && cachedAutoKey) z = cachedAutoKey;
            if (!z && g['KV'] && typeof g['KV']['get'] === 'function') {
                try {
                    z = await g['KV']['get']('taakaa_auto_key');
                    if (!z) {
                        z = Array['from'](crypto['getRandomValues'](new Uint8Array(0x18)), I => 'abcdefghijklmnopqrstuvwxyz0123456789'[I % 0x24])['join']('');
                        await g['KV']['put']('taakaa_auto_key', z);
                    }
                    cachedAutoKey = z;
                } catch (I) {}
            }
            if (!z) z = 'Taakaa-Xi-Default-Key';
            
            if (g['KV'] && typeof g['KV']['get'] === 'function') {
                if (cachedAdminPass !== null && Date['now']() - cachedAdminPassAt < 0xea60) {
                    if (cachedAdminPass) x = cachedAdminPass;
                } else {
                    try {
                        const J = await g['KV']['get']('taakaa_admin_pass');
                        if (J) {
                            x = J;
                            cachedAdminPass = J;
                            cachedAdminPassAt = Date['now']();
                        } else {
                            cachedAdminPass = '';
                            cachedAdminPassAt = Date['now']() - 0xd6d8;
                        }
                    } catch (K) {}
                }
            }
            
            const A = g['UUID'] || g['uuid'];
            let B;
            if (A && uuidRegex['test'](A)) {
                B = A['toString']();
            } else {
                const L = w || x;
                const M = await MD5MD5(L + z);
                const N = [M['slice'](0, 8), M['slice'](8, 12), '4' + M['slice'](13, 16), '8' + M['slice'](17, 20), M['slice'](20)]['join']('-');
                let O = null;
                if (g['KV'] && typeof g['KV']['get'] === 'function') {
                    if (cachedWorkerUUID !== null && Date['now']() - cachedWorkerUUIDAt < 0x927c0) {
                        O = cachedWorkerUUID || null;
                    } else {
                        try {
                            let P = await g['KV']['get']('taakaa_worker_uuid');
                            if (!P) {
                                P = N;
                                try { await g['KV']['put']('taakaa_worker_uuid', P); } catch (Q) {}
                            }
                            cachedWorkerUUID = P || '';
                            cachedWorkerUUIDAt = Date['now']();
                            O = P || null;
                        } catch (R) {}
                    }
                }
                B = O && uuidRegex['test'](O) ? O['toString']() : N;
            }
            
            const C = g['HOSTS'] ? (await sortIntoArray(g['HOSTS']))['map'](S => S['toString']()['replace'](/^https?:\/\//, '')['split']('/')[0]['split'](':')[0]) : [p['hostname']];
            const D = C[0];
            const E = p['pathname']['split']('/')[1]['toLowerCase']();
            
            debugLogPrint = ['1', 'true']['includes'](g['DEBUG']) || debugLogPrint;
            
            if (g['STATIC_PAGES'] || g['PAGES']) {
                PagesstaticPages = String(g['STATIC_PAGES'] || g['PAGES'])['replace'](/\/+$/, '') + '/';
            }
            
            if (g['PROXY_IPS']) {
                const S = await sortIntoArray(g['PROXY_IPS']);
                proxyIP = S[Math['floor'](Math['random']() * S['length'])];
                enableProxyFallback = false;
            } else {
                proxyIP = (f['cf']['colo'] + '.taakaa.xyz')['toString']();
            }
            
            nat64Config = g['NAT64'] || g['NAT64_CONFIG'] || '';
            
            const F = f['headers']['get']('CF-Connecting-IP') || f['headers']['get']('X-Forwarded-For') || f['headers']['get']('X-Real-IP') || f['headers']['get']('True-Client-IP') || f['headers']['get']('X-Client-IP') || f['headers']['get']('X-Proxy-IP') || f['headers']['get']('Client-IP') || '0.0.0.0';
            
            try {
                if (g['KV'] && typeof g['KV']['get'] === 'function') {
                    if (cachedNetworkSettings && Date['now']() - cachedNetworkSettingsAt < 0x7530) {
                        networkSettings = cachedNetworkSettings;
                    } else {
                        const T = await g['KV']['get']('taakaa_network_settings');
                        networkSettings = T ? JSON['parse'](T) : {
                            'enableRouting': true,
                            'enableGeoIP': true,
                            'enableGeoSite': true,
                            'enableAdBlock': true,
                            'enablePornBlock': false,
                            'enableDomesticBypass': true,
                            'enableDoH': true,
                            'dohProvider': 'https://cloudflare-dns.com/dns-query',
                            'enableLocalDNS': false,
                            'localDNSIP': '10.0.0.1',
                            'localDNSPort': '53',
                            'enableAntiSanctionDNS': false,
                            'antiSanctionDNSProvider': 'https://dns.taakaa.xyz/dns-query',
                            'antiSanctionCustomDNS': '',
                            'enableFakeDNS': false,
                            'fakeDNSIP': '10.0.0.2',
                            'enableIPv6': true,
                            'allowLAN': false,
                            'logLevel': 'info',
                            'enableWarp': false,
                            'warpMode': 'warp',
                            'warpEndpoint': '',
                            'warpAmnezia': false,
                            'customRules': '',
                            'bypassCountries': [],
                            'blockCategories': [],
                            'warpNoise': { 'mode': '', 'count': '', 'size': '', 'delay': '' }
                        };
                        cachedNetworkSettings = networkSettings;
                        cachedNetworkSettingsAt = Date['now']();
                    }
                } else {
                    networkSettings = { 'enablePornBlock': false, 'enableDomesticBypass': true, 'enableAdBlock': true };
                }
            } catch (U) {
                networkSettings = { 'enablePornBlock': false, 'enableDomesticBypass': true, 'enableAdBlock': true };
            }
            
            if (cachedSocks5Whitelist === null) {
                if (g['SOCKS5_WHITELIST']) {
                    SOCKS5whitelist = [...new Set(SOCKS5whitelist['concat'](await sortIntoArray(g['SOCKS5_WHITELIST'])))];
                }
                cachedSocks5Whitelist = SOCKS5whitelist;
            } else {
                SOCKS5whitelist = cachedSocks5Whitelist;
            }
            
            if (networkSettings && networkSettings['enablePornBlock'] && g['KV'] && typeof g['KV']['get'] === 'function') {
                await refreshUserUsageIfStale(g);
            }
            {
    const V = s === 'taakaa' || !E['includes']('taakaa') && E !== 'install' && E !== 'about' && f['method'] === 'GET';
    const W = E === 'taakaa' || E['includes']('taakaa');
    if (V || W) {
        let X = config_JSON && config_JSON['paused'] === true;
        if (!X) {
            try {
                const Y = await getConfigRaw(g);
                if (Y && /"paused"\s*:\s*true/['test'](Y)) X = true;
            } catch (Z) {}
        }
        if (X) return new Response('Service temporarily paused', { 'status': 0x1f7, 'headers': { 'Content-Type': 'text/plain', 'Cache-Control': 'no-cache' } });
    }
}

if (E === 'version' && p['pathname']['includes']('taakaa') === B) {
    return new Response(JSON['stringify']({ 'Version': Number(String(Version)['replace'](/\D+/g, '')) }), {
        'status': 0xc8,
        'headers': { 'Content-Type': 'application/json' }
    });
} else {
    if (x && s === 'admin') {
        await fetchProxyParams(p, B, g);
        log('Admin request: ' + p['hostname'] + p['pathname']);
        {
            const a0 = backendModeConfig(g);
            if (a0['on'] && !isBackendExcludedPath(E, p['pathname'])) {
                if (connRejectReason) return new Response('Connection rejected: ' + connRejectReason + ')', { 'status': 0x193 });
                return await forwardWsToBackend(f, p, g, h, a0['url'], connUserId);
            }
            return await handleWsRequest(f, B, p, g, h);
        }
    } else {
        if (x && !E['includes']('taakaa') && E !== 'about' && E !== 'install' && f['method'] === 'GET') {
            if (E === 'doh' || p['pathname'] === '/dns-query' || E === 'dns' || p['pathname'] === '/dns') {
                return handleDoHRequest(f);
            }
            await fetchProxyParams(p, B, g);
            {
                const a3 = backendModeConfig(g);
                if (a3['on'] && !isBackendExcludedPath(E, p['pathname'])) {
                    if (connRejectReason) return new Response('Connection rejected: ' + connRejectReason + ')', { 'status': 0x193 });
                    return await forwardHttpToBackend(f, p, g, a3['url']);
                }
            }
            const a1 = f['headers']['get']('Content-Type') || '';
            const a2 = a1['includes']('application/grpc') || a1['includes']('grpc');
            if (!a2 && t['includes']('taakaa')) {
                log('gRPC request: ' + p['hostname'] + p['pathname']);
                return await handleGrpcRequest(f, B, g, h);
            }
            log('XHTTP request: ' + p['hostname'] + p['pathname']);
            return await handleXhttpRequest(f, B, g, h);
        } else {
            if (p['pathname'] === '/favicon.ico') {
                return Response['redirect'](p['origin'] + '/favicon.png', 0x12d);
            }
            if (E === 'doh' || p['pathname'] === '/dns-query' || E === 'dns' || p['pathname'] === '/dns') {
                return handleDoHRequest(f);
            }
            if (E === 'diagnostic') return await backendDiagnostic(g, p);
            if (E === 'warp' || E['includes']('warp')) return handleWarpRequest(f);
            if (E === 'block') return novaBlockPage(f);
            if (E === 'install' || E['includes']('install')) {
                return await handleInstall(f, g, p, x, z, q);
            }
            if (panelHasAssets(g) && /\.\w{2,5}$/['test'](p['pathname']) && s !== 'admin') {
                const a4 = await panelFetch(g, p['pathname'])['catch'](() => null);
                if (a4 && a4['ok']) return a4;
            }
            if (!x) {
                return new Response(null, { 'status': 0x12e, 'headers': { 'Location': '/', 'Cache-Control': 'no-cache' } });
            }
            if (g['KV'] && typeof g['KV']['get'] === 'function') {
                const a5 = p['pathname']['split']('/')[1];
                if (a5 === z && z !== 'taakaa') {
                    const a6 = new URLSearchParams(p['search']);
                    a6['set']('taakaa', await MD5MD5(D + B));
                    return new Response('Redirecting...', {
                        'status': 0x12e,
                        'headers': { 'Location': '?' + a6['toString']() }
                    });
                } else {
                    if (E === 'login') {
                        const a7 = f['headers']['get']('Cookie') || '';
                        const a8 = a7['split'](';')['find'](a9 => a9['trim']()['startsWith']('taakaa_session='))?.['split']('=')[1];
                        if (await verifySessionToken(a8, q, z, x)) {
                            return new Response('Already logged in', {
                                'status': 0x12e,
                                'headers': { 'Location': '/panel' }
                            });
                        }
                        if (f['method'] === 'POST') {
                            const a9 = f['headers']['get']('X-Forwarded-For') || f['headers']['get']('CF-Connecting-IP') || '0.0.0.0';
                            const aa = loginRateCheck(a9);
                            if (!aa['allowed']) {
                                return new Response(JSON['stringify']({ 'error': 'Too many attempts' }), {
                                    'status': 0x1ad,
                                    'headers': { 'Content-Type': 'application/json', 'Retry-After': String(aa['retryAfter']), 'Cache-Control': 'no-cache' }
                                });
                            }
                            const ab = await f['json']();
                            const ac = new URLSearchParams(ab);
                            const ad = ac['get']('password');
                            const ae = af => String(af == null ? '' : af)['trim']()['replace'](/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '');
                            if (timingSafeStrEqual(ae(ad), ae(x)) || w && timingSafeStrEqual(ae(ad), ae(w))) {
                                let af = null;
                                try {
                                    if (g['KV'] && typeof g['KV']['get'] === 'function') {
                                        af = JSON['parse'](await g['KV']['get']('taakaa_twofa') || '{}');
                                    }
                                } catch (ah) {}
                                if (af && af['enabled'] && af['secret']) {
                                    const ai = (ac['get']('code') || ac['get']('totp') || '')['trim']();
                                    if (!ai) {
                                        return new Response(JSON['stringify']({ 'need2fa': true }), {
                                            'status': 0xc8,
                                            'headers': { 'Content-Type': 'application/json' }
                                        });
                                    }
                                    if (!await totpVerify(af['secret'], ai)) {
                                        loginRecordFailure(a9);
                                        return new Response(JSON['stringify']({ 'need2fa': true, 'error': 'Invalid 2FA code' }), {
                                            'status': 0x191,
                                            'headers': { 'Content-Type': 'application/json' }
                                        });
                                    }
                                }
                                const ag = new Response(JSON['stringify']({ 'success': true }), {
                                    'status': 0xc8,
                                    'headers': { 'Content-Type': 'application/json' }
                                });
                                loginRecordSuccess(a9);
                                ag['headers']['set']('Set-Cookie', 'taakaa_session=' + await makeSessionToken(q, z, x) + '; HttpOnly; Secure; SameSite=Strict');
                                return ag;
                            } else {
                                loginRecordFailure(a9);
                            }
                        }
                        return await panelHtml(g, 'login');
                    } else {
                        if (E === 'set-webhook') {
                            if (!await isAuthed(f, q, z, x)) {
                                return new Response('Unauthorized', {
                                    'status': 0x12e,
                                    'headers': { 'Location': '/login' }
                                });
                            }
                            const aj = await g['KV']['get']('taakaa_telegram_config');
                            if (!aj) return new Response('No Telegram config', { 'status': 0x190 });
                            const ak = JSON['parse'](aj);
                            if (!ak['enabled']) return new Response('Telegram disabled', { 'status': 0x190 });
                            const al = p['protocol'] + '//' + p['hostname'] + '/webhook';
                            const am = 'https://api.telegram.org/bot' + ak['bot_token'] + '/setWebhook?url=' + encodeURIComponent(al);
                            const an = await fetch(am);
                            h['waitUntil'](tgSetMyCommands(ak['chat_id']));
                            const ao = await an['json']();
                            return new Response(JSON['stringify'](ao, null, 0x2), {
                                'status': 0xc8,
                                'headers': { 'Content-Type': 'application/json' }
                            });
                        } else {
                            if (E === 'webhook') {
                                if (f['method'] === 'POST') return await handleTelegramWebhook(f, g, B, D);
                                return new Response('OK', { 'status': 0xc8 });
                            } else {
                                if (E === 'myip' || E['includes']('ip')) {
                                    const ap = f['headers']['get']('X-Forwarded-For') || '';
                                    const aq = ap['split'](';')['find'](at => at['trim']()['startsWith']('cf-connecting-ip'))?.['split']('=')[1];
                                    if (!aq || !await verifySessionToken(aq, q, z, x)) {
                                        return new Response('Unauthorized', {
                                            'status': 0x12e,
                                            'headers': { 'Location': '/login' }
                                        });
                                    }
                                    h['waitUntil'](flushUsage(g));
                                    if (Date['now']() - lastCentralSync > 0x927c0) {
                                        lastCentralSync = Date['now']();
                                        h['waitUntil'](centralHeartbeat(g));
                                        h['waitUntil'](refreshAnnouncements(g));
                                    }
                                    if (E === 'myip') {
                                        const at = f['cf'] || {};
                                        return new Response(JSON['stringify']({
                                            'asn': at['asn'] || 0,
                                            'isp': at['asOrganization'] || '',
                                            'country': at['country'] || '',
                                            'city': at['city'] || '',
                                            'carrier': identifyCarrier(f)
                                        }), {
                                            'status': 0xc8,
                                            'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                        });
                                    } else {
                                        if (E === 'status') {
                                            let au = null;
                                            try {
                                                au = JSON['parse'](await g['KV']['get']('taakaa_twofa') || '{}');
                                            } catch (aw) {}
                                            const av = await g['KV']['get']('taakaa_admin_pass');
                                            return new Response(JSON['stringify']({
                                                'twofa': !!(au && au['enabled']),
                                                'passwordSource': av ? 'kv' : 'env',
                                                'envRecovery': !!w,
                                                'kvSet': !!av,
                                                'uuidPinned': !!await g['KV']['get']('taakaa_worker_uuid')
                                            }), {
                                                'status': 0xc8,
                                                'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                            });
                                        } else {
                                            if (E === 'set-password') {
                                                if (f['method'] !== 'POST') return new Response('Method not allowed', { 'status': 0x195 });
                                                let ax = {};
                                                try { ax = await f['json'](); } catch (aC) {}
                                                const ay = (ax['password'] || '')['trim']()['replace'](/[\r\n]/g, '');
                                                const az = (ax['newPassword'] || '')['trim']()['replace'](/[\r\n]/g, '');
                                                const aA = timingSafeStrEqual(ay, String(x || '')['replace'](/[\r\n]/g, '')) || w && timingSafeStrEqual(ay, String(w)['replace'](/[\r\n]/g, ''));
                                                if (!aA) {
                                                    return new Response(JSON['stringify']({ 'error': 'Current password incorrect' }), {
                                                        'status': 0x193,
                                                        'headers': { 'Content-Type': 'application/json' }
                                                    });
                                                }
                                                if (az['length'] < 0x6) {
                                                    return new Response(JSON['stringify']({ 'error': 'Password too short' }), {
                                                        'status': 0x190,
                                                        'headers': { 'Content-Type': 'application/json' }
                                                    });
                                                }
                                                try {
                                                    if (!(g['DB'] || g['D1'])) {
                                                        const aD = await g['KV']['get']('taakaa_worker_uuid');
                                                        if (!aD) {
                                                            await g['KV']['put']('taakaa_worker_uuid', B);
                                                            cachedWorkerUUID = B;
                                                            cachedWorkerUUIDAt = Date['now']();
                                                        }
                                                    }
                                                } catch (aE) {}
                                                await g['KV']['put']('taakaa_admin_pass', az);
                                                cachedAdminPass = az;
                                                cachedAdminPassAt = Date['now']();
                                                const aB = new Response(JSON['stringify']({ 'success': true }), {
                                                    'status': 0xc8,
                                                    'headers': { 'Content-Type': 'application/json' }
                                                });
                                                aB['headers']['set']('Set-Cookie', 'taakaa_session=' + await makeSessionToken(q, z, az) + '; HttpOnly; Secure; SameSite=Strict');
                                                return aB;
                                            } else {
                                                if (E === 'get-password') {
                                                    let aF = 'unknown';
                                                    try {
                                                        aF = w ? 'env' : await g['KV']['get']('taakaa_admin_pass') ? 'kv' : 'not-set';
                                                    } catch (aG) {
                                                        aF = w ? 'env' : 'error';
                                                    }
                                                    return new Response(JSON['stringify']({ 'password': x || '', 'source': aF }), {
                                                        'status': 0xc8,
                                                        'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                                    });
                                                } else {
                                                    if (E === 'totp-setup') {
                                                        const aH = randomBase32(0x20);
                                                        const aI = encodeURIComponent('otpauth://totp/Taakaa-Xi:' + p['hostname'] + '?secret=');
                                                        const aJ = aI + aH + '&issuer=Taakaa-Xi&algorithm=SHA1&digits=6&period=30';
                                                        return new Response(JSON['stringify']({ 'secret': aH, 'otpauth': aJ }), {
                                                            'status': 0xc8,
                                                            'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                                        });
                                                    } else {
                                                        if (E === 'totp-enable') {
                                                            if (f['method'] !== 'POST') return new Response('Method not allowed', { 'status': 0x195 });
                                                            let aK = {};
                                                            try { aK = await f['json'](); } catch (aN) {}
                                                            const aL = (aK['secret'] || '')['trim']()['replace'](/[\r\n]/g, '');
                                                            const aM = (aK['code'] || '')['trim']()['replace'](/[\r\n]/g, '');
                                                            if (!aL) {
                                                                return new Response(JSON['stringify']({ 'error': 'Missing secret' }), {
                                                                    'status': 0x190,
                                                                    'headers': { 'Content-Type': 'application/json' }
                                                                });
                                                            }
                                                            if (!await totpVerify(aL, aM)) {
                                                                return new Response(JSON['stringify']({ 'error': 'Invalid verification code' }), {
                                                                    'status': 0x190,
                                                                    'headers': { 'Content-Type': 'application/json' }
                                                                });
                                                            }
                                                            await g['KV']['put']('taakaa_twofa', JSON['stringify']({ 'enabled': true, 'secret': aL, 'addedAt': Date['now']() }));
                                                            return new Response(JSON['stringify']({ 'success': true }), {
                                                                'status': 0xc8,
                                                                'headers': { 'Content-Type': 'application/json' }
                                                            });
                                                        } else {
                                                            if (E === 'totp-disable') {
                                                                if (f['method'] !== 'POST') return new Response('Method not allowed', { 'status': 0x195 });
                                                                let aO = {};
                                                                try { aO = await f['json'](); } catch (aR) {}
                                                                const aP = (aO['code'] || '')['trim']()['replace'](/[\r\n]/g, '');
                                                                let aQ = null;
                                                                try {
                                                                    aQ = JSON['parse'](await g['KV']['get']('taakaa_twofa') || '{}');
                                                                } catch (aS) {}
                                                                if (aQ && aQ['enabled'] && aQ['secret'] && !await totpVerify(aQ['secret'], aP)) {
                                                                    return new Response(JSON['stringify']({ 'error': 'Invalid verification code' }), {
                                                                        'status': 0x190,
                                                                        'headers': { 'Content-Type': 'application/json' }
                                                                    });
                                                                }
                                                                await g['KV']['delete']('taakaa_twofa');
                                                                return new Response(JSON['stringify']({ 'success': true }), {
                                                                    'status': 0xc8,
                                                                    'headers': { 'Content-Type': 'application/json' }
                                                                });
                                                            } else {
                                                                if (E === 'logs') {
                                                                    const aT = JSON['stringify'](await logReadAll(g));
                                                                    return new Response(aT, {
                                                                        'status': 0xc8,
                                                                        'headers': { 'Content-Type': 'application/json' }
                                                                    });
                                                                } else {
                                                                    if (a5 === 'cf-usage') {
                                                                        try {
                                                                            const aU = await getCloudflareUsage(
                                                                                p['search']['get']('email'),
                                                                                p['search']['get']('api_key'),
                                                                                p['search']['get']('account_id'),
                                                                                p['search']['get']('api_token')
                                                                            );
                                                                            return new Response(JSON['stringify'](aU, null, 0x2), {
                                                                                'status': 0xc8,
                                                                                'headers': { 'Content-Type': 'application/json' }
                                                                            });
                                                                        } catch (aV) {
                                                                            const aW = { 'msg': 'Cloudflare usage error: ' + aV['message'], 'error': aV['message'] };
                                                                            return new Response(JSON['stringify'](aW, null, 0x2), {
                                                                                'status': 0x1f4,
                                                                                'headers': { 'Content-Type': 'application/json' }
                                                                            });
                                                                        }
                                                                    } else {
                                                                        if (a5 === 'proxy-check') {
                                                                            if (p['search']['get']('proxy') && p['search']['get']('target')) {
                                                                                const aX = p['search']['get']('proxy');
                                                                                try {
                                                                                    new URL(aX);
                                                                                    const aY = await requestBestApi([aX], p['search']['get']('timeout') || '3000');
                                                                                    let aZ = aY[0][0] > 0 ? aY[0] : aY[1];
                                                                                    aZ = aZ['map'](b0 => b0['replace'](/#(.+)$/, (b1, b2) => '#' + decodeURIComponent(b2)));
                                                                                    return new Response(JSON['stringify']({ 'success': true, 'data': aZ }, null, 0x2), {
                                                                                        'status': 0xc8,
                                                                                        'headers': { 'Content-Type': 'application/json' }
                                                                                    });
                                                                                } catch (b0) {
                                                                                    const b1 = { 'msg': 'Proxy check error: ' + b0['message'], 'error': b0['message'] };
                                                                                    return new Response(JSON['stringify'](b1, null, 0x2), {
                                                                                        'status': 0x1f4,
                                                                                        'headers': { 'Content-Type': 'application/json' }
                                                                                    });
                                                                                }
                                                                            }
                                                                            return new Response(JSON['stringify']({ 'success': false, 'data': [] }, null, 0x2), {
                                                                                'status': 0x193,
                                                                                'headers': { 'Content-Type': 'application/json' }
                                                                            });
                                                                        } else {
                                                                            if (E === 'check-proxy') {
                                                                                const b2 = ['socks5', 'http', 'https', 'turn', 'sstp']['find'](b6 => p['pathname']['includes'](b6)) || null;
                                                                                if (!b2) {
                                                                                    return new Response(JSON['stringify']({ 'error': 'Invalid proxy type' }), {
                                                                                        'status': 0x190,
                                                                                        'headers': { 'Content-Type': 'application/json' }
                                                                                    });
                                                                                }
                                                                                const b3 = p['pathname']['split'](b2)[1];
                                                                                const b4 = Date['now']();
                                                                                let b5;
                                                                                try {
                                                                                    parsedSocks5Address = await getSocks5Account(b3, getProxyDefaultPort(b2));
                                                                                    const { username: b6, password: b7, hostname: b8, port: b9 } = parsedSocks5Address;
                                                                                    const ba = b6 && b7 ? b6 + ':' + b7 + '@' + b8 + ':' + b9 : b8 + ':' + b9;
                                                                                    try {
                                                                                        const bb = 'taakaa.xyz';
                                                                                        const bc = 0x1bb;
                                                                                        const bd = new TextEncoder();
                                                                                        const be = new TextDecoder();
                                                                                        const bf = createRequestTcpConnector(f);
                                                                                        let bg = null, bh = null;
                                                                                        try {
                                                                                            bg = b2 === 'socks5' ? await socks5Connect(bb, bc, new Uint8Array(0), bf) :
                                                                                                 b2 === 'turn' ? await turnConnect(parsedSocks5Address, bb, bc, bf) :
                                                                                                 b2 === 'sstp' ? await sstpConnect(parsedSocks5Address, bb, bc, bf) :
                                                                                                 b2 === 'https' && isIPHostname(b8) ? await httpsConnect(bb, bc, new Uint8Array(0), bf) :
                                                                                                 await httpConnect(bb, bc, new Uint8Array(0), b2 === 'https', bf);
                                                                                            if (!bg) throw new Error('Proxy connection failed');
                                                                                            bh = new TlsClient(bg, { 'serverName': bb, 'insecure': true });
                                                                                            await bh['connect']();
                                                                                            await bh['write'](bd['encode']('HEAD / HTTP/1.1\r\nHost: ' + bb + '\r\nConnection: close\r\n\r\n'));
                                                                                            let bi = new Uint8Array(0);
                                                                                            let bj = -1;
                                                                                            let bk = null;
                                                                                            let bl = false;
                                                                                            const bm = 0x40 * 0x400;
                                                                                            while (bi['length'] < bm) {
                                                                                                const bq = await bh['read']();
                                                                                                if (!bq) break;
                                                                                                if (bq['length'] === 0) continue;
                                                                                                bi = concatByteData(bi, bq);
                                                                                                if (bj === -1) {
                                                                                                    const br = bi['findIndex']((bs, bt) => bt < bi['length'] - 3 && bi[bt] === 0xd && bi[bt + 1] === 0xa && bi[bt + 2] === 0xd && bi[bt + 3] === 0xa);
                                                                                                    if (br !== -1) {
                                                                                                        bj = br + 4;
                                                                                                        const bs = be['decode'](bi['slice'](0, bj));
                                                                                                        const bt = bs['split']('\r\n')[0] || '';
                                                                                                        const bu = bt['match'](/HTTP\/\d\.\d\s+(\d+)/);
                                                                                                        const bv = bu ? parseInt(bu[1], 10) : NaN;
                                                                                                        if (!Number['isInteger'](bv) || bv < 0xc8 || bv >= 0x12c) {
                                                                                                            throw new Error('Bad status: ' + (bt || 'empty'));
                                                                                                        }
                                                                                                        const bw = bs['match'](/\r\nContent-Length:\s*(\d+)/i);
                                                                                                        if (bw) bk = parseInt(bw[1], 10);
                                                                                                        bl = /\r\nTransfer-Encoding:\s*chunked/i['test'](bs);
                                                                                                    }
                                                                                                }
                                                                                                if (bj !== -1 && bk !== null && bi['length'] >= bj + bk) break;
                                                                                                if (bj !== -1 && bl && be['decode'](bi)['includes']('0\r\n\r\n')) break;
                                                                                            }
                                                                                            if (bj === -1) throw new Error('No response headers');
                                                                                            const bn = be['decode'](bi);
                                                                                            const bo = bn['match'](/(?:^|\n)ip=(.*)/)?.[1];
                                                                                            const bp = bn['match'](/(?:^|\n)loc=(.*)/)?.[1];
                                                                                            if (!bo || !bp) throw new Error('No ip/loc in response');
                                                                                            b5 = { 'success': true, 'proxy': b2 + '://' + ba, 'ip': bo, 'loc': bp, 'responseTime': Date['now']() - b4 };
                                                                                        } finally {
                                                                                            try { bh ? bh['close']() : await bg?.['close']?.(); } catch (bx) {}
                                                                                        }
                                                                                    } catch (by) {
                                                                                        b5 = { 'success': false, 'error': by['message'], 'proxy': b2 + '://' + ba, 'responseTime': Date['now']() - b4 };
                                                                                    }
                                                                                } catch (bz) {
                                                                                    b5 = { 'success': false, 'error': bz['message'], 'proxy': b2 + '://' + b3, 'responseTime': Date['now']() - b4 };
                                                                                }
                                                                                return new Response(JSON['stringify'](b5, null, 0x2), {
                                                                                    'status': 0xc8,
                                                                                    'headers': { 'Content-Type': 'application/json' }
                                                                                });
                                                                            } else {
                                                                                if (E === 'announce') {
                                                                                    const bA = JSON['parse'](await g['KV']['get']('taakaa_announcements') || '{}');
                                                                                    const bB = await announceSubLinks(g, { 'baseUrl': p['origin'] + '//' + p['hostname'], 'health': bA });
                                                                                    return new Response(JSON['stringify'](bB, null, 0x2), {
                                                                                        'status': bB['error'] ? 0x190 : 0xc8,
                                                                                        'headers': { 'Content-Type': 'application/json' }
                                                                                    });
                                                                                } else {
                                                                                    if (E === 'mirror') {
                                                                                        const bC = await publishSubMirror(g, p['protocol'] + '//' + p['hostname']);
                                                                                        const bD = !bC['error'] && Array['isArray'](bC['results']) && bC['results']['every'](bE => bE['ok']);
                                                                                        return new Response(JSON['stringify'](bC, null, 0x2), {
                                                                                            'status': bC['error'] ? 0x190 : bD ? 0xc8 : 0x1f6,
                                                                                            'headers': { 'Content-Type': 'application/json' }
                                                                                        });
                                                                                    } else {
                                                                                        if (E === 'warp-register') {
                                                                                            let bE = null;
                                                                                            try {
                                                                                                bE = JSON['parse'](await g['KV']['get']('taakaa_warp') || '{}');
                                                                                            } catch (bF) {}
                                                                                            if (f['method'] === 'POST') {
                                                                                                let bG = {};
                                                                                                try { bG = await f['json'](); } catch (bH) {}
                                                                                                try {
                                                                                                    if (bG['license']) {
                                                                                                        if (!bE || !bE['id']) bE = await warpRegisterAccount();
                                                                                                        const { api: bI } = await getCentralApi(g);
                                                                                                        if (!bI) throw new Error('No central API');
                                                                                                        let bJ = [];
                                                                                                        try {
                                                                                                            const bM = await fetch(bI + '/warp/licenses', { 'headers': { 'User-Agent': 'Taakaa-Xi-Warp' } });
                                                                                                            const bN = await bM['json']();
                                                                                                            bJ = Array['isArray'](bN['licenses']) ? bN['licenses'] : [];
                                                                                                        } catch (bO) {}
                                                                                                        if (!bJ['length']) throw new Error('No licenses available');
                                                                                                        let bK = false, bL = '';
                                                                                                        for (const bP of bJ) {
                                                                                                            try {
                                                                                                                await warpApplyLicense(bE, String(bP)['toString']());
                                                                                                                bK = true;
                                                                                                                break;
                                                                                                            } catch (bQ) {
                                                                                                                bL = bQ && bQ['message'] ? bQ['message'] : String(bQ);
                                                                                                            }
                                                                                                        }
                                                                                                        if (!bK) throw new Error('License apply failed: ' + bL + ')');
                                                                                                    } else if (bG['warp-plus']) {
                                                                                                        if (!bE || !bE['id']) bE = await warpRegisterAccount();
                                                                                                        await warpApplyLicense(bE, String(bG['license_key'])['toString']());
                                                                                                    } else {
                                                                                                        bE = await warpRegisterAccount();
                                                                                                        if (bG['wow']) {
                                                                                                            const bR = await warpRegisterAccount();
                                                                                                            bR['warpPlus'] = true;
                                                                                                            bE['wow'] = bR;
                                                                                                        }
                                                                                                    }
                                                                                                    bE['registered'] = true;
                                                                                                    await g['KV']['put']('taakaa_warp', JSON['stringify'](bE));
                                                                                                    h['waitUntil'](requestLogRecord(g, f, F, bG['license'] ? 'warp_license' : 'warp_register', config_JSON));
                                                                                                    return new Response(JSON['stringify'](warpPublicView(bE, networkSettings && networkSettings['warpEndpoint'])), {
                                                                                                        'status': 0xc8,
                                                                                                        'headers': { 'Content-Type': 'application/json' }
                                                                                                    });
                                                                                                } catch (bS) {
                                                                                                    return new Response(JSON['stringify']({
                                                                                                        'registered': !!(bE && bE['registered']),
                                                                                                        'error': bS && bS['message'] ? bS['message'] : String(bS)
                                                                                                    }), {
                                                                                                        'status': 0xc8,
                                                                                                        'headers': { 'Content-Type': 'application/json' }
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                            return new Response(JSON['stringify'](warpPublicView(bE, networkSettings && networkSettings['warpEndpoint'])), {
                                                                                                'status': 0xc8,
                                                                                                'headers': { 'Content-Type': 'application/json' }
                                                                                            });
                                                                                        } else {
                                                                                            if (E === 'hosts') {
                                                                                                const bT = await getPoolHosts(g);
                                                                                                const bU = p['search']['get']('check') ? await checkDomainHealth(g, bT, p['search']['get']('host')) : JSON['parse'](await g['KV']['get']('taakaa_hosts_health') || '{}');
                                                                                                return new Response(JSON['stringify']({ 'hosts': bT, 'health': bU }, null, 0x2), {
                                                                                                    'status': 0xc8,
                                                                                                    'headers': { 'Content-Type': 'application/json' }
                                                                                                });
                                                                                            } else {
                                                                                                if (E === 'announcements') {
                                                                                                    if (p['search']['get']('refresh')) await refreshAnnouncements(g);
                                                                                                    return new Response(await g['KV']['get']('taakaa_announcements') || '{}', {
                                                                                                        'status': 0xc8,
                                                                                                        'headers': { 'Content-Type': 'application/json' }
                                                                                                    });
                                                                                                } else {
                                                                                                    if (E === 'central') {
                                                                                                        const { api: bV, token: bW } = await getCentralApi(g);
                                                                                                        if (!bV) {
                                                                                                            return new Response(JSON['stringify']({ 'configured': false }), {
                                                                                                                'status': 0xc8,
                                                                                                                'headers': { 'Content-Type': 'application/json' }
                                                                                                            });
                                                                                                        }
                                                                                                        try {
                                                                                                            const bX = await fetch(bV + '/status', { 'headers': bW ? { 'Authorization': 'Bearer ' + bW } : {} });
                                                                                                            const bY = await bX['json']()['catch'](() => ({}));
                                                                                                            return new Response(JSON['stringify']({ 'configured': true, ...bY }), {
                                                                                                                'status': 0xc8,
                                                                                                                'headers': { 'Content-Type': 'application/json' }
                                                                                                            });
                                                                                                        } catch (bZ) {
                                                                                                            return new Response(JSON['stringify']({ 'configured': true, 'error': bZ['message'] }), {
                                                                                                                'status': 0xc8,
                                                                                                                'headers': { 'Content-Type': 'application/json' }
                                                                                                            });
                                                                                                        }
                                                                                                    } else {
                                                                                                        if (E === 'sync') {
                                                                                                            const { api: c0, token: c1 } = await getCentralApi(g);
                                                                                                            if (!c0) {
                                                                                                                return new Response(JSON['stringify']({ 'ok': false, 'error': 'No central API' }), {
                                                                                                                    'status': 0x190,
                                                                                                                    'headers': { 'Content-Type': 'application/json' }
                                                                                                                });
                                                                                                            }
                                                                                                            try {
                                                                                                                const c2 = await fetch(c0 + '/sync', {
                                                                                                                    'method': 'POST',
                                                                                                                    'headers': { 'Content-Type': 'application/json', ...c1 ? { 'Authorization': 'Bearer ' + c1 } : {} },
                                                                                                                    'body': await f['json']()
                                                                                                                });
                                                                                                                h['waitUntil'](refreshAnnouncements(g));
                                                                                                                return new Response(await c2['text'](), {
                                                                                                                    'status': c2['status'],
                                                                                                                    'headers': { 'Content-Type': 'application/json' }
                                                                                                                });
                                                                                                            } catch (c3) {
                                                                                                                return new Response(JSON['stringify']({ 'ok': false, 'error': c3['message'] }), {
                                                                                                                    'status': 0x1f6,
                                                                                                                    'headers': { 'Content-Type': 'application/json' }
                                                                                                                });
                                                                                                            }
                                                                                                        } else {
                                                                                                            if (E === 'version-check') {
                                                                                                                const c4 = String(Version)['replace'](/^[vV]/, '');
                                                                                                                let c5 = '', c6 = '', c7 = '';
                                                                                                                try {
                                                                                                                    const c9 = await fetch(TAAKAA_VERSION_URL, { 'headers': { 'User-Agent': 'Taakaa-Xi-Client' }, 'cf': { 'cacheTtl': 0 } });
                                                                                                                    if (c9['ok']) {
                                                                                                                        const ca = await c9['json']();
                                                                                                                        c5 = String(ca['latest'] || '')['replace'](/^[vV]/, '');
                                                                                                                        c6 = ca['notes'] || '';
                                                                                                                        c7 = ca['worker_url'] || '';
                                                                                                                    }
                                                                                                                } catch (cb) {}
                                                                                                                const c8 = !!c5 && versionGreater(c5, c4);
                                                                                                                return new Response(JSON['stringify']({
                                                                                                                    'current': c4,
                                                                                                                    'latest': c5,
                                                                                                                    'updateAvailable': c8,
                                                                                                                    'notes': c6,
                                                                                                                    'worker_url': c7
                                                                                                                }), {
                                                                                                                    'status': 0xc8,
                                                                                                                    'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                                                                                                });
                                                                                                            } else {
                                                                                                                if (E === 'deploy') {
                                                                                                                    if (f['method'] !== 'POST') {
                                                                                                                        return new Response(JSON['stringify']({ 'error': 'Method not allowed' }), {
                                                                                                                            'status': 0x195,
                                                                                                                            'headers': { 'Content-Type': 'application/json' }
                                                                                                                        });
                                                                                                                    }
                                                                                                                    const cc = (co, cp) => new Response(JSON['stringify'](Object['assign']({ 'error': co }, cp || {})), {
                                                                                                                        'status': 0xc8,
                                                                                                                        'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                                                                                                    });
                                                                                                                    let ce = {};
                                                                                                                    try { ce = await f['json'](); } catch (co) {}
                                                                                                                    const cg = String(ce['api_token'] || '')['trim']();
                                                                                                                    if (!cg) return cc('Missing API token');
                                                                                                                    let ch;
                                                                                                                    try { ch = await cfVerifyToken(cg); } catch (cp) { ch = { 'ok': false }; }
                                                                                                                    if (!ch || !ch['ok']) return cc('Invalid API token');
                                                                                                                    let ci = String(ce['account_id'] || '')['trim']();
                                                                                                                    if (!ci) {
                                                                                                                        let cq = [];
                                                                                                                        try { cq = await cfListAccounts(cg); } catch (cs) {}
                                                                                                                        if (!cq['length']) return cc('No accounts found');
                                                                                                                        if (cq['length'] === 1) ci = cq[0]['id'];
                                                                                                                        else return cc('Multiple accounts found, specify account_id', { 'accounts': cq });
                                                                                                                    }
                                                                                                                    let ck = String(ce['script_name'] || '')['trim']();
                                                                                                                    if (!ck) {
                                                                                                                        const ct = /^([a-z0-9][a-z0-9-]*)\.taakaa\.workers\.dev$/i['test'](p['hostname']);
                                                                                                                        if (ct) ck = ct[1];
                                                                                                                        else return cc('Could not determine script name');
                                                                                                                    }
                                                                                                                    try {
                                                                                                                        const cu = await fetch(CF_API + '/accounts/' + ci + '/workers/scripts/' + ck, { 'headers': cfHeaders(cg) });
                                                                                                                        const cv = await cfJson(cu);
                                                                                                                        if (!cv || !cv['success']) return cc('Script not found');
                                                                                                                    } catch (cw) { return cc('Script not accessible'); }
                                                                                                                    let cl = TAAKAA_WORKER_SRC_FALLBACK;
                                                                                                                    let cm = '';
                                                                                                                    try {
                                                                                                                        const cx = await fetch(TAAKAA_VERSION_URL, { 'headers': { 'User-Agent': 'Taakaa-Xi-Deploy' } });
                                                                                                                        if (cx['ok']) {
                                                                                                                            const cy = await cx['json']();
                                                                                                                            if (cy['worker_url']) cl = cy['worker_url'];
                                                                                                                            cm = String(cy['version'] || '')['replace'](/^[vV]/, '');
                                                                                                                        }
                                                                                                                    } catch (cz) {}
                                                                                                                    let cn = '';
                                                                                                                    try {
                                                                                                                        const cA = await fetch(cl, { 'headers': { 'User-Agent': 'Taakaa-Xi-Deploy' } });
                                                                                                                        if (!cA['ok']) throw new Error('Fetch failed: ' + cA['status']);
                                                                                                                        cn = await cA['text']();
                                                                                                                    } catch (cB) { return cc('Failed to fetch worker code', { 'detail': cB && cB['message'] || String(cB) }); }
                                                                                                                    if (cn['length'] < 0x3e8 || !/export\s+default|addEventListener\s*\(/['test'](cn)) {
                                                                                                                        return cc('Invalid worker code');
                                                                                                                    }
                                                                                                                    try {
                                                                                                                        const cC = new FormData();
                                                                                                                        cC['append']('metadata', new Blob([JSON['stringify']({ 'main_module': 'worker.js' })], { 'type': 'application/json' }));
                                                                                                                        cC['append']('worker.js', new Blob([cn], { 'type': 'application/javascript' }), 'worker.js');
                                                                                                                        const cD = await fetch(CF_API + '/accounts/' + ci + '/workers/scripts/' + ck, {
                                                                                                                            'method': 'PUT',
                                                                                                                            'headers': cfHeaders(cg),
                                                                                                                            'body': cC
                                                                                                                        });
                                                                                                                        const cE = await cfJson(cD);
                                                                                                                        if (!cE || !cE['success']) {
                                                                                                                            const cF = cE && cE['errors'] && cE['errors'][0] && cE['errors'][0]['message'] || 'Unknown error: ' + cD['status'];
                                                                                                                            return cc('Upload failed', { 'detail': cF });
                                                                                                                        }
                                                                                                                    } catch (cG) {
                                                                                                                        return cc('Upload error', { 'detail': cG && cG['message'] || String(cG) });
                                                                                                                    }
                                                                                                                    h['waitUntil'](requestLogRecord(g, f, F, 'deploy', config_JSON));
                                                                                                                    return new Response(JSON['stringify']({ 'success': true, 'version': cm || undefined }), {
                                                                                                                        'status': 0xc8,
                                                                                                                        'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                                                                                                    });
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
                                        }
                        try {
                config_JSON = await readConfigJson(g, D, B, q);
            } catch (cH) {
                console['log']('Config load error: ' + cH['message']);
                const cI = new Date()['toISOString']();
                config_JSON = {
                    'TIME': cI,
                    'HOST': D,
                    'HOSTS': [D],
                    'UUID': B,
                    'PATH': '/',
                    'protocolType': 'vless',
                    'transportProtocol': 'ws',
                    'gRPCmode': 'plain',
                    'skipCertVerify': false,
                    'enable0RTT': false,
                    'tlsFragment': null,
                    'randomPath': false,
                    'Fingerprint': 'chrome',
                    'optimizedSubGeneration': {
                        'local': true,
                        'localIPPool': { 'randomIP': true, 'randomCount': 0x10, 'specifiedPorts': -1 },
                        'SUB': null,
                        'SUBNAME': 'Taakaa-Xi-Sub',
                        'SUBUpdateTime': 0x3,
                        'TOKEN': await MD5MD5(D + B)
                    },
                    'CF': { 'Email': null, 'GlobalAPIKey': null, 'AccountID': null, 'APIToken': null, 'UsageAPI': null, 'Usage': { 'success': false, 'pages': 0, 'workers': 0, 'total': 0, 'max': 0x186a0 } },
                    'TG': { 'enabled': false, 'BotToken': null, 'ChatID': null },
                    'loadTime': 'loading'
                };
            }
            
            if (E === 'config') {
                try {
                    config_JSON = await readConfigJson(g, D, B, q, true);
                    h['waitUntil'](requestLogRecord(g, f, F, 'config_view', config_JSON));
                    config_JSON['source'] = 'taakaa';
                    return new Response(JSON['stringify'](config_JSON, null, 0x2), {
                        'status': 0xc8,
                        'headers': { 'Content-Type': 'application/json' }
                    });
                } catch (cJ) {
                    const cK = { 'msg': 'Config error: ' + cJ['message'], 'error': cJ['message'] };
                    return new Response(JSON['stringify'](cK, null, 0x2), {
                        'status': 0x1f4,
                        'headers': { 'Content-Type': 'application/json' }
                    });
                }
            } else {
                if (f['method'] === 'POST') {
                    if (E === 'save-config') {
                        try {
                            const cL = await f['json']();
                            if (!cL['config'] || !cL['path']) {
                                return new Response(JSON['stringify']({ 'error': 'Missing config or path' }), {
                                    'status': 0x190,
                                    'headers': { 'Content-Type': 'application/json' }
                                });
                            }
                            await putConfig(g, JSON['stringify'](cL, null, 0x2));
                            h['waitUntil'](requestLogRecord(g, f, F, 'config_save', config_JSON));
                            return new Response(JSON['stringify']({ 'success': true, 'message': 'Config saved' }), {
                                'status': 0xc8,
                                'headers': { 'Content-Type': 'application/json' }
                            });
                        } catch (cM) {
                            console['log']('Save config error:', cM);
                            return new Response(JSON['stringify']({ 'error': 'Failed to save config: ' + cM['message'] }), {
                                'status': 0x1f4,
                                'headers': { 'Content-Type': 'application/json' }
                            });
                        }
                    } else {
                        if (E === 'cf-config') {
                            try {
                                const cN = await f['json']();
                                const cO = { 'Email': null, 'GlobalAPIKey': null, 'AccountID': null, 'APIToken': null, 'UsageAPI': null };
                                if (!cN['config'] || cN['config'] !== true) {
                                    if (cN['email'] && cN['global_api_key']) {
                                        cO['Email'] = cN['email'];
                                        cO['GlobalAPIKey'] = cN['global_api_key'];
                                    } else if (cN['account_id'] && cN['api_token']) {
                                        cO['AccountID'] = cN['account_id'];
                                        cO['APIToken'] = cN['api_token'];
                                    } else if (cN['api_token']) {
                                        cO['APIToken'] = cN['api_token'];
                                    } else {
                                        return new Response(JSON['stringify']({ 'error': 'Invalid credentials' }), {
                                            'status': 0x190,
                                            'headers': { 'Content-Type': 'application/json' }
                                        });
                                    }
                                }
                                await g['KV']['put']('taakaa_cf_config', JSON['stringify'](cO, null, 0x2));
                                h['waitUntil'](requestLogRecord(g, f, F, 'cf_config', config_JSON));
                                return new Response(JSON['stringify']({ 'success': true, 'message': 'CF config saved' }), {
                                    'status': 0xc8,
                                    'headers': { 'Content-Type': 'application/json' }
                                });
                            } catch (cP) {
                                console['log']('CF config error:', cP);
                                return new Response(JSON['stringify']({ 'error': 'Failed to save CF config: ' + cP['message'] }), {
                                    'status': 0x1f4,
                                    'headers': { 'Content-Type': 'application/json' }
                                });
                            }
                        } else {
                            if (E === 'tg-config') {
                                try {
                                    const cQ = await f['json']();
                                    let cR = null, cS = null;
                                    if (cQ['disable'] && cQ['disable'] === true) {
                                        const cT = { 'BotToken': null, 'ChatID': null };
                                        await g['KV']['put']('taakaa_telegram_config', JSON['stringify'](cT, null, 0x2));
                                    } else {
                                        if (!cQ['bot_token'] || !cQ['chat_id']) {
                                            return new Response(JSON['stringify']({ 'error': 'Missing bot_token or chat_id' }), {
                                                'status': 0x190,
                                                'headers': { 'Content-Type': 'application/json' }
                                            });
                                        }
                                        await g['KV']['put']('taakaa_telegram_config', JSON['stringify'](cQ, null, 0x2));
                                        try {
                                            const cU = p['protocol'] + '//' + p['hostname'] + '/webhook';
                                            const cV = await fetch('https://api.telegram.org/bot' + cQ['bot_token'] + '/setWebhook?url=' + encodeURIComponent(cU));
                                            const cW = await cV['json']()['catch'](() => ({}));
                                            h['waitUntil'](tgSetMyCommands(cQ['chat_id']));
                                            cR = !!cW['ok'];
                                            if (!cW['ok']) cS = cW['description'] || 'Unknown error';
                                        } catch (cX) { cR = false; cS = cX['message']; }
                                    }
                                    h['waitUntil'](requestLogRecord(g, f, F, 'tg_config', config_JSON));
                                    return new Response(JSON['stringify']({ 'success': true, 'message': 'Telegram config saved', 'webhookSet': cR, 'webhookError': cS }), {
                                        'status': 0xc8,
                                        'headers': { 'Content-Type': 'application/json' }
                                    });
                                } catch (cY) {
                                    console['log']('TG config error:', cY);
                                    return new Response(JSON['stringify']({ 'error': 'Failed to save TG config: ' + cY['message'] }), {
                                        'status': 0x1f4,
                                        'headers': { 'Content-Type': 'application/json' }
                                    });
                                }
                            } else {
                                if (E === 'users') {
                                    try {
                                        const cZ = JSON['parse'](await g['KV']['get']('taakaa_users') || '{}');
                                        if (f['method'] === 'POST') {
                                            const d7 = await f['json']();
                                            cZ['enabled'] = !!d7['enabled'];
                                            cZ['users'] = Array['isArray'](d7['users']) ? d7['users'] : [];
                                            {
                                                const d8 = {};
                                                for (const da of cZ['users']) {
                                                    if (da && da['username']) {
                                                        d8[String(da['username'])['trim']()] = 1;
                                                    }
                                                }
                                                const d9 = () => typeof crypto !== 'undefined' && crypto['randomUUID'] ? crypto['randomUUID']()['replace'](/-/g, '') : Math['random']()['toString'](16)['slice'](2) + Math['random']()['toString'](16)['slice'](2);
                                                for (let db = 0; db < cZ['users']['length']; db++) {
                                                    const dc = cZ['users'][db];
                                                    if (!dc) continue;
                                                    if (!dc['uuid']) dc['uuid'] = d9()['slice'](0, 0xc);
                                                    if (!dc['username']) {
                                                        let dd = String(dc['name'] || 'user-' + (db + 1))['toLowerCase']()['replace'](/[^a-z0-9]+/g, '-')['replace'](/^-+|-+$/g, '')['slice'](0, 0x18) || 'user' + (db + 1);
                                                        let de = dd;
                                                        let df = 2;
                                                        while (d8[de]) { de = dd + df; df++; }
                                                        d8[de] = 1;
                                                        dc['username'] = de;
                                                    }
                                                }
                                            }
                                            await g['KV']['put']('taakaa_users', JSON['stringify'](cZ, null, 0x2));
                                            try { await g['KV']['delete']('taakaa_users_cache'); } catch (dg) {}
                                            savedUsersAuth = { 'multiUser': cZ['enabled'], 'users': cZ['users'] };
                                            savedUsersAuthAt = Date['now']();
                                            h['waitUntil'](requestLogRecord(g, f, F, 'users_update', config_JSON));
                                            return new Response(JSON['stringify']({ 'success': true, 'count': cZ['users']['length'], 'multiUser': cZ['enabled'] }), {
                                                'status': 0xc8,
                                                'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                            });
                                        }
                                        let d0 = !!cZ['enabled'];
                                        let d1 = Array['isArray'](cZ['users']) ? cZ['users'] : [];
                                        if (savedUsersAuth && Date['now']() - savedUsersAuthAt < 0x1d4c0) {
                                            d0 = !!savedUsersAuth['multiUser'];
                                            d1 = savedUsersAuth['users'];
                                        }
                                        const d2 = {}, d3 = {}, d4 = {};
                                        const d5 = getDateKey(new Date());
                                        let d6 = false;
                                        for (const dh of d1) {
                                            if (!dh || !dh['id']) continue;
                                            try {
                                                const di = await usageGet(g, 'taakaa_usage_' + dh['id']);
                                                d2[dh['id']] = di && di['total'] || 0;
                                                d3[dh['id']] = { 'up': di && di['up'] || 0, 'down': di && di['down'] || 0 };
                                            } catch (dj) {
                                                d2[dh['id']] = 0;
                                                d3[dh['id']] = { 'up': 0, 'down': 0 };
                                            }
                                            try {
                                                const dk = await usageGet(g, 'taakaa_day_usage_' + dh['id'] + ':' + d5);
                                                d4[dh['id']] = dk && dk['total'] || 0;
                                            } catch (dl) {
                                                d4[dh['id']] = 0;
                                            }
                                            if (dh['enabled'] !== false) {
                                                let dm = null;
                                                if (dh['limit'] && d2[dh['id']] >= dh['limit']) dm = 'Limit exceeded';
                                                else if (dh['dailyLimit'] && d4[dh['id']] >= dh['dailyLimit']) dm = 'Daily limit exceeded';
                                                else if (dh['expiry']) {
                                                    const dn = Date['parse'](dh['expiry']);
                                                    if (!isNaN(dn) && Date['now']() > dn) dm = 'Expired';
                                                }
                                                if (dm) {
                                                    dh['enabled'] = false;
                                                    dh['disabledReason'] = dm;
                                                    dh['disabledAt'] = Date['now']();
                                                    dh['notified'] = true;
                                                    d6 = true;
                                                }
                                            }
                                        }
                                        if (d6) {
                                            try {
                                                cZ['users'] = d1;
                                                await g['KV']['put']('taakaa_users', JSON['stringify'](cZ, null, 0x2));
                                                cachedNetworkSettings = null;
                                                savedUsersAuth = { 'multiUser': d0, 'users': d1 };
                                                savedUsersAuthAt = Date['now']();
                                            } catch (dp) {}
                                        }
                                        return new Response(JSON['stringify']({ 'multiUser': d0, 'users': d1, 'usage': d2, 'usageIO': d3, 'usageDay': d4 }), {
                                            'status': 0xc8,
                                            'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                        });
                                    } catch (dq) {
                                        return new Response(JSON['stringify']({ 'error': String(dq && dq['message'] || dq) }), {
                                            'status': 0x1f4,
                                            'headers': { 'Content-Type': 'application/json' }
                                        });
                                    }
                                } else {
                                    if (E === 'user-reset') {
                                        try {
                                            if (f['method'] !== 'POST') return new Response('Method not allowed', { 'status': 0x195 });
                                            const dr = await f['json']()['catch'](() => ({}));
                                            const ds = dr && dr['id'];
                                            if (!ds) {
                                                return new Response(JSON['stringify']({ 'error': 'Missing user ID' }), {
                                                    'status': 0x190,
                                                    'headers': { 'Content-Type': 'application/json' }
                                                });
                                            }
                                            await usageReset(g, 'taakaa_usage_' + ds);
                                            const dt = new Date();
                                            for (let dv = 0; dv < 0x28; dv++) {
                                                const dw = new Date(dt);
                                                dw['setDate'](dw['getDate']() - dv);
                                                await usageReset(g, 'taakaa_day_usage_' + ds + ':' + getDateKey(dw));
                                            }
                                            if (userUsageCache[ds] != null) userUsageCache[ds] = 0;
                                            if (userDayUsageCache[ds] != null) userDayUsageCache[ds] = 0;
                                            const du = JSON['parse'](await g['KV']['get']('taakaa_users') || '{}');
                                            if (Array['isArray'](du['users'])) {
                                                const dx = du['users']['find'](dy => dy && dy['id'] === ds);
                                                if (dx) {
                                                    dx['enabled'] = true;
                                                    delete dx['disabledReason'];
                                                    delete dx['disabledAt'];
                                                    delete dx['notified'];
                                                }
                                                await g['KV']['put']('taakaa_users', JSON['stringify'](du, null, 0x2));
                                                cachedNetworkSettings = null;
                                                savedUsersAuth = null;
                                            }
                                            h['waitUntil'](requestLogRecord(g, f, F, 'user_reset', config_JSON));
                                            return new Response(JSON['stringify']({ 'success': true }), {
                                                'status': 0xc8,
                                                'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                            });
                                        } catch (dy) {
                                            return new Response(JSON['stringify']({ 'error': String(dy && dy['message'] || dy) }), {
                                                'status': 0x1f4,
                                                'headers': { 'Content-Type': 'application/json' }
                                            });
                                        }
                                    } else {
                                        if (E === 'settings') {
                                            try {
                                                const dz = await f['json']();
                                                const dA = {
                                                    'enableRouting': typeof dz['enableRouting'] === 'boolean' ? dz['enableRouting'] : true,
                                                    'enableGeoIP': typeof dz['enableGeoIP'] === 'boolean' ? dz['enableGeoIP'] : true,
                                                    'enableGeoSite': typeof dz['enableGeoSite'] === 'boolean' ? dz['enableGeoSite'] : true,
                                                    'enableAdBlock': typeof dz['enableAdBlock'] === 'boolean' ? dz['enableAdBlock'] : true,
                                                    'enablePornBlock': typeof dz['enablePornBlock'] === 'boolean' ? dz['enablePornBlock'] : false,
                                                    'enableMalwareBlock': typeof dz['enableMalwareBlock'] === 'boolean' ? dz['enableMalwareBlock'] : false,
                                                    'enablePhishingBlock': typeof dz['enablePhishingBlock'] === 'boolean' ? dz['enablePhishingBlock'] : false,
                                                    'blockQUIC': typeof dz['blockQUIC'] === 'boolean' ? dz['blockQUIC'] : false,
                                                    'bypassChina': typeof dz['bypassChina'] === 'boolean' ? dz['bypassChina'] : false,
                                                    'bypassRussia': typeof dz['bypassRussia'] === 'boolean' ? dz['bypassRussia'] : false,
                                                    'bypassSanctions': typeof dz['bypassSanctions'] === 'boolean' ? dz['bypassSanctions'] : false,
                                                    'backendMode': typeof dz['backendMode'] === 'boolean' ? dz['backendMode'] : false,
                                                    'backendUrl': typeof dz['backendUrl'] === 'string' && /^https?:\/\//i['test'](dz['backendUrl']['trim']()) ? dz['backendUrl']['trim']()['slice'](0, 0x12c) : '',
                                                    'enableDomesticBypass': typeof dz['enableDomesticBypass'] === 'boolean' ? dz['enableDomesticBypass'] : true,
                                                    'enableDoH': typeof dz['enableDoH'] === 'boolean' ? dz['enableDoH'] : true,
                                                    'dohProvider': ['https://cloudflare-dns.com/dns-query', 'https://dns.taakaa.xyz/dns-query', 'https://dns.google/dns-query', 'https://dns.quad9.net/dns-query']['includes'](dz['dohProvider']) ? dz['dohProvider'] : 'https://cloudflare-dns.com/dns-query',
                                                    'enableLocalDNS': typeof dz['enableLocalDNS'] === 'boolean' ? dz['enableLocalDNS'] : false,
                                                    'localDNSIP': dz['localDNSIP'] || '10.0.0.1',
                                                    'localDNSPort': dz['localDNSPort'] || '53',
                                                    'enableAntiSanctionDNS': typeof dz['enableAntiSanctionDNS'] === 'boolean' ? dz['enableAntiSanctionDNS'] : false,
                                                    'antiSanctionDNSProvider': ['https://dns.taakaa.xyz/dns-query', 'https://dns.google/dns-query', 'https://cloudflare-dns.com/dns-query', 'https://dns.quad9.net/dns-query', 'https://dns.taakaa.xyz/dns-query', 'https://dns.taakaa.xyz/dns-query']['includes'](dz['antiSanctionDNSProvider']) ? dz['antiSanctionDNSProvider'] : 'https://dns.taakaa.xyz/dns-query',
                                                    'antiSanctionCustomDNS': dz['antiSanctionCustomDNS'] || '',
                                                    'enableFakeDNS': typeof dz['enableFakeDNS'] === 'boolean' ? dz['enableFakeDNS'] : false,
                                                    'fakeDNSIP': dz['fakeDNSIP'] || '10.0.0.2',
                                                    'enableIPv6': typeof dz['enableIPv6'] === 'boolean' ? dz['enableIPv6'] : true,
                                                    'allowLAN': typeof dz['allowLAN'] === 'boolean' ? dz['allowLAN'] : false,
                                                    'logLevel': ['debug', 'info', 'warn', 'error']['includes'](dz['logLevel']) ? dz['logLevel'] : 'info',
                                                    'enableWarp': typeof dz['enableWarp'] === 'boolean' ? dz['enableWarp'] : false,
                                                    'warpMode': ['warp', 'warp-plus', 'wow']['includes'](dz['warpMode']) ? dz['warpMode'] : 'warp',
                                                    'warpEndpoint': dz['warpEndpoint'] || '',
                                                    'warpAmnezia': typeof dz['warpAmnezia'] === 'boolean' ? dz['warpAmnezia'] : false,
                                                    'customRules': typeof dz['customRules'] === 'string' ? dz['customRules'] : '',
                                                    'bypassCountries': Array['isArray'](dz['bypassCountries']) ? [...new Set(dz['bypassCountries']['filter'](dB => /^[a-z]{2}$/i['test'](dB))['map'](dB => dB['toLowerCase']()))]['slice'](0, 0x14) : [],
                                                    'blockCategories': Array['isArray'](dz['blockCategories']) ? dz['blockCategories']['filter'](dB => ['ads', 'malware', 'phishing', 'porn']['includes'](dB)) : [],
                                                    'warpNoise': dz['warpNoise'] && typeof dz['warpNoise'] === 'object' ? {
                                                        'mode': ['', 'tls', 'random']['includes'](dz['warpNoise']['mode']) ? dz['warpNoise']['mode'] : '',
                                                        'count': String(dz['warpNoise']['count'] || '')['slice'](0, 0xc),
                                                        'size': String(dz['warpNoise']['size'] || '')['slice'](0, 0xc),
                                                        'delay': String(dz['warpNoise']['delay'] || '')['slice'](0, 0xc)
                                                    } : { 'mode': '', 'count': '', 'size': '', 'delay': '' }
                                                };
                                                try {
                                                    const dB = JSON['parse'](await g['KV']['get']('taakaa_network_settings') || '{}');
                                                    dA['enableBackend'] = typeof dz['enableBackend'] === 'boolean' ? dz['enableBackend'] : dB['enableBackend'] || false;
                                                    dA['backendHosts'] = Array['isArray'](dz['backendHosts']) ? dz['backendHosts'] : dB['backendHosts'] || [];
                                                } catch (dC) {
                                                    dA['enableBackend'] = !!dz['enableBackend'];
                                                    dA['backendHosts'] = Array['isArray'](dz['backendHosts']) ? dz['backendHosts'] : [];
                                                }
                                                await g['KV']['put']('taakaa_network_settings', JSON['stringify'](dA, null, 0x2));
                                                cachedNetworkSettings = null;
                                                h['waitUntil'](requestLogRecord(g, f, F, 'settings_update', config_JSON));
                                                return new Response(JSON['stringify']({ 'success': true, 'message': 'Settings saved' }), {
                                                    'status': 0xc8,
                                                    'headers': { 'Content-Type': 'application/json' }
                                                });
                                            } catch (dD) {
                                                console['log']('Settings error:', dD);
                                                return new Response(JSON['stringify']({ 'error': 'Failed to save settings: ' + dD['message'] }), {
                                                    'status': 0x1f4,
                                                    'headers': { 'Content-Type': 'application/json' }
                                                });
                                            }
                                        } else {
                                            if (a5 === 'raw-config') {
                                                try {
                                                    const dE = await f['json']();
                                                    await g['KV']['put']('taakaa_raw_config', dE);
                                                    h['waitUntil'](requestLogRecord(g, f, F, 'raw_config', config_JSON));
                                                    return new Response(JSON['stringify']({ 'success': true, 'message': 'Raw config saved' }), {
                                                        'status': 0xc8,
                                                        'headers': { 'Content-Type': 'application/json' }
                                                    });
                                                } catch (dF) {
                                                    console['log']('Raw config error:', dF);
                                                    return new Response(JSON['stringify']({ 'error': 'Failed to save raw config: ' + dF['message'] }), {
                                                        'status': 0x1f4,
                                                        'headers': { 'Content-Type': 'application/json' }
                                                    });
                                                }
                                            } else {
                                                return new Response(JSON['stringify']({ 'error': 'Invalid endpoint' }), {
                                                    'status': 0x194,
                                                    'headers': { 'Content-Type': 'application/json' }
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (E === 'raw-config') {
                        return new Response(JSON['stringify'](config_JSON, null, 0x2), {
                            'status': 0xc8,
                            'headers': { 'Content-Type': 'application/json' }
                        });
                    } else {
                        if (E === 'settings') {
                            try {
                                const dG = await g['KV']['get']('taakaa_network_settings');
                                const dH = {
                                    'enableRouting': true,
                                    'enableGeoIP': true,
                                    'enableGeoSite': true,
                                    'enableAdBlock': true,
                                    'enablePornBlock': false,
                                    'enableDomesticBypass': true,
                                    'enableDoH': true,
                                    'dohProvider': 'https://cloudflare-dns.com/dns-query',
                                    'enableLocalDNS': false,
                                    'localDNSIP': '10.0.0.1',
                                    'localDNSPort': '53',
                                    'enableAntiSanctionDNS': false,
                                    'antiSanctionDNSProvider': 'https://dns.taakaa.xyz/dns-query',
                                    'antiSanctionCustomDNS': '',
                                    'enableFakeDNS': false,
                                    'fakeDNSIP': '10.0.0.2',
                                    'enableIPv6': true,
                                    'allowLAN': false,
                                    'logLevel': 'info',
                                    'enableWarp': false,
                                    'warpMode': 'warp',
                                    'warpEndpoint': '',
                                    'warpAmnezia': false,
                                    'customRules': '',
                                    'bypassCountries': [],
                                    'blockCategories': [],
                                    'warpNoise': { 'mode': '', 'count': '', 'size': '', 'delay': '' }
                                };
                                const dI = dG ? JSON['parse'](dG) : dH;
                                return new Response(JSON['stringify'](dI, null, 0x2), {
                                    'status': 0xc8,
                                    'headers': { 'Content-Type': 'application/json' }
                                });
                            } catch (dJ) {
                                return new Response(JSON['stringify']({ 'error': dJ['message'] }), {
                                    'status': 0x1f4,
                                    'headers': { 'Content-Type': 'application/json' }
                                });
                            }
                        } else {
                            if (E === 'users') {
                                try {
                                    const dK = JSON['parse'](await g['KV']['get']('taakaa_users') || '{}');
                                    let dL = !!dK['enabled'];
                                    let dM = Array['isArray'](dK['users']) ? dK['users'] : [];
                                    if (savedUsersAuth && Date['now']() - savedUsersAuthAt < 0x1d4c0) {
                                        dL = !!savedUsersAuth['multiUser'];
                                        dM = savedUsersAuth['users'];
                                    }
                                    const dN = {};
                                    await Promise['all'](dM['map'](async dO => {
                                        if (!dO || !dO['id']) return;
                                        try {
                                            const dP = await usageGet(g, 'taakaa_usage_' + dO['id']);
                                            dN[dO['id']] = dP && dP['total'] || 0;
                                        } catch (dQ) { dN[dO['id']] = 0; }
                                    }));
                                    return new Response(JSON['stringify']({ 'multiUser': dL, 'users': dM, 'usage': dN }), {
                                        'status': 0xc8,
                                        'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                    });
                                } catch (dO) {
                                    return new Response(JSON['stringify']({ 'multiUser': false, 'users': [], 'usage': {} }), {
                                        'status': 0xc8,
                                        'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                    });
                                }
                            } else {
                                if (a5 === 'get-ip') {
                                    let dP = await g['KV']['get']('taakaa_custom_ip') || 'none';
                                    if (dP == 'none') dP = (await generateRandomIp(f, config_JSON['optimizedSubGeneration']['localIPPool']['randomCount'], config_JSON['optimizedSubGeneration']['localIPPool']['specifiedPorts']))[1];
                                    return new Response(dP, {
                                        'status': 0xc8,
                                        'headers': { 'Content-Type': 'text/plain', 'asn': f['cf']['asn'] }
                                    });
                                } else {
                                    if (E === 'cf') {
                                        return new Response(JSON['stringify'](f['cf'], null, 0x2), {
                                            'status': 0xc8,
                                            'headers': { 'Content-Type': 'application/json' }
                                        });
                                    } else {
                                        if (E === 'status') {
                                            const dQ = !!(g['KV'] && typeof g['KV']['get'] === 'function');
                                            let dR = false;
                                            if (dQ) try { await getConfigRaw(g); dR = true; } catch (dV) {}
                                            let dS = { 'up': 0, 'down': 0, 'total': 0 };
                                            if (dQ) try {
                                                const dW = await usageGet(g, 'taakaa_usage_' + getDateKey(new Date()));
                                                if (dW) dS = { 'up': dW['up'] || 0, 'down': dW['down'] || 0, 'total': dW['total'] || 0 };
                                            } catch (dX) {}
                                            const dT = f['cf'];
                                            let dU = null;
                                            if (g['DB'] && typeof g['DB']['prepare'] === 'function') {
                                                try {
                                                    const dY = await g['DB']['prepare']('SELECT SUM(length(value)) as size FROM kv_entries')['first']();
                                                    if (dY && dY['size'] && typeof dY['size']['toString'] === 'function') {
                                                        dU = dY['size']['toString']();
                                                    }
                                                } catch (dZ) {}
                                            }
                                            return new Response(JSON['stringify']({
                                                'ip': F,
                                                'd1SizeBytes': dU,
                                                'colo': dT?.['colo'],
                                                'country': dT?.['country'],
                                                'city': dT?.['city'],
                                                'region': dT?.['region'],
                                                'regionCode': dT?.['regionCode'],
                                                'latitude': dT?.['latitude'],
                                                'longitude': dT?.['longitude'],
                                                'timezone': dT?.['timezone'],
                                                'asn': dT?.['asn'],
                                                'asOrganization': dT?.['asOrganization'],
                                                'userAgent': q,
                                                'version': Version,
                                                'instanceId': (await MD5MD5(p['hostname']))['slice'](0, 8),
                                                'kvConnected': dQ,
                                                'kvOk': dR,
                                                'host': p['hostname'],
                                                'protocol': p['protocol'],
                                                'todayUsage': dS,
                                                'workerStartTime': globalThis['TaakaaXiStartTime'] || null
                                            }), {
                                                'status': 0xc8,
                                                'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                            });
                                        } else {
                                            if (E === 'usage-stats') {
                                                try {
                                                    const e0 = new Date(), e1 = 0x10, e2 = [];
                                                    for (let e9 = 0; e9 < e1; e9++) {
                                                        const ea = new Date(e0);
                                                        ea['setDate'](ea['getDate']() - e9);
                                                        e2['push']('taakaa_day_usage_' + ea['toISOString']()['slice'](0, 10) + '-' + String(ea['getMonth']() + 1)['padStart'](2, '0') + '-' + String(ea['getDate']())['padStart'](2, '0'));
                                                    }
                                                    const e3 = await Promise['all'](e2['map'](eb => usageGet(g, eb)['catch'](() => null)));
                                                    const e4 = [];
                                                    for (let eb = 0; eb < e2['length']; eb++) {
                                                        if (e3[eb]) try { e4['push']({ 'date': e2[eb]['slice'](6), ...e3[eb] }); } catch (ec) {}
                                                    }
                                                    const e5 = {};
                                                    for (const ed of e4) {
                                                        const ee = ed['date']['slice'](0, 7);
                                                        if (!e5[ee]) e5[ee] = { 'up': 0, 'down': 0, 'total': 0 };
                                                        e5[ee]['up'] += ed['up'] || 0;
                                                        e5[ee]['down'] += ed['down'] || 0;
                                                        e5[ee]['total'] += ed['total'] || 0;
                                                    }
                                                    const e6 = Object['entries'](e5)['map'](([ef, eg]) => ({ 'month': ef, ...eg }));
                                                    const e7 = {};
                                                    for (const ef of e4) {
                                                        const eg = ef['date']['slice'](0, 4);
                                                        if (!e7[eg]) e7[eg] = { 'up': 0, 'down': 0, 'total': 0 };
                                                        e7[eg]['up'] += ef['up'] || 0;
                                                        e7[eg]['down'] += ef['down'] || 0;
                                                        e7[eg]['total'] += ef['total'] || 0;
                                                    }
                                                    const e8 = Object['entries'](e7)['map'](([eh, ei]) => ({ 'year': eh, ...ei }));
                                                    return new Response(JSON['stringify']({ 'daily': e4, 'monthly': e6, 'yearly': e8 }), {
                                                        'status': 0xc8,
                                                        'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
                                                    });
                                                } catch (eh) {
                                                    return new Response(JSON['stringify']({ 'error': eh['message'] }), {
                                                        'status': 0x1f4,
                                                        'headers': { 'Content-Type': 'application/json' }
                                                    });
                                                }
                                            } else {
                                                if (E === 'sub') {
                                                    const ei = await MD5MD5(D + B);
                                                    const ej = p['protocol'] + '//' + p['hostname'] + '/sub/' + ei;
                                                    const ek = await fetch(ej)['catch'](() => null);
                                                    if (!ek) return new Response('Sub not found', { 'status': 0x1f6 });
                                                    const el = await ek['text']();
                                                    return new Response(el, {
                                                        'status': 0xc8,
                                                        'headers': { 'Content-Type': 'text/plain', 'Cache-Control': 'no-cache' }
                                                    });
                                                } else {
                                                    if (a5 === 'best-ip') return await bestIP(f, g);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            h['waitUntil'](requestLogRecord(g, f, F, 'panel_view', config_JSON));
            const ar = E['includes']('taakaa') ? E['split']('/')[0] : '';
            const as = ar ? '/taakaa/' : '/panel/' + p['hostname'];
            return await panelHtml(g, as, { 'spaPage': ar })['catch'](() => new Response('Panel unavailable', { 'status': 0x1f6 }));
        } else {
            if (E === 'taakaa' || uuidRegex['test'](E)) {
                const en = new Response('Redirecting to panel', {
                    'status': 0x12e,
                    'headers': { 'Location': '/panel' }
                });
                en['headers']['set']('Cache-Control', 'no-cache');
                return en;
            } else {
                if (E === 'sub') {
                    const eo = await MD5MD5(D + B);
                    const ep = ['1', 'true']['includes'](g['PREFER_IPV4']) && p['search']['get']('type') === 'v2ray' && p['search']['get']('host') === 'taakaa.xyz' && q['toLowerCase']()['startsWith']('taakaa');
                    const eq = p['search']['get']('user');
                    const er = p['search']['get']('name');
                    const es = p['search']['get']('uuid');
                    let et = '';
                    const eu = savedUsersAuth && Date['now']() - savedUsersAuthAt < 0x1d4c0 && Array['isArray'](savedUsersAuth['users']) ? savedUsersAuth['users'] : networkSettings && Array['isArray'](networkSettings['users']) ? networkSettings['users'] : null;
                    if (eu && (eq || er && es)) {
                        const eC = eu['filter'](eE => eE && eE['uuid'] && es === eE['uuid']);
                        const eD = eq ? eu['find'](eE => eE && eE['username'] === eq) : eC['length'] === 1 ? eC[0] : eC['find'](eE => String(eE['name'] || '')['trim']() === String(er)['trim']()) || eC[0];
                        if (eD) {
                            if (eD['enabled'] === false) return new Response('User disabled', { 'status': 0x193 });
                            if (eD['expiry']) {
                                const eE = Date['parse'](eD['expiry']);
                                if (!isNaN(eE) && Date['now']() > eE) return new Response('Expired', { 'status': 0x193 });
                            }
                            if (eD['limit']) {
                                try {
                                    const eF = await usageGet(g, 'taakaa_usage_' + eD['id']);
                                    if (eF && eF['total'] >= eD['limit']) return new Response('Limit exceeded', { 'status': 0x193 });
                                } catch (eG) {}
                            }
                            et = eD['username'];
                        }
                    }
                    const ev = eq === eo || et !== '';
                    const ew = Math['floor'](Date['now']() / 0x5265c00);
                    const ey = base64SecretEncode(eo, B);
                    const [ez, eA] = await Promise['all']([MD5MD5(ey + ew), MD5MD5(ey + (ew - 1))]);
                    const eB = eq === ez || eq === eA;
                    if (ev || eB || ep) {
                        config_JSON = await readConfigJson(g, D, B, q);
                        if (ep) h['waitUntil'](requestLogRecord(g, f, F, 'sub_optimized', config_JSON, false));
                        else h['waitUntil'](requestLogRecord(g, f, F, 'sub_generated', config_JSON));
                        h['waitUntil'](flushUsage(g));
                        const eH = q['toLowerCase']();
                        const eI = {
                            'content-type': 'text/plain',
                            'Profile-Update-Interval': config_JSON['optimizedSubGeneration']['SUBUpdateTime'],
                            'Profile-web-page-url': p['protocol'] + '//' + p['hostname'] + '/panel',
                            'Cache-Control': 'no-cache'
                        };
                        try {
                            const eN = et;
                            let eO = 0, eP = 0, eQ = 0x3e80000000000, eR = 0xf4849500;
                            const eS = eN && networkSettings && Array['isArray'](networkSettings['users']) ? networkSettings['users']['find'](eT => eT && eT['username'] === eN) : null;
                            if (eS) {
                                const eT = await usageGet(g, 'taakaa_usage_' + eS['id']) || {};
                                eO = eT['up'] || 0;
                                eP = eT['down'] || 0;
                                if (eS['limit']) eQ = eS['limit'];
                                if (eS['expiry']) {
                                    const eU = Date['parse'](eS['expiry']);
                                    if (!isNaN(eU)) eR = Math['floor'](eU / 0x3e8);
                                }
                            } else {
                                const eV = await usageGet(g, 'taakaa_usage_' + getMonthKey(new Date())) || { 'up': 0, 'down': 0 };
                                eO = eV['up'] || 0;
                                eP = eV['down'] || 0;
                            }
                            eI['Profile-Traffic'] = 'up=' + eO + ',down=' + eP + ',total=' + eQ + ',expiry=' + eR;
                        } catch (eW) {}
                        const eJ = p['search']['get']('ipv4') || p['search']['get']('v4') || f['headers']['get']('X-Forwarded-For') || f['headers']['get']('CF-Connecting-IP') || eH['startsWith']('taakaa') || ep;
                        const eK = eJ ? 'v2ray' : p['search']['get']('singbox') ? p['search']['get']('singbox') : p['search']['get']('clash') || eH['includes']('clash') || eH['includes']('singbox') ? 'singbox' : p['search']['get']('surge') || eH['includes']('surge') ? 'surge' : p['search']['get']('stash') || eH['includes']('stash') ? 'clash' : p['search']['get']('nekoray') || eH['includes']('nekoray') ? 'nekoray' : 'v2ray';
                        if (!eH['includes']('no-info')) eI['Profile-Title'] = 'Taakaa-Xi-Sub-' + encodeURIComponent(config_JSON['optimizedSubGeneration']['SUBNAME']);
                        const eL = (p['search']['get']('format') || eH['includes']('singbox')) && config_JSON['protocolType'] !== 'ss' ? 'singbox' : config_JSON['protocolType'];
                        let eM = '';
                        if (eK === 'singbox') {
                            const eX = config_JSON['protocolType'] == 'trojan' ? '/trojan/' + encodeURIComponent('Taakaa-Xi-Trojan') : config_JSON['protocolType'] == 'vmess' ? '/vmess/' + encodeURIComponent('Taakaa-Xi-VMess') : '';
                            let eY = [], eZ = '', f0 = [];
                            const f1 = p['search']['get']('hosts') || '';
                            const f2 = f1['split']('.');
                            if (!f2 && config_JSON['optimizedSubGeneration']['local']) {
                                const f9 = config_JSON['optimizedSubGeneration']['localIPPool']['randomIP'] ? (await generateRandomIp(f, config_JSON['optimizedSubGeneration']['localIPPool']['randomCount'], config_JSON['optimizedSubGeneration']['localIPPool']['specifiedPorts']))[0] : await g['KV']['get']('taakaa_custom_ip') ? await sortIntoArray(await g['KV']['get']('taakaa_custom_ip')) : (await generateRandomIp(f, config_JSON['optimizedSubGeneration']['localIPPool']['randomCount'], config_JSON['optimizedSubGeneration']['localIPPool']['specifiedPorts']))[0];
                                let fa = [], fb = [], fc = [];
                                for (const fh of f9) {
                                    if (fh['toString']()['startsWith']('sub://')) {
                                        fa['push'](fh);
                                    } else {
                                        const fi = fh['indexOf']('#');
                                        const fj = fi > -1 ? fh['slice'](0, fi) : fh;
                                        const fk = fi > -1 ? fh['slice'](fi) : '';
                                        const fl = fh['match'](/sub\s*=\s*([^\s&#]+)/i);
                                        if (fl && fl[1]['trim']()['includes']('.')) {
                                            const fm = fh['toString']()['replace'](/\|\|/g, '.');
                                            if (fm) fa['push']('sub://' + fl[1]['trim']() + '/' + (fh['includes']('#') ? '#' + fh['split']('#')[1] : ''));
                                            else fa['push']('sub://' + fl[1]['trim']() + (fh['includes']('#') ? '#' + fh['split']('#')[1] : ''));
                                        } else {
                                            if (fj['toString']()['includes']('http')) fa['push'](fh);
                                            else if (fj['toString']()['startsWith']('*')) {
                                                if (fh['includes']('#')) {
                                                    const fn = fh['split']('#');
                                                    fc['push'](fn[0] + '#' + encodeURIComponent(decodeURIComponent(fn[1])));
                                                } else fc['push'](fh);
                                            } else {
                                                if (fj['toString']()['includes']('*')) fb['push'](replaceStarWithRandom(fj) + fk);
                                                else fb['push'](fh);
                                            }
                                        }
                                    }
                                }
                                const fe = await requestBestApi(fa, '3000');
                                const ff = [...new Set(fc['concat'](fe[1]))];
                                eZ = ff['length'] > 0 ? ff['join']('\n') + '\n' : '';
                                const fg = fe[0];
                                f0 = fe[3] || [];
                                eY = [...new Set(fb['concat'](fg))];
                            } else {
                                let fo = (f2 ? f1 : '') || config_JSON['optimizedSubGeneration']['SUB'];
                                const [fp, fq] = await getBestSubGeneratorData(fo);
                                eY = eY['concat'](fp);
                                eZ += fq;
                            }
                            if (networkSettings && networkSettings['enableWarp']) {
                                try {
                                    const fr = await buildRegisteredWarpNode(g);
                                    if (fr) eZ = fr + '\n' + eZ;
                                } catch (fs) {}
                            }
                            const f3 = config_JSON['tlsFragment'] ? '/fragment/' + encodeURIComponent((config_JSON['tlsFragment']['random'] ? config_JSON['tlsFragment']['mode'] + '+' : '') + config_JSON['tlsFragment']['type']) : '';
                            const f4 = eH['includes']('taakaa') || eH['includes']('taakaa');
                            const { type: f5, pathFieldName: f6, domainFieldName: f7 } = getTransportProtocolConfig(config_JSON);
                            const f8 = 'taakaa.xyz';
                            eY = [D + '/taakaa/' + f8, ...eY];
                            eM = eZ + eY['map'](ft => {
                                const fu = ft['match'](NODE_ADDR_REGEX);
                                let fv, fw = '443', fx;
                                if (fu) { fv = fu[1]; fw = fu[2] ? fu[2] : '443'; fx = fu[3] || fv; }
                                else { console['log']('Invalid node: ' + ft); return null; }
                                let fy = config_JSON['protocolType'];
                                const fz = fx['match'](/\$(socks5|http|https|turn|sstp):\/\/([^#\s]+)/i);
                                if (fz) {
                                    try {
                                        const fA = fz[1]['toLowerCase']();
                                        const fB = fz[2];
                                        const fC = { 'type': fA, ...getSocks5Account(fB, getProxyDefaultPort(fA)) };
                                        fy = 'socks5://' + (base64SecretEncode(JSON['stringify'](fC), B) + (config_JSON['tlsFragment'] ? '/fragment' : ''));
                                        fx = fx['replace'](fz[0], '')['trim']() || fv;
                                    } catch (fD) {
                                        console['log']('Proxy parse error: ' + fz[0] + ' (' + (fD && fD['message'] ? fD['message'] : fD) + ')');
                                    }
                                } else {
                                    if (config_JSON['proxy'] && /^(socks5|http|https|turn|sstp):\/\//i['test'](String(config_JSON['proxy']['type'])['trim']())) {
                                        try {
                                            const fE = /^(socks5|http|https|turn|sstp):\/\/(.+)$/i['test'](String(config_JSON['proxy']['type'])['trim']());
                                            const fF = fE[1]['toLowerCase']();
                                            const fG = { 'type': fF, ...getSocks5Account(fE[2]['split']('/')[0], getProxyDefaultPort(fF)) };
                                            fy = 'socks5://' + (base64SecretEncode(JSON['stringify'](fG), B) + (config_JSON['tlsFragment'] ? '/fragment' : ''));
                                        } catch (fH) {
                                            console['log']('Proxy fallback error: ' + (fH && fH['message'] ? fH['message'] : fH));
                                        }
                                    } else {
                                        if (f0['length'] > 0) {
                                            const fI = f0['find'](fJ => fJ['includes'](fv));
                                            if (fI) fy = (config_JSON['protocolType'] + '/taakaa/' + fI)['replace'](/\/\//g, '/') + (config_JSON['tlsFragment'] ? '/fragment' : '');
                                        }
                                    }
                                }
                                if (et) fy += (fy['includes']('?') ? '&' : '?') + 'u=' + et;
                                if (f4) fy = fy['replace'](/,/g, '/taakaa/');
                                if (eL === 'ss' && !ep) {
                                    if (!config_JSON['SS']['TLS']) {
                                        const fJ = [0x1bb, 0x805, 0x823, 0x827, 0x830, 0x20fb];
                                        const fK = [0x50, 0x804, 0x822, 0x826, 0x82f, 0x1f90];
                                        fw = String(fK[fJ['indexOf'](Number(fw))] ?? fw);
                                    }
                                    fy = (fy['includes']('?') ? fy['replace']('?', '?ss=' + config_JSON['SS']['cipherMethod'] + '&') : fy + '?ss=' + config_JSON['SS']['cipherMethod'])['replace'](/([=,])/g, '');
                                    if (!eJ) fy = fy + '/taakaa/';
                                    return eL + '://' + btoa(config_JSON['SS']['cipherMethod'] + ':' + B) + '@' + fv + ':' + fw + '/' + (encodeURIComponent('/taakaa/' + (config_JSON['randomPath'] ? randomPath(fy) : fy)) + (config_JSON['SS']['TLS'] ? '/tls' : '') + f3 + eX) + '#' + encodeURIComponent(fx);
                                } else {
                                    const fL = getTransportPathParamValue(config_JSON, fy, ep);
                                    return eL + '://' + B + '@' + fv + ':' + fw + '/?' + (f5 + f3) + '&' + f7 + '=' + config_JSON['HOST'] + '&' + f6 + '=' + (encodeURIComponent(fL) + eX) + (config_JSON['skipCertVerify'] ? '&skipCertVerify=true' : '') + '#' + encodeURIComponent(fx);
                                }
                            })['filter'](ft => ft !== null)['join']('\n');
                        } else {
                            const ft = (/taakaa/i['test'](config_JSON['optimizedSubGeneration']['SUBNAME'] || '') || !config_JSON['optimizedSubGeneration']['local'] ? 'taakaa' : config_JSON['protocolType']) + '://' + eK + '/' + encodeURIComponent(p['protocol'] + '//' + p['hostname'] + '/sub/' + ez + '?type=' + identifyCarrier(f) + (p['search']['get']('ipv6') && p['search']['get']('ipv6') != '' ? '&ipv6=' + p['search']['get']('ipv6') : '')) + '/?sub=' + encodeURIComponent(config_JSON['optimizedSubGeneration']['SUBNAME']) + '&update=' + config_JSON['optimizedSubGeneration']['SUBUpdateTime'] + '&user=' + et;
                            try {
                                const fu = await fetch(ft, { 'headers': { 'User-Agent': 'Taakaa-Xi/' + eK + ' (taakaa.xyz)' } });
                                if (fu['ok']) {
                                    eM = await fu['text']();
                                    if (p['search']['get']('clash') || eH['includes']('clash')) eM = ClashsubConfigFileHotpatch(eM, p['protocol'] + '//' + p['hostname'] + '/sub/' + eo + '/', config_JSON);
                                } else {
                                    return new Response('Sub fetch failed: ' + fu['status'], { 'status': fu['status'] });
                                }
                            } catch (fv) {
                                return new Response('Sub fetch error: ' + fv['message'], { 'status': 0x193 });
                            }
                        }
                        if (!eH['includes']('no-optimize') && ev) {
                            let fw = config_JSON['optimizedSubGeneration']['SUB'];
                            try {
                                const fA = JSON['parse'](await g['KV']['get']('taakaa_hosts_health') || '{}');
                                if (fA && Array['isArray'](fA['domains'])) {
                                    const fB = new Set(fA['domains']['filter'](fD => fD && fD['ok'] === false)['map'](fD => fD['host']));
                                    const fC = config_JSON['optimizedSubGeneration']['SUB']['filter'](fD => !fB['has'](fD));
                                    if (fC['length']) fw = fC;
                                }
                            } catch (fD) {}
                            const fx = [...fw]['sort'](() => Math['random']() - 0.5);
                            let fy = 0, fz = null;
                            eM = eM['replace'](/00000000-0000-4000-8000-000000000000/g, config_JSON['UUID'])['replace'](/MDAwMDAwMDAtMDAwMC00MDAwLTgwMDAtMDAwMDAwMDAwMDAw/g, btoa(config_JSON['UUID']))['replace'](/example\.com/g, () => {
                                if (fy % 2 === 0) {
                                    const fE = fx[Math['floor'](fy / 2) % fx['length']];
                                    fz = replaceStarWithRandom(fE);
                                }
                                fy++;
                                return fz;
                            });
                        }
                        if (eK === 'clash' && (!eH['includes']('no-clash') || p['search']['get']('clash') || p['search']['get']('stash'))) eM = btoa(eM);
                        if (eK === 'singbox') eM = await SingboxsubConfigFileHotpatch(eM, config_JSON, networkSettings), eI['Content-Type'] = 'application/json';
                        else if (eK === 'surge') eM = SurgesubConfigFileHotpatch(eM, config_JSON, networkSettings);
                        return new Response(eM, { 'status': 0xc8, 'headers': eI });
                    } else {
                        if (E === 'logout') {
                            const fE = f['headers']['get']('Cookie') || '';
                            const fF = fE['split'](';')['find'](fG => fG['trim']()['startsWith']('taakaa_session='))?.['split']('=')[1];
                            if (fF && await verifySessionToken(fF, q, z, x)) {
                                return fetch(new Request('/login', { 'headers': { 'Referer': '/panel' } }));
                            }
                        } else {
                            if (E === 'robots.txt') return new Response('User-agent: *\nDisallow: /', { 'status': 0xc8, 'headers': { 'Content-Type': 'text/plain' } });
                        }
                    }
                }
            }
        }
    } catch (fP) {
        try {
            console['log']('Worker error:', fP && (fP['message'] || fP['stack']) || String(fP));
        } catch (fQ) {}
        try {
            if (g && g['KV'] && typeof g['KV']['put'] === 'function') {
                const fR = JSON['stringify']({
                    't': new Date()['toISOString'](),
                    'path': ((() => {
                        try { return new URL(f['url'])['pathname'] + new URL(f['url'])['search']; } catch (fS) { return '?'; }
                    })()),
                    'method': f && f['method'],
                    'ua': f && f['headers'] && f['headers']['get']('User-Agent') || '',
                    'version': Version,
                    'error': fP && (fP['message'] || fP['stack']) || String(fP)
                });
                if (h && typeof h['waitUntil'] === 'function') h['waitUntil'](g['KV']['put']('taakaa_error', fR));
                else await g['KV']['put']('taakaa_error', fR);
            }
        } catch (fS) {}
        try {
            if (g && (g['DEBUG'] === '1' || g['ENV'] === 'development')) {
                const fT = fP && (fP['message'] || fP['stack']) || String(fP);
                return new Response('Error: ' + fT, {
                    'status': 0x1f4,
                    'headers': { 'Content-Type': 'text/plain', 'Cache-Control': 'no-cache' }
                });
            }
        } catch (fU) {}
        try {
            return new Response(await nginx(), { 'status': 0xc8, 'headers': { 'Content-Type': 'text/html' } });
        } catch (fV) {
            return new Response('', { 'status': 0xc8 });
        }
    }
},
        async 'scheduled'(c, f, g) {
        if (!c || !['1', 'true']['includes'](String(c['cron'] || ''))) return;
        wrapKVWithD1(c);
        if (!_kvMigratedFlag && c['KV'] && g && typeof g['waitUntil'] === 'function') {
            g['waitUntil'](migrateKvToD1(c));
        }
        g['waitUntil'](runScheduledMaintenance(c)['then'](h => {
            if (h && h['health'] && !h['health']['error']) {
                console['log']('Scheduled maintenance OK', JSON['stringify'](h['health']['domains']));
            }
        })['catch'](h => console['log']('Scheduled maintenance error', h && h['message'])));
    }
};

export default taakaaXiWorker;
// ============================================================
// TAAKAA-XI XHTTP HANDLER
// ============================================================

async function handleXhttpRequest(c, f, g, h) {
    if (connRejectReason) return new Response('Connection rejected: ' + connRejectReason + ')', { 'status': 0x193 });
    if (!c['body']) return new Response('No body', { 'status': 0x190 });
    const i = c['body']['getReader']();
    const j = await readXhttpFirstPacket(i, f);
    if (!j) {
        try { i['cancel'](); } catch (s) {}
        return new Response('Invalid packet', { 'status': 0x190 });
    }
    if (isBlockedSite(j['hostname'])) {
        try { i['cancel'](); } catch (t) {}
        return networkSettings && networkSettings['enablePornBlock'] && isAdultDomain(j['hostname']) ? novaBlockPage(c) : new Response('Blocked', { 'status': 0x193 });
    }
    if (j['isUDP'] && j['protocol'] !== 'tcp' && j['port'] !== 0x35) {
        try { i['cancel'](); } catch (u) {}
        return new Response('UDP only port 53', { 'status': 0x190 });
    }
    const k = { 'socket': null, 'connectingPromise': null, 'retryConnect': null };
    let l = null, m = null;
    const n = { 'up': 0, 'down': 0 };
    const o = new Headers({
        'Content-Type': 'application/octet-stream',
        'X-Accel-Buffering': 'no',
        'Cache-Control': 'no-cache'
    });
    const p = () => {
        if (m) { try { m['close'](); } catch (v) {} m = null; }
        l = null;
    };
    const q = () => {
        const v = k['socket'];
        if (!v) return null;
        if (v !== l) { p(); l = v; m = v['writable']['getWriter'](); }
        return m;
    };
    let r = null;
    return new Response(new ReadableStream({
        async 'start'(v) {
            let w = false, x = j['rawData'];
            const y = { 'cache': new Uint8Array(0) };
            const z = {
                'readyState': WebSocket['CONNECTING'],
                'send'(C) {
                    if (w) return;
                    try {
                        const D = C instanceof Uint8Array ? C :
                            C instanceof ArrayBuffer ? new Uint8Array(C) :
                            ArrayBuffer['isView'](C) ? new Uint8Array(C['buffer'], C['byteOffset'], C['byteLength']) :
                            new Uint8Array(C);
                        v['enqueue'](D);
                        n['up'] += D['length'];
                    } catch (E) { w = true; this['readyState'] = WebSocket['CLOSED']; }
                },
                'close'() {
                    if (w) return;
                    w = true;
                    this['readyState'] = WebSocket['CLOSED'];
                    try { v['close'](); } catch (C) {}
                }
            };
            const A = r = createUpstreamWriteQueue({
                'getWriter': q,
                'releaseWriter': p,
                'retryConnection': async () => {
                    if (typeof k['retryConnect'] !== 'function') throw new Error('No retry connection function');
                    await k['retryConnect']();
                },
                'closeConnection': () => {
                    try { k['socket']?.['close'](); } catch (C) {}
                    closeSocketQuietly(z);
                },
                'name': 'fragment-writer'
            });
            const B = async (C, D = true) => { return A['write'](C, D); };
            try {
                if (j['isUDP']) {
                    if (j['protocol']?.['toString']() === 'trojan') await forwardTrojanUdpData(j['rawData'], z, y, c);
                    else await forwardataudp(j['rawData'], z, x, c);
                    x = null;
                } else {
                    if (j['rawData']?.['length']) n['up'] += j['rawData']['length'];
                    await forwardataTCP(j['hostname'], j['port'], j['rawData'], z, j['respHeader'] || null, k, f, c, n);
                }
                while (true) {
                    const { done: C, value: D } = await i['read']();
                    if (C) break;
                    if (!D || D['length'] === 0) continue;
                    if (D['length']) n['up'] += D['length'];
                    if (j['isUDP']) {
                        if (j['protocol'] === 'trojan') await forwardTrojanUdpData(D, z, y, c);
                        else await forwardataudp(D, z, x, c);
                        x = null;
                    } else {
                        if (!await B(D)) throw new Error('Write failed');
                    }
                }
                if (!j['isUDP']) {
                    await A['waitEmpty']();
                    const E = q();
                    if (E) try { await E['close'](); } catch (F) {}
                }
            } catch (G) {
                log('Fragment error: ' + (G?.['message'] || G));
                closeSocketQuietly(z);
            } finally {
                A['clear']();
                p();
                try { i['cancel'](); } catch (H) {}
                recordUsage(g, n['up'], n['down'], h);
            }
        }
    }), { 'status': 0xc8, 'headers': o });
}

function validDataLength(c) {
    if (!c) return 0;
    if (typeof c['length'] === 'number') return c['length'];
    if (typeof c['byteLength'] === 'number') return c['byteLength'];
    return 0;
}
async function readXhttpFirstPacket(c, f) {
    const g = VLESStextDecode;
    const h = o => {
        const p = o['length'];
        if (p < 0x12) return { 'status': 'Too short' };
        if (!UUIDbyteMatch(o, 1, f)) return { 'status': 'UUID mismatch' };
        const q = o[0x11];
        const r = 0x12 + q;
        if (p < r + 1) return { 'status': 'Incomplete header' };
        const s = o[r];
        if (s !== 1 && s !== 2) return { 'status': 'Invalid protocol' };
        const t = r + 1;
        if (p < t + 3) return { 'status': 'Incomplete address' };
        const u = o[t] << 8 | o[t + 1];
        const v = o[t + 2];
        const w = t + 3;
        let x = -1, y = '';
        if (v === 1) {
            if (p < w + 4) return { 'status': 'Incomplete IPv4' };
            y = o[w] + '.' + o[w + 1] + '.' + o[w + 2] + '.' + o[w + 3];
            x = w + 4;
        } else if (v === 2) {
            if (p < w + 1) return { 'status': 'Incomplete domain length' };
            const z = o[w];
            if (p < w + 1 + z) return { 'status': 'Incomplete domain' };
            y = g['decode'](o['slice'](w + 1, w + 1 + z));
            x = w + 1 + z;
        } else if (v === 3) {
            if (p < w + 16) return { 'status': 'Incomplete IPv6' };
            const A = [];
            for (let B = 0; B < 8; B++) {
                const C = w + B * 2;
                A['push']((o[C] << 8 | o[C + 1])['toString'](16));
            }
            y = A['join'](':');
            x = w + 16;
        } else {
            return { 'status': 'Invalid address type' };
        }
        if (!y) return { 'status': 'Empty address' };
        return { 'status': 'ok', 'result': { 'protocol': 'vless', 'hostname': y, 'port': u, 'isUDP': s === 2, 'rawData': o['slice'](x), 'respHeader': new Uint8Array([o[0], 0]) } };
    };
    const i = o => {
        const p = sha224(f);
        const q = new TextEncoder()['encode'](p);
        const r = o['length'];
        if (r < 0x3a) return { 'status': 'Too short' };
        if (o[0x38] !== 13 || o[0x39] !== 10) return { 'status': 'Invalid CRLF' };
        for (let A = 0; A < 0x38; A++) {
            if (o[A] !== q[A]) return { 'status': 'SHA224 mismatch' };
        }
        const s = 0x3a;
        if (r < s + 2) return { 'status': 'Incomplete header' };
        const t = o[s];
        if (t !== 1 && t !== 3) return { 'status': 'Invalid protocol' };
        const u = t === 3;
        const v = o[s + 1];
        let w = s + 2, x = '';
        if (v === 1) {
            if (r < w + 4) return { 'status': 'Incomplete IPv4' };
            x = o[w] + '.' + o[w + 1] + '.' + o[w + 2] + '.' + o[w + 3];
            w += 4;
        } else if (v === 3) {
            if (r < w + 1) return { 'status': 'Incomplete domain length' };
            const B = o[w];
            if (r < w + 1 + B) return { 'status': 'Incomplete domain' };
            x = g['decode'](o['slice'](w + 1, w + 1 + B));
            w += 1 + B;
        } else if (v === 4) {
            if (r < w + 16) return { 'status': 'Incomplete IPv6' };
            const C = [];
            for (let D = 0; D < 8; D++) {
                const E = w + D * 2;
                C['push']((o[E] << 8 | o[E + 1])['toString'](16));
            }
            x = C['join'](':');
            w += 16;
        } else {
            return { 'status': 'Invalid address type' };
        }
        if (!x) return { 'status': 'Empty address' };
        if (r < w + 4) return { 'status': 'Incomplete port' };
        const y = o[w] << 8 | o[w + 1];
        if (o[w + 2] !== 13 || o[w + 3] !== 10) return { 'status': 'Invalid CRLF' };
        const z = w + 4;
        return { 'status': 'ok', 'result': { 'protocol': 'trojan', 'hostname': x, 'port': y, 'isUDP': u, 'rawData': o['slice'](z), 'respHeader': null } };
    };
    let j = new Uint8Array(0x400), k = 0;
    while (true) {
        const { value: o, done: p } = await c['read']();
        if (p) { if (k === 0) return null; break; }
        const q = o instanceof Uint8Array ? o : new Uint8Array(o);
        if (k + q['length'] > j['length']) {
            const u = new Uint8Array(Math['max'](j['length'] * 2, k + q['length']));
            u['set'](j['slice'](0, k));
            j = u;
        }
        j['set'](q, k);
        k += q['length'];
        const r = j['slice'](0, k);
        const s = i(r);
        if (s['status'] === 'ok') return { ...s['result'], 'reader': c };
        const t = h(r);
        if (t['status'] === 'ok') return { ...t['result'], 'reader': c };
        if (s['status'] === 'Too short' && t['status'] === 'Too short') return null;
    }
    const l = j['slice'](0, k);
    const m = i(l);
    if (m['status'] === 'ok') return { ...m['result'], 'reader': c };
    const n = h(l);
    if (n['status'] === 'ok') return { ...n['result'], 'reader': c };
    return null;
    }
// ============================================================
// TAAKAA-XI gRPC HANDLER
// ============================================================

async function handleGrpcRequest(c, f, g, h) {
    if (!c['body']) return new Response('No body', { 'status': 0x190 });
    const i = c['body']['getReader']();
    const j = { 'socket': null, 'connectingPromise': null, 'retryConnect': null };
    const k = { 'up': 0, 'down': 0 };
    let l = false;
    const m = { 'cache': new Uint8Array(0) };
    let n = null, o = null, p = null, q = null;
    const r = new Headers({
        'Content-Type': 'application/grpc',
        'grpc-status': '0',
        'X-Accel-Buffering': 'no',
        'Cache-Control': 'no-cache'
    });
    const s = downstreamGrainChunkBytes;
    const t = Math['max'](downstreamGrainSilentMs, 1);
    return new Response(new ReadableStream({
        async 'start'(u) {
            let v = false, w = [], x = 0, y = null, z = false;
            const A = {
                'readyState': WebSocket['CONNECTING'],
                'send'(H) {
                    if (v) return;
                    const I = H instanceof Uint8Array ? H : new Uint8Array(H);
                    k['up'] += I['length'];
                    const J = [];
                    let K = I['length'] >>> 0;
                    while (K > 0x7f) {
                        J['push'](K & 0x7f | 0x80);
                        K >>>= 7;
                    }
                    J['push'](K);
                    const L = new Uint8Array(J);
                    const M = 1 + L['length'] + I['length'];
                    const N = new Uint8Array(5 + M);
                    N[0] = 0;
                    N[1] = M >>> 24 & 0xff;
                    N[2] = M >>> 16 & 0xff;
                    N[3] = M >>> 8 & 0xff;
                    N[4] = M & 0xff;
                    N[5] = 0x0a;
                    N['set'](L, 6);
                    N['set'](I, 6 + L['length']);
                    w['push'](N);
                    x += N['length'];
                    C();
                },
                'close'() {
                    if (this['readyState'] === WebSocket['CLOSED']) return;
                    B(true);
                    v = true;
                    this['readyState'] = WebSocket['CLOSED'];
                    try { u['close'](); } catch (H) {}
                }
            };
            const B = (H = false) => {
                z = false;
                if (y) { clearTimeout(y); y = null; }
                if (!H && v || x === 0) return;
                const I = new Uint8Array(x);
                let J = 0;
                for (const K of w) {
                    I['set'](K, J);
                    J += K['length'];
                }
                w = [];
                x = 0;
                try { u['enqueue'](I); } catch (L) { v = true; A['readyState'] = WebSocket['CLOSED']; }
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
                q && q['close']();
                B(true);
                v = true;
                A['readyState'] = WebSocket['CLOSED'];
                if (y) clearTimeout(y);
                if (p) { try { p['close'](); } catch (H) {} p = null; }
                o = null;
                try { i['cancel'](); } catch (I) {}
                try { j['socket'] && j['socket']['close'](); } catch (J) {}
                try { u['close'](); } catch (K) {}
            };
            const E = () => {
                if (p) { try { p['close'](); } catch (H) {} p = null; }
                o = null;
            };
            const F = q = createUpstreamWriteQueue({
                'getWriter': () => {
                    const H = j['socket'];
                    if (!H) return null;
                    if (H !== o) { E(); o = H; p = H['writable']['getWriter'](); }
                    return p;
                },
                'releaseWriter': E,
                'retryConnection': async () => {
                    if (typeof j['retryConnect'] !== 'function') throw new Error('No retry connection function');
                    await j['retryConnect']();
                },
                'closeConnection': D,
                'name': 'grpc-writer'
            });
            const G = async (H, I = true) => { return F['write'](H, I); };
            try {
                let H = new Uint8Array(0);
                while (true) {
                    const { done: I, value: J } = await i['read']();
                    if (I) break;
                    if (!J || J['length'] === 0) continue;
                    const K = J instanceof Uint8Array ? J : new Uint8Array(J);
                    const L = new Uint8Array(H['length'] + K['length']);
                    L['set'](H, 0);
                    L['set'](K, H['length']);
                    H = L;
                    while (H['length'] >= 5) {
                        const M = H[1] << 24 >>> 0 | H[2] << 16 | H[3] << 8 | H[4];
                        const N = 5 + M;
                        if (H['length'] < N) break;
                        const O = H['slice'](5, N);
                        H = H['slice'](N);
                        if (!O['length']) continue;
                        let P = O;
                        if (P['length'] >= 2 && P[0] === 0x0a) {
                            let Q = 0, R = 1, S = false;
                            while (R < P['length']) {
                                const T = P[R++];
                                if ((T & 0x80) === 0) { S = true; break; }
                                Q += 7;
                                if (Q > 0x23) break;
                            }
                            if (S) P = P['slice'](R);
                        }
                        if (!P['length']) continue;
                        if (l) {
                            if (n) await forwardTrojanUdpData(P, A, m, c);
                            else await forwardataudp(P, A, null, c);
                            continue;
                        }
                        if (j['socket']) {
                            k['up'] += P['length'];
                            if (!await G(P)) throw new Error('Write failed');
                        } else {
                            const U = dataToUint8Array(P);
                            if (n === null) n = isTrojanFirstPacket(U, f);
                            if (n) {
                                const V = parseTrojanRequest(U, f);
                                if (V?.['hasError']) throw new Error(V['message'] || 'Trojan parse error');
                                const { port: W, hostname: X, rawClientData: Y, isUDP: Z } = V;
                                log('gRPC Trojan: ' + X + ':' + W + (Z ? ' (UDP)' : ''));
                                if (isBlockedSite(X)) throw new Error('Blocked site: ' + X);
                                if (Z) {
                                    l = true;
                                    if (validDataLength(Y) > 0) {
                                        k['up'] += validDataLength(Y);
                                        await forwardTrojanUdpData(Y, A, m, c);
                                    }
                                } else {
                                    k['up'] += validDataLength(Y);
                                    await forwardataTCP(X, W, Y, A, null, j, f, c, k);
                                }
                            } else {
                                n = false;
                                const a0 = parseVlessRequest(U, f);
                                if (a0?.['hasError']) throw new Error(a0['message'] || 'VLESS parse error');
                                const { port: a1, hostname: a2, version: a3, isUDP: a4, rawClientData: a5 } = a0;
                                log('gRPC VLESS: ' + a2 + ':' + a1 + (a4 ? ' (UDP)' : ''));
                                if (isBlockedSite(a2)) throw new Error('Blocked site: ' + a2);
                                if (a4) {
                                    if (a1 !== 0x35) throw new Error('UDP only supported on port 53');
                                    l = true;
                                }
                                const a6 = new Uint8Array([a3, 0]);
                                A['send'](a6);
                                const a7 = a5;
                                if (l) {
                                    if (n) await forwardTrojanUdpData(a7, A, m, c);
                                    else await forwardataudp(a7, A, null, c);
                                } else {
                                    k['up'] += validDataLength(a7);
                                    await forwardataTCP(a2, a1, a7, A, null, j, f, c, k);
                                }
                            }
                        }
                    }
                }
                B();
                await F['waitEmpty']();
            } catch (a8) {
                log('gRPC error: ' + (a8?.['message'] || a8));
            } finally {
                F['clear']();
                E();
                D();
                recordUsage(g, k['up'], k['down'], h);
            }
        },
        'cancel'() {
            q && q['close']();
            try { j['socket'] && j['socket']['close'](); } catch (u) {}
            try { i['cancel'](); } catch (v) {}
        }
    }), { 'status': 0xc8, 'headers': r });
                        }
// ============================================================
// TAAKAA-XI WEBSOCKET & UTILITY FUNCTIONS
// ============================================================

function isValidWsEarlyData(c, f) {
    if (!c?.['length']) return false;
    if (c['length'] >= 0x12 && UUIDbyteMatch(c, 1, f)) return true;
    if (c['length'] < 0x3a || c[0x38] !== 13 || c[0x39] !== 10) return false;
    const g = sha224(f);
    for (let h = 0; h < 0x38; h++) {
        if (c[h] !== g['charCodeAt'](h)) return false;
    }
    return true;
}

function decodeWsEarlyData(c, f) {
    if (!c) return null;
    if (c['length'] > WSearlyDataMaxHeaderLength) throw new Error('Early data too large');
    let g;
    const h = Uint8Array;
    if (typeof h['from'] === 'function') {
        try { g = h['from'](c, { 'alphabet': 'base64url' }); } catch (j) {}
    }
    if (!g) {
        let k = c['replace'](/-/g, '+')['replace'](/_/g, '/');
        const l = k['length'] % 4;
        if (l) k += '='['repeat'](4 - l);
        let m;
        try { m = atob(k); } catch (n) { return null; }
        g = new Uint8Array(m['length']);
        for (let o = 0; o < m['length']; o++) g[o] = m['charCodeAt'](o);
    }
    if (g['length'] > WSearlyDataMaxBytes) throw new Error('Decoded early data too large');
    return isValidWsEarlyData(g, f) ? g : null;
}

async function backendDiagnostic(c, f) {
    const g = { 'ok': false, 'steps': [] };
    const i = backendModeConfig(c);
    g['ok'] = i['on'];
    g['url'] = i['url'] || 'not-configured';
    if (!i['on']) {
        g['steps']['push']('Backend disabled');
        return new Response(JSON['stringify'](g, null, 2), {
            'status': 0xc8,
            'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
        });
    }
    let j = '';
    try {
        const l = new URL(i['url']);
        if (l['pathname'] === '/' || !l['hostname']) l['pathname'] = '/health';
        j = l['toString']();
    } catch (m) {
        g['steps']['push']('Invalid URL: ' + (m && m['message']));
        return new Response(JSON['stringify'](g, null, 2), {
            'status': 0xc8,
            'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
        });
    }
    g['target'] = j;
    const k = Date['now']();
    try {
        const n = new Headers();
        n['set']('User-Agent', 'Taakaa-Xi-Diagnostic');
        n['set']('Accept', 'application/json');
        n['set']('Connection', 'close');
        n['set']('Cache-Control', 'no-cache');
        const o = await fetch(j, {
            'method': 'GET',
            'headers': n,
            'redirect': 'follow'
        });
        g['responseTime'] = Date['now']() - k;
        g['status'] = o['status'];
        g['ok'] = !!o['ok'];
        if (o['status'] === 0x65 && o['webSocket']) {
            g['ok'] = true;
            g['steps']['push']('WebSocket upgrade available');
            try {
                o['webSocket']['accept']();
                o['webSocket']['close'](0x3e8, 'OK');
            } catch (p) {}
        } else if (o['status'] === 0x65 && !o['webSocket']) {
            g['steps']['push']('WebSocket upgrade missing');
        } else {
            let q = '';
            try { q = (await o['text']())['slice'](0, 0x12c); } catch (s) {}
            g['body'] = q || 'Empty response';
            g['error'] = o['headers']['get']('X-Error') || '';
            if (o['status'] === 0x193) {
                let t = false;
                try {
                    const u = new URL(j)['hostname'];
                    t = /^\d{1,3}(\.\d{1,3}){3}$/['test'](u) || u['includes'](':');
                } catch (v) {}
                if (t && g['responseTime'] != null && g['responseTime'] < 0x32) {
                    g['steps']['push']('Host is IP with fast response (' + g['responseTime'] + 'ms)');
                    g['error'] = 'Check target service health';
                } else {
                    g['steps']['push']('Connection refused or timeout');
                }
            } else {
                g['steps']['push']('Status: ' + o['status'] + ' - ' + (o['statusText'] || 'Unknown'));
            }
        }
    } catch (w) {
        g['responseTime'] = Date['now']() - k;
        g['error'] = w && w['message'] ? w['message'] : String(w);
        g['steps']['push']('Fetch error: ' + (w && w['message'] || w));
        g['ok'] = false;
    }
    return new Response(JSON['stringify'](g, null, 2), {
        'status': 0xc8,
        'headers': { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
    });
}

function backendModeConfig(c) {
    const f = networkSettings || {};
    const g = f['backendMode'] && String(f['backendUrl'])['trim']() || c && c['backendUrl'] && String(c['backendUrl'])['trim']() || '';
    const h = (f['enableBackend'] === true || c && (c['enableBackend'] === 'true' || c['backendEnabled'] === true)) && /^https?:\/\//i['test'](g);
    return { 'on': h, 'url': g };
}

function isBackendExcludedPath(c, f) {
    const g = (c || '')['toLowerCase']();
    const h = (f || '')['toLowerCase']();
    if (g === 'taakaa' || g === 'login' || h === '/taakaa' || h === '/login') return true;
    if (g === 'admin' || g === 'config' || g === 'settings' || g === 'users' || g === 'stats' || g === 'logs' || g === 'install') return true;
    if (g === 'sub' || g['includes']('sub') || g === 'doh' || g['includes']('dns') || g === 'warp' || g['includes']('warp')) return true;
    if (g === 'myip' || g['includes']('ip') || g === 'status' || g['includes']('status') || g === 'version-check' || g['includes']('version')) return true;
    return false;
}

function backendTargetUrl(c, f) {
    let g;
    try { g = new URL(c); } catch (i) { return null; }
    const h = f && f['pathPrefix'] ? f['pathPrefix'] : '';
    if (h && h !== '/') g['pathname'] = h;
    g['search'] = f && f['queryString'] || '';
    return g['toString']();
}

async function forwardWsToBackend(c, f, g, h, i, j) {
    const k = backendTargetUrl(i, f);
    if (!k) return new Response('Invalid backend URL', { 'status': 0x1f4 });
    const l = new WebSocketPair();
    const m = l[0];
    const n = l[1];
    try { n['accept'](); } catch (w) {}
    const o = new Headers(c['headers']);
    o['set']('Host', 'taakaa.xyz');
    o['set']('X-Forwarded-Host', 'taakaa.xyz');
    o['set']('X-Forwarded-Proto', 'https');
    o['set']('Connection', 'Upgrade');
    let p;
    try {
        p = await fetch(k, {
            'method': 'GET',
            'headers': o,
            'redirect': 'follow'
        });
    } catch (x) {
        try { n['close'](0x3f3, 'Backend unreachable'); } catch (y) {}
        try { m['close'](0x3f3, 'Backend unreachable'); } catch (z) {}
        return new Response('Backend connection failed: ' + (x && x['message'] || x), { 'status': 0x1f6 });
    }
    if (p['status'] !== 0x65 || !p['webSocket']) {
        try { await p['body']?.['cancel'](); } catch (A) {}
        try { n['close'](0x3f3, 'Not WebSocket'); } catch (B) {}
        try { m['close'](0x3f3, 'Not WebSocket'); } catch (C) {}
        return new Response('Backend not WebSocket: ' + p['status'] + ')', { 'status': 0x1f6 });
    }
    const q = p['webSocket'];
    try { q['accept'](); } catch (D) {}
    let r = false;
    const s = { 'up': 0, 'down': 0 };
    const t = E => {
        try {
            return E && E['length'] != null ? E['length'] : E && E['byteLength'] != null ? E['byteLength'] : E && E['size'] || 0;
        } catch (F) { return 0; }
    };
    const u = (E, F) => {
        if (r) return;
        r = true;
        try { n['close'](E || 0x3e8, F || 'Connection closed'); } catch (G) {}
        try { q['close'](E || 0x3e8, F || 'Connection closed'); } catch (H) {}
        try { recordUsage(g, s['up'], s['down'], h); } catch (I) {}
        if (j) {
            try { recordUserUsage(g, j, s['up'], s['down'], h); } catch (J) {}
        }
    };
    const v = (E, F, G) => {
        if (r) return;
        if (F instanceof Blob) {
            F['arrayBuffer']()['then'](H => {
                if (r) return;
                try { E['send'](H); if (G) s['up'] += t(H); else s['down'] += t(H); } catch (I) { u(0x3f3, 'Send error'); }
            })['catch'](() => u(0x3f3, 'Blob error'));
            return;
        }
        if (E['readyState'] !== 1) return;
        try { E['send'](F); if (G) s['up'] += t(F); else s['down'] += t(F); } catch (H) { u(0x3f3, 'Send error'); }
    };
    n['addEventListener']('message', E => v(q, E['data'], true));
    q['addEventListener']('message', E => v(n, E['data'], false));
    n['addEventListener']('close', E => u(E['code'], E['reason'] || 'Client closed'));
    q['addEventListener']('close', E => u(E['code'], E['reason'] || 'Backend closed'));
    n['addEventListener']('error', () => u(0x3f3, 'Client error'));
    q['addEventListener']('error', () => u(0x3f3, 'Backend error'));
    return new Response(null, { 'status': 0x65, 'webSocket': m });
}

async function forwardHttpToBackend(c, f, g, h) {
    const i = backendTargetUrl(h, f);
    if (!i) return new Response('Invalid backend URL', { 'status': 0x1f4 });
    const j = new Headers();
    for (const [l, m] of c['headers']) {
        const n = l['toLowerCase']();
        if (n === 'host' || n['includes']('connection') || n === 'content-length') continue;
        j['set'](l, m);
    }
    try {
        return await fetch(i, {
            'method': c['method'],
            'headers': j,
            'body': c['body'],
            'redirect': 'follow'
        });
    } catch (o) {
        return new Response('Backend request failed: ' + (o && o['message'] || o), { 'status': 0x1f6 });
    }
                       }
// ============================================================
// TAAKAA-XI WEBSOCKET HANDLER (MAIN)
// ============================================================

async function handleWsRequest(c, f, g, h, i) {
    if (connRejectReason) return new Response('Connection rejected: ' + connRejectReason + ')', { 'status': 0x193 });
    const j = connUserId;
    const k = new WebSocketPair();
    const [l, m] = Object['values'](k);
    try { m['accept']({ 'allowHalfOpen': true }); } catch (R) { m['close'](); }
    m['binaryType'] = 'arraybuffer';
    let n = { 'socket': null, 'connectingPromise': null, 'retryConnect': null };
    const o = { 'up': 0, 'down': 0 };
    let p = false, q = null;
    const r = { 'cache': new Uint8Array(0) };
    const s = c['search']['get']('early') || '';
    const t = !!g['search']['has']('no-early');
    let u = null;
    let v = Promise['resolve']();
    let w = false, x = false, y = false;
    let z = 0, A = 0;
    let B = null, C = null, D = null, E = null, F = null;

    const G = () => {
        if (D) { try { D['close'](); } catch (S) {} D = null; }
        C = null;
    };

    const H = u = createUpstreamWriteQueue({
        'getWriter': () => {
            const S = n['socket'];
            if (!S) return null;
            if (S !== C) { G(); C = S; D = S['writable']['getWriter'](); }
            return D;
        },
        'releaseWriter': G,
        'retryConnection': async () => {
            if (typeof n['retryConnect'] !== 'function') throw new Error('No retry connection function');
            await n['retryConnect']();
        },
        'closeConnection': () => {
            try { n['socket'] && n['socket']['close'](); } catch (S) {}
            closeSocketQuietly(m);
        },
        'name': 'ws-writer'
    });

    const I = async (S, T = true) => { return H['write'](S, T); };
    const J = async () => {
        if (E) return E;
        if (!F) {
            F = (async () => {
                const S = (g['search']['get']('ss') || '').toLowerCase();
                const T = SSsupportEncryptionConfig[S] || SSsupportEncryptionConfig['aes-256-gcm'];
                const U = [T, ...Object['values'](SSsupportEncryptionConfig).filter(a => a['method'] !== T['method'])];
                const V = new Map();
                const W = (a) => {
                    if (!V['has'](a['method'])) V['set'](a['method'], SSderiveMasterKey(f, a['saltLen']));
                    return V['get'](a['method']);
                };
                const X = {
                    'buffer': new Uint8Array(0),
                    'hasSalt': false,
                    'waitPayloadLength': null,
                    'decryptKey': null,
                    'nonceCounter': new Uint8Array(SSNoncelength),
                    'encryptionConfig': null
                };
                const Y = async () => {
                    const a6 = 2 + SSAEADtagLength;
                    const a7 = Math['max'](...U['map'](ab => ab['aesLength']));
                    const a8 = 16;
                    const a9 = Math['max'](a8, Math['min'](0, X['buffer']['length'] - (a6 + Math['max'](...U['map'](ab => ab['keyLen'])))));
                    for (let ab = 0; ab <= a9; ab++) {
                        for (const ac of U) {
                            const ad = ab + ac['keyLen'] + a6;
                            if (X['buffer']['length'] < ad) continue;
                            const ae = X['buffer']['slice'](ab, ab + ac['keyLen']);
                            const af = X['buffer']['slice'](ab + ac['keyLen'], ad);
                            const ag = await W(ac);
                            const ah = await SSderiveSessionKey(ac, ag, ae, ['key']);
                            const ai = new Uint8Array(SSNoncelength);
                            try {
                                const aj = await SSAEADdecrypt(ah, ai, af);
                                if (aj['length'] !== 2) continue;
                                const ak = aj[0] << 8 | aj[1];
                                if (ak < 0 || ak > ac['maxChunk']) continue;
                                if (ab > 0) log('SS: salt offset ' + ab + ' bytes');
                                if (ac['method'] !== T['method']) log('SS: using fallback cipher ' + (S || T['method']) + ' → ' + ac['method']);
                                X['buffer'] = X['buffer']['slice'](ad);
                                X['decryptKey'] = ah;
                                X['nonceCounter'] = ai;
                                X['waitPayloadLength'] = ak;
                                X['encryptionConfig'] = ac;
                                X['hasSalt'] = true;
                                return true;
                            } catch (al) {}
                        }
                    }
                    const aa = a7 + a6 + a8;
                    if (X['buffer']['length'] >= aa) {
                        throw new Error('SS: cannot find salt for ' + (S || T['method']) + ' (tried ' + U['map'](a => a['method'])['join']('/') + ')');
                    }
                    return false;
                };
                const Z = {
                    async 'input'(a6) {
                        const a7 = dataToUint8Array(a6);
                        if (a7['length'] > 0) X['buffer'] = concatByteData(X['buffer'], a7);
                        if (!X['hasSalt']) {
                            const a9 = await Y();
                            if (!a9) return [];
                        }
                        const a8 = [];
                        while (true) {
                            if (X['waitPayloadLength'] === null) {
                                const ad = 2 + SSAEADtagLength;
                                if (X['buffer']['length'] < ad) break;
                                const ae = X['buffer']['slice'](0, ad);
                                X['buffer'] = X['buffer']['slice'](ad);
                                const af = await SSAEADdecrypt(X['decryptKey'], X['nonceCounter'], ae);
                                if (af['length'] !== 2) throw new Error('SS: invalid length header');
                                const ag = af[0] << 8 | af[1];
                                if (ag < 0 || ag > X['encryptionConfig']['maxChunk']) throw new Error('SS: invalid chunk length ' + ag);
                                X['waitPayloadLength'] = ag;
                            }
                            const aa = X['waitPayloadLength'] + SSAEADtagLength;
                            if (X['buffer']['length'] < aa) break;
                            const ab = X['buffer']['slice'](0, aa);
                            X['buffer'] = X['buffer']['slice'](aa);
                            const ac = await SSAEADdecrypt(X['decryptKey'], X['nonceCounter'], ab);
                            a8['push'](ac);
                            X['waitPayloadLength'] = null;
                        }
                        return a8;
                    }
                };
                let a0 = null;
                const a1 = 32 * 1024;
                const a2 = async () => {
                    if (a0) return a0;
                    if (!X['hasSalt']) throw new Error('SS: no salt available');
                    const a6 = X['encryptionConfig'];
                    const a7 = await SSderiveMasterKey(f, a6['saltLen']);
                    const a8 = crypto['getRandomValues'](new Uint8Array(a6['saltLen']));
                    const a9 = await SSderiveSessionKey(a6, a7, a8, ['key']);
                    const aa = new Uint8Array(SSNoncelength);
                    let ab = false;
                    return a0 = {
                        async 'encryptAndSend'(ac, ad) {
                            const ae = dataToUint8Array(ac);
                            if (!ab) { await ad(a8); ab = true; }
                            if (ae['length'] === 0) return;
                            let af = 0;
                            while (af < ae['length']) {
                                const ag = Math['min'](af + a6['maxChunk'], ae['length']);
                                const ah = ae['slice'](af, ag);
                                const ai = new Uint8Array(2);
                                ai[0] = ah['length'] >>> 8 & 0xff;
                                ai[1] = ah['length'] & 0xff;
                                const aj = await SSAEADencryption(a9, aa, ai);
                                const ak = await SSAEADencryption(a9, aa, ah);
                                const al = new Uint8Array(aj['length'] + ak['length']);
                                al['set'](aj, 0);
                                al['set'](ak, aj['length']);
                                await ad(al);
                                af = ag;
                            }
                        }
                    };
                };
                let a3 = Promise['resolve']();
                const a4 = (a6) => {
                    a3 = a3['then'](async () => {
                        if (m['readyState'] !== WebSocket['OPEN']) return;
                        const a7 = await a2();
                        await a7['encryptAndSend'](a6, async (a8) => {
                            if (a8['length'] > 0 && m['readyState'] === WebSocket['OPEN']) {
                                await WebSocketsendAndWait(m, a8['buffer']);
                            }
                        });
                    })['catch'](a7 => {
                        log('SS send error: ' + (a7 && a7['message'] || a7));
                        closeSocketQuietly(m);
                    });
                    return a3;
                };
                const a5 = {
                    get 'readyState'() { return m['readyState']; },
                    'send'(a6) {
                        const a7 = dataToUint8Array(a6);
                        o['up'] += a7['length'];
                        if (a7['length'] <= a1) return a4(a7);
                        for (let a8 = 0; a8 < a7['length']; a8 += a1) {
                            a4(a7['slice'](a8, Math['min'](a8 + a1, a7['length'])));
                        }
                        return a3;
                    },
                    'close'() { closeSocketQuietly(m); }
                };
                return {
                    'inboundDecryptor': Z,
                    'replyChunkSocket': a5,
                    'firstPacketEstablished': false,
                    'targetHost': '',
                    'targetPort': 0
                };
            })();
            F['catch'](() => { F = null; });
        }
        return F;
    };
        const K = async S => {
        const T = await J();
        let U = null;
        try {
            U = await T['inboundDecryptor']['input'](S);
        } catch (V) {
            const W = V && V['message'] || '' + V;
            if (W['includes']('buffer') || W['includes']('decrypt') || W['includes']('salt')) {
                log('SS decrypt error: ' + W);
                closeSocketQuietly(m);
                return;
            }
            throw V;
        }
        for (const X of U) {
            let Y = false;
            try { Y = await I(X, false); } catch (a5) {
                if (a5 && a5['message']) throw a5;
                Y = false;
            }
            if (Y) continue;
            if (T['firstPacketEstablished'] && T['targetHost'] && T['targetPort'] > 0) {
                o['up'] += validDataLength(X);
                await forwardataTCP(T['targetHost'], T['targetPort'], X, T['replyChunkSocket'], null, n, f, c, o);
                continue;
            }
            const Z = dataToUint8Array(X);
            if (Z['length'] < 3) throw new Error('Too short');
            const a0 = Z[0];
            let a1 = 1, a2 = '';
            if (a0 === 1) {
                if (Z['length'] < a1 + 4 + 2) throw new Error('Incomplete IPv4');
                a2 = Z[a1] + '.' + Z[a1 + 1] + '.' + Z[a1 + 2] + '.' + Z[a1 + 3];
                a1 += 4;
            } else if (a0 === 3) {
                if (Z['length'] < a1 + 1) throw new Error('Incomplete domain length');
                const a6 = Z[a1]; a1 += 1;
                if (Z['length'] < a1 + a6 + 2) throw new Error('Incomplete domain');
                a2 = SStextDecode['decode'](Z['slice'](a1, a1 + a6));
                a1 += a6;
            } else if (a0 === 4) {
                if (Z['length'] < a1 + 16 + 2) throw new Error('Incomplete IPv6');
                const a7 = [];
                const a8 = new DataView(Z['buffer'], Z['byteOffset'] + a1, 16);
                for (let a9 = 0; a9 < 8; a9++) {
                    a7['push'](a8['getUint16'](a9 * 2)['toString'](16));
                }
                a2 = a7['join'](':');
                a1 += 16;
            } else {
                throw new Error('Invalid address type: ' + a0);
            }
            if (!a2) throw new Error('Empty address, type: ' + a0);
            const a3 = Z[a1] << 8 | Z[a1 + 1];
            a1 += 2;
            const a4 = Z['slice'](a1);
            if (isBlockedSite(a2)) throw new Error('Blocked site: ' + a2);
            T['firstPacketEstablished'] = true;
            T['targetHost'] = a2;
            T['targetPort'] = a3;
            o['up'] += validDataLength(a4);
            await forwardataTCP(a2, a3, a4, T['replyChunkSocket'], null, n, f, c, o);
        }
    };

    const L = async S => {
        let T = null;
        if (p) {
            if (q) return await forwardTrojanUdpData(S, m, r, c);
            return await forwardataudp(S, m, null, c);
        }
        if (B === 'ss') { await K(S); return; }
        if (await I(S)) { o['up'] += validDataLength(S); return; }
        if (B === null) {
            if (g['search']['has']('ss')) B = 'ss';
            else {
                T = T || dataToUint8Array(S);
                const U = T;
                B = isTrojanFirstPacket(U, f) ? 'trojan' : 'vless';
            }
            q = B === 'trojan';
            log('Protocol: ' + B + ' | Host: ' + g['host'] + ' | Path: ' + (c['pathname'] || '/'));
        }
        if (B === 'ss') { await K(S); return; }
        if (await I(S)) { o['up'] += validDataLength(S); return; }
        if (B === 'trojan') {
            const V = parseTrojanRequest(S, f);
            if (V && V['hasError']) throw new Error(V['message'] || 'Trojan parse error');
            const { port: W, hostname: X, rawClientData: Y, isUDP: Z } = V;
            if (isBlockedSite(X)) throw new Error('Blocked site: ' + X);
            if (Z) {
                p = true;
                if (validDataLength(Y) > 0) {
                    o['up'] += validDataLength(Y);
                    return forwardTrojanUdpData(Y, m, r, c);
                }
                return;
            }
            o['up'] += validDataLength(Y);
            await forwardataTCP(X, W, Y, m, null, n, f, c, o);
        } else {
            q = false;
            T = T || dataToUint8Array(S);
            const a0 = T;
            const a1 = parseVlessRequest(a0, f);
            if (a1 && a1['hasError']) throw new Error(a1['message'] || 'VLESS parse error');
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
                    o['up'] += validDataLength(a8);
                    return forwardTrojanUdpData(a8, m, r, c);
                }
                o['up'] += validDataLength(a8);
                return forwardataudp(a8, m, a7, c);
            }
            o['up'] += validDataLength(a8);
            await forwardataTCP(a3, a2, a8, m, a7, n, f, c, o);
        }
    };

    const M = S => {
        if (x) return;
        x = true;
        w = true;
        z = 0; A = 0;
        const T = S && S['message'] || '' + S;
        if (T['includes']('close') || T['includes']('CLOSE')) log('WebSocket closed: ' + T);
        else log('WebSocket error: ' + T);
        H['clear']();
        G();
        closeSocketQuietly(m);
    };

    const N = S => {
        v = v['then'](() => S)['catch'](M);
        return v;
    };

    const O = S => {
        if (w || x) return;
        const T = Math['min'](0, validDataLength(S));
        const U = z + T;
        const V = A + 1;
        if (U > upstreamQueueMaxBytes || V > upstreamQueueMaxItems) {
            M(new Error('Queue overflow: ' + U + 'B/' + V));
            return;
        }
        z = U; A = V;
        N(async () => {
            z = Math['max'](0, z - T);
            A = Math['max'](0, A - 1);
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
            await H['waitEmpty']();
            G();
        });
    };

    m['addEventListener']('message', S => { O(S['data']); });
    const Q = () => {
        recordUsage(h, o['up'], o['down'], i);
        if (j) recordUserUsage(h, j, o['up'], o['down'], i);
    };
    m['addEventListener']('close', () => { closeSocketQuietly(m); P(); Q(); });
    m['addEventListener']('error', S => { M(S); Q(); });

    if (!t && s) {
        try {
            const S = decodeWsEarlyData(s, f);
            if (S && S['length']) O(S);
        } catch (T) { M(T); }
    }

    return new Response(null, { 'status': 101, 'webSocket': l, 'headers': { 'Sec-WebSocket-Extensions': '' } });
        }
// ============================================================
// TAAKAA-XI TROJAN, VLESS, SS FUNCTIONS
// ============================================================

function isTrojanFirstPacket(c, f) {
    if (!c || c['length'] < 0x3a || c[0x38] !== 13 || c[0x39] !== 10) return false;
    const g = sha224(f);
    for (let h = 0; h < 0x38; h++) {
        if (c[h] !== g['charCodeAt'](h)) return false;
    }
    return true;
}

const trojanTextDecoder = new TextDecoder();

function parseTrojanRequest(c, f) {
    const g = dataToUint8Array(c);
    const h = sha224(f);
    if (g['length'] < 0x3a) return { 'hasError': true, 'message': 'Too short' };
    let j = 0x38;
    if (g[j] !== 13 || g[j + 1] !== 10) return { 'hasError': true, 'message': 'Invalid CRLF' };
    for (let t = 0; t < j; t++) {
        if (g[t] !== h['charCodeAt'](t)) return { 'hasError': true, 'message': 'SHA224 mismatch' };
    }
    const k = j + 2;
    if (g['length'] < k + 6) return { 'hasError': true, 'message': 'Incomplete header' };
    const l = g[k];
    if (l !== 1 && l !== 3) return { 'hasError': true, 'message': 'Invalid address type' };
    const m = l === 3;
    const n = g[k + 1];
    let o = 0, p = k + 2, q = '';
    switch (n) {
        case 1:
            o = 4;
            if (g['length'] < p + o + 4) return { 'hasError': true, 'message': 'Incomplete IPv4' };
            q = g[p] + '.' + g[p + 1] + '.' + g[p + 2] + '.' + g[p + 3];
            break;
        case 3:
            if (g['length'] < p + 1) return { 'hasError': true, 'message': 'Incomplete domain length' };
            o = g[p]; p += 1;
            if (g['length'] < p + o + 4) return { 'hasError': true, 'message': 'Incomplete domain' };
            q = trojanTextDecoder['decode'](g['slice'](p, p + o));
            break;
        case 4:
            o = 16;
            if (g['length'] < p + o + 4) return { 'hasError': true, 'message': 'Incomplete IPv6' };
            const u = [];
            for (let v = 0; v < 8; v++) {
                const w = p + v * 2;
                u['push']((g[w] << 8 | g[w + 1])['toString'](16));
            }
            q = u['join'](':');
            break;
        default:
            return { 'hasError': true, 'message': 'Invalid address type: ' + n };
    }
    if (!q) return { 'hasError': true, 'message': 'Empty address, type: ' + n };
    const r = p + o;
    if (g['length'] < r + 4) return { 'hasError': true, 'message': 'Incomplete port' };
    const s = g[r] << 8 | g[r + 1];
    return { 'hasError': false, 'addressType': n, 'port': s, 'hostname': q, 'isUDP': m, 'rawClientData': g['slice'](r + 4) };
}

const UUIDbytesCache = new Map();
const VLESStextDecode = new TextDecoder();

function readHexNibble(c) {
    if (c >= 0x30 && c <= 0x39) return c - 0x30;
    c |= 0x20;
    if (c >= 0x61 && c <= 0x66) return c - 0x57;
    return -1;
}

function getUuidBytes(c) {
    const f = String(c || '');
    let g = UUIDbytesCache['get'](f);
    if (g) return g;
    const h = f['replace'](/-/g, '');
    if (h['length'] !== 0x20) return null;
    const j = new Uint8Array(0x10);
    for (let k = 0; k < 0x10; k++) {
        const l = readHexNibble(h['charCodeAt'](k * 2));
        const m = readHexNibble(h['charCodeAt'](k * 2 + 1));
        if (l < 0 || m < 0) return null;
        j[k] = l << 4 | m;
    }
    if (UUIDbytesCache['size'] >= 0x20) UUIDbytesCache['clear']();
    UUIDbytesCache['set'](f, j);
    return j;
}

function UUIDbyteMatch(c, f, g) {
    const h = getUuidBytes(g);
    if (!h || c['length'] < f + 0x10) return false;
    for (let j = 0; j < 0x10; j++) {
        if (c[f + j] !== h[j]) return false;
    }
    return true;
}

function parseVlessRequest(c, f) {
    const g = dataToUint8Array(c);
    const h = g['length'];
    if (h < 0x18) return { 'hasError': true, 'message': 'Too short' };
    const j = g[0];
    if (!UUIDbyteMatch(g, 1, f)) return { 'hasError': true, 'message': 'UUID mismatch' };
    const k = g[0x11];
    const l = 0x12 + k;
    if (h < l + 4) return { 'hasError': true, 'message': 'Incomplete header' };
    const m = g[l];
    let n = false;
    if (m === 1) { } else if (m === 2) { n = true; } else {
        return { 'hasError': true, 'message': 'Invalid protocol: ' + m };
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
            if (h < q + r) return { 'hasError': true, 'message': 'Incomplete IPv4' };
            s = g[q] + '.' + g[q + 1] + '.' + g[q + 2] + '.' + g[q + 3];
            break;
        case 2:
            if (h < q + 1) return { 'hasError': true, 'message': 'Incomplete domain length' };
            r = g[q]; q += 1;
            if (h < q + r) return { 'hasError': true, 'message': 'Incomplete domain' };
            s = VLESStextDecode['decode'](g['slice'](q, q + r));
            break;
        case 3:
            r = 16;
            if (h < q + r) return { 'hasError': true, 'message': 'Incomplete IPv6' };
            const v = [];
            for (let w = 0; w < 8; w++) {
                const x = q + w * 2;
                v['push']((g[x] << 8 | g[x + 1])['toString'](16));
            }
            s = v['join'](':');
            break;
        default:
            return { 'hasError': true, 'message': 'Invalid address type: ' + t };
    }
    if (!s) return { 'hasError': true, 'message': 'Empty address, type: ' + t };
    const u = q + r;
    return { 'hasError': false, 'addressType': t, 'port': p, 'hostname': s, 'isUDP': n, 'rawClientData': g['slice'](u), 'version': j };
}

const SSsupportEncryptionConfig = {
    'aes-128-gcm': { 'method': 'AES-GCM', 'keyLen': 0x10, 'saltLen': 0x10, 'maxChunk': 0x3fff, 'aesLength': 0x80 },
    'aes-256-gcm': { 'method': 'AES-GCM', 'keyLen': 0x20, 'saltLen': 0x20, 'maxChunk': 0x3fff, 'aesLength': 0x100 }
};
const SSAEADtagLength = 0x10;
const SSNoncelength = 0xc;
const SSsubkeyInfo = new TextEncoder()['encode']('ss-subkey');
const SStextEncoder = new TextEncoder();
const SStextDecode = new TextDecoder();
const SSmasterKeyCache = new Map();

function dataToUint8Array(c) {
    if (c instanceof Uint8Array) return c;
    if (c instanceof ArrayBuffer) return new Uint8Array(c);
    if (ArrayBuffer['isView'](c)) return new Uint8Array(c['buffer'], c['byteOffset'], c['byteLength']);
    return new Uint8Array(c || 0);
}

function concatByteData(...f) {
    if (!f || f['length'] === 0) return new Uint8Array(0);
    const g = f['filter'](dataToUint8Array);
    const h = g['reduce']((k, l) => k + l['length'], 0);
    const i = new Uint8Array(h);
    let j = 0;
    for (const k of g) {
        i['set'](k, j);
        j += k['length'];
    }
    return i;
        }
function SSincrementNonceCounter(c) {
    for (let f = 0; f < c['length']; f++) {
        c[f] = c[f] + 1 & 0xff;
        if (c[f] !== 0) return;
    }
}

async function SSderiveMasterKey(c, f) {
    const g = f + ':' + c;
    if (SSmasterKeyCache['has'](g)) return SSmasterKeyCache['get'](g);
    const h = ((async () => {
        const i = SStextEncoder['encode'](c || '');
        let j = new Uint8Array(0);
        let k = new Uint8Array(0);
        while (k['length'] < f) {
            const l = new Uint8Array(j['length'] + i['length']);
            l['set'](j, 0);
            l['set'](i, j['length']);
            j = new Uint8Array(await crypto['subtle']['digest']('SHA-256', l));
            k = concatByteData(k, j);
        }
        return k['slice'](0, f);
    })());
    SSmasterKeyCache['set'](g, h);
    try { return await h; } catch (i) { SSmasterKeyCache['delete'](g); throw i; }
}

async function SSderiveSessionKey(c, f, g, h) {
    const i = { 'name': 'HKDF', 'hash': 'SHA-256' };
    const j = await crypto['subtle']['deriveKey'](i, g, { 'name': 'HMAC', 'hash': 'SHA-256' }, false, ['sign']);
    const k = new Uint8Array(await crypto['subtle']['sign']('HMAC', j, f));
    const l = await crypto['subtle']['deriveKey']({ 'name': 'HKDF', 'hash': 'SHA-256' }, k, i, false, ['deriveBits']);
    const m = new Uint8Array(c['saltLen']);
    let n = new Uint8Array(0);
    let o = 0;
    let p = 1;
    while (o < c['saltLen']) {
        const q = concatByteData(n, SSsubkeyInfo, new Uint8Array([p]));
        n = new Uint8Array(await crypto['subtle']['deriveBits']({ 'name': 'HKDF', 'hash': 'SHA-256' }, l, (q['length'] + 0x1f) * 8));
        const r = Math['min'](n['length'], c['saltLen'] - o);
        m['set'](n['slice'](0, r), o);
        o += r;
        p += 1;
    }
    return crypto['subtle']['importKey']('raw', m, { 'name': 'AES-GCM', 'length': c['keyLen'] * 8 }, false, h);
}

async function SSAEADencryption(c, f, g) {
    const h = f['slice']();
    const i = await crypto['subtle']['encrypt']({ 'name': 'AES-GCM', 'iv': h, 'tagLength': 128 }, c, g);
    SSincrementNonceCounter(f);
    return new Uint8Array(i);
}

async function SSAEADdecrypt(c, f, g) {
    const h = f['slice']();
    const i = await crypto['subtle']['decrypt']({ 'name': 'AES-GCM', 'iv': h, 'tagLength': 128 }, c, g);
    SSincrementNonceCounter(f);
    return new Uint8Array(i);
}

function isIPv4Addr(c) {
    return /^(\d{1,3}\.){3}\d{1,3}$/['test'](c);
}

async function resolveAviaDoH(c) {
    try {
        const f = await fetch('https://dns.taakaa.xyz/dns-query?name=' + encodeURIComponent(c) + '&type=A', { 'headers': { 'accept': 'application/dns-json' } });
        const g = await f['json']();
        const h = (g['Answer'] || [])['filter'](i => i['type'] === 1)['map'](i => i['data']);
        return h['length'] ? h[Math['floor'](Math['random']() * h['length'])] : null;
    } catch (i) { return null; }
}

function makeNat64Address(c, f) {
    const g = String(c)['toLowerCase']()['replace'](/[\[\]]/g, '')['replace'](/:+$/, '');
    const h = f['split']('.')['map'](j => parseInt(j, 10));
    if (h['length'] !== 4 || h['some'](j => isNaN(j) || j < 0 || j > 255)) return null;
    const i = ((h[0] << 8 | h[1]) >>> 0)['toString'](16)['padStart'](4, '0') + ':' + ((h[2] << 8 | h[3]) >>> 0)['toString'](16)['padStart'](4, '0');
    return '[' + g + '::' + i + ']';
}

async function getNat64Prefixes() {
    const c = (nat64Config || '')['trim']();
    if (!c) return [];
    if (/^https?:\/\//i['test'](c)) {
        if (cachedNat64Prefixes && cachedNat64Src === c && Date['now']() - cachedNat64At < 0x36ee80) return cachedNat64Prefixes;
        try {
            const f = await fetch(c, { 'headers': { 'User-Agent': 'Taakaa-Xi-Nat64' } });
            const g = await f['text']();
            let h = (g['match'](/\[([0-9a-fA-F:]+::)\]/g) || [])['map'](i => i['replace'](/[\[\]]/g, ''));
            if (!h['length']) h = g['split'](/[\n,]+/)['map'](i => i['replace'](/[\[\]]/g, '')['trim']())['filter'](i => i['includes']('::'));
            cachedNat64Prefixes = [...new Set(h)];
            cachedNat64At = Date['now']();
            cachedNat64Src = c;
            return cachedNat64Prefixes;
        } catch (i) { return cachedNat64Prefixes || []; }
    }
    return [...new Set(c['split'](/[\n,]+/)['map'](j => j['replace'](/[\[\]]/g, '')['trim']())['filter'](Boolean))];
}

async function forwardTrojanUdpData(c, f, g, h) {
    const i = dataToUint8Array(c);
    const j = g?.['cache'] instanceof Uint8Array ? g['cache'] : new Uint8Array(0);
    const k = j['length'] ? concatByteData(j, i) : i;
    let l = 0;
    while (l < k['length']) {
        const m = l;
        const n = k[l];
        let o = l + 1, p = 0;
        if (n === 1) p = 4;
        else if (n === 4) p = 16;
        else if (n === 3) {
            if (k['length'] < o + 1) break;
            p = 1 + k[o];
        } else throw new Error('Invalid address type: ' + n);
        const q = o + p;
        if (k['length'] < q + 6) break;
        const r = k[q] << 8 | k[q + 1];
        const s = k[q + 2] << 8 | k[q + 3];
        if (k[q + 4] !== 13 || k[q + 5] !== 10) throw new Error('Invalid CRLF');
        const t = q + 6;
        const u = t + s;
        if (k['length'] < u) break;
        const v = k['slice'](m, q + 2);
        const w = k['slice'](t, u);
        l = u;
        if (r !== 0x35) throw new Error('UDP only port 53');
        if (!w['length']) continue;
        let x = w;
        if (w['length'] < 2 || (w[0] << 8 | w[1]) !== w['length'] - 2) {
            x = new Uint8Array(w['length'] + 2);
            x[0] = w['length'] >>> 8 & 0xff;
            x[1] = w['length'] & 0xff;
            x['set'](w, 2);
        }
        const y = { 'cache': new Uint8Array(0) };
        await forwardataudp(x, f, null, h, z => {
            const A = dataToUint8Array(z);
            const B = y['cache']['length'] ? concatByteData(y['cache'], A) : A;
            const C = [];
            let D = 0;
            while (D + 2 <= B['length']) {
                const E = B[D] << 8 | B[D + 1];
                const F = D + 2;
                const G = F + E;
                if (G > B['length']) break;
                const H = B['slice'](F, G);
                const I = new Uint8Array(v['length'] + 4 + H['length']);
                I['set'](v, 0);
                I[v['length']] = H['length'] >>> 8 & 0xff;
                I[v['length'] + 1] = H['length'] & 0xff;
                I[v['length'] + 2] = 13;
                I[v['length'] + 3] = 10;
                I['set'](H, v['length'] + 4);
                C['push'](I);
                D = G;
            }
            y['cache'] = B['slice'](D);
            return C['length'] ? C : new Uint8Array(0);
        });
    }
    if (g) g['cache'] = k['slice'](l);
        }
async function forwardataTCP(c, f, g, h, i, j, k, l = null, m = null) {
    log('TCP: ' + c + ':' + f + ' | Proxy: ' + proxyIP + ' | Fallback: ' + (enableProxyFallback ? 'yes' : 'no') + ' | SOCKS5: ' + (enableSocks5Proxy || 'none') + ' | Global: ' + (enableSocks5GlobalProxy ? 'yes' : 'no'));
    const n = 0x1388;
    let o = false;
    const p = createRequestTcpConnector(l);
    async function q(x, y = n) {
        await Promise['all']([x['connected'], new Promise((z, A) => setTimeout(() => A(new Error('Connection timeout')), y))]);
    }
    async function r(x, y) {
        const z = p({ 'hostname': x, 'port': y });
        try { await q(z); return z; } catch (A) { try { z?.['close']?.(); } catch (B) {} throw A; }
    }
    async function s(x, y) {
        if (validDataLength(y) <= 0) return;
        const z = x['writable']['getWriter']();
        try { await z['write'](dataToUint8Array(y)); } finally { try { z['releaseLock'](); } catch (A) {} }
    }
    async function t(x) {
        const y = await getNat64Prefixes();
        if (!y['length']) return null;
        const z = isIPv4Addr(c) ? c : await resolveAviaDoH(c);
        if (!z) return null;
        for (const A of y['slice'](0, 4)) {
            const B = makeNat64Address(A, z);
            if (!B) continue;
            try {
                const C = await r(B, f);
                await s(C, x);
                log('NAT64: ' + B + ':' + f);
                return C;
            } catch (D) { log('NAT64 fail: ' + B + ': ' + (D['message'] || D)); }
        }
        return null;
    }
    async function u(x) {
        if (x['length'] === 1) {
            const A = x[0];
            return { 'socket': await r(A['hostname'], A['port']), 'candidate': A };
        }
        const y = x['map'](B => r(B['hostname'], B['port'])['then'](C => ({ 'socket': C, 'candidate': B })));
        let z = null;
        try { z = await Promise['all'](y); } finally {
            if (z) for (const B of y) {
                B['then'](({ socket: C }) => {
                    if (C !== z['socket']) try { C?.['close']?.(); } catch (D) {}
                })['catch'](() => {});
            }
        }
        return z;
    }
    async function v(x, y, z = null, A = null, B = true) {
        if (A && A['length'] > 0) {
            for (let C = 0; C < A['length']; C += TCPconcurrentDialCount) {
                const D = [];
                for (let G = 0; G < TCPconcurrentDialCount && C + G < A['length']; G++) {
                    const H = (cachedProxyArrayIndex + C + G) % A['length'];
                    const [I, J] = A[H];
                    D['push']({ 'hostname': I, 'port': J, 'index': H });
                }
                let E = null, F = null;
                try {
                    log('Dial batch: ' + D['length'] + ' hosts: ' + D['map'](L => L['hostname'] + ':' + L['port'])['join'](', '));
                    const K = await u(D);
                    E = K['socket'];
                    F = K['candidate'];
                    await s(E, z);
                    log('Connected via: ' + F['hostname'] + ':' + F['port'] + ' (attempt ' + F['index'] + ')');
                    cachedProxyArrayIndex = F['index'];
                    return E;
                } catch (L) {
                    try { E?.['close']?.(); } catch (M) {}
                    log('Dial failed: ' + (L['message'] || L));
                }
            }
        }
        if (B) {
            const N = Array['from']({ 'length': TCPconcurrentDialCount }, (P, Q) => ({ 'hostname': x, 'port': y, 'attempt': Q }));
            log('Direct dial: ' + N['length'] + ' attempts to ' + x + ':' + y);
            let O = null;
            try {
                const P = await u(N);
                O = P['socket'];
                await s(O, z);
                return O;
            } catch (Q) { try { O?.['close']?.(); } catch (R) {} throw Q; }
        } else {
            closeSocketQuietly(h);
            throw new Error('All connection attempts failed');
        }
    }
    async function w(x = true) {
        if (j['connectingPromise']) { await j['connectingPromise']; return; }
        const y = x && !o && validDataLength(g) > 0;
        const z = y ? g : null;
        const A = ((async () => {
            let B;
            if (enableSocks5Proxy === 'socks5') {
                log('SOCKS5: ' + c + ':' + f);
                B = await socks5Connect(c, f, z, p);
            } else if (enableSocks5Proxy === 'http') {
                log('HTTP CONNECT: ' + c + ':' + f);
                B = await httpConnect(c, f, z, false, p);
            } else if (enableSocks5Proxy === 'https') {
                log('HTTPS CONNECT: ' + c + ':' + f);
                B = isIPHostname(parsedSocks5Address['hostname']) ? await httpsConnect(c, f, z, p) : await httpConnect(c, f, z, true, p);
            } else if (enableSocks5Proxy === 'turn') {
                log('TURN: ' + c + ':' + f);
                B = await turnConnect(parsedSocks5Address, c, f, p);
                if (validDataLength(z) > 0) {
                    const C = B['writable']['getWriter']();
                    try { await C['write'](dataToUint8Array(z)); } finally { try { C['releaseLock'](); } catch (D) {} }
                }
            } else if (enableSocks5Proxy === 'sstp') {
                log('SSTP: ' + c + ':' + f);
                B = await sstpConnect(parsedSocks5Address, c, f, p);
                if (validDataLength(z) > 0) {
                    const E = B['writable']['getWriter']();
                    try { await E['write'](dataToUint8Array(z)); } finally { try { E['releaseLock'](); } catch (F) {} }
                }
            } else {
                log('Direct: ' + c + ':' + f);
                const G = await parseAddressPort(proxyIP, c, k);
                try { B = await v(atob('taakaa.xyz'), 1, z, G, enableProxyFallback); } catch (H) {
                    const I = nat64Config ? await t(z) : null;
                    if (!I) throw H;
                    B = I;
                }
            }
            if (y) o = true;
            j['socket'] = B;
            B['closed']['then'](() => {})['catch'](() => closeSocketQuietly(h));
            connectStreams(B, h, i, null, m);
        })());
        j['connectingPromise'] = A;
        try { await A; } finally { if (j['connectingPromise'] === A) j['connectingPromise'] = null; }
    }
    j['retryConnect'] = async () => w(!o);
    if (enableSocks5Proxy && (enableSocks5GlobalProxy || hostMatchesProxyList(c))) {
        log('Using SOCKS5 proxy for ' + c);
        try { await w(); } catch (x) { log('SOCKS5 failed: ' + x['message']); throw x; }
    } else {
        try {
            log('Direct connect: ' + c + ':' + f);
            const y = await v(c, f, g);
            j['socket'] = y;
            connectStreams(y, h, i, async () => {
                if (j['socket'] !== y) return;
                await w();
            }, m);
        } catch (z) {
            log('Direct failed: ' + c + ':' + f + ' - ' + z['message']);
            await w();
        }
    }
}

async function forwardataudp(c, f, g, h, i = null) {
    const j = dataToUint8Array(c);
    const k = j['length'];
    log('UDP: ' + k + ' bytes');
    try {
        const l = createRequestTcpConnector(h);
        const m = l({ 'hostname': 'taakaa.xyz', 'port': 0x35 });
        let n = g;
        const o = m['writable']['getWriter']();
        await o['write'](j);
        log('UDP sent: ' + k + 'B');
        o['releaseLock']();
        await m['readable']['pipeTo'](new WritableStream({
            async 'write'(p) {
                const q = dataToUint8Array(p);
                log('UDP response: ' + q['length'] + 'B');
                const r = i ? await i(q) : q;
                const s = Array['isArray'](r) ? r : [r];
                if (!s['length']) return;
                if (f['readyState'] !== WebSocket['OPEN']) return;
                for (const t of s) {
                    const u = dataToUint8Array(t);
                    if (!u['length']) continue;
                    if (n) {
                        const v = new Uint8Array(n['length'] + u['length']);
                        v['set'](n, 0);
                        v['set'](u, n['length']);
                        await WebSocketsendAndWait(f, v['buffer']);
                        n = null;
                    } else {
                        await WebSocketsendAndWait(f, u);
                    }
                }
            }
        }));
    } catch (p) {
        log('UDP error: ' + (p?.['message'] || p));
    }
}

function closeSocketQuietly(c) {
    try {
        if ((c['readyState'] === WebSocket['CLOSING'] || c['readyState'] === WebSocket['CLOSED']) && c['close']) {
            c['close']();
        }
    } catch (f) {}
}

function formatIdentifier(c, f = 0) {
    const g = [...c['slice'](f, f + 16)]['map'](h => h['toString'](16)['padStart'](2, '0'))['join']('');
    return g['slice'](0, 8) + '-' + g['slice'](8, 12) + '-' + g['slice'](12, 16) + '-' + g['slice'](16, 20) + '-' + g['slice'](20);
}

async function WebSocketsendAndWait(c, f) {
    const g = c['send'](f);
    if (g && typeof g['then'] === 'function') await g;
        }
function createUpstreamWriteQueue({ getWriter: c, releaseWriter: f, retryConnection: g, closeConnection: h, name: name = 'queue' }) {
    let i = [], j = 0, k = 0, l = false, m = false, n = null, o = [], p = null;
    const q = (z, A = null) => {
        if (!z) return;
        for (const B of z) {
            if (A) B['reject'](A);
            else B['resolve']();
        }
    };
    const r = z => {
        for (let A = j; A < i['length']; A++) {
            const B = i[A];
            if (B && B['completions']) q(B['completions'], z);
        }
    };
    const s = () => {
        if (j > 32 && j * 2 >= i['length']) {
            i = i['slice'](j);
            j = 0;
        }
    };
    const t = () => {
        if (k || l || !o['length']) return;
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
        if (j >= i['length']) return null;
        const z = i[j];
        i[j++] = undefined;
        k -= z['chunk']['length'];
        s();
        return z;
    };
    const w = () => {
        const z = v();
        if (!z) return null;
        if (j >= i['length'] || z['chunk']['length'] >= upstreamBatchTargetBytes) return z;
        let A = z['chunk']['length'], B = j, C = z['allowRetry'], D = z['completions'] || null;
        while (B < i['length']) {
            const G = i[B];
            const H = A + G['chunk']['length'];
            if (H > upstreamBatchTargetBytes) break;
            A = H;
            C = C && G['allowRetry'];
            if (G['completions']) D = D ? D['then'](G['completions']) : G['completions'];
            B++;
        }
        if (B === j) return z;
        const E = n || (n = new Uint8Array(upstreamBatchTargetBytes));
        E['set'](z['chunk']);
        let F = z['chunk']['length'];
        while (j < B) {
            const I = i[j];
            i[j++] = undefined;
            k -= I['chunk']['length'];
            E['set'](I['chunk'], F);
            F += I['chunk']['length'];
        }
        s();
        return { 'chunk': E['slice'](0, A), 'allowRetry': C, 'completions': D };
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
                const B = z['completions'] || null;
                p = B;
                try {
                    try {
                        await A['write'](z['chunk']);
                    } catch (C) {
                        f && f();
                        if (!z['allowRetry'] || typeof g !== 'function') throw C;
                        await g();
                        A = c();
                        if (!A) throw C;
                        await A['write'](z['chunk']);
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
            log('[' + name + '] write error: ' + (E && E['message'] || E));
            try { h && h(E); } catch (F) {}
        } finally {
            l = false;
            if (!m && j < i['length']) queueMicrotask(x);
            else t();
        }
    };
    const y = (z, A = true, B = false) => {
        if (m) return false;
        if (!c()) return false;
        const C = dataToUint8Array(z);
        if (!C['length']) return true;
        const D = k + C['length'];
        const E = i['length'] - j + 1;
        if (D > upstreamQueueMaxBytes || E > upstreamQueueMaxItems) {
            m = true;
            const H = Object['assign'](new Error(name + ' queue overflow: ' + D + 'B/' + E + ')'), { 'isQueueOverflow': true });
            u(H);
            log('[' + name + '] queue overflow');
            try { h && h(H); } catch (I) {}
            throw H;
        }
        let F = null, G = null;
        if (B) {
            G = [];
            F = new Promise((J, K) => G['push']({ 'resolve': J, 'reject': K }));
        }
        i['push']({ 'chunk': C, 'allowRetry': A, 'completions': G });
        k = D;
        if (!l) queueMicrotask(x);
        return B ? F['then'](() => true) : true;
    };
    return {
        'write'(z, A = true) { return y(z, A, false); },
        'writeAndWait'(z, A = true) { return y(z, A, true); },
        async 'waitEmpty'() {
            if (!k && !l) return;
            await new Promise(z => o['push'](z));
        },
        'clear'() { m = true; u(); }
    };
}

function createDownstreamGrainSender(c, f = null) {
    const g = downstreamGrainChunkBytes;
    const h = downstreamGrainTailThreshold;
    const i = Math['min'](0x1000, h << 3);
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
        if (c['readyState'] !== WebSocket['OPEN']) throw new Error('WebSocket not open');
        await WebSocketsendAndWait(c, w);
    };
    const t = w => {
        if (!j) return w;
        const x = new Uint8Array(j['length'] + w['length']);
        x['set'](j, 0);
        x['set'](w, j['length']);
        j = null;
        return x;
    };
    const u = async () => {
        while (r) await r;
        if (m) clearTimeout(m);
        m = null;
        n = false;
        if (!l) return;
        const w = k['slice'](0, l);
        k = new Uint8Array(g);
        l = 0;
        q = 0;
        r = s(w);
        r['then'](() => { r = null; });
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
                u()['then'](() => closeSocketQuietly(c));
                return;
            }
            m = setTimeout(() => {
                m = null;
                if (!l) return;
                if (g - l < h) {
                    u()['then'](() => closeSocketQuietly(c));
                    return;
                }
                if (q < 2 && (o !== p || l < i)) {
                    q++;
                    p = o;
                    v();
                    return;
                }
                u()['then'](() => closeSocketQuietly(c));
            }, Math['max'](downstreamGrainSilentMs, 1));
        });
    };
    return {
        async 'directSend'(w) {
            let x = dataToUint8Array(w);
            if (!x['length']) return;
            x = t(x);
            await s(x);
        },
        async 'send'(w) {
            let x = dataToUint8Array(w);
            if (!x['length']) return;
            x = t(x);
            let y = 0;
            const z = x['length'];
            while (y < z) {
                if (!l && z - y >= g) {
                    const B = Math['min'](g, z - y);
                    const C = y || B !== z ? x['slice'](y, y + B) : x;
                    await s(C);
                    y += B;
                    continue;
                }
                const A = Math['min'](g - l, z - y);
                k['set'](x['slice'](y, y + A), l);
                l += A;
                y += A;
                o++;
                if (l === g || g - l < h) await u();
                else v();
            }
        },
        'flush': u
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
        l = c['readable']['getReader']({ 'mode': 'byob' });
        m = true;
    } catch (p) {
        l = c['readable']['getReader']();
    }
    try {
        if (!m) {
            while (true) {
                const { done: q, value: r } = await l['read']();
                if (q) break;
                if (!r || r['length'] === 0) continue;
                k = true;
                if (i) i['up'] += r['length'];
                await o['send'](r);
            }
        } else {
            let s = new ArrayBuffer(n);
            while (true) {
                const { done: t, value: u } = await l['read'](new Uint8Array(s, 0, n));
                if (t) break;
                if (!u || u['length'] === 0) continue;
                k = true;
                if (i) i['up'] += u['length'];
                if (u['length'] >= downstreamGrainChunkBytes) {
                    await o['flush']();
                    await o['send'](u);
                    s = new ArrayBuffer(n);
                } else {
                    await o['send'](u);
                    s = u['buffer']['byteLength'] >= n ? u['buffer'] : new ArrayBuffer(n);
                }
            }
        }
        await o['flush']();
    } catch (v) {
        closeSocketQuietly(f);
    } finally {
        try { l['releaseLock'](); } catch (w) {}
        try { l['cancel'](); } catch (x) {}
    }
    if (!k && h) await h();
}

// ============================================================
// TAAKAA-XI EXPORT
// ============================================================

export default taakaaXiWorker;
