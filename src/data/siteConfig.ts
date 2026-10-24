// =====================================================================
// Single source of truth for all site content.
// Anything marked TODO is something YOU must supply. Nothing here is invented.
// =====================================================================

// TODO: paste the real Google Play listing URL. The original site only had "#".
export const PLAY_STORE_URL = '#';

// TODO: when your backend exists, paste its URL here. The delete-account form will POST JSON to it
// and show success only after a 2xx response. While '' it falls back to a prefilled email / WhatsApp request.
export const DELETION_ENDPOINT = '';

export const SITE_URL = 'https://azadshorthand.com';

export const site = {
  name: 'Azad Shorthand',
  legalName: 'Azad Shorthand Academy',
  tagline: "India's First Bilingual Voice & Text-Based Shorthand Learning App",
  description:
    'Azad Shorthand brings this powerful skill into the digital age with a first-of-its-kind mobile application that lets users search shorthand outlines through voice commands or typed input, in both Hindi and English.',
  hindiTagline: 'हिंदी आशुलिपि - ऋषि प्रणाली नए नियमों के साथ',
  phone: '+91 701 174 1007',
  phoneHref: 'tel:+917011741007',
  email: 'azadshorthand@gmail.com',
  address: 'Second Floor, E-7, Lajpat Nagar 3, New Delhi (110024)',
  whatsappNumber: '917011741007', // derived from the phone number on the original site
  copyright: '© 2025 Azad Shorthand. All rights reserved.',
  poweredBy: 'Gowappily',
} as const;

// Leave a URL as '' to hide that icon. TODO: the original footer links were all "#".
export const socials: { id: 'youtube' | 'whatsapp' | 'telegram' | 'facebook' | 'instagram' | 'gmail'; label: string; href: string }[] = [
  { id: 'youtube', label: 'YouTube', href: '' }, // TODO
  { id: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${site.whatsappNumber}` },
  { id: 'telegram', label: 'Telegram', href: '' }, // TODO
  { id: 'facebook', label: 'Facebook', href: '' }, // TODO
  { id: 'instagram', label: 'Instagram', href: '' }, // TODO
  { id: 'gmail', label: 'Email', href: `mailto:${site.email}` },
];

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
] as const;

export const heroPhrases = [
  { lang: 'en', text: 'Search any outline by voice.' },
  { lang: 'hi', text: 'आवाज़ से आशुलिपि खोजें।' },
  { lang: 'en', text: 'Type it. See the outline.' },
  { lang: 'hi', text: 'लिखिए, संकेत देखिए।' },
] as const;

export const highlights = [
  { icon: 'headset', title: '24/7 Support', body: 'Stuck on an outline at midnight? Help is there whenever you practise.' },
  { icon: 'lock', title: 'Data Privacy', body: 'Your data stays secure and is never shared without your consent.' },
  { icon: 'zap', title: 'Fast Performance', body: 'Results appear as you type or speak, with no waiting and no lag.' },
] as const;

export const features = [
  { icon: 'pointer', title: 'Easy for Every Learner', body: 'A clean layout that beginners and working stenographers can both navigate without a manual.' },
  { icon: 'download', title: 'Install in Seconds', body: 'Download from Google Play, tap once, and start searching outlines straight away.' },
  { icon: 'search', title: 'Instant Outline Search', body: 'Voice or text, Hindi or English: the outline you need appears in a blink.' },
  { icon: 'type', title: 'Clear, Readable Type', body: 'Comfortable fonts in both scripts keep long practice sessions easy on the eyes.' },
  { icon: 'book', title: 'Guides That Explain', body: 'Step-by-step notes on the rules, so every outline makes sense instead of being memorised blind.' },
  { icon: 'infinity', title: 'Everything Unlocked', body: 'One plan opens every category, rule set and tool. No feature tiers.' },
] as const;

export const method = {
  headline: 'Built on the Rishi system, sharpened by 50 years of practice',
  hindiHeadline: 'ऋषि प्रणाली, नए नियमों के साथ',
  body: 'The outlines follow the Rishi system (ऋषि प्रणाली) with new rules added from 50 years of experience. Those rules make outlines easy to create and easy to read.',
};

export const howItWorks = [
  { step: 1, title: 'Search', body: 'Speak or type a word in Hindi or English.' },
  { step: 2, title: 'See the outline', body: 'The shorthand outline appears instantly, ready to study.' },
  { step: 3, title: 'Practise', body: 'Revisit categories, dictation and rules until it becomes second nature.' },
] as const;

export const categories = {
  en: ['Country', 'Country & Foreign', 'Books', 'Temples', 'Ministries', 'Correct Spelling', 'Cities', 'Numerical', 'Dictation', 'Parties', 'Diseases', 'Months', 'States', 'Persons', 'Places', 'Unique Outlines', 'Verb', 'Contractions'],
  hi: ['आशुलिपि श्रीगणेश', 'संकेत संरचना नियम', 'शब्द चिह्न', 'वाक्यांश', 'शब्द कोश', 'श्रुतिलेख', 'सूचना', 'कारक', 'त्योहार', 'दिन', 'देश', 'देश-विदेश', 'पार्टी', 'पुस्तक', 'बीमारी'],
};

// Voice-demo mock data. English entries use the REAL outline photos from the app.
// Hindi entries resolve to the matching category only, because no Hindi outline
// images were supplied. TODO: add real Hindi outline images to /public/images/outlines.
export type DemoResult =
  | { kind: 'outline'; query: string; label: string; image: string; width: number; height: number }
  | { kind: 'category'; query: string; label: string; note: string };

export const demo: { en: DemoResult[]; hi: DemoResult[] } = {
  en: [
    { kind: 'outline', query: 'Arab', label: 'Arab', image: '/images/outlines/arab.jpg', width: 620, height: 176 },
    { kind: 'outline', query: 'Arabi', label: 'Arabi', image: '/images/outlines/arabi.jpg', width: 620, height: 176 },
    { kind: 'outline', query: 'CBI', label: 'CBI', image: '/images/outlines/cbi.jpg', width: 620, height: 177 },
    { kind: 'outline', query: 'BSF', label: 'BSF', image: '/images/outlines/bsf.jpg', width: 620, height: 177 },
  ],
  hi: [
    { kind: 'category', query: 'देश', label: 'देश', note: 'Outlines for countries live in this category in the app.' },
    { kind: 'category', query: 'त्योहार', label: 'त्योहार', note: 'Festival outlines live in this category in the app.' },
    { kind: 'category', query: 'पार्टी', label: 'पार्टी', note: 'Party-name outlines live in this category in the app.' },
  ],
};

export type BillingId = 'monthly' | 'half' | 'yearly';

export const pricing = {
  trial: '3-day free trial on your first login',
  currency: '₹',
  includes: ['Voice Search', 'Bilingual Feature', 'Access to all features', '24/7 support'],
  plans: [
    { id: 'monthly' as BillingId, label: 'Monthly', price: 199, months: 1, unit: '/mo' },
    { id: 'half' as BillingId, label: 'Half-Yearly', price: 999, months: 6, unit: '/6mo' },
    { id: 'yearly' as BillingId, label: 'Yearly', price: 1799, months: 12, unit: '/yr', best: true },
  ],
};

// "Save X%" compared with paying the monthly price for the same period.
export function savingsPercent(plan: { price: number; months: number }): number {
  const monthly = pricing.plans[0].price;
  const full = monthly * plan.months;
  return Math.round((1 - plan.price / full) * 100);
}
export function perMonth(plan: { price: number; months: number }): number {
  return Math.round(plan.price / plan.months);
}

export const faq = [
  { q: 'Is there a free trial?', a: 'Yes. Every new user gets a 3-day free trial when they first log in to the app.' },
  { q: 'Which languages does the app support?', a: 'Hindi and English, for both voice and typed search.' },
  { q: 'Which shorthand system are the outlines based on?', a: 'The Rishi system (ऋषि प्रणाली), with new rules added from 50 years of experience.' },
  { q: 'What do I get with a paid plan?', a: 'Every plan includes Voice Search, the Bilingual feature, access to all features and 24/7 support. Plans differ only in length.' },
  { q: 'Is my data safe?', a: 'Your data stays secure and is never shared without your consent.' },
  { q: 'How do I get help?', a: 'Call, WhatsApp or email us using the details in the Contact section.' },
];

// ---------------------------------------------------------------------
// TODO: REAL CONTENT ONLY. Sections stay hidden / show a placeholder
// while these arrays are empty.
// ---------------------------------------------------------------------
export type Testimonial = { name: string; role: string; quote: string };
export const testimonials: Testimonial[] = [
  // TODO: These three are the old site's template filler (same text, names from the original template).
  // They are NOT real user reviews. Replace each with a real learner's words, name and role before launch.
  {
    name: 'Daniel Wells',
    role: 'User',
    quote:
      'Developing apps for mobile devices requires considering the constraints and features of these devices. Mobile devices run on battery and have less powerful processors.',
  },
  {
    name: 'Elijah Terry',
    role: 'User',
    quote:
      'Developing apps for mobile devices requires considering the constraints and features of these devices. Mobile devices run on battery and have less powerful processors.',
  },
  {
    name: 'Daniel Wells',
    role: 'User',
    quote:
      'Developing apps for mobile devices requires considering the constraints and features of these devices. Mobile devices run on battery and have less powerful processors.',
  },
];

export type Stat = { id: 'downloads' | 'learners' | 'active' | 'reviews'; label: string; value: number; suffix?: string };
export const stats: Stat[] = [
  // TODO sample entry:
  // { id: 'downloads', label: 'App Downloads', value: 0 },
];

export type BlogPost = { title: string; excerpt: string; date: string; href: string; image?: string; author?: string };
export const blogPosts: BlogPost[] = [
  // TODO sample entry:
  // { title: 'Real title', excerpt: '...', date: '2026-01-01', href: '/blog/slug/', image: '/images/blog/slug.jpg' },
];

// Original copy from the old site's Blog heading (the founder's own words).
export const hindiQuote =
  'मेरी शॉर्टहैंड के संकेत ऋषि प्रणाली पर आधारित हैं। इसमें कुछ नए नियमों को समाहित किया गया है। इन नियमों को मैंने 50 साल के अनुभव से पाया है। ये नियम संकेतों को बनाना और उन्हें पढ़ना बहुत आसान बनाते हैं।';