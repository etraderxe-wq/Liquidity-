import { bg, subs, FD } from './lib.js';
import { D } from './data.js';
import { drawChart, sceneTitle, UP } from './chart.js';
import { rv } from './rv.js';
const A = D.asia;
MOTION.scene({ id: 's2',
  draw(t, lt, ctx) {
    bg(ctx, t); sceneTitle(ctx, lt, 'ASIAN RANGE', 'نطاق الجلسة الآسيوية');
    drawChart(ctx, t, lt, { c: A.c, box: { x: 70, y: 520, w: 940, h: 680 }, lo: 96, hi: 112, rv: rv([[0, 15, .6, 5.6]]), anns: [
      { type: 'rect', under: 1, i0: 0, i1: 15, p0: A.lo, p1: A.hi, fill: 'rgba(87,161,239,.10)', col: '#57A1EF', dash: [10, 8], t: 7.6 },
      { type: 'hline', i0: 0, p: A.hi, col: '#FCFCFC', t: 6.0, ar: 'أعلى سعر للجلسة الآسيوية', en: 'ASIAN HIGH', lx: 540, ly: -40 },
      { type: 'hline', i0: 0, p: A.lo, col: '#FCFCFC', t: 6.8, ar: 'أدنى سعر للجلسة الآسيوية', en: 'ASIAN LOW', lx: 540, ly: 40 },
      { type: 'stops', i0: 1, i1: 15, p: A.hi + 1.6, nDots: 12, dir: 'up', col: UP, t: 9.4, ar: 'سيولة الشراء فوق القمم', en: 'BSL' },
      { type: 'stops', i0: 1, i1: 15, p: A.lo - 1.6, nDots: 12, dir: 'down', col: '#57A1EF', t: 10.6, ar: 'سيولة البيع تحت القيعان', en: 'SSL' } ] });
    ctx.text(ctx.X, 'افتتاح لندن 02:00–05:00 بتوقيت نيويورك (اصطلاح ICT) · يتغير مع التوقيت الصيفي', 540, 1330, { family: FD, weight: 700, size: 28, color: '#A9B6D3', maxWidth: 960, alpha: ctx.at(lt, 11.8, 12.4) });
    subs(ctx, t, 'l2');
  } });
