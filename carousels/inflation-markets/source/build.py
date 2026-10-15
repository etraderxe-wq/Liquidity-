import random
SK='/home/user/Liquidity-/.claude/skills/emullax-carousel/assets'; LOGO='file:///home/user/Liquidity-/brand/logo-gradient.png'
UP,DN,RED='#93F9FF','#3977D5','#FF5C6C'
def svg(w,h,inner): return f'<svg viewBox="0 0 {w} {h}" width="100%" height="{h}" style="direction:ltr">{inner}</svg>'
def T(x,y,t,col='#C9D6F0',s=22,w=700,a='middle',f='Tajawal'): return f'<text x="{x}" y="{y}" fill="{col}" font-size="{s}" font-weight="{w}" text-anchor="{a}" font-family="{f}">{t}</text>'
def candles(seed,n,w,h,drift=.6,vol=3,op=1):
    r=random.Random(seed);p=40;st=w/n;o=[]
    for i in range(n):
        a=p;c=max(5,min(95,a+drift+r.gauss(0,vol)));hi=max(a,c)+abs(r.gauss(0,1.5));lo=min(a,c)-abs(r.gauss(0,1.5));p=c
        Y=lambda v:h-v/100*h;col=UP if c>=a else DN;x=st*(i+.5)
        o.append(f'<g opacity="{op}"><line x1="{x:.0f}" x2="{x:.0f}" y1="{Y(hi):.0f}" y2="{Y(lo):.0f}" stroke="{col}" stroke-width="2"/><rect x="{x-st*.3:.0f}" y="{Y(max(a,c)):.0f}" width="{st*.6:.0f}" height="{max(2,abs(Y(a)-Y(c))):.0f}" fill="{col}"/></g>')
    return ''.join(o)
# ---- illustrations
fed=('<defs><linearGradient id="red" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FF5C6C" stop-opacity=".28"/><stop offset="1" stop-color="#FF5C6C" stop-opacity="0"/></linearGradient>'
     '<linearGradient id="bld" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#14306E"/><stop offset="1" stop-color="#030B24"/></linearGradient></defs>'
     '<rect width="1000" height="470" fill="url(#red)"/>'+candles(3,40,1000,430,.9,3.4,.35)+
     '<g transform="translate(250 150)"><path d="M0 70 L250 0 L500 70Z" fill="url(#bld)" stroke="#57A1EF" stroke-width="3"/><rect x="10" y="70" width="480" height="18" fill="#1F4590"/>'
     +''.join(f'<rect x="{30+i*62}" y="95" width="26" height="170" rx="4" fill="url(#bld)" stroke="#57A1EF" stroke-width="2"/>' for i in range(8))+
     '<rect x="0" y="265" width="500" height="20" fill="#1F4590"/><rect x="-20" y="285" width="540" height="22" fill="#14306E" stroke="#57A1EF" stroke-width="2"/>'
     +T(250,52,'FEDERAL RESERVE','#93F9FF',20,700,f='Michroma')+'</g>')
def ill_cpi():
    pts=[(0,60),(1,58),(2,55),(3,57),(4,52),(5,46),(6,44),(7,38),(8,30)]
    path=' '.join(f'{"M" if i==0 else "L"}{60+x*105},{y*3.2}' for i,(x,y) in enumerate(pts))
    return svg(1000,250,f'<path d="{path}" fill="none" stroke="{RED}" stroke-width="6" stroke-linecap="round"/><circle cx="{60+8*105}" cy="96" r="12" fill="{RED}"/>'
      +T(70,40,'CPI',UP,44,800,'start','Michroma')+T(210,40,'مؤشر أسعار المستهلك','#C9D6F0',24,700,'start')
      +T(900,150,'$','#93F9FF',120,900,'middle','Inter')+T(500,240,'رسم توضيحي للاتجاه — بدون أرقام','#8C9AB8',20))
def ill_energy():
    barrel=lambda x:(f'<g transform="translate({x} 60)"><rect width="110" height="150" rx="16" fill="#14306E" stroke="#57A1EF" stroke-width="3"/>'
                     '<rect y="40" width="110" height="10" fill="#57A1EF" opacity=".6"/><rect y="100" width="110" height="10" fill="#57A1EF" opacity=".6"/></g>')
    return svg(1000,250,barrel(60)+barrel(190)+f'<g transform="translate(360 0)">{candles(8,22,600,230,1.6,2.4)}</g>'+T(660,30,'تقلبات الطاقة','#C9D6F0',24))
def ill_map():
    return svg(1000,300,'<rect x="20" y="20" width="960" height="260" rx="20" fill="rgba(0,5,26,.5)" stroke="rgba(87,161,239,.3)"/>'
      +''.join(f'<circle cx="{60+i*40}" cy="{60+j*40}" r="2" fill="#57A1EF" opacity=".25"/>' for i in range(23) for j in range(6))
      +'<path d="M150 90 Q260 70 330 120 T520 170 Q640 200 760 190 L860 230" fill="none" stroke="#3977D5" stroke-width="3" opacity=".7"/>'
      +f'<circle cx="230" cy="85" r="16" fill="{RED}"/><circle cx="230" cy="85" r="36" fill="none" stroke="{RED}" stroke-width="3" opacity=".6"/>'+T(230,140,'جنوب لبنان','#FCFCFC',26,800)
      +f'<circle cx="790" cy="200" r="16" fill="{RED}"/><circle cx="790" cy="200" r="40" fill="none" stroke="{RED}" stroke-width="3" opacity=".6"/>'+T(790,260,'مضيق هرمز','#FCFCFC',26,800)
      +T(500,52,'رسم توضيحي غير مقياسي','#8C9AB8',20))
def page(n,cls,body): return f'<section class="pg {cls}" id="p{n}"><div class="aura"></div><div class="hdr"><img src="{LOGO}"><span class="no">{n:02d}/07</span></div><main>{body}</main><div class="ftr"><span dir="ltr">LIQUIDITY GROUP | @emullax</span></div></section>'
def tag(g): return '' if not g else ('<em class="tag ok">' if g=='مؤكد' else '<em class="tag">')+g+'</em>'
def pts(items): return '<ul class="pts">'+''.join('<li>'+t+tag(g)+'</li>' for t,g in items)+'</ul>'
U='غير مؤكد'; R='تقارير'
P=[]
P.append(page(1,'cover',f'<div class="ill big">{svg(1000,470,fed)}</div><h1>🔴 التضخم الأمريكي<br><span>يشعل الأسواق!</span></h1><p class="sub">الفيدرالي تحت الضغط… والتوترات الجيوسياسية تزيد المخاطر.</p><div class="swipe">اسحب للتفاصيل ←</div>'))
P.append(page(2,'sl',f'<div class="ttl"><span class="en" dir="ltr">US INFLATION 🇺🇸</span><h2>هل يعود الفيدرالي لرفع الفائدة؟</h2></div><div class="ill">{ill_cpi()}</div>'+pts([('تسارع التضخم الأمريكي خلال سبتمبر.',U),('ارتفاع أسعار البنزين يزيد الضغوط التضخمية.',''),('تزايد التوقعات بإمكانية رفع الفائدة مجدداً.','')])))
cards=[('تيميراوس','تزايد المبررات الداعمة لرفع الفائدة.',U),('ماري دالي','رفع الفائدة قد يكون ضرورياً لكنه ليس وشيكاً.',''),('غولزبي','نحتاج بيانات إضافية قبل اتخاذ القرار.',U),('الكتاب البيج','ضغوط سعرية قوية في نصف مناطق الفيدرالي.',U)]
P.append(page(3,'sl','<div class="ttl"><span class="en" dir="ltr">FED SPEAKERS</span><h2>الفيدرالي يرسل إشارات تحذيرية!</h2></div><div class="cards">'+''.join(f'<div class="card"><b>{a}{f"<em class=tag>{g}</em>" if g else ""}</b><p>{t}</p></div>' for a,t,g in cards)+'</div>'))
P.append(page(4,'sl',f'<div class="ttl"><span class="en" dir="ltr">ENERGY ⛽</span><h2>الطاقة تعود للواجهة!</h2></div><div class="ill">{ill_energy()}</div>'+pts([('أسعار البنزين الأمريكية أعلى بنحو <span dir="ltr">33%</span> سنوياً.',U),('توقعات بعقود لتوريد الديزل الروسي إلى الولايات المتحدة.',U),('مخاطر اضطرابات إمدادات الطاقة العالمية.','')])))
P.append(page(5,'sl',f'<div class="ttl"><span class="en" dir="ltr">GEOPOLITICS 🌍</span><h2>التوترات ترفع مخاطر الأسواق!</h2></div><div class="ill">{ill_map()}</div>'+pts([('تقارير عن هجوم على سفينتين في مضيق هرمز.','مؤكد'),('تهديدات إسرائيلية بتوسيع العمليات في جنوب لبنان.',U),('احتمالات زيادة التقلبات في النفط والذهب.','')])))
mk=[('🥇','XAUUSD','الذهب','التوترات تدعم الطلب على الملاذات الآمنة، بينما ارتفاع الفائدة قد يضغط على الذهب.'),('💵','DXY','الدولار','توقعات التشديد النقدي قد تدعم الدولار.'),('📉','NASDAQ & S&P 500','الأسهم','احتمالات ارتفاع الفائدة قد تزيد الضغوط على الأسهم.'),('🛢️','WTI & BRENT','النفط','مخاطر الإمدادات قد تزيد تقلبات أسعار النفط.')]
P.append(page(6,'sl','<div class="ttl"><span class="en" dir="ltr">MARKET IMPACT 📊</span><h2>من المستفيد ومن المتضرر؟</h2></div><div class="grid">'+''.join(f'<div class="card mk"><div class="mh"><span class="e">{e}</span><b dir="ltr">{s}</b><i>{a}</i><span class="arr">⇅</span></div><p>{t}</p></div>' for e,s,a,t in mk)+'</div><p class="note">قراءة احتمالية، مو توقع اتجاه مؤكد.</p>'))
P.append(page(7,'end',f'<div class="ill endbg">{svg(1000,300,candles(11,36,1000,300,.8,3,.5))}</div><img class="biglogo" src="{LOGO}"><h1 class="oh">السوق ما يتحرك من فراغ…<br><span>افهم الخبر قبل لا تدخل الصفقة!</span></h1><p class="sub c">تابع EMULLAX للحصول على تحليلات الأسواق، الأخبار الاقتصادية، والمحتوى التعليمي في التداول.</p><div class="follow" dir="ltr">FOLLOW @emullax</div><div class="lg">LIQUIDITY GROUP 🇰🇼</div><div class="tl" dir="ltr">No explanation. Just results. 📈🖤</div>'))
css=open(SK+'/fonts.css').read().replace('url(assets/',f'url(file://{SK}/')+open('base.css').read()+open('extra.css').read()
open('carousel.html','w').write(f'<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>{css}</style></head><body>{"".join(P)}</body></html>');print('ok')
