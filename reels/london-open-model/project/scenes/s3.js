import { bg, subs } from './lib.js';
import { D } from './data.js';
import { drawChart, sceneTitle } from './chart.js';
import { rv } from './rv.js';
import { modelAnns, MODEL_RV } from './model.js';
const S = D.bull, k = Object.assign({}, S.k);
const bull = 1;
k.sweepP = bull ? S.c[k.sweep][2] : S.c[k.sweep][1];
k.mssP = bull ? S.c[k.swingHigh][1] : S.c[k.swingHigh][2];
k.entryLow = S.c[k.entryIdx][2]; k.entryHigh = S.c[k.entryIdx][1];
const ANNS = modelAnns(k, bull);
MOTION.scene({ id: 's3',
  draw(t, lt, ctx) {
    bg(ctx, t); sceneTitle(ctx, lt, 'BULLISH SETUP', 'نموذج الشراء');
    drawChart(ctx, t, lt, { c: S.c, box: { x: 60, y: 500, w: 960, h: 730 }, rv: rv(MODEL_RV), anns: ANNS });
    subs(ctx, t, 'l3');
  } });
