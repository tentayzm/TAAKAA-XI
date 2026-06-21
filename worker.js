const fX = b;
(function(c, f) {
    const mF = {
        c: 0x9c7,
        f: 0xdf7,
        g: 'NMJQ',
        h: 'Gn7Q',
        i: 0x14f2,
        j: 'XITC',
        k: '89Hn',
        l: 0x1673,
        m: 0xec2,
        n: 'yxI7',
        o: 0x13b5,
        p: 'wCGK',
        q: 0x8ef,
        r: 0x1511,
        s: 0xc8b,
        t: 0x1835
    },
    fW = b,
    g = c();
    while (!![]) {
        try {
            const h = -parseInt(fW(mF.c, 'IcEg')) / 0x1 * (parseInt(fW(mF.f, mF.g)) / 0x2) + parseInt(fW(0x1929, mF.h)) / 0x3 * (-parseInt(fW(mF.i, mF.j)) / 0x4) + -parseInt(fW(0xe11, mF.k)) / 0x5 + -parseInt(fW(mF.l, 'd%lH')) / 0x6 * (-parseInt(fW(mF.m, mF.n)) / 0x7) + -parseInt(fW(mF.o, mF.p)) / 0x8 + -parseInt(fW(mF.q, '9rQu')) / 0x9 * (-parseInt(fW(mF.r, '7NO9')) / 0xa) + parseInt(fW(mF.s, 'Mmsl')) / 0xb * (parseInt(fW(mF.t, 'n7E3')) / 0xc);
            if (h === f) break;
            else g['push'](g['shift']());
        } catch (i) {
            g['push'](g['shift']());
        }
    }
}(a, 0x1d218));

let cfSocketConnect = null;
try {
    import(fX(0x1b57, 'T3Fv'))[fX(0x1600, 'zs!c')](c => {
        const mG = { c: 'NxG1', f: 'vel(' },
        fY = fX;
        if (c && typeof c[fY(0x6b1, mG.c)] === fY(0x8d2, '*lLT')) cfSocketConnect = c[fY(0x1dc0, mG.f)];
    })[fX(0x9c6, 'yxI7')](() => {});
} catch (d) {}

const Version = fX(0x900, 'dZbH');
let config_JSON, proxyIP = '',
    enableSocks5Proxy = null,
    enableSocks5GlobalProxy = ![],
    mySocks5Account = '',
    parsedSocks5Address = {},
    cachedSocks5Whitelist = null,
    cachedProxyIP,
    cachedProxyResolvedArray,
    cachedProxyArrayIndex = 0x0,
    enableProxyFallback = !![],
    debugLogPrint = ![],
    connProxyWhitelist = [];

function hostMatchesProxyList(c) {
    const mJ = { c: 0xfba, f: '9rQu' },
    mI = { c: 0xa8b, f: 'egod', g: 0x16e1, h: '2#Qk' },
    fZ = fX,
    f = connProxyWhitelist[fZ(0x1ea4, 'XITC')] ? SOCKS5whitelist[fZ(mJ.c, mJ.f)](connProxyWhitelist) : SOCKS5whitelist;
    return f[fZ(0x1095, '6UCx')](g => {
        const g0 = fZ;
        try {
            return new RegExp('^' + String(g)[g0(mI.c, 'vel(')]()[g0(0xa43, mI.f)](/\*/g, '.*') + '$', 'i')[g0(mI.g, mI.h)](c);
        } catch (h) {
            return ![];
        }
    });
}
let nat64Config = '',
    cachedNat64Prefixes = null,
    cachedNat64At = 0x0,
    cachedNat64Src = '',
    networkSettings = null,
    cachedNetworkSettings = null,
    cachedNetworkSettingsAt = 0x0,
    cachedAdminPass = null,
    cachedAdminPassAt = 0x0;
const _CFG_KEY = fX(0xffc, 'ZgMu');
let _cfgRaw = null,
    _cfgRawAt = 0x0;

async function getConfigRaw(c) {
    const mK = { c: 'CeJW', f: 0x16c4 },
    g1 = fX;
    if (_cfgRaw !== null && Date[g1(0x1d80, 'egod')]() - _cfgRawAt < 0x7530) return _cfgRaw;
    try {
        _cfgRaw = c['KV'] && typeof c['KV'][g1(0x14be, mK.c)] === g1(mK.f, '[p9(') ? await c['KV'][g1(0xb3b, 'NMJQ')](_CFG_KEY) : null;
        _cfgRawAt = Date[g1(0xecf, '60r9')]();
    } catch (f) {}
    return _cfgRaw;
}

function putConfig(c, f) {
    const mL = { c: 0x1ee2 },
    g2 = fX;
    return _cfgRaw = f, _cfgRawAt = Date[g2(0x1af6, '9rQu')](), c['KV'][g2(mL.c, 'w(Wr')](_CFG_KEY, f);
}
let cachedWorkerUUID = null,
    cachedWorkerUUIDAt = 0x0,
    savedUsersAuth = null,
    savedUsersAuthAt = 0x0,
    lastCentralSync = 0x0,
    SOCKS5whitelist = [fX(0x17bf, 'wCGK'), fX(0x122b, 'Pt3!'), fX(0x133d, 'yxI7'), fX(0x207, 'rsIZ'), fX(0xa81, 'jODS')],
    PagesstaticPages = fX(0x17e6, 'rsIZ');
globalThis[fX(0x1107, '6UCx')] = Date[fX(0x7ec, '0Ua@')]();
const SESSION_MAX_AGE_MS = 0x5265c00,
    LOGIN_MAX_ATTEMPTS = 0x8,
    LOGIN_WINDOW_MS = 0x927c0,
    LOGIN_BLOCK_MS = 0xdbba0,
    __loginAttempts = new Map(),
    WSearlyDataMaxBytes = 0x8 * 0x400,
    WSearlyDataMaxHeaderLength = Math[fX(0x1d23, 'vel(')](WSearlyDataMaxBytes * 0x4 / 0x3) + 0x4,
    upstreamBatchTargetBytes = 0x40 * 0x400,
    upstreamQueueMaxBytes = 0x20 * 0x400 * 0x400,
    upstreamQueueMaxItems = 0x2000,
    downstreamGrainChunkBytes = 0x40 * 0x400,
    downstreamGrainTailThreshold = 0x200,
    downstreamGrainSilentMs = 0x0,
    TCPconcurrentDialCount = 0x4,
    uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    NODE_ADDR_REGEX = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/,
    TAAKAA_REPO_RAW = fX(0x1032, '*lLT'),
    TAAKAA_VERSION_URL = TAAKAA_REPO_RAW + fX(0x912, 'wCGK'),
    TAAKAA_WORKER_SRC_FALLBACK = TAAKAA_REPO_RAW + fX(0x27b, '9rQu');

function versionGreater(c, f) {
    const mM = { c: '*lLT', f: 0x14de, g: 0x1c8d, h: 0x1b72, i: 0x272, j: 'b)3q', k: 0x1de2, l: '2#Qk', m: 'M5Ii', n: 0xfd3 },
    g3 = fX,
    g = String(c || '')[g3(0x5da, 'Mmsl')](/^[vV]/,'')[g3(0x1df, mM.c)]('.')[g3(mM.f, '9rQu')](j => parseInt(j, 0xa) || 0x0),
    h = String(f || '')[g3(mM.g, 'dbGg')](/^[vV]/,'')[g3(mM.h, 'n7E3')]('.')[g3(mM.i, mM.j)](j => parseInt(j, 0xa) || 0x0);
    for (let j = 0x0; j < Math[g3(mM.k, mM.l)](g[g3(0x1d2d, mM.m)], h[g3(mM.n, 'Mmsl')]); j++) {
        const k = g[j] || 0x0,
            l = h[j] || 0x0;
        if (k > l) return !![];
        if (k < l) return ![];
    }
    return ![];
}
let cachedAutoKey = null;
const _md5md5Cache = new Map(),
    _sha224Cache = new Map();
let _kvMigratedFlag = ![],
    cachedCfUsage = null,
    cachedCfUsageAt = 0x0;
const _cidrListCache = new Map(),
    taakaaXiWorker = {
        async 'fetch'(f, g, h) {
            const mS = {
                c: 0xf41,
                f: '%oj0',
                g: 0x56b,
                h: 0x14c1,
                i: 'egod',
                j: 0x659,
                k: 0x10b9,
                l: '60r9',
                m: 'Mmsl',
                n: 0x1a49,
                o: 0xff8,
                p: '*lLT',
                q: 0x968,
                r: 0x1556,
                s: 'NMJQ',
                t: 0x1489,
                u: 'b)3q',
                v: 0x15eb,
                w: 'IcEg',
                x: 0x318,
                y: 0xf4,
                z: 'Pt3!',
                A: 0x1d1,
                B: '8Ys%',
                C: 0x1e4,
                D: 0x560,
                E: 0x625,
                F: 'PYt$',
                G: 0x12f8,
                H: 'oeP*',
                I: 0xc33,
                J: 'Gn7Q',
                K: 0x8ad,
                L: '9rQu',
                M: 0x9df,
                N: 'dn8p',
                O: 'jODS',
                P: 0xe6f,
                Q: 0x14cd,
                R: 'oeP*',
                S: 'PSkb',
                T: 0x14bf,
                U: 'ZgMu',
                V: 0x1ebc,
                W: 'w3Tt',
                X: 0x187b,
                Y: 'Gn7Q',
                Z: '*lLT',
                a0: 0x14be,
                a1: 0x2df,
                a2: 0x1e11,
                a3: 'CeJW',
                a4: 0x11b2,
                a5: 0x367,
                a6: 0x6e3,
                a7: 0x1d0f,
                a8: '7NO9',
                a9: 0x1140,
                aa: 0x1cd6,
                ab: 0xb3b,
                ac: 0x47d,
                ad: 'jODS',
                ae: 'oeP*',
                af: 0x18d5,
                ag: 0x40a,
                ah: '6UCx',
                ai: 0x11af,
                aj: 'yxI7',
                ak: 'M5Ii',
                al: 0x9cc,
                am: '$p[^',
                an: 0xc84,
                ao: 0x473,
                ap: 'V#kN',
                aq: 'dZbH',
                ar: 0x481,
                as: 'CeJW',
                at: 0x1991,
                au: 0xef3,
                av: 0xd0e,
                aw: 'T3Fv',
                ax: 0xf3,
                ay: '[]Y1',
                az: 0xa1f,
                aA: 0x145d,
                aB: 'NMJQ',
                aC: 0x177e,
                aD: '89Hn',
                aE: 0xdd3,
                aF: 'PSkb',
                aG: 0x804,
                aH: '[]Y1',
                aI: 0x4b4,
                aJ: 0x10b0,
                aK: 0x153a,
                aL: 'Pt3!',
                aM: 0x522,
                aN: '$BSl',
                aO: 0xca0,
                aP: 'b)3q',
                aQ: 0x199c,
                aR: 0x920,
                aS: '7NO9',
                aT: 0x3f6,
                aU: 0xf9c,
                aV: 0x1053,
                aW: 0x492,
                aX: 0xd97,
                aY: 'mRB^',
                aZ: 0xe2e,
                b0: 0xef6,
                b1: 0xe7a,
                b2: 'dn8p',
                b3: 'vel(',
                b4: 0x673,
                b5: 'dn8p',
                b6: 0xbd2,
                b7: 0x904,
                b8: 'CeJW',
                b9: 0x1a66,
                ba: 'dn8p',
                bb: 0x636,
                bc: '$p[^',
                bd: 0x1918,
                be: '7NO9',
                bf: 0xdee,
                bg: '0Ua@',
                bh: 0x7fc,
                bi: 0x1e5d,
                bj: 'GzjL',
                bk: 0x1986,
                bl: 'IcEg',
                bm: '#sM9',
                bn: 0x1e21,
                bo: 0x1d8c,
                bp: 'XITC',
                bq: 0xca7,
                br: 0x3ee,
                bs: 0x190d,
                bt: 0x1bd1,
                bu: 0xac9,
                bv: 0x1ba8,
                bw: 0x1423,
                bx: 0xc95,
                by: 'egod',
                bz: 0x2c9,
                bA: 'zs!c',
                bB: '5M6D',
                bC: 0x1116,
                bD: 'b)3q',
                bE: 0x1ce9,
                bF: 0x4f7,
                bG: 'C2T0',
                bH: 'wCGK',
                bI: 0x1776,
                bJ: 0x14bb,
                bK: 0x474,
                bL: 0xdaa,
                bM: 0x863,
                bN: '2#Qk',
                bO: '89Hn',
                bP: 'b)3q',
                bQ: '60r9',
                bR: 0x1b5b,
                bS: 0x5c1,
                bT: 'rsIZ',
                bU: 0x1154,
                bV: 0x672,
                bW: 0x19d5,
                bX: '6UCx',
                bY: 0xcc7,
                bZ: 'jODS',
                c0: 0xdec,
                c1: 'oeP*',
                c2: 0x19c8,
                c3: 'NxG1',
                c4: 0xd5b,
                c5: 0x974,
                c6: 'ZgMu',
                c7: 0x368,
                c8: 'CeJW',
                c9: '$BSl',
                ca: 0xbb5,
                cb: 'dbGg',
                cc: 0xea2,
                cd: 0x3b7,
                ce: '[]Y1',
                cf: 0x184e,
                cg: 'oeP*',
                ch: 0x19e6,
                ci: 0x10fb,
                ck: 0x8ae,
                cl: 0x17e4,
                cm: 'w(Wr',
                cn: 0x624,
                co: 0x218,
                cp: 0xf22,
                cq: 0x15c3,
                cr: 0x260,
                cs: 'XITC',
                ct: 0x15dc,
                cu: 0x1e65,
                cv: 0x1d56,
                cw: 0x1501,
                cx: 0x119a,
                cy: 0x362,
                cz: 0x291,
                cA: 0x456,
                cB: 0xa80,
                cC: '[p9(',
                cD: 0x52a,
                cE: '1qbp',
                cF: '9rQu',
                cG: 0xddc,
                cH: 0x246,
                cI: 'dbGg',
                cJ: 0x12d3,
                cK: 0x1857,
                cL: 0x3ea,
                cM: 0xc11,
                cN: 0x3ad,
                cO: 'NxG1',
                cP: 0x1c2,
                cQ: '7NO9',
                cR: 'XITC',
                cS: 0x111d,
                cT: 'vel(',
                cU: 0x7ca,
                cV: 'mRB^',
                cW: 0x151,
                cX: 0x49a,
                cY: 'mRB^',
                cZ: 'Mmsl',
                d0: 0x1334,
                d1: 0x511,
                d2: 0x17b5,
                d3: '0Ua@',
                d4: 0x1b52,
                d5: 'vel(',
                d6: 0x569,
                d7: 0x4c4,
                d8: 0x9db,
                d9: 0x1589,
                da: 'dbGg',
                db: 0x4d1,
                dc: 'n7E3',
                dd: 0x1118,
                de: 'PYt$',
                df: 'dbGg',
                dg: 0xfca,
                dh: 'jODS',
                di: '5M6D',
                dj: 0x219,
                dk: 0xb48,
                dl: 'dn8p',
                dm: 0x1aef,
                dn: 'oeP*',
                dp: 0x918,
                dq: 0x1493,
                dr: 0x1d94,
                ds: 0xd4f,
                dt: 0xb61,
                du: 0x1a41,
                dv: 0x888,
                dw: 0x1719,
                dx: 0xa25,
                dy: 0x1e81,
                dz: 0xe26,
                dA: 'NMJQ',
                dB: 0x1df,
                dC: '60r9',
                dD: 0x366,
                dE: 0x384,
                dF: 0x1bd8,
                dG: 0x11b2,
                dH: 0x1bbe,
                dI: '#sM9',
                dJ: 0x1d78,
                dK: 0x5ee,
                dL: '89Hn',
                dM: 0x109e,
                dN: 0x15d8,
                dO: 0x1c72,
                dP: 'XITC',
                dQ: 0xf95,
                dR: 'd%lH',
                dS: 0x96d,
                dT: 'vel(',
                dU: 0x17d3,
                dV: 0x12ba,
                dW: 0x4a9,
                dX: 0xa66,
                dY: 0xfc4,
                dZ: 0xabb,
                e0: 'yxI7',
                e1: 0xf6d,
                e2: 'XITC',
                e3: 0x1395,
                e4: 0x11c2,
                e5: 0x10c0,
                e6: 0x369,
                e7: 0x1b4c,
                e8: 0x1275,
                e9: 0xfbb,
                ea: '5M6D',
                eb: 0x1bc1,
                ec: 0x11d7,
                ed: 0x1091,
                ee: 0xb8a,
                ef: 0x13c1,
                eg: 0x1172,
                eh: '2#Qk',
                ei: 0x1f27,
                ej: 0x187d,
                ek: 0xf92,
                el: '8Ys%',
                em: 0x15fa,
                en: 0x191b,
                eo: '8Ys%',
                ep: 0x64e,
                eq: 0xf9d,
                er: 0x192b,
                es: '%oj0',
                et: 0x1111,
                eu: 'V#kN',
                ev: 0x1d56,
                ew: 0x1d67,
                ex: 0x16b6,
                ey: 0xdd6,
                ez: 0x93a,
                eA: 0x15a1,
                eB: '60r9',
                eC: 0x2c3,
                eD: 0x55e,
                eE: 'C2T0',
                eF: 0x21b,
                eG: '6UCx',
                eH: 0x1e23,
                eI: 0x571,
                eJ: 0x109c,
                eK: 0x1a41,
                eL: 0xf70,
                eM: 'dZbH',
                eN: 0x54e,
                eO: '89Hn',
                eP: 0x346,
                eQ: 'dn8p',
                eR: 0x1006,
                eS: 0x1184,
                eT: 0xd26,
                eU: 'dZbH',
                eV: 0xd20,
                eW: '#sM9',
                eX: '*lLT',
                eY: 0x1044,
                eZ: 0xf93,
                f0: 'Gn7Q',
                f1: 'dn8p',
                f2: 0x1acc,
                f3: 0x486,
                f4: 'Pt3!',
                f5: '7NO9',
                f6: 0x1633,
                f7: 0xb53,
                f8: 0x324,
                f9: 'egod',
                fa: 0xc94,
                fb: '$p[^',
                fc: 0x1db0,
                fd: 0x1df1,
                fe: 0x1363,
                ff: 0x143f,
                fg: 'vel(',
                fh: 0x1b25,
                fi: 'n7E3',
                fj: 0x980,
                fk: 0x113d,
                fl: 0xff7,
                fm: 0x7f8,
                fn: 'b)3q',
                fo: 'CeJW',
                fp: 0x1b0b,
                fq: 'egod',
                fr: 0x964,
                fs: '$BSl',
                ft: 0x1325,
                fu: 'NxG1',
                fv: 0x117d,
                fw: 0x183e,
                fx: 0x1160,
                fy: 'w(Wr',
                fz: 0x258,
                fA: 'Mmsl',
                fB: 'Pt3!',
                fC: 0x8d0,
                fD: 0x4cb,
                fE: '*lLT',
                fF: 'NMJQ',
                fG: 0x1ca4,
                fH: 0x19e0,
                fI: 0x41c,
                fJ: 'M5Ii',
                fK: 0x1e2,
                fL: 'egod',
                fM: 0xd12,
                fN: 'GzjL',
                fO: '6UCx',
                fP: 0x154b,
                fQ: 'dn8p',
                fR: 0x420,
                fS: 0x1cb2,
                fT: '1qbp',
                fU: 0x1031,
                fV: 0x1106,
                mT: 0x1582,
                mU: 0x180e,
                mV: '89Hn',
                mW: 0x1605,
                mX: 0x14ca,
                mY: '*lLT',
                mZ: 0x10ba,
                n0: 'GzjL',
                n1: 0xd9d,
                n2: 0xfab,
                n3: 0x1c88,
                n4: 0x1efa,
                n5: 0x1982,
                n6: 'PSkb',
                n7: 0x1ad,
                n8: 'yxI7',
                n9: 0x1016,
                na: 0x967,
                nb: '[p9(',
                nc: 0x1e34,
                nd: 0x173c,
                ne: 0x1249,
                nf: 0x12cb,
                ng: 0x145c,
                nh: 0x1796,
                ni: 0xc75,
                nj: 'IcEg',
                nk: 'CeJW',
                nl: 0xd4a,
                nm: 0x5f6,
                nn: 0x1a5c,
                no: 'n7E3',
                np: 0xf00,
                nq: 0xa18,
                nr: 0x843,
                ns: 0x1a31,
                nt: 0x19f7,
                nu: 'egod',
                nv: 0x842,
                nw: 0xf7f,
                nx: 0x146c,
                ny: 0x1046,
                nz: 0x1e01,
                nA: 0xe9b,
                nB: 'NxG1',
                nC: 0x11b5,
                nD: 0xa35,
                nE: 'mRB^',
                nF: 0x1f1,
                nG: 'n7E3',
                nH: 0xa96,
                nI: 0x167d,
                nJ: 0x9db,
                nK: 0xc1e,
                nL: 0xb48,
                nM: '5M6D',
                nN: 0x67a,
                nO: 0xdcf,
                nP: 0x14c,
                nQ: 0x15da,
                nR: 'Gn7Q',
                nS: 0x1e83,
                nT: '6UCx',
                nU: 'yxI7',
                nV: '2#Qk',
                nW: 0x1b1c,
                nX: 0x1d35,
                nY: 'M5Ii',
                nZ: 0x14ab,
                o0: 'egod',
                o1: 0x1a4b,
                o2: 'dbGg',
                o3: '6UCx',
                o4: 0x1302,
                o5: '89Hn',
                o6: 0x10c4,
                o7: 0xa87,
                o8: 'rsIZ',
                o9: 0x1728,
                oa: '6UCx',
                ob: 0x305,
                oc: 0x7a5,
                od: 'zs!c',
                oe: '$BSl',
                of: 0xd04,
                og: 0x779,
                oh: 0x15bd,
                oi: 0xaa3,
                oj: 0x823,
                ok: 0x1478,
                ol: 'dn8p',
                om: 'dZbH',
                on: '%oj0',
                oo: 0x1ede,
                op: 0xba1,
                oq: 0x407,
                or: '60r9',
                os: 0x640,
                ot: 'NxG1',
                ou: '60r9',
                ov: 0x2f5,
                ow: 0xa1a,
                ox: 'oeP*',
                oy: 0x1bd0,
                oz: 0x1f8,
                oA: 0x5aa,
                oB: 'NMJQ',
                oC: 0x1ed0,
                oD: 0x854,
                oE: 0x999,
                oF: 0x403,
                oG: 0x1c81,
                oH: 'NMJQ',
                oI: 0x168f,
                oJ: 'PSkb',
                oK: 'd%lH',
                oL: 'IcEg',
                oM: 0x108,
                oN: '#sM9',
                oO: 0x10a7,
                oP: 0xf66,
                oQ: 0x1273,
                oR: 0x174c,
                oS: 0x1510,
                oT: 0xdeb,
                oU: 'XITC',
                oV: 0x1ecb,
                oW: 'M5Ii',
                oX: 0x1bfa,
                oY: 0x640,
                oZ: 'rsIZ',
                p0: 0x1d7c,
                p1: '89Hn',
                p2: 0x1169,
                p3: 'jODS',
                p4: 0x739,
                p5: 0x96d,
                p6: 'vel(',
                p7: 0x16ea,
                p8: 0x1769,
                p9: 0x48f,
                pa: 0x4f4,
                pb: '6UCx',
                pc: 0x136f,
                pd: 0x1791,
                pe: 0x1c75,
                pf: 0x17bb,
                pg: '$BSl',
                ph: 0xd5f,
                pi: 0x14d9,
                pj: 0x17e0,
                pk: 'NMJQ',
                pl: 0x891,
                pm: 'PYt$',
                pn: 0x3eb,
                po: 0x1b2f,
                pp: 0x18b6,
                pq: 0x188e,
                pr: '6UCx',
                ps: 0x15e8,
                pt: 0x7bc,
                pu: 'w(Wr',
                pv: 0x64d,
                pw: '5M6D',
                px: 0x6d9,
                py: 0x7c1,
                pz: '8Ys%',
                pA: 0x1b81,
                pB: 'ZgMu',
                pC: 0xf35,
                pD: 0x1f14,
                pE: 0x16af,
                pF: 0xe54,
                pG: 0x1cf0,
                pH: 0x14b1,
                pI: '9rQu',
                pJ: 0x3e6,
                pK: 0x1ec5,
                pL: '8Ys%',
                pM: 0xd5e,
                pN: 'PYt$',
                pO: 0x1613,
                pP: '9rQu',
                pQ: 0xa83,
                pR: 0x1e08,
                pS: 'CeJW',
                pT: 0x1537,
                pU: 0x25a,
                pV: 'd%lH',
                pW: 0x1d0d,
                pX: 0xdbd,
                pY: 0x573,
                pZ: 'w(Wr',
                q0: 0xcf1,
                q1: 'NxG1',
                q2: 0x30e,
                q3: 'T3Fv',
                q4: 0x1fe,
                q5: 'zs!c',
                q6: 0x1840,
                q7: 0x607,
                q8: 'egod',
                q9: 0x7e2,
                qa: '9rQu',
                qb: 0xdfb,
                qc: '7NO9',
                qd: 'yxI7',
                qe: 0x1b6d,
                qf: 0x180e,
                qg: 0x16bf,
                qh: 'w(Wr',
                qi: 0x16c3,
                qj: 'IcEg',
                qk: 0x10df,
                ql: '89Hn',
                qm: 0x616,
                qn: 'M5Ii',
                qo: 'T3Fv',
                qp: 0x17b9,
                qq: 0xad5,
                qr: 'C2T0',
                qs: 'egod',
                qt: 0xe0f,
                qu: 0x1492,
                qv: 'PYt$',
                qw: 0x1134,
                qx: 0x40e,
                qy: 0x655,
                qz: 'n7E3',
                qA: 0x825,
                qB: 0x104e,
                qC: 0xf5a,
                qD: 0x401,
                qE: 0x1129,
                qF: 'PYt$',
                qG: 0x12b3,
                qH: '89Hn',
                qI: 0x1865,
                qJ: '0Ua@',
                qK: 0x6db,
                qL: '#sM9',
                qM: 'vel(',
                qN: 0x13a9,
                qO: 0x131c,
                qP: 'Pt3!',
                qQ: 'oeP*',
                qR: 'vel(',
                qS: 0x1254,
                qT: 0xd91,
                qU: 'egod',
                qV: 'M5Ii',
                qW: 0x1c8b,
                qX: 0x2f8,
                qY: 0x1042,
                qZ: 0x689,
                r0: '9rQu',
                r1: 0x1cda,
                r2: 'NMJQ',
                r3: 0xc8f,
                r4: '1qbp',
                r5: '5M6D',
                r6: 0xe94,
                r7: 'w(Wr',
                r8: '2#Qk',
                r9: 0x404,
                ra: 'dn8p',
                rb: 0xb2d,
                rc: 0x99e,
                rd: 0x103,
                re: 0x1ec2,
                rf: 0x196b,
                rg: 0x1b0e,
                rh: 0xe43,
                ri: 0x1279,
                rj: 'dbGg',
                rk: 0x16e5,
                rl: 0x5ff,
                rm: 'dbGg',
                rn: 0x125,
                ro: 0x1056,
                rp: 0x5b7,
                rq: 0x1546,
                rr: 0x1a97,
                rs: 0x1a0c,
                rt: 0x1352,
                ru: '89Hn',
                rv: 'yxI7',
                rw: 0xa92,
                rx: '6UCx',
                ry: 0x14ec,
                rz: 'GzjL',
                rA: 0x4ea,
                rB: 0x110,
                rC: 'd%lH',
                rD: 'ZgMu',
                rE: 0x437,
                rF: 0x6b9,
                rG: 0xe03,
                rH: '6UCx',
                rI: 'dbGg',
                rJ: 0x1953,
                rK: 0x7e2,
                rL: 0xb15,
                rM: 0x15c6,
                rN: 0x1801,
                rO: 0x1a05,
                rP: 0x1413,
                rQ: 0x1699,
                rR: '$p[^',
                rS: 0x7ec,
                rT: 'Mmsl',
                rU: 0x1a80,
                rV: 0x1e3a,
                rW: '60r9',
                rX: 0x16dc,
                rY: 0x1ef0,
                rZ: '$BSl',
                s0: 0x1183,
                s1: 0x2dd,
                s2: 0xa88,
                s3: 0x4da,
                s4: 'IcEg',
                s5: '8Ys%',
                s6: 0x19ce,
                s7: 0x1bf2,
                s8: 0xef0,
                s9: 'oeP*',
                sa: 0x1d53,
                sb: 0x1052,
                sc: 0x323,
                sd: '%oj0',
                se: 0x746,
                sf: '$p[^',
                sg: 0x39c,
                sh: 0x1bbb,
                si: 0x1b9e,
                sj: '8Ys%',
                sk: 0x437,
                sl: 0x10f3,
                sm: 'vel(',
                sn: 'dbGg',
                so: 0x1d83,
                sp: 'Pt3!',
                sq: 0x178f,
                sr: 'V#kN',
                ss: 0x1d07,
                st: 0x1c45,
                su: 0x1593,
                sv: 0x1aff,
                sw: '*lLT',
                sx: 0x12d9,
                sy: 'mRB^',
                sz: 0x17ee,
                sA: 'vel(',
                sB: 0x11fb,
                sC: 0x443,
                sD: 0x7ee,
                sE: 0x42f,
                sF: 0x7e7,
                sG: 0x1aa3,
                sH: 'vel(',
                sI: 0x666,
                sJ: 0x778,
                sK: 'Gn7Q',
                sL: 0x1afe,
                sM: 0x7cc,
                sN: 'jODS',
                sO: 0x173b,
                sP: '[]Y1',
                sQ: 0x958,
                sR: 0x598,
                sS: 0x1655,
                sT: '[]Y1',
                sU: 0x15b2,
                sV: 0xa20,
                sW: 0x16a6,
                sX: 'XITC',
                sY: 0x4db,
                sZ: 0x8aa,
                t0: 'wCGK',
                t1: 0x225,
                t2: 'rsIZ',
                t3: 0x19de,
                t4: 0x1e92,
                t5: '5M6D',
                t6: 0xf0e,
                t7: '6UCx',
                t8: 'ZgMu',
                t9: 'Pt3!',
                ta: 0x145,
                tb: 0x1bcf,
                tc: 0x1259,
                td: 'w(Wr',
                te: 0x1b43,
                tf: 'vel(',
                tg: 0x197f,
                th: 0xef8,
                ti: 0x546,
                tj: 'V#kN',
                tk: 0x9e9,
                tl: 0x339,
                tm: 'GzjL',
                tn: 0xb95,
                to: 'NMJQ',
                tp: 0x1dd6,
                tq: '6UCx',
                tr: 0x1cf9,
                ts: 0xc69,
                tt: 0x1ea3,
                tu: 0x13a1,
                tv: 0x2f2,
                tw: 'w(Wr',
                tx: 0xfe1,
                ty: 0x1b15,
                tz: 0x15f,
                tA: 0xc44,
                tB: 0xb3c,
                tC: 0xa2c,
                tD: 0xb89,
                tE: 'egod',
                tF: 0x1de6,
                tG: 'Gn7Q',
                tH: 0x1d79,
                tI: 0x1b58,
                tJ: 0xcf6,
                tK: 0x212,
                tL: 0x396,
                tM: 0x874,
                tN: 0x114a,
                tO: 'oeP*',
                tP: 0x1b79,
                tQ: 0x5d7,
                tR: 0x1787,
                tS: 0x1daa,
                tT: 0x1ab5,
                tU: 'egod',
                tV: 0x144c,
                tW: 0x1e9c,
                tX: 'dbGg',
                tY: 0x197b,
                tZ: 0x378,
                u0: 'NxG1',
                u1: 0x1916,
                u2: 0x3a7,
                u3: 0xfb1,
                u4: 'Mmsl',
                u5: 0x1204,
                u6: 'mRB^',
                u7: 0xbdd,
                u8: 'Pt3!',
                u9: 0xc07,
                ua: 'rsIZ',
                ub: 0x15d,
                uc: 'jODS',
                ud: 0x1b18,
                ue: 0x1b78,
                uf: 0x18bf,
                ug: '[p9(',
                uh: 0x128d,
                ui: 0x16a,
                uj: 0x1cf9,
                uk: 0x52b,
                ul: 0x1a8c,
                um: 0x460,
                un: 0x1443,
                uo: 0x1d11,
                up: 0x1f16,
                uq: 0x982,
                ur: 'zs!c',
                us: '*lLT',
                ut: 0xf0,
                uu: 0x1298,
                uv: 'NxG1',
                uw: 0x14e,
                ux: 'Mmsl',
                uy: 0x1593,
                uz: 0x785,
                uA: 0x8f3,
                uB: '6UCx',
                uC: 0x1b0e,
                uD: 0x1023,
                uE: 'NMJQ',
                uF: 0x14a0,
                uG: 0xd29,
                uH: 'Mmsl',
                uI: 0x1aa9,
                uJ: 0x2b4,
                uK: 0x840,
                uL: 'C2T0',
                uM: 'PSkb',
                uN: 0x4b6,
                uO: 0x223,
                uP: 0x97f,
                uQ: 'zs!c',
                uR: 0x993,
                uS: 0x1c3e,
                uT: '%oj0',
                uU: 0x13fe,
                uV: 0x1ce,
                uW: '%oj0',
                uX: 0x666,
                uY: '7NO9',
                uZ: 0x1cea,
                v0: 0x1c7e,
                v1: 0x45f,
                v2: 0x1118,
                v3: '[p9(',
                v4: 0x86b,
                v5: 0x185,
                v6: 0xac0,
                v7: 0x968,
                v8: 0x10a0,
                v9: 0x1d86,
                va: 'Mmsl',
                vb: 0x19ea,
                vc: 'T3Fv',
                vd: 0x1675,
                ve: 0x12cc,
                vf: 'GzjL',
                vg: 0x13d6,
                vh: 'C2T0',
                vi: 'IcEg',
                vj: 0xc60,
                vk: 'PYt$',
                vl: 0x128c,
                vm: 0x108b,
                vn: '60r9',
                vo: 0x10ba,
                vp: 'GzjL',
                vq: 0xf7e,
                vr: 'dn8p',
                vs: 0x103c,
                vt: 'd%lH',
                vu: 0x75e,
                vv: 0x180,
                vw: '#sM9',
                vx: 0x3d5,
                vy: 0xe76,
                vz: '5M6D',
                vA: 'M5Ii',
                vB: 0x1866,
                vC: 0x1f1e,
                vD: 'egod',
                vE: '%oj0',
                vF: 0x591,
                vG: 0x13e0,
                vH: 'Pt3!',
                vI: 'vel(',
                vJ: 'rsIZ',
                vK: 0x7f9,
                vL: '8Ys%',
                vM: 0x2d6,
                vN: 0x1479,
                vO: 0x13f9,
                vP: 'M5Ii',
                vQ: 0x10ce,
                vR: 0x137d,
                vS: 0x174d,
                vT: 0xbc9,
                vU: 'dZbH',
                vV: 'GzjL',
                vW: 0x400,
                vX: '2#Qk',
                vY: 0x834,
                vZ: '$BSl',
                w0: 0x516,
                w1: '6UCx',
                w2: 0x13f5,
                w3: 'dZbH',
                w4: '8Ys%',
                w5: 0x1a92,
                w6: 0x503,
                w7: 'w(Wr',
                w8: 0x155f,
                w9: 0x2da,
                wa: 0xf18,
                wb: 0xe5e,
                wc: 0x98e,
                wd: '9rQu',
                we: 0x17e2,
                wf: 0x190a,
                wg: 'GzjL',
                wh: 0xfc7,
                wi: 0x1140,
                wj: '$p[^',
                wk: '5M6D',
                wl: 0x14d0,
                wm: 'wCGK',
                wn: 0x1e3,
                wo: 0x10d0,
                wp: 0x14de,
                wq: 0x80e,
                wr: 0x1b40,
                ws: 'Gn7Q',
                wt: '9rQu',
                wu: 0xc12,
                wv: 0x48a,
                ww: 0x11ea,
                wx: 0x631,
                wy: '#sM9',
                wz: 0x9d5,
                wA: 0x7b9,
                wB: 0x1347,
                wC: 0x1499,
                wD: 0x1808,
                wE: 0x1f0d,
                wF: 0x15bf,
                wG: 'GzjL',
                wH: 0x17e3,
                wI: 0x1e81,
                wJ: 0x5b4,
                wK: 'XITC',
                wL: 0x120f,
                wM: 0x12a9,
                wN: '8Ys%',
                wO: 'IcEg',
                wP: 0xea1,
                wQ: '8Ys%',
                wR: 0x64b,
                wS: 0xab8,
                wT: 'PYt$',
                wU: 0x1996,
                wV: 'dbGg',
                wW: 0x267,
                wX: 0xb3f,
                wY: 0xaec,
                wZ: '$p[^',
                x0: 0x462,
                x1: 0x196f,
                x2: 'XITC',
                x3: 0x1346,
                x4: 'w(Wr',
                x5: '#sM9',
                x6: 'd%lH',
                x7: '1qbp',
                x8: 0x718,
                x9: 0x9a3,
                xa: '7NO9',
                xb: '6UCx',
                xc: 0x11b6,
                xd: 'GzjL',
                xe: 'jODS',
                xf: 0x1699,
                xg: 0x16a3,
                xh: 0x1a39,
                xi: 0x1edb,
                xj: 0x7eb,
                xk: 0x1834,
                xl: 'dZbH',
                xm: 0x211,
                xn: 'wCGK',
                xo: 0xc9c,
                xp: 0x135,
                xq: 0x5e9,
                xr: 0xc40,
                xs: 0xfec,
                xt: 0xf4d,
                xu: 0x3c9,
                xv: '6UCx',
                xw: '#sM9',
                xx: 'zs!c',
                xy: 0x1063,
                xz: 'dZbH',
                xA: 0xfbd,
                xB: 0x101,
                xC: '$BSl',
                xD: 0x1413,
                xE: 0x8ec,
                xF: 0xf36,
                xG: 0x1ef4,
                xH: '8Ys%',
                xI: 0xf48,
                xJ: 0x8a6,
                xK: 'zs!c',
                xL: 0x1029,
                xM: 'IcEg',
                xN: 0x2fc,
                xO: 0x11bb,
                xP: 0xf34,
                xQ: 0x64a,
                xR: 0x7e1,
                xS: '6UCx',
                xT: 0x831,
                xU: 0x1522,
                xV: '#sM9',
                xW: 'wCGK',
                xX: 0x1c01,
                xY: 'C2T0',
                xZ: 0x19bd,
                y0: 'Pt3!',
                y1: 0x12b9,
                y2: 'rsIZ',
                y3: 0x12d8,
                y4: 0xb6e,
                y5: 0x1816,
                y6: 0x2e3,
                y7: '6UCx',
                y8: 0x1aa2,
                y9: 'Pt3!',
                ya: 0x2e4,
                yb: 'V#kN',
                yc: 0xa19,
                yd: 'IcEg',
                ye: '%oj0',
                yf: 0x1e38,
                yg: 'yxI7',
                yh: 0xe60,
                yi: 0x5e2,
                yj: 0x149,
                yk: '[]Y1',
                yl: 0x37d,
                ym: '89Hn',
                yn: 0x129b,
                yo: 0x821,
                yp: 0xb1d,
                yq: 'GzjL',
                yr: 0x1dfe,
                ys: 0x1af5,
                yt: 0x89c,
                yu: '6UCx',
                yv: 0x4a5,
                yw: 0xbf2,
                yx: 0x1441,
                yy: 'w3Tt',
                yz: 0x1816,
                yA: 0x538,
                yB: 'V#kN',
                yC: 0xd89,
                yD: 0xa9f,
                yE: 0x111f,
                yF: 0xbda,
                yG: 0x11c,
                yH: 0x1ce2,
                yI: 'w(Wr',
                yJ: 0x4c6,
                yK: 'IcEg',
                yL: 0xc24,
                yM: 0x415,
                yN: 0x1d60,
                yO: 'Gn7Q',
                yP: '6UCx',
                yQ: 'w(Wr',
                yR: 0xb6f,
                yS: 0x450,
                yT: 0xcb5,
                yU: '[p9(',
                yV: 0x1757,
                yW: 'ZgMu',
                yX: 0x8ed,
                yY: 'vel(',
                yZ: 0x539,
                z0: 'jODS',
                z1: 0x2f1,
                z2: 0x1d72,
                z3: '5M6D',
                z4: 0x18b5,
                z5: 'XITC',
                z6: 0x1a2,
                z7: 0x309,
                z8: '$BSl',
                z9: 0xbb4,
                za: 'T3Fv',
                zb: 'rsIZ',
                zc: 0x1943,
                zd: 0xbed,
                ze: 'XITC',
                zf: 0x20a,
                zg: 0x19a4,
                zh: 'egod',
                zi: 0x56e,
                zj: 'vel(',
                zk: 0x1d57,
                zl: 0xb37,
                zm: 0x12a0,
                zn: '[p9(',
                zo: 0x1c53,
                zp: 0x10d6,
                zq: 0x1d92,
                zr: 0x7c0,
                zs: 0x9bf,
                zt: '89Hn',
                zu: 'zs!c',
                zv: 0x969,
                zw: 0x155a,
                zx: 0x9bf,
                zy: 0xae2,
                zz: 0xfc7,
                zA: 'Mmsl',
                zB: 0xceb,
                zC: 'PSkb',
                zD: 0x1a4c,
                zE: 0x1bd3,
                zF: 0x1db1,
                zG: '1qbp',
                zH: 0x167b,
                zI: 0x1d91,
                zJ: 0x10c7,
                zK: 0x1d05,
                zL: 'T3Fv',
                zM: 0x108a,
                zN: 'PYt$',
                zO: 'M5Ii',
                zP: 0xe1f,
                zQ: 'dbGg',
                zR: 'oeP*',
                zS: 0x9c9,
                zT: 0xef7,
                zU: 0xb44,
                zV: 0x1649,
                zW: 0xd87,
                zX: 0xde1,
                zY: 'w3Tt',
                zZ: 0x11fa,
                A0: 0x1cb7,
                A1: '$BSl',
                A2: 'dbGg',
                A3: 0xbf2,
                A4: 0x9b6,
                A5: 0x1f05,
                A6: 0x839,
                A7: 0x1ae,
                A8: '#sM9',
                A9: 0x1e1f,
                Aa: 0x106b,
                Ab: 'dbGg',
                Ac: 'oeP*',
                Ad: 0x11ae,
                Ae: '9rQu',
                Af: 0x89e,
                Ag: 0x606,
                Ah: 0x69c,
                Ai: 'yxI7',
                Aj: 0x1ca7,
                Ak: 0xf19,
                Al: 'Pt3!',
                Am: 0x1552,
                An: 0xbfa,
                Ao: 'b)3q',
                Ap: 0x1b06,
                Aq: 0xe68,
                Ar: 0x1d93,
                As: 0xeed,
                At: 'yxI7',
                Au: 'Gn7Q',
                Av: 0x10b1,
                Aw: 'w(Wr',
                Ax: 0x2a6,
                Ay: 0x915,
                Az: 0x74b,
                AA: 0xf49,
                AB: 0x10e1,
                AC: 0x1268,
                AD: 0x5da,
                AE: 'b)3q',
                AF: 0x524,
                AG: 0xb9b,
                AH: 0x805,
                AI: 0xd3e,
                AJ: 0xa1a,
                AK: 'ZgMu',
                AL: 0x1817,
                AM: 0xeda,
                AN: 'C2T0',
                AO: 0x73d,
                AP: 'w(Wr',
                AQ: '0Ua@',
                AR: 0xf29,
                AS: 0x1451,
                AT: 0x284,
                AU: 0x1d4c,
                AV: 'yxI7',
                AW: 0x10bf,
                AX: 'n7E3',
                AY: '[]Y1',
                AZ: 0x1802,
                B0: 0xddf,
                B1: 'egod',
                B2: 0x1c17,
                B3: 'dn8p',
                B4: 0xfac,
                B5: 0x10c2,
                B6: '5M6D',
                B7: 0x1c00,
                B8: 'GzjL',
                B9: 0xb8a,
                Ba: 0x313,
                Bb: 0x169a,
                Bc: 'Mmsl',
                Bd: '[p9(',
                Be: 0x7a7,
                Bf: 'mRB^',
                Bg: 0xde0,
                Bh: 'zs!c',
                Bi: 'ZgMu',
                Bj: 0x1ad9,
                Bk: 0x108e,
                Bl: 'yxI7',
                Bm: 0x1970,
                Bn: 'vel(',
                Bo: 0x1e9a,
                Bp: 0x16c1,
                Bq: 'dZbH',
                Br: 0x49d,
                Bs: 0x1d63,
                Bt: 0xfac,
                Bu: 0x723,
                Bv: 0x66b,
                Bw: '#sM9',
                Bx: 0x7c5,
                By: 0x1ba7,
                Bz: 0x1594,
                BA: 0x6e4,
                BB: 0x966,
                BC: 0x1334,
                BD: 'ZgMu',
                BE: 0x401,
                BF: 'NMJQ',
                BG: 0x1db6,
                BH: 0xea7,
                BI: 0xcab,
                BJ: 'oeP*',
                BK: 0x1394,
                BL: 0x1267,
                BM: 0x153b,
                BN: 0xf1b,
                BO: 0x2ef,
                BP: 'n7E3',
                BQ: 0x1aba,
                BR: 0x1b82,
                BS: 0x1626,
                BT: 'wCGK',
                BU: 'PSkb',
                BV: 0xc97,
                BW: 0x2c3
            },
            mR = { c: 0x1348, f: '*lLT', g: 0x1a16, h: '8Ys%', i: 0x1526 },
            mP = { c: 0xa12 },
            mO = { c: '*lLT', f: '8Ys%', g: 0x7d4, h: 'b)3q', i: 0x19b6, j: 'wCGK', k: 'yxI7', l: 0x1179, m: 'oeP*', n: 0x631, o: '#sM9', p: 0x13de, q: 'dZbH', r: 0x1787, s: '$p[^', t: 0xc16, u: '8Ys%', v: 'jODS', w: 0x1104, x: '9rQu', y: 0x16e1, z: 'dbGg', A: 0xcae, B: '[]Y1', C: 'GzjL', D: 'dn8p', E: '6UCx', F: 0xbe5, G: 'dbGg', H: 0x2db, I: 'M5Ii', J: 0xa37, K: 0x97e, L: '[p9(', M: '5M6D', N: 0x19db, O: 'Pt3!', P: 0x67f, Q: 'w3Tt', R: 0x1ab0, S: 0x58f, T: 0x5da, U: 'Mmsl', V: 0x11cc, W: 'zs!c', X: 'zs!c', Y: 0x1bc1, Z: 0x6c8, a0: 0x1c3a, a1: '89Hn', a2: 'CeJW', a3: 0x9f1, a4: 0x19ae, a5: 0x204, a6: 0xdfa, a7: 'dZbH', a8: 0x947, a9: 0x1a38, aa: 0x1651, ab: 0x1d8e, ac: 0x179f, ad: 0x1a2c, ae: 0x11a1, af: 'dn8p' },
            mN = { c: 0x11d6 },
            g4 = fX;
            const fX = b;
(function(c, f) {
    const mF = {
        c: 0x9c7,
        f: 0xdf7,
        g: 'NMJQ',
        h: 'Gn7Q',
        i: 0x14f2,
        j: 'XITC',
        k: '89Hn',
        l: 0x1673,
        m: 0xec2,
        n: 'yxI7',
        o: 0x13b5,
        p: 'wCGK',
        q: 0x8ef,
        r: 0x1511,
        s: 0xc8b,
        t: 0x1835
    },
    fW = b,
    g = c();
    while (!![]) {
        try {
            const h = -parseInt(fW(mF.c, 'IcEg')) / 0x1 * (parseInt(fW(mF.f, mF.g)) / 0x2) + parseInt(fW(0x1929, mF.h)) / 0x3 * (-parseInt(fW(mF.i, mF.j)) / 0x4) + -parseInt(fW(0xe11, mF.k)) / 0x5 + -parseInt(fW(mF.l, 'd%lH')) / 0x6 * (-parseInt(fW(mF.m, mF.n)) / 0x7) + -parseInt(fW(mF.o, mF.p)) / 0x8 + -parseInt(fW(mF.q, '9rQu')) / 0x9 * (-parseInt(fW(mF.r, '7NO9')) / 0xa) + parseInt(fW(mF.s, 'Mmsl')) / 0xb * (parseInt(fW(mF.t, 'n7E3')) / 0xc);
            if (h === f) break;
            else g['push'](g['shift']());
        } catch (i) {
            g['push'](g['shift']());
        }
    }
}(a, 0x1d218));

let cfSocketConnect = null;
try {
    import(fX(0x1b57, 'T3Fv'))[fX(0x1600, 'zs!c')](c => {
        const mG = { c: 'NxG1', f: 'vel(' },
        fY = fX;
        if (c && typeof c[fY(0x6b1, mG.c)] === fY(0x8d2, '*lLT')) cfSocketConnect = c[fY(0x1dc0, mG.f)];
    })[fX(0x9c6, 'yxI7')](() => {});
} catch (d) {}

const Version = fX(0x900, 'dZbH');
let config_JSON, proxyIP = '',
    enableSocks5Proxy = null,
    enableSocks5GlobalProxy = ![],
    mySocks5Account = '',
    parsedSocks5Address = {},
    cachedSocks5Whitelist = null,
    cachedProxyIP,
    cachedProxyResolvedArray,
    cachedProxyArrayIndex = 0x0,
    enableProxyFallback = !![],
    debugLogPrint = ![],
    connProxyWhitelist = [];

function hostMatchesProxyList(c) {
    const mJ = { c: 0xfba, f: '9rQu' },
    mI = { c: 0xa8b, f: 'egod', g: 0x16e1, h: '2#Qk' },
    fZ = fX,
    f = connProxyWhitelist[fZ(0x1ea4, 'XITC')] ? SOCKS5whitelist[fZ(mJ.c, mJ.f)](connProxyWhitelist) : SOCKS5whitelist;
    return f[fZ(0x1095, '6UCx')](g => {
        const g0 = fZ;
        try {
            return new RegExp('^' + String(g)[g0(mI.c, 'vel(')]()[g0(0xa43, mI.f)](/\*/g, '.*') + '$', 'i')[g0(mI.g, mI.h)](c);
        } catch (h) {
            return ![];
        }
    });
}
let nat64Config = '',
    cachedNat64Prefixes = null,
    cachedNat64At = 0x0,
    cachedNat64Src = '',
    networkSettings = null,
    cachedNetworkSettings = null,
    cachedNetworkSettingsAt = 0x0,
    cachedAdminPass = null,
    cachedAdminPassAt = 0x0;
const _CFG_KEY = fX(0xffc, 'ZgMu');
let _cfgRaw = null,
    _cfgRawAt = 0x0;

async function getConfigRaw(c) {
    const mK = { c: 'CeJW', f: 0x16c4 },
    g1 = fX;
    if (_cfgRaw !== null && Date[g1(0x1d80, 'egod')]() - _cfgRawAt < 0x7530) return _cfgRaw;
    try {
        _cfgRaw = c['KV'] && typeof c['KV'][g1(0x14be, mK.c)] === g1(mK.f, '[p9(') ? await c['KV'][g1(0xb3b, 'NMJQ')](_CFG_KEY) : null;
        _cfgRawAt = Date[g1(0xecf, '60r9')]();
    } catch (f) {}
    return _cfgRaw;
}

function putConfig(c, f) {
    const mL = { c: 0x1ee2 },
    g2 = fX;
    return _cfgRaw = f, _cfgRawAt = Date[g2(0x1af6, '9rQu')](), c['KV'][g2(mL.c, 'w(Wr')](_CFG_KEY, f);
}
let cachedWorkerUUID = null,
    cachedWorkerUUIDAt = 0x0,
    savedUsersAuth = null,
    savedUsersAuthAt = 0x0,
    lastCentralSync = 0x0,
    SOCKS5whitelist = [fX(0x17bf, 'wCGK'), fX(0x122b, 'Pt3!'), fX(0x133d, 'yxI7'), fX(0x207, 'rsIZ'), fX(0xa81, 'jODS')],
    PagesstaticPages = fX(0x17e6, 'rsIZ');
globalThis[fX(0x1107, '6UCx')] = Date[fX(0x7ec, '0Ua@')]();
const SESSION_MAX_AGE_MS = 0x5265c00,
    LOGIN_MAX_ATTEMPTS = 0x8,
    LOGIN_WINDOW_MS = 0x927c0,
    LOGIN_BLOCK_MS = 0xdbba0,
    __loginAttempts = new Map(),
    WSearlyDataMaxBytes = 0x8 * 0x400,
    WSearlyDataMaxHeaderLength = Math[fX(0x1d23, 'vel(')](WSearlyDataMaxBytes * 0x4 / 0x3) + 0x4,
    upstreamBatchTargetBytes = 0x40 * 0x400,
    upstreamQueueMaxBytes = 0x20 * 0x400 * 0x400,
    upstreamQueueMaxItems = 0x2000,
    downstreamGrainChunkBytes = 0x40 * 0x400,
    downstreamGrainTailThreshold = 0x200,
    downstreamGrainSilentMs = 0x0,
    TCPconcurrentDialCount = 0x4,
    uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    NODE_ADDR_REGEX = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/,
    TAAKAA_REPO_RAW = fX(0x1032, '*lLT'),
    TAAKAA_VERSION_URL = TAAKAA_REPO_RAW + fX(0x912, 'wCGK'),
    TAAKAA_WORKER_SRC_FALLBACK = TAAKAA_REPO_RAW + fX(0x27b, '9rQu');

function versionGreater(c, f) {
    const mM = { c: '*lLT', f: 0x14de, g: 0x1c8d, h: 0x1b72, i: 0x272, j: 'b)3q', k: 0x1de2, l: '2#Qk', m: 'M5Ii', n: 0xfd3 },
    g3 = fX,
    g = String(c || '')[g3(0x5da, 'Mmsl')](/^[vV]/,'')[g3(0x1df, mM.c)]('.')[g3(mM.f, '9rQu')](j => parseInt(j, 0xa) || 0x0),
    h = String(f || '')[g3(mM.g, 'dbGg')](/^[vV]/,'')[g3(mM.h, 'n7E3')]('.')[g3(mM.i, mM.j)](j => parseInt(j, 0xa) || 0x0);
    for (let j = 0x0; j < Math[g3(mM.k, mM.l)](g[g3(0x1d2d, mM.m)], h[g3(mM.n, 'Mmsl')]); j++) {
        const k = g[j] || 0x0,
            l = h[j] || 0x0;
        if (k > l) return !![];
        if (k < l) return ![];
    }
    return ![];
}
            let cachedAutoKey = null;
const _md5md5Cache = new Map(),
    _sha224Cache = new Map();
let _kvMigratedFlag = ![],
    cachedCfUsage = null,
    cachedCfUsageAt = 0x0;
const _cidrListCache = new Map(),
    taakaaXiWorker = {
        async 'fetch'(f, g, h) {
            const mS = {
                c: 0xf41,
                f: '%oj0',
                g: 0x56b,
                h: 0x14c1,
                i: 'egod',
                j: 0x659,
                k: 0x10b9,
                l: '60r9',
                m: 'Mmsl',
                n: 0x1a49,
                o: 0xff8,
                p: '*lLT',
                q: 0x968,
                r: 0x1556,
                s: 'NMJQ',
                t: 0x1489,
                u: 'b)3q',
                v: 0x15eb,
                w: 'IcEg',
                x: 0x318,
                y: 0xf4,
                z: 'Pt3!',
                A: 0x1d1,
                B: '8Ys%',
                C: 0x1e4,
                D: 0x560,
                E: 0x625,
                F: 'PYt$',
                G: 0x12f8,
                H: 'oeP*',
                I: 0xc33,
                J: 'Gn7Q',
                K: 0x8ad,
                L: '9rQu',
                M: 0x9df,
                N: 'dn8p',
                O: 'jODS',
                P: 0xe6f,
                Q: 0x14cd,
                R: 'oeP*',
                S: 'PSkb',
                T: 0x14bf,
                U: 'ZgMu',
                V: 0x1ebc,
                W: 'w3Tt',
                X: 0x187b,
                Y: 'Gn7Q',
                Z: '*lLT',
                a0: 0x14be,
                a1: 0x2df,
                a2: 0x1e11,
                a3: 'CeJW',
                a4: 0x11b2,
                a5: 0x367,
                a6: 0x6e3,
                a7: 0x1d0f,
                a8: '7NO9',
                a9: 0x1140,
                aa: 0x1cd6,
                ab: 0xb3b,
                ac: 0x47d,
                ad: 'jODS',
                ae: 'oeP*',
                af: 0x18d5,
                ag: 0x40a,
                ah: '6UCx',
                ai: 0x11af,
                aj: 'yxI7',
                ak: 'M5Ii',
                al: 0x9cc,
                am: '$p[^',
                an: 0xc84,
                ao: 0x473,
                ap: 'V#kN',
                aq: 'dZbH',
                ar: 0x481,
                as: 'CeJW',
                at: 0x1991,
                au: 0xef3,
                av: 0xd0e,
                aw: 'T3Fv',
                ax: 0xf3,
                ay: '[]Y1',
                az: 0xa1f,
                aA: 0x145d,
                aB: 'NMJQ',
                aC: 0x177e,
                aD: '89Hn',
                aE: 0xdd3,
                aF: 'PSkb',
                aG: 0x804,
                aH: '[]Y1',
                aI: 0x4b4,
                aJ: 0x10b0,
                aK: 0x153a,
                aL: 'Pt3!',
                aM: 0x522,
                aN: '$BSl',
                aO: 0xca0,
                aP: 'b)3q',
                aQ: 0x199c,
                aR: 0x920,
                aS: '7NO9',
                aT: 0x3f6,
                aU: 0xf9c,
                aV: 0x1053,
                aW: 0x492,
                aX: 0xd97,
                aY: 'mRB^',
                aZ: 0xe2e,
                b0: 0xef6,
                b1: 0xe7a,
                b2: 'dn8p',
                b3: 'vel(',
                b4: 0x673,
                b5: 'dn8p',
                b6: 0xbd2,
                b7: 0x904,
                b8: 'CeJW',
                b9: 0x1a66,
                ba: 'dn8p',
                bb: 0x636,
                bc: '$p[^',
                bd: 0x1918,
                be: '7NO9',
                bf: 0xdee,
                bg: '0Ua@',
                bh: 0x7fc,
                bi: 0x1e5d,
                bj: 'GzjL',
                bk: 0x1986,
                bl: 'IcEg',
                bm: '#sM9',
                bn: 0x1e21,
                bo: 0x1d8c,
                bp: 'XITC',
                bq: 0xca7,
                br: 0x3ee,
                bs: 0x190d,
                bt: 0x1bd1,
                bu: 0xac9,
                bv: 0x1ba8,
                bw: 0x1423,
                bx: 0xc95,
                by: 'egod',
                bz: 0x2c9,
                bA: 'zs!c',
                bB: '5M6D',
                bC: 0x1116,
                bD: 'b)3q',
                bE: 0x1ce9,
                bF: 0x4f7,
                bG: 'C2T0',
                bH: 'wCGK',
                bI: 0x1776,
                bJ: 0x14bb,
                bK: 0x474,
                bL: 0xdaa,
                bM: 0x863,
                bN: '2#Qk',
                bO: '89Hn',
                bP: 'b)3q',
                bQ: '60r9',
                bR: 0x1b5b,
                bS: 0x5c1,
                bT: 'rsIZ',
                bU: 0x1154,
                bV: 0x672,
                bW: 0x19d5,
                bX: '6UCx',
                bY: 0xcc7,
                bZ: 'jODS',
                c0: 0xdec,
                c1: 'oeP*',
                c2: 0x19c8,
                c3: 'NxG1',
                c4: 0xd5b,
                c5: 0x974,
                c6: 'ZgMu',
                c7: 0x368,
                c8: 'CeJW',
                c9: '$BSl',
                ca: 0xbb5,
                cb: 'dbGg',
                cc: 0xea2,
                cd: 0x3b7,
                ce: '[]Y1',
                cf: 0x184e,
                cg: 'oeP*',
                ch: 0x19e6,
                ci: 0x10fb,
                ck: 0x8ae,
                cl: 0x17e4,
                cm: 'w(Wr',
                cn: 0x624,
                co: 0x218,
                cp: 0xf22,
                cq: 0x15c3,
                cr: 0x260,
                cs: 'XITC',
                ct: 0x15dc,
                cu: 0x1e65,
                cv: 0x1d56,
                cw: 0x1501,
                cx: 0x119a,
                cy: 0x362,
                cz: 0x291,
                cA: 0x456,
                cB: 0xa80,
                cC: '[p9(',
                cD: 0x52a,
                cE: '1qbp',
                cF: '9rQu',
                cG: 0xddc,
                cH: 0x246,
                cI: 'dbGg',
                cJ: 0x12d3,
                cK: 0x1857,
                cL: 0x3ea,
                cM: 0xc11,
                cN: 0x3ad,
                cO: 'NxG1',
                cP: 0x1c2,
                cQ: '7NO9',
                cR: 'XITC',
                cS: 0x111d,
                cT: 'vel(',
                cU: 0x7ca,
                cV: 'mRB^',
                cW: 0x151,
                cX: 0x49a,
                cY: 'mRB^',
                cZ: 'Mmsl',
                d0: 0x1334,
                d1: 0x511,
                d2: 0x17b5,
                d3: '0Ua@',
                d4: 0x1b52,
                d5: 'vel(',
                d6: 0x569,
                d7: 0x4c4,
                d8: 0x9db,
                d9: 0x1589,
                da: 'dbGg',
                db: 0x4d1,
                dc: 'n7E3',
                dd: 0x1118,
                de: 'PYt$',
                df: 'dbGg',
                dg: 0xfca,
                dh: 'jODS',
                di: '5M6D',
                dj: 0x219,
                dk: 0xb48,
                dl: 'dn8p',
                dm: 0x1aef,
                dn: 'oeP*',
                dp: 0x918,
                dq: 0x1493,
                dr: 0x1d94,
                ds: 0xd4f,
                dt: 0xb61,
                du: 0x1a41,
                dv: 0x888,
                dw: 0x1719,
                dx: 0xa25,
                dy: 0x1e81,
                dz: 0xe26,
                dA: 'NMJQ',
                dB: 0x1df,
                dC: '60r9',
                dD: 0x366,
                dE: 0x384,
                dF: 0x1bd8,
                dG: 0x11b2,
                dH: 0x1bbe,
                dI: '#sM9',
                dJ: 0x1d78,
                dK: 0x5ee,
                dL: '89Hn',
                dM: 0x109e,
                dN: 0x15d8,
                dO: 0x1c72,
                dP: 'XITC',
                dQ: 0xf95,
                dR: 'd%lH',
                dS: 0x96d,
                dT: 'vel(',
                dU: 0x17d3,
                dV: 0x12ba,
                dW: 0x4a9,
                dX: 0xa66,
                dY: 0xfc4,
                dZ: 0xabb,
                e0: 'yxI7',
                e1: 0xf6d,
                e2: 'XITC',
                e3: 0x1395,
                e4: 0x11c2,
                e5: 0x10c0,
                e6: 0x369,
                e7: 0x1b4c,
                e8: 0x1275,
                e9: 0xfbb,
                ea: '5M6D',
                eb: 0x1bc1,
                ec: 0x11d7,
                ed: 0x1091,
                ee: 0xb8a,
                ef: 0x13c1,
                eg: 0x1172,
                eh: '2#Qk',
                ei: 0x1f27,
                ej: 0x187d,
                ek: 0xf92,
                el: '8Ys%',
                em: 0x15fa,
                en: 0x191b,
                eo: '8Ys%',
                ep: 0x64e,
                eq: 0xf9d,
                er: 0x192b,
                es: '%oj0',
                et: 0x1111,
                eu: 'V#kN',
                ev: 0x1d56,
                ew: 0x1d67,
                ex: 0x16b6,
                ey: 0xdd6,
                ez: 0x93a,
                eA: 0x15a1,
                eB: '60r9',
                eC: 0x2c3,
                eD: 0x55e,
                eE: 'C2T0',
                eF: 0x21b,
                eG: '6UCx',
                eH: 0x1e23,
                eI: 0x571,
                eJ: 0x109c,
                eK: 0x1a41,
                eL: 0xf70,
                eM: 'dZbH',
                eN: 0x54e,
                eO: '89Hn',
                eP: 0x346,
                eQ: 'dn8p',
                eR: 0x1006,
                eS: 0x1184,
                eT: 0xd26,
                eU: 'dZbH',
                eV: 0xd20,
                eW: '#sM9',
                eX: '*lLT',
                eY: 0x1044,
                eZ: 0xf93,
                f0: 'Gn7Q',
                f1: 'dn8p',
                f2: 0x1acc,
                f3: 0x486,
                f4: 'Pt3!',
                f5: '7NO9',
                f6: 0x1633,
                f7: 0xb53,
                f8: 0x324,
                f9: 'egod',
                fa: 0xc94,
                fb: '$p[^',
                fc: 0x1db0,
                fd: 0x1df1,
                fe: 0x1363,
                ff: 0x143f,
                fg: 'vel(',
                fh: 0x1b25,
                fi: 'n7E3',
                fj: 0x980,
                fk: 0x113d,
                fl: 0xff7,
                fm: 0x7f8,
                fn: 'b)3q',
                fo: 'CeJW',
                fp: 0x1b0b,
                fq: 'egod',
                fr: 0x964,
                fs: '$BSl',
                ft: 0x1325,
                fu: 'NxG1',
                fv: 0x117d,
                fw: 0x183e,
                fx: 0x1160,
                fy: 'w(Wr',
                fz: 0x258,
                fA: 'Mmsl',
                fB: 'Pt3!',
                fC: 0x8d0,
                fD: 0x4cb,
                fE: '*lLT',
                fF: 'NMJQ',
                fG: 0x1ca4,
                fH: 0x19e0,
                fI: 0x41c,
                fJ: 'M5Ii',
                fK: 0x1e2,
                fL: 'egod',
                fM: 0xd12,
                fN: 'GzjL',
                fO: '6UCx',
                fP: 0x154b,
                fQ: 'dn8p',
                fR: 0x420,
                fS: 0x1cb2,
                fT: '1qbp',
                fU: 0x1031,
                fV: 0x1106,
                mT: 0x1582,
                mU: 0x180e,
                mV: '89Hn',
                mW: 0x1605,
                mX: 0x14ca,
                mY: '*lLT',
                mZ: 0x10ba,
                n0: 'GzjL',
                n1: 0xd9d,
                n2: 0xfab,
                n3: 0x1c88,
                n4: 0x1efa,
                n5: 0x1982,
                n6: 'PSkb',
                n7: 0x1ad,
                n8: 'yxI7',
                n9: 0x1016,
                na: 0x967,
                nb: '[p9(',
                nc: 0x1e34,
                nd: 0x173c,
                ne: 0x1249,
                nf: 0x12cb,
                ng: 0x145c,
                nh: 0x1796,
                ni: 0xc75,
                nj: 'IcEg',
                nk: 'CeJW',
                nl: 0xd4a,
                nm: 0x5f6,
                nn: 0x1a5c,
                no: 'n7E3',
                np: 0xf00,
                nq: 0xa18,
                nr: 0x843,
                ns: 0x1a31,
                nt: 0x19f7,
                nu: 'egod',
                nv: 0x842,
                nw: 0xf7f,
                nx: 0x146c,
                ny: 0x1046,
                nz: 0x1e01,
                nA: 0xe9b,
                nB: 'NxG1',
                nC: 0x11b5,
                nD: 0xa35,
                nE: 'mRB^',
                nF: 0x1f1,
                nG: 'n7E3',
                nH: 0xa96,
                nI: 0x167d,
                nJ: 0x9db,
                nK: 0xc1e,
                nL: 0xb48,
                nM: '5M6D',
                nN: 0x67a,
                nO: 0xdcf,
                nP: 0x14c,
                nQ: 0x15da,
                nR: 'Gn7Q',
                nS: 0x1e83,
                nT: '6UCx',
                nU: 'yxI7',
                nV: '2#Qk',
                nW: 0x1b1c,
                nX: 0x1d35,
                nY: 'M5Ii',
                nZ: 0x14ab,
                o0: 'egod',
                o1: 0x1a4b,
                o2: 'dbGg',
                o3: '6UCx',
                o4: 0x1302,
                o5: '89Hn',
                o6: 0x10c4,
                o7: 0xa87,
                o8: 'rsIZ',
                o9: 0x1728,
                oa: '6UCx',
                ob: 0x305,
                oc: 0x7a5,
                od: 'zs!c',
                oe: '$BSl',
                of: 0xd04,
                og: 0x779,
                oh: 0x15bd,
                oi: 0xaa3,
                oj: 0x823,
                ok: 0x1478,
                ol: 'dn8p',
                om: 'dZbH',
                on: '%oj0',
                oo: 0x1ede,
                op: 0xba1,
                oq: 0x407,
                or: '60r9',
                os: 0x640,
                ot: 'NxG1',
                ou: '60r9',
                ov: 0x2f5,
                ow: 0xa1a,
                ox: 'oeP*',
                oy: 0x1bd0,
                oz: 0x1f8,
                oA: 0x5aa,
                oB: 'NMJQ',
                oC: 0x1ed0,
                oD: 0x854,
                oE: 0x999,
                oF: 0x403,
                oG: 0x1c81,
                oH: 'NMJQ',
                oI: 0x168f,
                oJ: 'PSkb',
                oK: 'd%lH',
                oL: 'IcEg',
                oM: 0x108,
                oN: '#sM9',
                oO: 0x10a7,
                oP: 0xf66,
                oQ: 0x1273,
                oR: 0x174c,
                oS: 0x1510,
                oT: 0xdeb,
                oU: 'XITC',
                oV: 0x1ecb,
                oW: 'M5Ii',
                oX: 0x1bfa,
                oY: 0x640,
                oZ: 'rsIZ',
                p0: 0x1d7c,
                p1: '89Hn',
                p2: 0x1169,
                p3: 'jODS',
                p4: 0x739,
                p5: 0x96d,
                p6: 'vel(',
                p7: 0x16ea,
                p8: 0x1769,
                p9: 0x48f,
                pa: 0x4f4,
                pb: '6UCx',
                pc: 0x136f,
                pd: 0x1791,
                pe: 0x1c75,
                pf: 0x17bb,
                pg: '$BSl',
                ph: 0xd5f,
                pi: 0x14d9,
                pj: 0x17e0,
                pk: 'NMJQ',
                pl: 0x891,
                pm: 'PYt$',
                pn: 0x3eb,
                po: 0x1b2f,
                pp: 0x18b6,
                pq: 0x188e,
                pr: '6UCx',
                ps: 0x15e8,
                pt: 0x7bc,
                pu: 'w(Wr',
                pv: 0x64d,
                pw: '5M6D',
                px: 0x6d9,
                py: 0x7c1,
                pz: '8Ys%',
                pA: 0x1b81,
                pB: 'ZgMu',
                pC: 0xf35,
                pD: 0x1f14,
                pE: 0x16af,
                pF: 0xe54,
                pG: 0x1cf0,
                pH: 0x14b1,
                pI: '9rQu',
                pJ: 0x3e6,
                pK: 0x1ec5,
                pL: '8Ys%',
                pM: 0xd5e,
                pN: 'PYt$',
                pO: 0x1613,
                pP: '9rQu',
                pQ: 0xa83,
                pR: 0x1e08,
                pS: 'CeJW',
                pT: 0x1537,
                pU: 0x25a,
                pV: 'd%lH',
                pW: 0x1d0d,
                pX: 0xdbd,
                pY: 0x573,
                pZ: 'w(Wr',
                q0: 0xcf1,
                q1: 'NxG1',
                q2: 0x30e,
                q3: 'T3Fv',
                q4: 0x1fe,
                q5: 'zs!c',
                q6: 0x1840,
                q7: 0x607,
                q8: 'egod',
                q9: 0x7e2,
                qa: '9rQu',
                qb: 0xdfb,
                qc: '7NO9',
                qd: 'yxI7',
                qe: 0x1b6d,
                qf: 0x180e,
                qg: 0x16bf,
                qh: 'w(Wr',
                qi: 0x16c3,
                qj: 'IcEg',
                qk: 0x10df,
                ql: '89Hn',
                qm: 0x616,
                qn: 'M5Ii',
                qo: 'T3Fv',
                qp: 0x17b9,
                qq: 0xad5,
                qr: 'C2T0',
                qs: 'egod',
                qt: 0xe0f,
                qu: 0x1492,
                qv: 'PYt$',
                qw: 0x1134,
                qx: 0x40e,
                qy: 0x655,
                qz: 'n7E3',
                qA: 0x825,
                qB: 0x104e,
                qC: 0xf5a,
                qD: 0x401,
                qE: 0x1129,
                qF: 'PYt$',
                qG: 0x12b3,
                qH: '89Hn',
                qI: 0x1865,
                qJ: '0Ua@',
                qK: 0x6db,
                qL: '#sM9',
                qM: 'vel(',
                qN: 0x13a9,
                qO: 0x131c,
                qP: 'Pt3!',
                qQ: 'oeP*',
                qR: 'vel(',
                qS: 0x1254,
                qT: 0xd91,
                qU: 'egod',
                qV: 'M5Ii',
                qW: 0x1c8b,
                qX: 0x2f8,
                qY: 0x1042,
                qZ: 0x689,
                r0: '9rQu',
                r1: 0x1cda,
                r2: 'NMJQ',
                r3: 0xc8f,
                r4: '1qbp',
                r5: '5M6D',
                r6: 0xe94,
                r7: 'w(Wr',
                r8: '2#Qk',
                r9: 0x404,
                ra: 'dn8p',
                rb: 0xb2d,
                rc: 0x99e,
                rd: 0x103,
                re: 0x1ec2,
                rf: 0x196b,
                rg: 0x1b0e,
                rh: 0xe43,
                ri: 0x1279,
                rj: 'dbGg',
                rk: 0x16e5,
                rl: 0x5ff,
                rm: 'dbGg',
                rn: 0x125,
                ro: 0x1056,
                rp: 0x5b7,
                rq: 0x1546,
                rr: 0x1a97,
                rs: 0x1a0c,
                rt: 0x1352,
                ru: '89Hn',
                rv: 'yxI7',
                rw: 0xa92,
                rx: '6UCx',
                ry: 0x14ec,
                rz: 'GzjL',
                rA: 0x4ea,
                rB: 0x110,
                rC: 'd%lH',
                rD: 'ZgMu',
                rE: 0x437,
                rF: 0x6b9,
                rG: 0xe03,
                rH: '6UCx',
                rI: 'dbGg',
                rJ: 0x1953,
                rK: 0x7e2,
                rL: 0xb15,
                rM: 0x15c6,
                rN: 0x1801,
                rO: 0x1a05,
                rP: 0x1413,
                rQ: 0x1699,
                rR: '$p[^',
                rS: 0x7ec,
                rT: 'Mmsl',
                rU: 0x1a80,
                rV: 0x1e3a,
                rW: '60r9',
                rX: 0x16dc,
                rY: 0x1ef0,
                rZ: '$BSl',
                s0: 0x1183,
                s1: 0x2dd,
                s2: 0xa88,
                s3: 0x4da,
                s4: 'IcEg',
                s5: '8Ys%',
                s6: 0x19ce,
                s7: 0x1bf2,
                s8: 0xef0,
                s9: 'oeP*',
                sa: 0x1d53,
                sb: 0x1052,
                sc: 0x323,
                sd: '%oj0',
                se: 0x746,
                sf: '$p[^',
                sg: 0x39c,
                sh: 0x1bbb,
                si: 0x1b9e,
                sj: '8Ys%',
                sk: 0x437,
                sl: 0x10f3,
                sm: 'vel(',
                sn: 'dbGg',
                so: 0x1d83,
                sp: 'Pt3!',
                sq: 0x178f,
                sr: 'V#kN',
                ss: 0x1d07,
                st: 0x1c45,
                su: 0x1593,
                sv: 0x1aff,
                sw: '*lLT',
                sx: 0x12d9,
                sy: 'mRB^',
                sz: 0x17ee,
                sA: 'vel(',
                sB: 0x11fb,
                sC: 0x443,
                sD: 0x7ee,
                sE: 0x42f,
                sF: 0x7e7,
                sG: 0x1aa3,
                sH: 'vel(',
                sI: 0x666,
                sJ: 0x778,
                sK: 'Gn7Q',
                sL: 0x1afe,
                sM: 0x7cc,
                sN: 'jODS',
                sO: 0x173b,
                sP: '[]Y1',
                sQ: 0x958,
                sR: 0x598,
                sS: 0x1655,
                sT: '[]Y1',
                sU: 0x15b2,
                sV: 0xa20,
                sW: 0x16a6,
                sX: 'XITC',
                sY: 0x4db,
                sZ: 0x8aa,
                t0: 'wCGK',
                t1: 0x225,
                t2: 'rsIZ',
                t3: 0x19de,
                t4: 0x1e92,
                t5: '5M6D',
                t6: 0xf0e,
                t7: '6UCx',
                t8: 'ZgMu',
                t9: 'Pt3!',
                ta: 0x145,
                tb: 0x1bcf,
                tc: 0x1259,
                td: 'w(Wr',
                te: 0x1b43,
                tf: 'vel(',
                tg: 0x197f,
                th: 0xef8,
                ti: 0x546,
                tj: 'V#kN',
                tk: 0x9e9,
                tl: 0x339,
                tm: 'GzjL',
                tn: 0xb95,
                to: 'NMJQ',
                tp: 0x1dd6,
                tq: '6UCx',
                tr: 0x1cf9,
                ts: 0xc69,
                tt: 0x1ea3,
                tu: 0x13a1,
                tv: 0x2f2,
                tw: 'w(Wr',
                tx: 0xfe1,
                ty: 0x1b15,
                tz: 0x15f,
                tA: 0xc44,
                tB: 0xb3c,
                tC: 0xa2c,
                tD: 0xb89,
                tE: 'egod',
                tF: 0x1de6,
                tG: 'Gn7Q',
                tH: 0x1d79,
                tI: 0x1b58,
                tJ: 0xcf6,
                tK: 0x212,
                tL: 0x396,
                tM: 0x874,
                tN: 0x114a,
                tO: 'oeP*',
                tP: 0x1b79,
                tQ: 0x5d7,
                tR: 0x1787,
                tS: 0x1daa,
                tT: 0x1ab5,
                tU: 'egod',
                tV: 0x144c,
                tW: 0x1e9c,
                tX: 'dbGg',
                tY: 0x197b,
                tZ: 0x378,
                u0: 'NxG1',
                u1: 0x1916,
                u2: 0x3a7,
                u3: 0xfb1,
                u4: 'Mmsl',
                u5: 0x1204,
                u6: 'mRB^',
                u7: 0xbdd,
                u8: 'Pt3!',
                u9: 0xc07,
                ua: 'rsIZ',
                ub: 0x15d,
                uc: 'jODS',
                ud: 0x1b18,
                ue: 0x1b78,
                uf: 0x18bf,
                ug: '[p9(',
                uh: 0x128d,
                ui: 0x16a,
                uj: 0x1cf9,
                uk: 0x52b,
                ul: 0x1a8c,
                um: 0x460,
                un: 0x1443,
                uo: 0x1d11,
                up: 0x1f16,
                uq: 0x982,
                ur: 'zs!c',
                us: '*lLT',
                ut: 0xf0,
                uu: 0x1298,
                uv: 'NxG1',
                uw: 0x14e,
                ux: 'Mmsl',
                uy: 0x1593,
                uz: 0x785,
                uA: 0x8f3,
                uB: '6UCx',
                uC: 0x1b0e,
                uD: 0x1023,
                uE: 'NMJQ',
                uF: 0x14a0,
                uG: 0xd29,
                uH: 'Mmsl',
                uI: 0x1aa9,
                uJ: 0x2b4,
                uK: 0x840,
                uL: 'C2T0',
                uM: 'PSkb',
                uN: 0x4b6,
                uO: 0x223,
                uP: 0x97f,
                uQ: 'zs!c',
                uR: 0x993,
                uS: 0x1c3e,
                uT: '%oj0',
                uU: 0x13fe,
                uV: 0x1ce,
                uW: '%oj0',
                uX: 0x666,
                uY: '7NO9',
                uZ: 0x1cea,
                v0: 0x1c7e,
                v1: 0x45f,
                v2: 0x1118,
                v3: '[p9(',
                v4: 0x86b,
                v5: 0x185,
                v6: 0xac0,
                v7: 0x968,
                v8: 0x10a0,
                v9: 0x1d86,
                va: 'Mmsl',
                vb: 0x19ea,
                vc: 'T3Fv',
                vd: 0x1675,
                ve: 0x12cc,
                vf: 'GzjL',
                vg: 0x13d6,
                vh: 'C2T0',
                vi: 'IcEg',
                vj: 0xc60,
                vk: 'PYt$',
                vl: 0x128c,
                vm: 0x108b,
                vn: '60r9',
                vo: 0x10ba,
                vp: 'GzjL',
                vq: 0xf7e,
                vr: 'dn8p',
                vs: 0x103c,
                vt: 'd%lH',
                vu: 0x75e,
                vv: 0x180,
                vw: '#sM9',
                vx: 0x3d5,
                vy: 0xe76,
                vz: '5M6D',
                vA: 'M5Ii',
                vB: 0x1866,
                vC: 0x1f1e,
                vD: 'egod',
                vE: '%oj0',
                vF: 0x591,
                vG: 0x13e0,
                vH: 'Pt3!',
                vI: 'vel(',
                vJ: 'rsIZ',
                vK: 0x7f9,
                vL: '8Ys%',
                vM: 0x2d6,
                vN: 0x1479,
                vO: 0x13f9,
                vP: 'M5Ii',
                vQ: 0x10ce,
                vR: 0x137d,
                vS: 0x174d,
                vT: 0xbc9,
                vU: 'dZbH',
                vV: 'GzjL',
                vW: 0x400,
                vX: '2#Qk',
                vY: 0x834,
                vZ: '$BSl',
                w0: 0x516,
                w1: '6UCx',
                w2: 0x13f5,
                w3: 'dZbH',
                w4: '8Ys%',
                w5: 0x1a92,
                w6: 0x503,
                w7: 'w(Wr',
                w8: 0x155f,
                w9: 0x2da,
                wa: 0xf18,
                wb: 0xe5e,
                wc: 0x98e,
                wd: '9rQu',
                we: 0x17e2,
                wf: 0x190a,
                wg: 'GzjL',
                wh: 0xfc7,
                wi: 0x1140,
                wj: '$p[^',
                wk: '5M6D',
                wl: 0x14d0,
                wm: 'wCGK',
                wn: 0x1e3,
                wo: 0x10d0,
                wp: 0x14de,
                wq: 0x80e,
                wr: 0x1b40,
                ws: 'Gn7Q',
                wt: '9rQu',
                wu: 0xc12,
                wv: 0x48a,
                ww: 0x11ea,
                wx: 0x631,
                wy: '#sM9',
                wz: 0x9d5,
                wA: 0x7b9,
                wB: 0x1347,
                wC: 0x1499,
                wD: 0x1808,
                wE: 0x1f0d,
                wF: 0x15bf,
                wG: 'GzjL',
                wH: 0x17e3,
                wI: 0x1e81,
                wJ: 0x5b4,
                wK: 'XITC',
                wL: 0x120f,
                wM: 0x12a9,
                wN: '8Ys%',
                wO: 'IcEg',
                wP: 0xea1,
                wQ: '8Ys%',
                wR: 0x64b,
                wS: 0xab8,
                wT: 'PYt$',
                wU: 0x1996,
                wV: 'dbGg',
                wW: 0x267,
                wX: 0xb3f,
                wY: 0xaec,
                wZ: '$p[^',
                x0: 0x462,
                x1: 0x196f,
                x2: 'XITC',
                x3: 0x1346,
                x4: 'w(Wr',
                x5: '#sM9',
                x6: 'd%lH',
                x7: '1qbp',
                x8: 0x718,
                x9: 0x9a3,
                xa: '7NO9',
                xb: '6UCx',
                xc: 0x11b6,
                xd: 'GzjL',
                xe: 'jODS',
                xf: 0x1699,
                xg: 0x16a3,
                xh: 0x1a39,
                xi: 0x1edb,
                xj: 0x7eb,
                xk: 0x1834,
                xl: 'dZbH',
                xm: 0x211,
                xn: 'wCGK',
                xo: 0xc9c,
                xp: 0x135,
                xq: 0x5e9,
                xr: 0xc40,
                xs: 0xfec,
                xt: 0xf4d,
                xu: 0x3c9,
                xv: '6UCx',
                xw: '#sM9',
                xx: 'zs!c',
                xy: 0x1063,
                xz: 'dZbH',
                xA: 0xfbd,
                xB: 0x101,
                xC: '$BSl',
                xD: 0x1413,
                xE: 0x8ec,
                xF: 0xf36,
                xG: 0x1ef4,
                xH: '8Ys%',
                xI: 0xf48,
                xJ: 0x8a6,
                xK: 'zs!c',
                xL: 0x1029,
                xM: 'IcEg',
                xN: 0x2fc,
                xO: 0x11bb,
                xP: 0xf34,
                xQ: 0x64a,
                xR: 0x7e1,
                xS: '6UCx',
                xT: 0x831,
                xU: 0x1522,
                xV: '#sM9',
                xW: 'wCGK',
                xX: 0x1c01,
                xY: 'C2T0',
                xZ: 0x19bd,
                y0: 'Pt3!',
                y1: 0x12b9,
                y2: 'rsIZ',
                y3: 0x12d8,
                y4: 0xb6e,
                y5: 0x1816,
                y6: 0x2e3,
                y7: '6UCx',
                y8: 0x1aa2,
                y9: 'Pt3!',
                ya: 0x2e4,
                yb: 'V#kN',
                yc: 0xa19,
                yd: 'IcEg',
                ye: '%oj0',
                yf: 0x1e38,
                yg: 'yxI7',
                yh: 0xe60,
                yi: 0x5e2,
                yj: 0x149,
                yk: '[]Y1',
                yl: 0x37d,
                ym: '89Hn',
                yn: 0x129b,
                yo: 0x821,
                yp: 0xb1d,
                yq: 'GzjL',
                yr: 0x1dfe,
                ys: 0x1af5,
                yt: 0x89c,
                yu: '6UCx',
                yv: 0x4a5,
                yw: 0xbf2,
                yx: 0x1441,
                yy: 'w3Tt',
                yz: 0x1816,
                yA: 0x538,
                yB: 'V#kN',
                yC: 0xd89,
                yD: 0xa9f,
                yE: 0x111f,
                yF: 0xbda,
                yG: 0x11c,
                yH: 0x1ce2,
                yI: 'w(Wr',
                yJ: 0x4c6,
                yK: 'IcEg',
                yL: 0xc24,
                yM: 0x415,
                yN: 0x1d60,
                yO: 'Gn7Q',
                yP: '6UCx',
                yQ: 'w(Wr',
                yR: 0xb6f,
                yS: 0x450,
                yT: 0xcb5,
                yU: '[p9(',
                yV: 0x1757,
                yW: 'ZgMu',
                yX: 0x8ed,
                yY: 'vel(',
                yZ: 0x539,
                z0: 'jODS',
                z1: 0x2f1,
                z2: 0x1d72,
                z3: '5M6D',
                z4: 0x18b5,
                z5: 'XITC',
                z6: 0x1a2,
                z7: 0x309,
                z8: '$BSl',
                z9: 0xbb4,
                za: 'T3Fv',
                zb: 'rsIZ',
                zc: 0x1943,
                zd: 0xbed,
                ze: 'XITC',
                zf: 0x20a,
                zg: 0x19a4,
                zh: 'egod',
                zi: 0x56e,
                zj: 'vel(',
                zk: 0x1d57,
                zl: 0xb37,
                zm: 0x12a0,
                zn: '[p9(',
                zo: 0x1c53,
                zp: 0x10d6,
                zq: 0x1d92,
                zr: 0x7c0,
                zs: 0x9bf,
                zt: '89Hn',
                zu: 'zs!c',
                zv: 0x969,
                zw: 0x155a,
                zx: 0x9bf,
                zy: 0xae2,
                zz: 0xfc7,
                zA: 'Mmsl',
                zB: 0xceb,
                zC: 'PSkb',
                zD: 0x1a4c,
                zE: 0x1bd3,
                zF: 0x1db1,
                zG: '1qbp',
                zH: 0x167b,
                zI: 0x1d91,
                zJ: 0x10c7,
                zK: 0x1d05,
                zL: 'T3Fv',
                zM: 0x108a,
                zN: 'PYt$',
                zO: 'M5Ii',
                zP: 0xe1f,
                zQ: 'dbGg',
                zR: 'oeP*',
                zS: 0x9c9,
                zT: 0xef7,
                zU: 0xb44,
                zV: 0x1649,
                zW: 0xd87,
                zX: 0xde1,
                zY: 'w3Tt',
                zZ: 0x11fa,
                A0: 0x1cb7,
                A1: '$BSl',
                A2: 'dbGg',
                A3: 0xbf2,
                A4: 0x9b6,
                A5: 0x1f05,
                A6: 0x839,
                A7: 0x1ae,
                A8: '#sM9',
                A9: 0x1e1f,
                Aa: 0x106b,
                Ab: 'dbGg',
                Ac: 'oeP*',
                Ad: 0x11ae,
                Ae: '9rQu',
                Af: 0x89e,
                Ag: 0x606,
                Ah: 0x69c,
                Ai: 'yxI7',
                Aj: 0x1ca7,
                Ak: 0xf19,
                Al: 'Pt3!',
                Am: 0x1552,
                An: 0xbfa,
                Ao: 'b)3q',
                Ap: 0x1b06,
                Aq: 0xe68,
                Ar: 0x1d93,
                As: 0xeed,
                At: 'yxI7',
                Au: 'Gn7Q',
                Av: 0x10b1,
                Aw: 'w(Wr',
                Ax: 0x2a6,
                Ay: 0x915,
                Az: 0x74b,
                AA: 0xf49,
                AB: 0x10e1,
                AC: 0x1268,
                AD: 0x5da,
                AE: 'b)3q',
                AF: 0x524,
                AG: 0xb9b,
                AH: 0x805,
                AI: 0xd3e,
                AJ: 0xa1a,
                AK: 'ZgMu',
                AL: 0x1817,
                AM: 0xeda,
                AN: 'C2T0',
                AO: 0x73d,
                AP: 'w(Wr',
                AQ: '0Ua@',
                AR: 0xf29,
                AS: 0x1451,
                AT: 0x284,
                AU: 0x1d4c,
                AV: 'yxI7',
                AW: 0x10bf,
                AX: 'n7E3',
                AY: '[]Y1',
                AZ: 0x1802,
                B0: 0xddf,
                B1: 'egod',
                B2: 0x1c17,
                B3: 'dn8p',
                B4: 0xfac,
                B5: 0x10c2,
                B6: '5M6D',
                B7: 0x1c00,
                B8: 'GzjL',
                B9: 0xb8a,
                Ba: 0x313,
                Bb: 0x169a,
                Bc: 'Mmsl',
                Bd: '[p9(',
                Be: 0x7a7,
                Bf: 'mRB^',
                Bg: 0xde0,
                Bh: 'zs!c',
                Bi: 'ZgMu',
                Bj: 0x1ad9,
                Bk: 0x108e,
                Bl: 'yxI7',
                Bm: 0x1970,
                Bn: 'vel(',
                Bo: 0x1e9a,
                Bp: 0x16c1,
                Bq: 'dZbH',
                Br: 0x49d,
                Bs: 0x1d63,
                Bt: 0xfac,
                Bu: 0x723,
                Bv: 0x66b,
                Bw: '#sM9',
                Bx: 0x7c5,
                By: 0x1ba7,
                Bz: 0x1594,
                BA: 0x6e4,
                BB: 0x966,
                BC: 0x1334,
                BD: 'ZgMu',
                BE: 0x401,
                BF: 'NMJQ',
                BG: 0x1db6,
                BH: 0xea7,
                BI: 0xcab,
                BJ: 'oeP*',
                BK: 0x1394,
                BL: 0x1267,
                BM: 0x153b,
                BN: 0xf1b,
                BO: 0x2ef,
                BP: 'n7E3',
                BQ: 0x1aba,
                BR: 0x1b82,
                BS: 0x1626,
                BT: 'wCGK',
                BU: 'PSkb',
                BV: 0xc97,
                BW: 0x2c3
            },
            mR = { c: 0x1348, f: '*lLT', g: 0x1a16, h: '8Ys%', i: 0x1526 },
            mP = { c: 0xa12 },
            mO = { c: '*lLT', f: '8Ys%', g: 0x7d4, h: 'b)3q', i: 0x19b6, j: 'wCGK', k: 'yxI7', l: 0x1179, m: 'oeP*', n: 0x631, o: '#sM9', p: 0x13de, q: 'dZbH', r: 0x1787, s: '$p[^', t: 0xc16, u: '8Ys%', v: 'jODS', w: 0x1104, x: '9rQu', y: 0x16e1, z: 'dbGg', A: 0xcae, B: '[]Y1', C: 'GzjL', D: 'dn8p', E: '6UCx', F: 0xbe5, G: 'dbGg', H: 0x2db, I: 'M5Ii', J: 0xa37, K: 0x97e, L: '[p9(', M: '5M6D', N: 0x19db, O: 'Pt3!', P: 0x67f, Q: 'w3Tt', R: 0x1ab0, S: 0x58f, T: 0x5da, U: 'Mmsl', V: 0x11cc, W: 'zs!c', X: 'zs!c', Y: 0x1bc1, Z: 0x6c8, a0: 0x1c3a, a1: '89Hn', a2: 'CeJW', a3: 0x9f1, a4: 0x19ae, a5: 0x204, a6: 0xdfa, a7: 'dZbH', a8: 0x947, a9: 0x1a38, aa: 0x1651, ab: 0x1d8e, ac: 0x179f, ad: 0x1a2c, ae: 0x11a1, af: 'dn8p' },
            mN = { c: 0x11d6 },
            g4 = fX;
            try {
    wrapKVWithD1(g);
    if (!_kvMigratedFlag && g[g4(0x5a4, 'yxI7')] && h && typeof h[g4(mS.c, mS.f)] === g4(mS.g, 'jODS'))
        h[g4(mS.h, '6UCx')](migrateKvToD1(g));
    let j = f[g4(0x79a, mS.i)][g4(0x3b7, '[]Y1')](/%5[Cc]/g, '')[g4(mS.j, 'wCGK')](/\\/g, '');
    const l = j[g4(0x11a0, 'rsIZ')]('#'),
        o = l === -0x1 ? j : j[g4(mS.k, 'w3Tt')](0x0, l);
    if (!o[g4(0x1daa, mS.l)]('?') && /%3f/i[g4(0xac9, mS.m)](o)) {
        const H = l === -0x1 ? '' : j[g4(mS.n, 'NxG1')](l);
        j = o[g4(mS.o, '*lLT')](/%3f/i, '?') + H;
    }
    const p = new URL(j),
        q = f[g4(0x1a13, mS.p)][g4(mS.q, 'mRB^')](g4(mS.r, mS.s)) || g4(mS.t, mS.u),
        s = (f[g4(0x812, '5M6D')][g4(mS.v, mS.w)](g4(0x1e7e, 'V#kN')) || '')[g4(0x449, '[]Y1')](),
        t = (f[g4(mS.x, 'w(Wr')][g4(mS.y, mS.z)](g4(0x1c54, 'egod')) || '')[g4(mS.A, mS.B)](),
        w = g[g4(0x1076, '60r9')] || g[g4(mS.C, '$p[^')] || g[g4(mS.D, 'NxG1')] || g[g4(mS.E, 'dn8p')] || g[g4(mS.F, 'dn8p')] || g[g4(0xeb8, mS.f)] || g[g4(mS.G, mS.H)] || g[g4(mS.I, mS.J)] || g[g4(mS.K, mS.J)];
    let x = w,
        z = g[g4(0x8d6, mS.L)];
    if (!z && cachedAutoKey) z = cachedAutoKey;
    if (!z && g['KV'] && typeof g['KV'][g4(mS.M, mS.N)] === g4(0x56b, mS.O))
        try {
            z = await g['KV'][g4(mS.P, 'V#kN')](g4(mS.Q, 'V#kN'));
            !z && (z = Array[g4(0x1a1, mS.R)](crypto[g4(0x5e5, mS.S)](new Uint8Array(0x18)), I => g4(0xcba, 'PYt$')[I % 0x24])[g4(mS.T, mS.U)](''), await g['KV'][g4(0x1e73, '*lLT')](g4(0x1c71, 'CeJW'), z));
            cachedAutoKey = z;
        } catch (I) {}
    if (!z) z = g4(mS.V, '%oj0');
    if (g['KV'] && typeof g['KV'][g4(0x1402, mS.W)] === g4(mS.X, mS.Y)) {
        if (cachedAdminPass !== null && Date[g4(0x1b51, mS.Z)]() - cachedAdminPassAt < 0xea60) {
            if (cachedAdminPass) x = cachedAdminPass;
        } else
            try {
                const J = await g['KV'][g4(mS.a0, 'CeJW')](g4(mS.a1, 'mRB^'));
                J ? (x = J, cachedAdminPass = J, cachedAdminPassAt = Date[g4(mS.a2, mS.a3)]()) : (cachedAdminPass = '', cachedAdminPassAt = Date[g4(mS.a4, 'Gn7Q')]() - 0xd6d8);
            } catch (K) {}
    }
    const A = g[g4(mS.a5, 'w(Wr')] || g[g4(0x15d0, '5M6D')];
    let B;
    if (A && uuidRegex[g4(0x161, '6UCx')](A)) B = A[g4(0x10bb, '$p[^')]();
    else {
        const L = w || x,
            M = await MD5MD5(L + z),
            N = [M[g4(mS.a6, 'C2T0')](0x0, 0x8), M[g4(0x164, 'V#kN')](0x8, 0xc), '4' + M[g4(mS.a7, mS.a8)](0xd, 0x10), '8' + M[g4(mS.a9, mS.u)](0x11, 0x14), M[g4(mS.aa, '#sM9')](0x14)][g4(0x14bf, 'ZgMu')]('-');
        let O = null;
        if (g['KV'] && typeof g['KV'][g4(mS.ab, 'NMJQ')] === g4(mS.ac, mS.a3)) {
            if (cachedWorkerUUID !== null && Date[g4(0x1bb8, 'w3Tt')]() - cachedWorkerUUIDAt < 0x927c0) O = cachedWorkerUUID || null;
            else
                try {
                    let P = await g['KV'][g4(0x539, mS.ad)](g4(0x1725, mS.ae));
                    if (!P) { P = N; try { await g['KV'][g4(0x93f, '2#Qk')](g4(mS.af, '60r9'), P); } catch (Q) {} }
                    cachedWorkerUUID = P || '', cachedWorkerUUIDAt = Date[g4(mS.ag, 'dn8p')](), O = P || null;
                } catch (R) {}
        }
        B = O && uuidRegex[g4(0x1549, 'PSkb')](O) ? O[g4(0x10bb, '$p[^')]() : N;
    }
    const C = g[g4(0x15ca, '#sM9')] ? (await sortIntoArray(g[g4(0x114c, mS.ah)]))[g4(mS.ai, mS.aj)](S => S[g4(0xca9, 'w(Wr')]()[g4(0x1091, '9rQu')](/^https?:\/\//,'')[g4(0x5b4, 'XITC')]('/')[0x0][g4(0xecb, 'rsIZ')](':')[0x0]) : [p[g4(0xd44, mS.l)]],
        D = C[0x0],
        E = p[g4(0x9d4, '%oj0')][g4(0x1521, '[]Y1')](0x1)[g4(0x10f9, mS.ak)]();
    debugLogPrint = ['1', g4(mS.al, mS.am)][g4(mS.an, '#sM9')](g[g4(mS.ao, mS.ap)]) || debugLogPrint;
    if (g[g4(0x1b74, mS.aq)] || g[g4(mS.ar, mS.as)]) PagesstaticPages = String(g[g4(mS.at, 'yxI7')] || g[g4(mS.au, mS.aj)])[g4(0xa39, '7NO9')](/\/+$/, '') + '/';
    if (g[g4(mS.av, 'vel(')]) {
        const S = await sortIntoArray(g[g4(0x1eeb, mS.aw)]);
        proxyIP = S[Math[g4(0x159, 'Mmsl')](Math[g4(mS.ax, mS.ay)]() * S[g4(mS.az, 'Pt3!')])], enableProxyFallback = ![];
    } else proxyIP = (f['cf'][g4(0x390, mS.as)] + g4(0x130d, 'oeP*'))[g4(mS.aA, mS.aB)]();
    nat64Config = g[g4(mS.aC, mS.aD)] || g[g4(mS.aE, 'egod')] || '';
    const F = f[g4(0x67c, '[p9(')][g4(0xf99, mS.aF)](g4(0x2eb, mS.ak)) || f[g4(0x1ce3, 'dZbH')][g4(mS.aG, mS.aH)](g4(0x1985, mS.aF)) || f[g4(mS.aI, 'd%lH')][g4(0x1cfa, 'PYt$')](g4(mS.aJ, 'NxG1')) || f[g4(0x3a3, 'M5Ii')][g4(mS.y, 'Pt3!')](g4(mS.aK, '[p9(')) || f[g4(0xa09, mS.aL)][g4(mS.aM, mS.aN)](g4(mS.aO, mS.aP)) || f[g4(mS.aQ, '9rQu')][g4(0x1d56, 'yxI7')](g4(mS.aR, mS.aS)) || f[g4(mS.aT, 'w3Tt')][g4(0x1d7, '%oj0')](g4(0x1e28, 'Pt3!')) || g4(mS.aU, 'NxG1');
    try {
        if (g['KV'] && typeof g['KV'][g4(0x515, '89Hn')] === g4(mS.aV, mS.m)) {
            if (cachedNetworkSettings && Date[g4(mS.aW, '2#Qk')]() - cachedNetworkSettingsAt < 0x7530) networkSettings = cachedNetworkSettings;
            else {
                const T = await g['KV'][g4(0x4cb, '*lLT')](g4(mS.aX, mS.aY));
                networkSettings = T ? JSON[g4(mS.aZ, 'rsIZ')](T) : { 'enableRouting': !![], 'enableGeoIP': !![], 'enableGeoSite': !![], 'enableAdBlock': !![], 'enablePornBlock': ![], 'enableDomesticBypass': !![], 'enableDoH': !![], 'dohProvider': g4(0x1411, mS.H), 'enableLocalDNS': ![], 'localDNSIP': g4(mS.b0, '%oj0'), 'localDNSPort': '53', 'enableAntiSanctionDNS': ![], 'antiSanctionDNSProvider': g4(mS.b1, mS.b2), 'antiSanctionCustomDNS': '', 'enableFakeDNS': ![], 'fakeDNSIP': g4(0x91e, mS.b3), 'enableIPv6': !![], 'allowLAN': ![], 'logLevel': g4(mS.b4, mS.b5), 'enableWarp': ![], 'warpMode': g4(mS.b6, mS.aq), 'warpEndpoint': '', 'warpAmnezia': ![], 'customRules': '', 'bypassCountries': [], 'blockCategories': [], 'warpNoise': { 'mode': '', 'count': '', 'size': '', 'delay': '' } };
                cachedNetworkSettings = networkSettings;
                cachedNetworkSettingsAt = Date[g4(mS.b7, mS.J)]();
            }
        } else networkSettings = { 'enablePornBlock': ![], 'enableDomesticBypass': !![], 'enableAdBlock': !![] };
    } catch (U) {
        networkSettings = { 'enablePornBlock': ![], 'enableDomesticBypass': !![], 'enableAdBlock': !![] };
    }
    if (cachedSocks5Whitelist === null) {
        if (g[g4(mS.b8, 'CeJW')]) SOCKS5whitelist = [...new Set(SOCKS5whitelist[g4(mS.b9, mS.ba)](await sortIntoArray(g[g4(mS.bb, mS.bc)])))];
        cachedSocks5Whitelist = SOCKS5whitelist;
    } else SOCKS5whitelist = cachedSocks5Whitelist;
    if (networkSettings && networkSettings[g4(mS.bd, mS.be)] && g['KV'] && typeof g['KV'][g4(mS.bf, mS.bg)] === g4(mS.bh, mS.ba)) await refreshUserUsageIfStale(g);
    {
        const V = s === g4(mS.bi, mS.bj) || !E[g4(mS.bk, mS.bl)](g4(0x1fb, mS.bm)) && E !== g4(mS.bn, '0Ua@') && E !== g4(mS.bo, mS.bp) && f[g4(mS.bq, 'C2T0')] === g4(mS.br, mS.aq),
            W = E === g4(0x174, 'b)3q') || E[g4(mS.bs, mS.s)](g4(mS.bt, 'Gn7Q'));
        if (V || W) {
            let X = config_JSON && config_JSON[g4(0x1946, '%oj0')] === !![];
            if (!X)
                try {
                    const Y = await getConfigRaw(g);
                    if (Y && /"paused"\s*:\s*true/[g4(mS.bu, 'Mmsl')](Y)) X = !![];
                } catch (Z) {}
            if (X) return new Response(g4(mS.bv, mS.W), { 'status': 0x1f7, 'headers': { 'Content-Type': g4(mS.bw, 'jODS'), 'Cache-Control': g4(mS.bx, 'V#kN') } });
        }
        if (E === g4(0x39b, mS.by) && p[g4(mS.bz, 'w3Tt')][g4(0xcab, 'oeP*')](g4(0x108f, mS.bA)) === B) return new Response(JSON[g4(0x13f9, 'M5Ii')]({ 'Version': Number(String(Version)[g4(0x1409, mS.H)](/\D+/g, '')) }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x1990, mS.bB) } });
else {
    if (x && s === g4(mS.bC, mS.bD)) {
        await fetchProxyParams(p, B, g), log(g4(mS.bE, 'vel(') + p[g4(mS.bF, 'NMJQ')] + p[g4(0x18b4, 'jODS')]);
        {
            const a0 = backendModeConfig(g);
            if (a0['on'] && !isBackendExcludedPath(E, p[g4(0xa6f, mS.bG)])) {
                if (connRejectReason) return new Response(g4(0x1382, mS.bH) + connRejectReason + ')', { 'status': 0x193 });
                return await forwardWsToBackend(f, p, g, h, a0[g4(mS.bI, 'b)3q')], connUserId);
            }
        }
        return await handleWsRequest(f, B, p, g, h);
    } else {
        if (x && !E[g4(0x85d, '0Ua@')](g4(mS.bJ, 'V#kN')) && E !== g4(mS.bK, 'rsIZ') && E !== g4(mS.bL, '$p[^') && f[g4(mS.bM, '60r9')] === g4(0x180d, mS.J)) {
            if (E === g4(0x3d7, '9rQu') || p[g4(0x1ba4, mS.bN)] === g4(0x2ab, 'PSkb') || E === g4(0x192e, mS.bO) || p[g4(0x8a7, mS.bP)] === g4(0x152d, 'egod')) return handleDoHRequest(f);
            await fetchProxyParams(p, B, g);
            {
                const a3 = backendModeConfig(g);
                if (a3['on'] && !isBackendExcludedPath(E, p[g4(0x13c3, mS.bQ)])) {
                    if (connRejectReason) return new Response(g4(0x1efd, mS.bQ) + connRejectReason + ')', { 'status': 0x193 });
                    return await forwardHttpToBackend(f, p, g, a3[g4(mS.bR, 'dZbH')]);
                }
            }
            const a1 = f[g4(mS.bS, mS.bT)][g4(mS.aM, '$BSl')](g4(mS.bU, mS.bl)) || '',
                a2 = a1[g4(0x5e2, mS.ae)](g4(mS.bV, mS.bH), 0xe) || a1[g4(mS.bW, mS.bX)](g4(mS.bY, mS.bZ));
            if (!a2 && t[g4(0x1cac, 'PYt$')](g4(mS.c0, mS.c1))) return log(g4(mS.c2, mS.c3) + p[g4(mS.c4, mS.c1)] + p[g4(mS.c5, mS.c6)]), await handleGrpcRequest(f, B, g, h);
            return log(g4(0xbad, mS.aD) + p[g4(mS.c7, mS.c8)] + p[g4(0x9ae, mS.c9)]), await handleXhttpRequest(f, B, g, h);
        } else {
            if (p[g4(mS.ca, mS.cb)] === g4(0x175, mS.aB)) return Response[g4(0x112e, 'rsIZ')](p[g4(mS.cc, 'Pt3!')][g4(mS.cd, mS.ce)](g4(0x1baa, 'd%lH') + p[g4(mS.cf, mS.m)], g4(0x10f7, mS.cg) + p[g4(mS.ch, '[p9(')]), 0x12d);
            if (E === g4(mS.ci, mS.f) || p[g4(mS.c4, 'oeP*')] === g4(mS.ck, 'rsIZ') || E === g4(0xae9, '9rQu') || p[g4(0x17d1, 'jODS')] === g4(0xb85, 'GzjL')) return handleDoHRequest(f);
            if (E === g4(mS.cl, 'jODS')) return await backendDiagnostic(g, p);
            if (E === g4(0x1c44, '#sM9') || E[g4(0x1d28, mS.cm)](g4(0x17ef, '2#Qk'))) return handleWarpRequest(f);
            if (E === g4(0xee0, 'M5Ii')) return taakaaXiBlockPage(f);
            if (E === g4(0x191e, mS.W) || E[g4(mS.cn, '60r9')](g4(mS.co, '[]Y1'))) return await handleInstall(f, g, p, x, z, q);
            if (panelHasAssets(g) && /\.\w{2,5}$/[g4(0x622, mS.ap)](p[g4(mS.cp, mS.ap)]) && s !== g4(mS.cq, '$p[^')) {
                const a4 = await panelFetch(g, p[g4(mS.cr, 'egod')])[g4(0x17d, mS.cs)](() => null);
                if (a4 && a4['ok']) return a4;
            }
            if (!x) return new Response(null, { 'status': 0x12e, 'headers': { 'Location': g4(mS.ct, mS.cg), 'Cache-Control': g4(mS.cu, mS.aF) } });
            if (g['KV'] && typeof g['KV'][g4(mS.cv, mS.aj)] === g4(mS.cw, 'vel(')) {
                const a5 = p[g4(mS.cx, mS.ak)][g4(mS.cy, 'PYt$')](0x1);
                if (a5 === z && z !== g4(0x1092, mS.cb)) {
                    const a6 = new URLSearchParams(p[g4(0x1de, 'egod')]);
                    return a6[g4(mS.cz, 'NxG1')](g4(0xe1c, mS.u), await MD5MD5(D + B)), new Response(g4(0x12b, mS.bg), { 'status': 0x12e, 'headers': { 'Location': g4(mS.cA, 'dbGg') + a6[g4(mS.cB, mS.cC)]() } });
                } else {
                    if (E === g4(0x163a, 'V#kN')) {
                        const a7 = f[g4(mS.cD, 'n7E3')][g4(0x119, mS.cE)](g4(0x11f9, mS.cF)) || '',
                            a8 = a7[g4(mS.cG, 'Gn7Q')](';')[g4(mS.cH, 'NxG1')](a9 => a9[g4(0xb64, '2#Qk')]()[g4(0x1b30, '5M6D')](g4(0xd28, '1qbp')))?.[g4(0xcfa, mS.bH)]('=')[0x1];
                        if (await verifySessionToken(a8, q, z, x)) return new Response(g4(0x652, mS.cI), { 'status': 0x12e, 'headers': { 'Location': g4(0xdfd, 'mRB^') } });
                        if (f[g4(mS.cJ, 'dZbH')] === g4(mS.cK, 'w(Wr')) {
                            const a9 = f[g4(mS.cL, 'b)3q')][g4(0x1d56, 'yxI7')](g4(mS.cM, 'GzjL')) || f[g4(mS.cN, mS.cO)][g4(0x1d56, mS.aj)](g4(mS.cP, mS.bm)) || g4(0x4e0, mS.cQ),
                                aa = loginRateCheck(a9);
                            if (!aa[g4(0x1b0a, mS.cR)]) return new Response(JSON[g4(mS.cS, mS.cT)]({ 'error': g4(mS.cU, '9rQu') }), { 'status': 0x1ad, 'headers': { 'Content-Type': g4(0xa93, mS.cV), 'Retry-After': String(aa[g4(0x1377, 'zs!c')]), 'Cache-Control': g4(mS.cW, 'Pt3!') } });
                            const ab = await f[g4(mS.cX, '9rQu')](),
                                ac = new URLSearchParams(ab),
                                ad = ac[g4(0x968, mS.cY)](g4(0x6ca, mS.cZ)),
                                ae = af => String(af == null ? '' : af)[g4(0xb64, '2#Qk')]()[g4(0x1462, 'vel(')](/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '');
                            if (timingSafeStrEqual(ae(ad), ae(x)) || w && timingSafeStrEqual(ae(ad), ae(w))) {
                                let af = null;
                                try {
                                    if (g['KV'] && typeof g['KV'][g4(0xd31, '5M6D')] === g4(mS.d0, 'ZgMu')) af = JSON[g4(0x980, mS.cm)](await g['KV'][g4(mS.d1, mS.Y)](g4(0x70c, 'oeP*')) || g4(mS.d2, mS.d3));
                                } catch (ah) {}
                                if (af && af[g4(0xb57, 'w(Wr')] && af[g4(mS.d4, mS.d5)]) {
                                    const ai = (ac[g4(mS.d6, 'wCGK')](g4(0x902, 'ZgMu')) || ac[g4(mS.d7, mS.aw)](g4(0x117, 'vel(')) || '')[g4(0xa89, 'oeP*')]();
                                    if (!ai) return new Response(JSON[g4(mS.d8, '%oj0')]({ 'need2fa': !![] }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x18cc, 'V#kN') } });
                                    if (!await totpVerify(af[g4(0x180b, 'IcEg')], ai)) return loginRecordFailure(a9), new Response(JSON[g4(mS.d9, mS.da)]({ 'need2fa': !![], 'error': g4(0x17a4, mS.ce) }), { 'status': 0x191, 'headers': { 'Content-Type': g4(mS.db, mS.dc) } });
                                }
                                const ag = new Response(JSON[g4(mS.dd, '[p9(')]({ 'success': !![] }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x96d, 'vel(') } });
                                return loginRecordSuccess(a9), ag[g4(0x7f4, mS.by)][g4(0x50a, mS.dc)](g4(0x14d3, mS.S), g4(0x1f07, mS.de) + await makeSessionToken(q, z, x) + g4(0x25d, 'C2T0')), ag;
                            } else loginRecordFailure(a9);
                        }
                        return await panelHtml(g, g4(0x276, mS.df));
                    } else {
                        if (E === g4(0x29c, 'zs!c')) {
                            if (!await isAuthed(f, q, z, x)) return new Response(g4(mS.dg, '$p[^'), { 'status': 0x12e, 'headers': { 'Location': g4(0x384, mS.dh) } });
                            const aj = await g['KV'][g4(mS.v, 'IcEg')](g4(0xf2f, mS.di));
                            if (!aj) return new Response(g4(mS.dj, '[p9('), { 'status': 0x190 });
                            const ak = JSON[g4(mS.dk, '5M6D')](aj);
                            if (!ak[g4(0x1689, mS.cb)]) return new Response(g4(0x14e2, mS.dl), { 'status': 0x190 });
                            const al = p[g4(0xde1, 'w3Tt')] + '//' + p[g4(mS.dm, 'dn8p')] + g4(0x30b, 'b)3q'),
                                am = g4(0xd1b, mS.dn) + ak[g4(mS.dp, mS.cC)] + g4(0x813, 'b)3q') + encodeURIComponent(al) + g4(mS.dq, mS.U);
                            const an = await fetch(am);
                            h[g4(mS.dr, 'C2T0')](tgSetMyCommands(ak[g4(mS.ds, 'zs!c')]));
                            const ao = await an[g4(mS.dt, 'd%lH')]();
                            return new Response(JSON[g4(mS.du, mS.aP)](ao, null, 0x2), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x1d41, mS.F) } });
                        } else {
                            if (E === g4(0x131d, 'mRB^')) {
                                if (f[g4(0x1f7, '7NO9')] === g4(mS.dv, 'b)3q')) return await handleTelegramWebhook(f, g, B, D);
                                return new Response(g4(mS.dw, '[p9('), { 'status': 0xc8 });
                            } else {
                                if (E === g4(mS.dx, '0Ua@') || E[g4(mS.dy, 'T3Fv')](g4(mS.dz, 'w3Tt'))) {
                                    const ap = f[g4(0xa09, mS.aL)][g4(0xb3b, mS.dA)](g4(0x426, 'b)3q')) || '',
                                        aq = ap[g4(mS.dB, mS.p)](';')[g4(0xc0c, mS.dC)](at => at[g4(0x8a2, 'Pt3!')]()[g4(0x1e81, 'T3Fv')](g4(0xab5, '60r9')))?.[g4(0x5b4, 'XITC')]('=')[0x1];
                                    if (!aq || !await verifySessionToken(aq, q, z, x)) return new Response(g4(mS.dD, 'PSkb'), { 'status': 0x12e, 'headers': { 'Location': g4(mS.dE, 'jODS') } });
                                    h[g4(mS.dF, mS.aB)](flushUsage(g));
                                    Date[g4(mS.dG, 'Gn7Q')]() - lastCentralSync > 0x927c0 && (lastCentralSync = Date[g4(mS.dH, mS.dI)](), h[g4(mS.dJ, 'GzjL')](centralHeartbeat(g)), h[g4(mS.dK, mS.dL)](refreshAnnouncements(g)));
                                    if (E === g4(0x179a, 'XITC')) {
                                        const at = f['cf'] || {};
                                        return new Response(JSON[g4(0x97f, 'GzjL')]({ 'asn': at[g4(mS.dM, mS.cZ)] || 0x0, 'isp': at[g4(mS.dN, mS.dL)] || '', 'country': at[g4(mS.dO, mS.dP)] || '', 'city': at[g4(mS.dQ, mS.dR)] || '', 'carrier': identifyCarrier(f) }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.dS, mS.dT), 'Cache-Control': g4(0x2c3, '5M6D') } });
                                    } else {
                                        if (E === g4(mS.dU, mS.c9)) {
                                            let au = null;
                                            try { au = JSON[g4(mS.dV, mS.aF)](await g['KV'][g4(0xf99, 'PSkb')](g4(mS.dW, 'Mmsl')) || g4(mS.dX, '[p9(')); } catch (aw) {}
                                            const av = await g['KV'][g4(0x968, 'mRB^')](g4(mS.dY, mS.cO));
                                            return new Response(JSON[g4(mS.dZ, mS.e0)]({ 'twofa': !!(au && au[g4(0x1a4, mS.cR)]), 'passwordSource': av ? 'kv' : g4(0xd35, '2#Qk'), 'envRecovery': !!w, 'kvSet': !!av, 'uuidPinned': !!await g['KV'][g4(0xf92, mS.B)](g4(0x1a9, 'dn8p')) }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0xf70, mS.aq), 'Cache-Control': g4(mS.e1, mS.e2) } });
                                        } else {
                                            if (E === g4(mS.e3, 'NxG1')) {
                                                if (f[g4(mS.e4, 'GzjL')] !== g4(mS.e5, 'dbGg')) return new Response(g4(mS.e6, mS.d3), { 'status': 0x195 });
                                                let ax = {};
                                                try { ax = await f[g4(mS.e7, mS.N)](); } catch (aC) {}
                                                const ay = (ax[g4(mS.e8, 'NxG1')] || '')[g4(mS.e9, mS.ea)]()[g4(mS.eb, '#sM9')](/[\r\n]/g, ''),
                                                    az = (ax[g4(0x4ab, '89Hn')] || '')[g4(mS.ec, 'w(Wr')]()[g4(0x6f0, 'M5Ii')](/[\r\n]/g, ''),
                                                    aA = timingSafeStrEqual(ay, String(x || '')[g4(mS.ed, mS.L)](/[\r\n]/g, '')) || w && timingSafeStrEqual(ay, String(w)[g4(mS.ee, mS.bc)](/[\r\n]/g, ''));
                                                if (!aA) return new Response(JSON[g4(0x840, '*lLT')]({ 'error': g4(mS.ef, '*lLT') }), { 'status': 0x193, 'headers': { 'Content-Type': g4(mS.eg, mS.eh) } });
                                                if (az[g4(0x181f, 'dn8p')] < 0x6) return new Response(JSON[g4(0xc60, mS.bH)]({ 'error': g4(0x8ce, mS.B) }), { 'status': 0x190, 'headers': { 'Content-Type': g4(0xef1, 'Gn7Q') } });
                                                try {
                                                    if (!(g[g4(mS.ei, mS.aS)] || g[g4(mS.ej, 'rsIZ')])) {
                                                        const aD = await g['KV'][g4(mS.ek, mS.el)](g4(mS.em, '$BSl'));
                                                        !aD && (await g['KV'][g4(0x156e, 'zs!c')](g4(0x1e9e, 'C2T0'), B), cachedWorkerUUID = B, cachedWorkerUUIDAt = Date[g4(mS.en, mS.eo)]());
                                                    }
                                                } catch (aE) {}
                                                await g['KV'][g4(0x1254, 'Mmsl')](g4(0x1747, 'V#kN'), az), cachedAdminPass = az, cachedAdminPassAt = Date[g4(0x1bb8, 'w3Tt')]();
                                                const aB = new Response(JSON[g4(mS.ep, 'CeJW')]({ 'success': !![] }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x4d1, 'n7E3') } });
                                                return aB[g4(0xce0, 'PYt$')][g4(mS.eq, mS.i)](g4(mS.er, mS.es), g4(0xe66, 'd%lH') + await makeSessionToken(q, z, az) + g4(mS.et, mS.eu)), aB;
                                            } else {
                                                if (E === g4(0x136a, 'NMJQ')) {
                                                    let aF = g4(0x9e4, 'mRB^');
                                                    try { aF = w ? g4(0x12a3, '$p[^') : await g['KV'][g4(mS.ev, 'yxI7')](g4(mS.ew, mS.aw)) ? 'kv' : g4(mS.ex, '%oj0'); } catch (aG) { aF = w ? g4(0x1c68, '[]Y1') : g4(mS.ey, '8Ys%'); }
                                                    return new Response(JSON[g4(mS.ez, 'dZbH')]({ 'password': x || '', 'source': aF }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.eA, mS.eB), 'Cache-Control': g4(mS.eC, '5M6D') } });
                                                } else {
                                                    if (E === g4(0x1d7d, '[]Y1')) {
                                                        const aH = randomBase32(0x20),
                                                            aI = encodeURIComponent(g4(mS.eD, mS.eE) + p[g4(mS.eF, mS.eG)] + ')'),
                                                            aJ = g4(mS.eH, mS.aj) + aI + g4(mS.eI, 'vel(') + aH + g4(0xe5a, 'n7E3') + encodeURIComponent(g4(mS.eJ, mS.f)) + g4(0x150f, 'jODS');
                                                        return new Response(JSON[g4(mS.eK, 'b)3q')]({ 'secret': aH, 'otpauth': aJ }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.eL, mS.eM), 'Cache-Control': g4(0xd05, 'dZbH') } });
                                                    } else {
                                                        if (E === g4(0xc70, '0Ua@')) {
                                                            if (f[g4(mS.eN, mS.eO)] !== g4(mS.eP, mS.eQ)) return new Response(g4(mS.eR, '9rQu'), { 'status': 0x195 });
                                                            let aK = {};
                                                            try { aK = await f[g4(mS.eS, 'w3Tt')](); } catch (aN) {}
                                                            const aL = (aK[g4(mS.eT, mS.eU)] || '')[g4(mS.eV, mS.eW)]()[g4(0x1e7d, mS.eX)](),
                                                                aM = (aK[g4(0xee9, mS.bN)] || '')[g4(mS.eY, 'dbGg')]()[g4(mS.eZ, mS.f0)]();
                                                            if (!aL) return new Response(JSON[g4(0x1ede, mS.f1)]({ 'error': g4(mS.f2, '60r9') }), { 'status': 0x190, 'headers': { 'Content-Type': g4(mS.f3, 'b)3q') } });
                                                            if (!await totpVerify(aL, aM)) return new Response(JSON[g4(0x1589, mS.df)]({ 'error': g4(0x1c69, mS.f4) }), { 'status': 0x190, 'headers': { 'Content-Type': g4(0x183e, mS.f5) } });
                                                            return await g['KV'][g4(mS.f6, mS.eE)](g4(0x13ea, mS.cC), JSON[g4(mS.f7, mS.eh)]({ 'enabled': !![], 'secret': aL, 'addedAt': Date[g4(0x1016, 'dZbH')]() })), new Response(JSON[g4(mS.f8, mS.f9)]({ 'success': !![] }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x403, mS.eQ) } });
                                                        } else {
                                                            if (E === g4(mS.fa, mS.fb)) {
                                                                if (f[g4(mS.fc, 'CeJW')] !== g4(mS.fd, mS.dT)) return new Response(g4(mS.fe, mS.eO), { 'status': 0x195 });
                                                                let aO = {};
                                                                try { aO = await f[g4(mS.ff, mS.fg)](); } catch (aR) {}
                                                                const aP = (aO[g4(mS.fh, '[p9(')] || '')[g4(0x1cc2, mS.fi)]()[g4(0xa16, mS.ap)]();
                                                                let aQ = null;
                                                                try { aQ = JSON[g4(mS.fj, 'w(Wr')](await g['KV'][g4(0x14ed, '[p9(')](g4(0x555, mS.eB)) || g4(mS.fk, 'T3Fv')); } catch (aS) {}
                                                                if (aQ && aQ[g4(mS.fl, mS.cY)] && aQ[g4(mS.fm, 'mRB^')] && !await totpVerify(aQ[g4(0x6ab, mS.fn)], aP)) return new Response(JSON[g4(0x1ca4, 'V#kN')]({ 'error': g4(0x17a4, '[]Y1') }), { 'status': 0x190, 'headers': { 'Content-Type': g4(0x1c90, mS.fo) } });
                                                                return await g['KV'][g4(mS.fp, mS.fq)](g4(mS.fr, mS.fs)), new Response(JSON[g4(mS.ft, mS.fu)]({ 'success': !![] }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x4d7, 'w(Wr') } });
                                                            } else {
                                                                if (E === g4(mS.fv, 'mRB^')) {
                                                                    const aT = JSON[g4(0x1d53, mS.cQ)](await logReadAll(g));
                                                                    return new Response(aT, { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.fw, mS.cQ) } });
                                                                } else {
                                                                                                                                                                                                       }
if (a5 === g4(mS.fx, mS.fy))
    try {
        const aU = await getCloudflareUsage(p[g4(0x14ce, 'yxI7')][g4(0x63a, 'w(Wr')](g4(mS.fz, 'dn8p')), p[g4(0x270, mS.fA)][g4(mS.y, mS.fB)](g4(mS.fC, mS.Y)), p[g4(0x136d, 'NMJQ')][g4(mS.fD, mS.fE)](g4(0x8af, mS.fF)), p[g4(0x19bd, 'Pt3!')][g4(mS.d6, 'wCGK')](g4(0x18e3, mS.dT)));
        return new Response(JSON[g4(mS.fG, 'V#kN')](aU, null, 0x2), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.fH, 'ZgMu') } });
    } catch (aV) {
        const aW = { 'msg': g4(mS.fI, mS.fJ) + aV[g4(0x167c, mS.e0)], 'error': aV[g4(0x1573, 'dbGg')] };
        return new Response(JSON[g4(0x1ede, 'dn8p')](aW, null, 0x2), { 'status': 0x1f4, 'headers': { 'Content-Type': g4(0x1488, 'jODS') } });
    } else {
        if (a5 === g4(mS.fK, 'yxI7')) {
            if (p[g4(0x1639, mS.fL)][g4(mS.fM, mS.fN)](g4(0x1e44, mS.fO))) {
                const aX = p[g4(mS.fP, mS.fQ)][g4(mS.fR, 'Mmsl')](g4(0x88e, mS.w));
                try {
                    new URL(aX);
                    const aY = await requestBestApi([aX], p[g4(mS.fS, 'n7E3')][g4(0x119, mS.fT)](g4(mS.fU, '[p9(')) || g4(0x11c9, 'IcEg'));
                    let aZ = aY[0x0][g4(mS.fV, '9rQu')] > 0x0 ? aY[0x0] : aY[0x1];
                    return aZ = aZ[g4(mS.mT, 'w3Tt')](b0 => b0[g4(0x479, 'PYt$')](/#(.+)$/, (b1, b2) => '#' + decodeURIComponent(b2))), new Response(JSON[g4(mS.mU, '8Ys%')]({ 'success': !![], 'data': aZ }, null, 0x2), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0xf5a, mS.mV) } });
                } catch (b0) {
                    const b1 = { 'msg': g4(0x12c2, 'oeP*') + b0[g4(mS.mW, mS.be)], 'error': b0[g4(0x1605, mS.a8)] };
                    return new Response(JSON[g4(0x1b1c, '0Ua@')](b1, null, 0x2), { 'status': 0x1f4, 'headers': { 'Content-Type': g4(mS.mX, mS.mY) } });
                }
            }
            return new Response(JSON[g4(0xeee, mS.fT)]({ 'success': ![], 'data': [] }, null, 0x2), { 'status': 0x193, 'headers': { 'Content-Type': g4(mS.mZ, mS.n0) } });
        } else {
            if (E === g4(0x1697, 'PSkb')) {
                const b2 = [g4(mS.n1, mS.eh), g4(mS.n2, 'Pt3!'), g4(0x1c55, '7NO9'), g4(mS.n3, '$p[^'), g4(mS.n4, mS.fs)][g4(0x11fd, 'NMJQ')](b6 => p[g4(0x18ea, 'jODS')][g4(0x12d8, 'Pt3!')](b6)) || null;
                if (!b2) return new Response(JSON[g4(mS.n5, mS.n6)]({ 'error': g4(0x1ed7, 'mRB^') }), { 'status': 0x190, 'headers': { 'Content-Type': g4(0x134e, 'yxI7') } });
                const b3 = p[g4(mS.n7, '#sM9')][g4(0x1d56, mS.n8)](b2),
                    b4 = Date[g4(mS.n9, mS.eU)]();
                let b5;
                try {
                    parsedSocks5Address = await getSocks5Account(b3, getProxyDefaultPort(b2));
                    const { username: b6, password: b7, hostname: b8, port: b9 } = parsedSocks5Address,
                        ba = b6 && b7 ? b6 + ':' + b7 + '@' + b8 + ':' + b9 : b8 + ':' + b9;
                    try {
                        const bb = g4(0xaf5, '9rQu'),
                            bc = 0x1bb,
                            bd = new TextEncoder(),
                            be = new TextDecoder(),
                            bf = createRequestTcpConnector(f);
                        let bg = null,
                            bh = null;
                        try {
                            bg = b2 === g4(mS.na, mS.nb) ? await socks5Connect(bb, bc, new Uint8Array(0x0), bf) : b2 === g4(0x468, '9rQu') ? await turnConnect(parsedSocks5Address, bb, bc, bf) : b2 === g4(mS.nc, 'd%lH') ? await sstpConnect(parsedSocks5Address, bb, bc, bf) : b2 === g4(0x1d2f, mS.de) && isIPHostname(b8) ? await httpsConnect(bb, bc, new Uint8Array(0x0), bf) : await httpConnect(bb, bc, new Uint8Array(0x0), b2 === g4(0x1914, mS.bZ), bf);
                            if (!bg) throw new Error(g4(mS.nd, '[p9('));
                            bh = new TlsClient(bg, { 'serverName': bb, 'insecure': !![] }), await bh[g4(0x1ce1, mS.bc)](), await bh[g4(mS.ne, 'V#kN')](bd[g4(mS.nf, '7NO9')](g4(0x8b6, mS.bm) + bb + g4(mS.ng, mS.fJ)));
                            let bi = new Uint8Array(0x0),
                                bj = -0x1,
                                bk = null,
                                bl = ![];
                            const bm = 0x40 * 0x400;
                            while (bi[g4(mS.nh, 'oeP*')] < bm) {
                                const bq = await bh[g4(mS.ni, mS.nj)]();
                                if (!bq) break;
                                if (bq[g4(0x186f, mS.nk)] === 0x0) continue;
                                bi = concatByteData(bi, bq);
                                if (bj === -0x1) {
                                    const br = bi[g4(mS.nl, 'PYt$')]((bs, bt) => bt < bi[g4(0x1214, '1qbp')] - 0x3 && bi[bt] === 0xd && bi[bt + 0x1] === 0xa && bi[bt + 0x2] === 0xd && bi[bt + 0x3] === 0xa);
                                    if (br !== -0x1) {
                                        bj = br + 0x4;
                                        const bs = be[g4(mS.nm, mS.fQ)](bi[g4(mS.nn, mS.no)](0x0, bj)),
                                            bt = bs[g4(0x102a, '89Hn')]('\x0d\x0a')[0x0] || '',
                                            bu = bt[g4(0x7cf, '89Hn')](/HTTP\/\d\.\d\s+(\d+)/),
                                            bv = bu ? parseInt(bu[0x1], 0xa) : NaN;
                                        if (!Number[g4(mS.np, mS.bA)](bv) || bv < 0xc8 || bv >= 0x12c) throw new Error(g4(mS.nq, '8Ys%') + (bt || g4(mS.nr, 'yxI7')));
                                        const bw = bs[g4(0x1cfc, '6UCx')](/\r\nContent-Length:\s*(\d+)/i);
                                        if (bw) bk = parseInt(bw[0x1], 0xa);
                                        bl = /\r\nTransfer-Encoding:\s*chunked/i[g4(0x1d5c, '5M6D')](bs);
                                    }
                                }
                                if (bj !== -0x1 && bk !== null && bi[g4(mS.ns, mS.aP)] >= bj + bk) break;
                                if (bj !== -0x1 && bl && be[g4(mS.nt, mS.nu)](bi)[g4(0x5e0, 'w3Tt')](g4(0x1c0a, 'XITC'))) break;
                            }
                            if (bj === -0x1) throw new Error(g4(mS.nv, 'NMJQ'));
                            const bn = be[g4(mS.nw, '0Ua@')](bi),
                                bo = bn[g4(0x89f, 'Gn7Q')](/(?:^|\n)ip=(.*)/)?.[0x1],
                                bp = bn[g4(0x4fc, mS.bG)](/(?:^|\n)loc=(.*)/)?.[0x1];
                            if (!bo || !bp) throw new Error(g4(mS.nx, 'ZgMu'));
                            b5 = { 'success': !![], 'proxy': b2 + g4(mS.ny, 'zs!c') + ba, 'ip': bo, 'loc': bp, 'responseTime': Date[g4(mS.nz, mS.dR)]() - b4 };
                        } finally {
                            try { bh ? bh[g4(mS.nA, mS.nB)]() : await bg?.[g4(0xfc0, '7NO9')]?.(); } catch (bx) {}
                        }
                    } catch (by) {
                        b5 = { 'success': ![], 'error': by[g4(mS.nC, mS.fF)], 'proxy': b2 + g4(0xb05, 'IcEg') + ba, 'responseTime': Date[g4(mS.nD, mS.nE)]() - b4 };
                    }
                } catch (bz) {
                    b5 = { 'success': ![], 'error': bz[g4(mS.nF, mS.nG)], 'proxy': b2 + g4(mS.nH, 'yxI7') + b3, 'responseTime': Date[g4(mS.nI, '$p[^')]() - b4 };
                }
                return new Response(JSON[g4(mS.nJ, '%oj0')](b5, null, 0x2), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x1912, 'NxG1') } });
            } else {
                if (E === g4(mS.nK, mS.bA)) {
                    const bA = JSON[g4(mS.nL, mS.nM)](await g['KV'][g4(mS.nN, 'XITC')](g4(0x1e0f, '#sM9')) || g4(mS.nO, '7NO9')),
                        bB = await announceSubLinks(g, { 'baseUrl': p[g4(mS.nP, 'CeJW')] + '//' + p[g4(0x1c57, mS.bB)], 'health': bA });
                    return new Response(JSON[g4(mS.nQ, '89Hn')](bB, null, 0x2), { 'status': bB[g4(0x31a, '$p[^')] ? 0x190 : 0xc8, 'headers': { 'Content-Type': g4(0xf8a, 'NMJQ') } });
                } else {
                    if (E === g4(0x15e5, mS.nR)) {
                        const bC = await publishSubMirror(g, p[g4(0x3b0, 'b)3q')] + '//' + p[g4(0x845, mS.ak)]),
                            bD = !bC[g4(mS.nS, mS.nT)] && Array[g4(0x12bb, mS.nU)](bC[g4(0xe62, 'dn8p')]) && bC[g4(0x848, 'Pt3!')][g4(0x138f, mS.nV)](bE => bE['ok']);
                        return new Response(JSON[g4(mS.nW, mS.bg)](bC, null, 0x2), { 'status': bC[g4(mS.nX, 'NxG1')] ? 0x190 : bD ? 0xc8 : 0x1f6, 'headers': { 'Content-Type': g4(0x183e, '7NO9') } });
                    } else {
                        if (E === g4(0x19a1, mS.nY)) {
                            let bE = null;
                            try { bE = JSON[g4(0xfe3, '*lLT')](await g['KV'][g4(mS.nZ, mS.o0)](g4(0x4ca, 'n7E3')) || g4(mS.o1, mS.o2)); } catch (bF) {}
                            if (f[g4(0x1eaf, mS.o3)] === g4(0x1010, mS.bT)) {
                                let bG = {};
                                try { bG = await f[g4(0x77f, '7NO9')](); } catch (bH) {}
                                try {
                                    if (bG[g4(mS.o4, mS.o5)]) {
                                        if (!bE || !bE['id']) bE = await warpRegisterAccount();
                                        const { api: bI } = await getCentralApi(g);
                                        if (!bI) throw new Error(g4(mS.o6, 'V#kN'));
                                        let bJ = [];
                                        try {
                                            const bM = await fetch(bI + g4(mS.o7, mS.o8), { 'headers': { 'User-Agent': g4(0x1bae, 'PYt$') } }),
                                                bN = await bM[g4(mS.o9, mS.O)]();
                                            bJ = Array[g4(0x91d, 'w3Tt')](bN[g4(0x102e, mS.oa)]) ? bN[g4(0x1bc0, '[p9(')] : [];
                                        } catch (bO) {}
                                        if (!bJ[g4(0x925, mS.o5)]) throw new Error(g4(mS.ob, '$BSl'));
                                        let bK = ![],
                                            bL = '';
                                        for (const bP of bJ) {
                                            try { await warpApplyLicense(bE, String(bP)[g4(0x1e7d, '*lLT')]()), bK = !![]; break; } catch (bQ) { bL = bQ && bQ[g4(mS.oc, mS.od)] ? bQ[g4(0x572, mS.fb)] : String(bQ); }
                                        }
                                        if (!bK) throw new Error(g4(0x9d6, mS.oe) + bL + ')');
                                    } else {
                                        if (bG[g4(mS.of, mS.n0)]) {
                                            if (!bE || !bE['id']) bE = await warpRegisterAccount();
                                            await warpApplyLicense(bE, String(bG[g4(0x17e9, mS.cF)])[g4(0xa3b, mS.U)]());
                                        } else {
                                            bE = await warpRegisterAccount();
                                            if (bG[g4(0x1624, '60r9')]) {
                                                const bR = await warpRegisterAccount();
                                                bR[g4(0x99b, '#sM9')] = !![], bE[g4(mS.og, mS.fE)] = bR;
                                            }
                                        }
                                    }
                                    return bE[g4(0x1dc5, 'T3Fv')] = !![], await g['KV'][g4(mS.oh, 'ZgMu')](g4(mS.oi, mS.fy), JSON[g4(0x1aa3, mS.ah)](bE)), h[g4(mS.oj, 'V#kN')](requestLogRecord(g, f, F, bG[g4(mS.ok, mS.ol)] ? g4(0x16f, mS.O) : g4(0x1656, mS.df), config_JSON)), new Response(JSON[g4(0x1aa3, '6UCx')](warpPublicView(bE, networkSettings && networkSettings[g4(0x44b, mS.om)])), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x4b6, mS.on) } });
                                } catch (bS) {
                                    return new Response(JSON[g4(mS.oo, mS.N)]({ 'registered': !!(bE && bE[g4(mS.op, 'egod')]), 'error': bS && bS[g4(mS.oq, mS.or)] ? bS[g4(mS.os, mS.ot)] : String(bS) }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x1875, mS.d3) } });
                                }
                            }
                            return new Response(JSON[g4(0x108b, mS.ou)](warpPublicView(bE, networkSettings && networkSettings[g4(0x1de5, 'ZgMu')])), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x6ff, 'Pt3!') } });
                        } else {
                            if (E === g4(mS.ov, '8Ys%')) {
                                const bT = await getPoolHosts(g),
                                    bU = p[g4(0x1ef7, 'd%lH')][g4(mS.ow, 'w(Wr')](g4(0x58e, mS.ox)) ? await checkDomainHealth(g, bT, p[g4(mS.oy, mS.W)]) : JSON[g4(mS.oz, 'CeJW')](await g['KV'][g4(0x4cb, mS.Z)](g4(mS.oA, 'jODS')) || g4(0x999, '2#Qk'));
                                return new Response(JSON[g4(0x1ca4, 'V#kN')]({ 'hosts': bT, 'health': bU }, null, 0x2), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x376, 'dbGg') } });
                            } else {
                                if (E === g4(0x19ab, mS.nM)) {
                                    if (p[g4(0x64a, '*lLT')][g4(0x1701, mS.oB)](g4(mS.oC, mS.ak))) await refreshAnnouncements(g);
                                    return new Response(await g['KV'][g4(mS.oD, mS.d5)](g4(0x1872, 'mRB^')) || g4(mS.oE, '2#Qk'), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.oF, 'dn8p') } });
                                } else {
                                    if (E === g4(mS.oG, mS.L)) {
                                        const { api: bV, token: bW } = await getCentralApi(g);
                                        if (!bV) return new Response(JSON[g4(mS.nW, mS.bg)]({ 'configured': ![] }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x1660, 'egod') } });
                                        try {
                                            const bX = await fetch(bV + g4(0x1c33, mS.oH), { 'headers': bW ? { 'Authorization': g4(mS.oI, mS.cF) + bW } : {} }),
                                                bY = await bX[g4(0x18f9, mS.oJ)]()[g4(0x1538, mS.oK)](() => ({}));
                                            return new Response(JSON[g4(0xac3, mS.oL)]({ 'configured': !![], ...bY }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.oM, mS.oN) } });
                                        } catch (bZ) {
                                            return new Response(JSON[g4(mS.oO, 'oeP*')]({ 'configured': !![], 'error': bZ[g4(mS.oP, 'ZgMu')] }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.oQ, '8Ys%') } });
                                        }
                                    } else {
                                        if (E === g4(mS.oR, mS.dT)) {
                                            const { api: c0, token: c1 } = await getCentralApi(g);
                                            if (!c0) return new Response(JSON[g4(0x401, mS.oB)]({ 'ok': ![], 'error': g4(0x87d, '#sM9') }), { 'status': 0x190, 'headers': { 'Content-Type': g4(0xf5a, mS.mV) } });
                                            try {
                                                const c2 = await fetch(c0 + g4(0x1e5b, 'Gn7Q'), { 'method': g4(mS.oS, mS.fi), 'headers': { 'Content-Type': g4(mS.oT, 'yxI7'), ...c1 ? { 'Authorization': g4(0x13b, mS.oU) + c1 } : {} }, 'body': await f[g4(mS.oV, 'rsIZ')]() });
                                                return h[g4(mS.oW, mS.oW)](refreshAnnouncements(g)), new Response(await c2[g4(0x1406, 'mRB^')](), { 'status': c2[g4(0xfef, 'mRB^')], 'headers': { 'Content-Type': g4(0xf5a, '89Hn') } });
                                            } catch (c3) {
                                                return new Response(JSON[g4(mS.oX, 'XITC')]({ 'ok': ![], 'error': c3[g4(mS.oY, mS.ot)] }), { 'status': 0x1f6, 'headers': { 'Content-Type': g4(0x12ff, mS.fT) } });
                                            }
                                        } else {
                                            if (E === g4(0x141e, 'T3Fv')) {
                                                const c4 = String(Version)[g4(0x1a72, 'rsIZ')](/^[vV]/, '');
                                                let c5 = '',
                                                    c6 = '',
                                                    c7 = '';
                                                try {
                                                    const c9 = await fetch(TAAKAA_VERSION_URL, { 'headers': { 'User-Agent': g4(0xf3a, mS.nG) }, 'cf': { 'cacheTtl': 0x0 } });
                                                    if (c9['ok']) {
                                                        const ca = await c9[g4(0x4f0, mS.oZ)]();
                                                        c5 = String(ca[g4(mS.p0, mS.p1)] || '')[g4(0x6c8, '8Ys%')](/^[vV]/, ''), c6 = ca[g4(mS.p2, mS.p3)] || '', c7 = ca[g4(mS.p4, mS.bp)] || '';
                                                    }
                                                } catch (cb) {}
                                                const c8 = !!c5 && versionGreater(c5, c4);
                                                return new Response(JSON[g4(0x10a7, mS.c1)]({ 'current': c4, 'latest': c5, 'updateAvailable': c8, 'notes': c6, 'worker_url': c7 }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.p5, mS.p6), 'Cache-Control': g4(0x102f, 'w3Tt') } });
                                            } else {
                                                if (E === g4(mS.p7, mS.fy)) {
                                                    if (f[g4(0x1cc9, 'T3Fv')] !== g4(mS.p8, 'yxI7')) return new Response(JSON[g4(mS.p9, mS.L)]({ 'error': g4(0x1d00, 'PYt$') }), { 'status': 0x195, 'headers': { 'Content-Type': g4(0x1767, mS.e2) } });
                                                    const cc = (co, cp) => new Response(JSON[g4(0x93a, 'dZbH')](Object[g4(0xf5b, 'M5Ii')]({ 'error': co }, cp || {})), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x68f, 'oeP*'), 'Cache-Control': g4(0x15c7, '$BSl') } });
                                                    let ce = {};
                                                    try { ce = await f[g4(mS.pa, mS.i)](); } catch (co) {}
                                                    const cg = String(ce[g4(0xa65, mS.dR)] || '')[g4(0x1aa0, mS.pb)]();
                                                    if (!cg) return cc(g4(mS.pc, 'PYt$'));
                                                    let ch;
                                                    try { ch = await cfVerifyToken(cg); } catch (cp) { ch = { 'ok': ![] }; }
                                                    if (!ch || !ch['ok']) return cc(g4(0x19c2, 'egod'));
                                                    let ci = String(ce[g4(mS.pd, mS.F)] || '')[g4(0x1bdd, 'b)3q')]();
                                                    if (!ci) {
                                                        let cq = [];
                                                        try { cq = await cfListAccounts(cg); } catch (cs) {}
                                                        if (!cq[g4(mS.pe, mS.c8)]) return cc(g4(mS.pf, mS.pg));
                                                        if (cq[g4(mS.ph, '7NO9')] === 0x1) ci = cq[0x0]['id'];
                                                        else return cc(g4(0xd19, '#sM9'), { 'accounts': cq });
                                                    }
                                                    let ck = String(ce[g4(mS.pi, mS.f)] || '')[g4(mS.pj, mS.eE)]();
                                                    if (!ck) {
                                                        const ct = /^([a-z0-9][a-z0-9-]*)\.[a-z0-9-]+\.workers\.dev$/i[g4(0x1b0c, mS.fE)](p[g4(0x1038, '89Hn')]);
                                                        if (ct) ck = ct[0x1];
                                                        else return cc(g4(0x192d, mS.pk));
                                                }
                                                                                                                                                                            try {
                                                                                                                            const cu = await fetch(CF_API + g4(mS.pl, mS.es) + ci + g4(0x18d0, mS.aN) + ck + g4(0xa7d, mS.oJ), { 'headers': cfHeaders(cg) }),
                                                                                                                                cv = await cfJson(cu);
                                                                                                                            if (!cv || !cv[g4(0x1789, mS.pm)]) return cc(g4(mS.pn, 'Pt3!'));
                                                                                                                        } catch (cw) { return cc(g4(0xca3, '[]Y1')); }
                                                                                                                        let cl = TAAKAA_WORKER_SRC_FALLBACK,
                                                                                                                            cm = '';
                                                                                                                        try {
                                                                                                                            const cx = await fetch(TAAKAA_VERSION_URL, { 'headers': { 'User-Agent': g4(mS.po, '[p9(') } });
                                                                                                                            if (cx['ok']) {
                                                                                                                                const cy = await cx[g4(0x574, 'b)3q')]();
                                                                                                                                if (cy[g4(mS.pp, 'M5Ii')]) cl = cy[g4(mS.pq, '5M6D')];
                                                                                                                                cm = String(cy[g4(0x1568, mS.pr)] || '')[g4(0x6f0, mS.oW)](/^[vV]/, '');
                                                                                                                            }
                                                                                                                        } catch (cz) {}
                                                                                                                        let cn = '';
                                                                                                                        try {
                                                                                                                            const cA = await fetch(cl, { 'headers': { 'User-Agent': g4(mS.ps, mS.eu) } });
                                                                                                                            if (!cA['ok']) throw new Error(g4(mS.pt, mS.pu) + cA[g4(0x29f, '$BSl')]);
                                                                                                                            cn = await cA[g4(mS.pv, mS.pw)]();
                                                                                                                        } catch (cB) { return cc(g4(mS.px, 'dZbH'), { 'detail': cB && cB[g4(0x45f, 'PSkb')] || String(cB) }); }
                                                                                                                        if (cn[g4(mS.py, mS.pz)] < 0x3e8 || !/export\s+default|addEventListener\s*\(/[g4(0x734, 'egod')](cn)) return cc(g4(mS.pA, mS.pB));
                                                                                                                        try {
                                                                                                                            const cC = new FormData();
                                                                                                                            cC[g4(0x1e0d, 'V#kN')](g4(mS.pC, '1qbp'), new Blob([JSON[g4(mS.pD, 'Mmsl')]({ 'main_module': g4(0x1781, mS.f0) })], { 'type': g4(0xeae, mS.nE) })), cC[g4(mS.pE, mS.aD)](g4(mS.pF, '%oj0'), new Blob([cn], { 'type': g4(mS.pG, mS.fL) }), g4(mS.pH, mS.pI));
                                                                                                                            const cD = await fetch(CF_API + g4(mS.pJ, mS.aw) + ci + g4(0x1efe, 'PYt$') + ck + g4(mS.pK, mS.pL), { 'method': g4(0x1760, 'GzjL'), 'headers': cfHeaders(cg), 'body': cC }),
                                                                                                                                cE = await cfJson(cD);
                                                                                                                            if (!cE || !cE[g4(0x182c, 'IcEg')]) {
                                                                                                                                const cF = cE && cE[g4(mS.pM, 'V#kN')] && cE[g4(0x1851, mS.pN)][0x0] && cE[g4(mS.pO, mS.n8)][0x0][g4(0xa52, mS.pP)] || g4(0x1396, 'XITC') + cD[g4(mS.pQ, mS.W)];
                                                                                                                                return cc(g4(0x47a, mS.bm), { 'detail': cF });
                                                                                                                            }
                                                                                                                        } catch (cG) { return cc(g4(mS.pR, mS.pS), { 'detail': cG && cG[g4(mS.pT, 'V#kN')] || String(cG) }); }
                                                                                                                        return h[g4(0x1102, 'zs!c')](requestLogRecord(g, f, F, g4(mS.pU, '1qbp'), config_JSON)), new Response(JSON[g4(0x16a5, mS.pV)]({ 'success': !![], 'version': cm || undefined }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x4b6, mS.es), 'Cache-Control': g4(0x128c, '1qbp') } });
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
}
try {
    config_JSON = await readConfigJson(g, D, B, q);
} catch (cH) {
    console[g4(mS.pW, '$p[^')](g4(0x32a, '[p9(') + cH[g4(mS.pX, 'w3Tt')]);
    const cI = new Date()[g4(0x1055, mS.bg)]();
    config_JSON = { 'TIME': cI, 'HOST': D, 'HOSTS': [D], 'UUID': B, 'PATH': '/', 'protocolType': g4(0x1ef6, '1qbp'), 'transportProtocol': 'ws', 'gRPCmode': g4(0x85c, '6UCx'), 'skipCertVerify': ![], 'enable0RTT': ![], 'tlsFragment': null, 'randomPath': ![], 'Fingerprint': g4(0x12e5, 'yxI7'), 'optimizedSubGeneration': { 'local': !![], 'localIPPool': { 'randomIP': !![], 'randomCount': 0x10, 'specifiedPorts': -0x1 }, 'SUB': null, 'SUBNAME': g4(0x1b50, 'T3Fv'), 'SUBUpdateTime': 0x3, 'TOKEN': await MD5MD5(D + B) }, 'CF': { 'Email': null, 'GlobalAPIKey': null, 'AccountID': null, 'APIToken': null, 'UsageAPI': null, 'Usage': { 'success': ![], 'pages': 0x0, 'workers': 0x0, 'total': 0x0, 'max': 0x186a0 } }, 'TG': { 'enabled': ![], 'BotToken': null, 'ChatID': null }, 'loadTime': g4(mS.pY, mS.nY) };
}
if (E === g4(0x16fe, 'wCGK'))
    try {
        return config_JSON = await readConfigJson(g, D, B, q, !![]), h[g4(0x943, 'T3Fv')](requestLogRecord(g, f, F, g4(0x1ed, mS.fy), config_JSON)), config_JSON[g4(0x30c, '*lLT')] = g4(0x51d, 'XITC'), new Response(JSON[g4(mS.dZ, 'yxI7')](config_JSON, null, 0x2), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x4d7, mS.pZ) } });
    } catch (cJ) {
        const cK = { 'msg': g4(mS.q0, 'Gn7Q') + cJ[g4(0x640, mS.q1)], 'error': cJ[g4(0x1537, 'V#kN')] };
        return new Response(JSON[g4(mS.q2, mS.q3)](cK, null, 0x2), { 'status': 0x1f4, 'headers': { 'Content-Type': g4(mS.q4, mS.pN) } });
    } else {
        if (f[g4(0x1590, mS.q5)] === g4(mS.eP, 'dn8p')) {
            if (E === g4(mS.q6, '$p[^'))
                try {
                    const cL = await f[g4(mS.dt, mS.dR)]();
                    if (!cL[g4(0x202, mS.aY)] || !cL[g4(0x870, 'dn8p')]) return new Response(JSON[g4(0x1c7e, mS.U)]({ 'error': g4(mS.q7, '60r9') }), { 'status': 0x190, 'headers': { 'Content-Type': g4(0x1660, mS.q8) } });
                    return await putConfig(g, JSON[g4(0x1bfa, 'XITC')](cL, null, 0x2)), h[g4(mS.q9, mS.qa)](requestLogRecord(g, f, F, g4(mS.qb, mS.nE), config_JSON)), new Response(JSON[g4(0x1b1c, '0Ua@')]({ 'success': !![], 'message': g4(0x1844, mS.qc) }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x134e, mS.qd) } });
                } catch (cM) {
                    return console[g4(mS.qe, 'yxI7')](g4(0xbba, 'yxI7'), cM), new Response(JSON[g4(mS.qf, '8Ys%')]({ 'error': g4(mS.qg, mS.qh) + cM[g4(0xdbd, 'w3Tt')] }), { 'status': 0x1f4, 'headers': { 'Content-Type': g4(mS.qi, mS.qj) } });
                } else {
                if (E === g4(0x11f0, '%oj0'))
                    try {
                        const cN = await f[g4(mS.qk, mS.ql)](),
                            cO = { 'Email': null, 'GlobalAPIKey': null, 'AccountID': null, 'APIToken': null, 'UsageAPI': null };
                        if (!cN[g4(0x1028, mS.eu)] || cN[g4(0x1ac0, mS.eE)] !== !![]) {
                            if (cN[g4(mS.qm, mS.qn)] && cN[g4(0x5d3, mS.q3)]) cO[g4(0xcee, '9rQu')] = cN[g4(0x1317, mS.qo)], cO[g4(mS.qp, mS.b3)] = cN[g4(mS.qq, mS.qr)];
                            else {
                                if (cN[g4(0x166, mS.qs)] && cN[g4(mS.qt, mS.cF)]) cO[g4(mS.qu, mS.qv)] = cN[g4(mS.qw, 'PSkb')], cO[g4(mS.qx, '[p9(')] = cN[g4(0x135b, 'IcEg')];
                                else {
                                    if (cN[g4(mS.qy, '0Ua@')]) cO[g4(0x6f4, mS.qz)] = cN[g4(0x1756, mS.eE)];
                                    else return new Response(JSON[g4(mS.qA, mS.pw)]({ 'error': g4(0xda6, mS.bg) }), { 'status': 0x190, 'headers': { 'Content-Type': g4(0x6ff, mS.fB) } });
                                }
                            }
                        }
                        return await g['KV'][g4(0x108d, 'M5Ii')](g4(0x1af, 'PYt$'), JSON[g4(mS.nQ, mS.ql)](cO, null, 0x2)), h[g4(mS.qB, mS.p6)](requestLogRecord(g, f, F, g4(0x3b6, 'vel('), config_JSON)), new Response(JSON[g4(0x1ca4, 'V#kN')]({ 'success': !![], 'message': g4(0xcff, 'mRB^') }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.qC, '89Hn') } });
                    } catch (cP) {
                        return console[g4(0xdc0, mS.eu)](g4(0xf2b, mS.ox), cP), new Response(JSON[g4(mS.qD, 'NMJQ')]({ 'error': g4(mS.qE, mS.qF) + cP[g4(mS.qG, 'Gn7Q')] }), { 'status': 0x1f4, 'headers': { 'Content-Type': g4(0xf5a, mS.qH) } });
                    } else {
                    if (E === g4(0x2e1, mS.oZ))
                        try {
                            const cQ = await f[g4(mS.qI, mS.qJ)]();
                            let cR = null,
                                cS = null;
                            if (cQ[g4(0x158b, mS.qo)] && cQ[g4(mS.qK, mS.qL)] === !![]) {
                                const cT = { 'BotToken': null, 'ChatID': null };
                                await g['KV'][g4(0x13ff, mS.f)](g4(0x1749, mS.qM), JSON[g4(mS.qN, mS.fi)](cT, null, 0x2));
                            } else {
                                if (!cQ[g4(mS.qO, mS.pr)] || !cQ[g4(0x186a, mS.qP)]) return new Response(JSON[g4(0x30e, mS.aw)]({ 'error': g4(0xfb2, mS.qQ) }), { 'status': 0x190, 'headers': { 'Content-Type': g4(0x96d, mS.qR) } });
                                await g['KV'][g4(mS.qS, mS.fA)](g4(mS.qT, mS.qU), JSON[g4(0x13f9, mS.qV)](cQ, null, 0x2));
                                try {
                                    const cU = p[g4(mS.qW, 'oeP*')] + '//' + p[g4(mS.qX, '60r9')] + g4(mS.qY, '9rQu'),
                                        cV = await fetch(g4(mS.qZ, mS.r0) + cQ[g4(0xc96, 'Gn7Q')] + g4(mS.r1, mS.nk) + encodeURIComponent(cU) + g4(0x1cf8, '89Hn')),
                                        cW = await cV[g4(0x978, mS.r2)]()[g4(mS.r3, mS.ap)](() => ({}));
                                    h[g4(mS.q9, mS.L)](tgSetMyCommands(cQ[g4(mS.qO, mS.pr)])), cR = !!cW['ok'];
                                    if (!cW['ok']) cS = cW[g4(0x1d7f, mS.r4)] || g4(0x1245, mS.r5);
                                } catch (cX) { cR = ![], cS = cX[g4(0xf66, mS.pB)]; }
                            }
                            return h[g4(mS.r6, 'b)3q')](requestLogRecord(g, f, F, g4(0x76f, mS.nM), config_JSON)), new Response(JSON[g4(0x108b, '60r9')]({ 'success': !![], 'message': g4(0x18a6, mS.r7), 'webhookSet': cR, 'webhookError': cS }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x1273, '8Ys%') } });
                        } catch (cY) {
                            return console[g4(0x455, mS.fO)](g4(0xde3, mS.oK), cY), new Response(JSON[g4(0xb53, mS.r8)]({ 'error': g4(mS.r9, 'yxI7') + cY[g4(0x1f1, 'n7E3')] }), { 'status': 0x1f4, 'headers': { 'Content-Type': g4(0x646, mS.c6) } });
                        } else {
                        if (E === g4(0x6fd, mS.ra))
                            try {
                                const cZ = JSON[g4(mS.rb, '#sM9')](await g['KV'][g4(0x75e, 'dZbH')](g4(mS.rc, '$p[^')) || '{}');
                                if (f[g4(mS.rd, mS.fF)] === g4(mS.dv, 'b)3q')) {
                                    const d7 = await f[g4(mS.re, 'C2T0')]();
                                    cZ[g4(mS.rf, mS.fb)] = !!d7[g4(mS.rg, mS.fq)], cZ[g4(mS.rh, 'w(Wr')] = Array[g4(mS.ri, mS.rj)](d7[g4(mS.rk, 'CeJW')]) ? d7[g4(0x1b8c, '9rQu')] : [];
                                    {
                                        const d8 = {};
                                        for (const da of cZ[g4(mS.rl, '89Hn')]) {
                                            if (da && da[g4(0xb59, mS.bj)]) d8[String(da[g4(0x122c, mS.rm)])[g4(mS.rn, '%oj0')]()] = 0x1;
                                        }
                                        const d9 = () => typeof crypto !== g4(0xdef, '%oj0') && crypto[g4(0x510, '89Hn')] ? crypto[g4(0x1100, 'V#kN')]()[g4(0x659, 'wCGK')](/-/g, '') : Math[g4(0x16c, 'rsIZ')]()[g4(0x63e, 'XITC')](0x10)[g4(0x9ed, 'Mmsl')](0x2) + Math[g4(0x1850, 'XITC')]()[g4(0x21c, 'mRB^')](0x10)[g4(0xcc4, '0Ua@')](0x2);
                                        for (let db = 0x0; db < cZ[g4(mS.ro, mS.ot)][g4(0x1913, 'egod')]; db++) {
                                            const dc = cZ[g4(0xcdb, '$BSl')][db];
                                            if (!dc) continue;
                                            if (!dc[g4(mS.rp, mS.nY)]) dc[g4(mS.rq, 'd%lH')] = d9()[g4(mS.rr, mS.mY)](0x0, 0xc);
                                            if (!dc[g4(mS.rs, mS.eE)]) {
                                                let dd = String(dc[g4(mS.rt, mS.ru)] || g4(0x4ea, 'w(Wr') + (db + 0x1))[g4(0xf68, mS.rv)]()[g4(mS.rw, '[p9(')](/[^a-z0-9]+/g, '-')[g4(0x13de, mS.rx)](/^-+|-+$/g, '')[g4(mS.ry, mS.rz)](0x0, 0x18) || g4(mS.rA, mS.cm) + (db + 0x1),
                                                    de = dd,
                                                    df = 0x2;
                                                while (d8[de]) { de = dd + df, df++; }
                                                d8[de] = 0x1, dc[g4(mS.rB, 'CeJW')] = de;
                                            }
                                        }
                                    }
                                    await g['KV'][g4(0xd25, mS.rC)](g4(0x53a, mS.rD), JSON[g4(mS.rE, mS.cY)](cZ, null, 0x2));
                                    try { await g['KV'][g4(0x264, mS.nj)](g4(mS.rF, mS.fo)); } catch (dg) {}
                                    return savedUsersAuth = { 'multiUser': cZ[g4(mS.rG, mS.rH)], 'users': cZ[g4(0x603, mS.rI)] }, savedUsersAuthAt = Date[g4(mS.rJ, 'rsIZ')](), h[g4(mS.rK, mS.qa)](requestLogRecord(g, f, F, g4(mS.rL, '[p9('), config_JSON)), new Response(JSON[g4(0x36b, '[]Y1')]({ 'success': !![], 'count': cZ[g4(mS.rM, 'dZbH')][g4(0x925, '89Hn')], 'multiUser': cZ[g4(mS.rf, '$p[^')] }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x71a, mS.ay), 'Cache-Control': g4(mS.rN, 'mRB^') } });
                                }
                                let d0 = !!cZ[g4(mS.rO, '8Ys%')],
                                    d1 = Array[g4(mS.rP, '[]Y1')](cZ[g4(0x10aa, 'egod')]) ? cZ[g4(mS.rQ, mS.rR)] : [];
                                savedUsersAuth && Date[g4(mS.rS, '0Ua@')]() - savedUsersAuthAt < 0x1d4c0 && (d0 = !!savedUsersAuth[g4(0x14e, mS.rT)], d1 = savedUsersAuth[g4(mS.rU, 'M5Ii')]);
                                const d2 = {},
                                    d3 = {},
                                    d4 = {},
                                    d5 = getDateKey(new Date());
                                let d6 = ![];
                                for (const dh of d1) {
                                    if (!dh || !dh['id']) continue;
                                    try {
                                        const di = await usageGet(g, g4(0x14ad, 'GzjL') + dh['id']);
                                        d2[dh['id']] = di && di[g4(0xf32, 'Gn7Q')] || 0x0, d3[dh['id']] = { 'up': di && di['up'] || 0x0, 'down': di && di[g4(0xa91, 'rsIZ')] || 0x0 };
                                    } catch (dj) { d2[dh['id']] = 0x0, d3[dh['id']] = { 'up': 0x0, 'down': 0x0 }; }
                                    try {
                                        const dk = await usageGet(g, g4(mS.rV, '%oj0') + dh['id'] + ':' + d5);
                                        d4[dh['id']] = dk && dk[g4(0xf32, 'Gn7Q')] || 0x0;
                                    } catch (dl) { d4[dh['id']] = 0x0; }
                                    if (dh[g4(0x17b6, mS.rW)] !== ![]) {
                                        let dm = null;
                                        if (dh[g4(mS.rX, mS.es)] && d2[dh['id']] >= dh[g4(mS.rY, mS.rZ)]) dm = g4(0x12bc, '89Hn');
                                        else {
                                            if (dh[g4(mS.s0, 'CeJW')] && d4[dh['id']] >= dh[g4(mS.s1, mS.pz)]) dm = g4(0x1e51, 'T3Fv');
                                            else {
                                                if (dh[g4(mS.s2, '1qbp')]) {
                                                    const dn = Date[g4(mS.dk, mS.bB)](dh[g4(mS.s3, mS.qj)]);
                                                    if (!isNaN(dn) && Date[g4(0x11be, mS.s4)]() > dn) dm = g4(0x1a61, mS.s5);
                                                }
                                            }
                                        }
                                        dm && (dh[g4(0x17b6, mS.ou)] = ![], dh[g4(mS.s6, '60r9')] = dm, dh[g4(0x281, mS.es)] = Date[g4(mS.s7, mS.r7)](), dh[g4(0x8b9, 'GzjL')] = !![], d6 = !![]);
                                    }
                                }
                                if (d6)
                                    try {
                                        cZ[g4(0x6f3, 'w3Tt')] = d1, await g['KV'][g4(0x966, 'GzjL')](g4(mS.s8, mS.s9), JSON[g4(mS.sa, '7NO9')](cZ, null, 0x2)), cachedNetworkSettings = null, savedUsersAuth = { 'multiUser': d0, 'users': d1 }, savedUsersAuthAt = Date[g4(mS.sb, mS.fJ)]();
                                    } catch (dp) {}
                                return new Response(JSON[g4(0x324, mS.f9)]({ 'multiUser': d0, 'users': d1, 'usage': d2, 'usageIO': d3, 'usageDay': d4 }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x4d1, 'n7E3'), 'Cache-Control': g4(mS.sc, mS.sd) } });
                            } catch (dq) {
                                return new Response(JSON[g4(0xac3, 'IcEg')]({ 'error': String(dq && dq[g4(0x11b5, mS.aB)] || dq) }), { 'status': 0x1f4, 'headers': { 'Content-Type': g4(mS.se, mS.sf) } });
                            } else {
                            if (E === g4(mS.sg, 'rsIZ'))
                                try {
                                    if (f[g4(0x1c4a, 'd%lH')] !== g4(mS.sh, '#sM9')) return new Response(g4(mS.e6, '0Ua@'), { 'status': 0x195 });
                                    const dr = await f[g4(mS.si, mS.r4)]()[g4(0x7af, mS.sj)](() => ({})),
                                        ds = dr && dr['id'];
                                    if (!ds) return new Response(JSON[g4(mS.sk, mS.cY)]({ 'error': g4(mS.sl, 'dn8p') }), { 'status': 0x190, 'headers': { 'Content-Type': g4(mS.dS, mS.sm) } });
                                    await usageReset(g, g4(0x255, mS.sn) + ds);
                                    const dt = new Date();
                                    for (let dv = 0x0; dv < 0x28; dv++) {
                                        const dw = new Date(dt);
                                        dw[g4(mS.so, mS.sp)](dw[g4(mS.sq, '7NO9')]() - dv), await usageReset(g, g4(0x1f0, 'PYt$') + ds + ':' + getDateKey(dw));
                                    }
                                    if (userUsageCache[ds] != null) userUsageCache[ds] = 0x0;
                                    if (userDayUsageCache[ds] != null) userDayUsageCache[ds] = 0x0;
                                    const du = JSON[g4(0x110e, mS.aY)](await g['KV'][g4(0xe6f, mS.sr)](g4(mS.ss, mS.no)) || '{}');
                                    if (Array[g4(mS.st, '[p9(')](du[g4(mS.su, 'Mmsl')])) {
                                        const dx = du[g4(mS.sv, mS.sw)][g4(mS.sx, 'wCGK')](dy => dy && dy['id'] === ds);
                                        dx && (dx[g4(mS.fl, mS.sy)] = !![], delete dx[g4(0x796, 'n7E3')], delete dx[g4(mS.sz, mS.sA)], delete dx[g4(0x1a04, '89Hn')]), await g['KV'][g4(mS.sB, 'Gn7Q')](g4(mS.sC, mS.qn), JSON[g4(0x401, 'NMJQ')](du, null, 0x2)), cachedNetworkSettings = null, savedUsersAuth = null;
                                    }
                                    return h[g4(mS.sD, '2#Qk')](requestLogRecord(g, f, F, g4(mS.sE, '*lLT'), config_JSON)), new Response(JSON[g4(0x9d5, mS.q5)]({ 'success': !![] }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x1172, mS.r8), 'Cache-Control': g4(mS.sF, '2#Qk') } });
                                } catch (dy) {
                                    return new Response(JSON[g4(mS.sG, '6UCx')]({ 'error': String(dy && dy[g4(0x17eb, mS.sH)] || dy) }), { 'status': 0x1f4, 'headers': { 'Content-Type': g4(mS.sI, mS.nb) } });
                                } else {
                                if (E === g4(mS.sJ, mS.sK))
                                    try {
                                        const dz = await f[g4(0x1469, '5M6D')](),
                                            dA = { 'enableRouting': typeof dz[g4(0x9ad, 'dZbH')] === g4(0x1e9c, 'V#kN') ? dz[g4(0xf80, '2#Qk')] : !![], 'enableGeoIP': typeof dz[g4(0x95d, 'T3Fv')] === g4(0x862, 'wCGK') ? dz[g4(0x13fa, 'oeP*')] : !![], 'enableGeoSite': typeof dz[g4(mS.sL, 'NxG1')] === g4(0x199a, 'NxG1') ? dz[g4(mS.sM, mS.sN)] : !![], 'enableAdBlock': typeof dz[g4(mS.sO, '$p[^')] === g4(0x1378, mS.sP) ? dz[g4(mS.sQ, mS.oJ)] : !![], 'enablePornBlock': typeof dz[g4(mS.sR, mS.o8)] === g4(0x1378, '[]Y1') ? dz[g4(mS.sS, 'dZbH')] : ![], 'enableMalwareBlock': typeof dz[g4(0xe34, mS.sT)] === g4(0x1bf8, mS.qs) ? dz[g4(mS.sU, 'jODS')] : ![], 'enablePhishingBlock': typeof dz[g4(mS.sV, 'yxI7')] === g4(0x499, mS.n6) ? dz[g4(mS.sW, mS.sX)] : ![], 'blockQUIC': typeof dz[g4(mS.sY, mS.aF)] === g4(mS.sZ, mS.fs) ? dz[g4(0xb2f, '89Hn')] : ![], 'bypassChina': typeof dz[g4(0xb80, mS.t0)] === g4(0xa97, mS.o8) ? dz[g4(0x2c0, 'w(Wr')] : ![], 'bypassRussia': typeof dz[g4(mS.t1, 'rsIZ')] === g4(0xa97, mS.t2) ? dz[g4(0x21d, 'w(Wr')] : ![], 'bypassSanctions': typeof dz[g4(mS.t3, mS.eM)] === g4(mS.t4, '9rQu') ? dz[g4(0x1630, mS.t5)] : ![], 'backendMode': typeof dz[g4(mS.t6, 'XITC')] === g4(0x1bdb, mS.t7) ? dz[g4(0x12ea, mS.t8)] : ![], 'backendUrl': typeof dz[g4(0x104a, 'dn8p')] === g4(0xee2, mS.t9) && /^https?:\/\//i[g4(mS.ta, 'zs!c')](dz[g4(mS.tb, '[]Y1')][g4(mS.tc, mS.td)]()) ? dz[g4(mS.te, 'dZbH')][g4(0x1aa0, mS.o3)]()[g4(0x1d0f, '7NO9')](0x0, 0x12c) : '', 'enableDomesticBypass': typeof dz[g4(0x429, mS.tf)] === g4(mS.tg, '*lLT') ? dz[g4(mS.th, 'NxG1')] : !![], 'enableDoH': typeof dz[g4(mS.ti, mS.tj)] === g4(mS.tk, 'yxI7') ? dz[g4(mS.tl, mS.tm)] : !![], 'dohProvider': [g4(0x1411, 'oeP*'), g4(mS.tn, mS.to), g4(mS.tp, mS.bP), g4(0xc63, mS.tq)][g4(mS.tr, 'Mmsl')](dz[g4(0x4b2, 'dbGg')]) ? dz[g4(0x15d6, mS.o8)] : g4(mS.ts, mS.cR), 'enableLocalDNS': typeof dz[g4(mS.tt, mS.c8)] === g4(0x862, 'wCGK') ? dz[g4(mS.tu, 'mRB^')] : ![], 'localDNSIP': dz[g4(mS.tv, mS.O)] || g4(0xb23, mS.tw), 'localDNSPort': dz[g4(mS.tx, 'n7E3')] || '53', 'enableAntiSanctionDNS': typeof dz[g4(mS.ty, 'oeP*')] === g4(mS.tz, '8Ys%') ? dz[g4(mS.tA, 'd%lH')] : ![], 'antiSanctionDNSProvider': [g4(mS.tB, 'PYt$'), g4(mS.tC, 'n7E3'), g4(mS.tD, mS.tE), g4(0x6c7, '7NO9'), g4(0x10b2, 'CeJW'), g4(mS.tF, mS.tG), g4(0x90c, mS.pb)][g4(0x1dcf, mS.pk)](dz[g4(mS.tH, mS.nV)]) ? dz[g4(0x610, 'zs!c')] : g4(mS.tI, 'wCGK'), 'antiSanctionCustomDNS': dz[g4(0x4de, 'PSkb')] || '', 'enableFakeDNS': typeof dz[g4(0x35b, mS.dh)] === g4(0x12ed, 'mRB^') ? dz[g4(mS.tJ, mS.aB)] : ![], 'fakeDNSIP': dz[g4(mS.tK, '89Hn')] || g4(0x1b93, 'NxG1'), 'enableIPv6': typeof dz[g4(0xce3, 'w3Tt')] === g4(mS.tL, '2#Qk') ? dz[g4(0x10bc, '6UCx')] : !![], 'allowLAN': typeof dz[g4(mS.tM, mS.om)] === g4(0x1bf8, mS.i) ? dz[g4(mS.tN, mS.tO)] : ![], 'logLevel': [g4(mS.tP, mS.aP), g4(mS.tQ, mS.t7), g4(mS.tR, '$p[^'), g4(0xef4, mS.dc)][g4(mS.tS, mS.dC)](dz[g4(mS.tT, mS.tU)]) ? dz[g4(0x16f3, mS.bp)] : g4(0x6a8, '89Hn'), 'enableWarp': typeof dz[g4(mS.tV, '*lLT')] === g4(mS.tW, mS.eu) ? dz[g4(0x907, mS.pw)] : ![], 'warpMode': [g4(0x3a7, mS.tX), g4(0x1a87, 'mRB^'), g4(mS.tY, mS.B)][g4(0x1bf6, '9rQu')](dz[g4(mS.tZ, mS.u0)]) ? dz[g4(mS.u1, mS.rm)] : g4(mS.u2, mS.o2), 'warpEndpoint': dz[g4(0x121e, 'GzjL')] || '', 'warpAmnezia': typeof dz[g4(mS.u3, '$p[^')] === g4(0x31f, mS.u4) ? dz[g4(0x9e5, mS.od)] : ![], 'customRules': typeof dz[g4(mS.u5, 'T3Fv')] === g4(0xeb7, mS.u6) ? dz[g4(0x4f5, 'Mmsl')] : '', 'bypassCountries': Array[g4(mS.u7, '1qbp')](dz[g4(0x1765, mS.u8)]) ? [...new Set(dz[g4(0xd15, '#sM9')][g4(0x74b, 'PYt$')](dB => /^[a-z]{2}$/i[g4(0x710, 'NMJQ')](dB))[g4(mS.u9, mS.ua)](dB => dB[g4(0x1161, '5M6D')]()))][g4(mS.ub, 'PSkb')](0x0, 0x14) : [], 'blockCategories': Array[g4(0x233, mS.uc)](dz[g4(0x997, 'wCGK')]) ? dz[g4(mS.ud, mS.be)][g4(mS.ue, 'n7E3')](dB => [g4(0x1358, 'jODS'), g4(0xdf9, 'zs!c'), g4(0x10ab, 'V#kN'), g4(0xe4e, '89Hn')][g4(0x92e, '*lLT')](dB)) : [], 'warpNoise': dz[g4(mS.uf, mS.ug)] && typeof dz[g4(0x1d22, 'mRB^')] === g4(mS.uh, 'dn8p') ? { 'mode': ['', g4(0x110b, 'egod'), g4(mS.ui, mS.O)][g4(mS.uj, mS.u4)](dz[g4(mS.uk, mS.fn)][g4(mS.ul, 'w(Wr')]) ? dz[g4(mS.um, 'jODS')][g4(0x316, mS.t0)] : '', 'count': String(dz[g4(mS.un, '[]Y1')][g4(0x1c5, 'T3Fv')] || '')[g4(mS.uo, '60r9')](0x0, 0xc), 'size': String(dz[g4(mS.up, 'PYt$')][g4(0xf40, 'ZgMu')] || '')[g4(mS.uq, mS.ur)](0x0, 0xc), 'delay': String(dz[g4(0x662, '$BSl')][g4(0x1012, '%oj0')] || '')[g4(0x17f0, mS.nV)](0x0, 0xc) } : { 'mode': '', 'count': '', 'size': '', 'delay': '' } };
                                            try {
                                                const dB = JSON[g4(0xfe3, mS.us)](await g['KV'][g4(0xdee, mS.d3)](g4(0x1bdf, 'Gn7Q')) || '{}');
                                                dA[g4(mS.ut, 'w(Wr')] = typeof dz[g4(0xe1e, mS.t9)] === g4(mS.uu, 'M5Ii') ? dz[g4(0x1b71, mS.uv)] : dB[g4(mS.uw, mS.ux)] || ![], dA[g4(mS.uy, 'Mmsl')] = Array[g4(mS.uz, 'egod')](dz[g4(0xd29, mS.b5)]) ? dz[g4(mS.sv, mS.sw)] : dB[g4(mS.uA, mS.uB)] || [];
                                            } catch (dC) { dA[g4(mS.uC, mS.nu)] = !!dz[g4(mS.uD, '*lLT')], dA[g4(0x13d6, mS.uE)] = Array[g4(mS.uF, mS.o5)](dz[g4(mS.uG, mS.dl)]) ? dz[g4(mS.uy, mS.uH)] : []; }
                                            return await g['KV'][g4(mS.uI, 'yxI7')](g4(mS.uJ, '[p9('), JSON[g4(mS.uK, mS.fE)](dA, null, 0x2)), cachedNetworkSettings = null, h[g4(0x1d94, mS.uL)](requestLogRecord(g, f, F, g4(0x381, mS.uM), config_JSON)), new Response(JSON[g4(0xeee, '1qbp')]({ 'success': !![], 'message': g4(0x5d1, 'V#kN') }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.uN, '%oj0') } });
                                        } catch (dD) {
                                            return console[g4(0x781, 'GzjL')](g4(mS.uO, 'Gn7Q'), dD), new Response(JSON[g4(mS.uP, 'GzjL')]({ 'error': g4(0xbf1, 'Gn7Q') + dD[g4(0x7a5, mS.uQ)] }), { 'status': 0x1f4, 'headers': { 'Content-Type': g4(0x4d7, 'w(Wr') } });
                                        } else {
                                        if (a5 === g4(0x1ee1, mS.rD))
                                            try {
                                                const dE = await f[g4(mS.uR, 'zs!c')]();
                                                return await g['KV'][g4(mS.uS, mS.sf)](g4(0x5fa, mS.uT), dE), h[g4(mS.uU, mS.cC)](requestLogRecord(g, f, F, g4(mS.uV, 'jODS'), config_JSON)), new Response(JSON[g4(0x240, '$BSl')]({ 'success': !![], 'message': g4(0x96e, mS.uW) }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.uX, '[p9(') } });
                                            } catch (dF) {
                                                return console[g4(0x71d, mS.uY)](g4(mS.uZ, mS.ua), dF), new Response(JSON[g4(mS.v0, 'ZgMu')]({ 'error': g4(0x336, 'V#kN') + dF[g4(mS.v1, 'PSkb')] }), { 'status': 0x1f4, 'headers': { 'Content-Type': g4(0xef1, mS.sK) } });
                                            } else return new Response(JSON[g4(mS.v2, mS.v3)]({ 'error': g4(0x1ee4, 'rsIZ') }), { 'status': 0x194, 'headers': { 'Content-Type': g4(mS.v4, 'T3Fv') } });
                                        }
                                    }
                                }
                                }
                            }
                        }
                        }
                    }
                }
            } else {
                if (E === g4(0x10ec, 'dbGg')) return new Response(JSON[g4(0x1001, 'w3Tt')](config_JSON, null, 0x2), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.v5, 'rsIZ') } });
                else {
                    if (E === g4(mS.v6, mS.r5))
                        try {
                            const dG = await g['KV'][g4(mS.v7, 'mRB^')](g4(0x7b1, '*lLT')),
                                dH = { 'enableRouting': !![], 'enableGeoIP': !![], 'enableGeoSite': !![], 'enableAdBlock': !![], 'enablePornBlock': ![], 'enableDomesticBypass': !![], 'enableDoH': !![], 'dohProvider': g4(0x178b, 'M5Ii'), 'enableLocalDNS': ![], 'localDNSIP': g4(mS.v8, '#sM9'), 'localDNSPort': '53', 'enableAntiSanctionDNS': ![], 'antiSanctionDNSProvider': g4(0xfd2, '8Ys%'), 'antiSanctionCustomDNS': '', 'enableFakeDNS': ![], 'fakeDNSIP': g4(0x1135, '6UCx'), 'enableIPv6': !![], 'allowLAN': ![], 'logLevel': g4(0x184b, 'zs!c'), 'enableWarp': ![], 'warpMode': g4(mS.v9, 'w3Tt'), 'warpEndpoint': '', 'warpAmnezia': ![], 'customRules': '', 'bypassCountries': [], 'blockCategories': [], 'warpNoise': { 'mode': '', 'count': '', 'size': '', 'delay': '' } },
                                dI = dG ? JSON[g4(0x709, mS.va)](dG) : dH;
                            return new Response(JSON[g4(0x631, mS.oN)](dI, null, 0x2), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x121d, 'zs!c') } });
                        } catch (dJ) {
                            return new Response(JSON[g4(mS.sG, '6UCx')]({ 'error': dJ[g4(0xdd4, mS.dh)] }), { 'status': 0x1f4, 'headers': { 'Content-Type': g4(0x4b6, mS.sd) } });
                        } else {
                        if (E === g4(mS.vb, mS.vc))
                            try {
                                const dK = JSON[g4(mS.vd, 'C2T0')](await g['KV'][g4(0x511, 'Gn7Q')](g4(0x916, '$BSl')) || '{}');
                                let dL = !!dK[g4(mS.ve, 'yxI7')],
                                    dM = Array[g4(0x1867, mS.vf)](dK[g4(mS.vg, mS.pk)]) ? dK[g4(0x941, '#sM9')] : [];
                                savedUsersAuth && Date[g4(0x12b8, mS.nU)]() - savedUsersAuthAt < 0x1d4c0 && (dL = !!savedUsersAuth[g4(0x639, '$BSl')], dM = savedUsersAuth[g4(0x892, mS.vh)]);
                                const dN = {};
                                return await Promise[g4(0x17ed, mS.pP)](dM[g4(0x97d, mS.vi)](async dO => {
                                    const g5 = g4;
                                    if (!dO || !dO['id']) return;
                                    try {
                                        const dP = await usageGet(g, g5(0x49c, 'w3Tt') + dO['id']);
                                        dN[dO['id']] = dP && dP[g5(mN.c, 'b)3q')] || 0x0;
                                    } catch (dQ) { dN[dO['id']] = 0x0; }
                                })), new Response(JSON[g4(mS.vj, mS.t0)]({ 'multiUser': dL, 'users': dM, 'usage': dN }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.q4, mS.vk), 'Cache-Control': g4(mS.vl, mS.r4) } });
                            } catch (dO) {
                                return new Response(JSON[g4(mS.vm, mS.vn)]({ 'multiUser': ![], 'users': [], 'usage': {} }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.vo, mS.vp), 'Cache-Control': g4(mS.vq, mS.vr) } });
                            } else {
                            if (a5 === g4(mS.vs, mS.vt)) {
                                let dP = await g['KV'][g4(mS.vu, 'dZbH')](g4(mS.vv, mS.vw)) || g4(0x1a4b, 'dbGg');
                                if (dP == g4(mS.vx, mS.bm)) dP = (await generateRandomIp(f, config_JSON[g4(mS.vy, mS.pI)][g4(0x295, mS.vz)][g4(0xbe7, mS.vA)], config_JSON[g4(0x1a0, 'yxI7')][g4(mS.vB, '%oj0')][g4(mS.vC, 'Pt3!')]))[0x1];
                                return new Response(dP, { 'status': 0xc8, 'headers': { 'Content-Type': g4(0xf01, '%oj0'), 'asn': f['cf'][g4(0x1d30, '7NO9')] } });
                            } else {
                                if (E === g4(0x14d4, 'CeJW')) return new Response(JSON[g4(0x324, mS.vD)](f['cf'], null, 0x2), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x4b6, mS.vE) } });
                                else {
                                    if (E === g4(0x1c37, '7NO9')) {
                                        const dQ = !!(g['KV'] && typeof g['KV'][g4(mS.vF, 'ZgMu')] === g4(0x235, mS.bB));
                                        let dR = ![];
                                        if (dQ)
                                            try { await getConfigRaw(g), dR = !![]; } catch (dV) {}
                                        let dS = { 'up': 0x0, 'down': 0x0, 'total': 0x0 };
                                        if (dQ)
                                            try {
                                                const dW = await usageGet(g, g4(mS.vG, 'V#kN') + getDateKey(new Date()));
                                                if (dW) dS = { 'up': dW['up'] || 0x0, 'down': dW[g4(0x1e6a, 'Gn7Q')] || 0x0, 'total': dW[g4(0x552, 'wCGK')] || 0x0 };
                                            } catch (dX) {}
                                        const dT = f['cf'];
                                        let dU = null;
                                        if (g['DB'] && typeof g['DB'][g4(0x1819, mS.vH)] === g4(0x1501, mS.vI))
                                            try {
                                                const dY = await g['DB'][g4(0x467, mS.eG)](g4(0x79d, 'd%lH'))[g4(0x3f3, 'n7E3')]();
                                                if (dY && dY[g4(0x306, mS.vJ)] && typeof dY[g4(mS.vK, mS.vL)][g4(mS.vM, 'w3Tt')] === g4(0x1f03, 'PSkb')) dU = dY[g4(mS.vN, 'vel(')][g4(0x4df, mS.qd)];
                                            } catch (dZ) {}
                                        return new Response(JSON[g4(mS.vO, mS.vP)]({ 'ip': F, 'd1SizeBytes': dU, 'colo': dT?.[g4(mS.vQ, 'w(Wr')], 'country': dT?.[g4(mS.vR, mS.cE)], 'city': dT?.[g4(mS.vS, 'PYt$')], 'region': dT?.[g4(0x448, 'yxI7')], 'regionCode': dT?.[g4(0x2d1, 'b)3q')], 'latitude': dT?.[g4(mS.vT, mS.r4)], 'longitude': dT?.[g4(0x12fd, 'V#kN')], 'timezone': dT?.[g4(0x1a6f, 'C2T0')], 'asn': dT?.[g4(0x196, mS.vU)], 'asOrganization': dT?.[g4(0xb38, mS.vV)], 'userAgent': q, 'version': Version, 'instanceId': (await MD5MD5(p[g4(mS.vW, mS.vX)]))[g4(mS.vY, mS.vZ)](0x0, 0x8), 'kvConnected': dQ, 'kvOk': dR, 'host': p[g4(mS.w0, '1qbp')], 'protocol': p[g4(0x577, mS.w1)], 'todayUsage': dS, 'workerStartTime': globalThis[g4(mS.w2, mS.w3)] || null }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.oQ, mS.w4), 'Cache-Control': g4(mS.w5, 'dbGg') } });
                                    } else {
                                        if (E === g4(mS.w6, mS.w7))
                                            try {
                                                const e0 = new Date(),
                                                    e1 = 0x10,
                                                    e2 = [];
                                                for (let e9 = 0x0; e9 < e1; e9++) {
                                                    const ea = new Date(e0);
                                                    ea[g4(mS.w8, '[]Y1')](ea[g4(0x1e6d, mS.bD)]() - e9), e2[g4(mS.w9, mS.l)](g4(mS.wa, '8Ys%') + ea[g4(0x107d, 'd%lH')]() + '-' + String(ea[g4(mS.wb, 'NxG1')]() + 0x1)[g4(mS.wc, mS.wd)](0x2, '0') + '-' + String(ea[g4(mS.we, mS.ce)]())[g4(mS.wf, mS.fs)](0x2, '0'));
                                                }
                                                const e3 = await Promise[g4(0x10a3, mS.wg)](e2[g4(0x1196, mS.u4)](eb => usageGet(g, eb)[g4(0xdc1, 'wCGK')](() => null))),
                                                    e4 = [];
                                                for (let eb = 0x0; eb < e2[g4(0x18ff, '*lLT')]; eb++) {
                                                    if (e3[eb])
                                                        try { e4[g4(mS.wh, mS.pV)]({ 'date': e2[eb][g4(mS.wi, 'b)3q')](0x6), ...e3[eb] }); } catch (ec) {}
                                                }
                                                const e5 = {};
                                                for (const ed of e4) {
                                                    const ee = ed[g4(0x88d, mS.wj)][g4(0xdf2, mS.wk)](0x0, 0x7);
                                                    if (!e5[ee]) e5[ee] = { 'up': 0x0, 'down': 0x0, 'total': 0x0 };
                                                    e5[ee]['up'] += ed['up'] || 0x0, e5[ee][g4(mS.wl, 'T3Fv')] += ed[g4(0x1c91, mS.wm)] || 0x0, e5[ee][g4(0x1065, '1qbp')] += ed[g4(mS.wn, mS.nM)] || 0x0;
                                                }
                                                const e6 = Object[g4(mS.wo, 'CeJW')](e5)[g4(mS.wp, mS.pI)](([ef, eg]) => ({ 'month': ef, ...eg })),
                                                    e7 = {};
                                                for (const ef of e4) {
                                                    const eg = ef[g4(mS.wq, 'w(Wr')][g4(mS.wr, 'rsIZ')](0x0, 0x4);
                                                    if (!e7[eg]) e7[eg] = { 'up': 0x0, 'down': 0x0, 'total': 0x0 };
                                                    e7[eg]['up'] += ef['up'] || 0x0, e7[eg][g4(0x1e6a, mS.ws)] += ef[g4(0x3d2, mS.wt)] || 0x0, e7[eg][g4(mS.wu, 'PSkb')] += ef[g4(mS.wv, 'egod')] || 0x0;
                                                }
                                                const e8 = Object[g4(mS.ww, 'jODS')](e7)[g4(0x11af, 'yxI7')](([eh, ei]) => ({ 'year': eh, ...ei }));
                                                return new Response(JSON[g4(mS.wx, mS.wy)]({ 'daily': e4, 'monthly': e6, 'yearly': e8 }), { 'status': 0xc8, 'headers': { 'Content-Type': g4(0x12ff, '1qbp'), 'Cache-Control': g4(0x1e6c, 'vel(') } });
                                            } catch (eh) {
                                                return new Response(JSON[g4(mS.wz, 'zs!c')]({ 'error': eh[g4(mS.wA, 'PYt$')] }), { 'status': 0x1f4, 'headers': { 'Content-Type': g4(0x1fe, 'PYt$') } });
                                            } else {
                                            if (E === g4(0x91a, 'ZgMu')) {
                                                const ei = await MD5MD5(D + B),
                                                    ej = p[g4(0x3d8, 'dn8p')] + '//' + p[g4(0x155, mS.el)] + g4(0x1bb1, 'PSkb') + ei,
                                                    ek = await fetch(ej)[g4(mS.wB, '1qbp')](() => null);
                                                if (!ek) return new Response(g4(mS.wC, '9rQu'), { 'status': 0x1f6 });
                                                const el = await ek[g4(mS.wD, 'w3Tt')]();
                                                return new Response(el, { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.wE, mS.qz), 'Cache-Control': g4(mS.wF, 'zs!c') } });
                                            } else {
                                                if (a5 === g4(0xc27, 'Pt3!')) return await bestIP(f, g);
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
    h[g4(mS.dJ, mS.wG)](requestLogRecord(g, f, F, g4(mS.wH, 'mRB^'), config_JSON));
    const ar = E[g4(mS.wI, mS.q3)](g4(0xa23, mS.qo)) ? E[g4(mS.wi, 'b)3q')](0x6)[g4(mS.wJ, mS.wK)]('/')[0x0] : '',
        as = ar ? g4(mS.wL, '%oj0') : g4(mS.wM, 'V#kN') + p[g4(0x18b4, mS.uc)];
    return await panelHtml(g, as, { 'spaPage': ar })[g4(0x7af, mS.wN)](() => new Response(g4(0x1b8e, 'wCGK'), { 'status': 0x1f6 }));
} else {
    if (E === g4(0x1105, mS.wO) || uuidRegex[g4(0x1c1e, mS.v3)](E)) {
        const en = new Response(g4(0x14a9, mS.uW), { 'status': 0x12e, 'headers': { 'Location': g4(mS.wP, mS.wQ) } });
        return en[g4(mS.wR, '8Ys%')][g4(0x1970, 'vel(')](g4(mS.wS, mS.wT), g4(mS.wU, mS.wV)), en;
    } else {
        if (E === g4(0x1123, '[p9(')) {
            const eo = await MD5MD5(D + B),
    ep = ['1', g4(0xfd9, 'CeJW')][g4(mS.wW, 'Pt3!')](g[g4(mS.wX, 'PSkb')]) && p[g4(0x154b, 'dn8p')][g4(mS.wY, mS.wZ)](g4(mS.eF, '6UCx')) === g4(0x3b9, mS.ol) && p[g4(0x1639, mS.f9)][g4(0x119, mS.fT)](g4(0x1d08, mS.pI)) === g4(mS.x0, mS.sN) && q[g4(mS.x1, mS.x2)]()[g4(mS.x3, mS.x4)](g4(0x9ee, mS.mY)),
    eq = p[g4(0x1ad, mS.x5)][g4(0x72f, mS.x6)](g4(0xf9, mS.x7)),
    er = p[g4(0x1170, 'w(Wr')][g4(0x1320, 'NxG1')](g4(0x18ee, '$BSl')),
    es = p[g4(mS.x8, 'Gn7Q')][g4(0x99f, 'dbGg')](g4(mS.x9, mS.xa));
let et = '';
const eu = savedUsersAuth && Date[g4(0x194d, '[]Y1')]() - savedUsersAuthAt < 0x1d4c0 && Array[g4(0x18a9, mS.xb)](savedUsersAuth[g4(mS.xc, mS.xd)]) ? savedUsersAuth[g4(0x941, '#sM9')] : networkSettings && Array[g4(0x1be1, '60r9')](networkSettings[g4(0x1389, mS.xe)]) ? networkSettings[g4(mS.xf, '$p[^')] : null;
if (eu && (eq || er && es)) {
    const eC = eu[g4(mS.xg, 'ZgMu')](eE => eE && eE[g4(0xe25, 'ZgMu')] && es === eE[g4(0x1b7e, 'zs!c')]),
        eD = eq ? eu[g4(mS.xh, 'd%lH')](eE => eE && eE[g4(0x788, '[p9(')] === eq) : eC[g4(mS.xi, mS.eh)] === 0x1 ? eC[0x0] : eC[g4(mS.xj, '%oj0')](eE => String(eE[g4(0x1615, 'b)3q')] || '')[g4(0x867, 'oeP*')]() === String(er)[g4(0x5c6, 'PYt$')]()) || eC[0x0];
    if (eD) {
        if (eD[g4(0xaf9, 'C2T0')] === ![]) return new Response(g4(mS.xk, 'mRB^'), { 'status': 0x193 });
        if (eD[g4(0xf48, mS.xl)]) {
            const eE = Date[g4(mS.xm, mS.xn)](eD[g4(mS.xo, 'PYt$')]);
            if (!isNaN(eE) && Date[g4(0xaf6, '5M6D')]() > eE) return new Response(g4(0x164e, mS.pV), { 'status': 0x193 });
        }
        if (eD[g4(0xc74, mS.w1)])
            try {
                const eF = await usageGet(g, g4(0x14ff, mS.fO) + eD['id']);
                if (eF && eF[g4(mS.xp, '#sM9')] >= eD[g4(mS.xq, mS.no)]) return new Response(g4(0x1243, mS.wQ), { 'status': 0x193 });
            } catch (eG) {}
        et = eD[g4(mS.xr, 'oeP*')];
    }
}
const ev = eq === eo || et !== '',
    ew = Math[g4(mS.xs, 'T3Fv')](Date[g4(mS.xt, 'NxG1')]() / 0x5265c00),
    ey = base64SecretEncode(eo, B),
    [ez, eA] = await Promise[g4(mS.xu, '%oj0')]([MD5MD5(ey + ew), MD5MD5(ey + (ew - 0x1))]),
    eB = eq === ez || eq === eA;
if (ev || eB || ep) {
    config_JSON = await readConfigJson(g, D, B, q);
    if (ep) h[g4(0x1a8f, '7NO9')](requestLogRecord(g, f, F, g4(0xbf0, mS.xv), config_JSON, ![]));
    else h[g4(0x1bd8, mS.oB)](requestLogRecord(g, f, F, g4(0xd33, mS.xw), config_JSON));
    h[g4(0x1102, mS.xx)](flushUsage(g));
    const eH = q[g4(mS.xy, mS.xz)](),
        eI = { 'content-type': g4(0x1121, mS.f), 'Profile-Update-Interval': config_JSON[g4(mS.xA, 'mRB^')][g4(0x4e4, 'b)3q')], 'Profile-web-page-url': p[g4(0xccb, 'yxI7')] + '//' + p[g4(0x1d88, mS.m)] + g4(mS.xB, mS.xC), 'Cache-Control': g4(mS.e1, 'XITC') };
    try {
        const eN = et;
        let eO = 0x0,
            eP = 0x0,
            eQ = 0x3e80000000000,
            eR = 0xf4849500;
        const eS = eN && networkSettings && Array[g4(mS.xD, '[]Y1')](networkSettings[g4(0x941, '#sM9')]) ? networkSettings[g4(0x1628, 'PYt$')][g4(0x1ce8, 'PYt$')](eT => eT && eT[g4(0x13d, 'M5Ii')] === eN) : null;
        if (eS) {
            const eT = await usageGet(g, g4(0x186b, mS.u8) + eS['id']) || {};
            eO = eT['up'] || 0x0, eP = eT[g4(mS.xE, '[p9(')] || 0x0;
            if (eS[g4(0x1151, mS.bc)]) eQ = eS[g4(0x17e5, '8Ys%')];
            if (eS[g4(mS.xF, '7NO9')]) {
                const eU = Date[g4(mS.xG, mS.xH)](eS[g4(mS.xI, 'dZbH')]);
                if (!isNaN(eU)) eR = Math[g4(mS.xJ, mS.xK)](eU / 0x3e8);
            }
        } else {
            const eV = await usageGet(g, g4(mS.xL, mS.xM) + getMonthKey(new Date())) || { 'up': 0x0, 'down': 0x0 };
            eO = eV['up'] || 0x0, eP = eV[g4(0x16e7, mS.u)] || 0x0;
        }
        eI[g4(0x393, 'Gn7Q')] = g4(0xf5f, '#sM9') + eO + g4(mS.xN, 'n7E3') + eP + g4(mS.xO, mS.ru) + eQ + g4(mS.xP, mS.vL) + eR;
    } catch (eW) {}
    const eJ = p[g4(mS.xQ, '*lLT')][g4(0x9ab, '2#Qk')](g4(mS.xR, 'dn8p')) || p[g4(0x976, mS.xS)][g4(mS.xT, mS.c8)](g4(mS.xU, mS.vU)) || f[g4(0xd88, mS.f)][g4(0x8c0, mS.xV)](g4(0x137c, 'V#kN')) || f[g4(0x1a34, 'NMJQ')][g4(0x5cd, 'b)3q')](g4(0x1194, '6UCx')) || eH[g4(0x895, mS.xW)](g4(0x1939, mS.oK)) || eH[g4(mS.xX, 'GzjL')](g4(0x6c3, 'ZgMu')[g4(0x163b, mS.xY)]()) || ep,
        eK = eJ ? g4(0xd74, mS.uQ) : p[g4(0x8a8, mS.fb)][g4(0x115f, mS.fu)](g4(0x199, mS.di)) ? p[g4(mS.xZ, mS.y0)][g4(mS.y1, 'zs!c')](g4(0x2a1, mS.y2)) : p[g4(0x1e0a, mS.aq)][g4(mS.y3, mS.fB)](g4(mS.y4, 'M5Ii')) || eH[g4(mS.y5, 'd%lH')](g4(mS.y6, 'GzjL')) || eH[g4(0x19d5, mS.y7)](g4(mS.y8, mS.y9)) || eH[g4(mS.ya, mS.yb)](g4(mS.yc, mS.yd)) ? g4(0x13c4, 'dn8p') : p[g4(0x718, 'Gn7Q')][g4(0x14db, mS.ye)]('sb') || p[g4(mS.xZ, mS.fB)][g4(mS.yf, '8Ys%')](g4(0x24e, '2#Qk')) || eH[g4(0xf52, mS.yg)](g4(mS.yh, 'XITC')) || eH[g4(mS.yi, 'oeP*')](g4(mS.yj, mS.yk)) ? g4(mS.yl, 'dbGg') : p[g4(0x1942, mS.ym)][g4(0x714, 'Gn7Q')](g4(0x1884, mS.dA)) || eH[g4(mS.yn, '89Hn')](g4(mS.yo, '7NO9')) ? g4(mS.yp, 'n7E3') : p[g4(0x1be7, mS.yq)][g4(mS.yr, '$BSl')](g4(0x40b, '89Hn')) || eH[g4(mS.ys, 'PYt$')](g4(mS.yt, mS.yu)) ? g4(mS.yv, 'Pt3!') : p[g4(0x976, mS.ah)][g4(mS.yw, mS.ak)](g4(mS.yx, mS.yy)) || eH[g4(mS.yz, 'd%lH')](g4(0x1b83, 'ZgMu')) ? g4(0x10e4, 'NxG1') : g4(0xe80, mS.yb);
    if (!eH[g4(mS.yA, '[p9(')](g4(0x629, mS.yB))) eI[g4(mS.yC, 'dn8p')] = g4(mS.yD, 'w(Wr') + encodeURIComponent(config_JSON[g4(0x352, mS.q8)][g4(0x18b9, 'dZbH')]);
    const eL = (p[g4(0x1639, 'egod')][g4(mS.yE, '6UCx')](g4(0x1841, '#sM9')) || eH[g4(0xe1f, mS.ua)](g4(mS.yF, 'Pt3!'))) && config_JSON[g4(mS.yG, mS.sA)] !== 'ss' ? g4(mS.yH, '6UCx') + g4(0x17f6, mS.yI) : config_JSON[g4(0x717, 'dn8p')];
    let eM = '';
    if (eK === g4(mS.yJ, mS.yK)) {
            const eX = config_JSON[g4(0xdbe, 'w(Wr')] == g4(0xb07, '#sM9') ? g4(0x1278, mS.dR) + encodeURIComponent(g4(mS.yL, '$BSl')) : config_JSON[g4(0x85f, mS.x7)] == g4(mS.yM, '[]Y1') ? g4(0x196e, mS.xa) + encodeURIComponent(g4(mS.yN, '1qbp')) : '';
    let eY = [],
        eZ = '',
        f0 = [];
    const f1 = p[g4(0x136d, 'NMJQ')][g4(mS.d1, mS.yO)](g4(0x9f6, mS.u6)) || '',
        f2 = f1[g4(0x19d5, mS.yP)]('.');
    if (!f2 && config_JSON[g4(0x1311, mS.yQ)][g4(0x614, mS.rz)]) {
        const f9 = config_JSON[g4(mS.yR, 'NxG1')][g4(0x2d7, mS.oW)][g4(0x1226, mS.yd)] ? (await generateRandomIp(f, config_JSON[g4(mS.yS, '7NO9')][g4(0x1dfc, 'ZgMu')][g4(mS.yT, '*lLT')], config_JSON[g4(0x1be4, mS.yU)][g4(mS.yV, 'd%lH')][g4(0x1a82, mS.yW)]))[0x0] : await g['KV'][g4(mS.yX, '9rQu')](g4(0x146e, mS.yY)) ? await sortIntoArray(await g['KV'][g4(mS.yZ, mS.z0)](g4(0x19d6, mS.yg))) : (await generateRandomIp(f, config_JSON[g4(mS.z1, 'dbGg')][g4(0xa0b, mS.ra)][g4(mS.z2, 'zs!c')], config_JSON[g4(0x1365, mS.z3)][g4(mS.z4, mS.z5)][g4(mS.z6, mS.q3)]))[0x0],
            fa = [],
            fb = [],
            fc = [];
        for (const fh of f9) {
            if (fh[g4(0x5d4, 'egod')]()[g4(mS.z7, mS.z8)](g4(mS.z9, '8Ys%'))) fa[g4(0xae2, mS.za)](fh);
            else {
                const fi = fh[g4(0x11a0, mS.zb)]('#'),
                    fj = fi > -0x1 ? fh[g4(mS.zc, 'Pt3!')](0x0, fi) : fh,
                    fk = fi > -0x1 ? fh[g4(mS.zd, 'jODS')](fi) : '',
                    fl = fh[g4(0x1b33, mS.ze)](/sub\s*=\s*([^\s&#]+)/i);
                if (fl && fl[0x1][g4(mS.zf, mS.fu)]()[g4(0x267, mS.aL)]('.')) {
                    const fm = fh[g4(mS.rn, '%oj0')]()[g4(mS.zg, mS.zh)](g4(mS.zi, mS.zj));
                    if (fm) fa[g4(mS.zk, mS.w3)](g4(mS.zl, '2#Qk') + fl[0x1][g4(0xdb7, 'dn8p')]() + g4(0xd45, 'mRB^') + (fh[g4(mS.yA, '[p9(')]('#') ? '#' + fh[g4(mS.zm, mS.zn)]('#')[0x1] : ''));
                    else fa[g4(mS.zo, '[p9(')](g4(mS.zp, 'C2T0') + fl[0x1][g4(mS.zq, 'PSkb')]() + (fh[g4(mS.zr, 'CeJW')]('#') ? '#' + fh[g4(mS.zs, mS.s)]('#')[0x1] : ''));
                } else {
                    if (fj[g4(mS.rn, '%oj0')]()[g4(0x512, mS.W)](g4(0xfb8, mS.zt))) fa[g4(0x8d8, mS.zu)](fh);
                    else {
                        if (fj[g4(mS.zv, 'dbGg')]()[g4(0x483, 'mRB^')](g4(mS.zw, 'vel('))) {
                            if (fh[g4(0x538, mS.cC)]('#')) {
                                const fn = fh[g4(mS.zx, 'NMJQ')]('#');
                                fc[g4(mS.zy, 'T3Fv')](fn[0x0] + '#' + encodeURIComponent(decodeURIComponent(fn[0x1])));
                            } else fc[g4(0x8d8, mS.q5)](fh);
                        } else {
                            if (fj[g4(0x13c8, '1qbp')]('*')) fb[g4(0x34d, mS.fu)](replaceStarWithRandom(fj) + fk);
                            else fb[g4(mS.zz, 'd%lH')](fh);
                        }
                    }
                }
            }
        }
        const fe = await requestBestApi(fa, g4(0x16f0, 'T3Fv')),
            ff = [...new Set(fc[g4(0x32c, mS.xV)](fe[0x1]))];
        eZ = ff[g4(0xfd3, mS.zA)] > 0x0 ? ff[g4(mS.zB, mS.zC)]('\x0a') + '\x0a' : '';
        const fg = fe[0x0];
        f0 = fe[0x3] || [], eY = [...new Set(fb[g4(0x1592, 'M5Ii')](fg))];
    } else {
        let fo = (f2 ? f1 : '') || config_JSON[g4(mS.zD, 'Mmsl')][g4(0x1117, 'jODS')];
        const [fp, fq] = await getBestSubGeneratorData(fo);
        eY = eY[g4(mS.zE, '60r9')](fp), eZ += fq;
    }
    if (networkSettings && networkSettings[g4(mS.zF, mS.zG)])
        try {
            const fr = await buildRegisteredWarpNode(g);
            if (fr) eZ = fr + '\x0a' + eZ;
        } catch (fs) {}
    const f3 = config_JSON[g4(0x1b69, 'egod')] ? g4(mS.zH, 'yxI7') + encodeURIComponent((config_JSON[g4(0x7ce, 'Pt3!')][g4(mS.zI, mS.bG)] ? config_JSON[g4(mS.zJ, mS.yU)][g4(mS.zK, mS.zL)] + '+' : '') + config_JSON[g4(0xce4, mS.zN)]) : '',
        f4 = eH[g4(mS.zr, 'CeJW')](g4(0x1d0e, mS.zO)) || eH[g4(mS.zP, 'rsIZ')](g4(0x7c2, mS.zQ)),
        { type: f5, pathFieldName: f6, domainFieldName: f7 } = getTransportProtocolConfig(config_JSON),
        f8 = g4(0x1dd8, mS.zR);
    eY = [D + g4(0x10e0, 'wCGK') + f8, ...eY],
        eM = eZ + eY[g4(0xcd2, '6UCx')](ft => {
            const g6 = g4,
                fu = ft[g6(0xae7, mO.c)](NODE_ADDR_REGEX);
            let fv, fw = g6(0x1b41, mO.f),
                fx;
            if (fu) fv = fu[0x1], fw = fu[0x2] ? fu[0x2] : g6(mO.g, mO.h), fx = fu[0x3] || fv;
            else return console[g6(mO.i, mO.j)](g6(0x1c18, mO.k) + ft), null;
            let fy = config_JSON[g6(0x1d8, 'IcEg')];
            const fz = fx[g6(mO.l, 'vel(')](/\$(socks5|http|https|turn|sstp):\/\/([^#\s]+)/i);
            if (fz)
                try {
                    const fA = fz[0x1][g6(0x867, mO.m)](),
                        fB = fz[0x2],
                        fC = { 'type': fA, ...getSocks5Account(fB, getProxyDefaultPort(fA)) };
                    fy = g6(0x1c1d, 'NMJQ') + (base64SecretEncode(JSON[g6(mO.n, mO.o)](fC), B) + (config_JSON[g6(0x180c, 'oeP*')] ? g6(0x406, 'dn8p') : '')), fx = fx[g6(mO.p, '6UCx')](fz[0x0], '')[g6(0x11b7, mO.q)]() || fv;
                } catch (fD) { console[g6(mO.r, mO.s)](g6(0x2a8, 'NMJQ') + fz[0x0] + '\x20(' + (fD && fD[g6(mO.t, mO.u)] ? fD[g6(0xdd4, mO.v)] : fD) + ')'); }
            else {
                if (config_JSON[g6(mO.w, mO.x)] && /^(socks5|http|https|turn|sstp):\/\//i[g6(mO.y, '2#Qk')](String(config_JSON[g6(0x1ddb, 'vel(')])[g6(0x441, mO.z)]()))
                    try {
                        const fE = /^(socks5|http|https|turn|sstp):\/\/(.+)$/i[g6(mO.A, mO.B)](String(config_JSON[g6(0x1bb6, mO.C)])[g6(0xdb7, mO.D)]()),
                            fF = fE[0x1][g6(0xc88, '1qbp')](),
                            fG = { 'type': fF, ...getSocks5Account(fE[0x2][g6(0x9bf, 'NMJQ')]('/')[0x0], getProxyDefaultPort(fF)) };
                        fy = g6(0x119d, mO.E) + (base64SecretEncode(JSON[g6(0x401, 'NMJQ')](fG), B) + (config_JSON[g6(mO.F, mO.G)] ? g6(mO.H, 'GzjL') : ''));
                    } catch (fH) { console[g6(0x1cc5, mO.I)](g6(mO.J, 'w3Tt') + (fH && fH[g6(mO.K, 'XITC')] ? fH[g6(0x1ca6, mO.L)] : fH)); }
                else {
                    if (f0[g6(0xaca, 'ZgMu')] > 0x0) {
                        const fI = f0[g6(0x1d54, mO.M)](fJ => fJ[g6(0xe1f, 'rsIZ')](fv));
                        if (fI) fy = (config_JSON[g6(mO.N, mO.O)] + g6(mO.P, mO.Q) + fI)[g6(mO.R, 'GzjL')](/\/\//g, '/') + (config_JSON[g6(0x1f9, 'egod')] ? g6(mO.S, 'Pt3!') : '');
                    }
                }
            }
            if (et) fy += (fy[g6(0x1e76, mO.D)]('?') ? '&' : '?') + 'u=' + et;
            if (f4) fy = fy[g6(mO.T, mO.U)](/,/g, g6(mO.V, mO.W));
            if (eL === 'ss' && !ep) {
                if (!config_JSON['SS'][g6(0x947, mO.O)]) {
                    const fJ = [0x1bb, 0x805, 0x823, 0x827, 0x830, 0x20fb],
                        fK = [0x50, 0x804, 0x822, 0x826, 0x82f, 0x1f90];
                    fw = String(fK[fJ[g6(0x1959, mO.X)](Number(fw))] ?? fw);
                }
                fy = (fy[g6(0x2e4, 'V#kN')]('?') ? fy[g6(mO.Y, '#sM9')]('?', g6(0x16f2, '6UCx') + config_JSON['SS'][g6(0x11bc, mO.E)] + '&') : fy + g6(0x1a0e, 'M5Ii') + config_JSON['SS'][g6(0xe9f, '*lLT')])[g6(mO.Z, '8Ys%')](/([=,])/g, g6(mO.a0, mO.a1));
                if (!eJ) fy = fy + g6(0x1131, mO.a2);
                return eL + g6(0x273, 'C2T0') + btoa(config_JSON['SS'][g6(mO.a3, '#sM9')] + g6(mO.a4, 'T3Fv')) + '@' + fv + ':' + fw + g6(mO.a5, mO.O) + (encodeURIComponent(g6(mO.a6, mO.a7) + (config_JSON[g6(0x1ced, 'wCGK')] ? randomPath(fy) : fy) + (config_JSON['SS'][g6(mO.a8, mO.O)] ? g6(0x1dbf, mO.U) : '')) + f3 + eX) + '#' + encodeURIComponent(fx);
            } else {
                const fL = getTransportPathParamValue(config_JSON, fy, ep);
                return eL + g6(mO.a9, mO.c) + fv + ':' + fw + g6(0x1e5f, '5M6D') + (f5 + f3) + '&' + f7 + g6(mO.aa, mO.q) + config_JSON[g6(mO.ab, 'mRB^')] + g6(mO.ac, '60r9') + f6 + '=' + (encodeURIComponent(fL) + eX) + g6(mO.ad, mO.o) + (config_JSON[g6(mO.ae, mO.af)] ? g6(0xeaa, 'dn8p') : '') + '#' + encodeURIComponent(fx);
            }
        })[g4(0x1b78, 'n7E3')](ft => ft !== null)[g4(mS.zS, mS.f)]('\x0a');
} else {
    const ft = (/taakaaproxy/i[g4(mS.zT, '7NO9')](config_JSON[g4(0x262, 'CeJW')][g4(0x11fc, 'zs!c')] || '') || !config_JSON[g4(0x620, mS.tX)][g4(0xaaa, mS.cs)] ? g4(0x459, 'ZgMu') : config_JSON[g4(0xcd3, mS.ay)][g4(mS.zU, 'n7E3')]) + g4(mS.zV, 'vel(') + eK + g4(mS.zW, mS.yO) + encodeURIComponent(p[g4(mS.zX, mS.zY)] + '//' + p[g4(mS.zZ, '9rQu')] + g4(mS.A0, mS.A1) + ez + g4(0x1308, mS.vE) + identifyCarrier(f) + (p[g4(0xd98, mS.A2)][g4(mS.A3, 'M5Ii')](g4(mS.A4, mS.f0)) && p[g4(mS.A5, 'mRB^')][g4(0x515, '89Hn')](g4(mS.A6, mS.n0)) != '' ? g4(mS.A7, mS.A8) + p[g4(mS.A9, 'IcEg')][g4(0x1320, 'NxG1')](g4(0x1bee, '60r9')) : '')) + g4(mS.Aa, mS.Ab) + encodeURIComponent(config_JSON[g4(0x1eb0, 'egod')][g4(0xe82, '60r9')]) + g4(0xa0f, 'n7E3') + config_JSON[g4(0xbf7, mS.Ac)][g4(0x1a79, mS.zG)] + g4(mS.Ad, mS.Ae) + config_JSON[g4(0x1e14, 'jODS')];
    try {
        const fu = await fetch(ft, { 'headers': { 'User-Agent': g4(mS.Af, 'V#kN') + eK + g4(mS.Ag, mS.qR) } });
        if (fu['ok']) {
            eM = await fu[g4(mS.Ah, '8Ys%')]();
            if (p[g4(0xb6b, mS.as)][g4(0x1385, mS.Ai)](g4(mS.Aj, '5M6D')) || eH[g4(0xd7d, 'b)3q')](g4(0x148a, 'w3Tt'))) eM = SurgesubConfigFileHotpatch(eM, p[g4(mS.Ak, mS.Al)] + '//' + p[g4(mS.Am, 'ZgMu')] + g4(mS.An, mS.Ao) + eo + g4(0x1127, 'vel('), config_JSON);
        } else return new Response(g4(0x1bcc, mS.bO) + fu[g4(0x1c4b, 'Mmsl')], { 'status': fu[g4(mS.Ap, mS.sn)] });
    } catch (fv) { return new Response(g4(mS.Aq, '$p[^') + fv[g4(0x1068, 'mRB^')], { 'status': 0x193 }); }
    }
                        if (!eH[g4(0x166c, '$BSl')](g4(mS.Ar, mS.ce)) && ev) {
                            let fw = config_JSON[g4(mS.As, mS.ad)];
                            try {
                                const fA = JSON[g4(0x8fa, mS.At)](await g['KV'][g4(0x511, mS.Au)](g4(mS.Av, mS.Aw)) || g4(mS.Ax, '$p[^'));
                                if (fA && Array[g4(0x14a0, '89Hn')](fA[g4(mS.Ay, mS.vZ)])) {
                                    const fB = new Set(fA[g4(0x1d3f, 'yxI7')][g4(mS.Az, 'PYt$')](fD => fD && fD['ok'] === ![])[g4(0x1098, 'dn8p')](fD => fD[g4(0x2f8, '60r9')])),
                                        fC = config_JSON[g4(mS.AA, mS.xl)][g4(0x2c5, 'CeJW')](fD => !fB[g4(0x14c2, 'n7E3')](fD));
                                    if (fC[g4(mS.AB, 'w3Tt')]) fw = fC;
                                }
                            } catch (fD) {}
                            const fx = [...fw][g4(mS.AC, 'M5Ii')](() => Math[g4(0xeaf, 'mRB^')]() - 0.5);
                            let fy = 0x0,
                                fz = null;
                            eM = eM[g4(mS.AD, 'Mmsl')](/00000000-0000-4000-8000-000000000000/g, config_JSON[g4(0x1112, mS.AE)])[g4(0x5da, mS.m)](/MDAwMDAwMDAtMDAwMC00MDAwLTgwMDAtMDAwMDAwMDAwMDAw/g, btoa(config_JSON[g4(mS.AF, mS.xn)]))[g4(mS.AG, mS.fi)](/example\.com/g, () => {
                                const g7 = g4;
                                if (fy % 0x2 === 0x0) {
                                    const fE = fx[Math[g7(mP.c, 'jODS')](fy / 0x2) % fx[g7(0x17b8, 'dZbH')]];
                                    fz = replaceStarWithRandom(fE);
                                }
                                return fy++, fz;
                            });
                        }
                        if (eK === g4(0x1171, '9rQu') && (!eH[g4(mS.AH, mS.z0)](g4(mS.AI, mS.pB)) || p[g4(0x15d2, '9rQu')][g4(mS.AJ, mS.yQ)](g4(0x8c4, '*lLT')) || p[g4(0x15d2, '9rQu')][g4(0x2bd, mS.AK)](g4(mS.AL, 'jODS')))) eM = btoa(eM);
                        if (eK === g4(mS.AM, mS.Ao)) eM = await SingboxsubConfigFileHotpatch(eM, config_JSON, networkSettings), eI[g4(0x6d8, mS.AN)] = g4(mS.AO, mS.AP);
                        else eK === g4(0x14a, mS.AQ) && (eM = ClashsubConfigFileHotpatch(eM, config_JSON, networkSettings), eI[g4(mS.AR, '89Hn')] = g4(0x5a0, '#sM9'));
                        return new Response(eM, { 'status': 0xc8, 'headers': eI });
                    }
                } else {
                    if (E === g4(mS.AS, mS.tX)) {
                        const fE = f[g4(mS.AT, '[]Y1')][g4(0x18ab, '6UCx')](g4(mS.AU, mS.AV)) || '',
                            fF = fE[g4(0x1c80, mS.t8)](';')[g4(mS.AW, mS.p6)](fG => fG[g4(0x434, 'zs!c')]()[g4(0x134a, 'ZgMu')](g4(0x1e3c, 'V#kN')))?.[g4(0x1b72, mS.AX)]('=')[0x1];
                        if (fF && await verifySessionToken(fF, q, z, x)) return fetch(new Request(g4(0x289, mS.uT), { 'headers': { 'Referer': g4(0x135a, mS.AY) } }));
                    } else {
                        if (E === g4(mS.AZ, 'NMJQ')) return new Response(g4(0xab1, 'yxI7'), { 'status': 0xc8, 'headers': { 'Content-Type': g4(mS.B0, mS.B1) } });
                    }
                }
            }
        }
    }
                                        }
export default taakaaXiWorker;

async function handleXhttpRequest(c, f, g, h) {
    const n3 = { c: 0x432, f: 0x1922, g: '7NO9', h: 0x1877, i: 'oeP*', j: 0x1d52, k: 0x1742, l: '6UCx', m: 0x15b4, n: '6UCx', o: '1qbp', p: 0x19f, q: 0x1ade, r: 'zs!c', s: 0x1dde, t: 'dbGg', u: 'IcEg', v: 0xec, w: 'ZgMu', x: 'V#kN', y: 0x4fd, z: '8Ys%', A: 0xf6d },
        n2 = { c: 0x97a, f: 'Gn7Q', g: 0x1262, h: 'd%lH', i: 0x54f, j: 'n7E3', k: 0x1c8f, l: 0x6a3, m: 'IcEg', n: 0x1e20, o: '5M6D', p: '#sM9', q: 0x3aa, r: 0x628, s: 0xf43, t: '0Ua@', u: 0x6bf, v: 'Gn7Q', w: 0x732, x: 0x77a, y: '9rQu', z: 0xe0c, A: '[p9(', B: '*lLT', C: 'ZgMu', D: 0x17a1, E: 'V#kN', F: 0x37c, G: 'GzjL', H: 0x686, I: 0x97c, J: 0x572, K: '$p[^', L: 0x177c, M: 0x1b3e, N: 0x19ac, O: '7NO9' },
        n0 = { c: 0x669, f: 'd%lH' },
        mX = { c: 0x124b, f: 'IcEg', g: 0x1e6b, h: '*lLT', i: '6UCx', j: 0x4fa, k: 0xcc9 },
        mW = { c: 0x1a36, f: '89Hn', g: 0x11e5, h: 'GzjL' },
        mV = { c: '%oj0' },
        gb = fX;
    if (connRejectReason) return new Response(gb(n3.c, 'n7E3') + connRejectReason + ')', { 'status': 0x193 });
    if (!c[gb(n3.f, n3.g)]) return new Response(gb(n3.h, n3.i), { 'status': 0x190 });
    const i = c[gb(n3.j, 'dn8p')][gb(n3.k, n3.l)](),
        j = await readXhttpFirstPacket(i, f);
    if (!j) {
        try { i[gb(n3.m, n3.n)](); } catch (s) {}
        return new Response(gb(0x1d58, n3.o), { 'status': 0x190 });
    }
    if (isBlockedSite(j[gb(n3.p, 'Pt3!')])) {
        try { i[gb(n3.q, 'NMJQ')](); } catch (t) {}
        return networkSettings && networkSettings[gb(0x89b, 'PYt$')] && isAdultDomain(j[gb(0xa4e, n3.r)]) ? taakaaXiBlockPage(c) : new Response(gb(n3.s, n3.t), { 'status': 0x193 });
    }
    if (j[gb(0x18c1, 'dbGg')] && j[gb(0x971, n3.u)] !== gb(n3.v, '*lLT') && j[gb(0x10e3, n3.w)] !== 0x35) {
        try { i[gb(0x7be, n3.x)](); } catch (u) {}
        return new Response(gb(n3.y, '[p9('), { 'status': 0x190 });
    }
    const k = { 'socket': null, 'connectingPromise': null, 'retryConnect': null };
    let l = null,
        m = null;
    const n = { 'up': 0x0, 'down': 0x0 },
        o = new Headers({ 'Content-Type': gb(0x1022, n3.z), 'X-Accel-Buffering': 'no', 'Cache-Control': gb(n3.A, 'XITC') }),
        p = () => {
            const gc = gb;
            if (m) {
                try { m[gc(0x1b3e, mV.c)](); } catch (v) {}
                m = null;
            }
            l = null;
        },
        q = () => {
            const gd = gb,
                v = k[gd(mW.c, mW.f)];
            if (!v) return null;
            return v !== l && (p(), l = v, m = v[gd(mW.g, 'IcEg')][gd(0xd03, mW.h)]()), m;
        };
    let r = null;
    return new Response(new ReadableStream({
        async 'start'(v) {
            const n1 = { c: 0x12de, f: 'V#kN' },
                mZ = { c: 0x1d4b, f: 'wCGK', g: 0xdd2, h: '89Hn' },
                mY = { c: 0xf79 },
                ge = gb;
            let w = ![],
                x = j[ge(n2.c, n2.f)];
            const y = { 'cache': new Uint8Array(0x0) },
                z = { 'readyState': WebSocket[ge(n2.g, 'dZbH')], 'send'(C) {
                        const gf = ge;
                        if (w) return;
                        try {
                            const D = C instanceof Uint8Array ? C : C instanceof ArrayBuffer ? new Uint8Array(C) : ArrayBuffer[gf(mX.c, mX.f)](C) ? new Uint8Array(C[gf(mX.g, '[p9(')], C[gf(0x1748, 'CeJW')], C[gf(0xf42, mX.h)]) : new Uint8Array(C);
                            v[gf(0xc1b, mX.i)](D), n[gf(0x1609, '#sM9')] += D[gf(mX.j, 'dbGg')];
                        } catch (E) { w = !![], this[gf(mX.k, '1qbp')] = WebSocket[gf(0x1322, '#sM9')]; }
                    }, 'close'() {
                        const gg = ge;
                        if (w) return;
                        w = !![], this[gg(mY.c, 'oeP*')] = WebSocket[gg(0x1322, '#sM9')];
                        try { v[gg(0x17d4, 'd%lH')](); } catch (C) {}
                    } },
                A = r = createUpstreamWriteQueue({ 'getWriter': q, 'releaseWriter': p, 'retryConnection': async() => {
                        const gh = ge;
                        if (typeof k[gh(mZ.c, mZ.f)] !== gh(mZ.g, mZ.h)) throw new Error(gh(0x19ca, 'T3Fv'));
                        await k[gh(0x660, 'IcEg')]();
                    }, 'closeConnection': () => {
                        const gi = ge;
                        try { k[gi(n0.c, n0.f)]?.[gi(0x6c4, 'PYt$')](); } catch (C) {}
                        closeSocketQuietly(z);
                    }, 'name': ge(0x16d8, n2.h) }),
                B = async(C, D = !![]) => { const gj = ge; return A[gj(n1.c, n1.f)](C, D); };
            try {
                if (j[ge(0x1724, 'mRB^')]) {
                    if (j[ge(n2.i, n2.j)]?.[ge(0x1786, 'Gn7Q')]) {
                        if (j[ge(n2.k, 'egod')] === ge(0x408, 'dZbH')) await forwardTrojanUdpData(j[ge(n2.l, n2.m)], z, y, c);
                        else await forwardataudp(j[ge(n2.n, n2.o)], z, x, c);
                        x = null;
                    }
                } else {
                    if (j[ge(0xbd9, n2.p)]?.[ge(n2.q, n2.j)]) n['up'] += j[ge(n2.r, 'NxG1')][ge(n2.s, n2.t)];
                    await forwardataTCP(j[ge(0x1284, 'jODS')], j[ge(n2.u, n2.v)], j[ge(n2.w, 'egod')], z, j[ge(n2.x, '2#Qk')], k, f, c, n);
                }
                while (!![]) {
                    const { done: C, value: D } = await i[ge(0x1c43, n2.y)]();
                    if (C) break;
                    if (!D || D[ge(0x9b2, 'T3Fv')] === 0x0) continue;
                    if (D[ge(n2.z, n2.A)]) n['up'] += D[ge(0xf42, n2.B)];
                    if (j[ge(0x1be0, n2.C)]) {
                        if (j[ge(n2.D, n2.E)] === ge(0xae1, '%oj0')) await forwardTrojanUdpData(D, z, y, c);
                        else await forwardataudp(D, z, x, c);
                        x = null;
                    } else {
                        if (!await B(D)) throw new Error(ge(n2.F, n2.G));
                    }
                }
                if (!j[ge(0x1a2b, 'w3Tt')]) {
                    await A[ge(0x1e90, 'NxG1')]();
                    const E = q();
                    if (E)
                        try { await E[ge(n2.H, 'NMJQ')](); } catch (F) {}
                }
            } catch (G) {
                log(ge(n2.I, n2.m) + (G?.[ge(n2.J, n2.K)] || G)), closeSocketQuietly(z);
            } finally {
                A[ge(n2.L, n2.B)](), p();
                try { i[ge(n2.M, '%oj0')](); } catch (H) {}
                recordUsage(g, n['up'], n[ge(n2.N, n2.O)], h);
            }
        }
    }), { 'status': 0xc8, 'headers': o });
}

function validDataLength(c) {
    const n4 = { c: 'ZgMu', f: 0xeeb, g: 'T3Fv', h: '60r9' },
        gk = fX;
    if (!c) return 0x0;
    if (typeof c[gk(0xea8, n4.c)] === gk(n4.f, '0Ua@')) return c[gk(0x9b2, n4.g)];
    if (typeof c[gk(0x111e, n4.h)] === gk(0x1ab8, n4.g)) return c[gk(0x1c85, '6UCx')];
    return 0x0;
}

async function readXhttpFirstPacket(c, f) {
    const n7 = { c: '1qbp', f: 0x981, g: 'M5Ii', h: '#sM9', i: 0x1b90, j: '$p[^', k: '60r9', l: 0x935, m: 0x12ee, n: 'Gn7Q', o: 'yxI7', p: 0x14d6, q: '2#Qk', r: 0x1d19, s: 'Pt3!', t: 0xfdb, u: '6UCx', v: 0xf3b, w: 0x3ab, x: 0xea4, y: 0x67d, z: '[p9(' },
        n6 = { c: 0x5a6, f: 0x9b2, g: 0x12aa, h: '*lLT', i: 0xcd5, j: 0xe85, k: '%oj0', l: 0x1f0f, m: 'M5Ii', n: 0xed7, o: 0x10f, p: 'IcEg', q: '[p9(', r: 0x130c, s: 'd%lH', t: 'M5Ii', u: 'w(Wr', v: 0x635, w: 0x17ba, x: 'egod', y: 'Pt3!', z: 'vel(', A: 0x69b, B: 'C2T0' },
        n5 = { c: 0x983, f: '60r9', g: 0x140c, h: '#sM9', i: 0x1bc7, j: 0x6fa, k: 'w(Wr', l: 0x1407, m: 0x1c64, n: 'NMJQ', o: 'w3Tt', p: 'd%lH', q: 0xd24, r: 0x495, s: '*lLT', t: 'zs!c' },
        gn = fX,
        g = VLESStextDecode,
        h = o => {
            const gl = b,
                p = o[gl(0x107a, 'yxI7')];
            if (p < 0x12) return { 'status': gl(n5.c, n5.f) };
            if (!UUIDbyteMatch(o, 0x1, f)) return { 'status': gl(0x1014, '6UCx') };
            const q = o[0x11],
                r = 0x12 + q;
            if (p < r + 0x1) return { 'status': gl(0x1342, 'vel(') };
            const s = o[r];
            if (s !== 0x1 && s !== 0x2) return { 'status': gl(0x16db, '$p[^') };
            const t = r + 0x1;
            if (p < t + 0x3) return { 'status': gl(0xe97, '%oj0') };
            const u = o[t] << 0x8 | o[t + 0x1],
                v = o[t + 0x2],
                w = t + 0x3;
            let x = -0x1,
                y = '';
            if (v === 0x1) {
                if (p < w + 0x4) return { 'status': gl(n5.g, n5.h) };
                y = o[w] + '.' + o[w + 0x1] + '.' + o[w + 0x2] + '.' + o[w + 0x3], x = w + 0x4;
            } else {
                if (v === 0x2) {
                    if (p < w + 0x1) return { 'status': gl(n5.i, '0Ua@') };
                    const z = o[w];
                    if (p < w + 0x1 + z) return { 'status': gl(n5.j, n5.k) };
                    y = g[gl(n5.l, 'mRB^')](o[gl(0x147e, 'PSkb')](w + 0x1, w + 0x1 + z)), x = w + 0x1 + z;
                } else {
                    if (v === 0x3) {
                        if (p < w + 0x10) return { 'status': gl(n5.m, n5.n) };
                        const A = [];
                        for (let B = 0x0; B < 0x8; B++) {
                            const C = w + B * 0x2;
                            A[gl(0x8a9, n5.o)]((o[C] << 0x8 | o[C + 0x1])[gl(0x345, n5.p)](0x10));
                        }
                        y = A[gl(n5.q, 'CeJW')](':'), x = w + 0x10;
                    } else return { 'status': gl(n5.r, n5.s) };
                }
            }
            if (!y) return { 'status': gl(0x17ba, 'egod') };
            return { 'status': 'ok', 'result': { 'protocol': 'vl' + gl(0xea, n5.t), 'hostname': y, 'port': u, 'isUDP': s === 0x2, 'rawData': o[gl(0x1b90, '$p[^')](x), 'respHeader': new Uint8Array([o[0x0], 0x0]) } };
        },
        i = o => {
            const gm = b,
                p = sha224(f),
                q = new TextEncoder()[gm(n6.c, '89Hn')](p),
                r = o[gm(n6.f, 'T3Fv')];
            if (r < 0x3a) return { 'status': gm(n6.g, n6.h) };
            if (o[0x38] !== 0xd || o[0x39] !== 0xa) return { 'status': gm(n6.i, 'yxI7') };
            for (let A = 0x0; A < 0x38; A++) {
                if (o[A] !== q[A]) return { 'status': gm(n6.j, n6.k) };
            }
            const s = 0x3a;
            if (r < s + 0x2) return { 'status': gm(n6.l, n6.m) };
            const t = o[s];
            if (t !== 0x1 && t !== 0x3) return { 'status': gm(0x1aa8, 'wCGK') };
            const u = t === 0x3,
                v = o[s + 0x1];
            let w = s + 0x2,
                x = '';
            if (v === 0x1) {
                if (r < w + 0x4) return { 'status': gm(n6.n, 'Gn7Q') };
                x = o[w] + '.' + o[w + 0x1] + '.' + o[w + 0x2] + '.' + o[w + 0x3], w += 0x4;
            } else {
                if (v === 0x3) {
                    if (r < w + 0x1) return { 'status': gm(n6.o, n6.p) };
                    const B = o[w];
                    if (r < w + 0x1 + B) return { 'status': gm(0x2b6, 'oeP*') };
                    x = g[gm(0x142f, n6.q)](o[gm(n6.r, n6.s)](w + 0x1, w + 0x1 + B)), w += 0x1 + B;
                } else {
                    if (v === 0x4) {
                        if (r < w + 0x10) return { 'status': gm(0x1f0f, n6.t) };
                        const C = [];
                        for (let D = 0x0; D < 0x8; D++) {
                            const E = w + D * 0x2;
                            C[gm(0xfa7, n6.u)]((o[E] << 0x8 | o[E + 0x1])[gm(0x1966, 'dn8p')](0x10));
                        }
                        x = C[gm(0xb92, 'zs!c')](':'), w += 0x10;
                    } else return { 'status': gm(n6.v, 'vel(') };
                }
            }
            if (!x) return { 'status': gm(n6.w, n6.x) };
            if (r < w + 0x4) return { 'status': gm(0x1a26, n6.y) };
            const y = o[w] << 0x8 | o[w + 0x1];
            if (o[w + 0x2] !== 0xd || o[w + 0x3] !== 0xa) return { 'status': gm(0x635, n6.z) };
            const z = w + 0x4;
            return { 'status': 'ok', 'result': { 'protocol': gm(n6.A, 'Mmsl'), 'hostname': x, 'port': y, 'isUDP': u, 'rawData': o[gm(0xd4c, n6.B)](z), 'respHeader': null } };
        };
    let j = new Uint8Array(0x400),
        k = 0x0;
    while (!![]) {
        const { value: o, done: p } = await c[gn(0xdad, n7.c)]();
        if (p) {
            if (k === 0x0) return null;
            break;
        }
        const q = o instanceof Uint8Array ? o : new Uint8Array(o);
        if (k + q[gn(0xa21, 'Mmsl')] > j[gn(0x62c, 'mRB^')]) {
            const u = new Uint8Array(Math[gn(n7.f, n7.g)](j[gn(0xea8, 'ZgMu')] * 0x2, k + q[gn(0x1bf5, '1qbp')]));
            u[gn(0x12e4, n7.h)](j[gn(n7.i, n7.j)](0x0, k)), j = u;
        }
        j[gn(0xfb9, 'C2T0')](q, k), k += q[gn(0x1920, n7.k)];
        const r = j[gn(n7.l, '5M6D')](0x0, k),
            s = i(r);
        if (s[gn(0x1cbc, 'dZbH')] === 'ok') return { ...s[gn(n7.m, n7.n)], 'reader': c };
        const t = h(r);
        if (t[gn(0x19a6, n7.o)] === 'ok') return { ...t[gn(0xcd9, 'CeJW')], 'reader': c };
        if (s[gn(n7.p, n7.q)] === gn(n7.r, n7.s) && t[gn(0x1659, 'GzjL')] === gn(n7.t, 'dn8p')) return null;
    }
    const l = j[gn(0x57d, n7.u)](0x0, k),
        m = i(l);
    if (m[gn(n7.v, 'rsIZ')] === 'ok') return { ...m[gn(n7.w, '*lLT')], 'reader': c };
    const n = h(l);
    if (n[gn(n7.x, 'T3Fv')] === 'ok') return { ...n[gn(n7.y, n7.z)], 'reader': c };
    return null;
}
async function handleGrpcRequest(c, f, g, h) {
    const nk = { c: 'ZgMu', f: 'oeP*', g: 'n7E3', h: 0xdec, i: 0x5b8, j: 0x981 },
        nj = { c: 'CeJW', f: 'NMJQ', g: 0x1ade, h: 'NMJQ' },
        ni = { c: 0x45e, f: 'w(Wr', g: 0x808, h: 0x1ef, i: 0x712, j: '$BSl', k: 'rsIZ', l: 'mRB^', m: 0x1dec, n: 'zs!c', o: 'ZgMu', p: 0x7ba, q: 0x23b, r: 'wCGK', s: 0x14a8, t: 0x10c8, u: 0xd13, v: 'vel(', w: 0x241, x: 'Mmsl', y: 0x1bf5, z: '1qbp', A: 'jODS', B: 0x1ee8, C: 0x1241, D: 'IcEg', E: 0x1a19, F: 0x95e, G: 'n7E3', H: 0x844, I: 'd%lH', J: 0x1255, K: 'T3Fv', L: 0x1425, M: 0x1565, N: 0x8a4, O: '7NO9', P: 0x13f7, Q: 0x1644, R: '1qbp', S: 0xc18, T: 0xa52, U: 0xb1b, V: 'M5Ii' },
        nh = { c: 0x1607 },
        ng = { c: 0x106a, f: 0x1e43, g: 'CeJW' },
        ne = { c: 0x818, f: '89Hn' },
        nd = { c: 0x1674, f: 0x163f, g: '[]Y1', h: 0xaa5, i: 'M5Ii', j: 0x43e, k: 'V#kN', l: '60r9', m: 0xa7f, n: 'dZbH' },
        n9 = { c: 0xed2, f: 0x2b2, g: 0x10fe, h: 'd%lH' },
        go = fX;
    if (!c[go(0x1150, 'w(Wr')]) return new Response(go(0x1d6d, nk.c), { 'status': 0x190 });
    const i = c[go(0x638, nk.f)][go(0xee4, nk.g)](),
        j = { 'socket': null, 'connectingPromise': null, 'retryConnect': null },
        k = { 'up': 0x0, 'down': 0x0 };
    let l = ![];
    const m = { 'cache': new Uint8Array(0x0) };
    let n = null,
        o = null,
        p = null,
        q = null;
    const r = new Headers({ 'Content-Type': go(nk.h, 'oeP*'), 'grpc-status': '0', 'X-Accel-Buffering': 'no', 'Cache-Control': go(nk.i, 'Mmsl') }),
        s = downstreamGrainChunkBytes,
        t = Math[go(nk.j, 'M5Ii')](downstreamGrainSilentMs, 0x1);
    return new Response(new ReadableStream({
        async 'start'(u) {
            const nf = { c: 0x1587, f: 'wCGK' },
                na = { c: 0x139d, f: 'Gn7Q', g: 'n7E3', h: 0x1afb, i: '[]Y1', j: 0x1799, k: 'dn8p' },
                n8 = { c: 0x107a, f: 0x1786, g: 'Gn7Q', h: 0xb28, i: 0x9b2, j: 'T3Fv', k: 'wCGK', l: 0x7ba, m: 'oeP*' },
                gp = go;
            let v = ![],
                w = [],
                x = 0x0,
                y = null,
                z = ![];
            const A = { 'readyState': WebSocket[gp(ni.c, ni.f)], 'send'(H) {
                    const gq = gp;
                    if (v) return;
                    const I = H instanceof Uint8Array ? H : new Uint8Array(H);
                    k[gq(0xf2a, 'IcEg')] += I[gq(n8.c, 'yxI7')];
                    const J = [];
                    let K = I[gq(n8.f, n8.g)] >>> 0x0;
                    while (K > 0x7f) { J[gq(0x8d8, 'zs!c')](K & 0x7f | 0x80), K >>>= 0x7; }
                    J[gq(0x34d, 'NxG1')](K);
                    const L = new Uint8Array(J),
                        M = 0x1 + L[gq(n8.h, 'PSkb')] + I[gq(n8.i, n8.j)],
                        N = new Uint8Array(0x5 + M);
                    N[0x0] = 0x0, N[0x1] = M >>> 0x18 & 0xff, N[0x2] = M >>> 0x10 & 0xff, N[0x3] = M >>> 0x8 & 0xff, N[0x4] = M & 0xff, N[0x5] = 0xa, N[gq(0xe36, 'T3Fv')](L, 0x6), N[gq(0x1e0, '5M6D')](I, 0x6 + L[gq(0xaca, 'ZgMu')]), w[gq(0x1711, n8.k)](N), x += N[gq(n8.l, n8.m)], C();
                }, 'close'() {
                    const gr = gp;
                    if (this[gr(n9.c, 'n7E3')] === WebSocket[gr(n9.f, 'V#kN')]) return;
                    B(!![]), v = !![], this[gr(n9.g, '*lLT')] = WebSocket[gr(0x1c6c, 'PYt$')];
                    try { u[gr(0x17d4, n9.h)](); } catch (H) {}
                } },
                B = (H = ![]) => {
                    const gs = gp;
                    z = ![];
                    y && (clearTimeout(y), y = null);
                    if (!H && v || x === 0x0) return;
                    const I = new Uint8Array(x);
                    let J = 0x0;
                    for (const K of w) { I[gs(na.c, na.f)](K, J), J += K[gs(0x3aa, na.g)]; }
                    w = [], x = 0x0;
                    try { u[gs(na.h, na.i)](I); } catch (L) { v = !![], A[gs(na.j, na.k)] = WebSocket[gs(0x6af, 'oeP*')]; }
                },
                C = () => {
                    if (x >= s) { B(); return; }
                    if (z || y) return;
                    z = !![], queueMicrotask(() => { z = ![]; if (v || x === 0x0 || y) return; y = setTimeout(B, t); });
                },
                D = () => {
                    const gt = gp;
                    if (v) return;
                    q?.[gt(nd.c, 'dn8p')](), B(!![]), v = !![], A[gt(nd.f, nd.g)] = WebSocket[gt(0x568, 'M5Ii')];
                    if (y) clearTimeout(y);
                    if (p) { try { p[gt(nd.h, nd.i)](); } catch (H) {} p = null; }
                    o = null;
                    try { i[gt(nd.j, '*lLT')](); } catch (I) {}
                    try { j[gt(0x16ec, nd.k)]?.[gt(0x173f, nd.l)](); } catch (J) {}
                    try { u[gt(nd.m, nd.n)](); } catch (K) {}
                },
                E = () => {
                    const gu = gp;
                    if (p) { try { p[gu(ne.c, ne.f)](); } catch (H) {} p = null; }
                    o = null;
                },
                F = q = createUpstreamWriteQueue({ 'getWriter': () => {
                        const gv = gp,
                            H = j[gv(0x16ec, 'V#kN')];
                        if (!H) return null;
                        return H !== o && (E(), o = H, p = H[gv(nf.c, 'PSkb')][gv(0x936, nf.f)]()), p;
                    }, 'releaseWriter': E, 'retryConnection': async() => {
                        const gw = gp;
                        if (typeof j[gw(ng.c, '89Hn')] !== gw(0x1416, 'w3Tt')) throw new Error(gw(0x630, '$p[^'));
                        await j[gw(ng.f, ng.g)]();
                    }, 'closeConnection': D, 'name': gp(ni.g, 'PYt$') }),
                G = async(H, I = !![]) => { const gx = gp; return F[gx(nh.c, '8Ys%')](H, I); };
            try {
                let H = new Uint8Array(0x0);
                while (!![]) {
                    const { done: I, value: J } = await i[gp(ni.h, '6UCx')]();
                    if (I) break;
                    if (!J || J[gp(ni.i, ni.j)] === 0x0) continue;
                    const K = J instanceof Uint8Array ? J : new Uint8Array(J),
                        L = new Uint8Array(H[gp(0x919, 'C2T0')] + K[gp(0x1523, ni.k)]);
                    L[gp(0x15ed, ni.l)](H, 0x0), L[gp(ni.m, ni.n)](K, H[gp(0xaca, ni.o)]), H = L;
                    while (H[gp(0x1e77, 'IcEg')] >= 0x5) {
                        const M = H[0x1] << 0x18 >>> 0x0 | H[0x2] << 0x10 | H[0x3] << 0x8 | H[0x4],
                            N = 0x5 + M;
                        if (H[gp(ni.p, 'oeP*')] < N) break;
                        const O = H[gp(ni.q, ni.r)](0x5, N);
                        H = H[gp(ni.s, 'vel(')](N);
                        if (!O[gp(ni.t, 'd%lH')]) continue;
                        let P = O;
                        if (P[gp(ni.u, ni.v)] >= 0x2 && P[0x0] === 0xa) {
                            let Q = 0x0,
                                R = 0x1,
                                S = ![];
                            while (R < P[gp(0x1812, 'jODS')]) {
                                const T = P[R++];
                                if ((T & 0x80) === 0x0) { S = !![]; break; }
                                Q += 0x7;
                                if (Q > 0x23) break;
                            }
                            if (S) P = P[gp(ni.w, ni.x)](R);
                        }
                        if (!P[gp(ni.y, ni.z)]) continue;
                        if (l) {
                            if (n) await forwardTrojanUdpData(P, A, m, c);
                            else await forwardataudp(P, A, null, c);
                            continue;
                        }
                        if (j[gp(0x1ea2, ni.A)]) {
                            k['up'] += P[gp(ni.B, '7NO9')];
                            if (!await G(P)) throw new Error(gp(ni.C, ni.D));
                        } else {
                            const U = dataToUint8Array(P);
                            if (n === null) n = isTrojanFirstPacket(U, f);
                            if (n) {
                                const V = parseTrojanRequest(U, f);
                                if (V?.[gp(ni.E, '89Hn')]) throw new Error(V[gp(0x407, '60r9')] || gp(ni.F, '#sM9'));
                                const { port: W, hostname: X, rawClientData: Y, isUDP: Z } = V;
                                log(gp(0x1477, ni.G) + X + ':' + W + gp(ni.H, ni.I) + (Z ? 'is' : ''));
                                if (isBlockedSite(X)) throw new Error(gp(ni.J, ni.K));
                                Z ? (l = !![], validDataLength(Y) > 0x0 && (k['up'] += validDataLength(Y), await forwardTrojanUdpData(Y, A, m, c))) : (k['up'] += validDataLength(Y), await forwardataTCP(X, W, Y, A, null, j, f, c, k));
                            } else {
                                n = ![];
                                const a0 = parseVlessRequest(U, f);
                                if (a0?.[gp(ni.L, '[p9(')]) throw new Error(a0[gp(0x11b5, 'NMJQ')] || gp(ni.M, 'zs!c'));
                                const { port: a1, hostname: a2, version: a3, isUDP: a4, rawClientData: a5 } = a0;
                                log(gp(0x5a9, '*lLT') + a2 + ':' + a1 + gp(ni.N, 'IcEg') + (a4 ? 'is' : ''));
                                if (isBlockedSite(a2)) throw new Error(gp(0x1126, ni.O));
                                if (a4) {
                                    if (a1 !== 0x35) throw new Error(gp(0x11ef, '$BSl'));
                                    l = !![];
                                }
                                const a6 = new Uint8Array([a3, 0x0]);
                                A[gp(ni.P, ni.z)](a6);
                                const a7 = a5;
                                if (l) {
                                    if (n) await forwardTrojanUdpData(a7, A, m, c);
                                    else await forwardataudp(a7, A, null, c);
                                } else k['up'] += validDataLength(a7), await forwardataTCP(a2, a1, a7, A, null, j, f, c, k);
                            }
                        }
                    }
                    B();
                }
                await F[gp(ni.Q, ni.R)]();
            } catch (a8) { log(gp(ni.S, '7NO9') + (a8?.[gp(ni.T, '9rQu')] || a8)); } finally { F[gp(ni.U, '$p[^')](), E(), D(), recordUsage(g, k['up'], k[gp(0x26d, ni.V)], h); }
        },
        'cancel'() {
            const gy = go;
            q?.[gy(0x177c, '*lLT')]();
            try { j[gy(0x987, nj.c)]?.[gy(0x686, nj.f)](); } catch (u) {}
            try { i[gy(nj.g, nj.h)](); } catch (v) {}
        }
    }), { 'status': 0xc8, 'headers': r });
}

function isValidWsEarlyData(c, f) {
    const nl = { c: 'n7E3', f: 0x10c8, g: 'dZbH', h: 0x107a, i: 'yxI7' },
        gz = fX;
    if (!c?.[gz(0x3aa, nl.c)]) return ![];
    if (c[gz(nl.f, nl.g)] >= 0x12 && UUIDbyteMatch(c, 0x1, f)) return !![];
    if (c[gz(nl.h, nl.i)] < 0x3a || c[0x38] !== 0xd || c[0x39] !== 0xa) return ![];
    const g = sha224(f);
    for (let h = 0x0; h < 0x38; h++) {
        if (c[h] !== g[gz(0x1b1f, 'M5Ii')](h)) return ![];
    }
    return !![];
}

function decodeWsEarlyData(c, f) {
    const nm = { c: 0x11da, f: '[]Y1', g: 0x1cd8, h: 0x1733, i: 0x12e7, j: '$BSl', k: 'w(Wr', l: 0x479, m: 0x3b7, n: '[]Y1', o: 'mRB^', p: 'V#kN', q: 0x185f, r: '0Ua@' },
        gA = fX;
    if (!c) return null;
    if (c[gA(nm.c, nm.f)] > WSearlyDataMaxHeaderLength) throw new Error(gA(nm.g, 'w3Tt'));
    let g;
    const h = Uint8Array;
    if (typeof h[gA(nm.h, 'PSkb')] === gA(nm.i, nm.j))
        try { g = h[gA(0x1ea9, 'NxG1')](c, { 'alphabet': gA(0x1b7b, nm.k) }); } catch (j) {}
    if (!g) {
        let k = c[gA(nm.l, 'PYt$')](/-/g, '+')[gA(nm.m, nm.n)](/_/g, '/');
        const l = k[gA(0x5e1, nm.o)] % 0x4;
        if (l) k += '='[gA(0x1bf0, nm.p)](0x4 - l);
        let m;
        try { m = atob(k); } catch (n) { return null; }
        g = new Uint8Array(m[gA(0x9a0, 'V#kN')]);
        for (let o = 0x0; o < m[gA(0x919, 'C2T0')]; o++) g[o] = m[gA(nm.q, nm.r)](o);
    }
    if (g[gA(0x521, nm.f)] > WSearlyDataMaxBytes) throw new Error(gA(0x9f7, 'GzjL'));
    return isValidWsEarlyData(g, f) ? g : null;
}

async function backendDiagnostic(c, f) {
    const nn = { c: '#sM9', f: 0x716, g: 'w(Wr', h: 0x1c23, i: 0xda9, j: '89Hn', k: 0x1bd6, l: 'wCGK', m: 0xb29, n: 0x93e, o: '*lLT', p: '5M6D', q: 0x1a92, r: 'dbGg', s: 0x1454, t: 0x592, u: 0x368, v: 0x14b6, w: 'zs!c', x: 0x1088, y: '*lLT', z: 0x1103, A: 'n7E3', B: 0x1df5, C: 'mRB^', D: 0x1f1, E: 0x10a7, F: 'oeP*', G: 'd%lH', H: 0xebd, I: 0x492, J: 0x1083, K: '[]Y1', L: '2#Qk', M: 0x1d62, N: 0x299, O: 0x198e, P: '89Hn', Q: 0x112d, R: '#sM9', S: 0x98f, T: 0x6b2, U: 'oeP*', V: 0x1636, W: 0x1b29, X: 0x252, Y: 'NMJQ', Z: 0xc2c, a0: 'd%lH', a1: 0xffe, a2: 0x1026, a3: '9rQu', a4: 'jODS', a5: 0x5ce, a6: 'NxG1', a7: 0x183c, a8: 'PSkb', a9: 0x5c9, aa: 'egod', ab: 0x1d9c, ac: 0x109b, ad: 0xab2, ae: 0x34d, af: 0x19e7, ag: 0x1a5c, ah: 'n7E3', ai: 'b)3q', aj: 'NMJQ', ak: 'ZgMu', al: 0x5ae, am: '[p9(', an: 0xb02, ao: 0x1572, ap: 'M5Ii', aq: 0x734, ar: 'GzjL', as: 0x1399, at: 0x151c, au: 0x239, av: 0x350, aw: 'jODS', ax: 0xcaf, ay: '89Hn', az: '60r9', aA: 0x3d9, aB: 'GzjL', aC: 0x545, aD: 0x54d, aE: 'rsIZ', aF: '0Ua@', aG: 0x1e39, aH: 0x34e, aI: 0x167c, aJ: 'yxI7', aK: 0xbc1, aL: '2#Qk', aM: 0x1301, aN: 'XITC', aO: 0x840, aP: 0x1330, aQ: 0x799, aR: '8Ys%' },
        gB = fX,
        g = { 'ok': ![], 'steps': [] },
        i = backendModeConfig(c);
    g[gB(0x711, nn.c)] = i['on'], g[gB(nn.f, nn.g)] = i[gB(nn.h, 'mRB^')] || gB(nn.i, nn.j);
    if (!i['on']) return g[gB(nn.k, nn.l)][gB(nn.m, 'oeP*')](gB(nn.n, '9rQu')), new Response(JSON[gB(0x840, nn.o)](g, null, 0x2), { 'status': 0xc8, 'headers': { 'Content-Type': gB(0x1990, nn.p), 'Cache-Control': gB(nn.q, nn.r) } });
    let j = '';
    try {
        const l = new URL(i[gB(nn.s, '7NO9')]);
        if (l[gB(0x17f3, 'dbGg')] === '/' || !l[gB(nn.t, '$p[^')]) l[gB(nn.u, 'CeJW')] = gB(0x1364, 'b)3q');
        j = l[gB(nn.v, nn.w)]();
    } catch (m) { return g[gB(nn.x, nn.y)][gB(nn.z, nn.A)](gB(nn.B, nn.C) + (m && m[gB(nn.D, 'n7E3')])), new Response(JSON[gB(nn.E, nn.F)](g, null, 0x2), { 'status': 0xc8, 'headers': { 'Content-Type': gB(0x17e1, nn.G) }); }
    g[gB(nn.H, 'PYt$')] = j;
    const k = Date[gB(nn.I, '2#Qk')]();
    try {
        const n = new Headers();
        n[gB(nn.J, nn.K)](gB(0x1bb3, nn.L), gB(0x1a47, '[]Y1')), n[gB(nn.M, '$BSl')](gB(nn.N, 'b)3q'), gB(nn.O, nn.F)), n[gB(0x12e4, '#sM9')](gB(0xf64, nn.P), '13'), n[gB(0x15ed, 'mRB^')](gB(nn.Q, 'C2T0'), gB(0x191c, nn.R));
        const o = await fetch(j, { 'method': gB(nn.S, '[]Y1'), 'headers': n, 'redirect': gB(nn.T, nn.U) });
        g[gB(0x1937, 'w3Tt')] = Date[gB(0x194d, nn.K)]() - k, g[gB(nn.V, 'dn8p')] = o[gB(nn.W, '[p9(')], g[gB(0x189, nn.w)] = !!o[gB(nn.X, nn.Y)];
        if (o[gB(0x8dd, nn.F)] === 0x65 && o[gB(nn.Z, nn.a0)]) { g['ok'] = !![], g[gB(nn.a1, 'PSkb')][gB(nn.a2, nn.a3)](gB(0x1472, nn.a4)); try { o[gB(0x1f17, 'vel(')][gB(nn.a5, nn.a6)](), o[gB(0xaf8, '89Hn')][gB(nn.a7, nn.a8)](0x3e8, gB(nn.a9, nn.aa)); } catch (p) {} } else {
            if (o[gB(nn.ab, nn.p)] === 0x65 && !o[gB(nn.ac, 'PYt$')]) g[gB(nn.ad, 'XITC')][gB(nn.ae, 'NxG1')](gB(0x1ad6, 'Gn7Q'));
            else {
                let q = '';
                try { q = (await o[gB(nn.af, 'w(Wr')]())[gB(nn.ag, nn.ah)](0x0, 0x12c); } catch (s) {}
                g[gB(0x16f4, nn.ai)] = q || gB(0x94b, nn.aj), g[gB(0x159c, 'egod')] = o[gB(0x657, nn.ak)][gB(0x8ed, nn.a3)](gB(nn.al, nn.am)) || '';
                if (o[gB(nn.an, 'ZgMu')] === 0x193) {
                    let t = ![];
                    try { const u = new URL(j)[gB(nn.ao, nn.ap)]; t = /^\d{1,3}(\.\d{1,3}){3}$/[gB(nn.aq, 'egod')](u) || u[gB(0x1c01, nn.ar)](':'); } catch (v) {}
                    t && g[gB(nn.as, '60r9')] != null && g[gB(nn.at, nn.ah)] < 0x32 ? (g[gB(nn.au, '$BSl')][gB(nn.av, nn.aw)](gB(0x18c0, '89Hn') + g[gB(nn.ax, '*lLT')] + gB(0x138a, nn.ay)), g[gB(0xdab, nn.az)] = gB(nn.aA, 'w3Tt')) : g[gB(0x82d, nn.aB)][gB(0xae2, 'T3Fv')](gB(nn.aC, nn.C));
                } else g[gB(0xaD, '2#Qk')][gB(0x3e5, 'mRB^')](gB(0x526, nn.aE) + o[gB(0x14a6, nn.aF)] + gB(nn.aG, 'dZbH'));
            }
        }
    } catch (w) { g[gB(0x1465, 'ZgMu')] = Date[gB(0x6eb, 'T3Fv')]() - k, g[gB(nn.aH, nn.aF)] = w && w[gB(nn.aI, nn.aJ)] ? w[gB(nn.aK, '#sM9')] : String(w), g[gB(0x13f1, '#sM9')][gB(0xfc7, nn.G)](gB(0x792, nn.aL)), g[gB(0xed1, '0Ua@')] = gB(nn.aM, nn.aN); }
    return new Response(JSON[gB(nn.aO, '*lLT')](g, null, 0x2), { 'status': 0xc8, 'headers': { 'Content-Type': gB(nn.aP, '6UCx'), 'Cache-Control': gB(nn.aQ, nn.aR) } });
}

function backendModeConfig(c) {
    const no = { c: 0x166f, f: '6UCx', g: '8Ys%', h: '5M6D', i: 0x1576, j: 0xcef, k: '*lLT', l: 0x710, m: 'NMJQ' },
        gC = fX,
        f = networkSettings || {},
        g = f[gC(no.c, '60r9')] && String(f[gC(0x14ba, no.f)])[gC(0x68a, '$BSl')]() || c && c[gC(0x762, no.g)] && String(c[gC(0x1cfd, no.h)])[gC(0x3b5, 'M5Ii')]() || '',
        h = (f[gC(no.i, no.g)] === !![] || c && (c[gC(no.j, 'vel(')] === gC(0x1b22, no.k) || c[gC(0x11cf, '60r9')] === !![])) && /^https?:\/\//i[gC(no.l, no.m)](g);
    return { 'on': h, 'url': g };
}

function isBackendExcludedPath(c, f) {
    const np = { c: 0x5c6, f: 'PYt$', g: 0x196f, h: 'XITC', i: 0x1520, j: 0x81f, k: '6UCx', l: 0x4b0, m: '2#Qk', n: 'V#kN', o: 0x50f, p: 'wCGK', q: '9rQu', r: 'NMJQ', s: 0x1802, t: '[p9(', u: 0xd5a, v: 0x118a, w: '7NO9', x: 0x394, y: '[p9(', z: 0x13e2, A: 'M5Ii', B: 0x1d28, C: '8Ys%', D: 0x1157, E: 'Mmsl' },
        gD = fX,
        g = (c || '')[gD(np.c, np.f)](),
        h = (f || '')[gD(np.g, np.h)]();
    if (g === gD(np.i, '7NO9') || g === gD(np.j, np.k) || h === gD(0xed8, np.h) || h === gD(np.l, np.m)) return !![];
    if (g === gD(0x163a, np.n) || g === gD(0x1adb, '9rQu') || g === gD(np.o, np.p) || g === gD(0x140b, np.q) || g === gD(0x14fb, np.r) || g === gD(0xc41, 'IcEg') || g === gD(np.s, 'NMJQ')) return !![];
    if (g === gD(0x1123, np.t) || g[gD(np.u, 'M5Ii')](gD(np.v, 'oeP*')) || g === gD(0x1084, np.w) || g[gD(0x190d, 'NMJQ')](gD(np.x, np.y)) || g === gD(np.z, np.A) || g[gD(np.B, 'w(Wr')](gD(0x1de0, 'd%lH'))) return !![];
    if (g === gD(0xc5a, np.C) || g[gD(np.D, np.E)](gD(0x1edf, 'egod'))) return !![];
    return ![];
}

function backendTargetUrl(c, f) {
    const nq = { c: 0x119a, f: 0xfad, g: 'T3Fv', h: 'egod', i: '$p[^', j: 0x1c9e, k: '$p[^' },
        gE = fX;
    let g;
    try { g = new URL(c); } catch (i) { return null; }
    const h = f && f[gE(nq.c, 'M5Ii')] ? f[gE(nq.f, nq.g)] : '';
    if (h && h !== '/') g[gE(0x260, nq.h)] = h;
    return g[gE(0x1b2b, nq.i)] = f && f[gE(0x3ca, 'GzjL')] || '', g[gE(nq.j, nq.k)]();
                        }

