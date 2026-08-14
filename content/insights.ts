export type Article = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  readTime: string;
};

// Blocked on client input — no articles have been written yet. Do not
// fabricate; Insights renders an honest "coming soon" state while this is
// false. Flip to true once ARTICLES has real, published entries.
export const INSIGHTS_CONFIRMED = false;

export const ARTICLES: Article[] = [];
