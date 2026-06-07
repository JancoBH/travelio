import { useEffect, useMemo, useState } from "react";
import { resolveUrl } from "../lib/url";
import {
  removeSavedBookingDraft,
  saveDemoProfile,
  saveDemoReview,
  saveDemoSettings,
  type DemoProfile,
  type DemoSettings,
} from "../lib/demo-store";
import {
  useDemoProfile,
  useDemoReviews,
  useDemoSettings,
  useSavedBookings,
  useWishlist,
} from "../lib/use-demo-store";
import { useTranslations } from "../i18n/react";
import type { UpcomingBooking, PastBooking, BookingStatus } from "../data/dashboard";

type AccountSection = "upcoming" | "history" | "saved-plans" | "wishlist" | "reviews" | "profile" | "settings";

const accountSections: Array<{ id: AccountSection; labelKey: string }> = [
  { id: "upcoming", labelKey: "account.upcoming" },
  { id: "history", labelKey: "account.pastEyebrow" },
  { id: "saved-plans", labelKey: "account.savedPlansEyebrow" },
  { id: "wishlist", labelKey: "account.wishlistEyebrow" },
  { id: "reviews", labelKey: "account.reviewsEyebrow" },
  { id: "profile", labelKey: "account.profileEyebrow" },
  { id: "settings", labelKey: "account.settingsEyebrow" },
];

function statusTone(status: BookingStatus) {
  if (status === "confirmed" || status === "completed") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "pending") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-rose-200 bg-rose-50 text-rose-700";
}

export default function AccountWorkspaceClient({
  upcomingBookings,
  pastBookings,
}: {
  upcomingBookings: UpcomingBooking[];
  pastBookings: PastBooking[];
}) {
  const { t } = useTranslations();
  const wishlist = useWishlist();
  const savedPlans = useSavedBookings();
  const storedProfile = useDemoProfile();
  const storedSettings = useDemoSettings();
  const reviews = useDemoReviews();
  const [activeSection, setActiveSection] = useState<AccountSection>("upcoming");
  const [profile, setProfile] = useState<DemoProfile>(storedProfile);
  const [settings, setSettings] = useState<DemoSettings>(storedSettings);
  const [draftReview, setDraftReview] = useState({ id: "", rating: 5, note: "" });

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "") as AccountSection;
      if (accountSections.some((section) => section.id === hash)) setActiveSection(hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => setProfile(storedProfile), [storedProfile]);
  useEffect(() => setSettings(storedSettings), [storedSettings]);

  const reviewMap = useMemo(() => new Map(reviews.map((review) => [review.id, review])), [reviews]);

  const setSection = (section: AccountSection) => {
    setActiveSection(section);
    window.history.replaceState(null, "", `#${section}`);
  };

  return (
    <section id={activeSection} className="card-surface scroll-mt-32 p-4 sm:p-5">
      <div className="flex gap-2 overflow-x-auto rounded-3xl bg-brand-bg p-2">
        {accountSections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setSection(section.id)}
            className={[
              "shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition",
              activeSection === section.id ? "bg-brand-dark text-white" : "text-brand-muted hover:bg-white hover:text-brand-text",
            ].join(" ")}
          >
            {t(section.labelKey as any)}
          </button>
        ))}
      </div>

      {activeSection === "upcoming" ? (
        <div className="p-3 pt-6 sm:p-5 sm:pt-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">{t("account.upcoming")}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-brand-text">{t("account.nextTrips")}</h2>
            </div>
            <a href={resolveUrl("/booking/confirmation")} className="btn-secondary">{t("account.latest")}</a>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {upcomingBookings.map((trip) => (
              <article key={trip.name} className="overflow-hidden rounded-[28px] border border-brand-border bg-white">
                <img src={trip.image} alt={trip.name} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold tracking-tight text-brand-text">{trip.name}</h3>
                  <p className="mt-2 text-sm text-brand-muted">{trip.location}</p>
                  <div className="mt-4 space-y-2 text-sm text-brand-muted">
                    <p>{trip.date}</p>
                    <p>{trip.duration}</p>
                  </div>
                  <a href={resolveUrl("/booking/confirmation")} className="btn-primary mt-5 w-full">{t("account.viewDetails")}</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {activeSection === "history" ? (
        <div className="p-3 pt-6 sm:p-5 sm:pt-7">
          <p className="eyebrow">{t("account.pastEyebrow")}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-brand-text">{t("account.historyTitle")}</h2>
          <div className="mt-6 overflow-x-auto rounded-[28px] border border-brand-border">
            <table className="min-w-full bg-white text-left">
              <thead className="bg-brand-bg">
                <tr className="text-sm text-brand-muted">
                  <th className="px-5 py-4 font-medium">{t("table.tour")}</th>
                  <th className="px-5 py-4 font-medium">{t("table.location")}</th>
                  <th className="px-5 py-4 font-medium">{t("table.date")}</th>
                  <th className="px-5 py-4 font-medium">{t("table.amount")}</th>
                  <th className="px-5 py-4 font-medium">{t("table.status")}</th>
                </tr>
              </thead>
              <tbody>
                {pastBookings.map((booking) => (
                  <tr key={`${booking.name}-${booking.date}`} className="border-t border-brand-border text-sm text-brand-text">
                    <td className="px-5 py-4 font-semibold">{booking.name}</td>
                    <td className="px-5 py-4 text-brand-muted">{booking.location}</td>
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

      {activeSection === "saved-plans" ? (
        <div className="p-3 pt-6 sm:p-5 sm:pt-7">
          <p className="eyebrow">{t("account.savedPlansEyebrow")}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">{t("account.savedPlansTitle")}</h3>
          {savedPlans.length ? (
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {savedPlans.map((plan) => (
                <div key={plan.id} className="rounded-3xl bg-brand-bg p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-brand-text">{plan.tourName}</div>
                      <div className="mt-1 text-sm text-brand-muted">{plan.location}</div>
                    </div>
                    <button type="button" onClick={() => removeSavedBookingDraft(plan.id)} className="text-sm font-semibold text-brand-muted transition hover:text-rose-600">
                      {t("common.remove")}
                    </button>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-brand-muted">
                    <div>{plan.travelDate}</div>
                    <div>{plan.travelers}</div>
                    <div>{plan.totalLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              {t("account.savedPlansEmpty")}
            </p>
          )}
        </div>
      ) : null}

      {activeSection === "wishlist" ? (
        <div className="p-3 pt-6 sm:p-5 sm:pt-7">
          <p className="eyebrow">{t("account.wishlistEyebrow")}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">{t("account.wishlistTitle")}</h3>
          {wishlist.length ? (
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {wishlist.map((item) => (
                <a key={item.id} href={item.href} className="flex items-center gap-4 rounded-3xl bg-brand-bg p-4 transition hover:bg-slate-100">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" />
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-brand-text">{item.name}</div>
                    <div className="mt-1 text-sm text-brand-muted">{item.location}</div>
                  </div>
                  <div className="ml-auto text-sm font-semibold text-brand-teal">{item.priceLabel}</div>
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              {t("account.wishlistEmpty")}
            </p>
          )}
        </div>
      ) : null}

      {activeSection === "reviews" ? (
        <div className="p-3 pt-6 sm:p-5 sm:pt-7">
          <p className="eyebrow">{t("account.reviewsEyebrow")}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">{t("account.reviewsTitle")}</h3>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {pastBookings.map((booking) => {
              const reviewId = `review:${booking.name}`;
              const savedReview = reviewMap.get(reviewId);
              const isEditing = draftReview.id === reviewId;

              return (
                <div key={reviewId} className="rounded-3xl bg-brand-bg p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-brand-text">{booking.name}</div>
                      <div className="mt-1 text-sm text-brand-muted">{booking.location} - {booking.date}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDraftReview({ id: reviewId, rating: savedReview?.rating ?? 5, note: savedReview?.note ?? "" })}
                      className="text-sm font-semibold text-brand-teal"
                    >
                      {savedReview ? t("account.editReview") : t("account.writeReview")}
                    </button>
                  </div>
                  {savedReview && !isEditing ? <p className="mt-3 text-sm leading-7 text-brand-muted">{savedReview.rating}/5 - {savedReview.note}</p> : null}
                  {isEditing ? (
                    <div className="mt-4 space-y-3">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={draftReview.rating}
                        onChange={(event) => setDraftReview((current) => ({ ...current, rating: Math.min(5, Math.max(1, Number(event.target.value) || 1)) }))}
                        className="field-box field-control"
                      />
                      <textarea
                        value={draftReview.note}
                        onChange={(event) => setDraftReview((current) => ({ ...current, note: event.target.value }))}
                        placeholder={t("account.reviewPlaceholder")}
                        className="field-box field-control h-auto min-h-24 py-3"
                      />
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            saveDemoReview({ id: reviewId, bookingName: booking.name, rating: draftReview.rating, note: draftReview.note.trim() });
                            setDraftReview({ id: "", rating: 5, note: "" });
                          }}
                          className="btn-primary"
                        >
                          {t("common.save")}
                        </button>
                        <button type="button" onClick={() => setDraftReview({ id: "", rating: 5, note: "" })} className="btn-secondary">
                          {t("common.cancel")}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {activeSection === "profile" ? (
        <div className="max-w-2xl p-3 pt-6 sm:p-5 sm:pt-7">
          <p className="eyebrow">{t("account.profileEyebrow")}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">{t("account.profileTitle")}</h3>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-brand-text">
              {t("account.profile.fullName")}
              <input
                type="text"
                value={profile.fullName}
                onChange={(event) => setProfile((current) => ({ ...current, fullName: event.target.value }))}
                className="field-box field-control"
                placeholder="John Carter"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-brand-text">
              {t("account.profile.email")}
              <input
                type="email"
                value={profile.email}
                onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))}
                className="field-box field-control"
                placeholder="john@example.com"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-brand-text">
              {t("account.profile.phone")}
              <input
                type="tel"
                value={profile.phone}
                onChange={(event) => setProfile((current) => ({ ...current, phone: event.target.value }))}
                className="field-box field-control"
                placeholder="+1 555 0148"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-brand-text">
              {t("account.profile.homeBase")}
              <input
                type="text"
                value={profile.homeAirport}
                onChange={(event) => setProfile((current) => ({ ...current, homeAirport: event.target.value }))}
                className="field-box field-control"
                placeholder="New York"
              />
            </label>
          </div>
          <div className="mt-5 flex justify-end">
            <button type="button" onClick={() => saveDemoProfile(profile)} className="btn-primary">{t("common.save")}</button>
          </div>
        </div>
      ) : null}

      {activeSection === "settings" ? (
        <div className="max-w-2xl p-3 pt-6 sm:p-5 sm:pt-7">
          <p className="eyebrow">{t("account.settingsEyebrow")}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">{t("account.settingsTitle")}</h3>
          <div className="mt-5 space-y-3">
            {[
              { key: "emailUpdates", label: t("account.setting.emailUpdates") },
              { key: "marketingEmails", label: t("account.setting.marketingEmails") },
              { key: "prioritySupport", label: t("account.setting.prioritySupport") },
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between rounded-3xl bg-brand-bg px-4 py-4 text-sm font-medium text-brand-text">
                <span>{item.label}</span>
                <input
                  type="checkbox"
                  checked={settings[item.key as keyof DemoSettings]}
                  onChange={(event) => setSettings((current) => ({ ...current, [item.key]: event.target.checked }))}
                  className="h-4 w-4 rounded border-brand-border text-brand-teal focus:ring-brand-teal"
                />
              </label>
            ))}
          </div>
          <button type="button" onClick={() => saveDemoSettings(settings)} className="btn-primary mt-5">{t("common.save")}</button>
        </div>
      ) : null}
    </section>
  );
}
