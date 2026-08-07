import type { Name } from "@/types/name";
import { Badge } from "./Badge";

type Props = {
  name: Name;
};

export function NameMeta({ name }: Props) {
  return (
    <section className="mt-14 grid gap-10 border-b border-zinc-800 pb-14 md:grid-cols-2">

      <div>
        <h2 className="text-lg font-semibold text-white">
          🗣 Pronunciation
        </h2>

        <p className="mt-3 text-lg text-zinc-300">
          {name.pronunciation}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          🌍 Origin
        </h2>

        <p className="mt-3 text-lg text-zinc-300">
          {name.origin}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          🏷 Collections
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          {name.collections.map((collection) => (
            <Badge key={collection}>
              {collection}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          🌿 Themes
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
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
