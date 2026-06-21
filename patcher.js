// ============================================
// patcher.js - موتور شخصی‌سازی کامل TaaKaa-XI
// ============================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ===== ۱. تغییرات صفحه اصلی =====
    if (path === '/' || path === '') {
      const response = await fetch('https://raw.githubusercontent.com/tentayzm/TAAKAA-XI/main/worker.js');
      let html = await response.text();
      
      // جایگزینی اسم‌ها و رنگ‌ها
      html = html
        .replace(/Nova-Proxy/g, 'TaaKaa-XI')
        .replace(/Nova/g, 'TaaKaa')
        .replace(/novaproxy/g, 'taakaaxi')
        .replace(/#00C853/g, '#FF6B00')
        .replace(/#4CAF50/g, '#FF6B00')
        .replace(/#2196F3/g, '#FF8C00')
        .replace(/v1\.0\.0/g, 'v2.0.0')
        .replace(/Nova-Sub/g, 'TaaKaa-XI-Sub')
        .replace(/This service is not free/g, 'This service is not free - TaaKaa XI');
      
      // اضافه کردن استایل‌های جدید
      const style = `
      <style>
        :root {
          --primary: #FF6B00;
          --secondary: #1A1A1A;
          --accent: #FF8C00;
          --bg: #0D0D0D;
          --text: #FFFFFF;
        }
        .taakaa-menu {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 12px;
          justify-content: center;
          background: var(--secondary);
          border-radius: 12px;
          margin: 12px 0;
        }
        .taakaa-menu a {
          background: var(--bg);
          color: var(--text);
          padding: 8px 16px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s;
          border: 1px solid transparent;
        }
        .taakaa-menu a:hover {
          background: var(--primary);
          color: var(--bg);
          transform: scale(1.05);
          border-color: var(--primary);
        }
        .taakaa-flags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          justify-content: center;
          padding: 8px;
          background: var(--secondary);
          border-radius: 12px;
          margin: 8px 0;
        }
        .taakaa-flags .flag {
          font-size: 1.8rem;
          transition: all 0.3s;
          cursor: default;
          padding: 2px 4px;
          border-radius: 4px;
        }
        .taakaa-flags .flag:hover {
          transform: scale(1.2);
          background: var(--primary);
        }
        .taakaa-badge {
          background: var(--primary);
          color: var(--bg);
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.8rem;
        }
      </style>
      `;
      
      // اضافه کردن منو و پرچم‌ها
      const menu = `
      <div class="taakaa-menu">
        <a href="/">🏠 خانه</a>
        <a href="/location/ir">🇮🇷 ایران</a>
        <a href="/location/us">🇺🇸 آمریکا</a>
        <a href="/location/de">🇩🇪 آلمان</a>
        <a href="/location/nl">🇳🇱 هلند</a>
        <a href="/location/jp">🇯🇵 ژاپن</a>
        <a href="/location/sg">🇸🇬 سنگاپور</a>
        <a href="/owners">👑 Owners</a>
        <a href="/fragment-info">🧩 Fragment</a>
        <a href="/offline-support">📞 پشتیبانی</a>
      </div>
      <div class="taakaa-flags">
        <span class="flag" title="ایران">🇮🇷</span>
        <span class="flag" title="آمریکا">🇺🇸</span>
        <span class="flag" title="آلمان">🇩🇪</span>
        <span class="flag" title="هلند">🇳🇱</span>
        <span class="flag" title="ژاپن">🇯🇵</span>
        <span class="flag" title="سنگاپور">🇸🇬</span>
        <span class="flag" title="انگلیس">🇬🇧</span>
        <span class="flag" title="فرانسه">🇫🇷</span>
        <span class="flag" title="کانادا">🇨🇦</span>
        <span class="flag" title="استرالیا">🇦🇺</span>
        <span class="flag" title="برزیل">🇧🇷</span>
        <span class="flag" title="هند">🇮🇳</span>
        <span class="flag" title="کره جنوبی">🇰🇷</span>
        <span class="flag" title="روسیه">🇷🇺</span>
        <span class="flag" title="چین">🇨🇳</span>
        <span class="flag" title="ایتالیا">🇮🇹</span>
        <span class="flag" title="اسپانیا">🇪🇸</span>
        <span class="flag" title="سوئد">🇸🇪</span>
        <span class="flag" title="نروژ">🇳🇴</span>
        <span class="flag" title="دانمارک">🇩🇰</span>
        <span class="flag" title="فنلاند">🇫🇮</span>
        <span class="flag" title="لهستان">🇵🇱</span>
        <span class="flag" title="ترکیه">🇹🇷</span>
        <span class="flag" title="امارات">🇦🇪</span>
      </div>
      `;
      
      // جایگذاری در صفحه
      html = html.replace('</body>', style + menu + '</body>');
      
      return new Response(html, {
        headers: { 
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
    }

    // ===== ۲. صفحه Owners =====
    if (path === '/owners') {
      return new Response(ownersPage(), {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // ===== ۳. صفحه Fragment Info =====
    if (path === '/fragment-info') {
      return new Response(fragmentPage(), {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // ===== ۴. صفحه Offline Support =====
    if (path === '/offline-support') {
      return new Response(offlinePage(), {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // ===== ۵. صفحه انتخاب لوکیشن =====
    if (path.startsWith('/location/')) {
      const country = path.split('/')[2];
      return new Response(locationPage(country), {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    return new Response('404 Not Found - TaaKaa-XI', { status: 404 });
  }
};

// ===== توابع صفحات =====

function ownersPage() {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>👑 Owners - TaaKaa-XI</title>
    <style>
      :root { --primary: #FF6B00; --secondary: #1A1A1A; --text: #FFFFFF; --bg: #0D0D0D; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        background: var(--bg);
        color: var(--text);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
      }
      .card {
        background: var(--secondary);
        padding: 2.5rem;
        border-radius: 16px;
        border-left: 5px solid var(--primary);
        max-width: 400px;
        width: 100%;
        box-shadow: 0 8px 32px rgba(255, 107, 0, 0.15);
      }
      h1 { color: var(--primary); font-size: 2rem; margin-bottom: 0.5rem; }
      .sub { color: #888; font-size: 0.9rem; margin-bottom: 1.5rem; }
      .btn {
        display: block;
        background: var(--primary);
        color: var(--bg);
        padding: 0.8rem 1.2rem;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 600;
        margin: 0.5rem 0;
        text-align: center;
        transition: all 0.3s;
      }
      .btn:hover { transform: translateX(-5px); box-shadow: 0 4px 20px rgba(255, 107, 0, 0.3); }
      .btn-outline {
        background: transparent;
        border: 1px solid var(--primary);
        color: var(--text);
      }
      .btn-outline:hover { background: var(--primary); color: var(--bg); }
      .back { color: var(--primary); text-decoration: none; display: inline-block; margin-top: 1.5rem; }
      .back:hover { text-decoration: underline; }
      .footer { margin-top: 2rem; text-align: center; color: #555; font-size: 0.75rem; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>👑 Owners</h1>
      <div class="sub">مدیران و پشتیبانان TaaKaa-XI</div>
      <a href="https://t.me/taakaa_support" class="btn">📱 پشتیبانی تلگرام</a>
      <a href="https://t.me/taakaa_owner" class="btn">👤 اکانت مدیر</a>
      <a href="mailto:support@taakaa.xyz" class="btn btn-outline">📧 ایمیل پشتیبانی</a>
      <a href="/" class="back">← بازگشت به صفحه اصلی</a>
      <div class="footer">TaaKaa-XI v2.0.0</div>
    </div>
  </body>
  </html>
  `;
}

function fragmentPage() {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🧩 Fragment Info - TaaKaa-XI</title>
    <style>
      :root { --primary: #FF6B00; --secondary: #1A1A1A; --text: #FFFFFF; --bg: #0D0D0D; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        background: var(--bg);
        color: var(--text);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
      }
      .card {
        background: var(--secondary);
        padding: 2.5rem;
        border-radius: 16px;
        border-left: 5px solid var(--primary);
        max-width: 450px;
        width: 100%;
        box-shadow: 0 8px 32px rgba(255, 107, 0, 0.15);
      }
      h1 { color: var(--primary); font-size: 2rem; margin-bottom: 0.5rem; }
      .sub { color: #888; font-size: 0.9rem; margin-bottom: 1.5rem; }
      .feature {
        background: rgba(255, 107, 0, 0.08);
        padding: 0.8rem 1rem;
        border-radius: 8px;
        margin: 0.5rem 0;
        border-left: 3px solid var(--primary);
      }
      .feature .title { font-weight: 600; }
      .feature .desc { color: #888; font-size: 0.85rem; }
      .back { color: var(--primary); text-decoration: none; display: inline-block; margin-top: 1.5rem; }
      .back:hover { text-decoration: underline; }
      .footer { margin-top: 2rem; text-align: center; color: #555; font-size: 0.75rem; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>🧩 تکنیک Fragment</h1>
      <div class="sub">تکه‌تکه‌سازی بسته‌های TLS برای عبور از فیلترینگ</div>
      <div class="feature">
        <div class="title">✅ کاهش تشخیص الگو</div>
        <div class="desc">بسته‌ها به قطعات کوچک تقسیم می‌شوند</div>
      </div>
      <div class="feature">
        <div class="title">🛡️ دور زدن DPI</div>
        <div class="desc">تشخیص Deep Packet Inspection را دشوار می‌کند</div>
      </div>
      <div class="feature">
        <div class="title">⚡ افزایش پایداری</div>
        <div class="desc">اتصال پایدارتر در شبکه‌های محدودکننده</div>
      </div>
      <div class="feature">
        <div class="title">🔧 تنظیمات پیشرفته</div>
        <div class="desc">امکان تنظیم اندازه و تعداد قطعات</div>
      </div>
      <a href="/" class="back">← بازگشت به صفحه اصلی</a>
      <div class="footer">TaaKaa-XI v2.0.0</div>
    </div>
  </body>
  </html>
  `;
}

function offlinePage() {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📞 پشتیبانی آفلاین - TaaKaa-XI</title>
    <style>
      :root { --primary: #FF6B00; --secondary: #1A1A1A; --text: #FFFFFF; --bg: #0D0D0D; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        background: var(--bg);
        color: var(--text);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
      }
      .card {
        background: var(--secondary);
        padding: 2.5rem;
        border-radius: 16px;
        border-left: 5px solid var(--primary);
        max-width: 400px;
        width: 100%;
        box-shadow: 0 8px 32px rgba(255, 107, 0, 0.15);
      }
      h1 { color: var(--primary); font-size: 2rem; margin-bottom: 0.5rem; }
      .sub { color: #888; font-size: 0.9rem; margin-bottom: 1.5rem; }
      .contact {
        background: rgba(255, 107, 0, 0.08);
        padding: 0.8rem 1rem;
        border-radius: 8px;
        margin: 0.5rem 0;
        border-left: 3px solid var(--primary);
      }
      .contact strong { color: var(--primary); }
      .back { color: var(--primary); text-decoration: none; display: inline-block; margin-top: 1.5rem; }
      .back:hover { text-decoration: underline; }
      .footer { margin-top: 2rem; text-align: center; color: #555; font-size: 0.75rem; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>📞 پشتیبانی آفلاین</h1>
      <div class="sub">تماس با پشتیبانان بر اساس اپراتور</div>
      <div class="contact">📱 همراه اول: <strong>0912XXX</strong></div>
      <div class="contact">📱 ایرانسل: <strong>0935XXX</strong></div>
      <div class="contact">📱 رایتل: <strong>0921XXX</strong></div>
      <div class="contact">📱 شاتل: <strong>021XXX</strong></div>
      <div class="contact">📱 آسیاتک: <strong>021XXX</strong></div>
      <a href="/" class="back">← بازگشت به صفحه اصلی</a>
      <div class="footer">TaaKaa-XI v2.0.0</div>
    </div>
  </body>
  </html>
  `;
}

function locationPage(country) {
  const locations = {
    'ir': { flag: '🇮🇷', name: 'ایران', server: 'ir.taakaa.xyz', color: '#239F40' },
    'us': { flag: '🇺🇸', name: 'آمریکا', server: 'us.taakaa.xyz', color: '#3C3B6E' },
    'de': { flag: '🇩🇪', name: 'آلمان', server: 'de.taakaa.xyz', color: '#DD0000' },
    'nl': { flag: '🇳🇱', name: 'هلند', server: 'nl.taakaa.xyz', color: '#AE1C28' },
    'jp': { flag: '🇯🇵', name: 'ژاپن', server: 'jp.taakaa.xyz', color: '#BC002D' },
    'sg': { flag: '🇸🇬', name: 'سنگاپور', server: 'sg.taakaa.xyz', color: '#EE2536' }
  };
  
  const loc = locations[country] || locations['us'];
  
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${loc.flag} ${loc.name} - TaaKaa-XI</title>
    <style>
      :root { --primary: #FF6B00; --secondary: #1A1A1A; --text: #FFFFFF; --bg: #0D0D0D; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        background: var(--bg);
        color: var(--text);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
      }
      .card {
        background: var(--secondary);
        padding: 2.5rem;
        border-radius: 16px;
        border-left: 5px solid var(--primary);
        max-width: 400px;
        width: 100%;
        text-align: center;
        box-shadow: 0 8px 32px rgba(255, 107, 0, 0.15);
      }
      .flag { font-size: 4rem; }
      h1 { color: var(--primary); font-size: 2rem; margin: 0.5rem 0; }
      .server {
        background: var(--bg);
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        font-family: monospace;
        color: var(--primary);
        border: 1px solid #333;
      }
      .btn {
        display: inline-block;
        background: var(--primary);
        color: var(--bg);
        padding: 0.8rem 2rem;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s;
      }
      .btn:hover { transform: scale(1.05); box-shadow: 0 4px 20px rgba(255, 107, 0, 0.3); }
      .back { color: var(--primary); text-decoration: none; display: inline-block; margin-top: 1.5rem; }
      .back:hover { text-decoration: underline; }
      .footer { margin-top: 2rem; text-align: center; color: #555; font-size: 0.75rem; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="flag">${loc.flag}</div>
      <h1>${loc.name}</h1>
      <div class="server">🌐 ${loc.server}</div>
      <a href="/" class="back">← بازگشت</a>
      <div class="footer">TaaKaa-XI v2.0.0</div>
    </div>
  </body>
  </html>
  `;
}
