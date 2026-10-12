import { bg, rrect, lineText, FD, FN } from './lib.js';
const R = ['الانضباط', 'التركيز', 'الاستمرارية', 'المسؤولية', 'التطوّر'];
MOTION.scene({ id: 's7',
  draw(t, lt, ctx) {
    const { X, P, at } = ctx; bg(ctx, t);
    const cyc = lt > 1.1 ? ((lt - 1.1) / .6) % 5 : -1, cur = Math.floor(cyc);   // light moves on, never settles
    R.forEach((s, i) => {
      const y = 360 + i * 112, k = at(lt, .1 + i * .12, .55 + i * .12, 'expoOut'); if (k <= 0) return;
      const on = i === cur ? Math.sin(Math.PI * (cyc - cur)) : 0;
      X.save(); X.globalAlpha = k; X.translate((1 - k) * 80, 0);
      X.shadowColor = P.hi; X.shadowBlur = 30 * on; X.fillStyle = 'rgba(0,5,26,.85)'; X.strokeStyle = on > .05 ? P.hi : 'rgba(87,161,239,.3)'; X.lineWidth = 3;
      rrect(X, 230, y - 46, 620, 92, 26); X.fill(); X.stroke(); X.shadowBlur = 0;
      X.fillStyle = on > .05 ? P.hi : P.acc; X.beginPath(); X.arc(800, y, 30, 0, 6.283); X.fill();
      ctx.text(X, String(i + 1), 800, y + 14, { family: FN, weight: 900, size: 38, color: P.bg, dir: 'ltr' });
      ctx.text(X, s, 745, y + 18, { family: FD, weight: 800, size: 50, color: P.ink, align: 'right' });
      X.restore();
    });
    lineText(ctx, lt, 'أي قاعدة تحتاج تطبّقها اليوم؟', 1020, 1.4, { size: 58, weight: 900 });
    lineText(ctx, lt, 'اكتب رقمها بالتعليقات', 1140, 2.4, { size: 56, weight: 700, color: P.hi });
  } });
