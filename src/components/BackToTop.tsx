'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { scrollToId } from '@/lib/scroll';

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button type="button" aria-label="Back to top" onClick={() => scrollToId('home')} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} whileHover={{ y: -4 }}
          className="fixed bottom-24 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-brand-gradient text-white shadow-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50">
          <ArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
