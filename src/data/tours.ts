export interface TourReview {
  author: string;
  country: string;
  rating: number;
  comment: string;
}

export interface TourStop {
  day: string;
  title: string;
  description: string;
}

export interface Tour {
  slug: string;
  name: string;
  location: string;
  destinationSlug: string;
  destinationName: string;
  country: string;
  price: number;
  durationDays: number;
  rating: number;
  reviews: number;
  badge: string;
  type: "Adventure" | "Cultural" | "Luxury" | "Nature";
  availability: "Available" | "Limited" | "Sold Out";
  groupSize: string;
  description: string;
  shortDescription: string;
  meetingPoint: string;
  cancellation: string;
  includes: string[];
  excludes: string[];
  itinerary: TourStop[];
  gallery: string[];
  image: string;
  alt: string;
  reviewList: TourReview[];
}

export const tours: Tour[] = [
  {
    slug: "island-hopper-adventure",
    name: "Island Hopper Adventure",
    location: "Bali, Indonesia",
    destinationSlug: "bali",
    destinationName: "Bali",
    country: "Indonesia",
    price: 499,
    durationDays: 5,
    rating: 4.9,
    reviews: 126,
    badge: "Best Seller",
    type: "Adventure",
    availability: "Available",
    groupSize: "Up to 12 travelers",
    description:
      "A fast-moving tropical itinerary built around island viewpoints, beach clubs, waterfalls, and guided boat crossings with a premium small-group feel.",
    shortDescription:
      "Tropical escapes, guided island transfers, and a polished five-day route.",
    meetingPoint: "Sanur Harbor, Bali at 08:30 AM",
    cancellation: "Free cancellation up to 48 hours before departure.",
    includes: [
      "4 nights boutique accommodation",
      "Daily breakfast and one welcome dinner",
      "Private speedboat transfers",
      "English-speaking local guide",
      "Entrance tickets for listed activities",
    ],
    excludes: [
      "International flights",
      "Personal travel insurance",
      "Lunches and premium beverages",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and coastal welcome",
        description:
          "Meet the group in Sanur, transfer to the resort, and settle in before a sunset welcome dinner.",
      },
      {
        day: "Day 2",
        title: "Nusa Penida viewpoints",
        description:
          "Private speedboat to Nusa Penida for panoramic cliffs, coastal stops, and beach time.",
      },
      {
        day: "Day 3",
        title: "Waterfalls and jungle swing",
        description:
          "A guided inland route through waterfalls, rice terraces, and a premium jungle-view lunch.",
      },
      {
        day: "Day 4",
        title: "Island leisure day",
        description:
          "Free morning, optional spa or surf session, then a curated dinner with ocean views.",
      },
      {
        day: "Day 5",
        title: "Departure transfer",
        description:
          "Breakfast, final support, and private transfer coordination for onward travel.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
    ],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    alt: "Traveler walking on a tropical beach during a Bali island tour",
    reviewList: [
      {
        author: "Sarah Wilson",
        country: "United States",
        rating: 5,
        comment: "Very polished itinerary. Great pacing and excellent guide support.",
      },
      {
        author: "Diego Ramos",
        country: "Argentina",
        rating: 4.8,
        comment: "The boat day and waterfall route made this feel much more premium than expected.",
      },
    ],
  },
  {
    slug: "santorini-sunset-tour",
    name: "Santorini Sunset Tour",
    location: "Santorini, Greece",
    destinationSlug: "santorini",
    destinationName: "Santorini",
    country: "Greece",
    price: 699,
    durationDays: 4,
    rating: 4.8,
    reviews: 98,
    badge: "Popular",
    type: "Luxury",
    availability: "Available",
    groupSize: "Up to 10 travelers",
    description:
      "A refined island itinerary focused on caldera views, boutique stays, wine tastings, and golden-hour experiences across the most photogenic corners of Santorini.",
    shortDescription:
      "Caldera hotels, whitewashed villages, and curated sunset experiences.",
    meetingPoint: "Fira Main Square at 11:00 AM",
    cancellation: "Free cancellation up to 72 hours before departure.",
    includes: [
      "3 nights boutique cave hotel",
      "Breakfast and sunset tasting session",
      "Premium transfers during the itinerary",
      "Local destination host",
    ],
    excludes: ["Flights to Greece", "Lunches", "Optional catamaran cruise"],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Fira",
        description: "Check-in, briefing, and an opening walk through the caldera rim.",
      },
      {
        day: "Day 2",
        title: "Oia and sunset route",
        description:
          "A guided architecture and photo route ending with reserved sunset-view seating.",
      },
      {
        day: "Day 3",
        title: "Wine and leisure",
        description:
          "Half-day winery program, free afternoon, and optional sailing upgrade.",
      },
      {
        day: "Day 4",
        title: "Departure support",
        description: "Breakfast and transfer coordination for airport or ferry departure.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    ],
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=80",
    alt: "Santorini white domes during sunset on a guided tour",
    reviewList: [
      {
        author: "Emily Davis",
        country: "Canada",
        rating: 4.9,
        comment: "The hotel and sunset planning were excellent. It felt very premium.",
      },
    ],
  },
  {
    slug: "swiss-alps-explorer",
    name: "Swiss Alps Explorer",
    location: "Interlaken, Switzerland",
    destinationSlug: "swiss-alps",
    destinationName: "Swiss Alps",
    country: "Switzerland",
    price: 899,
    durationDays: 6,
    rating: 4.9,
    reviews: 152,
    badge: "Top Rated",
    type: "Nature",
    availability: "Available",
    groupSize: "Up to 14 travelers",
    description:
      "A mountain circuit of alpine rail journeys, lakefront stays, panoramic hikes, and efficient logistics centered around Interlaken and the Jungfrau region.",
    shortDescription:
      "Alpine train routes, lake views, and glacier-facing hiking stops.",
    meetingPoint: "Interlaken Ost Station at 09:15 AM",
    cancellation: "Free cancellation up to 5 days before departure.",
    includes: [
      "5 nights scenic accommodation",
      "Swiss rail segment passes within itinerary",
      "Daily breakfast",
      "Expert alpine guide",
      "Mountain excursion tickets",
    ],
    excludes: ["Flights", "Winter gear rental", "Travel insurance"],
    itinerary: [
      {
        day: "Day 1",
        title: "Lake arrival and orientation",
        description: "Welcome in Interlaken and afternoon lakefront orientation.",
      },
      {
        day: "Day 2",
        title: "Jungfrau high-altitude route",
        description:
          "A full-day rail and viewpoint journey with glacier panoramas and guided stops.",
      },
      {
        day: "Day 3",
        title: "Valley hike and village lunch",
        description:
          "Moderate guided hiking through alpine villages with scenic lunch reservations.",
      },
      {
        day: "Day 4",
        title: "Flexible exploration day",
        description:
          "Choose between spa, mountain cable car, or an additional guided trail.",
      },
      {
        day: "Day 5",
        title: "Lauterbrunnen and waterfalls",
        description:
          "A curated route through Lauterbrunnen with waterfall stops and local insights.",
      },
      {
        day: "Day 6",
        title: "Departure",
        description: "Breakfast and onward rail support.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    ],
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    alt: "Lake and alpine village view during a Swiss Alps guided tour",
    reviewList: [
      {
        author: "Anna Keller",
        country: "Germany",
        rating: 5,
        comment: "The route planning was excellent. Every transfer felt seamless.",
      },
    ],
  },
  {
    slug: "machu-picchu-journey",
    name: "Machu Picchu Journey",
    location: "Cusco, Peru",
    destinationSlug: "machu-picchu",
    destinationName: "Machu Picchu",
    country: "Peru",
    price: 999,
    durationDays: 5,
    rating: 4.8,
    reviews: 110,
    badge: "Popular",
    type: "Cultural",
    availability: "Limited",
    groupSize: "Up to 16 travelers",
    description:
      "A high-conversion signature itinerary built around Cusco acclimatization, Sacred Valley stops, and a guided Machu Picchu entry with smooth rail logistics.",
    shortDescription:
      "Sacred Valley culture, train logistics, and an iconic Machu Picchu sunrise route.",
    meetingPoint: "Cusco Historic Center at 10:00 AM",
    cancellation: "Non-refundable within 7 days due to permit and rail allocations.",
    includes: [
      "4 nights curated accommodation",
      "Round-trip rail to Aguas Calientes",
      "Machu Picchu guided entry",
      "Breakfasts and selected lunches",
      "Airport pickup",
    ],
    excludes: ["International flights", "Huayna Picchu add-on permit", "Personal expenses"],
    itinerary: [
      {
        day: "Day 1",
        title: "Cusco arrival",
        description: "Airport pickup, acclimatization support, and light city orientation.",
      },
      {
        day: "Day 2",
        title: "Sacred Valley",
        description:
          "A guided route through Pisac and Ollantaytambo with artisan and market stops.",
      },
      {
        day: "Day 3",
        title: "Rail to Aguas Calientes",
        description:
          "Scenic train transfer, hotel check-in, and preparation briefing for the next morning.",
      },
      {
        day: "Day 4",
        title: "Machu Picchu guided visit",
        description:
          "Early entrance, expert-led circuit, and time for personal exploration and photos.",
      },
      {
        day: "Day 5",
        title: "Return to Cusco",
        description: "Rail return and final transfer support.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544737151-6e4b796c44c6?auto=format&fit=crop&w=1200&q=80",
    ],
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80",
    alt: "Aerial view of Machu Picchu on a guided travel experience",
    reviewList: [
      {
        author: "Luis Herrera",
        country: "Mexico",
        rating: 4.8,
        comment: "The logistics were very well handled and the guide quality was strong.",
      },
      {
        author: "Mila Johnson",
        country: "United Kingdom",
        rating: 4.7,
        comment: "Excellent pacing. The Sacred Valley day added real depth to the trip.",
      },
    ],
  },
  {
    slug: "northern-lights-expedition",
    name: "Northern Lights Expedition",
    location: "Tromso, Norway",
    destinationSlug: "tromso",
    destinationName: "Tromso",
    country: "Norway",
    price: 1199,
    durationDays: 4,
    rating: 4.8,
    reviews: 77,
    badge: "Seasonal",
    type: "Nature",
    availability: "Limited",
    groupSize: "Up to 8 travelers",
    description:
      "A winter small-group concept with aurora chasing, thermal gear, expert forecasting, and photography support designed for high-end cold-weather travel.",
    shortDescription:
      "Aurora nights, Arctic logistics, and a premium small-group format.",
    meetingPoint: "Tromso City Center at 04:00 PM",
    cancellation: "Free cancellation up to 7 days before departure.",
    includes: [
      "3 nights accommodation",
      "Aurora chase with guide and driver",
      "Thermal gear rental",
      "Hot drinks and campfire snacks",
    ],
    excludes: ["Flights", "Professional camera rental"],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and gear fitting",
        description: "Hotel check-in, winter briefing, and thermal equipment setup.",
      },
      {
        day: "Day 2",
        title: "First aurora chase",
        description: "Forecast-based route to the best sky conditions in the region.",
      },
      {
        day: "Day 3",
        title: "Arctic leisure and second chase",
        description: "Optional fjord cruise by day and second night expedition.",
      },
      {
        day: "Day 4",
        title: "Departure",
        description: "Morning support and onward travel coordination.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517821099601-95f0d111fa8d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544737151-6e4b796c44c6?auto=format&fit=crop&w=1200&q=80",
    ],
    image:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=900&q=80",
    alt: "Northern lights over snowy trees and cabins in Norway",
    reviewList: [
      {
        author: "John Doe",
        country: "United States",
        rating: 5,
        comment: "The weather call and guide experience were outstanding.",
      },
    ],
  },
  {
    slug: "dubai-city-escape",
    name: "Dubai City Escape",
    location: "Dubai, UAE",
    destinationSlug: "dubai",
    destinationName: "Dubai",
    country: "United Arab Emirates",
    price: 1299,
    durationDays: 7,
    rating: 4.6,
    reviews: 88,
    badge: "Luxury",
    type: "Luxury",
    availability: "Available",
    groupSize: "Up to 14 travelers",
    description:
      "A polished city break combining skyline hotels, desert experiences, private transfers, and a mix of modern landmarks and curated local stops.",
    shortDescription:
      "Skyline hotels, desert experiences, and a clean luxury city itinerary.",
    meetingPoint: "Dubai Marina hotel district at 02:00 PM",
    cancellation: "Free cancellation up to 72 hours before departure.",
    includes: [
      "6 nights accommodation",
      "Airport transfers",
      "Desert safari experience",
      "City highlights pass",
    ],
    excludes: ["Flights", "Visa costs if applicable", "Optional yacht charter"],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Dubai",
        description: "Private transfer and check-in at a central premium hotel.",
      },
      {
        day: "Day 2",
        title: "Modern city landmarks",
        description: "A guided route through downtown, marina, and observation decks.",
      },
      {
        day: "Day 3",
        title: "Desert safari",
        description: "Afternoon desert experience with dinner and evening entertainment.",
      },
      {
        day: "Day 4",
        title: "Free day",
        description: "Optional shopping, beach clubs, or design district exploration.",
      },
      {
        day: "Day 5",
        title: "Old Dubai and creek",
        description: "Culture and market route through the historical districts.",
      },
      {
        day: "Day 6",
        title: "Leisure and final dinner",
        description: "Relaxed final day with premium dinner reservation.",
      },
      {
        day: "Day 7",
        title: "Departure",
        description: "Transfer coordination for airport departure.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526481280695-3c4691f241ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=80",
    ],
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    alt: "Dubai skyline and waterfront during a luxury city tour",
    reviewList: [
      {
        author: "Farah Khan",
        country: "UAE",
        rating: 4.6,
        comment: "Very smooth logistics and a strong mix of luxury and sightseeing.",
      },
    ],
  },
];

export const getTourBySlug = (slug: string) => tours.find((tour) => tour.slug === slug);
