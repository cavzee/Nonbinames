import type { Name } from "@/types/name";
import { Badge } from "./Badge";

type Props = {
  name: Name;
};

export function NameMeta({ name }: Props) {
  return (
    <section className="mt-10 grid gap-8 md:grid-cols-2">

      <div>
        <h2 className="text-lg font-semibold">🗣 Pronunciation</h2>
        <p className="mt-2 text-zinc-300">{name.pronunciation}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">🌍 Origin</h2>
        <p className="mt-2 text-zinc-300">{name.origin}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">🏷 Collections</h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {name.collections.map((collection) => (
            <Badge key={collection}>
              {collection}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold">🌿 Themes</h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {name.themes.map((theme) => (
            <Badge key={theme}>
              {theme}
            </Badge>
          ))}
        </div>
      </div>

    </section>
  );
}
