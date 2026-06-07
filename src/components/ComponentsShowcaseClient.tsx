import { useState } from "react";
import { ArrowRight, MapPin, Star } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import { UiBarChart, UiDonutChart } from "./ui/UiCharts";
import UiDateField from "./ui/UiDateField";
import UiPriceSlider from "./ui/UiPriceSlider";
import UiSelect from "./ui/UiSelect";
import { useTranslations } from "../i18n/react";

const experienceOptions = [
  { value: "all", labelKey: "search.type.all" },
  { value: "Adventure", labelKey: "search.type.adventure" },
  { value: "Nature", labelKey: "search.type.nature" },
  { value: "Cultural", labelKey: "search.type.cultural" },
  { value: "Luxury", labelKey: "search.type.luxury" },
] as const;

export default function ComponentsShowcaseClient() {
  const { t } = useTranslations();
  const [date, setDate] = useState("2026-06-15");
  const [experienceType, setExperienceType] = useState("all");
  const [price, setPrice] = useState(950);

  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <section className="card-surface p-6">
        <p className="eyebrow">{t("components.inputs")}</p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">{t("components.textFields")}</h2>
        <div className="mt-5 grid gap-3">
          <input className="field-box field-control" placeholder="Traveler name" />
          <input className="field-box field-control" placeholder="Email address" type="email" />
          <textarea className="field-box field-control h-auto min-h-24 py-3" placeholder="Special request" />
        </div>
      </section>

      <section className="card-surface p-6">
        <p className="eyebrow">{t("components.pickers")}</p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">{t("components.dateSelect")}</h2>
        <div className="mt-5 grid gap-3">
          <UiDateField
            id="showcase-date"
            value={date}
            onChange={setDate}
            ariaLabel={t("search.label.date")}
          />
          <UiSelect
            value={experienceType}
            onValueChange={setExperienceType}
            options={experienceOptions.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            ariaLabel={t("search.label.type")}
          />
        </div>
      </section>

      <section className="card-surface p-6">
        <p className="eyebrow">{t("components.filters")}</p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">{t("components.priceSlider")}</h2>
        <div className="mt-5">
          <div className="mb-4 flex items-center justify-between text-sm font-semibold text-brand-text">
            <span>{t("tours.filters.price")}</span>
            <span className="text-brand-muted">$300 - ${price}</span>
          </div>
          <UiPriceSlider min={300} max={1400} step={50} value={price} onValueChange={setPrice} />
        </div>
      </section>

      <section className="card-surface p-6">
        <p className="eyebrow">{t("components.actions")}</p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">Buttons</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="btn-primary">
            Book now
          </button>
          <button type="button" className="btn-secondary">
            Details <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <FavoriteButton
            light
            ariaLabel="Toggle sample tour favorite"
            item={{
              id: "showcase:sample-tour",
              kind: "tour",
              slug: "showcase-sample-tour",
              name: "Showcase Sample Tour",
              href: "/tours",
              image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
              location: "Bali, Indonesia",
              priceLabel: "From $899",
            }}
          />
        </div>
      </section>

      <section className="card-surface p-6">
        <p className="eyebrow">{t("components.chips")}</p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">Badges</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Best Seller", "Top Rated", "Limited", "Confirmed"].map((label) => (
            <span key={label} className="rounded-full border border-brand-border bg-brand-bg px-3 py-1.5 text-xs font-semibold text-brand-muted">
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="card-surface p-6">
        <p className="eyebrow">{t("components.cards")}</p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">Tour card shell</h2>
        <article className="mt-5 overflow-hidden rounded-[28px] border border-brand-border bg-white">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
            alt="Tropical beach experience"
            className="h-40 w-full object-cover"
          />
          <div className="p-5">
            <div className="flex items-center gap-2 text-sm text-brand-muted">
              <MapPin className="h-4 w-4 text-brand-teal" />
              Bali, Indonesia
            </div>
            <h3 className="mt-3 font-semibold text-brand-text">Island Hopper Adventure</h3>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-1 font-semibold text-brand-text">
                <Star className="h-4 w-4 fill-brand-accent text-brand-accent" />
                4.9
              </span>
              <span className="font-semibold text-brand-teal">From $899</span>
            </div>
          </div>
        </article>
      </section>

      <section className="card-surface p-6 xl:col-span-2">
        <p className="eyebrow">{t("components.charts")}</p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">Dashboard charts</h2>
        <div className="mt-5 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <UiBarChart
            data={[
              { label: "Jan", value: 24 },
              { label: "Feb", value: 36 },
              { label: "Mar", value: 42 },
              { label: "Apr", value: 58 },
              { label: "May", value: 46 },
              { label: "Jun", value: 64 },
            ]}
          />
          <UiDonutChart
            data={[
              { label: t("status.confirmed"), value: 48, color: "#1D4ED8" },
              { label: t("status.completed"), value: 25, color: "#22C55E" },
              { label: t("status.pending"), value: 15, color: "#F59E0B" },
              { label: t("status.cancelled"), value: 12, color: "#EF4444" },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
