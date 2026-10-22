import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { pricing, site } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms for using the Azad Shorthand app and website.',
  alternates: { canonical: '/terms/' },
};

const [monthly, half, yearly] = pricing.plans;

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" updated="22 October 2026">
      <p>
        These Terms govern your use of the Azad Shorthand mobile app (the &ldquo;App&rdquo;) and this website, provided by {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By installing or using them, you agree to these Terms and to our <a href="/privacy/">Privacy Policy</a>. If you do not agree, please do not use them.
      </p>

      <section>
        <h2>1. The service</h2>
        <p>Azad Shorthand is a bilingual (Hindi and English) shorthand learning app. It lets you search shorthand outlines by voice or text and study them by category. The outlines follow the Rishi system (ऋषि प्रणाली) with additional rules developed from 50 years of experience.</p>
      </section>

      <section>
        <h2>2. Eligibility and your account</h2>
        <p>You must be able to form a binding contract under Indian law, or use the App with a parent or guardian&rsquo;s permission. Give accurate details when you log in, keep your login secure, and tell us if you suspect unauthorised use. You are responsible for activity under your account.</p>
      </section>

      <section>
        <h2>3. Free trial and subscriptions</h2>
        <ul>
          <li>New users get a 3-day free trial on first login.</li>
          <li>After the trial, continued access needs a paid plan: Monthly at {pricing.currency}{monthly.price} per month, Half-Yearly at {pricing.currency}{half.price} per 6 months, or Yearly at {pricing.currency}{yearly.price} per year.</li>
          <li>Every plan includes Voice Search, the Bilingual feature, access to all features and 24/7 support. Plans differ only in length.</li>
          <li>Purchases are processed by Google Play and are subject to Google Play&rsquo;s terms. You can view, manage or cancel your subscription in your Google Play account.</li>
          <li>Refunds follow Google Play&rsquo;s refund policy. Where the law gives you a right to a refund, that right is not affected.</li>
          <li>We may change prices for future billing periods. Changes will not apply to a period you have already paid for.</li>
        </ul>
      </section>

      <section>
        <h2>4. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>copy, scrape, record, resell, publish or redistribute the App&rsquo;s outlines, rules or other content;</li>
          <li>share your account, or give others access to paid features without a subscription of their own;</li>
          <li>reverse engineer, modify or interfere with the App or its security;</li>
          <li>use the App unlawfully or in a way that harms us or other users.</li>
        </ul>
        <p>We may suspend or end access if these Terms are broken.</p>
      </section>

      <section>
        <h2>5. Intellectual property</h2>
        <p>The App, its outlines, rules, categories, design, name and logo belong to {site.legalName}. We give you a limited, personal, non-exclusive, non-transferable licence to use the App for your own learning. No other rights are granted.</p>
      </section>

      <section>
        <h2>6. Learning disclaimer</h2>
        <p>The App is a learning aid. Speed, accuracy and exam or job results depend on your own practice, and we do not promise any particular outcome. Search results use the outlines in the App; please follow your teacher or examining body&rsquo;s requirements where they differ.</p>
      </section>

      <section>
        <h2>7. Availability and changes</h2>
        <p>We work to keep the App available and accurate, but it is provided &ldquo;as is&rdquo;. Features, content and categories may change, and the service may be interrupted for maintenance, technical issues or reasons outside our control. Voice search also depends on your device&rsquo;s speech-recognition service and internet connection.</p>
      </section>

      <section>
        <h2>8. Limitation of liability</h2>
        <p>To the extent permitted by law, we are not liable for indirect or consequential loss, or for loss of data, profit or opportunity arising from your use of the App. Our total liability for any claim is limited to the amount you paid us for the App in the 12 months before the claim. Nothing in these Terms limits liability that cannot be limited by law.</p>
      </section>

      <section>
        <h2>9. Ending your use</h2>
        <p>You may stop using the App at any time and uninstall it. Cancelling a subscription is done in Google Play. We may suspend or terminate access for breach of these Terms or to comply with the law.</p>
      </section>

      <section>
        <h2>10. Changes to these Terms</h2>
        <p>We may update these Terms. The date above shows the latest version, and continued use after a change means you accept it.</p>
      </section>

      <section>
        <h2>11. Governing law</h2>
        <p>These Terms are governed by the laws of India. Courts in New Delhi have jurisdiction over any dispute, subject to any mandatory consumer rights you may have.</p>
      </section>

      <section>
        <h2>12. Contact</h2>
        <p>Email <a href={`mailto:${site.email}`}>{site.email}</a>, call <a href={site.phoneHref}>{site.phone}</a>, or write to {site.address}.</p>
      </section>
    </LegalPage>
  );
}