"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Name } from "@/types/name";

type Props = {
  names: Name[];
  query?: string;
  collection?: string;
  theme?: string;
  origin?: string;
  firstLetter?: string;
  direction?: string;
  directionType?: "theme" | "collection" | "origin" | "firstLetter" | "";
};

type Suggestion = {
  label: string;
  type: "theme" | "collection" | "origin" | "firstLetter";
  value: string;
  count: number;
  score: number;
};

const MAX_SUGGESTIONS = 4;

export function SmartRefinement({
  names,
  query = "",
  collection = "",
  theme = "",
  origin = "",
  firstLetter = "",
  direction = "",
  directionType = "",
}: Props) {
  const router = useRouter();

  const suggestions = useMemo(() => {
    if (names.length <= 2) {
      return [];
    }

    const total = names.length;
    const targetCount = total >= 25 ? total * 0.4 : total * 0.5;
    const results: Suggestion[] = [];

    function addSuggestions(
      type: Suggestion["type"],
      values: string[],
      activeValue: string
    ) {
      const counts = new Map<string, number>();

      for (const value of values) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
      }

      for (const [value, count] of counts) {
        if (!value || value === activeValue || value === direction) {
          continue;
        }

        if (count >= total) {
          continue;
        }

        if (total >= 25 && count < 2) {
          continue;
        }

        if (count / total > 0.9) {
          continue;
        }

        results.push({
          label: value,
          type,
          value,
          count,
          score: Math.abs(count - targetCount),
        });
      }
    }

    addSuggestions(
      "theme",
      names.flatMap((name) => name.themes),
      theme
    );

    addSuggestions(
      "collection",
      names.flatMap((name) => name.collections),
      collection
    );

    if (total <= 100) {
      addSuggestions(
        "origin",
        names.map((name) => name.origin),
        origin
      );
    }

    if (total <= 50) {
      addSuggestions(
        "firstLetter",
        names.map((name) => name.name.charAt(0).toUpperCase()),
        firstLetter
      );
    }

    return results
      .sort((a, b) => {
        if (a.score !== b.score) {
          return a.score - b.score;
        }

        return a.label.localeCompare(b.label);
      })
      .slice(0, MAX_SUGGESTIONS);
  }, [
    names,
    collection,
    theme,
    origin,
    firstLetter,
    direction,
    directionType,
  ]);

  function buildUrl(directionValue?: string, directionValueType?: string) {
    const params = new URLSearchParams();

    if (query) {
      params.set("query", query);
    }

    if (collection) {
      params.set("collection", collection);
    }

    if (theme) {
      params.set("theme", theme);
    }

    if (origin) {
      params.set("origin", origin);
    }

    if (firstLetter) {
      params.set("firstLetter", firstLetter);
    }

    if (directionValue) {
      params.set("direction", directionValue);
      if (directionValueType) {
        params.set("directionType", directionValueType);
      }
    }

    const queryString = params.toString();

    return queryString ? `/discover?${queryString}` : "/discover";
  }

  function applySuggestion(suggestion: Suggestion) {
    router.push(buildUrl(suggestion.value, suggestion.type));
  }

  function clearDirection() {
    router.push(buildUrl());
  }

  return (
    <section
      aria-labelledby="smart-refinement-heading"
      className="mt-12 rounded-3xl border border-violet-500/20 bg-violet-500/[0.04] p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2
            id="smart-refinement-heading"
            className="text-lg font-semibold text-white"
          >
            Explore these directions
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Try another angle to find names that feel right.
          </p>
        </div>

        {direction && (
          <button
            type="button"
            onClick={clearDirection}
            className="self-start rounded-lg px-2 py-1 text-sm text-zinc-500 transition hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Clear
          </button>
        )}
      </div>

      {direction && (
        <div className="mt-5 flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-zinc-500">
            Current direction
          </span>

          <span className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
            {direction}
          </span>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3">
          {suggestions.map((suggestion) => (
            <button
              key={`${suggestion.type}-${suggestion.value}`}
              type="button"
              onClick={() => applySuggestion(suggestion)}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 transition hover:border-violet-500 hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              {suggestion.label}
              <span className="ml-2 text-zinc-500">
                {suggestion.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {direction && suggestions.length === 0 && (
        <p className="mt-5 text-sm text-zinc-500">
          You&apos;ve reached a focused set of names. Try another filter,
          letter, or search to explore further.
        </p>
      )}
    </section>
  );
}
