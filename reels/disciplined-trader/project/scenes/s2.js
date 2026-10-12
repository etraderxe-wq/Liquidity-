import { bg, header, marker, rrect, panel, candles, series, FB } from './lib.js';
const ITEMS = ['راجع خطتك', 'انتظر شروط الدخول', 'حدّد مخاطرتك', 'التزم بوقف الخسارة'];
const S = series(8, 14, .1);
MOTION.scene({ id: 's2',
  draw(t, lt, ctx) {
    const { X, P, at } = ctx; bg(ctx, t); header(ctx, t, lt, 1, 'الانضباط');
    const c = at(lt, .3, .8, 'expoOut'); panel(ctx, 140, 430, 800, 500, c);
    ITEMS.forEach((s, i) => {
      const y = 535 + i * 112, ta = 1.2 + i * .8, k = at(lt, ta, ta + .4, 'expoOut'), ck = at(lt, ta + .45, ta + .8, 'cubicOut'); if (k <= 0) return;
      X.save(); X.globalAlpha = k; X.translate((1 - k) * 50, 0);
      X.fillStyle = `rgba(87,161,239,${.22 * ck})`; X.strokeStyle = ck > 0 ? P.hi : P.mut; X.lineWidth = 4; rrect(X, 806, y - 44, 62, 62, 16); X.fill(); X.stroke();
      if (ck > 0) ctx.drawPath(X, [[819, y - 13], [833, y + 2], [856, y - 26]], ck, { width: 9, color: P.hi, cap: 'round' });
      ctx.text(X, s, 774, y + 4, { family: FB, weight: 700, size: 50, color: P.ink, align: 'right' });
      X.restore();
    });
    marker(ctx, lt, 'حتى لو مالك خلق', 1050, 1.8, { size: 62 });
    // trade example: candles + entry line + stop line (illustrative, no prices)
    const pa = at(lt, 4.4, 4.9, 'expoOut'); if (pa <= 0) return;
    panel(ctx, 140, 1110, 800, 330, pa);
    const box = { x: 380, y: 1140, w: 530, h: 270 };
    const m = candles(ctx, S, box, lt, 4.6, .12, { alpha: pa });
    const entry = S[9].c, stop = Math.min(...S.slice(6, 10).map(c => c.l)) - 1.5;
    const ey = Math.max(box.y + 6, m.Y(entry)), sy = Math.min(box.y + box.h, m.Y(stop) + 10);
    [[ey, P.hi, 'دخول', 6.3], [sy, P.ink, 'وقف الخسارة', 6.9]].forEach(([y, col, lab, t0]) => {
      const k = at(lt, t0, t0 + .5, 'expoOut'); if (k <= 0) return;
      X.save(); X.strokeStyle = col; X.lineWidth = 4; X.setLineDash([16, 12]); X.beginPath(); X.moveTo(910, y); X.lineTo(910 - 530 * k, y); X.stroke(); X.restore();
      ctx.text(X, lab, 362, y + 13, { family: FB, weight: 700, size: 38, color: col, align: 'right', alpha: k });
    });
  } });
