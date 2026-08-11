import type { Metadata } from "next";
import Link from "next/link";

import { HomeHero } from "@/components/home/HomeHero";
import { Statistics } from "@/components/home/Statistics";
import { HiddenGem } from "@/components/home/HiddenGem";
import { FeaturedNames } from "@/components/home/FeaturedNames";
import { ExploreSection } from "@/components/sections/ExploreSection";

export const metadata: Metadata = {
  title: "Discover Gender-Neutral & Non-Binary Names",

  description:
    "Discover carefully curated gender-neutral and non-binary names with meanings, origins, pronunciation and inspiration.",

  alternates: {
    canonical: "https://nonbinames.com",
  },

  openGraph: {
    title: "NonbiNames",
    description:
      "Discover carefully curated gender-neutral, non-binary and inclusive names.",
    url: "https://nonbinames.com",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <section className="mx-auto max-w-6xl px-6 py-20">

        <HomeHero />

        <Statistics />

        <FeaturedNames />

        <HiddenGem />

        <ExploreSection />

        <section className="mt-20 text-center">

          <h2 className="text-3xl font-bold">
            Ready to explore every name?
          </h2>

          <p className="mt-4 text-zinc-400">
            Browse the complete library of curated names.
          </p>

          <Link
            href="/discover"
            className="mt-8 inline-flex rounded-xl bg-violet-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-violet-400"
          >
            Explore All Names →
          </Link>

        </section>

      </section>

    </main>
  );
}
