'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { site } from '@/data/siteConfig';
import { container, gradientSection } from '@/lib/styles';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import WaveDivider from './WaveDivider';
import MagneticButton from './MagneticButton';

type Form = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Form, string>>;

const validate = (f: Form): Errors => {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email address.';
  if (f.subject.trim().length < 3) e.subject = 'Add a short subject.';
  if (f.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
  return e;
};

const field = 'peer w-full rounded-xl border bg-white/15 px-4 pb-2 pt-6 text-white placeholder-transparent outline-none backdrop-blur transition focus:border-white focus:bg-white/25 focus-visible:ring-4 focus-visible:ring-white/30';
const label = 'pointer-events-none absolute left-4 top-1.5 text-xs text-white/80 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs';

export default function Contact() {
  const [f, setF] = useState<Form>({ name: '', email: '', subject: '', message: '' });
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [sent, setSent] = useState(false);
  const errors = validate(f);
  const valid = Object.keys(errors).length === 0;
  const body = `${f.message}\n\n— ${f.name} (${f.email})`;
  const waHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(`${f.subject ? f.subject + '\n' : ''}${body}`)}`;

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const blur = (k: keyof Form) => () => setTouched({ ...touched, [k]: true });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!valid) return;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const input = (k: keyof Form, text: string, type = 'text') => (
    <div className="relative">
      <input id={`c-${k}`} type={type} value={f[k]} onChange={set(k)} onBlur={blur(k)} placeholder=" " autoComplete={k === 'name' ? 'name' : k === 'email' ? 'email' : 'off'}
        aria-invalid={!!(touched[k] && errors[k])} aria-describedby={`c-${k}-err`} className={`${field} ${touched[k] && errors[k] ? 'border-rose-300' : 'border-white/30'}`} />
      <label htmlFor={`c-${k}`} className={label}>{text}</label>
      <p id={`c-${k}-err`} role="alert" className="mt-1 min-h-[1.1rem] text-xs text-rose-100">{touched[k] ? errors[k] : ''}</p>
    </div>
  );

  const info = [
    { Icon: Phone, text: site.phone, href: site.phoneHref, label: 'Call us' },
    { Icon: Mail, text: site.email, href: `mailto:${site.email}`, label: 'Email us' },
    { Icon: MapPin, text: site.address, href: undefined, label: 'Address' },
  ];

  return (
    <section id="contact" className={`relative scroll-mt-20 overflow-hidden ${gradientSection} py-32 sm:py-44`}>
      <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay" />
      <WaveDivider position="top" className="text-bg" />
      <div className={`${container} relative`}>
        <SectionHeading light eyebrow="Contact" title="Talk to us" subtitle="Questions about plans, outlines or the app? We reply fast." />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="rounded-[2rem] border border-white/30 bg-white/90 p-8 shadow-glass backdrop-blur dark:bg-surface/90">
            <ul className="space-y-7">
              {info.map(({ Icon, text, href, label: l }) => (
                <li key={l} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient-soft text-azure-brand"><Icon /></span>
                  <div><p className="text-sm text-muted">{l}</p>{href ? <a href={href} className="font-medium hover:text-azure-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50">{text}</a> : <address className="font-medium not-italic">{text}</address>}</div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative min-h-[420px]">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} role="status"
                    className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[2rem] border border-white/30 bg-white/15 p-8 text-center text-white backdrop-blur">
                    <svg viewBox="0 0 52 52" className="h-24 w-24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <motion.circle cx="26" cy="26" r="23" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                      <motion.path d="M15 27 l8 8 l15 -17" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
                    </svg>
                    <p className="mt-5 font-display text-2xl font-bold">Almost there!</p>
                    <p className="mt-2 max-w-sm text-white/90">Your email app should have opened with the message ready to send. If it did not, use WhatsApp instead.</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-azure-brand"><MessageCircle size={18} /> WhatsApp</a>
                      <button type="button" onClick={() => setSent(false)} className="rounded-full border border-white/50 px-6 py-3 font-semibold">Edit message</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" noValidate onSubmit={submit} exit={{ opacity: 0 }} className="space-y-1">
                    <div className="grid gap-x-4 sm:grid-cols-2">{input('name', 'Full name')}{input('email', 'Email', 'email')}</div>
                    {input('subject', 'Subject')}
                    <div className="relative">
                      <textarea id="c-message" rows={5} value={f.message} onChange={set('message')} onBlur={blur('message')} placeholder=" " aria-invalid={!!(touched.message && errors.message)} aria-describedby="c-message-err"
                        className={`${field} resize-none ${touched.message && errors.message ? 'border-rose-300' : 'border-white/30'}`} />
                      <label htmlFor="c-message" className={label}>Message</label>
                      <p id="c-message-err" role="alert" className="mt-1 min-h-[1.1rem] text-xs text-rose-100">{touched.message ? errors.message : ''}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <MagneticButton type="submit" cursorLabel="Send" className="rounded-xl bg-slate-900 px-8 py-4 font-semibold uppercase tracking-wide text-white shadow-glass focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60">Send message</MagneticButton>
                      <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-white underline-offset-4 hover:underline"><MessageCircle size={18} /> or chat on WhatsApp</a>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
      <WaveDivider position="bottom" className="text-[#0b1426]" />
    </section>
  );
}
