import { useEffect, useState } from "react";
import {
  readAdminDraftTours,
  readDemoProfile,
  readDemoReviews,
  readDemoSettings,
  readSavedBookings,
  readWishlist,
  subscribeDemoStore,
} from "./demo-store";

function useStoreValue<T>(read: () => T, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(read());
    return subscribeDemoStore(() => setValue(read()));
  }, [read]);

  return value;
}

export function useWishlist() {
  return useStoreValue(readWishlist, []);
}

export function useSavedBookings() {
  return useStoreValue(readSavedBookings, []);
}

export function useDemoProfile() {
  return useStoreValue(readDemoProfile, {
    fullName: "John Doe",
    email: "john@travelio.demo",
    phone: "+1 (555) 010-2400",
    homeAirport: "Miami International",
  });
}

export function useDemoSettings() {
  return useStoreValue(readDemoSettings, {
    emailUpdates: true,
    marketingEmails: false,
    prioritySupport: true,
  });
}

export function useAdminDraftTours() {
  return useStoreValue(readAdminDraftTours, [
    {
      id: "draft-tour-1",
      name: "Lisbon Coastal Discovery",
      destination: "Portugal",
      priceFrom: "$579",
      status: "draft",
    },
  ]);
}

export function useDemoReviews() {
  return useStoreValue(readDemoReviews, []);
}
