// EMULLAX ORIGINALS — recurring cartoon cast built from primitives (no real people).
//   host  : المذيع — slick hair, blue suit, bow tie, microphone
//   bofahad: بوفهد — big belly, navy suit + cyan tie, sunglasses, mustache & goatee
//   student: الطالب — white dishdasha, ghutra + black agal, round glasses, notebook
import * as THREE from 'three';
const SKIN = 0xD9A27A, M = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: o.r ?? .55, metalness: o.m ?? 0, emissive: o.e ?? 0, emissiveIntensity: o.ei ?? 1 });
const sph = (r, m, s = 24) => new THREE.Mesh(new THREE.SphereGeometry(r, s, Math.round(s * .75)), m);
const cap = (r, l, m) => new THREE.Mesh(new THREE.CapsuleGeometry(r, l, 8, 16), m);
const box = (x, y, z, m) => new THREE.Mesh(new THREE.BoxGeometry(x, y, z), m);
const cyl = (r1, r2, h, m, s = 20) => new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, s), m);
export function makeChar(kind) {
  const g = new THREE.Group(), P = {}; g.userData.kind = kind;
  const skin = M(SKIN, { r: .6 }), dark = M(0x1a1a22, { r: .4 }), white = M(0xF6F6F2, { r: .7 });
  const suitCol = kind === 'host' ? 0x3977D5 : kind === 'bofahad' ? 0x0B1A44 : 0xF4F4F0;
  const suit = M(suitCol, { r: kind === 'student' ? .85 : .45 });
  const belly = kind === 'bofahad' ? 1.28 : 1;
  // legs + shoes
  for (const sx of [-1, 1]) { const leg = cap(.17, .5, kind === 'student' ? white : M(kind === 'host' ? 0x22346b : 0x081230)); leg.position.set(sx * .22, .45, 0); g.add(leg);
    const shoe = box(.26, .14, .42, dark); shoe.position.set(sx * .22, .07, .08); g.add(shoe); }
  // torso
  const torso = new THREE.Group(); torso.position.y = 1.0; g.add(torso); P.torso = torso;
  const body = kind === 'student' ? cyl(.48, .62, 1.35, suit) : cap(.55, .55, suit);
  body.scale.set(belly, 1, belly * .92); if (kind === 'student') body.position.y = -.12; torso.add(body);
  if (kind !== 'student') {
    const shirt = box(.3, .55, .1, white); shirt.position.set(0, .28, .5 * belly); shirt.rotation.x = -.2; torso.add(shirt);
    if (kind === 'host') { const bw = new THREE.Group(); const a = sph(.09, dark); a.scale.set(1.3, .8, .6); a.position.x = -.09; const b = a.clone(); b.position.x = .09; bw.add(a, b, sph(.045, dark)); bw.position.set(0, .52, .55); torso.add(bw); }
    else { const tie = box(.12, .5, .05, M(0x93F9FF, { r: .3, e: 0x1f6f80, ei: .4 })); tie.position.set(0, .22, .54 * belly + .04); tie.rotation.x = -.18; torso.add(tie); }
  } else { const neck = cyl(.05, .05, .5, M(0xE6E6E0)); neck.position.set(0, .2, .5); neck.rotation.x = -.15; torso.add(neck); }
  // arms (shoulder pivots)
  for (const [nm, sx] of [['armL', -1], ['armR', 1]]) {
    const sh = new THREE.Group(); sh.position.set(sx * (.6 * belly + .05), .45, 0); torso.add(sh);
    const up = cap(.14, .45, suit); up.position.y = -.32; sh.add(up);
    const el = new THREE.Group(); el.position.y = -.62; sh.add(el);
    const lo = cap(.13, .38, suit); lo.position.y = -.25; el.add(lo);
    const hand = sph(.15, skin); hand.position.y = -.55; el.add(hand);
    P[nm] = sh; P[nm + 'E'] = el; P[nm + 'H'] = hand;
  }
  // head
  const head = new THREE.Group(); head.position.y = 2.15; g.add(head); P.head = head;
  const skull = sph(.62, skin, 40); skull.scale.set(1, 1.04, .95); head.add(skull);
  for (const sx of [-1, 1]) { const ear = sph(.13, skin); ear.position.set(sx * .6, 0, 0); ear.scale.set(.6, 1, 1); head.add(ear); }
  const nose = sph(.11, M(0xCF916A)); nose.position.set(0, -.04, .6); nose.scale.set(1, 1.1, 1.1); head.add(nose);
  // eyes
  const eyes = new THREE.Group(); head.add(eyes); P.eyes = eyes; P.pupils = [];
  for (const sx of [-1, 1]) { const e = sph(.15, white); e.position.set(sx * .23, .14, .5); e.scale.set(1, 1.15, .7); eyes.add(e);
    const p = sph(.075, dark); p.position.set(sx * .23, .13, .6); eyes.add(p); P.pupils.push(p); }
  P.brows = [];
  for (const sx of [-1, 1]) { const b = box(.26, .06, .06, kind === 'host' ? M(0x2b1a10) : dark); b.position.set(sx * .23, .36, .56); head.add(b); P.brows.push(b); }
  // mouth: dark opening + lips line
  const mouth = new THREE.Group(); mouth.position.set(0, -.3, .54); head.add(mouth); P.mouth = mouth;
  const hole = sph(.2, M(0x3a0d14, { r: .9 })); hole.scale.set(1, .12, .35); mouth.add(hole); P.hole = hole;
  const teeth = box(.22, .05, .05, white); teeth.position.set(0, .03, .05); mouth.add(teeth); P.teeth = teeth;
  // character specifics
  if (kind === 'host') {
    const hair = sph(.64, M(0x24160d, { r: .35 }), 32); hair.scale.set(1.02, .55, 1); hair.position.set(0, .33, -.04); head.add(hair);
    const quiff = sph(.3, M(0x24160d, { r: .35 })); quiff.scale.set(1.4, .6, 1); quiff.position.set(.15, .62, .25); quiff.rotation.z = -.3; head.add(quiff);
    const mic = new THREE.Group(); mic.add(cyl(.05, .04, .45, dark)); const mh = sph(.1, M(0x9aa3b5, { r: .3, m: .8 })); mh.position.y = .27; mic.add(mh);
    mic.position.set(0, -.6, .12); mic.rotation.x = .3; P.armRE.add(mic); P.mic = mic;
  }
  if (kind === 'bofahad') {
    const hair = sph(.64, dark, 32); hair.scale.set(1.03, .4, 1.02); hair.position.set(0, .4, -.1); head.add(hair);
    const must = cap(.06, .34, dark); must.rotation.z = Math.PI / 2; must.position.set(0, -.17, .6); head.add(must);
    const goat = sph(.1, dark); goat.position.set(0, -.52, .45); goat.scale.set(1, 1.3, .8); head.add(goat);
    const gl = new THREE.Group(); const gm = M(0x05070c, { r: .12, m: .6 });
    for (const sx of [-1, 1]) { const l = box(.36, .22, .05, gm); l.position.set(sx * .23, .14, .63); gl.add(l); }
    const br = box(.14, .04, .04, gm); br.position.set(0, .18, .63); gl.add(br);
    const shine = box(.08, .16, .01, M(0xffffff, { e: 0xffffff, ei: .6 })); shine.position.set(-.3, .17, .66); shine.rotation.z = .5; gl.add(shine);
    head.add(gl); P.glasses = gl; eyes.visible = false;
    // sweat drops (hidden until needed)
    P.sweat = []; for (let i = 0; i < 4; i++) { const d = sph(.06, M(0x93F9FF, { r: .1, m: .1, e: 0x2a7f99, ei: .5 })); d.scale.set(.8, 1.3, .8); d.visible = false; head.add(d); P.sweat.push(d); }
  }
  if (kind === 'student') {
    const wd = new THREE.MeshStandardMaterial({ color: 0xF6F6F2, roughness: .75, side: THREE.DoubleSide });
    const gh = new THREE.Mesh(new THREE.SphereGeometry(.7, 32, 24, Math.PI / 2 + 1.05, Math.PI * 2 - 2.1, 0, Math.PI * .62), wd); gh.scale.set(1.02, .95, 1.02); gh.position.set(0, .08, -.02); head.add(gh);
    const cap0 = sph(.7, wd, 32); cap0.scale.set(1.02, .45, 1.02); cap0.position.set(0, .45, -.06); head.add(cap0);   // crown
    const drape = new THREE.Mesh(new THREE.CylinderGeometry(.7, .95, 1.3, 28, 1, true, 1.05, Math.PI * 2 - 2.1), wd); drape.position.set(0, -.6, -.04); head.add(drape);
    const agal = new THREE.Mesh(new THREE.TorusGeometry(.56, .06, 10, 32), dark); agal.rotation.x = Math.PI / 2 + .12; agal.position.set(0, .5, -.05); head.add(agal);
    const agal2 = agal.clone(); agal2.position.y = .42; agal2.scale.setScalar(1.03); head.add(agal2);
    const gm = M(0x111111, { r: .3, m: .4 });
    for (const sx of [-1, 1]) { const r = new THREE.Mesh(new THREE.TorusGeometry(.14, .02, 8, 24), gm); r.position.set(sx * .23, .14, .62); head.add(r); }
    const book = box(.5, .65, .06, M(0x3977D5)); book.position.set(0, -.6, .12); book.rotation.x = -.2; P.armLE.add(book); P.book = book;
  }
  g.userData.P = P; return g;
}
// pose / expression each frame. s = { talk 0..1, brow -1(angry)..1(surprised), smile, blink, look:[x,y], armL:[x,z,elbow], armR:[...], lean, turn, tilt, bob, sweat 0..1, glassesUp }
export function pose(ch, s, t) {
  const P = ch.userData.P, k = ch.userData.kind;
  const breathe = Math.sin(t * 2.2) * .015;
  P.torso.scale.y = 1 + breathe; P.torso.rotation.x = (s.lean || 0); P.torso.rotation.z = (s.sway || 0) * Math.sin(t * 3);
  P.head.rotation.set((s.nod || 0) + (s.lean || 0) * .5, s.turn || 0, s.tilt || 0); P.head.position.y = 2.15 + breathe * 2 + (s.bob || 0) * Math.abs(Math.sin(t * 9)) * .04;
  const open = Math.max(0, Math.min(1, s.talk || 0));
  P.hole.scale.set(1 + (s.smile || 0) * .25, .12 + open * .75, .35); P.teeth.visible = open > .2 || (s.smile || 0) > .6;
  P.mouth.rotation.z = 0;
  const b = s.brow || 0;
  P.brows.forEach((br, i) => { const sx = i ? 1 : -1; br.position.y = .36 + b * .07; br.rotation.z = -sx * b * -.25 + (b < 0 ? sx * b * .45 : 0); });
  const bl = s.blink ? 1 : 0; P.eyes.scale.y = 1 - .9 * bl;
  P.pupils.forEach((p, i) => { p.position.x = (i ? .23 : -.23) + (s.look ? s.look[0] : 0) * .05; p.position.y = .13 + (s.look ? s.look[1] : 0) * .05; });
  const arm = (nm, a, sx) => { a = a || [0, 0, 0]; P[nm].rotation.set(a[0], 0, sx * (.18 + a[1])); P[nm + 'E'].rotation.set(a[2] || 0, 0, 0); };
  arm('armL', s.armL, -1); arm('armR', s.armR, 1);
  if (P.glasses) P.glasses.position.y = (s.glassesUp || 0) * .12;
  if (P.sweat) P.sweat.forEach((d, i) => { const ph = ((t * .7 + i * .27) % 1); d.visible = (s.sweat || 0) > .05 && ph < .9;
    d.position.set((i % 2 ? 1 : -1) * (.35 + .12 * (i >> 1)), .45 - ph * .7, .45); d.scale.setScalar(.8 * (s.sweat || 0) + .2); });
  if (s.red != null) P.head.children[0].material.color.setHex(s.red > 0 ? lerpHex(SKIN, 0xE0605A, s.red) : SKIN);
}
function lerpHex(a, b, k) { const c1 = new THREE.Color(a), c2 = new THREE.Color(b); return c1.lerp(c2, k).getHex(); }
export function blinkAt(t, seed = 0) { const p = (t + seed * 1.7) % 3.3; return p < .12; }
