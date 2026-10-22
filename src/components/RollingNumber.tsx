'use client';
import { motion } from 'framer-motion';

// Digits roll vertically between values. The aria-label carries the real number.
export default function RollingNumber({ value, className = '' }: { value: number; className?: string }) {
  const digits = String(value).split('');
  return (
    <span aria-label={String(value)} role="img" className={`inline-flex h-[1em] overflow-hidden leading-none ${className}`}>
      {digits.map((d, i) => (
        <span key={`${digits.length - i}`} aria-hidden className="relative block h-[1em] w-[0.62em] overflow-hidden">
          <motion.span className="block" initial={false} animate={{ y: `${-Number(d) * 10}%` }} transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
            {Array.from({ length: 10 }, (_, n) => <span key={n} className="block h-[1em] text-center leading-none">{n}</span>)}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
