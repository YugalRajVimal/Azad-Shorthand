'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Mic, Search } from 'lucide-react';
import { demo, type DemoResult } from '@/data/siteConfig';
import { container } from '@/lib/styles';
import PhoneMockup from './PhoneMockup';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

type Lang = 'en' | 'hi';
type Phase = 'idle' | 'listening' | 'typing';

export default function VoiceDemo() {
  const reduce = useReducedMotion();
  const [lang, setLang] = useState<Lang>('en');
  const [value, setValue] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const next = useRef(0);

  const clear = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; }, []);
  useEffect(() => clear, [clear]);

  const items = demo[lang];
  const q = value.trim().toLowerCase();
  const results: DemoResult[] = q ? items.filter((r) => r.query.toLowerCase().startsWith(q)) : [];

  const run = (query: string) => {
    clear();
    setValue('');
    if (reduce) { setValue(query); setPhase('idle'); return; }
    setPhase('listening');
    timers.current.push(setTimeout(() => {
      setPhase('typing');
      [...query].forEach((_, i) => timers.current.push(setTimeout(() => {
        setValue(query.slice(0, i + 1));
        if (i === query.length - 1) setPhase('idle');
      }, 110 * (i + 1))));
    }, 1700));
  };

  const mic = () => {
    if (phase !== 'idle') return;
    const pool = demo[lang];
    const pick = pool[next.current % pool.length];
    next.current += 1;
    run(pick.query);
  };
  const switchLang = (l: Lang) => { clear(); setPhase('idle'); setValue(''); setLang(l); next.current = 0; };
  const status = phase === 'listening' ? 'Listening' : results[0] ? `Result: ${results[0].label}` : '';

  return (
    <section id="demo" className="relative scroll-mt-20 overflow-hidden bg-surface py-20 sm:py-28">
      <div aria-hidden className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-sky-brand/20 blur-3xl" />
      <div aria-hidden className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-azure-brand/20 blur-3xl" />
      <div className={`${container} relative grid items-center gap-14 lg:grid-cols-2`}>
        <div>
          <SectionHeading className="!mx-0 !text-left" eyebrow="Live demo" title="Speak it. Type it. See the outline." subtitle="Tap the mic and watch a search resolve into a shorthand outline. Sample data only; the real thing lives in the app." />
          <Reveal delay={0.1} className="mt-8">
            <div role="group" aria-label="Demo language" className="inline-flex rounded-full bg-sky-brand/15 p-1 text-sm font-medium">
              {(['en', 'hi'] as const).map((l) => (
                <button key={l} type="button" aria-pressed={lang === l} onClick={() => switchLang(l)}
                  className={`rounded-full px-5 py-2 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50 ${lang === l ? 'bg-brand-gradient text-white shadow' : 'text-muted'}`}>
                  {l === 'en' ? 'English' : 'हिंदी'}
                </button>
              ))}
            </div>
            <p className="mt-6 text-sm font-medium text-muted">Try a search:</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {items.filter((r, i, a) => a.findIndex((x) => x.query === r.query) === i).map((r) => (
                <button key={r.query} type="button" onClick={() => run(r.query)} disabled={phase !== 'idle'} lang={lang}
                  className={`rounded-full border border-line bg-bg px-5 py-2 font-semibold transition hover:-translate-y-0.5 hover:border-azure-brand hover:text-azure-brand disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50 ${lang === 'hi' ? 'font-hindi' : ''}`}>
                  {r.query}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex justify-center">
          <PhoneMockup tilt={false} className="w-[270px] sm:w-[300px]">
            <div className="flex h-full flex-col bg-[#fbf3ff] pt-6 dark:bg-[#1a1530]">
              <div className="flex items-center gap-2 px-3 pt-3">
                <label className="flex flex-1 items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900">
                  <Search size={16} className="text-slate-700 dark:text-slate-200" aria-hidden />
                  <span className="sr-only">Search outlines</span>
                  <input value={value} onChange={(e) => { clear(); setPhase('idle'); setValue(e.target.value); }} placeholder={lang === 'en' ? 'Search here…' : 'यहाँ खोजें…'} lang={lang}
                    className={`w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white ${lang === 'hi' ? 'font-hindi' : ''}`} />
                </label>
                <button type="button" onClick={mic} aria-label="Start voice search demo" data-cursor="Speak"
                  className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50 dark:text-white">
                  {phase === 'idle' && <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-azure-brand/30" />}
                  <Mic size={20} className="relative" />
                </button>
              </div>

              <div className="relative mt-3 flex-1 space-y-3 overflow-hidden px-3 pb-4">
                <AnimatePresence mode="popLayout">
                  {results.map((r) => (
                    <motion.article key={r.query} layout initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                      className="rounded-2xl bg-white p-3 text-center shadow-md dark:bg-slate-900">
                      {r.kind === 'outline' ? (
                        <Image src={r.image} alt={`Shorthand outline for ${r.label}`} width={r.width} height={r.height} className="w-full rounded-lg" />
                      ) : (
                        <p className="rounded-lg bg-sky-brand/15 px-3 py-5 text-xs text-slate-600 dark:text-slate-300">{r.note}</p>
                      )}
                      <p lang={lang} className={`mt-2 text-sm font-bold text-slate-800 dark:text-white ${lang === 'hi' ? 'font-hindi' : ''}`}>{r.label}</p>
                    </motion.article>
                  ))}
                </AnimatePresence>
                {!results.length && phase === 'idle' && (
                  <p className="px-4 pt-10 text-center text-sm text-slate-500 dark:text-slate-300">{value ? 'No sample outline for that. Try one of the suggestions.' : 'Tap the mic, or type a word.'}</p>
                )}

                <AnimatePresence>
                  {phase === 'listening' && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="absolute inset-x-3 top-2 rounded-2xl bg-white p-5 text-center shadow-xl dark:bg-slate-900">
                      <div className="relative mx-auto grid h-16 w-16 place-items-center">
                        <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-azure-brand/40" />
                        <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-azure-brand/40 [animation-delay:.5s]" />
                        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-brand-gradient text-white"><Mic /></span>
                      </div>
                      <div aria-hidden className="mx-auto mt-4 flex h-10 items-center justify-center gap-[3px]">
                        {Array.from({ length: 22 }).map((_, i) => {
                          const h = 8 + Math.abs(Math.sin(i * 1.7)) * 26;
                          return <motion.span key={i} className="w-[3px] rounded-full bg-azure-brand" animate={{ height: [6, h, 10, h * 0.7, 6] }} transition={{ duration: 0.9 + (i % 5) * 0.1, repeat: Infinity, delay: i * 0.04 }} />;
                        })}
                      </div>
                      <p lang={lang} className={`mt-2 text-sm font-medium text-slate-700 dark:text-slate-200 ${lang === 'hi' ? 'font-hindi' : ''}`}>{lang === 'en' ? 'Speak something…' : 'कुछ बोलिए…'}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </PhoneMockup>
        </Reveal>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{status}</p>
    </section>
  );
}
