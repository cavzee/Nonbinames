import type { Metadata } from "next";
import { Suspense } from "react";

import { DiscoverClient } from "@/components/discover/DiscoverClient";

export const metadata: Metadata = {
  title: "Discover Names",

  description:
    "Browse every curated gender-neutral, non-binary and unisex name by collection, origin, theme or first letter.",

  alternates: {
    canonical: "https://nonbinames.com/discover",
  },

  openGraph: {
    title: "Discover Names | NonbiNames",
    description:
      "Browse every curated gender-neutral, non-binary and unisex name.",
    url: "https://nonbinames.com/discover",
  },
};

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Suspense fallback={null}>
        <DiscoverClient />
      </Suspense>
    </main>
  );
}
