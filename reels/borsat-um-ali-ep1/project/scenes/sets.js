// Sets: TV studio (s1, s4) and training hall (s2, s3). Brand look: navy → blue walls, cyan LED lines, big trading screen.
import * as THREE from 'three';
import { makeChar } from './chars.js';
const M = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: o.r ?? .5, metalness: o.m ?? 0, emissive: o.e ?? 0, emissiveIntensity: o.ei ?? 1 });
function canvasTex(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; return { c, x: c.getContext('2d'), tx }; }
function brandWall(w, h) {
  const T = canvasTex(512, 512), X = T.x;
  let g = X.createLinearGradient(0, 0, 60, 512); [[0, '#00051A'], [.35, '#00051A'], [.6, '#08163D'], [.85, '#1F4590'], [1, '#3D7EE1']].forEach(([p, c]) => g.addColorStop(p, c));
  X.fillStyle = g; X.fillRect(0, 0, 512, 512);
  g = X.createRadialGradient(0, 512, 0, 0, 512, 380); g.addColorStop(0, 'rgba(147,249,255,.9)'); g.addColorStop(.4, 'rgba(87,161,239,.6)'); g.addColorStop(1, 'rgba(61,126,225,0)');
  X.fillStyle = g; X.fillRect(0, 0, 512, 512); T.tx.needsUpdate = true;
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: T.tx, roughness: .9, emissive: 0xffffff, emissiveMap: T.tx, emissiveIntensity: .18 }));
}
export function buildSet(ctx, kind) {
  const st = ctx.stage3D({ fov: 32, camera: [0, 2.6, 10], lookAt: [0, 2, 0], env: 'room', tone: 'aces', exposure: .9, samples: 0, fxaa: true });
  st.scene.environmentIntensity = .35;
  const S = st.scene; S.background = new THREE.Color(0x00051A); S.fog = new THREE.Fog(0x00051A, 14, 30);
  S.add(new THREE.HemisphereLight(0x9cc4ff, 0x0a1230, .35));
  const key = new THREE.DirectionalLight(0xfff1e0, 1.15); key.position.set(4, 8, 7); S.add(key);
  const fill = new THREE.DirectionalLight(0x8fb8ff, .3); fill.position.set(-6, 4, 5); S.add(fill);
  const rimA = new THREE.PointLight(0x93F9FF, 7, 14); rimA.position.set(-4, 4, -2); S.add(rimA);
  const rimB = new THREE.PointLight(0x57A1EF, 7, 14); rimB.position.set(4, 4, -2); S.add(rimB);
  const spot = new THREE.SpotLight(0xffffff, 0, 20, .35, .5, 1); spot.position.set(2, 9, 4); S.add(spot); S.add(spot.target);
  // floor + walls
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), M(0x050c26, { r: .22, m: .35 })); floor.rotation.x = -Math.PI / 2; S.add(floor);
  const wall = brandWall(26, 12); wall.position.set(0, 6, -5); S.add(wall);
  for (const sx of [-1, 1]) { const sw = brandWall(16, 12); sw.position.set(sx * 11, 6, 2); sw.rotation.y = -sx * Math.PI / 2; S.add(sw); }
  // big screen
  const scr = canvasTex(1024, 576);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(7.4, 4.3, .2), M(0x0a1230, { r: .3, m: .6 })); frame.position.set(0, 3.6, -4.7); S.add(frame);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(7.1, 4.0), new THREE.MeshBasicMaterial({ map: scr.tx, toneMapped: false })); screen.position.set(0, 3.6, -4.58); S.add(screen);
  // LED strips
  const led = M(0x93F9FF, { e: 0x93F9FF, ei: 2.2 });
  for (const y of [.05, 6.2]) { const l = new THREE.Mesh(new THREE.BoxGeometry(24, .06, .06), led); l.position.set(0, y, -4.9); S.add(l); }
  for (const x of [-4.2, 4.2]) { const l = new THREE.Mesh(new THREE.BoxGeometry(.06, 4.3, .06), led); l.position.set(x, 3.6, -4.6); S.add(l); }
  const set = { st, S, spot, screen: scr, chars: {} };
  if (kind === 'studio') {
    for (const [x, ry] of [[-1.7, .35], [1.7, -.35]]) { const d = new THREE.Group();
      const pod = new THREE.Mesh(new THREE.CylinderGeometry(.55, .7, 1.25, 24), M(0x0b1a44, { r: .35, m: .4 })); pod.position.y = .62; d.add(pod);
      const top = new THREE.Mesh(new THREE.CylinderGeometry(.62, .62, .06, 24), led); top.position.y = 1.27; d.add(top);
      d.position.set(x, 0, .9); d.rotation.y = ry; S.add(d); }
    const host = makeChar('host'); host.position.set(-1.7, 0, .2); host.rotation.y = .5; S.add(host);
    const bo = makeChar('bofahad'); bo.position.set(1.7, 0, .2); bo.rotation.y = -.5; S.add(bo);
    const stu = makeChar('student'); stu.position.set(2.6, -1.2, 5.2); stu.rotation.y = Math.PI + .25; S.add(stu);
    // audience heads (silhouettes)
    const aud = new THREE.Group(), am = M(0x0a1433, { r: .8 });
    for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) { const h = new THREE.Mesh(new THREE.SphereGeometry(.42, 16, 12), am); h.position.set(-4.4 + i * 1.1 + (r ? .55 : 0), .7 + r * .25, 4.6 + r * 1.2); aud.add(h); }
    S.add(aud);
    set.chars = { host, bo, stu }; set.aud = aud;
    // EMULLAX sign on the wall
  } else {
    const bo = makeChar('bofahad'); bo.position.set(-2.0, 0, -1.6); bo.rotation.y = .35; S.add(bo);
    const stu = makeChar('student'); stu.position.set(2.0, 0, 1.0); stu.rotation.y = -.75; S.add(stu);
    const crowd = [];
    [[3.6, 2.7], [5.0, 2.4], [4.2, 3.9], [5.6, 3.7]].forEach(([x, z]) => { const c = makeChar('student'); c.scale.setScalar(.9); c.position.set(x, 0, z); c.rotation.y = -2.2; S.add(c); crowd.push(c); });
    const board = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, .08), M(0xEEF3FF, { r: .4 })); board.position.set(6.5, 3, -3.2); board.rotation.y = -.6; S.add(board);
    set.chars = { bo, stu }; set.crowd = crowd;
  }
  return set;
}
// camera shots: [{t, p, l, fov, p2, l2, fov2, d, e}] — a cut at t, optional move to p2/l2/fov2 over d seconds
export function shoot(ctx, set, t, shots) {
  let s = shots[0]; for (const x of shots) if (t >= x.t) s = x;
  const k = s.d ? ctx.at(t, s.t, s.t + s.d, s.e || 'sineInOut') : 0, L = (a, b) => a.map((v, i) => v + ((b || a)[i] - v) * k);
  const p = L(s.p, s.p2), l = L(s.l, s.l2), fov = s.fov + ((s.fov2 ?? s.fov) - s.fov) * k;
  const cam = set.st.camera; cam.position.set(...p); cam.fov = fov; cam.updateProjectionMatrix(); cam.lookAt(...l);
  if (s.shake) { const f = Math.floor(t * 30); cam.position.x += (ctx.hash01(f, 1) - .5) * s.shake; cam.position.y += (ctx.hash01(f, 2) - .5) * s.shake; }
}
// mouth from the voice envelope
export function talk(line, t) {
  if (!line || t < line.s || t > line.e) return 0;
  const i = (t - line.s) * 30, a = line.env[Math.floor(i)] || 0, b = line.env[Math.floor(i) + 1] || 0; return Math.min(1, (a + (b - a) * (i % 1)) * 1.1);
}
export function speaking(LINES, who, t) { return LINES.find(l => l.who === who && t >= l.s - .05 && t <= l.e + .05); }
