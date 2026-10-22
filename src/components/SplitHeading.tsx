'use client';
import { motion, useReducedMotion } from 'framer-motion';

type Props = { text: string; as?: 'h1' | 'h2' | 'h3'; className?: string; delay?: number };

export default function SplitHeading({ text, as = 'h2', className, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const Static = as;
  const M = as === 'h1' ? motion.h1 : as === 'h2' ? motion.h2 : motion.h3;
  if (reduce) return <Static className={className}>{text}</Static>;
  return (
    <M
      className={className} aria-label={text} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.14em] align-bottom">
          <motion.span className="inline-block" variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </M>
  );
}
