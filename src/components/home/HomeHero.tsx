import Link from "next/link";
import { getAllNames } from "@/lib";

const chips = [
  { label: "🌿 Nature", collection: "Nature", classes: "border-emerald-500/20 bg-emerald-500/10" },
  { label: "🌊 Ocean", collection: "Ocean", classes: "border-sky-500/20 bg-sky-500/10" },
  { label: "✨ Celestial", collection: "Celestial", classes: "border-violet-500/20 bg-violet-500/10" },
  { label: "🔥 Bold", collection: "Bold", classes: "border-amber-500/20 bg-amber-500/10" },
  { label: "🌸 Soft", collection: "Soft", classes: "border-pink-500/20 bg-pink-500/10" },
];

export function HomeHero() {
  const names = getAllNames();
  const randomName = names[Math.floor(Math.random() * names.length)];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black px-8 py-20 text-center">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_35%)]" />

      <div className="relative mx-auto max-w-3xl">

        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-zinc-500">
          NONBINAMES
        </p>

        <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
          Find a name
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            that feels like you.
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          Explore more than <strong className="text-white">{names.length}</strong> carefully curated gender-neutral names inspired by nature, mythology, colour, history, adventure and modern identity.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/discover"
            className="rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400"
          >
            Start Discovering →
          </Link>

          <Link
            href={`/name/${randomName.slug}`}
            className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold transition hover:border-white"
          >
            🎲 Surprise Me
          </Link>

        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">

          {chips.map((chip) => (
            <Link
              key={chip.collection}
              href={`/discover?collection=${encodeURIComponent(chip.collection)}`}
              className={`rounded-full border px-4 py-2 text-sm transition hover:scale-105 ${chip.classes}`}
            >
              {chip.label}
            </Link>
          ))}

        </div>

      </div>

    </section>
  );
}
