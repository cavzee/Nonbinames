"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { filterNames } from "@/lib";

type Props = {
  currentNameId: string;
};

export function SurpriseAgain({
  currentNameId,
}: Props) {
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

  const names = useMemo(
    () =>
      filterNames({
        query: query || undefined,
        collection: collection || undefined,
        theme: theme || undefined,
        origin: origin || undefined,
        firstLetter: firstLetter || undefined,
        direction: direction || undefined,
        directionType: directionType || undefined,
      }),
    [
      query,
      collection,
      theme,
      origin,
      firstLetter,
      direction,
      directionType,
    ]
  );

  function surpriseAgain() {
    const candidates = names.filter(
      (name) => name.id !== currentNameId
    );

    if (candidates.length === 0) return;

    const selected =
      candidates[Math.floor(Math.random() * candidates.length)];

    const returnTo = window.location.search
      ? `/discover${window.location.search}`
      : "/discover";

    router.push(
      `/name/${selected.slug}?returnTo=${encodeURIComponent(returnTo)}`
    );
  }

  if (names.length <= 1) {
    return (
      <p className="mt-10 text-center text-sm text-zinc-500">
        You&apos;re viewing the only name matching this discovery.
      </p>
    );
  }

  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={surpriseAgain}
        className="rounded-2xl border border-violet-500/40 bg-violet-500/10 px-7 py-4 text-sm font-semibold text-violet-300 transition hover:border-violet-400 hover:bg-violet-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
      >
        <span aria-hidden="true">✨</span> Surprise me again
      </button>
    </div>
  );
}
