import { container, gradientSection } from '@/lib/styles';
import PhoneMockup from './PhoneMockup';
import PlayBadge from './PlayBadge';
import Reveal from './Reveal';
import SplitHeading from './SplitHeading';
import WaveDivider from './WaveDivider';

export default function GetApp() {
  return (
    <section id="download" className={`relative scroll-mt-20 overflow-hidden ${gradientSection} py-32 sm:py-44`}>
      <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay" />
      <WaveDivider position="top" className="text-bg" />
      <div className={`${container} relative grid items-center gap-12 lg:grid-cols-2`}>
        <Reveal className="flex justify-center"><PhoneMockup src="/images/screens/voice-search.jpeg" alt="Voice search in the Azad Shorthand app" className="w-[250px] sm:w-[280px]" /></Reveal>
        <div className="text-white">
          <SplitHeading text="Get the app now" className="font-display text-4xl font-bold sm:text-5xl" />
          <Reveal delay={0.1}><p className="mt-5 max-w-lg text-lg text-white/90">Put every outline in your pocket. Search by voice or text, in Hindi or English, and start with a 3-day free trial.</p></Reveal>
          <Reveal delay={0.2} className="mt-8"><PlayBadge /></Reveal>
        </div>
      </div>
      <WaveDivider position="bottom" className="text-bg" />
    </section>
  );
}
