// 03 THE OIL SHOCK — rising Brent, Gulf supply risk, oil → energy → costs → inflation chain
import { frame, title, line, card, candles, series, arrow, takeaway, UP, INK, MUT, RED, GRN, GOLD } from './kit.js';
function barrel(ctx, x, y, s, a) { const X = ctx.X; X.save(); X.globalAlpha = a; X.translate(x, y); X.scale(s, s);
  X.fillStyle = '#0E1A2E'; X.strokeStyle = GRN; X.lineWidth = 4; X.beginPath(); X.ellipse(0, -60, 50, 14, 0, 0, 6.283); X.fill(); X.stroke();
  X.beginPath(); X.moveTo(-50, -60); X.lineTo(-50, 60); X.ellipse(0, 60, 50, 14, 0, Math.PI, 0, true); X.lineTo(50, -60); X.stroke();
  for (const yy of [-20, 20]) { X.beginPath(); X.ellipse(0, yy, 50, 12, 0, 0, Math.PI); X.stroke(); } X.restore(); }
MOTION.scene({ id: 's3', draw(t, lt, ctx) { const { X, at } = ctx; frame(ctx, t, lt, 3);
  title(ctx, lt, 'ليش النفط قاعد يصعد؟', 360, .1, { size: 80, hi: /يصعد/, hiColor: GRN });
  card(ctx, 70, 430, 940, 330, at(lt, .5, .9));
  candles(ctx, lt, series(41, 34, 1, .3, 1.1), { x: 100, y: 470, w: 600, h: 260 }, .6, 2.4, { tag: true, tagColor: GRN });
  ctx.text(X, 'BRENT', 690, 465, { family: 'Michroma', size: 20, color: GRN, dir: 'ltr', align: 'right', alpha: at(lt, .7, 1) });
  barrel(ctx, 850, 600, 1.1, at(lt, 1.2, 1.7));
  // Gulf supply risk pin
  const pk = at(lt, 2.4, 2.9); if (pk > 0) { X.save(); X.globalAlpha = pk; X.fillStyle = RED; X.beginPath(); X.arc(850, 720, 9 + 4 * Math.sin(lt * 6), 0, 6.283); X.fill(); X.restore();
    ctx.text(X, 'مخاطر إمدادات الخليج', 850, 750, { family: 'Tajawal', weight: 800, size: 26, color: INK, alpha: pk }); }
  line(ctx, lt, 'مخاوف تعطل إمدادات النفط والتوترات الجيوسياسية', 830, 2.8, { size: 38 });
  line(ctx, lt, 'دفعت الأسعار للصعود.', 885, 3.3, { size: 38 });
  // chain
  const C = [['طاقة أغلى', GRN], ['تكاليف إنتاج أعلى', GOLD], ['ضغوط تضخمية أكبر', RED]];
  C.forEach(([s, col], i) => { const t0 = 4.6 + i * 1.1, a = at(lt, t0, t0 + .4, 'backOut'), x = 1010 - i * 320 - 290; card(ctx, x, 960, 290, 120, a, { stroke: col });
    ctx.text(X, s, x + 145, 1032, { family: 'Tajawal', weight: 900, size: 34, color: INK, alpha: a, maxWidth: 260 });
    if (i) arrow(ctx, x + 316, 1020, x + 296, 1020, at(lt, t0 - .2, t0), MUT); });
  line(ctx, lt, 'ارتفاع النفط يعني:', 935, 4.3, { size: 32, color: MUT });
  takeaway(ctx, lt, 'النفط مو مجرد سلعة… ارتفاعه ممكن يغيّر توقعات الفائدة بالكامل.', 8.4, 1150);
} });
