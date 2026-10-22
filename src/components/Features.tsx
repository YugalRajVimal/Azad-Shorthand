import { features } from '@/data/siteConfig';
import { iconMap } from '@/lib/icons';
import { container, gradientSection } from '@/lib/styles';
import PhoneMockup from './PhoneMockup';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import TiltCard from './TiltCard';
import WaveDivider from './WaveDivider';

function Card({ f, i }: { f: (typeof features)[number]; i: number }) {
  const Icon = iconMap[f.icon];
  return (
    <Reveal delay={i * 0.08}>
      <TiltCard>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/90 text-azure-brand transition duration-300 group-hover:-rotate-12 group-hover:scale-110 dark:bg-white/15 dark:text-sky-brand"><Icon size={26} /></span>
        <h3 className="mt-4 font-display text-xl font-bold text-white">{f.title}</h3>
        <p className="mt-2 text-white/85">{f.body}</p>
      </TiltCard>
    </Reveal>
  );
}

export default function Features() {
  return (
    <section id="features" className={`relative scroll-mt-20 overflow-hidden ${gradientSection} py-32 sm:py-44`}>
      <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay" />
      <WaveDivider position="top" className="text-surface" />
      <div className={`${container} relative`}>
        <SectionHeading light eyebrow="Features" title="Everything a shorthand learner needs" subtitle="Built around one idea: find the right outline fast, then practise until it sticks." />
        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="grid gap-5">{features.slice(0, 3).map((f, i) => <Card key={f.title} f={f} i={i} />)}</div>
          <Reveal className="hidden lg:block"><PhoneMockup src="/images/screens/splash.jpeg" alt="Azad Shorthand app splash screen" className="w-[250px]" /></Reveal>
          <div className="grid gap-5">{features.slice(3).map((f, i) => <Card key={f.title} f={f} i={i + 3} />)}</div>
        </div>
      </div>
      <WaveDivider position="bottom" className="text-bg" />
    </section>
  );
}
