import numpy as np, subprocess
from rebrand import rebrand, Wd, H
src = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', 'vid.mp4', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{Wd}x{H}', '-r', '30', '-i', '-', '-i', 'out.mp4',
                        '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-shortest', '-movflags', '+faststart', 'brand.mp4'], stdin=subprocess.PIPE)
n = 0
while True:
    b = src.stdout.read(Wd * H * 3)
    if len(b) < Wd * H * 3: break
    enc.stdin.write(rebrand(np.frombuffer(b, np.uint8).reshape(H, Wd, 3)).tobytes()); n += 1
enc.stdin.close(); enc.wait(); print('frames', n)
