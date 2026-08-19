import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology | NonbiNames",
  description:
    "How NonbiNames researches names, meanings, origins and gender-neutral usage.",
  alternates: {
    canonical: "/methodology",
  },
};

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">
        Our Methodology
      </h1>

      <div className="mt-8 space-y-8 text-base leading-7">
        <section>
          <h2 className="text-2xl font-semibold">How names are selected</h2>
          <p className="mt-3">
            NonbiNames focuses on names that can reasonably be used in a
            gender-neutral or non-binary context. A name may be included when
            it has established gender-neutral usage, meaningful cross-cultural
            usage, or a documented history of use across genders.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Meanings and origins</h2>
          <p className="mt-3">
            Name meanings and origins are treated as cultural and linguistic
            information rather than absolute definitions. Where a name has
            multiple interpretations, the database may reflect more than one
            meaning or origin.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Gender-neutral usage</h2>
          <p className="mt-3">
            Gender association can differ significantly between countries,
            languages, generations and communities. A name described as
            gender-neutral here should therefore not be interpreted as a claim
            that it is universally used equally across all genders.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Corrections</h2>
          <p className="mt-3">
            Naming information can be complex, and sources sometimes disagree.
            We welcome corrections and additional context when information is
            inaccurate, incomplete or missing important cultural nuance.
          </p>
        </section>
      </div>
    </main>
  );
}
