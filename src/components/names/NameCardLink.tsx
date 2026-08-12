"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type Props = {
  href: string;
  slug: string;
  featured: boolean;
  className?: string;
  children: React.ReactNode;
};

export function NameCardLink({
  href,
  slug,
  featured,
  className,
  children,
}: Props) {
  return (
    <Link
      href={href}
      onClick={() => {
        trackEvent("name_view", {
          slug,
          featured,
        });
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
