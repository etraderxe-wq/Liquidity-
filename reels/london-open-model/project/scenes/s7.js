import { bg, subs, rrect, FD, FN } from './lib.js';
import { sceneTitle } from './chart.js';
const ITEMS = [['نطاق الجلسة الآسيوية', 'ASIAN RANGE'], ['سحب السيولة', 'LIQUIDITY SWEEP'], ['تحول الهيكل أو تغير التسليم السعري', 'MSS / CISD'],
  ['منطقة رجوع مناسبة', 'FVG / BREAKER'], ['عند توفر مقارنة صحيحة بين أصلين مرتبطين', 'SMT'], ['إدارة المخاطر ووقف واضح', 'RISK MANAGEMENT']];
MOTION.scene({ id: 's7',
  draw(t, lt, ctx) {
    const { X, at } = ctx; bg(ctx, t); sceneTitle(ctx, lt, 'ENTRY CHECKLIST', 'شروط الدخول');
    ITEMS.forEach(([ar, en], i) => {
      const y = 520 + i * 122, t0 = 1.0 + i * 1.25, k = at(lt, t0, t0 + .45, 'expoOut'), ck = at(lt, t0 + .45, t0 + .8); if (k <= 0) return;
      X.save(); X.globalAlpha = k; X.translate((1 - k) * 60, 0);
      X.fillStyle = 'rgba(0,5,26,.85)'; X.strokeStyle = ck > .5 ? 'rgba(147,249,255,.6)' : 'rgba(87,161,239,.3)'; X.lineWidth = 2; rrect(X, 70, y, 940, 100, 24); X.fill(); X.stroke();
      X.strokeStyle = '#93F9FF'; X.lineWidth = 4; rrect(X, 920, y + 26, 48, 48, 12); X.stroke();
      if (ck > 0) ctx.drawPath(X, [[930, y + 50], [942, y + 62], [960, y + 36]], ck, { width: 7, color: '#93F9FF', cap: 'round' });
      ctx.text(X, ar, 895, y + 48, { family: FD, weight: 800, size: 38, color: '#FCFCFC', align: 'right', maxWidth: 560 });
      ctx.text(X, en, 100, y + 62, { family: FN, weight: 800, size: 26, color: '#93F9FF', align: 'left', dir: 'ltr', letterSpacing: 1 });
      X.restore();
    });
    subs(ctx, t, 'l7');
  } });
