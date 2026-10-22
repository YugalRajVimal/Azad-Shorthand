import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { pricing, site } from '@/data/siteConfig';

export const metadata: Metadata = { title: 'Terms of Service', alternates: { canonical: '/terms/' } };

export default function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <p>Last updated: [add date]. By using the Azad Shorthand app or website you agree to these terms.</p>
      <section><h2>The service</h2><p>Azad Shorthand is a bilingual (Hindi and English) shorthand learning app with voice and text search.</p></section>
      <section><h2>Free trial and subscriptions</h2><p>New users get a {pricing.trial.toLowerCase()}. Paid plans are Monthly ({pricing.currency}{pricing.plans[0].price}), Half-Yearly ({pricing.currency}{pricing.plans[1].price}) and Yearly ({pricing.currency}{pricing.plans[2].price}). [Add billing, renewal, cancellation and refund terms.]</p></section>
      <section><h2>Acceptable use</h2><p>[Describe permitted use and restrictions, for example no copying or redistributing app content.]</p></section>
      <section><h2>Intellectual property</h2><p>[State ownership of outlines, rules and app content.]</p></section>
      <section><h2>Liability</h2><p>[Add disclaimers and limits of liability.]</p></section>
      <section><h2>Contact</h2><p>Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p></section>
    </LegalPage>
  );
}
