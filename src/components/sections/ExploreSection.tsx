import Link from "next/link";
import vibes from "@/data/vibes.json";

export function ExploreSection() {
  return (
    <section className="mt-20">

      <div className="mb-8">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
          EXPLORE
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Browse by personality
        </h2>

        <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
          Every collection has its own mood. Start exploring by the vibe
          that best matches the feeling you're looking for.
        </p>

      </div>

      <div className="flex flex-wrap gap-3">

        {vibes.map((vibe) => (
          <Link
            key={vibe}
            href={`/discover?collection=${encodeURIComponent(vibe)}`}
            className="rounded-full border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm transition hover:border-violet-500 hover:bg-zinc-800 hover:text-white"
          >
            {vibe}
          </Link>
        ))}

      </div>

    </section>
  );
}
