// 06 FEDERAL RESERVE — oil → inflation → higher-for-longer?, and the watch list
import { frame, title, line, card, arrow, takeaway, UP, INK, MUT, RED, GRN, GOLD } from './kit.js';
function fed(ctx, x, y, a) { const X = ctx.X; X.save(); X.globalAlpha = a; X.translate(x, y); X.strokeStyle = UP; X.lineWidth = 3; X.shadowColor = UP; X.shadowBlur = 12;
  X.beginPath(); X.moveTo(-170, -40); X.lineTo(0, -110); X.lineTo(170, -40); X.closePath(); X.stroke();
  X.strokeRect(-180, -40, 360, 18); for (let i = 0; i < 8; i++) { const cx = -150 + i * 43; X.strokeRect(cx - 9, -16, 18, 120); } X.strokeRect(-195, 106, 390, 18); X.restore(); }
MOTION.scene({ id: 's6', draw(t, lt, ctx) { const { X, at } = ctx; frame(ctx, t, lt, 6);
  title(ctx, lt, 'كل العيون على الفيدرالي', 360, .1, { size: 80, hi: /الفيدرالي/ });
  fed(ctx, 540, 560, at(lt, .5, 1.2));
  // rate path gauge (illustrative): bar rising
  const C = [['نفط أعلى', GRN], ['مخاوف تضخم', GOLD], ['فائدة مرتفعة لفترة أطول؟', RED]];
  C.forEach(([s, col], i) => { const t0 = 1.6 + i * 1.0, a = at(lt, t0, t0 + .4, 'backOut'), x = 1010 - i * 320 - 290; card(ctx, x, 740, 290, 110, a, { stroke: col });
    ctx.text(X, s, x + 145, 808, { family: 'Tajawal', weight: 900, size: 31, color: INK, alpha: a, maxWidth: 265 });
    if (i) arrow(ctx, x + 316, 795, x + 296, 795, at(lt, t0 - .2, t0), MUT); });
  line(ctx, lt, 'التضخم المرتفع ممكن يخلي الفيدرالي يتمسك بالفائدة المرتفعة لفترة أطول.', 910, 4.6, { size: 33 });
  const W = ['قرار الفائدة الأمريكية', 'تصريحات الفيدرالي', 'بيانات التضخم PCE', 'حركة عوائد السندات والدولار'];
  line(ctx, lt, 'الأسواق تترقب:', 990, 6.0, { size: 38, weight: 900, color: UP });
  W.forEach((s, i) => { const t0 = 6.5 + i * .7, a = at(lt, t0, t0 + .4, 'expoOut'), y = 1030 + i * 105; card(ctx, 70, y, 940, 88, a);
    X.save(); X.globalAlpha = a; X.strokeStyle = UP; X.lineWidth = 3; X.beginPath(); X.arc(960, y + 44, 16, 0, 6.283); X.stroke();
    X.beginPath(); X.moveTo(951, y + 44); X.lineTo(958, y + 51); X.lineTo(970, y + 37); X.stroke(); X.restore();
    ctx.text(X, s, 920, y + 56, { family: 'Tajawal', weight: 800, size: 36, color: INK, align: 'right', alpha: a }); });
} });
