// Illustrative OHLC (no prices). Each series is checked against the definition it illustrates; render fails if a rule is broken.
export const SWEEP = [[50,51,46,47],[47,48,43,44],[44,45,41.5,42],[42,43.5,40,43],[43,47,42.6,46.5],[46.5,50,46,49.5],[49.5,51,48,48.5],[48.5,49,45.5,46],
  [46,46.5,43.2,43.6],[43.6,44.4,41.6,42],[42,42.8,40.8,41.2],[41.2,42.6,37.6,42.3],[42.3,45.5,42,45.2],[45.2,48,44.8,47.6],[47.6,50.5,47.2,50]];
export const SW = { low: 3, sweep: 11, level: 40 };
// bearish structure → sweep of the last low → displacement closes above the last lower high (MSS) → FVG → retrace into FVG → expansion
export const MSS = [[60,61,56,57],[57,58,53,54],[54,57.5,53.5,57],[57,57.8,52,52.5],[52.5,53,48,49],[49,52.8,48.6,52.4],[52.4,54,51.8,52.2],[52.2,52.5,48.8,49.1],
  [49.1,49.5,46.2,46.6],[46.6,47.4,45.2,47.1],[47.1,50,46.9,49.7],[49.7,51,49,50.4],[50.4,56.5,50.2,56.1],[56.1,57.6,55.4,57.2],
  [57.2,57.4,54.6,55],[55,55.3,53.2,53.6],[53.6,57,53.4,56.8],[56.8,60,56.5,59.6],[59.6,62,59.2,61.6]];
export const MS = { lh: 6, prevLow: 8, sweep: 9, disp: 12, fvgA: 11, fvgB: 13, retrace: 15, bsl: 61 };
(function check() {
  const lowOK = SWEEP.slice(SW.low + 1, SW.sweep).every(c => c[2] > SW.level) && SWEEP[SW.low][2] === SW.level;
  const swOK = SWEEP[SW.sweep][2] < SW.level && SWEEP[SW.sweep][3] > SW.level;
  const lhOK = MSS[MS.lh][1] === Math.max(...MSS.slice(MS.lh - 1, MS.disp).map(c => c[1])) && MSS.slice(MS.lh + 1, MS.disp).every(c => c[3] <= MSS[MS.lh][1]);
  const sw2 = MSS[MS.sweep][2] < MSS[MS.prevLow][2] && MSS[MS.sweep][3] > MSS[MS.prevLow][2];
  const disp = MSS[MS.disp][3] > MSS[MS.lh][1] && (MSS[MS.disp][3] - MSS[MS.disp][0]) > 1.5 * Math.max(...MSS.slice(MS.disp - 3, MS.disp).map(c => Math.abs(c[3] - c[0])));
  const fvg = MSS[MS.fvgA][1] < MSS[MS.fvgB][2], ret = MSS[MS.retrace][2] <= MSS[MS.fvgB][2] && MSS[MS.retrace][2] > MSS[MS.fvgA][1];
  if (!(lowOK && swOK && lhOK && sw2 && disp && fvg && ret)) throw new Error('ICT data check failed ' + JSON.stringify({ lowOK, swOK, lhOK, sw2, disp, fvg, ret }));
})();
