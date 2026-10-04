// usage: node render.js <out_dir>   (reads <out_dir>/carousel.html, writes slide-XX.png 1080x1350)
const path=require('path');let chromium;try{({chromium}=require('playwright'))}catch(e){({chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright'))}
(async()=>{const out=path.resolve(process.argv[2]);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.goto('file://'+out+'/carousel.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
const ok=await p.evaluate(()=>document.fonts.check('700 40px Alexandria','ث')&&document.fonts.check('400 30px "IBM Plex Sans Arabic"','ث'));if(!ok)console.log('WARNING: brand fonts not loaded');
const n=await p.$$eval('.slide',s=>s.length);let bad=0;
for(let i=1;i<=n;i++){const el=await p.$('#s'+i);const o=await el.$eval('main',m=>[m.scrollHeight,m.clientHeight]);
if(o[0]>o[1]){bad++;console.log(`OVERFLOW slide ${i}: ${o[0]}>${o[1]} — split the slide or shorten text`)}
await el.screenshot({path:`${out}/slide-${String(i).padStart(2,'0')}.png`});}
console.log(`rendered ${n} slides, ${bad} overflow`);await b.close();process.exit(bad?1:0)})();
