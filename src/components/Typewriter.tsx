'use client';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type Phrase = { lang: 'en' | 'hi'; text: string };

export default function Typewriter({ phrases, className = '' }: { phrases: readonly Phrase[]; className?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const full = phrases[i].text;
    let delay = deleting ? 28 : 65;
    if (!deleting && n === full.length) delay = 1700;
    const t = setTimeout(() => {
      if (!deleting && n === full.length) setDeleting(true);
      else if (deleting && n === 0) { setDeleting(false); setI((i + 1) % phrases.length); }
      else setN(n + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [n, deleting, i, phrases, reduce]);

  const p = phrases[reduce ? 0 : i];
  const shown = reduce ? p.text : p.text.slice(0, n);
  return (
    <p className={`min-h-[2.2rem] ${p.lang === 'hi' ? 'font-hindi' : 'font-display'} ${className}`} aria-live="off">
      {shown}
      <span aria-hidden className="ml-0.5 inline-block h-[1.1em] w-[3px] translate-y-[3px] animate-caret bg-current" />
    </p>
  );
}
