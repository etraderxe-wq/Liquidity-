// END — dark elegant card: the moral line · EMULLAX ORIGINALS · بورصة أم علي — الحلقة الأولى · «يتبع…»
import { SCN } from './data.js';
MOTION.scene({ id: 's5',
  draw(t, lt, ctx) {
    const { X, at } = ctx, s0 = SCN.s5[0];
    const g = X.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#000000'); g.addColorStop(.6, '#00051A'); g.addColorStop(1, '#08163D'); X.fillStyle = g; X.fillRect(0, 0, 1080, 1920);
    X.save(); X.globalCompositeOperation = 'lighter'; const rg = X.createRadialGradient(0, 1920, 0, 0, 1920, 900); rg.addColorStop(0, 'rgba(147,249,255,.35)'); rg.addColorStop(.5, 'rgba(87,161,239,.18)'); rg.addColorStop(1, 'rgba(61,126,225,0)'); X.fillStyle = rg; X.fillRect(0, 0, 1080, 1920); X.restore();
    const a1 = at(lt, .3, 1.1) * (1 - at(lt, 4.2, 4.7));
    const L1 = ctx.text.layout(X, 'مو كل من رسم مستطيل…', { family: 'Tajawal', weight: 900, size: 78 });
    ctx.text.drawLayout(X, L1, 540, 860, { align: 'center', color: '#FCFCFC', perWord: i => { const q = at(lt, .3 + i * .18, .9 + i * .18, 'expoOut'); return { alpha: q * a1, dy: (1 - q) * 40 }; } });
    const L2 = ctx.text.layout(X, 'صار مؤسس مدرسة تداول.', { family: 'Tajawal', weight: 900, size: 78 });
    ctx.text.drawLayout(X, L2, 540, 980, { align: 'center', color: '#93F9FF', perWord: i => { const q = at(lt, 1.7 + i * .18, 2.3 + i * .18, 'expoOut'); return { alpha: q * a1, dy: (1 - q) * 40, shadow: { blur: 24, color: 'rgba(147,249,255,.5)' } }; } });
    const a2 = at(lt, 4.8, 5.6, 'expoOut') * (1 - at(lt, 10.8, 11.5));
    if (a2 > 0) { const img = ctx.img('logo'), w = 420, h = w * img.height / img.width; X.save(); X.globalAlpha = a2; X.drawImage(img, 540 - w / 2, 560 - h / 2 + (1 - a2) * 30, w, h); X.restore();
      ctx.text(X, 'EMULLAX ORIGINALS', 540, 560 + h / 2 + 110, { family: 'Michroma', size: 48, color: '#FCFCFC', dir: 'ltr', letterSpacing: 6, alpha: a2 });
      ctx.text(X, 'بورصة أم علي — الحلقة الأولى', 540, 560 + h / 2 + 200, { family: 'Tajawal', weight: 800, size: 54, color: '#93F9FF', alpha: at(lt, 5.6, 6.2) * (1 - at(lt, 10.8, 11.5)) });
      const a3 = at(lt, 7.6, 8.3) * (1 - at(lt, 10.8, 11.5));
      ctx.text(X, 'يتبع… إذا بوفهد ما صفّر حسابه الثاني.', 540, 1330, { family: 'Tajawal', weight: 700, size: 44, color: '#A9B6D3', alpha: a3 }); }
  } });
