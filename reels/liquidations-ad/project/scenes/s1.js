// 1 — ZERO TO HERO board drops into a metal burn barrel, burns from the bottom up into ash; short silence.
import { bg, txt, smoke, ash, INK, MUT } from './k.js';
const BW = 620, BH = 220, MW = 124, MH = 44;
MOTION.scene({ id: 's1',
  setup(ctx) { this.b = document.createElement('canvas'); this.b.width = BW; this.b.height = BH; const X = this.b.getContext('2d');
    const g = X.createLinearGradient(0, 0, 0, BH); g.addColorStop(0, '#1B2233'); g.addColorStop(1, '#0C111C'); X.fillStyle = g; X.beginPath(); X.roundRect(0, 0, BW, BH, 18); X.fill();
    X.strokeStyle = '#3A4558'; X.lineWidth = 6; X.stroke(); X.fillStyle = '#E8ECF3'; X.font = '400 50px Michroma'; X.textAlign = 'center'; X.fillText('ZERO TO HERO', BW / 2, 132);
    this.m = document.createElement('canvas'); this.m.width = MW; this.m.height = MH; this.e = document.createElement('canvas'); this.e.width = MW; this.e.height = MH;
    this.c = document.createElement('canvas'); this.c.width = BW; this.c.height = BH; },
  draw(t, lt, ctx) { const { X, at, E } = ctx; bg(ctx, t, .25);
    const burn = at(t, 2.0, 6.0, 'sineIn'), fire = at(t, 1.8, 2.4) * (1 - at(t, 6.2, 7.6));
    // board: falls 0.6–1.5 with slight bounce, lands with its lower half inside the barrel
    const f = E.bounceOut(ctx.prog(t, .6, 1.6)), by = -260 + (930 - -260) * f, rot = (1 - f) * -.25 + Math.sin(t * 1.3) * .01 * f;
    // flame glow behind
    if (fire > 0) { const g = X.createRadialGradient(540, 1060, 0, 540, 1060, 520); g.addColorStop(0, `rgba(255,140,40,${.35 * fire})`); g.addColorStop(1, 'rgba(255,90,20,0)'); X.fillStyle = g; X.fillRect(0, 500, 1080, 1100); }
    // back rim
    X.fillStyle = '#0A0D14'; X.beginPath(); X.ellipse(540, 1080, 230, 46, 0, 0, 6.283); X.fill();
    // board with burn mask
    if (burn < 1.05) { const M = this.m.getContext('2d'), Em = this.e.getContext('2d'), mi = M.createImageData(MW, MH), ei = Em.createImageData(MW, MH);
      for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) { const fromBottom = 1 - y / MH, edge = Math.min(x, MW - 1 - x) / MW;
        const h = fromBottom * .62 + edge * .25 + ctx.noise2(x * .09, y * .09 + 3, 7) * .22 + .05, d = h - burn * 1.1, k = (y * MW + x) * 4;
        mi.data[k + 3] = d > 0 ? 255 : 0; const em = d > 0 && d < .06 ? 1 - d / .06 : 0; ei.data[k] = 255; ei.data[k + 1] = 120 + 100 * em | 0; ei.data[k + 2] = 30; ei.data[k + 3] = 255 * em; }
      M.putImageData(mi, 0, 0); Em.putImageData(ei, 0, 0);
      const C = this.c.getContext('2d'); C.globalCompositeOperation = 'source-over'; C.clearRect(0, 0, BW, BH); C.drawImage(this.b, 0, 0);
      // scorch darkening near the burn front
      C.globalCompositeOperation = 'source-atop'; C.fillStyle = `rgba(20,8,0,${.55 * burn})`; C.fillRect(0, BH * (1 - burn * 1.2), BW, BH);
      C.globalCompositeOperation = 'destination-in'; C.imageSmoothingEnabled = true; C.drawImage(this.m, 0, 0, BW, BH);
      X.save(); X.translate(540, by); X.rotate(rot); X.drawImage(this.c, -BW / 2, -BH / 2); X.globalCompositeOperation = 'lighter'; X.drawImage(this.e, -BW / 2, -BH / 2, BW, BH); X.drawImage(this.e, -BW / 2, -BH / 2, BW, BH); X.restore(); }
    // flames
    if (fire > 0) { X.save(); X.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 40; i++) { const h1 = ctx.hash01(i, 11), h2 = ctx.hash01(i, 12), life = .7 + .6 * h1, ph = ((t + h2 * life) % life) / life;
        const x = 540 + (h2 - .5) * 400 * (1 - ph * .6) + Math.sin(t * 7 + i) * 14, y = 1075 - ph * (260 + 260 * burn * (1 - burn * .5)) , r = (70 - 50 * ph) * (.6 + .6 * fire);
        const g = X.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(255,${200 - 120 * ph | 0},80,${.5 * fire * (1 - ph)})`); g.addColorStop(1, 'rgba(255,60,0,0)'); X.fillStyle = g; X.fillRect(x - r, y - r, 2 * r, 2 * r); }
      X.restore(); }
    // barrel body (front) — drawn after the board so the board sits inside
    const g = X.createLinearGradient(310, 0, 770, 0); g.addColorStop(0, '#0A0E16'); g.addColorStop(.35, '#2A3345'); g.addColorStop(.6, '#161C29'); g.addColorStop(1, '#07090F'); X.fillStyle = g;
    X.beginPath(); X.moveTo(310, 1080); X.lineTo(330, 1480); X.ellipse(540, 1480, 210, 40, 0, Math.PI, 0, true); X.lineTo(770, 1080); X.ellipse(540, 1080, 230, 46, 0, 0, Math.PI); X.fill();
    X.strokeStyle = '#3B465A'; X.lineWidth = 6; X.beginPath(); X.ellipse(540, 1080, 230, 46, 0, 0, Math.PI); X.stroke();
    for (const yy of [1210, 1350]) { X.strokeStyle = 'rgba(80,95,120,.6)'; X.lineWidth = 8; X.beginPath(); X.ellipse(540, yy, 222, 42, 0, 0, Math.PI); X.stroke(); }
    // rim glow
    if (fire > 0) { X.strokeStyle = `rgba(255,140,50,${.5 * fire})`; X.lineWidth = 3; X.beginPath(); X.ellipse(540, 1080, 230, 46, 0, Math.PI, 0); X.stroke(); }
    smoke(ctx, t, at(t, 2.5, 4) * (1 - at(t, 8.6, 9.6)) * 1.2, 540, 1040, 260);
    ash(ctx, t, at(t, 3, 4) * (1 - at(t, 8.8, 9.6)), 540, 1060);
    // text after the board is gone; short silence
    ctx.text(X, 'ZERO TO HERO…', 540, 430, { family: 'Michroma', size: 54, color: '#C9D1DC', dir: 'ltr', alpha: at(t, 6.3, 6.9) * (1 - at(t, 8.9, 9.2)) });
    txt(ctx, t, 'كانت البداية.', 540, 7.0, { size: 84, t1: 8.9 });
  } });
