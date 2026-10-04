// usage: node render.js <out_dir> [--reel]
//   default: slide-XX.png 1080x1350 (carousel)   --reel: reel/frame-XX.png 1080x1920
const path=require('path'),fs=require('fs');let chromium;try{({chromium}=require('playwright'))}catch(e){({chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright'))}
(async()=>{const out=path.resolve(process.argv[2]);const reel=process.argv.includes('--reel');const H=reel?1920:1350;
const dir=reel?path.join(out,'reel'):out;fs.mkdirSync(dir,{recursive:true});
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:H}});
await p.goto('file://'+out+'/carousel.html',{waitUntil:'networkidle'});if(reel)await p.evaluate(()=>document.body.classList.add('reel'));
await p.evaluate(()=>document.fonts.ready);
const ok=await p.evaluate(()=>document.fonts.check('700 40px Alexandria','ث')&&document.fonts.check('400 30px "IBM Plex Sans Arabic"','ث'));if(!ok)console.log('WARNING: brand fonts not loaded');
const n=await p.$$eval('.slide',s=>s.length);let bad=0;const words=[];
for(let i=1;i<=n;i++){const el=await p.$('#s'+i);const o=await el.$eval('main',m=>[m.scrollHeight,m.clientHeight]);
if(o[0]>o[1]){bad++;console.log(`OVERFLOW slide ${i}: ${o[0]}>${o[1]} — split the slide or shorten text`)}
words.push(await el.$eval('main',m=>m.innerText.split(/\s+/).filter(Boolean).length));
await el.screenshot({path:`${dir}/${reel?'frame':'slide'}-${String(i).padStart(2,'0')}.png`});}
if(reel)fs.writeFileSync(path.join(dir,'words.json'),JSON.stringify(words));
console.log(`rendered ${n} ${reel?'reel frames':'slides'}, ${bad} overflow`);await b.close();process.exit(bad?1:0)})();
