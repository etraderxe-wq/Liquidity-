import { bg, header, panel, rrect, lineText, FN } from './lib.js';
const TRADE = new Set([2, 5, 9, 13, 18, 22, 26]);   // days with a trade; every day gets a review
function eye(X, x, y, s, col) { X.strokeStyle = col; X.lineWidth = 4; X.beginPath(); X.moveTo(x - s, y); X.quadraticCurveTo(x, y - s * .9, x + s, y); X.quadraticCurveTo(x, y + s * .9, x - s, y); X.stroke(); X.fillStyle = col; X.beginPath(); X.arc(x, y, s * .32, 0, 6.283); X.fill(); }
MOTION.scene({ id: 's4',
  draw(t, lt, ctx) {
    const { X, P, at } = ctx; bg(ctx, t); header(ctx, t, lt, 3, 'الاستمرارية');
    panel(ctx, 130, 430, 820, 560, at(lt, .3, .8, 'expoOut'));
    const cs = 98, gap = 12, x0 = 918, y0 = 470;
    for (let d = 0; d < 28; d++) {
      const c = d % 7, r = Math.floor(d / 7), x = x0 - cs - c * (cs + gap), y = y0 + r * (cs + gap);
      const ap = at(lt, .4 + d * .015, .8 + d * .015, 'expoOut'), on = 1.0 + d * .16, k = at(lt, on, on + .3, 'backOut');
      X.save(); X.globalAlpha = ap; X.fillStyle = 'rgba(8,22,61,.9)'; X.strokeStyle = k > 0 ? 'rgba(147,249,255,.55)' : 'rgba(87,161,239,.25)'; X.lineWidth = 2;
      rrect(X, x, y, cs, cs, 18); X.fill(); X.stroke();
      ctx.text(X, String(d + 1), x + cs - 16, y + 30, { family: FN, weight: 600, size: 24, color: P.mut, align: 'right', dir: 'ltr' });
      if (k > 0) {
        X.save(); X.translate(x + cs / 2, y + cs / 2 + 10); X.scale(Math.min(1.1, k), Math.min(1.1, k));
        eye(X, TRADE.has(d) ? 14 : 0, 0, 20, P.hi);
        if (TRADE.has(d)) { X.fillStyle = P.acc; X.fillRect(-28, -18, 12, 30); X.strokeStyle = P.acc; X.lineWidth = 3; X.beginPath(); X.moveTo(-22, -26); X.lineTo(-22, 20); X.stroke(); }
        X.restore();
      }
      X.restore();
    }
    lineText(ctx, lt, 'راجع وسجّل باستمرار', 1130, 5.6, { size: 66 });
    lineText(ctx, lt, 'الالتزام مو كثرة صفقات', 1250, 6.6, { size: 58, weight: 700, color: P.hi });
  } });
