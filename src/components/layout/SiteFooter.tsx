import Link from "next/link";

const linkClass =
  "transition hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 NonbiNames</p>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-5 gap-y-2"
        >
          <Link href="/about" className={linkClass}>
            About
          </Link>

          <Link href="/methodology" className={linkClass}>
            Methodology
          </Link>

          <Link href="/contact" className={linkClass}>
            Contact
          </Link>

          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
