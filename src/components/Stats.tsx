import { BarChart3, Download, Heart, Star, Users } from 'lucide-react';
import { stats, type Stat } from '@/data/siteConfig';
import { container, gradientSection } from '@/lib/styles';
import CountUp from './CountUp';
import Reveal from './Reveal';

const icons: Record<Stat['id'], typeof Download> = { downloads: Download, learners: Heart, active: Users, reviews: Star };

export default function Stats() {
  return (
    <section id="stats" aria-label="Statistics" className={`${container} py-10`}>
      <div className={`relative overflow-hidden rounded-[2rem] ${gradientSection} p-8 text-white shadow-glow sm:p-12`}>
        <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.07] mix-blend-overlay" />
        {stats.length ? (
          <ul className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = icons[s.id];
              return (
                <li key={s.id}>
                  <Reveal delay={i * 0.1} className="rounded-2xl border border-white/25 bg-white/15 p-6 text-center backdrop-blur">
                    <Icon className="mx-auto" size={32} />
                    <p className="mt-3 font-display text-4xl font-bold"><CountUp to={s.value} suffix={s.suffix} /></p>
                    <p className="mt-1 text-white/90">{s.label}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        ) : (
          <Reveal className="relative flex flex-col items-center gap-3 text-center">
            <BarChart3 size={36} aria-hidden />
            <p className="font-display text-2xl font-bold">Our numbers are coming soon</p>
            <p className="max-w-md text-white/85">We will share real download and learner counts here once they are ready to publish.</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
