const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.cwd()+'/stories.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
const out=process.argv[2];for(let i=1;i<=1;i++){const el=await p.$('#s'+i);
const u=await el.$eval('ul',m=>m.getBoundingClientRect().bottom);console.log('ul bottom',u);
await el.screenshot({path:`${out}/story.png`});}await b.close();console.log('ok')})();
