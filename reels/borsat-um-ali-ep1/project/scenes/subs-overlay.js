// Subtitles with speaker chip (max 2 lines) + bracketed sound cues.
import { LINES, SCN } from './data.js';
const NAME = { H: ['المذيع', '#57A1EF'], B: ['بوفهد', '#93F9FF'], S: ['الطالب', '#FCFCFC'] };
const CUES = [[9.8, 11.2, 'تصفيق'], [23.45, 25.1, 'صمت… وصوت صرصور'], [42.3, 44.2, 'تصفيق حار'], [57.0, 59.0, 'إنذار'], [74.7, 77.4, 'ضحك الجمهور']];
function rr(X, x, y, w, h, r) { X.beginPath(); X.roundRect(x, y, w, h, r); }
MOTION.scene({ id: 'subs', overlay: true,
  draw(t, lt, ctx) {
    const { X, at } = ctx; if (t >= SCN.s5[0]) return;
    const l = LINES.find(l => t >= l.s - .1 && t < l.e + .35);
    if (l) { const a = at(t, l.s - .1, l.s + .1) * (1 - at(t, l.e + .2, l.e + .35)), [nm, col] = NAME[l.who];
      const L = ctx.text.layout(X, l.sub, { family: 'Tajawal', weight: 800, size: 52, maxWidth: 880, lineHeight: 1.4 });
      const n = L.lines.length, y0 = 1460 - (n - 1) * 52 * 1.4;
      X.save(); X.globalAlpha = .82 * a; X.fillStyle = 'rgba(0,5,26,.88)'; rr(X, 540 - L.width / 2 - 34, y0 - 58, L.width + 68, n * 52 * 1.4 + 28, 24); X.fill(); X.restore();
      X.save(); X.globalAlpha = a; X.fillStyle = col; X.font = '900 30px Tajawal'; const w = X.measureText(nm).width + 36; rr(X, 540 + L.width / 2 + 34 - w, y0 - 104, w, 46, 14); X.fill(); X.restore();
      ctx.text(X, nm, 540 + L.width / 2 + 34 - 18, y0 - 70, { family: 'Tajawal', weight: 900, size: 30, color: '#00051A', align: 'right', alpha: a });
      ctx.text.drawLayout(X, L, 540, y0, { align: 'center', color: '#FCFCFC', perWord: () => ({ alpha: a }) });
    }
    const c = CUES.find(c => t >= c[0] && t < c[1]);
    if (c && !l) { const a = at(t, c[0], c[0] + .2) * (1 - at(t, c[1] - .2, c[1]));
      ctx.text(X, '[ ' + c[2] + ' ]', 540, 1460, { family: 'Tajawal', weight: 800, size: 44, color: '#A9B6D3', alpha: a }); }
  } });
