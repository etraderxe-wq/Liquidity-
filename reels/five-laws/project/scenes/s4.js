import { bg, subs, header, marker, rrect, wordAt, FB, FN } from './lib.js';
MOTION.scene({ id: 's4',
  draw(t, lt, ctx) {
    const { X, P, at, E } = ctx; bg(ctx, t); header(ctx, t, lt, 3, 'الاستمرارية');
    const cs = 96, gap = 14, x0 = 918, y0 = 480, a = at(lt, .3, .9, 'expoOut');
    let lit = 0;
    for (let d = 0; d < 28; d++) {
      const c = d % 7, r = Math.floor(d / 7), x = x0 - cs - c * (cs + gap), y = y0 + r * (cs + gap);
      const ap = at(lt, .3 + d * .018, .7 + d * .018, 'expoOut'), on = .95 + d * .19, k = at(lt, on, on + .28, 'backOut');
      if (k > 0) lit = d + ctx.prog(lt, on, on + .28);
      X.save(); X.globalAlpha = ap; X.translate(x + cs / 2, y + cs / 2); const s = 1 + .12 * Math.sin(Math.min(1, ctx.prog(lt, on, on + .3)) * 3.1416); X.scale(s, s);
      X.fillStyle = P.card; X.strokeStyle = 'rgba(87,161,239,.25)'; X.lineWidth = 2; rrect(X, -cs / 2, -cs / 2, cs, cs, 20); X.fill(); X.stroke();
      if (k > 0) { X.globalAlpha = ap * Math.min(1, k); const g = X.createLinearGradient(-48, -48, 48, 48); g.addColorStop(0, P.hi); g.addColorStop(1, P.acc); X.fillStyle = g; rrect(X, -cs / 2, -cs / 2, cs, cs, 20); X.fill(); }
      X.globalAlpha = ap; ctx.text(X, String(d + 1), 0, 13, { family: FN, weight: 700, size: 36, color: k > .4 ? P.bg : P.mut, dir: 'ltr' });
      X.restore();
    }
    // progress bar fills right→left with the streak
    const p = Math.min(1, lit / 27.99), bw = 756, bx = 162, by = 960;
    X.globalAlpha = a; X.fillStyle = 'rgba(140,154,184,.18)'; rrect(X, bx, by, bw, 26, 13); X.fill();
    if (p > 0) { const g = X.createLinearGradient(bx + bw, 0, bx, 0); g.addColorStop(0, P.acc2); g.addColorStop(1, P.hi); X.fillStyle = g; rrect(X, bx + bw * (1 - p), by, bw * p, 26, 13); X.fill(); }
    ctx.text(X, 'التقدّم', 918, 1040, { family: FB, weight: 700, size: 38, color: P.mut, align: 'right' });
    ctx.text(X, Math.round(p * 100) + '%', 162, 1042, { family: FN, weight: 800, size: 44, color: P.ink, align: 'left', dir: 'ltr' });
    X.globalAlpha = 1;
    marker(ctx, t, 'كل يوم', 1235, wordAt(ctx, 'l4', /^كل$/, -.05), { size: 80 });
    subs(ctx, t, 'l4');
  } });
