// Weekly calendar analysis (week-N-analysis.png + .pdf) in the official EMULLAX blue identity.
// usage: node weekly-calendar/analysis/render.js weekly-calendar/analysis/week-4.json [--story]
const path=require('path'),fs=require('fs');let chromium;try{({chromium}=require('playwright'))}catch(e){({chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright'))}
const here=__dirname,root=path.resolve(here,'../..'),skill=path.join(root,'.claude/skills/emullax-carousel/assets');
const fonts=fs.readFileSync(path.join(skill,'fonts.css'),'utf8').replace(/url\(assets\//g,'url(file://'+skill+'/');
const logo='data:image/png;base64,'+fs.readFileSync(path.join(root,'brand/logo-gradient.png')).toString('base64');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const num=s=>esc(s).replace(/~?\d[\d.:,]*%?(?: ?– ?\d[\d.:,]*%?)?/g,'<span class="n">$&</span>');
const css=`${fonts}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#00051A;color:#FCFCFC;font-family:"IBM Plex Sans Arabic",sans-serif}
.st{width:1080px;padding:0 64px 80px;position:relative;overflow:hidden;background:radial-gradient(ellipse 80% 38% at 0% 100%,#93F9FF 0%,rgba(87,161,239,.85) 38%,rgba(61,126,225,0) 75%),linear-gradient(172deg,#00051A 0%,#00051A 30%,#08163D 50%,#1F4590 72%,#3D7EE1 100%);direction:rtl}
.n{direction:ltr;unicode-bidi:isolate}
.hd{display:flex;justify-content:space-between;align-items:center;padding-top:80px;padding-bottom:40px;border-bottom:1px solid #1A2A4A}
.hd img{height:96px}
.lbl{font-size:25px;color:#93F9FF;font-weight:600}.lbl b{font-family:Michroma;font-weight:400;letter-spacing:3px;font-size:21px;direction:ltr;unicode-bidi:isolate}
h1{font-family:Tajawal;font-weight:900;font-size:76px;line-height:1.25;margin:8px 0 6px}
.rg{font-size:32px;color:#C9D4E8}
.card{background:rgba(0,5,26,.82);backdrop-filter:blur(14px);border:1px solid #1A2A4A;border-radius:22px;margin-top:22px;overflow:hidden}
.sum{padding:30px 32px;font-size:29px;line-height:1.7}
.sum h2,.sec{font-family:Tajawal;font-weight:800;font-size:38px;color:#93F9FF;margin-bottom:10px}
.sec{margin:40px 0 0}
.pk{display:flex;gap:16px;margin-top:20px}
.pk div{flex:1;background:linear-gradient(160deg,rgba(57,119,213,.35),rgba(3,11,36,.6));border:1px solid #3977D5;border-radius:18px;padding:18px 20px}
.pk b{display:block;font-size:24px;color:#57A1EF}.pk i{display:block;font-style:normal;font-size:34px;font-weight:800;margin:4px 0}.pk span{font-size:22px;color:#C9D4E8}
.eh{display:flex;align-items:center;gap:18px;padding:20px 28px;background:linear-gradient(90deg,rgba(57,119,213,.22),rgba(3,11,36,0));border-bottom:1px solid #1A2A4A}
.eh .c{flex:none;width:82px;text-align:center;border:1.5px solid #3977D5;color:#93F9FF;border-radius:10px;font-size:21px;font-weight:700;padding:4px 0;direction:ltr}
.eh .tt{flex:1;font-family:Tajawal;font-weight:800;font-size:33px;line-height:1.3}
.eh .tm{flex:none;text-align:left;font-size:22px;color:#57A1EF;font-weight:700}.eh .tm b{display:block;font-size:31px;color:#FCFCFC}
.card.l3 .tt:after{content:" ★";color:#93F9FF}
.fc{display:flex;flex-wrap:wrap;gap:12px;padding:20px 28px 0}
.fc>span{background:#030B24;border:1px solid #1F3466;border-radius:12px;padding:8px 16px;font-size:24px}.fc>span em{font-style:normal;color:#8C9AB8;margin-left:8px}
.nt{padding:16px 28px 24px;font-size:26px;line-height:1.65;color:#DDE5F3}
.tip{padding:24px 30px;font-size:25px;line-height:1.65;color:#DDE5F3}.tip b{color:#93F9FF}
.ft{margin-top:44px;border-top:1px solid rgba(252,252,252,.35);padding-top:26px;display:flex;justify-content:space-between;align-items:center}
.ft .h{font-weight:700;font-size:30px;direction:ltr}.ft .d{opacity:.9;font-size:22px}`;
const file=path.resolve(process.argv[2]||path.join(here,'week-4.json')),D=JSON.parse(fs.readFileSync(file,'utf8'));
const head=`<div class="hd"><div><div class="lbl"><b>LIQUIDITY GROUP</b> · تحليل الأجندة الاقتصادية</div><h1>${esc(D.theme)}</h1>
<div class="rg">${num(D.range)} · بتوقيت الكويت</div></div><img src="${logo}"></div>`;
const sum=`<div class="card sum"><h2>الصورة العامة</h2>${num(D.summary)}
<div class="pk">${D.peak.map(([d,t,e])=>`<div><b>${num(d)}</b><i class="n">${esc(t)}</i><span>${num(e)}</span></div>`).join('')}</div></div>`;
const ev=e=>`<div class="card l${e.lvl}"><div class="eh"><div class="c">${e.c}</div><div class="tt">${num(e.title)}</div>
<div class="tm">${num(e.day)}<b class="${/\d/.test(e.t)?'n':''}">${esc(e.t)}</b></div></div>
<div class="fc">${e.fc.map(([k,v])=>`<span><em>${num(k)}</em>${num(v)}</span>`).join('')}</div><div class="nt">${num(e.note)}</div></div>`;
const tip=`<div class="card tip"><b>تنبيه التوقيت:</b> ${num(D.tz)}<br><b>أحداث إضافية:</b> ${num(D.extra)}</div>`;
const ft=`<div class="ft"><span class="h">@emullax</span><span class="d">التوقعات من إجماع السوق وقابلة للتغيير · ليست توصية استثمارية</span></div>`;
const story=process.argv.includes('--story');
// story mode: 1080x1920 slides; D.story lists event indexes per slide after the cover ("tip" = timing card)
const pages=story?[[sum],...D.story.map(g=>g.map(x=>x==='tip'?tip:ev(D.events[x])))]:[[sum,'<div class="sec">أهم الأحداث وش نراقب</div>',...D.events.map(ev),tip]];
const html=pages.map((g,i)=>`<section class="st${story?' sy':''}" id="pg${i}">${head}${story&&i?`<div class="sec">أهم الأحداث <span class="pt n">${i}/${pages.length-1}</span></div>`:''}${g.join('')}${ft}</section>`).join('');
const xcss=`.sy{height:1920px;padding-bottom:0}.sy .hd{padding-top:190px}.sy .ft{position:absolute;left:64px;right:64px;bottom:200px}
.sy .hd h1{font-size:64px}.sy .card{margin-top:30px}.sy .sum{font-size:35px;line-height:1.75;padding:40px 36px}.sy .sum h2{font-size:46px}.sy .pk{flex-direction:column}.sy .pk div{display:flex;align-items:center;gap:20px}.sy .pk b{width:170px;font-size:28px}.sy .pk i{width:290px;font-size:40px}.sy .pk span{font-size:28px}.sy .sec{font-size:44px;margin-top:44px}.sy .eh .tt{font-size:38px}.sy .eh .tm{font-size:25px}.sy .eh .tm b{font-size:36px}.sy .fc>span{font-size:28px}.sy .nt{font-size:31px;padding:20px 28px 30px}.sy .tip{font-size:31px;padding:32px}.pt{background:#57A1EF;color:#00051A;font-weight:800;font-size:24px;border-radius:30px;padding:4px 18px;margin-right:12px;vertical-align:middle;font-family:"IBM Plex Sans Arabic"}`;
(async()=>{const tmp=path.join(here,'.a.html');
fs.writeFileSync(tmp,`<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>${css}${xcss}</style></head><body>${html}</body></html>`);
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+tmp,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
const base=path.join(path.dirname(file),D.id);let bad=0;
for(let i=0;i<pages.length;i++){const el=await p.$('#pg'+i);
 if(story){const gap=await el.evaluate(e=>e.querySelector('.ft').getBoundingClientRect().top-[...e.querySelectorAll('.card')].pop().getBoundingClientRect().bottom);
  if(gap<20){bad++;console.log('OVERFLOW story',i+1,gap)}
  await el.screenshot({path:`${base}-story-${i+1}.png`});continue}
 await el.screenshot({path:base+'.png'});const h=Math.ceil((await el.boundingBox()).height);
 await p.pdf({path:base+'.pdf',width:'1080px',height:h+'px',printBackground:true,margin:{top:0,bottom:0,left:0,right:0}});console.log(D.id,h+'px')}
fs.unlinkSync(tmp);if(story)console.log(`stories ${pages.length}, ${bad} overflow`);await b.close();process.exit(bad?1:0)})();
