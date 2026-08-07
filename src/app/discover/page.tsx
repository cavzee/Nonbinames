import { Suspense } from "react";
import { DiscoverClient } from "@/components/discover/DiscoverClient";

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Suspense fallback={null}>
        <DiscoverClient />
      </Suspense>
    </main>
  );
}
