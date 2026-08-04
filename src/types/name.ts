export interface Name {
  id: string;
  slug: string;
  name: string;
  meaning: string;
  pronunciation: string;
  origin: string;

  collections: string[];
  themes: string[];
  tags: string[];

  similar: string[];

  featured: boolean;
}

export interface NameFilters {
  query?: string;
  collection?: string;
  theme?: string;
  origin?: string;
  firstLetter?: string;
  length?: number;
}
