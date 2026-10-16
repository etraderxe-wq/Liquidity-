// CONSULTATION 45.6–53.1 s: «خسارات متتالية؟» · «مو شرط تحتاج استراتيجية جديدة» (struck out) · trade-review dashboard (journal, chart, risk checklist).
import { bg, kinetic, panel, icon, rrect, pill, FD, FN, FE, UP, DN, RED, INK, MUT, ACC } from './lib.js';
import { chart } from './chart.js';
const MINI = [[50,51,47,47.5],[47.5,49,46.5,48.6],[48.6,49,45.4,45.8],[45.8,47.6,45.5,47.2],[47.2,47.6,44.1,44.5],[44.5,46.2,44.2,45.9],[45.9,46.2,42.9,43.3],[43.3,45,43,44.6]];
MOTION.scene({ id: 's7',
  draw(t, lt, ctx) {
    const { X, at, E } = ctx;
    bg(ctx, t, { red: .3 * at(t, 45.8, 46.3) * (1 - at(t, 47.9, 48.5)) });
    // 1) losing streak
    const a1 = 1 - at(t, 47.85, 48.15);
    if (a1 > 0) { X.save(); X.globalAlpha = a1;
      kinetic(ctx, t, 'خسارات متتالية؟', 540, 470, 45.86, { size: 112, hi: /متتالية/, hiColor: RED });
      const pts = [[150, 700], [290, 760], [400, 740], [520, 860], [620, 840], [740, 960], [840, 945], [940, 1080]];
      const k = at(t, 46.2, 47.4, 'sineInOut'), L = pts.length - 1, m = k * L;
      X.strokeStyle = RED; X.lineWidth = 7; X.lineJoin = 'round'; X.shadowColor = RED; X.shadowBlur = 20; X.beginPath();
      for (let i = 0; i <= Math.floor(m) && i <= L; i++) i ? X.lineTo(...pts[i]) : X.moveTo(...pts[i]);
      if (m < L) { const i = Math.floor(m), f = m - i; X.lineTo(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f); }
      X.stroke(); X.shadowBlur = 0;
      [1, 3, 5, 7].forEach((i, j) => { const q = at(t, 46.2 + i / L * 1.2, 46.4 + i / L * 1.2, 'backOut'); if (q > 0) pill(ctx, pts[i][0], pts[i][1] + 60, null, 'LOSS', RED, q, 'center', { size: 24 }); });
      ctx.text(X, 'EQUITY', 150, 640, { family: FE, size: 26, color: MUT, dir: 'ltr', align: 'left', alpha: at(t, 46, 46.3) });
      X.restore(); }
    // 2) not necessarily a new strategy
    const a2 = at(t, 48.0, 48.3) * (1 - at(t, 50.55, 50.85));
    if (a2 > 0) { X.save(); X.globalAlpha = a2;
      kinetic(ctx, t, 'مو شرط تحتاج', 540, 640, 48.06, { size: 76, color: MUT });
      const L = kinetic(ctx, t, 'استراتيجية جديدة', 540, 820, 48.9, { size: 104 });
      const s = at(t, 49.7, 50.15, 'expoInOut'); X.strokeStyle = RED; X.lineWidth = 12; X.lineCap = 'round'; X.shadowColor = RED; X.shadowBlur = 16;
      if (s > 0) { X.beginPath(); X.moveTo(540 + L.width / 2 + 20, 790); X.lineTo(540 + L.width / 2 + 20 - (L.width + 40) * s, 790); X.stroke(); }
      X.restore(); }
    // 3) review dashboard
    const a3 = at(t, 50.7, 51.2, 'expoOut');
    if (a3 > 0) { X.save(); X.globalAlpha = a3; X.translate(0, (1 - a3) * 120);
      kinetic(ctx, t, 'أحد يراجع تداولك معك', 540, 300, 51.0, { size: 74, hi: /يراجع/ });
      panel(ctx, 70, 360, 940, 950, 1, { stroke: UP, glow: 'rgba(87,161,239,.5)', r: 32, fill: 'rgba(3,11,36,.97)' });
      ctx.text(X, 'TRADE REVIEW', 120, 430, { family: FE, size: 30, color: UP, dir: 'ltr', align: 'left', letterSpacing: 4 });
      [RED, ACC, UP].forEach((c, i) => { X.fillStyle = c; X.beginPath(); X.arc(950 - i * 34, 420, 9, 0, 6.283); X.fill(); });
      // chart pane
      panel(ctx, 110, 470, 860, 380, 1, { stroke: 'rgba(87,161,239,.25)', r: 20, fill: 'rgba(0,5,26,.9)' });
      chart(ctx, t, t, { c: MINI, n: 10, box: { x: 140, y: 500, w: 800, h: 320 }, lo: 41.5, hi: 52.5, rv: i => 50.9 + i * .07, grow: .2, grid: false,
        anns: [{ type: 'sweep', i: 6, p: 42.9, col: ACC, t: 51.6, en: 'REVIEW', ly: -70 }] });
      // checklist
      const CK = ['خطة واضحة قبل الدخول', 'حجم لوت ثابت', 'التزام بالستوب', 'حد خسارة يومي'];
      CK.forEach((s, i) => { const y = 920 + i * 92, k = at(t, 51.5 + i * .3, 51.8 + i * .3, 'expoOut'); if (k <= 0) return;
        X.save(); X.globalAlpha = k; panel(ctx, 110, y - 38, 860, 76, 1, { stroke: 'rgba(87,161,239,.25)', r: 18, fill: 'rgba(0,5,26,.9)' });
        ctx.text(X, s, 900, y + 13, { family: FD, weight: 800, size: 36, color: INK, align: 'right' });
        rrect(X, 140, y - 22, 44, 44, 10); X.strokeStyle = UP; X.lineWidth = 3; X.stroke();
        const c = at(t, 51.8 + i * .3, 52.0 + i * .3); if (c > 0) icon(ctx, 'check', 162, y, 34 * c, UP);
        X.restore(); });
      X.restore(); }
  } });
