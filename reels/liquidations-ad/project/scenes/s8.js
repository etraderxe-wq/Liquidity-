// 8 — CTA: LIQUIDATIONS + five lit seats; no fees · commitment · 5 seats → DM LIQUIDATIONS (former / new) → disclaimer
import { bg, txt, seat, logoTitle, note, candlesBG, UP, ACC, INK } from './k.js';
MOTION.scene({ id: 's8', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, 1); const s0 = ctx.scene.start;
  candlesBG(ctx, lt + 8, .12, 1180, 300, 7);
  logoTitle(ctx, t, 540, 360, 1, at(lt, .2, 1.0, 'expoOut'));
  [870, 715, 560, 365, 210].forEach((x, i) => seat(ctx, x, 560, .8, at(lt, .8 + i * .15, 1.1 + i * .15), i < 3 ? UP : ACC));
  const P1 = 4.6; // first block: three short lines
  txt(ctx, t, 'الدورة بدون رسوم.', 760, s0 + 1.4, { size: 60, hi: /بدون/, t1: s0 + P1 });
  txt(ctx, t, 'الالتزام شرط.', 860, s0 + 2.2, { size: 60, hi: /شرط/, t1: s0 + P1 });
  txt(ctx, t, '5 مقاعد فقط.', 960, s0 + 3.0, { size: 60, hi: /5/, t1: s0 + P1 });
  // second block: the call to action
  txt(ctx, t, 'إذا قدّ الالتزام…', 760, s0 + P1 + .3, { size: 60 });
  const ck = at(lt, P1 + 1.2, P1 + 1.7, 'backOut'); if (ck > 0) { X.save(); X.translate(540, 880); X.scale(ck, ck);
    const g = X.createLinearGradient(-430, 0, 430, 0); g.addColorStop(0, '#93F9FF'); g.addColorStop(.5, '#57A1EF'); g.addColorStop(1, '#3977D5'); X.fillStyle = g; X.shadowColor = UP; X.shadowBlur = 30;
    X.beginPath(); X.roundRect(-450, -62, 900, 124, 62); X.fill(); X.shadowBlur = 0;
    ctx.text(X, 'دز كلمة LIQUIDATIONS بالخاص', 0, 17, { family: 'Tajawal', weight: 900, size: 50, color: '#00051A' }); X.restore(); }
  txt(ctx, t, 'واذكر: طالب سابق أو يديد.', 1010, s0 + P1 + 2.4, { size: 50, weight: 800, hi: /سابق|يديد/ });
  txt(ctx, t, 'التقديم لا يعني القبول — الاختيار حسب الجدية والالتزام.', 1130, s0 + P1 + 4.0, { size: 36, weight: 800, color: '#DDE3EE', maxWidth: 940 });
  note(ctx, 'التداول ينطوي على مخاطر، ولا توجد أرباح مضمونة. مجانية الدورة لا تشمل أي رسوم حسابات أو منصات.', at(lt, P1 + 5.2, P1 + 5.7), 1250);
  ctx.text(X, '@emullax', 540, 1420, { family: 'Inter', weight: 800, size: 40, color: INK, dir: 'ltr', alpha: at(lt, P1 + 6, P1 + 6.5) });
  X.fillStyle = `rgba(0,0,0,${at(lt, ctx.scene.dur - .6, ctx.scene.dur)})`; X.fillRect(0, 0, 1080, 1920);
} });
