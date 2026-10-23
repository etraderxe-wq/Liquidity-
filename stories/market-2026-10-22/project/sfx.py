# Light, professional SFX bed for the 8 stories (whoosh on each open, soft ticks on key reveals, low pad). Synthesized — no samples.
import sys, json, numpy as np, soundfile as sf
sys.path.insert(0, sys.argv[1]); from audio import SFX, reverb, filt, st, db, SR
SC = json.load(open('scenes.json')); DUR = SC[-1][2]; N = int(DUR * SR); T = np.arange(N) / SR
mix = np.zeros((N, 2)); S = SFX(seed=5)
def put(kind, t, g):
    x, anc = S.make(kind); a = int((t - anc) * SR); a0 = max(0, a); b = min(N, a + len(x))
    if b > a0: mix[a0:b] += x[a0 - a:b - a] * db(-14) * g
REL = {'s1': [(1.2, 'tick'), (2.5, 'tick'), (3.8, 'tick'), (5.1, 'tick'), (7.0, 'pop')], 's2': [(1.0 + i * .9, 'tick') for i in range(5)],
       's3': [(4.6, 'tick'), (5.7, 'tick'), (6.8, 'tick'), (8.4, 'shimmer')], 's4': [(2.6, 'tick'), (3.6, 'tick'), (4.6, 'tick'), (10.0, 'shimmer')],
       's5': [(2.0, 'sub-drop'), (5.0, 'pop'), (9.2, 'shimmer')], 's6': [(1.6, 'tick'), (2.6, 'tick'), (3.6, 'tick')] + [(6.5 + i * .7, 'tick') for i in range(4)],
       's7': [(.9, 'pop'), (2.7, 'pop'), (4.5, 'pop'), (7.4, 'shimmer')], 's8': [(.3, 'impact'), (5.6, 'shimmer')]}
for sid, a, b in SC:
    put('swoosh-pass', a + .15, .7)
    for dt, k in REL[sid]: put(k, a + dt, .55 if k == 'tick' else .7)
# low pad (A minor), very quiet, fades at each story edge so every cut stands alone
pad = sum(np.sin(2 * np.pi * f * T + f) * g for f, g in [(55, .5), (110, .3), (164.8, .22), (220, .15)])
pad = filt(pad, 'lowpass', 700, 2); edge = np.ones(N)
for sid, a, b in SC:
    i0, i1 = int(a * SR), int(b * SR); n = i1 - i0; e = np.minimum(1, np.minimum(np.arange(n) / (.4 * SR), (n - np.arange(n)) / (.5 * SR))); edge[i0:i1] = e
mix += st(pad * edge) * db(-30)
mix /= max(1, np.abs(mix).max() / .9)
sf.write('renders/sfx.wav', mix.astype(np.float32), SR)
print('ok')
