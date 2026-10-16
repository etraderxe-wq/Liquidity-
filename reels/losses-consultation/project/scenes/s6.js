// PILLARS 38–45.6 s: Trading Plan ✓ · Trading Journal (راجع صفقاتك) · Risk Management (التزم بإدارة المخاطر) · Discipline (لا تخلي خسارة وحدة تتحكم بقراراتك).
import { bg, kinetic, panel, icon, rrect, FD, FN, FE, UP, DN, RED, INK, MUT, ACC } from './lib.js';
const CH = [['TRADING PLAN', 'plan', 0], ['TRADING JOURNAL', 'book', 38.38], ['RISK MANAGEMENT', 'gauge', 40.04], ['DISCIPLINE', 'shield', 41.85]];
const SEG = [[38.38, 40.0], [40.0, 41.8], [41.8, 46]];
MOTION.scene({ id: 's6',
  draw(t, lt, ctx) {
    const { X, at, E } = ctx;
    bg(ctx, t);
    // chips 2×2
    CH.forEach(([en, ic, t0], j) => {
      const cx = j % 2 ? 300 : 780, cy = j < 2 ? 262 : 372, on = j === 0 ? 1 : at(t, t0, t0 + .35), cur = j > 0 && t >= t0 && (j === 3 || t < CH[j + 1][2]);
      const a = at(t, 38.0 + j * .08, 38.3 + j * .08);
      X.save(); X.globalAlpha = a; panel(ctx, cx - 225, cy - 44, 450, 88, 1, { stroke: on > .5 ? UP : 'rgba(87,161,239,.25)', glow: cur ? 'rgba(147,249,255,.7)' : null, r: 20,
        fill: cur ? 'rgba(20,50,110,.95)' : 'rgba(0,5,26,.85)' });
      icon(ctx, on > .5 ? 'check' : ic, cx + 180, cy, 38, on > .5 ? UP : MUT);
      ctx.text(X, en, cx - 20, cy + 11, { family: FN, weight: 800, size: 27, color: on > .5 ? INK : MUT, dir: 'ltr', letterSpacing: 1.5 });
      X.restore();
    });
    const segA = j => at(t, SEG[j][0], SEG[j][0] + .4, 'expoOut') * (1 - at(t, SEG[j][1] - .1, SEG[j][1] + .25));
    // 1 journal
    let a = segA(0);
    if (a > 0) { X.save(); X.globalAlpha = a; X.translate((1 - a) * -120, 0);
      kinetic(ctx, t, 'راجع صفقاتك', 540, 560, 38.38, { size: 84, hi: /صفقاتك/ });
      panel(ctx, 120, 640, 840, 600, 1, { stroke: UP, r: 30, fill: 'rgba(3,11,36,.96)' });
      ctx.text(X, 'TRADING JOURNAL', 540, 712, { family: FE, size: 32, color: UP, dir: 'ltr', letterSpacing: 4 });
      const R = [['صفقة 1', 'التزمت بالخطة', 'check', UP], ['صفقة 2', 'دخلت قبل التأكيد', 'x', RED], ['صفقة 3', 'وقفت بعد حد الخسارة', 'check', UP], ['صفقة 4', 'رفعت اللوت بعد خسارة', 'x', RED]];
      R.forEach(([n, s, ic, col], i) => { const k = at(t, 38.7 + i * .22, 39.0 + i * .22, 'expoOut'); if (k <= 0) return; const y = 800 + i * 108;
        X.save(); X.globalAlpha = k; X.strokeStyle = 'rgba(87,161,239,.25)'; X.lineWidth = 2; X.beginPath(); X.moveTo(170, y + 44); X.lineTo(910, y + 44); X.stroke();
        ctx.text(X, n, 900, y + 14, { family: FD, weight: 800, size: 34, color: MUT, align: 'right' });
        ctx.text(X, s, 745, y + 14, { family: FD, weight: 700, size: 38, color: INK, align: 'right' });
        icon(ctx, ic, 210, y, 46 * Math.min(1, k * 1.2), col); X.restore(); });
      // scanning highlight (review)
      const sy = 790 + 430 * ((t - 38.9) / 1.0 % 1); if (t > 38.9) { const g = X.createLinearGradient(0, sy - 30, 0, sy + 30); g.addColorStop(0, 'rgba(147,249,255,0)'); g.addColorStop(.5, 'rgba(147,249,255,.18)'); g.addColorStop(1, 'rgba(147,249,255,0)'); X.fillStyle = g; X.fillRect(130, sy - 30, 820, 60); }
      X.restore(); }
    // 2 risk gauge
    a = segA(1);
    if (a > 0) { X.save(); X.globalAlpha = a; X.translate((1 - a) * -120, 0);
      kinetic(ctx, t, 'التزم بإدارة المخاطر', 540, 560, 40.04, { size: 80, hi: /المخاطر/ });
      panel(ctx, 120, 640, 840, 600, 1, { stroke: UP, r: 30, fill: 'rgba(3,11,36,.96)' });
      ctx.text(X, 'RISK MANAGEMENT', 540, 712, { family: FE, size: 32, color: UP, dir: 'ltr', letterSpacing: 4 });
      const cx = 540, cy = 1060, R0 = 270;
      const zones = [[Math.PI, Math.PI * 1.45, UP], [Math.PI * 1.45, Math.PI * 1.72, ACC], [Math.PI * 1.72, Math.PI * 2, RED]];
      zones.forEach(([s, e, c]) => { X.strokeStyle = c; X.lineWidth = 34; X.globalAlpha = a * .85; X.beginPath(); X.arc(cx, cy, R0, s, e - .02); X.stroke(); });
      X.globalAlpha = a;
      // needle: swings into the red, then settles back in the safe zone
      const v = ctx.kf(t, [[40.1, .1], [40.6, .92, 'expoOut'], [41.2, .25, 'backOut']]), ang = Math.PI * (1 + v);
      X.strokeStyle = INK; X.lineWidth = 10; X.lineCap = 'round'; X.shadowColor = UP; X.shadowBlur = 18; X.beginPath(); X.moveTo(cx, cy); X.lineTo(cx + Math.cos(ang) * (R0 - 40), cy + Math.sin(ang) * (R0 - 40)); X.stroke();
      X.shadowBlur = 0; X.fillStyle = INK; X.beginPath(); X.arc(cx, cy, 18, 0, 6.283); X.fill();
      ctx.text(X, 'مخاطرة محسوبة بكل صفقة', 540, 1160, { family: FD, weight: 800, size: 40, color: INK, alpha: at(t, 41.0, 41.3) });
      X.restore(); }
    // 3 discipline
    a = segA(2);
    if (a > 0) { X.save(); X.globalAlpha = a; X.translate((1 - a) * -120, 0);
      kinetic(ctx, t, 'لا تخلي خسارة وحدة', 540, 560, 41.85, { size: 80, hi: /وحدة/, hiColor: RED });
      kinetic(ctx, t, 'تتحكم بقراراتك', 540, 1250, 44.1, { size: 80, hi: /بقراراتك/ });
      // a single red loss candle tries to grow; the shield holds it back
      const grow = ctx.kf(t, [[42.0, 0], [42.9, 1, 'expoOut'], [43.6, .35, 'backOut']]);
      X.fillStyle = RED; X.shadowColor = RED; X.shadowBlur = 30; X.fillRect(300, 720, 90, 380 * grow); X.fillRect(342, 690, 6, 440 * grow); X.shadowBlur = 0;
      const sh = E.springK(ctx.prog(t, 42.7, 43.6));
      X.save(); X.translate(660, 900); X.scale(sh, sh); X.shadowColor = UP; X.shadowBlur = 50; icon(ctx, 'shield', 0, 0, 300, UP); X.restore();
      ctx.text(X, 'DISCIPLINE', 660, 1110, { family: FE, size: 34, color: UP, dir: 'ltr', letterSpacing: 4, alpha: at(t, 43.1, 43.5) });
      X.restore(); }
  } });
