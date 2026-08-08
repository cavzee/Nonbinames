"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "nonbinames-analytics-disabled";

export function AnalyticsPreference() {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  function toggleAnalytics() {
    const next = !disabled;

    if (next) {
      localStorage.setItem(STORAGE_KEY, "true");
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }

    setDisabled(next);
  }

  return (
    <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-white">Analytics preference</h2>
          <p className="mt-1 text-sm text-zinc-400">
            {disabled
              ? "Analytics is currently disabled for this browser."
              : "Analytics is currently enabled for this browser."}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleAnalytics}
          aria-pressed={!disabled}
          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:border-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          {disabled ? "Enable analytics" : "Disable analytics"}
        </button>
      </div>
    </div>
  );
}
