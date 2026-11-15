import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
export default function Shell({ children }: { children: React.ReactNode }) {
  const nav = 'rounded-lg px-3 py-1.5 text-sm text-mut hover:text-ink';
  return (<div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10">
    <header className="flex items-center justify-between gap-3 py-4">
      <Link to="/" className="flex items-center gap-3"><img src={logo} alt="EMULLAX" className="h-9 w-auto" /><span className="hidden en text-[11px] text-cyan sm:block">ICT TRADING IQ</span></Link>
      <nav className="flex gap-1">
        <NavLink to="/" end className={({ isActive }) => nav + (isActive ? ' !text-cyan' : '')}>الرئيسية</NavLink>
        <NavLink to="/history" className={({ isActive }) => nav + (isActive ? ' !text-cyan' : '')}>نتائجي</NavLink>
        <NavLink to="/admin" className={({ isActive }) => nav + (isActive ? ' !text-cyan' : '')}>الإدارة</NavLink>
      </nav>
    </header>
    <main className="flex-1">{children}</main>
    <footer className="pt-10 text-center text-xs text-mut"><span className="en">LIQUIDITY GROUP · EMULLAX</span> · محتوى تعليمي وليس توصية · التداول ينطوي على مخاطر</footer>
  </div>);
}
