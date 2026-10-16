# Temporary character voices (offline Piper Arabic voice, pitch-shifted per character). Replace with real actors later: same file names in vo/.
import sys, subprocess, json, sherpa_onnx, soundfile as sf, numpy as np
sys.path.insert(0, '.'); from dialogue import LINES, VOICES
D = sys.argv[1]
tts = sherpa_onnx.OfflineTts(sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(vits=sherpa_onnx.OfflineTtsVitsModelConfig(
    model=f'{D}/ar_JO-kareem-medium.onnx', tokens=f'{D}/tokens.txt', data_dir=f'{D}/espeak-ng-data'), num_threads=4)))
out = {}
for lid, who, sub, say in LINES:
    sp, semi = VOICES[who]
    a = tts.generate(say, sid=0, speed=sp * (.8 if len(say) < 12 else 1)); sf.write('vo/_raw.wav', a.samples, a.sample_rate)
    ratio = 2 ** (semi / 12)
    af = f'rubberband=pitch={ratio:.4f}:formant=preserved' if who != 'S' else f'rubberband=pitch={ratio:.4f}'
    af += ',silenceremove=start_periods=1:start_threshold=-55dB,areverse,silenceremove=start_periods=1:start_threshold=-55dB,areverse'
    af += {'H': ',equalizer=f=2500:t=q:w=1:g=3,aecho=0.8:0.5:18:0.12', 'B': ',equalizer=f=150:t=q:w=1:g=3', 'S': ',highpass=f=140'}[who]
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'vo/_raw.wav', '-af', af, '-ar', '48000', '-ac', '1', f'vo/{lid}.wav'], check=True)
    d, sr = sf.read(f'vo/{lid}.wav'); hop = sr // 30
    env = [float(np.sqrt(np.mean(d[i:i + hop] ** 2))) for i in range(0, len(d), hop)]; m = max(env) or 1
    out[lid] = {'who': who, 'dur': round(len(d) / sr, 3), 'env': [round(min(1, e / m * 1.3), 2) for e in env]}
    print(lid, who, out[lid]['dur'])
json.dump(out, open('vo/voices.json', 'w'))
