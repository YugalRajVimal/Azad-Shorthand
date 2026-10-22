'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { categories, hindiQuote, method, site } from '@/data/siteConfig';
import { container } from '@/lib/styles';
import Reveal from './Reveal';
import SplitHeading from './SplitHeading';

const tones = [
  'bg-sky-100 text-sky-900 dark:bg-sky-400/15 dark:text-sky-100',
  'bg-violet-100 text-violet-900 dark:bg-violet-400/15 dark:text-violet-100',
  'bg-emerald-100 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-100',
  'bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-100',
];

export default function About() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const list = categories[lang];
  return (
    <section id="about" className={`${container} scroll-mt-20 py-20 sm:py-28`}>
      <div className="grid items-start gap-14 lg:grid-cols-2">
        <div>
          <Reveal><span className="inline-block rounded-full bg-sky-brand/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-azure-brand">About the method</span></Reveal>
          <SplitHeading text={method.headline} className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl" />
          <Reveal delay={0.1}><p className="mt-5 text-lg text-muted">{method.body}</p></Reveal>
          <Reveal delay={0.15}>
            <p lang="hi" className="mt-6 inline-block rounded-2xl bg-brand-gradient px-5 py-3 font-hindi text-lg font-semibold text-white shadow-glow">{site.hindiTagline}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <figure className="relative mt-8 rounded-3xl border border-line bg-surface p-6 shadow-glass">
              <Quote aria-hidden className="absolute -top-4 left-6 rounded-full bg-azure-brand p-1.5 text-white" size={32} />
              <blockquote lang="hi" className="pt-2 font-hindi text-base leading-relaxed text-ink">{hindiQuote}</blockquote>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="rounded-[2rem] border border-line bg-surface/80 p-6 shadow-glass backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-xl font-bold">Inside the app</h3>
            <div role="group" aria-label="Category language" className="flex rounded-full bg-sky-brand/15 p-1 text-sm font-medium">
              {(['en', 'hi'] as const).map((l) => (
                <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}
                  className={`rounded-full px-4 py-1.5 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50 ${lang === l ? 'bg-brand-gradient text-white shadow' : 'text-muted'}`}>
                  {l === 'en' ? 'English' : 'हिंदी'}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.ul key={lang} lang={lang} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
              className={`mt-6 flex flex-wrap gap-2.5 ${lang === 'hi' ? 'font-hindi' : ''}`}>
              {list.map((c, i) => (
                <motion.li key={c} whileHover={{ y: -3, scale: 1.05 }} className={`rounded-full px-4 py-2 text-sm font-medium ${tones[i % tones.length]}`}>{c}</motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
