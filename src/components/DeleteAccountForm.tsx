'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Database, Loader2, Mail, MessageCircle, UserX } from 'lucide-react';
import { DELETION_ENDPOINT, site } from '@/data/siteConfig';

type Scope = 'account' | 'data';
type Status = 'idle' | 'submitting' | 'done' | 'error';
type Form = { name: string; identifier: string; scope: Scope; reason: string; note: string; ack: boolean; confirm: string };

const empty: Form = { name: '', identifier: '', scope: 'account', reason: '', note: '', ack: false, confirm: '' };
const steps = ['Verify', 'Choose', 'Confirm'];
const reasons = ['Not using the app anymore', 'Privacy concerns', 'Switching to another app', 'Too expensive', 'Other'];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v: string) => /^(\+?91)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ''));

const input = 'w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink outline-none transition focus:border-azure-brand focus-visible:ring-4 focus-visible:ring-azure-brand/30';
const btn = 'rounded-full px-7 py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50 disabled:cursor-not-allowed disabled:opacity-50';

export default function DeleteAccountForm() {
  const [f, setF] = useState<Form>(empty);
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [reference, setReference] = useState('');
  const mode = DELETION_ENDPOINT ? 'api' : 'email';

  const errors = {
    name: f.name.trim().length < 2 ? 'Please enter your name.' : '',
    identifier: isEmail(f.identifier.trim()) || isPhone(f.identifier) ? '' : 'Enter the email or 10-digit phone number you log in with.',
  };
  const step0Ok = !errors.name && !errors.identifier;
  const canSubmit = f.ack && f.confirm.trim().toUpperCase() === 'DELETE';
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));

  const scopeText = f.scope === 'account' ? 'Delete my account and all associated data' : 'Delete my data only (keep my account)';
  const lines = (ref: string) => [
    `Reference: ${ref}`, `Name: ${f.name.trim()}`, `Login (email/phone): ${f.identifier.trim()}`, `Request: ${scopeText}`,
    f.reason && `Reason: ${f.reason}`, f.note.trim() && `Note: ${f.note.trim()}`,
  ].filter(Boolean) as string[];
  const subject = (ref: string) => `Account deletion request ${ref}`;
  const mailHref = (ref: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject(ref))}&body=${encodeURIComponent(lines(ref).join('\n'))}`;
  const waHref = (ref: string) => `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(`${subject(ref)}\n${lines(ref).join('\n')}`)}`;

  const next = () => {
    if (step === 0) { setTouched(true); if (!step0Ok) return; }
    setStep((s) => s + 1);
  };

  const submit = async () => {
    if (!canSubmit) return;
    const ref = `AS-DEL-${Date.now().toString(36).toUpperCase()}`;
    setReference(ref);
    if (mode === 'email') { window.location.href = mailHref(ref); setStatus('done'); return; }
    setStatus('submitting');
    try {
      const res = await fetch(DELETION_ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: ref, name: f.name.trim(), identifier: f.identifier.trim(), scope: f.scope, reason: f.reason, note: f.note.trim() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('done');
    } catch { setStatus('error'); }
  };

  const reset = () => { setF(empty); setStep(0); setTouched(false); setStatus('idle'); setReference(''); };

  if (status === 'done') {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} role="status" className="rounded-[2rem] border border-line bg-surface p-8 text-center text-ink shadow-glass">
        <svg viewBox="0 0 52 52" className="mx-auto h-20 w-20" fill="none" stroke="#4DA6FA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <motion.circle cx="26" cy="26" r="23" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
          <motion.path d="M15 27 l8 8 l15 -17" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
        </svg>
        <h3 className="mt-5 font-display text-2xl font-bold">{mode === 'api' ? 'Request received' : 'One last step: send your request'}</h3>
        <p className="mx-auto mt-2 max-w-md text-muted">
          {mode === 'api'
            ? 'We have your deletion request and will verify it against your account. We will confirm by email or phone once it is complete.'
            : 'Your email app should have opened with the request ready to send. Your request is not submitted until you send that email. If nothing opened, use the buttons below.'}
        </p>
        <p className="mx-auto mt-5 inline-block rounded-xl bg-sky-brand/15 px-5 py-2 font-mono text-sm font-semibold text-azure-brand">Reference: {reference}</p>
        <ol className="mx-auto mt-6 max-w-md list-decimal space-y-2 pl-6 text-left text-muted">
          <li>We check that the request matches your account.</li>
          <li>We delete what you asked for and confirm with you.</li>
          <li>If you have a paid plan, also cancel it in Google Play so you are not billed again.</li>
        </ol>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {mode === 'email' && (
            <>
              <a href={mailHref(reference)} className={`${btn} inline-flex items-center gap-2 bg-brand-gradient text-white shadow-glow`}><Mail size={18} /> Open email again</a>
              <a href={waHref(reference)} target="_blank" rel="noopener noreferrer" className={`${btn} inline-flex items-center gap-2 border border-line`}><MessageCircle size={18} /> Send on WhatsApp</a>
            </>
          )}
          <button type="button" onClick={reset} className={`${btn} border border-line`}>Start a new request</button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-line bg-surface p-6 text-ink shadow-glass sm:p-10">
      <ol className="mb-8 flex items-center justify-between" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? 'step' : undefined} className="flex flex-1 items-center last:flex-none">
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition ${i <= step ? 'bg-brand-gradient text-white' : 'bg-line text-muted'}`}>{i + 1}</span>
            <span className={`ml-2 text-sm font-medium ${i === step ? 'text-ink' : 'text-muted'}`}>{s}</span>
            {i < steps.length - 1 && <span aria-hidden className="mx-3 h-0.5 flex-1 overflow-hidden rounded bg-line"><motion.span className="block h-full bg-azure-brand" initial={false} animate={{ width: i < step ? '100%' : '0%' }} /></span>}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
          {step === 0 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold">Tell us which account</h3>
              <div>
                <label htmlFor="d-name" className="mb-1 block text-sm font-medium">Full name</label>
                <input id="d-name" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={touched && !!errors.name} aria-describedby="d-name-err" className={input} />
                <p id="d-name-err" role="alert" className="mt-1 min-h-[1.1rem] text-xs text-rose-500">{touched ? errors.name : ''}</p>
              </div>
              <div>
                <label htmlFor="d-id" className="mb-1 block text-sm font-medium">Email or phone number you log in with</label>
                <input id="d-id" value={f.identifier} onChange={(e) => set('identifier', e.target.value)} autoComplete="username" aria-invalid={touched && !!errors.identifier} aria-describedby="d-id-err" className={input} />
                <p id="d-id-err" role="alert" className="mt-1 min-h-[1.1rem] text-xs text-rose-500">{touched ? errors.identifier : ''}</p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold">What should we delete?</h3>
              <div role="radiogroup" aria-label="Deletion scope" className="grid gap-3 sm:grid-cols-2">
                {([['account', UserX, 'Account and all data', 'Closes your account and removes the data linked to it.'], ['data', Database, 'Data only', 'Keeps your account but deletes the data we hold about you.']] as const).map(([v, Icon, title, body]) => (
                  <button key={v} type="button" role="radio" aria-checked={f.scope === v} onClick={() => set('scope', v)}
                    className={`rounded-2xl border p-5 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-azure-brand/50 ${f.scope === v ? 'border-azure-brand bg-sky-brand/10 shadow-glow' : 'border-line hover:border-azure-brand/50'}`}>
                    <Icon className="text-azure-brand" /><p className="mt-3 font-display font-bold">{title}</p><p className="mt-1 text-sm text-muted">{body}</p>
                  </button>
                ))}
              </div>
              <div>
                <label htmlFor="d-reason" className="mb-1 block text-sm font-medium">Reason (optional)</label>
                <select id="d-reason" value={f.reason} onChange={(e) => set('reason', e.target.value)} className={input}>
                  <option value="">Prefer not to say</option>
                  {reasons.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="d-note" className="mb-1 block text-sm font-medium">Anything else? (optional)</label>
                <textarea id="d-note" rows={3} value={f.note} onChange={(e) => set('note', e.target.value)} className={`${input} resize-none`} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold">Review and confirm</h3>
              <dl className="grid gap-2 rounded-2xl bg-bg p-5 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-6">
                <dt className="text-muted">Name</dt><dd className="font-medium">{f.name.trim()}</dd>
                <dt className="text-muted">Login</dt><dd className="break-all font-medium">{f.identifier.trim()}</dd>
                <dt className="text-muted">Request</dt><dd className="font-medium">{scopeText}</dd>
              </dl>
              <p className="flex gap-3 rounded-2xl border border-amber-300/60 bg-amber-100/60 p-4 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-100"><AlertTriangle className="shrink-0" size={20} /> Deletion cannot be undone. Cancelling a paid plan is done separately in Google Play.</p>
              <label className="flex items-start gap-3 text-sm"><input type="checkbox" checked={f.ack} onChange={(e) => set('ack', e.target.checked)} className="mt-1 h-4 w-4 accent-[#4DA6FA]" /> I understand this is permanent and I am the owner of this account.</label>
              <div>
                <label htmlFor="d-confirm" className="mb-1 block text-sm font-medium">Type DELETE to confirm</label>
                <input id="d-confirm" value={f.confirm} onChange={(e) => set('confirm', e.target.value)} autoComplete="off" className={input} />
              </div>
              {status === 'error' && <p role="alert" className="rounded-xl bg-rose-100 p-3 text-sm text-rose-700">We could not send your request. Check your connection and try again, or email <a href={mailHref(reference)} className="underline">{site.email}</a>.</p>}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setStep((s) => s - 1)} disabled={step === 0 || status === 'submitting'} className={`${btn} border border-line`}>Back</button>
        {step < 2 ? (
          <button type="button" onClick={next} className={`${btn} bg-brand-gradient text-white shadow-glow`}>Continue</button>
        ) : (
          <button type="button" onClick={submit} disabled={!canSubmit || status === 'submitting'} className={`${btn} inline-flex items-center gap-2 bg-rose-600 text-white`}>
            {status === 'submitting' && <Loader2 className="animate-spin" size={18} />}{status === 'submitting' ? 'Submitting…' : 'Submit deletion request'}
          </button>
        )}
      </div>
    </div>
  );
}