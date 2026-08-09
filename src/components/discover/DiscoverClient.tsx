"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { DiscoverHeader } from "@/components/discover/DiscoverHeader";
import { LetterFilter } from "@/components/discover/LetterFilter";
import { CollectionFilter } from "@/components/discover/CollectionFilter";
import { SearchSection } from "@/components/search/SearchSection";
import { SmartRefinement } from "@/components/discover/SmartRefinement";
import { filterNames } from "@/lib";

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

  const query = searchParams.get("query") ?? "";
  const collection = searchParams.get("collection") ?? "";
  const theme = searchParams.get("theme") ?? "";
  const origin = searchParams.get("origin") ?? "";
  const firstLetter = searchParams.get("firstLetter") ?? "";
  const direction = searchParams.get("direction") ?? "";
  const directionType = searchParams.get("directionType") as
    | "theme"
    | "collection"
    | "origin"
    | "firstLetter"
    | "";

  const filteredNames = filterNames({
    query: query || undefined,
    collection: collection || undefined,
    theme: theme || undefined,
    origin: origin || undefined,
    firstLetter: firstLetter || undefined,
    direction: direction || undefined,
    directionType: directionType || undefined,
  });

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const queryString = params.toString();

    router.push(
      queryString ? `/discover?${queryString}` : "/discover"
    );
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

      <SmartRefinement
        names={filteredNames}
        query={query}
        collection={collection}
        theme={theme}
        origin={origin}
        direction={direction}
        directionType={directionType}
      />

      <SearchSection
        initialQuery={query}
        collection={collection}
        theme={theme}
        origin={origin}
        firstLetter={firstLetter}
        direction={direction}
        directionType={directionType}
      />
    </section>
  );
}
