import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { site } from '@/data/siteConfig';

export const metadata: Metadata = { title: 'Privacy Policy', alternates: { canonical: '/privacy/' } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Last updated: [add date]. This policy explains how {site.legalName} (&ldquo;we&rdquo;) handles information in the Azad Shorthand app and on this website.</p>
      <section><h2>Information we collect</h2><p>[List exactly what the app and website collect, for example account details, voice input used for search, usage data. Remove anything that does not apply.]</p></section>
      <section><h2>How we use it</h2><p>[Describe purposes, for example providing search, managing subscriptions and giving support.]</p></section>
      <section><h2>Sharing</h2><p>Your data is not shared without your consent, except where the law requires it. [List any processors, such as payment or analytics providers.]</p></section>
      <section><h2>Security and retention</h2><p>[Describe protections and how long data is kept.]</p></section>
      <section><h2>Your choices</h2><p>[Explain how to access, correct or delete data.]</p></section>
      <section><h2>Contact</h2><p>Email <a href={`mailto:${site.email}`}>{site.email}</a> or write to {site.address}.</p></section>
    </LegalPage>
  );
}
