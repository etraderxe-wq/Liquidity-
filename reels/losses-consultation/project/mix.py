# Audio for the reel: Ebrahim's own voice (cleaned, not replaced) + an original calm cinematic score + synced SFX.
# usage: python3 mix.py <engine motion dir> <voice file> <out.wav>
import sys, os, subprocess, numpy as np
sys.path.insert(0, sys.argv[1])
from audio import SFX, reverb, filt, st, db, SR, vo_envelope, read_wav, write_wav, rms_db
VOICE, OUT = sys.argv[2], sys.argv[3]
DUR = 64.6; N = int(DUR * SR); T = np.arange(N) / SR
# 1) voice: gentle clean-up only (rumble cut, light denoise, de-mud, presence, soft compression) — same tone and dialect
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', VOICE, '-af',
  'highpass=f=75,lowpass=f=15000,afftdn=nr=10:nf=-50:tn=1,equalizer=f=250:t=q:w=1.2:g=-2,equalizer=f=3200:t=q:w=1.4:g=2,'
  'acompressor=threshold=-21dB:ratio=2.8:attack=6:release=120:makeup=2,loudnorm=I=-16:TP=-2:LRA=9',
  '-ar', str(SR), '-ac', '1', 'voice_clean.wav'], check=True)
vo = read_wav('voice_clean.wav'); vo = vo if vo.ndim == 1 else vo.mean(axis=1)
v = np.zeros(N); v[:min(N, len(vo))] = vo[:N]
# 2) score: D minor, 80 bpm — pads + sub + soft piano; tension pulse in the revenge part, lift for the solution
def hz(m): return 440 * 2 ** ((m - 69) / 12)
CH = [[50, 53, 57], [46, 50, 53], [53, 57, 60], [48, 52, 55]]          # Dm  Bb  F  C
spb = 60 / 80; bar = 4 * spb
def env(a, r, n):
    e = np.ones(n); na, nr = int(a * SR), int(r * SR); e[:na] = np.linspace(0, 1, na); e[-nr:] *= np.linspace(1, 0, nr); return e
def section_gain(t):
    return np.interp(t, [0, 3.8, 4.4, 16, 17, 25, 25.5, 27.6, 28.6, 52, 53.5, 60.4, 61, 64.6], [.55, .55, .8, .8, .7, .7, .3, .2, 1, 1, 1.15, 1.15, 1.3, 0])
pad = np.zeros(N); sub = np.zeros(N); keys = np.zeros(N); pulse = np.zeros(N)
r = np.random.RandomState(4)
t0 = 0.0; ci = 0
while t0 < DUR:
    ch = CH[ci % 4]; n = int(2 * bar * SR); s = int(t0 * SR); e = min(N, s + n); m = e - s
    tt = np.arange(m) / SR; E = env(1.6, 1.8, m)
    for k, note in enumerate(ch + [ch[0] + 12]):
        for d in (-7, 0, 7):   # detuned saw-ish (few harmonics) → warm pad
            f = hz(note) * 2 ** (d / 1200); ph = r.rand() * 6.28
            pad[s:e] += E * sum(np.sin(2 * np.pi * f * h * tt + ph) / h ** 1.3 for h in range(1, 6)) * .05
    sub[s:e] += E * np.sin(2 * np.pi * hz(ch[0] - 24) * tt) * .35
    # soft piano arpeggio (8ths), only after the turn (27.8 s) and lightly in the intro
    for j in range(16):
        tn = t0 + j * spb / 2
        if tn >= DUR or not (tn > 27.8 or tn < 16): continue
        note = (ch + [ch[0] + 12, ch[1] + 12])[[0, 1, 2, 3, 2, 1, 4, 2][j % 8]] + 12
        a = int(tn * SR); L = min(N - a, int(1.6 * SR)); q = np.arange(L) / SR
        keys[a:a + L] += np.exp(-q * 3.2) * (np.sin(2 * np.pi * hz(note) * q) + .3 * np.sin(4 * np.pi * hz(note) * q) * np.exp(-q * 6)) * .16 * (1 if tn > 27.8 else .6)
    t0 += 2 * bar; ci += 1
# tension ostinato 16.4–25.3 (low pulsing D + clock tick)
for j in range(int((25.3 - 16.4) / (spb / 2))):
    tn = 16.4 + j * spb / 2; a = int(tn * SR); L = int(.3 * SR); q = np.arange(L) / SR
    pulse[a:a + L] += np.exp(-q * 9) * np.sin(2 * np.pi * hz(38) * q) * .5
    tk = int(.02 * SR); pulse[a:a + tk] += r.randn(tk) * np.exp(-np.arange(tk) / SR * 300) * .12
pad = filt(pad, 'lowpass', 1400, 2)
mus = st(pad * .9 + keys) ; mus = reverb(mus, rt=3.2, mix=.45)[:N]
mus += st(filt(sub, 'lowpass', 120, 2) + pulse)[:N]
mus *= section_gain(T)[:, None]
# 3) sfx
S = SFX(seed=11); sfx = np.zeros((N, 2))
def put(kind, at, gain=1.0, **k):
    x, anc = S.make(kind, **k); a = int((at - anc) * SR); a0 = max(0, a); b = min(N, a + len(x))
    if b > a0: sfx[a0:b] += x[a0 - a:b - a] * db(-6) * gain
CUES = [('sub-drop', 1.15, 1.0), ('impact', 1.18, .8), ('glitch', 1.45, .7), ('impact', 1.45, .9), ('shimmer', 3.3, .5),
  ('swoosh-pass', 4.05, .6), ('pop', 7.11, .5), ('glitch', 8.55, .45), ('tick', 11.8, .6), ('pop', 12.95, .6), ('sub-drop', 14.8, 1.0), ('impact', 14.82, .9), ('whoosh', 15.85, .4),
  ('glitch', 16.35, .8), ('glitch', 16.7, .6), ('impact', 17.05, .45), ('glitch', 18.0, .6), ('impact', 17.75, .5), ('impact', 18.45, .55), ('glitch', 19.25, .6), ('impact', 19.15, .6),
  ('tick', 20.35, .6), ('tick', 20.67, .6), ('tick', 20.99, .6), ('tick', 21.31, .6), ('slide', 22.25, .5), ('slide', 22.87, .5), ('slide', 23.49, .5), ('slide', 24.11, .5),
  ('glitch', 25.3, .8), ('boom', 25.45, .7), ('riser', 27.4, .45), ('shimmer', 27.6, .55), ('pop', 29.3, .4), ('pop', 30.55, .4),
  ('swoosh-pass', 32.2, .55), ('tick', 32.52, .5), ('tick', 34.52, .5), ('impact', 35.8, .5), ('swoosh-pass', 38.0, .55), ('pop', 38.38, .45), ('pop', 40.04, .45), ('pop', 41.85, .45), ('shimmer', 42.75, .45),
  ('swoosh-pass', 45.6, .5), ('sub-drop', 45.86, .5), ('scratch', 49.75, .5), ('whoosh', 50.75, .45), ('tick', 51.8, .35), ('tick', 52.1, .35), ('tick', 52.4, .35), ('tick', 52.7, .35),
  ('swoosh-pass', 53.1, .5), ('typing', 53.9, .45), ('pop', 54.75, .6), ('shimmer', 54.5, .5), ('whoosh', 56.2, .4), ('shimmer', 57.75, .55), ('boom', 60.5, .8), ('shimmer', 61.2, .6)]
for c in CUES: put(c[0], c[1], c[2], **({'dur': .6} if c[0] == 'typing' else {}))
# 4) mix: music sits ~20 dB under the voice and ducks a further 7 dB while he speaks
e = vo_envelope(v)
mus = mus * db((rms_db(v[v != 0]) - 8) - rms_db(mus[int(28 * SR):int(52 * SR)]))
mus *= (1 - (1 - db(-8)) * e)[:, None]
sfx *= (1 - (1 - db(-5)) * e)[:, None]
mix = st(v) + mus + sfx
fade = np.clip((DUR - T) / 1.2, 0, 1); mix *= fade[:, None]
write_wav('mix_raw.wav', mix / (np.max(np.abs(mix)) + 1e-9) * .9)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix_raw.wav', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', OUT], check=True)
print('ok', OUT)
