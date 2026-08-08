import Link from "next/link";
import { getNameBySlug } from "@/lib";

const featuredSlugs = [
  "juniper",
  "indigo",
  "atlas",
  "hazel",
  "phoenix",
];

export function FeaturedNames() {
  const names = featuredSlugs
    .map((slug) => getNameBySlug(slug))
    .filter(Boolean);

  return (
    <section className="mt-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
            EDITOR'S PICKS
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Start your journey here
          </h2>
        </div>

        <p className="hidden text-sm text-zinc-500 md:block">
          Five names chosen to showcase the collection
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {names.map((name) => (
          <Link
            key={name!.slug}
            href={`/name/${name!.slug}`}
            className="group rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <div className="mb-5 inline-flex rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-medium text-yellow-300">
              <span aria-hidden="true">★</span> Editor's Pick
            </div>

            <h3 className="text-2xl font-bold">
              {name!.name}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              {name!.meaning}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {name!.collections.slice(0, 2).map((collection) => (
                <span
                  key={collection}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-xs"
                >
                  {collection}
                </span>
              ))}
            </div>

            <div className="mt-8 text-sm font-medium text-violet-400 transition group-hover:translate-x-1 group-focus-visible:translate-x-1">
              Discover →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
