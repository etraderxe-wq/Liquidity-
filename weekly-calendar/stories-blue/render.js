// Weekly economic calendar stories in the official EMULLAX blue identity (brand/BRAND.md).
// usage: node weekly-calendar/stories-blue/render.js   → <id>.png 1080x1920 for every entry in data.json
const path=require('path'),fs=require('fs');let chromium;try{({chromium}=require('playwright'))}catch(e){({chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright'))}
const here=__dirname,root=path.resolve(here,'../..'),skill=path.join(root,'.claude/skills/emullax-carousel/assets');
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
h1{font-family:Alexandria;font-weight:800;font-size:76px;line-height:1.25;margin:8px 0 6px}
.rg{display:flex;align-items:center;gap:18px;font-size:32px;color:#C9D4E8}
.pt{background:#57A1EF;color:#00051A;font-weight:800;font-size:24px;border-radius:30px;padding:4px 18px;direction:ltr}
.n{direction:ltr;unicode-bidi:isolate}
.key{font-size:22px;color:#8C9AB8;margin:28px 0 24px}
.day{background:rgba(0,5,26,.82);backdrop-filter:blur(14px);border:1px solid #1A2A4A;border-radius:22px;margin-bottom:18px;overflow:hidden}
.dh{display:flex;align-items:baseline;gap:16px;padding:20px 28px;background:linear-gradient(90deg,rgba(57,119,213,.18),rgba(3,11,36,0));border-bottom:1px solid #1A2A4A}
.dh b{font-family:Alexandria;font-weight:700;font-size:36px}.dh span{color:#57A1EF;font-size:30px;font-weight:700}
.r{display:flex;align-items:center;gap:22px;height:80px;padding:0 28px;border-top:1px solid #0F1A36}.r:first-of-type{border-top:0}
.r .t{width:150px;flex:none;font-size:31px;font-weight:700;text-align:left;order:3;color:#FCFCFC}
.r .c{flex:none;width:82px;text-align:center;border:1.5px solid #3977D5;color:#93F9FF;border-radius:10px;font-size:21px;font-weight:700;padding:4px 0;order:2;direction:ltr}
.r .e{flex:1;font-size:30px;font-weight:600;order:1;white-space:nowrap}
.r.k .e{color:#93F9FF}.r.k .e:after{content:" ★";color:#93F9FF}
.ft{position:absolute;left:64px;right:64px;bottom:200px;border-top:1px solid rgba(252,252,252,.35);padding-top:26px;display:flex;justify-content:space-between;align-items:center}
.ft .h{color:#FCFCFC;font-weight:700;font-size:30px;direction:ltr}.ft .d{color:#FCFCFC;opacity:.9;font-size:22px}`;
const story=s=>`<section class="st" id="${s.id}"><div class="z">
<div class="hd"><div><div class="lbl"><b>LIQUIDITY GROUP</b> · الأجندة الاقتصادية</div><h1>أهم أحداث الأسبوع</h1>
<div class="rg"><span>${s.range}</span><span class="pt">${s.part}</span></div></div>
<img src="${logo}"></div>
<div class="key">بتوقيت الكويت · ★ حدث رئيسي</div>
${s.days.map(d=>`<div class="day"><div class="dh"><b>${d.d}</b><span>${d.dt.replace(/^(\d+)/,'<span class="n">$1</span>')}</span></div>
${d.ev.map(([t,c,e,k])=>`<div class="r${k?' k':''}"><div class="t${/\d/.test(t)?' n':''}">${t}</div><div class="c">${c}</div><div class="e">${esc(e)}</div></div>`).join('')}</div>`).join('')}
</div><div class="ft z"><span class="h">@emullax</span><span class="d">المواعيد قابلة للتغيير · ليست توصية استثمارية</span></div></section>`;
(async()=>{const data=JSON.parse(fs.readFileSync(path.join(here,'data.json'),'utf8'));
const html=`<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>${css}</style></head><body>${data.map(story).join('')}</body></html>`;
fs.writeFileSync(path.join(here,'stories.html'),html);
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+path.join(here,'stories.html'),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
let bad=0;for(const s of data){const el=await p.$('#'+s.id);
const o=await el.evaluate(e=>{const f=e.querySelector('.ft').getBoundingClientRect().top,last=[...e.querySelectorAll('.day')].pop().getBoundingClientRect().bottom;
const wide=[...e.querySelectorAll('.e')].some(x=>x.scrollWidth>x.clientWidth);return {gap:f-last,wide}});
if(o.gap<20||o.wide){bad++;console.log('OVERFLOW',s.id,o)}
await el.screenshot({path:path.join(here,s.id+'.png')});}
fs.unlinkSync(path.join(here,'stories.html'));console.log(`rendered ${data.length}, ${bad} overflow`);await b.close();process.exit(bad?1:0)})();
