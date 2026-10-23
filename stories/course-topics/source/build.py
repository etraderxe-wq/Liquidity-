# «شنو راح تتعلّم معاي؟» — one Instagram story listing the course topics (EMULLAX blue identity).
import re, random
SK = '/home/user/Liquidity-/.claude/skills/emullax-carousel/assets'; F = SK + '/fonts'
LOGO = 'file:///home/user/Liquidity-/brand/logo-gradient.png'
T = ['وين تتجمع السيولة وشلون تحددها؟', 'شلون تحدد النطاق السعري؟', 'منطقة التوازن 50% وشلون تستخدمها.', 'منطقة الخصم وشلون تستفيد منها.',
     'الأوردر بلوك — Order Block.', 'فجوات القيمة العادلة — FVG.', 'كسر الهيكل السعري — BOS.', 'تغيّر سلوك السعر — CHoCH.',
     'جلسات التداول وأوقات السوق.', 'شلون تربط القمم والقيعان وتفهم حركة السعر؟', 'شلون تحدد منطقة الدخول المثالية — OTE.']
def fmt(s):  # English terms (and 50%) in brand cyan, kept LTR
    s = s.replace('50%', '<b class="en" dir="ltr">50%</b>')
    return re.sub(r'(Order Block|FVG|BOS|CHoCH|OTE)', r'<b class="en" dir="ltr">\1</b>', s)
r = random.Random(5); p = 50; c = []; w, h, n = 1080, 1920, 34; st = w / n
for i in range(n):
    o = p; cl = o + r.gauss(.1, 3); hi = max(o, cl) + abs(r.gauss(0, 1.5)); lo = min(o, cl) - abs(r.gauss(0, 1.5)); p = cl
    Y = lambda v: 760 + (50 - v) * 14; x = i * st + st / 2; col = '#93F9FF' if cl >= o else '#3977D5'
    c.append(f'<line x1="{x:.0f}" x2="{x:.0f}" y1="{Y(hi):.0f}" y2="{Y(lo):.0f}" stroke="{col}" stroke-width="2"/><rect x="{x-st*.3:.0f}" y="{Y(max(o,cl)):.0f}" width="{st*.6:.0f}" height="{max(abs(Y(o)-Y(cl)),2):.0f}" fill="{col}"/>')
svg = f'<svg class="cdl" viewBox="0 0 {w} {h}" width="{w}" height="{h}">{"".join(c)}<line x1="0" x2="{w}" y1="560" y2="560" stroke="#57A1EF" stroke-dasharray="10 14" opacity=".6"/><line x1="0" x2="{w}" y1="1300" y2="1300" stroke="#57A1EF" stroke-dasharray="10 14" opacity=".6"/></svg>'
items = ''.join(f'<li><i></i><span>{fmt(t)}</span></li>' for t in T)
html = f'''<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><link rel="stylesheet" href="file://{SK}/fonts.css"><style>
@font-face{{font-family:'Tajawal';font-weight:400;src:url(file://{F}/Tajawal-Regular.ttf)}}@font-face{{font-family:'Tajawal';font-weight:700;src:url(file://{F}/Tajawal-Bold.ttf)}}@font-face{{font-family:'Tajawal';font-weight:900;src:url(file://{F}/Tajawal-Black.ttf)}}
@font-face{{font-family:'Michroma';src:url(file://{F}/m0.woff2) format('woff2');unicode-range:U+0000-00FF,U+2000-206F}}
*{{margin:0;padding:0;box-sizing:border-box}} body{{background:#000;font-family:Tajawal,sans-serif;color:#FCFCFC}}
.st{{width:1080px;height:1920px;position:relative;overflow:hidden;
 background:radial-gradient(ellipse 80% 34% at 0% 100%,rgba(147,249,255,.75) 0%,rgba(87,161,239,.55) 38%,rgba(61,126,225,0) 75%),linear-gradient(172deg,#00051A 0%,#00051A 34%,#08163D 55%,#1F4590 78%,#3D7EE1 100%)}}
.cdl{{position:absolute;inset:0;opacity:.09}}
.vig{{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 50%,rgba(0,5,26,.55))}}
.tag{{position:absolute;top:170px;left:84px;right:84px;display:flex;justify-content:space-between;direction:ltr;font-family:Michroma;font-size:20px;letter-spacing:4px;color:#93F9FF;z-index:2}}
.tag span{{color:#A9B6D3}}
h1{{position:absolute;top:235px;right:84px;left:84px;font-size:86px;font-weight:900;line-height:1.2;white-space:nowrap;z-index:2;text-shadow:0 6px 40px rgba(0,0,0,.6)}}
h1 em{{font-style:normal;color:#93F9FF;text-shadow:0 0 34px rgba(147,249,255,.4)}}
.emo{{font-family:'Noto Color Emoji';font-size:.8em}}
.bar{{position:absolute;top:350px;right:84px;width:220px;height:8px;border-radius:4px;background:linear-gradient(90deg,#3977D5,#93F9FF);z-index:2}}
ul{{position:absolute;top:400px;right:70px;left:70px;list-style:none;z-index:2;display:flex;flex-direction:column;gap:11px}}
li{{display:flex;align-items:center;gap:22px;background:rgba(0,5,26,.8);border:2px solid rgba(87,161,239,.32);border-radius:22px;padding:14px 26px;font-size:40px;font-weight:700;line-height:1.3}}
li i{{flex:none;width:18px;height:18px;transform:rotate(45deg);border-radius:4px;background:linear-gradient(135deg,#93F9FF,#3977D5);box-shadow:0 0 14px rgba(147,249,255,.6)}}
.en{{font-family:Michroma,sans-serif;font-weight:400;font-size:.74em;color:#93F9FF;letter-spacing:1px;unicode-bidi:isolate}}
.foot{{position:absolute;left:0;right:0;bottom:250px;display:flex;flex-direction:column;align-items:center;gap:6px;z-index:3}}
.foot img{{width:190px}}.foot span{{font-family:Michroma;font-size:16px;letter-spacing:5px;color:#E6ECF7;direction:ltr}}
</style></head><body><section class="st" id="s1">{svg}<div class="vig"></div>
<div class="tag"><b>LIQUIDATIONS</b><span>COURSE TOPICS</span></div>
<h1>شنو راح <em>تتعلّم</em> معاي؟ <span class="emo">🔥</span></h1><div class="bar"></div>
<ul>{items}</ul>
<div class="foot"><img src="{LOGO}"><span>LIQUIDITY GROUP | EMULLAX</span></div></section></body></html>'''
open('stories.html', 'w').write(html); print('ok')
