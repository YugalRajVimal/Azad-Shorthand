import type { Metadata } from 'next';
import DeleteAccountForm from '@/components/DeleteAccountForm';
import LegalPage from '@/components/LegalPage';
import { site } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Delete Account & Data',
  description: 'Request deletion of your Azad Shorthand account and personal data.',
  alternates: { canonical: '/delete-account/' },
};

export default function DeleteAccount() {
  return (
    <LegalPage title="Delete Account & Data" updated="22 October 2026">
      <p>Use this page to ask {site.name} to delete your account, or only the personal data we hold about you. It is the same request you can make by emailing <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <section>
        <h2>What gets deleted</h2>
        <ul>
          <li>Your account and login details.</li>
          <li>Your subscription status and search activity in the app.</li>
          <li>Messages you sent us, where we are not required to keep them.</li>
        </ul>
      </section>
      <section>
        <h2>What we may keep</h2>
        <p>Some records may be kept where the law requires it, for example payment and tax records. Payments are handled by Google Play, so purchase history there is governed by Google. Cancel any paid plan in Google Play to stop future billing.</p>
      </section>
      <DeleteAccountForm />
      <p>Prefer not to use the form? Email <a href={`mailto:${site.email}`}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>. See our <a href="/privacy/">Privacy Policy</a> for more.</p>
    </LegalPage>
  );
}