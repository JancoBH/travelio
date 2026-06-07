export interface BlogPost {
  slug: string;
  category: "Guides" | "Planning" | "Product";
  title: string;
  excerpt: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "swiss-alps-week",
    category: "Guides",
    title: "How to structure a week in the Swiss Alps",
    excerpt:
      "A practical route for mixing panoramic rail segments, moderate hiking days, and scenic hotel stays without turning the itinerary into logistics overhead.",
    readTime: "6 min read",
  },
  {
    slug: "machu-picchu-booking",
    category: "Planning",
    title: "What to know before booking Machu Picchu",
    excerpt:
      "A better booking page explains permits, acclimatization, train timing, and what travelers should understand before they ever hit confirm.",
    readTime: "5 min read",
  },
  {
    slug: "travel-product-copy",
    category: "Product",
    title: "What makes a travel booking UI feel credible",
    excerpt:
      "This demo is strongest when search, wishlist, booking drafts, and admin state all feel connected instead of behaving like isolated visual blocks.",
    readTime: "4 min read",
  },
];
