export interface Name {
  id: string;
  slug: string;
  name: string;
  meaning: string;
  pronunciation: string;
  origin: string;

  themes: string[];
  vibes: string[];
  tags: string[];

  similar: string[];

  featured: boolean;
}

export interface NameFilters {
  query?: string;
  vibe?: string;
  theme?: string;
  origin?: string;
  firstLetter?: string;
  length?: number;
}
