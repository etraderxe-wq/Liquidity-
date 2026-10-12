import { bg, subs } from './lib.js';
import { D } from './data.js';
import { drawChart, sceneTitle, UP } from './chart.js';
import { rv } from './rv.js';
const S = D.exBear, k = S.k, bull = 0;
const sweepP = bull ? S.c[k.sweep][2] : S.c[k.sweep][1], mssP = bull ? S.c[k.swingHigh][1] : S.c[k.swingHigh][2];
const tgt = bull ? k.bsl : k.ssl, lvl = bull ? k.ssl : k.bsl;
const ANNS = [
  { type: 'hline', i0: 0, p: tgt, col: '#57A1EF', dash: [10, 8], t: .8, ar: bull ? 'سيولة الشراء' : 'سيولة البيع', en: bull ? 'BSL' : 'SSL', lx: 300, ly: bull ? -34 : 34, tEnd: 9.6 },
  { type: 'hline', i0: k.sslFrom, p: lvl, col: '#A9B6D3', w: 3, t: 1.6, ar: bull ? 'سيولة البيع' : 'سيولة الشراء', en: bull ? 'SSL' : 'BSL', lx: 520, ly: bull ? 36 : -36, tEnd: 9.6 },
  { type: 'vline', i: k.londonIdx, col: UP, t: 4.0, ar: 'افتتاح لندن', en: '02:00–05:00 NY', lx: 700, tEnd: 9.6 },
  { type: 'sweep', i: k.sweep, p: sweepP, col: UP, t: 5.0, ar: 'سحب السيولة', en: 'SWEEP', ly: bull ? 80 : -80, tEnd: 9.6 },
  { type: 'hline', i0: k.swingHigh, i1: k.mss, p: mssP, col: '#FCFCFC', t: 6.6, ar: 'تحول الهيكل', en: 'MSS', lx: 470, ly: bull ? -40 : 40, tEnd: 9.6 },
  { type: 'rect', under: 1, i0: k.breaker, i1: k.entryIdx + 2, p0: k.brLow, p1: k.brHigh, fill: 'rgba(87,161,239,.13)', col: '#57A1EF', dash: [8, 6], w: 2, t: 8.3, ar: 'البريكر', en: 'BREAKER', lx: 330, ly: bull ? 64 : -64, align: 'center', tEnd: 9.8 },
  { type: 'rect', under: 1, i0: k.fvg - 1, i1: k.entryIdx + 2, p0: k.fvgLow, p1: k.fvgHigh, fill: 'rgba(147,249,255,.24)', col: UP, glow: 1, t: 7.6, ar: 'منطقة الاختلال', en: 'FVG', ly: bull ? -46 : 46 },
  { type: 'arrow', i: k.entryIdx, p: bull ? S.c[k.entryIdx][2] : S.c[k.entryIdx][1], dir: bull ? 'up' : 'down', col: UP, t: 9.4, keep: 1, ar: bull ? 'شراء' : 'بيع', en: bull ? 'BUY' : 'SELL' },
  { type: 'rr', i0: k.entryIdx, entry: k.entry, sl: k.sl, tp: k.tp, t: 9.9, lx: 84 },
  { type: 'pulse', p: tgt, col: UP, t: 13.8 },
];
MOTION.scene({ id: 's6',
  draw(t, lt, ctx) {
    bg(ctx, t); sceneTitle(ctx, lt, 'BEARISH EXAMPLE', 'مثال: نموذج البيع');
    drawChart(ctx, t, lt, { c: S.c, box: { x: 60, y: 500, w: 960, h: 730 }, rv: rv([[0, 24, .3, 3.8], [25, 26, 4.4, 4.9], [27, 29, 5.8, 6.8], [30, 31, 8.8, 9.3], [32, 40, 11.0, 13.6]]), anns: ANNS });
    subs(ctx, t, 'l6');
  } });
