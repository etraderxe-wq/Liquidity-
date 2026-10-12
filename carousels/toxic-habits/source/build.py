# «5 عادات سامة» — 7-page carousel, EMULLAX blue identity. Same HTML renders 4:5 slides and 9:16 reel frames.
import random
SK = '/home/user/Liquidity-/.claude/skills/emullax-carousel/assets'
LOGO = 'file:///home/user/Liquidity-/brand/logo-gradient.png'
UP, DN, RED = '#93F9FF', '#3977D5', '#FF5C6C'

def cs(seq, w, h, pad=10, step=None, cols=None):
    """seq: list of (o,h,l,c,color?) in 0..100 price space → svg candles"""
    n = len(seq); step = step or (w - 2 * pad) / n; Y = lambda v: h - pad - v / 100 * (h - 2 * pad); out = []
    for i, c in enumerate(seq):
        o, hi, lo, cl = c[:4]; col = c[4] if len(c) > 4 else (UP if cl >= o else DN); x = pad + step * (i + .5)
        out.append(f'<line x1="{x:.1f}" x2="{x:.1f}" y1="{Y(hi):.1f}" y2="{Y(lo):.1f}" stroke="{col}" stroke-width="2.5"/>'
                   f'<rect x="{x - step * .32:.1f}" y="{Y(max(o, cl)):.1f}" width="{step * .64:.1f}" height="{max(abs(Y(o) - Y(cl)), 2):.1f}" fill="{col}" rx="1.5"/>')
    return ''.join(out), Y, step
def walk(seed, n, start, drift, vol, color=None):
    r = random.Random(seed); p = start; out = []
    for _ in range(n):
        o = p; c = max(3, min(97, o + drift + r.gauss(0, vol))); hi = max(o, c) + abs(r.gauss(0, vol * .5)); lo = min(o, c) - abs(r.gauss(0, vol * .5))
        out.append((o, min(99, hi), max(1, lo), c) + ((color,) if color else ())); p = c
    return out
def svg(w, h, inner): return f'<svg viewBox="0 0 {w} {h}" width="100%" height="{h}" preserveAspectRatio="xMidYMid meet" style="direction:ltr">{inner}</svg>'
T = lambda x, y, s, txt, col='#C9D6F0', size=22, w=700, anchor='middle': f'<text x="{x}" y="{y}" fill="{col}" font-size="{size}" font-weight="{w}" text-anchor="{anchor}" font-family="Tajawal">{txt}</text>'

# ---------- illustrations ----------
def ill_cover():
    c, Y, st = cs(walk(4, 38, 82, -1.9, 3.2) , 1000, 420)
    trader = ('<g transform="translate(140 300)"><ellipse cx="0" cy="190" rx="150" ry="40" fill="#000310" opacity=".7"/>'
              '<path d="M-120 200q0-110 120-120 120 10 120 120z" fill="#030B24" stroke="#57A1EF" stroke-width="3"/>'
              '<circle cx="0" cy="40" r="52" fill="#030B24" stroke="#57A1EF" stroke-width="3"/>'
              '<path d="M-40 10q40-40 80 0" stroke="#93F9FF" stroke-width="4" fill="none" opacity=".5"/></g>')
    glow = '<defs><linearGradient id="fall" x1="0" x2="1"><stop offset="0" stop-color="#57A1EF" stop-opacity=".0"/><stop offset="1" stop-color="#FF5C6C" stop-opacity=".25"/></linearGradient></defs><rect x="0" y="0" width="1000" height="420" fill="url(#fall)"/>'
    return svg(1000, 520, glow + c + f'<path d="M30 {Y(80)} L 990 {Y(14)}" stroke="{RED}" stroke-width="3" stroke-dasharray="10 10" opacity=".7"/>' + trader)
def ill_revenge():
    a = walk(2, 12, 70, -3.4, 2.4, RED); b = walk(9, 10, a[-1][3], .9, 1.5)
    c, Y, st = cs(a + b, 1000, 230)
    xm = 10 + st * 12
    return svg(1000, 250, c + f'<line x1="{xm}" x2="{xm}" y1="6" y2="226" stroke="#C9D6F0" stroke-dasharray="6 8"/>'
               + T(xm / 2, 30, 0, 'قرارات من القهر', RED, 26, 800) + T(xm + (1000 - xm) / 2, 30, 0, 'انضباط وخطة', UP, 26, 800))
def ill_stop():
    a, Ya, s1 = cs([(70, 74, 64, 66), (66, 70, 58, 60), (60, 63, 50, 52)], 440, 230, step=60)
    b, Yb, s2 = cs([(70, 74, 64, 66), (66, 70, 58, 60), (60, 63, 50, 52), (52, 55, 40, 42, RED), (42, 46, 28, 30, RED), (30, 34, 14, 16, RED)], 440, 230, step=60)
    left = f'<g>{a}<line x1="0" x2="440" y1="{Ya(56)}" y2="{Ya(56)}" stroke="{RED}" stroke-width="3" stroke-dasharray="10 6"/><rect x="250" y="{Ya(70)}" width="150" height="{Ya(56) - Ya(70)}" fill="{RED}" opacity=".18"/>{T(330, Ya(56) + 34, 0, "خسارة صغيرة محددة", RED, 24)}</g>'
    right = f'<g transform="translate(560 0)">{b}<rect x="370" y="{Yb(70)}" width="50" height="{Yb(14) - Yb(70)}" fill="{RED}" opacity=".22"/>{T(250, 30, 0, "بدون وقف = خسارة تتضخم", RED, 24)}</g>'
    return svg(1000, 250, left + '<line x1="500" x2="500" y1="10" y2="230" stroke="#57A1EF" opacity=".35"/>' + right)
def ill_fomo():
    a = walk(5, 10, 30, .8, 1.6); a += [(a[-1][3], 88, a[-1][3] - 1, 84), (84, 90, 70, 72, DN), (72, 74, 58, 60, DN)]
    c, Y, st = cs(a, 1000, 230)
    xe = 10 + st * 10.5
    return svg(1000, 250, c + f'<circle cx="{xe + st * .5}" cy="{Y(88)}" r="14" fill="none" stroke="{RED}" stroke-width="4"/>'
               + T(xe - 120, Y(88) + 8, 0, 'دخول متأخر ←', RED, 26, 800) + T(200, 40, 0, 'الحركة الأساسية صارت قبل', '#C9D6F0', 24))
def ill_lev():
    bar = lambda y, w, col, a, b: (f'<rect x="40" y="{y}" width="920" height="44" rx="22" fill="rgba(87,161,239,.12)"/><rect x="{960 - w}" y="{y}" width="{w}" height="44" rx="22" fill="{col}"/>'
                                   + T(940, y - 14, 0, a, '#FCFCFC', 26, 800, 'end') + T(60, y - 14, 0, b, col, 24, 800, 'start'))
    return svg(1000, 250, bar(60, 90, UP, 'صفقة بمخاطرة محسوبة', 'خسارة محتملة صغيرة') + bar(170, 830, RED, 'حجم مبالغ فيه', 'قريب من التصفية'))
def ill_over():
    r = random.Random(3); dots = ''.join(f'<circle cx="{r.uniform(20, 460):.0f}" cy="{r.uniform(40, 220):.0f}" r="9" fill="{r.choice([UP, RED, DN])}" opacity=".85"/>' for _ in range(34))
    c, Y, st = cs(walk(8, 14, 25, 3.6, 1.8), 440, 230)
    pts = [(2, 'دخول'), (8, 'دخول'), (12, 'دخول')]
    marks = ''.join(f'<circle cx="{10 + st * (i + .5):.0f}" cy="{Y(25 + 3.6 * i) + 20:.0f}" r="11" fill="none" stroke="{UP}" stroke-width="4"/>' for i, _ in pts)
    return svg(1000, 250, dots + T(240, 26, 0, 'صفقات عشوائية كثيرة', RED, 24) + '<line x1="500" x2="500" y1="10" y2="230" stroke="#57A1EF" opacity=".35"/>'
               + f'<g transform="translate(560 10)">{c}{marks}</g>' + T(780, 26, 0, 'صفقات قليلة حسب الخطة', UP, 24))

def page(n, cls, body):
    return f'''<section class="pg {cls}" id="p{n}"><div class="aura"></div>
<div class="hdr"><img src="{LOGO}"><span class="no">{n}/7</span></div>
<main>{body}</main>
<div class="ftr"><span dir="ltr">LIQUIDITY GROUP | @emullax</span></div></section>'''
def habit(n, en, ar, when, fixes, quote, ill):
    w = ''.join(f'<p>{x}</p>' for x in when); f = ''.join(f'<li>{x}</li>' for x in fixes)
    return page(n, 'habit', f'''<div class="ttl"><span class="en" dir="ltr">{en}</span><h2>{ar}</h2></div>
<div class="ill">{ill}</div>
<div class="sec"><h3>متى تصير هالعادة؟</h3>{w}</div>
<div class="sec fix"><h3>شلون تتخلص منها؟</h3><ul>{f}</ul></div>
<div class="quote">{quote}</div>''')
P = []
P.append(page(1, 'cover', f'''<div class="ill big">{ill_cover()}</div>
<h1><span class="n" dir="ltr">5</span> عادات سامة<br>تدمّر حسابك بالتداول!</h1>
<p class="sub">“يمكن مشكلتك مو بالاستراتيجية… يمكن المشكلة بعاداتك!”</p>
<div class="brandline" dir="ltr">LIQUIDITY GROUP | @emullax</div>
<div class="swipe">اسحب وتعرف على الأخطاء والحلول ←</div>'''))
P.append(habit(2, 'REVENGE TRADING', 'التداول الانتقامي',
  ['لما تخسر صفقة وتحاول تعوضها بأسرع وقت ممكن.', 'تدخل صفقات من القهر أو الإحباط، وتبدأ تزيد المخاطرة بدون تحليل واضح.', 'تقنع نفسك إن الصفقة الياية راح ترجع كل خسائرك، لكن ممكن تدخل بدوامة خسائر أكبر.'],
  ['لا تدخل صفقة مباشرة بعد الخسارة.', 'خذ بريك لين تهدأ.', 'حدد حد خسارة يومي والتزم فيه.', 'اتبع خطتك مو مشاعرك.', 'مو شرط تعوض خسارتك بنفس اليوم.'],
  '“السوق مو مسؤول يعوضك عن قراراتك!”', ill_revenge()))
P.append(habit(3, 'NO STOP LOSS', 'التداول بدون وقف خسارة',
  ['لما ترفض تتقبل الخسارة، وتظل متأمل إن السوق يرجع لاتجاهك.', 'مرات تدخل بدون Stop Loss، ومرات تبعد الوقف كل ما السعر يقرب منه.', 'والنتيجة؟ خسارة صغيرة كان ممكن تتحكم فيها تتحول إلى خسارة كبيرة.'],
  ['حدد وقف الخسارة قبل الدخول.', 'اربط الوقف بتحليلك ومقدار المخاطرة.', 'لا تبعد الوقف بس عشان تهرب من الخسارة.', 'خاطر بنسبة صغيرة ومحددة من رأس المال.', 'إذا ما تقدر تحدد مخاطرتك، لا تدخل الصفقة.'],
  '“وقف الخسارة مو عدوك… هو اللي يحمي بقاءك بالسوق.”', ill_stop()))
P.append(habit(4, 'FOMO TRADING', 'الخوف من فوات الفرصة',
  ['لما تشوف السوق يتحرك بسرعة، وتحس إن لازم تدخل الحين وإلا بتضيع عليك الفرصة.', 'تشوف أرباح غيرك بالإنستقرام، أو شمعة قوية بالشارت، فتدخل بدون تحليل.', 'وغالباً تدخل بعد ما يكون جزء كبير من الحركة انتهى.'],
  ['جهز خطة تداول واضحة.', 'لا تدخل لمجرد أن السعر يتحرك بسرعة.', 'راجع شروط الدخول ونسبة العائد للمخاطرة.', 'إذا راحت الفرصة، انطر غيرها.', 'لا تقارن نتائجك بأرباح غيرك.'],
  '“الفرص ما تخلص… لكن رأس مالك ممكن يخلص!”', ill_fomo()))
P.append(habit(5, 'OVERLEVERAGING', 'المبالغة في الرافعة المالية',
  ['لما تفتح صفقة بحجم أكبر من قدرة حسابك.', 'يمكن تبي تربح بسرعة، تضاعف حساب صغير، أو تعوض خسارة سابقة.', 'لكن الرافعة المالية تضخم الأرباح والخسائر، وحركة بسيطة ضدك ممكن تسبب خسارة كبيرة أو تصفية الحساب.'],
  ['لا تستخدم أعلى رافعة لمجرد أنها متاحة.', 'احسب حجم العقد بناءً على وقف الخسارة.', 'حدد المبلغ اللي تتحمل خسارته قبل الدخول.', 'لا تضاعف حجم الصفقة لتعويض خسائرك.', 'افهم متطلبات الهامش ومخاطر التصفية.'],
  '“مو شطارة تدخل بلوت كبير… الشطارة تعرف شكثر تقدر تخسر.”', ill_lev()))
P.append(habit(6, 'OVERTRADING', 'الإفراط في التداول',
  ['لما تدخل صفقات كثيرة بدون فرص واضحة.', 'يمكن من الملل، أو لأنك تبي تستفيد من كل حركة بالسوق، أو لأنك تحاول تعوض خسارتك.', 'لكن كثرة الصفقات تزيد التكاليف والضغط النفسي واحتمالية الأخطاء.'],
  ['حدد عدد الصفقات المسموح لك يومياً.', 'ركز على الفرص عالية الجودة.', 'جهز خطتك قبل بداية الجلسة.', 'وقف التداول عند وصولك لحد الخسارة اليومي.', 'سجل صفقاتك وراجع أخطاءك المتكررة.'],
  '“مو كل حركة بالسوق تحتاج منك صفقة!”', ill_over()))
P.append(page(7, 'offer', f'''<img class="biglogo" src="{LOGO}">
<h1 class="oh">طوّر تداولك… واستفد من الكاش باك!</h1>
<div class="ex" dir="ltr">EXNESS CASHBACK</div>
<div class="pct">كاش باك يصل إلى <span dir="ltr">60%</span></div>
<ul class="perks"><li>استشارة تداول مجانية لمدة ساعة.</li><li>شرح تعليمي لاستراتيجية CRT.</li><li>متابعة تعليمية لتطوير مهاراتك.</li><li>كاش باك حسب نوع الحساب وشروط الأهلية.</li></ul>
<div class="cta"><b>تبي التفاصيل؟</b><span>اكتب «كاش باك» بالكومنت 👇</span><small>وسنرسل لك طريقة التسجيل بالخاص.</small></div>
<div class="handle" dir="ltr">@emullax</div>
<p class="disc">التداول ينطوي على مخاطر. الكاش باك يخضع للشروط ولا يضمن الربح أو تعويض الخسائر.</p>'''))
css = open(SK + '/fonts.css').read().replace('url(assets/', f'url(file://{SK}/') + open('style.css').read()
open('carousel.html', 'w').write(f'<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>{css}</style></head><body>{"".join(P)}</body></html>')
print('ok')
