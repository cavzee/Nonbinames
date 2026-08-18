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
      className="inline-flex items-center gap-2 rounded-xl border border-violet-400/40 bg-violet-500/15 px-4 py-2.5 text-sm font-semibold text-violet-200 shadow-[0_0_25px_rgba(139,92,246,0.12)] backdrop-blur transition-all duration-200 hover:border-violet-400/70 hover:bg-violet-500/25 hover:text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.22)] focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      <span aria-hidden="true">↗</span>
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
