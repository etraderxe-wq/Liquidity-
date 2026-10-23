// 01 THE MARKET SHOCK — four charts: gold, silver, Nasdaq down (red) vs oil up (green)
import { frame, title, line, card, candles, series, tri, UP, INK, MUT, RED, GRN, GOLD } from './kit.js';
const A = [['GOLD', 'الذهب نازل', 1, -1, GOLD], ['SILVER', 'الفضة نازلة', 2, -1, '#C9D1DC'], ['NASDAQ · S&P 500', 'المؤشرات تحت الضغط', 3, -1, INK], ['BRENT OIL', 'النفط قاعد يصعد!', 4, 1, GRN]];
MOTION.scene({ id: 's1', draw(t, lt, ctx) { const { X, at, E } = ctx; frame(ctx, t, lt, 1);
  // cinematic title: scale-down + red pulse dot
  const k = at(lt, .1, .9, 'expoOut'); X.save(); X.translate(540, 380); X.scale(1.15 - .15 * k, 1.15 - .15 * k); X.translate(-540, -380); X.globalAlpha = k;
  title(ctx, lt, 'ليش الأسواق الأمريكية طاحت والنفط ارتفع؟', 360, .1, { size: 72, hi: /طاحت|ارتفع/, hiColor: UP }); X.restore();
  const p = .6 + .4 * Math.sin(lt * 6); X.fillStyle = RED; X.globalAlpha = k * p; X.beginPath(); X.arc(95, 330, 14, 0, 6.283); X.fill(); X.globalAlpha = 1;
  A.forEach(([en, ar, s, dir, col], i) => { const x = i % 2 ? 70 : 555, y = i < 2 ? 560 : 900, w = 455, h = 310, t0 = 1.2 + i * 1.3, a = at(lt, t0 - .3, t0 + .2);
    card(ctx, x, y, w, h, a, { stroke: dir < 0 ? 'rgba(255,77,94,.4)' : 'rgba(46,230,166,.45)' }); if (a <= 0) return;
    X.save(); X.globalAlpha = a; ctx.text(X, en, x + 24, y + 46, { family: 'Michroma', size: 20, color: col, dir: 'ltr', align: 'left' });
    candles(ctx, lt, series(s * 3, 26, dir, .4, 1.2), { x: x + 20, y: y + 70, w: w - 40, h: 160 }, t0, 1.1);
    const tk = at(lt, t0 + .9, t0 + 1.2); ctx.text(X, ar, x + w - 24, y + h - 26, { family: 'Tajawal', weight: 800, size: 34, color: dir < 0 ? INK : GRN, align: 'right', alpha: tk });
    tri(ctx, x + 40, y + h - 38, 14, dir > 0, dir > 0 ? GRN : RED, tk); X.restore(); });
  line(ctx, lt, 'شنو اللي قاعد يصير بالضبط؟', 1330, 7.0, { size: 54, weight: 900, color: UP, x: 540, align: 'center' });
} });
