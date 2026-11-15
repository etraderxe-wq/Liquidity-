import { jsPDF } from 'jspdf';
import logoUrl from '../assets/logo.png';
// Certificate drawn on a canvas (correct Arabic shaping), then exported as PNG or embedded in a PDF.
export interface CertData { name: string; score: number; level: string; date: string; certId: string }
export function certId(attemptId: string, name: string, score: number) {
  let h = 2166136261; for (const ch of attemptId + name + score) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return 'EMX-' + (h >>> 0).toString(36).toUpperCase().padStart(7, '0') + '-' + attemptId.slice(-4);
}
const img = (src: string) => new Promise<HTMLImageElement>((ok, err) => { const i = new Image(); i.onload = () => ok(i); i.onerror = err; i.src = src; });
export async function drawCertificate(d: CertData): Promise<HTMLCanvasElement> {
  await document.fonts.ready;
  const W = 2000, H = 1414, c = document.createElement('canvas'); c.width = W; c.height = H; const X = c.getContext('2d')!;
  let g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#020306'); g.addColorStop(.65, '#050913'); g.addColorStop(1, '#00051A'); X.fillStyle = g; X.fillRect(0, 0, W, H);
  g = X.createRadialGradient(0, H, 0, 0, H, 900); g.addColorStop(0, 'rgba(147,249,255,.35)'); g.addColorStop(1, 'rgba(57,119,213,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H);
  X.strokeStyle = 'rgba(147,249,255,.55)'; X.lineWidth = 3; X.strokeRect(50, 50, W - 100, H - 100); X.strokeStyle = 'rgba(147,249,255,.18)'; X.lineWidth = 1; X.strokeRect(70, 70, W - 140, H - 140);
  const logo = await img(logoUrl); const lw = 360, lh = lw * logo.height / logo.width; X.drawImage(logo, W / 2 - lw / 2, 120, lw, lh);
  X.textAlign = 'center'; X.fillStyle = '#93F9FF'; X.font = '400 44px Michroma'; X.fillText('EMULLAX | ICT TRADING IQ CERTIFICATE', W / 2, 160 + lh + 60);
  X.fillStyle = '#9AA4B8'; X.font = '700 36px Tajawal'; X.direction = 'rtl'; X.fillText('تُمنح هذه الشهادة إلى', W / 2, 160 + lh + 150);
  X.fillStyle = '#FCFCFC'; X.font = '900 96px Tajawal'; X.fillText(d.name || '—', W / 2, 160 + lh + 270); X.direction = 'ltr';
  const y = 160 + lh + 420; X.fillStyle = '#FCFCFC'; X.font = '800 150px Inter'; const sw = X.measureText(String(d.score)).width; X.font = '700 60px Inter'; const tw = X.measureText(' / 200').width;
  X.textAlign = 'left'; X.font = '800 150px Inter'; X.fillText(String(d.score), W / 2 - (sw + tw) / 2, y); X.fillStyle = '#9AA4B8'; X.font = '700 60px Inter'; X.fillText(' / 200', W / 2 - (sw + tw) / 2 + sw, y); X.textAlign = 'center';
  X.fillStyle = '#93F9FF'; X.font = '400 46px Michroma'; X.fillText(d.level.toUpperCase(), W / 2, y + 100);
  X.fillStyle = '#9AA4B8'; X.font = '600 30px Inter';
  X.fillText(`DATE  ${d.date}      ·      CERTIFICATE No.  ${d.certId}`, W / 2, H - 170);
  X.font = '400 24px Michroma'; X.fillStyle = '#57A1EF'; X.fillText('LIQUIDITY GROUP  ·  TRADE WITH DISCIPLINE', W / 2, H - 115);
  return c;
}
export async function downloadCertificate(d: CertData, kind: 'pdf' | 'png') {
  const c = await drawCertificate(d), data = c.toDataURL('image/png');
  if (kind === 'png') { const a = document.createElement('a'); a.href = data; a.download = `${d.certId}.png`; a.click(); return; }
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: [c.width / 2, c.height / 2] }); pdf.addImage(data, 'PNG', 0, 0, c.width / 2, c.height / 2); pdf.save(`${d.certId}.pdf`);
}
export async function shareCertificate(d: CertData) {
  const c = await drawCertificate(d); const blob: Blob = await new Promise(ok => c.toBlob(b => ok(b!), 'image/png'));
  const file = new File([blob], `${d.certId}.png`, { type: 'image/png' });
  if (navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], title: 'ICT Trading IQ', text: `${d.name} · ${d.score}/200 · ${d.level}` }); return true; }
  return false;
}
