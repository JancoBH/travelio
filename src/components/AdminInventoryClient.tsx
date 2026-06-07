import { useState } from "react";
import { addAdminDraftTour, updateAdminDraftTourStatus } from "../lib/demo-store";
import { useAdminDraftTours } from "../lib/use-demo-store";
import { useTranslations } from "../i18n/react";
import UiSelect from "./ui/UiSelect";

export default function AdminInventoryClient() {
  const { t } = useTranslations();
  const draftTours = useAdminDraftTours();
  const [form, setForm] = useState({
    name: "",
    destination: "",
    priceFrom: "",
  });

  return (
    <div className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[1fr_0.8fr_0.6fr_auto] lg:items-end">
        <input
          type="text"
          placeholder={t("admin.form.tourName")}
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          className="field-box field-control"
        />
        <input
          type="text"
          placeholder={t("admin.form.destination")}
          value={form.destination}
          onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))}
          className="field-box field-control"
        />
        <input
          type="text"
          placeholder={t("admin.form.priceFrom")}
          value={form.priceFrom}
          onChange={(event) => setForm((current) => ({ ...current, priceFrom: event.target.value }))}
          className="field-box field-control"
        />
        <button
          type="button"
          onClick={() => {
            if (!form.name.trim() || !form.destination.trim() || !form.priceFrom.trim()) return;
            addAdminDraftTour(form);
            setForm({ name: "", destination: "", priceFrom: "" });
          }}
          className="btn-primary whitespace-nowrap"
        >
          {t("admin.addDraft")}
        </button>
      </div>

      <div className="space-y-3">
        {draftTours.map((tour) => (
          <div key={tour.id} className="rounded-3xl bg-brand-bg p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold text-brand-text">{tour.name}</div>
                <div className="mt-1 text-sm text-brand-muted">
                  {tour.destination} - {tour.priceFrom}
                </div>
              </div>
              <div className="w-40 shrink-0">
              <UiSelect
                value={tour.status}
                onValueChange={(value) =>
                  updateAdminDraftTourStatus(
                    tour.id,
                    value as "draft" | "scheduled",
                  )
                }
                options={[
                  { value: "draft", label: t("admin.status.draft") },
                  { value: "scheduled", label: t("admin.status.scheduled") },
                ]}
                ariaLabel={t("table.status")}
              />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
