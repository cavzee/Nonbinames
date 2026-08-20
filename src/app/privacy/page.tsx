import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy and data-use information for NonbiNames, including analytics and advertising.",
  alternates: {
    canonical: "/privacy",
  },
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
          privacy. This page explains what information may be processed when
          you use the website and the choices available to you.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Analytics
          </h2>

          <p className="text-zinc-400">
            NonbiNames uses Vercel Web Analytics to understand how visitors
            use the website and to improve the experience. Analytics may
            provide statistical information such as page views, popular
            pages, referrers, devices and general site usage.
          </p>

          <p className="text-zinc-400">
            Vercel Web Analytics is designed to provide website analytics
            without using the analytics system to build advertising profiles
            or track visitors across unrelated websites.
          </p>

          <p className="text-zinc-400">
            Analytics data is processed by Vercel as our analytics provider.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Advertising
          </h2>

          <p className="text-zinc-400">
            NonbiNames may display advertising using Google AdSense. Google
            and its advertising partners may process information about visits
            to this website and use cookies, local storage or similar
            technologies in connection with advertising, measurement and
            fraud prevention.
          </p>

          <p className="text-zinc-400">
            Depending on your location and the choices you make, advertising
            may be personalised or may be shown without personalisation.
            Personalised advertising can use information about interests,
            previous activity and other signals to make advertisements more
            relevant.
          </p>

          <p className="text-zinc-400">
            Google provides privacy and advertising controls that allow users
            to manage certain advertising preferences. More information is
            available in{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 underline hover:text-violet-300"
            >
              Google's Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 underline hover:text-violet-300"
            >
              Google Ads Settings
            </a>.
          </p>

          <p className="text-zinc-400">
            Where applicable, NonbiNames will use the consent and privacy
            controls provided through our advertising platform to obtain and
            respect the choices required for advertising.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Cookies and local storage
          </h2>

          <p className="text-zinc-400">
            Advertising services may also use cookies, local storage or
            similar technologies when advertising is enabled. The use of
            those technologies is subject to applicable consent requirements
            and your available choices.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Information we do not ask you to provide
          </h2>

          <p className="text-zinc-400">
            NonbiNames does not require an account to browse the name
            database. We do not ask visitors to provide sensitive personal
            information simply to use the website.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            External services
          </h2>

          <p className="text-zinc-400">
            NonbiNames relies on third-party services for functions such as
            hosting, analytics and advertising. Those providers may process
            information according to their own privacy policies and the
            services they provide to us.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Your choices
          </h2>

          <p className="text-zinc-400">
            Where advertising consent controls are presented, you can use
            those controls to make or change the choices available to you.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Changes to this policy
          </h2>

          <p className="text-zinc-400">
            This privacy information may be updated when the website,
            analytics services or advertising arrangements change. The date
            below indicates when this page was last updated.
          </p>
        </section>

        <p className="mt-16 border-t border-zinc-800 pt-6 text-sm text-zinc-500">
          Last updated: 19 August 2026
        </p>
      </div>
    </main>
  );
}
