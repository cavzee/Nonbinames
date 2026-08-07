import Link from "next/link";
import type { Name } from "@/types/name";
import { getNameByName } from "@/lib";
import { Badge } from "./Badge";

type Props = {
  name: Name;
};

export function SimilarNames({ name }: Props) {
  const similarNames = (name.similar ?? [])
    .map((similarName) => getNameByName(similarName))
    .filter((n): n is Name => n !== undefined);

  if (similarNames.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-zinc-800 pt-12">
      <h2 className="text-3xl font-bold">
        Similar Names
      </h2>

      <p className="mt-2 text-zinc-400">
        Discover names with a similar style or feeling.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {similarNames.map((similar) => (
          <Link
            key={similar.id}
            href={`/name/${similar.slug}`}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-600 hover:bg-zinc-800"
          >
            <h3 className="text-2xl font-semibold">
              {similar.name}
            </h3>

            <p className="mt-2 text-zinc-400">
              {similar.meaning}
            </p>

            <div className="mt-4">
              <Badge>{similar.origin}</Badge>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
