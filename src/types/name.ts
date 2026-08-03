export interface Name {
  // Identity
  id: string;
  slug: string;
  name: string;

  // Information
  meaning: string;
  pronunciation: string;
  origin: string;

  // Discovery
  themes: string[];
  vibes: string[];
  tags: string[];

  // Navigation
  similar: string[];

  // UI
  featured: boolean;
}
