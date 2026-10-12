# measures, per frame, how visible each English text element is (ink in its box) and its colour,
# so the Arabic replacement fades exactly like the original
import numpy as np, subprocess, json
exec(open('elements.py').read())
Wd, H, FPS = 720, 1280, 30
p = subprocess.Popen(["ffmpeg", "-v", "error", "-i", "src.mp4", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
ink = {i: [] for i in range(len(E))}; peak = {}; f = 0
while True:
    b = p.stdout.read(Wd * H * 3)
    if len(b) < Wd * H * 3: break
    a = np.frombuffer(b, np.uint8).reshape(H, Wd, 3).astype(int); t = f / FPS
    for i, e in enumerate(E):
        if e['box'] is None or not (e['t0'] <= t < e['t1']): ink[i].append(0); continue
        x0, y0, x1, y1 = e['box']; reg = a[y0:y1, x0:x1]; d = np.abs(reg - 253).max(axis=2)
        n = int((d > 60).sum()); ink[i].append(n)
        if n > peak.get(i, (0,))[0]:
            strong = reg[d > 140] if (d > 140).sum() > 20 else reg[d > 60]
            peak[i] = (n, strong.mean(axis=0).astype(int).tolist() if len(strong) else [40, 40, 45])
    f += 1
N = f; out = []
for i, e in enumerate(E):
    al = None
    if e['box'] is not None:
        v = np.array(ink[i], float); m = v.max() or 1; al = np.convolve(np.clip(v / (m * .85), 0, 1), np.ones(3) / 3, mode='same')
        e['color'] = peak.get(i, (0, [40, 40, 45]))[1]; al = [round(float(x), 3) for x in al]
    out.append(dict(e, alpha=al))
titles = [i for i, e in enumerate(out) if e['kind'] == 'title']
fr = np.arange(N) / FPS
for e in out:
    if e['kind'] == 'note':
        T = np.array(out[titles[e['follow']]]['alpha'])
        e['alpha'] = [round(float(x), 3) if e['t0'] <= fr[k] < e['t1'] else 0 for k, x in enumerate(np.clip((fr - e['t0']) / .4, 0, 1) * T)]
        e['color'] = [110, 112, 120]
json.dump({'N': N, 'fps': FPS, 'E': out}, open('overlay.json', 'w'), ensure_ascii=False); print('frames', N)
