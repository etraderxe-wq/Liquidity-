#!/usr/bin/env python3
"""Reel frames (render.js --reel) -> reel.mp4: 1080x1920, 30fps, H.264, no audio
(the user adds music in the Instagram app). Each frame holds long enough to read
(~3.5 words/s, 3.5-7 s), with a slow 4% push-in and 0.5 s cross-fades."""
import json, subprocess, sys
from pathlib import Path

def main(out_dir):
    d = Path(out_dir) / "reel"
    frames = sorted(d.glob("frame-*.png")); words = json.loads((d / "words.json").read_text())
    durs = [round(min(7.0, max(3.5, w / 3.5)), 2) for w in words]
    durs[0] = 3.5  # cover
    fps, xf = 30, 0.5
    cmd = ["ffmpeg", "-y", "-loglevel", "error"]
    for f, t in zip(frames, durs):
        cmd += ["-i", str(f)]
    parts = []
    for i, t in enumerate(durs):
        n = int((t + xf) * fps)
        parts.append(f"[{i}:v]scale=1620:2880,zoompan=z='1+0.04*on/{n}':d={n}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps={fps},format=yuv420p,setsar=1[v{i}]")
    last, off = "v0", 0.0
    for i in range(1, len(durs)):
        off += durs[i - 1]
        parts.append(f"[{last}][v{i}]xfade=transition=fade:duration={xf}:offset={off:.2f}[x{i}]"); last = f"x{i}"
    out = Path(out_dir) / "reel.mp4"
    cmd += ["-filter_complex", ";".join(parts), "-map", f"[{last}]", "-c:v", "libx264", "-preset", "medium", "-crf", "18",
            "-pix_fmt", "yuv420p", "-r", str(fps), "-movflags", "+faststart", str(out)]
    subprocess.run(cmd, check=True)
    total = sum(durs) + xf
    print(out, f"{total:.1f}s", "per-slide:", durs)

if __name__ == "__main__":
    main(sys.argv[1])
