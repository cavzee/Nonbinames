"use client";

import vibes from "@/data/vibes.json";
import { useVibe } from "@/context/VibeContext";

export function VibeSelector() {
  const { vibe, setVibe } = useVibe();

  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold">
        ✨ Explore by Vibe
      </h2>

      <div className="flex flex-wrap gap-3">
        {vibes.map((item) => {
          const active = vibe === item;

          return (
            <button
              type="button"
              key={item}
              onClick={() => setVibe(active ? "" : item)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active
                  ? "bg-white text-black"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              {active ? "✓ " : ""}
              {item}
            </button>
          );
        })}
      </div>

      {vibe && (
        <button
          type="button"
          onClick={() => setVibe("")}
          className="mt-5 text-sm text-zinc-400 underline"
        >
          Clear vibe
        </button>
      )}
    </>
  );
}
