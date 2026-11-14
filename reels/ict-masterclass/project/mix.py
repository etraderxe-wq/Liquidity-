# Calm cinematic bed for the ICT masterclass (65 s): slow pad (D minor), soft low pulse, light whooshes on scene changes. Synthesized, no samples.
import sys, numpy as np, soundfile as sf, subprocess
from scipy import signal
SR = 48000; DUR = 65.0; N = int(DUR * SR); T = np.arange(N) / SR
def hz(m): return 440 * 2 ** ((m - 69) / 12)
def lp(x, f): return signal.sosfilt(signal.butter(2, f, 'low', fs=SR, output='sos'), x)
pad = np.zeros(N); CH = [[50, 53, 57], [46, 50, 53], [53, 57, 60], [48, 52, 55]]
for k in range(int(DUR // 8) + 1):
    s = k * 8.0; a, b = int(s * SR), min(N, int((s + 9) * SR)); tt = np.arange(b - a) / SR; e = np.minimum(1, tt / 2) * np.minimum(1, (9 - tt) / 2)
    for m in CH[k % 4] + [CH[k % 4][0] - 12]:
        for d in (-6, 6): pad[a:b] += np.sin(2 * np.pi * hz(m) * 2 ** (d / 1200) * tt) * e * .05
pad = lp(pad, 1200)
pulse = np.zeros(N)
for t0 in np.arange(6, 62, 60 / 80):
    a = int(t0 * SR); q = np.arange(int(.3 * SR)) / SR; pulse[a:a + len(q)] += np.exp(-q * 14) * np.sin(2 * np.pi * 55 * q) * .25
wh = np.zeros(N); R = np.random.RandomState(2)
for t0 in [6, 18, 30, 42, 52, 61.5]:
    a = int((t0 - .4) * SR); n = int(.8 * SR); x = R.randn(n) * np.sin(np.linspace(0, np.pi, n)) ** 2; wh[a:a + n] += signal.sosfilt(signal.butter(2, [400, 3000], 'band', fs=SR, output='sos'), x) * .12
mix = pad + pulse * np.interp(T, [0, 6, 60, 63], [0, 1, 1, 0]) + wh
mix *= np.minimum(1, T / 1.5) * np.clip((DUR - T) / 2, 0, 1)
st = np.stack([mix, mix], 1); st /= np.abs(st).max() / .9
sf.write('renders/bed_raw.wav', st.astype(np.float32), SR)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'renders/bed_raw.wav', '-af', 'loudnorm=I=-20:TP=-2', '-ar', '48000', 'renders/bed.wav'], check=True); print('ok')
