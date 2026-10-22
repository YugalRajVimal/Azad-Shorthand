'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { container } from '@/lib/styles';
import PhoneMockup from './PhoneMockup';
import SectionHeading from './SectionHeading';

const shots = [
  { src: '/images/screens/home-hindi.jpeg', label: 'Hindi home', alt: 'Hindi home screen listing shorthand categories' },
  { src: '/images/screens/voice-search.jpeg', label: 'Voice search', alt: 'Voice search prompt asking the user to speak' },
  { src: '/images/screens/outline-results.jpeg', label: 'Outline results', alt: 'Search results showing shorthand outlines for Arab, Arabi, BSF and CBI' },
  { src: '/images/screens/categories.jpeg', label: 'Categories', alt: 'English category grid including Country, Books, Temples and Cities' },
  { src: '/images/screens/splash.jpeg', label: 'Welcome', alt: 'Azad Shorthand splash screen' },
];

export default function Screenshots() {
  const ref = useRef<HTMLDivElement>(null);
  const d = useRef({ down: false, x: 0, left: 0 });
  const [dragging, setDragging] = useState(false);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    d.current = { down: true, x: e.clientX, left: ref.current.scrollLeft };
    setDragging(true);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (d.current.down && ref.current) ref.current.scrollLeft = d.current.left - (e.clientX - d.current.x);
  };
  const end = () => { d.current.down = false; setDragging(false); };
  const by = (dir: number) => ref.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });

  return (
    <section id="screenshots" className="scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div className={container}>
        <SectionHeading eyebrow="Screenshots" title="A look inside the app" subtitle="Voice and text search, instant outlines and a bilingual interface. Drag to explore." />
      </div>
      <div className="relative mt-12">
        <div ref={ref} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={end} onPointerLeave={end} tabIndex={0} aria-label="App screenshots carousel"
          className={`flex gap-8 overflow-x-auto px-[max(1.25rem,calc((100vw-80rem)/2+2rem))] py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/40 ${dragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}`}>
          {shots.map((s) => (
            <motion.figure key={s.src} whileHover={{ y: -10 }} className="shrink-0 snap-center select-none">
              <PhoneMockup src={s.src} alt={s.alt} tilt={false} className="w-[220px] sm:w-[250px]" />
              <figcaption className="mt-4 text-center text-sm font-semibold text-muted">{s.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-center gap-4">
        {[-1, 1].map((dir) => (
          <button key={dir} type="button" onClick={() => by(dir)} aria-label={dir < 0 ? 'Previous screenshots' : 'Next screenshots'}
            className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-azure-brand shadow-glass transition hover:scale-110 hover:bg-azure-brand hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50">
            {dir < 0 ? <ChevronLeft /> : <ChevronRight />}
          </button>
        ))}
      </div>
    </section>
  );
}
