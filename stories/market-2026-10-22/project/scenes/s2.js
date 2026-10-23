// 02 MARKET PERFORMANCE — dashboard with session closes (22 Oct 2026)
import { frame, title, card, candles, series, tri, note, UP, INK, MUT, RED, GRN, GOLD } from './kit.js';
const R = [['GOLD', 'XAUUSD · الذهب', -2.88, 1, GOLD], ['SILVER', 'XAGUSD · الفضة', -5.87, 2, '#C9D1DC'], ['NASDAQ', 'ناسداك المركّب', -2.60, 3, INK], ['S&P 500', 'إس آند بي 500', -1.21, 5, INK], ['BRENT', 'خام برنت', 2.64, 4, GRN]];
MOTION.scene({ id: 's2', draw(t, lt, ctx) { const { X, at } = ctx; frame(ctx, t, lt, 2);
  title(ctx, lt, 'شنو صار بالأسواق؟', 360, .1, { size: 84 });
  ctx.text(X, 'SESSION CLOSE · THU 22 OCT 2026', 1010, 430, { family: 'Michroma', size: 18, color: MUT, dir: 'ltr', align: 'right', alpha: at(lt, .6, 1) });
  R.forEach(([en, ar, v, s, col], i) => { const y = 480 + i * 182, t0 = 1.0 + i * .9, a = at(lt, t0, t0 + .4, 'expoOut'); if (a <= 0) return; const up = v > 0;
    X.save(); X.translate((1 - a) * 60, 0); card(ctx, 70, y, 940, 160, a, { bar: up ? GRN : RED });
    X.globalAlpha = a; ctx.text(X, en, 970, y + 62, { family: 'Michroma', size: 26, color: col, dir: 'ltr', align: 'right' });
    ctx.text(X, ar, 970, y + 116, { family: 'Tajawal', weight: 700, size: 32, color: MUT, align: 'right' });
    candles(ctx, lt, series(s * 5, 22, up ? 1 : -1, .35, 1), { x: 360, y: y + 26, w: 250, h: 108 }, t0, .8, { grid: false });
    const n = v * Math.min(1, at(lt, t0 + .2, t0 + 1.0, 'expoOut')), str = (up ? '+' : '−') + Math.abs(n).toFixed(2) + '%';
    ctx.text(X, str, 110, y + 98, { family: 'Inter', weight: 900, size: 56, color: up ? GRN : RED, dir: 'ltr', align: 'left' });
    X.restore(); });
  note(ctx, 'أرقام إغلاق جلسة الخميس 22 أكتوبر وليست أسعاراً لحظية', at(lt, 5.5, 6));
} });
