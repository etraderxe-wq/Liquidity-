SK='/home/user/Liquidity-/.claude/skills/emullax-carousel/assets'; LOGO='file:///home/user/Liquidity-/brand/logo-gradient.png'
UP,DN,RED='#93F9FF','#3977D5','#FF5C6C'
C=[[70,72,66,67],[67,68,60,61],[61,62,55,56],[56,61,53,60],[60,68,59,67],[67,74,66,73],[73,76,68,69],[69,70,60,61],[61,62,54,55],[55,58,54.5,57],
   [57,58,53.5,54],[54,55,48,49],[49,56,48.5,55],[55,55.5,45,46],[46,47,41,42],[42,48,41.5,47],[47,64,46.5,63],[63,68,62,66],[66,69,60,61],[61,62,55,56],
   [56,60,50,59],[59,70,58,69],[69,74,68,73],[73,79,72,78],[78,84,77,83]]
SSL,BSL,OLD,LH,RAID,MSS,ENTRY=53,76,3,12,14,16,20
# ---- definition checks
O,H,L,Cl=zip(*C)
assert min(L)==L[RAID] and L[RAID]<SSL and all(l>=SSL for l in L[:11]), 'raid'
assert all(c<=H[LH] for c in Cl[LH+1:MSS]) and Cl[MSS]>H[LH], 'MSS: first close above last lower high'
assert Cl[MSS]-O[MSS] >= 1.5*max(abs(Cl[i]-O[i]) for i in range(LH,MSS)), 'displacement'
FL,FH=H[MSS-1],L[MSS+1]; assert FL<FH, 'FVG'
assert L[ENTRY]<=FH and min(L[MSS+2:])>FL, 'retrace into FVG, not filled'
assert max(H[ENTRY:])>BSL and H[6]==BSL, 'target'
mir=lambda cs:[[100-o,100-l,100-h,100-c] for o,h,l,c in cs]
def chart(n, ann=(), W=1000, Hh=560, cs=C, bear=False, op=1):
    lo,hi=36,88; Y=lambda p:20+(hi-(100-p if bear else p))/(hi-lo)*(Hh-40) if False else 20+(hi-p)/(hi-lo)*(Hh-40)
    if bear: lo,hi=12,64; Y=lambda p:20+(hi-p)/(hi-lo)*(Hh-40)
    st=W/len(C); X=lambda i:st*(i+.5); o=[]
    for a in ann:
        k=a[0]
        if k=='fvg': o.append(f'<rect x="{X(a[1])-st*.45:.0f}" y="{Y(a[3]):.0f}" width="{st*(a[2]-a[1])+st*.9:.0f}" height="{Y(a[4])-Y(a[3]):.0f}" fill="rgba(147,249,255,.18)" stroke="#93F9FF" stroke-width="2" rx="4"/>')
    for i,(a,h,l,c) in enumerate(cs[:n]):
        col=UP if c>=a else DN
        o.append(f'<line x1="{X(i):.0f}" x2="{X(i):.0f}" y1="{Y(h):.0f}" y2="{Y(l):.0f}" stroke="{col if c>=a else "#6FA3F2"}" stroke-width="3"/><rect x="{X(i)-st*.3:.0f}" y="{Y(max(a,c)):.0f}" width="{st*.6:.0f}" height="{max(3,abs(Y(a)-Y(c))):.0f}" fill="{col}" rx="2" opacity="{op}"/>')
    for a in ann:
        k=a[0]
        if k=='line':
            _,i0,i1,p,lab,col,dy=a; o.append(f'<line x1="{X(i0):.0f}" x2="{X(i1):.0f}" y1="{Y(p):.0f}" y2="{Y(p):.0f}" stroke="{col}" stroke-width="3" stroke-dasharray="10 7"/>')
            if lab: o.append(f'<text x="{(X(i0)+X(min(i1,i0+6)))/2:.0f}" y="{Y(p)+dy:.0f}" fill="{col}" font-size="26" font-weight="800" font-family="Tajawal,Inter" text-anchor="middle" style="direction:ltr">{lab}</text>')
        if k=='num':
            _,i,p,t=a; o.append(f'<circle cx="{X(i):.0f}" cy="{Y(p):.0f}" r="26" fill="#93F9FF"/><text x="{X(i):.0f}" y="{Y(p)+10:.0f}" fill="#00051A" font-size="28" font-weight="900" text-anchor="middle" font-family="Inter,Tajawal">{t}</text>')
        if k=='lab':
            _,i,p,t,col=a; o.append(f'<text x="{X(i):.0f}" y="{Y(p):.0f}" fill="{col}" font-size="26" font-weight="800" text-anchor="middle" font-family="Tajawal" style="direction:ltr">{t}</text>')
        if k=='arrow':
            _,i,p,up=a; y0=Y(p)+(70 if up else -70); y1=Y(p)+(14 if up else -14)
            o.append(f'<line x1="{X(i):.0f}" x2="{X(i):.0f}" y1="{y0:.0f}" y2="{y1:.0f}" stroke="#FCFCFC" stroke-width="6"/><path d="M{X(i)-14:.0f} {y1+(14 if up else -14):.0f} L{X(i):.0f} {y1:.0f} L{X(i)+14:.0f} {y1+(14 if up else -14):.0f}" stroke="#FCFCFC" stroke-width="6" fill="none"/>')
    return f'<svg viewBox="0 0 {W} {Hh}" width="100%" height="{Hh}" style="direction:ltr">{"".join(o)}</svg>'
fvg=('fvg',MSS-1,ENTRY+1,FH,FL)
A_raid=[('line',OLD,RAID+1,SSL,'Sell-side Liquidity','#C9D6F0',40),('num',RAID,L[RAID]-5,'01')]
A_mss=[('line',LH,MSS,H[LH],'MSS','#FCFCFC',-14),('lab',MSS-2.8,62,'Displacement →',UP)]
A_full=A_raid+A_mss+[fvg,('num',MSS,H[MSS]+5,'02'),('num',ENTRY+1.6,FL-2,'03'),('arrow',ENTRY,L[ENTRY],True),('line',6,24,BSL,'Buy-side Liquidity · Target',UP,-14),('num',24,H[24]+5,'04')]
def page(n,body,cls='sl'): return f'<section class="pg {cls}" id="p{n}"><div class="aura"></div><div class="hdr"><img src="{LOGO}"><span class="no">{n:02d}/08</span></div><main>{body}</main><div class="ftr"><span dir="ltr">LIQUIDITY GROUP | @emullax</span></div></section>'
def head(step,en,ar): return f'<div class="ttl"><span class="en" dir="ltr">{en}</span><h2>{f"<b class=st>{step}</b>" if step else ""}{ar}</h2></div>'
P=[]
P.append(page(1,f'<div class="ill big bg">{chart(25,[],op=.55)}</div><div class="cv"><h1 dir="ltr">ICT 2022<br><span>MODEL</span></h1><p class="sub">3 خطوات لفهم نموذج الدخول</p><div class="flow"><span>سحب السيولة</span><i>←</i><span>تغير الهيكل</span><i>←</i><span>الدخول</span></div><div class="swipe">اسحب للتفاصيل ←</div></div>','cover'))
P.append(page(2,head('','HOW IT WORKS','شلون يشتغل نموذج ICT 2022؟')+'<p class="lead">النموذج يعتمد على 3 مراحل رئيسية:</p><div class="steps"><div><b>01</b>سحب السيولة <em>Liquidity Raid</em></div><div><b>02</b>تحول الهيكل السعري <em>MSS</em></div><div><b>03</b>الرجوع إلى فجوة القيمة العادلة <em>FVG</em></div></div>'+f'<div class="ill">{chart(25,[("num",RAID,L[RAID]-5,"01"),("num",MSS,H[MSS]+5,"02"),fvg,("num",ENTRY+1.6,FL-2,"03")],Hh=470)}</div>'))
P.append(page(3,head('01','LIQUIDITY RAID','سحب السيولة')+f'<div class="ill">{chart(15,A_raid)}</div><p class="body">ينزل السعر تحت قاع سابق ويسحب السيولة الموجودة أسفله، بما فيها أوامر وقف الخسارة.</p><div class="hl">مو كل كسر قاع يعني استمرار الهبوط!</div>'))
P.append(page(4,head('02','MSS + DISPLACEMENT','تغير الهيكل')+f'<div class="ill">{chart(18,A_raid+A_mss+[("num",MSS,H[MSS]+5,"02")])}</div><p class="body">بعد سحب السيولة، ننتظر اندفاعاً صعودياً قوياً يكسر آخر قمة هابطة مع إغلاق واضح فوقها.</p><div class="hl">نبي إغلاق يؤكد الكسر، مو مجرد ذيل شمعة.</div>'))
P.append(page(5,head('03','FVG ENTRY','الدخول من FVG')+f'<div class="ill">{chart(21,A_raid+A_mss+[fvg,("lab",ENTRY+2.6,(FL+FH)/2,"FVG",UP),("num",ENTRY+1.6,FL-2,"03"),("arrow",ENTRY,L[ENTRY],True)])}</div><p class="body">الاندفاع يترك فجوة قيمة عادلة. ننتظر رجوع السعر إلى المنطقة للبحث عن دخول شراء.</p><div class="hl">لا تطارد السعر… انتظر منطقتك.</div>'))
legend=lambda rows:'<div class="leg">'+''.join(f'<div><b>{a}</b>{t}</div>' for a,t in rows)+'</div>'
P.append(page(6,head('','BULLISH ICT 2022 MODEL','النموذج الصعودي الكامل')+f'<div class="ill">{chart(25,A_full,Hh=600)}</div>'+legend([('01','سحب سيولة البيع <em>Sell-side Raid</em>'),('02','اندفاع صعودي + <em>MSS</em>'),('03','الدخول من <em>FVG</em>'),('04','الهدف: سيولة الشراء <em>Buy-side</em>')])))
M=mir(C); mL=[100-h for h in H]; mH=[100-l for l in L]
A_bear=[('line',OLD,RAID+1,100-SSL,'Buy-side Liquidity','#C9D6F0',-16),('num',RAID,mH[RAID]+5,'01'),('line',LH,MSS,mL[LH],'MSS','#FCFCFC',36),('lab',MSS-2.8,36,'Displacement →',UP),
        ('fvg',MSS-1,ENTRY+1,100-FL,100-FH),('num',MSS,mL[MSS]-5,'02'),('num',ENTRY+1.6,100-FL+2,'03'),('arrow',ENTRY,mH[ENTRY],False),('line',6,24,100-BSL,'Sell-side Liquidity · Target',UP,40),('num',24,mL[24]-5,'04')]
P.append(page(7,head('','BEARISH ICT 2022 MODEL','النموذج الهبوطي الكامل')+'<p class="lead">نفس النموذج، لكن بالاتجاه المعاكس.</p>'+f'<div class="ill">{chart(25,A_bear,Hh=560,cs=M,bear=True)}</div>'+legend([('01','سحب سيولة الشراء فوق قمة سابقة.'),('02','اندفاع هبوطي مع <em>MSS</em>.'),('03','الرجوع إلى <em>Bearish FVG</em>.'),('04','استهداف سيولة البيع أسفل القيعان.')])))
P.append(page(8,head('','CHECKLIST','قبل لا تدخل الصفقة… تأكد!')+'<ul class="ck">'+''.join(f'<li>{t}</li>' for t in ['الاتجاه المتوقع واضح.','تم سحب السيولة.','حدث <em>MSS</em> مع <em>Displacement</em>.','رجع السعر إلى <em>FVG</em>.'])+'</ul><div class="rule" dir="ltr">No Raid. No Trade.<br>No Displacement. No Trade.</div>'
  +'<div class="offer"><b>تداول تحت وكالتي في <span dir="ltr">Exness</span> واستفد من:</b><ul><li>كاش باك يومي يصل إلى <span dir="ltr">60%</span> وفق شروط الأهلية.</li><li>استشارة تداول مجانية لمدة ساعة.</li><li>دورة <span dir="ltr">CRT</span> تعليمية.</li><li>متابعة تعليمية.</li></ul><small>الشرط: التسجيل تحت وكالة EMULLAX للاستفادة من العرض وفق شروطه.</small><div class="cta">اكتب «كاش باك» بالتعليقات وراح توصلك التفاصيل.</div></div><p class="disc">محتوى تعليمي، والنموذج مو مضمون الربح. التداول ينطوي على مخاطر.</p>','end'))
css=open(SK+'/fonts.css').read().replace('url(assets/',f'url(file://{SK}/')+open('base.css').read()+open('extra.css').read()
open('carousel.html','w').write(f'<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>{css}</style></head><body>{"".join(P)}</body></html>');print('ok · FVG',FL,FH)
