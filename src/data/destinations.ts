export interface DestinationFaq {
  question: string;
  answer: string;
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  priceFrom: number;
  toursCount: number;
  image: string;
  heroImage: string;
  alt: string;
  blurb: string;
  overview: string;
  bestTime: string;
  travelTips: string[];
  faq: DestinationFaq[];
}

export const destinations: Destination[] = [
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    priceFrom: 499,
    toursCount: 8,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
    alt: "Temple and tropical landscape in Bali, Indonesia",
    blurb: "Island culture, layered rice fields, and premium coastal escapes.",
    overview:
      "Bali works well for portfolio travel products because it mixes strong imagery with diverse itinerary types: wellness, island hopping, culture, and beach leisure.",
    bestTime: "April to October for dry-season conditions and cleaner coastal logistics.",
    travelTips: [
      "Base your itinerary around realistic transfer times between south Bali and inland Ubud.",
      "Early departures improve the waterfall and viewpoint experience noticeably.",
      "Premium stays perform better visually when paired with activity-heavy day plans.",
    ],
    faq: [
      {
        question: "Is Bali suitable for first-time international travelers?",
        answer: "Yes. It is easy to package with guided transfers, flexible activity pacing, and a strong hospitality base.",
      },
    ],
  },
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    priceFrom: 699,
    toursCount: 6,
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1600&q=80",
    alt: "Whitewashed buildings overlooking the sea in Santorini, Greece",
    blurb: "Caldera views, boutique stays, and sunset-driven itineraries.",
    overview:
      "Santorini adds an unmistakably premium visual tone to the platform and supports romantic, luxury, and short-stay itineraries.",
    bestTime: "May to early October for warm weather and smooth ferry connectivity.",
    travelTips: [
      "Use Oia and Fira selectively to avoid overloading the itinerary with repetitive viewpoints.",
      "Sunset experiences convert better when packaged with dining or sailing.",
    ],
    faq: [
      {
        question: "How long should a Santorini itinerary be?",
        answer: "Three to four nights usually gives enough time for premium stays, one major excursion, and sunset programming.",
      },
    ],
  },
  {
    slug: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    priceFrom: 899,
    toursCount: 7,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    alt: "Snow-capped mountains in the Swiss Alps, Switzerland",
    blurb: "Rail-linked mountains, glacier views, and polished nature travel.",
    overview:
      "The Swiss Alps help position the brand as premium and reliable because the destination naturally fits scenic transport, clean structure, and higher-value packages.",
    bestTime: "June to September for hiking itineraries, December to March for winter programs.",
    travelTips: [
      "Keep altitude-heavy days separated for better traveler comfort.",
      "Leverage rail passes as a premium convenience, not just a transport detail.",
    ],
    faq: [
      {
        question: "Is the Swiss Alps category better for summer or winter tours?",
        answer: "Both work, but the product messaging should be different. Summer sells exploration; winter sells atmosphere and seasonal activities.",
      },
    ],
  },
  {
    slug: "machu-picchu",
    name: "Machu Picchu",
    country: "Peru",
    priceFrom: 999,
    toursCount: 5,
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=900&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=80",
    alt: "Ancient ruins and mountain landscape at Machu Picchu, Peru",
    blurb: "Iconic heritage travel with high-intent cultural demand.",
    overview:
      "Machu Picchu gives the platform a flagship long-haul destination with clear storytelling around routes, permits, trains, and guided access.",
    bestTime: "April to October for drier conditions and clearer views.",
    travelTips: [
      "Build acclimatization into the flow instead of treating it as optional.",
      "Rail and entry permit messaging should be explicit for user trust.",
    ],
    faq: [
      {
        question: "Do travelers need to prepare for altitude?",
        answer: "Yes. Good product design should communicate acclimatization support and realistic activity pacing from the start.",
      },
    ],
  },
  {
    slug: "tromso",
    name: "Tromso",
    country: "Norway",
    priceFrom: 1199,
    toursCount: 4,
    image:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=900&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1600&q=80",
    alt: "Northern lights over Arctic landscape in Tromso, Norway",
    blurb: "Arctic sky-chasing with premium cold-weather logistics.",
    overview:
      "Tromso adds seasonality and a colder palette to the product suite while showing the platform can handle more technical travel planning.",
    bestTime: "Late September to March for aurora potential.",
    travelTips: [
      "Use forecast-based messaging to set expectations correctly.",
      "Cold-weather gear and transport details should be explicit in the purchase flow.",
    ],
    faq: [
      {
        question: "Can the northern lights be guaranteed?",
        answer: "No. Stronger UX comes from explaining forecasting, route flexibility, and trip quality beyond the aurora itself.",
      },
    ],
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    priceFrom: 1299,
    toursCount: 5,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1526481280695-3c4691f241ac?auto=format&fit=crop&w=1600&q=80",
    alt: "Dubai skyline and waterfront",
    blurb: "Modern skyline itineraries with luxury hospitality and desert add-ons.",
    overview:
      "Dubai introduces a more urban and luxury-heavy offering, useful for showing the platform can cover city breaks in addition to nature-led tours.",
    bestTime: "November to March for more comfortable daytime temperatures.",
    travelTips: [
      "Mix city, desert, and leisure content to avoid a one-note itinerary.",
      "Luxury city products benefit from a sharper hotel and transfer presentation.",
    ],
    faq: [
      {
        question: "Is Dubai better for short or long itineraries?",
        answer: "Both can work, but four to seven days is usually the strongest range for a portfolio booking product.",
      },
    ],
  },
];

export const getDestinationBySlug = (slug: string) =>
  destinations.find((destination) => destination.slug === slug);
