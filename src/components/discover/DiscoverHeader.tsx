import {
  getAllNames,
  getCollectionCount,
} from "@/lib";

export function DiscoverHeader() {
  const nameCount = getAllNames().length;
  const collectionCount = getCollectionCount();

  return (
    <section className="mb-16">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500">
        DISCOVER
      </p>

      <h1 className="mt-3 text-5xl font-black tracking-tight text-white">
        Explore Every Name
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
        Browse our growing collection of carefully researched gender-neutral
        names. Search instantly, explore by letter, or discover names through
        collections, themes and origins.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <p className="text-3xl font-black text-violet-400">
            {nameCount}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Curated names
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <p className="text-3xl font-black text-emerald-400">
            26
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Letters explored
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <p className="text-3xl font-black text-sky-400">
            {collectionCount}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Collections
          </p>
        </div>
      </div>
    </section>
  );
}
