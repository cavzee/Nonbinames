"use client";

import { useMemo, useState } from "react";
import { filterNames } from "@/lib";
import { useVibe } from "@/context/VibeContext";
import { NameCard } from "@/components/names/NameCard";

export function SearchSection() {
  const [query, setQuery] = useState("");
  const { vibe } = useVibe();

  const names = useMemo(
    () =>
      filterNames({
        query,
        collection: vibe,
      }),
    [query, vibe]
  );

  return (
    <section className="mt-16">
      <h2 className="mb-5 text-2xl font-semibold">
        🔍 Search
      </h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search names..."
        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:outline-none"
      />

      <p className="mt-4 mb-6 text-sm text-zinc-400">
        Showing {names.length} {names.length === 1 ? "name" : "names"}
        {vibe && (
          <>
            {" "}
            for <strong>{vibe}</strong>
          </>
        )}
      </p>

      {names.length === 0 ? (
        <div className="mt-8 rounded-xl border border-zinc-800 p-10 text-center">
          <h3 className="text-xl font-semibold">
            No names found
          </h3>

          <p className="mt-3 text-zinc-400">
            Try another search or choose a different vibe.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
