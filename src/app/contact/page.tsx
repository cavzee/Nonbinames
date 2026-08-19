import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact NonbiNames",
  description:
    "Contact NonbiNames about corrections, suggestions, privacy and database information.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Contact</h1>

      <div className="mt-8 space-y-8 text-base leading-7">
        <section>
          <h2 className="text-2xl font-semibold">Get in touch</h2>

          <p className="mt-3">
            If you have a question, correction or suggestion about
            NonbiNames, we would be happy to hear from you.
          </p>

          <p className="mt-3">
            Email us at{" "}
            <a
              href="mailto:nonbinames@gmail.com"
              className="text-violet-400 underline hover:text-violet-300"
            >
              nonbinames@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Database corrections</h2>

          <p className="mt-3">
            Please get in touch if you notice an incorrect meaning, origin,
            pronunciation, classification or other information about a name.
            Additional cultural or linguistic context is also welcome.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Privacy</h2>

          <p className="mt-3">
            For questions about privacy, analytics, advertising or your
            choices on NonbiNames, you can contact us using the email address
            above.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Suggestions</h2>

          <p className="mt-3">
            We also welcome suggestions for names or improvements that would
            make the database more useful.
          </p>
        </section>
      </div>
    </main>
  );
}
