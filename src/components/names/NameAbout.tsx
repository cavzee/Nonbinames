import type { Name } from "@/types/name";

type Props = {
  name: Name;
};

export function NameAbout({ name }: Props) {
  return (
    <section className="mt-16 border-t border-zinc-800 pt-12">

      <h2 className="text-3xl font-bold">
        About {name.name}
      </h2>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
        {name.about}
      </p>

    </section>
  );
}
