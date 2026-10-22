import { MessageCircle } from 'lucide-react';
import { site } from '@/data/siteConfig';

export default function WhatsAppButton() {
  return (
    <a href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent('Hi Azad Shorthand, I have a question.')}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" data-cursor="Chat"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50">
      <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/50" />
      <MessageCircle className="relative" />
    </a>
  );
}
