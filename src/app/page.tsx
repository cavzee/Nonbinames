import { SearchSection } from "@/components/search/SearchSection";
import { VibeSelector } from "@/components/vibes/VibeSelector";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-5xl font-bold tracking-tight">
          NonbiNames
        </h1>

        <p className="mt-4 text-zinc-400">
          Find your perfect identity.
        </p>

        <SearchSection />

        <VibeSelector />
      </section>
    </main>
  );
}
