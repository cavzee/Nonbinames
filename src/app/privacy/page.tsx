import type { Metadata } from "next";
import { AnalyticsPreference } from "@/components/privacy/AnalyticsPreference";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for NonbiNames.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="text-sm text-violet-400 transition hover:text-violet-300"
        >
          ← Back to NonbiNames
        </a>

        <h1 className="mt-10 text-4xl font-bold tracking-tight">Privacy</h1>

        <p className="mt-5 text-zinc-400">
          NonbiNames is designed to be simple, useful and respectful of your
          privacy.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">Analytics</h2>

          <p className="text-zinc-400">
            NonbiNames uses Vercel Web Analytics to understand how visitors
            use the website and to improve the experience. We use analytics
            for statistical purposes such as understanding page views,
            popular pages, referrers, devices and general site usage.
          </p>

          <p className="text-zinc-400">
            Vercel Web Analytics is designed to operate without advertising
            cookies and does not use the analytics system to build advertising
            profiles or track you across unrelated websites.
          </p>

          <p className="text-zinc-400">
            Analytics data is processed by Vercel as our analytics provider.
            You can disable analytics for this browser at any time using the
            control below.
          </p>

          <AnalyticsPreference />
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">Cookies</h2>

          <p className="text-zinc-400">
            NonbiNames does not use advertising cookies or third-party
            advertising trackers.
          </p>

          <p className="text-zinc-400">
            Your analytics preference is stored locally in your browser so
            that we can remember whether you have disabled analytics.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">Your choices</h2>

          <p className="text-zinc-400">
            You can disable analytics at any time using the control on this
            page. You can also clear your browser's local storage to remove
            the saved preference.
          </p>
        </section>

        <p className="mt-16 border-t border-zinc-800 pt-6 text-sm text-zinc-500">
          Last updated: 8 August 2026
        </p>
      </div>
    </main>
  );
}
