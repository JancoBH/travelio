import { useEffect, useState } from "react";
import { BarChart3, ClipboardList, MessageSquareText, Settings, Table2 } from "lucide-react";
import AdminInventoryClient from "./AdminInventoryClient";
import { useTranslations } from "../i18n/react";
import { UiBarChart, UiDonutChart } from "./ui/UiCharts";

type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed";

type RecentBooking = {
  id: string;
  customer: string;
  tour: string;
  date: string;
  amount: string;
  status: BookingStatus;
};

type AdminSection = "overview" | "bookings" | "inventory" | "reviews" | "settings";

const sections: Array<{
  id: AdminSection;
  labelKey: string;
  icon: typeof BarChart3;
}> = [
  { id: "overview", labelKey: "admin.workspace.overview", icon: BarChart3 },
  { id: "bookings", labelKey: "admin.sidebar.bookings", icon: Table2 },
  { id: "inventory", labelKey: "admin.inventoryEyebrow", icon: ClipboardList },
  { id: "reviews", labelKey: "admin.reviewsEyebrow", icon: MessageSquareText },
  { id: "settings", labelKey: "admin.sidebar.settings", icon: Settings },
];

const revenueBars = [
  { label: "Jan", value: 26 },
  { label: "Feb", value: 44 },
  { label: "Mar", value: 31 },
  { label: "Apr", value: 62 },
  { label: "May", value: 39 },
  { label: "Jun", value: 68 },
  { label: "Jul", value: 54 },
  { label: "Aug", value: 73 },
];

const statusItems: Array<{
  status: BookingStatus;
  percent: number;
  color: string;
}> = [
  { status: "confirmed", percent: 48, color: "#1D4ED8" },
  { status: "completed", percent: 25, color: "#22C55E" },
  { status: "pending", percent: 15, color: "#F59E0B" },
  { status: "cancelled", percent: 12, color: "#EF4444" },
];

function statusTone(status: BookingStatus) {
  if (status === "confirmed" || status === "completed") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (status === "pending") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-rose-200 bg-rose-50 text-rose-700";
}

export default function AdminWorkspaceClient({ recentBookings }: { recentBookings: RecentBooking[] }) {
  const { t } = useTranslations();
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "") as AdminSection;
      if (sections.some((section) => section.id === hash)) setActiveSection(hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const setSection = (section: AdminSection) => {
    setActiveSection(section);
    window.history.replaceState(null, "", `#${section}`);
  };

  return (
    <section id={activeSection} className="card-surface scroll-mt-32 p-4 sm:p-5">
      <div className="flex gap-2 overflow-x-auto rounded-[24px] bg-brand-bg p-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => setSection(section.id)}
              className={[
                "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition",
                activeSection === section.id
                  ? "bg-brand-dark text-white"
                  : "text-brand-muted hover:bg-white hover:text-brand-text",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              {t(section.labelKey as any)}
            </button>
          );
        })}
      </div>

      {activeSection === "overview" ? (
        <div className="grid gap-6 p-3 pt-6 sm:p-5 sm:pt-7 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center justify-between">
              <h2 data-i18n="admin.revenueOverview" className="text-2xl font-semibold tracking-tight text-brand-text">
                Revenue Overview
              </h2>
              <span data-i18n="admin.thisMonth" className="rounded-full bg-brand-bg px-3 py-1.5 text-xs font-semibold text-brand-muted">
                This Month
              </span>
            </div>
            <div className="mt-6">
              <UiBarChart data={revenueBars} />
            </div>
          </div>

          <div>
            <h2 data-i18n="admin.bookingStatus" className="text-2xl font-semibold tracking-tight text-brand-text">
              Booking Status
            </h2>
            <div className="mt-6">
              <UiDonutChart
                data={statusItems.map((item) => ({
                  label: t(`status.${item.status}` as any),
                  value: item.percent,
                  color: item.color,
                }))}
              />
            </div>
          </div>
        </div>
      ) : null}

      {activeSection === "bookings" ? (
        <div className="p-3 pt-6 sm:p-5 sm:pt-7">
          <h2 data-i18n="admin.recentBookings" className="text-2xl font-semibold tracking-tight text-brand-text">
            Recent Bookings
          </h2>
          <div className="mt-6 overflow-x-auto rounded-[28px] border border-brand-border">
            <table className="min-w-full bg-white text-left">
              <thead className="bg-brand-bg">
                <tr className="text-sm text-brand-muted">
                  <th className="px-5 py-4 font-medium">{t("admin.table.bookingId")}</th>
                  <th className="px-5 py-4 font-medium">{t("admin.table.customer")}</th>
                  <th className="px-5 py-4 font-medium">{t("table.tour")}</th>
                  <th className="px-5 py-4 font-medium">{t("table.date")}</th>
                  <th className="px-5 py-4 font-medium">{t("table.amount")}</th>
                  <th className="px-5 py-4 font-medium">{t("table.status")}</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-brand-border text-sm text-brand-text">
                    <td className="px-5 py-4 font-semibold">{booking.id}</td>
                    <td className="px-5 py-4">{booking.customer}</td>
                    <td className="px-5 py-4 text-brand-muted">{booking.tour}</td>
                    <td className="px-5 py-4 text-brand-muted">{booking.date}</td>
                    <td className="px-5 py-4 text-brand-muted">{booking.amount}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusTone(booking.status)}`}>
                        {t(`status.${booking.status}` as any)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {activeSection === "inventory" ? (
        <div className="p-3 pt-6 sm:p-5 sm:pt-7">
          <p data-i18n="admin.inventoryEyebrow" className="eyebrow">Tour Inventory</p>
          <h3 data-i18n="admin.inventoryTitle" className="mt-3 text-xl font-semibold tracking-tight text-brand-text">
            Add, edit, and reprice tours
          </h3>
          <p data-i18n="admin.inventoryCopy" className="mt-3 text-sm leading-7 text-brand-muted">
            This block represents the inventory management layer where operators update tours and destination coverage.
          </p>
          <div className="mt-5">
            <AdminInventoryClient />
          </div>
        </div>
      ) : null}

      {activeSection === "reviews" ? (
        <div className="p-3 pt-6 sm:p-5 sm:pt-7">
          <p data-i18n="admin.reviewsEyebrow" className="eyebrow">Reviews</p>
          <h3 data-i18n="admin.reviewsTitle" className="mt-3 text-xl font-semibold tracking-tight text-brand-text">
            Monitor guest sentiment
          </h3>
          <p data-i18n="admin.reviewsCopy" className="mt-3 max-w-3xl text-sm leading-7 text-brand-muted">
            Review quality signals help the admin side feel tied to the storefront and booking lifecycle.
          </p>
        </div>
      ) : null}

      {activeSection === "settings" ? (
        <div className="p-3 pt-6 sm:p-5 sm:pt-7">
          <p data-i18n="account.settingsEyebrow" className="eyebrow">Settings</p>
          <h3 data-i18n="admin.settingsTitle" className="mt-3 text-xl font-semibold tracking-tight text-brand-text">
            Permissions and operations
          </h3>
          <p data-i18n="admin.settingsCopy" className="mt-3 max-w-3xl text-sm leading-7 text-brand-muted">
            Roles, notifications, payment configuration, and internal workflow rules would live here.
          </p>
        </div>
      ) : null}
    </section>
  );
}
