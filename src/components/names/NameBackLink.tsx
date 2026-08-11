"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function NameBackLink() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  const discoverUrl =
    returnTo && returnTo.startsWith("/discover")
      ? returnTo
      : "/discover";

  return (
    <Link
      href={discoverUrl}
      className="text-sm text-zinc-500 transition hover:text-white"
    >
      ← Back to Discover
    </Link>
  );
}
