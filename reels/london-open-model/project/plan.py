# ICT London Open Model reel — data + timing.
# Candle series are generated, then CHECKED against the ICT definitions used on screen:
#   sweep  = wick trades through the level, candle closes back inside
#   MSS    = a candle CLOSES beyond the last short-term swing that led into the sweep
#   FVG    = 3-candle gap: high[i-1] < low[i+1] (bullish) / low[i-1] > high[i+1] (bearish), not fully filled at entry
#   breaker= last opposite candle at that swing, once price closes through it
#   R:R    = (TP-entry)/(entry-SL) shown as an illustrative 1:2
import json, random, re

def gen(path, seed):
    """path: list of (target_close, n_candles, noise, kind). Returns OHLC list."""
    r = random.Random(seed); out = []; p = path[0][0]
    for tgt, n, noise, kind in path[1:]:
        start = p
        for k in range(n):
            c = start + (tgt - start) * (k + 1) / n + (r.gauss(0, noise) if k < n - 1 else 0)
            o = p; body = abs(c - o)
            wick = (.15 if kind == 'disp' else .55) * max(body, .6)
            h = max(o, c) + abs(r.gauss(0, wick)); l = min(o, c) - abs(r.gauss(0, wick))
            out.append([round(o, 2), round(h, 2), round(l, 2), round(c, 2)]); p = c
    return out

def mirror(cs, axis):
    return [[round(2 * axis - o, 2), round(2 * axis - l, 2), round(2 * axis - h, 2), round(2 * axis - c, 2)] for o, h, l, c in cs]

# ---------- hand-built illustrative candles (no real prices), checked below ----------
BULL = [[116.0,116.4,114.6,115.0],[115.0,115.3,112.8,113.2],[113.2,113.6,110.4,110.9],[110.9,111.2,107.2,107.6],[107.6,108.0,105.6,106.0],
        [106.0,107.9,105.7,107.4],[107.4,107.8,105.2,105.6],[105.6,105.9,102.8,103.1],[103.1,103.4,100.3,100.8],[100.8,103.9,100.5,103.5],
        [103.5,107.8,103.2,107.2],[107.2,107.9,104.9,105.2],[105.2,105.5,100.6,101.0],[101.0,104.2,100.4,103.9],[103.9,106.6,103.5,106.2],
        [106.2,106.4,103.0,103.3],[103.3,103.5,101.4,101.7],[101.7,103.9,101.5,103.6],[103.6,103.8,101.2,101.5],[101.5,101.7,99.0,99.4],
        [99.4,100.8,97.6,100.6],[100.6,102.4,100.4,102.2],[102.2,105.0,102.0,104.8],[104.8,106.0,103.3,105.7],[105.7,105.9,104.3,104.5],
        [104.5,104.7,102.9,103.2],[103.2,104.6,102.8,104.4],[104.4,106.3,104.2,106.0],[106.0,108.4,105.7,108.1],[108.1,109.0,107.2,107.5],
        [107.5,110.6,107.3,110.3],[110.3,112.8,110.0,112.5],[112.5,113.4,111.6,112.0],[112.0,115.0,111.8,114.7],[114.7,116.8,114.4,116.5]]
KB = dict(asiaFrom=5, asiaTo=14, dailyOpenIdx=5, sweep=20, swingHigh=17, breaker=17, mss=22, fvg=22, entryIdx=25, londonIdx=15)
EXB = [[119.0,120.0,118.4,119.4],[119.4,119.9,117.6,117.9],[117.9,118.2,115.8,116.2],[116.2,117.6,115.9,117.3],[117.3,118.4,116.9,118.0],
       [118.0,118.3,115.4,115.7],[115.7,115.9,112.1,112.5],[112.5,112.8,110.0,110.4],[110.4,110.7,107.2,107.6],[107.6,108.0,104.6,105.1],
       [105.1,106.6,104.8,106.2],[106.2,106.5,103.4,103.8],[103.8,104.0,101.6,102.0],[102.0,105.0,101.8,104.7],[104.7,107.9,104.4,107.5],
       [107.5,109.6,107.1,109.2],[109.2,109.5,107.0,107.4],[107.4,107.7,104.0,104.4],[104.4,104.7,102.2,102.6],[102.6,104.6,102.0,104.3],
       [104.3,106.8,104.0,106.4],[106.4,106.7,103.9,104.2],[104.2,104.3,102.4,102.8],[102.8,104.6,102.5,104.4],[104.4,104.5,102.0,102.3],
       [102.3,102.5,98.6,99.2],[99.2,101.9,98.4,101.8],[101.8,103.2,101.6,103.0],[103.0,106.2,102.9,105.9],[105.9,107.4,104.3,107.1],
       [107.1,107.3,104.9,105.2],[105.2,105.5,103.8,104.1],[104.1,106.4,103.9,106.2],[106.2,109.4,106.0,109.1],[109.1,110.0,107.9,108.4],
       [108.4,112.6,108.2,112.3],[112.3,115.4,112.0,115.1],[115.1,117.9,114.8,117.6],[117.6,120.4,117.2,119.8],[119.8,120.1,118.6,118.9]]
KE = dict(sslFrom=12, sweep=26, swingHigh=23, breaker=23, mss=28, fvg=28, entryIdx=31, londonIdx=25)

def mirror(cs, ax): return [[round(2*ax-o,2), round(2*ax-l,2), round(2*ax-h,2), round(2*ax-c,2)] for o,h,l,c in cs]
def check_bull(cs, k, level):
    O,H,L,C = zip(*cs); sw, sh, m, f, e = k['sweep'], k['swingHigh'], k['mss'], k['fvg'], k['entryIdx']
    assert min(L) == L[sw] and L[sw] < level < C[sw], 'sweep: wick through the level, close back above'
    assert all(l >= level for l in L[k.get('asiaFrom', k.get('sslFrom')):k['londonIdx']]), 'level untouched until the London move'
    assert H[sh] == max(H[sh-1:sw]) and C[sh] > O[sh], 'swing high = last up-close candle into the sweep (breaker)'
    assert all(c <= H[sh] for c in C[sh+1:m]) and C[m] > H[sh], 'MSS: first CLOSE above the swing high'
    assert H[f-1] < L[f+1], 'FVG: high[i-1] < low[i+1]'
    fl, fh = H[f-1], L[f+1]
    assert L[e] <= fh and min(L[e:]) > fl, 'retrace trades into the FVG without filling it'
    entry = round((fl+fh)/2, 2); sl = round(L[sw]-.4, 2); tp = round(entry + 2*(entry-sl), 2)
    assert max(H[e:]) >= tp, 'illustrative 1:2 target reached'
    k.update(fvgLow=fl, fvgHigh=fh, entry=entry, sl=sl, tp=tp, brLow=min(O[sh], C[sh]), brHigh=max(O[sh], C[sh]))
    return k
kb = check_bull(BULL, dict(KB), 100.3); kb.update(asiaHigh=107.9, asiaLow=100.3, dailyOpen=106.0, bsl=116.4)
ke = check_bull(EXB, dict(KE), 101.6); ke.update(ssl=101.6, bsl=120.0)
def mirror_k(k, ax):
    r = dict(k)
    for a_, b_ in (('fvgLow','fvgHigh'), ('brLow','brHigh')): r[a_], r[b_] = sorted((round(2*ax-k[a_],2), round(2*ax-k[b_],2)))
    for x in ('entry','sl','tp','dailyOpen'):
        if x in k: r[x] = round(2*ax-k[x], 2)
    if 'asiaHigh' in k: r['asiaHigh'], r['asiaLow'] = round(2*ax-k['asiaLow'],2), round(2*ax-k['asiaHigh'],2)
    b_, s_ = k.get('bsl'), k.get('ssl'); r.pop('bsl', None); r.pop('ssl', None)
    if b_ is not None: r['ssl'] = round(2*ax-b_, 2)
    if s_ is not None: r['bsl'] = round(2*ax-s_, 2)
    return r
BEAR = mirror(BULL, 108.0); kr = mirror_k(kb, 108.0)
EXS = mirror(EXB, 110.0); ks = mirror_k(ke, 110.0)
# sanity on the mirrored (bearish) versions
check_bull(mirror(BEAR, 108.0), dict(KB), 100.3); check_bull(mirror(EXS, 110.0), dict(KE), 101.6)
print('bull', kb); print('bear', kr); print('exBull', ke); print('exBear', ks)
ASIA = [[104.0,105.6,103.7,105.3],[105.3,107.8,105.0,107.4],[107.4,107.7,105.2,105.5],[105.5,105.8,102.4,102.7],[102.7,103.0,100.4,100.9],
        [100.9,103.6,100.6,103.3],[103.3,106.9,103.0,106.6],[106.6,107.9,106.2,107.5],[107.5,107.7,104.6,104.9],[104.9,105.1,101.9,102.2],
        [102.2,102.4,100.3,100.7],[100.7,103.8,100.5,103.5],[103.5,107.4,103.2,107.0],[107.0,107.6,105.0,105.3],[105.3,105.6,103.1,103.6],[103.6,105.2,103.3,104.8]]
data = dict(bull=dict(c=BULL, k=kb), bear=dict(c=BEAR, k=kr), exBull=dict(c=EXB, k=ke), exBear=dict(c=EXS, k=ks), asia=dict(c=ASIA, hi=107.9, lo=100.3))
open('scenes/data.js', 'w').write('export const D = ' + json.dumps(data) + ';\n')

# ---------- timing ----------
FPS, BPM, DUR = 30, 84, 120.0
SC = [('s1', 0, 8, None), ('s2', 8, 22, {'type': 'crossfade', 'dur': .8}), ('s3', 22, 42, {'type': 'wipe', 'dur': .6, 'dir': 'rtl', 'ease': 'expoInOut'}),
      ('s4', 42, 57, {'type': 'push', 'dur': .6, 'dir': 'up', 'ease': 'expoInOut'}), ('s5', 57, 77, {'type': 'wipe', 'dur': .6, 'dir': 'ltr', 'ease': 'expoInOut'}),
      ('s6', 77, 92, {'type': 'push', 'dur': .6, 'dir': 'up', 'ease': 'expoInOut'}), ('s7', 92, 104, {'type': 'zoom', 'dur': .6}),
      ('s8', 104, DUR, {'type': 'dip', 'dur': .8, 'color': '#00051A'})]
VO = [('l1', .6, 7.6, 'تدري إن افتتاح لندن ممكن يعطيك فرصة تداول واضحة؟ بس السر مو إنك تدخل أول ما يفتح السوق… السر إنك تفهم وين السيولة، ومتى يتغير اتجاه السعر.'),
      ('l2', 9.0, 21.0, 'أول شي نحدد نطاق الجلسة الآسيوية. نرسم أعلى قمة وأدنى قاع، ونراقب وين متجمعة أوامر الوقف والسيولة.'),
      ('l3', 23.0, 41.2, 'بالسيناريو الشرائي، نراقب سحب السيولة تحت قاع آسيا، ويفضل تكون الأسعار تحت الافتتاح اليومي. بعدها ننطر تحول هيكل السوق، ونحدد منطقة رجوع مناسبة مثل FVG أو Breaker. الدخول يكون بخطة واضحة، والهدف سيولة الشراء.'),
      ('l4', 43.0, 56.2, 'شوف المثال. السعر سحب السيولة، بعدها ظهر تحول بالهيكل، ورجع إلى منطقة الاختلال. هني نقدر نبحث عن دخول مدروس، بشرط توافق بقية التحليل وإدارة المخاطر.'),
      ('l5', 58.0, 76.2, 'أما بالسيناريو البيعي، فنراقب سحب السيولة فوق قمة آسيا، ويفضل تكون الأسعار فوق الافتتاح اليومي. بعدها ننتظر تأكيد تحول الهيكل أو تغير التسليم السعري، ونبحث عن منطقة بيع مناسبة، بهدف السيولة الموجودة تحت القيعان.'),
      ('l6', 78.0, 91.2, 'هني نلاحظ سحب السيولة فوق القمم، وبعدها تغير حركة السعر. بدل ما نطارد الهبوط، ننتظر الرجوع إلى منطقة دخول مناسبة ونحدد مخاطرتنا قبل التنفيذ.'),
      ('l7', 93.0, 103.4, 'مو كل سحب سيولة يعني دخول. لازم تكون عندك شروط واضحة، وتعرف وين تلغي فكرتك، وشنو نسبة المخاطرة اللي تتحملها.'),
      ('l8', 105.0, 117.5, 'وإذا تبي تطور تداولك، تقدر تسجل تحت وكالتي في إكسنس، وتستفيد من كاش باك يوصل إلى ستين بالمية حسب نوع الحساب والشروط، مع استشارة مجانية وشرح تعليمي ومتابعة.')]
def words(s, e, text):
    ws = text.split(); pause = [.3 if re.search(r'[.؟?…:]$', w) else .15 if w.endswith('،') else 0 for w in ws]
    wt = [len(re.sub(r'\W', '', w)) + 2 for w in ws]; k = ((e - s) - sum(pause)) / sum(wt); t = s; out = []
    for w, a, p in zip(ws, wt, pause): d = a * k; out.append({'w': w, 's': round(t, 3), 'e': round(t + d * .92, 3)}); t += d + p
    return out
pal = {'bg': '#00051A', 'card': 'rgba(0,5,26,.82)', 'ink': '#FCFCFC', 'acc': '#57A1EF', 'acc2': '#3977D5', 'hi': '#93F9FF', 'mut': '#A9B6D3', 'clay': '#3977D5'}
json.dump({'name': 'ICT London Open Model', 'fps': FPS, 'width': 1080, 'height': 1920, 'bpm': BPM, 'palette': pal,
           'fonts': {'display': 'Tajawal', 'body': 'Tajawal', 'num': 'Inter'}, 'images': {'logo': 'assets/logo.png'}, 'post': {'grain': .035, 'vignette': .2},
           'music': {'key': 'D', 'scale': 'minor', 'progression': [0, 5, 3, 4], 'level': -12, 'duck': -6, 'top': {'hat': 8, 'pluck': 1}},
           'scenes': [{'id': i, 'file': f'scenes/{i}.js', 'lines': [f'l{i[1]}'], **({'transition': tr} if tr else {})} for i, a, b, tr in SC]},
          open('project.json', 'w'), ensure_ascii=False, indent=1)
spb = 60 / BPM; beats = [round(i * spb, 3) for i in range(int(DUR / spb) + 1)]
json.dump({'fps': FPS, 'width': 1080, 'height': 1920, 'duration': DUR, 'bpm': BPM, 'beatsPerBar': 4, 'beatOffset': 0, 'beats': beats, 'bars': beats[::4],
           'sections': [{'name': 'intro', 'start': 0, 'end': 8}, {'name': 'break', 'start': 8, 'end': 92}, {'name': 'build', 'start': 92, 'end': 104}, {'name': 'outro', 'start': 104, 'end': DUR}],
           'scenes': [{'id': i, 'file': f'scenes/{i}.js', 'start': a, 'end': b, 'lines': [f'l{i[1]}'], 'transition': tr} for i, a, b, tr in SC],
           'vo': [{'id': i, 'text': t, 'start': s, 'end': e, 'dur': round(e - s, 3), 'words': words(s, e, t)} for i, s, e, t in VO]},
          open('timeline.json', 'w'), ensure_ascii=False, indent=1)
print('ok')
