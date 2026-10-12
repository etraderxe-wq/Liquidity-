const {chromium}=require('playwright'),fs=require('fs');
(async()=>{const D=JSON.parse(fs.readFileSync('overlay.json','utf8'));
const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.cwd()+'/page.html');await p.evaluate(()=>document.fonts.ready);
await p.evaluate(D=>{window.D=D;const S=1.5,c=document.getElementById('c'),X=c.getContext('2d');
 const rgb=(c,a=1)=>`rgba(${c[0]},${c[1]},${c[2]},${a})`;
 function txt(s,x,y,size,w,col,align='center',maxW=960){s=s.replace(/[+]?[0-9A-Za-z][0-9A-Za-z:.%]*/g,m=>'\u2066'+m+'\u2069');X.font=`${w} ${size}px T`;X.direction='rtl';X.textAlign=align;X.fillStyle=col;let sz=size;while(X.measureText(s).width>maxW&&sz>10){sz-=2;X.font=`${w} ${sz}px T`;}X.fillText(s,x,y);return sz;}
 function rr(x,y,w,h,r){X.beginPath();X.moveTo(x+r,y);X.arcTo(x+w,y,x+w,y+h,r);X.arcTo(x+w,y+h,x,y+h,r);X.arcTo(x,y+h,x,y,r);X.arcTo(x,y,x+w,y,r);X.closePath();}
 window.draw=f=>{const t=f/D.fps;X.clearRect(0,0,1080,1920);
  for(const e of D.E){if(t<e.t0||t>=e.t1)continue;const a=e.alpha[f]||0;
   if(e.box){const[x0,y0,x1,y1]=e.box;X.globalAlpha=1;X.fillStyle='#FDFDFD';X.fillRect(x0*S,y0*S,(x1-x0)*S,(y1-y0)*S);}
   if(a<.01)continue;X.globalAlpha=a;const col=rgb(e.color);
   if(e.kind==='title'){const y=((e.box[1]+e.box[3])/2)*S+30;
     if(e.special==='t1'){X.font='900 92px T';X.direction='ltr';const a1='1:1',mid=' ولا ',b1='1:4؟';X.font='900 92px T';const w1=X.measureText(a1).width,w3=X.measureText(b1).width;X.font='700 52px T';const w2=X.measureText(mid).width;const tot=w1+w2+w3;let xr=540+tot/2;
       X.textAlign='right';X.font='900 92px T';X.fillStyle='rgb(107,111,124)';X.fillText(a1,xr,y);xr-=w1;X.font='700 52px T';X.direction='rtl';X.fillText(mid,xr,y-6);xr-=w2;X.direction='ltr';X.font='900 92px T';X.fillStyle='rgb(222,128,20)';X.fillText(b1,xr,y);}
     else txt(e.text,540,y,86,900,col,'center',960);}
   else if(e.kind==='cap'){const L=e.text.split('|'),c0=((e.box[1]+e.box[3])/2)*S;const lh=86;L.forEach((s,i)=>txt(s,540,c0+(i-(L.length-1)/2)*lh+24,62,900,col,'center',960));}
   else if(e.kind==='pill'){const[x0,y0,x1,y1]=e.box;const cx=(x0+x1)/2*S,cy=(y0+y1)/2*S;X.font='700 34px T';const w=X.measureText(e.text).width+48,h=56;
     X.fillStyle='#FFFFFF';X.strokeStyle='rgba(205,208,214,1)';X.lineWidth=2;rr(cx-w/2,cy-h/2,w,h,10);X.fill();X.stroke();txt(e.text,cx,cy+12,34,700,col);}
   else if(e.kind==='small'){txt(e.text,e.x*S,(e.box[3]-3)*S,24,700,col,'left',560);}
   else if(e.kind==='legend'){const[x0,y0,x1,y1]=e.box;const cy=(y0+y1)/2*S;X.fillStyle=col;X.fillRect(92*S,cy-3,26,6);txt(e.text,92*S+38,cy+12,33,700,col,'left',600);}
   else if(e.kind==='foot'){e.text.split('|').forEach((s,i)=>txt(s,540,(e.box[1]+16)*S+i*40,25,700,col,'center',940));}
   else if(e.kind==='note'){txt(e.text,540,e.y*S,28,700,col,'center',940);}
  }X.globalAlpha=1;return c.toDataURL('image/png');};},D);
for(let f=0;f<D.N;f++){const u=await p.evaluate(f=>draw(f),f);fs.writeFileSync(`ov/${String(f).padStart(5,'0')}.png`,Buffer.from(u.split(',')[1],'base64'));}
await b.close();console.log('ok',D.N)})();
