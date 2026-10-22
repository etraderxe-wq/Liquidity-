// Arabic subtitles: heavy white Tajawal, key words in EMULLAX cyan, words rise in one by one (kinetic).
import { SEG } from './subs.js';
MOTION.scene({ id: 'subs', overlay: true, draw(t, lt, ctx) { const { X, at } = ctx;
  const s = SEG.find((x, j) => t >= x.s - .08 && t < (SEG[j + 1] ? Math.min(SEG[j + 1].s - .08, x.e + .5) : x.e + .6)); if (!s) return;
  const j = SEG.indexOf(s), end = SEG[j + 1] ? Math.min(SEG[j + 1].s - .08, s.e + .5) : s.e + .6, out = 1 - at(t, end - .15, end);
  const L = ctx.text.layout(X, s.ar, { family: 'Tajawal', weight: 900, size: 76, maxWidth: 940, lineHeight: 1.35 }), n = L.lines.length, y0 = 1330 - (n - 1) * 52;
  const N = L.words ? L.words.length : s.ar.split(' ').length, dur = Math.max(.25, (s.e - s.s) * .7);
  ctx.text.drawLayout(X, L, 540, y0, { align: 'center', color: '#FCFCFC', perWord: (i, w) => { const t0 = s.s - .05 + dur * i / Math.max(1, N), q = at(t, t0, t0 + .3, 'expoOut');
    const hi = s.hi.some(h => String(w).includes(h.replace('.', '')));
    return { alpha: q * out, dy: (1 - q) * 40, scale: .9 + .1 * q, color: hi ? '#93F9FF' : '#FCFCFC', shadow: hi ? { blur: 26, color: 'rgba(147,249,255,.6)' } : { blur: 18, color: 'rgba(0,0,0,.8)' } }; } });
  ctx.text(X, s.en, 540, y0 + n * 95 - 20, { family: 'Inter', weight: 600, size: 28, color: '#8C94A8', dir: 'ltr', alpha: at(t, s.s, s.s + .3) * out });
} });
