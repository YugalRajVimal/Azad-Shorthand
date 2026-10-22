'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav, PLAY_STORE_URL, site } from '@/data/siteConfig';
import { scrollToId } from '@/lib/scroll';
import MagneticButton from './MagneticButton';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => { e.preventDefault(); setOpen(false); scrollToId(id); };
  const text = scrolled ? 'text-ink' : 'text-white';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-line/60 bg-surface/70 py-4 shadow-glass backdrop-blur-xl' : 'bg-transparent py-4'}`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" onClick={(e) => go(e, 'home')} className={`flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50 ${text}`} aria-label={`${site.name} home`}>
          <Image src="/images/brand/logo.jpeg" alt="" width={44} height={44} priority className="h-11 w-11 rounded-xl bg-white p-0.5 shadow-glass" />
          <span className="hidden font-display text-lg font-bold sm:block">{site.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => go(e, n.id)} aria-current={active === n.id ? 'true' : undefined}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50 ${text} ${active === n.id ? '' : 'opacity-75 hover:opacity-100'}`}>
              {active === n.id && <motion.span layoutId="nav-pill" className={`absolute inset-0 -z-10 rounded-full ${scrolled ? 'bg-sky-brand/20' : 'bg-white/20'}`} />}
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className={text} />
          <div className="hidden sm:block">
            <MagneticButton href={PLAY_STORE_URL} cursorLabel="Download"
              className={`inline-block rounded-full px-6 py-2.5 text-sm font-semibold uppercase tracking-wide shadow-glass transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50 ${scrolled ? 'bg-brand-gradient text-white' : 'bg-white text-azure-brand'}`}>
              Download Now
            </MagneticButton>
          </div>
          <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${text} focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50`}>
            <Menu />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="ov" className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside key="drawer" role="dialog" aria-modal="true" aria-label="Menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col bg-surface p-6 text-ink shadow-2xl"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-sky-brand/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50"><X /></button>
              <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
                {nav.map((n, i) => (
                  <motion.a key={n.id} href={`#${n.id}`} onClick={(e) => go(e, n.id)} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}
                    className={`rounded-xl px-4 py-3 font-display text-xl font-medium ${active === n.id ? 'bg-sky-brand/15 text-azure-brand' : ''}`}>{n.label}</motion.a>
                ))}
              </nav>
              <a href={PLAY_STORE_URL} className="mt-auto rounded-full bg-brand-gradient px-6 py-3 text-center font-semibold uppercase tracking-wide text-white">Download Now</a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
