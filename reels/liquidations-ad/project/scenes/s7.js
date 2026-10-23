// 7 — closing week: live trading sessions on TOPSTEP (platform-inspired UI, no P&L shown)
import { bg, txt, note, UP, ACC, ACC2, INK, MUT } from './k.js';
MOTION.scene({ id: 's7', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, .7); const s0 = ctx.scene.start;
  txt(ctx, t, 'الأسبوع الختامي', 330, s0 + .2, { size: 84 });
  const a = at(lt, .6, 1.2, 'expoOut'); X.save(); X.globalAlpha = a; X.translate(0, (1 - a) * 40);
  X.fillStyle = '#070B14'; X.strokeStyle = 'rgba(87,161,239,.4)'; X.lineWidth = 2; X.beginPath(); X.roundRect(70, 400, 940, 600, 22); X.fill(); X.stroke();
  X.fillStyle = '#0C1322'; X.fillRect(72, 402, 936, 56); [ '#FF5F57', '#FEBC2E', '#28C840'].forEach((c, i) => { X.fillStyle = c; X.beginPath(); X.arc(105 + i * 30, 430, 8, 0, 6.283); X.fill(); });
  ctx.text(X, 'NQ · 5m', 220, 440, { family: 'Inter', weight: 700, size: 24, color: MUT, dir: 'ltr', align: 'left' });
  const lv = .5 + .5 * Math.sin(lt * 5); X.fillStyle = `rgba(255,77,94,${.6 + .4 * lv})`; X.beginPath(); X.arc(900, 430, 8, 0, 6.283); X.fill();
  ctx.text(X, 'LIVE SESSION', 975, 439, { family: 'Inter', weight: 800, size: 22, color: INK, dir: 'ltr', align: 'right' });
  // candles + moving cursor/crosshair
  let r = 9, p = 50; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280, cs = []; for (let i = 0; i < 46; i++) { const o = p, c = o + (rnd() - .48) * 5; cs.push([o, Math.max(o, c) + rnd() * 2, Math.min(o, c) - rnd() * 2, c]); p = c; }
  const lo = Math.min(...cs.map(c => c[2])), hi = Math.max(...cs.map(c => c[1])), Y = v => 960 - (v - lo) / (hi - lo) * 460, n = Math.min(46, 12 + Math.floor(lt * 6));
  for (let k = 0; k < 4; k++) { X.strokeStyle = 'rgba(255,255,255,.05)'; X.beginPath(); X.moveTo(90, 500 + k * 115); X.lineTo(990, 500 + k * 115); X.stroke(); }
  for (let i = 0; i < n; i++) { const [o, h, l, c] = cs[i], x = 100 + i * 19, up = c >= o; X.strokeStyle = X.fillStyle = up ? UP : ACC2; X.lineWidth = 2;
    X.beginPath(); X.moveTo(x, Y(h)); X.lineTo(x, Y(l)); X.stroke(); X.fillRect(x - 6, Math.min(Y(o), Y(c)), 12, Math.max(2, Math.abs(Y(o) - Y(c)))); }
  const cx = 100 + (n - 1) * 19, cy = Y(cs[n - 1][3]); X.setLineDash([6, 6]); X.strokeStyle = 'rgba(147,249,255,.6)'; X.beginPath(); X.moveTo(90, cy); X.lineTo(990, cy); X.moveTo(cx, 470); X.lineTo(cx, 990); X.stroke(); X.setLineDash([]);
  // analysis zone + plan levels (no P&L)
  if (lt > 3) { const k = at(lt, 3, 3.5); X.globalAlpha = a * k; X.fillStyle = 'rgba(57,119,213,.15)'; X.strokeStyle = ACC; X.fillRect(600, Y(cs[30][2]) - 10, 390, 40); X.strokeRect(600, Y(cs[30][2]) - 10, 390, 40);
    ctx.text(X, 'PLAN', 970, Y(cs[30][2]) + 16, { family: 'Inter', weight: 800, size: 20, color: UP, dir: 'ltr', align: 'right' }); }
  X.restore();
  txt(ctx, t, 'تداول مباشر على TOPSTEP', 1110, s0 + 1.4, { size: 62, hi: /TOPSTEP/ });
  txt(ctx, t, 'نحلّل… نخطط… ونطبّق لايف.', 1220, s0 + 3.2, { size: 56, weight: 800, hi: /لايف/ });
  note(ctx, 'TOPSTEP اسم المنصة فقط — بدون أي رعاية أو شراكة رسمية.', at(lt, 4.5, 5), 1320);
} });
