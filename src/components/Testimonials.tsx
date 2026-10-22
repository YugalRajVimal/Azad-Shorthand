'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageSquareQuote, Quote } from 'lucide-react';
import { site, testimonials } from '@/data/siteConfig';
import { container } from '@/lib/styles';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

export default function Testimonials() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  useEffect(() => {
    if (n < 2 || paused || reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n, paused, reduce]);

  const go = (d: number) => setI((x) => (x + d + n) % n);
  const t = testimonials[i];

  return (
    <section id="testimonials" className={`${container} scroll-mt-20 py-20 sm:py-28`}>
      <SectionHeading eyebrow="Testimonials" title="What learners say" subtitle="Real feedback from people who practise with Azad Shorthand." />
      <div className="mx-auto mt-12 max-w-3xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {n ? (
          <>
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface shadow-glass">
              <AnimatePresence mode="wait">
                <motion.figure key={i} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25}
                  onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}
                  className="cursor-grab px-8 py-12 text-center active:cursor-grabbing sm:px-14">
                  <Quote aria-hidden className="mx-auto text-azure-brand" size={36} />
                  <blockquote className="mt-4 text-lg leading-relaxed sm:text-xl">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6"><span className="font-display font-bold">{t.name}</span><span className="block text-sm text-muted">{t.role}</span></figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
            {n > 1 && (
              <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Choose testimonial">
                {testimonials.map((_, d) => (
                  <button key={d} type="button" role="tab" aria-selected={d === i} aria-label={`Testimonial ${d + 1}`} onClick={() => setI(d)}
                    className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50 ${d === i ? 'w-8 bg-azure-brand' : 'w-2.5 bg-line'}`} />
                ))}
              </div>
            )}
          </>
        ) : (
          <Reveal className="rounded-[2rem] border border-dashed border-azure-brand/40 bg-surface/60 p-10 text-center">
            <MessageSquareQuote aria-hidden className="mx-auto text-azure-brand" size={40} />
            <p className="mt-4 font-display text-2xl font-bold">Learner stories are on the way</p>
            <p className="mx-auto mt-2 max-w-md text-muted">We only publish real feedback. Using the app? We would love to hear how it is going.</p>
            <a href={`mailto:${site.email}?subject=My%20Azad%20Shorthand%20feedback`} data-cursor="Write"
              className="mt-6 inline-block rounded-full bg-brand-gradient px-7 py-3 font-semibold text-white shadow-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50">Share your feedback</a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
