"use client";

import { trackEvent } from "@/lib/analytics";

type Letter = {
  letter: string;
  count: number;
};

type Props = {
  letters: Letter[];
  selected: string;
  onSelect: (letter: string) => void;
};

export function LetterFilter({
  letters,
  selected,
  onSelect,
}: Props) {
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Browse by Letter
        </h2>

        {selected && (
          <button
            type="button"
            onClick={() => onSelect("")}
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {letters.map((item) => {
          const active = selected === item.letter;

          return (
            <button
              key={item.letter}
              type="button"
              aria-pressed={active}
              onClick={() => {
                if (!active) {
                  trackEvent("letter_select", {
                    letter: item.letter,
                    resultCount: item.count,
                  });
                }

                onSelect(active ? "" : item.letter);
              }}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                active
                  ? "bg-violet-500 text-white"
                  : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-violet-500 hover:text-white"
              }`}
            >
              {item.letter}
              <span
                className={`ml-1 ${
                  active ? "text-violet-100" : "text-zinc-600"
                }`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
