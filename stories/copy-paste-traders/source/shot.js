const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.cwd()+'/stories.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
const out=process.argv[2];for(let i=1;i<=7;i++){const el=await p.$('#s'+i);
const o=await el.$eval('main',m=>[m.scrollHeight,m.clientHeight]);if(o[0]>o[1])console.log('OVERFLOW',i,o);
await el.screenshot({path:`${out}/story-0${i}.png`});}await b.close();console.log('ok')})();
