// Daily «أجندة اليوم» story (EMULLAX blue identity). Reads today's events from stories-blue/data.json.
// usage: node weekly-calendar/daily/render_daily.js YYYY-MM-DD   → weekly-calendar/daily/YYYY-MM-DD.png (1080x1920)
// exit 0 = rendered, 2 = date not in data.json (calendar needs updating)
const path=require('path'),fs=require('fs');let chromium;try{({chromium}=require('playwright'))}catch(e){({chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright'))}
const here=__dirname,root=path.resolve(here,'../..'),src=path.join(here,'../stories-blue/data.json'),skill=path.join(root,'.claude/skills/emullax-carousel/assets');
const fonts=fs.readFileSync(path.join(skill,'fonts.css'),'utf8').replace(/url\(assets\//g,'url(file://'+skill+'/');
const logo='data:image/png;base64,'+fs.readFileSync(path.join(root,'brand/logo-gradient.png')).toString('base64');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const css=`${fonts}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#00051A;color:#FCFCFC;font-family:"IBM Plex Sans Arabic",sans-serif}
.st{width:1080px;height:1920px;position:relative;overflow:hidden;background:radial-gradient(ellipse 80% 38% at 0% 100%,#93F9FF 0%,rgba(87,161,239,.85) 38%,rgba(61,126,225,0) 75%),linear-gradient(172deg,#00051A 0%,#00051A 30%,#08163D 50%,#1F4590 72%,#3D7EE1 100%);padding:0 64px;direction:rtl}
.z{position:relative;z-index:1}
.hd{display:flex;justify-content:space-between;align-items:center;padding-top:190px;padding-bottom:40px;border-bottom:1px solid #1A2A4A}
.hd img{height:96px}
.lbl{font-size:25px;color:#93F9FF;font-weight:600}.lbl b{font-family:Michroma;font-weight:400;letter-spacing:3px;font-size:21px;direction:ltr;unicode-bidi:isolate}
h1{font-family:Tajawal;font-weight:900;font-size:76px;line-height:1.25;margin:8px 0 6px}
.rg{display:flex;align-items:center;gap:18px;font-size:32px;color:#C9D4E8}
.pt{background:#57A1EF;color:#00051A;font-weight:800;font-size:24px;border-radius:30px;padding:4px 18px;direction:ltr}
.n{direction:ltr;unicode-bidi:isolate}
.key{font-size:22px;color:#8C9AB8;margin:28px 0 24px}
.day{background:rgba(0,5,26,.82);backdrop-filter:blur(14px);border:1px solid #1A2A4A;border-radius:22px;margin-bottom:18px;overflow:hidden}
.dh{display:flex;align-items:baseline;gap:16px;padding:20px 28px;background:linear-gradient(90deg,rgba(57,119,213,.18),rgba(3,11,36,0));border-bottom:1px solid #1A2A4A}
.dh b{font-family:Tajawal;font-weight:700;font-size:36px}.dh span{color:#57A1EF;font-size:30px;font-weight:700}
.r{display:flex;align-items:center;gap:22px;height:96px;padding:0 28px;border-top:1px solid #0F1A36}.r:first-of-type{border-top:0}
.r .t{width:150px;flex:none;font-size:31px;font-weight:700;text-align:left;order:3;color:#FCFCFC}
.r .c{flex:none;width:82px;text-align:center;border:1.5px solid #3977D5;color:#93F9FF;border-radius:10px;font-size:21px;font-weight:700;padding:4px 0;order:2;direction:ltr}
.r .e{flex:1;font-size:33px;font-weight:600;order:1;white-space:nowrap}
.none{background:rgba(0,5,26,.82);border:1px solid #1A2A4A;border-radius:22px;padding:60px 40px;text-align:center;font-family:Tajawal;font-size:44px;font-weight:700;line-height:1.6}.none small{display:block;font-size:30px;color:#93F9FF;font-weight:600;margin-top:10px}
.r.k .e{color:#93F9FF}.r.k .e:after{content:" ★";color:#93F9FF}
.ft{position:absolute;left:64px;right:64px;bottom:200px;border-top:1px solid rgba(252,252,252,.35);padding-top:26px;display:flex;justify-content:space-between;align-items:center}
.ft .h{color:#FCFCFC;font-weight:700;font-size:30px;direction:ltr}.ft .d{color:#FCFCFC;opacity:.9;font-size:22px}`;
const MON=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const DAY=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const iso=process.argv[2]||new Date(Date.now()+3*3600e3).toISOString().slice(0,10);   // Kuwait date by default
const [Y,M,D]=iso.split('-').map(Number),dt=`${D} ${MON[M-1]}`,dname=DAY[new Date(Date.UTC(Y,M-1,D)).getUTCDay()];
const data=JSON.parse(fs.readFileSync(src,'utf8'));
const inRange=data.some(s=>s.range.includes(String(Y)));
const day=data.flatMap(s=>s.days).find(x=>x.dt===dt);
const lastDay=data[data.length-1].days.slice(-1)[0].dt;
if(!day&&!data.some(s=>s.days.length)){process.exit(2)}
const covered=(()=>{const all=data.flatMap(s=>s.days.map(x=>x.dt));return all.includes(dt)||(()=>{  // a weekday inside a covered week with no events
  const r=data.find(s=>{const m=s.range.match(/(\d+)\s*–\s*(\d+)\s*(\S+)\s*(\d{4})/);if(!m)return false;return +m[4]===Y&&MON.indexOf(m[3])===M-1&&D>=+m[1]&&D<=+m[2];});return !!r;})();})();
if(!covered){console.log('NOT_COVERED',iso,'— last date in data.json:',lastDay);process.exit(2)}
const ev=day?day.ev:[];
const html=`<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>${css}</style></head><body><section class="st" id="d"><div class="z">
<div class="hd"><div><div class="lbl"><b>LIQUIDITY GROUP</b> · الأجندة الاقتصادية</div><h1>أجندة اليوم</h1>
<div class="rg"><span>${dname} ${dt.replace(/^(\d+)/,'<span class="n">$1</span>')} <span class="n">${Y}</span></span></div></div><img src="${logo}"></div>
<div class="key">بتوقيت الكويت · ★ حدث رئيسي</div>
${ev.length?`<div class="day">${ev.map(([t,c,e,k])=>`<div class="r${k?' k':''}"><div class="t${/\d/.test(t)?' n':''}">${t}</div><div class="c">${c}</div><div class="e">${esc(e)}</div></div>`).join('')}</div>`
 :`<div class="none">ما فيه أخبار اقتصادية مؤثرة اليوم<small>ركّز على خطتك وإدارة مخاطرك</small></div>`}
</div><div class="ft z"><span class="h">@emullax</span><span class="d">المواعيد قابلة للتغيير · ليست توصية استثمارية</span></div></section></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
const tmp=path.join(here,'.daily.html');fs.writeFileSync(tmp,html);await p.goto('file://'+tmp,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
const wide=await p.evaluate(()=>[...document.querySelectorAll('.e')].some(x=>x.scrollWidth>x.clientWidth));if(wide)console.log('WARN: long event name clipped');
const fontsOk=await p.evaluate(()=>document.fonts.check('900 40px Tajawal','ا')&&document.fonts.check('400 20px Michroma','A'));if(!fontsOk){console.log('ERROR: brand fonts not loaded');process.exit(3)}
const out=path.join(here,iso+'.png');await (await p.$('#d')).screenshot({path:out});fs.unlinkSync(tmp);await b.close();console.log(out,ev.length+' events');})();
