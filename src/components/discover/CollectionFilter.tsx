"use client";

type Props = {
  collections: string[];
  selected: string;
  onSelect: (collection: string) => void;
};

export function CollectionFilter({
  collections,
  selected,
  onSelect,
}: Props) {
  return (
    <section className="mt-12">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Popular Collections
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

      <div className="flex flex-wrap gap-3">

        {collections.map((collection) => {
          const active = selected === collection;

          return (
            <button
              key={collection}
              type="button"
              onClick={() => onSelect(active ? "" : collection)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-violet-500 text-white"
                  : "border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-violet-500 hover:text-white"
              }`}
            >
              {collection}
            </button>
          );
        })}

      </div>

    </section>
  );
}
