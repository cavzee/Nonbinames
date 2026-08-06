import Link from "next/link";
import type { Name } from "@/types/name";

type Props = {
  name: Name;
};

export function NameCard({ name }: Props) {
  return (
    <Link href={`/name/${name.slug}`}>
      <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700 hover:bg-zinc-800">
        <h3 className="text-2xl font-semibold">
          {name.name}
        </h3>

        <p className="mt-2 text-zinc-400">
          {name.meaning}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {name.themes.map((theme) => (
            <span
              key={theme}
              className="rounded-full bg-zinc-800 px-3 py-1 text-xs"
            >
              {theme}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
