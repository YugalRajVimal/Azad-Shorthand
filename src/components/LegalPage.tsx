import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { site } from '@/data/siteConfig';

export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main id="main" className="mx-auto min-h-screen max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/" className="inline-flex items-center gap-2 text-azure-brand hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50"><ArrowLeft size={18} /> Back to {site.name}</Link>
      <h1 className="mt-6 font-display text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>
      <div className="mt-8 space-y-8 leading-relaxed text-muted [&_a]:text-azure-brand [&_a]:underline [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-6">{children}</div>
    </main>
  );
}