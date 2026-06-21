// ============================================
// patcher.js - موتور شخصی‌سازی TaaKaa-XI
// ============================================

(async function applyPatch() {
  // لینک فایل تنظیمات در مخزن شما
  const patchUrl = 'https://raw.githubusercontent.com/tentayzm/TAAKAA-XI/main/patch.json';
  
  try {
    const res = await fetch(patchUrl);
    if (!res.ok) throw new Error('نتوانستم فایل تنظیمات را پیدا کنم');
    const patch = await res.json();
    
    console.log(`✅ بارگذاری Patch نسخه ${patch.version} برای ${patch.name}`);

    // 1. جایگزینی اسم‌ها و متن‌ها
    for (const item of patch.replacements) {
      const regex = new RegExp(item.from, 'g');
      document.body.innerHTML = document.body.innerHTML.replace(regex, item.to);
      console.log(`  ✅ ${item.from} → ${item.to}`);
    }

    // 2. اعمال رنگ‌های جدید
    const styleTag = document.createElement('style');
    let cssText = ':root {';
    for (const [key, value] of Object.entries(patch.colors)) {
      cssText += `--${key}: ${value};`;
    }
    cssText += '}';
    
    // اضافه کردن استایل دکمه‌ها و پرچم‌ها
    cssText += `
      .custom-menu { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; justify-content: center; }
      .btn-flag { background: var(--primary); color: #000; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-weight: bold; transition: 0.3s; }
      .btn-flag:hover { transform: scale(1.05); box-shadow: 0 4px 15px rgba(255,107,0,0.3); }
      .flags-container { display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; margin: 8px 0; }
      .flag { font-size: 1.8rem; transition: 0.3s; cursor: default; }
      .flag:hover { transform: scale(1.2); }
    `;
    styleTag.textContent = cssText;
    document.head.appendChild(styleTag);

    // 3. اضافه کردن دکمه‌های منو
    let menuHTML = '<div class="custom-menu">';
    for (const btn of patch.menu.buttons) {
      menuHTML += `<a href="${btn.url}" class="btn-flag">${btn.text}</a>`;
    }
    menuHTML += '</div>';
    document.body.innerHTML += menuHTML;

    // 4. اضافه کردن پرچم‌ها
    let flagsHTML = '<div class="flags-container">';
    for (const [code, flag] of Object.entries(patch.flags)) {
      flagsHTML += `<span class="flag" title="${code}">${flag}</span>`;
    }
    flagsHTML += '</div>';
    document.body.innerHTML += flagsHTML;
    
    console.log('✅ شخصی‌سازی TaaKaa-XI با موفقیت انجام شد!');
  } catch (error) {
    console.error('❌ خطا در اجرای Patch:', error);
  }
})();
