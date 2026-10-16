// Arabic subtitles for the voice: one spoken segment at a time (max 2 lines), spoken words light up, current word cyan.
import { SUBS } from './subs.js';
import { rrect, FD, UP, INK } from './lib.js';
const HIDE = ['l1'];   // the hook headline already carries line 1
MOTION.scene({ id: 'subs', overlay: true,
  draw(t, lt, ctx) {
    const { X, at } = ctx;
    const i = SUBS.findIndex((s, j) => t >= s.s - .12 && t < (SUBS[j + 1] ? Math.min(SUBS[j + 1].s - .12, s.e + 1.2) : s.e + .8));
    if (i < 0) return; const s = SUBS[i]; if (HIDE.includes(s.line)) return;
    const nxt = SUBS[i + 1], end = nxt ? Math.min(nxt.s - .12, s.e + 1.2) : s.e + .8;
    const inK = at(t, s.s - .12, s.s + .15, 'expoOut'), outK = 1 - at(t, end - .15, end, 'quadIn'), a = inK * outK; if (a <= 0) return;
    const size = 54, lh = 1.42, str = s.words.map(w => w.w).join(' ');
    const L = ctx.text.layout(X, str, { family: FD, weight: 800, size, maxWidth: 860, lineHeight: lh });
    const n = L.lines.length, y0 = 1452 - (n - 1) * size * lh;
    X.save(); X.globalAlpha = .8 * a; X.fillStyle = 'rgba(0,5,26,.86)'; X.strokeStyle = 'rgba(87,161,239,.35)'; X.lineWidth = 2;
    rrect(X, 540 - L.width / 2 - 34, y0 - size * 1.08, L.width + 68, n * size * lh + 26, 24); X.fill(); X.stroke(); X.restore();
    ctx.text.drawLayout(X, L, 540, y0, { align: 'center', color: INK, perWord: k => {
      const w = s.words[k], spoken = t >= w.s, active = t >= w.s && t < w.e + .05;
      return { alpha: (spoken ? 1 : .38) * a, dy: (1 - inK) * 16, color: active ? UP : INK }; } });
  } });
