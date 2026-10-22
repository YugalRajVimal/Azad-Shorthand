'use client';
import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { Mic, Sparkles } from 'lucide-react';
import { heroPhrases, pricing, site } from '@/data/siteConfig';
import { container, gradientSection } from '@/lib/styles';
import { scrollToId } from '@/lib/scroll';
import ParallaxLayer from './ParallaxLayer';
import PhoneMockup from './PhoneMockup';
import PlayBadge from './PlayBadge';
import SplitHeading from './SplitHeading';
import Typewriter from './Typewriter';
import WaveDivider from './WaveDivider';

const glyphs = [
  { d: 'M6 52 C22 6 52 6 62 36 S94 70 110 28', cls: 'left-[6%] top-[22%] w-28', depth: 40, delay: '0s' },
  { d: 'M8 20 C30 60 54 60 62 30 S88 -4 112 38', cls: 'left-[44%] top-[14%] w-24', depth: 70, delay: '1.2s' },
  { d: 'M10 40 C40 40 40 8 66 8 S92 50 112 46', cls: 'left-[10%] bottom-[22%] w-32', depth: 55, delay: '2.1s' },
  { d: 'M6 10 C20 50 44 54 58 30 S96 6 110 54', cls: 'right-[8%] top-[18%] w-28', depth: 90, delay: '0.6s' },
  { d: 'M8 46 C28 6 48 6 60 30 S92 62 112 22', cls: 'right-[34%] bottom-[18%] w-24', depth: 30, delay: '1.8s' },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <section id="home" onMouseMove={reduce ? undefined : onMove} onMouseLeave={reduce ? undefined : reset}
      className={`relative isolate min-h-[100svh] scroll-mt-20 overflow-hidden ${gradientSection} pb-40 pt-32 sm:pb-48`}>
      <div aria-hidden className="absolute inset-0 -z-10 bg-noise opacity-[0.07] mix-blend-overlay" />
      <ParallaxLayer mx={mx} my={my} depth={30} className="absolute -left-32 top-10 -z-10"><div className="h-[420px] w-[420px] animate-blob rounded-full bg-white/25 blur-3xl" /></ParallaxLayer>
      <ParallaxLayer mx={mx} my={my} depth={60} className="absolute -right-24 bottom-10 -z-10"><div className="h-[480px] w-[480px] animate-blob rounded-full bg-azure-brand/50 blur-3xl [animation-delay:-6s]" /></ParallaxLayer>
      <ParallaxLayer mx={mx} my={my} depth={20} className="absolute left-1/3 top-1/2 -z-10"><div className="h-72 w-72 animate-blob rounded-full bg-cyan-200/30 blur-3xl [animation-delay:-11s]" /></ParallaxLayer>

      {/* {glyphs.map((g, i) => (
        <ParallaxLayer key={i} mx={mx} my={my} depth={g.depth} className={`absolute -z-[5] hidden sm:block ${g.cls}`}>
          <svg aria-hidden viewBox="0 0 120 70" fill="none" className="animate-float" style={{ animationDelay: g.delay }}>
            <path d={g.d} stroke="white" strokeOpacity="0.55" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </ParallaxLayer>
      ))} */}

      <div className={`${container} grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]`}>
        <div className="text-white">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
            <Sparkles size={16} /> Hindi <span aria-hidden>·</span> English <span aria-hidden>·</span> Voice
          </motion.span>
          <SplitHeading as="h1" delay={1} text={site.tagline} className="mt-5 font-display text-4xl font-bold leading-[1.1] sm:text-5xl xl:text-6xl" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mt-5 text-xl text-white/95 sm:text-2xl">
            <Typewriter phrases={heroPhrases} />
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }} className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">{site.description}</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.85 }} className="mt-8 flex flex-wrap items-center gap-4">
            <PlayBadge />
            <button type="button" onClick={() => scrollToId('demo')} data-cursor="Try it"
              className="inline-flex h-14 items-center gap-2 rounded-xl border border-white/40 bg-white/15 px-6 font-semibold backdrop-blur-md transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60">
              <Mic size={18} /> Try the voice demo
            </button>
          </motion.div>
          <p className="mt-5 text-sm text-white/80">{pricing.trial} · from {pricing.currency}{pricing.plans[0].price}/month</p>
        </div>

        <div className="relative mx-auto flex w-full max-w-md justify-center">
          <ParallaxLayer mx={mx} my={my} depth={-18}>
            <PhoneMockup src="/images/screens/home-hindi.jpeg" alt="Azad Shorthand app home screen with Hindi shorthand categories" className="w-[240px] sm:w-[280px]" priority />
          </ParallaxLayer>
          <ParallaxLayer mx={mx} my={my} depth={50} className="absolute -left-2 top-16 sm:-left-10">
            <div className="animate-float rounded-2xl border border-white/40 bg-white/60 p-2 shadow-glass backdrop-blur-xl dark:bg-slate-900/60">
              <Image src="/images/outlines/cbi.jpg" alt="Shorthand outline for CBI" width={130} height={37} className="rounded-lg" />
              <p className="px-1 pt-1 text-xs font-semibold text-ink">CBI</p>
            </div>
          </ParallaxLayer>
          <ParallaxLayer mx={mx} my={my} depth={70} className="absolute -right-2 bottom-24 sm:-right-8">
            <div className="flex animate-float items-center gap-2 rounded-full border border-white/40 bg-white/70 px-4 py-2 text-sm font-semibold text-ink shadow-glass backdrop-blur-xl [animation-delay:-3s] dark:bg-slate-900/60">
              <span className="relative grid h-8 w-8 place-items-center rounded-full bg-brand-gradient text-white">
                <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-azure-brand/60" /><Mic size={16} className="relative" />
              </span>
              &ldquo;Arab&rdquo;
            </div>
          </ParallaxLayer>
        </div>
      </div>
      <WaveDivider position="bottom" className="text-bg" />
    </section>
  );
}
