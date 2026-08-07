import Link from "next/link";
import { notFound } from "next/navigation";
import { getNameBySlug } from "@/lib";
import { NameHero } from "@/components/names/NameHero";
import { NameMeta } from "@/components/names/NameMeta";
import { NameAbout } from "@/components/names/NameAbout";
import { SimilarNames } from "@/components/names/SimilarNames";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NamePage({ params }: Props) {
  const { slug } = await params;

  const name = getNameBySlug(slug);

  if (!name) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-5xl px-8 py-20">

        <Link
          href="/"
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          ← Back to Discover
        </Link>

        <div className="mt-10">
          <NameHero name={name} />
        </div>

        <NameMeta name={name} />

        <NameAbout name={name} />

        <SimilarNames name={name} />

      </section>
    </main>
  );
}
