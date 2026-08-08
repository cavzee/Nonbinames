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

        {letters.map((letter) => {
          const active = selected === letter;

          return (
            <button
              key={letter}
              type="button" aria-pressed={active}
              onClick={() => onSelect(active ? "" : letter)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                active
                  ? "bg-violet-500 text-white"
                  : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-violet-500 hover:text-white"
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
