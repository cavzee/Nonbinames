"use client";

import { useMemo, useState } from "react";
import { searchNames } from "@/lib";

export function SearchSection() {
  const [query, setQuery] = useState("");

  const names = useMemo(() => searchNames(query), [query]);

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

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {names.map((name) => (
          <div
            key={name.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700 hover:bg-zinc-800"
          >
            <h3 className="text-2xl font-semibold">
              {name.name}
            </h3>

            <p className="mt-2 text-zinc-400">
              {name.meaning}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {name.themes.map((theme) => (
                <span
                  key={theme}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-xs"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
