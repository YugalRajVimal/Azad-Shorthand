import { highlights } from '@/data/siteConfig';
import { iconMap } from '@/lib/icons';
import { container } from '@/lib/styles';
import Reveal from './Reveal';

export default function Highlights() {
  return (
    <section aria-label="Highlights" className={`${container} -mt-4 pb-10`}>
      <ul className="grid gap-5 md:grid-cols-3">
        {highlights.map((h, i) => {
          const Icon = iconMap[h.icon];
          return (
            <li key={h.title}>
              <Reveal delay={i * 0.1} className="group h-full rounded-3xl border border-line bg-surface/80 p-7 text-center shadow-glass backdrop-blur transition hover:-translate-y-1 hover:shadow-glow">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient-soft text-azure-brand transition group-hover:scale-110 group-hover:rotate-6"><Icon size={30} /></span>
                <h3 className="mt-5 font-display text-xl font-bold">{h.title}</h3>
                <p className="mt-2 text-muted">{h.body}</p>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
