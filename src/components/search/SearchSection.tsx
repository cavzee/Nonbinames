"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { filterNames } from "@/lib";
import { NameCard } from "@/components/names/NameCard";

type Props = {
  initialQuery?: string;
  collection?: string;
  theme?: string;
  origin?: string;
  firstLetter?: string;
  direction?: string;
  directionType?: "theme" | "collection" | "origin" | "firstLetter" | "";
};

const RESULTS_PER_LOAD = 24;

export function SearchSection({
  initialQuery = "",
  collection = "",
  theme = "",
  origin = "",
  firstLetter = "",
  direction = "",
  directionType = "",
}: Props) {
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery);
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_LOAD);
  const [lastSurpriseId, setLastSurpriseId] = useState<string | null>(null);

  const names = useMemo(
    () =>
      filterNames({
        query,
        collection: collection || undefined,
        theme: theme || undefined,
        origin: origin || undefined,
        firstLetter: firstLetter || undefined,
        direction: direction || undefined,
        directionType: directionType || undefined,
      }),
    [query, collection, theme, origin, firstLetter, direction, directionType]
  );

  useEffect(() => {
    setQuery(initialQuery);
    setVisibleCount(RESULTS_PER_LOAD);
    setLastSurpriseId(null);
  }, [
    initialQuery,
    collection,
    theme,
    origin,
    firstLetter,
    direction,
    directionType,
  ]);

  const visibleNames = names.slice(0, visibleCount);
  const hasMore = visibleCount < names.length;

  function buildReturnUrl() {
    const params = new URLSearchParams();

    if (query) params.set("query", query);
    if (collection) params.set("collection", collection);
    if (theme) params.set("theme", theme);
    if (origin) params.set("origin", origin);
    if (firstLetter) params.set("firstLetter", firstLetter);
    if (direction) params.set("direction", direction);
    if (directionType) params.set("directionType", directionType);

    const queryString = params.toString();

    return queryString ? `/discover?${queryString}` : "/discover";
  }

  function clearFilter(key: string) {
    const params = new URLSearchParams(window.location.search);
    params.delete(key);

    if (key === "direction") {
      params.delete("directionType");
    }

    const queryString = params.toString();

    router.push(
      queryString ? `/discover?${queryString}` : "/discover"
    );
  }

  function surpriseMe() {
    if (names.length === 0) return;

    const candidates =
      names.length > 1 && lastSurpriseId
        ? names.filter((name) => name.id !== lastSurpriseId)
        : names;

    const selected =
      candidates[Math.floor(Math.random() * candidates.length)];

    setLastSurpriseId(selected.id);

    const returnTo = buildReturnUrl();

    router.push(
      `/name/${selected.slug}?returnTo=${encodeURIComponent(returnTo)}`
    );
  }

  const returnTo = buildReturnUrl();

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Find a name
        </h2>

        <p className="mt-3 text-zinc-400">
          Search the library, or leave it blank and explore everything.
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

      {(collection || theme || origin || firstLetter || direction) && (
        <div className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                Currently exploring
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {collection && (
                  <button
                    type="button"
                    onClick={() => clearFilter("collection")}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-violet-500 hover:text-white"
                  >
                    {collection} <span aria-hidden="true">×</span>
                  </button>
                )}

                {theme && (
                  <button
                    type="button"
                    onClick={() => clearFilter("theme")}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-violet-500 hover:text-white"
                  >
                    {theme} <span aria-hidden="true">×</span>
                  </button>
                )}

                {origin && (
                  <button
                    type="button"
                    onClick={() => clearFilter("origin")}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-violet-500 hover:text-white"
                  >
                    {origin} <span aria-hidden="true">×</span>
                  </button>
                )}

                {firstLetter && (
                  <button
                    type="button"
                    onClick={() => clearFilter("firstLetter")}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-violet-500 hover:text-white"
                  >
                    Starts with {firstLetter} <span aria-hidden="true">×</span>
                  </button>
                )}

                {direction && (
                  <button
                    type="button"
                    onClick={() => clearFilter("direction")}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-violet-500 hover:text-white"
                  >
                    {direction} <span aria-hidden="true">×</span>
                  </button>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/discover")}
              className="self-start text-sm text-zinc-500 transition hover:text-white sm:self-center"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

        <div className="flex items-center gap-4">
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Clear Search
            </button>
          )}

          {names.length > 0 && (
            <button
              type="button"
              onClick={surpriseMe}
              className="rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:border-violet-400 hover:bg-violet-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              <span aria-hidden="true">✨</span> Surprise me
            </button>
          )}
        </div>
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
              <NameCard
                key={name.id}
                name={name}
                returnTo={returnTo}
              />
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
