export type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed";

export interface RecentBooking {
  id: string;
  customer: string;
  tour: string;
  date: string;
  amount: string;
  status: BookingStatus;
}

export interface UpcomingBooking {
  name: string;
  location: string;
  date: string;
  duration: string;
  image: string;
}

export interface PastBooking {
  name: string;
  location: string;
  date: string;
  amount: string;
  status: BookingStatus;
}

export const dashboardStats = [
  { label: "Total Bookings", labelKey: "admin.stats.totalBookings", value: "1,248", delta: "+12.8%" },
  { label: "Revenue", labelKey: "admin.stats.revenue", value: "$32,450", delta: "+8.2%" },
  { label: "Active Tours", labelKey: "admin.stats.activeTours", value: "86", delta: "+5.4%" },
  { label: "Users", labelKey: "admin.stats.users", value: "2,543", delta: "+11.1%" },
];

export const userHighlights = [
  { label: "Upcoming Trips", labelKey: "account.stats.upcomingTrips", value: "2" },
  { label: "Past Trips", labelKey: "account.stats.pastTrips", value: "5" },
  { label: "Wishlist", labelKey: "account.stats.wishlist", value: "8" },
  { label: "Reviews", labelKey: "account.stats.reviews", value: "12" },
];

export const recentBookings: RecentBooking[] = [
  {
    id: "TRV-78452391",
    customer: "John Doe",
    tour: "Machu Picchu Journey",
    date: "May 20, 2026",
    amount: "$1,342",
    status: "confirmed",
  },
  {
    id: "TRV-78453292",
    customer: "Sarah Wilson",
    tour: "Swiss Alps Explorer",
    date: "Jun 15, 2026",
    amount: "$1,098",
    status: "pending",
  },
  {
    id: "TRV-78454903",
    customer: "Mila Johnson",
    tour: "Santorini Sunset Tour",
    date: "Jul 10, 2026",
    amount: "$698",
    status: "confirmed",
  },
  {
    id: "TRV-78455794",
    customer: "Emily Davis",
    tour: "Bali Paradise Escape",
    date: "Aug 5, 2026",
    amount: "$499",
    status: "cancelled",
  },
];

export const upcomingBookings: UpcomingBooking[] = [
  {
    name: "Machu Picchu Journey",
    location: "Peru",
    date: "May 20 - May 24, 2026",
    duration: "5 Days / 4 Nights",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Swiss Alps Explorer",
    location: "Switzerland",
    date: "Jun 15 - Jun 20, 2026",
    duration: "6 Days / 5 Nights",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
  },
];

export const pastBookings: PastBooking[] = [
  {
    name: "Santorini Sunset Tour",
    location: "Greece",
    date: "Mar 10 - Mar 14, 2026",
    amount: "$698",
    status: "completed",
  },
  {
    name: "Bali Paradise Escape",
    location: "Indonesia",
    date: "Jan 5 - Jan 10, 2026",
    amount: "$499",
    status: "completed",
  },
];
