import {
  getAllNames,
  getCollectionCount,
  getThemeCount,
  getOriginCount,
} from "@/lib";

export function Statistics() {
  const stats = [
    {
      label: "Names",
      value: getAllNames().length,
    },
    {
      label: "Collections",
      value: getCollectionCount(),
    },
    {
      label: "Themes",
      value: getThemeCount(),
    },
    {
      label: "Origins",
      value: getOriginCount(),
    },
  ];

  return (
    <section className="mt-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center"
          >
            <div className="text-4xl font-black text-white">
              {stat.value}
            </div>

            <div className="mt-2 text-sm uppercase tracking-widest text-zinc-400">
              {stat.label}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
