import SplitHeading from './SplitHeading';
import Reveal from './Reveal';

type Props = { eyebrow: string; title: string; subtitle?: string; light?: boolean; className?: string };

export default function SectionHeading({ eyebrow, title, subtitle, light = false, className = '' }: Props) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      <Reveal>
        <span className={`inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${light ? 'bg-white/20 text-white' : 'bg-sky-brand/15 text-azure-brand'}`}>{eyebrow}</span>
      </Reveal>
      <SplitHeading as="h2" text={title} className={`mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-ink'}`} />
      {subtitle && (
        <Reveal delay={0.15}>
          <p className={`mt-4 text-base sm:text-lg ${light ? 'text-white/85' : 'text-muted'}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
