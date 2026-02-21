import { Crown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Timeless City",
  description:
    "Privacy Policy for Timeless City iOS game. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy — Timeless City",
    description:
      "Privacy Policy for Timeless City iOS game. Learn how we collect, use, and protect your personal information.",
    url: "https://thetimeless.city/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Crown className="w-7 h-7 text-medieval-gold group-hover:scale-110 transition-transform" />
            <span className="font-[family-name:var(--font-heading)] text-lg font-bold gold-text">
              Timeless City
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/40 hover:text-medieval-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold mb-4">
              <span className="gold-text">Privacy Policy</span>
            </h1>
            <p className="text-white/40 text-sm">
              Last updated: February 21, 2025
            </p>
          </div>

          {/* Content */}
          <article className="prose-custom space-y-10">
            <Section title="1. Introduction">
              <p>
                Welcome to Timeless City (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). This Privacy
                Policy explains how we collect, use, disclose, and safeguard your
                information when you use our mobile application Timeless City
                (the &ldquo;App&rdquo;), available on the Apple App Store. Please read this
                privacy policy carefully. By using the App, you agree to the
                collection and use of information in accordance with this policy.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <h4>2.1 Information You Provide</h4>
              <ul>
                <li>
                  <strong>Account Information:</strong> When you sign in using
                  Apple Sign-In, we receive a unique identifier and, if you
                  choose to share it, your name and email address. We do not
                  receive your Apple ID password.
                </li>
                <li>
                  <strong>Display Name:</strong> You may set a display name
                  within the App, which is visible on leaderboards and your
                  player profile.
                </li>
                <li>
                  <strong>Game Data:</strong> Your in-game progress, including
                  resources, city data, troop information, achievements, and
                  battle history.
                </li>
              </ul>

              <h4>2.2 Information Collected Automatically</h4>
              <ul>
                <li>
                  <strong>Device Information:</strong> We may collect device
                  type, operating system version, and unique device identifiers
                  for analytics and crash reporting purposes.
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect information about how
                  you interact with the App, such as features used, session
                  duration, and in-game actions, to improve the gaming
                  experience.
                </li>
              </ul>

              <h4>2.3 Information We Do NOT Collect</h4>
              <ul>
                <li>We do not collect your precise location data.</li>
                <li>We do not access your contacts, photos, or camera.</li>
                <li>
                  We do not collect financial information. All purchases are
                  processed securely through Apple&apos;s App Store.
                </li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve the App.</li>
                <li>
                  Sync your game progress across sessions using our cloud
                  backend (Supabase).
                </li>
                <li>
                  Display your display name and scores on public leaderboards.
                </li>
                <li>
                  Send you optional push notifications (e.g., energy refill
                  reminders, daily rewards) — you can disable these at any time
                  in your device settings.
                </li>
                <li>
                  Analyze usage patterns to improve game balance, features, and
                  user experience.
                </li>
                <li>Detect and prevent fraud or abuse.</li>
              </ul>
            </Section>

            <Section title="4. Data Storage & Security">
              <p>
                Your game data is stored both locally on your device and on our
                secure cloud servers powered by Supabase. We implement
                industry-standard security measures including:
              </p>
              <ul>
                <li>Encrypted data transmission (HTTPS/TLS).</li>
                <li>Row-Level Security (RLS) policies on our database.</li>
                <li>
                  Secure authentication through Apple Sign-In and anonymous
                  sessions.
                </li>
              </ul>
              <p>
                While we strive to protect your personal information, no method
                of electronic storage or transmission is 100% secure. We cannot
                guarantee absolute security.
              </p>
            </Section>

            <Section title="5. Third-Party Services">
              <p>The App uses the following third-party services:</p>
              <ul>
                <li>
                  <strong>Apple Sign-In:</strong> For secure authentication.
                  Subject to{" "}
                  <a
                    href="https://www.apple.com/legal/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apple&apos;s Privacy Policy
                  </a>
                  .
                </li>
                <li>
                  <strong>Supabase:</strong> For cloud data storage and
                  authentication. Subject to{" "}
                  <a
                    href="https://supabase.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Supabase&apos;s Privacy Policy
                  </a>
                  .
                </li>
                <li>
                  <strong>Apple Game Center:</strong> For optional Game Center
                  integration. Subject to Apple&apos;s Privacy Policy.
                </li>
              </ul>
              <p>
                We do not sell, trade, or rent your personal information to third
                parties. We do not use third-party advertising SDKs.
              </p>
            </Section>

            <Section title="6. In-App Purchases">
              <p>
                The App offers optional in-app purchases. All transactions are
                processed by Apple through the App Store. We do not have access
                to your payment information (credit card numbers, billing
                address, etc.). Purchase history is managed by Apple.
              </p>
            </Section>

            <Section title="7. Children&apos;s Privacy">
              <p>
                The App is not directed at children under the age of 13. We do
                not knowingly collect personal information from children under
                13. If we become aware that we have collected personal
                information from a child under 13, we will take steps to delete
                such information promptly. If you are a parent or guardian and
                believe your child has provided us with personal information,
                please contact us.
              </p>
            </Section>

            <Section title="8. Your Rights">
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate data.</li>
                <li>Request deletion of your data.</li>
                <li>Object to or restrict processing of your data.</li>
                <li>Data portability.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:support@thetimeless.city">
                  support@thetimeless.city
                </a>
                . We will respond to your request within 30 days.
              </p>
            </Section>

            <Section title="9. Data Retention">
              <p>
                We retain your game data for as long as your account is active or
                as needed to provide you with the App&apos;s services. If you wish to
                delete your account and all associated data, please contact us at{" "}
                <a href="mailto:support@thetimeless.city">
                  support@thetimeless.city
                </a>
                . Upon account deletion, your data will be permanently removed
                from our servers within 30 days.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &ldquo;Last updated&rdquo; date. You are advised
                to review this Privacy Policy periodically for any changes.
                Continued use of the App after changes constitutes acceptance of
                the updated policy.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>
                If you have any questions or concerns about this Privacy Policy,
                please contact us:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:support@thetimeless.city">
                    support@thetimeless.city
                  </a>
                </li>
                <li>
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://thetimeless.city"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://thetimeless.city
                  </a>
                </li>
              </ul>
            </Section>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-medieval-gold/50" />
              <span className="font-[family-name:var(--font-heading)] text-sm text-white/40">
                Timeless City
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-white/30">
              <Link
                href="/privacy"
                className="text-medieval-gold/60"
              >
                Privacy Policy
              </Link>
              <a
                href="mailto:support@thetimeless.city"
                className="hover:text-medieval-gold transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="text-xs text-white/20">
              &copy; {new Date().getFullYear()} Timeless City. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-medieval-gold mb-4">
        {title}
      </h2>
      <div className="space-y-4 text-sm text-white/50 leading-relaxed [&_h4]:text-white/70 [&_h4]:font-semibold [&_h4]:mt-4 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-medieval-gold/70 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-medieval-gold [&_strong]:text-white/60">
        {children}
      </div>
    </section>
  );
}
