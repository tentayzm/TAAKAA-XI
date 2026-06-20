```md
<p align="center">
  <img src="https://img.shields.io/badge/TAAKAA--XI-FF6B6B?style=for-the-badge&logo=cloudflare&logoColor=white" alt="TAAKAA-XI"/>
  <img src="https://img.shields.io/badge/نسخه-1.0.0-00FF88?style=for-the-badge" alt="Version"/>
  <img src="https://img.shields.io/badge/وضعیت-پایدار-0088CC?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/متن_باز-Open_Source-FFA500?style=for-the-badge&logo=github&logoColor=white" alt="Open Source"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Cloudflare_Worker-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Worker"/>
  <img src="https://img.shields.io/badge/D1-000000?style=for-the-badge&logo=cloudflare&logoColor=white" alt="D1"/>
  <img src="https://img.shields.io/badge/KV-000000?style=for-the-badge&logo=cloudflare&logoColor=white" alt="KV"/>
</p>

---

<div align="center">
  <h1>🖐🏻🤓🖐🏻 TAAKAA-XI</h1>
  <h3>نسل جدید پنل‌های مدیریت کانفیگ با تمرکز بر کاربر ایرانی</h3>
  <p>
    <b>پروژه‌ای توسعه‌یافته توسط تیم تاکا</b>
  </p>
</div>

---

## 📌 معرفی پروژه

**TAAKAA-XI** یک پنل مدیریت کانفیگ مدرن و حرفه‌ای است که به‌طور ویژه برای کاربران ایرانی طراحی شده است. این پنل با استفاده از **Cloudflare Worker**، **KV** و **D1** ساخته شده و امکان تولید کانفیگ‌های VLESS، Trojan و VMess را با محدودیت حجم و زمان فراهم می‌کند.

**ویژگی منحصربه‌فرد این پنل، بخش «مشاوره آفلاین» است که بر اساس اپراتور کاربر، بهترین تنظیمات را پیشنهاد می‌دهد.**

---

## ✨ قابلیت‌های کلیدی

| قابلیت | توضیح |
|--------|-------|
| 🎯 **مشاوره آفلاین** | پیشنهاد بهترین تنظیمات بر اساس اپراتور (همراه اول، ایرانسل، رایتل و...) |
| 🌍 **پرچم‌های منطقه‌ای** | نمایش کشور و پرچم روی هر کانفیگ |
| 🔐 **پنل امن** | ورود با رمز عبور و احراز هویت کامل |
| 📊 **مدیریت کاربران** | محدودیت حجم (۲۵۰۰ درخواست در هر گیگابایت) و محدودیت زمان |
| ⚡ **پروتکل‌های پیشرفته** | VLESS, Trojan, VMess |
| 🛡️ **تکنیک‌های عبور** | Fragment, ECH, WARP, WARP Pro |
| 💾 **ذخیره‌سازی دوگانه** | KV + D1 برای امنیت و پایداری بیشتر |
| 🎨 **رابط کاربری مدرن** | طراحی شیشه‌ای، ریسپانسیو و کاملاً فارسی |

---

## 🛡️ تکنیک‌های عبور از فیلترینگ

| تکنیک | توضیح |
|-------|-------|
| **Fragment** | تکه‌تکه کردن ترافیک برای دور زدن DPI |
| **ECH** | Encrypted Client Hello - مخفی‌سازی کامل SNI |
| **WARP** | مسیریابی ترافیک UDP (تماس‌های صوتی و تصویری) |
| **WARP Pro** | نسخه‌ی حرفه‌ای و پایدارتر WARP |

---

## 📦 پروتکل‌های پشتیبانی‌شده

| پروتکل | وضعیت |
|--------|--------|
| **VLESS** | ✅ پشتیبانی کامل |
| **Trojan** | ✅ پشتیبانی کامل |
| **VMess** | ✅ پشتیبانی کامل |
| **Shadowsocks** | 🔜 در حال توسعه |

---

## 💎 قیمت‌گذاری

| مرحله | قیمت |
|-------|------|
| **نسخه‌ی دمو (فعلی)** | 🆓 کاملاً رایگان |
| **نسخه‌ی نهایی** | 💰 بسیار پایین‌تر از رقبا |

---

## 🎯 TAAKAA-XI مناسب چه کسانی است؟

- ✅ فروشندگان کانفیگ
- ✅ ادمین‌های گروه‌های تلگرام
- ✅ کاربرانی که به دنبال یک پنل ساده و حرفه‌ای هستند
- ✅ افرادی که از پنل‌های پیچیده و شلوغ خسته شده‌اند

---

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها

- یک حساب Cloudflare
- Node.js و Wrangler CLI (برای دیپلوی دستی)

### مراحل نصب

#### ۱. کلون کردن پروژه

```bash
git clone https://github.com/tentayzm/TAAKAA-XI.git
cd TAAKAA-XI
```

۲. تنظیم متغیرهای محیطی

یک فایل .env در ریشه پروژه بسازید:

```env
UUID=90cd4a77-141a-43c9-991b-08263cfe9c10
TR_PASS=TaakaaSecure2026
PROXYIP=cdn.taakaa.ir
ADMIN_PASS=Tentacion@2026
DEFAULT_EXPIRY_DAYS=30
DEFAULT_TRAFFIC_LIMIT=10
RATE_PER_GB=2500
ENABLE_VLESS=true
ENABLE_TROJAN=true
ENABLE_VMESS=true
ENABLE_FRAGMENT=true
ENABLE_ECH=true
ENABLE_WARP=true
```

۳. دیپلوی روی Cloudflare

```bash
# نصب Wrangler
npm install -g wrangler

# ورود به Cloudflare
wrangler login

# ایجاد KV Namespace
wrangler kv:namespace create "KV"

# ایجاد D1 Database
wrangler d1 create taakaa-xi-db

# دیپلوی
wrangler deploy
```

---

🔧 متغیرهای محیطی

نام متغیر توضیح مقدار پیش‌فرض
UUID UUID برای VLESS 90cd4a77-141a-43c9-991b-08263cfe9c10
TR_PASS رمز Trojan TaakaaSecure2026
PROXYIP آی‌پی یا دامنه پروکسی cdn.taakaa.ir
ADMIN_PASS رمز ورود به پنل Tentacion@2026
DEFAULT_EXPIRY_DAYS مدت اعتبار پیش‌فرض (روز) 30
DEFAULT_TRAFFIC_LIMIT حجم پیش‌فرض (گیگابایت) 10
RATE_PER_GB تعداد درخواست به ازای هر گیگابایت 2500

---

📂 ساختار پروژه

```
📁 TAAKAA-XI/
├── worker.js          ← کد اصلی Cloudflare Worker
├── wrangler.toml      ← تنظیمات Wrangler
├── package.json       ← وابستگی‌ها
└── README.md          ← این فایل
```

---

🗄️ دیتابیس D1

برای راه‌اندازی دیتابیس، کوئری زیر را در کنسول D1 اجرا کنید:

```sql
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    uuid TEXT NOT NULL,
    expiry_date TEXT NOT NULL,
    traffic_limit INTEGER NOT NULL,
    traffic_used INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS usage_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    bytes INTEGER NOT NULL,
    requests INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

📱 نحوه استفاده از پنل

ورود به پنل

آدرس پنل: YOUR_WORKER.workers.dev/TaaKaa

رمز پیش‌فرض: Tentacion@2026

ساخت کانفیگ

۱. وارد پنل شوید
۲. در بخش «ساخت کانفیگ جدید»:

· آیدی عددی کاربر را وارد کنید
· منطقه (پرچم) را انتخاب کنید
· مدت اعتبار را مشخص کنید
· محدودیت حجم را تعیین کنید
  ۳. روی «ساخت کانفیگ» کلیک کنید
  ۴. لینک‌های کانفیگ تولید و نمایش داده می‌شوند

مشاوره آفلاین

۱. در بخش «مشاوره آفلاین»
۲. اپراتور خود را انتخاب کنید
۳. بهترین تنظیمات پیشنهاد داده می‌شود

---

⚠️ نکات مهم

· این پنل فقط برای فروش طراحی شده و دسترسی همگانی ندارد
· برای استفاده از تکنیک‌های عبور، نیاز به دامنه شخصی روی Cloudflare دارید
· دامنه‌های *.workers.dev در ایران فیلتر هستند، حتماً از دامنه شخصی استفاده کنید

---

🏆 مقایسه با رقبا

ویژگی TAAKAA-XI BPB Panel Nova-Proxy
مشاوره آفلاین ✅ ❌ ❌
پرچم منطقه‌ای ✅ ❌ ❌
پنل کاملاً فارسی ✅ ❌ ❌
مدیریت کاربران ✅ ✅ ✅
Fragment/ECH ✅ ✅ ✅
سادگی ✅ 🟡 🟡

---

🌐 ارتباط با ما

راه ارتباطی لینک
کانال رسمی تیم تاکا @TaakaaOrg
توسعه‌دهنده @llxisagi
پشتیبانی @tcsrqil
پشتیبانی @ronaakoa
گیت‌هاب tentayzm/TAAKAA-XI

---

👥 تیم توسعه

· 🤓☝🏻 @llxisagi - توسعه‌دهنده اصلی
· 🖐🏻🤓🖐🏻 @tcsrqil - توسعه‌دهنده و پشتیبانی
· ⚕️ @ronaakoa - پشتیبانی و تست

---

📜 مجوز

این پروژه تحت مجوز MIT منتشر شده است.

---

<p align="center">
  <b>✨ توسعه‌یافته توسط تیم تاکا ✨</b><br>
  <i>«سادگی، قدرت، امنیت»</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TAAKAA--XI-2026-FF6B6B?style=for-the-badge" alt="TAAKAA-XI 2026"/>
</p>
```

