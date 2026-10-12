# Reels — motion-graphics projects

Each folder has the final `*.mp4` (1080×1920, 30 fps, H.264 + AAC, -14 LUFS) and an editable `project/`:

| file | what |
|---|---|
| `project/scenes/*.js` | one file per scene (canvas animation, all text is live text, RTL) |
| `project/scenes/lib.js` | shared EMULLAX look: brand gradient background, headers, highlight marker, candles |
| `project/plan.py` | writes `project.json` + `timeline.json` (scene windows, voiceover timing, music sections) |
| `project/sfx.py` | writes `sfx.json` (sound effects synced to the animation) |
| `project/assets/logo.png` | official gradient logo (`brand/logo-gradient.png`) |

## Re-render
Uses the motion engine from the `video-ad-editor` skill (`motion/`), headless Chromium, ffmpeg, numpy, scipy.

```bash
cd <video-ad-editor>/motion
python3 <project>/plan.py && python3 <project>/sfx.py          # run from inside <project>
CHROME=<chromium path> node render.js <project> preview 3 12 30 --safe   # stills + contact sheet
CHROME=<chromium path> node render.js <project> all --fresh               # frames → renders/video.mp4
python3 audio.py <project>                                               # music bed + sfx (+ voice) → renders/final.mp4
ffmpeg -i renders/final.mp4 -c:v libx264 -crf 21 -af "afade=t=out:st=<dur-2>:d=2" -c:a aac -b:a 192k -movflags +faststart reel.mp4
```
On Linux as root, add `--no-sandbox` to the Chromium launch args in `render.js`.

## Adding the voiceover
The current videos have music + sound effects only (no voice: the TTS service was blocked in the build environment).
With a recording: `python3 voice.py <project> --own voice.wav` (word timing via whisper), then `timeline.py`, `render.js all --fresh`, `audio.py`.
Without whisper, keep each line inside its scene window (see `voiceover-script.md`) and mix it over the MP4.
