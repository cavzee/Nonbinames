"use client";

import { useMemo, useState } from "react";
import { filterNames } from "@/lib";
import { NameCard } from "@/components/names/NameCard";

type Props = {
  collection?: string;
  theme?: string;
  origin?: string;
  firstLetter?: string;
};

export function SearchSection({
  collection = "",
  theme = "",
  origin = "",
  firstLetter = "",
}: Props) {
  const [query, setQuery] = useState("");

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

  return (
    <section className="mt-16">

      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          🔍 Search Names
        </h2>

        <p className="mt-3 text-zinc-400">
          Search by name and browse every curated entry.
        </p>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try Juniper, Ocean, Avery..."
        className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-5 text-lg text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none"
      />

      <div className="mt-6 flex items-center justify-between">

        <p className="text-sm text-zinc-400">
          Showing <strong>{names.length}</strong>{" "}
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
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            Clear Search
          </button>
        )}

      </div>

      {names.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">
          <h3 className="text-2xl font-semibold">
            No names found
          </h3>

          <p className="mt-4 text-zinc-400">
            Try another search or clear the active filters.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {names.map((name) => (
            <NameCard
              key={name.id}
              name={name}
            />
          ))}
        </div>
      )}

    </section>
  );
}
