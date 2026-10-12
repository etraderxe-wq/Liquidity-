import { bg, subs, header, rrect, wordAt, FD, FB } from './lib.js';
const STEPS = [{ w: /^تعلم/, label: 'تعلّم' }, { w: /^جرّب/, label: 'جرّب' }, { w: /^وراجع/, label: 'راجع' }];
MOTION.scene({ id: 's6',
  draw(t, lt, ctx) {
    const { X, P, at, E, kf } = ctx; bg(ctx, t); header(ctx, t, lt, 5, 'النمو');
    const st = ctx.scene.start, tStair = wordAt(ctx, 'l6', /^إذا/, -st - .3), sk = at(lt, tStair, tStair + .8, 'expoInOut');
    // book opens from the spine
    const bA = at(lt, .3, .8, 'expoOut') * (1 - sk), op = at(lt, .8, 1.6, 'expoInOut');
    if (bA > 0) {
      X.save(); X.globalAlpha = bA; X.translate(540, 760); X.scale(1 - .3 * sk, 1 - .3 * sk);
      [-1, 1].forEach(s => {
        const w = 40 + 260 * op;
        X.fillStyle = s > 0 ? P.card : '#06123A'; X.strokeStyle = P.acc; X.lineWidth = 4;
        X.beginPath(); X.moveTo(0, -170); X.quadraticCurveTo(s * w * .5, -190, s * w, -175); X.lineTo(s * w, 185); X.quadraticCurveTo(s * w * .5, 170, 0, 190); X.closePath(); X.fill(); X.stroke();
        for (let i = 0; i < 6; i++) { const lk = at(lt, 1.5 + i * .1 + (s > 0 ? 0 : .3), 1.8 + i * .1 + (s > 0 ? 0 : .3)); if (lk <= 0) continue;
          X.fillStyle = 'rgba(147,170,220,.35)'; const lw = (w - 70) * lk * (i === 5 ? .6 : 1); rrect(X, s > 0 ? 30 : -30 - lw, -110 + i * 46, lw, 10, 5); X.fill(); }
      });
      X.restore();
    }
    // learn → try → review nodes, which then settle onto rising steps (RTL: climb right → left)
    STEPS.forEach((s, i) => {
      const ta = wordAt(ctx, 'l6', s.w, -st - .1), k = at(lt, ta, ta + .45, 'backOut'); if (k <= 0) return;
      const ax = [800, 540, 280][i], ay = 470, bx = [800, 575, 350][i], by = [1080, 950, 820][i];
      const x = ax + (bx - ax) * sk, y = ay + (by - ay) * sk;
      if (sk > 0) { // step block grows up
        const top = by + 40, h = (1180 - top) * sk;
        X.fillStyle = P.card; X.strokeStyle = 'rgba(87,161,239,.35)'; X.lineWidth = 2; rrect(X, bx - 112, 1180 - h, 224, h, 14); X.fill(); X.stroke();
        X.fillStyle = P.acc; X.globalAlpha = sk; rrect(X, bx - 112, 1180 - h, 224, 10, 5); X.fill(); X.globalAlpha = 1;
      }
      X.save(); X.translate(x, y); X.scale(k, k);
      X.fillStyle = 'rgba(3,11,36,.96)'; X.strokeStyle = P.acc; X.lineWidth = 4; rrect(X, -100, -46, 200, 92, 46); X.fill(); X.stroke();
      ctx.text(X, s.label, 0, 16, { family: FD, weight: 800, size: 48, color: P.ink });
      X.restore();
      if (i < 2 && sk < .5) { const nk = at(lt, ta + .3, ta + .7); if (nk > 0) { X.globalAlpha = 1 - sk * 2; ctx.drawPath(X, [[ax - 112, 470], [ax - 148, 470]], nk, { width: 6, color: P.mut, cap: 'round' }); X.globalAlpha = 1; } }
    });
    // a dot climbs the steps
    if (sk >= 1) {
      const c0 = tStair + 1.0, pts = [[1000, 1160], [800, 1060], [575, 930], [350, 800]];
      const seg = Math.min(2.999, Math.max(0, (lt - c0) / .55)), si = Math.floor(seg), f = E.cubicInOut(seg - si);
      const [x1, y1] = pts[si], [x2, y2] = pts[si + 1];
      const x = x1 + (x2 - x1) * f, y = y1 + (y2 - y1) * f - Math.sin(f * 3.1416) * 70;
      X.fillStyle = P.hi; X.shadowColor = P.hi; X.shadowBlur = 30; X.beginPath(); X.arc(x, y, 22, 0, 6.283); X.fill(); X.shadowBlur = 0;
    }
    subs(ctx, t, 'l6');
  } });
