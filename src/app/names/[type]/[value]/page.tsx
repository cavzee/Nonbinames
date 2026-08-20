import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getDiscoverySeoNames,
  getDiscoverySeoValues,
  type DiscoverySeoType,
} from "@/lib";

import { NameCard } from "@/components/names/NameCard";

type Props = {
  params: Promise<{
    type: string;
    value: string;
  }>;
};

const BASE_URL = "https://nonbinames.com";

const MIN_INDEXABLE_NAMES = 5;

const validTypes: DiscoverySeoType[] = [
  "collection",
  "theme",
  "origin",
  "length",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function displayType(type: DiscoverySeoType) {
  switch (type) {
    case "collection":
      return "Collection";
    case "theme":
      return "Theme";
    case "origin":
      return "Origin";
    case "length":
      return "Name Length";
  }
}

function getPageTitle(type: DiscoverySeoType, value: string) {
  switch (type) {
    case "collection":
      return `${value} Gender-Neutral Names`;

    case "theme":
      return `Gender-Neutral Names Inspired by ${value}`;

    case "origin":
      return `Gender-Neutral Names of ${value} Origin`;

    case "length":
      return `${value}-Letter Gender-Neutral Names`;
  }
}

function getDescription(
  type: DiscoverySeoType,
  value: string,
  count: number
) {
  switch (type) {
    case "collection":
      return `Explore ${count} curated ${value.toLowerCase()} gender-neutral and unisex names, with meanings, origins and inspiration.`;

    case "theme":
      return `Explore ${count} gender-neutral names connected to ${value.toLowerCase()}, with meanings, origins and inspiration.`;

    case "origin":
      return `Explore ${count} gender-neutral names with ${value} origins, including meanings, pronunciation and cultural inspiration.`;

    case "length":
      return `Explore ${count} gender-neutral names with exactly ${value} letters, including meanings, origins and inspiration.`;
  }
}

export function generateStaticParams() {
  return validTypes.flatMap((type) =>
    getDiscoverySeoValues(type).map((value) => ({
      type,
      value: slugify(value),
    }))
  );
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { type, value } = await params;

  if (!validTypes.includes(type as DiscoverySeoType)) {
    return {};
  }

  const seoType = type as DiscoverySeoType;
  const values = getDiscoverySeoValues(seoType);

  const actualValue = values.find(
    (candidate) => slugify(candidate) === value
  );

  if (!actualValue) {
    return {};
  }

  const names = getDiscoverySeoNames(seoType, actualValue);
  const title = `${getPageTitle(seoType, actualValue)} | NonbiNames`;
  const description = getDescription(
    seoType,
    actualValue,
    names.length
  );

  const isIndexable = names.length >= MIN_INDEXABLE_NAMES;
  const url = `${BASE_URL}/names/${type}/${value}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    robots: isIndexable
      ? undefined
      : {
          index: false,
          follow: true,
        },

    openGraph: {
      title,
      description,
      url,
      siteName: "NonbiNames",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function DiscoverySeoPage({ params }: Props) {
  const { type, value } = await params;

  if (!validTypes.includes(type as DiscoverySeoType)) {
    notFound();
  }

  const seoType = type as DiscoverySeoType;

  const actualValue = getDiscoverySeoValues(seoType).find(
    (candidate) => slugify(candidate) === value
  );

  if (!actualValue) {
    notFound();
  }

  const names = getDiscoverySeoNames(seoType, actualValue);

  if (names.length === 0) {
    notFound();
  }

  const title = getPageTitle(seoType, actualValue);

  type RelatedGroup = {
    type: DiscoverySeoType;
    label: string;
    values: string[];
  };

  function getRelatedValues(
    type: DiscoverySeoType,
    excludedValue?: string
  ) {
    const counts = new Map<string, number>();

    for (const name of names) {
      const values =
        type === "collection"
          ? name.collections
          : type === "theme"
            ? name.themes
            : type === "origin"
              ? [name.origin]
              : [String(name.name.length)];

      for (const value of values) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
      }
    }

    return Array.from(counts.entries())
      .filter(([value]) => value !== excludedValue)
      .filter(([value]) => {
        const valid = getDiscoverySeoValues(type);
        return valid.some(
          (candidate) => slugify(candidate) === slugify(value)
        );
      })
      .sort((a, b) => {
        if (a[1] !== b[1]) {
          return b[1] - a[1];
        }

        return a[0].localeCompare(b[0]);
      })
      .slice(0, 4)
      .map(([value]) => value);
  }

  const relatedGroups: RelatedGroup[] = (
    [
      ["collection", "Collections"],
      ["theme", "Themes"],
      ["origin", "Origins"],
      ["length", "Name length"],
    ] as const
  )
    .filter(([type]) => type !== seoType)
    .map(([type, label]) => ({
      type,
      label,
      values: getRelatedValues(type, actualValue),
    }))
    .filter((group) => group.values.length > 0);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-8 py-20">
        <div className="mb-10">
          <Link
            href="/discover"
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            ← Back to Discover
          </Link>
        </div>

        <header className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-violet-400">
            {displayType(seoType)}
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight text-white sm:text-6xl">
            {title}
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-zinc-400">
            {getDescription(seoType, actualValue, names.length)}
          </p>
        </header>

        {relatedGroups.length > 0 && (
          <section className="mt-16 border-t border-zinc-800 pt-10">
            <h2 className="text-2xl font-bold text-white">
              Explore related discoveries
            </h2>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGroups.map((group) => (
                <div key={group.type}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    {group.label}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.values.map((relatedValue) => (
                      <Link
                        key={relatedValue}
                        href={`/names/${group.type}/${slugify(relatedValue)}`}
                        className="rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-sm text-zinc-400 transition hover:border-violet-500 hover:text-white"
                      >
                        {relatedValue}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {names.map((name) => (
            <NameCard key={name.id} name={name} />
          ))}
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-8">
          <Link
            href="/discover"
            className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
          >
            Explore all names →
          </Link>
        </div>
      </section>
    </main>
  );
}
