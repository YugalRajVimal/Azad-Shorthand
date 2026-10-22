import type { Metadata, Viewport } from 'next';
import { Poppins, Ubuntu, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import { PLAY_STORE_URL, SITE_URL, site } from '@/data/siteConfig';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' });
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-ubuntu', display: 'swap' });
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari', 'latin'], weight: ['400', '500', '600', '700'], variable: '--font-devanagari', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} | Bilingual Voice & Text Shorthand App`, template: `%s | ${site.name}` },
  description: site.description,
  keywords: ['Hindi shorthand', 'आशुलिपि', 'Rishi system', 'shorthand app', 'voice search shorthand', 'stenography India'],
  alternates: { canonical: '/' },
  icons: { icon: '/images/brand/icon-32.png', apple: '/images/brand/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: site.name,
    title: site.tagline,
    description: site.description,
    images: [{ url: '/images/brand/og-image.png', width: 1200, height: 630, alt: site.name }],
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title: site.tagline, description: site.description, images: ['/images/brand/og-image.png'] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#5BC8F8' },
    { media: '(prefers-color-scheme: dark)', color: '#081121' },
  ],
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/logo.jpeg`,
    email: site.email,
    telephone: site.phone,
    address: { '@type': 'PostalAddress', streetAddress: 'Second Floor, E-7, Lajpat Nagar 3', addressLocality: 'New Delhi', postalCode: '110024', addressCountry: 'IN' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: site.name,
    operatingSystem: 'ANDROID',
    applicationCategory: 'EducationalApplication',
    description: site.description,
    inLanguage: ['hi', 'en'],
    ...(PLAY_STORE_URL !== '#' ? { downloadUrl: PLAY_STORE_URL, installUrl: PLAY_STORE_URL } : {}),
    offers: [
      { '@type': 'Offer', price: '199', priceCurrency: 'INR', name: 'Monthly' },
      { '@type': 'Offer', price: '999', priceCurrency: 'INR', name: 'Half-Yearly' },
      { '@type': 'Offer', price: '1799', priceCurrency: 'INR', name: 'Yearly' },
    ],
  },
];

// Runs before paint so there is no light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${ubuntu.variable} ${devanagari.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-bg font-sans text-ink antialiased selection:bg-sky-brand/40">{children}</body>
    </html>
  );
}
