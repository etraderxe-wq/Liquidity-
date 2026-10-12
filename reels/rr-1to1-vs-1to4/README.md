# 1:1 vs 1:4 — Arabic version

- `rr-1to1-vs-1to4-ar.mp4`: 1080×1920, 30 fps, 35 s. The original animation is kept untouched; every English text element is covered and redrawn in Arabic (Tajawal) with the original colour and the original per-frame fade.
- Audio: a newly generated music bed + light sound effects (-14 LUFS). **No voice yet**: the English narration could not be separated from the original music, and the Arabic TTS / transcription services were blocked in the build environment.
- `rr-1to1-vs-1to4-ar.srt`: Arabic subtitles of the proposed voiceover, timed to the scenes.
- `voiceover-timing.md`: recording sheet.

## Rebuild (needs the original upload as `src.mp4`)
```bash
python3 project/build_overlay.py          # per-frame fade + colour of each English text element
node project/render.js                     # transparent 1080×1920 Arabic overlay frames → ov/
ffmpeg -i src.mp4 -framerate 30 -i ov/%05d.png -filter_complex "[0:v]scale=1080:1920:flags=lanczos,format=gbrp[b];[1:v]format=gbrap[o];[b][o]overlay=0:0:shortest=1:format=gbrp,format=yuv420p" -an vid.mp4
```
`render.js` loads `page.html` with the Tajawal fonts from `.claude/skills/emullax-carousel/assets/fonts/`.
All Arabic strings and cover boxes are in `project/elements.py`.
