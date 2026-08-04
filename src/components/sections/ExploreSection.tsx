import { VibeSelector } from "@/components/vibes/VibeSelector";

export function ExploreSection() {
  return (
    <section className="mt-14">
      <p className="mb-5 text-zinc-400">
        Choose a feeling to discover names.
      </p>

      <VibeSelector />
    </section>
  );
}
