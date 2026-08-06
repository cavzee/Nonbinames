import type { Name } from "@/types/name";
import { Badge } from "./Badge";

type Props = {
  name: Name;
};

export function NameHero({ name }: Props) {
  return (
    <section className="border-b border-zinc-800 pb-12">

      <h1 className="text-6xl font-black tracking-tight">
        {name.name}
      </h1>

      <p className="mt-5 max-w-2xl text-2xl text-zinc-400">
        {name.meaning}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">

        <Badge>{name.origin}</Badge>

        {name.featured && (
          <Badge>⭐ Featured</Badge>
        )}

      </div>

    </section>
  );
}
