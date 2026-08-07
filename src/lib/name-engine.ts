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
