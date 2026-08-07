import Link from "next/link";
import { getAllNames } from "@/lib";

export function HiddenGem() {
  const names = getAllNames();

  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = Date.now() - start.getTime();
  const day = Math.floor(diff / 86400000);

  const name = names[day % names.length];

  return (
    <section className="mt-20">
      <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-zinc-900 to-zinc-950 p-10">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
          TODAY'S HIDDEN GEM
        </p>

        <h2 className="mt-4 text-4xl font-black">
          💎 {name.name}
        </h2>

        <p className="mt-3 max-w-xl text-zinc-300">
          {name.about}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {name.collections.map((collection) => (
            <Link
              key={collection}
              href={`/discover?collection=${encodeURIComponent(collection)}`}
              className="rounded-full bg-zinc-800 px-3 py-1 text-sm transition hover:bg-zinc-700"
            >
              {collection}
            </Link>
          ))}
        </div>

        <Link
          href={`/name/${name.slug}`}
          className="mt-8 inline-flex rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400"
        >
          Discover {name.name} →
        </Link>

      </div>
    </section>
  );
}
