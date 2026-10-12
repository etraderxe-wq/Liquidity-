// shared builder for the bullish (s3) and bearish (s5) model scenes
import { UP, SLC } from './chart.js';
export function modelAnns(k, bull) {
  const c = UP, liqT = bull ? k.bsl : k.ssl, swP = bull ? k.sweepP : k.sweepP, mssP = k.mssP;
  return [
    { type: 'hline', i0: 0, p: liqT, col: '#57A1EF', dash: [10, 8], t: 1.0, ar: bull ? 'سيولة الشراء' : 'سيولة البيع', en: bull ? 'BSL' : 'SSL', lx: 800, ly: bull ? -34 : 34, tEnd: 13.2 },
    { type: 'rect', under: 1, i0: k.asiaFrom, i1: k.asiaTo, p0: k.asiaLow, p1: k.asiaHigh, fill: 'rgba(87,161,239,.09)', col: '#57A1EF', dash: [10, 8], t: 2.2, ar: 'نطاق آسيا', en: 'ASIA', lx: 300, align: 'center', lyAbs: null, ly: 0, tEnd: 13.2 },
    { type: 'hline', i0: k.asiaFrom, p: bull ? k.asiaLow : k.asiaHigh, col: '#A9B6D3', dash: [6, 8], w: 2, t: 2.6, tEnd: 13.2 },
    { type: 'sweep', i: k.sweep, p: swP, col: c, t: 4.8, ar: bull ? 'سحب سيولة البيع' : 'سحب سيولة الشراء', en: 'SWEEP', ly: bull ? 80 : -80, tEnd: 13.2 },
    { type: 'hline', i0: k.dailyOpenIdx, p: k.dailyOpen, col: '#C9D6F0', dash: [4, 8], w: 2, t: 5.6, ar: bull ? 'الافتتاح اليومي · السعر تحته' : 'الافتتاح اليومي · السعر فوقه', en: 'DO', lx: 790, ly: bull ? 36 : -36, tEnd: 13.2 },
    { type: 'hline', i0: k.swingHigh, i1: k.mss, p: mssP, col: '#FCFCFC', t: 8.2, ar: 'تحول هيكل السوق', en: 'MSS', lx: 520, ly: bull ? -40 : 40, tEnd: 13.2 },
    { type: 'rect', under: 1, i0: k.breaker, i1: k.entryIdx + 1, p0: k.brLow, p1: k.brHigh, fill: 'rgba(87,161,239,.13)', col: '#57A1EF', dash: [8, 6], w: 2, t: 11.0, ar: 'منطقة البريكر', en: 'BREAKER', lx: 300, lyAbs: null, ly: bull ? 64 : -64, align: 'center', tEnd: 13.4 },
    { type: 'rect', under: 1, i0: k.fvg - 1, i1: k.entryIdx + 1, p0: k.fvgLow, p1: k.fvgHigh, fill: 'rgba(147,249,255,.24)', col: UP, glow: 1, t: 9.8, ar: 'فجوة القيمة العادلة', en: 'FVG', ly: bull ? -46 : 46 },
    { type: 'arrow', i: k.entryIdx, p: bull ? k.entryLow : k.entryHigh, dir: bull ? 'up' : 'down', col: UP, t: 13.0, keep: 1, ar: bull ? 'شراء' : 'بيع', en: bull ? 'BUY' : 'SELL' },
    { type: 'rr', i0: k.entryIdx, entry: k.entry, sl: k.sl, tp: k.tp, t: 13.6, lx: 84 },
    { type: 'pulse', p: liqT, col: UP, t: 18.2 },
    { type: 'hline', i0: 0, p: liqT, col: UP, t: 18.2, w: 4, keep: 1, ar: bull ? 'الهدف: سيولة الشراء' : 'الهدف: سيولة البيع', en: bull ? 'BSL' : 'SSL', lx: 760, ly: bull ? -38 : 38 },
  ];
}
export const MODEL_RV = [[0, 14, .3, 2.6], [15, 20, 3.0, 4.6], [21, 23, 7.4, 8.6], [24, 26, 11.8, 12.9], [27, 40, 15.0, 18.0]];
