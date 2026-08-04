"use client";

import vibes from "@/data/vibes.json";
import { useVibe } from "@/context/VibeContext";

export function VibeSelector() {
  const { vibe, setVibe } = useVibe();

  console.log("Current vibe:", vibe);

  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold">
        ✨ Explore by Vibe
      </h2>

      <p className="mb-4 text-green-400">
        Current vibe: {vibe || "None"}
      </p>

      <div className="flex flex-wrap gap-3">
        {vibes.map((item) => {
          const active = vibe === item;

          return (
            <button
              type="button"
              key={item}
              onClick={() => {
                console.log("Clicked:", item);
                setVibe(active ? "" : item);
              }}
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
    </>
  );
}
