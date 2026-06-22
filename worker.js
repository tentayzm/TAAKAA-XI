// ============================================================
// TAAKAA-XI WORKER v2.0.0 - PART 1/3
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
    if (!input || input === '' || input === '0' || input === 'unlimited' || input === '∞') {
        return Infinity;
    }
    const str = String(input).trim().toLowerCase();
    const num = parseFloat(str) || 0;
    if (str.endsWith('pt') || str.endsWith('pb')) return num * 1024 * 1024 * 1024 * 1024;
    if (str.endsWith('t') || str.endsWith('tb')) return num * 1024 * 1024;
    if (str.endsWith('g') || str.endsWith('gb')) return num * 1024;
    if (str.endsWith('m') || str.endsWith('mb')) return num;
    if (str.endsWith('k') || str.endsWith('kb')) return num / 1024;
    return num * 1024;
}

function parseDuration(input) {
    if (!input || input === '' || input === '0' || input === 'unlimited' || input === '∞') {
        return Infinity;
    }
    const str = String(input).trim().toLowerCase();
    const num = parseFloat(str) || 0;
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
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const hex = Array.from(b).map(x => x.toString(16).padStart(2, '0')).join('');
    return hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20);
}

function isValidUUID(str) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(str);
}

// ============================================================
// IP FUNCTIONS
// ============================================================

function getBestIp(operator = 'irancel') {
    const pool = IP_POOLS[operator] || IP_POOLS.irancel;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex].split(':')[0];
}

function getBestPort(operator = 'irancel') {
    const pool = IP_POOLS[operator] || IP_POOLS.irancel;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return parseInt(pool[randomIndex].split(':')[1]) || 443;
}

async function scanIp(ip) {
    try {
        const start = Date.now();
        const resp = await fetch('https://' + ip + '/', { 
            method: 'HEAD',
            signal: AbortSignal.timeout(3000)
        });
        const ping = Date.now() - start;
        return { ip, status: resp.ok ? 'alive' : 'dead', ping, code: resp.status };
    } catch (e) {
        return { ip, status: 'dead', ping: -1, code: 0 };
    }
}

async function scanIps(ips, limit = 10) {
    const results = [];
    const shuffled = [...ips].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, limit);
    for (const ip of selected) {
        const result = await scanIp(ip);
        results.push(result);
    }
    return results.sort((a, b) => {
        if (a.status === 'alive' && b.status !== 'alive') return -1;
        if (a.status !== 'alive' && b.status === 'alive') return 1;
        return a.ping - b.ping;
    });
}

// ============================================================
// CONFIG GENERATORS
// ============================================================

function generateVlessConfig(user, host, path) {
    const ip = user.customIp || getBestIp(user.operator || 'irancel');
    const port = user.port || getBestPort(user.operator || 'irancel');
    return {
        v: '2',
        ps: `${BRAND} - ${user.name}`,
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
    const ip = user.customIp || getBestIp(user.operator || 'irancel');
    const port = user.port || getBestPort(user.operator || 'irancel');
    return {
        name: `${BRAND} - ${user.name}`,
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
    const ip = user.customIp || getBestIp(user.operator || 'irancel');
    const port = user.port || getBestPort(user.operator || 'irancel');
    const method = 'aes-256-gcm';
    const password = user.uuid.slice(0, 16);
    return {
        server: ip,
        server_port: port,
        password: password,
        method: method,
        name: `${BRAND} - ${user.name} (SS)`
    };
}

// ============================================================
// SUBSCRIPTION GENERATOR
// ============================================================

function generateSubscription(user, host, path) {
    const vless = generateVlessConfig(user, host, path);
    const trojan = generateTrojanConfig(user, host, path);
    const ss = generateShadowsocksConfig(user);
    
    const vlessLink = `vless://${vless.id}@${vless.add}:${vless.port}?encryption=none&security=tls&sni=${vless.sni}&fp=${vless.fp}&type=ws&host=${vless.host}&path=${encodeURIComponent(vless.path)}#${encodeURIComponent(vless.ps)}`;
    
    const trojanLink = `trojan://${trojan.password}@${trojan.server}:${trojan.port}?sni=${trojan.sni}&fp=${trojan.fp}&type=ws&host=${host}&path=${encodeURIComponent(trojan['ws-opts'].path)}#${encodeURIComponent(trojan.name)}`;
    
    const ssLink = `ss://${btoa(ss.method + ':' + ss.password)}@${ss.server}:${ss.server_port}#${encodeURIComponent(ss.name)}`;
    
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
    const allOk = hasKV && hasD1 && hasAdmin;
    return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>خوش آمدید - Taakaa-Xi</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Tahoma, sans-serif; }
        body { background: #0d0d0d; color: #ffa64d; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 20px; }
        .loader-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0d0d0d; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 9999; transition: opacity 0.8s; }
        .loader { width: 60px; height: 60px; border: 4px solid #1a1a1a; border-top: 4px solid #ff6b00; border-radius: 50%; animation: spin 1s linear infinite; }
        .loader-text { margin-top: 20px; color: #ff8c00; font-size: 16px; }
        .loader-sub { margin-top: 10px; color: #666; font-size: 13px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .card { background: #1a1a1a; border: 2px solid #ff6b00; border-radius: 16px; padding: 40px; max-width: 700px; width: 100%; box-shadow: 0 0 40px rgba(255,107,0,0.15); }
        h1 { color: #ff8c00; text-align: center; font-size: 32px; margin-bottom: 10px; }
        .subtitle { text-align: center; color: #ffa64d; font-size: 14px; margin-bottom: 25px; }
        .check-item { display: flex; align-items: center; padding: 12px 15px; margin: 8px 0; background: #0d0d0d; border-radius: 10px; border: 1px solid #222; }
        .check-icon { font-size: 22px; margin-left: 12px; }
        .check-text { flex: 1; font-size: 14px; }
        .check-detail { font-size: 12px; color: #666; margin-top: 4px; }
        .check-status { font-weight: bold; font-size: 13px; }
        .check-status.ok { color: #4caf50; }
        .check-status.fail { color: #f44336; }
        .btn { display: inline-block; padding: 12px 30px; background: #ff6b00; color: #0d0d0d; border: none; border-radius: 10px; font-weight: bold; font-size: 16px; cursor: pointer; text-decoration: none; transition: all 0.3s; margin-top: 15px; }
        .btn:hover { background: #ff8c00; transform: scale(1.02); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .text-center { text-align: center; }
        .channel { text-align: center; margin-top: 15px; padding: 10px; background: #0d0d0d; border-radius: 8px; border: 1px solid #ff6b00; }
        .channel a { color: #ff8c00; text-decoration: none; font-weight: bold; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        .team { text-align: center; color: #ffa64d; font-size: 13px; margin: 10px 0; }
    </style>
</head>
<body>
<div class="loader-container" id="loader">
    <div class="loader"></div>
    <div class="loader-text">🔄 در حال آماده‌سازی...</div>
    <div class="loader-sub">${TEAM}</div>
</div>
<div class="card" id="mainContent" style="display:none;">
    <h1>🖐🏻🤓🖐🏻 TAAKAA-XI</h1>
    <div class="subtitle">the new generation of Free config</div>
    <div class="team">${TEAM}</div>
    <div style="background: #0d0d0d; border-radius: 10px; padding: 15px; margin: 15px 0; border: 1px solid #333; text-align: center; color: #ffa64d; font-size: 15px;">
        ✅ اگر این صفحه را می‌بینید، تمامی مراحل را درست انجام داده‌اید!
    </div>
    <div class="check-item">
        <span class="check-icon">${hasKV ? '✅' : '❌'}</span>
        <div class="check-text">
            <div>KV Storage</div>
            <div class="check-detail">${hasKV ? 'متصل است' : 'لطفاً KV را متصل کنید (نام متغیر: KV)'}</div>
        </div>
        <span class="check-status ${hasKV ? 'ok' : 'fail'}">${hasKV ? 'فعال' : 'غیرفعال'}</span>
    </div>
    <div class="check-item">
        <span class="check-icon">${hasD1 ? '✅' : '❌'}</span>
        <div class="check-text">
            <div>D1 SQLite Database</div>
            <div class="check-detail">${hasD1 ? 'متصل است' : 'لطفاً D1 را متصل کنید (نام متغیر: DB)'}</div>
        </div>
        <span class="check-status ${hasD1 ? 'ok' : 'fail'}">${hasD1 ? 'فعال' : 'غیرفعال'}</span>
    </div>
    <div class="check-item">
        <span class="check-icon">${hasAdmin ? '✅' : '❌'}</span>
        <div class="check-text">
            <div>Admin Password</div>
            <div class="check-detail">${hasAdmin ? 'تنظیم شده است' : 'لطفاً ADMIN_PASS را تنظیم کنید'}</div>
        </div>
        <span class="check-status ${hasAdmin ? 'ok' : 'fail'}">${hasAdmin ? 'فعال' : 'غیرفعال'}</span>
    </div>
    ${allOk ? `
    <div class="text-center">
        <a href="/panel" class="btn">🚀 ورود به پنل مدیریت</a>
    </div>
    ` : `
    <div style="background: #1a1a1a; border-radius: 10px; padding: 15px; margin: 15px 0; border: 1px solid #ff6b00; text-align: center; color: #ffa64d; font-size: 13px;">
        ⚠️ لطفاً تمام مراحل بالا را تکمیل کنید تا پنل فعال شود
    </div>
    `}
    <div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>
    <div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>
</div>
<script>
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';
        }, 800);
    }, 1500);
</script>
</body>
</html>`;
}
// ============================================================
// TAAKAA-XI WORKER v2.0.0 - PART 2/3
// ============================================================

// ============================================================
// PAGE RENDERERS - PANEL (بخش اصلی پنل با همه قابلیت‌ها)
// ============================================================

function renderPanel(users = [], usage = {}, settings = {}) {
    const userList = users.map(u => `
        <div class="user-item" id="user-${u.id}">
            <div class="user-info">
                <div class="user-name">${u.name || u.id}</div>
                <div class="user-detail">🆔 UUID: <span class="copyable" onclick="copyText('${u.uuid}')">${u.uuid}</span></div>
                <div class="user-detail">🌍 IP: ${u.customIp || 'خودکار'}</div>
                <div class="user-detail">📦 محدودیت: ${formatVolume(u.limit)}</div>
                <div class="user-detail">📊 مصرف: ${formatVolume(usage[u.id] || 0)}</div>
                <div class="user-detail">📊 باقی‌مانده: ${formatVolume((u.limit || Infinity) - (usage[u.id] || 0))}</div>
                <div class="user-detail">⏳ انقضا: ${formatDuration(u.expiry)}</div>
                <div class="user-detail">📡 اپراتور: ${u.operator || 'irancel'}</div>
            </div>
            <div class="user-actions">
                <div class="user-status ${u.disabled ? 'disabled' : 'active'}">${u.disabled ? '🔴 غیرفعال' : '🟢 فعال'}</div>
                <button class="btn-sm btn-primary" onclick="editUser('${u.id}')">✏️ ویرایش</button>
                <button class="btn-sm btn-danger" onclick="deleteUser('${u.id}')">🗑️ حذف</button>
                <button class="btn-sm btn-primary" onclick="resetUsage('${u.id}')">🔄 ریست مصرف</button>
                <button class="btn-sm btn-primary" onclick="toggleUser('${u.id}')">${u.disabled ? '✅ فعال‌سازی' : '⛔ غیرفعال‌سازی'}</button>
                <button class="btn-sm btn-primary" onclick="showConfig('${u.id}')">📋 کانفیگ</button>
            </div>
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
        .card { background: #1a1a1a; border: 2px solid #ff6b00; border-radius: 16px; padding: 30px; max-width: 1200px; width: 100%; margin: 20px auto; box-shadow: 0 0 30px rgba(255,107,0,0.2); }
        h1 { color: #ff8c00; text-align: center; margin-bottom: 5px; font-size: 28px; }
        .subtitle { text-align: center; color: #ffa64d; font-size: 13px; margin-bottom: 20px; }
        .logout-btn { float: left; color: #ff6b00; text-decoration: none; font-size: 14px; border: 1px solid #ff6b00; padding: 5px 15px; border-radius: 8px; transition: all 0.3s; }
        .logout-btn:hover { background: #ff6b00; color: #0d0d0d; }
        h2 { color: #ff8c00; margin: 20px 0 10px; font-size: 20px; border-bottom: 1px solid #ff6b00; padding-bottom: 8px; }
        .menu { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin: 20px 0; }
        .menu a { background: #0d0d0d; border: 1px solid #ff6b00; border-radius: 10px; padding: 12px; text-align: center; color: #ffa64d; text-decoration: none; transition: all 0.3s; font-size: 14px; cursor: pointer; }
        .menu a:hover { background: #ff6b00; color: #0d0d0d; }
        .user-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; margin: 5px 0; background: #0d0d0d; border-radius: 8px; border: 1px solid #222; flex-wrap: wrap; gap: 10px; }
        .user-info { flex: 1; min-width: 200px; }
        .user-name { color: #fff; font-weight: bold; font-size: 16px; }
        .user-detail { color: #ffa64d; font-size: 12px; margin-top: 2px; }
        .user-actions { display: flex; flex-wrap: wrap; gap: 5px; align-items: center; }
        .user-status { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
        .user-status.active { background: #1a5a1a; color: #4caf50; }
        .user-status.disabled { background: #5a1a1a; color: #f44336; }
        .form-group { margin: 12px 0; }
        .form-group label { display: block; margin-bottom: 5px; color: #ffa64d; font-size: 14px; }
        .form-group input, .form-group select { width: 100%; padding: 10px; background: #0d0d0d; border: 1px solid #ff6b00; border-radius: 8px; color: #fff; font-size: 14px; }
        .form-group .hint { color: #666; font-size: 12px; margin-top: 3px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .btn-primary { padding: 10px 25px; background: #ff6b00; border: none; border-radius: 8px; color: #0d0d0d; font-weight: bold; cursor: pointer; font-size: 14px; transition: all 0.3s; }
        .btn-primary:hover { background: #ff8c00; }
        .btn-danger { padding: 10px 25px; background: #d32f2f; border: none; border-radius: 8px; color: #fff; font-weight: bold; cursor: pointer; font-size: 14px; transition: all 0.3s; }
        .btn-danger:hover { background: #f44336; }
        .btn-sm { padding: 5px 12px; font-size: 12px; }
        .status-box { background: #0d0d0d; border-radius: 10px; padding: 15px; margin: 15px 0; border: 1px solid #333; }
        .channel { text-align: center; margin-top: 15px; padding: 10px; background: #0d0d0d; border-radius: 8px; border: 1px solid #ff6b00; }
        .channel a { color: #ff8c00; text-decoration: none; font-weight: bold; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        .ip-box { background: #0d0d0d; border-radius: 8px; padding: 10px; font-family: monospace; font-size: 13px; border: 1px solid #333; margin: 5px 0; word-break: break-all; }
        .scanner-result { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 10px 0; }
        .scanner-item { background: #0d0d0d; border: 1px solid #333; border-radius: 8px; padding: 10px; text-align: center; }
        .scanner-item .ip { color: #ff8c00; font-weight: bold; }
        .scanner-item .status { font-size: 12px; margin-top: 5px; }
        .scanner-item .status.alive { color: #4caf50; }
        .scanner-item .status.dead { color: #f44336; }
        .scanner-item .ping { font-size: 12px; color: #666; }
        .tab-bar { display: flex; gap: 5px; margin: 10px 0; flex-wrap: wrap; }
        .tab { padding: 8px 15px; background: #0d0d0d; border: 1px solid #333; border-radius: 8px; cursor: pointer; color: #ffa64d; transition: all 0.3s; }
        .tab.active { background: #ff6b00; color: #0d0d0d; border-color: #ff6b00; }
        .tab:hover { border-color: #ff6b00; }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
        .copyable { cursor: pointer; color: #ff8c00; }
        .copyable:hover { text-decoration: underline; }
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; justify-content: center; align-items: center; }
        .modal-content { background: #1a1a1a; border: 2px solid #ff6b00; border-radius: 16px; padding: 30px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; }
        .modal-content h2 { color: #ff8c00; }
        .modal-close { float: left; color: #ff6b00; font-size: 24px; cursor: pointer; }
        .config-box { background: #0d0d0d; border-radius: 8px; padding: 15px; font-family: monospace; font-size: 12px; overflow-x: auto; white-space: pre-wrap; word-break: break-all; border: 1px solid #333; margin: 10px 0; }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } .user-item { flex-direction: column; align-items: stretch; } }
    </style>
</head>
<body>
<div class="card">
    <h1>🖐🏻🤓🖐🏻 TAAKAA-XI</h1>
    <div class="subtitle">the new generation of Free config</div>
    <a href="/logout" class="logout-btn">🚪 خروج</a>
    <div class="status-box">
        <p>✅ پنل مدیریت کانفیگ</p>
        <p style="font-size:14px;color:#ff8c00;">نسخه: ${VERSION}</p>
        <p style="font-size:12px;color:#666;">${TEAM}</p>
    </div>

    <div class="tab-bar">
        <div class="tab active" onclick="switchTab('dashboard')">📊 داشبورد</div>
        <div class="tab" onclick="switchTab('users')">👥 کاربران</div>
        <div class="tab" onclick="switchTab('scanner')">📡 اسکنر IP</div>
        <div class="tab" onclick="switchTab('settings')">⚙️ تنظیمات</div>
        <div class="tab" onclick="switchTab('subscription')">📋 سابسکریپشن</div>
        <div class="tab" onclick="switchTab('backup')">💾 بکاپ</div>
    </div>

    <!-- TAB 1: DASHBOARD -->
    <div id="tab-dashboard" class="tab-content active">
        <h2>📊 آمار کلی</h2>
        <div class="status-box">
            <p>👥 تعداد کاربران: ${users.length}</p>
            <p>📡 پروتکل‌ها: VLESS, Trojan, Shadowsocks, XHTTP, gRPC</p>
            <p>🛡️ تکنیک‌ها: Fragment, WARP, ECH, GSA Relay</p>
            <p>📢 کانال: @TaaKaaOrg</p>
        </div>
        <h2>👥 لیست کاربران</h2>
        <div id="userList">
            ${userList || '<p style="color:#666;">هیچ کاربری تعریف نشده است</p>'}
        </div>
    </div>

    <!-- TAB 2: USERS -->
    <div id="tab-users" class="tab-content">
        <h2>➕ افزودن کاربر جدید</h2>
        <form id="addUserForm" onsubmit="addUser(event)">
            <div class="form-row">
                <div class="form-group">
                    <label>👤 نام کاربر:</label>
                    <input type="text" id="userName" placeholder="مثلاً کاربر شماره ۱" required>
                </div>
                <div class="form-group">
                    <label>🔑 UUID (اختیاری - خالی برای خودکار):</label>
                    <input type="text" id="userUuid" placeholder="خالی = خودکار">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>📦 محدودیت حجم کل:</label>
                    <input type="text" id="userLimit" placeholder="5GB, 1T, 500mb" value="5GB">
                    <div class="hint">مثال: 500mb, 5GB, 1T, 1PT</div>
                </div>
                <div class="form-group">
                    <label>📊 محدودیت حجم روزانه:</label>
                    <input type="text" id="userDayLimit" placeholder="1GB, 500mb" value="1GB">
                    <div class="hint">مثال: 500mb, 1GB</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>⏳ مدت زمان:</label>
                    <input type="text" id="userDuration" placeholder="30, 1M, 1y" value="30">
                    <div class="hint">مثال: 1 (روز), 1M (ماه), 1y (سال)</div>
                </div>
                <div class="form-group" style="border: 2px solid #ff6b00; border-radius: 10px; padding: 10px; background: #0d0d0d;">
                    <label style="color: #ff8c00;">🌍 IP اختصاصی (اختیاری):</label>
                    <input type="text" id="userIp" placeholder="188.114.98.82 یا خالی برای خودکار" style="border-color: #ff8c00;">
                    <div class="hint">خالی = خودکار | IP اختصاصی = کانفیگ روی این IP ساخته میشه</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>📡 اپراتور:</label>
                    <select id="userOperator">
                        <option value="irancel">ایرانسل</option>
                        <option value="hamraheAval">همراه اول</option>
                        <option value="rightel">رایتل</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>🔌 پورت:</label>
                    <select id="userPort">
                        <option value="443">۴۴۳ (پیش‌فرض)</option>
                        <option value="8443">۸۴۴۳</option>
                        <option value="2083">۲۰۸۳</option>
                        <option value="2087">۲۰۸۷</option>
                        <option value="2096">۲۰۹۶</option>
                        <option value="2053">۲۰۵۳</option>
                    </select>
                </div>
            </div>
            <button type="submit" class="btn-primary">➕ افزودن کاربر</button>
        </form>
        <div id="addUserResult" style="margin-top: 10px;"></div>
        
        <h2 style="margin-top:30px;">✏️ ویرایش کاربر</h2>
        <div id="editUserForm" style="display:none;">
            <div class="form-row">
                <div class="form-group">
                    <label>👤 نام کاربر:</label>
                    <input type="text" id="editUserName">
                </div>
                <div class="form-group">
                    <label>📦 محدودیت حجم کل:</label>
                    <input type="text" id="editUserLimit" placeholder="5GB, 1T, 500mb">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>📊 محدودیت حجم روزانه:</label>
                    <input type="text" id="editUserDayLimit" placeholder="1GB, 500mb">
                </div>
                <div class="form-group">
                    <label>⏳ مدت زمان:</label>
                    <input type="text" id="editUserDuration" placeholder="30, 1M, 1y">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>🌍 IP اختصاصی:</label>
                    <input type="text" id="editUserIp" placeholder="188.114.98.82 یا خالی برای خودکار">
                </div>
                <div class="form-group">
                    <label>📡 اپراتور:</label>
                    <select id="editUserOperator">
                        <option value="irancel">ایرانسل</option>
                        <option value="hamraheAval">همراه اول</option>
                        <option value="rightel">رایتل</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>🔌 پورت:</label>
                <select id="editUserPort">
                    <option value="443">۴۴۳</option>
                    <option value="8443">۸۴۴۳</option>
                    <option value="2083">۲۰۸۳</option>
                    <option value="2087">۲۰۸۷</option>
                    <option value="2096">۲۰۹۶</option>
                    <option value="2053">۲۰۵۳</option>
                </select>
            </div>
            <input type="hidden" id="editUserId">
            <button class="btn-primary" onclick="saveEditUser()">💾 ذخیره تغییرات</button>
            <button class="btn-danger" onclick="cancelEditUser()">❌ انصراف</button>
        </div>
    </div>

    <!-- TAB 3: SCANNER -->
    <div id="tab-scanner" class="tab-content">
        <h2>📡 اسکنر IP تمیز</h2>
        <div class="status-box">
            <p>🔍 IP های تست شده و سالم را پیدا کنید</p>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>📡 اپراتور:</label>
                <select id="scanOperator">
                    <option value="irancel">ایرانسل</option>
                    <option value="hamraheAval">همراه اول</option>
                    <option value="rightel">رایتل</option>
                    <option value="all">همه</option>
                </select>
            </div>
            <div class="form-group">
                <label>🔢 تعداد اسکن:</label>
                <input type="number" id="scanCount" value="10" min="1" max="50">
            </div>
        </div>
        <button class="btn-primary" onclick="startScan()">🔍 شروع اسکن</button>
        <div id="scanResult" style="margin-top: 15px;"></div>
        <div id="scanResults" class="scanner-result"></div>
        <h3 style="margin-top:20px;">📋 IP های تست شده قبلی</h3>
        <div id="testedIps" style="background:#0d0d0d;border-radius:8px;padding:15px;border:1px solid #333;max-height:300px;overflow-y:auto;"></div>
    </div>

    <!-- TAB 4: SETTINGS -->
    <div id="tab-settings" class="tab-content">
        <h2>⚙️ تنظیمات عمومی</h2>
        <div class="form-row">
            <div class="form-group">
                <label>🧩 Fragment Size:</label>
                <input type="text" id="fragmentSize" placeholder="200-500" value="${settings.fragment?.size || '200-500'}">
            </div>
            <div class="form-group">
                <label>🧩 Fragment Count:</label>
                <input type="text" id="fragmentCount" placeholder="5-10" value="${settings.fragment?.count || '5-10'}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>🧩 Fragment Delay:</label>
                <input type="text" id="fragmentDelay" placeholder="10-30" value="${settings.fragment?.delay || '10-30'}">
            </div>
            <div class="form-group">
                <label>🖥️ Fingerprint:</label>
                <select id="fingerprint">
                    <option value="chrome" ${settings.fingerprint === 'chrome' ? 'selected' : ''}>Chrome</option>
                    <option value="firefox" ${settings.fingerprint === 'firefox' ? 'selected' : ''}>Firefox</option>
                    <option value="safari" ${settings.fingerprint === 'safari' ? 'selected' : ''}>Safari</option>
                    <option value="random" ${settings.fingerprint === 'random' ? 'selected' : ''}>Random</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>🛡️ WARP:</label>
                <select id="warpMode">
                    <option value="off" ${settings.warp === 'off' ? 'selected' : ''}>خاموش</option>
                    <option value="on" ${settings.warp === 'on' ? 'selected' : ''}>روشن</option>
                    <option value="pro" ${settings.warp === 'pro' ? 'selected' : ''}>WARP Pro</option>
                </select>
            </div>
            <div class="form-group">
                <label>🔒 ECH:</label>
                <select id="echMode">
                    <option value="off" ${settings.ech === 'off' ? 'selected' : ''}>خاموش</option>
                    <option value="on" ${settings.ech === 'on' ? 'selected' : ''}>روشن</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>🔑 تغییر UUID کل سیستم:</label>
                <input type="text" id="systemUuid" placeholder="خالی برای خودکار">
                <div class="hint">خالی = خودکار | وارد کنید = تنظیم دستی</div>
            </div>
            <div class="form-group">
                <label>🔐 تغییر رمز ادمین:</label>
                <input type="password" id="newAdminPass" placeholder="رمز جدید">
                <div class="hint">خالی = بدون تغییر</div>
            </div>
        </div>
        <button class="btn-primary" onclick="saveSettings()">💾 ذخیره تنظیمات</button>
        <div id="settingsResult" style="margin-top: 10px;"></div>
    </div>

    <!-- TAB 5: SUBSCRIPTION -->
    <div id="tab-subscription" class="tab-content">
        <h2>📋 سابسکریپشن</h2>
        <div class="status-box">
            <p>لینک سابسکریپشن مخصوص هر کاربر</p>
        </div>
        <div class="form-group">
            <label>🆔 UUID کاربر:</label>
            <input type="text" id="subUuid" placeholder="UUID کاربر را وارد کنید">
        </div>
        <button class="btn-primary" onclick="getSubscription()">📋 دریافت سابسکریپشن</button>
        <div id="subResult" style="margin-top:15px;"></div>
    </div>

    <!-- TAB 6: BACKUP -->
    <div id="tab-backup" class="tab-content">
        <h2>💾 بکاپ و مدیریت</h2>
        <div class="status-box">
            <p>گرفتن بکاپ از تنظیمات و کاربران</p>
        </div>
        <button class="btn-primary" onclick="createBackup()">💾 گرفتن بکاپ</button>
        <button class="btn-danger" onclick="resetAll()">⚠️ ریست کامل سیستم</button>
        <div id="backupResult" style="margin-top:15px;"></div>
    </div>

    <div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>
    <div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>
</div>

<!-- MODAL FOR CONFIG -->
<div class="modal" id="configModal">
    <div class="modal-content">
        <span class="modal-close" onclick="closeModal()">✕</span>
        <h2>📋 کانفیگ کاربر</h2>
        <div id="configContent"></div>
    </div>
</div>

<script>
let editingUserId = null;

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => {
        if (t.textContent.includes(tab === 'dashboard' ? 'داشبورد' : 
            tab === 'users' ? 'کاربران' :
            tab === 'scanner' ? 'اسکنر' :
            tab === 'settings' ? 'تنظیمات' :
            tab === 'subscription' ? 'سابسکریپشن' : 'بکاپ')) {
            t.classList.add('active');
        }
    });
    document.getElementById('tab-' + tab).classList.add('active');
}

function copyText(text) {
    navigator.clipboard.writeText(text);
    alert('✅ کپی شد!');
}

async function addUser(e) {
    e.preventDefault();
    const data = {
        name: document.getElementById('userName').value,
        uuid: document.getElementById('userUuid').value || null,
        limit: document.getElementById('userLimit').value,
        dayLimit: document.getElementById('userDayLimit').value,
        duration: document.getElementById('userDuration').value,
        ip: document.getElementById('userIp').value || null,
        operator: document.getElementById('userOperator').value,
        port: parseInt(document.getElementById('userPort').value)
    };
    const res = await fetch('/api/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    document.getElementById('addUserResult').innerHTML = result.success ?
        '<div style="color:#4caf50;padding:10px;">✅ ' + result.message + '</div>' :
        '<div style="color:#f44336;padding:10px;">❌ ' + result.error + '</div>';
    if (result.success) setTimeout(() => location.reload(), 1500);
}

async function editUser(id) {
    editingUserId = id;
    const res = await fetch('/api/users');
    const data = await res.json();
    const user = data.users.find(u => u.id === id);
    if (!user) return;
    document.getElementById('editUserId').value = id;
    document.getElementById('editUserName').value = user.name || '';
    document.getElementById('editUserLimit').value = user.limit === Infinity ? 'unlimited' : formatVolume(user.limit);
    document.getElementById('editUserDayLimit').value = user.dayLimit === Infinity ? 'unlimited' : formatVolume(user.dayLimit);
    document.getElementById('editUserDuration').value = user.expiry === Infinity ? 'unlimited' : formatDuration(user.expiry);
    document.getElementById('editUserIp').value = user.customIp || '';
    document.getElementById('editUserOperator').value = user.operator || 'irancel';
    document.getElementById('editUserPort').value = user.port || 443;
    document.getElementById('editUserForm').style.display = 'block';
    document.getElementById('editUserForm').scrollIntoView({ behavior: 'smooth' });
}

function cancelEditUser() {
    document.getElementById('editUserForm').style.display = 'none';
    editingUserId = null;
}

async function saveEditUser() {
    const id = document.getElementById('editUserId').value;
    const data = {
        name: document.getElementById('editUserName').value,
        limit: document.getElementById('editUserLimit').value,
        dayLimit: document.getElementById('editUserDayLimit').value,
        duration: document.getElementById('editUserDuration').value,
        ip: document.getElementById('editUserIp').value || null,
        operator: document.getElementById('editUserOperator').value,
        port: parseInt(document.getElementById('editUserPort').value)
    };
    const res = await fetch('/api/users/edit/' + id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result.success) {
        alert('✅ کاربر ویرایش شد!');
        location.reload();
    } else {
        alert('❌ خطا: ' + result.error);
    }
}

async function deleteUser(id) {
    if (!confirm('آیا از حذف این کاربر مطمئن هستید؟')) return;
    const res = await fetch('/api/users/delete/' + id, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
        alert('✅ کاربر حذف شد!');
        location.reload();
    } else {
        alert('❌ خطا: ' + result.error);
    }
}

async function toggleUser(id) {
    const res = await fetch('/api/users/toggle/' + id, { method: 'POST' });
    const result = await res.json();
    if (result.success) {
        alert('✅ وضعیت کاربر تغییر کرد!');
        location.reload();
    } else {
        alert('❌ خطا: ' + result.error);
    }
}

async function resetUsage(id) {
    if (!confirm('آیا از ریست کردن مصرف این کاربر مطمئن هستید؟')) return;
    const res = await fetch('/api/users/reset/' + id, { method: 'POST' });
    const result = await res.json();
    if (result.success) {
        alert('✅ مصرف کاربر ریست شد!');
        location.reload();
    } else {
        alert('❌ خطا: ' + result.error);
    }
}

async function showConfig(id) {
    const res = await fetch('/api/users/config/' + id);
    const data = await res.json();
    if (data.error) {
        alert('❌ ' + data.error);
        return;
    }
    document.getElementById('configContent').innerHTML = `
        <h3>VLESS</h3>
        <div class="config-box">${data.vless}</div>
        <h3>Trojan</h3>
        <div class="config-box">${data.trojan}</div>
        <h3>Shadowsocks</h3>
        <div class="config-box">${data.shadowsocks}</div>
        <button class="btn-primary" onclick="copyText('${data.vless}\\n${data.trojan}\\n${data.shadowsocks}')">📋 کپی همه</button>
    `;
    document.getElementById('configModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('configModal').style.display = 'none';
}

async function startScan() {
    const operator = document.getElementById('scanOperator').value;
    const count = document.getElementById('scanCount').value || 10;
    document.getElementById('scanResult').innerHTML = '<div style="color:#ff8c00;">⏳ در حال اسکن...</div>';
    document.getElementById('scanResults').innerHTML = '';
    const res = await fetch('/api/scan?type=' + operator + '&count=' + count);
    const data = await res.json();
    if (data.results) {
        let html = '';
        data.results.forEach(r => {
            const statusClass = r.status === 'alive' ? 'alive' : 'dead';
            const statusText = r.status === 'alive' ? '✅ سالم' : '❌ مرده';
            html += `<div class="scanner-item">
                <div class="ip">${r.ip}</div>
                <div class="status ${statusClass}">${statusText}</div>
                <div class="ping">${r.ping > 0 ? r.ping + 'ms' : '—'}</div>
                <div style="font-size:11px;color:#666;">کد: ${r.code || '—'}</div>
            </div>`;
        });
        document.getElementById('scanResults').innerHTML = html;
        document.getElementById('scanResult').innerHTML = `<div style="color:#4caf50;">✅ اسکن کامل شد (${data.scanned} IP)</div>`;
        localStorage.setItem('testedIps', JSON.stringify(data.results));
        loadTestedIps();
    } else {
        document.getElementById('scanResult').innerHTML = '<div style="color:#f44336;">❌ خطا در اسکن</div>';
    }
}

function loadTestedIps() {
    const data = JSON.parse(localStorage.getItem('testedIps') || '[]');
    let html = '';
    data.slice(0, 50).forEach(r => {
        const statusClass = r.status === 'alive' ? 'alive' : 'dead';
        const statusText = r.status === 'alive' ? '✅' : '❌';
        html += `<div style="display:flex;justify-content:space-between;padding:5px;border-bottom:1px solid #222;">
            <span style="color:#ff8c00;">${r.ip}</span>
            <span class="status ${statusClass}">${statusText} ${r.ping > 0 ? r.ping + 'ms' : ''}</span>
        </div>`;
    });
    document.getElementById('testedIps').innerHTML = html || 'هنوز IP ای تست نشده است';
}

async function saveSettings() {
    const data = {
        fragment: {
            size: document.getElementById('fragmentSize').value,
            count: document.getElementById('fragmentCount').value,
            delay: document.getElementById('fragmentDelay').value
        },
        fingerprint: document.getElementById('fingerprint').value,
        warp: document.getElementById('warpMode').value,
        ech: document.getElementById('echMode').value,
        systemUuid: document.getElementById('systemUuid').value || null,
        newAdminPass: document.getElementById('newAdminPass').value || null
    };
    const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    document.getElementById('settingsResult').innerHTML = result.success ?
        '<div style="color:#4caf50;padding:10px;">✅ ' + result.message + '</div>' :
        '<div style="color:#f44336;padding:10px;">❌ ' + result.error + '</div>';
}

async function getSubscription() {
    const uuid = document.getElementById('subUuid').value.trim();
    if (!uuid) { alert('لطفاً UUID را وارد کنید'); return; }
    const res = await fetch('/api/sub/' + uuid);
    const data = await res.json();
    if (data.error) {
        document.getElementById('subResult').innerHTML = '<div style="color:#f44336;padding:10px;">❌ ' + data.error + '</div>';
        return;
    }
    document.getElementById('subResult').innerHTML = `
        <div style="background:#0d0d0d;border-radius:8px;padding:15px;border:1px solid #333;">
            <p><strong>📋 لینک سابسکریپشن:</strong></p>
            <div class="config-box">${data.url}</div>
            <p style="margin-top:10px;"><strong>📊 کانفیگ‌ها:</strong></p>
            <div class="config-box">${data.raw}</div>
            <button class="btn-primary" onclick="copyText('${data.url}')">📋 کپی لینک</button>
            <button class="btn-primary" onclick="copyText('${data.raw}')">📋 کپی کانفیگ‌ها</button>
        </div>
    `;
}

async function createBackup() {
    const res = await fetch('/api/backup');
    const data = await res.json();
    if (data.error) {
        document.getElementById('backupResult').innerHTML = '<div style="color:#f44336;padding:10px;">❌ ' + data.error + '</div>';
        return;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taakaa-backup-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    document.getElementById('backupResult').innerHTML = '<div style="color:#4caf50;padding:10px;">✅ بکاپ گرفته شد</div>';
}

async function resetAll() {
    if (!confirm('⚠️ آیا از ریست کامل سیستم مطمئن هستید؟ این کار همه کاربران و تنظیمات را حذف می‌کند!')) return;
    if (!confirm('تأیید نهایی: همه داده‌ها پاک می‌شوند!')) return;
    const res = await fetch('/api/reset', { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
        alert('✅ سیستم ریست شد! صفحه reload می‌شود...');
        location.reload();
    } else {
        alert('❌ خطا: ' + result.error);
    }
}

loadTestedIps();

document.getElementById('configModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});
</script>
</body>
</html>`;
}

// ============================================================
// PAGE RENDERERS - OTHER PAGES
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
h1{color:#ff8c00;text-align:center;margin-bottom:5px;font-size:28px}
.subtitle{text-align:center;color:#ffa64d;font-size:13px;margin-bottom:20px}
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
<h1>👤 پشتیبان‌ها</h1>
<div class="subtitle">the new generation of Free config</div>
<div class="owner"><div class="avatar">A</div><div class="info"><div class="name">Admin</div><div class="role">مدیر اصلی</div><div class="contact">@TaakaaXi_Admin</div></div></div>
<div class="owner"><div class="avatar">S</div><div class="info"><div class="name">Support</div><div class="role">پشتیبانی فنی</div><div class="contact">@TaakaaXi_Support</div></div></div>
<div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>
<div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>
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
h1{color:#ff8c00;text-align:center;margin-bottom:5px;font-size:28px}
.subtitle{text-align:center;color:#ffa64d;font-size:13px;margin-bottom:20px}
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
<div class="subtitle">the new generation of Free config</div>
<div class="info">
<p><span class="tag">چیست؟</span> تکنیک Fragment یا تکه‌تکه‌سازی، بسته‌های داده را به قطعات کوچک تقسیم می‌کند تا سیستم‌های DPI نتوانند الگوی ترافیک را تشخیص دهند.</p>
<p><span class="tag">چگونه کار می‌کند؟</span> داده‌های TLS/WS به قطعات ۱۰۰-۵۰۰ بایتی تقسیم شده و با تاخیرهای میکروثانیه‌ای ارسال می‌شوند.</p>
<p><span class="tag">مزایا</span> ✅ عبور از فیلترینگ سنگین ✅ کاهش تشخیص DPI ✅ سازگاری با همه‌ی پروتکل‌ها</p>
</div>
<div class="code">{
  "fragment": {
    "size": "200-500",
    "count": "5-10",
    "delay": "10-30"
  }
}</div>
<div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>
<div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>
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
h1{color:#ff8c00;text-align:center;margin-bottom:5px;font-size:28px}
.subtitle{text-align:center;color:#ffa64d;font-size:13px;margin-bottom:20px}
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
<div class="subtitle">the new generation of Free config</div>
<div class="operator"><div class="title">📱 همراه اول</div><div class="detail">تنظیمات DNS: 10.10.10.10</div><div class="guide">🔹 برای اتصال آفلاین، DNS را روی 10.10.10.10 تنظیم کنید</div></div>
<div class="operator"><div class="title">📶 ایرانسل</div><div class="detail">تنظیمات DNS: 10.10.10.10</div><div class="guide">🔹 برای اتصال آفلاین، DNS را روی 10.10.10.10 تنظیم کنید</div></div>
<div class="operator"><div class="title">📡 رایتل</div><div class="detail">تنظیمات DNS: 10.10.10.10</div><div class="guide">🔹 برای اتصال آفلاین، DNS را روی 10.10.10.10 تنظیم کنید</div></div>
<div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>
<div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>
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
h1{color:#ff8c00;text-align:center;margin-bottom:5px;font-size:28px}
.subtitle{text-align:center;color:#ffa64d;font-size:13px;margin-bottom:20px}
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
<div class="subtitle">the new generation of Free config</div>
<div class="location" onclick="selectServer('DE')"><span class="flag">🇩🇪</span><span class="name">آلمان (Frankfurt)</span><span class="ping">Ping: 85ms</span></div>
<div class="location" onclick="selectServer('NL')"><span class="flag">🇳🇱</span><span class="name">هلند (Amsterdam)</span><span class="ping">Ping: 92ms</span></div>
<div class="location" onclick="selectServer('US')"><span class="flag">🇺🇸</span><span class="name">آمریکا (New York)</span><span class="ping">Ping: 140ms</span></div>
<div class="location" onclick="selectServer('SG')"><span class="flag">🇸🇬</span><span class="name">سنگاپور</span><span class="ping">Ping: 110ms</span></div>
<div class="location" onclick="selectServer('JP')"><span class="flag">🇯🇵</span><span class="name">ژاپن (Tokyo)</span><span class="ping">Ping: 130ms</span></div>
<div class="channel">📢 کانال رسمی: <a href="https://t.me/TaaKaaOrg" target="_blank">@TaaKaaOrg</a></div>
<div class="footer">توسعه‌یافته توسط تیم تاکا | سادگی • قدرت • امنیت</div>
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
// TAAKAA-XI WORKER v2.0.0 - PART 3/3 (FINAL)
// ============================================================

// ============================================================
// API HANDLERS
// ============================================================

async function handleApi(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // === ADD USER ===
    if (path.includes('/users/add') && request.method === 'POST') {
        try {
            const body = await request.json();
            const usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            const data = JSON.parse(usersData);
            
            const uuid = body.uuid && isValidUUID(body.uuid) ? body.uuid : generateUUID();
            const newUser = {
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
            const id = path.split('/').pop();
            const body = await request.json();
            const usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            const data = JSON.parse(usersData);
            const index = data.users.findIndex(u => u.id === id);
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
            const id = path.split('/').pop();
            const usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            const data = JSON.parse(usersData);
            data.users = data.users.filter(u => u.id !== id);
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
            const id = path.split('/').pop();
            const usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            const data = JSON.parse(usersData);
            const user = data.users.find(u => u.id === id);
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
            const id = path.split('/').pop();
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
            const id = path.split('/').pop();
            const usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            const data = JSON.parse(usersData);
            const user = data.users.find(u => u.id === id);
            if (!user) {
                return new Response(JSON.stringify({ error: 'کاربر یافت نشد' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            const host = 'your-domain.com';
            const pathStr = '/';
            const sub = generateSubscription(user, host, pathStr);
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

    // === SCAN IP ===
    if (path.includes('/scan')) {
        const type = url.searchParams.get('type') || 'all';
        const count = parseInt(url.searchParams.get('count')) || 10;
        let ips = [];
        if (type === 'all') {
            for (const key in IP_POOLS) {
                ips = ips.concat(IP_POOLS[key]);
            }
        } else {
            ips = IP_POOLS[type] || IP_POOLS.irancel;
        }
        const results = await scanIps(ips, count);
        return new Response(JSON.stringify({ results, scanned: results.length }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // === SETTINGS ===
    if (path.includes('/settings') && request.method === 'POST') {
        try {
            const body = await request.json();
            let settings = await env.KV.get('taakaa_settings') || '{}';
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
            const settings = await env.KV.get('taakaa_settings') || '{}';
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

    // === GET USERS ===
    if (path.includes('/users')) {
        const usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
        const data = JSON.parse(usersData);
        const usage = {};
        for (const u of data.users) {
            const usageData = await env.KV.get('usage_' + u.id) || '{"total":0}';
            usage[u.id] = JSON.parse(usageData).total || 0;
        }
        return new Response(JSON.stringify({ users: data.users, usage }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // === SUBSCRIPTION ===
    if (path.includes('/sub/')) {
        try {
            const uuid = path.split('/').pop();
            const usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            const data = JSON.parse(usersData);
            const user = data.users.find(u => u.id === uuid || u.uuid === uuid);
            if (!user) {
                return new Response(JSON.stringify({ error: 'کاربر یافت نشد' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            const host = 'your-domain.com';
            const pathStr = '/';
            const sub = generateSubscription(user, host, pathStr);
            const url = `https://${host}/sub/${user.uuid}`;
            return new Response(JSON.stringify({ ...sub, url }), {
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
            const usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            const settings = await env.KV.get('taakaa_settings') || '{}';
            const systemUuid = await env.KV.get('taakaa_system_uuid') || null;
            const backup = {
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
// MAIN HANDLER
// ============================================================

async function handleRequest(request) {
    try {
        const url = new URL(request.url);
        const path = url.pathname;
        const firstSegment = path.split('/').filter(Boolean)[0] || '';
        const env = globalThis.env || {};

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
        const hasKV = !!(env.KV && typeof env.KV.get === 'function');
        let hasD1 = !!(env.DB && typeof env.DB.prepare === 'function');
        const hasAdmin = !!(env.ADMIN_PASS || env.ADMIN_PASSWORD || env.PASSWORD);

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
            const usersData = await env.KV.get('taakaa_users') || '{"users":[]}';
            const data = JSON.parse(usersData);
            const usage = {};
            for (const u of data.users) {
                const usageData = await env.KV.get('usage_' + u.id) || '{"total":0}';
                usage[u.id] = JSON.parse(usageData).total || 0;
            }
            const settingsData = await env.KV.get('taakaa_settings') || '{}';
            const settings = JSON.parse(settingsData);
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
// REGISTER
// ============================================================

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

// ============================================================
// END OF WORKER
// ============================================================
