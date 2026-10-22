'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), []);
  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch { /* ignore */ }
    setDark(next);
  };
  return (
    <button type="button" onClick={toggle} aria-pressed={dark} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`grid h-10 w-10 place-items-center rounded-full border border-slate-400/40 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50 ${className}`}>
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
