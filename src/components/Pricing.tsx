'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { PLAY_STORE_URL, perMonth, pricing, savingsPercent, type BillingId } from '@/data/siteConfig';
import { container } from '@/lib/styles';
import MagneticButton from './MagneticButton';
import Reveal from './Reveal';
import RollingNumber from './RollingNumber';
import SectionHeading from './SectionHeading';

export default function Pricing() {
  const [id, setId] = useState<BillingId>('yearly');
  const plan = pricing.plans.find((p) => p.id === id)!;
  const save = savingsPercent(plan);

  return (
    <section id="pricing" className={`${container} scroll-mt-20 py-20 sm:py-28`}>
      <SectionHeading eyebrow="Pricing" title="Simple plans. Everything included." subtitle={`${pricing.trial}. Then pick the plan that suits your pace.`} />
      <Reveal className="mt-10 flex justify-center">
        <div role="radiogroup" aria-label="Billing period" className="relative flex rounded-full border border-line bg-surface p-1.5 shadow-glass">
          {pricing.plans.map((p) => (
            <button key={p.id} type="button" role="radio" aria-checked={id === p.id} onClick={() => setId(p.id)}
              className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50 sm:px-6 ${id === p.id ? 'text-white' : 'text-muted hover:text-ink'}`}>
              {id === p.id && <motion.span layoutId="billing-pill" className="absolute inset-0 -z-0 rounded-full bg-brand-gradient shadow-glow" transition={{ type: 'spring', stiffness: 300, damping: 28 }} />}
              <span className="relative">{p.label}</span>
              {'best' in p && p.best && <span className="relative ml-1.5 hidden rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-950 sm:inline">Best value</span>}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-10 max-w-lg">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface shadow-glass">
          <div className="relative bg-brand-gradient px-8 pb-14 pt-8 text-center text-white">
            <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay" />
            <AnimatePresence mode="wait">
              <motion.p key={plan.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="relative font-display text-lg font-medium">
                {plan.label}{'best' in plan && plan.best ? ' · Best value' : ''}
              </motion.p>
            </AnimatePresence>
            <p className="relative mt-3 flex items-end justify-center gap-1 font-display font-bold">
              <span className="text-4xl leading-none">{pricing.currency}</span>
              <RollingNumber value={plan.price} className="text-6xl" />
              <span className="pb-1 text-lg font-medium text-white/85">{plan.unit}</span>
            </p>
            <div className="relative mt-4 flex min-h-[2rem] flex-wrap items-center justify-center gap-3 text-sm">
              {plan.months > 1 && <span>≈ {pricing.currency}{perMonth(plan)}/month</span>}
              {save > 0 && <motion.span key={`${plan.id}-save`} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-full bg-amber-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-950">Save {save}%</motion.span>}
            </div>
            <svg aria-hidden viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-8 w-full text-surface" fill="currentColor"><path d="M0 40 V10 Q200 50 400 10 V40 Z" /></svg>
          </div>
          <div className="px-8 pb-8 pt-4">
            <ul className="space-y-3">
              {pricing.includes.map((f) => (
                <li key={f} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-sky-brand/20 text-azure-brand"><Check size={14} /></span>{f}</li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <MagneticButton href={PLAY_STORE_URL} cursorLabel="Download" className="inline-block rounded-full bg-brand-gradient px-10 py-3.5 font-semibold text-white shadow-glow transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50">
                Start 3-day free trial
              </MagneticButton>
            </div>
            <p className="mt-3 text-center text-xs text-muted">Savings are compared with paying the monthly price for the same period.</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
