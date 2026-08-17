"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = {
  name: string;
  slug: string;
};

export function ShareNameButton({ name, slug }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleShare(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const url = `${window.location.origin}/name/${slug}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${name} — NonbiNames`,
          text: `Discover ${name} on NonbiNames`,
          url,
        });

        trackEvent("name_share", {
          slug,
          method: "native",
        });

        return;
      }

      await navigator.clipboard.writeText(url);

      setCopied(true);

      trackEvent("name_share", {
        slug,
        method: "copy",
      });

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // The user may simply have cancelled the native share sheet.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Share ${name}`}
      className="absolute right-5 top-5 rounded-xl border border-zinc-700 bg-zinc-950/80 px-3 py-2 text-xs font-medium text-zinc-400 backdrop-blur transition hover:border-violet-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
    >
      {copied ? "Copied" : "Share"}
    </button>
  );
}
