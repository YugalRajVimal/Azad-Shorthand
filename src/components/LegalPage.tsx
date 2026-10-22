import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { site } from '@/data/siteConfig';

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main id="main" className="mx-auto min-h-screen max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/" className="inline-flex items-center gap-2 text-azure-brand hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50"><ArrowLeft size={18} /> Back to {site.name}</Link>
      <h1 className="mt-6 font-display text-4xl font-bold">{title}</h1>
      <p className="mt-3 rounded-xl border border-amber-300/60 bg-amber-100/60 px-4 py-3 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-100">
        Template only. Replace the bracketed items and have this reviewed by a qualified professional before relying on it.
      </p>
      <div className="mt-8 space-y-6 leading-relaxed text-muted [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_a]:text-azure-brand">{children}</div>
    </main>
  );
}
