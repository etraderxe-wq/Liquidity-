# Original voice (light clean-up only: rumble cut + gentle denoise; no speed/pitch change) + very quiet original pad, ducked under speech.
import subprocess, numpy as np, soundfile as sf
from scipy import signal
SRC = '/root/.claude/uploads/b7d10876-ad47-57b2-8618-4f38c33c0c31/6f4130c4-EMULLAX_original_audio.mp3'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-af', 'highpass=f=70,afftdn=nr=8:nf=-45', '-ar', '48000', 'renders/voice.wav'], check=True)
v, sr = sf.read('renders/voice.wav'); v = v if v.ndim == 2 else np.stack([v, v], 1)
N = int(12.5 * sr); out = np.zeros((N, 2)); out[:len(v)] += v
t = np.arange(N) / sr; pad = np.zeros(N)
for f, a in [(73.42, .5), (110.0, .35), (146.83, .3), (174.61, .22), (220.0, .18)]:      # D minor, slow swell
    pad += a * np.sin(2 * np.pi * f * t + f) * (1 + .15 * np.sin(2 * np.pi * .13 * t))
pad = signal.sosfilt(signal.butter(2, 900, 'low', fs=sr, output='sos'), pad)
env = np.minimum(1, t / 1.5) * np.clip((12.5 - t) / 1.2, 0, 1)
mono = np.abs(out.mean(1)); hop = sr // 50; e = np.repeat([mono[i:i + hop].mean() for i in range(0, N, hop)], hop)[:N]
duck = 1 - .5 * np.clip(e / (e.max() * .15 + 1e-9), 0, 1)
vr = np.sqrt(np.mean(out[:len(v)] ** 2)); pad = pad / np.sqrt(np.mean(pad ** 2)) * vr * 10 ** (-24 / 20) * env * duck
mix = out + np.stack([pad, pad], 1); mix /= max(1, np.abs(mix).max() / .95)
sf.write('renders/mix_raw.wav', mix, sr)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'renders/mix_raw.wav', '-af', 'loudnorm=I=-14:TP=-1.5', '-ar', '48000', 'renders/mix.wav'], check=True)
