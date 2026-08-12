import names from "@/data/names";
import type { Name, NameFilters } from "@/types/name";

const allNames = names as Name[];

export function getAllNames() {
  return allNames;
}

export function getFeaturedNames() {
  return allNames.filter((name) => name.featured);
}

export function getNameBySlug(slug: string) {
  return allNames.find((name) => name.slug === slug);
}

export function getNameByName(name: string) {
  return allNames.find(
    (n) => n.name.toLowerCase() === name.toLowerCase()
  );
}

export function filterNames(filters: NameFilters = {}) {
  return allNames.filter((name) => {

    if (
      filters.query &&
      !name.name.toLowerCase().includes(filters.query.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.collection &&
      !name.collections.includes(filters.collection)
    ) {
      return false;
    }

    if (
      filters.theme &&
      !name.themes.includes(filters.theme)
    ) {
      return false;
    }

    if (
      filters.origin &&
      name.origin !== filters.origin
    ) {
      return false;
    }

    if (
      filters.firstLetter &&
      !name.name.startsWith(filters.firstLetter)
    ) {
      return false;
    }

    if (filters.direction && filters.directionType) {
      const direction = filters.direction;

      if (filters.directionType === "theme") {
        if (!name.themes.includes(direction)) {
          return false;
        }
      }

      if (filters.directionType === "collection") {
        if (!name.collections.includes(direction)) {
          return false;
        }
      }

      if (filters.directionType === "origin") {
        if (name.origin !== direction) {
          return false;
        }
      }

      if (filters.directionType === "firstLetter") {
        if (!name.name.startsWith(direction)) {
          return false;
        }
      }
    }

    if (
      filters.length &&
      name.name.length !== filters.length
    ) {
      return false;
    }

    return true;
  });
}

export function getCollectionCount() {
  return new Set(
    allNames.flatMap((name) => name.collections)
  ).size;
}

export function getCollections() {
  const counts = new Map<string, number>();

  for (const name of allNames) {
    for (const collection of name.collections) {
      counts.set(collection, (counts.get(collection) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      if (a.count !== b.count) {
        return b.count - a.count;
      }

      return a.name.localeCompare(b.name);
    });
}

export function getLetters() {
  const counts = new Map<string, number>();

  for (const name of allNames) {
    const letter = name.name.charAt(0).toUpperCase();

    if (letter) {
      counts.set(letter, (counts.get(letter) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([letter, count]) => ({ letter, count }))
    .sort((a, b) => a.letter.localeCompare(b.letter));
}

export function getThemeCount() {
  return new Set(
    allNames.flatMap((name) => name.themes)
  ).size;
}

export function getOriginCount() {
  return new Set(
    allNames.map((name) => name.origin)
  ).size;
}

export type DiscoverySeoType =
  | "collection"
  | "theme"
  | "origin"
  | "length";

export function getDiscoverySeoNames(
  type: DiscoverySeoType,
  value: string
) {
  switch (type) {
    case "collection":
      return filterNames({ collection: value });

    case "theme":
      return filterNames({ theme: value });

    case "origin":
      return filterNames({ origin: value });

    case "length": {
      const length = Number(value);

      if (!Number.isInteger(length) || length < 1) {
        return [];
      }

      return filterNames({ length });
    }
  }
}

export function getDiscoverySeoValues(type: DiscoverySeoType) {
  switch (type) {
    case "collection":
      return getCollections()
        .filter(({ count }) => count >= 10)
        .map(({ name }) => name);

    case "theme": {
      const counts = new Map<string, number>();

      for (const name of allNames) {
        for (const theme of name.themes) {
          counts.set(theme, (counts.get(theme) ?? 0) + 1);
        }
      }

      return Array.from(counts.entries())
        .filter(([, count]) => count >= 8)
        .sort((a, b) => {
          if (a[1] !== b[1]) {
            return b[1] - a[1];
          }

          return a[0].localeCompare(b[0]);
        })
        .map(([theme]) => theme);
    }

    case "origin": {
      const counts = new Map<string, number>();

      for (const name of allNames) {
        counts.set(name.origin, (counts.get(name.origin) ?? 0) + 1);
      }

      return Array.from(counts.entries())
        .filter(([, count]) => count >= 5)
        .sort((a, b) => {
          if (a[1] !== b[1]) {
            return b[1] - a[1];
          }

          return a[0].localeCompare(b[0]);
        })
        .map(([origin]) => origin);
    }

    case "length": {
      const counts = new Map<number, number>();

      for (const name of allNames) {
        const length = name.name.length;
        counts.set(length, (counts.get(length) ?? 0) + 1);
      }

      return Array.from(counts.entries())
        .filter(([, count]) => count >= 10)
        .sort((a, b) => a[0] - b[0])
        .map(([length]) => String(length));
    }
  }
}
