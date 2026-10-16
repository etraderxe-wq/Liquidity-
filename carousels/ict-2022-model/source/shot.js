const {chromium}=require('playwright');
(async()=>{const out=process.argv[2],reel=process.argv.includes('--reel'),H=reel?1920:1350;
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:H}});
await p.goto('file://'+process.cwd()+'/carousel.html',{waitUntil:'networkidle'});
if(reel)await p.evaluate(()=>{document.body.classList.add('reel');document.documentElement.style.setProperty('--H','1920px')});
await p.evaluate(()=>document.fonts.ready);
for(let i=1;i<=8;i++){const el=await p.$('#p'+i);const o=await el.$eval('main',m=>[m.scrollHeight,m.clientHeight]);if(o[0]>o[1]+2)console.log('OVERFLOW',i,o);
await el.screenshot({path:`${out}/${reel?'frame':'slide'}-0${i}.png`});}await b.close();console.log('ok')})();
