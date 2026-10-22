import Image from 'next/image';
import { Newspaper } from 'lucide-react';
import { blogPosts } from '@/data/siteConfig';
import { container } from '@/lib/styles';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Blog() {
  return (
    <section id="blog" className={`${container} scroll-mt-20 py-20 sm:py-28`}>
      <SectionHeading eyebrow="Resources" title="Shorthand tips and guides" subtitle="Learning notes on outlines, rules and practice." />
      {blogPosts.length ? (
        <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((p, i) => (
            <li key={p.href}>
              <Reveal delay={i * 0.1} className="h-full">
                <a href={p.href} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-glass transition duration-300 hover:-translate-y-2 hover:shadow-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50">
                  {p.image && <div className="overflow-hidden"><Image src={p.image} alt="" width={720} height={450} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-110" /></div>}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm text-muted">{p.author ? `By ${p.author} · ` : ''}<time dateTime={p.date}>{new Date(p.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</time></p>
                    <h3 className="mt-2 font-display text-xl font-bold transition group-hover:text-azure-brand">{p.title}</h3>
                    <p className="mt-2 text-muted">{p.excerpt}</p>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <Reveal className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-dashed border-azure-brand/40 bg-surface/60 p-10 text-center">
          <Newspaper aria-hidden className="mx-auto text-azure-brand" size={40} />
          <p className="mt-4 font-display text-2xl font-bold">Resources coming soon</p>
          <p className="mt-2 text-muted">Guides on the Rishi system and outline-writing rules will appear here.</p>
        </Reveal>
      )}
    </section>
  );
}
