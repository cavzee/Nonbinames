"use client";

type Props = {
  selected: string;
  onSelect: (letter: string) => void;
};

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function LetterFilter({
  selected,
  onSelect,
}: Props) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
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

      <div className="flex flex-wrap gap-1.5">
        {letters.map((letter) => {
          const active = selected === letter;

          return (
            <button
              key={letter}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(active ? "" : letter)}
              className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                active
                  ? "bg-violet-500 text-white"
                  : "border border-zinc-800 bg-zinc-900/60 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </section>
  );
}
