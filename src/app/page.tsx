import { HeroSection } from "@/components/sections/HeroSection";
import { ExploreSection } from "@/components/sections/ExploreSection";
import { SearchSection } from "@/components/search/SearchSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">

        <HeroSection />

        <ExploreSection />

        <SearchSection />

      </section>
    </main>
  );
}
