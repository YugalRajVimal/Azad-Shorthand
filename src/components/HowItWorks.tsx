import { Search, PenLine, Repeat } from 'lucide-react';
import { howItWorks } from '@/data/siteConfig';
import { container } from '@/lib/styles';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const icons = [Search, PenLine, Repeat];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={`${container} scroll-mt-20 py-16 sm:py-24`}>
      <SectionHeading eyebrow="How it works" title="From question to outline in three steps" />
      <ol className="relative mt-14 grid gap-8 md:grid-cols-3">
        <span aria-hidden className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-azure-brand/40 md:block" />
        {howItWorks.map((s, i) => {
          const Icon = icons[i];
          return (
            <li key={s.step}>
              <Reveal delay={i * 0.12} className="relative h-full rounded-3xl border border-line bg-surface p-8 text-center shadow-glass">
                <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-gradient text-white shadow-glow"><Icon size={32} />
                  <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-white text-sm font-bold text-azure-brand shadow">{s.step}</span>
                </span>
                <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
