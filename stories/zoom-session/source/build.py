# «LIVE ZOOM SESSION» — 3 Instagram stories (hook / announcement / registration), EMULLAX blue identity.
import random
SK = '/home/user/Liquidity-/.claude/skills/emullax-carousel/assets'
LOGO = 'file:///home/user/Liquidity-/brand/logo-gradient.png'
def candles(seed, n=30, w=1080, h=1920, op=.13, y0=.35, amp=.35):
    r = random.Random(seed); p = 50; step = w / n; o = [f'<svg class="cdl" viewBox="0 0 {w} {h}" width="{w}" height="{h}" style="opacity:{op}">']
    Y = lambda v: h * y0 + (50 - v) / 50 * h * amp
    for i in range(n):
        a = p; c = a + r.gauss(.15, 3); hi = max(a, c) + abs(r.gauss(0, 1.6)); lo = min(a, c) - abs(r.gauss(0, 1.6)); p = c
        x = i * step + step / 2; col = '#93F9FF' if c >= a else '#3977D5'
        o.append(f'<line x1="{x:.1f}" x2="{x:.1f}" y1="{Y(hi):.1f}" y2="{Y(lo):.1f}" stroke="{col}" stroke-width="2"/><rect x="{x-step*.3:.1f}" y="{Y(max(a,c)):.1f}" width="{step*.6:.1f}" height="{max(abs(Y(a)-Y(c)),2):.1f}" fill="{col}"/>')
    for k in (.18, .52, .86):
        o.append(f'<line x1="0" x2="{w}" y1="{h*k:.0f}" y2="{h*k:.0f}" stroke="#57A1EF" stroke-width="1.5" stroke-dasharray="10 14" opacity=".5"/>')
    return ''.join(o) + '</svg>'
def frame(i, body, seed):
    return f'''<section class="st" id="s{i}"><div class="bgc">{candles(seed)}</div><div class="glow"></div><div class="vig"></div>
  <div class="top"><div class="tag"><i></i>LIVE ZOOM SESSION</div><div class="no">0{i}<span>/03</span></div></div>
  <main>{body}</main>
  <div class="foot"><img src="{LOGO}"><span>LIQUIDITY GROUP | EMULLAX</span></div></section>'''
CHK = '<svg viewBox="0 0 40 40" width="40"><circle cx="20" cy="20" r="18" fill="none" stroke="#93F9FF" stroke-width="3"/><path d="M12 20l6 6 11-12" fill="none" stroke="#93F9FF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
EQ = '<svg viewBox="0 0 900 170" width="900" height="170" class="eq"><path d="M10 120 90 70 150 110 230 40 290 130 370 60 430 140 510 50 570 120 650 80 710 150 790 70 890 110" fill="none" stroke="#57A1EF" stroke-width="6" stroke-linejoin="round"/><path d="M10 85H890" stroke="#93F9FF" stroke-width="2" stroke-dasharray="8 10" opacity=".7"/></svg>'
S = []
S.append(frame(1, f'''
<h1>تعرف تحلل…<br><em>بس ليش للحين تخسر؟</em></h1>
<div class="qs">
  <div class="q">{CHK}<span>تعلمت <b dir="ltr">ICT</b>؟</span></div>
  <div class="q">{CHK}<span>تعرف <b dir="ltr">FVG</b> و<b dir="ltr">Order Block</b>؟</span></div>
  <div class="q">{CHK}<span>تحدد الدخول والستوب والهدف؟</span></div>
</div>
<div class="unst"><p>بس نتائجك للحين <em>مو ثابتة؟</em></p>{EQ}</div>
<div class="close"><p>يمكن المشكلة مو باستراتيجيتك…</p><p class="c2">يمكن بطريقة تفكيرك.</p></div>''', 11))
TOP = ['شلون تتعامل مع الخسارة؟', 'ليش الاستمرارية أهم من الربح السريع؟', 'شلون تبني عقلية متداول منضبط؟', 'شلون تقيّم أداءك بطريقة صحيحة؟', 'شلون توقف التداول الانتقامي؟']
S.append(frame(2, f'''
<h1 class="h2">غيّر نظرتك للتداول…<br><em>تتغيّر نتائجك</em></h1>
<div class="live"><i></i>LIVE ZOOM SESSION</div>
<div class="when"><div class="date"><small>التاريخ</small><b>السبت 17 أكتوبر 2026</b></div><div class="time"><small>الوقت</small><b class="blank"></b></div></div>
<div class="topics"><h3>جلسة تعليمية مجانية عن:</h3>{''.join(f'<div class="t"><span class="n" dir="ltr">0{k+1}</span><span>{t}</span></div>' for k, t in enumerate(TOP))}</div>
<div class="host"><span>مع <b dir="ltr">EMULLAX</b></span><span class="xp" dir="ltr">+8 YEARS TRADING EXPERIENCE</span></div>''', 22))
seats = ''.join('<i></i>' for _ in range(30))
S.append(frame(3, f'''
<h1 class="h3"><span class="n30" dir="ltr">30</span> مقعد مجاني فقط</h1>
<div class="seats">{seats}</div>
<p class="txt">إذا تعبت من تكرار نفس الأخطاء بالتداول، هالجلسة ممكن تساعدك <em>تغيّر طريقة تفكيرك.</em></p>
<div class="steps"><div class="s"><span class="n" dir="ltr">1</span><span>سجّل اهتمامك من الرابط الموجود بالستوري.</span></div>
<div class="s"><span class="n" dir="ltr">2</span><span>راح يوصلك رابط حضور <b dir="ltr">Zoom</b> على إيميلك قبل بداية الجلسة.</span></div></div>
<div class="free" dir="ltr">FREE REGISTRATION</div>
<div class="cta">اضغط هنا وسجّل مكانك</div>
<div class="arrow"><svg viewBox="0 0 60 70" width="54"><path d="M30 4v56M10 40l20 22 20-22" fill="none" stroke="#93F9FF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
<div class="sticker"></div>''', 33))
css = open('style.css').read()
open('stories.html', 'w').write(f'''<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><base href="file:///home/user/Liquidity-/.claude/skills/emullax-carousel/">
<link rel="stylesheet" href="file://{SK}/fonts.css"><style>{css}</style></head><body>{''.join(S)}</body></html>''')
print('ok')
