import type { Attempt } from './scoring';
import { load, save, remove } from './storage';
// in-progress attempt (auto-saved) + finished attempts history (this browser only)
const CUR = 'iq.current', HIST = 'iq.attempts';
export const getCurrent = () => load<Attempt | null>(CUR, null);
export const setCurrent = (a: Attempt) => save(CUR, a);
export const clearCurrent = () => remove(CUR);
export const getHistory = () => load<Attempt[]>(HIST, []);
export function pushHistory(a: Attempt) { const h = getHistory().filter(x => x.id !== a.id); h.push(a); save(HIST, h); }
export function deleteAttempt(id: string) { save(HIST, getHistory().filter(x => x.id !== id)); }
