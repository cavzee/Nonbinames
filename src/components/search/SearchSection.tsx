"use client";

import { useEffect, useMemo, useState } from "react";
import { filterNames } from "@/lib";
import { NameCard } from "@/components/names/NameCard";

type Props = {
  collection?: string;
  theme?: string;
  origin?: string;
  firstLetter?: string;
};

const RESULTS_PER_LOAD = 24;

export function SearchSection({
  collection = "",
  theme = "",
  origin = "",
  firstLetter = "",
}: Props) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_LOAD);

  const names = useMemo(
    () =>
      filterNames({
        query,
        collection: collection || undefined,
        theme: theme || undefined,
        origin: origin || undefined,
        firstLetter: firstLetter || undefined,
      }),
    [query, collection, theme, origin, firstLetter]
  );

  useEffect(() => {
    setVisibleCount(RESULTS_PER_LOAD);
  }, [query, collection, theme, origin, firstLetter]);

  const visibleNames = names.slice(0, visibleCount);
  const hasMore = visibleCount < names.length;

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          <span aria-hidden="true">🔍</span> Search Names
        </h2>

        <p className="mt-3 text-zinc-400">
          Search by name and browse every curated entry.
        </p>
      </div>

      <label htmlFor="name-search" className="sr-only">
        Search names
      </label>

      <input
        id="name-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-describedby="search-results"
        placeholder="Try Juniper, Ocean, Avery..."
        className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-5 text-lg text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none"
      />

      <div className="mt-6 flex items-center justify-between gap-4">
        <p
          id="search-results"
          aria-live="polite"
          className="text-sm text-zinc-400"
        >
          Showing <strong>{visibleNames.length}</strong> of{" "}
          <strong>{names.length}</strong>{" "}
          {names.length === 1 ? "name" : "names"}
          {collection && <> in <strong>{collection}</strong></>}
          {theme && <> • Theme: <strong>{theme}</strong></>}
          {origin && <> • Origin: <strong>{origin}</strong></>}
          {firstLetter && <> • Starts with <strong>{firstLetter}</strong></>}
        </p>

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="shrink-0 text-sm text-zinc-500 transition hover:text-white"
          >
            Clear Search
          </button>
        )}
      </div>

      {names.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">
          <h3 className="text-2xl font-semibold">No names found</h3>

          <p className="mt-4 text-zinc-400">
            Try another search or clear the active filters.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleNames.map((name) => (
              <NameCard key={name.id} name={name} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((count) => count + RESULTS_PER_LOAD)
                }
                className="rounded-2xl border border-zinc-700 bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition hover:border-violet-500 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                Load more
                <span className="ml-2 text-zinc-400">
                  ({Math.min(RESULTS_PER_LOAD, names.length - visibleCount)})
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
