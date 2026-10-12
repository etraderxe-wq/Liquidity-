import { bg, header, panel, candles, series, lineText, rrect } from './lib.js';
const S = series(21, 26, 0);
const ZONES = [[2, 6], [8, 11], [13, 17], [19, 23]], KEEP = 2;
MOTION.scene({ id: 's3',
  draw(t, lt, ctx) {
    const { X, P, at } = ctx; bg(ctx, t); header(ctx, t, lt, 2, 'التركيز');
    const pa = at(lt, .3, .8, 'expoOut'); panel(ctx, 100, 440, 880, 660, pa);
    const box = { x: 140, y: 490, w: 800, h: 560 }, fade = at(lt, 4.0, 4.8, 'cubicInOut');
    const m = candles(ctx, S, box, lt, .4, .08, { alpha: pa, dimAt: i => { const z = ZONES[KEEP]; return i >= z[0] && i <= z[1] ? 1 : 1 - .7 * fade; } });
    ZONES.forEach(([a, b], zi) => {
      const k = at(lt, 2.6 + zi * .25, 3.0 + zi * .25, 'expoOut'); if (k <= 0) return;
      const seg = S.slice(a, b + 1), top = m.Y(Math.max(...seg.map(c => c.h))) - 16, bot = m.Y(Math.min(...seg.map(c => c.l))) + 16;
      const x = box.x + m.step * a - 6, w = m.step * (b - a + 1) + 12, keep = zi === KEEP;
      X.save(); X.globalAlpha = k * (keep ? 1 : 1 - fade);
      X.fillStyle = 'rgba(252,252,252,.06)'; X.strokeStyle = 'rgba(252,252,252,.45)'; X.lineWidth = 3; X.setLineDash([10, 8]);
      rrect(X, x, top, w, bot - top, 14); X.fill(); X.stroke(); X.restore();
      if (keep) { const f = at(lt, 4.6, 5.1, 'expoOut'); if (f > 0) { X.save(); X.strokeStyle = P.hi; X.lineWidth = 7; X.shadowColor = P.hi; X.shadowBlur = 26 * f; X.globalAlpha = f;
        rrect(X, x - 8 * (1 - f) - 4, top - 4, w + 8, bot - top + 8, 16); X.stroke(); X.restore(); } }
    });
    lineText(ctx, lt, 'ركّز على نموذج واضح', 1230, 5.2, { size: 66 });
    lineText(ctx, lt, 'لا تطارد كل حركة', 1350, 6.4, { size: 58, weight: 700, color: P.hi });
  } });
