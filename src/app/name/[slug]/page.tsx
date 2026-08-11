import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNameBySlug } from "@/lib";

import { NameHero } from "@/components/names/NameHero";
import { NameMeta } from "@/components/names/NameMeta";
import { NameAbout } from "@/components/names/NameAbout";
import { SimilarNames } from "@/components/names/SimilarNames";
import { SurpriseAgain } from "@/components/names/SurpriseAgain";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;

  const name = getNameBySlug(slug);

  if (!name) {
    return {
      title: "Name Not Found | NonbiNames",
    };
  }

  const title = `${name.name} — Meaning, Origin & Gender-Neutral Name | NonbiNames`;

  const description =
    `Discover ${name.name}, a gender-neutral name meaning "${name.meaning}" with ${name.origin} origins. Explore its pronunciation, themes, inspiration and similar names.`;

  const url = `https://nonbinames.com/name/${name.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "NonbiNames",
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function NamePage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { returnTo } = await searchParams;

  const name = getNameBySlug(slug);

  if (!name) {
    notFound();
  }

  const discoverUrl =
    returnTo && returnTo.startsWith("/discover")
      ? returnTo
      : "/discover";

  const discoverParams = new URLSearchParams(
    discoverUrl.split("?")[1] ?? ""
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-5xl px-8 py-20">
        <Link
          href={discoverUrl}
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          ← Back to Discover
        </Link>

        <div className="mt-10">
          <NameHero name={name} />
        </div>

        <NameMeta name={name} />

        <NameAbout name={name} />

        <SurpriseAgain
          query={discoverParams.get("query") ?? ""}
          collection={discoverParams.get("collection") ?? ""}
          theme={discoverParams.get("theme") ?? ""}
          origin={discoverParams.get("origin") ?? ""}
          firstLetter={discoverParams.get("firstLetter") ?? ""}
          currentNameId={name.id}
          returnTo={discoverUrl}
        />

        <SimilarNames name={name} />
      </section>
    </main>
  );
}
