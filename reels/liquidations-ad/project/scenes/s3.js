// 3 — five seats light up one by one; 3 for former students, 2 for new
import { bg, txt, seat, UP, ACC, INK, MUT } from './k.js';
MOTION.scene({ id: 's3', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, .8); const s0 = ctx.scene.start;
  txt(ctx, t, '5 مقاعد فقط', 400, s0 + .2, { size: 110, hi: /5/ });
  // seats RTL: three (former students) on the right, two (new) on the left
  const xs = [870, 715, 560, 365, 210];
  xs.forEach((x, i) => { const lit = at(lt, .9 + i * .45, 1.2 + i * .45); seat(ctx, x, 760, 1.15, lit, i < 3 ? UP : ACC); });
  const a = at(lt, 3.6, 4.1); if (a > 0) { X.save(); X.globalAlpha = a; X.strokeStyle = UP; X.lineWidth = 3; X.beginPath(); X.moveTo(490, 880); X.lineTo(940, 880); X.stroke();
    X.strokeStyle = ACC; X.beginPath(); X.moveTo(140, 880); X.lineTo(435, 880); X.stroke(); X.restore(); }
  txt(ctx, t, '3 مقاعد لطلبتي السابقين', 1010, s0 + 3.8, { size: 54, hi: /3|السابقين/ });
  txt(ctx, t, 'مقعدين ليدد… بقراطيسهم', 1120, s0 + 5.2, { size: 54, hi: /ليدد/, hiColor: ACC });
} });
