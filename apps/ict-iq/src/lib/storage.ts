export function load<T>(key: string, fallback: T): T { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) as T : fallback; } catch { return fallback; } }
export function save(key: string, v: unknown) { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage full or blocked */ } }
export function remove(key: string) { try { localStorage.removeItem(key); } catch { /* ignore */ } }
