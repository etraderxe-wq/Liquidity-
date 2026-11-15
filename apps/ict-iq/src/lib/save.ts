// Saves a generated file. Inside the claude.ai artifact viewer it uses the `downloads` capability; elsewhere a normal download link.
type DL = { save(o: { filename: string; data: Blob }): Promise<unknown> } | null;
let dl: Promise<DL> | undefined;
const getDL = () => { const c = (window as unknown as { claude?: { use?: (n: string) => Promise<DL> } }).claude;
  return c?.use ? (dl ??= c.use('downloads').catch(() => null)) : Promise.resolve(null); };
export async function saveFile(filename: string, data: Blob) {
  const d = await getDL();
  if (d) { try { await d.save({ filename, data }); } catch (e) { const code = (e as { code?: string }).code; if (code && code !== 'declined') alert('تعذّر حفظ الملف هنا (' + code + ')'); } return; }
  const u = URL.createObjectURL(data), a = document.createElement('a'); a.href = u; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000);
}
