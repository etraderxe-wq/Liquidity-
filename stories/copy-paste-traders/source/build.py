# «بورصة النسخ واللصق | COPY & PASTE TRADERS» — 7 Instagram stories, EMULLAX blue identity.
import random, html
SK = '/home/user/Liquidity-/.claude/skills/emullax-carousel/assets'
LOGO = 'file:///home/user/Liquidity-/brand/logo-gradient.png'

def candles(seed, n=34, w=1080, h=700, flat_from=None, op=.22):
    r = random.Random(seed); p = 50; step = w / n; out = [f'<svg class="cdl" viewBox="0 0 {w} {h}" width="{w}" height="{h}" style="opacity:{op}">']
    Y = lambda v: h - (v - 10) / 80 * h
    for i in range(n):
        o = p; c = o + r.gauss(.3, 3.2) if flat_from is None or i < flat_from else o; hi = max(o, c) + abs(r.gauss(0, 1.8)); lo = min(o, c) - abs(r.gauss(0, 1.8)); p = c
        if flat_from is not None and i >= flat_from: hi, lo = o + .4, o - .4
        x = i * step + step / 2; col = '#93F9FF' if c >= o else '#3977D5'
        out.append(f'<line x1="{x:.1f}" x2="{x:.1f}" y1="{Y(hi):.1f}" y2="{Y(lo):.1f}" stroke="{col}" stroke-width="2"/><rect x="{x-step*.3:.1f}" y="{Y(max(o,c)):.1f}" width="{step*.6:.1f}" height="{max(abs(Y(o)-Y(c)),2):.1f}" fill="{col}"/>')
    for k in range(3):   # liquidity levels
        yy = h * (.25 + .25 * k); out.append(f'<line x1="0" x2="{w}" y1="{yy}" y2="{yy}" stroke="#57A1EF" stroke-width="1.5" stroke-dasharray="10 12" opacity=".6"/>')
    return ''.join(out) + '</svg>'

def stamp(txt, rot=-12, size=96, color='#FCFCFC'):
    return f'<div class="stamp" style="transform:rotate({rot}deg);font-size:{size}px;color:{color};border-color:{color}"><span>{txt}</span></div>'

def frame(i, kicker, body, extra_bg=''):
    return f'''<section class="st" id="s{i}">
  <div class="bgc">{extra_bg}</div><div class="vig"></div><div class="scan"></div>
  <div class="top"><div class="series"><b>COPY &amp; PASTE TRADERS</b><span>بورصة النسخ واللصق</span></div><div class="no">0{i}<i>/07</i></div></div>
  <div class="kick">{kicker}</div>
  <main>{body}</main>
  <div class="foot"><img src="{LOGO}"><span>LIQUIDITY GROUP | EMULLAX</span></div>
</section>'''

S = []
# 01 — market closed
S.append(frame(1, 'إعلان هام 🚨', f'''
<div class="hero1">{candles(1, flat_from=22, op=.5, h=470)}{stamp('MARKET CLOSED', -11, 104)}</div>
<p class="big">سوق التداول اليوم عطلة…</p>
<p class="big">بس سوق النسخ واللصق بالكويت <em>فاتح 24 ساعة!</em> 😂💀</p>
<div class="neon">COPY &amp; PASTE: OPEN 24/7</div>''', candles(11, op=.12, h=1920)))
# 02 — sources
cards = [('Michael J. Huddleston — ICT', 'book'), ('@theotetrader', 'at'), ('@themmxmtrader', 'at')]
icon = {'book': '<svg viewBox="0 0 48 48" width="54"><path d="M8 10h14a4 4 0 0 1 4 4v26a3 3 0 0 0-3-3H8zM40 10H26a4 4 0 0 0-4 4v26a3 3 0 0 1 3-3h15z" fill="none" stroke="#93F9FF" stroke-width="3" stroke-linejoin="round"/></svg>',
        'at': '<svg viewBox="0 0 48 48" width="54"><circle cx="24" cy="24" r="8" fill="none" stroke="#93F9FF" stroke-width="3"/><path d="M32 16v11a5 5 0 0 0 10 0v-3A18 18 0 1 0 31 40" fill="none" stroke="#93F9FF" stroke-width="3" stroke-linecap="round"/></svg>'}
S.append(frame(2, 'المصادر الأصلية 📚', '''
<p class="mid">قبل لا تسمع سوالف الاختراعات…</p>
<p class="mid">تعرف على بعض الأسماء اللي تقدر ترجع لشروحاتهم ومحتواهم الأصلي:</p>
<div class="cards">''' + ''.join(f'<div class="card src"><div class="ic">{icon[k]}</div><b dir="ltr">{html.escape(n)}</b></div>' for n, k in cards) + '''</div>
<p class="mid hl">تعلم من المصدر… مو من اللي يغيّر الاسم ويقول أنا اخترعته!</p>''', candles(2, op=.16, h=1920)))
# 03 — customs
box = lambda label, cls='': f'''<div class="box {cls}"><svg viewBox="0 0 300 260" width="300"><path d="M150 20 280 75 150 130 20 75z" fill="#1F4590"/><path d="M20 75 150 130v115L20 190z" fill="#0B1E4E"/><path d="M280 75 150 130v115l130-55z" fill="#143272"/><path d="M85 47 215 102" stroke="#93F9FF" stroke-width="10" opacity=".55"/></svg><div class="lbl" dir="ltr">{label}</div></div>'''
S.append(frame(3, 'الجمارك الكويتية 🇰🇼', f'''
<p class="mid">الاستراتيجية تطلع من برّه باسم…</p>
<div class="boxes">{box('NEW INVENTION', 'nb')}<div class="arrow"><svg viewBox="0 0 160 60" width="150"><path d="M150 30H20M48 8 18 30l30 22" fill="none" stroke="#93F9FF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg></div>{box('ORIGINAL STRATEGY')}</div>
<div class="madein">{stamp('MADE IN KUWAIT', -8, 40, '#93F9FF')}</div>
<p class="mid">تدخل الكويت، تمر الجمارك…</p>
<p class="big">تطلع باسم ثاني ومعاها <em>شهادة ميلاد كويتية!</em> 😂💀</p>''', candles(3, op=.12, h=1920)))
# 04 — Newton of candles
trader = '''<svg viewBox="0 0 420 620" width="380" class="trader">
<defs><linearGradient id="suit" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#14306E"/><stop offset="1" stop-color="#030B24"/></linearGradient></defs>
<circle cx="210" cy="120" r="70" fill="#0B1E4E" stroke="#57A1EF" stroke-width="4"/>
<path d="M150 98q60-56 120 0" fill="none" stroke="#93F9FF" stroke-width="6" opacity=".6"/>
<path d="M60 610V330q0-120 150-130 150 10 150 130v280z" fill="url(#suit)" stroke="#57A1EF" stroke-width="4"/>
<path d="M175 205 210 300 245 205" fill="#FCFCFC"/><path d="M200 222h20l-6 120-4 18-4-18z" fill="#93F9FF"/>
<path d="M175 205l35 95-55-60zM245 205l-35 95 55-60z" fill="#0B1E4E" stroke="#57A1EF" stroke-width="3"/>
<path d="M360 360q60-120 30-230" fill="none" stroke="#57A1EF" stroke-width="26" stroke-linecap="round"/>
<circle cx="390" cy="118" r="22" fill="#0B1E4E" stroke="#57A1EF" stroke-width="4"/>
</svg>'''
S.append(frame(4, 'نيوتن الشموع 🍎', f'''
<div class="hero4"><div class="spot"></div>{candles(4, op=.55, h=380, n=26)}{trader}<div class="apple">🍎</div><div class="bulb">💡</div></div>
<p class="mid">وبكل ثقة يقولك:</p>
<p class="quote">بعد سنوات من البحث والتطوير، ابتكرت استراتيجية خاصة فيني!</p>
<p class="big">ابتكرت شنو يا <em>نيوتن الشموع؟!</em> 😂</p>
<p class="mid">حتى المصطلحات توك حافظها الأسبوع اللي طاف!</p>''', candles(14, op=.1, h=1920)))
# 05 — exclusive agent
invoice = '<div class="inv"><div class="it" dir="ltr">INVENTION FEES</div>' + ''.join(f'<div class="ln"><i style="width:{w}%"></i><u></u></div>' for w in (70, 52, 64, 44)) + '<div class="tot"><i></i><u></u></div></div>'
S.append(frame(5, 'الوكيل الحصري 💸', f'''
<div class="hero5">{box('ORDER BLOCK', 'ob')}<div class="sticker" dir="ltr">EXCLUSIVE<br>KUWAIT EDITION</div>{invoice}</div>
<p class="mid">المعلومة تلقاها بالمصادر الأصلية…</p>
<p class="mid">بس النسخة الكويتية عليها <em>رسوم اختراع واكتشاف!</em></p>
<p class="big">يعني حتى الـ Order Block صار له وكيل حصري بالكويت؟! 💀😂</p>''', candles(5, op=.12, h=1920)))
# 06 — clear message
S.append(frame(6, 'رسالة واضحة ☝🏼', '''
<p class="mid">تعلم، اشرح، درّس، وخذ مقابل على وقتك وخبرتك… محد قال لك لا.</p>
<p class="mid">بس لا تنسب أفكار غيرك لنفسك وتقول أنا مخترع المنهج!</p>
<div class="line"></div>
<p class="mega">تغيير الاسم مو ابتكار.</p>''', candles(6, op=.14, h=1920)))
# 07 — the end (theatre)
curtain = ''.join(f'<i style="left:{x}%"></i>' for x in range(0, 100, 7))
S.append(frame(7, 'النهاية 🎭', '''
<div class="mask">🎭</div>
<p class="mid">مو عيب تكون طالب علم…</p>
<p class="big">العيب تكون طالب أمس، واليوم تبيع علينا إنك <em>مؤسس مدرسة تداول عالمية!</em> 😂</p>
<div class="line"></div>
<p class="mid">السوق مسكر…</p>
<p class="big">بس مسرحية المؤسسين مستمرة. 🎭💀</p>''', candles(7, op=.18, h=1920) + f'<div class="curtain l">{curtain}</div><div class="curtain r">{curtain}</div><div class="valance"></div>'))

css = open(SK + '/fonts.css').read().replace('url(assets/', f'url(file://{SK}/') + open('style.css').read()
open('stories.html', 'w').write(f'<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>{css}</style></head><body>{"".join(S)}</body></html>')
print('ok')
