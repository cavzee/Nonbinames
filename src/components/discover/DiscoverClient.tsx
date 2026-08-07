"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { DiscoverHeader } from "@/components/discover/DiscoverHeader";
import { LetterFilter } from "@/components/discover/LetterFilter";
import { CollectionFilter } from "@/components/discover/CollectionFilter";
import { SearchSection } from "@/components/search/SearchSection";

const collections = [
  "Nature",
  "Modern",
  "Traditional Unisex",
  "Classic",
  "Rare",
  "Bold",
  "Soft",
  "Ocean",
  "Celestial",
  "Earthy",
  "Mythic",
  "Autumn",
  "Futuristic",
];

export function DiscoverClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const collection = searchParams.get("collection") ?? "";
  const theme = searchParams.get("theme") ?? "";
  const origin = searchParams.get("origin") ?? "";
  const firstLetter = searchParams.get("firstLetter") ?? "";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/discover?${params.toString()}`);
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">

      <Link
        href="/"
        className="text-sm text-zinc-500 transition hover:text-white"
      >
        ← Back Home
      </Link>

      <DiscoverHeader />

      <LetterFilter
        selected={firstLetter}
        onSelect={(value) => updateParam("firstLetter", value)}
      />

      <CollectionFilter
        collections={collections}
        selected={collection}
        onSelect={(value) => updateParam("collection", value)}
      />

      <SearchSection
        collection={collection}
        theme={theme}
        origin={origin}
        firstLetter={firstLetter}
      />

    </section>
  );
}
