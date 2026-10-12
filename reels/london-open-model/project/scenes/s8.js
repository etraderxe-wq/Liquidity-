import { bg, rrect, FD, FN } from './lib.js';
const OFFERS = ['استشارة تداول مجانية لمدة ساعة', 'شرح تعليمي لمفاهيم CRT', 'متابعة تعليمية للمتداولين', 'الكاش باك عند استيفاء شروط الوكالة'];
MOTION.scene({ id: 's8',
  draw(t, lt, ctx) {
    const { X, at, E } = ctx; bg(ctx, t);
    const img = ctx.img('logo'), lk = at(lt, .3, 1.2, 'expoOut'), w = 360, h = w * img.height / img.width;
    X.save(); X.globalAlpha = lk; X.translate(540, 300); X.scale(.9 + .1 * lk, .9 + .1 * lk); X.drawImage(img, -w / 2, -h / 2, w, h); X.restore();
    const L = ctx.text.layout(X, 'تداول بوعي. واستفد من تداولاتك.', { family: FD, weight: 900, size: 58, maxWidth: 960 });
    ctx.text.drawLayout(X, L, 540, 520, { align: 'center', color: '#FCFCFC', perWord: i => { const q = at(lt, 1.4 + i * .12, 1.9 + i * .12, 'expoOut'); return { clipUp: 1, dy: (1 - q) * 70, alpha: q > 0 ? 1 : 0 }; } });
    ctx.text(X, 'EXNESS CASHBACK — UP TO 60%', 540, 612, { family: FN, weight: 900, size: 38, color: '#93F9FF', dir: 'ltr', letterSpacing: 2, alpha: at(lt, 3.0, 3.5) });
    const ck = E.springK(ctx.prog(lt, 3.6, 4.6)), n = Math.round(60 * at(lt, 3.6, 4.6, 'expoOut'));
    X.save(); X.translate(540, 712); X.scale(ck, ck);
    const g = X.createLinearGradient(-300, -60, 300, 30); g.addColorStop(0, '#93F9FF'); g.addColorStop(.6, '#57A1EF'); g.addColorStop(1, '#3977D5');
    ctx.text(X, 'كاش باك يصل إلى \u2066' + n + '%\u2069', 0, 30, { family: FD, weight: 900, size: 84, color: g, alpha: Math.min(1, ck * 1.4) }); X.restore();
    ctx.text(X, 'من عمولتي كشريك على تداولاتك المؤهلة، حسب نوع الحساب والشروط', 540, 790, { family: FD, weight: 700, size: 29, color: '#A9B6D3', alpha: at(lt, 4.6, 5.1), maxWidth: 960 });
    OFFERS.forEach((s, i) => {
      const y = 850 + i * 86, k = at(lt, 5.4 + i * .5, 5.9 + i * .5, 'expoOut'); if (k <= 0) return;
      X.save(); X.globalAlpha = k; X.translate((1 - k) * 50, 0);
      X.fillStyle = 'rgba(0,5,26,.85)'; X.strokeStyle = 'rgba(87,161,239,.35)'; X.lineWidth = 2; rrect(X, 110, y, 860, 70, 20); X.fill(); X.stroke();
      ctx.drawPath(X, [[918, y + 36], [930, y + 48], [950, y + 24]], 1, { width: 6, color: '#93F9FF', cap: 'round' });
      ctx.text(X, s, 895, y + 46, { family: FD, weight: 700, size: 34, color: '#FCFCFC', align: 'right' }); X.restore();
    });
    const ca = at(lt, 8.6, 9.2, 'backOut');
    if (ca > 0) { X.save(); X.translate(540, 1240); X.scale(ca, ca); X.shadowColor = '#57A1EF'; X.shadowBlur = 30;
      const g2 = X.createLinearGradient(-440, 0, 440, 0); g2.addColorStop(0, '#93F9FF'); g2.addColorStop(.5, '#57A1EF'); g2.addColorStop(1, '#3977D5');
      X.fillStyle = g2; rrect(X, -460, -52, 920, 104, 52); X.fill(); X.shadowBlur = 0;
      ctx.text(X, 'اكتب «كاش باك» بالكومنت، والتفاصيل توصلك بالخاص.', 0, 14, { family: FD, weight: 900, size: 36, color: '#00051A', maxWidth: 860 }); X.restore(); }
    ctx.text(X, '@emullax', 540, 1350, { family: FN, weight: 800, size: 46, color: '#FCFCFC', dir: 'ltr', alpha: at(lt, 9.6, 10.1) });
    ctx.text(X, 'التداول ينطوي على مخاطر. الكاش باك يخضع لشروط الأهلية ونوع الحساب، ولا يعوض بالضرورة خسائر التداول.', 540, 1420, { family: FD, weight: 600, size: 25, color: '#C9D6F0', maxWidth: 960, alpha: at(lt, 10.0, 10.6) });
  } });
