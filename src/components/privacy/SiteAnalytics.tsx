"use client";

import { Analytics } from "@vercel/analytics/next";

const STORAGE_KEY = "nonbinames-analytics-disabled";

export function SiteAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (localStorage.getItem(STORAGE_KEY) === "true") {
          return null;
        }

        return event;
      }}
    />
  );
}
