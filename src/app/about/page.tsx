import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About NonbiNames",
  description:
    "Learn about NonbiNames, a curated resource for gender-neutral and non-binary names.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">About NonbiNames</h1>

      <div className="mt-8 space-y-6 text-base leading-7">
        <p>
          NonbiNames is a curated resource for people exploring gender-neutral
          and non-binary names.
        </p>

        <p>
          The database brings together names from different languages,
          cultures and naming traditions, with information about meanings,
          origins, pronunciation and usage.
        </p>

        <p>
          Our aim is to make it easier to discover names without assuming that
          a name has to belong exclusively to a particular gender.
        </p>

        <p>
          Name classifications can vary between cultures and over time.
          NonbiNames therefore treats gender-neutrality as a matter of context
          rather than assuming that every name has the same usage everywhere.
        </p>

        <p>
          If you spot an error or have useful information about a name, please
          get in touch so that the database can continue to improve.
        </p>
      </div>
    </main>
  );
}
