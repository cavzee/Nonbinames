import Link from "next/link";

type BadgeProps = {
  children: React.ReactNode;
  href?: string;
};

export function Badge({
  children,
  href,
}: BadgeProps) {
  const className =
    "rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-violet-500 hover:text-white";

  if (href) {
    return (
      <Link
        href={href}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <span className={className}>
      {children}
    </span>
  );
}
