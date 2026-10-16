// BRAND 60.45–64.6 s: original logo with cinematic light · NO EXPLANATION. JUST RESULTS.
import { bg, FD, FN, FE, UP, INK, MUT } from './lib.js';
MOTION.scene({ id: 's9',
  draw(t, lt, ctx) {
    const { X, at, E } = ctx;
    bg(ctx, t, { dim: .25 });
    // light rays behind the logo
    X.save(); X.globalCompositeOperation = 'lighter'; X.translate(540, 800);
    const ra = at(lt, .1, 1.2);
    for (let i = 0; i < 14; i++) { X.save(); X.rotate(i / 14 * 6.283 + lt * .12); const g = X.createLinearGradient(0, 0, 0, -760);
      g.addColorStop(0, `rgba(147,249,255,${.16 * ra})`); g.addColorStop(1, 'rgba(147,249,255,0)'); X.fillStyle = g;
      X.beginPath(); X.moveTo(-14, 0); X.lineTo(-70, -760); X.lineTo(70, -760); X.lineTo(14, 0); X.fill(); X.restore(); }
    const g = X.createRadialGradient(0, 0, 0, 0, 0, 460); g.addColorStop(0, `rgba(87,161,239,${.45 * ra})`); g.addColorStop(1, 'rgba(87,161,239,0)');
    X.fillStyle = g; X.fillRect(-500, -500, 1000, 1000); X.restore();
    const img = ctx.img('logo'), lk = at(lt, .15, 1.1, 'expoOut'), w = 560, h = w * img.height / img.width, s = .86 + .14 * lk + .02 * at(lt, 1, 4.2);
    X.save(); X.globalAlpha = lk; X.translate(540, 800); X.scale(s, s); X.filter = `blur(${(1 - lk) * 14}px)`; X.drawImage(img, -w / 2, -h / 2, w, h); X.restore();
    // lens glint across the logo
    const gx = at(lt, 1.0, 1.9, 'sineInOut');
    if (gx > 0 && gx < 1) { X.save(); X.globalCompositeOperation = 'lighter'; const x = 200 + 680 * gx, sg = X.createLinearGradient(x - 60, 0, x + 60, 0);
      sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(.5, 'rgba(255,255,255,.35)'); sg.addColorStop(1, 'rgba(255,255,255,0)'); X.fillStyle = sg; X.fillRect(x - 60, 800 - h / 2, 120, h); X.restore(); }
    const tk = at(lt, 1.3, 2.0, 'expoOut');
    ctx.text(X, 'NO EXPLANATION.', 540, 800 + h / 2 + 120, { family: FE, size: 50, color: INK, dir: 'ltr', letterSpacing: 6 * tk + 2, alpha: tk });
    const tk2 = at(lt, 1.8, 2.5, 'expoOut');
    ctx.text(X, 'JUST RESULTS.', 540, 800 + h / 2 + 200, { family: FE, size: 50, color: UP, dir: 'ltr', letterSpacing: 6 * tk2 + 2, alpha: tk2, shadow: { blur: 30, color: 'rgba(147,249,255,.6)' } });
    ctx.text(X, '@emullax', 540, 1390, { family: FN, weight: 800, size: 44, color: INK, dir: 'ltr', alpha: at(lt, 2.4, 2.9) });
    ctx.text(X, 'التداول ينطوي على مخاطر · المحتوى تعليمي وليس توصية', 540, 1460, { family: FD, weight: 700, size: 28, color: MUT, alpha: at(lt, 2.6, 3.1) });
    X.fillStyle = `rgba(0,5,26,${at(lt, 3.6, 4.15)})`; X.fillRect(0, 0, 1080, 1920);
  } });
