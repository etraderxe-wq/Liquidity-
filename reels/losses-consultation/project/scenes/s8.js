// CTA 53.1–60.45 s: «اكتب كلمة استشارة» (Instagram comment) → «استشارة تداول مجانية — 60 دقيقة».
import { bg, kinetic, panel, icon, rrect, pill, FD, FN, FE, UP, RED, INK, MUT, ACC } from './lib.js';
MOTION.scene({ id: 's8',
  draw(t, lt, ctx) {
    const { X, at, E } = ctx;
    bg(ctx, t);
    // 1) comment the word
    const a1 = 1 - at(t, 56.0, 56.35);
    if (a1 > 0) { X.save(); X.globalAlpha = a1;
      kinetic(ctx, t, 'اكتب كلمة', 540, 420, 53.31, { size: 76, color: MUT });
      const wk = E.springK(ctx.prog(t, 54.45, 55.3));
      if (wk > 0) { X.save(); X.translate(540, 640); X.scale(wk, wk);
        const g = X.createLinearGradient(-380, -80, 380, 40); g.addColorStop(0, '#93F9FF'); g.addColorStop(.55, '#57A1EF'); g.addColorStop(1, '#3977D5');
        X.shadowColor = 'rgba(147,249,255,.7)'; X.shadowBlur = 50;
        ctx.text(X, 'استشارة', 0, 50, { family: FD, weight: 900, size: 190, color: g }); X.restore();
        // shimmer sweep
        const sx = -500 + 1000 * ((t - 54.6) / 1.4 % 1); X.save(); X.globalCompositeOperation = 'lighter'; X.globalAlpha = .35 * Math.min(1, wk);
        const sg = X.createLinearGradient(540 + sx - 80, 0, 540 + sx + 80, 0); sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(.5, 'rgba(255,255,255,.6)'); sg.addColorStop(1, 'rgba(255,255,255,0)');
        X.fillStyle = sg; X.fillRect(0, 500, 1080, 200); X.restore(); }
      // instagram-style comment bar
      const ck = at(t, 53.5, 53.9, 'expoOut');
      if (ck > 0) { X.save(); X.globalAlpha = ck; X.translate(0, (1 - ck) * 80);
        panel(ctx, 80, 900, 920, 260, 1, { stroke: 'rgba(87,161,239,.4)', r: 30, fill: 'rgba(3,11,36,.97)' });
        ctx.text(X, 'التعليقات', 940, 958, { family: FD, weight: 800, size: 32, color: MUT, align: 'right' });
        icon(ctx, 'comment', 150, 948, 44, UP);
        X.fillStyle = 'rgba(87,161,239,.25)'; X.fillRect(120, 985, 840, 2);
        // avatar + field
        const g = X.createLinearGradient(880, 1040, 940, 1100); g.addColorStop(0, '#93F9FF'); g.addColorStop(1, '#3977D5');
        X.fillStyle = g; X.beginPath(); X.arc(910, 1072, 36, 0, 6.283); X.fill();
        X.strokeStyle = 'rgba(169,182,211,.45)'; X.lineWidth = 2; rrect(X, 190, 1036, 670, 72, 36); X.stroke();
        const typed = ctx.text.typeSub('استشارة', at(t, 53.9, 54.5));
        const sent = t > 54.75;
        ctx.text(X, typed || 'أضف تعليقاً…', 830, 1083, { family: FD, weight: 800, size: 36, color: typed ? INK : 'rgba(169,182,211,.6)', align: 'right' });
        if (!sent && typed && Math.floor(t * 3) % 2 === 0) { X.fillStyle = UP; X.fillRect(830 - X.measureText(typed).width - 8, 1050, 3, 44); }
        // send button → pressed
        const sp = at(t, 54.6, 54.75) * (1 - at(t, 54.75, 55.0));
        X.save(); X.translate(130, 1072); X.scale(1 - .2 * sp, 1 - .2 * sp); X.fillStyle = typed ? UP : 'rgba(87,161,239,.35)';
        X.beginPath(); X.moveTo(-26, -24); X.lineTo(30, 0); X.lineTo(-26, 24); X.lineTo(-14, 0); X.closePath(); X.fill(); X.restore();
        // posted heart pop
        const hp = at(t, 54.8, 55.2, 'backOut');
        if (hp > 0) { X.save(); X.translate(250, 970); X.scale(hp, hp); X.fillStyle = RED; X.beginPath();
          X.moveTo(0, 12); X.bezierCurveTo(-30, -10, -16, -34, 0, -18); X.bezierCurveTo(16, -34, 30, -10, 0, 12); X.fill(); X.restore(); }
        X.restore(); }
      X.restore(); }
    // 2) free 60-minute consultation
    const a2 = at(t, 56.2, 56.6, 'expoOut');
    if (a2 > 0) { X.save(); X.globalAlpha = a2;
      kinetic(ctx, t, 'وراح أوفّر لك', 540, 330, 56.23, { size: 70, color: MUT });
      const ck = E.springK(ctx.prog(t, 57.6, 58.5));
      X.save(); X.translate(540, 830); X.scale(.85 + .15 * Math.min(ck, 1.1), .85 + .15 * Math.min(ck, 1.1));
      panel(ctx, -450, -400, 900, 800, 1, { stroke: UP, glow: 'rgba(147,249,255,.55)', r: 40, fill: 'rgba(3,11,36,.97)' });
      // clock ring fills to 60 minutes
      const f = at(t, 57.8, 59.6, 'sineInOut'), cy = -110;
      X.strokeStyle = 'rgba(87,161,239,.2)'; X.lineWidth = 26; X.beginPath(); X.arc(0, cy, 190, 0, 6.283); X.stroke();
      const g = X.createLinearGradient(-200, cy - 200, 200, cy + 200); g.addColorStop(0, '#93F9FF'); g.addColorStop(1, '#3977D5');
      X.strokeStyle = g; X.lineCap = 'round'; X.shadowColor = UP; X.shadowBlur = 24; X.beginPath(); X.arc(0, cy, 190, -Math.PI / 2, -Math.PI / 2 + 6.283 * Math.max(.001, f)); X.stroke(); X.shadowBlur = 0;
      ctx.text(X, String(Math.round(60 * f)), 0, cy + 40, { family: FN, weight: 900, size: 150, color: INK, dir: 'ltr' });
      ctx.text(X, 'دقيقة', 0, cy + 110, { family: FD, weight: 800, size: 40, color: UP });
      kinetic(ctx, t, 'استشارة تداول مجانية', 0, 210, 57.75, { size: 76, hi: /مجانية/ });
      ctx.text(X, 'FREE · 60 MIN', 0, 300, { family: FE, size: 34, color: UP, dir: 'ltr', letterSpacing: 5, alpha: at(t, 58.6, 59.0) });
      X.restore();
      X.restore(); }
  } });
