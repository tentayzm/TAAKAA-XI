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
            } 
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
async function forwardWsToBackend(c, f, g, h, i, j) {
    const nv = { c: 0x1ad8, f: 0x1c70, g: 0x52a, h: 'b)3q', i: 0x162c, j: 'jODS', k: 'n7E3', l: '8Ys%', m: 0x17a5, n: 'oeP*', o: 'mRB^', p: 0x311, q: 0x5bc, r: 0x117b, s: '*lLT', t: 0x19cb, u: 'ZgMu', v: 0x1223, w: 'rsIZ', x: 0x74d, y: 0x691, z: '%oj0', A: 0x2ad, B: 0x16c7, C: 0x50b, D: '%oj0', E: 0x513, F: '$BSl', G: 0x373, H: 'd%lH', I: 0x817, J: '$p[^', K: 0x1be6, L: 'w(Wr', M: 0x1e9, N: 0x19fe, O: 0x7d0, P: 'b)3q', Q: 'vel(', R: '89Hn', S: 0xc16, T: 0x1068, U: 'mRB^', V: 0x738, W: 0x4c9, X: 'CeJW', Y: '0Ua@', Z: 'PSkb', a0: 0x1d8f, a1: 'Pt3!' },
        nu = { c: '*lLT', f: 0xe23, g: '5M6D', h: 0x1b17, i: '9rQu', j: 0x822 },
        nt = { c: 0x1d26, f: 0xad0, g: '[]Y1', h: 0x172a },
        ns = { c: 0x133, f: 'mRB^', g: 0x149d, h: '*lLT', i: 0xe9b, j: 'NxG1', k: 0x1b89, l: 'dZbH', m: 0x15ec },
        nr = { c: '$BSl' },
        gF = fX,
        k = backendTargetUrl(i, f);
    if (!k) return new Response(gF(nv.c, '9rQu'), { 'status': 0x1f4 });
    const l = new WebSocketPair(),
        m = l[0x0],
        n = l[0x1];
    try { n[gF(nv.f, 'dbGg')](); } catch (w) {}
    const o = new Headers(c[gF(nv.g, 'n7E3')]);
    o[gF(0x1886, nv.h)](gF(nv.i, nv.j)), o[gF(0x173d, nv.k)](gF(0xf3e, nv.l)), o[gF(nv.m, nv.n)](gF(0xe71, nv.o), gF(nv.p, '%oj0')), o[gF(0x106d, 'CeJW')](gF(nv.q, 'dbGg'), gF(0x1116, 'b)3q'));
    let p;
    try { p = await fetch(k, { 'method': gF(nv.r, nv.s), 'headers': o, 'redirect': gF(nv.t, nv.u) }); } catch (x) {
        try { n[gF(nv.v, nv.w)](0x3f3, gF(nv.x, nv.h)); } catch (y) {}
        try { m[gF(0x1149, '9rQu')](0x3f3, gF(nv.y, nv.z)); } catch (z) {}
        return new Response(gF(nv.A, 'Mmsl') + (x && x[gF(nv.B, '0Ua@')] || x), { 'status': 0x1f6 });
    }
    if (p[gF(nv.C, nv.D)] !== 0x65 || !p[gF(nv.E, 'wCGK')]) {
        try { await p[gF(0x705, nv.F)]?.[gF(nv.G, nv.H)](); } catch (A) {}
        try { n[gF(0xda1, '8Ys%')](0x3f3, gF(nv.I, nv.J)); } catch (B) {}
        try { m[gF(nv.K, nv.L)](0x3f3, gF(nv.M, nv.u)); } catch (C) {}
        return new Response(gF(0xd30, '6UCx') + p[gF(nv.N, '*lLT')] + ')', { 'status': 0x1f6 });
    }
    const q = p[gF(nv.O, nv.P)];
    try { q[gF(0xde9, nv.Q)](); } catch (D) {}
    let r = ![];
    const s = { 'up': 0x0, 'down': 0x0 },
        t = E => {
            const gG = gF;
            try {
                return E && E[gG(0x3aa, 'n7E3')] != null ? E[gG(0xebf, 'NxG1')] : E && E[gG(0xac2, '9rQu')] != null ? E[gG(0xe27, '5M6D')] : E && E[gG(0x1ac7, nr.c)] || 0x0;
            } catch (F) { return 0x0; }
        },
        u = (E, F) => {
            const gH = gF;
            if (r) return;
            r = !![];
            try { n[gH(ns.c, ns.f)](E || 0x3e8, F || gH(ns.g, ns.h)); } catch (G) {}
            try { q[gH(ns.i, ns.j)](E || 0x3e8, F || gH(ns.k, ns.l)); } catch (H) {}
            try { recordUsage(g, s['up'], s[gH(0xf0d, 'C2T0')], h); } catch (I) {}
            if (j)
                try { recordUserUsage(g, j, s['up'], s[gH(ns.m, 'PYt$')], h); } catch (J) {}
        },
        v = (E, F, G) => {
            const gI = gF;
            if (r) return;
            if (F instanceof Blob) {
                F[gI(0x145f, '7NO9')]()[gI(0x88b, nu.c)](H => {
                    const gJ = gI;
                    if (r) return;
                    try {
                        E[gJ(nt.c, 'vel(')](H);
                        if (G) s['up'] += t(H);
                        else s[gJ(nt.f, nt.g)] += t(H);
                    } catch (I) { u(0x3f3, gJ(nt.h, 'zs!c')); }
                })[gI(nu.f, nu.g)](() => u(0x3f3, gI(0x137f, 'vel(')));
                return;
            }
            if (E[gI(nu.h, 'Mmsl')] !== 0x1) return;
            try {
                E[gI(0x15a0, '8Ys%')](F);
                if (G) s['up'] += t(F);
                else s[gI(0x3d2, nu.i)] += t(F);
            } catch (H) { u(0x3f3, gI(nu.j, 'ZgMu')); }
        };
    return n[gF(0xab3, nv.R)](gF(nv.S, '8Ys%'), E => v(q, E[gF(0x1ca5, '$p[^')], !![])), q[gF(0x10d3, '1qbp')](gF(nv.T, nv.U), E => v(n, E[gF(0x8be, 'jODS')], ![])), n[gF(nv.V, '7NO9')](gF(nv.W, nv.X), E => u(E[gF(0x1ec4, 'Pt3!')], E[gF(0xf56, '6UCx')] || gF(0x1771, '#sM9'))), q[gF(0x1ec3, nv.Y)](gF(0xc43, '*lLT'), E => u(E[gF(0x1ab4, 'M5Ii')], E[gF(0xf56, '6UCx')] || gF(0x56d, '89Hn'))), n[gF(0xc9a, nv.Z)](gF(0xcd6, 'NxG1'), () => u(0x3f3, gF(0x1182, 'T3Fv'))), q[gF(nv.a0, 'vel(')](gF(0x783, nv.a1), () => u(0x3f3, gF(0x10fa, 'w(Wr'))), new Response(null, { 'status': 0x65, 'webSocket': m });
}

async function forwardHttpToBackend(c, f, g, h) {
    const nw = { c: 0x1683, f: '$BSl', g: 0x1e53, h: '8Ys%', i: 0x2de, j: '5M6D', k: 'dbGg', l: 0x3c7, m: 0x146d, n: 'Mmsl', o: 0x151a, p: 'w3Tt' },
        gK = fX,
        i = backendTargetUrl(h, f);
    if (!i) return new Response(gK(nw.c, nw.f), { 'status': 0x1f4 });
    const j = new Headers();
    for (const [l, m] of c[gK(nw.g, 'wCGK')]) {
        const n = l[gK(0x1d1, nw.h)]();
        if (n === gK(0x68b, 'CeJW') || n[gK(nw.i, 'dZbH')](gK(0x1632, nw.j)) || n === gK(0x517, nw.k)) continue;
        j[gK(0x169, 'rsIZ')](l, m);
    }
    try { return await fetch(i, { 'method': c[gK(nw.l, '*lLT')], 'headers': j, 'body': c[gK(0x78b, '8Ys%')], 'redirect': gK(nw.m, nw.n) }); } catch (o) { return new Response(gK(nw.o, nw.p) + (o && o[gK(0x1068, 'mRB^')] || o), { 'status': 0x1f6 }); }
}

async function handleWsRequest(c, f, g, h, i) {
    const o3 = { c: 0xad2, f: '*lLT', g: 0x14af, h: 0x1811, i: 0x18b1, j: 0x485, k: 0xdee, l: '0Ua@', m: 'Pt3!', n: '9rQu', o: 0xa94, p: 'GzjL', q: 0x1d64, r: 'dbGg', s: 0x4e1, t: 'Mmsl', u: 0x12c0, v: '89Hn', w: '5M6D', x: 0x5d6, y: 0x1eb5, z: '%oj0' },
        o0 = { c: 0x5b1, f: 0xf2a },
        nX = { c: 0x1109 },
        nW = { c: 0x26e, f: 'NxG1', g: 0xc3c },
        nU = { c: 0x1bbd, f: 'wCGK', g: 0x1d1c, h: '0Ua@' },
        nT = { c: 0x497, f: '89Hn', g: 0x5b9, h: 'NxG1', i: '2#Qk', j: 0x7f6, k: 'XITC', l: 0x14e9, m: 0x8dc, n: '#sM9', o: 0x17c7, p: 'rsIZ' },
        nS = { c: 'd%lH', f: 'IcEg', g: '9rQu', h: 0x14c6, i: 'mRB^', j: 0x1505, k: 'dZbH', l: 'dn8p', m: 'PSkb', n: 0x515, o: 0xb62, p: 0x18a3, q: '#sM9', r: 0x18d6, s: 0x129c, t: 'egod', u: 0x12f0, v: '%oj0', w: 0xdbd, x: 'w3Tt', y: 0x9e3, z: 0x16a8, A: 'd%lH', B: 'V#kN' },
        nR = { c: 0x1763, f: 'b)3q', g: 0x3c1, h: 'vel(', i: 0x16e9, j: '*lLT', k: 0x1bba, l: 'w(Wr', m: 'Mmsl', n: 'zs!c', o: 0x170e, p: 'ZgMu', q: '5M6D', r: 0xef5, s: 'Mmsl', t: 0xe63, u: '$BSl', v: 0x1eaa, w: 0x6e6, x: 'd%lH', y: 0xe0c, z: '[p9(', A: '[p9(', B: 0x1775, C: 'egod', D: 'NxG1', E: 0x9d7, F: 'mRB^', G: 0x1599, H: 'n7E3', I: 0xc37, J: 'w3Tt', K: 0x770, L: 0x1103, M: 0x826, N: 'Mmsl', O: 0xd24, P: 0x122d, Q: 0x23b, R: 'wCGK', S: 'Gn7Q', T: 0x84a, U: '8Ys%', V: 'zs!c', W: 'NMJQ' },
        nQ = { c: 'IcEg' },
        nO = { c: 0x569, f: 0x1e94, g: '*lLT', h: 0xd78, i: 'T3Fv', j: 0x13dc },
        nB = { c: '9rQu' },
        nA = { c: '*lLT' },
        nz = { c: 0x1359, f: '$BSl', g: '8Ys%', h: 0x53d },
        ny = { c: 0xa29, f: '5M6D', g: 0x206, h: 'M5Ii' },
        gL = fX;
    if (connRejectReason) return new Response(gL(o3.c, o3.f) + connRejectReason + ')', { 'status': 0x193 });
    const j = connUserId,
        k = new WebSocketPair(),
        [l, m] = Object[gL(o3.g, 'XITC')](k);
    try { m[gL(o3.h, '89Hn')]({ 'allowHalfOpen': !![] }); } catch (R) { m[gL(o3.i, 'PYt$')](); }
    m[gL(o3.j, 'Gn7Q')] = gL(0x53c, '89Hn');
    let n = { 'socket': null, 'connectingPromise': null, 'retryConnect': null };
    const o = { 'up': 0x0, 'down': 0x0 };
    let p = ![],
        q = null;
    const r = { 'cache': new Uint8Array(0x0) },
        s = c[gL(0x7f4, 'egod')][gL(o3.k, o3.l)](gL(0x15a8, 'rsIZ')) || '',
        t = !!g[gL(0x19bd, o3.m)][gL(0x8ed, o3.n)](gL(0x1c2e, 'w3Tt'));
    let u = null,
        v = Promise[gL(o3.o, o3.p)](),
        w = ![],
        x = ![],
        y = ![],
        z = 0x0,
        A = 0x0,
        B = null,
        C = null,
        D = null,
        E = null,
        F = null;
    const G = () => {
            const gM = gL;
            if (D) { try { D[gM(0x1ae2, 'T3Fv')](); } catch (S) {} D = null; }
            C = null;
        },
        H = u = createUpstreamWriteQueue({ 'getWriter': () => {
                const gN = gL,
                    S = n[gN(ny.c, ny.f)];
                if (!S) return null;
                return S !== C && (G(), C = S, D = S[gN(ny.g, ny.h)][gN(0x470, 'V#kN')]()), D;
            }, 'releaseWriter': G, 'retryConnection': async() => {
                const gO = gL;
                if (typeof n[gO(nz.c, nz.f)] !== gO(0x9a8, nz.g)) throw new Error(gO(nz.h, 'rsIZ'));
                await n[gO(0x17b, '1qbp')]();
            }, 'closeConnection': () => {
                const gP = gL;
                try { n[gP(0x11f4, nA.c)]?.[gP(0x103b, 'ZgMu')](); } catch (S) {}
                closeSocketQuietly(m);
            }, 'name': gL(o3.q, o3.r) }),
        I = async(S, T = !![]) => { const gQ = gL; return H[gQ(0xac7, nB.c)](S, T); },
        J = async() => {
            const nL = { c: '60r9' },
                nG = { c: 'b)3q', f: 0x15dd, g: 0x1ec7 },
                nD = { c: 0xd2a, f: 'rsIZ', g: '#sM9', h: 0x4e5, i: 0xd2a, j: '5M6D', k: 0x1f3, l: 'PSkb', m: 0xded, n: '60r9', o: 0x1c79, p: 0x10c8, q: 'dZbH', r: 0x93d, s: '7NO9', t: 0xe3b, u: 0xcda, v: 0x438, w: 0x1c48, x: 0xb03, y: 0x13eb, z: 0x9a5, A: 'wCGK', B: 'NxG1', C: 0x1c9a, D: 0x820, E: 'w(Wr', F: 0x1213, G: 'jODS', H: 0x4bb, I: 0x1b75, J: 'NxG1', K: 0xfed, L: 'GzjL', M: '[]Y1', N: 0x147c, O: '60r9', P: 'Pt3!', Q: 0x457, R: 'w(Wr', S: '0Ua@', T: 0xc98, U: 'dn8p' },
                nC = { c: 0x1701, f: 'NMJQ', g: 0xbe2, h: 0x1467, i: 0x11f5, j: 0xf92, k: 0x863 },
                h3 = gL;
            if (E) return E;
            return !F && (F = (async() => {
                const nM = { c: 0x1c91, f: 0x186f, g: 0x7ba, h: 0xebf, i: 'NxG1', j: 0x1611, k: 0x1af9, l: 'wCGK', m: '7NO9' },
                    nK = { c: 0x70e, f: 0x11ab },
                    nE = { c: 0x3aa, f: '8Ys%', g: 0x93d, h: 0x1caf, i: 'egod', j: 0x12d, k: 'dn8p', l: 0xd4c, m: 0xaaf, n: 'CeJW', o: 0x12ae, p: '89Hn', q: 0x1adc, r: '#sM9', s: 0x1d5e, t: 0xf05, u: 'XITC', v: 0x11c4, w: 'w(Wr', x: 0x567, y: 'dZbH', z: '%oj0', A: 0x17f9, B: 0x3e5, C: 0x150a, D: 'wCGK' },
                    gR = b,
                    S = (g[gR(0x976, '6UCx')][gR(nO.c, 'wCGK')](gR(nO.f, nO.g)) || '')[gR(0xa2d, '9rQu')](),
                    T = SSsupportEncryptionConfig[S] || SSsupportEncryptionConfig[gR(nO.h, nO.i)],
                    U = [T, ...Object[gR(nO.j, 'C2T0')](SSsupportEncryptionConfig)[gR(0x1af4, '$BSl')](a6 => a6[gR(0x1a71, 'XITC')] !== T[gR(0x6ee, '$BSl')])],
                    V = new Map(),
                    W = a6 => {
                        const gS = gR;
                        if (!V[gS(nC.c, nC.f)](a6[gS(nC.g, 'mRB^')])) V[gS(nC.h, 'PSkb')](a6[gS(0x1cc9, 'T3Fv')], SSderiveMasterKey(f, a6[gS(nC.i, '89Hn')]));
                        return V[gS(nC.j, '8Ys%')](a6[gS(nC.k, '60r9')]);
                    },
                    X = { 'buffer': new Uint8Array(0x0), 'hasSalt': ![], 'waitPayloadLength': null, 'decryptKey': null, 'nonceCounter': new Uint8Array(SSNoncelength), 'encryptionConfig': null },
                    Y = async() => {
                        const gT = gR,
                            a6 = 0x2 + SSAEADtagLength,
                            a7 = Math[gT(nD.c, nD.f)](...U[gT(0x1517, nD.g)](ab => ab[gT(0x1809, 'IcEg')])),
                            a8 = 0x10,
                            a9 = Math[gT(nD.h, 'yxI7')](a8, Math[gT(nD.i, nD.f)](0x0, X[gT(0x1113, nD.j)][gT(nD.k, nD.l)] - (a6 + Math[gT(nD.m, nD.n)](...U[gT(nD.o, 'ZgMu')](ab => ab[gT(0x49e, 'T3Fv')])))));
                        for (let ab = 0x0; ab <= a9; ab++) {
                            for (const ac of U) {
                                const ad = ab + ac[gT(0xc05, 'jODS')] + a6;
                                if (X[gT(0x17d5, '[]Y1')][gT(nD.p, nD.q)] < ad) continue;
                                const ae = X[gT(nD.r, nD.s)][gT(0x1142, '0Ua@')](ab, ab + ac[gT(nD.t, 'dbGg')]),
                                    af = X[gT(0x1a96, 'C2T0')][gT(nD.u, 'Gn7Q')](ab + ac[gT(nD.v, 'NxG1')], ad),
                                    ag = await W(ac),
                                    ah = await SSderiveSessionKey(ac, ag, ae, [gT(nD.w, 'C2T0')]),
                                    ai = new Uint8Array(SSNoncelength);
                                try {
                                    const aj = await SSAEADdecrypt(ah, ai, af);
                                    if (aj[gT(0x712, '$BSl')] !== 0x2) continue;
                                    const ak = aj[0x0] << 0x8 | aj[0x1];
                                    if (ak < 0x0 || ak > ac[gT(nD.x, 'b)3q')]) continue;
                                    if (ab > 0x0) log(gT(nD.y, 'egod') + ab + gT(nD.z, nD.A));
                                    if (ac[gT(0x14b9, nD.B)] !== T[gT(nD.C, 'b)3q')]) log(gT(nD.D, nD.E) + (S || T[gT(0x14b9, 'NxG1')]) + gT(nD.F, '7NO9') + ac[gT(0xa4b, 'IcEg')] + gT(0x1205, nD.G));
                                    return X[gT(0x1a96, 'C2T0')] = X[gT(nD.H, 'XITC')][gT(0xb09, 'ZgMu')](ad), X[gT(0x78c, '7NO9')] = ah, X[gT(nD.I, nD.J)] = ai, X[gT(nD.K, nD.L)] = ak, X[gT(0x1ac, nD.M)] = ac, X[gT(0xd50, nD.g)] = !![], !![];
                                } catch (al) {}
                            }
                        }
                        const aa = a7 + a6 + a8;
                        if (X[gT(nD.N, nD.O)][gT(nD.p, nD.q)] >= aa) throw new Error(gT(0x177d, 'b)3q') + (S || gT(0x1ba1, 'Mmsl')) + gT(nD.Q, nD.R) + U[gT(0x271, nD.S)](am => am[gT(0x1a71, 'XITC')])[gT(nD.T, nD.U)]('/') + ')');
                        return ![];
                    },
                    Z = { async 'input'(a6) {
                            const gU = gR,
                                a7 = dataToUint8Array(a6);
                            if (a7[gU(nE.c, 'n7E3')] > 0x0) X[gU(0xeb1, nE.f)] = concatByteData(X[gU(nE.g, '7NO9')], a7);
                            if (!X[gU(nE.h, 'egod')]) { const a9 = await Y(); if (!a9) return []; }
                            const a8 = [];
                            while (!![]) {
                                if (X[gU(0x1410, '6UCx')] === null) {
                                    const ad = 0x2 + SSAEADtagLength;
                                    if (X[gU(0x1a96, 'C2T0')][gU(0x19d2, 'V#kN')] < ad) break;
                                    const ae = X[gU(0x1650, nE.i)][gU(nE.j, nE.k)](0x0, ad);
                                    X[gU(0x12d6, '6UCx')] = X[gU(0x1d4e, 'Pt3!')][gU(nE.l, 'C2T0')](ad);
                                    const af = await SSAEADdecrypt(X[gU(nE.m, nE.k)], X[gU(0x63f, 'Gn7Q')], ae);
                                    if (af[gU(0x1786, 'Gn7Q')] !== 0x2) throw new Error(gU(0x7d3, 'vel('));
                                    const ag = af[0x0] << 0x8 | af[0x1];
                                    if (ag < 0x0 || ag > X[gU(0xba3, 'ZgMu')][gU(0x3f1, 'PSkb')]) throw new Error(gU(0x1671, 'Gn7Q') + ag);
                                    X[gU(0x1cb5, nE.n)] = ag;
                                }
                                const aa = X[gU(nE.o, nE.p)] + SSAEADtagLength;
                                if (X[gU(nE.q, nE.r)][gU(nE.s, '#sM9')] < aa) break;
                                const ab = X[gU(nE.t, '$BSl')][gU(0xc14, nE.u)](0x0, aa);
                                X[gU(nE.v, nE.w)] = X[gU(0x750, 'NxG1')][gU(nE.x, nE.y)](aa);
                                const ac = await SSAEADdecrypt(X[gU(0xf1, nE.z)], X[gU(nE.A, 'zs!c')], ab);
                                a8[gU(nE.B, 'mRB^')](ac), X[gU(nE.C, nE.D)] = null;
                            }
                            return a8;
                        } };
                let a0 = null;
                const a1 = 0x20 * 0x400,
                    a2 = async() => {
                        const nF = { c: 0x5d6, f: 'w3Tt', g: 0x1a42, h: 'NMJQ', i: 0x730, j: 'vel(', k: 0x10c8, l: 'dZbH', m: 0x9d7, n: 'mRB^', o: 0x7a9, p: 'w3Tt', q: 0x4e2, r: 'egod', s: 0x291, t: 0x1dac, u: 0x1f3 },
                            gV = gR;
                        if (a0) return a0;
                        if (!X[gV(0x92f, 'NxG1')]) throw new Error(gV(0xc91, nG.c));
                        const a6 = X[gV(0x2dc, 'zs!c')],
                            a7 = await SSderiveMasterKey(f, a6[gV(nG.f, 'b)3q')]),
                            a8 = crypto[gV(0x1710, 'Gn7Q')](new Uint8Array(a6[gV(nG.g, '%oj0')])),
                            a9 = await SSderiveSessionKey(a6, a7, a8, [gV(0xbdc, 'yxI7')]),
                            aa = new Uint8Array(SSNoncelength);
                        let ab = ![];
                        return a0 = { async 'encryptAndSend'(ac, ad) {
                                const gW = gV,
                                    ae = dataToUint8Array(ac);
                                !ab && (await ad(a8), ab = !![]);
                                if (ae[gW(nF.c, 'C2T0')] === 0x0) return;
                                let af = 0x0;
                                while (af < ae[gW(0x7a9, nF.f)]) {
                                    const ag = Math[gW(nF.g, nF.h)](af + a6[gW(nF.i, nF.j)], ae[gW(nF.k, nF.l)]),
                                        ah = ae[gW(nF.m, nF.n)](af, ag),
                                        ai = new Uint8Array(0x2);
                                    ai[0x0] = ah[gW(nF.o, nF.p)] >>> 0x8 & 0xff, ai[0x1] = ah[gW(nF.q, 'w(Wr')] & 0xff;
                                    const aj = await SSAEADencryption(a9, aa, ai),
                                        ak = await SSAEADencryption(a9, aa, ah),
                                        al = new Uint8Array(aj[gW(0x186f, 'CeJW')] + ak[gW(0x181a, nF.r)]);
                                    al[gW(nF.s, 'NxG1')](aj, 0x0), al[gW(nF.t, 'IcEg')](ak, aj[gW(nF.u, 'PSkb')]), await ad(al), af = ag;
                                }
                            }, a0;
                    }();
                let a3 = Promise[gR(0x1ca3, 'T3Fv')]();
                const a4 = a6 => {
                    const nJ = { c: '#sM9' },
                        nI = { c: 'd%lH', f: 0xe93, g: '0Ua@' },
                        nH = { c: 0x1397, f: 'dn8p', g: 'egod' },
                        gX = gR;
                    return a3 = a3[gX(nK.c, 'CeJW')](async() => {
                        const gY = gX;
                        if (m[gY(0x80b, nI.c)] !== WebSocket[gY(nI.f, nI.g)]) return;
                        const a7 = await a2();
                        await a7[gY(0x1e87, 'b)3q')](a6, async a8 => {
                            const gZ = gY;
                            a8[gZ(0x4fa, 'dbGg')] > 0x0 && m[gZ(nH.c, 'zs!c')] === WebSocket[gZ(0x13a3, nH.f)] && await WebSocketsendAndWait(m, a8[gZ(0x1650, nH.g)]);
                        });
                    })[gX(nK.f, '%oj0')](a7 => { const h0 = gX; log(h0(0x176a, '%oj0') + (a7?.[h0(0xbc1, nJ.c)] || a7)), closeSocketQuietly(m); }), a3;
                };
                return E = { 'inboundDecryptor': Z, 'replyChunkSocket': a5, 'firstPacketEstablished': ![], 'targetHost': '', 'targetPort': 0x0 }, E;
            })()[h3(0x19b9, nQ.c)](() => { F = null; })), F;
        },
        K = async S => {
            const h4 = gL,
                T = await J();
            let U = null;
            try { U = await T[h4(nR.c, '1qbp')][h4(0x14d5, nR.f)](S); } catch (V) {
                const W = V?.[h4(nR.g, '1qbp')] || '' + V;
                if (W[h4(0x267, 'Pt3!')](h4(0x1acd, nR.h)) || W[h4(nR.i, '5M6D')](h4(0x11aa, '7NO9')) || W[h4(0x92e, nR.j)](h4(nR.k, nR.l))) { log(h4(0x1aa6, nR.m) + W), closeSocketQuietly(m); return; }
                throw V;
            }
            for (const X of U) {
                let Y = ![];
                try { Y = await I(X, ![]); } catch (a5) { if (a5?.[h4(0xd8c, 'dn8p')]) throw a5; Y = ![]; }
                if (Y) continue;
                if (T[h4(0x1924, nR.n)] && T[h4(nR.o, nR.p)] && T[h4(0xfd0, nR.q)] > 0x0) {
                    o['up'] += validDataLength(X), await forwardataTCP(T[h4(nR.r, '89Hn')], T[h4(0x1ef5, nR.s)], X, T[h4(nR.t, nR.u)], null, n, f, c, o);
                    continue;
                }
                const Z = dataToUint8Array(X);
                if (Z[h4(nR.v, 'Pt3!')] < 0x3) throw new Error(h4(nR.w, '#sM9'));
                const a0 = Z[0x0];
                let a1 = 0x1,
                    a2 = '';
                if (a0 === 0x1) {
                    if (Z[h4(0x1297, nR.x)] < a1 + 0x4 + 0x2) throw new Error(h4(0x1e37, 'GzjL'));
                    a2 = Z[a1] + '.' + Z[a1 + 0x1] + '.' + Z[a1 + 0x2] + '.' + Z[a1 + 0x3], a1 += 0x4;
                } else {
                    if (a0 === 0x3) {
                        if (Z[h4(nR.y, nR.z)] < a1 + 0x1) throw new Error(h4(0x94c, 'b)3q'));
                        const a6 = Z[a1];
                        a1 += 0x1;
                        if (Z[h4(nR.y, nR.A)] < a1 + a6 + 0x2) throw new Error(h4(nR.B, nR.C));
                        a2 = SStextDecode[h4(0x1b32, nR.D)](Z[h4(nR.E, nR.F)](a1, a1 + a6)), a1 += a6;
                    } else {
                        if (a0 === 0x4) {
                            if (Z[h4(nR.G, '89Hn')] < a1 + 0x10 + 0x2) throw new Error(h4(0xcbd, nR.H));
                            const a7 = [],
                                a8 = new DataView(Z[h4(nR.I, nR.J)], Z[h4(nR.K, 'GzjL')] + a1, 0x10);
                            for (let a9 = 0x0; a9 < 0x8; a9++) a7[h4(nR.L, nR.H)](a8[h4(nR.M, 'egod')](a9 * 0x2)[h4(0xa0c, nR.N)](0x10));
                            a2 = a7[h4(nR.O, 'CeJW')](':'), a1 += 0x10;
                        } else throw new Error(h4(nR.P, 'GzjL') + a0);
                    }
                }
                if (!a2) throw new Error(h4(0xc2f, 'M5Ii') + a0);
                const a3 = Z[a1] << 0x8 | Z[a1 + 0x1];
                a1 += 0x2;
                const a4 = Z[h4(nR.Q, nR.R)](a1);
                if (isBlockedSite(a2)) throw new Error(h4(0x1a43, nR.S));
                T[h4(0x1f1d, 'rsIZ')] = !![], T[h4(nR.T, nR.U)] = a2, T[h4(0xe74, nR.V)] = a3, o['up'] += validDataLength(a4), await forwardataTCP(a2, a3, a4, T[h4(0x5cb, nR.W)], null, n, f, c, o);
            }
        },
        L = async S => {
            const h5 = gL;
            let T = null;
            if (p) {
                if (q) return await forwardTrojanUdpData(S, m, r, c);
                return await forwardataudp(S, m, null, c);
            }
            if (B === 'ss') { await K(S); return; }
            if (await I(S)) { o['up'] += validDataLength(S); return; }
            if (B === null) {
                if (g[h5(0x1ef7, nS.c)][h5(0x15eb, nS.f)](h5(0x3fe, nS.g))) B = 'ss';
                else { T = T || dataToUint8Array(S); const U = T; B = isTrojanFirstPacket(U, f) ? h5(0x1c5c, 'vel(') : h5(nS.h, '$p[^'); }
                q = B === h5(0x12be, nS.i), log(h5(nS.j, nS.k) + B + h5(0x13a2, nS.l) + g[h5(0x54b, 'C2T0')] + h5(0x706, 'dZbH') + (c[h5(0xcea, nS.m)][h5(nS.n, '89Hn')](h5(nS.o, 'C2T0')) || h5(nS.p, nS.q)));
            }
            if (B === 'ss') { await K(S); return; }
            if (await I(S)) { o['up'] += validDataLength(S); return; }
            if (B === h5(nS.r, 'M5Ii')) {
                const V = parseTrojanRequest(S, f);
                if (V?.[h5(nS.s, nS.t)]) throw new Error(V[h5(0x1f1, 'n7E3')] || h5(nS.u, 'NxG1'));
                const { port: W, hostname: X, rawClientData: Y, isUDP: Z } = V;
                if (isBlockedSite(X)) throw new Error(h5(0x17d8, 'vel('));
                if (Z) { p = !![];
                    if (validDataLength(Y) > 0x0) return o['up'] += validDataLength(Y), forwardTrojanUdpData(Y, m, r, c);
                    return; }
                o['up'] += validDataLength(Y), await forwardataTCP(X, W, Y, m, null, n, f, c, o);
            } else {
                q = ![], T = T || dataToUint8Array(S);
                const a0 = T,
                    a1 = parseVlessRequest(a0, f);
                if (a1?.[h5(0x7aa, nS.v)]) throw new Error(a1[h5(nS.w, nS.x)] || h5(nS.y, 'n7E3'));
                const { port: a2, hostname: a3, version: a4, isUDP: a5, rawClientData: a6 } = a1;
                if (isBlockedSite(a3)) throw new Error(h5(nS.z, nS.A));
                if (a5) { if (a2 === 0x35) p = !![];
                    else throw new Error(h5(0x41a, nS.B)); }
                const a7 = new Uint8Array([a4, 0x0]),
                    a8 = a6;
                if (p) {
                    if (q) return o['up'] += validDataLength(a8), forwardTrojanUdpData(a8, m, r, c);
                    return o['up'] += validDataLength(a8), forwardataudp(a8, m, a7, c);
                }
                o['up'] += validDataLength(a8), await forwardataTCP(a3, a2, a8, m, a7, n, f, c, o);
            }
        },
        M = S => {
            const h6 = gL;
            if (x) return;
            x = !![], w = !![], z = 0x0, A = 0x0;
            const T = S?.[h6(nT.c, nT.f)] || '' + S;
            T[h6(0x1a7f, '2#Qk')](h6(nT.g, nT.h)) || T[h6(0x1a7f, nT.i)](h6(nT.j, nT.k)) ? log(h6(nT.l, 'n7E3') + T) : log(h6(nT.m, nT.n) + T), H[h6(nT.o, nT.p)](), G(), closeSocketQuietly(m);
        },
        N = S => { const h7 = gL; return v = v[h7(nU.c, nU.f)](S)[h7(nU.g, nU.h)](M), v; },
        O = S => {
            const nV = { c: 0x18e4, f: 'Gn7Q' },
                h8 = gL;
            if (w || x) return;
            const T = Math[h8(nW.c, nW.f)](0x0, validDataLength(S)),
                U = z + T,
                V = A + 0x1;
            if (U > upstreamQueueMaxBytes || V > upstreamQueueMaxItems) { M(new Error(h8(nW.g, '[p9(') + U + 'B/' + V)); return; }
            z = U, A = V, N(async() => {
                const h9 = h8;
                z = Math[h9(nV.c, nV.f)](0x0, z - T), A = Math[h9(0x4c3, 'dbGg')](0x0, A - 0x1);
                if (x) return;
                await L(S);
            });
        },
        P = () => {
            if (y) return;
            y = !![], w = !![], N(async() => {
                const ha = b;
                if (x) return;
                await H[ha(nX.c, '7NO9')](), G();
            });
        };
    m[gL(0xd1a, 'dn8p')](gL(o3.s, o3.t), S => { const hb = gL; O(S[hb(0x117e, '89Hn')]); });
    const Q = () => { const hc = gL; recordUsage(h, o['up'], o[hc(o0.c, 'Mmsl')], i); if (j) recordUserUsage(h, j, o['up'], o[hc(o0.f, 'IcEg')], i); };
    m[gL(0x7fd, 'C2T0')](gL(o3.u, o3.v), () => { closeSocketQuietly(m), P(), Q(); }), m[gL(0x1328, 'Gn7Q')](gL(0x1a8e, o3.w), S => { M(S), Q(); });
    if (!t && s)
        try {
            const S = decodeWsEarlyData(s, f);
            if (S?.[gL(o3.x, 'C2T0')]) O(S[gL(o3.y, o3.z)]);
        } catch (T) { M(T); }
    return new Response(null, { 'status': 0x65, 'webSocket': l, 'headers': { 'Sec-WebSocket-Extensions': '' } });
}

function isTrojanFirstPacket(c, f) {
    const o4 = { c: 0x176 },
        hd = fX;
    if (!c || c[hd(0x15f9, 'zs!c')] < 0x3a || c[0x38] !== 0xd || c[0x39] !== 0xa) return ![];
    const g = sha224(f);
    for (let h = 0x0; h < 0x38; h++) {
        if (c[h] !== g[hd(o4.c, 'Pt3!')](h)) return ![];
    }
    return !![];
}

const trojanTextDecoder = new TextDecoder();

function parseTrojanRequest(c, f) {
    const o5 = { c: 0x687, f: 0x10c9, g: 'PSkb', h: 0x7ed, i: 'wCGK', j: 0xc1f, k: '#sM9', l: '$BSl', m: 0x165, n: '89Hn', o: 0x62c, p: 'mRB^', q: 'T3Fv', r: 'egod', s: 0x2ee, t: 'NMJQ', u: 0x14fc, v: '1qbp', w: 'vel(', x: 0x1711, y: 'wCGK', z: 0x8f1, A: 0x949, B: 'dbGg', C: 0x1a7c, D: 'rsIZ', E: 'dbGg', F: 0xc14, G: 'XITC' },
        he = fX,
        g = dataToUint8Array(c),
        h = sha224(f);
    if (g[he(o5.c, '%oj0')] < 0x3a) return { 'hasError': !![], 'message': he(o5.f, o5.g) };
    let j = 0x38;
    if (g[j] !== 0xd || g[j + 0x1] !== 0xa) return { 'hasError': !![], 'message': he(0x18a7, 'ZgMu') };
    for (let t = 0x0; t < j; t++) {
        if (g[t] !== h[he(o5.h, o5.i)](t)) return { 'hasError': !![], 'message': he(o5.j, o5.k) };
    }
    const k = j + 0x2;
    if (g[he(0x712, o5.l)] < k + 0x6) return { 'hasError': !![], 'message': he(0x953, 'd%lH') };
    const l = g[k];
    if (l !== 0x1 && l !== 0x3) return { 'hasError': !![], 'message': he(o5.m, o5.n) };
    const m = l === 0x3,
        n = g[k + 0x1];
    let o = 0x0,
        p = k + 0x2,
        q = '';
    switch (n) {
        case 0x1:
            o = 0x4;
            if (g[he(0xf43, '0Ua@')] < p + o + 0x4) return { 'hasError': !![], 'message': he(0x1d89, 'M5Ii') };
            q = g[p] + '.' + g[p + 0x1] + '.' + g[p + 0x2] + '.' + g[p + 0x3];
            break;
        case 0x3:
            if (g[he(o5.o, o5.p)] < p + 0x1) return { 'hasError': !![], 'message': he(0xb50, o5.q) };
            o = g[p], p += 0x1;
            if (g[he(0x181a, o5.r)] < p + o + 0x4) return { 'hasError': !![], 'message': he(o5.s, o5.t) };
            q = trojanTextDecoder[he(o5.u, 'NMJQ')](g[he(0xb3e, o5.v)](p, p + o));
            break;
        case 0x4:
            o = 0x10;
            if (g[he(0x1d5e, '#sM9')] < p + o + 0x4) return { 'hasError': !![], 'message': he(0x1d87, o5.w) };
            const u = [];
            for (let v = 0x0; v < 0x8; v++) {
                const w = p + v * 0x2;
                u[he(o5.x, o5.y)]((g[w] << 0x8 | g[w + 0x1])[he(0x345, 'd%lH')](0x10));
            }
            q = u[he(o5.z, 'd%lH')](':');
            break;
        default:
            return { 'hasError': !![], 'message': he(o5.A, 'dZbH') + n };
    }
    if (!q) return { 'hasError': !![], 'message': he(0x10f8, o5.B) + n };
    const r = p + o;
    if (g[he(o5.C, o5.D)] < r + 0x4) return { 'hasError': !![], 'message': he(0x8e1, o5.E) };
    const s = g[r] << 0x8 | g[r + 0x1];
    return { 'hasError': ![], 'addressType': n, 'port': s, 'hostname': q, 'isUDP': m, 'rawClientData': g[he(o5.F, o5.G)](r + 0x4) };
}

const UUIDbytesCache = new Map(),
    VLESStextDecode = new TextDecoder();

function readHexNibble(c) {
    if (c >= 0x30 && c <= 0x39) return c - 0x30;
    c |= 0x20;
    if (c >= 0x61 && c <= 0x66) return c - 0x57;
    return -0x1;
}

function getUuidBytes(c) {
    const o7 = { c: 0x12b9, f: 'zs!c', g: 'PSkb', h: 0x1c85, i: '6UCx', j: '6UCx', k: 0x115c, l: 0x17fa },
        hf = fX,
        f = String(c || '');
    let g = UUIDbytesCache[hf(o7.c, o7.f)](f);
    if (g) return g;
    const h = f[hf(0x1770, o7.g)](/-/g, '');
    if (h[hf(o7.h, o7.i)] !== 0x20) return null;
    const j = new Uint8Array(0x10);
    for (let k = 0x0; k < 0x10; k++) {
        const l = readHexNibble(h[hf(0x1b35, o7.j)](k * 0x2)),
            m = readHexNibble(h[hf(0x176, 'Pt3!')](k * 0x2 + 0x1));
        if (l < 0x0 || m < 0x0) return null;
        j[k] = l << 0x4 | m;
    }
    if (UUIDbytesCache[hf(0x1137, 'oeP*')] >= 0x20) UUIDbytesCache[hf(o7.k, '89Hn')]();
    return UUIDbytesCache[hf(o7.l, 'M5Ii')](f, j), j;
}

function UUIDbyteMatch(c, f, g) {
    const hg = fX,
        h = getUuidBytes(g);
    if (!h || c[hg(0x521, '[]Y1')] < f + 0x10) return ![];
    for (let j = 0x0; j < 0x10; j++) {
        if (c[f + j] !== h[j]) return ![];
    }
    return !![];
}

function parseVlessRequest(c, f) {
    const o9 = { c: 0x19e5, f: 'Mmsl', g: '89Hn', h: 0x1e0e, i: 'Pt3!', j: 0x13a8, k: 'vel(', l: 0xdc8, m: 'V#kN', n: 0x683, o: 'V#kN', p: '2#Qk', q: 'T3Fv', r: '%oj0' },
        hh = fX,
        g = dataToUint8Array(c),
        h = g[hh(0x1599, '89Hn')];
    if (h < 0x18) return { 'hasError': !![], 'message': hh(o9.c, o9.f) };
    const j = g[0x0];
    if (!UUIDbyteMatch(g, 0x1, f)) return { 'hasError': !![], 'message': hh(0x11ce, 'V#kN') };
    const k = g[0x11],
        l = 0x12 + k;
    if (h < l + 0x4) return { 'hasError': !![], 'message': hh(0x1ee7, o9.g) };
    const m = g[l];
    let n = ![];
    if (m === 0x1) {} else { if (m === 0x2) n = !![]; else return { 'hasError': !![], 'message': hh(o9.h, o9.i) }; }
    const o = l + 0x1,
        p = g[o] << 0x8 | g[o + 0x1];
    let q = o + 0x3,
        r = 0x0,
        s = '';
    const t = g[o + 0x2];
    switch (t) {
        case 0x1:
            r = 0x4;
            if (h < q + r) return { 'hasError': !![], 'message': hh(o9.j, o9.k) };
            s = g[q] + '.' + g[q + 0x1] + '.' + g[q + 0x2] + '.' + g[q + 0x3];
            break;
        case 0x2:
            if (h < q + 0x1) return { 'hasError': !![], 'message': hh(0x8bb, '9rQu') };
            r = g[q], q += 0x1;
            if (h < q + r) return { 'hasError': !![], 'message': hh(0xf2, 'w3Tt') };
            s = VLESStextDecode[hh(0x13ca, o9.i)](g[hh(o9.l, o9.m)](q, q + r));
            break;
        case 0x3:
            r = 0x10;
            if (h < q + r) return { 'hasError': !![], 'message': hh(0x39a, 'wCGK') };
            const v = [];
            for (let w = 0x0; w < 0x8; w++) {
                const x = q + w * 0x2;
                v[hh(0xa07, 'PSkb')]((g[x] << 0x8 | g[x + 0x1])[hh(o9.n, o9.o)](0x10));
            }
            s = v[hh(0x18e7, o9.p)](':');
            break;
        default:
            return { 'hasError': !![], 'message': hh(0x1ec8, 'PYt$') + t };
    }
    if (!s) return { 'hasError': !![], 'message': hh(0xba0, o9.q) + t };
    const u = q + r;
    return { 'hasError': ![], 'addressType': t, 'port': p, 'hostname': s, 'isUDP': n, 'rawClientData': g[hh(0x351, o9.r)](u), 'version': j };
           const SSsupportEncryptionConfig = {
    'aes-128-gcm': { 'method': fX(0x1362, 'egod'), 'keyLen': 0x10, 'saltLen': 0x10, 'maxChunk': 0x3fff, 'aesLength': 0x80 },
    'aes-256-gcm': { 'method': fX(0x11e8, '0Ua@'), 'keyLen': 0x20, 'saltLen': 0x20, 'maxChunk': 0x3fff, 'aesLength': 0x100 }
},
SSAEADtagLength = 0x10,
SSNoncelength = 0xc,
SSsubkeyInfo = new TextEncoder()[fX(0x1709, '2#Qk')](fX(0xc0d, 'V#kN')),
SStextEncoder = new TextEncoder(),
SStextDecode = new TextDecoder(),
SSmasterKeyCache = new Map();

function dataToUint8Array(c) {
    const oa = { c: 'w3Tt', f: 0x119c, g: 'jODS', h: 0x15f9 },
        hi = fX;
    if (c instanceof Uint8Array) return c;
    if (c instanceof ArrayBuffer) return new Uint8Array(c);
    if (ArrayBuffer[hi(0xff1, oa.c)](c)) return new Uint8Array(c[hi(oa.f, oa.g)], c[hi(0x114, 'n7E3')], c[hi(oa.h, 'zs!c')]);
    return new Uint8Array(c || 0x0);
}

function concatByteData(...f) {
    const ob = { c: 0x111e, f: '60r9', g: 0x1582, h: 0x530, i: '[p9(', j: 0x17a5, k: 'oeP*', l: '6UCx' },
        hj = fX;
    if (!f || f[hj(ob.c, ob.f)] === 0x0) return new Uint8Array(0x0);
    const g = f[hj(ob.g, 'w3Tt')](dataToUint8Array),
        h = g[hj(ob.h, ob.i)]((k, l) => k + l[hj(0x7a9, 'w3Tt')], 0x0),
        i = new Uint8Array(h);
    let j = 0x0;
    for (const k of g) { i[hj(ob.j, ob.k)](k, j), j += k[hj(0x3ec, ob.l)]; }
    return i;
}

async function forwardTrojanUdpData(c, f, g, h) {
    const od = { c: '$p[^', f: 0x7c4, g: '9rQu', h: 0x1eaa, i: 0xf42, j: '*lLT', k: 0x116e, l: '6UCx', m: 0x10fd, n: 'XITC', o: 0xcc4, p: '0Ua@', q: 'dn8p', r: 0x1e19, s: 'zs!c', t: '9rQu', u: '*lLT', v: '89Hn', w: 0x229, x: 'XITC', y: 0x1d11 },
        oc = { c: 0x520, f: 0xe0c, g: '[p9(', h: 0xa3c, i: 'dn8p', j: 0x7ba, k: 0x9b2, l: 'T3Fv', m: 0x107a, n: 0x1a94, o: 0xebf, p: 'NxG1', q: 0x1a7c, r: 'rsIZ', s: 0x1920, t: 0xf43, u: '0Ua@', v: 0x869, w: '$p[^', x: 'jODS', y: 'Mmsl', z: 'n7E3' },
        hk = fX,
        i = dataToUint8Array(c),
        j = g?.[hk(0x145e, 'IcEg')] instanceof Uint8Array ? g[hk(0x11ad, 'w3Tt')] : new Uint8Array(0x0),
        k = j[hk(0x869, od.c)] ? concatByteData(j, i) : i;
    let l = 0x0;
    while (l < k[hk(od.f, od.g)]) {
        const m = l,
            n = k[l];
        let o = l + 0x1,
            p = 0x0;
        if (n === 0x1) p = 0x4;
        else {
            if (n === 0x4) p = 0x10;
            else {
                if (n === 0x3) {
                    if (k[hk(od.h, 'Pt3!')] < o + 0x1) break;
                    p = 0x1 + k[o];
                } else throw new Error(hk(0x551, 'C2T0') + n);
            }
        }
        const q = o + p;
        if (k[hk(od.i, od.j)] < q + 0x6) break;
        const r = k[q] << 0x8 | k[q + 0x1],
            s = k[q + 0x2] << 0x8 | k[q + 0x3];
        if (k[q + 0x4] !== 0xd || k[q + 0x5] !== 0xa) throw new Error(hk(od.k, od.l));
        const t = q + 0x6,
            u = t + s;
        if (k[hk(od.m, od.n)] < u) break;
        const v = k[hk(od.o, od.p)](m, q + 0x2),
            w = k[hk(0x1ab2, od.q)](t, u);
        l = u;
        if (r !== 0x35) throw new Error(hk(od.r, 'Pt3!'));
        if (!w[hk(0x15f9, od.s)]) continue;
        let x = w;
        (w[hk(0x1eaa, 'Pt3!')] < 0x2 || (w[0x0] << 0x8 | w[0x1]) !== w[hk(0x7c4, od.t)] - 0x2) && (x = new Uint8Array(w[hk(0xf42, od.u)] + 0x2), x[0x0] = w[hk(0x1599, od.v)] >>> 0x8 & 0xff, x[0x1] = w[hk(0x4fa, 'dbGg')] & 0xff, x[hk(od.w, 'w(Wr')](w, 0x2));
        const y = { 'cache': new Uint8Array(0x0) };
        await forwardataudp(x, f, null, h, z => {
            const hl = hk,
                A = dataToUint8Array(z),
                B = y[hl(oc.c, 'egod')][hl(oc.f, oc.g)] ? concatByteData(y[hl(oc.h, oc.i)], A) : A,
                C = [];
            let D = 0x0;
            while (D + 0x2 <= B[hl(oc.j, 'oeP*')]) {
                const E = B[D] << 0x8 | B[D + 0x1],
                    F = D + 0x2,
                    G = F + E;
                if (G > B[hl(oc.k, oc.l)]) break;
                const H = B[hl(0x159a, 'w(Wr')](F, G),
                    I = new Uint8Array(v[hl(oc.m, 'yxI7')] + 0x4 + H[hl(0xd13, 'vel(')]);
                I[hl(oc.n, '7NO9')](v, 0x0), I[v[hl(oc.o, oc.p)]] = H[hl(0x1d5e, '#sM9')] >>> 0x8 & 0xff, I[v[hl(oc.q, oc.r)] + 0x1] = H[hl(oc.s, '60r9')] & 0xff, I[v[hl(oc.t, oc.u)] + 0x2] = 0xd, I[v[hl(oc.v, oc.w)] + 0x3] = 0xa, I[hl(0x12e4, '#sM9')](H, v[hl(0xb5c, oc.x)] + 0x4), C[hl(0xfc7, 'd%lH')](I), D = G;
            }
            return y[hl(0xff2, oc.y)] = B[hl(0x7ef, 'NMJQ')](D), C[hl(0x131a, oc.z)] ? C : new Uint8Array(0x0);
        });
    }
    if (g) g[hk(0x1343, od.x)] = k[hk(od.y, '60r9')](l);
}

function SSincrementNonceCounter(c) {
    const hm = fX;
    for (let f = 0x0; f < c[hm(0x1814, 'NxG1')]; f++) {
        c[f] = c[f] + 0x1 & 0xff;
        if (c[f] !== 0x0) return;
    }
}

async function SSderiveMasterKey(c, f) {
    const og = { c: 0xfaf, f: 0xdee, g: '0Ua@', h: 0xc7e },
        of = { c: '8Ys%', f: 'b)3q', g: 0x1920, h: '60r9', i: 0x1ee8, j: '%oj0', k: '0Ua@', l: 0x1ed3, m: '60r9' },
        hn = fX,
        g = f + ':' + c;
    if (SSmasterKeyCache[hn(og.c, 'dn8p')](g)) return SSmasterKeyCache[hn(og.f, og.g)](g);
    const h = ((async() => {
        const ho = hn,
            i = SStextEncoder[ho(0x1906, of.c)](c || '');
        let j = new Uint8Array(0x0),
            k = new Uint8Array(0x0);
        while (k[ho(0xb8f, of.f)] < f) {
            const l = new Uint8Array(j[ho(of.g, of.h)] + i[ho(of.i, '7NO9')]);
            l[ho(0xf9d, 'egod')](j, 0x0), l[ho(0x125d, '9rQu')](i, j[ho(0x687, of.j)]), j = new Uint8Array(await crypto[ho(0x10d1, of.k)][ho(of.l, of.m)](ho(0x15f3, 'V#kN'), l)), k = concatByteData(k, j);
        }
        return k[ho(0x55f, '1qbp')](0x0, f);
    })());
    SSmasterKeyCache[hn(0x1216, '2#Qk')](g, h);
    try { return await h; } catch (i) { SSmasterKeyCache[hn(og.h, '[]Y1')](g); throw i; }
}

async function SSderiveSessionKey(c, f, g, h) {
    const oh = { c: '0Ua@', f: '*lLT', g: 0xdc4, h: 'dZbH', i: 0x60c, j: 'w3Tt', k: 'V#kN', l: 'M5Ii', m: 'w(Wr', n: 0x1586, o: 'dbGg', p: '$BSl', q: 0xded, r: '60r9', s: 0xea8, t: '$p[^', u: 0x1e55, v: 0x1e52, w: 0x91f, x: 'GzjL', y: 0x103e },
        hp = fX,
        i = { 'name': hp(0x1c9f, 'jODS'), 'hash': hp(0x150e, oh.c) },
        j = await crypto[hp(0x647, oh.f)][hp(0x1c62, 'IcEg')](hp(0xcf8, 'PSkb'), g, i, ![], [hp(oh.g, oh.h)]),
        k = new Uint8Array(await crypto[hp(0x1a06, '7NO9')][hp(0x1871, 'w(Wr')](hp(oh.i, '$BSl'), j, f)),
        l = await crypto[hp(0x10dd, oh.j)][hp(0xff6, oh.k)](hp(0xb78, oh.l), k, i, ![], [hp(0x1871, oh.m)]),
        m = new Uint8Array(c[hp(oh.n, 'PSkb')]);
    let n = new Uint8Array(0x0),
        o = 0x0,
        p = 0x1;
    while (o < c[hp(0x152c, 'egod')]) {
        const q = concatByteData(n, SSsubkeyInfo, new Uint8Array([p]));
        n = new Uint8Array(await crypto[hp(0x1947, 'NxG1')][hp(0x684, oh.o)](hp(0x60c, oh.p), l, q));
        const r = Math[hp(oh.q, oh.r)](n[hp(oh.s, 'ZgMu')], c[hp(0x1e63, oh.t)] - o);
        m[hp(oh.u, 'V#kN')](n[hp(oh.v, 'b)3q')](0x0, r), o), o += r, p += 0x1;
    }
    return crypto[hp(oh.w, 'PYt$')][hp(0x1519, oh.x)](hp(0xf2d, '*lLT'), m, { 'name': hp(oh.y, 'V#kN'), 'length': c[hp(0x33d, 'jODS')] }, ![], h);
}

async function SSAEADencryption(c, f, g) {
    const oi = { c: 0x1c1b, f: 0x171c, g: 'CeJW' },
        hq = fX,
        h = f[hq(0x249, '8Ys%')](),
        i = await crypto[hq(oi.c, 'vel(')][hq(0x1aac, 'zs!c')]({ 'name': hq(oi.f, oi.g), 'iv': h, 'tagLength': 0x80 }, c, g);
    return SSincrementNonceCounter(f), new Uint8Array(i);
}

async function SSAEADdecrypt(c, f, g) {
    const oj = { c: 0x249, f: '8Ys%', g: 'w3Tt' },
        hr = fX,
        h = f[hr(oj.c, oj.f)](),
        i = await crypto[hr(0x287, 'n7E3')][hr(0xed9, oj.g)]({ 'name': hr(0x148b, 'vel('), 'iv': h, 'tagLength': 0x80 }, c, g);
    return SSincrementNonceCounter(f), new Uint8Array(i);
                }
    function isIPv4Addr(c) {
    const ok = { c: 0xf3d, f: '8Ys%' },
        hs = fX;
    return /^(\d{1,3}\.){3}\d{1,3}$/[hs(ok.c, ok.f)](c);
}

async function resolveAviaDoH(c) {
    const ol = { c: 0x166e, f: '8Ys%', g: 'GzjL', h: 0x1e58, i: 0x978, j: 0xa03, k: 'IcEg', l: 0x1898, m: '6UCx', n: 0xa95, o: '89Hn', p: '7NO9', q: 'Mmsl', r: 0xc3f },
        ht = fX;
    try {
        const f = await fetch(ht(ol.c, ol.f) + encodeURIComponent(c) + ht(0x13ce, ol.g), { 'headers': { 'accept': ht(ol.h, 'V#kN') } }),
            g = await f[ht(ol.i, 'NMJQ')](),
            h = (g[ht(ol.j, ol.k)] || [])[ht(ol.l, ol.m)](i => i[ht(0x13f6, '5M6D')] === 0x1)[ht(ol.n, '$p[^')](i => i[ht(0x193e, 'd%lH')]);
        return h[ht(0x925, ol.o)] ? h[Math[ht(0x14e4, ol.p)](Math[ht(0x1bce, ol.q)]() * h[ht(ol.r, 'Gn7Q')])] : null;
    } catch (i) { return null; }
}

function makeNat64Address(c, f) {
    const om = { c: 0x10dc, f: 'Pt3!', g: 0x116c, h: 'CeJW', i: 0x1ae1, j: 'PSkb', k: 0xc3f, l: 'Gn7Q', m: 0x868, n: '2#Qk', o: 0x21c, p: 'w3Tt', q: 'rsIZ' },
        hu = fX,
        g = String(c)[hu(0x10d5, '[]Y1')]()[hu(0x18e6, 'w(Wr')](/[\[\]]/g, '')[hu(om.c, om.f)](/:+$/, ''),
        h = f[hu(om.g, om.h)]('.')[hu(om.i, om.j)](j => parseInt(j, 0xa));
    if (h[hu(om.k, om.l)] !== 0x4 || h[hu(om.m, om.n)](j => isNaN(j) || j < 0x0 || j > 0xff)) return null;
    const i = ((h[0x0] << 0x8 | h[0x1]) >>> 0x0)[hu(om.o, 'mRB^')](0x10)[hu(0x1d0a, om.p)](0x4, '0') + ':' + ((h[0x2] << 0x8 | h[0x3]) >>> 0x0)[hu(0x19f5, om.p)](0x10)[hu(0xfe, om.q)](0x4, '0');
    return '[' + g + '::' + i + ']';
}

async function getNat64Prefixes() {
    const on = { c: 'jODS', f: 0x33f, g: 'dZbH', h: 0xbd5, i: '*lLT', j: '0Ua@', k: 0xe5b, l: 0x1b78, m: 'n7E3', n: 0x194d, o: 'T3Fv', p: 0x15e1, q: 0x1a86 },
        hv = fX,
        c = (nat64Config || '')[hv(0x9ff, 'n7E3')]();
    if (!c) return [];
    if (/^https?:\/\//i[hv(0x143c, on.c)](c)) {
        if (cachedNat64Prefixes && cachedNat64Src === c && Date[hv(on.f, 'XITC')]() - cachedNat64At < 0x36ee80) return cachedNat64Prefixes;
        try {
            const f = await fetch(c, { 'headers': { 'User-Agent': hv(0x12e3, 'yxI7') } }),
                g = await f[hv(0x1d36, on.g)]();
            let h = (g[hv(0x19a, 'dbGg')](/\[([0-9a-fA-F:]+::)\]/g) || [])[hv(on.h, on.i)](i => i[hv(0xa39, '7NO9')](/[\[\]]/g, ''));
            if (!h[hv(0x1189, on.j)]) h = g[hv(0xbcd, '5M6D')](/[\n,]+/)[hv(on.k, 'vel(')](i => i[hv(0x10dc, 'Pt3!')](/[\[\]]/g, '')[hv(0x1aa0, '6UCx')]())[hv(on.l, on.m)](i => i[hv(0x483, 'mRB^')]('::'));
            return cachedNat64Prefixes = [...new Set(h)], cachedNat64At = Date[hv(on.n, '[]Y1')](), cachedNat64Src = c, cachedNat64Prefixes;
        } catch (i) { return cachedNat64Prefixes || []; }
    }
    return [...new Set(c[hv(0x5f7, on.o)](/[\n,]+/)[hv(on.p, 'egod')](j => j[hv(0x5f3, 'b)3q')](/[\[\]]/g, '')[hv(0x6dc, 'PYt$')]())[hv(on.q, '5M6D')](Boolean))];
}

async function forwardataTCP(c, f, g, h, i, j, k, l = null, m = null) {
    const oA = { c: 0x744, f: 'T3Fv', g: 0x5dc, h: 'Mmsl', i: 0x1122, j: 'Pt3!', k: 'C2T0', l: 'ZgMu', m: 'd%lH', n: 0x975, o: 'Gn7Q', p: 'GzjL', q: 0x1ae4, r: 'PSkb', s: 'dn8p', t: 0xdd4 },
        oz = { c: 0x18e8, f: 'M5Ii' },
        oy = { c: '1qbp', f: 'NMJQ', g: 0x9da, h: 0x187c },
        ox = { c: '%oj0', f: 0xa27, g: 'mRB^', h: '[p9(', i: 0x1187, j: 0x237, k: 'ZgMu', l: 0xa42, m: 0x1475, n: 0x1afc, o: 'Gn7Q', p: 0xdfc, q: '5M6D', r: 'w3Tt', s: 0x1ae2, t: 'T3Fv', u: 0xbcc, v: '[p9(', w: 0x16de, x: 0x6d5, y: 'w3Tt', z: 0x12ce, A: 'PYt$', B: 0x13a0, C: 'dZbH', D: 0x1347, E: 'ZgMu' },
        ov = { c: 0x1106, f: '9rQu', g: 'mRB^', h: 0x1814, i: 'NxG1', j: 0x1214, k: 0x1026, l: 0x9f2, m: 0x1dc, n: 0xbce, o: 'V#kN', p: 0x16ec, q: '1qbp', r: 'd%lH', s: 0x18a5, t: 'b)3q', u: 0x1b31, v: '89Hn', w: 0x1d46, x: 'egod', y: 0x19ed, z: 0x11da, A: '[]Y1', B: 0x2bb, C: '*lLT' },
        ou = { c: 0x7c1, f: 0x5f9, g: 0xffa, h: '6UCx', i: 'CeJW', j: '6UCx' },
        os = { c: 'zs!c', f: 'Mmsl' },
        or = { c: 0x6e3, f: 'CeJW', g: 'T3Fv', h: '*lLT' },
        oq = { c: '2#Qk', f: 'b)3q' },
        op = { c: 'egod' },
        oo = { c: 0x15ad, f: 'mRB^' },
        hw = fX;
    log(hw(oA.c, oA.f) + c + ':' + f + hw(oA.g, oA.h) + proxyIP + hw(oA.i, 'GzjL') + (enableProxyFallback ? 'is' : '') + hw(0xe6e, oA.j) + (enableSocks5Proxy || hw(0x4ba, oA.k)) + hw(0xe01, oA.l) + (enableSocks5GlobalProxy ? 'is' : ''));
    const n = 0x1388;
    let o = ![];
    const p = createRequestTcpConnector(l);

    async function q(x, y = n) {
        const hx = hw;
        await Promise[hx(0xad9, 'wCGK')]([x[hx(oo.c, oo.f)], new Promise((z, A) => setTimeout(() => A(new Error(hx(0x1ae5, 'b)3q'))), y))]);
    }

    async function r(x, y) {
        const hy = hw,
            z = p({ 'hostname': x, 'port': y });
        try { return await q(z), z; } catch (A) { try { z?.[hy(0x175f, op.c)]?.(); } catch (B) {} throw A; }
    }

    async function s(x, y) {
        const hz = hw;
        if (validDataLength(y) <= 0x0) return;
        const z = x[hz(0x372, oq.c)][hz(0x15d9, oq.f)]();
        try { await z[hz(0x1e12, 'dbGg')](dataToUint8Array(y)); } finally { try { z[hz(0x6d5, 'w3Tt')](); } catch (A) {} }
    }

    async function t(x) {
        const hA = hw,
            y = await getNat64Prefixes();
        if (!y[hA(0xc3f, 'Gn7Q')]) return null;
        const z = isIPv4Addr(c) ? c : await resolveAviaDoH(c);
        if (!z) return null;
        for (const A of y[hA(or.c, 'C2T0')](0x0, 0x4)) {
            const B = makeNat64Address(A, z);
            if (!B) continue;
            try {
                const C = await r(B, f);
                return await s(C, x), log(hA(0x163e, or.f) + B + ':' + f), C;
            } catch (D) { log(hA(0x68e, or.g) + B + ':\x20' + (D[hA(0x29e, or.h)] || D)); }
        }
        return null;
    }

    async function u(x) {
        const hB = hw;
        if (x[hB(ou.c, '8Ys%')] === 0x1) {
            const A = x[0x0];
            return { 'socket': await r(A[hB(ou.f, '89Hn')], A[hB(ou.g, ou.h)]), 'candidate': A };
        }
        const y = x[hB(0xed6, 'GzjL')](B => r(B[hB(0x9a1, 'ZgMu')], B[hB(0x1d90, 'dZbH')])[hB(0xbaf, '%oj0')](C => ({ 'socket': C, 'candidate': B })));
        let z = null;
        try { return z = await Promise[hB(0x19cf, '[p9(')](y), z; } finally {
            if (z)
                for (const B of y) {
                    B[hB(0x70e, ou.i)](({ socket: C }) => {
                        const hC = hB;
                        if (C !== z[hC(0xad6, os.c)]) try { C?.[hC(0x1071, os.f)]?.(); } catch (D) {}
                    })[hB(0xf7c, ou.j)](() => {});
                }
        }
    }

    async function v(x, y, z = null, A = null, B = ![]) {
        const hD = hw;
        if (A && A[hD(ov.c, ov.f)] > 0x0)
            for (let C = 0x0; C < A[hD(0x5e1, ov.g)]; C += TCPconcurrentDialCount) {
                const D = [];
                for (let G = 0x0; G < TCPconcurrentDialCount && C + G < A[hD(ov.h, ov.i)]; G++) {
                    const H = (cachedProxyArrayIndex + C + G) % A[hD(ov.j, '1qbp')],
                        [I, J] = A[H];
                    D[hD(ov.k, ov.f)]({ 'hostname': I, 'port': J, 'index': H });
                }
                let E = null,
                    F = null;
                try {
                    log(hD(ov.l, '%oj0') + D[hD(0x1c75, 'CeJW')] + hD(0x1969, 'XITC') + D[hD(ov.m, 'Gn7Q')](L => L[hD(0xda7, '2#Qk')] + ':' + L[hD(0x1ea, '89Hn')])[hD(ov.n, ov.o)](',\x20'));
                    const K = await u(D);
                    return E = K[hD(ov.p, 'V#kN')], F = K[hD(0x5d0, ov.q)], await s(E, z), log(hD(0xe79, '*lLT') + F[hD(0x1086, ov.r)] + ':' + F[hD(0x6ba, '5M6D')] + hD(ov.s, ov.t) + F[hD(ov.u, ov.v)] + ')'), cachedProxyArrayIndex = F[hD(ov.w, ov.x)], E;
                } catch (L) {
                    try { E?.[hD(0x5be, 'Pt3!')]?.(); } catch (M) {}
                    log(hD(0x9a4, 'vel(') + (L[hD(0x640, 'NxG1')] || L));
                }
            }
        if (B) {
            const N = Array[hD(0x1842, 'Gn7Q')]({ 'length': TCPconcurrentDialCount }, (P, Q) => ({ 'hostname': x, 'port': y, 'attempt': Q }));
            log(hD(ov.y, 'Mmsl') + N[hD(ov.z, ov.A)] + hD(ov.B, ov.C) + x + ':' + y);
            let O = null;
            try {
                const P = await u(N);
                return O = P[hD(0x1344, '2#Qk')], await s(O, z), O;
            } catch (Q) { try { O?.[hD(0x4c9, 'CeJW')]?.(); } catch (R) {} throw Q; }
        } else { closeSocketQuietly(h); throw new Error(hD(0x617, 'dn8p')); }
    }

    async function w(x = ![]) {
        const hE = hw;
        if (j[hE(0xa54, oy.c)]) { await j[hE(0x10f4, oy.f)]; return; }
        const y = x && !o && validDataLength(g) > 0x0,
            z = y ? g : null,
            A = ((async() => {
                const hF = hE;
                let B;
                if (enableSocks5Proxy === hF(0x31c, ox.c)) log(hF(ox.f, ox.g) + c + ':' + f), B = await socks5Connect(c, f, z, p);
                else {
                    if (enableSocks5Proxy === hF(0x1629, ox.h)) log(hF(ox.i, '6UCx') + c + ':' + f), B = await httpConnect(c, f, z, ![], p);
                    else {
                        if (enableSocks5Proxy === hF(0xf60, '6UCx')) log(hF(ox.j, ox.k) + c + ':' + f), B = isIPHostname(parsedSocks5Address[hF(ox.l, 'mRB^')]) ? await httpsConnect(c, f, z, p) : await httpConnect(c, f, z, !![], p);
                        else {
                            if (enableSocks5Proxy === hF(ox.m, 'PYt$')) {
                                log(hF(ox.n, 'b)3q') + c + ':' + f), B = await turnConnect(parsedSocks5Address, c, f, p);
                                if (validDataLength(z) > 0x0) {
                                    const C = B[hF(0xd7c, ox.o)][hF(ox.p, ox.q)]();
                                    try { await C[hF(0x245, ox.r)](dataToUint8Array(z)); } finally { try { C[hF(ox.s, ox.t)](); } catch (D) {} }
                                }
                            } else {
                                if (enableSocks5Proxy === hF(ox.u, 'V#kN')) {
                                    log(hF(0xc22, ox.v) + c + ':' + f), B = await sstpConnect(parsedSocks5Address, c, f, p);
                                    if (validDataLength(z) > 0x0) {
                                        const E = B[hF(0x1acb, '8Ys%')][hF(0x470, 'V#kN')]();
                                        try { await E[hF(ox.w, '60r9')](dataToUint8Array(z)); } finally { try { E[hF(ox.x, ox.y)](); } catch (F) {} }
                                    }
                                } else {
                                    log(hF(ox.z, ox.A) + c + ':' + f);
                                    const G = await parseAddressPort(proxyIP, c, k);
                                    try { B = await v(atob(hF(0xe5d, '6UCx')), 0x1, z, G, enableProxyFallback); } catch (H) { const I = nat64Config ? await t(z) : null; if (!I) throw H; B = I; }
                                }
                            }
                        }
                    }
                }
                if (y) o = !![];
                j[hF(0x1233, 'dbGg')] = B, B[hF(ox.B, ox.C)][hF(ox.D, '1qbp')](() => {})[hF(0x8ac, ox.E)](() => closeSocketQuietly(h)), connectStreams(B, h, i, null, m);
            })());
        j[hE(0xfcf, 'w3Tt')] = A;
        try { await A; } finally { j[hE(oy.g, 'C2T0')] === A && (j[hE(oy.h, 'rsIZ')] = null); }
    }
    j[hw(0x1a3f, oA.m)] = async() => w(!o);
    if (enableSocks5Proxy && (enableSocks5GlobalProxy || hostMatchesProxyList(c))) {
        log(hw(oA.n, oA.o));
        try { await w(); } catch (x) { log(hw(0x1bed, oA.p) + x[hw(0xa46, 'T3Fv')]); throw x; }
    } else
        try {
            log(hw(oA.q, '60r9') + c + ':' + f);
            const y = await v(c, f, g);
            j[hw(0x1c7f, '[]Y1')] = y, connectStreams(y, h, i, async() => {
                const hG = hw;
                if (j[hG(oz.c, oz.f)] !== y) return;
                await w();
            }, m);
        } catch (z) { log(hw(0x1432, oA.r) + c + ':' + f + hw(0x88f, oA.s) + z[hw(oA.t, 'jODS')]), await w(); }
}

async function forwardataudp(c, f, g, h, i = null) {
    const oC = { c: 0xf42, f: '*lLT', g: 0x77b, h: 0x15ab, i: 'egod', j: 'Mmsl', k: 0x1457, l: 'dZbH', m: 0x1c94, n: 0x818, o: '89Hn', p: 0xfb7, q: 'PYt$', r: 0xd36, s: '[]Y1' },
        oB = { c: 'jODS', f: 'Pt3!', g: 'ZgMu', h: 0x4a3, i: 'rsIZ', j: 0x1297, k: 'd%lH', l: 0x5d6, m: 0x1083, n: 0xfff, o: 0x1edb, p: '2#Qk', q: 'GzjL' },
        hH = fX,
        j = dataToUint8Array(c),
        k = j[hH(oC.c, oC.f)];
    log(hH(oC.g, 'GzjL') + k + hH(oC.h, oC.i));
    try {
        const l = createRequestTcpConnector(h),
            m = l({ 'hostname': hH(0x1c5d, '60r9'), 'port': 0x35 });
        let n = g;
        const o = m[hH(0x1858, 'T3Fv')][hH(0x1eb4, oC.j)]();
        await o[hH(oC.k, oC.l)](j), log(hH(oC.m, 'IcEg') + k + 'B'), o[hH(oC.n, oC.o)](), await m[hH(0x132d, 'GzjL')][hH(0x2a0, '2#Qk')](new WritableStream({
            async 'write'(p) {
                const hI = hH,
                    q = dataToUint8Array(p);
                log(hI(0xd6c, oB.c) + q[hI(0x1786, 'Gn7Q')] + 'B');
                const r = i ? await i(q) : q,
                    s = Array[hI(0x15ce, oB.f)](r) ? r : [r];
                if (!s[hI(0xaca, oB.g)]) return;
                if (f[hI(oB.h, 'XITC')] !== WebSocket[hI(0xbae, oB.i)]) return;
                for (const t of s) {
                    const u = dataToUint8Array(t);
                    if (!u[hI(oB.j, oB.k)]) continue;
                    if (n) {
                        const v = new Uint8Array(n[hI(0x1796, 'oeP*')] + u[hI(oB.l, 'C2T0')]);
                        v[hI(oB.m, '[]Y1')](n, 0x0), v[hI(oB.n, 'XITC')](u, n[hI(oB.o, oB.p)]), await WebSocketsendAndWait(f, v[hI(0x1dd9, oB.q)]), n = null;
                    } else await WebSocketsendAndWait(f, u);
                }
            }
        }));
    } catch (p) { log(hH(oC.p, oC.q) + (p?.[hH(oC.r, oC.s)] || p)); }
}

function closeSocketQuietly(c) {
    const oD = { c: 'PYt$', f: 0xe93, g: '60r9', h: '[]Y1' },
        hJ = fX;
    try { (c[hJ(0xeef, oD.c)] === WebSocket[hJ(oD.f, '0Ua@')] || c[hJ(0x154a, 'mRB^')] === WebSocket[hJ(0xdce, oD.g)]) && c[hJ(0x1486, oD.h)](); } catch (f) {}
        }
    function formatIdentifier(c, f = 0x0) {
    const oE = { c: 0x15d, f: 0x140f, g: '*lLT', h: 'XITC', i: 0xdc7, j: '5M6D', k: 0x1361, l: '0Ua@', m: 0x49f, n: '$p[^' },
        hK = fX,
        g = [...c[hK(oE.c, 'PSkb')](f, f + 0x10)][hK(0x16d7, 'zs!c')](h => h[hK(0x128e, 'NMJQ')](0x10)[hK(0xb79, 'd%lH')](0x2, '0'))[hK(0x433, 'GzjL')]('');
    return g[hK(oE.f, oE.g)](0x0, 0x8) + '-' + g[hK(0x1d06, oE.h)](0x8, 0xc) + '-' + g[hK(oE.i, oE.j)](0xc, 0x10) + '-' + g[hK(oE.k, oE.l)](0x10, 0x14) + '-' + g[hK(oE.m, oE.n)](0x14);
}

async function WebSocketsendAndWait(c, f) {
    const oF = { c: 0xa5d, f: 0x745, g: 'mRB^', h: 0x16ae },
        hL = fX,
        g = c[hL(oF.c, 'b)3q')](f);
    if (g && typeof g[hL(oF.f, oF.g)] === hL(oF.h, '1qbp')) await g;
}

function createUpstreamWriteQueue({ getWriter: c, releaseWriter: f, retryConnection: g, closeConnection: h, name: name = fX(0xd92, 'XITC') }) {
    const oO = { c: 'XITC', f: 0x1ee8, g: '9rQu', h: 'GzjL', i: 0x17ec, j: 'PSkb', k: '7NO9', l: 0x145a },
        oN = { c: 0x1c9c, f: 'Pt3!', g: 0x11df, h: 'vel(', i: 0x1e13, j: 0x7fc, k: 'dn8p', l: '$p[^', m: 0x83c, n: 'NMJQ', o: 0x1863, p: 'GzjL', q: 0x1a1f, r: 0x1e7a, s: 'wCGK' },
        oM = { c: 0x1a31, f: 'b)3q', g: 'rsIZ', h: 'w3Tt', i: 0xf88, j: '1qbp', k: 0x16a1, l: 0x1ac7, m: '$BSl', n: 0x16e2, o: 0xa9d, p: 'PYt$', q: 'PSkb', r: 0x16b5, s: 'yxI7', t: 0x800, u: 'NxG1', v: 0x1e50, w: 'NMJQ', x: 0x15ed, y: 'mRB^', z: 0x58b, A: 0xa9d, B: 'PYt$', C: '2#Qk', D: 'NxG1' },
        oL = { c: 'w3Tt' },
        oI = { c: '6UCx' },
        oH = { c: 0x1261, f: 'GzjL', g: 0x10f6, h: 0x1954 },
        oG = { c: 0x12c9, f: '1qbp' };
    let i = [],
        j = 0x0,
        k = 0x0,
        l = ![],
        m = ![],
        n = null,
        o = [],
        p = null;

    const q = (z, A = null) => {
            const hM = b;
            if (!z) return;
            for (const B of z) {
                if (A) B[hM(oG.c, '*lLT')](A);
                else B[hM(0x1735, oG.f)]();
            }
        },
        r = z => {
            const hN = b;
            for (let A = j; A < i[hN(oH.c, oH.f)]; A++) {
                const B = i[A];
                if (B?.[hN(oH.g, '*lLT')]) q(B[hN(oH.h, '[]Y1')], z);
            }
        },
        s = () => {
            const hO = b;
            j > 0x20 && j * 0x2 >= i[hO(0x1c85, oI.c)] && (i = i[hO(0x10b9, 'w3Tt')](j), j = 0x0);
        },
        t = () => {
            const hP = b;
            if (k || l || !o[hP(0xaae, '#sM9')]) return;
            const z = o;
            o = [];
            for (const A of z) A();
        },
        u = (z = null) => {
            const hQ = b,
                A = z || (m ? new Error(name + hQ(0x17f5, 'Gn7Q')) : null);
            A && (r(A), q(p, A), p = null), i = [], j = 0x0, k = 0x0, t();
        },
        v = () => {
            const hR = b;
            if (j >= i[hR(0x10e1, oL.c)]) return null;
            const z = i[j];
            return i[j++] = undefined, k -= z[hR(0x15fc, 'IcEg')][hR(0x152, 'dn8p')], s(), z;
        },
        w = () => {
            const hS = b,
                z = v();
            if (!z) return null;
            if (j >= i[hS(oM.c, oM.f)] || z[hS(0xa67, oM.g)][hS(0x7a9, oM.h)] >= upstreamBatchTargetBytes) return z;
            let A = z[hS(0x184f, 'T3Fv')][hS(0x3ec, '6UCx')],
                B = j,
                C = z[hS(oM.i, oM.j)],
                D = z[hS(oM.k, 'M5Ii')] || null;
            while (B < i[hS(oM.l, oM.m)]) {
                const G = i[B],
                    H = A + G[hS(oM.n, '[]Y1')][hS(oM.o, oM.p)];
                if (H > upstreamBatchTargetBytes) break;
                A = H, C = C && G[hS(0x72a, '7NO9')];
                if (G[hS(0xb24, oM.q)]) D = D ? D[hS(oM.r, oM.s)](G[hS(oM.t, oM.u)]) : G[hS(oM.v, oM.w)];
                B++;
            }
            if (B === j) return z;
            const E = n ||= new Uint8Array(upstreamBatchTargetBytes);
            E[hS(oM.x, oM.y)](z[hS(oM.z, 'vel(')]);
            let F = z[hS(0x1a53, 'dbGg')][hS(oM.A, oM.B)];
            while (j < B) {
                const I = i[j];
                i[j++] = undefined, k -= I[hS(0xfea, oM.m)][hS(0x1599, '89Hn')], E[hS(0x1768, '%oj0')](I[hS(0x1b0d, oM.C)], F), F += I[hS(0x1c0c, oM.D)][hS(0xd1f, 'NMJQ')];
            }
            return s(), { 'chunk': E[hS(0x147e, 'PSkb')](0x0, A), 'allowRetry': C, 'completions': D };
        },
        x = async() => {
            const hT = b;
            if (l || m) return;
            l = !![];
            try {
                for (;;) {
                    if (m) break;
                    const z = w();
                    if (!z) break;
                    let A = c();
                    if (!A) throw new Error(name + hT(oN.c, oN.f));
                    const B = z[hT(oN.g, 'V#kN')] || null;
                    p = B;
                    try {
                        try { await A[hT(0x1f22, oN.h)](z[hT(oN.i, 'GzjL')]); } catch (C) {
                            f?.();
                            if (!z[hT(0x16b, 'NMJQ')] || typeof g !== hT(oN.j, oN.k)) throw C;
                            await g(), A = c();
                            if (!A) throw C;
                            await A[hT(0x1412, oN.l)](z[hT(oN.m, oN.n)]);
                        }
                        q(B);
                    } catch (D) { q(B, D); throw D; } finally { if (p === B) p = null; }
                }
            } catch (E) { m = !![], u(E), log('[' + name + hT(oN.o, oN.p) + (E?.[hT(oN.q, 'rsIZ')] || E)); try { h?.(E); } catch (F) {} } finally { l = ![]; if (!m && j < i[hT(oN.r, oN.s)]) queueMicrotask(x); else t(); }
        },
        y = (z, A = ![], B = ![]) => {
            const hU = b;
            if (m) return ![];
            if (!c()) return ![];
            const C = dataToUint8Array(z);
            if (!C[hU(0x10fd, oO.c)]) return !![];
            const D = k + C[hU(oO.f, '7NO9')],
                E = i[hU(0x1106, oO.g)] - j + 0x1;
            if (D > upstreamQueueMaxBytes || E > upstreamQueueMaxItems) {
                m = !![];
                const H = Object[hU(0x41b, oO.h)](new Error(name + hU(oO.i, oO.j) + D + 'B/' + E + ')'), { 'isQueueOverflow': !![] });
                u(H), log('[' + name + hU(0x1d48, '$p[^'));
                try { h?.(H); } catch (I) {}
                throw H;
            }
            let F = null,
                G = null;
            B && (G = [], F = new Promise((J, K) => G[hU(0x135f, 'XITC')]({ 'resolve': J, 'reject': K })));
            i[hU(0x8ba, oO.k)]({ 'chunk': C, 'allowRetry': A, 'completions': G }), k = D;
            if (!l) queueMicrotask(x);
            return B ? F[hU(oO.l, '9rQu')](() => !![]) : !![];
        };
    return {
        'write'(z, A = ![]) { return y(z, A, ![]); },
        'writeAndWait'(z, A = ![]) { return y(z, A, ![]); },
        async 'waitEmpty'() {
            const hV = b;
            if (!k && !l) return;
            await new Promise(z => o[hV(0x120e, '#sM9')](z));
        },
        'clear'() { m = !![], u(); }
    };
}

function createDownstreamGrainSender(c, f = null) {
    const p3 = { c: 0x26e, f: 'NxG1' },
        p2 = { c: 0x7a9, f: 'Pt3!', g: 0x57d, h: 0x18e0, i: 0x13a7, j: 'w3Tt' },
        p1 = { c: '#sM9' },
        oX = { c: 0xec5, f: 0x5ba, g: 'XITC', h: 0x356, i: 'PYt$' },
        oV = { c: 0xb28, f: 0x7c4, g: 0x77c, h: 0x1dac, i: 'IcEg', j: 'w(Wr' },
        oU = { c: 0x11f3, f: 'b)3q', g: 'XITC' },
        hW = fX,
        g = downstreamGrainChunkBytes,
        h = downstreamGrainTailThreshold,
        i = Math[hW(p3.c, p3.f)](0x1000, h << 0x3);
    let j = f,
        k = new Uint8Array(g),
        l = 0x0,
        m = null,
        n = ![],
        o = 0x0,
        p = 0x0,
        q = 0x0,
        r = null;

    const s = async w => {
            const hX = hW;
            if (c[hX(oU.c, oU.f)] !== WebSocket[hX(0x532, 'wCGK')]) throw new Error(hX(0x7a0, oU.g));
            await WebSocketsendAndWait(c, w);
        },
        t = w => {
            const hY = hW;
            if (!j) return w;
            const x = new Uint8Array(j[hY(oV.c, 'PSkb')] + w[hY(oV.f, '9rQu')]);
            return x[hY(oV.g, '6UCx')](j, 0x0), x[hY(oV.h, oV.i)](w, j[hY(0x113c, oV.j)]), j = null, x;
        },
        u = async() => {
            const hZ = hW;
            while (r) await r;
            if (m) clearTimeout(m);
            m = null, n = ![];
            if (!l) return;
            const w = k[hZ(oX.c, '9rQu')](0x0, l)[hZ(oX.f, oX.g)]();
            return k = new Uint8Array(g), l = 0x0, q = 0x0, r = s(w)[hZ(oX.h, oX.i)](() => { r = null; }), r;
        },
        v = () => {
            const oZ = { c: 0x747, f: 'mRB^', g: 0xc2e, h: 'T3Fv' },
                oY = { c: 0x74c, f: 'egod', g: '6UCx' };
            if (m || n) return;
            n = !![], p = o, queueMicrotask(() => {
                const i0 = b;
                n = ![];
                if (!l || m) return;
                if (g - l < h) { u()[i0(oZ.c, oZ.f)](() => closeSocketQuietly(c)); return; }
                m = setTimeout(() => {
                    const i1 = i0;
                    m = null;
                    if (!l) return;
                    if (g - l < h) { u()[i1(oY.c, oY.f)](() => closeSocketQuietly(c)); return; }
                    if (q < 0x2 && (o !== p || l < i)) { q++, p = o, v(); return; }
                    u()[i1(0xf7c, oY.g)](() => closeSocketQuietly(c));
                }, Math[i0(oZ.g, oZ.h)](downstreamGrainSilentMs, 0x1));
            });
        };
    return {
        async 'directSend'(w) {
            const i2 = hW;
            let x = dataToUint8Array(w);
            if (!x[i2(0x1d5e, p1.c)]) return;
            x = t(x), await s(x);
        },
        async 'send'(w) {
            const i3 = hW;
            let x = dataToUint8Array(w);
            if (!x[i3(p2.c, 'w3Tt')]) return;
            x = t(x);
            let y = 0x0;
            const z = x[i3(0x1f3, 'PSkb')];
            while (y < z) {
                if (!l && z - y >= g) {
                    const B = Math[i3(0x1ef8, p2.f)](g, z - y),
                        C = y || B !== z ? x[i3(p2.g, '6UCx')](y, y + B) : x;
                    await s(C), y += B;
                    continue;
                }
                const A = Math[i3(0x1acf, 'IcEg')](g - l, z - y);
                k[i3(p2.h, '8Ys%')](x[i3(p2.i, p2.j)](y, y + A), l), l += A, y += A, o++;
                if (l === g || g - l < h) await u();
                else v();
            }
        },
        'flush': u
    };
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
    async function forwardWsToBackend(c, f, g, h, i, j) {
    const nv = { c: 0x1ad8, f: 0x1c70, g: 0x52a, h: 'b)3q', i: 0x162c, j: 'jODS', k: 'n7E3', l: '8Ys%', m: 0x17a5, n: 'oeP*', o: 'mRB^', p: 0x311, q: 0x5bc, r: 0x117b, s: '*lLT', t: 0x19cb, u: 'ZgMu', v: 0x1223, w: 'rsIZ', x: 0x74d, y: 0x691, z: '%oj0', A: 0x2ad, B: 0x16c7, C: 0x50b, D: '%oj0', E: 0x513, F: '$BSl', G: 0x373, H: 'd%lH', I: 0x817, J: '$p[^', K: 0x1be6, L: 'w(Wr', M: 0x1e9, N: 0x19fe, O: 0x7d0, P: 'b)3q', Q: 'vel(', R: '89Hn', S: 0xc16, T: 0x1068, U: 'mRB^', V: 0x738, W: 0x4c9, X: 'CeJW', Y: '0Ua@', Z: 'PSkb', a0: 0x1d8f, a1: 'Pt3!' },
        nu = { c: '*lLT', f: 0xe23, g: '5M6D', h: 0x1b17, i: '9rQu', j: 0x822 },
        nt = { c: 0x1d26, f: 0xad0, g: '[]Y1', h: 0x172a },
        ns = { c: 0x133, f: 'mRB^', g: 0x149d, h: '*lLT', i: 0xe9b, j: 'NxG1', k: 0x1b89, l: 'dZbH', m: 0x15ec },
        nr = { c: '$BSl' },
        gF = fX,
        k = backendTargetUrl(i, f);
    if (!k) return new Response(gF(nv.c, '9rQu'), { 'status': 0x1f4 });
    const l = new WebSocketPair(),
        m = l[0x0],
        n = l[0x1];
    try { n[gF(nv.f, 'dbGg')](); } catch (w) {}
    const o = new Headers(c[gF(nv.g, 'n7E3')]);
    o[gF(0x1886, nv.h)](gF(nv.i, nv.j)), o[gF(0x173d, nv.k)](gF(0xf3e, nv.l)), o[gF(nv.m, nv.n)](gF(0xe71, nv.o), gF(nv.p, '%oj0')), o[gF(0x106d, 'CeJW')](gF(nv.q, 'dbGg'), gF(0x1116, 'b)3q'));
    let p;
    try { p = await fetch(k, { 'method': gF(nv.r, nv.s), 'headers': o, 'redirect': gF(nv.t, nv.u) }); } catch (x) {
        try { n[gF(nv.v, nv.w)](0x3f3, gF(nv.x, nv.h)); } catch (y) {}
        try { m[gF(0x1149, '9rQu')](0x3f3, gF(nv.y, nv.z)); } catch (z) {}
        return new Response(gF(nv.A, 'Mmsl') + (x && x[gF(nv.B, '0Ua@')] || x), { 'status': 0x1f6 });
    }
    if (p[gF(nv.C, nv.D)] !== 0x65 || !p[gF(nv.E, 'wCGK')]) {
        try { await p[gF(0x705, nv.F)]?.[gF(nv.G, nv.H)](); } catch (A) {}
        try { n[gF(0xda1, '8Ys%')](0x3f3, gF(nv.I, nv.J)); } catch (B) {}
        try { m[gF(nv.K, nv.L)](0x3f3, gF(nv.M, nv.u)); } catch (C) {}
        return new Response(gF(0xd30, '6UCx') + p[gF(nv.N, '*lLT')] + ')', { 'status': 0x1f6 });
    }
    const q = p[gF(nv.O, nv.P)];
    try { q[gF(0xde9, nv.Q)](); } catch (D) {}
    let r = ![];
    const s = { 'up': 0x0, 'down': 0x0 },
        t = E => {
            const gG = gF;
            try {
                return E && E[gG(0x3aa, 'n7E3')] != null ? E[gG(0xebf, 'NxG1')] : E && E[gG(0xac2, '9rQu')] != null ? E[gG(0xe27, '5M6D')] : E && E[gG(0x1ac7, nr.c)] || 0x0;
            } catch (F) { return 0x0; }
        },
        u = (E, F) => {
            const gH = gF;
            if (r) return;
            r = !![];
            try { n[gH(ns.c, ns.f)](E || 0x3e8, F || gH(ns.g, ns.h)); } catch (G) {}
            try { q[gH(ns.i, ns.j)](E || 0x3e8, F || gH(ns.k, ns.l)); } catch (H) {}
            try { recordUsage(g, s['up'], s[gH(0xf0d, 'C2T0')], h); } catch (I) {}
            if (j)
                try { recordUserUsage(g, j, s['up'], s[gH(ns.m, 'PYt$')], h); } catch (J) {}
        },
        v = (E, F, G) => {
            const gI = gF;
            if (r) return;
            if (F instanceof Blob) {
                F[gI(0x145f, '7NO9')]()[gI(0x88b, nu.c)](H => {
                    const gJ = gI;
                    if (r) return;
                    try {
                        E[gJ(nt.c, 'vel(')](H);
                        if (G) s['up'] += t(H);
                        else s[gJ(nt.f, nt.g)] += t(H);
                    } catch (I) { u(0x3f3, gJ(nt.h, 'zs!c')); }
                })[gI(nu.f, nu.g)](() => u(0x3f3, gI(0x137f, 'vel(')));
                return;
            }
            if (E[gI(nu.h, 'Mmsl')] !== 0x1) return;
            try {
                E[gI(0x15a0, '8Ys%')](F);
                if (G) s['up'] += t(F);
                else s[gI(0x3d2, nu.i)] += t(F);
            } catch (H) { u(0x3f3, gI(nu.j, 'ZgMu')); }
        };
    return n[gF(0xab3, nv.R)](gF(nv.S, '8Ys%'), E => v(q, E[gF(0x1ca5, '$p[^')], !![])), q[gF(0x10d3, '1qbp')](gF(nv.T, nv.U), E => v(n, E[gF(0x8be, 'jODS')], ![])), n[gF(nv.V, '7NO9')](gF(nv.W, nv.X), E => u(E[gF(0x1ec4, 'Pt3!')], E[gF(0xf56, '6UCx')] || gF(0x1771, '#sM9'))), q[gF(0x1ec3, nv.Y)](gF(0xc43, '*lLT'), E => u(E[gF(0x1ab4, 'M5Ii')], E[gF(0xf56, '6UCx')] || gF(0x56d, '89Hn'))), n[gF(0xc9a, nv.Z)](gF(0xcd6, 'NxG1'), () => u(0x3f3, gF(0x1182, 'T3Fv'))), q[gF(nv.a0, 'vel(')](gF(0x783, nv.a1), () => u(0x3f3, gF(0x10fa, 'w(Wr'))), new Response(null, { 'status': 0x65, 'webSocket': m });
}

async function forwardHttpToBackend(c, f, g, h) {
    const nw = { c: 0x1683, f: '$BSl', g: 0x1e53, h: '8Ys%', i: 0x2de, j: '5M6D', k: 'dbGg', l: 0x3c7, m: 0x146d, n: 'Mmsl', o: 0x151a, p: 'w3Tt' },
        gK = fX,
        i = backendTargetUrl(h, f);
    if (!i) return new Response(gK(nw.c, nw.f), { 'status': 0x1f4 });
    const j = new Headers();
    for (const [l, m] of c[gK(nw.g, 'wCGK')]) {
        const n = l[gK(0x1d1, nw.h)]();
        if (n === gK(0x68b, 'CeJW') || n[gK(nw.i, 'dZbH')](gK(0x1632, nw.j)) || n === gK(0x517, nw.k)) continue;
        j[gK(0x169, 'rsIZ')](l, m);
    }
    try { return await fetch(i, { 'method': c[gK(nw.l, '*lLT')], 'headers': j, 'body': c[gK(0x78b, '8Ys%')], 'redirect': gK(nw.m, nw.n) }); } catch (o) { return new Response(gK(nw.o, nw.p) + (o && o[gK(0x1068, 'mRB^')] || o), { 'status': 0x1f6 }); }
}

async function handleWsRequest(c, f, g, h, i) {
    const o3 = { c: 0xad2, f: '*lLT', g: 0x14af, h: 0x1811, i: 0x18b1, j: 0x485, k: 0xdee, l: '0Ua@', m: 'Pt3!', n: '9rQu', o: 0xa94, p: 'GzjL', q: 0x1d64, r: 'dbGg', s: 0x4e1, t: 'Mmsl', u: 0x12c0, v: '89Hn', w: '5M6D', x: 0x5d6, y: 0x1eb5, z: '%oj0' },
        o0 = { c: 0x5b1, f: 0xf2a },
        nX = { c: 0x1109 },
        nW = { c: 0x26e, f: 'NxG1', g: 0xc3c },
        nU = { c: 0x1bbd, f: 'wCGK', g: 0x1d1c, h: '0Ua@' },
        nT = { c: 0x497, f: '89Hn', g: 0x5b9, h: 'NxG1', i: '2#Qk', j: 0x7f6, k: 'XITC', l: 0x14e9, m: 0x8dc, n: '#sM9', o: 0x17c7, p: 'rsIZ' },
        nS = { c: 'd%lH', f: 'IcEg', g: '9rQu', h: 0x14c6, i: 'mRB^', j: 0x1505, k: 'dZbH', l: 'dn8p', m: 'PSkb', n: 0x515, o: 0xb62, p: 0x18a3, q: '#sM9', r: 0x18d6, s: 0x129c, t: 'egod', u: 0x12f0, v: '%oj0', w: 0xdbd, x: 'w3Tt', y: 0x9e3, z: 0x16a8, A: 'd%lH', B: 'V#kN' },
        nR = { c: 0x1763, f: 'b)3q', g: 0x3c1, h: 'vel(', i: 0x16e9, j: '*lLT', k: 0x1bba, l: 'w(Wr', m: 'Mmsl', n: 'zs!c', o: 0x170e, p: 'ZgMu', q: '5M6D', r: 0xef5, s: 'Mmsl', t: 0xe63, u: '$BSl', v: 0x1eaa, w: 0x6e6, x: 'd%lH', y: 0xe0c, z: '[p9(', A: '[p9(', B: 0x1775, C: 'egod', D: 'NxG1', E: 0x9d7, F: 'mRB^', G: 0x1599, H: 'n7E3', I: 0xc37, J: 'w3Tt', K: 0x770, L: 0x1103, M: 0x826, N: 'Mmsl', O: 0xd24, P: 0x122d, Q: 0x23b, R: 'wCGK', S: 'Gn7Q', T: 0x84a, U: '8Ys%', V: 'zs!c', W: 'NMJQ' },
        nQ = { c: 'IcEg' },
        nO = { c: 0x569, f: 0x1e94, g: '*lLT', h: 0xd78, i: 'T3Fv', j: 0x13dc },
        nB = { c: '9rQu' },
        nA = { c: '*lLT' },
        nz = { c: 0x1359, f: '$BSl', g: '8Ys%', h: 0x53d },
        ny = { c: 0xa29, f: '5M6D', g: 0x206, h: 'M5Ii' },
        gL = fX;
    if (connRejectReason) return new Response(gL(o3.c, o3.f) + connRejectReason + ')', { 'status': 0x193 });
    const j = connUserId,
        k = new WebSocketPair(),
        [l, m] = Object[gL(o3.g, 'XITC')](k);
    try { m[gL(o3.h, '89Hn')]({ 'allowHalfOpen': !![] }); } catch (R) { m[gL(o3.i, 'PYt$')](); }
    m[gL(o3.j, 'Gn7Q')] = gL(0x53c, '89Hn');
    let n = { 'socket': null, 'connectingPromise': null, 'retryConnect': null };
    const o = { 'up': 0x0, 'down': 0x0 };
    let p = ![],
        q = null;
    const r = { 'cache': new Uint8Array(0x0) },
        s = c[gL(0x7f4, 'egod')][gL(o3.k, o3.l)](gL(0x15a8, 'rsIZ')) || '',
        t = !!g[gL(0x19bd, o3.m)][gL(0x8ed, o3.n)](gL(0x1c2e, 'w3Tt'));
    let u = null,
        v = Promise[gL(o3.o, o3.p)](),
        w = ![],
        x = ![],
        y = ![],
        z = 0x0,
        A = 0x0,
        B = null,
        C = null,
        D = null,
        E = null,
        F = null;
    const G = () => {
            const gM = gL;
            if (D) { try { D[gM(0x1ae2, 'T3Fv')](); } catch (S) {} D = null; }
            C = null;
        },
        H = u = createUpstreamWriteQueue({ 'getWriter': () => {
                const gN = gL,
                    S = n[gN(ny.c, ny.f)];
                if (!S) return null;
                return S !== C && (G(), C = S, D = S[gN(ny.g, ny.h)][gN(0x470, 'V#kN')]()), D;
            }, 'releaseWriter': G, 'retryConnection': async() => {
                const gO = gL;
                if (typeof n[gO(nz.c, nz.f)] !== gO(0x9a8, nz.g)) throw new Error(gO(nz.h, 'rsIZ'));
                await n[gO(0x17b, '1qbp')]();
            }, 'closeConnection': () => {
                const gP = gL;
                try { n[gP(0x11f4, nA.c)]?.[gP(0x103b, 'ZgMu')](); } catch (S) {}
                closeSocketQuietly(m);
            }, 'name': gL(o3.q, o3.r) }),
        I = async(S, T = !![]) => { const gQ = gL; return H[gQ(0xac7, nB.c)](S, T); },
        J = async() => {
            const nL = { c: '60r9' },
                nG = { c: 'b)3q', f: 0x15dd, g: 0x1ec7 },
                nD = { c: 0xd2a, f: 'rsIZ', g: '#sM9', h: 0x4e5, i: 0xd2a, j: '5M6D', k: 0x1f3, l: 'PSkb', m: 0xded, n: '60r9', o: 0x1c79, p: 0x10c8, q: 'dZbH', r: 0x93d, s: '7NO9', t: 0xe3b, u: 0xcda, v: 0x438, w: 0x1c48, x: 0xb03, y: 0x13eb, z: 0x9a5, A: 'wCGK', B: 'NxG1', C: 0x1c9a, D: 0x820, E: 'w(Wr', F: 0x1213, G: 'jODS', H: 0x4bb, I: 0x1b75, J: 'NxG1', K: 0xfed, L: 'GzjL', M: '[]Y1', N: 0x147c, O: '60r9', P: 'Pt3!', Q: 0x457, R: 'w(Wr', S: '0Ua@', T: 0xc98, U: 'dn8p' },
                nC = { c: 0x1701, f: 'NMJQ', g: 0xbe2, h: 0x1467, i: 0x11f5, j: 0xf92, k: 0x863 },
                h3 = gL;
            if (E) return E;
            return !F && (F = (async() => {
                const nM = { c: 0x1c91, f: 0x186f, g: 0x7ba, h: 0xebf, i: 'NxG1', j: 0x1611, k: 0x1af9, l: 'wCGK', m: '7NO9' },
                    nK = { c: 0x70e, f: 0x11ab },
                    nE = { c: 0x3aa, f: '8Ys%', g: 0x93d, h: 0x1caf, i: 'egod', j: 0x12d, k: 'dn8p', l: 0xd4c, m: 0xaaf, n: 'CeJW', o: 0x12ae, p: '89Hn', q: 0x1adc, r: '#sM9', s: 0x1d5e, t: 0xf05, u: 'XITC', v: 0x11c4, w: 'w(Wr', x: 0x567, y: 'dZbH', z: '%oj0', A: 0x17f9, B: 0x3e5, C: 0x150a, D: 'wCGK' },
                    gR = b,
                    S = (g[gR(0x976, '6UCx')][gR(nO.c, 'wCGK')](gR(nO.f, nO.g)) || '')[gR(0xa2d, '9rQu')](),
                    T = SSsupportEncryptionConfig[S] || SSsupportEncryptionConfig[gR(nO.h, nO.i)],
                    U = [T, ...Object[gR(nO.j, 'C2T0')](SSsupportEncryptionConfig)[gR(0x1af4, '$BSl')](a6 => a6[gR(0x1a71, 'XITC')] !== T[gR(0x6ee, '$BSl')])],
                    V = new Map(),
                    W = a6 => {
                        const gS = gR;
                        if (!V[gS(nC.c, nC.f)](a6[gS(nC.g, 'mRB^')])) V[gS(nC.h, 'PSkb')](a6[gS(0x1cc9, 'T3Fv')], SSderiveMasterKey(f, a6[gS(nC.i, '89Hn')]));
                        return V[gS(nC.j, '8Ys%')](a6[gS(nC.k, '60r9')]);
                    },
                    X = { 'buffer': new Uint8Array(0x0), 'hasSalt': ![], 'waitPayloadLength': null, 'decryptKey': null, 'nonceCounter': new Uint8Array(SSNoncelength), 'encryptionConfig': null },
                    Y = async() => {
                        const gT = gR,
                            a6 = 0x2 + SSAEADtagLength,
                            a7 = Math[gT(nD.c, nD.f)](...U[gT(0x1517, nD.g)](ab => ab[gT(0x1809, 'IcEg')])),
                            a8 = 0x10,
                            a9 = Math[gT(nD.h, 'yxI7')](a8, Math[gT(nD.i, nD.f)](0x0, X[gT(0x1113, nD.j)][gT(nD.k, nD.l)] - (a6 + Math[gT(nD.m, nD.n)](...U[gT(nD.o, 'ZgMu')](ab => ab[gT(0x49e, 'T3Fv')])))));
                        for (let ab = 0x0; ab <= a9; ab++) {
                            for (const ac of U) {
                                const ad = ab + ac[gT(0xc05, 'jODS')] + a6;
                                if (X[gT(0x17d5, '[]Y1')][gT(nD.p, nD.q)] < ad) continue;
                                const ae = X[gT(nD.r, nD.s)][gT(0x1142, '0Ua@')](ab, ab + ac[gT(nD.t, 'dbGg')]),
                                    af = X[gT(0x1a96, 'C2T0')][gT(nD.u, 'Gn7Q')](ab + ac[gT(nD.v, 'NxG1')], ad),
                                    ag = await W(ac),
                                    ah = await SSderiveSessionKey(ac, ag, ae, [gT(nD.w, 'C2T0')]),
                                    ai = new Uint8Array(SSNoncelength);
                                try {
                                    const aj = await SSAEADdecrypt(ah, ai, af);
                                    if (aj[gT(0x712, '$BSl')] !== 0x2) continue;
                                    const ak = aj[0x0] << 0x8 | aj[0x1];
                                    if (ak < 0x0 || ak > ac[gT(nD.x, 'b)3q')]) continue;
                                    if (ab > 0x0) log(gT(nD.y, 'egod') + ab + gT(nD.z, nD.A));
                                    if (ac[gT(0x14b9, nD.B)] !== T[gT(nD.C, 'b)3q')]) log(gT(nD.D, nD.E) + (S || T[gT(0x14b9, 'NxG1')]) + gT(nD.F, '7NO9') + ac[gT(0xa4b, 'IcEg')] + gT(0x1205, nD.G));
                                    return X[gT(0x1a96, 'C2T0')] = X[gT(nD.H, 'XITC')][gT(0xb09, 'ZgMu')](ad), X[gT(0x78c, '7NO9')] = ah, X[gT(nD.I, nD.J)] = ai, X[gT(nD.K, nD.L)] = ak, X[gT(0x1ac, nD.M)] = ac, X[gT(0xd50, nD.g)] = !![], !![];
                                } catch (al) {}
                            }
                        }
                        const aa = a7 + a6 + a8;
                        if (X[gT(nD.N, nD.O)][gT(nD.p, nD.q)] >= aa) throw new Error(gT(0x177d, 'b)3q') + (S || gT(0x1ba1, 'Mmsl')) + gT(nD.Q, nD.R) + U[gT(0x271, nD.S)](am => am[gT(0x1a71, 'XITC')])[gT(nD.T, nD.U)]('/') + ')');
                        return ![];
                    },
                    Z = { async 'input'(a6) {
                            const gU = gR,
                                a7 = dataToUint8Array(a6);
                            if (a7[gU(nE.c, 'n7E3')] > 0x0) X[gU(0xeb1, nE.f)] = concatByteData(X[gU(nE.g, '7NO9')], a7);
                            if (!X[gU(nE.h, 'egod')]) { const a9 = await Y(); if (!a9) return []; }
                            const a8 = [];
                            while (!![]) {
                                if (X[gU(0x1410, '6UCx')] === null) {
                                    const ad = 0x2 + SSAEADtagLength;
                                    if (X[gU(0x1a96, 'C2T0')][gU(0x19d2, 'V#kN')] < ad) break;
                                    const ae = X[gU(0x1650, nE.i)][gU(nE.j, nE.k)](0x0, ad);
                                    X[gU(0x12d6, '6UCx')] = X[gU(0x1d4e, 'Pt3!')][gU(nE.l, 'C2T0')](ad);
                                    const af = await SSAEADdecrypt(X[gU(nE.m, nE.k)], X[gU(0x63f, 'Gn7Q')], ae);
                                    if (af[gU(0x1786, 'Gn7Q')] !== 0x2) throw new Error(gU(0x7d3, 'vel('));
                                    const ag = af[0x0] << 0x8 | af[0x1];
                                    if (ag < 0x0 || ag > X[gU(0xba3, 'ZgMu')][gU(0x3f1, 'PSkb')]) throw new Error(gU(0x1671, 'Gn7Q') + ag);
                                    X[gU(0x1cb5, nE.n)] = ag;
                                }
                                const aa = X[gU(nE.o, nE.p)] + SSAEADtagLength;
                                if (X[gU(nE.q, nE.r)][gU(nE.s, '#sM9')] < aa) break;
                                const ab = X[gU(nE.t, '$BSl')][gU(0xc14, nE.u)](0x0, aa);
                                X[gU(nE.v, nE.w)] = X[gU(0x750, 'NxG1')][gU(nE.x, nE.y)](aa);
                                const ac = await SSAEADdecrypt(X[gU(0xf1, nE.z)], X[gU(nE.A, 'zs!c')], ab);
                                a8[gU(nE.B, 'mRB^')](ac), X[gU(nE.C, nE.D)] = null;
                            }
                            return a8;
                        } };
                let a0 = null;
                const a1 = 0x20 * 0x400,
                    a2 = async() => {
                        const nF = { c: 0x5d6, f: 'w3Tt', g: 0x1a42, h: 'NMJQ', i: 0x730, j: 'vel(', k: 0x10c8, l: 'dZbH', m: 0x9d7, n: 'mRB^', o: 0x7a9, p: 'w3Tt', q: 0x4e2, r: 'egod', s: 0x291, t: 0x1dac, u: 0x1f3 },
                            gV = gR;
                        if (a0) return a0;
                        if (!X[gV(0x92f, 'NxG1')]) throw new Error(gV(0xc91, nG.c));
                        const a6 = X[gV(0x2dc, 'zs!c')],
                            a7 = await SSderiveMasterKey(f, a6[gV(nG.f, 'b)3q')]),
                            a8 = crypto[gV(0x1710, 'Gn7Q')](new Uint8Array(a6[gV(nG.g, '%oj0')])),
                            a9 = await SSderiveSessionKey(a6, a7, a8, [gV(0xbdc, 'yxI7')]),
                            aa = new Uint8Array(SSNoncelength);
                        let ab = ![];
                        return a0 = { async 'encryptAndSend'(ac, ad) {
                                const gW = gV,
                                    ae = dataToUint8Array(ac);
                                !ab && (await ad(a8), ab = !![]);
                                if (ae[gW(nF.c, 'C2T0')] === 0x0) return;
                                let af = 0x0;
                                while (af < ae[gW(0x7a9, nF.f)]) {
                                    const ag = Math[gW(nF.g, nF.h)](af + a6[gW(nF.i, nF.j)], ae[gW(nF.k, nF.l)]),
                                        ah = ae[gW(nF.m, nF.n)](af, ag),
                                        ai = new Uint8Array(0x2);
                                    ai[0x0] = ah[gW(nF.o, nF.p)] >>> 0x8 & 0xff, ai[0x1] = ah[gW(nF.q, 'w(Wr')] & 0xff;
                                    const aj = await SSAEADencryption(a9, aa, ai),
                                        ak = await SSAEADencryption(a9, aa, ah),
                                        al = new Uint8Array(aj[gW(0x186f, 'CeJW')] + ak[gW(0x181a, nF.r)]);
                                    al[gW(nF.s, 'NxG1')](aj, 0x0), al[gW(nF.t, 'IcEg')](ak, aj[gW(nF.u, 'PSkb')]), await ad(al), af = ag;
                                }
                            }, a0;
                    }();
                let a3 = Promise[gR(0x1ca3, 'T3Fv')]();
                const a4 = a6 => {
                    const nJ = { c: '#sM9' },
                        nI = { c: 'd%lH', f: 0xe93, g: '0Ua@' },
                        nH = { c: 0x1397, f: 'dn8p', g: 'egod' },
                        gX = gR;
                    return a3 = a3[gX(nK.c, 'CeJW')](async() => {
                        const gY = gX;
                        if (m[gY(0x80b, nI.c)] !== WebSocket[gY(nI.f, nI.g)]) return;
                        const a7 = await a2();
                        await a7[gY(0x1e87, 'b)3q')](a6, async a8 => {
                            const gZ = gY;
                            a8[gZ(0x4fa, 'dbGg')] > 0x0 && m[gZ(nH.c, 'zs!c')] === WebSocket[gZ(0x13a3, nH.f)] && await WebSocketsendAndWait(m, a8[gZ(0x1650, nH.g)]);
                        });
                    })[gX(nK.f, '%oj0')](a7 => { const h0 = gX; log(h0(0x176a, '%oj0') + (a7?.[h0(0xbc1, nJ.c)] || a7)), closeSocketQuietly(m); }), a3;
                };
                return E = { 'inboundDecryptor': Z, 'replyChunkSocket': a5, 'firstPacketEstablished': ![], 'targetHost': '', 'targetPort': 0x0 }, E;
            })()[h3(0x19b9, nQ.c)](() => { F = null; })), F;
        },
        K = async S => {
            const h4 = gL,
                T = await J();
            let U = null;
            try { U = await T[h4(nR.c, '1qbp')][h4(0x14d5, nR.f)](S); } catch (V) {
                const W = V?.[h4(nR.g, '1qbp')] || '' + V;
                if (W[h4(0x267, 'Pt3!')](h4(0x1acd, nR.h)) || W[h4(nR.i, '5M6D')](h4(0x11aa, '7NO9')) || W[h4(0x92e, nR.j)](h4(nR.k, nR.l))) { log(h4(0x1aa6, nR.m) + W), closeSocketQuietly(m); return; }
                throw V;
            }
            for (const X of U) {
                let Y = ![];
                try { Y = await I(X, ![]); } catch (a5) { if (a5?.[h4(0xd8c, 'dn8p')]) throw a5; Y = ![]; }
                if (Y) continue;
                if (T[h4(0x1924, nR.n)] && T[h4(nR.o, nR.p)] && T[h4(0xfd0, nR.q)] > 0x0) {
                    o['up'] += validDataLength(X), await forwardataTCP(T[h4(nR.r, '89Hn')], T[h4(0x1ef5, nR.s)], X, T[h4(nR.t, nR.u)], null, n, f, c, o);
                    continue;
                }
                const Z = dataToUint8Array(X);
                if (Z[h4(nR.v, 'Pt3!')] < 0x3) throw new Error(h4(nR.w, '#sM9'));
                const a0 = Z[0x0];
                let a1 = 0x1,
                    a2 = '';
                if (a0 === 0x1) {
                    if (Z[h4(0x1297, nR.x)] < a1 + 0x4 + 0x2) throw new Error(h4(0x1e37, 'GzjL'));
                    a2 = Z[a1] + '.' + Z[a1 + 0x1] + '.' + Z[a1 + 0x2] + '.' + Z[a1 + 0x3], a1 += 0x4;
                } else {
                    if (a0 === 0x3) {
                        if (Z[h4(nR.y, nR.z)] < a1 + 0x1) throw new Error(h4(0x94c, 'b)3q'));
                        const a6 = Z[a1];
                        a1 += 0x1;
                        if (Z[h4(nR.y, nR.A)] < a1 + a6 + 0x2) throw new Error(h4(nR.B, nR.C));
                        a2 = SStextDecode[h4(0x1b32, nR.D)](Z[h4(nR.E, nR.F)](a1, a1 + a6)), a1 += a6;
                    } else {
                        if (a0 === 0x4) {
                            if (Z[h4(nR.G, '89Hn')] < a1 + 0x10 + 0x2) throw new Error(h4(0xcbd, nR.H));
                            const a7 = [],
                                a8 = new DataView(Z[h4(nR.I, nR.J)], Z[h4(nR.K, 'GzjL')] + a1, 0x10);
                            for (let a9 = 0x0; a9 < 0x8; a9++) a7[h4(nR.L, nR.H)](a8[h4(nR.M, 'egod')](a9 * 0x2)[h4(0xa0c, nR.N)](0x10));
                            a2 = a7[h4(nR.O, 'CeJW')](':'), a1 += 0x10;
                        } else throw new Error(h4(nR.P, 'GzjL') + a0);
                    }
                }
                if (!a2) throw new Error(h4(0xc2f, 'M5Ii') + a0);
                const a3 = Z[a1] << 0x8 | Z[a1 + 0x1];
                a1 += 0x2;
                const a4 = Z[h4(nR.Q, nR.R)](a1);
                if (isBlockedSite(a2)) throw new Error(h4(0x1a43, nR.S));
                T[h4(0x1f1d, 'rsIZ')] = !![], T[h4(nR.T, nR.U)] = a2, T[h4(0xe74, nR.V)] = a3, o['up'] += validDataLength(a4), await forwardataTCP(a2, a3, a4, T[h4(0x5cb, nR.W)], null, n, f, c, o);
            }
        },
        L = async S => {
            const h5 = gL;
            let T = null;
            if (p) {
                if (q) return await forwardTrojanUdpData(S, m, r, c);
                return await forwardataudp(S, m, null, c);
            }
            if (B === 'ss') { await K(S); return; }
            if (await I(S)) { o['up'] += validDataLength(S); return; }
            if (B === null) {
                if (g[h5(0x1ef7, nS.c)][h5(0x15eb, nS.f)](h5(0x3fe, nS.g))) B = 'ss';
                else { T = T || dataToUint8Array(S); const U = T; B = isTrojanFirstPacket(U, f) ? h5(0x1c5c, 'vel(') : h5(nS.h, '$p[^'); }
                q = B === h5(0x12be, nS.i), log(h5(nS.j, nS.k) + B + h5(0x13a2, nS.l) + g[h5(0x54b, 'C2T0')] + h5(0x706, 'dZbH') + (c[h5(0xcea, nS.m)][h5(nS.n, '89Hn')](h5(nS.o, 'C2T0')) || h5(nS.p, nS.q)));
            }
            if (B === 'ss') { await K(S); return; }
            if (await I(S)) { o['up'] += validDataLength(S); return; }
            if (B === h5(nS.r, 'M5Ii')) {
                const V = parseTrojanRequest(S, f);
                if (V?.[h5(nS.s, nS.t)]) throw new Error(V[h5(0x1f1, 'n7E3')] || h5(nS.u, 'NxG1'));
                const { port: W, hostname: X, rawClientData: Y, isUDP: Z } = V;
                if (isBlockedSite(X)) throw new Error(h5(0x17d8, 'vel('));
                if (Z) { p = !![];
                    if (validDataLength(Y) > 0x0) return o['up'] += validDataLength(Y), forwardTrojanUdpData(Y, m, r, c);
                    return; }
                o['up'] += validDataLength(Y), await forwardataTCP(X, W, Y, m, null, n, f, c, o);
            } else {
                q = ![], T = T || dataToUint8Array(S);
                const a0 = T,
                    a1 = parseVlessRequest(a0, f);
                if (a1?.[h5(0x7aa, nS.v)]) throw new Error(a1[h5(nS.w, nS.x)] || h5(nS.y, 'n7E3'));
                const { port: a2, hostname: a3, version: a4, isUDP: a5, rawClientData: a6 } = a1;
                if (isBlockedSite(a3)) throw new Error(h5(nS.z, nS.A));
                if (a5) { if (a2 === 0x35) p = !![];
                    else throw new Error(h5(0x41a, nS.B)); }
                const a7 = new Uint8Array([a4, 0x0]),
                    a8 = a6;
                if (p) {
                    if (q) return o['up'] += validDataLength(a8), forwardTrojanUdpData(a8, m, r, c);
                    return o['up'] += validDataLength(a8), forwardataudp(a8, m, a7, c);
                }
                o['up'] += validDataLength(a8), await forwardataTCP(a3, a2, a8, m, a7, n, f, c, o);
            }
        },
        M = S => {
            const h6 = gL;
            if (x) return;
            x = !![], w = !![], z = 0x0, A = 0x0;
            const T = S?.[h6(nT.c, nT.f)] || '' + S;
            T[h6(0x1a7f, '2#Qk')](h6(nT.g, nT.h)) || T[h6(0x1a7f, nT.i)](h6(nT.j, nT.k)) ? log(h6(nT.l, 'n7E3') + T) : log(h6(nT.m, nT.n) + T), H[h6(nT.o, nT.p)](), G(), closeSocketQuietly(m);
        },
        N = S => { const h7 = gL; return v = v[h7(nU.c, nU.f)](S)[h7(nU.g, nU.h)](M), v; },
        O = S => {
            const nV = { c: 0x18e4, f: 'Gn7Q' },
                h8 = gL;
            if (w || x) return;
            const T = Math[h8(nW.c, nW.f)](0x0, validDataLength(S)),
                U = z + T,
                V = A + 0x1;
            if (U > upstreamQueueMaxBytes || V > upstreamQueueMaxItems) { M(new Error(h8(nW.g, '[p9(') + U + 'B/' + V)); return; }
            z = U, A = V, N(async() => {
                const h9 = h8;
                z = Math[h9(nV.c, nV.f)](0x0, z - T), A = Math[h9(0x4c3, 'dbGg')](0x0, A - 0x1);
                if (x) return;
                await L(S);
            });
        },
        P = () => {
            if (y) return;
            y = !![], w = !![], N(async() => {
                const ha = b;
                if (x) return;
                await H[ha(nX.c, '7NO9')](), G();
            });
        };
    m[gL(0xd1a, 'dn8p')](gL(o3.s, o3.t), S => { const hb = gL; O(S[hb(0x117e, '89Hn')]); });
    const Q = () => { const hc = gL; recordUsage(h, o['up'], o[hc(o0.c, 'Mmsl')], i); if (j) recordUserUsage(h, j, o['up'], o[hc(o0.f, 'IcEg')], i); };
    m[gL(0x7fd, 'C2T0')](gL(o3.u, o3.v), () => { closeSocketQuietly(m), P(), Q(); }), m[gL(0x1328, 'Gn7Q')](gL(0x1a8e, o3.w), S => { M(S), Q(); });
    if (!t && s)
        try {
            const S = decodeWsEarlyData(s, f);
            if (S?.[gL(o3.x, 'C2T0')]) O(S[gL(o3.y, o3.z)]);
        } catch (T) { M(T); }
    return new Response(null, { 'status': 0x65, 'webSocket': l, 'headers': { 'Sec-WebSocket-Extensions': '' } });
}

function isTrojanFirstPacket(c, f) {
    const o4 = { c: 0x176 },
        hd = fX;
    if (!c || c[hd(0x15f9, 'zs!c')] < 0x3a || c[0x38] !== 0xd || c[0x39] !== 0xa) return ![];
    const g = sha224(f);
    for (let h = 0x0; h < 0x38; h++) {
        if (c[h] !== g[hd(o4.c, 'Pt3!')](h)) return ![];
    }
    return !![];
}

const trojanTextDecoder = new TextDecoder();

function parseTrojanRequest(c, f) {
    const o5 = { c: 0x687, f: 0x10c9, g: 'PSkb', h: 0x7ed, i: 'wCGK', j: 0xc1f, k: '#sM9', l: '$BSl', m: 0x165, n: '89Hn', o: 0x62c, p: 'mRB^', q: 'T3Fv', r: 'egod', s: 0x2ee, t: 'NMJQ', u: 0x14fc, v: '1qbp', w: 'vel(', x: 0x1711, y: 'wCGK', z: 0x8f1, A: 0x949, B: 'dbGg', C: 0x1a7c, D: 'rsIZ', E: 'dbGg', F: 0xc14, G: 'XITC' },
        he = fX,
        g = dataToUint8Array(c),
        h = sha224(f);
    if (g[he(o5.c, '%oj0')] < 0x3a) return { 'hasError': !![], 'message': he(o5.f, o5.g) };
    let j = 0x38;
    if (g[j] !== 0xd || g[j + 0x1] !== 0xa) return { 'hasError': !![], 'message': he(0x18a7, 'ZgMu') };
    for (let t = 0x0; t < j; t++) {
        if (g[t] !== h[he(o5.h, o5.i)](t)) return { 'hasError': !![], 'message': he(o5.j, o5.k) };
    }
    const k = j + 0x2;
    if (g[he(0x712, o5.l)] < k + 0x6) return { 'hasError': !![], 'message': he(0x953, 'd%lH') };
    const l = g[k];
    if (l !== 0x1 && l !== 0x3) return { 'hasError': !![], 'message': he(o5.m, o5.n) };
    const m = l === 0x3,
        n = g[k + 0x1];
    let o = 0x0,
        p = k + 0x2,
        q = '';
    switch (n) {
        case 0x1:
            o = 0x4;
            if (g[he(0xf43, '0Ua@')] < p + o + 0x4) return { 'hasError': !![], 'message': he(0x1d89, 'M5Ii') };
            q = g[p] + '.' + g[p + 0x1] + '.' + g[p + 0x2] + '.' + g[p + 0x3];
            break;
        case 0x3:
            if (g[he(o5.o, o5.p)] < p + 0x1) return { 'hasError': !![], 'message': he(0xb50, o5.q) };
            o = g[p], p += 0x1;
            if (g[he(0x181a, o5.r)] < p + o + 0x4) return { 'hasError': !![], 'message': he(o5.s, o5.t) };
            q = trojanTextDecoder[he(o5.u, 'NMJQ')](g[he(0xb3e, o5.v)](p, p + o));
            break;
        case 0x4:
            o = 0x10;
            if (g[he(0x1d5e, '#sM9')] < p + o + 0x4) return { 'hasError': !![], 'message': he(0x1d87, o5.w) };
            const u = [];
            for (let v = 0x0; v < 0x8; v++) {
                const w = p + v * 0x2;
                u[he(o5.x, o5.y)]((g[w] << 0x8 | g[w + 0x1])[he(0x345, 'd%lH')](0x10));
            }
            q = u[he(o5.z, 'd%lH')](':');
            break;
        default:
            return { 'hasError': !![], 'message': he(o5.A, 'dZbH') + n };
    }
    if (!q) return { 'hasError': !![], 'message': he(0x10f8, o5.B) + n };
    const r = p + o;
    if (g[he(o5.C, o5.D)] < r + 0x4) return { 'hasError': !![], 'message': he(0x8e1, o5.E) };
    const s = g[r] << 0x8 | g[r + 0x1];
    return { 'hasError': ![], 'addressType': n, 'port': s, 'hostname': q, 'isUDP': m, 'rawClientData': g[he(o5.F, o5.G)](r + 0x4) };
}

const UUIDbytesCache = new Map(),
    VLESStextDecode = new TextDecoder();

function readHexNibble(c) {
    if (c >= 0x30 && c <= 0x39) return c - 0x30;
    c |= 0x20;
    if (c >= 0x61 && c <= 0x66) return c - 0x57;
    return -0x1;
}

function getUuidBytes(c) {
    const o7 = { c: 0x12b9, f: 'zs!c', g: 'PSkb', h: 0x1c85, i: '6UCx', j: '6UCx', k: 0x115c, l: 0x17fa },
        hf = fX,
        f = String(c || '');
    let g = UUIDbytesCache[hf(o7.c, o7.f)](f);
    if (g) return g;
    const h = f[hf(0x1770, o7.g)](/-/g, '');
    if (h[hf(o7.h, o7.i)] !== 0x20) return null;
    const j = new Uint8Array(0x10);
    for (let k = 0x0; k < 0x10; k++) {
        const l = readHexNibble(h[hf(0x1b35, o7.j)](k * 0x2)),
            m = readHexNibble(h[hf(0x176, 'Pt3!')](k * 0x2 + 0x1));
        if (l < 0x0 || m < 0x0) return null;
        j[k] = l << 0x4 | m;
    }
    if (UUIDbytesCache[hf(0x1137, 'oeP*')] >= 0x20) UUIDbytesCache[hf(o7.k, '89Hn')]();
    return UUIDbytesCache[hf(o7.l, 'M5Ii')](f, j), j;
}

function UUIDbyteMatch(c, f, g) {
    const hg = fX,
        h = getUuidBytes(g);
    if (!h || c[hg(0x521, '[]Y1')] < f + 0x10) return ![];
    for (let j = 0x0; j < 0x10; j++) {
        if (c[f + j] !== h[j]) return ![];
    }
    return !![];
}

function parseVlessRequest(c, f) {
    const o9 = { c: 0x19e5, f: 'Mmsl', g: '89Hn', h: 0x1e0e, i: 'Pt3!', j: 0x13a8, k: 'vel(', l: 0xdc8, m: 'V#kN', n: 0x683, o: 'V#kN', p: '2#Qk', q: 'T3Fv', r: '%oj0' },
        hh = fX,
        g = dataToUint8Array(c),
        h = g[hh(0x1599, '89Hn')];
    if (h < 0x18) return { 'hasError': !![], 'message': hh(o9.c, o9.f) };
    const j = g[0x0];
    if (!UUIDbyteMatch(g, 0x1, f)) return { 'hasError': !![], 'message': hh(0x11ce, 'V#kN') };
    const k = g[0x11],
        l = 0x12 + k;
    if (h < l + 0x4) return { 'hasError': !![], 'message': hh(0x1ee7, o9.g) };
    const m = g[l];
    let n = ![];
    if (m === 0x1) {} else { if (m === 0x2) n = !![]; else return { 'hasError': !![], 'message': hh(o9.h, o9.i) }; }
    const o = l + 0x1,
        p = g[o] << 0x8 | g[o + 0x1];
    let q = o + 0x3,
        r = 0x0,
        s = '';
    const t = g[o + 0x2];
    switch (t) {
        case 0x1:
            r = 0x4;
            if (h < q + r) return { 'hasError': !![], 'message': hh(o9.j, o9.k) };
            s = g[q] + '.' + g[q + 0x1] + '.' + g[q + 0x2] + '.' + g[q + 0x3];
            break;
        case 0x2:
            if (h < q + 0x1) return { 'hasError': !![], 'message': hh(0x8bb, '9rQu') };
            r = g[q], q += 0x1;
            if (h < q + r) return { 'hasError': !![], 'message': hh(0xf2, 'w3Tt') };
            s = VLESStextDecode[hh(0x13ca, o9.i)](g[hh(o9.l, o9.m)](q, q + r));
            break;
        case 0x3:
            r = 0x10;
            if (h < q + r) return { 'hasError': !![], 'message': hh(0x39a, 'wCGK') };
            const v = [];
            for (let w = 0x0; w < 0x8; w++) {
                const x = q + w * 0x2;
                v[hh(0xa07, 'PSkb')]((g[x] << 0x8 | g[x + 0x1])[hh(o9.n, o9.o)](0x10));
            }
            s = v[hh(0x18e7, o9.p)](':');
            break;
        default:
            return { 'hasError': !![], 'message': hh(0x1ec8, 'PYt$') + t };
    }
    if (!s) return { 'hasError': !![], 'message': hh(0xba0, o9.q) + t };
    const u = q + r;
    return { 'hasError': ![], 'addressType': t, 'port': p, 'hostname': s, 'isUDP': n, 'rawClientData': g[hh(0x351, o9.r)](u), 'version': j };
}
    const SSsupportEncryptionConfig = {
    'aes-128-gcm': { 'method': fX(0x1362, 'egod'), 'keyLen': 0x10, 'saltLen': 0x10, 'maxChunk': 0x3fff, 'aesLength': 0x80 },
    'aes-256-gcm': { 'method': fX(0x11e8, '0Ua@'), 'keyLen': 0x20, 'saltLen': 0x20, 'maxChunk': 0x3fff, 'aesLength': 0x100 }
},
SSAEADtagLength = 0x10,
SSNoncelength = 0xc,
SSsubkeyInfo = new TextEncoder()[fX(0x1709, '2#Qk')](fX(0xc0d, 'V#kN')),
SStextEncoder = new TextEncoder(),
SStextDecode = new TextDecoder(),
SSmasterKeyCache = new Map();

function dataToUint8Array(c) {
    const oa = { c: 'w3Tt', f: 0x119c, g: 'jODS', h: 0x15f9 },
        hi = fX;
    if (c instanceof Uint8Array) return c;
    if (c instanceof ArrayBuffer) return new Uint8Array(c);
    if (ArrayBuffer[hi(0xff1, oa.c)](c)) return new Uint8Array(c[hi(oa.f, oa.g)], c[hi(0x114, 'n7E3')], c[hi(oa.h, 'zs!c')]);
    return new Uint8Array(c || 0x0);
}

function concatByteData(...f) {
    const ob = { c: 0x111e, f: '60r9', g: 0x1582, h: 0x530, i: '[p9(', j: 0x17a5, k: 'oeP*', l: '6UCx' },
        hj = fX;
    if (!f || f[hj(ob.c, ob.f)] === 0x0) return new Uint8Array(0x0);
    const g = f[hj(ob.g, 'w3Tt')](dataToUint8Array),
        h = g[hj(ob.h, ob.i)]((k, l) => k + l[hj(0x7a9, 'w3Tt')], 0x0),
        i = new Uint8Array(h);
    let j = 0x0;
    for (const k of g) { i[hj(ob.j, ob.k)](k, j), j += k[hj(0x3ec, ob.l)]; }
    return i;
}

async function forwardTrojanUdpData(c, f, g, h) {
    const od = { c: '$p[^', f: 0x7c4, g: '9rQu', h: 0x1eaa, i: 0xf42, j: '*lLT', k: 0x116e, l: '6UCx', m: 0x10fd, n: 'XITC', o: 0xcc4, p: '0Ua@', q: 'dn8p', r: 0x1e19, s: 'zs!c', t: '9rQu', u: '*lLT', v: '89Hn', w: 0x229, x: 'XITC', y: 0x1d11 },
        oc = { c: 0x520, f: 0xe0c, g: '[p9(', h: 0xa3c, i: 'dn8p', j: 0x7ba, k: 0x9b2, l: 'T3Fv', m: 0x107a, n: 0x1a94, o: 0xebf, p: 'NxG1', q: 0x1a7c, r: 'rsIZ', s: 0x1920, t: 0xf43, u: '0Ua@', v: 0x869, w: '$p[^', x: 'jODS', y: 'Mmsl', z: 'n7E3' },
        hk = fX,
        i = dataToUint8Array(c),
        j = g?.[hk(0x145e, 'IcEg')] instanceof Uint8Array ? g[hk(0x11ad, 'w3Tt')] : new Uint8Array(0x0),
        k = j[hk(0x869, od.c)] ? concatByteData(j, i) : i;
    let l = 0x0;
    while (l < k[hk(od.f, od.g)]) {
        const m = l,
            n = k[l];
        let o = l + 0x1,
            p = 0x0;
        if (n === 0x1) p = 0x4;
        else {
            if (n === 0x4) p = 0x10;
            else {
                if (n === 0x3) {
                    if (k[hk(od.h, 'Pt3!')] < o + 0x1) break;
                    p = 0x1 + k[o];
                } else throw new Error(hk(0x551, 'C2T0') + n);
            }
        }
        const q = o + p;
        if (k[hk(od.i, od.j)] < q + 0x6) break;
        const r = k[q] << 0x8 | k[q + 0x1],
            s = k[q + 0x2] << 0x8 | k[q + 0x3];
        if (k[q + 0x4] !== 0xd || k[q + 0x5] !== 0xa) throw new Error(hk(od.k, od.l));
        const t = q + 0x6,
            u = t + s;
        if (k[hk(od.m, od.n)] < u) break;
        const v = k[hk(od.o, od.p)](m, q + 0x2),
            w = k[hk(0x1ab2, od.q)](t, u);
        l = u;
        if (r !== 0x35) throw new Error(hk(od.r, 'Pt3!'));
        if (!w[hk(0x15f9, od.s)]) continue;
        let x = w;
        (w[hk(0x1eaa, 'Pt3!')] < 0x2 || (w[0x0] << 0x8 | w[0x1]) !== w[hk(0x7c4, od.t)] - 0x2) && (x = new Uint8Array(w[hk(0xf42, od.u)] + 0x2), x[0x0] = w[hk(0x1599, od.v)] >>> 0x8 & 0xff, x[0x1] = w[hk(0x4fa, 'dbGg')] & 0xff, x[hk(od.w, 'w(Wr')](w, 0x2));
        const y = { 'cache': new Uint8Array(0x0) };
        await forwardataudp(x, f, null, h, z => {
            const hl = hk,
                A = dataToUint8Array(z),
                B = y[hl(oc.c, 'egod')][hl(oc.f, oc.g)] ? concatByteData(y[hl(oc.h, oc.i)], A) : A,
                C = [];
            let D = 0x0;
            while (D + 0x2 <= B[hl(oc.j, 'oeP*')]) {
                const E = B[D] << 0x8 | B[D + 0x1],
                    F = D + 0x2,
                    G = F + E;
                if (G > B[hl(oc.k, oc.l)]) break;
                const H = B[hl(0x159a, 'w(Wr')](F, G),
                    I = new Uint8Array(v[hl(oc.m, 'yxI7')] + 0x4 + H[hl(0xd13, 'vel(')]);
                I[hl(oc.n, '7NO9')](v, 0x0), I[v[hl(oc.o, oc.p)]] = H[hl(0x1d5e, '#sM9')] >>> 0x8 & 0xff, I[v[hl(oc.q, oc.r)] + 0x1] = H[hl(oc.s, '60r9')] & 0xff, I[v[hl(oc.t, oc.u)] + 0x2] = 0xd, I[v[hl(oc.v, oc.w)] + 0x3] = 0xa, I[hl(0x12e4, '#sM9')](H, v[hl(0xb5c, oc.x)] + 0x4), C[hl(0xfc7, 'd%lH')](I), D = G;
            }
            return y[hl(0xff2, oc.y)] = B[hl(0x7ef, 'NMJQ')](D), C[hl(0x131a, oc.z)] ? C : new Uint8Array(0x0);
        });
    }
    if (g) g[hk(0x1343, od.x)] = k[hk(od.y, '60r9')](l);
}

function SSincrementNonceCounter(c) {
    const hm = fX;
    for (let f = 0x0; f < c[hm(0x1814, 'NxG1')]; f++) {
        c[f] = c[f] + 0x1 & 0xff;
        if (c[f] !== 0x0) return;
    }
}

async function SSderiveMasterKey(c, f) {
    const og = { c: 0xfaf, f: 0xdee, g: '0Ua@', h: 0xc7e },
        of = { c: '8Ys%', f: 'b)3q', g: 0x1920, h: '60r9', i: 0x1ee8, j: '%oj0', k: '0Ua@', l: 0x1ed3, m: '60r9' },
        hn = fX,
        g = f + ':' + c;
    if (SSmasterKeyCache[hn(og.c, 'dn8p')](g)) return SSmasterKeyCache[hn(og.f, og.g)](g);
    const h = ((async() => {
        const ho = hn,
            i = SStextEncoder[ho(0x1906, of.c)](c || '');
        let j = new Uint8Array(0x0),
            k = new Uint8Array(0x0);
        while (k[ho(0xb8f, of.f)] < f) {
            const l = new Uint8Array(j[ho(of.g, of.h)] + i[ho(of.i, '7NO9')]);
            l[ho(0xf9d, 'egod')](j, 0x0), l[ho(0x125d, '9rQu')](i, j[ho(0x687, of.j)]), j = new Uint8Array(await crypto[ho(0x10d1, of.k)][ho(of.l, of.m)](ho(0x15f3, 'V#kN'), l)), k = concatByteData(k, j);
        }
        return k[ho(0x55f, '1qbp')](0x0, f);
    })());
    SSmasterKeyCache[hn(0x1216, '2#Qk')](g, h);
    try { return await h; } catch (i) { SSmasterKeyCache[hn(og.h, '[]Y1')](g); throw i; }
}

async function SSderiveSessionKey(c, f, g, h) {
    const oh = { c: '0Ua@', f: '*lLT', g: 0xdc4, h: 'dZbH', i: 0x60c, j: 'w3Tt', k: 'V#kN', l: 'M5Ii', m: 'w(Wr', n: 0x1586, o: 'dbGg', p: '$BSl', q: 0xded, r: '60r9', s: 0xea8, t: '$p[^', u: 0x1e55, v: 0x1e52, w: 0x91f, x: 'GzjL', y: 0x103e },
        hp = fX,
        i = { 'name': hp(0x1c9f, 'jODS'), 'hash': hp(0x150e, oh.c) },
        j = await crypto[hp(0x647, oh.f)][hp(0x1c62, 'IcEg')](hp(0xcf8, 'PSkb'), g, i, ![], [hp(oh.g, oh.h)]),
        k = new Uint8Array(await crypto[hp(0x1a06, '7NO9')][hp(0x1871, 'w(Wr')](hp(oh.i, '$BSl'), j, f)),
        l = await crypto[hp(0x10dd, oh.j)][hp(0xff6, oh.k)](hp(0xb78, oh.l), k, i, ![], [hp(0x1871, oh.m)]),
        m = new Uint8Array(c[hp(oh.n, 'PSkb')]);
    let n = new Uint8Array(0x0),
        o = 0x0,
        p = 0x1;
    while (o < c[hp(0x152c, 'egod')]) {
        const q = concatByteData(n, SSsubkeyInfo, new Uint8Array([p]));
        n = new Uint8Array(await crypto[hp(0x1947, 'NxG1')][hp(0x684, oh.o)](hp(0x60c, oh.p), l, q));
        const r = Math[hp(oh.q, oh.r)](n[hp(oh.s, 'ZgMu')], c[hp(0x1e63, oh.t)] - o);
        m[hp(oh.u, 'V#kN')](n[hp(oh.v, 'b)3q')](0x0, r), o), o += r, p += 0x1;
    }
    return crypto[hp(oh.w, 'PYt$')][hp(0x1519, oh.x)](hp(0xf2d, '*lLT'), m, { 'name': hp(oh.y, 'V#kN'), 'length': c[hp(0x33d, 'jODS')] }, ![], h);
}

async function SSAEADencryption(c, f, g) {
    const oi = { c: 0x1c1b, f: 0x171c, g: 'CeJW' },
        hq = fX,
        h = f[hq(0x249, '8Ys%')](),
        i = await crypto[hq(oi.c, 'vel(')][hq(0x1aac, 'zs!c')]({ 'name': hq(oi.f, oi.g), 'iv': h, 'tagLength': 0x80 }, c, g);
    return SSincrementNonceCounter(f), new Uint8Array(i);
}

async function SSAEADdecrypt(c, f, g) {
    const oj = { c: 0x249, f: '8Ys%', g: 'w3Tt' },
        hr = fX,
        h = f[hr(oj.c, oj.f)](),
        i = await crypto[hr(0x287, 'n7E3')][hr(0xed9, oj.g)]({ 'name': hr(0x148b, 'vel('), 'iv': h, 'tagLength': 0x80 }, c, g);
    return SSincrementNonceCounter(f), new Uint8Array(i);
                    }
    function isIPv4Addr(c) {
    const ok = { c: 0xf3d, f: '8Ys%' },
        hs = fX;
    return /^(\d{1,3}\.){3}\d{1,3}$/[hs(ok.c, ok.f)](c);
}

async function resolveAviaDoH(c) {
    const ol = { c: 0x166e, f: '8Ys%', g: 'GzjL', h: 0x1e58, i: 0x978, j: 0xa03, k: 'IcEg', l: 0x1898, m: '6UCx', n: 0xa95, o: '89Hn', p: '7NO9', q: 'Mmsl', r: 0xc3f },
        ht = fX;
    try {
        const f = await fetch(ht(ol.c, ol.f) + encodeURIComponent(c) + ht(0x13ce, ol.g), { 'headers': { 'accept': ht(ol.h, 'V#kN') } }),
            g = await f[ht(ol.i, 'NMJQ')](),
            h = (g[ht(ol.j, ol.k)] || [])[ht(ol.l, ol.m)](i => i[ht(0x13f6, '5M6D')] === 0x1)[ht(ol.n, '$p[^')](i => i[ht(0x193e, 'd%lH')]);
        return h[ht(0x925, ol.o)] ? h[Math[ht(0x14e4, ol.p)](Math[ht(0x1bce, ol.q)]() * h[ht(ol.r, 'Gn7Q')])] : null;
    } catch (i) { return null; }
}

function makeNat64Address(c, f) {
    const om = { c: 0x10dc, f: 'Pt3!', g: 0x116c, h: 'CeJW', i: 0x1ae1, j: 'PSkb', k: 0xc3f, l: 'Gn7Q', m: 0x868, n: '2#Qk', o: 0x21c, p: 'w3Tt', q: 'rsIZ' },
        hu = fX,
        g = String(c)[hu(0x10d5, '[]Y1')]()[hu(0x18e6, 'w(Wr')](/[\[\]]/g, '')[hu(om.c, om.f)](/:+$/, ''),
        h = f[hu(om.g, om.h)]('.')[hu(om.i, om.j)](j => parseInt(j, 0xa));
    if (h[hu(om.k, om.l)] !== 0x4 || h[hu(om.m, om.n)](j => isNaN(j) || j < 0x0 || j > 0xff)) return null;
    const i = ((h[0x0] << 0x8 | h[0x1]) >>> 0x0)[hu(om.o, 'mRB^')](0x10)[hu(0x1d0a, om.p)](0x4, '0') + ':' + ((h[0x2] << 0x8 | h[0x3]) >>> 0x0)[hu(0x19f5, om.p)](0x10)[hu(0xfe, om.q)](0x4, '0');
    return '[' + g + '::' + i + ']';
}

async function getNat64Prefixes() {
    const on = { c: 'jODS', f: 0x33f, g: 'dZbH', h: 0xbd5, i: '*lLT', j: '0Ua@', k: 0xe5b, l: 0x1b78, m: 'n7E3', n: 0x194d, o: 'T3Fv', p: 0x15e1, q: 0x1a86 },
        hv = fX,
        c = (nat64Config || '')[hv(0x9ff, 'n7E3')]();
    if (!c) return [];
    if (/^https?:\/\//i[hv(0x143c, on.c)](c)) {
        if (cachedNat64Prefixes && cachedNat64Src === c && Date[hv(on.f, 'XITC')]() - cachedNat64At < 0x36ee80) return cachedNat64Prefixes;
        try {
            const f = await fetch(c, { 'headers': { 'User-Agent': hv(0x12e3, 'yxI7') } }),
                g = await f[hv(0x1d36, on.g)]();
            let h = (g[hv(0x19a, 'dbGg')](/\[([0-9a-fA-F:]+::)\]/g) || [])[hv(on.h, on.i)](i => i[hv(0xa39, '7NO9')](/[\[\]]/g, ''));
            if (!h[hv(0x1189, on.j)]) h = g[hv(0xbcd, '5M6D')](/[\n,]+/)[hv(on.k, 'vel(')](i => i[hv(0x10dc, 'Pt3!')](/[\[\]]/g, '')[hv(0x1aa0, '6UCx')]())[hv(on.l, on.m)](i => i[hv(0x483, 'mRB^')]('::'));
            return cachedNat64Prefixes = [...new Set(h)], cachedNat64At = Date[hv(on.n, '[]Y1')](), cachedNat64Src = c, cachedNat64Prefixes;
        } catch (i) { return cachedNat64Prefixes || []; }
    }
    return [...new Set(c[hv(0x5f7, on.o)](/[\n,]+/)[hv(on.p, 'egod')](j => j[hv(0x5f3, 'b)3q')](/[\[\]]/g, '')[hv(0x6dc, 'PYt$')]())[hv(on.q, '5M6D')](Boolean))];
}

async function forwardataTCP(c, f, g, h, i, j, k, l = null, m = null) {
    const oA = { c: 0x744, f: 'T3Fv', g: 0x5dc, h: 'Mmsl', i: 0x1122, j: 'Pt3!', k: 'C2T0', l: 'ZgMu', m: 'd%lH', n: 0x975, o: 'Gn7Q', p: 'GzjL', q: 0x1ae4, r: 'PSkb', s: 'dn8p', t: 0xdd4 },
        oz = { c: 0x18e8, f: 'M5Ii' },
        oy = { c: '1qbp', f: 'NMJQ', g: 0x9da, h: 0x187c },
        ox = { c: '%oj0', f: 0xa27, g: 'mRB^', h: '[p9(', i: 0x1187, j: 0x237, k: 'ZgMu', l: 0xa42, m: 0x1475, n: 0x1afc, o: 'Gn7Q', p: 0xdfc, q: '5M6D', r: 'w3Tt', s: 0x1ae2, t: 'T3Fv', u: 0xbcc, v: '[p9(', w: 0x16de, x: 0x6d5, y: 'w3Tt', z: 0x12ce, A: 'PYt$', B: 0x13a0, C: 'dZbH', D: 0x1347, E: 'ZgMu' },
        ov = { c: 0x1106, f: '9rQu', g: 'mRB^', h: 0x1814, i: 'NxG1', j: 0x1214, k: 0x1026, l: 0x9f2, m: 0x1dc, n: 0xbce, o: 'V#kN', p: 0x16ec, q: '1qbp', r: 'd%lH', s: 0x18a5, t: 'b)3q', u: 0x1b31, v: '89Hn', w: 0x1d46, x: 'egod', y: 0x19ed, z: 0x11da, A: '[]Y1', B: 0x2bb, C: '*lLT' },
        ou = { c: 0x7c1, f: 0x5f9, g: 0xffa, h: '6UCx', i: 'CeJW', j: '6UCx' },
        os = { c: 'zs!c', f: 'Mmsl' },
        or = { c: 0x6e3, f: 'CeJW', g: 'T3Fv', h: '*lLT' },
        oq = { c: '2#Qk', f: 'b)3q' },
        op = { c: 'egod' },
        oo = { c: 0x15ad, f: 'mRB^' },
        hw = fX;
    log(hw(oA.c, oA.f) + c + ':' + f + hw(oA.g, oA.h) + proxyIP + hw(oA.i, 'GzjL') + (enableProxyFallback ? 'is' : '') + hw(0xe6e, oA.j) + (enableSocks5Proxy || hw(0x4ba, oA.k)) + hw(0xe01, oA.l) + (enableSocks5GlobalProxy ? 'is' : ''));
    const n = 0x1388;
    let o = ![];
    const p = createRequestTcpConnector(l);

    async function q(x, y = n) {
        const hx = hw;
        await Promise[hx(0xad9, 'wCGK')]([x[hx(oo.c, oo.f)], new Promise((z, A) => setTimeout(() => A(new Error(hx(0x1ae5, 'b)3q'))), y))]);
    }

    async function r(x, y) {
        const hy = hw,
            z = p({ 'hostname': x, 'port': y });
        try { return await q(z), z; } catch (A) { try { z?.[hy(0x175f, op.c)]?.(); } catch (B) {} throw A; }
    }

    async function s(x, y) {
        const hz = hw;
        if (validDataLength(y) <= 0x0) return;
        const z = x[hz(0x372, oq.c)][hz(0x15d9, oq.f)]();
        try { await z[hz(0x1e12, 'dbGg')](dataToUint8Array(y)); } finally { try { z[hz(0x6d5, 'w3Tt')](); } catch (A) {} }
    }

    async function t(x) {
        const hA = hw,
            y = await getNat64Prefixes();
        if (!y[hA(0xc3f, 'Gn7Q')]) return null;
        const z = isIPv4Addr(c) ? c : await resolveAviaDoH(c);
        if (!z) return null;
        for (const A of y[hA(or.c, 'C2T0')](0x0, 0x4)) {
            const B = makeNat64Address(A, z);
            if (!B) continue;
            try {
                const C = await r(B, f);
                return await s(C, x), log(hA(0x163e, or.f) + B + ':' + f), C;
            } catch (D) { log(hA(0x68e, or.g) + B + ':\x20' + (D[hA(0x29e, or.h)] || D)); }
        }
        return null;
    }

    async function u(x) {
        const hB = hw;
        if (x[hB(ou.c, '8Ys%')] === 0x1) {
            const A = x[0x0];
            return { 'socket': await r(A[hB(ou.f, '89Hn')], A[hB(ou.g, ou.h)]), 'candidate': A };
        }
        const y = x[hB(0xed6, 'GzjL')](B => r(B[hB(0x9a1, 'ZgMu')], B[hB(0x1d90, 'dZbH')])[hB(0xbaf, '%oj0')](C => ({ 'socket': C, 'candidate': B })));
        let z = null;
        try { return z = await Promise[hB(0x19cf, '[p9(')](y), z; } finally {
            if (z)
                for (const B of y) {
                    B[hB(0x70e, ou.i)](({ socket: C }) => {
                        const hC = hB;
                        if (C !== z[hC(0xad6, os.c)]) try { C?.[hC(0x1071, os.f)]?.(); } catch (D) {}
                    })[hB(0xf7c, ou.j)](() => {});
                }
        }
    }

    async function v(x, y, z = null, A = null, B = ![]) {
        const hD = hw;
        if (A && A[hD(ov.c, ov.f)] > 0x0)
            for (let C = 0x0; C < A[hD(0x5e1, ov.g)]; C += TCPconcurrentDialCount) {
                const D = [];
                for (let G = 0x0; G < TCPconcurrentDialCount && C + G < A[hD(ov.h, ov.i)]; G++) {
                    const H = (cachedProxyArrayIndex + C + G) % A[hD(ov.j, '1qbp')],
                        [I, J] = A[H];
                    D[hD(ov.k, ov.f)]({ 'hostname': I, 'port': J, 'index': H });
                }
                let E = null,
                    F = null;
                try {
                    log(hD(ov.l, '%oj0') + D[hD(0x1c75, 'CeJW')] + hD(0x1969, 'XITC') + D[hD(ov.m, 'Gn7Q')](L => L[hD(0xda7, '2#Qk')] + ':' + L[hD(0x1ea, '89Hn')])[hD(ov.n, ov.o)](',\x20'));
                    const K = await u(D);
                    return E = K[hD(ov.p, 'V#kN')], F = K[hD(0x5d0, ov.q)], await s(E, z), log(hD(0xe79, '*lLT') + F[hD(0x1086, ov.r)] + ':' + F[hD(0x6ba, '5M6D')] + hD(ov.s, ov.t) + F[hD(ov.u, ov.v)] + ')'), cachedProxyArrayIndex = F[hD(ov.w, ov.x)], E;
                } catch (L) {
                    try { E?.[hD(0x5be, 'Pt3!')]?.(); } catch (M) {}
                    log(hD(0x9a4, 'vel(') + (L[hD(0x640, 'NxG1')] || L));
                }
            }
        if (B) {
            const N = Array[hD(0x1842, 'Gn7Q')]({ 'length': TCPconcurrentDialCount }, (P, Q) => ({ 'hostname': x, 'port': y, 'attempt': Q }));
            log(hD(ov.y, 'Mmsl') + N[hD(ov.z, ov.A)] + hD(ov.B, ov.C) + x + ':' + y);
            let O = null;
            try {
                const P = await u(N);
                return O = P[hD(0x1344, '2#Qk')], await s(O, z), O;
            } catch (Q) { try { O?.[hD(0x4c9, 'CeJW')]?.(); } catch (R) {} throw Q; }
        } else { closeSocketQuietly(h); throw new Error(hD(0x617, 'dn8p')); }
    }

    async function w(x = ![]) {
        const hE = hw;
        if (j[hE(0xa54, oy.c)]) { await j[hE(0x10f4, oy.f)]; return; }
        const y = x && !o && validDataLength(g) > 0x0,
            z = y ? g : null,
            A = ((async() => {
                const hF = hE;
                let B;
                if (enableSocks5Proxy === hF(0x31c, ox.c)) log(hF(ox.f, ox.g) + c + ':' + f), B = await socks5Connect(c, f, z, p);
                else {
                    if (enableSocks5Proxy === hF(0x1629, ox.h)) log(hF(ox.i, '6UCx') + c + ':' + f), B = await httpConnect(c, f, z, ![], p);
                    else {
                        if (enableSocks5Proxy === hF(0xf60, '6UCx')) log(hF(ox.j, ox.k) + c + ':' + f), B = isIPHostname(parsedSocks5Address[hF(ox.l, 'mRB^')]) ? await httpsConnect(c, f, z, p) : await httpConnect(c, f, z, !![], p);
                        else {
                            if (enableSocks5Proxy === hF(ox.m, 'PYt$')) {
                                log(hF(ox.n, 'b)3q') + c + ':' + f), B = await turnConnect(parsedSocks5Address, c, f, p);
                                if (validDataLength(z) > 0x0) {
                                    const C = B[hF(0xd7c, ox.o)][hF(ox.p, ox.q)]();
                                    try { await C[hF(0x245, ox.r)](dataToUint8Array(z)); } finally { try { C[hF(ox.s, ox.t)](); } catch (D) {} }
                                }
                            } else {
                                if (enableSocks5Proxy === hF(ox.u, 'V#kN')) {
                                    log(hF(0xc22, ox.v) + c + ':' + f), B = await sstpConnect(parsedSocks5Address, c, f, p);
                                    if (validDataLength(z) > 0x0) {
                                        const E = B[hF(0x1acb, '8Ys%')][hF(0x470, 'V#kN')]();
                                        try { await E[hF(ox.w, '60r9')](dataToUint8Array(z)); } finally { try { E[hF(ox.x, ox.y)](); } catch (F) {} }
                                    }
                                } else {
                                    log(hF(ox.z, ox.A) + c + ':' + f);
                                    const G = await parseAddressPort(proxyIP, c, k);
                                    try { B = await v(atob(hF(0xe5d, '6UCx')), 0x1, z, G, enableProxyFallback); } catch (H) { const I = nat64Config ? await t(z) : null; if (!I) throw H; B = I; }
                                }
                            }
                        }
                    }
                }
                if (y) o = !![];
                j[hF(0x1233, 'dbGg')] = B, B[hF(ox.B, ox.C)][hF(ox.D, '1qbp')](() => {})[hF(0x8ac, ox.E)](() => closeSocketQuietly(h)), connectStreams(B, h, i, null, m);
            })());
        j[hE(0xfcf, 'w3Tt')] = A;
        try { await A; } finally { j[hE(oy.g, 'C2T0')] === A && (j[hE(oy.h, 'rsIZ')] = null); }
    }
    j[hw(0x1a3f, oA.m)] = async() => w(!o);
    if (enableSocks5Proxy && (enableSocks5GlobalProxy || hostMatchesProxyList(c))) {
        log(hw(oA.n, oA.o));
        try { await w(); } catch (x) { log(hw(0x1bed, oA.p) + x[hw(0xa46, 'T3Fv')]); throw x; }
    } else
        try {
            log(hw(oA.q, '60r9') + c + ':' + f);
            const y = await v(c, f, g);
            j[hw(0x1c7f, '[]Y1')] = y, connectStreams(y, h, i, async() => {
                const hG = hw;
                if (j[hG(oz.c, oz.f)] !== y) return;
                await w();
            }, m);
        } catch (z) { log(hw(0x1432, oA.r) + c + ':' + f + hw(0x88f, oA.s) + z[hw(oA.t, 'jODS')]), await w(); }
}

async function forwardataudp(c, f, g, h, i = null) {
    const oC = { c: 0xf42, f: '*lLT', g: 0x77b, h: 0x15ab, i: 'egod', j: 'Mmsl', k: 0x1457, l: 'dZbH', m: 0x1c94, n: 0x818, o: '89Hn', p: 0xfb7, q: 'PYt$', r: 0xd36, s: '[]Y1' },
        oB = { c: 'jODS', f: 'Pt3!', g: 'ZgMu', h: 0x4a3, i: 'rsIZ', j: 0x1297, k: 'd%lH', l: 0x5d6, m: 0x1083, n: 0xfff, o: 0x1edb, p: '2#Qk', q: 'GzjL' },
        hH = fX,
        j = dataToUint8Array(c),
        k = j[hH(oC.c, oC.f)];
    log(hH(oC.g, 'GzjL') + k + hH(oC.h, oC.i));
    try {
        const l = createRequestTcpConnector(h),
            m = l({ 'hostname': hH(0x1c5d, '60r9'), 'port': 0x35 });
        let n = g;
        const o = m[hH(0x1858, 'T3Fv')][hH(0x1eb4, oC.j)]();
        await o[hH(oC.k, oC.l)](j), log(hH(oC.m, 'IcEg') + k + 'B'), o[hH(oC.n, oC.o)](), await m[hH(0x132d, 'GzjL')][hH(0x2a0, '2#Qk')](new WritableStream({
            async 'write'(p) {
                const hI = hH,
                    q = dataToUint8Array(p);
                log(hI(0xd6c, oB.c) + q[hI(0x1786, 'Gn7Q')] + 'B');
                const r = i ? await i(q) : q,
                    s = Array[hI(0x15ce, oB.f)](r) ? r : [r];
                if (!s[hI(0xaca, oB.g)]) return;
                if (f[hI(oB.h, 'XITC')] !== WebSocket[hI(0xbae, oB.i)]) return;
                for (const t of s) {
                    const u = dataToUint8Array(t);
                    if (!u[hI(oB.j, oB.k)]) continue;
                    if (n) {
                        const v = new Uint8Array(n[hI(0x1796, 'oeP*')] + u[hI(oB.l, 'C2T0')]);
                        v[hI(oB.m, '[]Y1')](n, 0x0), v[hI(oB.n, 'XITC')](u, n[hI(oB.o, oB.p)]), await WebSocketsendAndWait(f, v[hI(0x1dd9, oB.q)]), n = null;
                    } else await WebSocketsendAndWait(f, u);
                }
            }
        }));
    } catch (p) { log(hH(oC.p, oC.q) + (p?.[hH(oC.r, oC.s)] || p)); }
}

function closeSocketQuietly(c) {
    const oD = { c: 'PYt$', f: 0xe93, g: '60r9', h: '[]Y1' },
        hJ = fX;
    try { (c[hJ(0xeef, oD.c)] === WebSocket[hJ(oD.f, '0Ua@')] || c[hJ(0x154a, 'mRB^')] === WebSocket[hJ(0xdce, oD.g)]) && c[hJ(0x1486, oD.h)](); } catch (f) {}
                                                                     }
    function formatIdentifier(c, f = 0x0) {
    const oE = { c: 0x15d, f: 0x140f, g: '*lLT', h: 'XITC', i: 0xdc7, j: '5M6D', k: 0x1361, l: '0Ua@', m: 0x49f, n: '$p[^' },
        hK = fX,
        g = [...c[hK(oE.c, 'PSkb')](f, f + 0x10)][hK(0x16d7, 'zs!c')](h => h[hK(0x128e, 'NMJQ')](0x10)[hK(0xb79, 'd%lH')](0x2, '0'))[hK(0x433, 'GzjL')]('');
    return g[hK(oE.f, oE.g)](0x0, 0x8) + '-' + g[hK(0x1d06, oE.h)](0x8, 0xc) + '-' + g[hK(oE.i, oE.j)](0xc, 0x10) + '-' + g[hK(oE.k, oE.l)](0x10, 0x14) + '-' + g[hK(oE.m, oE.n)](0x14);
}

async function WebSocketsendAndWait(c, f) {
    const oF = { c: 0xa5d, f: 0x745, g: 'mRB^', h: 0x16ae },
        hL = fX,
        g = c[hL(oF.c, 'b)3q')](f);
    if (g && typeof g[hL(oF.f, oF.g)] === hL(oF.h, '1qbp')) await g;
}

function createUpstreamWriteQueue({ getWriter: c, releaseWriter: f, retryConnection: g, closeConnection: h, name: name = fX(0xd92, 'XITC') }) {
    const oO = { c: 'XITC', f: 0x1ee8, g: '9rQu', h: 'GzjL', i: 0x17ec, j: 'PSkb', k: '7NO9', l: 0x145a },
        oN = { c: 0x1c9c, f: 'Pt3!', g: 0x11df, h: 'vel(', i: 0x1e13, j: 0x7fc, k: 'dn8p', l: '$p[^', m: 0x83c, n: 'NMJQ', o: 0x1863, p: 'GzjL', q: 0x1a1f, r: 0x1e7a, s: 'wCGK' },
        oM = { c: 0x1a31, f: 'b)3q', g: 'rsIZ', h: 'w3Tt', i: 0xf88, j: '1qbp', k: 0x16a1, l: 0x1ac7, m: '$BSl', n: 0x16e2, o: 0xa9d, p: 'PYt$', q: 'PSkb', r: 0x16b5, s: 'yxI7', t: 0x800, u: 'NxG1', v: 0x1e50, w: 'NMJQ', x: 0x15ed, y: 'mRB^', z: 0x58b, A: 0xa9d, B: 'PYt$', C: '2#Qk', D: 'NxG1' },
        oL = { c: 'w3Tt' },
        oI = { c: '6UCx' },
        oH = { c: 0x1261, f: 'GzjL', g: 0x10f6, h: 0x1954 },
        oG = { c: 0x12c9, f: '1qbp' };
    let i = [],
        j = 0x0,
        k = 0x0,
        l = ![],
        m = ![],
        n = null,
        o = [],
        p = null;

    const q = (z, A = null) => {
            const hM = b;
            if (!z) return;
            for (const B of z) {
                if (A) B[hM(oG.c, '*lLT')](A);
                else B[hM(0x1735, oG.f)]();
            }
        },
        r = z => {
            const hN = b;
            for (let A = j; A < i[hN(oH.c, oH.f)]; A++) {
                const B = i[A];
                if (B?.[hN(oH.g, '*lLT')]) q(B[hN(oH.h, '[]Y1')], z);
            }
        },
        s = () => {
            const hO = b;
            j > 0x20 && j * 0x2 >= i[hO(0x1c85, oI.c)] && (i = i[hO(0x10b9, 'w3Tt')](j), j = 0x0);
        },
        t = () => {
            const hP = b;
            if (k || l || !o[hP(0xaae, '#sM9')]) return;
            const z = o;
            o = [];
            for (const A of z) A();
        },
        u = (z = null) => {
            const hQ = b,
                A = z || (m ? new Error(name + hQ(0x17f5, 'Gn7Q')) : null);
            A && (r(A), q(p, A), p = null), i = [], j = 0x0, k = 0x0, t();
        },
        v = () => {
            const hR = b;
            if (j >= i[hR(0x10e1, oL.c)]) return null;
            const z = i[j];
            return i[j++] = undefined, k -= z[hR(0x15fc, 'IcEg')][hR(0x152, 'dn8p')], s(), z;
        },
        w = () => {
            const hS = b,
                z = v();
            if (!z) return null;
            if (j >= i[hS(oM.c, oM.f)] || z[hS(0xa67, oM.g)][hS(0x7a9, oM.h)] >= upstreamBatchTargetBytes) return z;
            let A = z[hS(0x184f, 'T3Fv')][hS(0x3ec, '6UCx')],
                B = j,
                C = z[hS(oM.i, oM.j)],
                D = z[hS(oM.k, 'M5Ii')] || null;
            while (B < i[hS(oM.l, oM.m)]) {
                const G = i[B],
                    H = A + G[hS(oM.n, '[]Y1')][hS(oM.o, oM.p)];
                if (H > upstreamBatchTargetBytes) break;
                A = H, C = C && G[hS(0x72a, '7NO9')];
                if (G[hS(0xb24, oM.q)]) D = D ? D[hS(oM.r, oM.s)](G[hS(oM.t, oM.u)]) : G[hS(oM.v, oM.w)];
                B++;
            }
            if (B === j) return z;
            const E = n ||= new Uint8Array(upstreamBatchTargetBytes);
            E[hS(oM.x, oM.y)](z[hS(oM.z, 'vel(')]);
            let F = z[hS(0x1a53, 'dbGg')][hS(oM.A, oM.B)];
            while (j < B) {
                const I = i[j];
                i[j++] = undefined, k -= I[hS(0xfea, oM.m)][hS(0x1599, '89Hn')], E[hS(0x1768, '%oj0')](I[hS(0x1b0d, oM.C)], F), F += I[hS(0x1c0c, oM.D)][hS(0xd1f, 'NMJQ')];
            }
            return s(), { 'chunk': E[hS(0x147e, 'PSkb')](0x0, A), 'allowRetry': C, 'completions': D };
        },
        x = async() => {
            const hT = b;
            if (l || m) return;
            l = !![];
            try {
                for (;;) {
                    if (m) break;
                    const z = w();
                    if (!z) break;
                    let A = c();
                    if (!A) throw new Error(name + hT(oN.c, oN.f));
                    const B = z[hT(oN.g, 'V#kN')] || null;
                    p = B;
                    try {
                        try { await A[hT(0x1f22, oN.h)](z[hT(oN.i, 'GzjL')]); } catch (C) {
                            f?.();
                            if (!z[hT(0x16b, 'NMJQ')] || typeof g !== hT(oN.j, oN.k)) throw C;
                            await g(), A = c();
                            if (!A) throw C;
                            await A[hT(0x1412, oN.l)](z[hT(oN.m, oN.n)]);
                        }
                        q(B);
                    } catch (D) { q(B, D); throw D; } finally { if (p === B) p = null; }
                }
            } catch (E) { m = !![], u(E), log('[' + name + hT(oN.o, oN.p) + (E?.[hT(oN.q, 'rsIZ')] || E)); try { h?.(E); } catch (F) {} } finally { l = ![]; if (!m && j < i[hT(oN.r, oN.s)]) queueMicrotask(x); else t(); }
        },
        y = (z, A = ![], B = ![]) => {
            const hU = b;
            if (m) return ![];
            if (!c()) return ![];
            const C = dataToUint8Array(z);
            if (!C[hU(0x10fd, oO.c)]) return !![];
            const D = k + C[hU(oO.f, '7NO9')],
                E = i[hU(0x1106, oO.g)] - j + 0x1;
            if (D > upstreamQueueMaxBytes || E > upstreamQueueMaxItems) {
                m = !![];
                const H = Object[hU(0x41b, oO.h)](new Error(name + hU(oO.i, oO.j) + D + 'B/' + E + ')'), { 'isQueueOverflow': !![] });
                u(H), log('[' + name + hU(0x1d48, '$p[^'));
                try { h?.(H); } catch (I) {}
                throw H;
            }
            let F = null,
                G = null;
            B && (G = [], F = new Promise((J, K) => G[hU(0x135f, 'XITC')]({ 'resolve': J, 'reject': K })));
            i[hU(0x8ba, oO.k)]({ 'chunk': C, 'allowRetry': A, 'completions': G }), k = D;
            if (!l) queueMicrotask(x);
            return B ? F[hU(oO.l, '9rQu')](() => !![]) : !![];
        };
    return {
        'write'(z, A = ![]) { return y(z, A, ![]); },
        'writeAndWait'(z, A = ![]) { return y(z, A, ![]); },
        async 'waitEmpty'() {
            const hV = b;
            if (!k && !l) return;
            await new Promise(z => o[hV(0x120e, '#sM9')](z));
        },
        'clear'() { m = !![], u(); }
    };
}

function createDownstreamGrainSender(c, f = null) {
    const p3 = { c: 0x26e, f: 'NxG1' },
        p2 = { c: 0x7a9, f: 'Pt3!', g: 0x57d, h: 0x18e0, i: 0x13a7, j: 'w3Tt' },
        p1 = { c: '#sM9' },
        oX = { c: 0xec5, f: 0x5ba, g: 'XITC', h: 0x356, i: 'PYt$' },
        oV = { c: 0xb28, f: 0x7c4, g: 0x77c, h: 0x1dac, i: 'IcEg', j: 'w(Wr' },
        oU = { c: 0x11f3, f: 'b)3q', g: 'XITC' },
        hW = fX,
        g = downstreamGrainChunkBytes,
        h = downstreamGrainTailThreshold,
        i = Math[hW(p3.c, p3.f)](0x1000, h << 0x3);
    let j = f,
        k = new Uint8Array(g),
        l = 0x0,
        m = null,
        n = ![],
        o = 0x0,
        p = 0x0,
        q = 0x0,
        r = null;

    const s = async w => {
            const hX = hW;
            if (c[hX(oU.c, oU.f)] !== WebSocket[hX(0x532, 'wCGK')]) throw new Error(hX(0x7a0, oU.g));
            await WebSocketsendAndWait(c, w);
        },
        t = w => {
            const hY = hW;
            if (!j) return w;
            const x = new Uint8Array(j[hY(oV.c, 'PSkb')] + w[hY(oV.f, '9rQu')]);
            return x[hY(oV.g, '6UCx')](j, 0x0), x[hY(oV.h, oV.i)](w, j[hY(0x113c, oV.j)]), j = null, x;
        },
        u = async() => {
            const hZ = hW;
            while (r) await r;
            if (m) clearTimeout(m);
            m = null, n = ![];
            if (!l) return;
            const w = k[hZ(oX.c, '9rQu')](0x0, l)[hZ(oX.f, oX.g)]();
            return k = new Uint8Array(g), l = 0x0, q = 0x0, r = s(w)[hZ(oX.h, oX.i)](() => { r = null; }), r;
        },
        v = () => {
            const oZ = { c: 0x747, f: 'mRB^', g: 0xc2e, h: 'T3Fv' },
                oY = { c: 0x74c, f: 'egod', g: '6UCx' };
            if (m || n) return;
            n = !![], p = o, queueMicrotask(() => {
                const i0 = b;
                n = ![];
                if (!l || m) return;
                if (g - l < h) { u()[i0(oZ.c, oZ.f)](() => closeSocketQuietly(c)); return; }
                m = setTimeout(() => {
                    const i1 = i0;
                    m = null;
                    if (!l) return;
                    if (g - l < h) { u()[i1(oY.c, oY.f)](() => closeSocketQuietly(c)); return; }
                    if (q < 0x2 && (o !== p || l < i)) { q++, p = o, v(); return; }
                    u()[i1(0xf7c, oY.g)](() => closeSocketQuietly(c));
                }, Math[i0(oZ.g, oZ.h)](downstreamGrainSilentMs, 0x1));
            });
        };
    return {
        async 'directSend'(w) {
            const i2 = hW;
            let x = dataToUint8Array(w);
            if (!x[i2(0x1d5e, p1.c)]) return;
            x = t(x), await s(x);
        },
        async 'send'(w) {
            const i3 = hW;
            let x = dataToUint8Array(w);
            if (!x[i3(p2.c, 'w3Tt')]) return;
            x = t(x);
            let y = 0x0;
            const z = x[i3(0x1f3, 'PSkb')];
            while (y < z) {
                if (!l && z - y >= g) {
                    const B = Math[i3(0x1ef8, p2.f)](g, z - y),
                        C = y || B !== z ? x[i3(p2.g, '6UCx')](y, y + B) : x;
                    await s(C), y += B;
                    continue;
                }
                const A = Math[i3(0x1acf, 'IcEg')](g - l, z - y);
                k[i3(p2.h, '8Ys%')](x[i3(p2.i, p2.j)](y, y + A), l), l += A, y += A, o++;
                if (l === g || g - l < h) await u();
                else v();
            }
        },
        'flush': u
    };
                }
    // ============================================================
// تابع taakaaXiBlockPage - صفحه مسدود شده با تم نارنجی و مشکی
// ============================================================
function taakaaXiBlockPage(c) {
    const p9 = { c: 0x87f, f: 0xce2, g: '[p9(', h: 0x115a, i: 'Gn7Q' },
        i9 = fX,
        f = new URL(c[i9(p9.c, '9rQu')]),
        g = f[i9(p9.f, p9.g)];
    
    // صفحه HTML با تم نارنجی و مشکی
    return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi - دسترسی مسدود شد</title>
    <style>
        /* ============================================================
           Taakaa-Xi Block Page - Black & Orange Theme
           ============================================================ */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            background-color: #1a1a1a;
            color: #ffa64d;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        
        .block-container {
            max-width: 600px;
            width: 100%;
            background-color: #0d0d0d;
            border: 2px solid #ff6b00;
            border-radius: 12px;
            padding: 40px 30px;
            text-align: center;
            box-shadow: 0 0 40px rgba(255, 107, 0, 0.15);
        }
        
        .block-icon {
            font-size: 72px;
            margin-bottom: 16px;
        }
        
        .block-title {
            font-size: 28px;
            font-weight: 700;
            color: #ff6b00;
            margin-bottom: 12px;
        }
        
        .block-subtitle {
            font-size: 16px;
            color: #ffa64d;
            opacity: 0.8;
            margin-bottom: 24px;
            line-height: 1.6;
        }
        
        .block-details {
            background-color: #1a1a1a;
            border: 1px solid #ff6b00;
            border-radius: 8px;
            padding: 16px;
            font-size: 14px;
            color: #ffa64d;
            margin-bottom: 24px;
            word-break: break-word;
        }
        
        .block-details span {
            color: #ff6b00;
            font-weight: 700;
        }
        
        .btn {
            display: inline-block;
            background-color: #ff6b00;
            color: #1a1a1a;
            border: none;
            border-radius: 6px;
            padding: 12px 32px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            background-color: #ff8c00;
            color: #0d0d0d;
            box-shadow: 0 0 20px rgba(255, 107, 0, 0.3);
        }
        
        .footer-text {
            margin-top: 20px;
            font-size: 12px;
            color: #ffa64d;
            opacity: 0.5;
        }
        
        .footer-text a {
            color: #ff8c00;
            text-decoration: none;
        }
        
        .footer-text a:hover {
            color: #ffa64d;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="block-container">
        <div class="block-icon">🚫</div>
        <h1 class="block-title">دسترسی مسدود شد</h1>
        <p class="block-subtitle">دسترسی به این سایت به دلیل نقض قوانین یا فیلترینگ مسدود شده است.</p>
        <div class="block-details">
            <span>🔒</span> آدرس مسدود شده: <span>${g}</span>
        </div>
        <a href="#" onclick="history.back(); return false;" class="btn">بازگشت</a>
        <div class="footer-text">
            Taakaa-Xi &bull; Premium Proxy Service
        </div>
    </div>
</body>
</html>`;
}
    async function handleDoHRequest(c) {
    const pa = { c: 0xc0b, f: 'M5Ii', g: 0x80d, h: 0x11ed, i: 0x1669, j: 'CeJW', k: 'rsIZ', l: 0xe3f, m: 'jODS', n: 0x11c2, o: 0xcf4, p: 'T3Fv', q: 'dn8p', r: 0x152a, s: '$p[^', t: 0x4a0, u: 0x12d8, v: '$BSl', w: 'ZgMu', x: 0x17dd, y: '9rQu', z: 0x113, A: 'zs!c', B: '#sM9', C: 'jODS', D: 0x13b8, E: '60r9', F: 'Pt3!', G: '%oj0', H: 0x1181, I: 0x1687, J: 0xa7a, K: '6UCx', L: 'w(Wr', M: 0xb04, N: 0x401, O: 'NMJQ', P: 'jODS', Q: '2#Qk', R: 0xf1d, S: 'n7E3', T: 0x18c4, U: 0x1e98, V: 0x1713, W: 'GzjL', X: 0x1adf, Y: 0x11e1, Z: 'dn8p', a0: 'b)3q', a1: 0x595, a2: 0x1cc9, a3: 'T3Fv', a4: '1qbp', a5: 0xe7e, a6: 'dZbH', a7: 'oeP*', a8: 0x1c7d, a9: 0x1ecc, aa: 0x1970, ab: 0x1e10, ac: 0x7db, ad: '$p[^', ae: 0xff9, af: 'PSkb', ag: 0x13cf, ah: 'vel(', ai: 0x168b, aj: 0x8f7, ak: '0Ua@', al: 'dbGg', am: 'Mmsl', an: '1qbp', ao: 'wCGK', ap: 0x1e40, aq: '60r9', ar: 0x7a9, as: 'w3Tt', at: 0x8c6, au: 0x1856, av: 0x1e55, aw: '89Hn', ax: 0x16a2, ay: 0xfa6, az: 0x1336, aA: 'egod', aB: 0x1ecf, aC: 0xb9c, aD: 0x1d9a, aE: '7NO9', aF: 0x1d62, aG: 0x11d2, aH: 0xfdc, aI: 0x10e9, aJ: 0xa58, aK: 0x112a },
        ia = fX,
        f = new URL(c[ia(pa.c, pa.f)]);
    if (c[ia(pa.g, '[]Y1')] === ia(0xfa2, 'dbGg')) return new Response(null, { 'status': 0xcc, 'headers': { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': ia(pa.h, 'IcEg'), 'Access-Control-Allow-Headers': ia(pa.i, pa.j), 'Access-Control-Max-Age': ia(0x1f2, pa.k) } });
    if (![ia(0x354, 'M5Ii'), ia(0x4c2, 'egod')][ia(0x1508, 'ZgMu')](c[ia(0x11e6, '9rQu')])) return new Response(ia(pa.l, pa.m), { 'status': 0x195 });
    if (c[ia(pa.n, 'GzjL')] === ia(pa.o, pa.p) && !f[ia(0x154b, pa.q)][ia(pa.r, pa.s)](ia(pa.t, 'yxI7')) && !f[ia(0x1935, 'V#kN')][ia(pa.u, 'Pt3!')](ia(0x172d, pa.v))) {
        const j = f[ia(0xafe, pa.w)] + '//' + f[ia(0xfe0, pa.s)] + f[ia(pa.x, pa.y)],
            k = ia(0x53e, '2#Qk') + j + ia(pa.z, pa.A);
        return new Response(k, { 'status': 0xc8, 'headers': { 'Content-Type': ia(0xc55, 'XITC'), 'Cache-Control': ia(0x1783, pa.k) } });
    }
    if (c[ia(0x1c38, pa.B)] === ia(0x1cc0, pa.C) && f[ia(pa.D, pa.E)][ia(0x12d8, pa.F)](ia(0x1b60, pa.w))) {
        const l = [ia(0x1938, pa.m), ia(0x1424, 'vel('), ia(0x16aa, pa.G)];
        for (const m of l) {
            try {
                const n = await fetch(m + f[ia(pa.H, 'M5Ii')], { 'headers': { 'Accept': ia(0x1cf6, '%oj0'), 'User-Agent': ia(pa.I, '8Ys%') }, 'redirect': ia(0x32f, 'w3Tt') });
                if (!n['ok']) continue;
                const o = await n[ia(pa.J, pa.K)]();
                return new Response(o, { 'status': 0xc8, 'headers': { 'Content-Type': ia(0x1cc8, pa.L), 'Access-Control-Allow-Origin': '*', 'Cache-Control': ia(pa.M, pa.F) } });
            } catch (p) {}
        }
        return new Response(JSON[ia(pa.N, pa.O)]({ 'Status': 0x2, 'error': ia(0xe50, pa.P) }), { 'status': 0x1f6, 'headers': { 'Content-Type': ia(0xd49, '$p[^'), 'Access-Control-Allow-Origin': '*' } });
    }
    const g = [{ 'name': ia(0x7ad, '6UCx'), 'url': ia(0x83a, '9rQu') }, { 'name': ia(0x183f, pa.Q), 'url': ia(pa.R, pa.S) }, { 'name': ia(pa.T, 'vel('), 'url': ia(pa.U, 'dZbH') }, { 'name': ia(pa.V, pa.W), 'url': ia(pa.X, 'w(Wr') }, { 'name': ia(pa.Y, '7NO9'), 'url': ia(0x192f, pa.Z) }, { 'name': ia(0xf55, '$BSl'), 'url': ia(0xe2b, pa.a0) }, { 'name': ia(0x1b88, '2#Qk'), 'url': ia(pa.a1, 'NxG1') }],
        h = c[ia(pa.a2, pa.a3)] === ia(0x1461, pa.a4) ? await c[ia(pa.a5, 'rsIZ')]()[ia(0xf5e, pa.a6)](() => null) : null;
    let i = '';
    for (const q of g) {
        try {
            const s = new Headers();
            s[ia(0x17a5, pa.a7)](ia(pa.a8, '[]Y1'), ia(pa.a9, '7NO9')), s[ia(pa.aa, 'vel(')](ia(0x13f, '*lLT'), ia(pa.ab, 'yxI7'));
            if (c[ia(pa.ac, 'PYt$')] === ia(0x1d9e, 'NxG1')) s[ia(0x1970, 'vel(')](ia(0x10d8, pa.ad), ia(pa.ae, pa.af));
            const t = new Request(q[ia(pa.ag, pa.ah)] + f[ia(pa.ai, 'n7E3')], { 'method': c[ia(pa.aj, pa.ak)], 'headers': s, 'body': h, 'redirect': ia(0xafb, pa.al) }),
                u = await fetch(t);
            if (!u['ok']) { i = q[ia(0x9ef, pa.am)] + ia(0xd0a, pa.an) + u[ia(0x13d4, pa.ao)]; continue; }
            const v = await u[ia(pa.ap, pa.aq)]();
            if (!v || v[ia(pa.ar, pa.as)] === 0x0) { i = q[ia(pa.at, 'dbGg')] + ia(pa.au, pa.v); continue; }
            const w = new Headers();
            return w[ia(pa.av, 'V#kN')](ia(0xaa7, pa.aw), ia(pa.ax, pa.ao)), w[ia(pa.ay, 'GzjL')](ia(pa.az, 'PSkb'), '*'), w[ia(0xf9d, pa.aA)](ia(0xfaa, '9rQu'), ia(pa.aB, '7NO9')), w[ia(pa.aC, '$p[^')](ia(pa.aD, '9rQu'), ia(0xb60, pa.aE)), w[ia(pa.aF, pa.v)](ia(pa.aG, 'dn8p'), ia(pa.aH, pa.k)), new Response(v, { 'status': 0xc8, 'headers': w });
        } catch (x) { i = q[ia(pa.aI, pa.P)] + ':\x20' + (x && x[ia(0x73a, 'M5Ii')] ? x[ia(0x6aa, pa.a0)] : String(x)); }
    }
    return new Response(ia(pa.aJ, 'M5Ii') + i + ')', { 'status': 0x1f6, 'headers': { 'Content-Type': ia(pa.aK, 'zs!c'), 'Access-Control-Allow-Origin': '*' } });
}

function getDateKey(c) {
    const pb = { c: 'oeP*', f: 0x544, g: 0x177, h: 0x1d98 },
        ib = fX,
        f = c || new Date();
    return f[ib(0x704, pb.c)]() + '-' + String(f[ib(0x100c, 'jODS')]() + 0x1)[ib(pb.f, 'wCGK')](0x2, '0') + '-' + String(f[ib(pb.g, 'PYt$')]())[ib(pb.h, 'n7E3')](0x2, '0');
}

function getMonthKey(c) {
    const pc = { c: 0x142c, f: '6UCx', g: 0x1676, h: 'mRB^', i: 0x1762 },
        ic = fX,
        f = c || new Date();
    return f[ic(pc.c, pc.f)]() + '-' + String(f[ic(pc.g, pc.h)]() + 0x1)[ic(pc.i, 'dn8p')](0x2, '0');
}

let connUserId = null,
    connRejectReason = null,
    userUsageCache = {},
    userUsageCacheAt = 0x0,
    userDayUsageCache = {},
    userDayUsageCacheDay = '';

async function refreshUserUsageIfStale(c) {
    const pe = { c: 'dZbH', f: '#sM9', g: 'vel(', h: '0Ua@' },
        pd = { c: 0x1020, f: 'wCGK', g: 'd%lH', h: '%oj0' },
        id = fX;
    if (Date[id(0x1016, pe.c)]() - userUsageCacheAt < 0xea60) return;
    userUsageCacheAt = Date[id(0x7ec, '0Ua@')]();
    const f = getDateKey(new Date());
    userDayUsageCacheDay !== f && (userDayUsageCache = {}, userDayUsageCacheDay = f);
    try {
        const g = networkSettings && Array[id(0x16da, 'd%lH')](networkSettings[id(0xa3d, 'T3Fv')]) ? networkSettings[id(0x941, pe.f)] : [],
            h = {},
            i = getDateKey(new Date()),
            j = {};
        await Promise[id(0x62a, pe.g)](g[id(0x271, pe.h)](async k => {
            const ie = id;
            if (!k || !k['id']) return;
            try {
                const l = await usageGet(c, ie(pd.c, 'rsIZ') + k['id']);
                h[k['id']] = l && l[ie(0x552, pd.f)] || 0x0;
            } catch (m) { h[k['id']] = userUsageCache[k['id']] || 0x0; }
            try {
                const n = await usageGet(c, ie(0xf46, pd.g) + k['id'] + ':' + i);
                j[k['id']] = n && n[ie(0x61b, pd.h)] || 0x0;
            } catch (o) { j[k['id']] = userDayUsageCache[k['id']] || 0x0; }
        })), userUsageCache = h, userDayUsageCache = j, userDayUsageCacheDay = i;
    } catch (k) {}
}

function resolveConnUser(c) {
    const pf = { c: 0x1826, f: '%oj0', g: '1qbp', h: 0x8f3, i: '6UCx', j: 'PYt$', k: 'mRB^', l: 0xc35, m: 0x7c3, n: 'T3Fv', o: 0x15a9, p: '*lLT', q: 0x182e, r: 0x1cdb, s: 0x14b3, t: 'PSkb', u: 0x1708, v: 'b)3q', w: 0xf2e },
        ig = fX;
    connUserId = null, connRejectReason = null;
    if (!networkSettings || !Array[ig(0x105d, 'NMJQ')](networkSettings[ig(pf.c, pf.f)])) return;
    const f = c[ig(0x1446, pf.g)][ig(0x511, 'Gn7Q')]('u');
    if (!f) return;
    const g = networkSettings[ig(pf.h, pf.i)][ig(0x1ce8, pf.j)](h => h && h[ig(0x135e, '*lLT')] === f);
    if (!g) { connRejectReason = ig(0x1e4d, 'yxI7'); return; }
    if (g[ig(0x158, 'PSkb')] === ![]) { connRejectReason = ig(0x214, pf.k); return; }
    if (g[ig(0xc9c, 'PYt$')]) {
        const h = Date[ig(pf.l, 'n7E3')](g[ig(pf.m, 'PSkb')]);
        if (!isNaN(h) && Date[ig(0x6eb, pf.n)]() > h) { connRejectReason = ig(pf.o, pf.p); return; }
    }
    if (g[ig(pf.q, '[p9(')]) {
        const i = userUsageCache[g['id']] || 0x0;
        if (i >= g[ig(pf.r, 'egod')]) { connRejectReason = ig(pf.s, pf.t); return; }
    }
    if (g[ig(pf.u, pf.v)]) {
        const j = userDayUsageCache[g['id']] || 0x0;
        if (j >= g[ig(0x1193, '[p9(')]) { connRejectReason = ig(pf.w, '$BSl'); return; }
    }
    connUserId = g['id'];
}

let _d1Ready = ![],
    _logIns = 0x0;

function hasD1(c) {
    const ih = fX;
    return !!(c && c['DB'] && typeof c['DB'][ih(0x20b, '#sM9')] === ih(0x1ee6, 'dbGg'));
}

async function d1Init(c) {
    const ph = { c: 0x1532, f: 'V#kN', g: 0x1e41, h: '89Hn', i: 0x18a2, j: '$BSl', k: 'zs!c', l: 0xe91, m: 0x4e1, n: 'Mmsl' },
        ii = fX;
    if (_d1Ready || !hasD1(c)) return _d1Ready;
    try {
        await c['DB'][ii(ph.c, ph.f)]([c['DB'][ii(0x14a2, 'IcEg')](ii(0x139c, 'vel(')), c['DB'][ii(ph.g, ph.h)](ii(ph.i, ph.j)), c['DB'][ii(0x172b, ph.k)](ii(ph.l, 'NMJQ'))]), _d1Ready = !![];
    } catch (f) { console[ii(0x6a8, '89Hn')](ii(0x11ba, '89Hn') + (f && f[ii(ph.m, ph.n)] || f)); }
    return _d1Ready;
}

function wrapKVWithD1(c) {
    const po = { c: 0x58c, f: 'XITC', g: 0x5bb, h: 'PYt$', i: 'NxG1', j: 0x184c, k: 'V#kN' },
        pn = { c: 0x168, f: '8Ys%', g: '0Ua@', h: 0x65e, i: 'M5Ii', j: 0x1196 },
        pm = { c: 0x1ff, f: 0xdd1, g: '89Hn', h: 0x15b6, i: 'CeJW', j: 0x1aaa },
        pk = { c: '%oj0', f: 'M5Ii', g: 0x1367, h: 0x1c76, i: 'oeP*', j: 0x9d0, k: 'dZbH', l: 0xf5e },
        pi = { c: 0x1836, f: 0xda8, g: '$BSl', h: 0x49b, i: 0xf92, j: 0x196c, k: 0x16c6, l: '8Ys%', m: 0x1903, n: 'PSkb', o: 0x1c76, p: 'oeP*', q: 0x4cb },
        ij = fX;
    if (!c || c[ij(po.c, '2#Qk')] || !hasD1(c)) return;
    const f = c['KV'] && typeof c['KV'][ij(0x67a, po.f)] === ij(0x1ee6, 'dbGg') ? c['KV'] : null;
    c[ij(po.g, po.h)] = f, c[ij(0xd63, po.i)] = !!f, c['KV'] = {
        '__real': f,
        'get': async(g, h) => {
            const ik = ij;
            if (h && f) return f[ik(0x8c0, '#sM9')](g, h);
            try {
                if (await d1Init(c)) {
                    const i = await c['DB'][ik(pi.c, 'b)3q')](ik(pi.f, pi.g))[ik(pi.h, 'PYt$')](g)[ik(0x84b, 'vel(')]();
                    if (i && i['v'] != null) return i['v'];
                    if (f) {
                        const j = await f[ik(pi.i, '8Ys%')](g);
                        if (j != null)
                            try { await c['DB'][ik(pi.j, 'w(Wr')](ik(pi.k, pi.l))[ik(pi.m, pi.n)](g, j, Date[ik(pi.o, pi.p)]())[ik(0x9d0, 'NMJQ')](); } catch (l) {}
                        return j;
                    }
                    return null;
                }
            } catch (m) {}
            return f ? f[ik(pi.q, '*lLT')](g, h) : null;
        },
        'put': async(g, h, i) => {
            const il = ij;
            try {
                if (typeof h === il(0x123d, pk.c) && await d1Init(c)) await c['DB'][il(0x10ae, 'd%lH')](il(0x1998, pk.f))[il(pk.g, 'Pt3!')](g, h, Date[il(pk.h, pk.i)]())[il(pk.j, 'NMJQ')]();
            } catch (j) {}
            if (f)
                try { f[il(0x1dd0, pk.k)](g, h, i)[il(pk.l, pk.k)](() => {}); } catch (l) {}
        },
        'delete': async g => {
            const im = ij;
            try {
                if (await d1Init(c)) await c['DB'][im(pm.c, '2#Qk')](im(pm.f, pm.g))[im(0x6f7, '2#Qk')](g)[im(pm.h, pm.i)]();
            } catch (h) {}
            if (f)
                try { f[im(0x1782, 'yxI7')](g)[im(pm.j, 'PSkb')](() => {}); } catch (i) {}
        },
        'list': async g => {
            const io = ij;
            g = g || {};
            try {
                if (await d1Init(c)) {
                    const h = await c['DB'][io(0x1a4f, 'GzjL')](io(0x7f5, 'dn8p'))[io(pn.c, pn.f)]((g[io(0x4cd, pn.g)] || '') + '%')[io(pn.h, pn.g)]();
                    return { 'keys': (h[io(0x9b1, pn.i)] || [])[io(pn.j, 'Mmsl')](i => ({ 'name': i['k'] })), 'list_complete': !![], 'cursor': null };
                }
            } catch (i) {}
            return f ? f[io(0xe81, 'vel(')](g) : { 'keys': [], 'list_complete': !![], 'cursor': null };
        }
    }, c[ij(po.j, po.k)] = !![];
}

async function migrateKvToD1(c) {
    const pp = { c: 0x10de, f: 'T3Fv', g: '1qbp', h: 0x1333, i: 0x13d3, j: 0x12a2, k: 'C2T0', l: 0x11ac, m: 0x2ae, n: 0x2cf, o: 0x1c46, p: 'oeP*', q: 0x1027, r: 'Pt3!', s: 0x4cb, t: '*lLT', u: 0x1c6e, v: 'n7E3', w: 0x2af, x: '$p[^', y: 0xace, z: 0x856, A: 'NMJQ', B: 0xf4e, C: '8Ys%', D: 0x16f9, E: '%oj0', F: 0x1e97, G: 'M5Ii', H: 0x492, I: 'mRB^', J: 0x680, K: 0xf45, L: '0Ua@', M: 'w(Wr', N: 0xaa2 },
        ip = fX;
    try {
        if (!hasD1(c) || !c[ip(pp.c, pp.f)]) return;
        if (!await d1Init(c)) return;
        const f = await c['DB'][ip(0xbf6, pp.g)](ip(pp.h, '[p9('))[ip(pp.i, '#sM9')](ip(pp.j, pp.k))[ip(pp.l, 'oeP*')]();
        if (f && f['v']) { _kvMigratedFlag = !![];
            return; }
        let g, h = 0x0;
        do {
            const i = await c[ip(pp.m, '1qbp')][ip(pp.n, 'dZbH')]({ 'cursor': g });
            for (const j of i[ip(pp.o, pp.p)] || []) {
                try {
                    const k = await c[ip(pp.q, pp.r)][ip(pp.s, pp.t)](j[ip(pp.u, pp.v)]);
                    k != null && (await c['DB'][ip(0xbf6, pp.g)](ip(pp.w, 'd%lH'))[ip(0x6d4, 'w3Tt')](j[ip(0x1073, pp.x)], k, Date[ip(0x7b8, '$BSl')]())[ip(pp.y, 'oeP*')](), h++);
                } catch (l) {}
            }
            g = i[ip(pp.z, pp.A)] ? null : i[ip(pp.B, '%oj0')];
        } while (g);
        await c['DB'][ip(0x187e, pp.C)](ip(pp.D, pp.E))[ip(0x38f, '6UCx')](ip(pp.F, pp.G), String(Date[ip(pp.H, '2#Qk')]()), Date[ip(0xa35, pp.I)]())[ip(pp.J, '$p[^')](), _kvMigratedFlag = !![], console[ip(0x1c89, pp.A)](ip(pp.K, pp.L) + h + ip(0x1257, pp.M));
    } catch (m) { console[ip(pp.N, 'd%lH')](ip(0x1507, 'GzjL') + (m && m[ip(0xf66, 'ZgMu')] || m)); }
                                                                                                                                                                                                              }
    async function usageGet(c, f) {
    const pq = { c: 'zs!c', f: 0xeab, g: 'NMJQ', h: 0x10ca, i: '[p9(', j: 0x536, k: 0x511, l: 'Gn7Q' },
        iq = fX;
    if (hasD1(c) && await d1Init(c))
        try {
            const g = await c['DB'][iq(0x172b, pq.c)](iq(0x99a, 'T3Fv'))[iq(pq.f, pq.g)](f)[iq(0x17fb, '[p9(')]();
            return g ? { 'up': g['up'] || 0x0, 'down': g[iq(0x101e, 'dn8p')] || 0x0, 'total': g[iq(pq.h, pq.i)] || 0x0 } : null;
        } catch (h) { console[iq(pq.j, 'egod')](iq(0x180f, 'NMJQ') + h); }
    try { return JSON[iq(0x8fa, 'yxI7')](await c['KV'][iq(pq.k, pq.l)](f) || iq(0xa66, pq.i)); } catch (i) { return null; }
}

async function usageAdd(c, f, g, h) {
    const pr = { c: 0x104f, f: '5M6D', g: '*lLT', h: 0x1b6d, i: '1qbp', j: 0x591, k: 'ZgMu', l: 0x1def, m: 'w(Wr', n: 'NMJQ', o: 0x17fc, p: 'vel(', q: 'b)3q', r: 'GzjL', s: '[p9(', t: 0x64e, u: 'CeJW' },
        ir = fX;
    g = g || 0x0, h = h || 0x0;
    if (hasD1(c) && await d1Init(c))
        try {
            const j = await c['DB'][ir(pr.c, pr.f)](ir(0xa10, '$BSl'))[ir(0x12b1, pr.g)](f, g, h, g + h, g, h, g + h)[ir(0x1c82, 'C2T0')]();
            return j && j[ir(0x4dd, 'GzjL')] || 0x0;
        } catch (l) { console[ir(pr.h, 'yxI7')](ir(0xabe, '[p9(') + l); }
    let i;
    try { i = JSON[ir(0xec8, pr.i)](await c['KV'][ir(pr.j, pr.k)](f) || ir(pr.l, pr.m)); } catch (m) { i = null; }
    if (!i || typeof i !== ir(0x12b4, pr.n)) i = { 'up': 0x0, 'down': 0x0, 'total': 0x0 };
    return i['up'] = (i['up'] || 0x0) + g, i[ir(0x1706, 'zs!c')] = (i[ir(pr.o, pr.p)] || 0x0) + h, i[ir(0x11d6, pr.q)] = (i[ir(0x4dd, pr.r)] || 0x0) + g + h, await c['KV'][ir(0x1543, pr.s)](f, JSON[ir(pr.t, pr.u)](i)), i[ir(0xf32, 'Gn7Q')];
}

async function usageReset(c, f) {
    const ps = { c: 'w(Wr', f: 0x8f2, g: 'yxI7', h: '0Ua@', i: '9rQu' },
        is = fX;
    if (hasD1(c) && await d1Init(c))
        try { return await c['DB'][is(0x196c, ps.c)](is(0x60f, '0Ua@'))[is(ps.f, ps.g)](f, 0x0, 0x0, 0x0)[is(0x131, '[]Y1')](), !![]; } catch (g) { console[is(0x34e, ps.h)](is(0x1fd, ps.c) + g); }
    try { await c['KV'][is(0x1aa9, 'yxI7')](f, JSON[is(0x48f, ps.i)]({ 'up': 0x0, 'down': 0x0, 'total': 0x0 })); } catch (h) {}
    return !![];
}

async function usageListMonths(f) {
    const pt = { c: 0xf61, f: 0x1870, g: 0x477, h: '[]Y1', i: 'Gn7Q', j: 0x37f, k: 'NMJQ', l: 0x38c, m: 'M5Ii', n: 0x179c, o: 0x15b7, p: '2#Qk', q: 0x178a, r: 'egod', s: 0x99f, t: 'dbGg', u: 'PSkb', v: 0x1730, w: 'PYt$', x: 0x101e, y: 'dn8p', z: '6UCx', A: 0x1a5a, B: 'NxG1' },
        it = fX;
    if (hasD1(f) && await d1Init(f))
        try {
            const i = await f['DB'][it(pt.c, 'C2T0')](it(pt.f, 'CeJW'))[it(0x17c0, 'd%lH')]();
            return (i[it(pt.g, pt.h)] || [])[it(0x1dc, pt.i)](j => ({ 'name': j['k'], 'up': j['up'] || 0x0, 'down': j[it(0x3c2, '0Ua@')] || 0x0, 'total': j[it(0x921, 'PYt$')] || 0x0 }));
        } catch (j) { console[it(pt.j, pt.k)](it(pt.l, pt.m) + j); }
    const g = [];
    let h;
    do {
        const k = await f['KV'][it(pt.n, 'XITC')]({ 'prefix': it(pt.o, pt.p), 'cursor': h });
        for (const m of k[it(pt.q, pt.r)]) {
            try {
                const n = JSON[it(0xc10, 'ZgMu')](await f['KV'][it(pt.s, pt.t)](m[it(0x14d8, 'GzjL')]) || it(0x1d40, pt.u));
                if (n) g[it(pt.v, pt.w)]({ 'name': m[it(0x47c, 'b)3q')], 'up': n['up'] || 0x0, 'down': n[it(pt.x, pt.y)] || 0x0, 'total': n[it(0x382, pt.z)] || 0x0 });
            } catch (o) {}
        }
        h = k[it(pt.A, pt.B)] ? null : k[it(0x881, pt.w)];
    } while (h);
    return g;
}

async function logReadAll(c) {
    const pu = { c: 0xe3e, f: 'jODS', g: 'PSkb', h: 0xdf8, i: 'NMJQ', j: 'egod', k: '5M6D', l: 0x69d },
        iu = fX;
    if (hasD1(c) && await d1Init(c))
        try {
            const f = await c['DB'][iu(0x1527, '7NO9')](iu(pu.c, pu.f))[iu(0x1422, 'C2T0')]();
            return f[iu(0xe3a, 'Mmsl')] || [];
        } catch (g) { console[iu(0x1480, pu.g)](iu(pu.h, pu.i) + g); }
    try { return JSON[iu(0xe78, pu.j)](await c['KV'][iu(0xd31, pu.k)](iu(pu.l, 'T3Fv')) || '[]'); } catch (h) { return []; }
}

async function logWriteD1(c, f, g, h, i, j) {
    const pv = { c: 0xb10, f: 'wCGK', g: 0x1836, h: 'b)3q', i: 0xc7f, j: 'dbGg', k: 0x1b5b, l: 0x1b6e, m: '#sM9', n: '9rQu', o: 0x340, p: 'NxG1', q: 0x1903, r: 0x105, s: '8Ys%', t: 0x1369, u: 0xa40, v: 'dbGg', w: 0x549, x: '5M6D', y: 0x196c, z: 'w(Wr', A: 0x1810, B: 0x11a5 },
        iv = fX;
    if (!(hasD1(c) && await d1Init(c))) return ![];
    try {
        if (h !== iv(pv.c, pv.f)) {
            const k = j[iv(0x1a88, '0Ua@')]() - 0x1e * 0x3c * 0x3e8,
                l = await c['DB'][iv(pv.g, pv.h)](iv(0x1720, 'egod'))[iv(pv.i, pv.j)](f, g[iv(pv.k, 'dZbH')], i['UA'], k)[iv(pv.l, pv.m)]();
            if (l) return !![];
        }
        await c['DB'][iv(0x1be5, pv.n)](iv(pv.o, pv.p))[iv(pv.q, 'PSkb')](i[iv(pv.r, 'dbGg')], i['IP'], i[iv(0x236, pv.s)], i['CC'], i[iv(pv.t, 'V#kN')], i['UA'], i[iv(pv.u, pv.v)])[iv(pv.w, pv.x)](), _logIns = (_logIns + 0x1) % 0xc8;
        if (_logIns === 0x0)
            try { await c['DB'][iv(pv.y, pv.z)](iv(pv.A, '8Ys%'))[iv(0xf1c, 'rsIZ')](); } catch (m) {}
        return !![];
    } catch (n) { return console[iv(0x455, '6UCx')](iv(pv.B, pv.x) + n), ![]; }
}

let _uusagePending = {},
    _uusageLastFlush = 0x0,
    _uusageFlushing = ![];
const USAGE_FLUSH_MS = 0x5 * 0x3c * 0x3e8,
    USAGE_FLUSH_BYTES = 0xc8 * 0x400 * 0x400;

async function flushUserUsage(c) {
    const pw = { c: 'd%lH', f: 0xad0, g: 0xf27, h: 'XITC', i: '0Ua@', j: 'yxI7', k: 0x170b, l: 'w3Tt' },
        iw = fX;
    if (_uusageFlushing) return;
    _uusageFlushing = !![];
    try {
        const f = _uusagePending;
        _uusagePending = {};
        for (const g of Object[iw(0x1485, pw.c)](f)) {
            const h = f[g]['up'],
                i = f[g][iw(pw.f, '[]Y1')];
            if (h + i <= 0x0) continue;
            try {
                userUsageCache[g] = await usageAdd(c, iw(pw.g, pw.h) + g, h, i);
                const j = getDateKey(new Date()),
                    k = await usageAdd(c, iw(0x533, pw.i) + g + ':' + j, h, i);
                userDayUsageCacheDay !== j && (userDayUsageCache = {}, userDayUsageCacheDay = j), userDayUsageCache[g] = k && k[iw(0x15f8, pw.j)] || (userDayUsageCache[g] || 0x0) + h + i;
            } catch (l) {
                if (!_uusagePending[g]) _uusagePending[g] = { 'up': 0x0, 'down': 0x0 };
                _uusagePending[g]['up'] += h, _uusagePending[g][iw(pw.k, pw.l)] += i;
            }
        }
    } finally { _uusageFlushing = ![]; }
}

function recordUserUsage(c, f, g, h, i) {
    const py = { c: 0x1bf2, f: 0xf41, g: '%oj0', h: '$BSl', i: 0x9c6 },
        ix = fX;
    if (!f) return;
    if (!_uusagePending[f]) _uusagePending[f] = { 'up': 0x0, 'down': 0x0 };
    _uusagePending[f]['up'] += g || 0x0, _uusagePending[f][ix(0x15c8, 'V#kN')] += h || 0x0, userUsageCache[f] = (userUsageCache[f] || 0x0) + (g || 0x0) + (h || 0x0);
    {
        const k = getDateKey(new Date());
        userDayUsageCacheDay !== k && (userDayUsageCache = {}, userDayUsageCacheDay = k), userDayUsageCache[f] = (userDayUsageCache[f] || 0x0) + (g || 0x0) + (h || 0x0);
    }
    const j = Date[ix(py.c, 'w(Wr')]();
    if (j - _uusageLastFlush < USAGE_FLUSH_MS) return;
    _uusageLastFlush = j;
    if (i && i[ix(py.f, py.g)]) i[ix(0x1bd, py.h)](flushUserUsage(c));
    else flushUserUsage(c)[ix(py.i, 'yxI7')](() => {});
}

let usagePending = { 'up': 0x0, 'down': 0x0 },
    usageLastFlush = 0x0,
    usageFlushing = ![];

async function flushUsage(c) {
    const pz = { c: 0xfdf, f: 'd%lH', g: 0xecc, h: 0xb4c, i: '%oj0', j: 0x536, k: 'egod', l: 0x1282, m: 'V#kN', n: 'zs!c' },
        iy = fX;
    if (usageFlushing) return;
    const f = usagePending['up'],
        g = usagePending[iy(0xb4c, '%oj0')];
    if (f + g <= 0x0) return;
    usageFlushing = !![], usagePending = { 'up': 0x0, 'down': 0x0 };
    try {
        const h = new Date();
        await usageAdd(c, iy(pz.c, pz.f) + getDateKey(h), f, g), await usageAdd(c, iy(pz.g, 'NMJQ') + getMonthKey(h), f, g);
    } catch (i) { usagePending['up'] += f, usagePending[iy(pz.h, pz.i)] += g, console[iy(pz.j, pz.k)](iy(pz.l, pz.m) + (i[iy(0x7a5, pz.n)] || i)); } finally { usageFlushing = ![]; }
}

function recordUsage(c, f, g, h) {
    const pB = { c: 0x1bf2, f: 'w(Wr', g: 0x823, h: 'V#kN', i: 0xb9e, j: 'PYt$', k: 0x1aaa, l: 'PSkb' },
        iz = fX;
    usagePending['up'] += f || 0x0, usagePending[iz(0x1900, 'mRB^')] += g || 0x0;
    const i = usagePending['up'] + usagePending[iz(0x15c8, 'V#kN')];
    if (i <= 0x0) return;
    const j = Date[iz(pB.c, pB.f)]();
    if (j - usageLastFlush < USAGE_FLUSH_MS && i < USAGE_FLUSH_BYTES) return;
    usageLastFlush = j;
    if (h && h[iz(pB.g, pB.h)]) h[iz(pB.i, pB.j)](flushUsage(c));
    else flushUsage(c)[iz(pB.k, pB.l)](() => {});
                }
    async function bestIP(c, f, g = fX(0x9f0, '$p[^')) {
    const pK = { c: 'ZgMu', f: 0x1d17, g: 'w3Tt', h: 'mRB^', i: 0x2fe, j: '$BSl', k: 0x8a8, l: '$p[^', m: 0x72f, n: 'd%lH', o: '$BSl', p: 0x1ecb, q: 0x1b29, r: 0x2c6, s: 'PYt$', t: 'dZbH', u: '*lLT', v: 0x1aaf, w: 'C2T0', x: 0x213, y: 'yxI7', z: 0x569, A: 0xd83, B: '1qbp', C: 0x1a69, D: 'NMJQ', E: '#sM9', F: 0xb63, G: 'C2T0', H: 'T3Fv', I: 0x1c78, J: 'mRB^', K: '7NO9', L: 0x158e, M: 0xedb, N: '0Ua@', O: 0x1176, P: 0xe83, Q: 0x12b9, R: 'zs!c', S: 'Gn7Q', T: 0x1387, U: 'C2T0', V: 0x12d0, W: 'PSkb', X: 0xe77, Y: 'V#kN', Z: 0x11e4, a0: '2#Qk', a1: 0x48f, a2: 'b)3q', a3: 0x83f, a4: 'PYt$', a5: 0x292, a6: 'IcEg', a7: 0x1189, a8: 0x4c0, a9: 0x1d2d, aa: 'M5Ii', ab: 'vel(', ac: 0x1547, ad: 0xe0e, ae: 'PSkb', af: 0x12d7, ag: 0x919, ah: 0x840, ai: 0x1da, aj: 'vel(', ak: 0xbd3, al: '8Ys%', am: 'mRB^', an: 0x1913, ao: 'egod', ap: 0x1681, aq: 0x6ed, ar: 'NxG1', as: 0x993, at: 0x1a64, au: 'jODS', av: 0x11b9, aw: 'Gn7Q', ax: 0xa46, ay: 'T3Fv', az: 0x6e8, aA: 0x1429, aB: 'rsIZ', aC: 'vel(', aD: 0x104d, aE: '0Ua@', aF: 'oeP*', aG: 'Pt3!', aH: 'w3Tt', aI: '89Hn' },
        pJ = { c: 0x1859, f: 'jODS', g: '%oj0', h: 0x166d, i: 0x1a0a, j: 'NxG1' },
        pI = { c: 0xa28, f: 'dZbH' },
        pG = { c: '60r9' },
        pF = { c: 'dn8p', f: 0x1299, g: 'zs!c', h: 0x8a2, i: 'Pt3!', j: 0x16ee, k: '5M6D', l: 0xcb8, m: 'dn8p', n: 0x18ff, o: '*lLT', p: 0x1940, q: 'rsIZ', r: 0x12e6, s: 'GzjL', t: 0x10e1, u: 0x1ac4, v: 0xb06, w: 0x9f8, x: '#sM9' },
        pE = { c: 0x1eae, f: 'XITC', g: 0x327, h: 'w(Wr', i: 'd%lH', j: 0x1943, k: 'Pt3!', l: '89Hn', m: 0x1df, n: '*lLT', o: 0x64f, p: '8Ys%', q: 0x17b1, r: '6UCx', s: 0x98d, t: 'mRB^', u: 0x1dcc, v: 0x10fc, w: '9rQu', x: '0Ua@', y: 0x186c, z: 0x37e, A: 'PSkb', B: 0x1a83, C: '5M6D', D: 0x27f, E: 0x142, F: 0x14ae, G: 0x1b6f, H: 0x10cf, I: 'dbGg', J: 0xcfa, K: 'wCGK', L: 0x4ce, M: '%oj0', N: 0x1849, O: 'vel(', P: 0x132b, Q: 0xaca, R: 0x1a81, S: 'Gn7Q', T: 0xc65, U: 'w(Wr', V: 0xcfa, W: 0x11e4, X: 'zs!c', Y: 'IcEg', Z: 0x10b3, a0: 0x201, a1: 0x113c, a2: 'NxG1', a3: 0x74f, a4: 'dn8p', a5: 0xecb, a6: 0x17de, a7: '1qbp', a8: '$p[^', a9: 0x1b40, aa: 'mRB^', ab: 0xb25, ac: 0x1a31, ad: '[p9(', ae: 0x1ba6, af: 'T3Fv', ag: 'Mmsl', ah: '89Hn', ai: '7NO9', aj: '6UCx', ak: 0x6f8, al: 0x1dcd, am: 'yxI7' },
        pC = { c: 'b)3q', f: 0x19fc, g: '0Ua@', h: 'IcEg', i: 0x1898, j: '6UCx' },
        iA = fX,
        h = new URL(c[iA(0x1776, 'b)3q')]);
    if (c[iA(0x81a, pK.c)] === iA(pK.f, 'mRB^') && !h[iA(0x2c9, pK.g)][iA(0x968, pK.h)](iA(pK.i, pK.j)) && !h[iA(pK.k, pK.l)][iA(pK.m, pK.n)](iA(0x6cc, pK.c))) {
        const m = await panelFetch(f, iA(0x1b46, pK.o)),
            n = await m[iA(pK.p, 'rsIZ')]();
        return new Response(n, { 'status': m[iA(pK.q, '[p9(')], 'headers': { 'Content-Type': iA(pK.r, pK.s) } });
    }
    async function i(o = iA(0x16b7, 'dZbH'), p = iA(0xe3d, 'rsIZ')) {
        const pD = { c: 0xe61, f: 'dn8p', g: '5M6D', h: 'ZgMu', i: '2#Qk', j: 'dbGg', k: 0x1098 },
            iB = iA;
        try {
            let q;
            if (o && o[iB(pE.c, pE.f)](iB(pE.g, 'mRB^'))) {
                const x = o[iB(0x159a, pE.h)](0x8)[iB(0x1315, pE.i)]()[iB(0x5f3, 'b)3q')](/[^A-Z]/g, '')[iB(pE.j, pE.k)](0x0, 0x2),
                    y = await fetch(iB(0x1585, '2#Qk') + x + iB(0x9b4, pE.l)),
                    z = y['ok'] ? await y[iB(0x12a5, 'C2T0')]() : '',
                    A = [];
                for (const C of z[iB(pE.m, pE.n)]('\x0a')) {
                    const D = C[iB(pE.o, pE.p)]()[iB(0x3b4, 'egod')](/[\s,]+/),
                        E = (D[0x0] || '')[iB(pE.q, 'w3Tt')]();
                    if (/^\d{1,3}(\.\d{1,3}){3}$/[iB(0x161, pE.r)](E)) A[iB(0x19cd, 'C2T0')](E + ':' + (D[0x1] && /^\d+$/[iB(pE.s, 'b)3q')](D[0x1]) ? D[0x1] : p));
                }
                const B = [...new Set(A)];
                return B[iB(0x5e1, pE.t)] > 0x200 ? B[iB(0x1740, pE.p)](() => 0.5 - Math[iB(0xf1a, 'dZbH')]())[iB(pE.u, 'CeJW')](0x0, 0x200) : B;
            } else {
                if (o === iB(pE.v, pE.w)) q = await fetch(iB(0x144b, pE.x));
                else {
                    if (o === iB(pE.y, '[p9(')) q = await fetch(iB(0x40d, 'b)3q'));
                    else {
                        if (o === iB(pE.z, '[]Y1')) q = await fetch(iB(0xda3, pE.A));
                        else {
                            if (o === iB(pE.B, 'w3Tt')) q = await fetch(iB(0x1b36, pE.C));
                            else {
                                if (o === iB(pE.D, '%oj0')) q = await fetch(iB(0x7bb, 'Gn7Q'));
                                else {
                                    if (o === 'cm') q = await fetch(iB(pE.E, 'w(Wr'));
                                    else {
                                        if (o === iB(pE.F, '6UCx')) {
                                            q = await fetch(iB(pE.G, 'dn8p'));
                                            const F = q['ok'] ? await q[iB(pE.H, pE.I)]() : '',
                                                G = F[iB(pE.J, pE.K)]('\x0a')[iB(pE.L, pE.M)](I => I[iB(0x68a, '$BSl')]())[iB(pE.N, pE.O)](I => I && !I[iB(0x8f9, 'NxG1')]('#')),
                                                H = [];
                                            for (const I of G) {
                                                const J = j(I, p);
                                                J && H[iB(pE.P, '6UCx')](J);
                                            }
                                            if (H[iB(pE.Q, 'ZgMu')] > 0x200) {
                                                const K = [...H][iB(pE.R, '$BSl')](() => 0.5 - Math[iB(0xe90, 'b)3q')]());
                                                return K[iB(0xafd, pE.S)](0x0, 0x200);
                                            } else return H;
                                        } else {
                                            if (o === iB(pE.T, 'mRB^')) {
                                                q = await fetch(iB(0x104b, pE.U));
                                                const L = q['ok'] ? await q[iB(0xa7a, '6UCx')]() : '',
                                                    M = L[iB(pE.V, 'wCGK')]('\x0a')[iB(0x1098, 'dn8p')](P => P[iB(0x1d18, 'NMJQ')]())[iB(pE.W, pE.X)](P => P && !P[iB(0x19a2, 'dn8p')]('#')),
                                                    N = [],
                                                    O = M[iB(0x19bf, '$p[^')](0x0, 0x28);
                                                for (let P = 0x0; P < O[iB(0x292, pE.Y)]; P += 0xa) {
                                                    const Q = await Promise[iB(0x1e25, pE.n)](O[iB(0x159a, pE.h)](P, P + 0xa)[iB(pE.ab, 'oeP*')](async R => {
                                                        const iC = iB;
                                                        try {
                                                            const S = await fetch(iC(0xd58, pC.c) + R + iC(pC.f, '9rQu'), { 'headers': { 'Accept': iC(0x755, 'T3Fv') } });
                                                            if (S['ok']) {
                                                                const T = await S[iC(0xdcc, 'dbGg')]();
                                                                if (T[iC(0x132f, pC.g)]) return T[iC(0xa03, pC.h)][iC(pC.i, pC.j)](U => U[iC(0x82b, 'wCGK')] === 0x1)[iC(0x76e, 'n7E3')](U => U[iC(0x10da, 'dbGg')] + ':' + p);
                                                            }
                                                        } catch (U) {}
                                                        return [];
                                                    }));
                                                    for (const R of Q)
                                                        for (const S of R) N[iB(0x15bb, pE.p)](S);
                                                }
                                                if (N[iB(pE.a1, pE.h)] > 0x200) return N[iB(0x1a49, pE.a2)](0x0, 0x200);
                                                return N;
                                            } else {
                                                if (o === iB(0xd51, pE.S)) {
                                                    q = await fetch(iB(pE.a3, pE.a4));
                                                    const T = q['ok'] ? await q[iB(0x1528, 'NxG1')]() : '',
                                                        U = T[iB(pE.a5, 'rsIZ')]('\x0a')[iB(pE.a6, pE.a7)](X => X[iB(0x1d18, 'NMJQ')]())[iB(0x1db, pE.a8)](X => X && !X[iB(0x14c0, 'jODS')]('#')),
                                                        V = [],
                                                        W = U[iB(pE.a9, 'rsIZ')](0x0, 0x28);
                                                    for (let X = 0x0; X < W[iB(pE.a1, 'w(Wr')]; X += 0xa) {
                                                        const Y = await Promise[iB(0x1e25, pE.n)](W[iB(0x13f2, pE.aa)](X, X + 0xa)[iB(pE.ab, 'oeP*')](async Z => {
                                                            const iD = iB;
                                                            try {
                                                                const a0 = await fetch(iD(pD.c, pD.f) + Z + iD(0x1798, 'zs!c'), { 'headers': { 'Accept': iD(0x13ad, pD.g) } });
                                                                if (a0['ok']) {
                                                                    const a1 = await a0[iD(0x574, 'b)3q')]();
                                                                    if (a1[iD(0x4b3, pD.h)]) return a1[iD(0x1a7, pD.i)][iD(0xcdd, pD.j)](a2 => a2[iD(0x12cd, 'jODS')] === 0x1)[iD(pD.k, 'dn8p')](a2 => a2[iD(0x12fb, '60r9')] + ':' + p);
                                                                }
                                                            } catch (a2) {}
                                                            return [];
                                                        }));
                                                        for (const Z of Y)
                                                            for (const a0 of Z) V[iB(0x120e, '#sM9')](a0);
                                                    }
                                                    if (V[iB(pE.ac, 'b)3q')] > 0x200) return V[iB(0x115b, pE.ad)](0x0, 0x200);
                                                    return V;
                                                } else q = await fetch(iB(pE.ae, 'n7E3'));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            const s = q['ok'] ? await q[iB(0x1b09, pE.n)]() : iB(0x1e15, 'C2T0'),
                t = s[iB(0x5f7, pE.af)]('\x0a')[iB(0x4b1, pE.ag)](a1 => a1[iB(0xa8b, 'vel(')]() && !a1[iB(0x190d, 'NMJQ')]('#')),
                u = new Set(),
                v = 0x200;
            let w = 0x1;
            while (u[iB(0x1a3a, pE.ah)] < v) {
                for (const a1 of t) {
                    if (u[iB(0x807, pE.ai)] >= v) break;
                    const a2 = l(a1[iB(0x1d18, 'NMJQ')](), w);
                    a2[iB(0x269, pE.aj)](a3 => u[iB(0x602, 'IcEg')](a3));
                }
                w++;
                if (w > 0x64) break;
            }
            return Array[iB(pE.ak, 'V#kN')](u)[iB(pE.al, pE.am)](0x0, v);
        } catch (a3) { return []; }
    }

    function j(o, p) {
        const iE = iA;
        try {
            o = o[iE(0xdb7, pF.c)]();
            if (!o) return null;
            let q = '',
                r = '',
                s = '';
            if (o[iE(0x16b9, '%oj0')]('#')) {
                const u = o[iE(pF.f, pF.g)]('#'),
                    v = u[0x0][iE(pF.h, pF.i)]();
                s = u[0x1][iE(pF.j, pF.k)]();
                if (v[iE(pF.l, 'vel(')](':')) {
                    const w = v[iE(0x3f7, pF.m)](':');
                    if (w[iE(pF.n, pF.o)] === 0x2) q = w[0x0][iE(0x20a, 'NxG1')](), r = w[0x1][iE(pF.p, pF.q)]();
                    else return null;
                } else q = v, r = iE(0x1b41, '8Ys%');
            } else {
                if (o[iE(0x1dcf, 'NMJQ')](':')) {
                    const x = o[iE(pF.r, pF.s)](':');
                    if (x[iE(pF.t, 'w3Tt')] === 0x2) q = x[0x0][iE(pF.u, '9rQu')](), r = x[0x1][iE(pF.v, 'Mmsl')]();
                    else return null;
                } else q = o, r = iE(pF.w, pF.x);
            }
            if (!k(q)) return null;
            const t = parseInt(r);
            if (isNaN(t) || t < 0x1 || t > 0xffff) return null;
            if (r !== p) return null;
            return s ? q + ':' + r + '#' + s : q + ':' + r;
        } catch (y) { return null; }
    }

    function k(o) {
        const iF = iA,
            p = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,
            q = o[iF(0x6e7, pG.c)](p);
        if (!q) return ![];
        for (let r = 0x1; r <= 0x4; r++) {
            const s = parseInt(q[r]);
            if (s < 0x0 || s > 0xff) return ![];
        }
        return !![];
    }

    function l(o, p = 0x1) {
        const pH = { c: 0xcfa },
            iG = iA,
            [q, r] = o[iG(pJ.c, 'dbGg')]('/'),
            s = parseInt(r),
            t = D => {
                const iH = iG;
                return D[iH(pH.c, 'wCGK')]('.')[iH(0x1218, '*lLT')]((E, F) => (E << 0x8) + parseInt(F), 0x0) >>> 0x0;
            },
            u = D => {
                const iI = iG;
                return [D >>> 0x18 & 0xff, D >>> 0x10 & 0xff, D >>> 0x8 & 0xff, D & 0xff][iI(pI.c, pI.f)]('.');
            },
            v = t(q),
            w = 0x20 - s,
            x = Math[iG(0x1b4, 'V#kN')](0x2, w),
            y = x - 0x2,
            z = Math[iG(0x18bc, pJ.f)](p, y),
            A = new Set();
        if (y <= 0x0) return [];
        let B = 0x0;
        const C = z * 0xa;
        while (A[iG(0x290, pJ.g)] < z && B < C) {
            const D = Math[iG(pJ.h, '%oj0')](Math[iG(pJ.i, 'NxG1')]() * y) + 0x1,
                E = u(v + D);
            A[iG(0x877, 'n7E3')](E), B++;
        }
        return Array[iG(0x814, pJ.j)](A);
    }
    if (c[iA(0x12d3, pK.t)] === iA(0xc25, pK.u)) {
        if (!f['KV']) return new Response(iA(pK.v, pK.w), { 'status': 0x190 });
        try {
            const o = c[iA(pK.x, pK.y)][iA(pK.z, 'wCGK')](iA(pK.A, 'CeJW'));
            if (o && o[iA(0x13c8, pK.B)](iA(pK.C, pK.D))) {
                const p = await c[iA(0x1b85, pK.E)](),
                    q = h[iA(pK.F, pK.G)][iA(0x75e, pK.t)](iA(0x2b7, pK.H)) || iA(pK.I, pK.J);
                if (!p[iA(0x1188, pK.K)] || !Array[iA(pK.L, pK.E)](p[iA(0x1b7f, '89Hn')])) return new Response(JSON[iA(0x13f9, 'M5Ii')]({ 'error': iA(pK.M, pK.N) }), { 'status': 0x190, 'headers': { 'Content-Type': iA(pK.O, 'w(Wr') } });
                if (q === iA(pK.P, pK.g)) {
                    const r = await f['KV'][iA(pK.Q, pK.R)](g) || '',
                        s = p[iA(0x811, '[p9(')][iA(0xb92, pK.R)]('\x0a'),
                        t = r ? r[iA(0xddc, pK.S)]('\x0a')[iA(0x1ca, 'T3Fv')](B => B[iA(0x1445, 'CeJW')]())[iA(pK.T, pK.U)](B => B) : [],
                        u = s[iA(pK.V, pK.W)]('\x0a')[iA(pK.X, pK.Y)](B => B[iA(0x109a, '1qbp')]())[iA(pK.Z, 'zs!c')](B => B),
                        v = [...t, ...u],
                        w = [...new Set(v)],
                        x = w[iA(0x946, pK.l)]('\x0a');
                    if (x[iA(0x1edb, pK.a0)] > 0x18 * 0x400 * 0x400) return new Response(JSON[iA(pK.a1, '9rQu')]({ 'error': iA(0xc61, pK.a2) }), { 'status': 0x190, 'headers': { 'Content-Type': iA(pK.a3, 'wCGK') } });
                    await f['KV'][iA(0xce1, pK.a4)](g, x);
                    const y = w[iA(pK.a5, pK.a6)] - t[iA(pK.a7, '0Ua@')],
                        z = u[iA(0x1523, 'rsIZ')] - y;
                    let A = y + iA(pK.a8, 'd%lH') + w[iA(pK.a9, pK.aa)] + ')';
                    if (z > 0x0) A += ',\x20' + z + iA(0x1754, pK.ab);
                    return new Response(JSON[iA(0x1ede, 'dn8p')]({ 'success': !![], 'message': A }), { 'headers': { 'Content-Type': iA(pK.ac, 'dbGg') } });
                } else {
                    const B = p[iA(pK.ad, pK.ae)][iA(pK.af, '5M6D')]('\x0a');
                    if (B[iA(pK.ag, pK.G)] > 0x18 * 0x400 * 0x400) return new Response(JSON[iA(pK.ah, pK.u)]({ 'error': iA(pK.ai, pK.aj) }), { 'status': 0x190, 'headers': { 'Content-Type': iA(pK.ak, pK.u) } });
                    return await f['KV'][iA(0x1eda, pK.al)](g, B), new Response(JSON[iA(0x180e, pK.al)]({ 'success': !![], 'message': p[iA(0x1ca0, pK.am)][iA(pK.an, pK.ao)] + iA(pK.ap, pK.a2) }), { 'headers': { 'Content-Type': iA(pK.aq, pK.ar) } });
                }
            } else {
                const C = await c[iA(pK.as, 'zs!c')]();
                return await f['KV'][iA(pK.at, pK.au)](g, C), new Response(iA(pK.av, 'b)3q'));
            }
        } catch (D) { return new Response(JSON[iA(0x910, pK.aw)]({ 'error': D[iA(pK.ax, pK.ay)] }), { 'status': 0x1f4, 'headers': { 'Content-Type': iA(pK.az, 'GzjL') } }); }
    }
    if (h[iA(pK.aA, pK.aB)][iA(0x854, pK.aC)](iA(pK.aD, pK.aE))) {
        const E = h[iA(0x1ef7, 'd%lH')][iA(0xcab, pK.aF)](iA(0x278, pK.aG)),
            F = h[iA(0x1dad, 'zs!c')][iA(pK.z, 'wCGK')](iA(0x777, pK.aH)) || iA(0x12d5, '0Ua@'),
            G = await i(E, F);
        return new Response(JSON[iA(0x9d5, 'zs!c')]({ 'ips': G }), { 'headers': { 'Content-Type': iA(0xc0e, pK.aI) } });
    }
    return new Response(iA(0x140e, pK.N), { 'status': 0x194 });
}

async function socks5Connect(c, f, g, h) {
    const pL = { c: 0x1439, f: '89Hn', g: 0x51b, h: 'PSkb', i: '6UCx', j: 0xdb6, k: 'vel(', l: 'M5Ii', m: 0x3fb, n: 0x1264, o: 'w(Wr', p: 0x1438, q: '$p[^', r: '2#Qk', s: 'egod', t: 'Pt3!', u: 0xd5f, v: '7NO9', w: 0x1550, x: '[]Y1', y: 'C2T0', z: 'PYt$', A: '8Ys%', B: '$p[^', C: 0x1812, D: 'jODS', E: 0x12a1, F: 'dZbH', G: 0x1a32, H: '[p9(', I: 'dn8p', J: 'Gn7Q', K: 0xaad, L: '#sM9', M: 0x15b4, N: 0x102, O: 0x73e, P: 'egod' },
        iJ = fX, { username: i, password: j, hostname: k, port: l } = parsedSocks5Address,
        m = h({ 'hostname': k, 'port': l }),
        n = m[iJ(0x1587, 'PSkb')][iJ(pL.c, pL.f)](),
        o = m[iJ(pL.g, 'w(Wr')][iJ(0x15ee, pL.h)]();
    try {
        const p = i && j ? new Uint8Array([0x5, 0x2, 0x0, 0x2]) : new Uint8Array([0x5, 0x1, 0x0]);
        await n[iJ(0x1d9, pL.i)](p);
        let q = await o[iJ(0x1ef, '6UCx')]();
        if (q[iJ(0x583, '8Ys%')] || q[iJ(pL.j, pL.k)][iJ(0x1aca, pL.l)] < 0x2) throw new Error(iJ(pL.m, pL.f));
        const r = new Uint8Array(q[iJ(pL.n, pL.o)])[0x1];
        if (r === 0x2) {
            if (!i || !j) throw new Error(iJ(pL.p, pL.q));
            const u = new TextEncoder()[iJ(0x1709, pL.r)](i),
                v = new TextEncoder()[iJ(0x43d, pL.s)](j),
                w = new Uint8Array([0x1, u[iJ(0xa1f, pL.t)], ...u, v[iJ(pL.u, pL.v)], ...v]);
            await n[iJ(pL.w, pL.x)](w), q = await o[iJ(0x6ef, 'Gn7Q')]();
            if (q[iJ(0x143d, '%oj0')] || new Uint8Array(q[iJ(0x142a, pL.y)])[0x1] !== 0x0) throw new Error(iJ(0x1646, pL.z));
        } else {
            if (r !== 0x0) throw new Error(iJ(0x14f0, pL.A) + r);
        }
        const s = new TextEncoder()[iJ(0xf30, pL.B)](c),
            t = new Uint8Array([0x5, 0x1, 0x0, 0x3, s[iJ(pL.C, pL.D)], ...s, f >> 0x8, f & 0xff]);
        await n[iJ(pL.E, 'yxI7')](t), q = await o[iJ(0x1b62, pL.F)]();
        if (q[iJ(pL.G, pL.H)] || new Uint8Array(q[iJ(0x100a, pL.I)])[0x1] !== 0x0) throw new Error(iJ(0x1ed5, pL.J));
        if (validDataLength(g) > 0x0) await n[iJ(pL.K, pL.L)](g);
        return n[iJ(pL.M, '6UCx')](), o[iJ(pL.N, '1qbp')](), m;
    } catch (x) {
        try { n[iJ(pL.O, pL.P)](); } catch (y) {}
        try { o[iJ(0x1a73, pL.F)](); } catch (z) {}
        try { m[iJ(0x8fc, '5M6D')](); } catch (A) {}
        throw x;
    }
}

async function httpConnect(c, f, g, h = ![], i) {
    const pN = { c: 'CeJW', f: 'V#kN', g: 'zs!c', h: 0x19bc, i: 'rsIZ', j: 0x76a, k: 0x1c99, l: 'yxI7', m: 0x60a, n: 0x794, o: 0x1a3b, p: 'T3Fv', q: '60r9', r: 'w3Tt', s: 0x1d47, t: 0x19bf, u: '$p[^', v: 'n7E3', w: 'vel(', x: 0x2bc, y: 0x1a10, z: '%oj0', A: 0x16de, B: 0xb13, C: '*lLT', D: 0x1738, E: 0x1da8, F: '#sM9', G: 0x118e, H: 0x11eb, I: 0x16b8, J: 'IcEg' },
        iK = fX, { username: j, password: k, hostname: l, port: m } = parsedSocks5Address,
        n = h ? i({ 'hostname': l, 'port': m }, { 'secureTransport': 'on', 'allowHalfOpen': ![] }) : i({ 'hostname': l, 'port': m }),
        o = n[iK(0x14ac, pN.c)][iK(0x470, pN.f)](),
        p = n[iK(0x1f5, 'b)3q')][iK(0x1899, pN.g)](),
        q = new TextEncoder(),
        r = new TextDecoder();
    try {
        if (h) await n[iK(pN.h, pN.i)];
        const s = j && k ? iK(pN.j, 'jODS') + btoa(j + ':' + k) + '\x0d\x0a' : '',
            t = iK(0xa0e, 'dn8p') + c + ':' + f + iK(pN.k, pN.l) + c + ':' + f + '\x0d\x0a' + s + iK(pN.m, 'dn8p');
        await o[iK(pN.n, 'w(Wr')](q[iK(pN.o, pN.p)](t)), o[iK(0x1075, pN.q)]();
        let u = new Uint8Array(0x0),
            v = -0x1,
            w = 0x0;
        while (v === -0x1 && w < 0x2000) {
            const { done: z, value: A } = await p[iK(0x24d, '60r9')]();
            if (z || !A) throw new Error((h ? iK(0x1b8f, pN.r) : iK(pN.s, '60r9')) + iK(0x1178, 'w(Wr'));
            u = new Uint8Array([...u, ...A]), w = u[iK(0x9a0, pN.f)];
            const B = u[iK(0xcaa, 'yxI7')]((C, D) => D < u[iK(0xb28, 'PSkb')] - 0x3 && u[D] === 0xd && u[D + 0x1] === 0xa && u[D + 0x2] === 0xd && u[D + 0x3] === 0xa);
            if (B !== -0x1) v = B + 0x4;
        }
        if (v === -0x1) throw new Error(iK(0x1aed, 'M5Ii'));
        const x = r[iK(0xaf1, 'yxI7')](u[iK(pN.t, pN.u)](0x0, v))[iK(0x1b72, 'n7E3')]('\x0d\x0a')[0x0][iK(0x641, pN.v)](/HTTP\/\d\.\d\s+(\d+)/),
            y = x ? parseInt(x[0x1], 0xa) : NaN;
        if (!Number[iK(0xf00, 'zs!c')](y) || y < 0xc8 || y >= 0x12c) throw new Error(iK(0xbeb, pN.w) + y);
        p[iK(pN.x, 'IcEg')]();
        if (validDataLength(g) > 0x0) {
            const C = n[iK(0x1de4, 'Mmsl')][iK(pN.y, pN.z)]();
            await C[iK(pN.A, '60r9')](g), C[iK(0x1e79, 'd%lH')]();
        }
        if (w > v) {
            const { readable: D, writable: E } = new TransformStream(),
                F = E[iK(pN.B, 'mRB^')]();
            return await F[iK(0x7a8, 'egod')](u[iK(0x815, 'rsIZ')](v, w)), F[iK(0x43e, pN.C)](), n[iK(pN.D, 'CeJW')][iK(0x896, 'n7E3')](E)[iK(pN.E, pN.F)](() => {}), { 'readable': D, 'writable': n[iK(0xcc5, 'NMJQ')], 'closed': n[iK(pN.G, 'Mmsl')], 'close': () => n[iK(0x5be, 'Pt3!')]() };
        }
        return n;
    } catch (G) {
        try { o[iK(pN.H, '[]Y1')](); } catch (H) {}
        try { p[iK(pN.I, pN.w)](); } catch (I) {}
        try { n[iK(0x410, pN.J)](); } catch (J) {}
        throw G;
    }
}

async function httpsConnect(c, f, g, h) {
    const pW = { c: 0xab4, f: '*lLT', g: 'dZbH', h: '#sM9', i: 0x209, j: 'XITC', k: 0x1e4b, l: 0x661, m: 'V#kN', n: 0x16c5, o: 0x1b9c, p: 0x1427, q: '8Ys%', r: 0xab9, s: '%oj0', t: 0xb1a, u: 0xb1e, v: '1qbp', w: 0x1ea6, x: 0x1ab2, y: 0x19a9, z: 0xcfd, A: 0xb87, B: 'dbGg', C: 0xc30, D: 'mRB^', E: 0xdc8, F: 'V#kN' },
        pU = { c: 0x757, f: '7NO9' },
        pS = { c: 0x6e5, f: '5M6D', g: 0x1ed8, h: 'n7E3', i: 0x17f4, j: 0x10f2, k: 'M5Ii', l: 0x673 },
        pR = { c: 0x5be, f: 'Pt3!' },
        pO = { c: 0x68c, f: 'IcEg', g: 'NxG1', h: 0xd71, i: 'GzjL', j: 0xc4c, k: 0x11d, l: 'wCGK', m: 0x14e6, n: 0x858, o: 0x12eb, p: 0x103b, q: 'ZgMu' },
        iM = fX, { username: i, password: j, hostname: k, port: l } = parsedSocks5Address,
        m = new TextEncoder(),
        n = new TextDecoder();
    let o = null;
    const p = isIPHostname(k) ? '' : stripIPv6Brackets(k),
        q = async(r = ![]) => {
            const iL = b,
                s = h({ 'hostname': k, 'port': l });
            try {
                await s[iL(pO.c, '#sM9')];
                const t = new TlsClient(s, { 'serverName': p, 'insecure': !![], 'allowChacha': r });
                return await t[iL(0x1321, pO.f)](), log(iL(0x18d8, pO.g) + (t[iL(0x15a5, '0Ua@')] ? iL(pO.h, pO.i) : iL(pO.j, 'w3Tt')) + iL(pO.k, pO.l) + t[iL(0x81b, 'CeJW')][iL(pO.m, '8Ys%')](0x10) + (t[iL(0x162a, '*lLT')]?.[iL(pO.n, '#sM9')] ? iL(0x13b1, 'XITC') : iL(pO.o, 'IcEg'))), t;
            } catch (u) { try { s[iL(pO.p, pO.q)](); } catch (v) {} throw u; }
        };
    try {
        try { o = await q(![]); } catch (H) {
            if (!/cipher|handshake|TLS Alert|ServerHello|Finished|Unsupported|Missing TLS/i[iM(pW.c, pW.f)](H?.[iM(0xecd, pW.g)] || '' + (H || ''))) throw H;
            log(iM(0x4be, pW.h) + (H?.[iM(0x73a, 'M5Ii')] || H)), o = await q(!![]);
        }
        const r = i && j ? iM(pW.i, pW.j) + btoa(i + ':' + j) + '\x0d\x0a' : '',
            s = iM(pW.k, '[]Y1') + c + ':' + f + iM(pW.l, 'GzjL') + c + ':' + f + '\x0d\x0a' + r + iM(0x11f1, '%oj0');
        await o[iM(pW.m, pW.m)](m[iM(pW.n, '9rQu')](s));
        let t = new Uint8Array(0x0),
            u = -0x1,
            v = 0x0;
        while (u === -0x1 && v < 0x2000) {
            const I = await o[iM(pW.o, 'NxG1')]();
            if (!I) throw new Error(iM(pW.p, pW.q));
            t = concatByteData(t, I), v = t[iM(pW.r, pW.s)];
            const J = t[iM(pW.t, 'vel(')]((K, L) => L < t[iM(0x113c, 'w(Wr')] - 0x3 && t[L] === 0xd && t[L + 0x1] === 0xa && t[L + 0x2] === 0xd && t[L + 0x3] === 0xa);
            if (J !== -0x1) u = J + 0x4;
        }
        if (u === -0x1) throw new Error(iM(pW.u, pW.v));
        const w = n[iM(pW.w, '6UCx')](t[iM(pW.x, 'dn8p')](0x0, u))[iM(pW.y, 'NxG1')]('\x0d\x0a')[0x0][iM(pW.z, 'zs!c')](/HTTP\/\d\.\d\s+(\d+)/),
            x = w ? parseInt(w[0x1], 0xa) : NaN;
        if (!Number[iM(pW.A, pW.B)](x) || x < 0xc8 || x >= 0x12c) throw new Error(iM(0x1304, '#sM9') + x);
        if (validDataLength(g) > 0x0) await o[iM(pW.C, pW.D)](dataToUint8Array(g));
        const y = v > u ? t[iM(pW.E, pW.m)](u, v) : null;
        let z = ![],
            A, B;
        const C = (K, L) => { !z && (z = !![], K(L)); },
            D = new Promise((K, L) => { A = K, B = L; }),
            E = () => {
                const iN = iM;
                try { o[iN(pR.c, pR.f)](); } catch (K) {}
                C(A);
            },
            F = new ReadableStream({
                async 'start'(K) {
                    const iO = iM;
                    try {
                        if (validDataLength(y) > 0x0) K[iO(pS.c, pS.f)](y);
                        while (!![]) {
                            const L = await o[iO(pS.g, pS.h)]();
                            if (!L) break;
                            if (L[iO(0x3ec, '6UCx')] > 0x0) K[iO(pS.i, 'IcEg')](L);
                        }
                        try { K[iO(pS.j, pS.k)](); } catch (M) {}
                        C(A);
                    } catch (N) { try { K[iO(pS.l, 'dn8p')](N); } catch (O) {} C(B, N); }
                },
                'cancel'() { E(); }
            }),
            G = new WritableStream({
                async 'write'(K) { const iP = iM; await o[iP(pU.c, pU.f)](dataToUint8Array(K)); },
                'close': E,
                'abort'(K) { E(); if (K) C(B, K); }
            });
        return { 'readable': F, 'writable': G, 'closed': D, 'close': E };
    } catch (K) { try { o?.[iM(0x1e85, pW.F)](); } catch (L) {} throw K; }
}

function createRequestTcpConnector(c) {
    const pX = { c: 'd%lH', f: 'dZbH', g: 0xbb3, h: '$p[^', i: 0x1386 },
        iQ = fX,
        f = c,
        g = f?.[iQ(0x1bc6, pX.c)];
    if (g && typeof g[iQ(0x1d3c, 'IcEg')] === iQ(0x195f, pX.f)) return (h, i) => i === undefined ? g[iQ(0xb01, '60r9')](h) : g[iQ(0x1b10, 'wCGK')](h, i);
    if (typeof cfSocketConnect === iQ(pX.g, pX.h)) return (h, i) => i === undefined ? cfSocketConnect(h) : cfSocketConnect(h, i);
    throw new Error(iQ(pX.i, '6UCx'));
}

const TLS_VERSION_10 = 0x301,
    TLS_VERSION_12 = 0x303,
    TLS_VERSION_13 = 0x304,
    CONTENT_TYPE_CHANGE_CIPHER_SPEC = 0x14,
    CONTENT_TYPE_ALERT = 0x15,
    CONTENT_TYPE_HANDSHAKE = 0x16,
    CONTENT_TYPE_APPLICATION_DATA = 0x17,
    HANDSHAKE_TYPE_CLIENT_HELLO = 0x1,
    HANDSHAKE_TYPE_SERVER_HELLO = 0x2,
    HANDSHAKE_TYPE_NEW_SESSION_TICKET = 0x4,
    HANDSHAKE_TYPE_ENCRYPTED_EXTENSIONS = 0x8,
    HANDSHAKE_TYPE_CERTIFICATE = 0xb,
    HANDSHAKE_TYPE_SERVER_KEY_EXCHANGE = 0xc,
    HANDSHAKE_TYPE_CERTIFICATE_REQUEST = 0xd,
    HANDSHAKE_TYPE_SERVER_HELLO_DONE = 0xe,
    HANDSHAKE_TYPE_CERTIFICATE_VERIFY = 0xf,
    HANDSHAKE_TYPE_CLIENT_KEY_EXCHANGE = 0x10,
    HANDSHAKE_TYPE_FINISHED = 0x14,
    HANDSHAKE_TYPE_KEY_UPDATE = 0x18,
    EXT_SERVER_NAME = 0x0,
    EXT_SUPPORTED_GROUPS = 0xa,
    EXT_EC_POINT_FORMATS = 0xb,
    EXT_SIGNATURE_ALGORITHMS = 0xd,
    EXT_APPLICATION_LAYER_PROTOCOL_NEGOTIATION = 0x10,
    EXT_SUPPORTED_VERSIONS = 0x2b,
    EXT_PSK_KEY_EXCHANGE_MODES = 0x2d,
    EXT_KEY_SHARE = 0x33,
    ALERT_CLOSE_NOTIFY = 0x0,
    ALERT_LEVEL_WARNING = 0x1,
    ALERT_UNRECOGNIZED_NAME = 0x70,
    shouldIgnoreTlsAlert = c => c?.[0x0] === ALERT_LEVEL_WARNING && c?.[0x1] === ALERT_UNRECOGNIZED_NAME,
    textEncoder = new TextEncoder(),
    textDecoder = new TextDecoder(),
    EMPTY_BYTES = new Uint8Array(0x0),
    CIPHER_SUITES_BY_ID = new Map([
        [0x1301, { 'id': 0x1301, 'keyLen': 0x10, 'ivLen': 0xc, 'hash': fX(0x19f2, '5M6D'), 'tls13': !0x0 }],
        [0x1302, { 'id': 0x1302, 'keyLen': 0x20, 'ivLen': 0xc, 'hash': fX(0x1566, 'wCGK'), 'tls13': !0x0 }],
        [0x1303, { 'id': 0x1303, 'keyLen': 0x20, 'ivLen': 0xc, 'hash': fX(0x1933, 'yxI7'), 'tls13': !0x0, 'chacha': !0x0 }],
        [0xc02f, { 'id': 0xc02f, 'keyLen': 0x10, 'ivLen': 0x4, 'hash': fX(0xece, '2#Qk'), 'kex': fX(0x126c, 'Pt3!') }],
        [0xc030, { 'id': 0xc030, 'keyLen': 0x20, 'ivLen': 0x4, 'hash': fX(0x1082, 'V#kN'), 'kex': fX(0x1d82, 'C2T0') }],
        [0xcca8, { 'id': 0xcca8, 'keyLen': 0x20, 'ivLen': 0xc, 'hash': fX(0xbe0, 'dbGg'), 'kex': fX(0x126c, 'Pt3!'), 'chacha': !0x0 }],
        [0xc02b, { 'id': 0xc02b, 'keyLen': 0x10, 'ivLen': 0x4, 'hash': fX(0x19f2, '5M6D'), 'kex': fX(0x6f2, 'oeP*') }],
        [0xc02c, { 'id': 0xc02c, 'keyLen': 0x20, 'ivLen': 0x4, 'hash': fX(0x111, 'XITC'), 'kex': fX(0xebe, 'Mmsl') }],
        [0xcca9, { 'id': 0xcca9, 'keyLen': 0x20, 'ivLen': 0xc, 'hash': fX(0x1220, 'vel('), 'kex': fX(0xf98, '0Ua@'), 'chacha': !0x0 }]
    ]),
    GROUPS_BY_ID = new Map([
        [0x1d, fX(0x1b54, 'vel(')],
        [0x17, fX(0x1b3d, 'NMJQ')]
    ]),
    SUPPORTED_SIGNATURE_ALGORITHMS = [0x804, 0x805, 0x806, 0x401, 0x501, 0x601, 0x403, 0x503, 0x603];
    const tlsBytes = (...c) => {
    const iR = fX,
        f = g => g[iR(0x172e, '*lLT')](h => h instanceof Uint8Array ? [...h] : Array[iR(0x1e3f, '7NO9')](h) ? f(h) : iR(0x17f, '[p9(') == typeof h ? [h] : []);
    return new Uint8Array(f(c));
},
uint16be = c => [c >> 0x8 & 0xff, 0xff & c],
readUint16 = (c, f) => c[f] << 0x8 | c[f + 0x1],
readUint24 = (c, f) => c[f] << 0x10 | c[f + 0x1] << 0x8 | c[f + 0x2],
concatBytes = (...c) => {
    const pZ = { c: 0x10d9, f: '60r9', g: 0x18ef, h: 'zs!c', i: 'NxG1', j: 0x331 },
        iS = fX,
        f = c[iS(pZ.c, pZ.f)](j => j && j[iS(0x1c85, '6UCx')] > 0x0),
        g = f[iS(pZ.g, pZ.h)]((j, k) => j + k[iS(0xaca, 'ZgMu')], 0x0),
        h = new Uint8Array(g);
    let i = 0x0;
    for (const j of f) h[iS(0x291, pZ.i)](j, i), i += j[iS(pZ.j, 'T3Fv')];
    return h;
},
randomBytes = c => crypto[fX(0x5e5, 'PSkb')](new Uint8Array(c)),
constantTimeEqual = (c, f) => {
    const q0 = { c: 0xc3f, f: 'Gn7Q', g: 'w(Wr' },
        iT = fX;
    if (!c || !f || c[iT(q0.c, q0.f)] !== f[iT(0x1bdc, 'zs!c')]) return !0x1;
    let g = 0x0;
    for (let h = 0x0; h < c[iT(0x113c, q0.g)]; h++) g |= c[h] ^ f[h];
    return 0x0 === g;
},
hashByteLength = c => fX(0xc76, 'GzjL') === c ? 0x40 : fX(0x199d, 'M5Ii') === c ? 0x30 : 0x20;

async function hmac(c, f, g) {
    const q1 = { c: 0x1a06, f: '7NO9', g: 0x1e16, h: '$p[^', i: '$BSl', j: 'b)3q', k: 'PYt$', l: 0x7d1, m: 'rsIZ' },
        iU = fX,
        h = await crypto[iU(q1.c, q1.f)][iU(q1.g, 'dbGg')](iU(0x42b, q1.h), f, { 'name': iU(0xc42, 'mRB^'), 'hash': c }, !0x1, [iU(0x992, q1.i)]);
    return new Uint8Array(await crypto[iU(0x14f5, q1.j)][iU(q1.k, q1.l)](iU(q1.m, q1.m), h, g));
}

async function digestBytes(c, f) {
    const q2 = { c: 0x193f },
        iV = fX;
    return new Uint8Array(await crypto[iV(0xfc, '$p[^')][iV(q2.c, '6UCx')](c, f));
}

async function tls12Prf(c, f, g, h, i = fX(0x145b, '1qbp')) {
    const q3 = { c: 0x1464, f: 0x772, g: 'CeJW' },
        iW = fX,
        j = concatBytes(textEncoder[iW(q3.c, 'V#kN')](f), g);
    let k = new Uint8Array(0x0),
        l = j;
    for (; k[iW(q3.f, '$p[^')] < h;) {
        l = await hmac(i, c, l);
        const m = await hmac(i, c, concatBytes(l, j));
        k = concatBytes(k, m);
    }
    return k[iW(0x1dcc, q3.g)](0x0, h);
}

async function hkdfExtract(c, f, g) {
    const q4 = { c: 0x1261 },
        iX = fX;
    return f && f[iX(q4.c, 'GzjL')] || (f = new Uint8Array(hashByteLength(c))), hmac(c, f, g);
}

async function hkdfExpandLabel(c, f, g, h, i) {
    const q6 = { c: 0x924, f: 'dZbH', g: 0xf5c, h: '[]Y1', i: 0x131a, j: 'n7E3', k: 0xd77 },
        q5 = { c: 0x10e, f: 'PYt$', g: 'Gn7Q' },
        iY = fX,
        j = textEncoder[iY(q6.c, q6.f)](iY(q6.g, q6.h) + g);
    return async function(k, l, m, n) {
        const iZ = iY,
            o = hashByteLength(k),
            p = Math[iZ(q5.c, q5.f)](n / o);
        let q = new Uint8Array(0x0),
            r = new Uint8Array(0x0);
        for (let s = 0x1; s <= p; s++) {
            r = await hmac(k, l, concatBytes(r, m, [s]));
            q = concatBytes(q, r);
        }
        return q[iZ(0xafd, q5.g)](0x0, n);
    }(c, f, tlsBytes(uint16be(i), j[iY(q6.i, q6.j)], j, h[iY(q6.k, 'dbGg')], h), i);
}

async function generateKeyShare(c = fX(0x16e0, 'GzjL')) {
    const q7 = { c: 0x556, f: 'C2T0', g: 0x105c, h: 0x1a9c, i: 'mRB^', j: 0x125f, k: 'oeP*', l: 0x787, m: 0x116a, n: 'PYt$', o: 0x1316, p: 0x1d3b, q: '5M6D' },
        j0 = fX,
        f = j0(q7.c, q7.f) === c ? { 'name': j0(q7.g, '9rQu') } : { 'name': j0(q7.h, 'IcEg'), 'namedCurve': c },
        g = await crypto[j0(0x1598, 'wCGK')][j0(0x54a, q7.i)](f, !0x0, [j0(q7.j, q7.k)]),
        h = await crypto[j0(q7.l, 'yxI7')][j0(q7.m, q7.n)](j0(q7.o, '9rQu'), g[j0(q7.p, q7.q)]);
    return { 'keyPair': g, 'publicKeyRaw': new Uint8Array(h) };
}

async function deriveSharedSecret(c, f, g = fX(0x1b99, '*lLT')) {
    const q8 = { c: '60r9', f: 0x1ee5, g: 'dbGg', h: 0xd4e, i: 'vel(', j: 0x182f, k: 'XITC', l: '2#Qk', m: 0x181c, n: '[]Y1', o: 'Pt3!', p: 0x274, q: '89Hn', r: 'PSkb' },
        j1 = fX,
        h = j1(0x19a7, q8.c) === g ? { 'name': j1(q8.f, q8.g) } : { 'name': j1(q8.h, q8.i), 'namedCurve': g },
        i = await crypto[j1(q8.j, q8.k)][j1(0x430, 'Gn7Q')](j1(0x5de, 'wCGK'), f, h, !0x1, []),
        j = j1(0x1ad5, q8.l) === g ? 0x180 : j1(q8.m, q8.n) === g ? 0x210 : 0x100;
    return new Uint8Array(await crypto[j1(0xc52, q8.o)][j1(q8.p, q8.q)]({ 'name': h[j1(0x5c3, q8.r)], 'public': i }, c, j));
}

async function importAesGcmKey(c, f) {
    const q9 = { c: '5M6D', f: 0x175d, g: '#sM9', h: 0x10eb, i: 0x126b },
        j2 = fX;
    return crypto[j2(0x5f8, q9.c)][j2(q9.f, q9.g)](j2(q9.h, 'jODS'), c, { 'name': j2(q9.i, 'wCGK') }, !0x1, f);
}

async function aesGcmEncryptWithKey(c, f, g, h) {
    const qa = { c: 0x1a9d, f: '60r9', g: '6UCx' },
        j3 = fX;
    return new Uint8Array(await crypto[j3(qa.c, qa.f)][j3(0x17ad, 'dn8p')]({ 'name': j3(0x7ea, qa.g), 'iv': f, 'additionalData': h, 'tagLength': 0x80 }, c, g));
}

async function aesGcmDecryptWithKey(c, f, g, h) {
    const qb = { c: 0xed9, f: 0xf90, g: 'PSkb' },
        j4 = fX;
    return new Uint8Array(await crypto[j4(0xcf9, '89Hn')][j4(qb.c, 'w3Tt')]({ 'name': j4(qb.f, qb.g), 'iv': f, 'additionalData': h, 'tagLength': 0x80 }, c, g));
}

function rotateLeft32(c, f) { return (c << f | c >>> 0x20 - f) >>> 0x0; }

function chachaQuarterRound(c, f, g, h, i) {
    c[f] = c[f] + c[g] >>> 0x0, c[i] = rotateLeft32(c[i] ^ c[f], 0x10), c[h] = c[h] + c[i] >>> 0x0, c[g] = rotateLeft32(c[g] ^ c[h], 0xc), c[f] = c[f] + c[g] >>> 0x0, c[i] = rotateLeft32(c[i] ^ c[f], 0x8), c[h] = c[h] + c[i] >>> 0x0, c[g] = rotateLeft32(c[g] ^ c[h], 0x7);
}

function chacha20Block(c, f, g) {
    const qe = { c: 'wCGK', f: 0x19c4, g: 0x521, h: '[]Y1', i: 0x1786, j: 'Gn7Q', k: 0x161b, l: 'egod', m: 'CeJW', n: 0x93d, o: 0x834, p: '$BSl' },
        j5 = fX,
        h = new Uint32Array(0x10);
    h[0x0] = 0x61707865, h[0x1] = 0x3320646e, h[0x2] = 0x79622d32, h[0x3] = 0x6b206574;
    const i = new DataView(c[j5(0xaa0, qe.c)], c[j5(qe.f, '[p9(')], c[j5(qe.g, qe.h)]);
    for (let l = 0x0; l < 0x8; l++) h[0x4 + l] = i[j5(0x1c4c, 'NMJQ')](0x4 * l, !0x0);
    h[0xc] = f;
    const j = new DataView(g[j5(0xaa0, 'wCGK')], g[j5(0x1d2b, 'egod')], g[j5(qe.i, qe.j)]);
    h[0xd] = j[j5(qe.k, '*lLT')](0x0, !0x0), h[0xe] = j[j5(0x1a70, qe.l)](0x4, !0x0), h[0xf] = j[j5(0xe6c, qe.m)](0x8, !0x0);
    const k = new Uint32Array(h);
    for (let m = 0x0; m < 0xa; m++) {
        chachaQuarterRound(k, 0x0, 0x4, 0x8, 0xc), chachaQuarterRound(k, 0x1, 0x5, 0x9, 0xd), chachaQuarterRound(k, 0x2, 0x6, 0xa, 0xe), chachaQuarterRound(k, 0x3, 0x7, 0xb, 0xf), chachaQuarterRound(k, 0x0, 0x5, 0xa, 0xf), chachaQuarterRound(k, 0x1, 0x6, 0xb, 0xc), chachaQuarterRound(k, 0x2, 0x7, 0x8, 0xd), chachaQuarterRound(k, 0x3, 0x4, 0x9, 0xe);
    }
    for (let n = 0x0; n < 0x10; n++) k[n] = k[n] + h[n] >>> 0x0;
    return new Uint8Array(k[j5(qe.n, '7NO9')][j5(qe.o, qe.p)](0x0));
}

function chacha20Xor(c, f, g) {
    const qf = { c: 'NMJQ', f: 0x4e5 },
        j6 = fX,
        h = new Uint8Array(g[j6(0x10e6, qf.c)]);
    let i = 0x1;
    for (let j = 0x0; j < g[j6(0x1c85, '6UCx')]; j += 0x40) {
        const k = chacha20Block(c, i++, f),
            l = Math[j6(qf.f, 'yxI7')](0x40, g[j6(0x919, 'C2T0')] - j);
        for (let m = 0x0; m < l; m++) h[j + m] = g[j + m] ^ k[m];
    }
    return h;
}

function poly1305Mac(c, f) {
    const qh = { c: 0x19bf, f: 0x1c22, g: 0x834, h: 0xfa6, i: 'GzjL', j: 0xb28, k: 'PSkb' },
        j7 = fX,
        g = function(m) {
            const n = new Uint8Array(m);
            return n[0x3] &= 0xf, n[0x7] &= 0xf, n[0xb] &= 0xf, n[0xf] &= 0xf, n[0x4] &= 0xfc, n[0x8] &= 0xfc, n[0xc] &= 0xfc, n;
        }(c[j7(qh.c, '$p[^')](0x0, 0x10)),
        h = c[j7(qh.f, 'M5Ii')](0x10, 0x20);
    let i = [0x0n, 0x0n, 0x0n, 0x0n, 0x0n];
    const j = [
        0x3ffffffn & BigInt(g[0x0] | g[0x1] << 0x8 | g[0x2] << 0x10 | g[0x3] << 0x18),
        0x3ffffffn & BigInt(g[0x3] >> 0x2 | g[0x4] << 0x6 | g[0x5] << 0xe | g[0x6] << 0x16),
        0x3ffffffn & BigInt(g[0x6] >> 0x4 | g[0x7] << 0x4 | g[0x8] << 0xc | g[0x9] << 0x14),
        0x3ffffffn & BigInt(g[0x9] >> 0x6 | g[0xa] << 0x2 | g[0xb] << 0xa | g[0xc] << 0x12),
        0x3ffffffn & BigInt(g[0xd] | g[0xe] << 0x8 | g[0xf] << 0x10)
    ];
    for (let m = 0x0; m < f[j7(0xd77, 'dbGg')]; m += 0x10) {
        const n = f[j7(qh.g, '$BSl')](m, m + 0x10),
            o = new Uint8Array(0x11);
        o[j7(qh.h, qh.i)](n), o[n[j7(qh.j, qh.k)]] = 0x1;
        i[0x0] += BigInt(o[0x0] | o[0x1] << 0x8 | o[0x2] << 0x10 | (0x3 & o[0x3]) << 0x18);
        i[0x1] += BigInt(o[0x3] >> 0x2 | o[0x4] << 0x6 | o[0x5] << 0xe | (0xf & o[0x6]) << 0x16);
        i[0x2] += BigInt(o[0x6] >> 0x4 | o[0x7] << 0x4 | o[0x8] << 0xc | (0x3f & o[0x9]) << 0x14);
        i[0x3] += BigInt(o[0x9] >> 0x6 | o[0xa] << 0x2 | o[0xb] << 0xa | o[0xc] << 0x12);
        i[0x4] += BigInt(o[0xd] | o[0xe] << 0x8 | o[0xf] << 0x10 | o[0x10] << 0x18);
        const p = [0x0n, 0x0n, 0x0n, 0x0n, 0x0n];
        for (let r = 0x0; r < 0x5; r++)
            for (let s = 0x0; s < 0x5; s++) {
                const t = r + s;
                t < 0x5 ? p[t] += i[r] * j[s] : p[t - 0x5] += i[r] * j[s] * 0x5n;
            }
        let q = 0x0n;
        for (let u = 0x0; u < 0x5; u++) p[u] += q, i[u] = 0x3ffffffn & p[u], q = p[u] >> 0x1an;
        i[0x0] += 0x5n * q, q = i[0x0] >> 0x1an, i[0x0] &= 0x3ffffffn, i[0x1] += q;
    }
    let k = i[0x0] | i[0x1] << 0x1an | i[0x2] << 0x34n | i[0x3] << 0x4en | i[0x4] << 0x68n;
    k = k + h[j7(0x1569, 'Mmsl')]((v, w, x) => v + (BigInt(w) << BigInt(0x8 * x)), 0x0n) & (0x1n << 0x80n) - 0x1n;
    const l = new Uint8Array(0x10);
    for (let v = 0x0; v < 0x10; v++) l[v] = Number(k >> BigInt(0x8 * v) & 0xffn);
    return l;
}

function chacha20Poly1305Encrypt(c, f, g, h) {
    const qi = { c: 0x16ad, f: 0x5e1, g: 0x1523, h: 'rsIZ', i: 'zs!c', j: 'oeP*', k: 0xd0c, l: 0x292, m: 'IcEg', n: 0x17a6, o: '$p[^', p: 0x1391, q: 'GzjL', r: 0x11da, s: '[]Y1' },
        j8 = fX,
        i = chacha20Block(c, 0x0, f)[j8(qi.c, 'IcEg')](0x0, 0x20),
        j = chacha20Xor(c, f, g),
        k = (0x10 - h[j8(qi.f, 'mRB^')] % 0x10) % 0x10,
        l = (0x10 - j[j8(qi.g, qi.h)] % 0x10) % 0x10,
        m = new Uint8Array(h[j8(qi.f, 'mRB^')] + k + j[j8(0xc3f, 'Gn7Q')] + l + 0x10);
    m[j8(0x4bd, 'b)3q')](h, 0x0), m[j8(0x1dec, qi.i)](j, h[j8(0x1796, qi.j)] + k);
    const n = new DataView(m[j8(0xeb1, '8Ys%')], h[j8(qi.k, 'd%lH')] + k + j[j8(qi.l, qi.m)] + l);
    n[j8(qi.n, '89Hn')](0x0, BigInt(h[j8(0x772, qi.o)]), !0x0), n[j8(qi.p, qi.q)](0x8, BigInt(j[j8(qi.r, qi.s)]), !0x0);
    const o = poly1305Mac(i, m);
    return concatBytes(j, o);
}

function chacha20Poly1305Decrypt(c, f, g, h) {
    const qj = { c: '#sM9', f: 0x126f, g: 'd%lH', h: 0x249, i: '0Ua@', j: 0x1d0f, k: 0xd0c, l: 'd%lH', m: 0x10e1, n: 0x18e0, o: '8Ys%', p: 0xa1f, q: 'Pt3!', r: 0xc3f, s: 'Gn7Q', t: '2#Qk', u: 0x1ac7, v: '$BSl', w: 0x1583, x: 'C2T0' },
        j9 = fX;
    if (g[j9(0xaae, qj.c)] < 0x10) throw new Error(j9(qj.f, qj.g));
    const i = g[j9(qj.h, '8Ys%')](-0x10),
        j = g[j9(0xcc4, qj.i)](0x0, -0x10),
        k = chacha20Block(c, 0x0, f)[j9(qj.j, '7NO9')](0x0, 0x20),
        l = (0x10 - h[j9(0x1ac7, '$BSl')] % 0x10) % 0x10,
        m = (0x10 - j[j9(qj.k, qj.l)] % 0x10) % 0x10,
        n = new Uint8Array(h[j9(qj.m, 'w3Tt')] + l + j[j9(0x1812, 'jODS')] + m + 0x10);
    n[j9(0x1083, '[]Y1')](h, 0x0), n[j9(qj.n, qj.o)](j, h[j9(qj.p, qj.q)] + l);
    const o = new DataView(n[j9(0x92b, '2#Qk')], h[j9(0x111e, '60r9')] + l + j[j9(qj.r, qj.s)] + m);
    o[j9(qj.t, qj.t)](0x0, BigInt(h[j9(qj.u, qj.v)]), !0x0), o[j9(qj.w, '6UCx')](0x8, BigInt(j[j9(0x919, qj.x)]), !0x0);
    const p = poly1305Mac(k, n);
    let q = 0x0;
    for (let r = 0x0; r < 0x10; r++) q |= i[r] ^ p[r];
    if (0x0 !== q) throw new Error(j9(0x1524, 'mRB^'));
    return chacha20Xor(c, f, j);
}

const TLS_MAX_PLAINTEXT_FRAGMENT = 0x10 * 0x400;

function buildTlsRecord(c, f, g = TLS_VERSION_12) {
    const qk = { c: 0x7ba, f: '#sM9' },
        ja = fX,
        h = dataToUint8Array(f),
        i = new Uint8Array(0x5 + h[ja(qk.c, 'oeP*')]);
    return i[0x0] = c, i[0x1] = g >> 0x8 & 0xff, i[0x2] = g & 0xff, i[0x3] = h[ja(0x1a7c, 'rsIZ')] >> 0x8 & 0xff, i[0x4] = h[ja(0x1d5e, qk.f)] & 0xff, i[ja(0x139d, 'Gn7Q')](h, 0x5), i;
}

function buildHandshakeMessage(c, f) {
    const ql = { c: '$BSl' },
        jb = fX;
    return tlsBytes(c, (g => [g >> 0x10 & 0xff, g >> 0x8 & 0xff, 0xff & g])(f[jb(0x1ac7, ql.c)]), f);
}

class TlsRecordParser {
    constructor() { const qm = { c: 0xaa0, f: 'wCGK' },
        jc = fX;
        this[jc(qm.c, qm.f)] = new Uint8Array(0x0); }
    [fX(0x1797, 'zs!c')](c) {
        const qn = { c: 'd%lH', f: 'vel(', g: 'w3Tt', h: 0x119c },
            jd = fX,
            f = dataToUint8Array(c);
        this[jd(0x1f6, qn.c)] = this[jd(0xaea, qn.f)][jd(0x10e1, qn.g)] ? concatBytes(this[jd(qn.h, 'jODS')], f) : f;
    }
    [fX(0x1603, '[p9(')]() {
        const qo = { c: 0x92b, f: 0x919, g: 'C2T0', h: 0x93d, i: '7NO9', j: 0x1843, k: '*lLT', l: 'rsIZ', m: 0xb09, n: 0x1e6b, o: '[p9(', p: 0x1d42 },
            je = fX;
        if (this[je(qo.c, '2#Qk')][je(qo.f, qo.g)] < 0x5) return null;
        const c = this[je(0x1113, '5M6D')][0x0],
            f = readUint16(this[je(0x14c8, 'V#kN')], 0x1),
            g = readUint16(this[je(qo.h, qo.i)], 0x3);
        if (this[je(qo.j, qo.k)][je(0x1523, qo.l)] < 0x5 + g) return null;
        const h = this[je(0x1049, 'b)3q')][je(qo.m, 'ZgMu')](0x5, 0x5 + g);
        return this[je(qo.n, qo.o)] = this[je(0xa4a, 'oeP*')][je(qo.p, '[]Y1')](0x5 + g), { 'type': c, 'version': f, 'length': g, 'fragment': h };
    }
}

class TlsHandshakeParser {
    constructor() { const qp = { c: 0xc48 },
        jf = fX;
        this[jf(qp.c, 'n7E3')] = new Uint8Array(0x0); }
    [fX(0x1e2c, 'GzjL')](c) {
        const qq = { c: 0xeb5, f: 'PSkb', g: 0x17d5, h: 'dn8p', i: 0x1525 },
            jg = fX,
            f = dataToUint8Array(c);
        this[jg(qq.c, qq.f)] = this[jg(qq.g, '[]Y1')][jg(0x181f, qq.h)] ? concatBytes(this[jg(qq.i, 'M5Ii')], f) : f;
    }
    [fX(0x1595, 'GzjL')]() {
        const qr = { c: 0x1189, f: '0Ua@', g: 0xaa0, h: 0x9a0, i: 0x1b26, j: '89Hn', k: 0x71e, l: 0x1adc, m: 0x53b, n: 0xe4a, o: 0xc48, p: 'n7E3' },
            jh = fX;
        if (this[jh(0x6c2, 'T3Fv')][jh(qr.c, qr.f)] < 0x4) return null;
        const c = this[jh(0x1a96, 'C2T0')][0x0],
            f = readUint24(this[jh(qr.g, 'wCGK')], 0x1);
        if (this[jh(0x18b3, 'dbGg')][jh(qr.h, 'V#kN')] < 0x4 + f) return null;
        const g = this[jh(qr.i, qr.j)][jh(qr.k, 'NMJQ')](0x4, 0x4 + f),
            h = this[jh(qr.l, '#sM9')][jh(qr.m, 'n7E3')](0x0, 0x4 + f);
        return this[jh(qr.n, 'CeJW')] = this[jh(qr.o, qr.p)][jh(0x23b, 'wCGK')](0x4 + f), { 'type': c, 'length': f, 'body': g, 'raw': h };
    }
            }
    function parseServerHello(c) {
    const qs = { c: 'd%lH', f: 0x19bf, g: '$p[^', h: '60r9', i: 'V#kN', j: 0x249, k: 'dn8p' },
        ji = fX;
    let f = 0x0;
    const g = readUint16(c, f);
    f += 0x2;
    const h = c[ji(0x16be, qs.c)](f, f + 0x20);
    f += 0x20;
    const i = c[f++],
        j = c[ji(qs.f, qs.g)](f, f + i);
    f += i;
    const k = readUint16(c, f);
    f += 0x2;
    const l = c[f++];
    let m = g,
        n = null,
        o = null;
    if (f < c[ji(0x111e, qs.h)]) {
        const q = readUint16(c, f);
        f += 0x2;
        const r = f + q;
        for (; f + 0x4 <= r;) {
            const s = readUint16(c, f);
            f += 0x2;
            const t = readUint16(c, f);
            f += 0x2;
            const u = c[ji(0x164, qs.i)](f, f + t);
            if (f += t, s === EXT_SUPPORTED_VERSIONS && t >= 0x2) m = readUint16(u, 0x0);
            else {
                if (s === EXT_KEY_SHARE && t >= 0x4) {
                    const v = readUint16(u, 0x0),
                        w = readUint16(u, 0x2);
                    n = { 'group': v, 'key': u[ji(qs.j, '8Ys%')](0x4, 0x4 + w) };
                } else s === EXT_APPLICATION_LAYER_PROTOCOL_NEGOTIATION && t >= 0x3 && (o = textDecoder[ji(0xd2c, qs.c)](u[ji(0x1ab2, qs.k)](0x3, 0x3 + u[0x2])));
            }
        }
    }
    const p = new Uint8Array([0xcf, 0x21, 0xad, 0x74, 0xe5, 0x9a, 0x61, 0x11, 0xbe, 0x1d, 0x8c, 0x2, 0x1e, 0x65, 0xb8, 0x91, 0xc2, 0xa2, 0x11, 0x16, 0x7a, 0xbb, 0x8c, 0x5e, 0x7, 0x9e, 0x9, 0xe2, 0xc8, 0xa8, 0x33, 0x9c]);
    return { 'version': g, 'serverRandom': h, 'sessionId': j, 'cipherSuite': k, 'compression': l, 'selectedVersion': m, 'keyShare': n, 'alpn': o, 'isHRR': constantTimeEqual(h, p), 'isTls13': m === TLS_VERSION_13 };
}

function parseServerKeyExchange(c) {
    const qt = { c: 'V#kN' },
        jj = fX;
    let f = 0x1;
    const g = readUint16(c, f);
    f += 0x2;
    const h = c[f++];
    return { 'namedCurve': g, 'serverPublicKey': c[jj(0x164, qt.c)](f, f + h) };
}

function extractLeafCertificate(c, f = 0x0) {
    const qu = { c: '8Ys%', f: 0x17d6 },
        jk = fX;
    let g = 0x0;
    if (f) {
        const j = c[g++];
        g += j;
    }
    if (g + 0x3 > c[jk(0x7c1, qu.c)]) return null;
    const h = readUint24(c, g);
    if (g += 0x3, !h || g + 0x3 > c[jk(qu.f, '[p9(')]) return null;
    const i = readUint24(c, g);
    return g += 0x3, i ? c[jk(0x159a, 'w(Wr')](g, g + i) : null;
}

function parseEncryptedExtensions(c) {
    const qv = { c: 0x1bb4, f: '9rQu' },
        jl = fX,
        f = { 'alpn': null };
    let g = 0x2;
    const h = 0x2 + readUint16(c, 0x0);
    for (; g + 0x4 <= h;) {
        const i = readUint16(c, g);
        g += 0x2;
        const j = readUint16(c, g);
        if (g += 0x2, i === EXT_APPLICATION_LAYER_PROTOCOL_NEGOTIATION && j >= 0x3) {
            const k = c[g + 0x2];
            k > 0x0 && g + 0x3 + k <= g + j && (f[jl(0x300, '1qbp')] = textDecoder[jl(qv.c, qv.f)](c[jl(0x1794, 'oeP*')](g + 0x3, g + 0x3 + k)));
        }
        g += j;
    }
    return f;
}

function buildClientHello(c, f, g, { tls13: h = !0x0, tls12: i = !0x0, alpn: alpn = null, chacha: chacha = !0x0 } = {}) {
    const qx = { c: 0x1d57, f: 'dZbH', g: 0x18cd, h: 'C2T0', i: 0x1c52, j: 0xcfc, k: 'M5Ii', l: 0xaca, m: 0x1601, n: 'dn8p', o: 0x1730, p: 0x925, q: '[p9(', r: '0Ua@', s: 0x7c1, t: 0x18ed, u: 0x1d2d, v: 0xcfc, w: 'PYt$', x: 0xf37, y: 'Gn7Q', z: '#sM9', A: '%oj0', B: 0x1323, C: 'GzjL', D: 0xfa4, E: 'vel(', F: 'IcEg', G: 0x1266, H: 'V#kN', I: 0x1357, J: 0x131a, K: 'n7E3', L: 0x19e4, M: 'jODS', N: '60r9', O: 'w(Wr', P: 0x1bd9, Q: 'd%lH', R: 0x292, S: 'CeJW' },
        qw = { c: 0x1e7a, f: 'wCGK' },
        jm = fX,
        j = [];
    h && j[jm(qx.c, qx.f)](0x1301, 0x1302, ...chacha ? [0x1303] : []), i && j[jm(qx.g, 'yxI7')](0xc02f, 0xc030, 0xc02b, 0xc02c, ...chacha ? [0xcca8, 0xcca9] : []);
    const k = tlsBytes(...j[jm(0x1a48, qx.h)](uint16be)),
        l = [tlsBytes(0xff, 0x1, 0x0, 0x1, 0x0)];
    if (f) {
        const p = textEncoder[jm(qx.i, 'mRB^')](f),
            q = tlsBytes(0x0, uint16be(p[jm(qx.j, 'PYt$')]), p);
        l[jm(0x1ec6, qx.k)](tlsBytes(uint16be(EXT_SERVER_NAME), uint16be(q[jm(0x88c, 'yxI7')] + 0x2), uint16be(q[jm(qx.l, 'ZgMu')]), q));
    }
    l[jm(0x169f, '$p[^')](tlsBytes(uint16be(EXT_EC_POINT_FORMATS), 0x0, 0x2, 0x1, 0x0)), l[jm(0x78f, 'Mmsl')](tlsBytes(uint16be(EXT_SUPPORTED_GROUPS), 0x0, 0x6, 0x0, 0x4, 0x0, 0x1d, 0x0, 0x17));
    const m = tlsBytes(...SUPPORTED_SIGNATURE_ALGORITHMS[jm(qx.m, qx.n)](uint16be));
    l[jm(qx.o, 'PYt$')](tlsBytes(uint16be(EXT_SIGNATURE_ALGORITHMS), uint16be(m[jm(0x1c85, '6UCx')] + 0x2), uint16be(m[jm(qx.p, '89Hn')]), m));
    const n = Array[jm(0x1c45, qx.q)](alpn) ? alpn[jm(0x86e, qx.r)](Boolean) : alpn ? [alpn] : [];
    if (n[jm(qx.s, '8Ys%')]) {
        const r = concatBytes(...n[jm(0x14de, '9rQu')](s => {
            const jn = jm,
                t = textEncoder[jn(0x5b5, 'yxI7')](s);
            return tlsBytes(t[jn(qw.c, qw.f)], t);
        }));
        l[jm(qx.t, 'Pt3!')](tlsBytes(uint16be(EXT_APPLICATION_LAYER_PROTOCOL_NEGOTIATION), uint16be(r[jm(qx.u, 'M5Ii')] + 0x2), uint16be(r[jm(qx.v, qx.w)]), r));
    }
    if (h && g) {
        let s;
        if (l[jm(qx.x, qx.y)](i ? tlsBytes(uint16be(EXT_SUPPORTED_VERSIONS), 0x0, 0x5, 0x4, 0x3, 0x4, 0x3, 0x3) : tlsBytes(uint16be(EXT_SUPPORTED_VERSIONS), 0x0, 0x3, 0x2, 0x3, 0x4)), l[jm(0x120e, qx.z)](tlsBytes(uint16be(EXT_PSK_KEY_EXCHANGE_MODES), 0x0, 0x2, 0x1, 0x1)), g?.[jm(0x1abb, qx.A)] && g?.[jm(qx.B, qx.C)]) s = concatBytes(tlsBytes(0x0, 0x1d, uint16be(g[jm(0x1e86, 'd%lH')][jm(0x17d6, '[p9(')]), g[jm(qx.D, '$BSl')]), tlsBytes(0x0, 0x17, uint16be(g[jm(0xc56, qx.E)][jm(0x1106, '9rQu')]), g[jm(0xcb9, qx.F)]));
        else {
            if (g?.[jm(qx.G, qx.H)]) s = tlsBytes(0x0, 0x1d, uint16be(g[jm(qx.I, qx.k)][jm(qx.J, qx.K)]), g[jm(0x9b7, '$p[^')]);
            else {
                if (g?.[jm(qx.L, 'mRB^')]) s = tlsBytes(0x0, 0x17, uint16be(g[jm(0x197e, qx.M)][jm(0x919, qx.h)]), g[jm(0x75d, qx.N)]);
                else {
                    if (!(g instanceof Uint8Array)) throw new Error(jm(0x23a, '8Ys%'));
                    s = tlsBytes(0x0, 0x17, uint16be(g[jm(0x113c, qx.O)]), g);
                }
            }
        }
        l[jm(qx.P, 'dbGg')](tlsBytes(uint16be(EXT_KEY_SHARE), uint16be(s[jm(0xd0c, qx.Q)] + 0x2), uint16be(s[jm(qx.R, 'IcEg')]), s));
    }
    const o = concatBytes(...l);
    return buildHandshakeMessage(HANDSHAKE_TYPE_CLIENT_HELLO, tlsBytes(uint16be(TLS_VERSION_12), c, 0x0, uint16be(k[jm(0x1c75, qx.S)]), k, 0x1, 0x0, uint16be(o[jm(0x1913, 'egod')]), o));
}

const uint64be = c => {
    const qy = { c: 0x105e, f: 'dn8p' },
        jo = fX,
        f = new Uint8Array(0x8);
    return new DataView(f[jo(0x14d2, '1qbp')])[jo(qy.c, qy.f)](0x0, c, !0x1), f;
},
xorSequenceIntoIv = (c, f) => {
    const qz = { c: 'Pt3!', f: 0x1913, g: 'egod' },
        jp = fX,
        g = c[jp(0x1943, qz.c)](),
        h = uint64be(f);
    for (let i = 0x0; i < 0x8; i++) g[g[jp(qz.f, qz.g)] - 0x8 + i] ^= h[i];
    return g;
},
deriveTrafficKeys = (c, f, g, h) => Promise[fX(0x3c9, '%oj0')]([hkdfExpandLabel(c, f, fX(0x5c0, 'IcEg'), EMPTY_BYTES, g), hkdfExpandLabel(c, f, 'iv', EMPTY_BYTES, h)]);

class TlsClient {
    constructor(c, f = {}) {
        const qA = { c: 0x1792, f: 'oeP*', g: 0xb45, h: 0xe45, i: 'oeP*', j: 0x1db5, k: 'yxI7', l: 0x123e, m: 'Mmsl', n: 0x16da, o: 0xdf0, p: 'dn8p', q: 0x106e, r: 0x1c59, s: 'NMJQ', t: 0x176c, u: '6UCx', v: 0x106, w: 'jODS', x: '9rQu', y: 0x27e, z: 0x186e, A: 0x1662, B: 0x1383, C: 0x1e5a, D: 0x166a, E: 0x46a, F: 'zs!c', G: 0x3a1, H: 0xbfb, I: 0xaed, J: 0x1a1b, K: 0x1d74, L: '1qbp', M: '[]Y1', N: 0x1958, O: 'w3Tt', P: '$p[^', Q: 0x14c4, R: 0x75c, S: 0x802, T: 0xe92, U: 0x1b64, V: 0x771, W: 'C2T0' },
            jq = fX;
        if (this[jq(qA.c, '%oj0')] = c, this[jq(0x9be, qA.f)] = f[jq(qA.g, 'ZgMu')] || '', this[jq(0xd8e, 'w3Tt')] = !0x1 !== f[jq(0x1876, '*lLT')], this[jq(0x604, 'V#kN')] = !0x1 !== f[jq(qA.h, qA.i)], !this[jq(0x1761, '9rQu')] && !this[jq(qA.j, qA.k)]) throw new Error(jq(qA.l, qA.m));
        this[jq(0x16df, '[]Y1')] = Array[jq(qA.n, 'd%lH')](f[jq(qA.o, 'vel(')]) ? f[jq(0x1b86, qA.p)] : f[jq(0x1c1f, 'wCGK')] ? [f[jq(qA.q, qA.f)]] : null, this[jq(qA.r, qA.s)] = f[jq(0x1efc, 'd%lH')] !== ![], this[jq(0x1eee, '7NO9')] = f[jq(qA.t, '5M6D')] ?? 0x7530, this[jq(0x195b, qA.u)] = randomBytes(0x20), this[jq(0x397, '%oj0')] = null, this[jq(qA.v, 'dZbH')] = [], this[jq(0x8e4, qA.w)] = !0x1, this[jq(0x1e8f, qA.x)] = null, this[jq(0xe87, qA.w)] = null, this[jq(qA.y, 'Pt3!')] = null, this[jq(qA.z, 'jODS')] = !0x1, this[jq(qA.A, 'C2T0')] = null, this[jq(qA.B, 'NMJQ')] = null, this[jq(qA.C, 'Pt3!')] = null, this[jq(qA.D, 'dn8p')] = null, this[jq(qA.E, qA.F)] = null, this[jq(qA.G, 'Gn7Q')] = null, this[jq(0x1bbc, 'C2T0')] = null, this[jq(0x1190, 'jODS')] = null, this[jq(0xf72, qA.k)] = null, this[jq(qA.H, 'XITC')] = null, this[jq(qA.I, 'Mmsl')] = null, this[jq(qA.J, '9rQu')] = null, this[jq(qA.K, qA.L)] = null, this[jq(0xe98, qA.M)] = null, this[jq(0x1ab7, 'vel(')] = null, this[jq(0x13ba, '$p[^')] = null, this[jq(qA.N, qA.O)] = null, this[jq(0x165a, qA.P)] = null, this[jq(qA.Q, 'yxI7')] = null, this[jq(qA.R, 'n7E3')] = null, this[jq(qA.S, 'n7E3')] = 0x0n, this[jq(qA.T, 'ZgMu')] = 0x0n, this[jq(qA.U, 'GzjL')] = new TlsRecordParser(), this[jq(0x146b, '8Ys%')] = new TlsHandshakeParser(), this[jq(0x116f, 'mRB^')] = new Map(), this[jq(qA.V, 'PSkb')] = null, this[jq(0x1da3, qA.W)] = !0x1;
    }
    [fX(0x1af0, 'yxI7')](c) { const qB = { c: 0x147b, f: '[]Y1' },
        jr = fX;
        this[jr(0x1852, '#sM9')][jr(qB.c, qB.f)](c); }
    [fX(0x1621, 'XITC')]() {
        const qC = { c: 'zs!c', f: 0x925, g: '89Hn', h: 0x9c8, i: 'Pt3!', j: 0x2b0, k: 'dbGg' },
            js = fX;
        return 0x1 === this[js(0x1114, qC.c)][js(qC.f, qC.g)] ? this[js(qC.h, qC.i)][0x0] : concatBytes(...this[js(qC.j, qC.k)]);
    }
    [fX(0x1079, 'vel(')](c) { const qD = { c: 'b)3q' },
        jt = fX;
        return CIPHER_SUITES_BY_ID[jt(0x5cd, qD.c)](c) || null; }
    async [fX(0x143, 'egod')](c) {
        const qE = { c: 0xb5f, f: '8Ys%', g: 0xa2a },
            ju = fX;
        return this[ju(0x1440, 'ZgMu')] ? Promise[ju(qE.c, qE.f)]([c[ju(qE.g, '89Hn')](), new Promise((f, g) => setTimeout(() => g(new Error(ju(0x6c0, '8Ys%'))), this[ju(0x71c, 'oeP*')]))]) : c[ju(0x1286, '8Ys%')]();
    }
    async [fX(0x13df, '60r9')](c, f, g) {
        const qF = { c: '[p9(', f: 0xd95, g: 'jODS', h: 'n7E3' },
            jv = fX;
        for (;;) {
            let h;
            for (; h = this[jv(0xe64, '[]Y1')][jv(0x1603, qF.c)]();)
                if (await f(h)) return;
            const { value: i, done: j } = await this[jv(qF.f, qF.g)](c);
            if (j) throw new Error(g);
            this[jv(0xf57, qF.h)][jv(0x129d, 'dbGg')](i);
        }
    }
    async [fX(0x1cb4, '%oj0')](c, f, g) {
        const qH = { c: 0x15d7, f: '#sM9' },
            qG = { c: 0x2a7, f: 'wCGK', g: 0x1930, h: 'oeP*', i: 0xb19, j: 'ZgMu', k: 'mRB^', l: 0xa77, m: 'w(Wr' },
            jw = fX;
        for (let h; h = this[jw(0xf54, 'Pt3!')][jw(qH.c, qH.f)]();)
            if (await f(h)) return;
        return this[jw(0x1199, '[p9(')](c, async i => {
            const jx = jw;
            if (i[jx(0x1c97, 'rsIZ')] === CONTENT_TYPE_ALERT) {
                if (shouldIgnoreTlsAlert(i[jx(qG.c, qG.f)])) return;
                throw new Error(jx(qG.g, qG.h) + i[jx(0x148, 'XITC')][0x1]);
            }
            if (i[jx(qG.i, qG.j)] === CONTENT_TYPE_HANDSHAKE) {
                this[jx(0xb97, qG.j)][jx(0x1f1b, qG.k)](i[jx(qG.l, qG.m)]);
                for (let j; j = this[jx(0x1a95, 'dn8p')][jx(0x1804, '6UCx')]();)
                    if (await f(j)) return 0x1;
            }
        }, g);
    }
    async [fX(0x1cb6, 'M5Ii')](c) {
        const qI = { c: 'ZgMu', f: '$p[^' },
            jy = fX;
        if (!c?.[jy(0xaca, qI.c)]) throw new Error(jy(0xc6b, qI.f));
        this[jy(0xd2e, 'wCGK')] = !0x0;
    }
        }
    async [fX(0x1294, '[p9(')]() {
    const qJ = { c: 'PSkb', f: 0x1374, g: 0xeb2, h: 'T3Fv', i: 0xf97, j: 'CeJW', k: 0x8d9, l: '7NO9', m: 'vel(', n: 0x1a8a, o: 0xec4, p: '*lLT', q: 0x18f7, r: '%oj0', s: 0x1a65, t: 0xe1d, u: '60r9', v: 0x428, w: 'b)3q', x: 0xd32, y: 0xd8a, z: '*lLT', A: '8Ys%', B: 'M5Ii', C: 0xc73, D: 0x1e78, E: 'Pt3!', F: 'IcEg', G: 0xe5c, H: 0x9df, I: 0x124a, J: '2#Qk', K: 'd%lH', L: 0x580, M: 0x1564, N: '$p[^', O: 0xbca, P: 0x1b9a, Q: 0x1b34 },
        jz = fX,
        [c, f] = await Promise[jz(0xc4d, qJ.c)]([generateKeyShare(jz(qJ.f, '6UCx')), generateKeyShare(jz(qJ.g, qJ.h))]);
    this[jz(qJ.i, qJ.j)] = new Map([
        [0x17, c],
        [0x1d, f]
    ]), this[jz(qJ.k, 'dbGg')] = c[jz(0x17c8, qJ.l)];
    const g = this[jz(0x1144, qJ.m)][jz(qJ.n, '[p9(')][jz(0x1ee, 'egod')](),
        h = this[jz(0x589, 'w(Wr')][jz(qJ.o, qJ.p)][jz(qJ.q, 'NMJQ')]();
    try {
        const i = buildClientHello(this[jz(0x1000, qJ.r)], this[jz(qJ.s, '[p9(')], { 'x25519': f[jz(0x11b, 'jODS')], 'p256': c[jz(qJ.t, qJ.u)] }, { 'tls13': this[jz(qJ.v, qJ.w)], 'tls12': this[jz(0x1682, 'n7E3')], 'alpn': this[jz(0x1db7, 'dZbH')], 'chacha': this[jz(0x1721, 'dn8p')] });
        this[jz(qJ.x, 'dZbH')](i), await h[jz(qJ.y, qJ.z)](buildTlsRecord(CONTENT_TYPE_HANDSHAKE, i, TLS_VERSION_10));
        const j = await this[jz(0x1e4c, qJ.A)](g);
        if (j[jz(0xe51, qJ.B)]) throw new Error(jz(qJ.C, '$BSl'));
        if (j[jz(0x2be, 'dZbH')]?.[jz(qJ.D, qJ.E)] && this[jz(0x465, qJ.F)][jz(qJ.G, 'jODS')](j[jz(0x1ae0, '$p[^')][jz(0x43a, 'Gn7Q')])) {
            const k = this[jz(0x1555, 'n7E3')][jz(qJ.H, 'dn8p')](j[jz(qJ.I, qJ.J)][jz(0x1004, qJ.m)]);
            this[jz(0x1d01, '8Ys%')] = k[jz(0x1925, qJ.K)];
        }
        j[jz(qJ.L, 'ZgMu')] ? await this[jz(0x8a5, qJ.c)](g, h, j) : await this[jz(qJ.M, qJ.N)](g, h), this[jz(qJ.O, '0Ua@')] = !0x0;
    } finally { g[jz(qJ.P, qJ.J)](), h[jz(qJ.Q, '$p[^')](); }
}
async [fX(0x19e9, 'C2T0')](c) {
    const qK = { c: 0x19c7, f: '$p[^', g: '6UCx', h: '60r9', i: 'ZgMu', j: 0x2b3, k: '*lLT', l: 0x42a, m: '#sM9', n: 0x25c, o: 'PYt$', p: 'wCGK', q: 0xd85, r: 0xa77, s: 0x1d5a, t: 0xc2a, u: '[p9(', v: 0x7cd, w: 'V#kN', x: 0x995, y: 'M5Ii', z: '$BSl', A: 0x1dd7, B: 'dn8p', C: 0x1a6, D: 'CeJW', E: 0x34c, F: 0x708, G: 0x38b, H: 0x164d, I: 'dZbH', J: 0x186e, K: 'jODS', L: 'T3Fv', M: 0xf2c, N: 'mRB^' },
        jA = fX;
    for (;;) {
        const { value: f, done: g } = await this[jA(qK.c, qK.f)](c);
        if (g) throw new Error(jA(0x1928, qK.g));
        let h;
        for (this[jA(0x1c5f, 'V#kN')][jA(qK.h, qK.i)](f); h = this[jA(0x1e18, qK.i)][jA(qK.j, '$p[^')]();) {
            if (h[jA(0x18c9, qK.k)] === CONTENT_TYPE_ALERT) {
                if (shouldIgnoreTlsAlert(h[jA(qK.l, qK.m)])) continue;
                throw new Error(jA(qK.n, qK.o) + h[jA(0x2a7, qK.p)][0x0] + jA(qK.q, qK.f) + h[jA(qK.r, 'w(Wr')][0x1]);
            }
            if (h[jA(qK.s, '89Hn')] !== CONTENT_TYPE_HANDSHAKE) continue;
            let i;
            for (this[jA(qK.t, qK.u)][jA(qK.v, 'V#kN')](h[jA(0x1e68, qK.w)]); i = this[jA(qK.x, qK.y)][jA(qK.j, qK.z)]();) {
                if (i[jA(qK.A, qK.B)] !== HANDSHAKE_TYPE_SERVER_HELLO) continue;
                this[jA(0x13bc, 'zs!c')](i[jA(qK.C, qK.D)]);
                const j = parseServerHello(i[jA(0xa02, 'dbGg')]);
                if (this[jA(qK.E, qK.f)] = j[jA(qK.F, 'M5Ii')], this[jA(qK.G, 'V#kN')] = j[jA(0x6e0, '6UCx')], this[jA(qK.H, qK.I)] = this[jA(0x1caa, '89Hn')](j[jA(0x761, 'Mmsl')]), this[jA(qK.J, qK.K)] = j[jA(0xf12, '2#Qk')], this[jA(0x679, '[]Y1')] = j[jA(0xed3, qK.L)] || null, !this[jA(qK.M, 'dbGg')]) throw new Error(jA(0x1977, qK.I) + j[jA(0x81b, qK.D)][jA(0x21c, qK.N)](0x10));
                return j;
            }
        }
    }
}
async [fX(0x1564, '$p[^')](c, f) {
    const qN = { c: 'rsIZ', f: 0x1577, g: 0x1cd2, h: '9rQu', i: 0x1b2a, j: 'vel(', k: 0xf8d, l: 'Gn7Q', m: 'GzjL', n: 0x1244, o: 0xe6f, p: 'V#kN', q: 0x1141, r: 'egod', s: 0x1a68, t: 0x277, u: 0x1005, v: '89Hn', w: 0x10e5, x: 0x30f, y: '$p[^', z: 0xd67, A: 'M5Ii', B: '5M6D', C: 0x795, D: '60r9', E: 0x2ba, F: '$BSl', G: 0xf07, H: 0x96c, I: 'yxI7', J: 0x7ff, K: 0x1dd3, L: 0x10e7, M: 0xa85, N: 0x1980, O: 0x11cd, P: '*lLT', Q: 'Gn7Q', R: 'C2T0', S: 0x982, T: 0x1a59, U: 0x1705, V: '2#Qk', W: 0xb0c, X: 0x387, Y: 'dbGg', Z: 0x165b, a0: 0x1481, a1: 'dn8p', a2: 0x47e, a3: 0x19f8, a4: 'mRB^', a5: 0x1a08, a6: '#sM9', a7: 'vel(', a8: 'w3Tt' },
        qM = { c: 0x965, f: 'b)3q', g: 0xa77, h: 'w(Wr', i: 0x86d, j: 0x707, k: 'PSkb', l: 0x1164, m: 0x1300, n: 'C2T0', o: 0x10e7, p: 'M5Ii' },
        qL = { c: 'GzjL', f: 0x2a5, g: 0x84f, h: 0x13ee, i: 0x1414, j: 'n7E3', k: 0x1180, l: 0xa73, m: 0xf83, n: 0x330, o: 0xa45, p: 0xc9d, q: 0x5de, r: 'wCGK' },
        jB = fX;
    let g = null,
        h = !0x1;
    if (await this[jB(0xdff, qN.c)](c, async u => {
            const jC = jB;
            switch (u[jC(0x370, qL.c)]) {
                case HANDSHAKE_TYPE_CERTIFICATE: {
                    this[jC(qL.f, 'M5Ii')](u[jC(qL.g, 'mRB^')]);
                    const v = extractLeafCertificate(u[jC(qL.h, 'V#kN')], 0x1);
                    if (!v) throw new Error(jC(qL.i, qL.j));
                    await this[jC(qL.k, 'IcEg')](v);
                    break;
                }
                case HANDSHAKE_TYPE_SERVER_KEY_EXCHANGE:
                    this[jC(0x1db8, 'ZgMu')](u[jC(qL.l, '[]Y1')]), g = parseServerKeyExchange(u[jC(0x1eb8, '9rQu')]);
                    break;
                case HANDSHAKE_TYPE_SERVER_HELLO_DONE:
                    return this[jC(qL.m, 'd%lH')](u[jC(qL.n, 'Mmsl')]), h = !0x0, 0x1;
                case HANDSHAKE_TYPE_CERTIFICATE_REQUEST:
                    throw new Error(jC(qL.o, 'w(Wr'));
                default:
                    this[jC(qL.p, 'jODS')](u[jC(qL.q, qL.r)]);
            }
        }, jB(qN.f, '0Ua@')), !this[jB(qN.g, qN.h)]) throw new Error(jB(0x864, 'dn8p'));
    const i = g;
    if (!i) throw new Error(jB(qN.i, qN.j));
    const j = GROUPS_BY_ID[jB(0x764, 'M5Ii')](i[jB(qN.k, qN.l)]);
    if (!j) throw new Error(jB(0x85a, '0Ua@') + i[jB(0x110c, 'ZgMu')][jB(qN.m, 'mRB^')](0x10));
    const k = this[jB(qN.n, '89Hn')][jB(qN.o, qN.p)](i[jB(qN.q, qN.r)]);
    if (!k) throw new Error(jB(qN.s, '89Hn') + i[jB(qN.t, 'M5Ii')][jB(qN.u, 'wCGK')](0x10));
    const l = await deriveSharedSecret(k[jB(0xb47, qN.v)][jB(qN.w, 'zs!c')], i[jB(qN.x, qN.y)], j),
        m = buildHandshakeMessage(HANDSHAKE_TYPE_CLIENT_KEY_EXCHANGE, tlsBytes(k[jB(qN.z, qN.A)][jB(0x1106, '9rQu')], k[jB(0xead, qN.B)]));
    this[jB(qN.C, qN.D)](m);
    const n = this[jB(qN.E, qN.F)][jB(0xc77, 'dn8p')];
    this[jB(qN.G, 'PSkb')] = await tls12Prf(l, jB(qN.H, qN.I), concatBytes(this[jB(0x1a3e, 'NMJQ')], this[jB(qN.J, 'XITC')]), 0x30, n);
    const o = this[jB(0x6f9, '60r9')][jB(0x15dd, 'b)3q')],
        p = this[jB(qN.K, '9rQu')][jB(0xc59, '7NO9')],
        q = await tls12Prf(this[jB(qN.L, '[]Y1')], jB(qN.M, 'dZbH'), concatBytes(this[jB(0x507, '$BSl')], this[jB(qN.N, 'egod')]), 0x2 * o + 0x2 * p, n);
    this[jB(qN.O, qN.P)] = q[jB(0xafd, qN.Q)](0x0, o), this[jB(0x990, qN.R)] = q[jB(qN.S, 'zs!c')](o, 0x2 * o), this[jB(qN.T, qN.c)] = q[jB(0x1ab2, 'dn8p')](0x2 * o, 0x2 * o + p), this[jB(0x490, 'dbGg')] = q[jB(0xcc4, '0Ua@')](0x2 * o + p, 0x2 * o + 0x2 * p);
    if (!this[jB(0x1147, 'CeJW')][jB(qN.U, qN.V)]) [this[jB(qN.W, 'egod')], this[jB(0x1f24, '2#Qk')]] = await Promise[jB(qN.X, qN.Y)]([importAesGcmKey(this[jB(qN.Z, 'zs!c')], [jB(qN.a0, 'b)3q')]), importAesGcmKey(this[jB(0x1a60, 'NMJQ')], [jB(0x312, qN.a1)])]);
    await f[jB(qN.a2, 'XITC')](buildTlsRecord(CONTENT_TYPE_HANDSHAKE, m)), await f[jB(0xbec, 'IcEg')](buildTlsRecord(CONTENT_TYPE_CHANGE_CIPHER_SPEC, tlsBytes(0x1)));
    const r = await tls12Prf(this[jB(qN.a3, qN.a4)], jB(qN.a5, 'Pt3!'), await digestBytes(n, this[jB(0x94e, qN.a6)]()), 0xc, n),
        s = buildHandshakeMessage(HANDSHAKE_TYPE_FINISHED, r);
    this[jB(0x9c0, qN.a7)](s), await f[jB(0x294, 'C2T0')](buildTlsRecord(CONTENT_TYPE_HANDSHAKE, await this[jB(0xb1f, qN.a8)](s, CONTENT_TYPE_HANDSHAKE)));
    let t = !0x1;
    await this[jB(0x1de3, 'oeP*')](c, async u => {
        const jD = jB;
        if (u[jD(qM.c, qM.f)] === CONTENT_TYPE_ALERT) {
            if (shouldIgnoreTlsAlert(u[jD(qM.g, qM.h)])) return;
            throw new Error(jD(qM.i, 'PSkb') + u[jD(qM.j, 'dbGg')][0x1]);
        }
        if (u[jD(0xb19, 'ZgMu')] === CONTENT_TYPE_CHANGE_CIPHER_SPEC) return void(t = !0x0);
        if (u[jD(0x9b8, qM.k)] !== CONTENT_TYPE_HANDSHAKE || !t) return;
        const v = await this[jD(qM.l, 'mRB^')](u[jD(qM.m, 'GzjL')], CONTENT_TYPE_HANDSHAKE);
        if (v[0x0] !== HANDSHAKE_TYPE_FINISHED) return;
        const w = readUint24(v, 0x1),
            x = v[jD(0x6e3, qM.n)](0x4, 0x4 + w),
            y = await tls12Prf(this[jD(qM.o, '[]Y1')], jD(0x16ca, qM.p), await digestBytes(n, this[jD(0x61e, 'C2T0')]()), 0xc, n);
        if (!constantTimeEqual(x, y)) throw new Error(jD(0x1039, 'mRB^'));
        return 0x1;
    }, jB(0x1bfe, 'wCGK'));
}
async [fX(0x275, '89Hn')](c, f, g) {
    const qQ = { c: 0x75e, f: '2#Qk', g: 0x17f8, h: 0xc3f, i: 0xc39, j: 0x1a58, k: 'wCGK', l: 'rsIZ', m: '2#Qk', n: 0x1cdd, o: 0x41d, p: 'Gn7Q', q: 0x1e22, r: 'wCGK', s: '[p9(', t: '8Ys%', u: 0xaa6, v: 0x17c5, w: '9rQu', x: 'Mmsl', y: 'vel(', z: 0x4bf, A: '0Ua@', B: 0x63c, C: 0x10a3, D: 'GzjL', E: '7NO9', F: 'M5Ii', G: '5M6D', H: 0xb14, I: 0x8ee, J: 0x9ca, K: 0xdf4, L: 'V#kN', M: 0x7e5, N: '0Ua@', O: 'jODS', P: 0x326, Q: 'NxG1', R: 0x168c, S: '60r9', T: 'mRB^', U: 0x164d, V: 0x1702, W: 'XITC', X: 0x1623, Y: 0x7ae, Z: 0x1057, a0: 0xd7e, a1: 0x164b, a2: 0x1621, a3: 'jODS', a4: 0x1846, a5: 'NxG1', a6: 0x1e74, a7: 'Gn7Q', a8: 0x11a4, a9: '60r9' },
        qP = { c: 0xb19, f: 0x1bc3, g: 'PSkb', h: '2#Qk', i: 0xb97, j: 'ZgMu', k: '2#Qk', l: '%oj0' },
        qO = { c: 0x1b0, f: 0x117c, g: 0x261, h: '$BSl', i: 'dn8p', j: 0xcad, k: 'PYt$', l: 0x49d, m: 'dZbH', n: 0x167, o: 0x160a, p: 'Pt3!', q: 0x169b, r: 'NMJQ', s: 'vel(', t: '60r9', u: 'dbGg', v: 0x1932, w: '[p9(', x: 'mRB^', y: 0x330 },
        jE = fX,
        h = GROUPS_BY_ID[jE(qQ.c, 'dZbH')](g[jE(0x1473, '0Ua@')]?.[jE(0xd1c, qQ.f)]);
    if (!h || !g[jE(qQ.g, 'V#kN')]?.[jE(0xccc, 'jODS')]?.[jE(qQ.h, 'Gn7Q')]) throw new Error(jE(qQ.i, 'rsIZ'));
    const i = this[jE(0x1960, '1qbp')][jE(0x110f, '60r9')],
        j = hashByteLength(i),
        k = this[jE(qQ.j, qQ.k)][jE(0x4dc, qQ.l)],
        l = this[jE(0xfcb, qQ.m)][jE(qQ.n, 'mRB^')],
        m = await deriveSharedSecret(this[jE(qQ.o, qQ.p)][jE(qQ.q, qQ.r)], g[jE(0x130e, 'jODS')][jE(0x1546, 'd%lH')], h),
        n = await hkdfExtract(i, null, new Uint8Array(j)),
        o = await hkdfExpandLabel(i, n, jE(0xeb0, qQ.s), await digestBytes(i, EMPTY_BYTES), j);
    this[jE(0x5bf, '#sM9')] = await hkdfExtract(i, o, m);
    const p = await digestBytes(i, this[jE(0x1eca, qQ.t)]()),
        q = await hkdfExpandLabel(i, this[jE(qQ.u, 'zs!c')], jE(0x399, 'dn8p'), p, j),
        r = await hkdfExpandLabel(i, this[jE(qQ.v, 'mRB^')], jE(0x17df, qQ.w), p, j);
    [this[jE(0x18e5, 'T3Fv')], this[jE(0xde6, 'egod')]] = await deriveTrafficKeys(i, q, k, l), [this[jE(0x25b, qQ.x)], this[jE(0x875, 'Pt3!')]] = await deriveTrafficKeys(i, r, k, l);
    if (!this[jE(0x17db, qQ.y)][jE(0x194b, '6UCx')]) [this[jE(qQ.z, qQ.A)], this[jE(qQ.B, '2#Qk')]] = await Promise[jE(qQ.C, qQ.D)]([importAesGcmKey(this[jE(0x1694, '7NO9')], [jE(0xfda, qQ.E)]), importAesGcmKey(this[jE(0x2a9, qQ.F)], [jE(0x1c25, qQ.G)])]);
    const s = await hkdfExpandLabel(i, r, jE(qQ.H, '#sM9'), EMPTY_BYTES, j);
    let t = !0x1;
    const u = async D => {
        const jF = jE;
        switch (D[jF(0x1ac8, 'yxI7')]) {
            case HANDSHAKE_TYPE_ENCRYPTED_EXTENSIONS: {
                const E = parseEncryptedExtensions(D[jF(0x3ef, 'wCGK')]);
                E[jF(qO.c, 'b)3q')] && (this[jF(qO.f, '1qbp')] = E[jF(qO.g, qO.h)]), this[jF(0x1228, qO.i)](D[jF(qO.j, qO.k)]);
                break;
            }
            case HANDSHAKE_TYPE_CERTIFICATE: {
                const F = extractLeafCertificate(D[jF(qO.l, qO.m)]);
                if (!F) throw new Error(jF(qO.n, 'oeP*'));
                await this[jF(qO.o, qO.p)](F), this[jF(0x1db8, 'ZgMu')](D[jF(qO.q, qO.r)]);
                break;
            }
            case HANDSHAKE_TYPE_CERTIFICATE_REQUEST:
                throw new Error(jF(0x6c9, qO.s));
            case HANDSHAKE_TYPE_CERTIFICATE_VERIFY:
                this[jF(0x795, qO.t)](D[jF(0x972, qO.u)]);
                break;
            case HANDSHAKE_TYPE_FINISHED: {
                const G = await hmac(i, s, await digestBytes(i, this[jF(0xbdf, 'egod')]()));
                if (!constantTimeEqual(G, D[jF(0x1d52, qO.i)])) throw new Error(jF(qO.v, qO.w));
                this[jF(0x10b4, qO.x)](D[jF(0x5b3, 'Pt3!')]), t = !0x0;
                break;
            }
            default:
                this[jF(0x797, '$p[^')](D[jF(qO.y, 'Mmsl')]);
        }
    };
    await this[jE(qQ.I, 'NMJQ')](c, async D => {
        const jG = jE;
        if (D[jG(0xd75, 'NxG1')] === CONTENT_TYPE_CHANGE_CIPHER_SPEC || D[jG(qP.c, 'ZgMu')] === CONTENT_TYPE_HANDSHAKE) return;
        if (D[jG(0x169d, 'zs!c')] === CONTENT_TYPE_ALERT) {
            if (shouldIgnoreTlsAlert(D[jG(0x1d73, '9rQu')])) return;
            throw new Error(jG(0x1405, 'GzjL') + D[jG(0x10a2, 'M5Ii')][0x1]);
        }
        if (D[jG(0xb3d, '8Ys%')] !== CONTENT_TYPE_APPLICATION_DATA) return;
        const E = await this[jG(0x1400, '[]Y1')](D[jG(qP.f, qP.g)]),
            F = E[E[jG(0x181f, 'dn8p')] - 0x1],
            G = E[jG(0x17f0, qP.h)](0x0, -0x1);
        if (F === CONTENT_TYPE_HANDSHAKE) {
            this[jG(qP.i, qP.j)][jG(0xeba, 'oeP*')](G);
            for (let H; H = this[jG(0x1e6e, qP.k)][jG(0x1034, qP.l)]();)
                if (await u(H), t) return 0x1;
        }
    }, jE(qQ.J, 'oeP*'));
    const v = await digestBytes(i, this[jE(qQ.K, qQ.L)]()),
        w = await hkdfExpandLabel(i, this[jE(qQ.M, 'IcEg')], jE(0x1a77, qQ.N), await digestBytes(i, EMPTY_BYTES), j),
        x = await hkdfExtract(i, w, new Uint8Array(j)),
        y = await hkdfExpandLabel(i, x, jE(0x1b95, qQ.O), v, j),
        z = await hkdfExpandLabel(i, x, jE(qQ.P, qQ.Q), v, j);
    [this[jE(0xa48, '$p[^')], this[jE(qQ.R, qQ.S)]] = await deriveTrafficKeys(i, y, k, l), [this[jE(0xf7d, '0Ua@')], this[jE(0x1b2, qQ.T)]] = await deriveTrafficKeys(i, z, k, l);
    if (!this[jE(qQ.U, 'dZbH')][jE(qQ.V, qQ.W)]) [this[jE(0xfeb, 'jODS')], this[jE(0x153e, 'Gn7Q')]] = await Promise[jE(0x10a3, 'GzjL')]([importAesGcmKey(this[jE(qQ.X, 'CeJW')], [jE(qQ.Y, 'GzjL')]), importAesGcmKey(this[jE(qQ.Z, '$BSl')], [jE(qQ.a0, 'XITC')])]);
    const A = await hkdfExpandLabel(i, q, jE(qQ.a1, 'NMJQ'), EMPTY_BYTES, j),
        B = await hmac(i, A, await digestBytes(i, this[jE(qQ.a2, qQ.W)]())),
        C = buildHandshakeMessage(HANDSHAKE_TYPE_FINISHED, B);
    this[jE(0xc9d, qQ.a3)](C), await f[jE(qQ.a4, qQ.a5)](buildTlsRecord(CONTENT_TYPE_APPLICATION_DATA, await this[jE(qQ.a6, qQ.a7)](concatBytes(C, [CONTENT_TYPE_HANDSHAKE])))), this[jE(qQ.a8, qQ.a9)] = 0x0n, this[jE(0x1093, 'w3Tt')] = 0x0n;
                                                                                                                                                                                                                                      }
        async [fX(0x173a, 'M5Ii')](c, f) {
        const qR = { c: 0xeb, f: '0Ua@', g: 0x11da, h: '[]Y1', i: 0xf2c, j: 'dbGg', k: 0x17b7, l: 0x142b, m: 0x1379, n: 'NxG1', o: 0x166b, p: '$BSl', q: 0x1431, r: 'CeJW', s: 0x1f0c, t: 0x1d13, u: '[p9(', v: 0x12b5 },
            jH = fX,
            g = this[jH(qR.c, qR.f)]++,
            h = uint64be(g),
            i = concatBytes(h, [f], uint16be(TLS_VERSION_12), uint16be(c[jH(qR.g, qR.h)]));
        if (this[jH(qR.i, qR.j)][jH(qR.k, 'n7E3')]) {
            const k = xorSequenceIntoIv(this[jH(qR.l, '60r9')], g);
            return chacha20Poly1305Encrypt(this[jH(qR.m, qR.n)], k, c, i);
        }
        const j = randomBytes(0x8);
        if (!this[jH(qR.o, qR.p)]) this[jH(0x1696, 'NxG1')] = await importAesGcmKey(this[jH(qR.q, qR.r)], [jH(qR.s, 'dZbH')]);
        return concatBytes(j, await aesGcmEncryptWithKey(this[jH(qR.t, qR.u)], concatBytes(this[jH(qR.v, 'w3Tt')], j), c, i));
    }
    async [fX(0xb9a, 'GzjL')](c, f) {
        const qS = { c: 0x8d4, f: 0x3fa, g: 'XITC', h: 0x4b8, i: 0x1b4e, j: 0x1535, k: 0x67b, l: '[p9(', m: '9rQu', n: 0x1b5c, o: 'XITC', p: '$p[^', q: 0x134b, r: '89Hn', s: 0x1e54, t: '*lLT' },
            jI = fX,
            g = this[jI(qS.c, '1qbp')]++,
            h = uint64be(g);
        if (this[jI(qS.f, qS.g)][jI(0x170d, '[]Y1')]) {
            const k = xorSequenceIntoIv(this[jI(0xb4b, 'C2T0')], g);
            return chacha20Poly1305Decrypt(this[jI(qS.h, '89Hn')], k, c, concatBytes(h, [f], uint16be(TLS_VERSION_12), uint16be(c[jI(0x1bdc, 'zs!c')] - 0x10)));
        }
        const i = c[jI(qS.i, 'oeP*')](0x0, 0x8),
            j = c[jI(qS.j, 'PYt$')](0x8);
        if (!this[jI(qS.k, qS.l)]) this[jI(0x1f4, qS.m)] = await importAesGcmKey(this[jI(qS.n, qS.o)], [jI(0x1648, qS.p)]);
        return aesGcmDecryptWithKey(this[jI(qS.q, qS.r)], concatBytes(this[jI(qS.s, 'V#kN')], i), j, concatBytes(h, [f], uint16be(TLS_VERSION_12), uint16be(j[jI(0x18ff, qS.t)] - 0x10)));
    }
    async [fX(0x1559, 'Mmsl')](c) {
        const qT = { c: 'yxI7', f: 0x1c98, g: 0x4ae, h: 0x1d37, i: 'mRB^', j: 'dn8p', k: 0x17ad, l: '#sM9' },
            jJ = fX,
            f = xorSequenceIntoIv(this[jJ(0xf72, qT.c)], this[jJ(qT.f, 'M5Ii')]++),
            g = tlsBytes(CONTENT_TYPE_APPLICATION_DATA, 0x3, 0x3, uint16be(c[jJ(0x10e1, 'w3Tt')] + 0x10));
        if (this[jJ(qT.g, 'w3Tt')][jJ(0x9a7, 'V#kN')]) return chacha20Poly1305Encrypt(this[jJ(0x16f8, 'GzjL')], f, c, g);
        if (!this[jJ(qT.h, '2#Qk')]) this[jJ(0xe33, qT.i)] = await importAesGcmKey(this[jJ(0x185d, qT.j)], [jJ(qT.k, 'dn8p')]);
        return aesGcmEncryptWithKey(this[jJ(0xcb3, qT.l)], f, c, g);
    }
    async [fX(0x12e2, 'T3Fv')](c) {
        const qU = { c: 0xa9e, f: 'oeP*', g: 0x1e2a, h: 0x10e1, i: 'IcEg', j: 0x1686, k: 'M5Ii', l: 'jODS', m: 0x1482, n: '9rQu', o: 'b)3q', p: 0xbf8, q: '$BSl', r: 0x10b9 },
            jK = fX,
            f = xorSequenceIntoIv(this[jK(qU.c, qU.f)], this[jK(qU.g, 'XITC')]++),
            g = tlsBytes(CONTENT_TYPE_APPLICATION_DATA, 0x3, 0x3, uint16be(c[jK(qU.h, 'w3Tt')])),
            h = this[jK(0x765, qU.i)][jK(qU.j, qU.k)] ? await chacha20Poly1305Decrypt(this[jK(0x1190, qU.l)], f, c, g) : await aesGcmDecryptWithKey(this[jK(0x4f8, '%oj0')] || (this[jK(qU.m, qU.n)] = await importAesGcmKey(this[jK(0x1909, qU.o)], [jK(qU.p, qU.q)])), f, c, g);
        let i = h[jK(0xfd3, 'Mmsl')] - 0x1;
        for (; i >= 0x0 && !h[i];) i--;
        return i < 0x0 ? EMPTY_BYTES : h[jK(qU.r, 'w3Tt')](0x0, i + 0x1);
    }
    async [fX(0x1b98, 'M5Ii')](c) {
        const qV = { c: 0x10cd, f: 0x45a, g: 'T3Fv', h: 0x19fb, i: '$BSl', j: 0x1419, k: '#sM9', l: 0xfb5, m: '5M6D' },
            jL = fX,
            f = concatBytes(c, [CONTENT_TYPE_APPLICATION_DATA]),
            g = xorSequenceIntoIv(this[jL(qV.c, 'Mmsl')], this[jL(0xb34, 'wCGK')]++),
            h = tlsBytes(CONTENT_TYPE_APPLICATION_DATA, 0x3, 0x3, uint16be(f[jL(0xa1f, 'Pt3!')] + 0x10));
        if (this[jL(0x2ba, '$BSl')][jL(0x17b7, 'n7E3')]) return chacha20Poly1305Encrypt(this[jL(qV.f, 'jODS')], g, f, h);
        if (!this[jL(0xa70, qV.g)]) this[jL(qV.h, qV.i)] = await importAesGcmKey(this[jL(qV.j, qV.k)], [jL(qV.l, qV.m)]);
        return aesGcmEncryptWithKey(this[jL(0x55a, '8Ys%')], g, f, h);
    }
    async [fX(0x18cf, 'n7E3')](c) {
        const qW = { c: 'd%lH', f: 0xd47, g: '[p9(', h: 0x1ac7, i: '$BSl', j: 0xb42, k: 0x194b, l: '6UCx', m: 0xc8c, n: 0xd37, o: '$p[^', p: 0x1106, q: '9rQu', r: 0x1a49, s: 'NxG1' },
            jM = fX,
            f = xorSequenceIntoIv(this[jM(0x1ac3, qW.c)], this[jM(qW.f, qW.g)]++),
            g = tlsBytes(CONTENT_TYPE_APPLICATION_DATA, 0x3, 0x3, uint16be(c[jM(qW.h, qW.i)])),
            h = this[jM(qW.j, 'n7E3')][jM(qW.k, qW.l)] ? await chacha20Poly1305Decrypt(this[jM(0x1115, '%oj0')], f, c, g) : await aesGcmDecryptWithKey(this[jM(0xc8c, 'rsIZ')] || (this[jM(qW.m, 'rsIZ')] = await importAesGcmKey(this[jM(qW.n, qW.o)], [jM(0xc0f, 'wCGK')])), f, c, g);
        let i = h[jM(qW.p, qW.q)] - 0x1;
        for (; i >= 0x0 && !h[i];) i--;
        if (i < 0x0) return { 'data': EMPTY_BYTES, 'type': 0x0 };
        return { 'data': h[jM(qW.r, qW.s)](0x0, i), 'type': h[i] };
    }
    async [fX(0x1c14, 'CeJW')](c) {
        const qX = { c: 0xfa8, f: 0x1f3, g: 'yxI7', h: 0x427, i: 'dZbH', j: 0xdfc, k: '5M6D', l: 'dZbH', m: 0x1239, n: 0x1463, o: 0xea8, p: 0x127b, q: 0xb4f, r: 0x4a6, s: 0x600, t: 0x331, u: 'T3Fv', v: 0x1ade, w: 'NMJQ' },
            jN = fX;
        if (!this[jN(0x1cd9, 'M5Ii')]) throw new Error(jN(qX.c, 'b)3q'));
        const f = dataToUint8Array(c);
        if (!f[jN(qX.f, 'PSkb')]) return;
        const g = this[jN(0x35c, qX.g)][jN(qX.h, qX.i)][jN(qX.j, qX.k)]();
        try {
            const h = [];
            for (let i = 0x0; i < f[jN(0x10c8, qX.l)]; i += TLS_MAX_PLAINTEXT_FRAGMENT) {
                const j = f[jN(qX.m, 'egod')](i, Math[jN(qX.n, 'V#kN')](i + TLS_MAX_PLAINTEXT_FRAGMENT, f[jN(qX.o, 'ZgMu')])),
                    k = this[jN(qX.p, 'Mmsl')] ? await this[jN(qX.q, 'CeJW')](j) : await this[jN(0x6be, 'GzjL')](j, CONTENT_TYPE_APPLICATION_DATA);
                h[jN(qX.r, '0Ua@')](buildTlsRecord(CONTENT_TYPE_APPLICATION_DATA, k));
            }
            await g[jN(qX.s, 'n7E3')](h[jN(qX.t, qX.u)] === 0x1 ? h[0x0] : concatBytes(...h));
        } finally { g[jN(qX.v, qX.w)](); }
    }
    async [fX(0x15c5, 'zs!c')]() {
        const qY = { c: 0xe64, f: '[]Y1', g: 'PSkb', h: 'V#kN', i: 0x1c5b, j: '0Ua@', k: 0x452, l: 0x1a24, m: 'Pt3!', n: 'oeP*', o: 'jODS', p: 0x514, q: 0x1e46, r: 0x118c, s: 'IcEg', t: 0xd3f, u: 'Gn7Q', v: 0xce8, w: 0x15bc, x: 'C2T0', y: 0x8df, z: '5M6D', A: 0x10a, B: 'dn8p', C: 0x11eb },
            jO = fX;
        for (;;) {
            let c;
            for (; c = this[jO(qY.c, qY.f)][jO(0x12f9, qY.g)]();) {
                if (c[jO(0x96b, qY.h)] === CONTENT_TYPE_ALERT) {
                    if (c[jO(qY.i, qY.j)][0x1] === ALERT_CLOSE_NOTIFY) return null;
                    throw new Error(jO(0x298, 'M5Ii') + c[jO(0x7e4, '[p9(')][0x1]);
                }
                if (c[jO(qY.k, 'IcEg')] !== CONTENT_TYPE_APPLICATION_DATA) continue;
                if (!this[jO(qY.l, qY.m)]) return this[jO(0x18f2, qY.n)](c[jO(0x1a8d, 'b)3q')], CONTENT_TYPE_APPLICATION_DATA);
                const { data: g, type: h } = await this[jO(0x4f3, 'vel(')](c[jO(0xbc6, qY.o)]);
                if (h === CONTENT_TYPE_APPLICATION_DATA) return g;
                if (h === CONTENT_TYPE_ALERT) {
                    if (g[0x1] === ALERT_CLOSE_NOTIFY) return null;
                    throw new Error(jO(qY.p, 'Pt3!') + g[0x1]);
                }
                if (h !== CONTENT_TYPE_HANDSHAKE) continue;
                let i;
                for (this[jO(qY.q, 'dbGg')][jO(qY.r, qY.s)](g); i = this[jO(qY.t, qY.u)][jO(0x1a75, qY.u)]();)
                    if (i[jO(0x1dd7, 'dn8p')] !== HANDSHAKE_TYPE_NEW_SESSION_TICKET && i[jO(0x965, 'b)3q')] === HANDSHAKE_TYPE_KEY_UPDATE) throw new Error(jO(0xa44, '60r9'));
            }
            const f = this[jO(qY.v, 'mRB^')][jO(0x658, 'PYt$')][jO(qY.w, qY.x)]();
            try {
                const { value: j, done: k } = await this[jO(qY.y, qY.z)](f);
                if (k) return null;
                this[jO(0xa6b, '*lLT')][jO(qY.A, qY.B)](j);
            } finally { f[jO(qY.C, qY.f)](); }
        }
    }
    [fX(0x14e3, '2#Qk')]() { const qZ = { c: 'XITC' },
        jP = fX;
        this[jP(0x164f, qZ.c)][jP(0xe9b, 'NxG1')](); }
}

function stripIPv6Brackets(c = '') {
    const r0 = { c: 0x1259, f: 0x2de, g: 0x93b },
        jQ = fX,
        f = String(c || '')[jQ(r0.c, 'w(Wr')]();
    return f[jQ(r0.f, 'dZbH')]('[') && f[jQ(r0.g, 'GzjL')](']') ? f[jQ(0x22a, 'egod')](0x1, -0x1) : f;
}

function isIPHostname(c = '') {
    const r1 = { c: 'jODS', f: 'rsIZ' },
        jR = fX,
        f = stripIPv6Brackets(c),
        g = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
    if (g[jR(0x143c, r1.c)](f)) return !![];
    if (!f[jR(0x267, 'Pt3!')](':')) return ![];
    try { return new URL(jR(0xca1, r1.f) + f + ']/'), !![];
    } catch (h) { return ![]; }
                                         }
const CONNECT_TIMEOUT_MS = 0x270f,
    TURN_STUN_MAGIC_COOKIE = new Uint8Array([0x21, 0x12, 0xa4, 0x42]),
    TURN_STUN_TYPE = {
        'ALLOCATE_REQUEST': 0x3,
        'ALLOCATE_SUCCESS': 0x103,
        'ALLOCATE_ERROR': 0x113,
        'CREATE_PERMISSION_REQUEST': 0x8,
        'CREATE_PERMISSION_SUCCESS': 0x108,
        'CONNECT_REQUEST': 0xa,
        'CONNECT_SUCCESS': 0x10a,
        'CONNECTION_BIND_REQUEST': 0xb,
        'CONNECTION_BIND_SUCCESS': 0x10b
    },
    TURN_STUN_ATTR = {
        'USERNAME': 0x6,
        'MESSAGE_INTEGRITY': 0x8,
        'ERROR_CODE': 0x9,
        'XOR_PEER_ADDRESS': 0x12,
        'REALM': 0x14,
        'NONCE': 0x15,
        'REQUESTED_TRANSPORT': 0x19,
        'CONNECTION_ID': 0x2a
    };

async function withTimeout(c, f, g) {
    const r3 = { c: '2#Qk' },
        jS = fX;
    let h;
    try { return await Promise[jS(0x191a, r3.c)]([c, new Promise((i, j) => { h = setTimeout(() => j(new Error(g)), f); })]); } finally { clearTimeout(h); }
}

function isIPv4(c) {
    const r4 = { c: 0x293, f: '7NO9', g: 'vel(', h: 0x12f4 },
        jT = fX,
        f = String(c || '')[jT(r4.c, r4.f)]('.');
    return f[jT(0x736, r4.g)] === 0x4 && f[jT(r4.h, 'zs!c')](g => /^\d{1,3}$/[jT(0x98d, 'b)3q')](g) && Number(g) >= 0x0 && Number(g) <= 0xff);
}

function turnStunPadding(c) { return -c & 0x3; }

function createTurnStunAttribute(c, f) {
    const r6 = { c: 0x1aca, f: 'M5Ii', g: '8Ys%', h: 0x1666, i: 'GzjL', j: 0xc21, k: 0xdf3, l: 0x23d, m: 'dZbH' },
        jU = fX,
        g = dataToUint8Array(f),
        h = new Uint8Array(0x4 + g[jU(0x1e77, 'IcEg')] + turnStunPadding(g[jU(r6.c, r6.f)])),
        i = new DataView(h[jU(0xeb1, r6.g)]);
    return i[jU(r6.h, r6.i)](0x0, c), i[jU(r6.j, 'C2T0')](0x2, g[jU(r6.k, 'wCGK')]), h[jU(r6.l, r6.m)](g, 0x4), h;
}

function createTurnStunMessage(c, f, g) {
    const r7 = { c: 0x88a, f: 'PSkb', g: 'zs!c', h: 0x3d4, i: 0x291 },
        jV = fX,
        h = concatByteData(...g),
        i = new Uint8Array(0x14),
        j = new DataView(i[jV(0x12d6, '6UCx')]);
    return j[jV(r7.c, 'PYt$')](0x0, c), j[jV(0xae0, r7.f)](0x2, h[jV(0x15f9, r7.g)]), i[jV(r7.h, 'NMJQ')](TURN_STUN_MAGIC_COOKIE, 0x4), i[jV(r7.i, 'NxG1')](f, 0x8), concatByteData(i, h);
}

function parseTurnErrorCode(c) {
    const r8 = { c: 0x1d5e, f: '#sM9' },
        jW = fX;
    return c?.[jW(r8.c, r8.f)] >= 0x4 ? (c[0x2] & 0x7) * 0x64 + c[0x3] : 0x0;
}

function randomTurnTransactionId() { const jX = fX; return crypto[jX(0x26c, 'w3Tt')](new Uint8Array(0xc)); }

async function addTurnMessageIntegrity(c, f) {
    const ra = { c: 0xf53, f: 0x553, g: '1qbp', h: 0x665, i: 0x182f, j: 'XITC', k: 'CeJW', l: 0x1316, m: 0x1dc7, n: 'ZgMu', o: 'V#kN', p: 0xdc4, q: 'dZbH', r: 0x1292, s: 0xc20, t: 'mRB^', u: 0x1e7f, v: 'NxG1' },
        jY = fX,
        g = new Uint8Array(c),
        h = new DataView(g[jY(ra.c, 'NMJQ')]);
    h[jY(ra.f, ra.g)](0x2, h[jY(ra.h, '$p[^')](0x2) + 0x18);
    const i = await crypto[jY(ra.i, ra.j)][jY(0x19cc, ra.k)](jY(ra.l, '9rQu'), f, { 'name': jY(ra.m, ra.n), 'hash': jY(0x18d2, ra.o) }, ![], [jY(ra.p, ra.q)]),
        j = await crypto[jY(ra.r, '%oj0')][jY(ra.s, ra.t)](jY(ra.u, '6UCx'), i, g);
    return concatByteData(g, createTurnStunAttribute(TURN_STUN_ATTR[jY(0x1ccd, ra.v)], new Uint8Array(j)));
}

async function readTurnStunMessage(c, f = null, g = fX(0x18aa, 'ZgMu')) {
    const rc = { c: 0x1eaa, f: 0x594, g: '$BSl', h: 0x10d, i: 0xf53, j: 'NMJQ', k: 0xee1, l: 'd%lH', m: 0x1d27, n: '5M6D', o: 'NxG1', p: 'NMJQ', q: 'zs!c', r: 'd%lH', s: 0xce4, t: 0x1f3, u: 0xd3b, v: 'dbGg' },
        rb = { c: 0xe13, f: 'yxI7', g: 0x687 },
        k0 = fX;
    let h = validDataLength(f) ? dataToUint8Array(f) : new Uint8Array(0x0);
    const i = async() => {
        const jZ = b, { done: n, value: o } = await withTimeout(c[jZ(rb.c, rb.f)](), CONNECT_TIMEOUT_MS, g);
        if (n) throw new Error(jZ(0x15aa, '[p9('));
        if (o?.[jZ(rb.g, '%oj0')]) h = concatByteData(h, o);
    };
    while (h[k0(0x687, '%oj0')] < 0x14) await i();
    const j = 0x14 + (h[0x2] << 0x8 | h[0x3]);
    if (j > 0x10013) throw new Error(k0(0x1661, 'jODS'));
    while (h[k0(rc.c, 'Pt3!')] < j) await i();
    const k = h[k0(rc.f, rc.g)](0x0, j);
    if (TURN_STUN_MAGIC_COOKIE[k0(rc.h, '*lLT')]((n, o) => k[0x4 + o] !== n)) throw new Error(k0(0x1962, 'Gn7Q'));
    const l = new DataView(k[k0(rc.i, rc.j)], k[k0(rc.k, rc.l)], k[k0(rc.m, rc.n)]),
        m = {};
    for (let n = 0x14; n + 0x4 <= j;) {
        const o = l[k0(0xe9d, rc.o)](n),
            p = l[k0(0x190c, rc.p)](n + 0x2);
        if (n + 0x4 + p > k[k0(0x15f9, rc.q)]) break;
        m[o] = k[k0(0x16be, rc.r)](n + 0x4, n + 0x4 + p), n += 0x4 + p + turnStunPadding(p);
    }
    return { 'message': { 'type': l[k0(rc.s, 'oeP*')](0x0), 'attributes': m }, 'extraData': h[k0(rc.t, 'PSkb')] > j ? h[k0(rc.u, rc.v)](j) : null };
}

async function writeTurnBytes(c, f, g) { const rd = { c: 'w(Wr' },
    k1 = fX;
    await withTimeout(c[k1(0x794, rd.c)](f), CONNECT_TIMEOUT_MS, g);
}

async function turnConnect(c, f, g, h) {
    const rl = { c: 0x78a, f: 0x1cf3, g: '2#Qk', h: '$p[^', i: 0x152b, j: '$p[^', k: '6UCx', l: '%oj0', m: 0xba5, n: 'CeJW', o: '60r9', p: 0x104, q: '[]Y1', r: 0x1dfb, s: 'dZbH', t: 0x160e, u: 'NxG1', v: 0x1ddc, w: 0x297, x: '$BSl', y: 0x342, z: 0x17a2, A: 'NxG1', B: 0x453, C: 'Mmsl', D: 'XITC', E: 0x1605, F: '7NO9', G: 0x1e35, H: 'IcEg', I: 0x90a, J: 0x7e9, K: 'V#kN', L: 0x1e1d, M: 'w3Tt', N: 0xbac, O: 0x17d7, P: '*lLT', Q: '0Ua@', R: 0x1d8d, S: 'M5Ii', T: 0x498, U: 'dbGg', V: 'b)3q', W: 0x924, X: 0xee6, Y: 0xe8a, Z: 'wCGK', a0: 0x548, a1: '[p9(', a2: 'n7E3', a3: 0x11f8, a4: 'dZbH', a5: 'mRB^', a6: 0x1901, a7: 0xb17, a8: 'd%lH', a9: '8Ys%', aa: 0x1106, ab: 0xfc6, ac: 'XITC', ad: 0x1ed1, ae: 0x1ee3, af: 0xaa4, ag: 0x14fe, ah: 'T3Fv', ai: '1qbp', aj: 0xffa, ak: 0xde2, al: 'jODS', am: 0x2f6, an: 'dbGg', ao: 0x2cb, ap: '0Ua@', aq: 0x970, ar: 'NMJQ', as: 0xd10, at: 0x1291, au: 0x1df2, av: 0x8c3, aw: '$p[^', ax: 0x1398, ay: 'PSkb', az: 'T3Fv', aA: 0xc8e, aB: 0x17f1, aC: 0xee4, aD: 0x1050, aE: 'NxG1', aF: 0x1d39, aG: 0x8a3, aH: 'yxI7', aI: 0xc50, aJ: 'zs!c', aK: 0x1ef9, aL: 'vel(', aM: 0x1952, aN: 0x14e0, aO: 0x1206, aP: 0x24c, aQ: 0x1e3d, aR: 'ZgMu', aS: 0x7bf },
        rk = { c: 0x1209 },
        rj = { c: 'V#kN', f: 0xb74, g: '1qbp' },
        rh = { c: 0x1087, f: 'M5Ii' },
        rf = { c: 0x534, f: '[p9(' },
        re = { c: 0x1223, f: 'rsIZ' },
        k2 = fX;
    c = { ...c, 'username': c[k2(rl.c, 'dZbH')] ?? null, 'password': c[k2(rl.f, rl.g)] ?? null };
    const i = stripIPv6Brackets(f);
    let j = isIPv4(i) ? i : null;
    if (!j) {
        const u = await DoHquery(i, 'A'),
            v = u[k2(0x17ea, rl.h)](w => w[k2(0x1291, '%oj0')] === 0x1 && isIPv4(w[k2(0x10da, 'dbGg')]))?.[k2(0xc00, 'V#kN')];
        j = typeof v === k2(rl.i, 'egod') ? v : null;
    }
    if (!j) throw new Error(k2(0xb7a, rl.j) + f + k2(0xe6a, rl.k));
    const k = stripIPv6Brackets(c[k2(0x1a9a, rl.l)]);
    let l = null,
        m = null,
        n = null,
        o = null,
        p = null,
        q = null,
        r = ![];
    const s = () => {
            const k3 = k2;
            try { l?.[k3(re.c, re.f)]?.(); } catch (w) {}
            try { m?.[k3(0x183c, 'PSkb')]?.(); } catch (x) {}
        },
        t = () => {
            const k4 = k2;
            if (r) return;
            r = !![];
            try { q?.[k4(rf.c, rf.f)]?.(); } catch (w) {}
        };
    try {
        l = h({ 'hostname': k, 'port': c[k2(rl.m, rl.n)] }), await withTimeout(l[k2(0x1b67, 'b)3q')], CONNECT_TIMEOUT_MS, k2(0x2bf, rl.o)), n = l[k2(rl.p, 'rsIZ')][k2(0x1260, rl.q)](), o = l[k2(rl.r, rl.s)][k2(rl.t, '9rQu')]();
        const w = new Uint8Array(0x8);
        w[0x1] = 0x1, new DataView(w[k2(0x750, rl.u)])[k2(rl.v, 'zs!c')](0x2, g ^ 0x2112), j[k2(rl.w, rl.x)]('.')[k2(rl.y, 'Mmsl')]((H, I) => { w[0x4 + I] = Number(H) ^ TURN_STUN_MAGIC_COOKIE[I]; });
        const x = createTurnStunAttribute(TURN_STUN_ATTR[k2(rl.z, rl.A)], w),
            y = new Uint8Array([0x6, 0x0, 0x0, 0x0]);
        await writeTurnBytes(n, createTurnStunMessage(TURN_STUN_TYPE[k2(rl.B, 'dn8p')], randomTurnTransactionId(), [createTurnStunAttribute(TURN_STUN_ATTR[k2(0x13c2, rl.C)], y)]), k2(0x21f, 'mRB^'));
        let z = await readTurnStunMessage(o, null, k2(0xbc4, rl.D)),
            A = z[k2(rl.E, rl.F)],
            B = z[k2(0xac6, '[p9(')],
            C = null,
            D = [];
        const E = H => C ? addTurnMessageIntegrity(H, C) : Promise[k2(0x1ccb, 'zs!c')](H);
        if (A[k2(0x2b5, '[p9(')] === TURN_STUN_TYPE[k2(rl.G, rl.H)] && c[k2(0x9ba, 'Mmsl')] !== null && c[k2(rl.I, 'T3Fv')] !== null && parseTurnErrorCode(A[k2(rl.J, rl.K)][TURN_STUN_ATTR[k2(rl.L, rl.o)]]) === 0x191) {
            const H = A[k2(0x18a1, rl.M)][TURN_STUN_ATTR[k2(rl.N, 'vel(')]],
                I = A[k2(0x1ce0, 'NxG1')][TURN_STUN_ATTR[k2(rl.O, '2#Qk')]];
            if (!H || !I?.[k2(0xf42, rl.P)]) throw new Error(k2(0x1450, rl.Q));
            const J = textDecoder[k2(rl.R, rl.S)](H);
            C = new Uint8Array(await crypto[k2(rl.T, rl.U)][k2(0x9bd, rl.V)](k2(0xac4, 'IcEg'), textEncoder[k2(rl.W, rl.s)](c[k2(0xe2a, 'T3Fv')] + ':' + J + ':' + c[k2(rl.X, 'V#kN')]))), D = [createTurnStunAttribute(TURN_STUN_ATTR[k2(rl.Y, rl.Z)], textEncoder[k2(0x2e6, rl.U)](c[k2(rl.a0, rl.D)])), createTurnStunAttribute(TURN_STUN_ATTR[k2(0x33c, '6UCx')], textEncoder[k2(0x16c5, '9rQu')](J)), createTurnStunAttribute(TURN_STUN_ATTR[k2(0xbd8, 'w(Wr')], I)];
            const K = await addTurnMessageIntegrity(createTurnStunMessage(TURN_STUN_TYPE[k2(0x3c8, '60r9')], randomTurnTransactionId(), [createTurnStunAttribute(TURN_STUN_ATTR[k2(0x489, rl.a1)], y), ...D]), C),
                L = await Promise[k2(0x3f3, rl.a2)]([E(createTurnStunMessage(TURN_STUN_TYPE[k2(rl.a3, rl.a4)], randomTurnTransactionId(), [x, ...D])), E(createTurnStunMessage(TURN_STUN_TYPE[k2(0x1a37, 'T3Fv')], randomTurnTransactionId(), [x, ...D]))]);
            await writeTurnBytes(n, concatByteData(K, ...L), k2(0x1612, rl.a5)), z = await readTurnStunMessage(o, B, k2(0x962, 'NMJQ')), A = z[k2(rl.a6, 'IcEg')], B = z[k2(rl.a7, rl.F)];
        } else {
            if (A[k2(0x104c, rl.a8)] === TURN_STUN_TYPE[k2(0xa1d, 'Mmsl')]) {
                const M = await Promise[k2(0x185c, '#sM9')]([E(createTurnStunMessage(TURN_STUN_TYPE[k2(0x1845, rl.a9)], randomTurnTransactionId(), [x, ...D])), E(createTurnStunMessage(TURN_STUN_TYPE[k2(0xfa3, '*lLT')], randomTurnTransactionId(), [x, ...D]))]);
                if (M[k2(rl.aa, '9rQu')]) await writeTurnBytes(n, concatByteData(...M), k2(rl.ab, rl.ac));
            }
        }
        if (A[k2(rl.ad, 'oeP*')] !== TURN_STUN_TYPE[k2(rl.ae, rl.U)]) {
            const N = parseTurnErrorCode(A[k2(rl.af, 'dbGg')][TURN_STUN_ATTR[k2(rl.ag, rl.ah)]]);
            throw new Error(N ? k2(0x89a, rl.Z) + N : k2(0x1df9, rl.ai));
        }
        m = h({ 'hostname': k, 'port': c[k2(rl.aj, '6UCx')] }), z = await readTurnStunMessage(o, B, k2(rl.ak, rl.al)), A = z[k2(0xd36, '[]Y1')], B = z[k2(0x65b, '#sM9')];
        if (A[k2(rl.am, rl.an)] !== TURN_STUN_TYPE[k2(rl.ao, rl.ap)]) throw new Error(k2(rl.aq, rl.ar));
        z = await readTurnStunMessage(o, B, k2(rl.as, rl.x)), A = z[k2(0x17eb, 'vel(')], B = z[k2(0x1dba, 'Pt3!')];
        if (A[k2(rl.at, '%oj0')] !== TURN_STUN_TYPE[k2(rl.au, '[]Y1')] || !A[k2(rl.av, rl.aw)][TURN_STUN_ATTR[k2(rl.ax, '1qbp')]]) throw new Error(k2(0xff3, rl.ay));
        await withTimeout(m[k2(0x136e, rl.u)], CONNECT_TIMEOUT_MS, k2(0x1e4a, rl.F)), p = m[k2(0x1858, rl.az)][k2(rl.aA, rl.ai)](), q = m[k2(rl.aB, 'wCGK')][k2(rl.aC, rl.a2)]();
        await writeTurnBytes(p, await E(createTurnStunMessage(TURN_STUN_TYPE[k2(rl.aD, rl.aE)], randomTurnTransactionId(), [createTurnStunAttribute(TURN_STUN_ATTR[k2(rl.aF, rl.x)], A[k2(rl.aG, rl.aH)][TURN_STUN_ATTR[k2(rl.aI, 'wCGK')]]), ...D])), k2(0x8eb, rl.aJ)), z = await readTurnStunMessage(q, null, k2(0x10ad, rl.H)), A = z[k2(0x1068, 'mRB^')];
        const F = z[k2(0x74e, '$p[^')];
        if (A[k2(0x5dd, 'vel(')] !== TURN_STUN_TYPE[k2(rl.aK, rl.aL)]) throw new Error(k2(rl.aM, '1qbp'));
        n[k2(rl.aN, 'GzjL')](), n = null, o[k2(rl.aO, 'zs!c')](), o = null, p[k2(rl.aP, rl.al)](), p = null;
        const G = new ReadableStream({
            'start'(O) {
                const k5 = k2;
                if (F?.[k5(0x521, '[]Y1')]) O[k5(rh.c, rh.f)](F);
            },
            'pull'(O) {
                const ri = { c: 0x1599, f: 0x1dfd, g: 'egod' },
                    k6 = k2;
                return q[k6(0x6ea, rj.c)]()[k6(rj.f, rj.g)](({ done: P, value: Q }) => {
                    const k7 = k6;
                    if (P) t(), O[k7(0x6c4, 'PYt$')]();
                    else {
                        if (Q?.[k7(ri.c, '89Hn')]) O[k7(ri.f, ri.g)](new Uint8Array(Q));
                    }
                });
            },
            'cancel'() {
                const k8 = k2;
                try { q?.[k8(rk.c, '$BSl')]?.(); } catch (O) {}
                t(), s();
            }
        });
        return { 'readable': G, 'writable': m[k2(0x1967, rl.aw)], 'closed': m[k2(rl.aQ, '60r9')], 'close': s };
    } catch (O) {
        try { n?.[k2(0xc2b, rl.aR)]?.(); } catch (P) {}
        try { o?.[k2(rl.aS, '5M6D')]?.(); } catch (Q) {}
        try { p?.[k2(0x1075, '60r9')]?.(); } catch (R) {}
        t(), s();
        throw O;
    }
}

const SSTP_TCP_MSS = 0x578,
    SSTP_EMPTY_BYTES = new Uint8Array(0x0);

function readSstpUint16(c, f = 0x0) { return c[f] << 0x8 | c[f + 0x1]; }

function readSstpUint32(c, f = 0x0) { return (c[f] << 0x18 | c[f + 0x1] << 0x10 | c[f + 0x2] << 0x8 | c[f + 0x3]) >>> 0x0; }

function randomSstpUint16() { const k9 = fX; return readSstpUint16(crypto[k9(0xc66, '1qbp')](new Uint8Array(0x2))); }

function internetChecksum(c, f, g) {
    let h = 0x0;
    for (let i = f; i < f + g - 0x1; i += 0x2) h += readSstpUint16(c, i);
    if (g & 0x1) h += c[f + g - 0x1] << 0x8;
    while (h >> 0x10) h = (h & 0xffff) + (h >> 0x10);
    return ~h & 0xffff;
                                }
async function sstpConnect(c, f, g, h) {
    const rS = { c: 'oeP*', f: 0xd8f, g: '0Ua@', h: 0xd44, i: 0x1717, j: 'd%lH', k: 0x876, l: 0xcc5, m: 'NMJQ', n: 'dbGg', o: 'NxG1', p: 0xcbf, q: 'PSkb', r: 0x1a23, s: 0xa11, t: 0x8b2, u: 'vel(', v: 0x173, w: '[p9(', x: 0xf53, y: '1qbp', z: 0x1a1a, A: 0xea8, B: 'ZgMu', C: 0x14cb, D: 'XITC', E: 0x50a, F: 0x1415, G: 0x1c86, H: 0x3af, I: 'dbGg', J: 'V#kN', K: '60r9', L: 0x13a6, M: 'dn8p', N: 0x86c, O: 0x2cc, P: 0x189b, Q: 0x4fa, R: 0xfb6, S: 0x1f28, T: 'n7E3', U: 0x1e32, V: 'IcEg', W: '*lLT', X: 0xfae, Y: 0x1051, Z: 0xaf4, a0: 'egod', a1: 'b)3q', a2: '7NO9', a3: 0x577, a4: '6UCx', a5: 0x1293, a6: 'Mmsl', a7: 0x1745, a8: '89Hn', a9: 0x10da, aa: 'dbGg', ab: 0x1df3, ac: 0x1c8, ad: 'd%lH', ae: 0x3f4, af: 'yxI7', ag: 0xbb0, ah: 0x1496, ai: 'CeJW', aj: 0x4ef, ak: '7NO9', al: '6UCx', am: 0x158f, an: 'mRB^', ao: 0x32b, ap: 'egod', aq: 0x9bc, ar: 'w3Tt', as: '8Ys%', at: 'dZbH', au: 0x828, av: 0x7e6, aw: 0x1202, ax: 'd%lH', ay: 'Pt3!', az: 0x1371, aA: 'PYt$', aB: 0xb5b, aC: 'PYt$', aD: 'oeP*', aE: 0x1862, aF: 0xb9c, aG: '$p[^', aH: 0x780, aI: 0xfff, aJ: 0xa78, aK: 0x14ef, aL: '[]Y1', aM: 0x1ad4, aN: 'IcEg', aO: 0x1ab1, aP: '[p9(', aQ: 0x1b73, aR: 'b)3q', aS: 0x1c8, aT: '5M6D', aU: 0x15e4 },
        rQ = { c: 0x1550 },
        rO = { c: 0xa21, f: 'Mmsl', g: 0x869, h: '$p[^', i: 0x1f3, j: 'PSkb', k: 0x1b0f, l: 'Pt3!', m: '$p[^', n: 0x1d27, o: '5M6D', p: 0xb8f, q: 0x1457, r: 'dZbH' },
        rN = { c: 0xc7c, f: 0x13b6, g: '60r9', h: 'M5Ii', i: 0xbe4, j: 'dbGg', k: 0x1297, l: 'Pt3!', m: 'wCGK', n: 0x1c7, o: 'w(Wr', p: '%oj0', q: 'M5Ii', r: 0x78f, s: '[p9(', t: 0xbec, u: 'IcEg', v: 0x1c3f, w: 0x12c0, x: '89Hn', y: '6UCx', z: 0x183c, A: 'PSkb' },
        rH = { c: 0x521 },
        rG = { c: 0x1786, f: 'Gn7Q', g: 0xf9d, h: 'd%lH', i: 'XITC', j: 'dZbH', k: 'Mmsl', l: 0xae0, m: 'PSkb', n: 'CeJW', o: 0x5c8, p: 'rsIZ', q: 0x329, r: 'mRB^', s: '9rQu', t: 0x908 },
        rF = { c: 0x17e8, f: '8Ys%' },
        rE = { c: 0x1a0c, f: 'C2T0', g: 0x190b, h: 'mRB^', i: 0x5a6, j: '89Hn', k: 0x1d84, l: 'n7E3', m: 0x4fa, n: 'dbGg', o: 0x7c4, p: 0x1200, q: 'oeP*', r: 0x62c, s: 0x1e26, t: 'dZbH', u: 0x1338, v: '0Ua@', w: 0x1920, x: '60r9', y: '6UCx', z: '#sM9', A: 0x1786, B: 'Gn7Q', C: 0x1d27, D: '5M6D', E: 0x1c56 },
        rD = { c: 0x181a, f: 'egod', g: 0x1a7c, h: 0xfa7, i: 0x1b94, j: '*lLT' },
        rC = { c: 0x107a, f: 'yxI7', g: '89Hn', h: 0x9d7, i: 'mRB^', j: 0x5d6, k: 'C2T0', l: 'NMJQ' },
        rB = { c: 'wCGK', f: 0x12d6, g: 0x46b, h: 'XITC' },
        rA = { c: 0x1434, f: 0x1ca5, g: '1qbp', h: 'PYt$', i: 'V#kN' },
        rz = { c: 0xb9c },
        ry = { c: 0x179d, f: 'XITC', g: 0xf7a, h: 'wCGK' },
        rx = { c: 'jODS', f: 'dbGg', g: 0xdaf, h: 0x53b, i: 0x1ab0, j: 0xe75, k: '2#Qk' },
        rw = { c: 0x15f9, f: 'zs!c', g: 0x1a7c, h: 0xfe8 },
        rv = { c: 0x15c5 },
        ru = { c: 0x198b, f: '%oj0', g: 0x7af, h: 0x1206, i: 'zs!c', j: '89Hn', k: 0x1a09, l: 'dn8p', m: '9rQu' },
        ka = fX;
    c = { ...c, 'username': c[ka(0x1ce5, rS.c)] ?? null, 'password': c[ka(rS.f, rS.g)] ?? null };
    let i = SSTP_EMPTY_BYTES,
        j = 0x1,
        k = null,
        l = null,
        m = null,
        n = ![],
        o, p;
    const q = new Promise((B, C) => { o = B;
        p = C; }),
        r = (B, C) => {
            if (n) return;
            n = !![], B(C);
        },
        s = () => {
            const kb = ka;
            try { l?.[kb(ru.c, ru.f)]?.()[kb(ru.g, '8Ys%')]?.(() => {}); } catch (B) {}
            try { l?.[kb(ru.h, ru.i)]?.(); } catch (C) {}
            try { m?.[kb(0x18b7, '0Ua@')]?.()[kb(0x184d, ru.j)]?.(() => {}); } catch (D) {}
            try { m?.[kb(ru.k, ru.l)]?.(); } catch (E) {}
            try { k?.[kb(0x1149, ru.m)]?.(); } catch (F) {}
            r(o);
        },
        t = async() => {
            const kc = ka, { value: B, done: C } = await l[kc(rv.c, 'zs!c')]();
            if (C || !B) throw new Error(kc(0x505, 'PSkb'));
            return dataToUint8Array(B);
        },
        u = async B => {
            const kd = ka;
            while (i[kd(rw.c, rw.f)] < B) { const D = await t();
                i = i[kd(rw.g, 'rsIZ')] ? concatByteData(i, D) : D; }
            const C = i[kd(rw.h, 'w(Wr')](0x0, B);
            return i = i[kd(0x1e52, 'b)3q')](B), C;
        },
        v = async() => {
            const ke = ka;
            for (;;) {
                const B = i[ke(0x1c8a, rx.c)](0xa);
                if (B >= 0x0) {
                    const D = textDecoder[ke(0x413, rx.f)](i[ke(rx.g, '89Hn')](0x0, B));
                    return i = i[ke(rx.h, 'n7E3')](B + 0x1), D[ke(rx.i, 'GzjL')](/\r$/, '');
                }
                const C = await t();
                i = i[ke(rx.j, rx.k)] ? concatByteData(i, C) : C;
            }
        },
        w = async(B = CONNECT_TIMEOUT_MS) => {
            const kf = ka,
                C = await withTimeout(u(0x4), B, kf(ry.c, ry.f)),
                D = readSstpUint16(C, 0x2) & 0xfff;
            if (D < 0x4) throw new Error(kf(0x1de8, 'yxI7'));
            return { 'isControl': (C[0x1] & 0x1) !== 0x0, 'body': D > 0x4 ? await withTimeout(u(D - 0x4), B, kf(ry.g, ry.h)) : SSTP_EMPTY_BYTES };
        },
        x = B => {
            const kg = ka,
                C = 0x6 + B[kg(0x1bf5, '1qbp')],
                D = new Uint8Array(C);
            return D[kg(0x50a, 'n7E3')]([0x10, 0x0, C >> 0x8 & 0xf | 0x80, C & 0xff, 0xff, 0x3]), D[kg(rz.c, '$p[^')](B, 0x6), D;
        },
        y = (B, C, D, E = []) => {
            const kh = ka,
                F = E[kh(0x19dc, rB.c)]((I, J) => I + 0x2 + J[kh(0x1c31, 'M5Ii')][kh(0x1bf5, '1qbp')], 0x0),
                G = new Uint8Array(0x6 + F),
                H = new DataView(G[kh(rB.f, '6UCx')]);
            return H[kh(0x1a1a, 'Gn7Q')](0x0, B), G[0x2] = C, G[0x3] = D, H[kh(rB.g, rB.h)](0x4, 0x4 + F), E[kh(0xc57, 'C2T0')]((I, J) => {
                const ki = kh;
                return G[I] = J[ki(rA.c, '1qbp')], G[I + 0x1] = 0x2 + J[ki(rA.f, '$p[^')][ki(0x3ec, '6UCx')], G[ki(0x92d, rA.g)](J[ki(0x859, '2#Qk')], I + 0x2), I + 0x2 + J[ki(0x14b2, rA.h)][ki(0x19d2, rA.i)];
            }, 0x6), G;
        },
        z = B => {
            const kj = ka,
                C = B[kj(rC.c, rC.f)] >= 0x2 && B[0x0] === 0xff && B[0x1] === 0x3 ? 0x2 : 0x0;
            if (B[kj(0x1599, rC.g)] - C < 0x4) return null;
            const D = readSstpUint16(B, C);
            if (D === 0x21) return { 'protocol': D, 'ipPacket': B[kj(rC.h, rC.i)](C + 0x2) };
            if (B[kj(rC.j, rC.k)] - C < 0x6) return null;
            return { 'protocol': D, 'code': B[C + 0x2], 'id': B[C + 0x3], 'payload': B[kj(0x935, '5M6D')](C + 0x6), 'rawPacket': B[kj(0x71e, rC.l)](C) };
        },
        A = B => {
            const kk = ka,
                C = [];
            for (let D = 0x0; D + 0x2 <= B[kk(rD.c, rD.f)];) {
                const E = B[D],
                    F = B[D + 0x1];
                if (F < 0x2 || D + F > B[kk(rD.g, 'rsIZ')]) break;
                C[kk(rD.h, 'w(Wr')]({ 'type': E, 'data': B[kk(rD.i, rD.j)](D + 0x2, D + F) }), D += F;
            }
            return C;
        };
    try {
        const B = stripIPv6Brackets(c[ka(rS.h, '60r9')]),
            C = c[ka(rS.i, rS.j)];
        k = h({ 'hostname': B, 'port': C }, { 'secureTransport': 'on', 'allowHalfOpen': ![] }), await withTimeout(k[ka(0x1b67, 'b)3q')], CONNECT_TIMEOUT_MS, ka(rS.k, 'PYt$')), l = k[ka(0x19b3, '0Ua@')][ka(0x134d, 'wCGK')](), m = k[ka(rS.l, rS.m)][ka(0x51c, rS.n)]();
        const D = B[ka(0x1c07, rS.o)](':') ? '[' + B + ']' : B,
            E = textEncoder[ka(rS.p, rS.q)](ka(rS.r, '9rQu') + (ka(rS.s, 'yxI7') + (Number(C) === 0x1bb ? D : D + ':' + C) + '\x0d\x0a') + ka(rS.t, rS.u) + (ka(rS.v, '9rQu') + crypto[ka(0x1553, rS.w)]() + ka(0xc80, 'yxI7'))),
            F = new Uint8Array(0x2);
        new DataView(F[ka(rS.x, rS.m)])[ka(0xa50, 'w3Tt')](0x0, 0x1);
        const G = new Uint8Array(0x2);
        new DataView(G[ka(0x14d2, rS.y)])[ka(rS.z, 'Gn7Q')](0x0, 0x5dc);
        const H = new Uint8Array(0xc + F[ka(rS.A, rS.B)]),
            I = new DataView(H[ka(0x12d6, '6UCx')]);
        H[0x0] = 0x10, H[0x1] = 0x1, I[ka(rS.C, 'Pt3!')](0x2, H[ka(0x1f3, 'PSkb')] | 0x8000), I[ka(0x1033, '*lLT')](0x4, 0x1), I[ka(rS.m, rS.m)](0x6, 0x1), H[0x9] = 0x1, I[ka(0x46b, rS.D)](0xa, 0x4 + F[ka(0xd6d, '8Ys%')]), H[ka(rS.E, 'n7E3')](F, 0xc), await withTimeout(m[ka(0x1ded, 'jODS')](concatByteData(E, H, x(y(0xc021, 0x1, j++, [{ 'type': 0x1, 'data': G }])))), CONNECT_TIMEOUT_MS, ka(rS.F, 'vel('));
        const J = await withTimeout(v(), CONNECT_TIMEOUT_MS, ka(rS.G, '*lLT'));
        for (;;) { const a9 = await withTimeout(v(), CONNECT_TIMEOUT_MS, ka(0x1a11, 'rsIZ'));
            if (a9 === '') break; }
        if (!/HTTP\/\d(?:\.\d)?\s+2\d\d/i[ka(rS.H, rS.I)](J)) throw new Error(ka(0x585, rS.J) + (J || ka(0x109, rS.K)));
        let K = ![],
            L = ![],
            M = ![],
            N = ![],
            O = ![],
            P = ![],
            Q = ![],
            R = null;
        const S = async() => {
            const kl = ka;
            if (!K || !L || !M || N) return;
            if (c[kl(rE.c, rE.f)] === null || c[kl(rE.g, rE.h)] === null) throw new Error(kl(0xc99, '5M6D'));
            const aa = textEncoder[kl(rE.i, rE.j)](c[kl(0x12a, 'n7E3')]),
                ab = textEncoder[kl(rE.k, 'PYt$')](c[kl(0x307, rE.l)]);
            if (aa[kl(rE.m, rE.n)] > 0xff || ab[kl(rE.o, '9rQu')] > 0xff) throw new Error(kl(rE.p, rE.q));
            const ac = 0x6 + aa[kl(rE.r, 'mRB^')] + ab[kl(0x9b2, 'T3Fv')],
                ad = new Uint8Array(0x2 + ac),
                ae = new DataView(ad[kl(0x1788, 'IcEg')]);
            ae[kl(rE.s, rE.t)](0x0, 0xc023), ad[0x2] = 0x1, ad[0x3] = j++, ae[kl(rE.u, rE.v)](0x4, ac), ad[0x6] = aa[kl(rE.w, rE.x)], ad[kl(0x77c, rE.y)](aa, 0x7), ad[0x7 + aa[kl(0x1d5e, rE.z)]] = ab[kl(rE.A, rE.B)], ad[kl(0x15ed, 'mRB^')](ab, 0x8 + aa[kl(rE.C, rE.D)]), await withTimeout(m[kl(0x757, '7NO9')](x(ad)), CONNECT_TIMEOUT_MS, kl(rE.E, rE.f)), N = !![];
        },
        T = async() => {
            const km = ka;
            if (!K || !L || P || M && !O) return;
            await withTimeout(m[km(0x1f22, 'vel(')](x(y(0x8021, 0x1, j++, [{ 'type': 0x3, 'data': new Uint8Array(0x4)}]))), CONNECT_TIMEOUT_MS, km(rF.c, rF.f)), P = !![];
        };
        for (let aa = 0x0; aa < 0x32 && !Q; aa++) {
            const ab = await w(CONNECT_TIMEOUT_MS);
            if (ab[ka(rS.L, rS.M)]) continue;
            const ac = z(ab[ka(0x3ef, 'wCGK')]);
            if (!ac) continue;
            if (ac[ka(rS.N, '$p[^')] === 0xc021) {
                if (ac[ka(0x105b, 'w3Tt')] === 0x1) {
                    const ad = A(ac[ka(rS.O, 'C2T0')])[ka(0xcf0, '[p9(')](af => af[ka(0x171d, '0Ua@')] === 0x3);
                    if (ad?.[ka(rS.P, '7NO9')]?.[ka(rS.Q, 'dbGg')] >= 0x2) {
                        const af = readSstpUint16(ad[ka(rS.R, 'Mmsl')]);
                        if (af !== 0xc023) throw new Error(ka(rS.S, rS.I) + af[ka(0x1cc2, rS.T)](0x10));
                        M = !![];
                    }
                    const ae = new Uint8Array(ac[ka(rS.U, rS.V)]);
                    ae[0x2] = 0x2, await withTimeout(m[ka(0xd8a, rS.W)](x(ae)), CONNECT_TIMEOUT_MS, ka(0x1e8c, 'V#kN')), L = !![], await S(), await T();
                } else ac[ka(rS.X, 'dbGg')] === 0x2 && (K = !![], await S(), await T());
                continue;
            }
            if (ac[ka(rS.Y, '*lLT')] === 0xc023) {
                if (ac[ka(rS.Z, rS.a0)] === 0x2) O = !![], await T();
                else {
                    if (ac[ka(0xf16, rS.a1)] === 0x3) throw new Error(ka(0x1dbb, rS.a2));
                }
                continue;
            }
            if (ac[ka(rS.a3, rS.a4)] === 0x8021) {
                if (ac[ka(rS.a5, '$p[^')] === 0x1) {
                    const ag = new Uint8Array(ac[ka(0x74a, rS.W)]);
                    ag[0x2] = 0x2, await withTimeout(m[ka(0x1964, 'NMJQ')](x(ag)), CONNECT_TIMEOUT_MS, ka(0x1327, rS.a6)), await T();
                } else {
                    if (ac[ka(rS.a7, '7NO9')] === 0x3) {
                        const ah = A(ac[ka(0x184, rS.a8)])[ka(0xd66, '89Hn')](ai => ai[ka(0x1bec, 'CeJW')] === 0x3);
                        ah?.[ka(rS.a9, rS.aa)]?.[ka(0xebf, 'NxG1')] === 0x4 && (R = [...ah[ka(0x1da6, 'wCGK')]][ka(rS.ab, rS.a6)]('.'), await withTimeout(m[ka(rS.ac, rS.ad)](x(y(0x8021, 0x1, j++, [{ 'type': 0x3, 'data': ah[ka(rS.ae, rS.af)] }]))), CONNECT_TIMEOUT_MS, ka(rS.ag, 'C2T0')), P = !![]);
                    } else {
                        if (ac[ka(rS.ah, rS.ai)] === 0x2) {
                            const ai = A(ac[ka(0x423, '8Ys%')])[ka(rS.aj, rS.ak)](aj => aj[ka(0x1434, '1qbp')] === 0x3);
                            if (ai?.[ka(0x193e, rS.j)]?.[ka(0x3ec, rS.al)] === 0x4) R = [...ai[ka(rS.am, rS.an)]][ka(rS.ao, rS.ap)]('.');
                            Q = !![];
                        }
                    }
                }
            }
        }
        if (!R) throw new Error(ka(rS.aq, rS.ar));
        const U = stripIPv6Brackets(f);
        let V = isIPv4(U) ? U : null;
        if (!V) {
            const aj = await DoHquery(U, 'A'),
                ak = aj[ka(0x31d, rS.as)](al => al[ka(0x1ed1, 'oeP*')] === 0x1 && isIPv4(al[ka(0x199b, '$BSl')]))?.[ka(0x2a4, rS.at)];
            V = typeof ak === ka(rS.au, rS.aa) ? ak : null;
        }
        if (!V) throw new Error(ka(0x2e0, rS.aa) + f + ka(rS.av, '6UCx'));
        const W = 0x2710 + randomSstpUint16() % 0xc350,
            X = new Uint8Array(String(R || '')[ka(rS.aw, rS.ax)]('.')[ka(0x18c7, rS.ay)](Number)),
            Y = new Uint8Array(String(V || '')[ka(rS.az, rS.aA)]('.')[ka(rS.aB, rS.aC)](Number));
        let Z = readSstpUint32(crypto[ka(0x10d4, rS.aD)](new Uint8Array(0x4))),
            a0 = 0x0;
        const a1 = new Uint8Array(0x14);
        a1[ka(rS.aE, 'yxI7')]([0x45, 0x0, 0x0, 0x0, 0x0, 0x0, 0x40, 0x0, 0x40, 0x6]), a1[ka(rS.aF, rS.aG)](X, 0xc), a1[ka(rS.aH, rS.W)](Y, 0x10);
        const a2 = new Uint8Array(0x598);
        a2[ka(0xe52, rS.ar)](X), a2[ka(rS.aI, rS.D)](Y, 0x4), a2[0x9] = 0x6;
        const a3 = (al, am = SSTP_EMPTY_BYTES) => {
            const kn = ka,
                an = dataToUint8Array(am),
                ao = an[kn(rG.c, rG.f)],
                ap = 0x14 + ao,
                aq = 0x14 + ap,
                ar = 0x8 + aq,
                as = new Uint8Array(ar),
                at = new DataView(as[kn(0x1d4e, 'Pt3!')]);
            as[kn(rG.g, 'egod')]([0x10, 0x0, ar >> 0x8 & 0xf | 0x80, ar & 0xff, 0xff, 0x3, 0x0, 0x21]), as[kn(0x960, rG.h)](a1, 0x8), at[kn(0x46b, rG.i)](0xa, aq), at[kn(0x1e26, rG.j)](0xc, randomSstpUint16()), at[kn(0x1ed4, 'oeP*')](0x12, internetChecksum(as, 0x8, 0x14)), at[kn(0x908, rG.k)](0x1c, W), at[kn(rG.l, rG.m)](0x1e, g), at[kn(0x1dfa, rG.n)](0x20, Z), at[kn(rG.o, rG.p)](0x24, a0), as[0x28] = 0x50, as[0x29] = al, at[kn(rG.q, rG.r)](0x2a, 0xffff);
            if (ao) as[kn(0x15ed, rG.r)](an, 0x30);
            return a2[0xa] = ap >> 0x8, a2[0xb] = ap & 0xff, a2[kn(0x125d, rG.s)](as[kn(0xbf9, 'M5Ii')](0x1c, 0x1c + ap), 0xc), at[kn(rG.t, 'Mmsl')](0x2c, internetChecksum(a2, 0x0, 0xc + ap)), as;
        },
        a4 = al => {
            const ko = ka;
            if (al[ko(0x4fa, 'dbGg')] < 0x28 || al[0x9] !== 0x6) return null;
            const am = (al[0x0] & 0xf) * 0x4;
            if (al[ko(rH.c, '[]Y1')] < am + 0x14) return null;
            if (readSstpUint16(al, am) !== g) return null;
            if (readSstpUint16(al, am + 0x2) !== W) return null;
            return { 'flags': al[am + 0xd], 'sequence': readSstpUint32(al, am + 0x4), 'payloadOffset': am + (al[am + 0xc] >> 0x4 & 0xf) * 0x4 };
        };
        await withTimeout(m[ka(rS.aJ, 'GzjL')](a3(0x2)), CONNECT_TIMEOUT_MS, ka(rS.aK, rS.aL)), Z = Z + 0x1 >>> 0x0;
        let a5 = ![];
        for (let al = 0x0; al < 0x1e; al++) {
            const am = await w(CONNECT_TIMEOUT_MS);
            if (am[ka(rS.aM, rS.aN)]) continue;
            const an = z(am[ka(rS.aO, rS.aP)]);
            if (!an || an[ka(0x1070, rS.an)] !== 0x21) continue;
            const ao = a4(an[ka(rS.aQ, 'w3Tt')]);
            if (!ao || (ao[ka(0x1878, '8Ys%')] & 0x12) !== 0x12) continue;
            a0 = ao[ka(0x1ea8, rS.aR)] + 0x1 >>> 0x0, await withTimeout(m[ka(rS.aS, rS.j)](a3(0x10)), CONNECT_TIMEOUT_MS, ka(0xfb3, rS.aT)), a5 = !![];
            break;
        }
        if (!a5) throw new Error(ka(rS.aU, rS.n));
        let a6 = null;
        const a7 = new ReadableStream({
            'start'(ap) { a6 = ap; },
            'cancel'() { s(); }
        });
        ((async() => {
            const rL = { c: 0xedd, f: '7NO9', g: 0x1347 },
                kq = ka;
            try {
                let ap = [],
                    aq = 0x0;
                const ar = () => {
                    const kp = b;
                    if (!aq) return;
                    if (!a6) throw new Error(kp(rL.c, rL.f));
                    a6[kp(0x4eb, 'XITC')](ap[kp(0xd5f, '7NO9')] === 0x1 ? ap[0x0] : concatByteData(...ap)), ap = [], aq = 0x0, m[kp(0x16de, '60r9')](a3(0x10))[kp(rL.g, '1qbp')](() => {});
                };
                for (;;) {
                    const as = await w(0xea60);
                    if (as[kq(rN.c, 'dZbH')]) continue;
                    const at = z(as[kq(rN.f, 'zs!c')]);
                    if (!at || at[kq(0x5e6, rN.g)] !== 0x21) continue;
                    const au = a4(at[kq(0x114e, rN.h)]);
                    if (!au) continue;
                    if (au[kq(rN.i, rN.j)] < at[kq(0x1d2a, '2#Qk')][kq(rN.k, 'd%lH')]) {
                        const av = at[kq(0xfbe, rN.l)][kq(0x23b, rN.m)](au[kq(rN.n, rN.o)]);
                        av[kq(0x1d27, '5M6D')] && (a0 = au[kq(0xc3e, rN.p)] + av[kq(0x1aca, rN.q)] >>> 0x0, ap[kq(rN.r, 'Mmsl')](new Uint8Array(av)), aq += av[kq(0xe0c, rN.s)]);
                    }
                    if (au[kq(0x1cfb, rN.m)] & 0x1) {
                        ar(), a0 = a0 + 0x1 >>> 0x0, m[kq(rN.t, rN.u)](a3(0x11))[kq(rN.v, '2#Qk')](() => {});
                        const aw = a6;
                        if (aw) try { aw[kq(rN.w, rN.x)](); } catch (ax) {}
                        s();
                        return;
                    }
                    if (i[kq(0x3ec, rN.y)] < 0x4 || aq >= 0x8000) ar();
                }
            } catch (ay) {
                const az = a6;
                if (az) try { az[kq(0x1a1c, rN.g)](ay); } catch (aA) {}
                r(p, ay);
                try { k?.[kq(rN.z, rN.A)]?.(); } catch (aB) {}
            }
        })());
        const a8 = new WritableStream({
            async 'write'(ap) {
                const kr = ka,
                    aq = dataToUint8Array(ap);
                if (!aq[kr(rO.c, rO.f)]) return;
                if (aq[kr(rO.g, '$p[^')] <= SSTP_TCP_MSS) { await m[kr(0x1412, rO.h)](a3(0x18, aq)), Z = Z + aq[kr(rO.i, rO.j)] >>> 0x0; return; }
                const ar = [];
                for (let as = 0x0; as < aq[kr(0x4e2, 'w(Wr')]; as += SSTP_TCP_MSS) {
                    const at = aq[kr(rO.k, rO.l)](as, Math[kr(0x1e3e, rO.m)](as + SSTP_TCP_MSS, aq[kr(rO.n, rO.o)]));
                    ar[kr(0x2da, '60r9')](a3(0x18, at)), Z = Z + at[kr(rO.p, 'b)3q')] >>> 0x0;
                }
                await m[kr(rO.q, rO.r)](concatByteData(...ar));
            },
            'close'() {
                const ks = ka;
                return m[ks(rQ.c, '[]Y1')](a3(0x11))[ks(0xf7c, '6UCx')](() => {});
            },
            'abort'(ap) { s(); if (ap) r(p, ap); }
        });
        return { 'readable': a7, 'writable': a8, 'closed': q, 'close': s };
    } catch (ap) { s();
        throw ap; }
}

function base64SecretEncode(c, f) {
    const rT = { c: 0x1bdc, f: 'zs!c', g: 0xc3f, h: 'Gn7Q', i: 0xcbb },
        kt = fX,
        g = new TextEncoder(),
        h = g[kt(0xdd0, '[]Y1')](c),
        j = g[kt(0x529, 'vel(')](f),
        k = new Uint8Array(h[kt(0xc3f, 'Gn7Q')]);
    for (let m = 0x0; m < h[kt(0x919, 'C2T0')]; m++) { k[m] = h[m] ^ j[m % j[kt(rT.c, rT.f)]]; }
    let l = '';
    for (let n = 0x0; n < k[kt(rT.g, rT.h)]; n++) { l += String[kt(rT.i, '60r9')](k[n]); }
    return btoa(l);
}

function base64SecretDecode(c, f) {
    const rU = { c: 0xb28, f: 0xaae, g: 0x1e66, h: '*lLT', i: 0xe9c, j: '0Ua@', k: 0x113c, l: 'w(Wr', m: 0x17d6, n: 0x13ca, o: 'Pt3!' },
        ku = fX,
        g = atob(c),
        h = new Uint8Array(g[ku(rU.c, 'PSkb')]);
    for (let n = 0x0; n < g[ku(rU.f, '#sM9')]; n++) { h[n] = g[ku(rU.g, rU.h)](n); }
    const j = new TextEncoder(),
        k = j[ku(rU.i, rU.j)](f),
        l = new Uint8Array(h[ku(0x772, '$p[^')]);
    for (let o = 0x0; o < h[ku(rU.k, rU.l)]; o++) { l[o] = h[o] ^ k[o % k[ku(rU.m, '[p9(')]]; }
    const m = new TextDecoder();
    return m[ku(rU.n, rU.o)](l);
}

function getTransportProtocolConfig(c = {}) {
    const rV = { c: 0x929, f: 0x1221, g: 'mRB^', h: '8Ys%', i: 0x1281, j: 'T3Fv', k: 0x478, l: 'rsIZ', m: 0x1339, n: 'PSkb', o: 0xa74, p: 'w(Wr' },
        kv = fX,
        f = c[kv(rV.c, '[p9(')] === kv(0x1848, '6UCx');
    return { 'type': f ? c[kv(0x1e4e, '8Ys%')] === kv(0x1305, 'vel(') ? kv(0x6f1, '0Ua@') : kv(rV.f, rV.g) : c[kv(0x5af, rV.h)] === kv(rV.i, rV.j) ? kv(rV.k, rV.l) : 'ws', 'pathFieldName': f ? kv(rV.m, '0Ua@') : kv(0xe8d, rV.n), 'domainFieldName': f ? kv(rV.o, 'IcEg') : kv(0x182b, rV.p) };
}

function getTransportPathParamValue(c = {}, f = '/', g = ![]) {
    const rW = { c: 0x42d, f: '[p9(', g: 0x1428, h: '8Ys%' },
        kw = fX,
        h = g ? '/' : c[kw(rW.c, rW.f)] ? randomPath(f) : f;
    if (c[kw(0x1579, 'w3Tt')] !== kw(rW.g, '2#Qk')) return h;
    return h[kw(0x174b, rW.h)]('?')[0x0] || '/';
}

function log(...c) {
    const kx = fX;
    if (debugLogPrint) console[kx(0xc2d, 'w3Tt')](...c);
                }
function ClashsubConfigFileHotpatch(c, f = {}, g = null) {
    const s4 = { c: 0x461, f: 0x30a, g: 'V#kN', h: 0x70b, i: '89Hn', j: 0xb58, k: 'w(Wr', l: 'ZgMu', m: 'dZbH', n: 'jODS', o: 'n7E3', p: 'dZbH', q: 0x18a8, r: '8Ys%', s: 0xd76, t: '1qbp', u: 0x550, v: 0x15b, w: 'w(Wr', x: 0x13f9, y: 'M5Ii', z: 0x1091, A: '9rQu', B: 'w3Tt', C: 'd%lH', D: 0xa43, E: 0x1fa, F: 0x118, G: 0x12f6, H: 'NxG1', I: 'oeP*', J: 'Mmsl', K: 0x35f, L: 0x16f6, M: 0x17c1, N: 0x41e, O: '1qbp', P: 0x531, Q: 'PSkb', R: 0x1ab6, S: '%oj0', T: 0x1610, U: 0xc9f, V: '89Hn', W: 0x989, X: 0x1b68, Y: 0x14dc, Z: 0x18d3, a0: 'V#kN', a1: 'mRB^', a2: 'b)3q', a3: 0xd6b, a4: 'dn8p', a5: 0xe16, a6: 'wCGK', a7: 0xcc3, a8: 0x1b5a, a9: 0x127a, aa: 0x1847, ab: 0x1b13, ac: 'rsIZ', ad: 'Gn7Q', ae: '7NO9', af: 0x1770, ag: 0x1f02, ah: 'rsIZ', ai: 0x8b3, aj: 0x92e, ak: '*lLT', al: 0x11e, am: '[]Y1', an: 0x19d5, ao: '6UCx', ap: 0xbee, aq: 'C2T0', ar: 0x1466, as: 'GzjL', at: 0x1a7d, au: 0x3a9, av: 'ZgMu', aw: 0x483, ax: 0x18d4, ay: 0x1bbf, az: '7NO9', aA: 0x11a8, aB: 'dbGg', aC: 'yxI7', aD: 'CeJW', aE: 0x1067, aF: 'T3Fv', aG: 'd%lH', aH: 0x16ff, aI: 0x857, aJ: '60r9', aK: '5M6D', aL: 0x11da, aM: 0x59f, aN: 0x1a6b, aO: 0xcfd, aP: 'zs!c', aQ: 0xa1f, aR: 0x17d6, aS: 'NMJQ', aT: 0x1b80, aU: 0xfd3, aV: 0x7b5, aW: 0x1894, aX: 0x1a18, aY: '$p[^', aZ: 0x1854, b0: 0x11c7, b1: 0x3ca, b2: 'ZgMu', b3: 'PYt$', b4: 0xceb, b5: 0xb27, b6: '6UCx' },
        s3 = { c: 0xb28, f: 0xb06, g: 'Mmsl', h: '5M6D', i: '$p[^', j: 0x87a, k: 'wCGK', l: 0x140, m: 0x136b },
        s2 = { c: 0x17d6, f: 0xa16, g: 'V#kN', h: 0x1f20, i: '60r9', j: 0xddb, k: '89Hn', l: '6UCx', m: 0x1ac4, n: '9rQu', o: 'Pt3!', p: 0xac9, q: 'Mmsl', r: 0x181f, s: 'dn8p', t: 0x10d5, u: '[]Y1', v: 0x1335, w: 0x16e1, x: '2#Qk', y: 'wCGK', z: 'IcEg', A: 'b)3q' },
        s1 = { c: 0x439, f: 'w(Wr', g: 'C2T0', h: 0x24f, i: 'n7E3' },
        s0 = { c: 0x1a46, f: '%oj0', g: 0xaac, h: 'jODS', i: 0xeb6, j: '$p[^', k: 0x10e6, l: 0x504, m: 'CeJW', n: 0x14da, o: 'jODS', p: 'NxG1', q: 'PYt$' },
        rZ = { c: 0x27d, f: 'C2T0', g: 0xee6, h: 'V#kN', i: 0x187d, j: 'rsIZ', k: 0x8b5, l: 'n7E3', m: 0x542, n: 0x3fd, o: 'T3Fv' },
        rY = { c: 0x98d, f: 'b)3q', g: 0x1bdd, h: 0x14b4, i: 'NMJQ', j: 'd%lH', k: 0x472, l: '#sM9', m: 0x729, n: 'zs!c' },
        ky = fX,
        h = f?.[ky(s4.c, 'dn8p')] || null,
        j = Boolean(f?.[ky(s4.f, 'w(Wr')]),
        k = Array[ky(0x3f5, s4.g)](f?.[ky(s4.h, s4.i)]) ? [...f[ky(s4.j, s4.k)]] : [],
        l = f?.[ky(0x1043, s4.l)]?.[ky(0xbc8, '*lLT')] || null,
        m = f?.[ky(0x699, s4.m)]?.[ky(0x9af, s4.n)],
        n = Boolean(h && j),
        o = typeof f?.[ky(0x282, s4.o)] === ky(0x1da1, s4.p) && f[ky(s4.q, 'T3Fv')][ky(0x64f, s4.r)]() ? f[ky(s4.s, s4.t)][ky(s4.u, '[p9(')]() : null,
        p = f?.[ky(s4.v, s4.w)] === ky(0x1784, 'vel(') && Boolean(o),
        q = o ? JSON[ky(s4.x, s4.y)](o) : null,
        r = g || {};
    let s = c[ky(s4.z, s4.A)](/mode:\s*Rule\b/g, ky(0x1d6b, s4.B));
    if (r[ky(0xe8c, s4.C)] === ![]) s = s[ky(s4.D, 'egod')](/^ipv6:\s*true\b/im, ky(s4.E, '89Hn'))[ky(s4.F, 'NxG1')](/^ipv6:\s*false\b/im, ky(s4.G, s4.H));
    if (!/^ipv6:/im[ky(0xac9, 'Mmsl')](s)) s = ky(0x2e2, s4.I) + (r[ky(0x909, s4.J)] !== ![]) + '\x0a' + s;
    if (r[ky(s4.K, 'PYt$')] && !/^log-level:/im[ky(0x14a5, 'C2T0')](s)) s = ky(0x1a51, 'PYt$') + r[ky(0x1e36, 'd%lH')] + '\x0a' + s;
    if (r[ky(0x1f1a, 'dbGg')]) s = s[ky(s4.L, 'Gn7Q')](/^bind-address:\s*"?(127\.0\.0\.1)"?/im, ky(s4.M, '[p9('));
    if (r[ky(0x1a44, '89Hn')]) {
        const F = ky(s4.N, s4.n);
        if (!s[ky(0x13c8, s4.O)](F)) {
            const G = s[ky(s4.P, s4.Q)](/^(  )?rule-set:\s*\n/m);
            G ? (s = s[ky(s4.R, s4.S)](/^(  )?rule-set:\s*\n/m, '$&' + F + ky(s4.T, s4.J)), s = s[ky(s4.U, s4.V)](/^(?:  )?rules:\s*$/m, ky(s4.W, 'M5Ii'))) : s = s[ky(s4.X, 'd%lH')](/^(\s*)rules:\s*$/m, '$&' + '\x0a' + ky(s4.Y, 'Gn7Q') + ky(s4.Z, s4.a0));
        }
    }
    if (r[ky(0x178e, s4.a1)]) {
        const H = ky(0x95f, s4.a2);
        !s[ky(0x1c01, 'GzjL')](H) && (s = s[ky(s4.a3, s4.a4)](/^(\s*)rules:\s*$/m, '$&' + '\x0a' + H + '\x0a' + ky(s4.a5, s4.Q) + ky(0x1f01, s4.a6) + ky(0x11ee, '[]Y1') + ky(s4.a7, 'ZgMu') + ky(0x632, 'n7E3') + ky(0x1430, 'vel(')));
    }
    if (r[ky(0x1869, 'w3Tt')]) {
        const I = ky(0xf4c, '8Ys%');
        if (!s[ky(s4.a8, 'XITC')](I)) s = s[ky(0x5f3, 'b)3q')](/^(\s*)rules:\s*$/m, '$&' + '\x0a' + I + '\x0a' + ky(s4.a9, '[p9(') + ky(s4.aa, '%oj0'));
    }
    if (r[ky(s4.ab, s4.ac)]) {
        const J = ky(0x12af, s4.ad);
        if (!s[ky(0xb7c, s4.ae)](J)) s = s[ky(s4.af, 'PSkb')](/^(\s*)rules:\s*$/m, '$&' + '\x0a' + J + '\x0a' + ky(s4.ag, s4.ah) + ky(0x1a98, s4.ac));
    }
    if (r[ky(s4.ai, 'w(Wr')]) {
        const K = ky(0xac1, s4.n);
        if (!s[ky(s4.aj, s4.ak)](K)) s = s[ky(0x1462, 'vel(')](/^(\s*)rules:\s*$/m, '$&' + '\x0a' + K + '\x0a' + ky(s4.al, 'PYt$'));
    }
    if (r[ky(0x117a, '5M6D')]) {
        const L = ky(0x1b21, s4.am);
        if (!s[ky(s4.an, s4.ao)](L)) s = s[ky(s4.ap, s4.aq)](/^(\s*)rules:\s*$/m, '$&' + '\x0a' + L + '\x0a' + ky(0x6ec, s4.am) + ky(s4.ar, s4.as));
    }
    if (r[ky(s4.at, 'Pt3!')]) {
        const M = ky(s4.au, s4.av);
        if (!s[ky(s4.aw, s4.a1)](M)) s = s[ky(0x1091, '9rQu')](/^(\s*)rules:\s*$/m, '$&' + '\x0a' + M + '\x0a' + ky(0x1882, 'C2T0') + ky(s4.ax, 'w3Tt'));
    }
    if (r[ky(s4.ay, s4.az)]) {
        const N = ky(0x4f6, 'XITC');
        if (!s[ky(s4.aA, s4.o)](N)) s = s[ky(0x1c8d, s4.aB)](/^(\s*)rules:\s*$/m, '$&' + '\x0a' + N + '\x0a' + ky(0xd0b, 'V#kN') + ky(0x1729, 'IcEg') + ky(0x677, s4.aC) + ky(0x11b4, s4.aD) + ky(s4.aE, s4.aF));
    }
    const t = ky(0x1246, 'w3Tt'),
        u = O => O[ky(0x1a72, 'rsIZ')](/grpc-opts:\s*\{([\s\S]*?)\}/i, (P, Q) => {
            const kz = ky;
            if (/grpc-user-agent\s*:/i[kz(rY.c, rY.f)](Q)) return P;
            let R = Q[kz(rY.g, rY.f)]();
            if (R[kz(rY.h, rY.i)](',')) R = R[kz(0x3bc, 'wCGK')](0x0, -0x1)[kz(0x48c, rY.j)]();
            const S = R ? R + kz(rY.k, rY.l) + q : kz(rY.m, rY.n) + q;
            return kz(0x1c05, 'PYt$') + S + '}';
        }),
        v = O => /(?:^|[,{])\s*network:\s*(?:"grpc"|'grpc'|grpc)(?=\s*(?:[,}\n#]|$))/mi[ky(0x14f3, 'T3Fv')](O),
        w = O => O[ky(0x1aab, '#sM9')](/type:\s*(\w+)/)?.[0x1] || 'vl' + ky(0x1a33, 'vel('),
        x = (O, P) => {
            const kA = ky,
                Q = w(O) === kA(rZ.c, rZ.f) ? kA(rZ.g, rZ.h) : kA(rZ.i, rZ.j),
                R = new RegExp(Q + kA(rZ.k, '7NO9') + (P ? kA(0x1c0d, rZ.l) : kA(rZ.m, 'd%lH')));
            return O[kA(rZ.n, 'T3Fv')](R)?.[0x1]?.[kA(0x48b, rZ.o)]() || null;
        },
        y = (O, P) => {
            const kB = ky;
            if (/^\s{2}nameserver-policy:\s*(?:\n|$)/m[kB(s0.c, s0.f)](O)) return O[kB(s0.g, s0.h)](/^(\s{2}nameserver-policy:\s*\n)/m, '$1' + P + '\x0a');
            const Q = O[kB(s0.i, s0.j)]('\x0a');
            let R = -0x1,
                S = ![];
            for (let U = 0x0; U < Q[kB(s0.k, 'NMJQ')]; U++) {
                const V = Q[U];
                if (/^dns:\s*$/[kB(0x1549, 'PSkb')](V)) { S = !![];
                    continue; }
                if (S && /^[a-zA-Z]/[kB(s0.l, s0.m)](V)) { R = U; break; }
            }
            const T = kB(s0.n, s0.o) + P;
            if (R !== -0x1) Q[kB(0xb93, s0.p)](R, 0x0, T);
            else Q[kB(0x110d, '89Hn')](T);
            return Q[kB(0xb4a, s0.q)]('\x0a');
        },
        z = O => {
            const kC = ky;
            if (!v(O) || /grpc-user-agent\s*:/i[kC(s1.c, 'mRB^')](O)) return O;
            if (/grpc-opts:\s*\{/i[kC(0x1dc4, s1.f)](O)) return u(O);
            return O[kC(0xbee, s1.g)](/\}(\s*)$/, kC(s1.h, 'vel(') + q + kC(0x308, s1.i));
        },
        A = (O, P) => {
            const kD = ky,
                Q = '\x20'[kD(0x11a, 'wCGK')](P);
            let R = -0x1;
            for (let W = 0x0; W < O[kD(s2.c, '[p9(')]; W++) {
                const X = O[W];
                if (!X[kD(s2.f, s2.g)]()) continue;
                const Y = X[kD(s2.h, s2.i)](/\S/);
                if (Y !== P) continue;
                if (/^\s*grpc-opts:\s*(?:#.*)?$/[kD(s2.j, s2.k)](X) || /^\s*grpc-opts:\s*\{.*\}\s*(?:#.*)?$/[kD(0x161, s2.l)](X)) { R = W; break; }
            }
            if (R === -0x1) {
                let Z = -0x1;
                for (let a0 = O[kD(0x10e1, 'w3Tt')] - 0x1; a0 >= 0x0; a0--) {
                    if (O[a0][kD(s2.m, '9rQu')]()) { Z = a0; break; }
                }
                if (Z >= 0x0) O[kD(0x360, 'NMJQ')](Z + 0x1, 0x0, Q + kD(0x85b, s2.n), Q + kD(0x157c, s2.o) + q);
                return O;
            }
            const S = O[R];
            if (/^\s*grpc-opts:\s*\{.*\}\s*(?:#.*)?$/[kD(0x161, '6UCx')](S)) {
                if (!/grpc-user-agent\s*:/i[kD(s2.p, s2.q)](S)) O[R] = u(S);
                return O;
            }
            let T = O[kD(0x18ff, '*lLT')],
                U = P + 0x2,
                V = ![];
            for (let a1 = R + 0x1; a1 < O[kD(s2.r, s2.s)]; a1++) {
                const a2 = O[a1],
                    a3 = a2[kD(s2.t, s2.u)]();
                if (!a3) continue;
                const a4 = a2[kD(s2.v, 'rsIZ')](/\S/);
                if (a4 <= P) { T = a1; break; }
                if (a4 > P && U === P + 0x2) U = a4;
                if (/^grpc-user-agent\s*:/[kD(s2.w, s2.x)](a3)) { V = !![];
                    break; }
            }
            if (!V) O[kD(0x5a2, s2.y)](T, 0x0, '\x20'[kD(0x3fc, s2.z)](U) + kD(0x752, s2.A) + q);
            return O;
        },
        B = (O, P) => {
            const kE = ky;
            let Q = -0x1;
            for (let T = O[kE(s3.c, 'PSkb')] - 0x1; T >= 0x0; T--) {
                if (O[T][kE(s3.f, s3.g)]()) { Q = T; break; }
            }
            if (Q < 0x0) return O;
            const R = '\x20'[kE(0xe35, s3.h)](P),
                S = [R + kE(0x1881, s3.i), R + kE(s3.j, s3.k)];
            if (l) S[kE(0x1c53, '[p9(')](R + kE(s3.l, 'NxG1') + l);
            return O[kE(s3.m, 'Pt3!')](Q + 0x1, 0x0, ...S), O;
        };
    if (!/^dns:\s*(?:\n|$)/m[ky(0xcd7, '$p[^')](s)) s = t + s;
    if (l && !k[ky(0x1816, s4.aG)](l)) k[ky(0x1ec6, 'M5Ii')](l);
    if (j && k[ky(0x1796, 'oeP*')] > 0x0) {
        const O = k[ky(s4.aH, '[p9(')](P => ky(0x1435, '1qbp') + P + ky(0x3a8, 'Mmsl') + (m ? m : ''))[ky(s4.aI, s4.aJ)]('\x0a');
        s = y(s, O);
    }
    if (!n && !p) return s;
    const C = s[ky(0xbcd, s4.aK)]('\x0a'),
        D = [];
    let E = 0x0;
    while (E < C[ky(s4.aL, '[]Y1')]) {
        const P = C[E],
            Q = P[ky(s4.aM, s4.as)]();
        if (Q[ky(0x1157, s4.J)](ky(0x753, 'mRB^'))) {
            let R = P,
                S = (P[ky(s4.aN, s4.a1)](/\{/g) || [])[ky(0x18ff, '*lLT')] - (P[ky(s4.aO, s4.aP)](/\}/g) || [])[ky(s4.aQ, 'Pt3!')];
            while (S > 0x0 && E + 0x1 < C[ky(s4.aR, '[p9(')]) {
                E++, R += '\x0a' + C[E], S += (C[E][ky(0x10ef, s4.a2)](/\{/g) || [])[ky(0x10e6, s4.aS)] - (C[E][ky(s4.aT, 'yxI7')](/\}/g) || [])[ky(s4.aU, 'Mmsl')];
            }
            if (p) R = z(R);
            n && x(R, !![]) === h[ky(0xa16, 'V#kN')]() && (R = R[ky(s4.aV, s4.a1)](/\}(\s*)$/, ky(s4.aW, s4.Q) + (l ? ky(s4.aX, '60r9') + l : '') + ky(0x1cc1, s4.r))), D[ky(0x34d, 'NxG1')](R), E++;
        } else {
            if (Q[ky(0x10a9, 'GzjL')](ky(0xb08, s4.aY))) {
                let T = [P],
                    U = P[ky(s4.aZ, s4.J)](/\S/),
                    V = U + 0x2;
                E++;
                while (E < C[ky(0xb28, s4.Q)]) {
                    const X = C[E],
                        Y = X[ky(0x7a4, '%oj0')]();
                    if (!Y) { T[ky(s4.b0, 'IcEg')](X), E++; break; }
                    const Z = X[ky(0x7a1, 'GzjL')](/\S/);
                    if (Z <= U && Y[ky(0x134a, s4.b2)]('-\x20')) break;
                    if (Z < U && Y) break;
                    T[ky(0x1730, s4.b3)](X), E++;
                }
                let W = T[ky(s4.b4, 'PSkb')]('\x0a');
                p && v(W) && (T = A(T, V), W = T[ky(0x857, s4.aJ)]('\x0a'));
                if (n && x(W, ![]) === h[ky(0x20a, s4.H)]()) T = B(T, V);
                D[ky(0x1ec6, 'M5Ii')](...T);
            } else D[ky(0x1436, '*lLT')](P), E++;
        }
    }
    return D[ky(s4.b5, s4.b6)]('\x0a');
}

async function SingboxsubConfigFileHotpatch(c, f = {}, g = null) {
    const sd = { c: 0x7a2, f: '0Ua@', g: 'oeP*', h: 0x11a3, i: '$p[^', j: 0xf8c, k: 'w3Tt', l: 'dn8p', m: 0x10cb, n: 0x13de, o: 0x4d6, p: 0xd61, q: 'zs!c', r: 0xb7f, s: '89Hn', t: 'NxG1', u: 0x47f, v: 'PYt$', w: 'T3Fv', x: 0x1a5e, y: '5M6D', z: 'M5Ii', A: 0x13fb, B: '6UCx', C: 'V#kN', D: 0x8d5, E: '5M6D', F: 0x8f5, G: 0xcb2, H: 0x1f15, I: 0xdda, J: 0x113c, K: 'w(Wr', L: 'Mmsl', M: 'n7E3', N: 'CeJW', O: 'n7E3', P: 0x19e1, Q: 0x1c9b, R: 0x1080, S: 0x14b7, T: '8Ys%', U: 0x1e2e, V: 0x19cd, W: 'C2T0', X: 0x1cd1, Y: 0x1b4d, Z: 'PSkb', a0: '7NO9', a1: 'XITC', a2: 0x3d0, a3: 'NMJQ', a4: 0x1138, a5: 'T3Fv', a6: 0xca8, a7: 'C2T0', a8: 'NMJQ', a9: 0x7d6, aa: '1qbp', ab: 0x994, ac: '5M6D', ad: '%oj0', ae: 'GzjL', af: 'wCGK', ag: 0x634, ah: 0xd65, ai: 'IcEg', aj: 0x188f, ak: 0x17c2, al: 0xa98, am: 0x1d75, an: 'XITC', ao: 'dZbH', ap: 'GzjL', aq: 0x1a78, ar: '[p9(', as: 0x1d4a, at: '8Ys%', au: 'PYt$', av: 0xfc9, aw: 0xc36, ax: 'oeP*', ay: 0x171f, az: 0x256, aA: 0x1d28, aB: 0xe5f, aC: '1qbp', aD: 0x1a5c, aE: 0x9a0, aF: 'zs!c', aG: 0xd5a, aH: 0x15be, aI: 0xce7, aJ: 0x4a7, aK: '2#Qk', aL: 0x73f, aM: '[]Y1', aN: 0x1319, aO: 'vel(', aP: 0x637, aQ: 0x1b63, aR: 0x834, aS: '$BSl', aT: 0x10a4, aU: 'T3Fv', aV: 'dZbH', aW: 0xd5b, aX: 0x154d, aY: 'mRB^', aZ: 0x1a6c, b0: 0x171d, b1: 0x1ed6, b2: 'b)3q', b3: 'NxG1', b4: 0x7b2, b5: 0x92d, b6: 0x405, b7: '8Ys%', b8: 'jODS', b9: 'dbGg', ba: 0x1ab2, bb: '0Ua@', bc: 'yxI7', bd: 0x1b8a, be: 'Pt3!', bf: 0x1588, bg: 'zs!c', bh: 'dZbH', bi: 0x1aa1, bj: 0x10a6, bk: '60r9', bl: 0x1b44, bm: 0x189d, bn: 'Mmsl', bo: 0x3c5, bp: 'w3Tt', bq: 0x452, br: 0xf6f, bs: '1qbp', bt: 0x76b, bu: 0x1069, bv: 0x110d, bw: 0xc5c, bx: 0x178d, by: 0x14a0, bz: 0x1d3e, bA: 0x1174, bB: 0xb86, bC: 0x538, bD: '[p9(', bE: 0x1bf1, bF: 0x922, bG: 'Pt3!', bH: 'V#kN', bI: 0x1dcb, bJ: 0x1a2e, bK: 'dZbH', bL: 0x1024, bM: 'NMJQ', bN: 0x105d, bO: 'oeP*', bP: 0x58d, bQ: 0x1ccf, bR: 0xd4b, bS: 'rsIZ', bT: 0x12db, bU: '%oj0', bV: '8Ys%', bW: 0x1d33, bX: 'Gn7Q', bY: 0x1be8, bZ: 'NxG1', c0: 0x15c, c1: 0x1c07, c2: 0x1d6c, c3: '9rQu', c4: 'zs!c', c5: 0x1da0, c6: 'NMJQ', c7: 0x1ceb, c8: '7NO9', c9: 0x19ad, ca: 0x319, cb: '*lLT', cc: 'dn8p', cd: 0xd93, ce: 0x231, cf: 'M5Ii', cg: 0x12ca, ch: 'vel(', ci: 0x15c4, ck: 0x1c39, cl: 0x698, cm: 0x15a3, cn: 'dn8p', co: 0x15e6, cp: 0x613, cq: 0x1736, cr: 0x601, cs: 0xd6a, ct: 0x201, cu: 0x71b, cv: 0x6b8, cw: 0x18dd, cx: 'IcEg', cy: 0x1707, cz: 'NMJQ', cA: 0x1506, cB: 'dn8p', cC: 0x2e7, cD: 0x1211, cE: 0x1beb, cF: 0xfe4, cG: 0x1833, cH: 'IcEg', cI: 0x18fc, cJ: 'zs!c', cK: 0x1242, cL: 0x1833, cM: '5M6D', cN: 0x13af, cO: 'dZbH', cP: 'w3Tt', cQ: 0x1e60, cR: 0x1c29, cS: 0x1da9, cT: 'dn8p', cU: 0xd52, cV: '#sM9', cW: 'b)3q', cX: 0x1ae3, cY: 0x1095, cZ: 0x18a0, d0: '60r9', d1: 0x1f08, d2: 'V#kN', d3: 0x7a3, d4: 0x1cf4, d5: '2#Qk', d6: 0x149c, d7: 0x11c0, d8: '$p[^', d9: 0x1951, da: 0xdda, db: 0x653, dc: 0x168a, dd: 0x107c, de: '*lLT', df: 0x15ce, dg: 0x17f2, dh: '6UCx', di: 0x17c3, dj: 0xe34, dk: 0x1090, dl: 0x1355, dm: 'jODS', dn: 'rsIZ', dp: 0x1838, dq: 0xec3, dr: 0x253, ds: 0x7c8, dt: 0xdf1, du: 0x19f0, dv: 'dbGg', dw: 0x138d, dx: 0x18a0, dy: '89Hn', dz: 0x1504, dA: 0xe6b, dB: '60r9', dC: 0x1e1, dD: 0x1b1b, dE: 0x3e4, dF: 0x8f6, dG: 0x15f5, dH: '*lLT', dI: 0x148c, dJ: 0xefe, dK: 'mRB^', dL: 0x280, dM: '89Hn', dN: 0x645, dO: 'n7E3', dP: 'C2T0', dQ: 0x129e, dR: 'NxG1', dS: 0x654, dT: 'NMJQ', dU: 0x1a5, dV: 0x15de, dW: 0x19b1, dX: 'Pt3!', dY: 'XITC', dZ: 0x1589, e0: 0x1045, e1: '#sM9', e2: 0x1d02, e3: 0xc35 },
        sc = { c: 0xd02, f: 0x1b4f, g: 0x16d5, h: 'CeJW', i: 0x633, j: 'w3Tt', k: 0x866, l: 0x14e1, m: 0x12f1, n: '%oj0', o: 0x464, p: 'C2T0' },
        sb = { c: '5M6D', f: 'vel(', g: 'yxI7', h: '9rQu', i: 0xf9e, j: 0x653, k: 'CeJW' },
        sa = { c: 'n7E3', f: 0x1619, g: 0x887, h: 'dbGg', i: 0x431, j: '5M6D', k: 'rsIZ', l: 0x564, m: 0x138, n: 'Pt3!', o: 'NxG1', p: 0x1b70, q: 0x1d70, r: 'NMJQ', s: 0x1828, t: 'oeP*', u: 0x1d5b, v: 'M5Ii', w: 0x1c92, x: '7NO9', y: '$BSl', z: 0x19b0, A: 'rsIZ', B: 0xd59, C: 'C2T0', D: 0xcce, E: 0x11fe, F: '$p[^', G: 0xfd },
        s9 = { c: '2#Qk', f: 0x12f5, g: 0x16d3, h: 'dbGg', i: '9rQu', j: '60r9' },
        s8 = { c: 0x11d3, f: 0x1be1, g: '60r9', h: 0x1074, i: 0x16da, j: 'd%lH', k: 'dn8p', l: 0x1349, m: 0xee3, n: '9rQu' },
        s7 = { c: 0x1551, f: 0x1be1, g: '60r9', h: 0xe20, i: 'Pt3!', j: 0x1be1, k: '60r9', l: 0x1355, m: '5M6D', n: 0x69e, o: 0x1cbe, p: 'IcEg', q: 0x906, r: 0x1e42, s: '[]Y1', t: 0x18db, u: 0xa6e, v: '6UCx', w: 0xd39, x: 'rsIZ', y: 0x1b7, z: 'PSkb', A: 0x1a01, B: 'oeP*', C: '1qbp', D: 0xfe4, E: 'd%lH' },
        s6 = { c: 0x1c45, f: 'dZbH', g: 0x493, h: 'w(Wr', i: 'Gn7Q', j: 0xed, k: '2#Qk', l: 'dn8p', m: 0x690, n: 0x1a25, o: 0x72b, p: 0x8a9, q: 'w3Tt', r: 0x200, s: 0xb29, t: '6UCx', u: 0x1448, v: 0xf04, w: '89Hn', x: 'T3Fv', y: '[]Y1', z: 0x1880, A: 'wCGK' },
        s5 = { c: 0x425, f: 'NxG1', g: 0x1653, h: 'yxI7', i: '0Ua@', j: 'zs!c', k: 'PSkb', l: 0x979, m: 'w3Tt', n: 0x15a4, o: 0x107, p: 'IcEg', q: 0x178c, r: 0x3ff, s: 0x1554, t: 0x1828, u: 0x1c9, v: '60r9', w: 'V#kN', x: 0x9e7, y: 0x1d69, z: 0x358, A: 'dZbH', B: 0x9fc, C: '60r9', D: 0x1815, E: 'n7E3', F: 0x1638, G: 'GzjL', H: 'b)3q', I: 0xba4, J: '#sM9' },
        kF = fX,
        h = f?.[kF(sd.c, sd.f)] || null,
        i = f?.[kF(0x334, sd.g)] || kF(sd.h, sd.i),
        j = Boolean(f?.[kF(sd.j, sd.k)]),
        k = f?.[kF(0x99c, sd.l)]?.[kF(0xf8e, '%oj0')] || kF(sd.m, 'T3Fv'),
        l = c[kF(sd.n, '6UCx')](/1\.1\.1\.1/g, kF(sd.o, 'XITC'))[kF(sd.p, sd.q)](/1\.0\.0\.1/g, kF(sd.r, sd.s));
    try {
        const m = JSON[kF(0x1675, 'C2T0')](l),
            n = v => v === undefined || v === null ? [] : Array[kF(0xcdf, 'zs!c')](v) ? v : [v],
            o = () => m[kF(0x1138, 'T3Fv')] = m[kF(0xd23, 'dbGg')] && typeof m[kF(0xa60, 'jODS')] === kF(0x2c1, '$p[^') ? m[kF(0xca8, 'C2T0')] : {},
            p = v => v && typeof v === kF(0x130f, 'GzjL') && !Array[kF(0x1be8, 'NxG1')](v) && typeof v[kF(0x10bd, 'w(Wr')] === kF(0x1d24, 'ZgMu') ? v[kF(0x1672, 'dZbH')] : null,
            q = (v, w) => {
                const kG = kF;
                if (!w || typeof w !== kG(s5.c, s5.f)) return null;
                const x = o(),
                    y = v + '-' + w,
                    z = Array[kG(s5.g, '$p[^')](x[kG(0x5e8, s5.h)]) ? x[kG(0x1dbe, 'CeJW')] : n(x[kG(0xc92, s5.i)]);
                if (!z[kG(0x1159, 'n7E3')](A => A?.[kG(0x1d76, 'dbGg')] === y)) {
                    const A = v === kG(0x1bea, s5.j) ? x[kG(0x1f10, s5.k)] : x[kG(s5.l, s5.m)];
                    z[kG(0x350, 'jODS')]({ 'tag': y, 'type': kG(0x128b, 'n7E3'), 'format': kG(s5.n, 'rsIZ'), 'url': kG(0xacb, '7NO9') + v + kG(s5.o, 'NMJQ') + y + kG(0x5a5, s5.p), ...A?.[kG(s5.q, s5.h)] ? { 'download_detour': A[kG(s5.r, 'XITC')] } : {} }), m[kG(s5.s, 'zs!c')] = m[kG(0x1237, 'zs!c')] && typeof m[kG(s5.t, 'oeP*')] === kG(s5.u, s5.v) ? m[kG(0x12ac, 'CeJW')] : {}, m[kG(0x71f, s5.w)][kG(0x1231, 'b)3q')] = m[kG(s5.x, '8Ys%')][kG(s5.y, s5.i)] && typeof m[kG(s5.z, s5.A)][kG(s5.B, s5.C)] === kG(s5.D, s5.E) ? m[kG(s5.F, 'IcEg')][kG(0x15c1, s5.G)] : {}, m[kG(0x13f0, s5.H)][kG(0x1e7, 'T3Fv')][kG(s5.I, 'yxI7')] ??= !![];
                }
                return x[kG(0x1bf, s5.J)] = z, y;
            },
            r = v => {
                const kH = kF;
                if (!v || typeof v !== kH(0x1abd, '*lLT') || Array[kH(s6.c, '[p9(')](v)) return v;
                if (v[kH(0x735, s6.f)] === kH(s6.g, s6.h) && Array[kH(0x1ebd, s6.i)](v[kH(s6.j, s6.k)])) return v[kH(0xd0d, s6.l)] = v[kH(s6.m, 'ZgMu')][kH(0x201, 'M5Ii')](r), v;
                const w = [];
                for (const x of n(v[kH(0x1a4d, 'Gn7Q')])) {
                    if (typeof x !== kH(0x1d1f, 'GzjL')) continue;
                    if (x[kH(0x156d, '89Hn')]() === kH(0x1892, '[p9(')) v[kH(0xb8c, 'NMJQ')] = !![];
                    else w[kH(0x1616, '5M6D')](q(kH(s6.n, '0Ua@'), x));
                }
                for (const y of n(v[kH(0x1224, 'Mmsl')])) {
                    if (typeof y !== kH(s6.o, 'M5Ii')) continue;
                    w[kH(s6.p, s6.q)](q(kH(0x1637, s6.q), y)), v[kH(s6.r, 'Mmsl')] = !![];
                }
                for (const z of n(v[kH(0xbfc, 'PSkb')]))
                    if (typeof z === kH(0x42c, '8Ys%')) w[kH(s6.s, 'oeP*')](q(kH(0x141b, s6.t), z));
                if (w[kH(0xcfc, 'PYt$')]) v[kH(s6.u, s6.q)] = [...new Set([...n(v[kH(s6.v, s6.w)]), ...w][kH(0x952, '[]Y1')](Boolean))];
                return delete v[kH(0xaab, s6.x)], delete v[kH(0x1500, s6.y)], delete v[kH(s6.z, s6.A)], v;
            },
            s = (v, w) => {
                const kI = kF;
                v = r(v);
                if (!v || typeof v !== kI(s7.c, 'b)3q') || Array[kI(s7.f, s7.g)](v)) return v;
                if (v[kI(0x187f, 'NMJQ')] === kI(s7.h, s7.i) && Array[kI(s7.j, s7.k)](v[kI(s7.l, 'jODS')])) return v[kI(0xbaa, s7.m)] = v[kI(s7.n, '1qbp')][kI(0x16ba, 'wCGK')](y => s(y, w)), v;
                const x = p(v);
                if (x && w[kI(0x185a, '0Ua@')](x)) {
                    for (const y of [kI(s7.o, s7.p), kI(s7.q, '2#Qk'), kI(s7.r, s7.s), kI(s7.t, '*lLT'), kI(s7.u, s7.v), kI(s7.w, s7.x)]) delete v[y];
                    v[kI(s7.y, s7.z)] = kI(s7.A, 'ZgMu'), v[kI(0x1e80, 'Mmsl')] = w[kI(0x1d7, '%oj0')](x);
                } else {
                    if (x && !v[kI(0xdc2, s7.B)]) v[kI(0x1247, s7.C)] = kI(s7.D, s7.E);
                }
                return v;
            };
        if (Array[kF(0x1516, 'wCGK')](m[kF(0x1ef3, 'M5Ii')]))
            for (const v of m[kF(0x696, sd.t)]) {
                if (!v || typeof v !== kF(sd.u, sd.v) || v[kF(0x1764, sd.w)] !== kF(sd.x, sd.y)) continue;
                for (const w of [{ 'targetKey': kF(0x187, sd.z), 'sourceKeys': [kF(sd.A, 'b)3q'), kF(0x1642, sd.B)] }, { 'targetKey': kF(0x648, '2#Qk'), 'sourceKeys': [kF(0x1b37, sd.C), kF(sd.D, sd.E)] }, { 'targetKey': kF(0x11a6, 'V#kN'), 'sourceKeys': [kF(sd.F, sd.k), kF(sd.G, 'vel(')] }]) {
                    const x = n(v[w[kF(0x1e75, 'ZgMu')]]);
                    for (const y of w[kF(sd.H, 'ZgMu')]) x[kF(sd.I, 'CeJW')](...n(v[y]));
                    if (x[kF(sd.J, sd.K)]) v[w[kF(0x17ac, sd.L)]] = [...new Set(x)];
                    for (const z of w[kF(0xf63, 'PSkb')]) delete v[z];
                }
                if (v[kF(0x950, sd.M)]) {
                    const A = [];
                    if (v[kF(0x1b66, sd.N)]) A[kF(0x147b, '[]Y1')]({ 'inbound': v[kF(0x950, sd.O)], 'action': kF(sd.P, 'PYt$'), 'strategy': v[kF(sd.Q, '[]Y1')] });
                    if (v[kF(0x1cfe, '$BSl')]) {
                        const B = { 'inbound': v[kF(0x124d, '8Ys%')], 'action': kF(sd.R, '*lLT') };
                        if (v[kF(sd.S, sd.T)]) B[kF(sd.U, 'GzjL')] = v[kF(0xe08, 'PYt$')];
                        A[kF(sd.V, sd.W)](B);
                    }
                    if (A[kF(0x925, '89Hn')]) {
                        const C = o();
                        C[kF(0x1758, 'egod')] = [...A, ...n(C[kF(sd.X, 'yxI7')])];
                    }
                }
                delete v[kF(sd.Y, sd.Z)], delete v[kF(0x321, sd.a0)], delete v[kF(0x113b, sd.T)];
            }
        if (m?.[kF(0x388, 'n7E3')] && typeof m[kF(0x130b, sd.a1)] === kF(sd.a2, 'Pt3!') && Array[kF(0x105d, sd.a3)](m[kF(sd.a4, sd.a5)][kF(0x1cd1, 'yxI7')])) {
            const D = E => {
                const kJ = kF;
                E = r(E);
                if (E?.[kJ(0x18c9, '*lLT')] === kJ(s8.c, '5M6D') && Array[kJ(s8.f, s8.g)](E[kJ(0x1758, 'egod')])) E[kJ(0xacd, 'dbGg')] = E[kJ(0x130, '6UCx')][kJ(s8.h, '8Ys%')](D);
                else {
                    if (E && typeof E === kJ(0x14bd, '$BSl') && !Array[kJ(s8.i, s8.j)](E) && E[kJ(0x1b55, s8.k)] && !E[kJ(s8.l, 'rsIZ')]) E[kJ(s8.m, s8.n)] = kJ(0x1138, 'T3Fv');
                }
                return E;
            };
            m[kF(sd.a6, sd.a7)][kF(0x1174, sd.a8)] = m[kF(sd.a9, sd.aa)][kF(sd.ab, 'wCGK')][kF(0x192a, sd.ac)](D);
        }
        const t = m?.[kF(0x9d2, sd.ad)];
        if (t && typeof t === kF(0x130f, sd.ae)) {
            const E = t[kF(0x442, sd.af)] && typeof t[kF(sd.ag, 'oeP*')] === kF(sd.ah, sd.ai) ? t[kF(0x7e8, 'ZgMu')] : null,
                F = new Map(),
                G = { 'tcp:': kF(sd.aj, 'M5Ii'), 'udp:': kF(0x15b8, 'IcEg'), 'tls:': kF(0x1c02, '[p9('), 'quic:': kF(sd.ak, sd.C), 'https:': kF(0x9b5, '$p[^'), 'h3:': 'h3' },
                H = { 'success': kF(0x1cca, sd.af), 'format_error': kF(sd.al, 'IcEg'), 'server_failure': kF(0x9f4, 'V#kN'), 'name_error': kF(sd.am, sd.aa), 'not_implemented': kF(0x615, sd.an), 'refused': kF(0x10be, 'V#kN') };
            let I = ![];
            if (Array[kF(0x1d4a, '8Ys%')](t[kF(0x14cc, sd.ao)])) {
                const J = [];
                for (const K of t[kF(0x18ae, sd.ap)]) {
                    if (!K || typeof K !== kF(sd.aq, sd.ar) || Array[kF(sd.as, sd.at)](K)) { J[kF(0x1730, sd.au)](K); continue; }
                    const L = { ...K };
                    let M = null,
                        N = '',
                        O = typeof L[kF(sd.av, 'NxG1')] === kF(0xa3e, '#sM9') ? L[kF(sd.aw, sd.ax)][kF(0x9ff, sd.M)]() : '';
                    if (O) {
                        const P = O[kF(0x1704, '0Ua@')]();
                        if (P === kF(sd.ay, '*lLT')) M = { 'type': kF(0x13d2, 'V#kN') };
                        else {
                            if (P === kF(sd.az, 'd%lH')) M = { 'type': kF(0x1ab9, 'vel(') };
                            else {
                                if (P[kF(sd.aA, 'w(Wr')](kF(0x70a, 'NxG1'))) M = { 'type': kF(sd.aB, sd.aC) }, N = O[kF(sd.aD, 'n7E3')](kF(0x1a21, '7NO9')[kF(sd.aE, 'V#kN')])[kF(0x1d1d, sd.aF)]();
                                else {
                                    if (P[kF(sd.aG, 'M5Ii')](kF(sd.aH, '60r9'))) {
                                        const Q = O[kF(0x115b, '[p9(')](kF(sd.aI, sd.a7)[kF(0x9a0, 'V#kN')]);
                                        M = Q && Q[kF(0x1030, '*lLT')]() !== kF(sd.aJ, 'b)3q') ? { 'type': kF(0x13d0, '89Hn'), 'interface': Q } : { 'type': kF(0xe04, sd.aK) };
                                    } else {
                                        try {
                                            const R = new URL(O),
                                                S = G[R[kF(sd.aL, sd.aM)][kF(0x349, '$BSl')]()];
                                            if (S) {
                                                const T = R[kF(sd.aN, sd.aO)]?.[kF(0xa8d, 'b)3q')]('[') && R[kF(sd.aP, 'T3Fv')][kF(0x66a, '[p9(')](']') ? R[kF(0x155c, sd.a5)][kF(sd.aR, sd.aS)](0x1, -0x1) : R[kF(0x1cba, 'dZbH')];
                                                M = { 'type': S, 'server': T || R[kF(0x872, 'b)3q')] || O, ...R[kF(0x1e0b, '60r9')] ? { 'server_port': Number(R[kF(sd.aT, sd.aU)]) } : {}, ...(S === kF(0x1222, sd.aV) || S === 'h3') && R[kF(sd.aW, 'oeP*')] && R[kF(0x257, 'PSkb')] !== kF(sd.aX, sd.au) ? { 'path': R[kF(0x17aa, sd.aY)] } : {} };
                                            }
                                        } catch (U) {}
                                        if (!M) M = { 'type': kF(sd.aZ, sd.af), 'server': O };
                                    }
                                }
                            }
                        }
                    }
                    if (M?.[kF(sd.b0, sd.f)] === kF(sd.b1, sd.l)) {
                        const V = H[N] || kF(0x17c4, sd.b2);
                        typeof L[kF(0x810, sd.b3)] === kF(0x123d, sd.ad) && L[kF(sd.b4, 'XITC')] && (F[kF(sd.b5, '1qbp')](L[kF(sd.b6, sd.Z)], V), F[kF(0x18e0, sd.b7)](L[kF(0x1cef, sd.b8)][kF(0x1d28, sd.K)](kF(0x3b1, 'jODS')) ? L[kF(0x1d76, sd.b9)][kF(sd.ba, sd.l)](0x4) : kF(0x1128, sd.bb) + L[kF(0x1752, sd.bc)], V));
                        continue;
                    }
                    M && (delete L[kF(sd.bd, sd.be)], Object[kF(sd.bf, sd.bg)](L, M));
                    if (L[kF(0xb31, sd.bh)] !== undefined && L[kF(sd.bi, sd.aM)] === undefined) L[kF(0xc4b, '2#Qk')] = L[kF(0x1bb, '2#Qk')];
                    if (L[kF(sd.bj, sd.bk)] !== undefined && L[kF(sd.bl, '6UCx')] === undefined) L[kF(0x338, sd.aK)] = L[kF(sd.bm, 'V#kN')];
                    delete L[kF(0xc6f, sd.bn)], delete L[kF(0x1370, sd.ar)];
                    if (L[kF(0xc83, 'oeP*')] === kF(sd.bo, sd.aS)) delete L[kF(0xc3b, sd.bp)];
                    if (L[kF(sd.bq, 'IcEg')] === kF(sd.br, sd.bs)) {
                        I = !![];
                        if (E)
                            for (const W of [kF(sd.bt, 'ZgMu'), kF(sd.bu, '6UCx')]) {
                                if (E[W] !== undefined && L[W] === undefined) L[W] = E[W];
                            }
                    }
                    J[kF(sd.bv, '89Hn')](L);
                }
                t[kF(sd.bw, 'd%lH')] = J;
            }
            if (E && !I && E[kF(0x889, sd.ai)] !== ![]) {
                const X = { 'type': kF(0x1915, '60r9'), 'tag': kF(sd.bx, sd.s) };
                for (const Y of Array[kF(sd.by, '89Hn')](t[kF(sd.bz, 'CeJW')]) ? t[kF(sd.bA, 'NMJQ')] : []) {
                    const Z = p(Y);
                    if (Z && Z[kF(sd.bB, sd.aY)]()[kF(sd.bC, sd.bD)](kF(sd.bE, 'IcEg'))) { X[kF(sd.bF, sd.bG)] = Z; break; }
                }
                for (const a0 of [kF(0xb7b, sd.bH), kF(sd.bI, 'yxI7')]) {
                    if (E[a0] !== undefined) X[a0] = E[a0];
                }
                if (Array[kF(sd.bJ, sd.bK)](t[kF(sd.bL, sd.y)])) t[kF(0x803, 'vel(')][kF(sd.bM, 'b)3q')](X);
                else t[kF(0x44a, sd.bM)] = [X];
            }
            if (Array[kF(sd.bN, 'NMJQ')](t[kF(0x12ef, sd.bO)])) {
                const a1 = [];
                for (const a2 of t[kF(sd.bP, 'mRB^')]) {
                    const a3 = p(a2),
                        a4 = n(a2?.[kF(sd.bQ, sd.bp)]),
                        a5 = new Set([kF(sd.bR, 'PSkb'), kF(0x3e2, sd.bS), kF(0x1349, 'rsIZ'), kF(sd.bT, sd.bU), kF(0x7d5, sd.bV), kF(0x1b49, sd.M), kF(0x100d, 'd%lH'), kF(sd.bW, sd.bX)]),
                        a6 = a2 && typeof a2 === kF(0x2c1, sd.i) && !Array[kF(sd.bY, sd.bZ)](a2) && a2[kF(sd.c0, 'Pt3!')] !== kF(0x5fc, 'wCGK') && a3 && a4[kF(sd.c1, sd.t)](kF(sd.c2, sd.c3)) && Object[kF(0x16d2, sd.c4)](a2)[kF(sd.c5, sd.c6)](a7 => a5[kF(0x18e, 'GzjL')](a7));
                    if (a6) {
                        const a7 = o();
                        if (a7[kF(sd.c7, sd.c8)] === undefined) {
                            const a8 = { 'server': a3 };
                            for (const a9 of [kF(sd.c9, 'PSkb'), kF(sd.ca, sd.af), kF(0x18db, sd.cb), kF(0x69a, sd.cc), kF(0x4d4, 'XITC')]) {
                                if (a2[a9] !== undefined) a8[a9] = a2[a9];
                            }
                            a7[kF(sd.cd, 'b)3q')] = Object[kF(sd.ce, sd.cf)](a8)[kF(0x11da, '[]Y1')] === 0x1 ? a8[kF(0x1deb, 'GzjL')] : a8;
                        }
                        continue;
                    }
                    a1[kF(sd.cg, sd.ch)](s(a2, F));
                }
                t[kF(sd.ci, sd.bk)] = a1;
            }
            delete t[kF(sd.ck, sd.bX)], delete t[kF(sd.cl, 'dZbH')];
        }
        m?.[kF(0x66d, sd.bU)] && typeof m[kF(sd.cm, 'GzjL')] === kF(0x125e, sd.b9) && (delete m[kF(0x3dd, '[p9(')][kF(0x66e, sd.cn)], delete m[kF(0x15a3, 'GzjL')][kF(0x1df6, '5M6D')]);
        if (m?.[kF(sd.co, 'PSkb')]?.[kF(sd.cp, '#sM9')] === kF(0xe73, sd.O)) delete m[kF(sd.cq, 'NxG1')][kF(sd.cr, 'Pt3!')];
        if (Array[kF(sd.as, '8Ys%')](m[kF(sd.cs, 'b)3q')])) {
            const aa = new Set(m[kF(0x1234, sd.aY)][kF(sd.ct, 'M5Ii')](ac => ac?.[kF(0x147a, '5M6D')])[kF(sd.cu, sd.ae)](Boolean)),
                ab = ac => ac === kF(0x1c84, 'Mmsl') || ac && typeof ac === kF(0x14bd, '$BSl') && (Array[kF(0x127e, '9rQu')](ac) ? ac[kF(0x618, 'b)3q')](ab) : Object[kF(0x5ca, '[p9(')](ac)[kF(0x254, '1qbp')](ab));
            if (!aa[kF(sd.cv, sd.cb)](kF(0x535, '60r9')) && ab({ 'outbounds': m[kF(0x13d1, 'NxG1')], 'route': m[kF(0x388, sd.O)] })) m[kF(sd.cw, sd.cx)][kF(sd.cy, sd.cz)]({ 'type': kF(sd.cA, sd.cB), 'tag': kF(sd.cC, 'C2T0') });
        }
        const u = g || {};
        u[kF(sd.cD, 'IcEg')] === ![] && m[kF(sd.cE, 'rsIZ')] && m[kF(0xba2, '6UCx')][kF(0x1539, sd.af)](ac => {
            const kK = kF;
            ac && typeof ac === kK(0x128, s9.c) && ac[kK(s9.f, '$p[^')] === kK(s9.g, s9.h) && (delete ac[kK(0x13db, s9.i)], delete ac[kK(0xff0, s9.j)]);
        });
        if (u[kF(0xde4, 'egod')] && m[kF(sd.a6, 'C2T0')]) {
            const ac = m[kF(sd.cF, 'd%lH')][kF(sd.cG, sd.cH)] || [],
                ad = ac[kF(sd.cI, sd.cJ)](ae => ae[kF(0x1b9b, 'T3Fv')] === kF(0x50d, 'wCGK') && (JSON[kF(0x1f14, 'Mmsl')](ae)[kF(0xcb8, 'vel(')]('ir') || JSON[kF(0x30e, 'T3Fv')](ae)[kF(0x5eb, '0Ua@')]('IR')));
            !ad && m[kF(sd.cK, '2#Qk')][kF(sd.cL, 'IcEg')][kF(0x1bab, sd.cM)]({ 'outbound': kF(0x9ea, '#sM9'), 'rule_set': [kF(sd.cN, sd.cO), kF(0x1a07, sd.cP)], 'type': kF(sd.cQ, 'dZbH'), 'mode': 'or', 'rules': [{ 'rule_set': [kF(sd.cR, 'n7E3')] }, { 'rule_set': [kF(sd.cS, 'V#kN')] }] });
        }
        if (u[kF(0x192c, sd.cT)] && m[kF(sd.cU, sd.cV)]) {
            const ae = m[kF(0x66f, sd.cW)][kF(sd.cX, sd.aF)][kF(sd.cY, sd.B)](af => af[kF(0x5cf, 'IcEg')] === kF(0x1f19, '$p[^') && JSON[kF(0x1ede, 'dn8p')](af)[kF(0x5c6, 'PYt$')]()[kF(0x19c5, 'M5Ii')](kF(0x1dbd, 'jODS')));
            !ae && m[kF(sd.cZ, '89Hn')][kF(sd.ci, sd.d0)][kF(0x17a9, 'dbGg')]({ 'outbound': kF(0x1f19, '$p[^'), 'rule_set': [kF(sd.d1, sd.d2)] });
        }
        if (u[kF(sd.d3, '#sM9')]) {
            const af = m[kF(sd.d4, sd.c4)] && m[kF(0xb68, sd.d5)][kF(sd.d6, '$BSl')](ag => ag[kF(0x1839, 'ZgMu')] === kF(0x1d2e, '*lLT'));
            if (!af) {
                if (!m[kF(sd.d7, sd.d8)]) m[kF(0x1c50, sd.z)] = [];
                m[kF(sd.d9, '7NO9')][kF(sd.da, 'CeJW')]({ 'type': kF(0x17cf, sd.K), 'tag': kF(sd.db, sd.N) });
            }
        }
        if (m[kF(0x17b3, 'NxG1')]) {
            if (!Array[kF(0x1867, 'GzjL')](m[kF(sd.dc, '7NO9')][kF(0xed, '2#Qk')])) m[kF(sd.dd, sd.cc)][kF(0x79b, sd.de)] = [];
            if (!Array[kF(sd.df, 'Pt3!')](m[kF(0x1153, 'mRB^')][kF(sd.dg, sd.dh)])) m[kF(0x654, sd.c6)][kF(sd.di, 'PYt$')] = [];
            const ag = (aj, ak) => {
                const kL = kF,
                    al = aj + '-' + ak;
                return !m[kL(0x388, sa.c)][kL(sa.f, 'ZgMu')][kL(sa.g, sa.h)](am => am && am[kL(0xc40, 'oeP*')] === al) && (m[kL(0x1889, 'PSkb')][kL(sa.i, 'wCGK')][kL(0x1616, sa.j)]({ 'tag': al, 'type': kL(0x43b, sa.k), 'format': kL(sa.l, '[]Y1'), 'url': kL(0xef2, 'wCGK') + aj + kL(sa.m, sa.n) + al + kL(0x1a5d, 'dbGg') }), m[kL(0x1da7, sa.o)] = m[kL(sa.p, 'Gn7Q')] && typeof m[kL(sa.q, 'PSkb')] === kL(0x12b4, sa.r) ? m[kL(sa.s, sa.t)] : {}, m[kL(sa.u, sa.v)][kL(0x126a, 'XITC')] = m[kL(sa.w, 'Mmsl')][kL(0x8c8, sa.x)] && typeof m[kL(0x1380, sa.y)][kL(sa.z, sa.A)] === kL(sa.B, sa.C) ? m[kL(sa.D, '#sM9')][kL(sa.E, sa.F)] : {}, m[kL(0x1da7, 'NxG1')][kL(0x17ff, 'oeP*')][kL(sa.G, '[]Y1')] = !![]), al;
            },
            ah = () => {
                const kM = kF;
                if (!m[kM(0x4a2, sb.c)]) m[kM(0x1829, sb.f)] = [];
                if (!m[kM(0x13d7, 'dZbH')][kM(0x419, 'rsIZ')](aj => aj && aj[kM(0x153, '60r9')] === kM(0x1832, 'yxI7'))) m[kM(0x6bb, sb.g)][kM(0x1026, sb.h)]({ 'type': kM(sb.i, '$BSl'), 'tag': kM(sb.j, sb.k) });
            },
            ai = aj => m[kF(0x66d, '%oj0')][kF(0xe39, 'w(Wr')][kF(0x8b0, 'C2T0')](aj);
            u[kF(sd.dj, '[]Y1')] && !ai(aj => aj[kF(0x9c2, 'zs!c')] === kF(0xb49, '2#Qk') && JSON[kF(0xac3, 'IcEg')](aj)[kF(0x1c01, 'GzjL')](kF(0xe30, 'dbGg'))) && (ah(), m[kF(sd.dk, sd.bV)][kF(sd.dl, sd.dm)][kF(0x1078, sd.cH)]({ 'outbound': kF(0x3ce, sd.aO), 'rule_set': [ag(kF(0x1207, sd.dn), kF(sd.dp, sd.cT))] }));
            u[kF(sd.dq, 'ZgMu')] && !ai(aj => aj[kF(0xf09, '$BSl')] === kF(0x11ff, 'GzjL') && JSON[kF(0x825, '5M6D')](aj)[kF(0xb7c, '7NO9')](kF(0x45b, 'yxI7'))) && (ah(), m[kF(sd.dr, '9rQu')][kF(sd.ds, 'jODS')]({ 'outbound': kF(sd.dt, 'd%lH'), 'rule_set': [ag(kF(sd.du, sd.dv), kF(0x1f06, 'PSkb'))] }));
            u[kF(sd.dw, '0Ua@')] && !ai(aj => aj[kF(0x5cf, 'IcEg')] === kF(0x3ce, 'vel(') && aj[kF(0xcc1, '$p[^')] === kF(0x1f11, '9rQu') && Array[kF(0x1cf1, 'ZgMu')](aj[kF(0xffa, '6UCx')]) && aj[kF(0x1618, 'yxI7')][kF(0x5eb, '0Ua@')](0x1bb)) && (ah(), m[kF(sd.dx, sd.dy)][kF(0x1d3e, sd.N)][kF(sd.dz, sd.aY)]({ 'outbound': kF(sd.dA, sd.dB), 'network': kF(sd.dC, sd.bV), 'port': [0x1bb] }));
            u[kF(0x1af2, 'XITC')] && !ai(aj => aj[kF(0x674, 'XITC')] === kF(0x1c8e, 'PSkb') && JSON[kF(0x93a, 'dZbH')](aj)[kF(0x538, '[p9(')](kF(0x1e56, '8Ys%'))) && m[kF(0x1889, sd.Z)][kF(0xe09, sd.M)][kF(sd.dD, sd.f)]({ 'outbound': kF(sd.dE, 'Gn7Q'), 'rule_set': [ag(kF(sd.dF, '60r9'), 'cn'), ag(kF(sd.dG, sd.dH), 'cn')], 'type': kF(sd.dI, sd.cW), 'mode': 'or', 'rules': [{ 'rule_set': [ag(kF(sd.dJ, 'CeJW'), 'cn')] }, { 'rule_set': [ag(kF(0x1df6, sd.E), 'cn')] }] });
            u[kF(0x288, 'GzjL')] && !ai(aj => aj[kF(0x1d68, 'C2T0')] === kF(0x1ae6, '[p9(') && JSON[kF(0x1abc, 'rsIZ')](aj)[kF(0xe1f, 'rsIZ')](kF(0x1120, 'V#kN'))) && m[kF(0x1153, sd.dK)][kF(sd.dL, sd.dM)][kF(sd.dN, sd.dO)]({ 'outbound': kF(0x46d, sd.dP), 'rule_set': [ag(kF(0x1a0d, 'mRB^'), 'ru'), ag(kF(sd.dQ, sd.N), 'ru')], 'type': kF(0x40f, '6UCx'), 'mode': 'or', 'rules': [{ 'rule_set': [ag(kF(0x1bea, 'zs!c'), 'ru')] }, { 'rule_set': [ag(kF(0xd5c, sd.dR), 'ru')] }] });
            u[kF(0x15e0, sd.aF)] && !ai(aj => aj[kF(0x824, 'Pt3!')] === kF(0xc29, 'NxG1') && JSON[kF(0x9db, '%oj0')](aj)[kF(0x1b5a, 'XITC')](kF(0x1c4f, '$p[^'))) && m[kF(sd.dS, sd.dT)][kF(sd.dU, 'b)3q')][kF(sd.dV, 'yxI7')]({ 'outbound': kF(0xd54, sd.bO), 'rule_set': [ag(kF(sd.dW, sd.dX), kF(0x1175, '7NO9'))] });
        }
        return h && m[kF(0x8f8, sd.dY)]?.[kF(0xcd8, '$BSl')](aj => {
            const kN = kF;
            (aj[kN(sc.c, 'GzjL')] && aj[kN(0x187d, 'rsIZ')] === h || aj[kN(sc.f, 'wCGK')] && aj[kN(sc.g, sc.h)] === h) && (!aj[kN(sc.i, sc.j)] && (aj[kN(sc.k, 'PYt$')] = { 'enabled': !![] }), i && (aj[kN(sc.l, 'egod')][kN(sc.m, sc.n)] = { 'enabled': !![], 'fingerprint': i }), j && (aj[kN(sc.o, 'dn8p')][kN(0x13da, sc.p)] = { 'enabled': !![], 'query_server_name': k }));
        }), JSON[kF(sd.dZ, sd.dv)](m, null, 0x2);
    } catch (aj) { return console[kF(sd.e0, sd.e1)](kF(sd.e2, sd.a7), aj), JSON[kF(0x1d53, sd.c8)](JSON[kF(sd.e3, sd.O)](l), null, 0x2); }
                }
function SurgesubConfigFileHotpatch(c, f, g) {
    const se = { c: 'yxI7', f: '#sM9', g: 'IcEg', h: 0x3ac, i: 'n7E3', j: 'XITC', k: 0xcb8, l: '60r9', m: 0x1bf6, n: '9rQu', o: 0x1944, p: 'w3Tt', q: 'T3Fv', r: 0xaef, s: 'vel(', t: 0x487, u: 'Mmsl', v: 0x19df, w: 0x1b68, x: '6UCx', y: 0x13e8, z: 'CeJW', A: 0xe31, B: 0x1309, C: 0xc6c, D: 'wCGK', E: 0xca2, F: 'NxG1', G: 0x1698, H: '8Ys%' },
        kO = fX,
        h = c[kO(0xf52, se.c)]('\x0d\x0a') ? c[kO(0x1c80, 'ZgMu')]('\x0d\x0a') : c[kO(0x1567, se.f)]('\x0a'),
        i = g[kO(0x154c, '$BSl')] ? randomPath(g[kO(0x1d8, se.g)]) : g[kO(se.h, se.i)];
    let j = '';
    for (let k of h) {
        if (k[kO(0x92e, '*lLT')](kO(0xf31, '5M6D') + kO(0x3e8, se.j)) && !k[kO(se.k, 'vel(')](kO(0x15cf, se.l)) && !k[kO(se.m, se.n)](kO(0xc68, '1qbp'))) {
            const l = k[kO(se.o, se.p)](kO(0x1677, se.q))[0x1][kO(se.r, 'mRB^')](',')[0x0],
                m = kO(0x7c6, 'zs!c') + l + kO(0x8de, se.s) + g[kO(se.t, se.u)],
                n = kO(0x19a8, 'd%lH') + l + kO(0x123b, se.p) + g[kO(0xf17, 'n7E3')] + kO(se.v, 'oeP*') + i[kO(se.w, 'd%lH')](/,/g, kO(0x361, se.x)) + kO(se.y, se.u) + l + '\x22';
            j += k[kO(0x1805, se.z)](new RegExp(m, 'g'), n)[kO(0x1c32, 'NMJQ')]('[', '')[kO(0x10dc, 'Pt3!')](']', '') + '\x0a';
        } else j += k + '\x0a';
    }
    return j = kO(se.A, 'b)3q') + f + kO(0xd79, '6UCx') + g[kO(se.B, 'oeP*')][kO(se.C, se.D)] * 0x3c * 0x3c + kO(se.E, 'Pt3!') + j[kO(0x1b11, se.F)](j[kO(se.G, se.H)]('\x0a')), j;
}

function formatBytes(c) {
    const sf = { c: 0x9a0 },
        kP = fX;
    c = Number(c) || 0x0;
    const f = ['B', 'KB', 'MB', 'GB', 'TB'];
    let g = 0x0;
    while (c >= 0x400 && g < f[kP(sf.c, 'V#kN')] - 0x1) { c /= 0x400, g++; }
    return c[kP(0x1908, 'PSkb')](g === 0x0 ? 0x0 : 0x2) + '\x20' + f[g];
}

function tehranYMD(c) {
    const sg = { c: 0x1bf4, f: 0x12fa, g: '0Ua@', h: 0x6da, i: 'V#kN' },
        kQ = fX,
        f = new Date(c),
        g = 3.5 * 0x3c,
        h = new Date(f[kQ(sg.c, 'NxG1')]() + g * 0xea60),
        i = h[kQ(0x135c, '2#Qk')](),
        j = String(h[kQ(sg.f, sg.g)]() + 0x1)[kQ(sg.h, 'b)3q')](0x2, '0'),
        k = String(h[kQ(0x1795, sg.i)]())[kQ(0x1853, 'Pt3!')](0x2, '0');
    return { 'year': i, 'month': j, 'day': k };
}

async function readUsageStats(c) {
    const sh = { c: 0xf11, f: 0x1b5, g: 'wCGK', h: 0x1a20, i: 0xa0a, j: 'ZgMu', k: 0x1296, l: 'mRB^', m: 0x14d1, n: 0x14d0, o: 0x1314, p: 'C2T0' },
        kR = fX,
        f = new Date(),
        g = () => ({ 'up': 0x0, 'down': 0x0, 'total': 0x0 }),
        h = await usageGet(c, kR(0x28b, 'CeJW') + getDateKey(f)) || g(),
        i = await usageGet(c, kR(sh.c, 'zs!c') + getMonthKey(f)) || g(),
        j = g(),
        k = g();
    try {
        const l = kR(sh.f, sh.g) + tehranYMD(f)[kR(sh.h, '9rQu')] + '-',
            m = await usageListMonths(c);
        for (const n of m) {
            k['up'] += n['up'] || 0x0, k[kR(sh.i, 'NMJQ')] += n[kR(0x14d1, sh.j)] || 0x0, k[kR(0xa99, '89Hn')] += n[kR(0x1907, '$BSl')] || 0x0;
            n[kR(sh.k, sh.l)][kR(0x1bd4, 'Pt3!')](l) && (j['up'] += n['up'] || 0x0, j[kR(sh.m, sh.j)] += n[kR(sh.n, 'T3Fv')] || 0x0, j[kR(0x115e, 'oeP*')] += n[kR(sh.o, sh.p)] || 0x0);
        }
    } catch (o) {}
    return { 'today': h, 'month': i, 'year': j, 'all': k };
}

async function getPoolHosts(c) {
    const si = { c: 'PSkb', f: '8Ys%', g: 0x586, h: '[p9(', i: 0xb58, j: 'w(Wr', k: 0xaae, l: '#sM9', m: 'dn8p', n: '%oj0' },
        kS = fX;
    try {
        const f = c['KV'] && typeof c['KV'][kS(0x99f, 'dbGg')] === kS(0x16f5, si.c) ? await getConfigRaw(c) : null,
            g = f ? JSON[kS(0x1ef4, si.f)](f) : null;
        if (g && Array[kS(si.g, 'b)3q')](g[kS(0xa5a, si.h)]) && g[kS(si.i, si.j)][kS(si.k, si.l)]) return [...new Set(g[kS(0x1b61, '$p[^')][kS(0x165c, si.m)](Boolean))];
        if (g && g[kS(0xa5c, si.n)]) return [g[kS(0x83d, 'IcEg')]];
    } catch (h) {}
    return [];
}

async function resolvePrimaryBaseUrl(c) {
    const sj = { c: 0x1997, f: '2#Qk', g: 0x1ab0, h: 'GzjL' },
        kT = fX,
        f = await getPoolHosts(c),
        g = f[kT(0x1168, '1qbp')](i => i && !i[kT(0x7c0, 'CeJW')]('*'));
    return g ? kT(0xfb8, '89Hn') + g[kT(sj.c, sj.f)](/^https?:\/\//, '')[kT(sj.g, sj.h)](/\/.*$/, '') : null;
}

async function checkDomainHealth(c, f, g) {
    const sl = { c: 0x141c, f: 'Pt3!', g: 'M5Ii', h: 'Gn7Q', i: 0x194d, j: '[]Y1', k: 0x988, l: '2#Qk', m: 'C2T0' },
        sk = { c: 0x18cd, f: 0xc5f, g: 'zs!c', h: 0x1d3d, i: 0xf8f, j: 'dn8p', k: 0x1d33, l: 0xfe5, m: 'ZgMu', n: 0x1440, o: 'PSkb', p: '[]Y1', q: 0x335, r: 'w3Tt', s: 'dbGg', t: '5M6D', u: 0xc79, v: 0x13de, w: 0x1091, x: '9rQu', y: 0x1393, z: 0x6e3, A: 'C2T0', B: 'n7E3', C: 0x1537 },
        kU = fX,
        h = m => String(m || '')[kU(0xd06, 'n7E3')]()[kU(0xb9b, 'n7E3')](/^https?:\/\//, '')[kU(0x5f7, 'T3Fv')]('/')[0x0],
        i = h(g),
        j = (f || [])[kU(sl.c, sl.f)](m => m && !m[kU(0xc84, '#sM9')]('*')),
        k = [];
    await Promise[kU(0x15ba, sl.g)](j[kU(0x1dc, sl.h)](async m => {
        const kV = kU;
        if (i && h(m) === i) { k[kV(sk.c, 'yxI7')]({ 'host': m, 'ok': !![], 'status': 0xc8, 'reason': kV(0x1491, '5M6D'), 'checkedAt': Date[kV(sk.f, sk.g)]() });
            return; }
        let n = ![],
            o = 0x0,
            p = '';
        try {
            const q = { 'headers': { 'User-Agent': kV(sk.h, 'rsIZ') } };
            if (typeof AbortSignal !== kV(sk.i, sk.j) && AbortSignal[kV(sk.k, 'Gn7Q')]) q[kV(sk.l, sk.m)] = AbortSignal[kV(sk.n, 'ZgMu')](0x1f40);
            const s = await fetch(kV(0x1c19, sk.o) + m[kV(0x3b7, sk.p)](/^https?:\/\//, '') + kV(0xa8a, 'rsIZ'), q);
            o = s[kV(sk.q, 'w(Wr')], n = s['ok'];
            if (n) {
                const u = await s[kV(0x1808, sk.r)]();
                n = !!u && u[kV(0xd77, sk.s)] > 0x8;
                if (!n) p = kV(0x177a, sk.t);
            } else {
                let v = '';
                try { v = (await s[kV(sk.u, 'Pt3!')]())[kV(sk.v, '6UCx')](/<[^>]+>/g, '\x20')[kV(sk.w, sk.x)](/\s+/g, '\x20')[kV(sk.y, 'IcEg')]()[kV(sk.z, sk.A)](0x0, 0x50); } catch (w) {}
                p = kV(0x1018, sk.B) + o + (v ? ':\x20' + v : '');
            }
        } catch (x) { o = -0x1, p = (x && x[kV(sk.C, 'V#kN')] ? x[kV(0x6aa, 'b)3q')] : String(x))[kV(0x112f, '%oj0')](0x0, 0x78); }
        k[kV(0x1707, 'NMJQ')]({ 'host': m, 'ok': n, 'status': o, 'reason': p, 'checkedAt': Date[kV(0x1b51, '*lLT')]() });
    }));
    const l = { 'checkedAt': Date[kU(sl.i, sl.j)](), 'domains': k };
    try { await c['KV'][kU(0x1dd0, 'dZbH')](kU(sl.k, sl.l), JSON[kU(0x10c5, sl.m)](l)); } catch (m) {}
    return l;
}

async function runScheduledMaintenance(c) {
    const sm = { c: 0x5da, f: 0x1859, g: 'dbGg', h: 0x310, i: 0x73a, j: 'M5Ii' },
        kW = fX,
        f = await getPoolHosts(c),
        g = await resolvePrimaryBaseUrl(c),
        h = await checkDomainHealth(c, f, String(g || '')[kW(sm.c, 'Mmsl')](/^https?:\/\//, '')[kW(sm.f, sm.g)]('/')[0x0]);
    try { await buildFallbackNodes(c); } catch (j) { console[kW(0x28c, 'jODS')](kW(sm.h, 'Gn7Q'), j && j[kW(sm.i, sm.j)]); }
    const i = await publishSubMirror(c, g);
    try { await centralHeartbeat(c); } catch (k) {}
    try { await refreshAnnouncements(c); } catch (l) {}
    return { 'health': h, 'mirror': i };
    }
                // ============================================================
// ۱. تابع panelHtml - صفحه اصلی پنل با تم نارنجی و مشکی
// ============================================================
async function panelHtml(c, f, g = {}) {
    const tw = { c: 0x963, f: 'yxI7', g: 0xdbb, h: 0x961, i: 0x11f7, j: 0x1c5a, k: 'PYt$', l: 0xe53, m: 0x1a72, n: 0x576, o: 'rsIZ', p: 0x939, q: 'CeJW', r: '[p9(', s: 0x1c0b, t: 0x1b07, u: 'V#kN', v: 0x1094, w: 'yxI7', x: 0x1125, y: 0xb02 },
        m3 = fX,
        i = panelHasAssets(c);
    let j = null;
    try { j = await panelFetch(c, f); } catch (m) { j = null; }
    if (!j || !j['ok']) return new Response(panelUnavailableHtml(), { 'status': 0xc8, 'headers': { 'Content-Type': m3(0x112b, 'dn8p'), 'Cache-Control': m3(tw.c, tw.f) } });
    let k = await j[m3(tw.g, 'CeJW')]();
    
    // ============================================================
    // تغییر رنگ‌های پنل به تم مشکی و نارنجی (Taakaa-Xi Theme)
    // ============================================================
    k = k.replace(/<style>([\s\S]*?)<\/style>/gi, (match, css) => {
        // جایگزینی رنگ‌های اصلی با رنگ‌های جدید
        const colorMap = {
            '#ffffff': '#1a1a1a', '#fff': '#1a1a1a',
            '#f8f9fa': '#0d0d0d', '#e9ecef': '#1a1a1a',
            '#dee2e6': '#2a2a2a', '#ced4da': '#3a3a3a',
            '#adb5bd': '#ffa64d', '#6c757d': '#ff8c00',
            '#495057': '#ff6b00', '#343a40': '#0d0d0d',
            '#212529': '#1a1a1a',
            '#007bff': '#ff6b00', '#0069d9': '#ff6b00',
            '#005cbf': '#ff6b00', '#0d6efd': '#ff6b00',
            '#0a58ca': '#ff6b00', '#084298': '#ff6b00',
            '#28a745': '#ff8c00', '#dc3545': '#ff6b00',
            '#ffc107': '#ffa64d', '#17a2b8': '#ff6b00'
        };
        let newCss = css;
        for (const [oldColor, newColor] of Object.entries(colorMap)) {
            newCss = newCss.replace(new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), newColor);
        }
        return '<style>' + newCss + '</style>';
    });
    
    // ============================================================
    // اضافه کردن استایل‌های اختصاصی تم مشکی و نارنجی
    // ============================================================
    k = k.replace(/<\/head>/i, `<style>
        /* ============================================================
           Taakaa-Xi Custom Theme - Black & Orange
           ============================================================ */
        
        * { box-sizing: border-box; }
        body, html {
            background-color: #1a1a1a !important;
            color: #ffa64d !important;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
        }
        
        .container, .main-content, .page-wrapper {
            background-color: #1a1a1a !important;
            color: #ffa64d !important;
        }
        
        .navbar, .header, .top-bar, nav, .nav-bar {
            background-color: #0d0d0d !important;
            border-bottom: 2px solid #ff6b00 !important;
            color: #ffa64d !important;
        }
        .navbar-brand, .nav-link, .header-title {
            color: #ffa64d !important;
        }
        .navbar-brand:hover, .nav-link:hover {
            color: #ff8c00 !important;
        }
        
        .btn, .button, button, .submit-btn, .action-btn {
            background-color: #ff6b00 !important;
            border: 1px solid #ff6b00 !important;
            color: #1a1a1a !important;
            border-radius: 4px !important;
            padding: 8px 16px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
        }
        .btn:hover, .button:hover, button:hover {
            background-color: #ff8c00 !important;
            border-color: #ff8c00 !important;
            color: #0d0d0d !important;
            box-shadow: 0 0 20px rgba(255, 107, 0, 0.3) !important;
        }
        .btn-secondary, .button-secondary {
            background-color: #0d0d0d !important;
            border: 1px solid #ff6b00 !important;
            color: #ffa64d !important;
        }
        .btn-secondary:hover {
            background-color: #1a1a1a !important;
            border-color: #ff8c00 !important;
            color: #ffa64d !important;
        }
        .btn-success { background-color: #ff8c00 !important; border-color: #ff8c00 !important; }
        .btn-danger { background-color: #ff6b00 !important; border-color: #ff6b00 !important; }
        
        a, .link {
            color: #ff8c00 !important;
            text-decoration: none !important;
            transition: color 0.3s ease !important;
        }
        a:hover, .link:hover {
            color: #ffa64d !important;
            text-decoration: underline !important;
        }
        
        .card, .panel, .box, .widget {
            background-color: #1a1a1a !important;
            border: 1px solid #ff6b00 !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 15px rgba(255, 107, 0, 0.1) !important;
            padding: 16px !important;
            margin-bottom: 16px !important;
        }
        .card-header, .panel-header, .widget-header {
            background-color: #0d0d0d !important;
            border-bottom: 1px solid #ff6b00 !important;
            color: #ffa64d !important;
            padding: 12px 16px !important;
            border-radius: 8px 8px 0 0 !important;
            font-weight: 700 !important;
        }
        .card-body, .panel-body, .widget-body {
            background-color: #1a1a1a !important;
            color: #ffa64d !important;
            padding: 16px !important;
        }
        .card-footer, .panel-footer {
            background-color: #0d0d0d !important;
            border-top: 1px solid #ff6b00 !important;
            color: #ffa64d !important;
            padding: 12px 16px !important;
        }
        
        .table {
            background-color: #1a1a1a !important;
            color: #ffa64d !important;
            border-collapse: collapse !important;
            width: 100% !important;
        }
        .table th {
            background-color: #0d0d0d !important;
            color: #ffa64d !important;
            border-bottom: 2px solid #ff6b00 !important;
            padding: 10px 12px !important;
            text-align: left !important;
            font-weight: 700 !important;
        }
        .table td {
            background-color: #1a1a1a !important;
            color: #ffa64d !important;
            border-bottom: 1px solid #ff6b00 !important;
            padding: 10px 12px !important;
        }
        .table tr:hover td {
            background-color: #0d0d0d !important;
        }
        .table-striped tbody tr:nth-of-type(odd) td {
            background-color: #0d0d0d !important;
        }
        
        input, select, textarea, .form-control {
            background-color: #0d0d0d !important;
            color: #ffa64d !important;
            border: 1px solid #ff6b00 !important;
            border-radius: 4px !important;
            padding: 8px 12px !important;
            transition: border-color 0.3s ease !important;
            width: 100% !important;
        }
        input:focus, select:focus, textarea:focus, .form-control:focus {
            border-color: #ff8c00 !important;
            outline: 2px solid rgba(255, 107, 0, 0.3) !important;
            box-shadow: 0 0 10px rgba(255, 107, 0, 0.2) !important;
        }
        label, .form-label {
            color: #ffa64d !important;
            font-weight: 600 !important;
        }
        
        .badge, .tag, .label {
            background-color: #ff6b00 !important;
            color: #1a1a1a !important;
            padding: 4px 10px !important;
            border-radius: 12px !important;
            font-size: 12px !important;
            font-weight: 700 !important;
        }
        .badge-success, .tag-success {
            background-color: #ff8c00 !important;
            color: #0d0d0d !important;
        }
        .badge-danger, .tag-danger {
            background-color: #ff6b00 !important;
            color: #1a1a1a !important;
        }
        .badge-warning, .tag-warning {
            background-color: #ffa64d !important;
            color: #0d0d0d !important;
        }
        
        .alert, .notification, .message {
            background-color: #0d0d0d !important;
            border-left: 4px solid #ff6b00 !important;
            color: #ffa64d !important;
            padding: 12px 16px !important;
            border-radius: 4px !important;
            margin-bottom: 12px !important;
        }
        .alert-success {
            border-left-color: #ff8c00 !important;
        }
        .alert-danger {
            border-left-color: #ff6b00 !important;
        }
        .alert-info {
            border-left-color: #ffa64d !important;
        }
        
        .footer, .foot {
            background-color: #0d0d0d !important;
            border-top: 2px solid #ff6b00 !important;
            color: #ffa64d !important;
            padding: 16px !important;
            text-align: center !important;
        }
        .footer a, .foot a {
            color: #ff8c00 !important;
        }
        .footer a:hover, .foot a:hover {
            color: #ffa64d !important;
        }
        
        ::-webkit-scrollbar {
            width: 10px !important;
            height: 10px !important;
            background-color: #0d0d0d !important;
        }
        ::-webkit-scrollbar-track {
            background-color: #0d0d0d !important;
            border-radius: 4px !important;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #ff6b00 !important;
            border-radius: 4px !important;
            border: 1px solid #ff8c00 !important;
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: #ff8c00 !important;
        }
        
        .dropdown-menu, .dropdown-content {
            background-color: #0d0d0d !important;
            border: 1px solid #ff6b00 !important;
        }
        .dropdown-item {
            color: #ffa64d !important;
        }
        .dropdown-item:hover {
            background-color: #ff6b00 !important;
            color: #1a1a1a !important;
        }
        
        .modal-content {
            background-color: #1a1a1a !important;
            border: 1px solid #ff6b00 !important;
            color: #ffa64d !important;
        }
        .modal-header {
            border-bottom: 1px solid #ff6b00 !important;
            background-color: #0d0d0d !important;
        }
        .modal-footer {
            border-top: 1px solid #ff6b00 !important;
            background-color: #0d0d0d !important;
        }
        
        .progress {
            background-color: #0d0d0d !important;
        }
        .progress-bar {
            background-color: #ff6b00 !important;
        }
        
        .nav-tabs .nav-link {
            color: #ffa64d !important;
            background-color: #0d0d0d !important;
            border: 1px solid #ff6b00 !important;
        }
        .nav-tabs .nav-link.active {
            background-color: #ff6b00 !important;
            color: #1a1a1a !important;
            border-color: #ff6b00 !important;
        }
        .tab-content {
            background-color: #1a1a1a !important;
            color: #ffa64d !important;
            border: 1px solid #ff6b00 !important;
            border-top: none !important;
            padding: 16px !important;
        }
        
        ::selection {
            background-color: #ff6b00 !important;
            color: #1a1a1a !important;
        }
        ::-moz-selection {
            background-color: #ff6b00 !important;
            color: #1a1a1a !important;
        }
    </style></head>`);
    
    if (g[m3(tw.l, 'w(Wr')]) k = k[m3(tw.m, 'rsIZ')](m3(0xea, '[]Y1'), m3(0x8ea, 'NMJQ') + g[m3(0xebc, tw.o)] + m3(tw.p, tw.q));
    const l = new Headers();
    return l[m3(0x1449, tw.r)](m3(tw.s, 'ZgMu'), m3(tw.t, tw.u)), l[m3(0x125d, '9rQu')](m3(tw.v, tw.w), m3(tw.x, '$p[^')), new Response(k, { 'status': g[m3(0x14f9, 'M5Ii')] || j[m3(tw.y, 'ZgMu')], 'headers': l });
}

// ============================================================
// ۲. تابع panelUnavailableHtml - صفحه خطا با تم نارنجی و مشکی
// ============================================================
function panelUnavailableHtml() {
    const tx = { c: 0xe2f, f: 0x158a, g: 'egod', h: 0x11c8, i: 0x7d7, j: 'Pt3!' },
        m4 = fX;
    return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taakaa-Xi - پنل در دسترس نیست</title>
    <style>
        /* ============================================================
           Taakaa-Xi Error Page - Black & Orange Theme
           ============================================================ */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            background-color: #1a1a1a;
            color: #ffa64d;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        
        .error-container {
            max-width: 600px;
            width: 100%;
            background-color: #0d0d0d;
            border: 2px solid #ff6b00;
            border-radius: 12px;
            padding: 40px 30px;
            text-align: center;
            box-shadow: 0 0 40px rgba(255, 107, 0, 0.15);
        }
        
        .error-icon {
            font-size: 72px;
            margin-bottom: 16px;
            color: #ff6b00;
        }
        
        .error-title {
            font-size: 28px;
            font-weight: 700;
            color: #ffa64d;
            margin-bottom: 12px;
        }
        
        .error-subtitle {
            font-size: 16px;
            color: #ffa64d;
            opacity: 0.8;
            margin-bottom: 24px;
            line-height: 1.6;
        }
        
        .error-details {
            background-color: #1a1a1a;
            border: 1px solid #ff6b00;
            border-radius: 8px;
            padding: 16px;
            font-size: 14px;
            color: #ffa64d;
            margin-bottom: 24px;
            word-break: break-word;
        }
        
        .btn {
            display: inline-block;
            background-color: #ff6b00;
            color: #1a1a1a;
            border: none;
            border-radius: 6px;
            padding: 12px 32px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            background-color: #ff8c00;
            color: #0d0d0d;
            box-shadow: 0 0 20px rgba(255, 107, 0, 0.3);
        }
        
        .footer-text {
            margin-top: 20px;
            font-size: 12px;
            color: #ffa64d;
            opacity: 0.5;
        }
        
        .footer-text a {
            color: #ff8c00;
            text-decoration: none;
        }
        
        .footer-text a:hover {
            color: #ffa64d;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-icon">🔧</div>
        <h1 class="error-title">پنل در دسترس نیست</h1>
        <p class="error-subtitle">متأسفیم، پنل مدیریت Taakaa-Xi در حال حاضر در دسترس نمی‌باشد. لطفاً چند لحظه دیگر تلاش کنید.</p>
        <div class="error-details">
            <span>⏳</span> در حال بارگذاری مجدد...
        </div>
        <a href="#" onclick="location.reload(); return false;" class="btn">تلاش مجدد</a>
        <div class="footer-text">
            Taakaa-Xi &bull; Premium Proxy Service
        </div>
    </div>
    <script>
        setTimeout(() => location.reload(), 10000);
    </script>
</body>
</html>`;
}
async function readConfigJson(c, f, g, h = fX(0x151e, 'C2T0'), i = ![]) {
    const sx = { c: 0x2ec, f: 'C2T0', g: 'vel(', h: 'V#kN', i: 'T3Fv', j: 0x5d9, k: 'zs!c', l: 0x1ad2, m: 'V#kN', n: 'zs!c', o: 0x19ec, p: 'GzjL', q: 0x17a7, r: 0x816, s: 0xfd7, t: 'jODS', u: 0x1a7a, v: 0xa49, w: 'egod', x: 0xcca, y: 'PYt$', z: 0x7f0, A: 0xdb4, B: '[]Y1', C: 0x15cd, D: 'd%lH', E: 'ZgMu', F: 0xf5d, G: '0Ua@', H: 0x1155, I: 0x1dc8, J: 'XITC', K: '0Ua@', L: 0xa22, M: 0x554, N: 'wCGK', O: 0x1751, P: 0x1ea0, Q: '7NO9', R: 0x1de7, S: 0x1d3, T: 0x7fb, U: 0x1931, V: '2#Qk', W: 0xec6, X: 0x519, Y: 'M5Ii', Z: 'rsIZ', a0: 0x1670, a1: '[p9(', a2: 0x59a, a3: 0x422, a4: 'Mmsl', a5: 'Mmsl', a6: 0x177b, a7: '9rQu', a8: 'w(Wr', a9: 0x7e0, aa: 'NxG1', ab: 0x17d0, ac: '*lLT', ad: 0x156f, ae: 'b)3q', af: 0x137a, ag: 'GzjL', ah: 'mRB^', ai: 0x8cb, aj: 'w3Tt', ak: 0x1272, al: '#sM9', am: 0xcc0, an: 'NMJQ', ao: 0xe37, ap: 0x19bb, aq: 'CeJW', ar: 'yxI7', as: 0x1b03, at: 0x1cbd, au: '0Ua@', av: 0x7f7, aw: 'PSkb', ax: 0x609, ay: 'Gn7Q', az: '9rQu', aA: '$p[^', aB: 0xb22, aC: 0x1dc3, aD: '*lLT', aE: 0xa5f, aF: 0x8e8, aG: 0x1534, aH: 0x1e9f, aI: 0x1622, aJ: '$BSl', aK: 0xe14, aL: 'PYt$', aM: 'IcEg', aN: 0x1995, aO: '%oj0', aP: 0x296, aQ: '%oj0', aR: 0x11f, aS: 0x942, aT: 'V#kN', aU: 0x1e89, aV: 0x597, aW: 0x1685, aX: 'dbGg', aY: 0x377, aZ: 'w(Wr', b0: 0x1460, b1: 'T3Fv', b2: 0x19b8, b3: 'PSkb', b4: 0x210, b5: 'dbGg', b6: '1qbp', b7: 0x8e2, b8: '*lLT', b9: 0x59e, ba: 'M5Ii', bb: 0x1d10, bc: 0x194e, bd: 0x42d, be: 0xf9a, bf: 'NxG1', bg: 0x1971, bh: 0xbcf, bi: 0xdb5, bj: 0xd9e, bk: 'CeJW', bl: 0x1b42, bm: 0x44e, bn: '5M6D', bo: 0x1700, bp: 0x1b3b, bq: 'dZbH', br: '8Ys%', bs: 0xd7f, bt: 0x1911, bu: 0xcc2, bv: '6UCx', bw: 0x1263, bx: '9rQu', by: 'dn8p', bz: 0xf86, bA: 0x1785, bB: 0x1823, bC: 0x162e, bD: 0x1da2, bE: 0x5f1, bF: '60r9', bG: 0x165e, bH: 0xb11, bI: 'mRB^', bJ: 0x1a74, bK: 'n7E3', bL: 0xc71, bM: '#sM9', bN: 'd%lH', bO: 0x1312, bP: 0x15ff, bQ: 'V#kN', bR: '%oj0', bS: 'w(Wr', bT: 0x12f7, bU: 0xe89, bV: 0xc26, bW: 0x154e, bX: 'egod', bY: 0x612, bZ: 0x158, c0: 0x17ca, c1: 0x1bcd, c2: '0Ua@', c3: 0xdb3, c4: 0x1bd5, c5: '89Hn', c6: 'ZgMu', c7: 0x1108, c8: 'oeP*', c9: 0x19d7, ca: 0xd2d, cb: 'egod', cc: 0x130a, cd: 0x139f, ce: 'ZgMu', cf: 'ZgMu', cg: 0xa84, ch: '%oj0', ci: 0x479, ck: 0x16f6, cl: 'Gn7Q', cm: '1qbp', cn: 'dn8p', co: 0x933, cp: 0x18ad, cq: 0xaf7, cr: 0x13b4, cs: 0x1476, ct: 'yxI7', cu: 0x18f4, cv: '60r9', cw: '1qbp', cx: 0x1919, cy: 'oeP*', cz: 0x1225, cA: 'n7E3', cB: 0x1468, cC: '#sM9', cD: 'NMJQ', cE: 0x24a, cF: '1qbp', cG: 0xce9, cH: 0x8c1, cI: '$p[^', cJ: 0x1e02, cK: 'oeP*', cL: 0x6ce, cM: 'egod', cN: 0x3bb, cO: 0x1ec9, cP: 'w3Tt', cQ: 0x129a, cR: 'dZbH', cS: 'Pt3!', cT: 0x565, cU: 0x1de9, cV: 0x1d0c, cW: 0x1131, cX: 'V#kN', cY: 'yxI7', cZ: 0x1198, d0: 'w3Tt', d1: 0x36c, d2: 'vel(', d3: 'PSkb', d4: 0x1289, d5: 0x179b, d6: 'n7E3', d7: 0xfde, d8: 0x87c, d9: 0x13e5, da: 'M5Ii', db: 0x1d14, dc: 'egod', dd: '7NO9', de: 'w3Tt', df: 0x16d0, dg: 'zs!c', dh: 0x7a5, di: 0x4c4, dj: 'T3Fv', dk: 0x1b28, dl: 0x19d3, dm: 'XITC', dn: 0x10cc, dp: 'w(Wr', dq: '1qbp', dr: 0x1418, ds: 'rsIZ', dt: 0x1732, du: 'w(Wr', dv: 0x1537, dw: 0x791, dx: '1qbp', dy: 0x475, dz: 'V#kN', dA: 0x1097, dB: 'dbGg', dC: 0x176d, dD: 0x16e4, dE: 'CeJW', dF: 0x1b00, dG: 0xa8d, dH: '9rQu', dI: 0x357, dJ: 0x8f0, dK: 0x1256, dL: 0x17eb, dM: 'vel(', dN: 'dbGg' },
        l7 = fX,
        j = atob(l7(sx.c, sx.f)),
        k = f,
        l = l7(0x1dd4, sx.g),
        m = l7(0x1b53, sx.h),
        n = l7(0x806, sx.i),
        o = performance[l7(0xf4d, 'NxG1')](),
        p = { 'TIME': new Date()[l7(sx.j, sx.k)](), 'HOST': k, 'HOSTS': [f], 'UUID': g, 'PATH': '/', 'protocolType': 'v' + 'le' + 'ss', 'transportProtocol': 'ws', 'gRPCmode': l7(sx.l, sx.m), 'gRPCUserAgent': h, 'skipCertVerify': ![], 'enable0RTT': ![], 'tlsFragment': null, 'randomPath': ![], 'ECH': ![], 'ECHConfig': { 'DNS': l, 'SNI': m }, 'SS': { 'cipherMethod': l7(0x1b3b, 'dZbH'), 'TLS': !![] }, 'Fingerprint': l7(0x127f, 'IcEg'), 'optimizedSubGeneration': { 'local': !![], 'localIPPool': { 'randomIP': !![], 'randomCount': 0x10, 'specifiedPorts': -0x1 }, 'SUB': null, 'SUBNAME': l7(0x14aa, sx.n), 'SUBUpdateTime': 0x3, 'TOKEN': await MD5MD5(f + g) }, 'subConverterConfig': { 'SUBAPI': l7(sx.o, sx.p), 'SUBCONFIG': l7(sx.q, sx.f), 'SUBEMOJI': ![] }, 'proxy': { [j]: l7(sx.r, 'PSkb'), 'SOCKS5': { 'enabled': enableSocks5Proxy, 'globalScope': enableSocks5GlobalProxy, 'accountStr': mySocks5Account, 'whitelist': SOCKS5whitelist }, 'pathTemplate': { [j]: l7(sx.s, '$BSl') + n, 'SOCKS5': { 'globalScope': l7(0x22c, sx.t) + n, 'standardScope': l7(0x259, 'yxI7') + n }, 'HTTP': { 'globalScope': l7(sx.u, 'mRB^') + n, 'standardScope': l7(sx.v, 'b)3q') + n }, 'HTTPS': { 'globalScope': l7(0x3cc, '1qbp') + n, 'standardScope': l7(0x1136, '*lLT') + n }, 'TURN': { 'globalScope': l7(0xabc, sx.w) + n, 'standardScope': l7(sx.x, sx.y) + n }, 'SSTP': { 'globalScope': l7(sx.z, 'dbGg') + n, 'standardScope': l7(sx.A, 'rsIZ') + n } } }, 'TG': { 'enabled': ![], 'BotToken': null, 'ChatID': null }, 'CF': { 'Email': null, 'GlobalAPIKey': null, 'AccountID': null, 'APIToken': null, 'UsageAPI': null, 'Usage': { 'success': ![], 'pages': 0x0, 'workers': 0x0, 'total': 0x0, 'max': 0x186a0 } } };
    try {
        let G = await getConfigRaw(c);
        if (!G || i == !![]) await putConfig(c, JSON[l7(0x14c9, 'jODS')](p, null, 0x2)), config_JSON = p;
        else {
            config_JSON = JSON[l7(0x143e, sx.B)](G);
            if (config_JSON[l7(sx.C, sx.D)] !== undefined && config_JSON[l7(0x5c5, sx.E)] === undefined) config_JSON[l7(sx.F, '0Ua@')] = config_JSON[l7(0x163c, sx.G)];
            if (config_JSON[l7(sx.H, 'M5Ii')] || config_JSON[l7(sx.I, '[p9(')] === l7(0x1d85, sx.J) || config_JSON[l7(0xf5d, sx.K)] === l7(0xf58, 'NxG1')) {
                config_JSON[l7(0x12a4, '[]Y1')] = ![];
                if (config_JSON[l7(0x120d, sx.w)] === l7(0x8f4, 'CeJW') || config_JSON[l7(sx.M, 'Pt3!')] === l7(0xc7a, '5M6D') || !config_JSON[l7(0xbf4, sx.N)]) config_JSON[l7(0x1495, '7NO9')] = l7(sx.O, sx.G);
            }
            // ... ادامه در بخش بعدی
        }
    } catch (H) { console[l7(0x1480, sx.b3)](l7(sx.b4, sx.b5) + H[l7(0x3c1, sx.b6)]), config_JSON = p; }
    // ... ادامه در بخش بعدی
}

function identifyCarrier(c) {
    const sy = { c: 'C2T0', f: 0x7de, g: 0x1dff, h: 0xda0, i: '2#Qk', j: 'wCGK', k: 'M5Ii', l: 0x1984, m: 'vel(', n: 'yxI7', o: 0x4cf, p: 'NxG1', q: 'oeP*' },
        l8 = fX,
        f = c?.['cf'],
        g = { '4134': 'ct', '4809': 'ct', '4811': 'ct', '4812': 'ct', '4815': 'ct', '4837': 'cu', '4814': 'cu', '9929': 'cu', '17623': 'cu', '17816': 'cu', '9808': l8(0xfe6, sy.c), '24400': l8(sy.f, '89Hn'), '56040': l8(sy.g, 'dbGg'), '56041': l8(sy.h, sy.i), '56044': l8(0x1864, sy.j) },
        h = [{ 'code': 'ct', 'pattern': /chinanet|chinatelecom|china telecom|cn2|shtel/ }, { 'code': l8(0xea9, sy.k), 'pattern': /cmi|cmnet|chinamobile|china mobile|cmcc|mobile communications/ }, { 'code': 'cu', 'pattern': /china169|china unicom|chinaunicom|cucc|cncgroup|cuii|netcom/ }];
    if (String(f?.[l8(sy.l, sy.m)] || '')[l8(0xf68, sy.n)]() !== 'cn') return 'cf';
    const i = String(f?.[l8(sy.o, 'M5Ii')] || '')[l8(0x154, sy.p)](),
        j = h[l8(0x1813, sy.q)](({ pattern: k }) => k[l8(0x710, 'NMJQ')](i))?.[l8(0x945, '0Ua@')];
    return j || g[String(f?.[l8(0x182d, 'T3Fv')] || '')] || 'cf';
}

async function generateRandomIp(c, f = 0x10, g = -0x1) {
    const sB = { c: 'w3Tt', f: 0x1446, g: 0x67a, h: 0xd90, i: '$BSl', j: '1qbp', k: 0x16b9, l: '%oj0', m: 'IcEg', n: 0xab6, o: 'Pt3!', p: 0x15a2, q: 'yxI7', r: 0x112c, s: 'w(Wr', t: 0xaf3, u: 0x16c8, v: 'CeJW', w: 0x1ada, x: 0x238, y: '[]Y1', z: 'PSkb', A: 0xa7a, B: '[p9(', C: 0x1eef, D: 0xfff, E: 0xfc3, F: 'C2T0', G: 0x1cdf },
        sA = { c: 0x103a, f: 'PYt$', g: 'PSkb', h: 0x193b, i: 'Gn7Q', j: 0x198, k: 'M5Ii', l: 'dZbH', m: 'vel(' },
        sz = { c: 'd%lH', f: 0x678, g: 0xada, h: 'b)3q', i: 'zs!c', j: '89Hn', k: 0xd64, l: 'jODS' },
        l9 = fX,
        h = new URL(c[l9(0x1635, sB.c)]),
        i = String(h[l9(sB.f, '1qbp')][l9(sB.g, 'XITC')](l9(sB.h, sB.i)) || '')[l9(0xc88, sB.j)](),
        j = ['ct', 'cu', l9(0x13fd, '7NO9'), 'cf'][l9(sB.k, sB.l)](i) ? i : identifyCarrier(c),
        k = { 'cmcc': l9(0x1011, sB.m), 'cu': l9(sB.n, sB.o), 'ct': l9(sB.p, sB.q), 'cf': l9(sB.r, sB.s) },
        l = j === 'cf' ? l9(sB.t, 'Gn7Q') : l9(sB.u, sB.v) + j + l9(sB.w, 'IcEg'),
        m = k[j] || l9(sB.x, sB.y),
        n = [0x1bb, 0x805, 0x823, 0x827, 0x830, 0x20fb];
    let o = [];
    {
        const r = _cidrListCache[l9(0x539, 'jODS')](j);
        if (r && Date[l9(0xf47, sB.z)]() - r['at'] < 0x36ee80) o = r[l9(0x173e, 'ZgMu')];
        else {
            try {
                const s = await fetch(l);
                o = s['ok'] ? await sortIntoArray(await s[l9(sB.A, '6UCx')]()) : [l9(0x1e64, sB.B)];
            } catch { o = [l9(sB.C, 'GzjL')]; }
            _cidrListCache[l9(sB.D, 'XITC')](j, { 'at': Date[l9(sB.E, 'wCGK')](), 'list': o });
        }
    }
    const p = t => {
            const la = l9,
                [u, v] = t[la(0x1202, sz.c)]('/'),
                w = parseInt(v),
                x = 0x20 - w,
                y = u[la(0xaef, 'mRB^')]('.')[la(sz.f, '#sM9')]((C, D, E) => C | parseInt(D) << 0x18 - E * 0x8, 0x0),
                z = Math[la(sz.g, sz.h)](Math[la(0x1502, sz.i)]() * Math[la(0x285, sz.j)](0x2, x)),
                A = 0xffffffff << x >>> 0x0,
                B = ((y & A) >>> 0x0) + z >>> 0x0;
            return [B >>> 0x18 & 0xff, B >>> 0x10 & 0xff, B >>> 0x8 & 0xff, B & 0xff][la(sz.k, sz.l)]('.');
        },
        q = Array[l9(0xc58, sB.F)]({ 'length': f }, (t, u) => {
            const lb = l9,
                v = p(o[Math[lb(sA.c, 'V#kN')](Math[lb(0x1d2c, '%oj0')]() * o[lb(0x292, 'IcEg')])]),
                w = g === -0x1 ? n[Math[lb(0x15f4, sA.f)](Math[lb(0xa63, '5M6D')]() * n[lb(0xb28, sA.g)])] : g,
                x = lb(sA.h, sA.i) + Array[lb(sA.j, sA.k)](crypto[lb(0x3da, sA.l)](new Uint8Array(0x6)), y => lb(0x1cec, '$BSl')[y % 0x24])[lb(0x18eb, sA.m)]('');
            return v + ':' + w + '#' + x;
        });
    return [q, q[l9(sB.G, '7NO9')]('\x0a')];
}

async function sortIntoArray(c) {
    const sC = { c: '$p[^', f: 0xc9b, g: 'C2T0', h: 0x17d6, i: 0x793 },
        lc = fX;
    var f = c[lc(0x16f6, 'Gn7Q')](/[	"'\r\n]+/g, ',')[lc(0xb8a, sC.c)](/,+/g, ',');
    if (f[lc(0x343, '%oj0')](0x0) == ',') f = f[lc(0x1c22, 'M5Ii')](0x1);
    if (f[lc(sC.f, sC.g)](f[lc(0x181f, 'dn8p')] - 0x1) == ',') f = f[lc(0x115b, '[p9(')](0x0, f[lc(sC.h, '[p9(')] - 0x1);
    const g = f[lc(sC.i, 'jODS')](',');
    return g;
}

async function getBestSubGeneratorData(c) {
    const sD = { c: '60r9', f: '#sM9', g: 'Pt3!', h: 0x588, i: 'd%lH', j: '%oj0', k: 'NxG1', l: 0x1d57, m: 0xa7c, n: 'Gn7Q', o: '1qbp', p: '2#Qk', q: '0Ua@', r: 0x16b1, s: 0x15bb, t: '8Ys%', u: 0x9d9, v: 'NxG1', w: 0x1f0b, x: 0x11d4, y: 0x1406, z: 'mRB^', A: 0xba8, B: 'Gn7Q', C: 0x1e17, D: 0x1d18, E: 'NMJQ', F: 'M5Ii', G: 0x20c, H: 'mRB^', I: 0x5a7, J: '[p9(', K: 0x120e, L: '#sM9', M: 0x1f0b, N: 'C2T0', O: 0x8ab },
        ld = fX;
    let f = [],
        g = '',
        h = c[ld(0x79f, '0Ua@')](/^sub:\/\//i, ld(0x5f1, sD.c))[ld(0x1567, sD.f)]('#')[0x0][ld(0xae6, sD.g)]('?')[0x0];
    if (!/^https?:\/\//i[ld(sD.h, sD.i)](h)) h = ld(0x1e9b, sD.j) + h;
    try {
        const j = new URL(h);
        h = j[ld(0x837, sD.k)];
    } catch (k) { return f[ld(sD.l, 'dZbH')](ld(sD.m, sD.n) + c + ld(0x132c, sD.o) + k[ld(0x1444, sD.p)]), [f, g]; }
    const i = h + ld(0x1c49, sD.q);
    try {
        const l = await fetch(i, { 'headers': { 'User-Agent': ld(sD.r, 'PYt$') } });
        if (!l['ok']) return f[ld(sD.s, sD.t)](ld(sD.u, sD.v) + c + ld(sD.w, 'C2T0') + l[ld(sD.x, '5M6D')]), [f, g];
        const m = atob(await l[ld(sD.y, sD.z)]()),
            n = m[ld(sD.A, 'dbGg')]('\x0d\x0a') ? m[ld(0xddc, sD.B)]('\x0d\x0a') : m[ld(sD.C, '%oj0')]('\x0a');
        for (const o of n) {
            if (!o[ld(sD.D, sD.E)]()) continue;
            if (o[ld(0x19c5, sD.F)](ld(sD.G, '$p[^')) && o[ld(0xc84, sD.f)](ld(0x1b19, sD.H))) {
                const p = o[ld(sD.I, sD.J)](/:\/\/[^@]+@([^?]+)/);
                if (p) {
                    let q = p[0x1],
                        r = '';
                    const s = o[ld(0x19b, 'd%lH')](/#(.+)$/);
                    if (s) r = '#' + decodeURIComponent(s[0x1]);
                    f[ld(0x1bd9, 'dbGg')](q + r);
                }
            } else g += o + '\x0a';
        }
    } catch (t) { f[ld(sD.K, sD.L)](ld(0xfc5, 'w(Wr') + c + ld(sD.M, sD.N) + t[ld(sD.O, 'C2T0')]); }
    return [f, g];
}

async function requestBestApi(c, f = fX(0x5e3, 'w(Wr'), g = 0xbb8) {
    const sK = { c: 0xd77, f: 'dbGg', g: 0x14de, h: '9rQu', i: 0x61f, j: 0x165c, k: '60r9' },
        sJ = { c: 'IcEg', f: 0x1e49, g: 'rsIZ', h: 0x1e62, i: 'PYt$', j: 0xba8, k: 'dbGg', l: 'Gn7Q', m: 0xd7a, n: '7NO9', o: 0x1e76, p: 'dn8p', q: 0x1896, r: '%oj0', s: 'w(Wr', t: 0x12e6, u: 'GzjL', v: 0x13ab, w: 'jODS', x: '5M6D', y: '$BSl', z: 0x1714, A: '89Hn', B: 0x8ed, C: 0x303, D: '6UCx', E: 0xd06, F: 0x1948, G: 0xd82, H: 0xb7c, I: 0xaf0, J: 0x6c6, K: 'egod', L: '[]Y1', M: 0xab9, N: 'Mmsl', O: 0x1c85, P: '6UCx', Q: 0x96f, R: '[p9(', S: 'Pt3!', T: 0xcb7, U: 0xa33, V: 'C2T0', W: 0x1ca, X: 'T3Fv', Y: 0x1c26, Z: 'ZgMu', a0: 0x1c6d, a1: '$BSl', a2: 0x3f7, a3: 0x14cf, a4: 0x118, a5: 'NxG1', a6: 0x7a4, a7: '%oj0', a8: 0xaef, a9: 'mRB^', aa: 0xbf3, ab: 'CeJW', ac: 'wCGK', ad: 0x805, ae: 0x133c, af: 0x1df, ag: '*lLT', ah: '$p[^', ai: 0x1a7f, aj: 0xb52, ak: '9rQu', al: 0x565, am: 0x16e9, an: 0x134, ao: 0x1b76, ap: 0x3b3, aq: 0x722, ar: 'V#kN', as: 0x973, at: 'dn8p', au: 0x1c9d, av: 0xad1, aw: 'IcEg', ax: 'M5Ii', ay: 0xfd4, az: '#sM9', aA: 0x5e7, aB: 0x25e, aC: 'Pt3!', aD: 0x1934, aE: 'jODS', aF: '[p9(', aG: 'oeP*', aH: 0x342 },
        sG = { c: 0x2f9, f: 'ZgMu', g: 0x25f, h: '7NO9', i: 0x1db9, j: 'dbGg', k: 0x2ca, l: '1qbp', m: '$p[^', n: 0x18ec, o: 'PSkb', p: '7NO9', q: 'V#kN' },
        sF = { c: '60r9' },
        le = fX;
    if (!c?.[le(sK.c, sK.f)]) return [[], [], [], []];
    const h = new Set(),
        i = new Set();
    let j = '',
        k = [];
    await Promise[le(0x147f, '2#Qk')](c[le(sK.g, sK.h)](async m => {
        const sI = { c: 0x1859, f: 0x14de, g: '9rQu', h: '#sM9', i: '2#Qk', j: '$p[^', k: 'zs!c', l: 0x157e, m: 0xa32, n: 'C2T0' },
            sH = { c: 0x201, f: 'M5Ii', g: 0x867, h: 'oeP*', i: 0x622, j: 'V#kN', k: 0xfcc, l: '60r9', m: 0xf02 },
            lf = le,
            n = m[lf(0xad1, sJ.c)]('#'),
            o = n > -0x1 ? m[lf(sJ.f, sJ.g)](0x0, n) : m,
            p = n > -0x1 ? decodeURIComponent(m[lf(sJ.h, 'V#kN')](n + 0x1)) : null,
            q = m[lf(0x5c6, sJ.i)]()[lf(sJ.j, sJ.k)](lf(0xb71, sJ.l));
        if (o[lf(sJ.m, sJ.n)]()[lf(0x1cd, 'C2T0')](lf(0x20d, '60r9'))) {
            try {
                const [r, s] = await getBestSubGeneratorData(o);
                if (p)
                    for (const t of r) {
                        const u = t[lf(sJ.o, sJ.p)]('#') ? t + '\x20[' + p + ']' : t + '#[' + p + ']';
                        h[lf(sJ.q, sJ.r)](u);
                        if (q) i[lf(0xe32, sJ.s)](t[lf(sJ.t, sJ.u)]('#')[0x0]);
                    }
                else
                    for (const v of r) {
                        h[lf(sJ.v, '5M6D')](v);
                        if (q) i[lf(0x412, sJ.w)](v[lf(0xbcd, sJ.x)]('#')[0x0]);
                    }
                if (s && typeof s === lf(0x1143, sJ.y) && p) {
                    const w = s[lf(sJ.z, '1qbp')](/([a-z][a-z0-9+\-.]*:\/\/[^\r\n]*?)(\r?\n|$)/gi, (x, y, z) => {
                        const lg = lf,
                            A = y[lg(0xf52, 'yxI7')]('#') ? '' + y + encodeURIComponent('\x20[' + p + ']') : '' + y + encodeURIComponent('#[' + p + ']');
                        return '' + A + z;
                    });
                    j += w;
                } else s && typeof s === lf(0x445, 'w(Wr') && (j += s);
            } catch (x) {}
            return;
        }
        try {
            const y = new AbortController(),
                z = setTimeout(() => y[lf(0xb96, '8Ys%')](), g),
                A = await fetch(o, { 'signal': y[lf(0x884, sJ.A)] });
            clearTimeout(z);
            let B = '';
            try {
                const I = await A[lf(0x1950, '[]Y1')](),
                    J = (A[lf(0x64b, '8Ys%')][lf(sJ.B, '9rQu')](lf(sJ.C, sJ.D)) || '')[lf(0x156d, sJ.A)](),
                    K = J[lf(0xc09, '5M6D')](/charset=([^\s;]+)/i)?.[0x1]?.[lf(sJ.E, 'n7E3')]() || '';
                let L = [lf(sJ.F, 'NMJQ'), lf(sJ.G, '$p[^')];
                (K[lf(0x805, 'jODS')]('gb') || K[lf(sJ.H, sJ.n)](lf(0x3c6, 'zs!c')) || K[lf(0x565, 'Gn7Q')](lf(sJ.I, sJ.A))) && (L = [lf(sJ.J, sJ.K), lf(0x107b, sJ.L)]);
                let M = ![];
                for (const N of L) {
                    try {
                        const O = new TextDecoder(N)[lf(0x1dd1, 'XITC')](I);
                        if (O && O[lf(sJ.M, '%oj0')] > 0x0 && !O[lf(0x1cf9, sJ.N)]('�')) { B = O, M = !![]; break; } else { if (O && O[lf(sJ.O, sJ.P)] > 0x0) continue; }
                    } catch (P) { continue; }
                }
                !M && (B = await A[lf(sJ.Q, '7NO9')]());
                if (!B || B[lf(0x550, sJ.R)]()[lf(0xa1f, sJ.S)] === 0x0) return;
            } catch (Q) { console[lf(0x1a8e, sJ.x)](lf(sJ.T, 'M5Ii'), Q);
                return; }
            let C = B;
            const D = typeof B === lf(sJ.U, sJ.V) ? B[lf(0x1596, '$BSl')](/\s/g, '') : '';
            if (D[lf(0x1a31, 'b)3q')] > 0x0 && D[lf(0xaae, '#sM9')] % 0x4 === 0x0 && /^[A-Za-z0-9+/]+={0,2}$/[lf(0xac9, 'Mmsl')](D))
                try {
                    const R = new Uint8Array(atob(D)[lf(0x1299, 'zs!c')]('')[lf(sJ.W, sJ.X)](S => S[lf(0x1627, 'XITC')](0x0)));
                    C = new TextDecoder(lf(sJ.Y, sJ.Z))[lf(sJ.a0, sJ.a1)](R);
                } catch {}
            if (C[lf(sJ.a2, 'dn8p')]('#')[0x0][lf(0x16e9, '5M6D')](lf(sJ.a3, 'w3Tt'))) {
                if (p) {
                    const S = C[lf(sJ.a4, sJ.a5)](/([a-z][a-z0-9+\-.]*:\/\/[^\r\n]*?)(\r?\n|$)/gi, (T, U, V) => {
                        const lh = lf,
                            W = U[lh(0x1daa, sF.c)]('#') ? '' + U + encodeURIComponent('\x20[' + p + ']') : '' + U + encodeURIComponent('#[' + p + ']');
                        return '' + W + V;
                    });
                    j += S + '\x0a';
                } else j += C + '\x0a';
                return;
            }
            const E = B[lf(sJ.a6, sJ.a7)]()[lf(sJ.a8, sJ.a9)]('\x0a')[lf(sJ.aa, sJ.ab)](T => T[lf(0xb64, '2#Qk')]())[lf(0x1b78, 'n7E3')](T => T),
                F = E[lf(sJ.ac, 'wCGK')] > 0x1 && E[0x0][lf(sJ.ad, 'jODS')](','),
                G = /^[^\[\]]*:[^\[\]]*:[^\[\]]/,
                H = new URL(o);
            if (!F) E[lf(sJ.ae, 'n7E3')](T => {
                const li = lf,
                    U = T[li(sG.c, sG.f)]('#'),
                    [V, W] = U > -0x1 ? [T[li(sG.g, sG.h)](0x0, U), T[li(sG.i, sG.j)](U)] : [T, ''];
                let X = ![];
                if (V[li(0x1cd, 'C2T0')]('[')) X = /\]:(\d+)$/[li(0x1456, 'vel(')](V);
                else {
                    const a0 = V[li(sG.k, sG.l)](':');
                    X = a0 > -0x1 && /^\d+$/[li(0x35a, 'rsIZ')](V[li(0x49f, sG.m)](a0 + 0x1));
                }
                const Y = H[li(0x833, 'PYt$')][li(0x1d7, '%oj0')](li(0x244, 'V#kN')) || f,
                    Z = X ? T : V + ':' + Y + W;
                if (p) {
                    const a1 = Z[li(sG.n, sG.o)]('#') ? Z + '\x20[' + p + ']' : Z + '#[' + p + ']';
                    h[li(0xd6f, sG.p)](a1);
                } else h[li(0x898, sG.q)](Z);
                if (q) i[li(0xf02, '$p[^')](Z[li(0x102a, '89Hn')]('#')[0x0]);
            });
            else {
                const T = E[0x0][lf(sJ.af, sJ.ag)](',')[lf(0x15e1, 'egod')](V => V[lf(0x109a, '1qbp')]()),
                    U = E[lf(0x19bf, sJ.ah)](0x1);
                if (T[lf(sJ.ai, '2#Qk')](lf(sJ.aj, sJ.ak)) && T[lf(sJ.al, 'Gn7Q')](lf(0x22b, '7NO9')) && T[lf(sJ.am, sJ.x)](lf(0xadb, 'n7E3'))) {
                    const V = T[lf(0x18bb, 'GzjL')](lf(0x4fb, 'NxG1')),
                        W = T[lf(0xc03, '5M6D')](lf(0x1b8, 'Pt3!')),
                        X = T[lf(sJ.an, 'Pt3!')](lf(sJ.ao, 'T3Fv')) > -0x1 ? T[lf(0x1773, '[]Y1')](lf(sJ.ap, '7NO9')) : T[lf(sJ.aq, sJ.ar)](lf(sJ.as, 'PSkb')) > -0x1 ? T[lf(0x188, sJ.i)](lf(0x1b20, 'jODS')) : T[lf(0xe22, sJ.at)](lf(sJ.au, '6UCx')),
                        Y = T[lf(sJ.av, sJ.aw)](lf(0x879, sJ.ax));
                    U[lf(sJ.ay, '2#Qk')](Z => {
                        const lj = lf,
                            a0 = Z[lj(0x3f7, 'dn8p')](',')[lj(sH.c, sH.f)](a3 => a3[lj(0x1d92, 'PSkb')]());
                        if (Y !== -0x1 && a0[Y]?.[lj(sH.g, sH.h)]() !== lj(0x1c58, 'IcEg')) return;
                        const a1 = G[lj(sH.i, sH.j)](a0[V]) ? '[' + a0[V] + ']' : a0[V],
                            a2 = a1 + ':' + a0[W] + '#' + a0[X];
                        if (p) {
                            const a3 = a2 + '\x20[' + p + ']';
                            h[lj(0x1cd5, '[]Y1')](a3);
                        } else h[lj(sH.k, sH.l)](a2);
                        if (q) i[lj(sH.m, '$p[^')](a1 + ':' + a0[W]);
                    });
                } else {
                    if (T[lf(0xb2e, 'mRB^')](Z => Z[lf(0x7c0, 'CeJW')]('IP')) && T[lf(0xa06, sJ.az)](Z => Z[lf(0x7c0, 'CeJW')](lf(0x1d66, '%oj0'))) && T[lf(sJ.aA, 'V#kN')](Z => Z[lf(0xc84, '#sM9')](lf(0xbe6, 'CeJW')))) {
                        const Z = T[lf(sJ.aB, sJ.aC)](a3 => a3[lf(0x19a4, 'egod')]('IP')),
                            a0 = T[lf(sJ.aD, sJ.aE)](a3 => a3[lf(0x267, 'Pt3!')](lf(0xebb, 'd%lH'))),
                            a1 = T[lf(0xa5b, sJ.aF)](a3 => a3[lf(0x1508, 'ZgMu')](lf(0xbe6, 'CeJW'))),
                            a2 = H[lf(0x1f05, sJ.a9)][lf(0x5cd, 'b)3q')](lf(0x1a62, sJ.aG)) || f;
                        U[lf(sJ.aH, 'Mmsl')](a3 => {
                            const lk = lf,
                                a4 = a3[lk(sI.c, 'dbGg')](',')[lk(sI.f, sI.g)](a7 => a7[lk(0x1445, 'CeJW')]()),
                                a5 = G[lk(0x18e2, sI.h)](a4[Z]) ? '[' + a4[Z] + ']' : a4[Z],
                                a6 = a5 + ':' + a2 + lk(0x99d, sI.i) + a4[a0] + lk(0x302, sI.j) + a4[a1] + lk(0x175a, sI.k);
                            if (p) {
                                const a7 = a6 + '\x20[' + p + ']';
                                h[lk(sI.l, 'M5Ii')](a7);
                            } else h[lk(sI.m, 'dZbH')](a6);
                            if (q) i[lk(0x1825, sI.n)](a5 + ':' + a2);
                        });
                    }
                }
            }
        } catch (a3) {}
    }));
    const l = j[le(sK.i, '7NO9')]() ? [...new Set(j[le(0x293, '7NO9')](/\r?\n/)[le(sK.j, 'dn8p')](m => m[le(0x1aa0, '6UCx')]() !== ''))] : [];
    return [Array[le(0x1cce, '%oj0')](h), l, k, Array[le(0x111a, sK.k)](i)];
}

async function fetchProxyParams(c, f, g) {
    const sO = { c: '8Ys%', f: 0x5c6, g: 0xb2d, h: 0x169a, i: 0x11e9, j: 0x10a4, k: 'T3Fv', l: 0x644, m: 0xc3a, n: 0xb98, o: 'NMJQ', p: '5M6D', q: 'T3Fv', r: 'vel(', s: 0x1945, t: 0x117f, u: 0x6fc, v: 0x1cad, w: 'oeP*', x: '$BSl', y: 0x1f1c, z: 'dZbH', A: 'zs!c', B: '7NO9', C: 0x1eb6, D: 'w(Wr', E: 0xf4, F: 'Pt3!', G: 0x182a, H: 0x4c8, I: 0x1654, J: 'rsIZ', K: 0x17dc, L: 'dZbH', M: 'mRB^', N: 0x7b4, O: 0x157d, P: 'Gn7Q', Q: 'b)3q', R: 0x199e, S: 0x18ab, T: '6UCx', U: 'Mmsl', V: 0xa56, W: 0x6d6, X: 'IcEg', Y: 0x681, Z: 0x547, a0: 'C2T0', a1: 0xb26, a2: 'dn8p', a3: 0x1a56, a4: 0x19d5, a5: 'yxI7', a6: 'wCGK', a7: 0x1d4d, a8: 0xf52, a9: 0x901, aa: 'ZgMu', ab: 0x1a7f, ac: '2#Qk', ad: 0x118d, ae: 'zs!c', af: 'Pt3!', ag: 0xcde, ah: 0x5cd, ai: 'b)3q', aj: 0x19b7, ak: 0x9b5, al: '$p[^', am: 0x827, an: '60r9', ao: 0x66c, ap: '89Hn', aq: 'Mmsl', ar: '8Ys%', as: 'CeJW', at: '1qbp', au: 0x11b5, av: 'NMJQ', aw: 'PSkb', ax: '*lLT', ay: 0x1be8, az: 'NxG1', aA: 0x71b },
        sN = { c: 'GzjL', f: 0x955, g: 0x19a9, h: '%oj0', i: 0x1793 },
        sL = { c: 0x16d1, f: '$p[^', g: 'dn8p' },
        ll = fX;
    resolveConnUser(c), connProxyWhitelist = [];
    const { searchParams: h } = c,
        i = decodeURIComponent(c[ll(0x1a16, sO.c)]),
        j = i[ll(sO.f, 'PYt$')](),
        k = i[ll(0x1179, 'vel(')](/\/video\/(.+)$/i);
    if (k)
        try {
            const p = base64SecretDecode(k[0x1], f), { type: q, ...r } = JSON[ll(sO.g, '#sM9')](p);
            if (!q || !proxyProtocolDefaultPort[String(q)[ll(sO.h, 'Mmsl')]()]) throw new Error(ll(sO.i, 'oeP*'));
            if (!r[ll(0x1319, 'vel(')] || !r[ll(sO.j, sO.k)]) throw new Error(ll(sO.l, 'n7E3'));
            mySocks5Account = '', proxyIP = ll(sO.m, '60r9'), enableProxyFallback = ![], enableSocks5GlobalProxy = !![], enableSocks5Proxy = String(q)[ll(0x19c3, 'PSkb')](), parsedSocks5Address = { 'username': r[ll(sO.n, sO.o)], 'password': r[ll(0x4d0, sO.p)], 'hostname': r[ll(0xe57, sO.o)], 'port': Number(r[ll(0x10a4, sO.q)]) };
            if (isNaN(parsedSocks5Address[ll(0xb51, sO.r)])) throw new Error(ll(sO.s, '[]Y1'));
            return;
        } catch (s) { console[ll(sO.t, 'w3Tt')](ll(sO.u, '0Ua@'), s[ll(sO.v, sO.w)]); }
    mySocks5Account = h[ll(0x522, sO.x)](ll(sO.y, sO.z)) || h[ll(0x569, 'wCGK')](ll(0x118d, sO.A)) || h[ll(0x4c8, sO.B)](ll(sO.C, sO.D)) || h[ll(sO.E, sO.F)](ll(sO.G, '89Hn')) || h[ll(sO.H, '7NO9')](ll(sO.I, sO.J)) || null, enableSocks5GlobalProxy = h[ll(0x937, '89Hn')](ll(sO.K, sO.L));
    if (h[ll(0x968, sO.M)](ll(0xf96, 'IcEg'))) enableSocks5Proxy = ll(sO.N, sO.o);
    else {
        if (h[ll(0x511, 'Gn7Q')](ll(sO.O, sO.P))) enableSocks5Proxy = ll(0xffd, sO.Q);
        else {
            if (h[ll(0x99f, 'dbGg')](ll(sO.R, 'Gn7Q'))) enableSocks5Proxy = ll(0x2d3, 'T3Fv');
            else {
                if (h[ll(0xf92, '8Ys%')](ll(0x1961, 'w3Tt'))) enableSocks5Proxy = ll(0x125a, 'Gn7Q');
                else {
                    if (h[ll(sO.S, sO.T)](ll(0x523, sO.U))) enableSocks5Proxy = ll(sO.V, 'yxI7');
                }
            }
        }
    }
    const l = (t, u = !![]) => {
            const lm = ll,
                v = /^(socks5|http|https|turn|sstp):\/\/(.+)$/i[lm(sL.c, sL.f)](t || '');
            if (!v) return ![];
            enableSocks5Proxy = v[0x1][lm(0xefa, sL.g)](), mySocks5Account = v[0x2][lm(0x5f7, 'T3Fv')]('/')[0x0];
            if (u) enableSocks5GlobalProxy = !![];
            return !![];
        },
        m = t => { proxyIP = t, enableSocks5Proxy = null, enableProxyFallback = ![]; },
        n = t => {
            const ln = ll;
            if (!t[ln(0x1c01, sN.c)](ln(0xdb0, 'Pt3!'))) {
                const w = t[ln(sN.f, '#sM9')]('/');
                return w > 0x0 ? t[ln(0x55f, '1qbp')](0x0, w) : t;
            }
            const u = t[ln(sN.g, 'NxG1')](ln(0xd68, sN.h));
            if (u[ln(0x1913, 'egod')] !== 0x2) return t;
            const v = u[0x1][ln(sN.i, 'PSkb')]('/');
            return v > 0x0 ? u[0x0] + ln(0xa96, 'yxI7') + u[0x1][ln(0x1a5c, 'n7E3')](0x0, v) : t;
        },
        o = h[ll(0x8c0, '#sM9')](ll(sO.W, sO.X));
    if (o !== null) { if (!l(o)) return m(o); } else {
        let t = /\/(socks5?|http|https|turn|sstp):\/?\/?([^/?#\s]+)/i[ll(0x923, sO.r)](i);
        if (t) {
            const u = t[0x1][ll(0x190, 'IcEg')]();
            enableSocks5Proxy = u === ll(sO.Y, '60r9') || u === ll(sO.Z, sO.a0) ? ll(0x31c, '%oj0') : u, mySocks5Account = t[0x2][ll(sO.a1, 'C2T0')]('/')[0x0], enableSocks5GlobalProxy = !![];
        } else {
            if (t = /\/(g?s5|socks5|g?http|g?https|g?turn|g?sstp)=([^/?#\s]+)/i[ll(0x749, sO.a2)](i)) {
                const v = t[0x1][ll(sO.a3, sO.r)]();
                mySocks5Account = t[0x2][ll(0x3f7, sO.a2)]('/')[0x0], enableSocks5Proxy = v[ll(sO.a4, '6UCx')](ll(sO.V, sO.a5)) ? ll(0x14a4, 'NxG1') : v[ll(0x895, sO.a6)](ll(0x1403, 'zs!c')) ? ll(sO.a7, sO.p) : v[ll(sO.a8, 'yxI7')](ll(sO.a9, sO.aa)) ? ll(0x789, 'Pt3!') : v[ll(sO.ab, sO.ac)](ll(sO.ad, sO.ae)) ? ll(0x28f, '1qbp') : ll(0x11e2, sO.af);
                if (v[ll(0xd5a, 'M5Ii')]('g')) enableSocks5GlobalProxy = !![];
            } else {
                if (t = /\/(proxyip[.=]|pyip=|ip=)([^?#\s]+)/[ll(sO.ag, 'NxG1')](j)) {
                    const w = n(t[0x2]);
                    if (!l(w)) return m(w);
                }
            }
        }
    }
    if (!mySocks5Account) { enableSocks5Proxy = null;
        return; }
    try {
        parsedSocks5Address = await getSocks5Account(mySocks5Account, getProxyDefaultPort(enableSocks5Proxy));
        if (h[ll(0xd31, '5M6D')](ll(0x51e, '[]Y1'))) enableSocks5Proxy = ll(0xd9b, 'oeP*');
        else {
            if (h[ll(0xf92, '8Ys%')](ll(0xacf, 'rsIZ'))) enableSocks5Proxy = ll(0x1b3, 'dn8p');
            else {
                if (h[ll(sO.ah, sO.ai)](ll(sO.aj, 'zs!c'))) enableSocks5Proxy = ll(sO.ak, sO.al);
                else {
                    if (h[ll(sO.am, sO.an)](ll(sO.ao, '[]Y1'))) enableSocks5Proxy = ll(0x182a, sO.ap);
                    else {
                        if (h[ll(0x420, sO.aq)](ll(0x37a, sO.ar))) enableSocks5Proxy = ll(0x1d03, sO.as);
                        else enableSocks5Proxy = enableSocks5Proxy || ll(0xf75, '9rQu');
                    }
                }
            }
        }
    } catch (x) { console[ll(0xbd6, '%oj0')](ll(0x1c3b, sO.at), x[ll(sO.au, sO.av)]), enableSocks5Proxy = null; }
    if (enableSocks5Proxy && !enableSocks5GlobalProxy && g)
        try {
            const y = await getConfigRaw(g),
                z = y ? JSON[ll(0x12ba, sO.aw)](y)?.[ll(0x1eb7, 'CeJW')]?.[ll(0x1041, sO.ax)]?.[ll(0x1c63, 'egod')] : null;
            if (Array[ll(sO.ay, sO.az)](z)) connProxyWhitelist = z[ll(0xe77, 'V#kN')](A => String(A)[ll(0x1331, 'egod')]())[ll(sO.aA, 'GzjL')](Boolean);
        } catch (A) {}
}

const proxyProtocolDefaultPort = { 'socks5': 0x438, 'http': 0x50, 'https': 0x1bb, 'turn': 0xd96, 'sstp': 0x1bb };

function getProxyDefaultPort(c) {
    const sP = { c: 0x10bb, f: '$p[^' },
        lo = fX;
    return proxyProtocolDefaultPort[String(c || '')[lo(sP.c, sP.f)]()] || 0x50;
}

const SOCKS5accountBase64Regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i,
    IPv6bracketRegex = /^\[.*\]$/;

function getSocks5Account(c, f = 0x50) {
    const sQ = { c: 0x1bdd, f: 'b)3q', g: '#sM9', h: 'dn8p', i: 'XITC', j: 0x29d, k: 'Mmsl', l: 0x11a8, m: '8Ys%', n: 0x14ec, o: 0x7dd, p: 'zs!c', q: 0x1d11, r: '60r9', s: '9rQu', t: 0x1794, u: 'oeP*', v: 0x1888, w: 'w(Wr', x: 0x136c, y: 0x1596, z: '$BSl', A: 0x188c, B: '[p9(', C: 'PSkb', D: 0x1e7a, E: 'wCGK', F: 0x659, G: 0x19be, H: 'Pt3!', I: 0xf52 },
        lp = fX;
    c = String(c || '')[lp(sQ.c, sQ.f)]()[lp(0x1bc1, sQ.g)](/^(socks5|http|https|turn|sstp):\/\//i, '')[lp(0x102a, '89Hn')]('#')[0x0][lp(0xdb7, sQ.h)]();
    const g = c[lp(0x4e6, 'n7E3')]('@');
    if (g !== -0x1) {
        let o = c[lp(0x5ba, sQ.i)](0x0, g)[lp(0x1e04, '89Hn')](lp(sQ.j, sQ.k), '=');
        if (!o[lp(sQ.l, 'n7E3')](':') && SOCKS5accountBase64Regex[lp(0xf3d, sQ.m)](o)) o = atob(o);
        c = o + '@' + c[lp(sQ.n, 'GzjL')](g + 0x1);
    }
    const h = c[lp(sQ.o, sQ.p)]('@'),
        i = (h === -0x1 ? c : c[lp(sQ.q, sQ.r)](h + 0x1))[lp(0x230, sQ.s)]('/')[0x0],
        j = h === -0x1 ? '' : c[lp(sQ.t, sQ.u)](0x0, h),
        [k, l] = j ? j[lp(0x102a, '89Hn')](':') : [];
    if (j && !l) throw new Error(lp(sQ.v, 'GzjL'));
    let m = i,
        n = f;
    if (i[lp(0x1346, sQ.w)](']:')) {
        const [p, q = ''] = i[lp(sQ.x, 'M5Ii')](']:');
        m = p + ']', n = Number(q[lp(sQ.y, sQ.z)](/[^\d]/g, ''));
    } else {
        if (!i[lp(sQ.A, sQ.B)]('[')) {
            const r = i[lp(0x12d0, sQ.C)](':');
            r[lp(sQ.D, sQ.E)] === 0x2 && (m = r[0x0], n = Number(r[0x1][lp(sQ.F, 'wCGK')](/[^\d]/g, '')));
        }
    }
    if (isNaN(n)) throw new Error(lp(sQ.G, sQ.H));
    if (m[lp(sQ.I, 'yxI7')](':') && !IPv6bracketRegex[lp(0x145, 'zs!c')](m)) throw new Error(lp(0x1d6, 'oeP*'));
    return { 'username': k, 'password': l, 'hostname': m, 'port': n };
                                                                                                                                                                                                                                                                                                                                                                                 }

