import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import {
  getAllNames,
  getNameBySlug,
} from "@/lib";

import { NameHero } from "@/components/names/NameHero";
import { NameMeta } from "@/components/names/NameMeta";
import { NameAbout } from "@/components/names/NameAbout";
import { SimilarNames } from "@/components/names/SimilarNames";
import { SurpriseAgain } from "@/components/names/SurpriseAgain";
import { NameBackLink } from "@/components/names/NameBackLink";
import { ShareNameButton } from "@/components/names/ShareNameButton";

export function generateStaticParams() {
  return getAllNames().map((name) => ({
    slug: name.slug,
  }));
}

type Props = {
  params: Promise<{
    slug: string;
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
      images: [
        {
          url: `/name/${name.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${name.name} — NonbiNames`,
        },
      ],
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
}: Props) {
  const { slug } = await params;

  const name = getNameBySlug(slug);

  if (!name) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-5xl px-8 py-20">
        <Suspense fallback={null}>
          <NameBackLink />
        </Suspense>

        <div className="mt-10">
          <NameHero name={name} />

          <div className="mt-6 flex justify-end">
            <ShareNameButton
              name={name.name}
              slug={name.slug}
            />
          </div>
        </div>

        <NameMeta name={name} />

        <NameAbout name={name} />

        <Suspense fallback={null}>
          <SurpriseAgain currentNameId={name.id} />
        </Suspense>

        <SimilarNames name={name} />
      </section>
    </main>
  );
}
