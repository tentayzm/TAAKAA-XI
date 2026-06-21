// ============================================
// patcher.js - موتور شخصی‌سازی TaaKaa-XI
// ============================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ===== تغییرات در صفحه اصلی =====
    if (path === '/' || path === '') {
      const response = await fetch('https://raw.githubusercontent.com/tentayzm/TAAKAA-XI/main/worker.js');
      let html = await response.text();
      
      // جایگزینی اسم‌ها
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
      
      return new Response(html, {
        headers: { 
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
    }

    // ===== صفحه Owners =====
    if (path === '/owners') {
      return new Response(`
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
            .back {
              display: inline-block;
              margin-top: 1.5rem;
              color: var(--primary);
              text-decoration: none;
            }
            .back:hover { text-decoration: underline; }
            .footer {
              margin-top: 2rem;
              text-align: center;
              color: #555;
              font-size: 0.75rem;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>👑 Owners</h1>
            <div class="sub">مدیران و پشتیبانان TaaKaa-XI</div>
            <a href="https://t.me/taakaa_support" class="btn">📱 پشتیبانی تلگرام</a>
            <a href="https://t.me/taakaa_owner" class="btn">👤 اکانت مدیر</a>
            <a href="/" class="back">← بازگشت به صفحه اصلی</a>
            <div class="footer">TaaKaa-XI v2.0.0</div>
          </div>
        </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    // ===== صفحه Fragment Info =====
    if (path === '/fragment-info') {
      return new Response(`
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
              max-width: 400px;
              width: 100%;
              box-shadow: 0 8px 32px rgba(255, 107, 0, 0.15);
            }
            h1 { color: var(--primary); font-size: 2rem; margin-bottom: 0.5rem; }
            .sub { color: #888; font-size: 0.9rem; margin-bottom: 1.5rem; }
            .feature {
              background: rgba(255, 107, 0, 0.1);
              padding: 0.8rem 1rem;
              border-radius: 8px;
              margin: 0.5rem 0;
              border-left: 3px solid var(--primary);
            }
            .feature .icon { font-size: 1.2rem; }
            .feature .title { font-weight: 600; }
            .feature .desc { color: #888; font-size: 0.85rem; }
            .back {
              display: inline-block;
              margin-top: 1.5rem;
              color: var(--primary);
              text-decoration: none;
            }
            .back:hover { text-decoration: underline; }
            .footer {
              margin-top: 2rem;
              text-align: center;
              color: #555;
              font-size: 0.75rem;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>🧩 تکنیک Fragment</h1>
            <div class="sub">تکه‌تکه‌سازی بسته‌های TLS برای عبور از فیلترینگ</div>
            <div class="feature">
              <div class="icon">✅</div>
              <div class="title">کاهش تشخیص الگو</div>
              <div class="desc">بسته‌ها به قطعات کوچک تقسیم می‌شوند</div>
            </div>
            <div class="feature">
              <div class="icon">🛡️</div>
              <div class="title">دور زدن DPI</div>
              <div class="desc">تشخیص Deep Packet Inspection را دشوار می‌کند</div>
            </div>
            <div class="feature">
              <div class="icon">⚡</div>
              <div class="title">افزایش پایداری</div>
              <div class="desc">اتصال پایدارتر در شبکه‌های محدودکننده</div>
            </div>
            <a href="/" class="back">← بازگشت به صفحه اصلی</a>
            <div class="footer">TaaKaa-XI v2.0.0</div>
          </div>
        </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    return new Response('404 Not Found - TaaKaa-XI', { status: 404 });
  }
};
