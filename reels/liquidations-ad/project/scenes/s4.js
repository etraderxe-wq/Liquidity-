// 4 — November 2026 calendar: training day → 2 homework days → repeat; Fri & Sat off; the sequence carries over the weekend.
import { bg, txt, UP, ACC, ACC2, INK, MUT } from './k.js';
const DAYS = []; { const seq = []; let w = 0; for (let d = 1; d <= 30; d++) { const wd = (d - 1 + 0) % 7; /* 1 Nov 2026 = Sunday */ const off = wd === 5 || wd === 6;
  DAYS.push({ d, wd, type: off ? 'off' : (w++ % 3 === 0 ? 'T' : 'H') }); } }
const HD = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
MOTION.scene({ id: 's4', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, .6); const s0 = ctx.scene.start;
  txt(ctx, t, 'من 1 إلى 30 نوفمبر 2026', 330, s0 + .2, { size: 64, hi: /نوفمبر/ });
  txt(ctx, t, 'شهر كامل — بدون رسوم دورة', 420, s0 + 1.0, { size: 46, weight: 800, color: '#DDE3EE', hi: /بدون|رسوم/ });
  const cw = 128, ch = 92, x0 = 990, y0 = 520, ca = at(lt, .6, 1.2);
  X.save(); X.globalAlpha = ca; X.fillStyle = 'rgba(8,12,22,.92)'; X.strokeStyle = 'rgba(87,161,239,.3)'; X.lineWidth = 2; X.beginPath(); X.roundRect(70, 460, 940, 540, 24); X.fill(); X.stroke();
  HD.forEach((h, i) => ctx.text(X, h, x0 - i * cw - cw / 2 + 4, y0 + 8, { family: 'Tajawal', weight: 800, size: 24, color: i >= 5 ? '#5D6577' : MUT })); X.restore();
  // reveal days progressively in order (the pattern "flows" day by day)
  DAYS.forEach((D, k) => { const row = Math.floor(k / 7), col = D.wd, x = x0 - col * cw - cw / 2, y = y0 + 30 + row * ch + ch / 2, r = at(lt, 1.6 + k * .14, 1.9 + k * .14);
    if (r <= 0) return; X.save(); X.globalAlpha = r;
    if (D.type === 'T') { X.fillStyle = UP; X.shadowColor = UP; X.shadowBlur = 18; X.beginPath(); X.roundRect(x - 52, y - 36, 104, 72, 14); X.fill(); X.shadowBlur = 0; }
    else if (D.type === 'H') { X.strokeStyle = ACC; X.lineWidth = 3; X.beginPath(); X.roundRect(x - 50, y - 34, 100, 68, 14); X.stroke(); }
    ctx.text(X, String(D.d), x, y + 12, { family: 'Inter', weight: 800, size: 32, color: D.type === 'T' ? '#00051A' : D.type === 'off' ? '#4A5163' : INK, dir: 'ltr' }); X.restore(); });
  // steps, one after another
  const S = [['يوم تدريب', UP, 'fill'], ['بعده يومين هوم ورك', ACC, 'line'], ['ونكرر', INK, null], ['الجمعة والسبت عطلة', '#5D6577', null]];
  S.forEach(([s, col, kind], i) => { const t0 = 6.4 + i * .9, a = at(lt, t0, t0 + .4, 'expoOut'); if (a <= 0) return; const y = 1075 + i * 70;
    X.save(); X.globalAlpha = a; if (kind === 'fill') { X.fillStyle = col; X.beginPath(); X.roundRect(948, y - 30, 40, 40, 8); X.fill(); }
    else if (kind === 'line') { X.strokeStyle = col; X.lineWidth = 3; X.beginPath(); X.roundRect(948, y - 30, 40, 40, 8); X.stroke(); }
    ctx.text(X, s, 920, y, { family: 'Tajawal', weight: 800, size: 42, color: kind ? INK : col, align: 'right' }); X.restore(); });
  const ta = at(lt, 10.0, 10.5, 'expoOut'); if (ta > 0) { X.save(); X.globalAlpha = ta; X.fillStyle = 'rgba(147,249,255,.1)'; X.strokeStyle = UP; X.lineWidth = 2; X.beginPath(); X.roundRect(120, 1380, 840, 96, 48); X.fill(); X.stroke(); X.restore();
    ctx.text(X, '8 أيام تدريب + 14 يوم هوم ورك', 540, 1442, { family: 'Tajawal', weight: 900, size: 48, color: INK, alpha: ta }); }
} });
