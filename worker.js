// ============================================================
// TAAKAA-XI WORKER v2.0.0 - PART 1/3 - COMPLETE
// ============================================================
// 
//                            TaaKaa-Xi 
//        the new generation of Free config
//
// ============================================================

const BRAND = 'Taakaa-Xi';
const VERSION = 'Taakaa-Xi-v2.0.0';
const CHANNEL = '@TaaKaaOrg';
const TEAM = 'تیم تاکا - ۳ ماه توسعه';

// ============================================================
// IP POOLS
// ============================================================

const IP_POOLS = {
    irancel: [
        '188.114.98.82:2083', '104.17.71.192:443', '141.101.115.191:443',
        '104.17.71.192:2087', '141.101.115.191:2096', '188.114.98.82:2087',
        '104.17.71.192:2053', '104.17.71.192:8443', '104.17.71.192:2083',
        '198.41.202.88:2087', '198.41.202.88:8443', '188.114.98.82:2096',
        '188.114.98.82:2053', '198.41.202.88:443', '198.41.202.88:2083',
        '188.114.98.82:8443', '188.114.98.82:443', '198.41.202.88:2096',
        '198.41.202.88:2053', '141.101.115.191:8443', '141.101.115.191:2053',
        '141.101.115.191:2083', '141.101.115.191:2087', '104.19.35.197:2096',
        '172.67.79.95:443', '172.67.79.95:2053', '108.162.198.63:443',
        '104.26.9.174:2096', '104.19.35.197:443', '104.26.9.174:8443',
        '172.67.79.95:2096', '172.67.79.95:2083', '108.162.198.63:2096',
        '172.67.79.95:8443', '104.19.35.197:2053', '108.162.198.63:2087',
        '8.35.211.114:2053', '108.162.198.63:2053', '104.19.35.197:2083',
        '8.35.211.114:443', '104.26.9.174:2087', '8.35.211.114:2096',
        '172.67.79.95:2087', '8.35.211.207:2053', '104.19.35.197:8443',
        '108.162.198.63:2083', '8.35.211.114:2083', '104.19.35.197:2087',
        '8.35.211.114:2087', '108.162.198.63:8443', '8.35.211.114:8443'
    ],
    hamraheAval: [
        '172.64.184.93:443', '172.64.184.93:2083', '172.64.184.93:2087',
        '172.64.184.93:2096', '172.64.184.93:2053', '172.64.184.93:8443',
        '138.249.126.242:443', '138.249.126.242:2083', '138.249.126.242:2087'
    ],
    rightel: [
        '45.198.116.93:443', '45.198.116.93:2083', '45.198.116.93:2087',
        '45.198.116.93:2096', '45.198.116.93:2053', '45.198.116.93:8443',
        '66.92.62.239:443', '66.92.62.239:2083', '66.92.62.239:2087'
    ]
};

// ============================================================
// SMART PARSERS
// ============================================================

function parseVolume(input) {
    if (!input || input === '' || input === '0' || input === 'unlimited' || input === 'Infinity') {
        return Infinity;
    }
    var str = String(input).trim().toLowerCase();
    var num = parseFloat(str) || 0;
    if (isNaN(num) || num <= 0) return Infinity;
    if (str.endsWith('pt') || str.endsWith('pb')) return num * 1024 * 1024 * 1024 * 1024;
    if (str.endsWith('t') || str.endsWith('tb')) return num * 1024 * 1024;
    if (str.endsWith('g') || str.endsWith('gb')) return num * 1024;
    if (str.endsWith('m') || str.endsWith('mb')) return num;
    if (str.endsWith('k') || str.endsWith('kb')) return num / 1024;
    return num * 1024;
}

function parseDuration(input) {
    if (!input || input === '' || input === '0' || input === 'unlimited' || input === 'Infinity') {
        return Infinity;
    }
    var str = String(input).trim().toLowerCase();
    var num = parseFloat(str) || 0;
    if (isNaN(num) || num <= 0) return Infinity;
    if (str.endsWith('y')) return num * 365;
    if (str.endsWith('m') && !str.endsWith('mb') && !str.endsWith('ms')) return num * 30;
    if (str.endsWith('w')) return num * 7;
    if (str.endsWith('d')) return num;
    return num || 30;
}

function formatVolume(mb) {
    if (mb === Infinity) return '∞ نامحدود';
    if (mb >= 1024 * 1024 * 1024) return (mb / (1024 * 1024 * 1024)).toFixed(2) + ' PB';
    if (mb >= 1024 * 1024) return (mb / (1024 * 1024)).toFixed(2) + ' TB';
    if (mb >= 1024) return (mb / 1024).toFixed(2) + ' GB';
    return mb.toFixed(0) + ' MB';
}

function formatDuration(days) {
    if (days === Infinity) return '∞ نامحدود';
    if (days >= 365) return Math.floor(days / 365) + ' سال';
    if (days >= 30) return Math.floor(days / 30) + ' ماه';
    return days + ' روز';
}

// ============================================================
// UUID GENERATOR
// ============================================================

function generateUUID() {
    if (crypto.randomUUID) return crypto.randomUUID();
    var b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    var hex = Array.from(b).map(function(x) { return x.toString(16).padStart(2, '0'); }).join('');
    return hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20);
}

function isValidUUID(str) {
    var pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return pattern.test(str);
}

// ============================================================
// IP FUNCTIONS
// ============================================================

function getBestIp(operator) {
    operator = operator || 'irancel';
    var pool = IP_POOLS[operator] || IP_POOLS.irancel;
    var randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex].split(':')[0];
}

function getBestPort(operator) {
    operator = operator || 'irancel';
    var pool = IP_POOLS[operator] || IP_POOLS.irancel;
    var randomIndex = Math.floor(Math.random() * pool.length);
    return parseInt(pool[randomIndex].split(':')[1]) || 443;
}

async function scanIp(ip) {
    var controller = new AbortController();
    var timeoutId = setTimeout(function() { controller.abort(); }, 3000);
    try {
        var start = Date.now();
        var resp = await fetch('https://' + ip + '/', { 
            method: 'HEAD',
            signal: controller.signal,
            cf: { cacheTtl: 0 }
        });
        clearTimeout(timeoutId);
        var ping = Date.now() - start;
        return { ip: ip, status: resp.ok ? 'alive' : 'dead', ping: ping, code: resp.status };
    } catch (e) {
        clearTimeout(timeoutId);
        return { ip: ip, status: 'dead', ping: -1, code: 0 };
    }
}

async function scanIps(ips, limit) {
    limit = limit || 10;
    var results = [];
    var shuffled = [...ips].sort(function() { return Math.random() - 0.5; });
    var selected = shuffled.slice(0, limit);
    for (var i = 0; i < selected.length; i++) {
        var result = await scanIp(selected[i]);
        results.push(result);
    }
    return results.sort(function(a, b) {
        if (a.status === 'alive' && b.status !== 'alive') return -1;
        if (a.status !== 'alive' && b.status === 'alive') return 1;
        return a.ping - b.ping;
    });
}

// ============================================================
// CONFIG GENERATORS
// ============================================================

function generateVlessConfig(user, host, path) {
    var ip = user.customIp || getBestIp(user.operator || 'irancel');
    var port = user.port || getBestPort(user.operator || 'irancel');
    return {
        v: '2',
        ps: BRAND + ' - ' + user.name,
        add: ip,
        port: port,
        id: user.uuid,
        aid: '0',
        scy: 'auto',
        net: 'ws',
        type: 'none',
        host: host,
        path: path + '?u=' + user.id,
        tls: 'tls',
        sni: host,
        fp: 'chrome'
    };
}

function generateTrojanConfig(user, host, path) {
    var ip = user.customIp || getBestIp(user.operator || 'irancel');
    var port = user.port || getBestPort(user.operator || 'irancel');
    return {
        name: BRAND + ' - ' + user.name,
        type: 'trojan',
        server: ip,
        port: port,
        password: user.uuid,
        udp: true,
        sni: host,
        fp: 'chrome',
        'allow-insecure': false,
        network: 'ws',
        'ws-opts': {
            path: path + '?u=' + user.id,
            headers: { Host: host }
        }
    };
}

function generateShadowsocksConfig(user) {
    var ip = user.customIp || getBestIp(user.operator || 'irancel');
    var port = user.port || getBestPort(user.operator || 'irancel');
    var method = 'aes-256-gcm';
    var password = user.uuid.slice(0, 16);
    return {
        server: ip,
        server_port: port,
        password: password,
        method: method,
        name: BRAND + ' - ' + user.name + ' (SS)'
    };
}

// ============================================================
// SUBSCRIPTION GENERATOR (با Buffer به جای btoa)
// ============================================================

function generateSubscription(user, host, path) {
    var vless = generateVlessConfig(user, host, path);
    var trojan = generateTrojanConfig(user, host, path);
    var ss = generateShadowsocksConfig(user);
    
    var vlessLink = 'vless://' + vless.id + '@' + vless.add + ':' + vless.port + '?encryption=none&security=tls&sni=' + vless.sni + '&fp=' + vless.fp + '&type=ws&host=' + vless.host + '&path=' + encodeURIComponent(vless.path) + '#' + encodeURIComponent(vless.ps);
    
    var trojanLink = 'trojan://' + trojan.password + '@' + trojan.server + ':' + trojan.port + '?sni=' + trojan.sni + '&fp=' + trojan.fp + '&type=ws&host=' + host + '&path=' + encodeURIComponent(trojan['ws-opts'].path) + '#' + encodeURIComponent(trojan.name);
    
    // ✅ اصلاح: استفاده از Buffer به جای btoa
    var ssLink = 'ss://' + Buffer.from(ss.method + ':' + ss.password).toString('base64') + '@' + ss.server + ':' + ss.server_port + '#' + encodeURIComponent(ss.name);
    
    return {
        vless: vlessLink,
        trojan: trojanLink,
        shadowsocks: ssLink,
        raw: [vlessLink, trojanLink, ssLink].join('\n')
    };
}

// ============================================================
// PAGE RENDERERS - WELCOME
// ============================================================

function renderWelcomePage(hasKV, hasD1, hasAdmin) {
    var allOk = hasKV && hasD1 && hasAdmin;
    return '<!DOCTYPE html>\n<html lang="fa" dir="rtl">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>خوش آمدید - Taakaa-Xi</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Tahoma, sans-serif; }\n        body { background: #0d0d0d; color: #ffa64d; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 20px; }\n        .loader-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0d0d0d; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 9999; transition: opacity 0.8s; }\n        .loader { width: 60px; height: 60px; border: 4px solid #1a1a1a; border-top: 4px solid #ff6b00; border-radius: 50%; animation: spin 1s linear infinite; }\n        .loader-text { margin-top: 20px; color: #ff8c00; font-size: 16px; }\n        .loader-sub { margin-top: 10px; color: #666; font-size: 13px; }\n        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }\n        .card { background: #1a1a1a; border: 2px solid #ff6b00; border-radius: 16px; padding: 40px; max-width: 700px; width: 100%; box-shadow: 0 0 40px rgba(255,107,0,0.15); }\n        h1 { color: #ff8c00; text-align: center; font-size: 32px; margin-bottom: 10px; }\n        .subtitle { text-align: center; color: #ffa64d; font-size: 14px; margin-bottom: 25px; }\n        .check-item { display: flex; align-items: center; padding: 12px 15px; margin: 8px 0; background: #0d0d0d; border-radius: 10px; border: 1px solid #222; }\n        .check-icon { font-size: 22px; margin-left: 12px; }\n        .check-text { flex: 1; font-size: 14px; }\n        .check-detail { font-size: 12px; color: #666; margin-top: 4px; }\n        .check-status { font-weight: bold; font-size: 13px; }\n        .check-status.ok { color: #4caf50; }\n        .check-status.fail { color: #f44336; }\n        .btn { display: inline-block; padding: 12px 30px; background: #ff6b00; color: #0d0d0d; border: none; border-radius: 10px; font-weight: bold; font-size: 16px; cursor: pointer; text-decoration: none; transition: all 0.3s; margin-top: 15px; }\n        .btn:hover { background: #ff8c00; transform: scale(1.02); }\n        .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }\n        .text-center { text-align: center; }\n        .channel { text-align: center; margin-top: 15px; padding: 10px; background: #0d0d0d; border-radius: 8px; border: 1px solid #ff6b00; }\n        .channel a { color: #ff8c00; text-decoration: none; font-weight: bold; }\n        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }\n        .team { text-align: center; color: #ffa64d; font-size: 13px; margin: 10px 0; }\n    </style>\n</head>\n<body>\n<div class="loader-container" id="loader">\n    <div class="loader"></div>\n    <div class="loader-text">🔄 در حال آماده‌سازی...</div>\n    <div class="loader-sub">' + TEAM + '</div>\n</div>\n<div class="card" id="mainContent" style="display:none;">\n    <h1>🖐🏻🤓🖐🏻 TAAKAA-XI</h1>\n    <div class="subtitle">the new generation of Free config</div>\n    <div class="team">' + TEAM + '</div>\n    <div style="background: #0d0d0d; border-radius: 10px; padding: 15px; margin: 15px 0; border: 1px solid #333; text-align: center; color: #ffa64d; font-size: 15px;">\n        ✅ اگر این صفحه را می‌بینید، تمامی مراحل را درست انجام داده‌اید!\n    </div>\n    <div class="check-item">\n        <span class="check-icon">' + (hasKV ? '✅' : '❌') + '</span>\n        <div class="check-text">\n            <div>KV Storage</div>\n            <div class="check-detail">' + (hasKV ? 'متصل است' : 'لطفاً KV را متصل کنید (نام متغیر: KV)') + '</div>\n        </div>\n        <span class="check-status ' + (hasKV ? 'ok' : 'fail') + '">' + (hasKV ? 'فعال' : 'غیرفعال') + '</span>\n    </div>\n    <div class="check-item">\n        <span class="check-icon">' + (hasD1 ? '✅' : '❌') + '</span>\n        <div class="check-text">\n            <div>D1 SQLite Database</div>\n            <div class="check-detail">' + (hasD1 ? 'متصل است' : 'لطفاً D1 را متصل کنید (نام متغیر: DB)') + '</div>\n        </div>\n        <span class="check-status ' + (hasD1 ? 'ok' : 'fail') + '">' + (hasD1 ? 'فعال' : 'غیرفعال') + '</span>\n    </div>\n    <div class="check-item">\n        <span class="check-icon">' + (hasAdmin ? '✅' : '❌') + '</span>\n        <div class="check-text">\n            <div>Admin Password</div>\n            <div class="check-detail">' + (hasAdmin ? 'تنظیم شده است' : 'لطفاً ADMIN_PASS را تنظیم کنید') + '</div>\n        </div>\n        <span class="check-status ' + (hasAdmin ? 'ok' : 'fail') + '">' + (hasAdmin ? 'فعال' : 'غیرفعال') + '</span>\n    </div>\n    ' + (allOk ? '<div class="text-center"><a href="/panel" class="btn">🚀 ورود به پنل مدیریت</a></div>' : '<div style="background: #1a1a1a; border-radius: 10px; padding: 15px; margin: 15px 0; border: 1px solid #ff6b00; text-align: center; color: #ffa64d; font-size: 13px;">⚠️ لطفاً تمام مراحل بالا را تکمیل کنید تا پنل فعال شود</div>') + '\n    <div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>\n    <div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>\n</div>\n<script>\n    setTimeout(function() {\n        document.getElementById(\'loader\').style.opacity = \'0\';\n        setTimeout(function() {\n            document.getElementById(\'loader\').style.display = \'none\';\n            document.getElementById(\'mainContent\').style.display = \'block\';\n        }, 800);\n    }, 1500);\n</script>\n</body>\n</html>';
        }
// ============================================================
// TAAKAA-XI WORKER v2.0.0 - PART 2/3 - PANEL
// ============================================================

// ============================================================
// PAGE RENDERERS - PANEL (با توابع کمکی داخلی)
// ============================================================

function renderPanel(users, usage, settings) {
    users = users || [];
    usage = usage || {};
    settings = settings || {};
    
    // ===== توابع کمکی داخل پنل =====
    function formatVolume(mb) {
        if (mb === Infinity) return '∞ نامحدود';
        if (mb >= 1024 * 1024 * 1024) return (mb / (1024 * 1024 * 1024)).toFixed(2) + ' PB';
        if (mb >= 1024 * 1024) return (mb / (1024 * 1024)).toFixed(2) + ' TB';
        if (mb >= 1024) return (mb / 1024).toFixed(2) + ' GB';
        return mb.toFixed(0) + ' MB';
    }
    
    function formatDuration(days) {
        if (days === Infinity) return '∞ نامحدود';
        if (days >= 365) return Math.floor(days / 365) + ' سال';
        if (days >= 30) return Math.floor(days / 30) + ' ماه';
        return days + ' روز';
    }
    
    var userList = users.map(function(u) {
        var used = usage[u.id] || 0;
        var remaining = (u.limit || Infinity) - used;
        return '<div class="user-item" id="user-' + u.id + '">\n' +
            '    <div class="user-info">\n' +
            '        <div class="user-name">' + (u.name || u.id) + '</div>\n' +
            '        <div class="user-detail">🆔 UUID: <span class="copyable" onclick="copyText(\'' + u.uuid + '\')">' + u.uuid + '</span></div>\n' +
            '        <div class="user-detail">🌍 IP: ' + (u.customIp || 'خودکار') + '</div>\n' +
            '        <div class="user-detail">📦 محدودیت: ' + formatVolume(u.limit) + '</div>\n' +
            '        <div class="user-detail">📊 مصرف: ' + formatVolume(used) + '</div>\n' +
            '        <div class="user-detail">📊 باقی‌مانده: ' + formatVolume(remaining) + '</div>\n' +
            '        <div class="user-detail">⏳ انقضا: ' + formatDuration(u.expiry) + '</div>\n' +
            '        <div class="user-detail">📡 اپراتور: ' + (u.operator || 'irancel') + '</div>\n' +
            '    </div>\n' +
            '    <div class="user-actions">\n' +
            '        <div class="user-status ' + (u.disabled ? 'disabled' : 'active') + '">' + (u.disabled ? '🔴 غیرفعال' : '🟢 فعال') + '</div>\n' +
            '        <button class="btn-sm btn-primary" onclick="editUser(\'' + u.id + '\')">✏️ ویرایش</button>\n' +
            '        <button class="btn-sm btn-danger" onclick="deleteUser(\'' + u.id + '\')">🗑️ حذف</button>\n' +
            '        <button class="btn-sm btn-primary" onclick="resetUsage(\'' + u.id + '\')">🔄 ریست مصرف</button>\n' +
            '        <button class="btn-sm btn-primary" onclick="toggleUser(\'' + u.id + '\')">' + (u.disabled ? '✅ فعال‌سازی' : '⛔ غیرفعال‌سازی') + '</button>\n' +
            '        <button class="btn-sm btn-primary" onclick="showConfig(\'' + u.id + '\')">📋 کانفیگ</button>\n' +
            '    </div>\n' +
            '</div>';
    }).join('');

    return '<!DOCTYPE html>\n' +
'<html lang="fa" dir="rtl">\n' +
'<head>\n' +
'    <meta charset="UTF-8">\n' +
'    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'    <title>پنل مدیریت - Taakaa-Xi</title>\n' +
'    <style>\n' +
'        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Tahoma, sans-serif; }\n' +
'        body { background: #0d0d0d; color: #ffa64d; padding: 20px; min-height: 100vh; display: flex; justify-content: center; align-items: flex-start; }\n' +
'        .card { background: #1a1a1a; border: 2px solid #ff6b00; border-radius: 16px; padding: 30px; max-width: 1200px; width: 100%; margin: 20px auto; box-shadow: 0 0 30px rgba(255,107,0,0.2); }\n' +
'        h1 { color: #ff8c00; text-align: center; margin-bottom: 5px; font-size: 28px; }\n' +
'        .subtitle { text-align: center; color: #ffa64d; font-size: 13px; margin-bottom: 20px; }\n' +
'        .logout-btn { float: left; color: #ff6b00; text-decoration: none; font-size: 14px; border: 1px solid #ff6b00; padding: 5px 15px; border-radius: 8px; transition: all 0.3s; }\n' +
'        .logout-btn:hover { background: #ff6b00; color: #0d0d0d; }\n' +
'        h2 { color: #ff8c00; margin: 20px 0 10px; font-size: 20px; border-bottom: 1px solid #ff6b00; padding-bottom: 8px; }\n' +
'        .menu { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin: 20px 0; }\n' +
'        .menu a { background: #0d0d0d; border: 1px solid #ff6b00; border-radius: 10px; padding: 12px; text-align: center; color: #ffa64d; text-decoration: none; transition: all 0.3s; font-size: 14px; cursor: pointer; }\n' +
'        .menu a:hover { background: #ff6b00; color: #0d0d0d; }\n' +
'        .user-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; margin: 5px 0; background: #0d0d0d; border-radius: 8px; border: 1px solid #222; flex-wrap: wrap; gap: 10px; }\n' +
'        .user-info { flex: 1; min-width: 200px; }\n' +
'        .user-name { color: #fff; font-weight: bold; font-size: 16px; }\n' +
'        .user-detail { color: #ffa64d; font-size: 12px; margin-top: 2px; }\n' +
'        .user-actions { display: flex; flex-wrap: wrap; gap: 5px; align-items: center; }\n' +
'        .user-status { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }\n' +
'        .user-status.active { background: #1a5a1a; color: #4caf50; }\n' +
'        .user-status.disabled { background: #5a1a1a; color: #f44336; }\n' +
'        .form-group { margin: 12px 0; }\n' +
'        .form-group label { display: block; margin-bottom: 5px; color: #ffa64d; font-size: 14px; }\n' +
'        .form-group input, .form-group select { width: 100%; padding: 10px; background: #0d0d0d; border: 1px solid #ff6b00; border-radius: 8px; color: #fff; font-size: 14px; }\n' +
'        .form-group .hint { color: #666; font-size: 12px; margin-top: 3px; }\n' +
'        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }\n' +
'        .btn-primary { padding: 10px 25px; background: #ff6b00; border: none; border-radius: 8px; color: #0d0d0d; font-weight: bold; cursor: pointer; font-size: 14px; transition: all 0.3s; }\n' +
'        .btn-primary:hover { background: #ff8c00; }\n' +
'        .btn-danger { padding: 10px 25px; background: #d32f2f; border: none; border-radius: 8px; color: #fff; font-weight: bold; cursor: pointer; font-size: 14px; transition: all 0.3s; }\n' +
'        .btn-danger:hover { background: #f44336; }\n' +
'        .btn-sm { padding: 5px 12px; font-size: 12px; }\n' +
'        .status-box { background: #0d0d0d; border-radius: 10px; padding: 15px; margin: 15px 0; border: 1px solid #333; }\n' +
'        .channel { text-align: center; margin-top: 15px; padding: 10px; background: #0d0d0d; border-radius: 8px; border: 1px solid #ff6b00; }\n' +
'        .channel a { color: #ff8c00; text-decoration: none; font-weight: bold; }\n' +
'        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }\n' +
'        .scanner-result { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 10px 0; }\n' +
'        .scanner-item { background: #0d0d0d; border: 1px solid #333; border-radius: 8px; padding: 10px; text-align: center; }\n' +
'        .scanner-item .ip { color: #ff8c00; font-weight: bold; }\n' +
'        .scanner-item .status { font-size: 12px; margin-top: 5px; }\n' +
'        .scanner-item .status.alive { color: #4caf50; }\n' +
'        .scanner-item .status.dead { color: #f44336; }\n' +
'        .scanner-item .ping { font-size: 12px; color: #666; }\n' +
'        .tab-bar { display: flex; gap: 5px; margin: 10px 0; flex-wrap: wrap; }\n' +
'        .tab { padding: 8px 15px; background: #0d0d0d; border: 1px solid #333; border-radius: 8px; cursor: pointer; color: #ffa64d; transition: all 0.3s; }\n' +
'        .tab.active { background: #ff6b00; color: #0d0d0d; border-color: #ff6b00; }\n' +
'        .tab:hover { border-color: #ff6b00; }\n' +
'        .tab-content { display: none; }\n' +
'        .tab-content.active { display: block; }\n' +
'        .copyable { cursor: pointer; color: #ff8c00; }\n' +
'        .copyable:hover { text-decoration: underline; }\n' +
'        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; justify-content: center; align-items: center; }\n' +
'        .modal-content { background: #1a1a1a; border: 2px solid #ff6b00; border-radius: 16px; padding: 30px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; }\n' +
'        .modal-content h2 { color: #ff8c00; }\n' +
'        .modal-close { float: left; color: #ff6b00; font-size: 24px; cursor: pointer; }\n' +
'        .config-box { background: #0d0d0d; border-radius: 8px; padding: 15px; font-family: monospace; font-size: 12px; overflow-x: auto; white-space: pre-wrap; word-break: break-all; border: 1px solid #333; margin: 10px 0; }\n' +
'        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } .user-item { flex-direction: column; align-items: stretch; } }\n' +
'    </style>\n' +
'</head>\n' +
'<body>\n' +
'<div class="card">\n' +
'    <h1>🖐🏻🤓🖐🏻 TAAKAA-XI</h1>\n' +
'    <div class="subtitle">the new generation of Free config</div>\n' +
'    <a href="/logout" class="logout-btn">🚪 خروج</a>\n' +
'    <div class="status-box">\n' +
'        <p>✅ پنل مدیریت کانفیگ</p>\n' +
'        <p style="font-size:14px;color:#ff8c00;">نسخه: ' + VERSION + '</p>\n' +
'        <p style="font-size:12px;color:#666;">' + TEAM + '</p>\n' +
'    </div>\n' +
'    <div class="tab-bar">\n' +
'        <div class="tab active" onclick="switchTab(\'dashboard\')">📊 داشبورد</div>\n' +
'        <div class="tab" onclick="switchTab(\'users\')">👥 کاربران</div>\n' +
'        <div class="tab" onclick="switchTab(\'scanner\')">📡 اسکنر IP</div>\n' +
'        <div class="tab" onclick="switchTab(\'settings\')">⚙️ تنظیمات</div>\n' +
'        <div class="tab" onclick="switchTab(\'subscription\')">📋 سابسکریپشن</div>\n' +
'        <div class="tab" onclick="switchTab(\'backup\')">💾 بکاپ</div>\n' +
'    </div>\n' +
'    <div id="tab-dashboard" class="tab-content active">\n' +
'        <h2>📊 آمار کلی</h2>\n' +
'        <div class="status-box">\n' +
'            <p>👥 تعداد کاربران: ' + users.length + '</p>\n' +
'            <p>📡 پروتکل‌ها: VLESS, Trojan, Shadowsocks, XHTTP, gRPC</p>\n' +
'            <p>🛡️ تکنیک‌ها: Fragment, WARP, ECH, GSA Relay</p>\n' +
'            <p>📢 کانال: @TaaKaaOrg</p>\n' +
'        </div>\n' +
'        <h2>👥 لیست کاربران</h2>\n' +
'        <div id="userList">\n' +
'            ' + (userList || '<p style="color:#666;">هیچ کاربری تعریف نشده است</p>') + '\n' +
'        </div>\n' +
'    </div>\n' +
'    <div id="tab-users" class="tab-content">\n' +
'        <h2>➕ افزودن کاربر جدید</h2>\n' +
'        <form id="addUserForm" onsubmit="addUser(event)">\n' +
'            <div class="form-row">\n' +
'                <div class="form-group">\n' +
'                    <label>👤 نام کاربر:</label>\n' +
'                    <input type="text" id="userName" placeholder="مثلاً کاربر شماره ۱" required>\n' +
'                </div>\n' +
'                <div class="form-group">\n' +
'                    <label>🔑 UUID (اختیاری - خالی برای خودکار):</label>\n' +
'                    <input type="text" id="userUuid" placeholder="خالی = خودکار">\n' +
'                </div>\n' +
'            </div>\n' +
'            <div class="form-row">\n' +
'                <div class="form-group">\n' +
'                    <label>📦 محدودیت حجم کل:</label>\n' +
'                    <input type="text" id="userLimit" placeholder="5GB, 1T, 500mb" value="5GB">\n' +
'                    <div class="hint">مثال: 500mb, 5GB, 1T, 1PT</div>\n' +
'                </div>\n' +
'                <div class="form-group">\n' +
'                    <label>📊 محدودیت حجم روزانه:</label>\n' +
'                    <input type="text" id="userDayLimit" placeholder="1GB, 500mb" value="1GB">\n' +
'                    <div class="hint">مثال: 500mb, 1GB</div>\n' +
'                </div>\n' +
'            </div>\n' +
'            <div class="form-row">\n' +
'                <div class="form-group">\n' +
'                    <label>⏳ مدت زمان:</label>\n' +
'                    <input type="text" id="userDuration" placeholder="30, 1M, 1y" value="30">\n' +
'                    <div class="hint">مثال: 1 (روز), 1M (ماه), 1y (سال)</div>\n' +
'                </div>\n' +
'                <div class="form-group" style="border: 2px solid #ff6b00; border-radius: 10px; padding: 10px; background: #0d0d0d;">\n' +
'                    <label style="color: #ff8c00;">🌍 IP اختصاصی (اختیاری):</label>\n' +
'                    <input type="text" id="userIp" placeholder="188.114.98.82 یا خالی برای خودکار" style="border-color: #ff8c00;">\n' +
'                    <div class="hint">خالی = خودکار | IP اختصاصی = کانفیگ روی این IP ساخته میشه</div>\n' +
'                </div>\n' +
'            </div>\n' +
'            <div class="form-row">\n' +
'                <div class="form-group">\n' +
'                    <label>📡 اپراتور:</label>\n' +
'                    <select id="userOperator">\n' +
'                        <option value="irancel">ایرانسل</option>\n' +
'                        <option value="hamraheAval">همراه اول</option>\n' +
'                        <option value="rightel">رایتل</option>\n' +
'                    </select>\n' +
'                </div>\n' +
'                <div class="form-group">\n' +
'                    <label>🔌 پورت:</label>\n' +
'                    <select id="userPort">\n' +
'                        <option value="443">۴۴۳ (پیش‌فرض)</option>\n' +
'                        <option value="8443">۸۴۴۳</option>\n' +
'                        <option value="2083">۲۰۸۳</option>\n' +
'                        <option value="2087">۲۰۸۷</option>\n' +
'                        <option value="2096">۲۰۹۶</option>\n' +
'                        <option value="2053">۲۰۵۳</option>\n' +
'                    </select>\n' +
'                </div>\n' +
'            </div>\n' +
'            <button type="submit" class="btn-primary">➕ افزودن کاربر</button>\n' +
'        </form>\n' +
'        <div id="addUserResult" style="margin-top: 10px;"></div>\n' +
'        <h2 style="margin-top:30px;">✏️ ویرایش کاربر</h2>\n' +
'        <div id="editUserForm" style="display:none;">\n' +
'            <div class="form-row">\n' +
'                <div class="form-group">\n' +
'                    <label>👤 نام کاربر:</label>\n' +
'                    <input type="text" id="editUserName">\n' +
'                </div>\n' +
'                <div class="form-group">\n' +
'                    <label>📦 محدودیت حجم کل:</label>\n' +
'                    <input type="text" id="editUserLimit" placeholder="5GB, 1T, 500mb">\n' +
'                </div>\n' +
'            </div>\n' +
'            <div class="form-row">\n' +
'                <div class="form-group">\n' +
'                    <label>📊 محدودیت حجم روزانه:</label>\n' +
'                    <input type="text" id="editUserDayLimit" placeholder="1GB, 500mb">\n' +
'                </div>\n' +
'                <div class="form-group">\n' +
'                    <label>⏳ مدت زمان:</label>\n' +
'                    <input type="text" id="editUserDuration" placeholder="30, 1M, 1y">\n' +
'                </div>\n' +
'            </div>\n' +
'            <div class="form-row">\n' +
'                <div class="form-group">\n' +
'                    <label>🌍 IP اختصاصی:</label>\n' +
'                    <input type="text" id="editUserIp" placeholder="188.114.98.82 یا خالی برای خودکار">\n' +
'                </div>\n' +
'                <div class="form-group">\n' +
'                    <label>📡 اپراتور:</label>\n' +
'                    <select id="editUserOperator">\n' +
'                        <option value="irancel">ایرانسل</option>\n' +
'                        <option value="hamraheAval">همراه اول</option>\n' +
'                        <option value="rightel">رایتل</option>\n' +
'                    </select>\n' +
'                </div>\n' +
'            </div>\n' +
'            <div class="form-group">\n' +
'                <label>🔌 پورت:</label>\n' +
'                <select id="editUserPort">\n' +
'                    <option value="443">۴۴۳</option>\n' +
'                    <option value="8443">۸۴۴۳</option>\n' +
'                    <option value="2083">۲۰۸۳</option>\n' +
'                    <option value="2087">۲۰۸۷</option>\n' +
'                    <option value="2096">۲۰۹۶</option>\n' +
'                    <option value="2053">۲۰۵۳</option>\n' +
'                </select>\n' +
'            </div>\n' +
'            <input type="hidden" id="editUserId">\n' +
'            <button class="btn-primary" onclick="saveEditUser()">💾 ذخیره تغییرات</button>\n' +
'            <button class="btn-danger" onclick="cancelEditUser()">❌ انصراف</button>\n' +
'        </div>\n' +
'    </div>\n' +
'    <div id="tab-scanner" class="tab-content">\n' +
'        <h2>📡 اسکنر IP تمیز</h2>\n' +
'        <div class="status-box">\n' +
'            <p>🔍 IP های تست شده و سالم را پیدا کنید</p>\n' +
'        </div>\n' +
'        <div class="form-row">\n' +
'            <div class="form-group">\n' +
'                <label>📡 اپراتور:</label>\n' +
'                <select id="scanOperator">\n' +
'                    <option value="irancel">ایرانسل</option>\n' +
'                    <option value="hamraheAval">همراه اول</option>\n' +
'                    <option value="rightel">رایتل</option>\n' +
'                    <option value="all">همه</option>\n' +
'                </select>\n' +
'            </div>\n' +
'            <div class="form-group">\n' +
'                <label>🔢 تعداد اسکن:</label>\n' +
'                <input type="number" id="scanCount" value="10" min="1" max="50">\n' +
'            </div>\n' +
'        </div>\n' +
'        <button class="btn-primary" onclick="startScan()">🔍 شروع اسکن</button>\n' +
'        <div id="scanResult" style="margin-top: 15px;"></div>\n' +
'        <div id="scanResults" class="scanner-result"></div>\n' +
'        <h3 style="margin-top:20px;">📋 IP های تست شده قبلی</h3>\n' +
'        <div id="testedIps" style="background:#0d0d0d;border-radius:8px;padding:15px;border:1px solid #333;max-height:300px;overflow-y:auto;"></div>\n' +
'    </div>\n' +
'    <div id="tab-settings" class="tab-content">\n' +
'        <h2>⚙️ تنظیمات عمومی</h2>\n' +
'        <div class="form-row">\n' +
'            <div class="form-group">\n' +
'                <label>🧩 Fragment Size:</label>\n' +
'                <input type="text" id="fragmentSize" placeholder="200-500" value="' + (settings.fragment && settings.fragment.size ? settings.fragment.size : '200-500') + '">\n' +
'            </div>\n' +
'            <div class="form-group">\n' +
'                <label>🧩 Fragment Count:</label>\n' +
'                <input type="text" id="fragmentCount" placeholder="5-10" value="' + (settings.fragment && settings.fragment.count ? settings.fragment.count : '5-10') + '">\n' +
'            </div>\n' +
'        </div>\n' +
'        <div class="form-row">\n' +
'            <div class="form-group">\n' +
'                <label>🧩 Fragment Delay:</label>\n' +
'                <input type="text" id="fragmentDelay" placeholder="10-30" value="' + (settings.fragment && settings.fragment.delay ? settings.fragment.delay : '10-30') + '">\n' +
'            </div>\n' +
'            <div class="form-group">\n' +
'                <label>🖥️ Fingerprint:</label>\n' +
'                <select id="fingerprint">\n' +
'                    <option value="chrome"' + (settings.fingerprint === 'chrome' ? ' selected' : '') + '>Chrome</option>\n' +
'                    <option value="firefox"' + (settings.fingerprint === 'firefox' ? ' selected' : '') + '>Firefox</option>\n' +
'                    <option value="safari"' + (settings.fingerprint === 'safari' ? ' selected' : '') + '>Safari</option>\n' +
'                    <option value="random"' + (settings.fingerprint === 'random' ? ' selected' : '') + '>Random</option>\n' +
'                </select>\n' +
'            </div>\n' +
'        </div>\n' +
'        <div class="form-row">\n' +
'            <div class="form-group">\n' +
'                <label>🛡️ WARP:</label>\n' +
'                <select id="warpMode">\n' +
'                    <option value="off"' + (settings.warp === 'off' ? ' selected' : '') + '>خاموش</option>\n' +
'                    <option value="on"' + (settings.warp === 'on' ? ' selected' : '') + '>روشن</option>\n' +
'                    <option value="pro"' + (settings.warp === 'pro' ? ' selected' : '') + '>WARP Pro</option>\n' +
'                </select>\n' +
'            </div>\n' +
'            <div class="form-group">\n' +
'                <label>🔒 ECH:</label>\n' +
'                <select id="echMode">\n' +
'                    <option value="off"' + (settings.ech === 'off' ? ' selected' : '') + '>خاموش</option>\n' +
'                    <option value="on"' + (settings.ech === 'on' ? ' selected' : '') + '>روشن</option>\n' +
'                </select>\n' +
'            </div>\n' +
'        </div>\n' +
'        <div class="form-row">\n' +
'            <div class="form-group">\n' +
'                <label>🔑 تغییر UUID کل سیستم:</label>\n' +
'                <input type="text" id="systemUuid" placeholder="خالی برای خودکار">\n' +
'                <div class="hint">خالی = خودکار | وارد کنید = تنظیم دستی</div>\n' +
'            </div>\n' +
'            <div class="form-group">\n' +
'                <label>🔐 تغییر رمز ادمین:</label>\n' +
'                <input type="password" id="newAdminPass" placeholder="رمز جدید">\n' +
'                <div class="hint">خالی = بدون تغییر</div>\n' +
'            </div>\n' +
'        </div>\n' +
'        <button class="btn-primary" onclick="saveSettings()">💾 ذخیره تنظیمات</button>\n' +
'        <div id="settingsResult" style="margin-top: 10px;"></div>\n' +
'    </div>\n' +
'    <div id="tab-subscription" class="tab-content">\n' +
'        <h2>📋 سابسکریپشن</h2>\n' +
'        <div class="status-box">\n' +
'            <p>لینک سابسکریپشن مخصوص هر کاربر</p>\n' +
'        </div>\n' +
'        <div class="form-group">\n' +
'            <label>🆔 UUID کاربر:</label>\n' +
'            <input type="text" id="subUuid" placeholder="UUID کاربر را وارد کنید">\n' +
'        </div>\n' +
'        <button class="btn-primary" onclick="getSubscription()">📋 دریافت سابسکریپشن</button>\n' +
'        <div id="subResult" style="margin-top:15px;"></div>\n' +
'    </div>\n' +
'    <div id="tab-backup" class="tab-content">\n' +
'        <h2>💾 بکاپ و مدیریت</h2>\n' +
'        <div class="status-box">\n' +
'            <p>گرفتن بکاپ از تنظیمات و کاربران</p>\n' +
'        </div>\n' +
'        <button class="btn-primary" onclick="createBackup()">💾 گرفتن بکاپ</button>\n' +
'        <button class="btn-danger" onclick="resetAll()">⚠️ ریست کامل سیستم</button>\n' +
'        <div id="backupResult" style="margin-top:15px;"></div>\n' +
'    </div>\n' +
'    <div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>\n' +
'    <div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>\n' +
'</div>\n' +
'<div class="modal" id="configModal">\n' +
'    <div class="modal-content">\n' +
'        <span class="modal-close" onclick="closeModal()">✕</span>\n' +
'        <h2>📋 کانفیگ کاربر</h2>\n' +
'        <div id="configContent"></div>\n' +
'    </div>\n' +
'</div>\n' +
'<script>\n' +
'var editingUserId = null;\n' +
'function switchTab(tab) {\n' +
'    var tabs = document.querySelectorAll(\'.tab\');\n' +
'    for (var i = 0; i < tabs.length; i++) { tabs[i].classList.remove(\'active\'); }\n' +
'    var contents = document.querySelectorAll(\'.tab-content\');\n' +
'    for (var j = 0; j < contents.length; j++) { contents[j].classList.remove(\'active\'); }\n' +
'    document.getElementById(\'tab-\' + tab).classList.add(\'active\');\n' +
'    var tabNames = [\'dashboard\', \'users\', \'scanner\', \'settings\', \'subscription\', \'backup\'];\n' +
'    var tabLabels = [\'داشبورد\', \'کاربران\', \'اسکنر\', \'تنظیمات\', \'سابسکریپشن\', \'بکاپ\'];\n' +
'    for (var k = 0; k < tabNames.length; k++) {\n' +
'        if (tabNames[k] === tab) {\n' +
'            var allTabs = document.querySelectorAll(\'.tab\');\n' +
'            for (var l = 0; l < allTabs.length; l++) {\n' +
'                if (allTabs[l].textContent.includes(tabLabels[k])) {\n' +
'                    allTabs[l].classList.add(\'active\');\n' +
'                }\n' +
'            }\n' +
'        }\n' +
'    }\n' +
'}\n' +
'function copyText(text) {\n' +
'    navigator.clipboard.writeText(text);\n' +
'    alert(\'✅ کپی شد!\');\n' +
'}\n' +
'async function addUser(e) {\n' +
'    e.preventDefault();\n' +
'    var data = {\n' +
'        name: document.getElementById(\'userName\').value,\n' +
'        uuid: document.getElementById(\'userUuid\').value || null,\n' +
'        limit: document.getElementById(\'userLimit\').value,\n' +
'        dayLimit: document.getElementById(\'userDayLimit\').value,\n' +
'        duration: document.getElementById(\'userDuration\').value,\n' +
'        ip: document.getElementById(\'userIp\').value || null,\n' +
'        operator: document.getElementById(\'userOperator\').value,\n' +
'        port: parseInt(document.getElementById(\'userPort\').value)\n' +
'    };\n' +
'    var res = await fetch(\'/api/users/add\', {\n' +
'        method: \'POST\',\n' +
'        headers: { \'Content-Type\': \'application/json\' },\n' +
'        body: JSON.stringify(data)\n' +
'    });\n' +
'    var result = await res.json();\n' +
'    var el = document.getElementById(\'addUserResult\');\n' +
'    if (result.success) {\n' +
'        el.innerHTML = \'<div style="color:#4caf50;padding:10px;">✅ \' + result.message + \'</div>\';\n' +
'        setTimeout(function() { location.reload(); }, 1500);\n' +
'    } else {\n' +
'        el.innerHTML = \'<div style="color:#f44336;padding:10px;">❌ \' + result.error + \'</div>\';\n' +
'    }\n' +
'}\n' +
'async function editUser(id) {\n' +
'    editingUserId = id;\n' +
'    var res = await fetch(\'/api/users\');\n' +
'    var data = await res.json();\n' +
'    var user = null;\n' +
'    for (var i = 0; i < data.users.length; i++) {\n' +
'        if (data.users[i].id === id) { user = data.users[i]; break; }\n' +
'    }\n' +
'    if (!user) return;\n' +
'    document.getElementById(\'editUserId\').value = id;\n' +
'    document.getElementById(\'editUserName\').value = user.name || \'\';\n' +
'    document.getElementById(\'editUserLimit\').value = user.limit === Infinity ? \'unlimited\' : formatVolume(user.limit);\n' +
'    document.getElementById(\'editUserDayLimit\').value = user.dayLimit === Infinity ? \'unlimited\' : formatVolume(user.dayLimit);\n' +
'    document.getElementById(\'editUserDuration\').value = user.expiry === Infinity ? \'unlimited\' : formatDuration(user.expiry);\n' +
'    document.getElementById(\'editUserIp\').value = user.customIp || \'\';\n' +
'    document.getElementById(\'editUserOperator\').value = user.operator || \'irancel\';\n' +
'    document.getElementById(\'editUserPort\').value = user.port || 443;\n' +
'    document.getElementById(\'editUserForm\').style.display = \'block\';\n' +
'    document.getElementById(\'editUserForm\').scrollIntoView({ behavior: \'smooth\' });\n' +
'}\n' +
'function cancelEditUser() {\n' +
'    document.getElementById(\'editUserForm\').style.display = \'none\';\n' +
'    editingUserId = null;\n' +
'}\n' +
'async function saveEditUser() {\n' +
'    var id = document.getElementById(\'editUserId\').value;\n' +
'    var data = {\n' +
'        name: document.getElementById(\'editUserName\').value,\n' +
'        limit: document.getElementById(\'editUserLimit\').value,\n' +
'        dayLimit: document.getElementById(\'editUserDayLimit\').value,\n' +
'        duration: document.getElementById(\'editUserDuration\').value,\n' +
'        ip: document.getElementById(\'editUserIp\').value || null,\n' +
'        operator: document.getElementById(\'editUserOperator\').value,\n' +
'        port: parseInt(document.getElementById(\'editUserPort\').value)\n' +
'    };\n' +
'    var res = await fetch(\'/api/users/edit/\' + id, {\n' +
'        method: \'POST\',\n' +
'        headers: { \'Content-Type\': \'application/json\' },\n' +
'        body: JSON.stringify(data)\n' +
'    });\n' +
'    var result = await res.json();\n' +
'    if (result.success) {\n' +
'        alert(\'✅ کاربر ویرایش شد!\');\n' +
'        location.reload();\n' +
'    } else {\n' +
'        alert(\'❌ خطا: \' + result.error);\n' +
'    }\n' +
'}\n' +
'async function deleteUser(id) {\n' +
'    if (!confirm(\'آیا از حذف این کاربر مطمئن هستید؟\')) return;\n' +
'    var res = await fetch(\'/api/users/delete/\' + id, { method: \'DELETE\' });\n' +
'    var result = await res.json();\n' +
'    if (result.success) {\n' +
'        alert(\'✅ کاربر حذف شد!\');\n' +
'        location.reload();\n' +
'    } else {\n' +
'        alert(\'❌ خطا: \' + result.error);\n' +
'    }\n' +
'}\n' +
'async function toggleUser(id) {\n' +
'    var res = await fetch(\'/api/users/toggle/\' + id, { method: \'POST\' });\n' +
'    var result = await res.json();\n' +
'    if (result.success) {\n' +
'        alert(\'✅ وضعیت کاربر تغییر کرد!\');\n' +
'        location.reload();\n' +
'    } else {\n' +
'        alert(\'❌ خطا: \' + result.error);\n' +
'    }\n' +
'}\n' +
'async function resetUsage(id) {\n' +
'    if (!confirm(\'آیا از ریست کردن مصرف این کاربر مطمئن هستید؟\')) return;\n' +
'    var res = await fetch(\'/api/users/reset/\' + id, { method: \'POST\' });\n' +
'    var result = await res.json();\n' +
'    if (result.success) {\n' +
'        alert(\'✅ مصرف کاربر ریست شد!\');\n' +
'        location.reload();\n' +
'    } else {\n' +
'        alert(\'❌ خطا: \' + result.error);\n' +
'    }\n' +
'}\n' +
'async function showConfig(id) {\n' +
'    var res = await fetch(\'/api/users/config/\' + id);\n' +
'    var data = await res.json();\n' +
'    if (data.error) {\n' +
'        alert(\'❌ \' + data.error);\n' +
'        return;\n' +
'    }\n' +
'    document.getElementById(\'configContent\').innerHTML = \n' +
'        \'<h3>VLESS</h3>\' +\n' +
'        \'<div class="config-box">\' + data.vless + \'</div>\' +\n' +
'        \'<h3>Trojan</h3>\' +\n' +
'        \'<div class="config-box">\' + data.trojan + \'</div>\' +\n' +
'        \'<h3>Shadowsocks</h3>\' +\n' +
'        \'<div class="config-box">\' + data.shadowsocks + \'</div>\' +\n' +
'        \'<button class="btn-primary" onclick="copyText(\\\'\' + data.vless + \'\\n\' + data.trojan + \'\\n\' + data.shadowsocks + \'\\\')">📋 کپی همه</button>\';\n' +
'    document.getElementById(\'configModal\').style.display = \'flex\';\n' +
'}\n' +
'function closeModal() {\n' +
'    document.getElementById(\'configModal\').style.display = \'none\';\n' +
'}\n' +
'async function startScan() {\n' +
'    var operator = document.getElementById(\'scanOperator\').value;\n' +
'    var count = document.getElementById(\'scanCount\').value || 10;\n' +
'    document.getElementById(\'scanResult\').innerHTML = \'<div style="color:#ff8c00;">⏳ در حال اسکن...</div>\';\n' +
'    document.getElementById(\'scanResults\').innerHTML = \'\';\n' +
'    var res = await fetch(\'/api/scan?type=\' + operator + \'&count=\' + count);\n' +
'    var data = await res.json();\n' +
'    if (data.results) {\n' +
'        var html = \'\';\n' +
'        for (var i = 0; i < data.results.length; i++) {\n' +
'            var r = data.results[i];\n' +
'            var statusClass = r.status === \'alive\' ? \'alive\' : \'dead\';\n' +
'            var statusText = r.status === \'alive\' ? \'✅ سالم\' : \'❌ مرده\';\n' +
'            html += \'<div class="scanner-item">\' +\n' +
'                \'<div class="ip">\' + r.ip + \'</div>\' +\n' +
'                \'<div class="status \' + statusClass + \'">\' + statusText + \'</div>\' +\n' +
'                \'<div class="ping">\' + (r.ping > 0 ? r.ping + \'ms\' : \'—\') + \'</div>\' +\n' +
'                \'<div style="font-size:11px;color:#666;">کد: \' + (r.code || \'—\') + \'</div>\' +\n' +
'            \'</div>\';\n' +
'        }\n' +
'        document.getElementById(\'scanResults\').innerHTML = html;\n' +
'        document.getElementById(\'scanResult\').innerHTML = \'<div style="color:#4caf50;">✅ اسکن کامل شد (\' + data.scanned + \' IP)</div>\';\n' +
'        localStorage.setItem(\'testedIps\', JSON.stringify(data.results));\n' +
'        loadTestedIps();\n' +
'    } else {\n' +
'        document.getElementById(\'scanResult\').innerHTML = \'<div style="color:#f44336;">❌ خطا در اسکن</div>\';\n' +
'    }\n' +
'}\n' +
'function loadTestedIps() {\n' +
'    var data = JSON.parse(localStorage.getItem(\'testedIps\') || \'[]\');\n' +
'    var html = \'\';\n' +
'    var limit = Math.min(data.length, 50);\n' +
'    for (var i = 0; i < limit; i++) {\n' +
'        var r = data[i];\n' +
'        var statusClass = r.status === \'alive\' ? \'alive\' : \'dead\';\n' +
'        var statusText = r.status === \'alive\' ? \'✅\' : \'❌\';\n' +
'        html += \'<div style="display:flex;justify-content:space-between;padding:5px;border-bottom:1px solid #222;">\' +\n' +
'            \'<span style="color:#ff8c00;">\' + r.ip + \'</span>\' +\n' +
'            \'<span class="status \' + statusClass + \'">\' + statusText + (r.ping > 0 ? \' \' + r.ping + \'ms\' : \'\') + \'</span>\' +\n' +
'        \'</div>\';\n' +
'    }\n' +
'    document.getElementById(\'testedIps\').innerHTML = html || \'هنوز IP ای تست نشده است\';\n' +
'}\n' +
'async function saveSettings() {\n' +
'    var data = {\n' +
'        fragment: {\n' +
'            size: document.getElementById(\'fragmentSize\').value,\n' +
'            count: document.getElementById(\'fragmentCount\').value,\n' +
'            delay: document.getElementById(\'fragmentDelay\').value\n' +
'        },\n' +
'        fingerprint: document.getElementById(\'fingerprint\').value,\n' +
'        warp: document.getElementById(\'warpMode\').value,\n' +
'        ech: document.getElementById(\'echMode\').value,\n' +
'        systemUuid: document.getElementById(\'systemUuid\').value || null,\n' +
'        newAdminPass: document.getElementById(\'newAdminPass\').value || null\n' +
'    };\n' +
'    var res = await fetch(\'/api/settings\', {\n' +
'        method: \'POST\',\n' +
'        headers: { \'Content-Type\': \'application/json\' },\n' +
'        body: JSON.stringify(data)\n' +
'    });\n' +
'    var result = await res.json();\n' +
'    var el = document.getElementById(\'settingsResult\');\n' +
'    if (result.success) {\n' +
'        el.innerHTML = \'<div style="color:#4caf50;padding:10px;">✅ \' + result.message + \'</div>\';\n' +
'    } else {\n' +
'        el.innerHTML = \'<div style="color:#f44336;padding:10px;">❌ \' + result.error + \'</div>\';\n' +
'    }\n' +
'}\n' +
'async function getSubscription() {\n' +
'    var uuid = document.getElementById(\'subUuid\').value.trim();\n' +
'    if (!uuid) { alert(\'لطفاً UUID را وارد کنید\'); return; }\n' +
'    var res = await fetch(\'/api/sub/\' + uuid);\n' +
'    var data = await res.json();\n' +
'    if (data.error) {\n' +
'        document.getElementById(\'subResult\').innerHTML = \'<div style="color:#f44336;padding:10px;">❌ \' + data.error + \'</div>\';\n' +
'        return;\n' +
'    }\n' +
'    document.getElementById(\'subResult\').innerHTML = \n' +
'        \'<div style="background:#0d0d0d;border-radius:8px;padding:15px;border:1px solid #333;">\' +\n' +
'            \'<p><strong>📋 لینک سابسکریپشن:</strong></p>\' +\n' +
'            \'<div class="config-box">\' + data.url + \'</div>\' +\n' +
'            \'<p style="margin-top:10px;"><strong>📊 کانفیگ‌ها:</strong></p>\' +\n' +
'            \'<div class="config-box">\' + data.raw + \'</div>\' +\n' +
'            \'<button class="btn-primary" onclick="copyText(\\\'\' + data.url + \'\\\')">📋 کپی لینک</button>\' +\n' +
'            \'<button class="btn-primary" onclick="copyText(\\\'\' + data.raw + \'\\\')">📋 کپی کانفیگ‌ها</button>\' +\n' +
'        \'</div>\';\n' +
'}\n' +
'async function createBackup() {\n' +
'    var res = await fetch(\'/api/backup\');\n' +
'    var data = await res.json();\n' +
'    if (data.error) {\n' +
'        document.getElementById(\'backupResult\').innerHTML = \'<div style="color:#f44336;padding:10px;">❌ \' + data.error + \'</div>\';\n' +
'        return;\n' +
'    }\n' +
'    var blob = new Blob([JSON.stringify(data, null, 2)], { type: \'application/json\' });\n' +
'    var url = URL.createObjectURL(blob);\n' +
'    var a = document.createElement(\'a\');\n' +
'    a.href = url;\n' +
'    a.download = \'taakaa-backup-\' + new Date().toISOString().slice(0,10) + \'.json\';\n' +
'    a.click();\n' +
'    document.getElementById(\'backupResult\').innerHTML = \'<div style="color:#4caf50;padding:10px;">✅ بکاپ گرفته شد</div>\';\n' +
'}\n' +
'async function resetAll() {\n' +
'    if (!confirm(\'⚠️ آیا از ریست کامل سیستم مطمئن هستید؟ این کار همه کاربران و تنظیمات را حذف می‌کند!\')) return;\n' +
'    if (!confirm(\'تأیید نهایی: همه داده‌ها پاک می‌شوند!\')) return;\n' +
'    var res = await fetch(\'/api/reset\', { method: \'DELETE\' });\n' +
'    var result = await res.json();\n' +
'    if (result.success) {\n' +
'        alert(\'✅ سیستم ریست شد! صفحه reload می‌شود...\');\n' +
'        location.reload();\n' +
'    } else {\n' +
'        alert(\'❌ خطا: \' + result.error);\n' +
'    }\n' +
'}\n' +
'loadTestedIps();\n' +
'document.getElementById(\'configModal\').addEventListener(\'click\', function(e) {\n' +
'    if (e.target === this) closeModal();\n' +
'});\n' +
'</script>\n' +
'</body>\n' +
'</html>';
    }
// ============================================================
// TAAKAA-XI WORKER v2.0.0 - PART 3/3 (FINAL)
// ============================================================

// ============================================================
// API HANDLERS
// ============================================================

async function handleApi(request, env) {
    var url = new URL(request.url);
    var path = url.pathname;

    // === ADD USER ===
    if (path.includes('/users/add') && request.method === 'POST') {
        try {
            var body = await request.json();
            if (!env.KV) {
                return new Response(JSON.stringify({ error: 'KV storage not configured' }), { status: 500 });
            }
            var usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            var data = JSON.parse(usersData);
            
            var uuid = (body.uuid && isValidUUID(body.uuid)) ? body.uuid : generateUUID();
            var newUser = {
                id: uuid,
                name: body.name || 'کاربر',
                uuid: uuid,
                customIp: body.ip || null,
                operator: body.operator || 'irancel',
                port: body.port || 443,
                limit: parseVolume(body.limit),
                dayLimit: parseVolume(body.dayLimit),
                expiry: parseDuration(body.duration),
                disabled: false,
                createdAt: Date.now()
            };
            data.users.push(newUser);
            await env.KV.put('taakaa_users', JSON.stringify(data));
            await env.KV.put('usage_' + uuid, JSON.stringify({ up: 0, down: 0, total: 0 }));
            return new Response(JSON.stringify({ success: true, message: 'کاربر با موفقیت اضافه شد', user: newUser }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ success: false, error: e.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // === EDIT USER ===
    if (path.includes('/users/edit/') && request.method === 'POST') {
        try {
            var id = path.split('/').pop();
            var body = await request.json();
            if (!env.KV) {
                return new Response(JSON.stringify({ error: 'KV storage not configured' }), { status: 500 });
            }
            var usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            var data = JSON.parse(usersData);
            var index = -1;
            for (var i = 0; i < data.users.length; i++) {
                if (data.users[i].id === id) { index = i; break; }
            }
            if (index === -1) {
                return new Response(JSON.stringify({ success: false, error: 'کاربر یافت نشد' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            data.users[index].name = body.name || data.users[index].name;
            data.users[index].customIp = body.ip || null;
            data.users[index].operator = body.operator || data.users[index].operator;
            data.users[index].port = body.port || data.users[index].port;
            data.users[index].limit = parseVolume(body.limit);
            data.users[index].dayLimit = parseVolume(body.dayLimit);
            data.users[index].expiry = parseDuration(body.duration);
            await env.KV.put('taakaa_users', JSON.stringify(data));
            return new Response(JSON.stringify({ success: true, message: 'کاربر ویرایش شد' }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ success: false, error: e.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // === DELETE USER ===
    if (path.includes('/users/delete/') && request.method === 'DELETE') {
        try {
            var id = path.split('/').pop();
            if (!env.KV) {
                return new Response(JSON.stringify({ error: 'KV storage not configured' }), { status: 500 });
            }
            var usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            var data = JSON.parse(usersData);
            var newUsers = [];
            for (var j = 0; j < data.users.length; j++) {
                if (data.users[j].id !== id) { newUsers.push(data.users[j]); }
            }
            data.users = newUsers;
            await env.KV.put('taakaa_users', JSON.stringify(data));
            await env.KV.delete('usage_' + id);
            return new Response(JSON.stringify({ success: true, message: 'کاربر حذف شد' }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ success: false, error: e.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // === TOGGLE USER ===
    if (path.includes('/users/toggle/') && request.method === 'POST') {
        try {
            var id = path.split('/').pop();
            if (!env.KV) {
                return new Response(JSON.stringify({ error: 'KV storage not configured' }), { status: 500 });
            }
            var usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            var data = JSON.parse(usersData);
            var user = null;
            for (var k = 0; k < data.users.length; k++) {
                if (data.users[k].id === id) { user = data.users[k]; break; }
            }
            if (!user) {
                return new Response(JSON.stringify({ success: false, error: 'کاربر یافت نشد' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            user.disabled = !user.disabled;
            await env.KV.put('taakaa_users', JSON.stringify(data));
            return new Response(JSON.stringify({ success: true, message: 'وضعیت کاربر تغییر کرد' }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ success: false, error: e.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // === RESET USER USAGE ===
    if (path.includes('/users/reset/') && request.method === 'POST') {
        try {
            var id = path.split('/').pop();
            if (!env.KV) {
                return new Response(JSON.stringify({ error: 'KV storage not configured' }), { status: 500 });
            }
            await env.KV.put('usage_' + id, JSON.stringify({ up: 0, down: 0, total: 0 }));
            return new Response(JSON.stringify({ success: true, message: 'مصرف کاربر ریست شد' }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ success: false, error: e.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // === GET USER CONFIG ===
    if (path.includes('/users/config/')) {
        try {
            var id = path.split('/').pop();
            if (!env.KV) {
                return new Response(JSON.stringify({ error: 'KV storage not configured' }), { status: 500 });
            }
            var usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            var data = JSON.parse(usersData);
            var user = null;
            for (var l = 0; l < data.users.length; l++) {
                if (data.users[l].id === id) { user = data.users[l]; break; }
            }
            if (!user) {
                return new Response(JSON.stringify({ error: 'کاربر یافت نشد' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            var host = 'your-domain.com';
            var pathStr = '/';
            var sub = generateSubscription(user, host, pathStr);
            return new Response(JSON.stringify(sub), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // === GET USERS ===
    if (path.includes('/users')) {
        if (!env.KV) {
            return new Response(JSON.stringify({ error: 'KV storage not configured' }), { status: 500 });
        }
        var usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
        var data = JSON.parse(usersData);
        var usage = {};
        for (var m = 0; m < data.users.length; m++) {
            var u = data.users[m];
            var usageData = await env.KV.get('usage_' + u.id) || '{"total":0}';
            usage[u.id] = JSON.parse(usageData).total || 0;
        }
        return new Response(JSON.stringify({ users: data.users, usage: usage }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // === SCAN IP ===
    if (path.includes('/scan')) {
        var type = url.searchParams.get('type') || 'all';
        var count = parseInt(url.searchParams.get('count')) || 10;
        var ips = [];
        if (type === 'all') {
            for (var key in IP_POOLS) {
                if (IP_POOLS.hasOwnProperty(key)) {
                    ips = ips.concat(IP_POOLS[key]);
                }
            }
        } else {
            ips = IP_POOLS[type] || IP_POOLS.irancel;
        }
        var results = await scanIps(ips, count);
        return new Response(JSON.stringify({ results: results, scanned: results.length }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // === SETTINGS ===
    if (path.includes('/settings') && request.method === 'POST') {
        try {
            var body = await request.json();
            if (!env.KV) {
                return new Response(JSON.stringify({ error: 'KV storage not configured' }), { status: 500 });
            }
            var settings = await env.KV.get('taakaa_settings') || '{}';
            settings = JSON.parse(settings);
            
            if (body.fragment) {
                settings.fragment = body.fragment;
            }
            if (body.fingerprint) settings.fingerprint = body.fingerprint;
            if (body.warp) settings.warp = body.warp;
            if (body.ech) settings.ech = body.ech;
            
            if (body.systemUuid && isValidUUID(body.systemUuid)) {
                settings.systemUuid = body.systemUuid;
                await env.KV.put('taakaa_system_uuid', body.systemUuid);
            }
            
            if (body.newAdminPass && body.newAdminPass.length >= 6) {
                await env.KV.put('taakaa_admin_pass', body.newAdminPass);
                settings.adminPassUpdated = Date.now();
            }
            
            await env.KV.put('taakaa_settings', JSON.stringify(settings));
            return new Response(JSON.stringify({ success: true, message: 'تنظیمات ذخیره شد' }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ success: false, error: e.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // === GET SETTINGS ===
    if (path.includes('/settings') && request.method === 'GET') {
        try {
            if (!env.KV) {
                return new Response(JSON.stringify({ error: 'KV storage not configured' }), { status: 500 });
            }
            var settings = await env.KV.get('taakaa_settings') || '{}';
            return new Response(settings, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // === SUBSCRIPTION ===
    if (path.includes('/sub/')) {
        try {
            var uuid = path.split('/').pop();
            if (!env.KV) {
                return new Response(JSON.stringify({ error: 'KV storage not configured' }), { status: 500 });
            }
            var usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            var data = JSON.parse(usersData);
            var user = null;
            for (var n = 0; n < data.users.length; n++) {
                if (data.users[n].id === uuid || data.users[n].uuid === uuid) {
                    user = data.users[n];
                    break;
                }
            }
            if (!user) {
                return new Response(JSON.stringify({ error: 'کاربر یافت نشد' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            var host = 'your-domain.com';
            var pathStr = '/';
            var sub = generateSubscription(user, host, pathStr);
            var urlLink = 'https://' + host + '/sub/' + user.uuid;
            return new Response(JSON.stringify({ vless: sub.vless, trojan: sub.trojan, shadowsocks: sub.shadowsocks, raw: sub.raw, url: urlLink }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // === BACKUP ===
    if (path.includes('/backup')) {
        try {
            if (!env.KV) {
                return new Response(JSON.stringify({ error: 'KV storage not configured' }), { status: 500 });
            }
            var usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            var settings = await env.KV.get('taakaa_settings') || '{}';
            var systemUuid = await env.KV.get('taakaa_system_uuid') || null;
            var backup = {
                version: VERSION,
                timestamp: Date.now(),
                users: JSON.parse(usersData),
                settings: JSON.parse(settings),
                systemUuid: systemUuid
            };
            return new Response(JSON.stringify(backup), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // === RESET ALL ===
    if (path.includes('/reset') && request.method === 'DELETE') {
        try {
            if (!env.KV) {
                return new Response(JSON.stringify({ error: 'KV storage not configured' }), { status: 500 });
            }
            await env.KV.delete('taakaa_users');
            await env.KV.delete('taakaa_settings');
            await env.KV.delete('taakaa_system_uuid');
            return new Response(JSON.stringify({ success: true, message: 'سیستم ریست شد' }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ success: false, error: e.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    return new Response(JSON.stringify({ error: 'مسیر نامعتبر' }), { status: 404 });
}

// ============================================================
// MAIN HANDLER (با پارامتر env)
// ============================================================

async function handleRequest(request, env) {
    try {
        var url = new URL(request.url);
        var path = url.pathname;
        var firstSegment = path.split('/').filter(Boolean)[0] || '';

        // === LOGOUT ===
        if (firstSegment === 'logout') {
            return new Response(null, {
                status: 302,
                headers: {
                    'Location': '/',
                    'Set-Cookie': 'session=; Max-Age=0; path=/'
                }
            });
        }

        // === API ===
        if (firstSegment === 'api') {
            return await handleApi(request, env);
        }

        // === CHECK SETUP ===
        var hasKV = !!(env.KV && typeof env.KV.get === 'function');
        var hasD1 = !!(env.DB && typeof env.DB.prepare === 'function');
        var hasAdmin = !!(env.ADMIN_PASS || env.ADMIN_PASSWORD || env.PASSWORD);

        // === WELCOME PAGE ===
        if (path === '/' || path === '') {
            return new Response(renderWelcomePage(hasKV, hasD1, hasAdmin), {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }

        // === PANEL ===
        if (firstSegment === 'panel') {
            if (!hasKV || !hasD1 || !hasAdmin) {
                return new Response(renderWelcomePage(hasKV, hasD1, hasAdmin), {
                    status: 200,
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            }
            var usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            var data = JSON.parse(usersData);
            var usage = {};
            for (var p = 0; p < data.users.length; p++) {
                var u = data.users[p];
                var usageData = await env.KV.get('usage_' + u.id) || '{"total":0}';
                usage[u.id] = JSON.parse(usageData).total || 0;
            }
            var settingsData = await env.KV.get('taakaa_settings') || '{}';
            var settings = JSON.parse(settingsData);
            return new Response(renderPanel(data.users, usage, settings), {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }

        // === PAGES ===
        if (firstSegment === 'owners') {
            return new Response(renderOwnersPage(), {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }
        if (firstSegment === 'fragment-info' || firstSegment === 'fragment') {
            return new Response(renderFragmentInfoPage(), {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }
        if (firstSegment === 'offline-support' || firstSegment === 'offline') {
            return new Response(renderOfflineSupportPage(), {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }
        if (firstSegment === 'select-location' || firstSegment === 'location') {
            return new Response(renderSelectLocationPage(), {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }

        // === VERSION ===
        if (firstSegment === 'version') {
            return new Response(JSON.stringify({
                version: VERSION,
                brand: BRAND,
                channel: CHANNEL,
                status: 'ok'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // === DEFAULT ===
        return new Response(JSON.stringify({
            status: 'ok',
            brand: BRAND,
            version: VERSION,
            channel: CHANNEL,
            message: 'Taakaa-Xi is running!'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response('Error: ' + (error && error.message || 'Unknown error'), {
            status: 500
        });
    }
}

// ============================================================
// PAGE RENDERERS - OTHER PAGES
// ============================================================

function renderOwnersPage() {
    return '<!DOCTYPE html>\n<html lang="fa" dir="rtl">\n<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n<title>👤 Owners - Taakaa-Xi</title>\n<style>\n*{margin:0;padding:0;box-sizing:border-box;font-family:Tahoma,sans-serif}\nbody{background:#0d0d0d;color:#ffa64d;padding:20px;min-height:100vh;display:flex;justify-content:center;align-items:center}\n.card{background:#1a1a1a;border:2px solid #ff6b00;border-radius:16px;padding:30px;max-width:500px;width:100%;box-shadow:0 0 30px rgba(255,107,0,0.2)}\nh1{color:#ff8c00;text-align:center;margin-bottom:5px;font-size:28px}\n.subtitle{text-align:center;color:#ffa64d;font-size:13px;margin-bottom:20px}\n.owner{background:#0d0d0d;border:1px solid #ff6b00;border-radius:10px;padding:15px;margin:10px 0;display:flex;align-items:center;gap:12px}\n.owner .avatar{width:48px;height:48px;border-radius:50%;background:#ff6b00;display:flex;align-items:center;justify-content:center;font-size:20px;color:#0d0d0d;font-weight:bold}\n.owner .info{flex:1}\n.owner .name{color:#fff;font-size:16px;font-weight:bold}\n.owner .role{color:#ffa64d;font-size:13px}\n.owner .contact{color:#ff8c00;font-size:14px}\n.channel{text-align:center;margin-top:10px;padding:10px;background:#0d0d0d;border-radius:8px;border:1px solid #ff6b00}\n.channel a{color:#ff8c00;text-decoration:none;font-weight:bold}\n.footer{text-align:center;margin-top:20px;color:#666;font-size:12px}\n</style>\n</head>\n<body>\n<div class="card">\n<h1>👤 پشتیبان‌ها</h1>\n<div class="subtitle">the new generation of Free config</div>\n<div class="owner"><div class="avatar">A</div><div class="info"><div class="name">Admin</div><div class="role">مدیر اصلی</div><div class="contact">@TaakaaXi_Admin</div></div></div>\n<div class="owner"><div class="avatar">S</div><div class="info"><div class="name">Support</div><div class="role">پشتیبانی فنی</div><div class="contact">@TaakaaXi_Support</div></div></div>\n<div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>\n<div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>\n</div>\n</body>\n</html>';
}

function renderFragmentInfoPage() {
    return '<!DOCTYPE html>\n<html lang="fa" dir="rtl">\n<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n<title>🧩 Fragment - Taakaa-Xi</title>\n<style>\n*{margin:0;padding:0;box-sizing:border-box;font-family:Tahoma,sans-serif}\nbody{background:#0d0d0d;color:#ffa64d;padding:20px;min-height:100vh;display:flex;justify-content:center;align-items:center}\n.card{background:#1a1a1a;border:2px solid #ff6b00;border-radius:16px;padding:30px;max-width:600px;width:100%;box-shadow:0 0 30px rgba(255,107,0,0.2)}\nh1{color:#ff8c00;text-align:center;margin-bottom:5px;font-size:28px}\n.subtitle{text-align:center;color:#ffa64d;font-size:13px;margin-bottom:20px}\n.info{background:#0d0d0d;border-radius:10px;padding:20px;margin:10px 0}\n.info p{margin:10px 0;line-height:1.8}\n.code{background:#0d0d0d;border:1px solid #ff6b00;border-radius:8px;padding:15px;font-family:monospace;color:#ffa64d;font-size:13px;overflow-x:auto;white-space:pre-wrap;word-break:break-all}\n.tag{display:inline-block;background:#ff6b00;color:#0d0d0d;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:bold}\n.channel{text-align:center;margin-top:10px;padding:10px;background:#0d0d0d;border-radius:8px;border:1px solid #ff6b00}\n.channel a{color:#ff8c00;text-decoration:none;font-weight:bold}\n.footer{text-align:center;margin-top:20px;color:#666;font-size:12px}\n</style>\n</head>\n<body>\n<div class="card">\n<h1>🧩 تکنیک Fragment</h1>\n<div class="subtitle">the new generation of Free config</div>\n<div class="info">\n<p><span class="tag">چیست؟</span> تکنیک Fragment یا تکه‌تکه‌سازی، بسته‌های داده را به قطعات کوچک تقسیم می‌کند تا سیستم‌های DPI نتوانند الگوی ترافیک را تشخیص دهند.</p>\n<p><span class="tag">چگونه کار می‌کند؟</span> داده‌های TLS/WS به قطعات ۱۰۰-۵۰۰ بایتی تقسیم شده و با تاخیرهای میکروثانیه‌ای ارسال می‌شوند.</p>\n<p><span class="tag">مزایا</span> ✅ عبور از فیلترینگ سنگین ✅ کاهش تشخیص DPI ✅ سازگاری با همه‌ی پروتکل‌ها</p>\n</div>\n<div class="code">{\n  "fragment": {\n    "size": "200-500",\n    "count": "5-10",\n    "delay": "10-30"\n  }\n}</div>\n<div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>\n<div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>\n</div>\n</body>\n</html>';
}

function renderOfflineSupportPage() {
    return '<!DOCTYPE html>\n<html lang="fa" dir="rtl">\n<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n<title>📞 پشتیبانی آفلاین - Taakaa-Xi</title>\n<style>\n*{margin:0;padding:0;box-sizing:border-box;font-family:Tahoma,sans-serif}\nbody{background:#0d0d0d;color:#ffa64d;padding:20px;min-height:100vh;display:flex;justify-content:center;align-items:center}\n.card{background:#1a1a1a;border:2px solid #ff6b00;border-radius:16px;padding:30px;max-width:500px;width:100%;box-shadow:0 0 30px rgba(255,107,0,0.2)}\nh1{color:#ff8c00;text-align:center;margin-bottom:5px;font-size:28px}\n.subtitle{text-align:center;color:#ffa64d;font-size:13px;margin-bottom:20px}\n.operator{background:#0d0d0d;border:1px solid #ff6b00;border-radius:10px;padding:15px;margin:10px 0}\n.operator .title{color:#ff8c00;font-weight:bold;font-size:16px}\n.operator .detail{color:#ffa64d;font-size:14px;margin-top:5px}\n.operator .guide{color:#999;font-size:13px;margin-top:8px;padding:8px;background:#1a1a1a;border-radius:6px}\n.channel{text-align:center;margin-top:10px;padding:10px;background:#0d0d0d;border-radius:8px;border:1px solid #ff6b00}\n.channel a{color:#ff8c00;text-decoration:none;font-weight:bold}\n.footer{text-align:center;margin-top:20px;color:#666;font-size:12px}\n</style>\n</head>\n<body>\n<div class="card">\n<h1>📞 پشتیبانی آفلاین</h1>\n<div class="subtitle">the new generation of Free config</div>\n<div class="operator"><div class="title">📱 همراه اول</div><div class="detail">تنظیمات DNS: 10.10.10.10</div><div class="guide">🔹 برای اتصال آفلاین، DNS را روی 10.10.10.10 تنظیم کنید</div></div>\n<div class="operator"><div class="title">📶 ایرانسل</div><div class="detail">تنظیمات DNS: 10.10.10.10</div><div class="guide">🔹 برای اتصال آفلاین، DNS را روی 10.10.10.10 تنظیم کنید</div></div>\n<div class="operator"><div class="title">📡 رایتل</div><div class="detail">تنظیمات DNS: 10.10.10.10</div><div class="guide">🔹 برای اتصال آفلاین، DNS را روی 10.10.10.10 تنظیم کنید</div></div>\n<div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>\n<div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>\n</div>\n</body>\n</html>';
}

function renderSelectLocationPage() {
    return '<!DOCTYPE html>\n<html lang="fa" dir="rtl">\n<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n<title>🌍 انتخاب لوکیشن - Taakaa-Xi</title>\n<style>\n*{margin:0;padding:0;box-sizing:border-box;font-family:Tahoma,sans-serif}\nbody{background:#0d0d0d;color:#ffa64d;padding:20px;min-height:100vh;display:flex;justify-content:center;align-items:center}\n.card{background:#1a1a1a;border:2px solid #ff6b00;border-radius:16px;padding:30px;max-width:400px;width:100%;box-shadow:0 0 30px rgba(255,107,0,0.2)}\nh1{color:#ff8c00;text-align:center;margin-bottom:5px;font-size:28px}\n.subtitle{text-align:center;color:#ffa64d;font-size:13px;margin-bottom:20px}\n.location{background:#0d0d0d;border:1px solid #ff6b00;border-radius:10px;padding:12px 15px;margin:8px 0;display:flex;align-items:center;gap:12px;cursor:pointer;transition:all 0.3s}\n.location:hover{background:#ff6b00;color:#0d0d0d}\n.location .flag{font-size:28px}\n.location .name{flex:1;font-size:16px}\n.location .ping{font-size:13px;color:#ffa64d}\n.channel{text-align:center;margin-top:10px;padding:10px;background:#0d0d0d;border-radius:8px;border:1px solid #ff6b00}\n.channel a{color:#ff8c00;text-decoration:none;font-weight:bold}\n.footer{text-align:center;margin-top:20px;color:#666;font-size:12px}\n</style>\n</head>\n<body>\n<div class="card">\n<h1>🌍 انتخاب سرور</h1>\n<div class="subtitle">the new generation of Free config</div>\n<div class="location" onclick="selectServer(\'DE\')"><span class="flag">🇩🇪</span><span class="name">آلمان (Frankfurt)</span><span class="ping">Ping: 85ms</span></div>\n<div class="location" onclick="selectServer(\'NL\')"><span class="flag">🇳🇱</span><span class="name">هلند (Amsterdam)</span><span class="ping">Ping: 92ms</span></div>\n<div class="location" onclick="selectServer(\'US\')"><span class="flag">🇺🇸</span><span class="name">آمریکا (New York)</span><span class="ping">Ping: 140ms</span></div>\n<div class="location" onclick="selectServer(\'SG\')"><span class="flag">🇸🇬</span><span class="name">سنگاپور</span><span class="ping">Ping: 110ms</span></div>\n<div class="location" onclick="selectServer(\'JP\')"><span class="flag">🇯🇵</span><span class="name">ژاپن (Tokyo)</span><span class="ping">Ping: 130ms</span></div>\n<div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>\n<div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>\n</div>\n<script>\nfunction selectServer(code) {\n    alert(\'سرور \' + code + \' انتخاب شد!\\nکانفیگ جدید ساخته می‌شود...\');\n    window.location.href = \'/?server=\' + code;\n}\n</script>\n</body>\n</html>';
}

// ============================================================
// REGISTER (با event.env)
// ============================================================

addEventListener('fetch', function(event) {
    event.respondWith(handleRequest(event.request, event.env));
});

// ============================================================
// END OF WORKER
// ============================================================
