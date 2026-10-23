// 07 WHAT'S NEXT — three conditional watch cards (no price targets)
import { frame, title, card, candles, series, takeaway, UP, INK, MUT, RED, GRN, GOLD } from './kit.js';
const K = [['GOLD · SILVER', 'الذهب والفضة', 'راقب الدولار والعوائد وتوقعات الفائدة، ولا تستعجل الشراء بدون تأكيد.', 14, GOLD],
           ['NASDAQ · S&P 500', 'المؤشرات الأمريكية', 'راقب نتائج الشركات واستمرار الضغوط على قطاع التكنولوجيا.', 15, INK],
           ['BRENT OIL', 'النفط', 'راقب تطورات الإمدادات والتوترات الجيوسياسية.', 16, GRN]];
MOTION.scene({ id: 's7', draw(t, lt, ctx) { const { X, at } = ctx; frame(ctx, t, lt, 7);
  title(ctx, lt, 'شنو السيناريو القادم؟', 360, .1, { size: 80 });
  K.forEach(([en, ar, s, seed, col], i) => { const y = 430 + i * 255, t0 = .9 + i * 1.8, a = at(lt, t0, t0 + .5, 'expoOut'); if (a <= 0) return;
    X.save(); X.translate((1 - a) * 60, 0); card(ctx, 70, y, 940, 230, a, { bar: col });
    X.globalAlpha = a; ctx.text(X, en, 110, y + 50, { family: 'Michroma', size: 18, color: col, dir: 'ltr', align: 'left' });
    ctx.text(X, ar, 970, y + 58, { family: 'Tajawal', weight: 900, size: 40, color: INK, align: 'right' });
    candles(ctx, lt, series(seed, 18, i === 2 ? 1 : -1, .5, 1), { x: 100, y: y + 75, w: 230, h: 130 }, t0, .8, { grid: false });
    // "?" branches: conditional scenarios
    X.strokeStyle = 'rgba(147,249,255,.6)'; X.setLineDash([6, 6]); X.lineWidth = 2; X.beginPath(); X.moveTo(330, y + 140); X.lineTo(370, y + 100); X.moveTo(330, y + 140); X.lineTo(370, y + 180); X.stroke(); X.setLineDash([]);
    ctx.text(X, '?', 385, y + 152, { family: 'Inter', weight: 900, size: 40, color: UP, dir: 'ltr' });
    const L = ctx.text.layout(X, s, { family: 'Tajawal', weight: 700, size: 32, maxWidth: 540, lineHeight: 1.35 });
    ctx.text.drawLayout(X, L, 970, y + 120, { align: 'right', color: '#DDE3EE', perWord: () => ({ alpha: a }) });
    X.restore(); });
  takeaway(ctx, lt, 'السوق حالياً حساس لأي خبر… وإدارة المخاطر أهم من توقع الاتجاه.', 7.4, 1210);
} });
