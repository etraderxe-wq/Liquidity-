// 42–52 s · split screen: LIQUIDITY SWEEP vs BREAK OF STRUCTURE
import { bg, L, txt, en, UP, INK, MUT, GRN, RED, LIQ, WHITE } from './k.js';
const A = ['اختراق القاع أو القمة.', 'أخذ السيولة.', 'فتيل يخترق المستوى.', 'رجوع السعر داخل النطاق.'];
const B = ['تجاوز مستوى هيكلي مهم.', 'إغلاق واضح خارج المستوى.', 'اندفاع سعري.', 'تأكيد استمرار أو تحوّل الهيكل حسب السياق.'];
function mini(ctx, t, x, y, w, h, kind, t0) { const { X, at } = ctx, k = at(t, t0, t0 + 1.4);
  const cs = kind === 'sweep' ? [[60, 62, 52, 54], [54, 56, 46, 48], [48, 52, 46.5, 51], [51, 52, 42, 50.5], [50.5, 58, 50, 57]] : [[50, 52, 44, 46], [46, 54, 45, 53], [53, 55, 49, 50], [50, 63, 49.5, 62], [62, 66, 61, 65]];
  const lev = kind === 'sweep' ? 46 : 55, Y = p => y + h - (p - 40) / 28 * h, st = w / 6;
  X.save(); X.strokeStyle = kind === 'sweep' ? LIQ : WHITE; X.setLineDash([10, 8]); X.lineWidth = 3; X.beginPath(); X.moveTo(x, Y(lev)); X.lineTo(x + w, Y(lev)); X.stroke(); X.restore();
  cs.forEach((c, i) => { if (i / cs.length > k) return; const [o, hh, l, cl] = c, up = cl >= o, col = up ? GRN : RED, xx = x + st * (i + 1);
    X.strokeStyle = X.fillStyle = col; X.lineWidth = 3; X.beginPath(); X.moveTo(xx, Y(hh)); X.lineTo(xx, Y(l)); X.stroke(); X.fillRect(xx - st * .3, Math.min(Y(o), Y(cl)), st * .6, Math.abs(Y(o) - Y(cl))); }); }
MOTION.scene({ id: 's5', draw(t, lt, ctx) { const { X, at, W, H } = ctx, Ly = L(ctx), T0 = 42; bg(ctx, t, .6);
  txt(ctx, t, 'الفرق بين الحركتين', W / 2, Ly.P ? 300 : 130, T0 + .1, { size: Ly.P ? 70 : 64, w: Ly.P ? 940 : 1600 });
  const cols = Ly.P ? [[540, 400, 'LIQUIDITY SWEEP', A, LIQ, 'sweep'], [540, 1020, 'BREAK OF STRUCTURE', B, GRN, 'bos']] : [[1440, 200, 'LIQUIDITY SWEEP', A, LIQ, 'sweep'], [480, 200, 'BREAK OF STRUCTURE', B, GRN, 'bos']];
  cols.forEach(([cx, top, title, items, col, kind], ci) => { const t0 = T0 + .6 + ci * 3.6, a = at(t, t0, t0 + .5, 'expoOut'); if (a <= 0) return;
    const w = Ly.P ? 940 : 880, h = Ly.P ? 580 : 820, x0 = cx - w / 2;
    X.save(); X.globalAlpha = a; X.fillStyle = 'rgba(6,9,16,.92)'; X.strokeStyle = col; X.lineWidth = 2.5; X.beginPath(); X.roundRect(x0, top, w, h, 26); X.fill(); X.stroke(); X.restore();
    ctx.text(X, title, cx, top + 60, { family: 'Michroma', size: Ly.P ? 30 : 32, color: col, dir: 'ltr', alpha: a });
    const mx = Ly.P ? x0 + 30 : x0 + 60, my = Ly.P ? top + 100 : top + 100, mw = Ly.P ? 300 : w - 120, mh = Ly.P ? 440 : 280; mini(ctx, t, mx, my, mw, mh, kind, t0 + .3);
    items.forEach((s, i) => { const q = at(t, t0 + .8 + i * .55, t0 + 1.2 + i * .55, 'expoOut'); if (q <= 0) return;
      const ix = Ly.P ? x0 + w - 30 : x0 + w - 60, iy = Ly.P ? top + 150 + i * 105 : top + 450 + i * 88;
      X.save(); X.globalAlpha = q; X.fillStyle = col; X.beginPath(); X.arc(ix - 8, iy - 12, 7, 0, 6.283); X.fill(); X.restore();
      const Lt = ctx.text.layout(X, s, { family: 'Tajawal', weight: 800, size: Ly.P ? 36 : 36, maxWidth: Ly.P ? 560 : w - 140, lineHeight: 1.3 });
      ctx.text.drawLayout(X, Lt, ix - 30, iy, { align: 'right', color: INK, perWord: () => ({ alpha: q }) }); }); });
} });
