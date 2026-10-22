import About from '@/components/About';
import BackToTop from '@/components/BackToTop';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Cursor from '@/components/Cursor';
import FAQ from '@/components/FAQ';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import GetApp from '@/components/GetApp';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import HowItWorks from '@/components/HowItWorks';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import Providers from '@/components/Providers';
import ScrollProgress from '@/components/ScrollProgress';
import Screenshots from '@/components/Screenshots';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import VoiceDemo from '@/components/VoiceDemo';
import WhatsAppButton from '@/components/WhatsAppButton';
import { faq } from '@/data/siteConfig';

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function Home() {
  return (
    <Providers>
      <a href="#main" className="sr-only z-[10001] rounded-lg bg-white px-4 py-2 text-azure-brand focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Loader />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main id="main">
        <Hero />
        <Highlights />
        <About />
        <HowItWorks />
        <VoiceDemo />
        <Features />
        <Screenshots />
        <Pricing />
        <GetApp />
        <Testimonials />
        <Stats />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </Providers>
  );
}
