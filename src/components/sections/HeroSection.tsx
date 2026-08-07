import Link from "next/link";

const categories = [
  {
    emoji: "🌿",
    title: "Nature",
    description: "Trees, flowers, rivers and landscapes.",
    href: "/discover?collection=Nature",
  },
  {
    emoji: "✨",
    title: "Celestial",
    description: "Stars, constellations and mythology.",
    href: "/discover?collection=Celestial",
  },
  {
    emoji: "🌈",
    title: "Colour",
    description: "Inspired by colour and creativity.",
    href: "/discover?theme=Colour",
  },
  {
    emoji: "🧭",
    title: "Adventure",
    description: "Bold names inspired by journeys and discovery.",
    href: "/discover?collection=Bold",
  },
];

export function HeroSection() {
  return (
    <section className="mt-16">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
          QUICK DISCOVER
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          Explore names by personality and style
        </h2>

        <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
          Every name has been carefully researched with its meaning,
          pronunciation, origin and editorial background. Explore different
          styles and discover something that feels right for you.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-zinc-900"
            >
              <div className="text-3xl">
                {category.emoji}
              </div>

              <h3 className="mt-3 font-semibold text-white">
                {category.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {category.description}
              </p>

              <div className="mt-6 text-sm font-medium text-violet-400 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
                Explore →
              </div>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}
