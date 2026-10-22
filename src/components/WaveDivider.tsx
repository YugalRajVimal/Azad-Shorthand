// Animated SVG section divider. Colour it with a text-* class (fill = currentColor).
export default function WaveDivider({ position, className = '' }: { position: 'top' | 'bottom'; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 z-[1] h-[48px] overflow-hidden leading-none sm:h-[80px] lg:h-[110px] ${position === 'top' ? 'top-0 rotate-180' : 'bottom-0'} ${className}`}>
      <svg className="absolute bottom-0 h-full w-[200%] animate-wave-slow opacity-50" viewBox="0 0 2880 160" preserveAspectRatio="none" fill="currentColor">
        <path d="M0,100 C240,20 480,20 720,100 C960,180 1200,180 1440,100 C1680,20 1920,20 2160,100 C2400,180 2640,180 2880,100 V160 H0 Z" />
      </svg>
      <svg className="absolute bottom-0 h-full w-[200%] animate-wave-fast" viewBox="0 0 2880 160" preserveAspectRatio="none" fill="currentColor">
        <path d="M0,80 C240,160 480,160 720,80 C960,0 1200,0 1440,80 C1680,160 1920,160 2160,80 C2400,0 2640,0 2880,80 V160 H0 Z" />
      </svg>
    </div>
  );
}
