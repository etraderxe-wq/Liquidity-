// Responsive web page (week-N-analysis.html) of the weekly analysis, for publishing as an Artifact. Blue identity, Google Fonts.
// usage: node weekly-calendar/analysis/html.js weekly-calendar/analysis/week-5.json
const path=require('path'),fs=require('fs');
const here=__dirname,root=path.resolve(here,'../..');
const file=path.resolve(process.argv[2]),D=JSON.parse(fs.readFileSync(file,'utf8'));
const img=f=>'data:image/png;base64,'+fs.readFileSync(f).toString('base64');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const num=s=>esc(s).replace(/~?\d[\d.:,]*%?(?: ?– ?\d[\d.:,]*%?)?/g,'<span class="n">$&</span>');
const css=`/* Layout: one reading column on the brand gradient; cards on navy glass */
:root{--bg:#00051A;--card:rgba(0,5,26,.84);--line:#1A2A4A;--fg:#FCFCFC;--muted:#AEBBD6;--blue:#3977D5;--lblue:#57A1EF;--cyan:#93F9FF;
--ar-d:"Tajawal","IBM Plex Sans Arabic",sans-serif;--ar:"IBM Plex Sans Arabic","Tajawal",sans-serif;--en:"Michroma","IBM Plex Sans",sans-serif;color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font-family:var(--ar);font-size:17px;line-height:1.7}
.bgw{background:radial-gradient(ellipse 90% 30% at 0% 100%,#93F9FF 0%,rgba(87,161,239,.8) 38%,rgba(61,126,225,0) 75%),linear-gradient(172deg,#00051A 0%,#00051A 30%,#08163D 50%,#1F4590 75%,#3D7EE1 100%);min-height:100vh}
.wrap{max-width:860px;margin:0 auto;padding-block:32px 48px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:grid;gap:18px}
.n{direction:ltr;unicode-bidi:isolate;font-variant-numeric:tabular-nums}
header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding-bottom:22px;border-bottom:1px solid var(--line)}
header img{height:64px;width:auto;flex:none}
.lbl{color:var(--cyan);font-weight:600;font-size:14px}.lbl b{font-family:var(--en);font-weight:400;letter-spacing:2px;font-size:12px;direction:ltr;unicode-bidi:isolate}
h1{font-family:var(--ar-d);font-weight:900;font-size:clamp(32px,6vw,52px);line-height:1.2;margin:6px 0;text-wrap:balance}
.rg{color:var(--muted);font-size:18px}
.card{background:var(--card);backdrop-filter:blur(12px);border:1px solid var(--line);border-radius:18px;overflow:hidden;min-width:0}
.pad{padding:22px 24px}
h2{font-family:var(--ar-d);font-weight:800;font-size:26px;color:var(--cyan);margin:0 0 8px;text-wrap:balance}
.sec{font-family:var(--ar-d);font-weight:800;font-size:28px;color:var(--cyan);margin:18px 0 0}
.pk{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:16px}
.pk div{background:linear-gradient(160deg,rgba(57,119,213,.35),rgba(3,11,36,.6));border:1px solid var(--blue);border-radius:14px;padding:12px 16px}
.pk b{display:block;color:var(--lblue);font-size:15px}.pk i{display:block;font-style:normal;font-weight:800;font-size:24px}.pk span{color:var(--muted);font-size:15px}
.cur{flex:none;min-width:58px;text-align:center;border:1.5px solid var(--blue);color:var(--cyan);border-radius:8px;font-size:14px;font-weight:700;padding:1px 6px;direction:ltr}
.dh{display:flex;align-items:baseline;gap:12px;padding:12px 20px;background:linear-gradient(90deg,rgba(57,119,213,.2),rgba(3,11,36,0));border-bottom:1px solid var(--line)}
.dh b{font-family:var(--ar-d);font-size:22px}.dh span{color:var(--lblue);font-weight:700}
.row{display:flex;align-items:center;gap:14px;padding:10px 20px;border-top:1px solid #0F1A36}.row:first-of-type{border-top:0}
.row .e{flex:1;min-width:0;font-weight:600}.row .t{flex:none;width:92px;text-align:left;font-weight:700}
.row.k .e{color:var(--cyan)}.row.k .e::after{content:" ★"}
.eh{display:flex;align-items:flex-start;gap:14px;padding:16px 20px;background:linear-gradient(90deg,rgba(57,119,213,.22),rgba(3,11,36,0));border-bottom:1px solid var(--line)}
.eh .tt{flex:1;min-width:0;font-family:var(--ar-d);font-weight:800;font-size:22px;line-height:1.35}
.eh .tm{flex:none;text-align:left;color:var(--lblue);font-size:14px;font-weight:700}.eh .tm b{display:block;color:var(--fg);font-size:22px}
.l3 .tt::after{content:" ★";color:var(--cyan)}
.fc{display:flex;flex-wrap:wrap;gap:8px;padding:14px 20px 0}
.fc>span{background:#030B24;border:1px solid #1F3466;border-radius:10px;padding:4px 12px;font-size:15px}.fc em{font-style:normal;color:var(--muted);margin-left:6px}
.nt{padding:10px 20px 18px;color:#DDE5F3}
.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px}
.ir{display:flex;gap:14px;align-items:flex-start;padding:12px 0;border-top:1px solid #0F1A36}.ir:first-of-type{border-top:0}
.ir .cur{margin-top:4px}.ir b{display:block}
ul.rk{margin:0;padding:0 18px 0 0}ul.rk li{padding:6px 0}ul.rk li::marker{color:var(--cyan)}
.tip b{color:var(--cyan)}
.promo{display:flex;flex-wrap:wrap;gap:22px;align-items:center;border:1.5px solid var(--lblue);background:linear-gradient(150deg,rgba(57,119,213,.45),rgba(0,5,26,.9))}
.promo .tx{flex:1 1 300px;min-width:0}.promo .big{font-family:var(--ar-d);font-weight:900;font-size:40px;color:var(--cyan);line-height:1.2}
.promo a.lk{display:inline-block;background:var(--cyan);color:var(--bg);font-weight:800;border-radius:30px;padding:8px 24px;text-decoration:none;margin-top:8px}
.promo a.lk:focus-visible,a:focus-visible{outline:2px solid var(--cyan);outline-offset:3px}
.promo .url{color:var(--muted);font-size:14px;margin-top:6px;overflow-wrap:anywhere}.promo .pn{color:#8C9AB8;font-size:13px;margin-top:8px}
.promo img{width:170px;height:170px;border-radius:12px;flex:none}
.src{font-size:14px;color:var(--muted)}.src a{color:var(--lblue)}.src ul{margin:6px 0 0;padding:0 18px 0 0}
footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;border-top:1px solid rgba(252,252,252,.35);padding-top:16px;font-size:14px}
footer b{direction:ltr;font-size:18px}
@media (max-width:520px){header img{height:44px}.row{padding:10px 14px;gap:10px}.row .t{width:76px}.eh{flex-wrap:wrap}.eh .tm{width:100%;text-align:right}}`;
const days=D.days.map(d=>`<div class="card"><div class="dh"><b>${d.d}</b><span>${num(d.dt)}</span></div>
${d.ev.map(([t,c,e,k])=>`<div class="row${k?' k':''}"><div class="e">${esc(e)}</div><span class="cur">${c}</span><div class="t${/\d/.test(t)?' n':''}">${t}</div></div>`).join('')}</div>`).join('');
const evs=D.events.map(e=>`<article class="card l${e.lvl}"><div class="eh"><span class="cur">${e.c}</span><div class="tt">${num(e.title)}</div>
<div class="tm">${num(e.day)}<b class="${/\d/.test(e.t)?'n':''}">${esc(e.t)}</b></div></div>
<div class="fc">${e.fc.map(([k,v])=>`<span><em>${num(k)}</em>${num(v)}</span>`).join('')}</div><div class="nt">${num(e.note)}</div></article>`).join('');
const P=D.promo;
const html=`<title>${esc(D.title||D.theme)}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Tajawal:wght@700;800;900&family=Michroma&display=swap">
<style>${css}</style>
<div class="bgw" dir="rtl" lang="ar"><main class="wrap">
<header><div><div class="lbl"><b>LIQUIDITY GROUP</b> · تحليل الأجندة الاقتصادية</div><h1>${esc(D.theme)}</h1><div class="rg">${num(D.range)} · بتوقيت الكويت <span class="n">(UTC+3)</span></div></div>
<img src="${img(path.join(root,'brand/logo-gradient.png'))}" alt="EMULLAX"></header>
<section class="card pad"><h2>الصورة العامة</h2>${num(D.summary)}
<div class="pk">${D.peak.map(([d,t,e])=>`<div><b>${num(d)}</b><i class="n">${esc(t)}</i><span>${num(e)}</span></div>`).join('')}</div></section>
<div class="sec">الجدول اليومي</div><p style="margin:0;color:var(--muted);font-size:14px">★ حدث رئيسي</p>${days}
<div class="sec">أهم الأحداث وش نراقب</div>${evs}
<div class="grid2"><section class="card pad"><h2>التأثير المتوقع على العملات والذهب</h2>${D.impact.map(([c,n,t])=>`<div class="ir"><span class="cur">${c}</span><div><b>${n}</b>${num(t)}</div></div>`).join('')}</section>
<section class="card pad"><h2>أبرز المخاطر</h2><ul class="rk">${D.risks.map(r=>`<li>${num(r)}</li>`).join('')}</ul></section></div>
<section class="card pad tip"><b>تنبيه التوقيت:</b> ${num(D.tz)}<br><b>${D.extraLabel||'أحداث إضافية'}:</b> ${num(D.extra)}</section>
${P?`<section class="card pad promo"><div class="tx"><div class="big"><span class="n">60%</span> كاش باك</div>
<div>سجّل حسابك في Exness تحت وكالتي، وأرجّع لك <span class="n">60%</span> من عمولة الشريك اللي توصلني من تداولاتك المؤهّلة. مثال: إذا كانت العمولة <span class="n">$10</span> ترجع لك <span class="n">$6</span>.</div>
<a class="lk" href="${P.link}" target="_blank" rel="noopener">سجّل من هنا</a><div class="url n">${esc(P.link.replace('https://',''))}</div>
<div class="pn">الكاش باك من عمولة الشريك وليس من الإيداع أو الأرباح، وليس ربحاً مضموناً. يخضع لشروط العرض. التداول ينطوي على مخاطر.</div></div>
<img src="${img(path.join(here,P.qr))}" alt="رمز QR لرابط التسجيل"></section>`:''}
${D.sources?`<section class="src">مصادر التوقعات (إجماع السوق وقت كتابة التقرير):<ul>${D.sources.map(([t,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join('')}</ul></section>`:''}
<footer><b>@emullax</b><span>المواعيد والتوقعات قابلة للتغيير · ليست توصية استثمارية</span></footer>
</main></div>`;
const out=path.join(path.dirname(file),D.id+'.html');fs.writeFileSync(out,html);console.log(out,Math.round(html.length/1024)+'KB');
