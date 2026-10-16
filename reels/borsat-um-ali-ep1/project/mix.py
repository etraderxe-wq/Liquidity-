# Audio: character voices at their timeline slots + original comedy score + synthesized SFX (applause, crickets, laugh track…). No samples, no licensed music.
import sys, json, subprocess, numpy as np, soundfile as sf
sys.path.insert(0, sys.argv[1]); from audio import SFX, reverb, filt, st, db, SR, vo_envelope, write_wav
pl = json.load(open('vo/placement.json')); DUR = pl['duration']; N = int(DUR * SR); T = np.arange(N) / SR; R = np.random.RandomState(9)
def at(x, t, g=1.0):
    a = int(t * SR); b = min(N, a + len(x)); out[a:b] += x[:b - a] * g
def tv(d): return np.arange(int(d * SR)) / SR
# voices
vo = np.zeros(N); out = vo
pan = {'H': -.25, 'B': .2, 'S': .3}; vst = np.zeros((N, 2))
for l in pl['lines']:
    d, sr = sf.read(f"vo/{l['id']}.wav"); d = d if d.ndim == 1 else d.mean(1)
    a = int(l['s'] * SR); b = min(N, a + len(d)); vo[a:b] += d[:b - a]
    vst[a:b] += st(d[:b - a] * .9, pan[l['who']])
vo_rms = np.sqrt(np.mean(vo[vo != 0] ** 2)); vst *= db(-18) / vo_rms
# ---- score: bouncy pizzicato + marimba offbeats (F major, 104 bpm) ----
bpm = 104; spb = 60 / bpm; mus = np.zeros(N)
def hz(m): return 440 * 2 ** ((m - 69) / 12)
def pluck(f, d=.35, br=1.0):
    q = tv(d); return np.exp(-q * 9) * (np.sin(2 * np.pi * f * q) + .4 * br * np.sin(4 * np.pi * f * q) * np.exp(-q * 20))
def mar(f):
    q = tv(.4); return np.exp(-q * 12) * (np.sin(2 * np.pi * f * q) + .25 * np.sin(2 * np.pi * f * 4 * q) * np.exp(-q * 40))
PROG = [(53, [65, 69, 72]), (50, [62, 65, 69]), (46, [58, 62, 65]), (48, [60, 64, 67])]   # F Dm Bb C
MEL = [72, None, 74, 72, 69, None, 67, 69, 70, None, 69, 67, 65, None, None, None]
STOP = [(23.35, 25.35), (74.6, 77.6), (41.3, 41.9)]
out = mus; beat = 0; t = .2
while t < DUR - 11.0:
    if any(a <= t < b for a, b in STOP): t += spb / 2; beat += .5; continue
    bar = int(beat // 4) % 4; root, ch = PROG[bar]; bi = beat % 4
    if bi in (0, 2): at(pluck(hz(root - 12 + (7 if bi == 2 else 0)), .45), t, .55)
    if bi % 1 == .5: [at(mar(hz(n)), t, .12) for n in ch]
    m = MEL[int((beat % 8) * 2)]
    if m and int(beat // 8) % 2 == 1: at(mar(hz(m + 12)), t, .1)
    t += spb / 2; beat += .5
# end card: soft pad + bell motif (calm, elegant)
end0 = DUR - 11.0
for k, (r, ch) in enumerate([(53, [65, 69, 72]), (46, [58, 62, 65]), (48, [60, 64, 67]), (53, [65, 69, 72])]):
    q = tv(3.0); e = np.minimum(1, q / .8) * np.minimum(1, (3.0 - q) / 1.0)
    at(sum(np.sin(2 * np.pi * hz(n) * q) for n in ch) * e * .05, end0 + k * 2.75)
    at(mar(hz(ch[-1] + 12)) * .8, end0 + k * 2.75 + .1)
mus = filt(mus, 'lowpass', 6000, 2)
mst = reverb(st(mus), rt=1.4, mix=.25)[:N]
# ---- sfx ----
fx = np.zeros(N); out = fx
def applause(d, dens=60):
    x = np.zeros(int(d * SR)); n = int(d * dens)
    for _ in range(n):
        a = R.randint(0, len(x) - 2000); L = int(SR * .012); c = R.randn(L) * np.exp(-np.arange(L) / SR * 400); x[a:a + L] += filt(c, 'bandpass', [900 + R.rand() * 1800, 4500], 2) if False else c
    x = filt(x, 'highpass', 600, 2); env = np.minimum(1, tv(d) / .25) * np.minimum(1, (d - tv(d)) / .6); return x * env * .25
def crickets(d):
    q = tv(d); car = np.sin(2 * np.pi * 4600 * q); chirp = (np.sin(2 * np.pi * 28 * q) > .2) * ((q * 1.4) % 1 < .35)
    return car * chirp * .12 * np.minimum(1, q / .2)
def laugh(d, voices=22):
    x = np.zeros(int(d * SR)); q = tv(d)
    for v in range(voices):
        f0 = R.uniform(110, 280); rate = R.uniform(4.2, 6.2); st0 = R.uniform(0, .5); dec = R.uniform(1.6, d)
        ph = np.cumsum(f0 * (1 + .03 * np.sin(2 * np.pi * 1.3 * q + v)) / SR); src = (ph % 1) - .5           # saw = glottal-ish
        y = filt(src, 'bandpass', [600, 1400], 2) * 1.2 + filt(src, 'bandpass', [1800, 2800], 2) * .5
        amp = np.clip(np.sin(2 * np.pi * rate * (q - st0)), 0, 1) ** 1.5 * (q > st0) * np.exp(-np.maximum(0, q - st0) / dec)
        x += y * amp * R.uniform(.5, 1)
    x += filt(R.randn(len(x)), 'bandpass', [400, 3000], 2) * .02
    return x / (np.max(np.abs(x)) + 1e-9) * .5 * np.minimum(1, q / .15) * np.minimum(1, (d - q) / .8)
def kaching():
    q = tv(1.2); return (np.sin(2 * np.pi * 2093 * q) + .7 * np.sin(2 * np.pi * 2637 * q) + .5 * np.sin(2 * np.pi * 3136 * q)) * np.exp(-q * 4) * .25
def boing():
    q = tv(.7); f = 180 + 420 * q; return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-q * 4) * (1 + .5 * np.sin(2 * np.pi * 18 * q)) * .35
def alarm(d):
    q = tv(d); return np.sign(np.sin(2 * np.pi * 880 * q)) * ((q * 3) % 1 < .5) * .05
at(applause(1.6), 9.75); at(applause(1.9, 80), 42.35, 1.1); at(crickets(1.9), 23.45)
at(laugh(3.0), 74.7, 1.0); at(applause(2.2, 50), 75.4, .6)
at(boing(), 42.0); at(kaching(), 66.3); at(alarm(2.0), 57.0)
S = SFX(seed=4); sx = np.zeros((N, 2))
def put(kind, t, g=1.0, **k):
    x, anc = S.make(kind, **k); a = int((t - anc) * SR); a0 = max(0, a); b = min(N, a + len(x))
    if b > a0: sx[a0:b] += x[a0 - a:b - a] * db(-8) * g
for c in [('swoosh-pass', 1.6, .4), ('whoosh', 8.05, .5), ('scratch', 23.4, .9), ('impact', 21.55, .4), ('impact', 22.65, .5),
          ('swoosh-pass', 25.3, .6), ('pop', 25.55, .5), ('whoosh', 41.35, .6), ('shimmer', 41.9, .5), ('swoosh-pass', 44.5, .6),
          ('sub-drop', 55.85, .7), ('impact', 57.0, 1.0), ('glitch', 57.0, .6), ('swoosh-pass', 59.3, .6), ('pop', 69.05, .6), ('scratch', 69.4, .5),
          ('pop', 72.1, .5), ('impact', 74.7, .7), ('boom', 77.7, .5), ('shimmer', 82.3, .6)]:
    put(*c)
# ---- mix ----
e = vo_envelope(vo)
mst *= (db(-31) / (np.sqrt(np.mean(mst[int(26 * SR):int(40 * SR)] ** 2)) + 1e-9)); mst *= (1 - (1 - db(-6)) * e)[:, None]
fxs = st(fx) * db(-14) / (np.max(np.abs(fx)) + 1e-9) * 4
mix = vst + mst + fxs + sx
mix *= np.clip((DUR - T) / 1.0, 0, 1)[:, None]
write_wav('mix_raw.wav', mix / (np.max(np.abs(mix)) + 1e-9) * .9)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix_raw.wav', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', 'renders/mix.wav'], check=True)
print('ok')
