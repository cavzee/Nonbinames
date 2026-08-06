import type { Name } from "@/types/name";

type Props = {
  name: Name;
};

export function NameAbout({ name }: Props) {
  return (
    <section className="mt-12 border-t border-zinc-800 pt-10">
      <h2 className="text-2xl font-semibold">
        About {name.name}
      </h2>

      <p className="mt-4 leading-8 text-zinc-300">
        An editorial description for <strong>{name.name}</strong> will
        appear here. This section will explain the name's background,
        modern usage, symbolism and why someone might choose it.
      </p>
    </section>
  );
}
