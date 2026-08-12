import type { Name } from "@/types/name";

import { NameCardLink } from "./NameCardLink";

type Props = {
  name: Name;
  returnTo?: string;
};

function accent(theme: string) {
  switch (theme) {
    case "Nature":
    case "Trees":
    case "Plants":
    case "Forest":
      return "hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.12)]";

    case "Ocean":
    case "Water":
      return "hover:border-sky-500/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.12)]";

    case "Sky":
    case "Space":
    case "Celestial":
      return "hover:border-violet-500/40 hover:shadow-[0_0_35px_rgba(168,85,247,0.12)]";

    case "Colour":
      return "hover:border-pink-500/40 hover:shadow-[0_0_35px_rgba(236,72,153,0.12)]";

    case "Fire":
      return "hover:border-orange-500/40 hover:shadow-[0_0_35px_rgba(249,115,22,0.12)]";

    default:
      return "hover:border-zinc-600";
  }
}

export function NameCard({ name, returnTo }: Props) {
  const href = returnTo
    ? `/name/${name.slug}?returnTo=${encodeURIComponent(returnTo)}`
    : `/name/${name.slug}`;

  return (
    <NameCardLink
      href={href}
      slug={name.slug}
      featured={name.featured}
      className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      <article
        className={`relative h-full rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 transition-all duration-300 hover:-translate-y-1 ${accent(
          name.themes[0]
        )}`}
      >
        {name.featured && (
          <div className="mb-5 inline-flex rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-medium text-yellow-300">
            <span aria-hidden="true">★</span> Featured
          </div>
        )}

        <div className="absolute right-6 top-6 text-xs uppercase tracking-wider text-zinc-500">
          {name.origin}
        </div>

        <h3 className="text-2xl font-bold tracking-tight">
          {name.name}
        </h3>

        <p className="mt-2 text-zinc-400">
          {name.meaning}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {name.themes.map((theme) => (
            <span
              key={theme}
              className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
            >
              {theme}
            </span>
          ))}
        </div>

        <div className="mt-8 text-sm font-medium text-violet-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100">
          Discover →
        </div>
      </article>
    </NameCardLink>
  );
}
