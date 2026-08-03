import { getFeaturedNames } from "@/lib";

export default function Home() {
  const featuredNames = getFeaturedNames();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-5xl font-bold tracking-tight">
          NonbiNames
        </h1>

        <p className="mt-4 max-w-xl text-zinc-400">
          Find your perfect identity.
        </p>

        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold">
            Featured Names
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredNames.map((name) => (
              <div
                key={name.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="text-2xl font-semibold">
                  {name.name}
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
