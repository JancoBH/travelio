export type FavoriteKind = "tour" | "destination";

export interface FavoriteItem {
  id: string;
  kind: FavoriteKind;
  slug: string;
  name: string;
  href: string;
  image: string;
  location: string;
  priceLabel: string;
}

export interface SavedBookingDraft {
  id: string;
  tourSlug: string;
  tourName: string;
  location: string;
  travelDate: string;
  travelers: string;
  totalLabel: string;
  savedAt: string;
}

export interface DemoProfile {
  fullName: string;
  email: string;
  phone: string;
  homeAirport: string;
}

export interface DemoSettings {
  emailUpdates: boolean;
  marketingEmails: boolean;
  prioritySupport: boolean;
}

export interface AdminDraftTour {
  id: string;
  name: string;
  destination: string;
  priceFrom: string;
  status: "draft" | "scheduled";
}

export interface DemoReview {
  id: string;
  bookingName: string;
  rating: number;
  note: string;
}

const STORAGE_KEYS = {
  wishlist: "travelio-demo-wishlist",
  savedBookings: "travelio-demo-saved-bookings",
  profile: "travelio-demo-profile",
  settings: "travelio-demo-settings",
  adminDraftTours: "travelio-demo-admin-draft-tours",
  reviews: "travelio-demo-reviews",
} as const;

const EVENT_NAME = "travelio:demo-store-change";

const defaultProfile: DemoProfile = {
  fullName: "John Doe",
  email: "john@travelio.demo",
  phone: "+1 (555) 010-2400",
  homeAirport: "Miami International",
};

const defaultSettings: DemoSettings = {
  emailUpdates: true,
  marketingEmails: false,
  prioritySupport: true,
};

const defaultAdminDraftTours: AdminDraftTour[] = [
  {
    id: "draft-tour-1",
    name: "Lisbon Coastal Discovery",
    destination: "Portugal",
    priceFrom: "$579",
    status: "draft",
  },
];

const isBrowser = () => typeof window !== "undefined";

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!isBrowser()) return;

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: key }));
}

export function subscribeDemoStore(listener: () => void) {
  if (!isBrowser()) return () => undefined;

  const handleChange = () => listener();
  window.addEventListener(EVENT_NAME, handleChange);
  window.addEventListener("storage", handleChange);
  return () => {
    window.removeEventListener(EVENT_NAME, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

export function readWishlist() {
  return readJson<FavoriteItem[]>(STORAGE_KEYS.wishlist, []);
}

export function isWishlisted(id: string) {
  return readWishlist().some((item) => item.id === id);
}

export function toggleWishlist(item: FavoriteItem) {
  const wishlist = readWishlist();
  const exists = wishlist.some((entry) => entry.id === item.id);
  const nextWishlist = exists
    ? wishlist.filter((entry) => entry.id !== item.id)
    : [item, ...wishlist];
  writeJson(STORAGE_KEYS.wishlist, nextWishlist);
  return !exists;
}

export function readSavedBookings() {
  return readJson<SavedBookingDraft[]>(STORAGE_KEYS.savedBookings, []);
}

export function saveBookingDraft(draft: Omit<SavedBookingDraft, "id" | "savedAt">) {
  const savedBookings = readSavedBookings();
  const nextDraft: SavedBookingDraft = {
    ...draft,
    id: `draft-${draft.tourSlug}`,
    savedAt: new Date().toISOString(),
  };
  const nextSavedBookings = [
    nextDraft,
    ...savedBookings.filter((item) => item.tourSlug !== draft.tourSlug),
  ];
  writeJson(STORAGE_KEYS.savedBookings, nextSavedBookings);
}

export function removeSavedBookingDraft(id: string) {
  writeJson(
    STORAGE_KEYS.savedBookings,
    readSavedBookings().filter((item) => item.id !== id),
  );
}

export function readDemoProfile() {
  return readJson<DemoProfile>(STORAGE_KEYS.profile, defaultProfile);
}

export function saveDemoProfile(profile: DemoProfile) {
  writeJson(STORAGE_KEYS.profile, profile);
}

export function readDemoSettings() {
  return readJson<DemoSettings>(STORAGE_KEYS.settings, defaultSettings);
}

export function saveDemoSettings(settings: DemoSettings) {
  writeJson(STORAGE_KEYS.settings, settings);
}

export function readAdminDraftTours() {
  return readJson<AdminDraftTour[]>(STORAGE_KEYS.adminDraftTours, defaultAdminDraftTours);
}

export function addAdminDraftTour(tour: Omit<AdminDraftTour, "id" | "status">) {
  const nextTour: AdminDraftTour = {
    ...tour,
    id: `draft-${tour.name.toLowerCase().replace(/\s+/g, "-")}`,
    status: "draft",
  };
  writeJson(STORAGE_KEYS.adminDraftTours, [nextTour, ...readAdminDraftTours()]);
}

export function updateAdminDraftTourStatus(id: string, status: AdminDraftTour["status"]) {
  writeJson(
    STORAGE_KEYS.adminDraftTours,
    readAdminDraftTours().map((tour) => (tour.id === id ? { ...tour, status } : tour)),
  );
}

export function readDemoReviews() {
  return readJson<DemoReview[]>(STORAGE_KEYS.reviews, []);
}

export function saveDemoReview(review: DemoReview) {
  const reviews = readDemoReviews();
  const nextReviews = [review, ...reviews.filter((item) => item.id !== review.id)];
  writeJson(STORAGE_KEYS.reviews, nextReviews);
}
