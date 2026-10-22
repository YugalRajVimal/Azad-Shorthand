import Image from 'next/image';
import MagneticButton from './MagneticButton';
import { PLAY_STORE_URL } from '@/data/siteConfig';

// The SVG asset is a square canvas with the badge in the middle band, so we crop it to the badge.
export default function PlayBadge({ className = '' }: { className?: string }) {
  return (
    <MagneticButton href={PLAY_STORE_URL} cursorLabel="Download"
      className={`relative block h-[56px] w-[188px] overflow-hidden rounded-xl transition-shadow hover:shadow-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 ${className}`}>
      <Image src="/images/badges/google-play.svg" alt="Get it on Google Play" width={188} height={188} draggable={false}
        className="absolute left-0 top-1/2 h-[188px] w-[188px] max-w-none -translate-y-1/2" />
    </MagneticButton>
  );
}
