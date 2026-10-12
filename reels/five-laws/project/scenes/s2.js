import { bg, subs, header, marker, rrect, wordAt, FB } from './lib.js';
const ITEMS = ['التمرين', 'الشغل على هدفي', 'القراءة', 'النوم بدري'];
MOTION.scene({ id: 's2',
  draw(t, lt, ctx) {
    const { X, P, at } = ctx; bg(ctx, t); header(ctx, t, lt, 1, 'الانضباط');
    const c = at(lt, .35, .9, 'expoOut');
    X.save(); X.globalAlpha = c; X.translate(0, (1 - c) * 60);
    X.fillStyle = P.card; X.strokeStyle = 'rgba(87,161,239,.28)'; X.lineWidth = 2; rrect(X, 140, 470, 800, 600, 36); X.fill(); X.stroke();
    ctx.text(X, 'مهام اليوم', 860, 540, { family: FB, weight: 700, size: 36, color: P.mut, align: 'right' });
    ITEMS.forEach((s, i) => {
      const y = 650 + i * 120, ta = .9 + i * .85, k = at(lt, ta, ta + .45, 'expoOut'), ck = at(lt, ta + .5, ta + .85, 'cubicOut');
      if (k <= 0) return;
      X.save(); X.globalAlpha = k * c; X.translate((1 - k) * 50, 0);
      X.fillStyle = ck > 0 ? `rgba(87,161,239,${.2 * ck})` : 'transparent'; X.strokeStyle = ck > 0 ? P.acc : P.mut; X.lineWidth = 4;
      rrect(X, 806, y - 44, 64, 64, 16); X.fill(); X.stroke();
      if (ck > 0) ctx.drawPath(X, [[820, y - 13], [834, y + 2], [858, y - 26]], ck, { width: 9, color: P.hi, cap: 'round' });
      ctx.text(X, s, 776, y + 2, { family: FB, weight: 700, size: 50, color: ck > .5 ? P.ink : P.mut, align: 'right' });
      if (i < ITEMS.length - 1) { X.fillStyle = 'rgba(140,154,184,.15)'; X.fillRect(200, y + 48, 680, 2); }
      X.restore();
    });
    X.restore();
    marker(ctx, t, 'حتى لو مالك خلق', 1230, wordAt(ctx, 'l2', /^حتى/, -.05));
    subs(ctx, t, 'l2');
  } });
