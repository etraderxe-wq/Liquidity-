// 6 — eligibility: Exness under my agency (new account or agency transfer) + 60% cashback of my partner commission (conditions apply)
import { bg, txt, note, UP, ACC, INK, MUT } from './k.js';
MOTION.scene({ id: 's6', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, .8); const s0 = ctx.scene.start;
  txt(ctx, t, 'شرط الانضمام', 380, s0 + .2, { size: 92, hi: /شرط/ });
  [['فتح حساب Exness تحت وكالتي', 1.2], ['أو تحويل وكالة حسابك الحالي لي', 2.6]].forEach(([s, t0], i) => { const a = at(lt, t0, t0 + .5, 'expoOut'), y = 520 + i * 150; if (a <= 0) return;
    X.save(); X.globalAlpha = a; X.translate((1 - a) * 60, 0); X.fillStyle = 'rgba(8,12,22,.94)'; X.strokeStyle = i ? 'rgba(87,161,239,.45)' : UP; X.lineWidth = 2.5; X.beginPath(); X.roundRect(70, y, 940, 120, 24); X.fill(); X.stroke();
    ctx.text(X, String(i + 1), 960, y + 76, { family: 'Michroma', size: 34, color: UP, dir: 'ltr' });
    ctx.text(X, s, 910, y + 76, { family: 'Tajawal', weight: 900, size: 46, color: INK, align: 'right' }); X.restore(); });
  const ck = at(lt, 4.4, 5.0, 'expoOut'); if (ck > 0) { X.save(); X.globalAlpha = ck;
    const g = X.createLinearGradient(70, 0, 1010, 0); g.addColorStop(0, 'rgba(57,119,213,.25)'); g.addColorStop(1, 'rgba(147,249,255,.12)'); X.fillStyle = g; X.strokeStyle = UP; X.lineWidth = 2;
    X.beginPath(); X.roundRect(70, 880, 940, 330, 30); X.fill(); X.stroke(); X.restore();
    ctx.text(X, 'كاش باك \u206660%\u2069', 540, 990, { family: 'Tajawal', weight: 900, size: 92, color: UP, alpha: ck, shadow: { blur: 30, color: 'rgba(147,249,255,.5)' } });
    const L = ctx.text.layout(X, 'من عمولتي كشريك على تداولاتك المؤهلة، وفق شروط البرنامج.', { family: 'Tajawal', weight: 800, size: 40, maxWidth: 860, lineHeight: 1.35 });
    ctx.text.drawLayout(X, L, 540, 1075, { align: 'center', color: INK, perWord: () => ({ alpha: ck }) }); }
  note(ctx, 'الكاش باك جزء من عمولة الشريك على التداولات المؤهلة — مو عائد على الإيداع ولا ربح مضمون.', at(lt, 5.6, 6.1), 1300);
} });
