import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { site } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Azad Shorthand collects, uses and protects your information.',
  alternates: { canonical: '/privacy/' },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="22 October 2026">
      <p>
        This Privacy Policy explains how {site.legalName} (&ldquo;Azad Shorthand&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles your information when you use the Azad Shorthand mobile app (the &ldquo;App&rdquo;) and this website. By using them, you agree to the practices described here.
      </p>

      <section>
        <h2>1. Who we are</h2>
        <p>{site.legalName}, {site.address}. Email: <a href={`mailto:${site.email}`}>{site.email}</a>. Phone: <a href={site.phoneHref}>{site.phone}</a>.</p>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <ul>
          <li><strong>Account and login details</strong> that you provide when you sign in to the App, such as your name and the contact detail used to log in.</li>
          <li><strong>Subscription status</strong>, such as whether you are on the free trial or a paid plan and when it ends. Payments themselves are handled by Google Play; we do not see or store your card or bank details.</li>
          <li><strong>Search activity inside the App</strong>, such as the words you search for, so that the App can show results and work properly.</li>
          <li><strong>Basic technical information</strong>, such as device model, Android version and App version, used to fix bugs and keep the App running smoothly.</li>
          <li><strong>Messages you send us</strong>, such as emails, WhatsApp messages or calls to our support line.</li>
        </ul>
      </section>

      <section>
        <h2>3. Voice search</h2>
        <p>
          The App lets you search by speaking. Speech is converted to text by the speech-recognition service built into your Android device, which is provided by Google and governed by Google&rsquo;s own privacy terms. Azad Shorthand receives the resulting text query to show you the matching outline. We do not use your voice to identify you.
        </p>
      </section>

      <section>
        <h2>4. How we use your information</h2>
        <ul>
          <li>To provide the App, including bilingual voice and text search of shorthand outlines.</li>
          <li>To manage your free trial and subscription and to give you access to paid features.</li>
          <li>To provide support, including 24/7 help, and to reply to your messages.</li>
          <li>To maintain security, prevent misuse and improve speed and reliability.</li>
          <li>To meet legal obligations.</li>
        </ul>
      </section>

      <section>
        <h2>5. Sharing your information</h2>
        <p>We do not sell your data, and we do not share it with anyone without your consent, except in these limited cases:</p>
        <ul>
          <li><strong>Service providers</strong> that help us run the App, such as Google Play for distribution and payments, who may process data only to provide their service.</li>
          <li><strong>Legal requirements</strong>, where we must respond to a valid request from a court or authority, or protect our rights, users or the public.</li>
        </ul>
      </section>

      <section>
        <h2>6. Security</h2>
        <p>We use industry-standard safeguards, including encryption, to protect your information. No system is completely secure, so we cannot guarantee absolute security, but we work to limit access to those who need it.</p>
      </section>

      <section>
        <h2>7. How long we keep it</h2>
        <p>We keep your information for as long as your account is active and as needed to provide the service, resolve disputes and meet legal obligations. When it is no longer needed, we delete or anonymise it.</p>
      </section>

      <section>
        <h2>8. Your choices and rights</h2>
        <p>Subject to applicable law, including India&rsquo;s Digital Personal Data Protection Act, 2023, you may:</p>
        <ul>
          <li>ask what personal data we hold about you and request a copy;</li>
          <li>ask us to correct inaccurate data;</li>
          <li>ask us to delete your account and data;</li>
          <li>withdraw consent you have given us, which will not affect processing done before you withdrew it.</li>
        </ul>
        <p>To use any of these rights, email <a href={`mailto:${site.email}`}>{site.email}</a> from the address linked to your account. We will respond within a reasonable time.</p>
      </section>

      <section>
        <h2>9. Children</h2>
        <p>The App is meant for students and professionals learning shorthand. If you are under 18, please use it with the involvement of a parent or guardian. If you believe a child has given us personal data without a guardian&rsquo;s consent, contact us and we will delete it.</p>
      </section>

      <section>
        <h2>10. This website</h2>
        <p>
          This website is a static site and has no user accounts. The contact form does not send data to our servers: it opens your own email app (or WhatsApp) with your message prefilled, and nothing is sent until you send it yourself. The site stores only your light or dark theme choice in your browser, and uses no advertising cookies.
        </p>
        <p>Links to Google Play and social platforms lead to third-party services with their own privacy policies.</p>
      </section>

      <section>
        <h2>11. Changes to this policy</h2>
        <p>We may update this policy from time to time. The date above shows the latest version. If a change is significant, we will tell you through the App or this website.</p>
      </section>

      <section>
        <h2>12. Contact and grievances</h2>
        <p>For questions, requests or complaints about your data, contact us at <a href={`mailto:${site.email}`}>{site.email}</a>, call <a href={site.phoneHref}>{site.phone}</a>, or write to {site.address}.</p>
      </section>
    </LegalPage>
  );
}