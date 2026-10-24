import Image from 'next/image';
import { Facebook, Instagram, Mail, MessageCircle, Send, Youtube, type LucideIcon } from 'lucide-react';
import { nav, site, socials } from '@/data/siteConfig';
import { container } from '@/lib/styles';

const icons: Record<(typeof socials)[number]['id'], LucideIcon> = { youtube: Youtube, whatsapp: MessageCircle, telegram: Send, facebook: Facebook, instagram: Instagram, gmail: Mail };

export default function Footer() {
  return (
    <footer className="bg-[#0b1426] pb-10 pt-16 text-slate-300">
      <div className={`${container} flex flex-col items-center gap-8 text-center`}>
        <a href="#home" className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50">
          <Image src="/images/brand/logo.jpeg" alt="" width={48} height={48} className="h-12 w-12 rounded-xl bg-white p-0.5" />
          <span className="font-display text-2xl font-bold text-white">{site.name}</span>
        </a>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-7 gap-y-2">
          {nav.map((n) => <a key={n.id} href={`/#${n.id}`} className="transition hover:text-sky-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50">{n.label}</a>)}
        </nav>
        <ul className="flex gap-3">
          {socials.filter((s) => s.href).map((s) => {
            const Icon = icons[s.id];
            return <li key={s.id}><a href={s.href} aria-label={s.label} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-azure-brand hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50"><Icon size={20} /></a></li>;
          })}
        </ul>
        <div className="flex gap-6 text-sm"><a href="/privacy/" className="hover:text-sky-brand">Privacy Policy</a><a href="/terms/" className="hover:text-sky-brand">Terms of Service</a><a href="/delete-account/" className="hover:text-sky-brand">Delete Account</a></div>
        <p className="text-sm text-slate-400">{site.copyright} Powered by {site.poweredBy}.</p>
      </div>
    </footer>
  );
}