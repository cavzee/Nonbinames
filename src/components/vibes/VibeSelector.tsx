"use client";

import { useState } from "react";
import vibes from "@/data/vibes.json";

export function VibeSelector() {
  const [selected, setSelected] = useState("");

  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold">
        ✨ Explore by Vibe
      </h2>

      <div className="flex flex-wrap gap-3">
        {vibes.map((vibe) => (
          <button
            key={vibe}
            onClick={() => setSelected(vibe)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              selected === vibe
                ? "bg-white text-black"
                : "bg-zinc-900 hover:bg-zinc-800"
            }`}
          >
            {vibe}
          </button>
        ))}
      </div>
    </>
  );
}
