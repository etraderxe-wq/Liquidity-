// 04 GOLD & SILVER SELL-OFF — red metal charts + a conditional rates → metals link (not a fixed rule)
import { frame, title, line, card, candles, series, arrow, takeaway, UP, INK, MUT, RED, GRN, GOLD } from './kit.js';
MOTION.scene({ id: 's4', draw(t, lt, ctx) { const { X, at } = ctx; frame(ctx, t, lt, 4);
  title(ctx, lt, 'ليش الذهب والفضة يطيحون؟', 360, .1, { size: 66, hi: /الذهب/, hiColor: GOLD });
  [['GOLD', 555, 11, GOLD, '−2.88%'], ['SILVER', 70, 12, '#C9D1DC', '−5.87%']].forEach(([en, x, s, col, v], i) => { const a = at(lt, .5 + i * .3, .9 + i * .3);
    card(ctx, x, 420, 455, 250, a, { stroke: 'rgba(255,77,94,.4)' }); if (a <= 0) return;
    ctx.text(X, en, x + 24, 462, { family: 'Michroma', size: 20, color: col, dir: 'ltr', align: 'left', alpha: a });
    ctx.text(X, v, x + 431, 462, { family: 'Inter', weight: 900, size: 30, color: RED, dir: 'ltr', align: 'right', alpha: a });
    candles(ctx, lt, series(s, 26, -1, .45, 1.2), { x: x + 20, y: 485, w: 415, h: 165 }, .6 + i * .3, 1.6); });
  // link: higher-rate expectations → yield assets relatively attractive → pressure on metals (may)
  const S = [['توقعات فائدة أعلى؟', UP], ['أصول بعوائد أجذب نسبياً', ACC()], ['ضغط محتمل على المعادن', RED]];
  function ACC() { return '#57A1EF'; }
  S.forEach(([s, col], i) => { const t0 = 2.6 + i * 1.0, a = at(lt, t0, t0 + .4, 'backOut'), x = 1010 - i * 320 - 290; card(ctx, x, 730, 290, 110, a, { stroke: col });
    ctx.text(X, s, x + 145, 798, { family: 'Tajawal', weight: 900, size: 30, color: INK, alpha: a, maxWidth: 265 });
    if (i) arrow(ctx, x + 316, 785, x + 296, 785, at(lt, t0 - .2, t0), MUT); });
  ctx.text(X, 'علاقة ممكنة وليست قاعدة ثابتة', 540, 880, { family: 'Tajawal', weight: 700, size: 26, color: MUT, alpha: at(lt, 5.4, 5.8) });
  line(ctx, lt, 'ومع تقلب الأسواق، جني الأرباح وتصفية المراكز ممكن يضغط على المعادن.', 960, 6.0, { size: 34, maxWidth: 940 });
  const sk = at(lt, 7.5, 8.0, 'expoOut'); card(ctx, 70, 1010, 940, 120, sk, { bar: '#C9D1DC' });
  ctx.text(X, 'الفضة تتأثر أكثر لأنها معدن ثمين وصناعي بنفس الوقت.', 980, 1084, { family: 'Tajawal', weight: 800, size: 34, color: INK, align: 'right', alpha: sk, maxWidth: 880 });
  takeaway(ctx, lt, 'مو كل أزمة تعني إن الذهب لازم يصعد!', 10.0, 1190);
} });
