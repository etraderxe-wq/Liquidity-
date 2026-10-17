// Arabic subtitle (main) + original English line (small) — synced to the speech.
import { SEG } from './subs.js';
const HI = /إنت|مخاوفك|أعذارك|قدراتك|الأسهل|ما توقف|عظيمة|تفوز|معركة|سعادتك|نجاحك|الأثر|مديون|بالنجاح|أحلامك|مختصر|حظ|عليك/;
MOTION.scene({ id: 'subs', overlay: true,
  draw(t, lt, ctx) {
    const { X, at } = ctx, i = SEG.findIndex((s, j) => t >= s.s - .08 && t < (SEG[j + 1] ? Math.min(SEG[j + 1].s - .08, s.e + .6) : s.e + .5)); if (i < 0) return;
    const s = SEG[i], end = SEG[i + 1] ? Math.min(SEG[i + 1].s - .08, s.e + .6) : s.e + .5, a = at(t, s.s - .08, s.s + .1) * (1 - at(t, end - .12, end)); if (a <= 0) return;
    const L = ctx.text.layout(X, s.ar, { family: 'Tajawal', weight: 800, size: 52, maxWidth: 900, lineHeight: 1.4 }), n = L.lines.length, y0 = 1470 - (n - 1) * 73;
    X.save(); X.globalAlpha = .82 * a; X.fillStyle = 'rgba(5,6,10,.86)'; X.strokeStyle = 'rgba(87,161,239,.35)'; X.lineWidth = 2;
    X.beginPath(); X.roundRect(540 - Math.max(L.width, 560) / 2 - 34, y0 - 110, Math.max(L.width, 560) + 68, n * 73 + 80, 24); X.fill(); X.stroke(); X.restore();
    ctx.text(X, s.en, 540, y0 - 66, { family: 'Inter', weight: 600, size: 26, color: '#8C94A8', dir: 'ltr', maxWidth: 900, alpha: a });
    ctx.text.drawLayout(X, L, 540, y0, { align: 'center', color: '#FCFCFC', perWord: (k, w) => ({ alpha: a, dy: (1 - at(t, s.s - .08, s.s + .2, 'expoOut')) * 14,
      color: HI.test(w.text) ? '#93F9FF' : '#FCFCFC', shadow: HI.test(w.text) ? { blur: 18, color: 'rgba(147,249,255,.5)' } : undefined }) });
  } });
