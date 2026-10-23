# LIQUIDATIONS ad audio: dark cinematic score + SFX (board drop, fire, silence, ash → reveal, seat ticks, firm hits). All synthesized, no samples.
import sys, json, numpy as np, soundfile as sf, subprocess
sys.path.insert(0, sys.argv[1]); from audio import SFX, reverb, filt, st, db, SR
DUR = 75.0; N = int(DUR * SR); T = np.arange(N) / SR; R = np.random.RandomState(3)
def hz(m): return 440 * 2 ** ((m - 69) / 12)
mus = np.zeros(N); fx = np.zeros((N, 2))
def addm(x, t, g=1.): a = int(t * SR); b = min(N, a + len(x)); mus[a:b] += x[:b - a] * g
def tv(d): return np.arange(int(d * SR)) / SR
# fire: filtered noise crackle 1.8–7.6 s
fire = np.zeros(N); i0, i1 = int(1.8 * SR), int(7.8 * SR); n = i1 - i0; ff = filt(R.randn(n), 'bandpass', [300, 3000], 2) * .25
cr = np.zeros(n); idx = R.randint(0, n, 900); cr[idx] = R.randn(900) * 1.6; cr = filt(cr, 'highpass', 1500, 2)
env = np.interp(np.arange(n) / SR, [0, .6, 4.5, 6.0], [0, 1, 1, 0]); fire[i0:i1] = (ff + cr) * env
# score: low drone + pulse, silent 7.6–9.4 (the "moment"), builds after the reveal
drone = sum(np.sin(2 * np.pi * hz(m) * T + m) * g for m, g in [(33, .6), (40, .3), (45, .2)])
lvl = np.interp(T, [0, 1.5, 7.3, 7.6, 9.4, 10.5, 36, 45, 61, 72, 75], [.25, .35, .35, 0, 0, .55, .6, .75, .6, .55, 0])
mus += filt(drone, 'lowpass', 300, 2) * lvl
bpm = 96; spb = 60 / bpm; t = 9.6
while t < 73.5:
    k = np.interp(t, [9.6, 17, 36.5, 45.2, 61.4, 73], [.4, .6, .7, 1, .8, .6]); q = tv(.35)
    addm(np.exp(-q * 14) * np.sin(2 * np.pi * (55 + 40 * np.exp(-q * 30)) * q) * .9 * k, t)                 # kick-like pulse
    if (t - 9.6) % (2 * spb) > spb * .9: addm(np.exp(-q * 30) * filt(R.randn(len(q)), 'highpass', 6000, 2) * .08 * k, t)
    t += spb
for k, (s, chord) in enumerate([(9.6, [57, 60, 64]), (24, [53, 57, 60]), (36.5, [55, 58, 62]), (45.2, [57, 60, 64]), (61.4, [53, 57, 60, 64])]):
    d = 8.0 if k < 4 else 13.0; q = tv(d); e = np.minimum(1, q / 1.5) * np.minimum(1, (d - q) / 2)
    addm(sum(np.sin(2 * np.pi * hz(m) * q) for m in chord) * e * .06, s)
mus = filt(mus, 'lowpass', 5000, 2)
S = SFX(seed=8)
def put(kind, t, g=1., **kw):
    x, anc = S.make(kind, **kw); a = int((t - anc) * SR); a0 = max(0, a); b = min(N, a + len(x))
    if b > a0: fx[a0:b] += x[a0 - a:b - a] * g
put('whoosh', .9, .5); put('impact', 1.55, .9); put('boom', 1.6, .5)                          # board falls into the barrel
put('reverse-whoosh', 10.3, .6); put('shimmer', 10.6, .5); put('impact', 11.6, .6)            # reveal out of the smoke
for i in range(5): put('tick', 17.9 + i * .45, .5)                                              # seats light
put('swoosh-pass', 24.0, .4)
for k in range(22): put('tick', 24 + 1.6 + k * .14, .18)                                        # calendar days
for i in range(4): put('impact', 36.7 + i * 2.1, .55)                                            # firm rules
put('swoosh-pass', 45.2, .4); put('pop', 46.4, .4); put('pop', 47.8, .4); put('shimmer', 49.6, .5)
put('swoosh-pass', 54.2, .4); put('swoosh-pass', 61.4, .4); put('pop', 67.3, .5)
mix = st(mus) * db(-16) / (np.sqrt(np.mean(mus ** 2)) + 1e-9) * .25 + st(fire) * 3.0 + fx * db(-10)
mix *= np.clip((DUR - T) / 1.2, 0, 1)[:, None]
sf.write('renders/mix_raw.wav', (mix / (np.abs(mix).max() + 1e-9) * .9).astype(np.float32), SR)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'renders/mix_raw.wav', '-af', 'loudnorm=I=-15:TP=-1.5', '-ar', '48000', 'renders/mix.wav'], check=True); print('ok')
