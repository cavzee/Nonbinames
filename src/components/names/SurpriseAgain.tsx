"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { filterNames } from "@/lib";

type Props = {
  query?: string;
  collection?: string;
  theme?: string;
  origin?: string;
  firstLetter?: string;
  currentNameId: string;
  returnTo: string;
};

export function SurpriseAgain({
  query = "",
  collection = "",
  theme = "",
  origin = "",
  firstLetter = "",
  currentNameId,
  returnTo,
}: Props) {
  const router = useRouter();

  const names = useMemo(
    () =>
      filterNames({
        query: query || undefined,
        collection: collection || undefined,
        theme: theme || undefined,
        origin: origin || undefined,
        firstLetter: firstLetter || undefined,
      }),
    [query, collection, theme, origin, firstLetter]
  );

  function surpriseAgain() {
    const candidates = names.filter((name) => name.id !== currentNameId);

    if (candidates.length === 0) return;

    const selected =
      candidates[Math.floor(Math.random() * candidates.length)];

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
