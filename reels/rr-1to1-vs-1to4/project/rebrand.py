# Re-skins the (white-background) Arabic video into the EMULLAX Instagram identity:
# graphics are lifted off white (colour-to-alpha), greys/black → white, colours brightened,
# then composited on the brand gradient with the gradient logo on top.
import numpy as np, sys, subprocess
from PIL import Image
Wd, H = 1080, 1920
def brand_bg():
    y, x = np.mgrid[0:H, 0:Wd].astype(np.float32)
    ang = np.deg2rad(172); dx, dy = np.sin(ang), -np.cos(ang); half = (abs(Wd * dx) + abs(H * dy)) / 2
    t = ((x - Wd / 2) * dx + (y - H / 2) * dy + half) / (2 * half)
    stops = [(0, (0, 5, 26)), (.30, (0, 5, 26)), (.50, (8, 22, 61)), (.72, (31, 69, 144)), (1, (61, 126, 225))]
    img = np.zeros((H, Wd, 3), np.float32)
    for (t0, c0), (t1, c1) in zip(stops, stops[1:]):
        m = (t >= t0) & (t <= t1); k = ((t - t0) / max(t1 - t0, 1e-6))[m][:, None]
        img[m] = np.array(c0) * (1 - k) + np.array(c1) * k
    r = np.sqrt((x / (Wd * .8)) ** 2 + ((y - H) / (H * .38)) ** 2)            # cyan glow, bottom-left
    def glow(r):
        a = np.interp(r, [0, .38, .75], [1, .85, 0]); c = np.where(r[..., None] < .38, np.array([147, 249, 255]) * (1 - r[..., None] / .38) + np.array([87, 161, 239]) * (r[..., None] / .38), np.array([87, 161, 239]))
        return a[..., None], c
    a, c = glow(r); img = img * (1 - a) + c * a
    return img / 255.
BG = brand_bg()
LOGO = Image.open('/home/user/Liquidity-/brand/logo-gradient.png').convert('RGBA')
lw = 200; LOGO = LOGO.resize((lw, int(LOGO.height * lw / LOGO.width)), Image.LANCZOS)
L = np.asarray(LOGO).astype(np.float32) / 255.; LY, LX = 158, (Wd - lw) // 2
def rebrand(fr, logo_a=1.0):
    c = fr.astype(np.float32) / 255.; w = 253 / 255.
    a = np.clip(((w - c) / w).max(axis=2), 0, 1)
    ink = (c - (1 - a[..., None]) * w) / np.maximum(a[..., None], 1e-3); ink = np.clip(ink, 0, 1)
    mx, mn = ink.max(axis=2), ink.min(axis=2); sat = np.where(mx > 0.05, (mx - mn) / np.maximum(mx, 1e-3), 0)
    grey = (sat < .3) | (ink[..., 2] >= ink.max(axis=2) - 1e-4)                # source has no blue data colours: blue-greys → white
    col = ink / np.maximum(mx[..., None], 1e-3)                                  # full-brightness hue
    col = col * .92 + .08                                                         # lift for dark background
    out_ink = np.where(grey[..., None], np.array([.988, .988, .988]), col)
    a2 = np.where(grey, a, np.clip(a * 1.6, 0, 1))
    o = BG * (1 - a2[..., None]) + out_ink * a2[..., None]
    la = L[..., 3:] * logo_a; reg = o[LY:LY + L.shape[0], LX:LX + lw]; o[LY:LY + L.shape[0], LX:LX + lw] = reg * (1 - la) + L[..., :3] * la
    return (o * 255 + .5).astype(np.uint8)
if __name__ == '__main__':
    for t in sys.argv[1:]:
        raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', t, '-i', 'vid.mp4', '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True).stdout
        Image.fromarray(rebrand(np.frombuffer(raw, np.uint8).reshape(H, Wd, 3))).resize((360, 640)).save(f'f/rb{t}.png')
