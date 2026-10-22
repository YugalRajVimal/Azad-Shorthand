'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faq } from '@/data/siteConfig';
import { container } from '@/lib/styles';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className={`${container} scroll-mt-20 py-20 sm:py-28`}>
      <SectionHeading eyebrow="FAQ" title="Questions, answered" />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faq.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className={`rounded-2xl border bg-surface transition ${isOpen ? 'border-azure-brand/50 shadow-glow' : 'border-line'}`}>
                <h3>
                  <button type="button" id={`faq-btn-${i}`} aria-expanded={isOpen} aria-controls={`faq-panel-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left font-display text-lg font-medium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50">
                    {f.q}
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="shrink-0 text-azure-brand"><ChevronDown /></motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
