import names from "@/data/names.json";
import type { Name } from "@/types/name";

const allNames = names as Name[];

/**
 * Return every name.
 */
export function getAllNames(): Name[] {
  return allNames;
}

/**
 * Return featured names.
 */
export function getFeaturedNames(): Name[] {
  return allNames.filter((name) => name.featured);
}

/**
 * Find a name by its slug.
 */
export function getNameBySlug(slug: string): Name | undefined {
  return allNames.find((name) => name.slug === slug);
}

/**
 * Search names by title.
 */
export function searchNames(query: string): Name[] {
  if (!query.trim()) {
    return allNames;
  }

  const search = query.toLowerCase();

  return allNames.filter((name) =>
    name.name.toLowerCase().includes(search)
  );
}
