import { useEffect, useMemo, useState } from "react";
import { Clock3, Filter, MapPin, Search, Star } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import type { Tour } from "../data/tours";
import UiPriceSlider from "./ui/UiPriceSlider";
import UiSelect from "./ui/UiSelect";
import { useTranslations } from "../i18n/react";

type ToursExplorerClientProps = {
  tours: Tour[];
};

type FiltersState = {
  search: string;
  category: string;
  duration: string;
  rating: string;
  availability: string;
  sort: string;
  priceMax: number;
};

const categoryOptions = [
  { value: "all", labelKey: "search.type.all" },
  { value: "Adventure", labelKey: "search.type.adventure" },
  { value: "Nature", labelKey: "search.type.nature" },
  { value: "Cultural", labelKey: "search.type.cultural" },
  { value: "Luxury", labelKey: "search.type.luxury" },
] as const;

const durationOptions = [
  { value: "any", labelKey: "tours.duration.any" },
  { value: "1-3", labelKey: "tours.duration.short" },
  { value: "4-7", labelKey: "tours.duration.medium" },
  { value: "8+", labelKey: "tours.duration.long" },
] as const;

const ratingOptions = [
  { value: "any", labelKey: "tours.rating.any", label: null },
  { value: "4.5", labelKey: null, label: "4.5+" },
  { value: "4.7", labelKey: null, label: "4.7+" },
  { value: "4.8", labelKey: null, label: "4.8+" },
] as const;

const availabilityOptions = [
  { value: "any", labelKey: "tours.availability.any" },
  { value: "Available", labelKey: "tours.availability.available" },
  { value: "Limited", labelKey: "tours.availability.limited" },
  { value: "Sold Out", labelKey: "tours.availability.soldOut" },
] as const;

const sortOptions = [
  { value: "recommended", labelKey: "tours.sort.recommended" },
  { value: "price-asc", labelKey: "tours.sort.price" },
  { value: "top-rated", labelKey: "tours.sort.topRated" },
] as const;

function TourResultCard({
  tour,
  t,
}: {
  tour: Tour;
  t: (key: any) => string;
}) {
  return (
    <article className="card-surface group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_56px_rgba(6,20,35,0.14)]">
      <div className="relative">
        <a href={`/tours/${tour.slug}`} className="block">
          <img
            src={tour.image}
            alt={tour.alt}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </a>
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full bg-brand-accent px-3 py-1 text-xs font-semibold text-brand-dark">
            {tour.badge}
          </span>
          <FavoriteButton
            ariaLabel={`Save ${tour.name} to favorites`}
            light
            item={{
              id: `tour:${tour.slug}`,
              kind: "tour",
              slug: tour.slug,
              name: tour.name,
              href: `/tours/${tour.slug}`,
              image: tour.image,
              location: tour.location,
              priceLabel: `$${tour.price}`,
            }}
          />
        </div>
      </div>

      <div className="p-6">
        <a
          href={`/tours/${tour.slug}`}
          className="text-xl font-semibold tracking-tight text-brand-text transition hover:text-brand-teal"
        >
          {tour.name}
        </a>
        <p className="mt-2 flex items-center gap-2 text-sm text-brand-muted">
          <MapPin className="h-4 w-4 text-brand-teal" />
          {tour.location}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1 font-semibold text-brand-text">
            <Star className="h-4 w-4 fill-brand-accent text-brand-accent" />
            {tour.rating}
          </span>
          <span className="text-brand-muted">({tour.reviews} {t("tours.card.reviews")})</span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-brand-border pt-5">
          <p className="text-sm text-brand-muted">
            {t("tours.card.from")} <span className="text-2xl font-semibold tracking-tight text-brand-text">${tour.price}</span>
          </p>
          <p className="flex items-center gap-2 text-sm text-brand-muted">
            <Clock3 className="h-4 w-4 text-brand-teal" />
            {tour.durationDays} {t("tours.card.days")}
          </p>
        </div>

        <div className="mt-5 flex gap-3">
          <a href={`/tours/${tour.slug}`} className="btn-secondary min-w-0 flex-1 px-4">
            {t("tours.card.details")}
          </a>
          <a href={`/booking?tour=${tour.slug}`} className="btn-primary min-w-0 flex-1 px-4">
            {t("tours.card.book")}
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ToursExplorerClient({ tours }: ToursExplorerClientProps) {
  const { t } = useTranslations();
  const maxPrice = useMemo(() => Math.max(...tours.map((tour) => tour.price)), [tours]);
  const minPrice = useMemo(() => Math.min(...tours.map((tour) => tour.price)), [tours]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    category: categoryOptions[0].value,
    duration: durationOptions[0].value,
    rating: ratingOptions[0].value,
    availability: availabilityOptions[0].value,
    sort: sortOptions[0].value,
    priceMax: maxPrice,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("destination") ?? params.get("stop1") ?? "";
    const category = params.get("category") ?? categoryOptions[0].value;

    setFilters((prev) => ({
      ...prev,
      search,
      category: categoryOptions.some((option) => option.value === category) ? category : prev.category,
      priceMax: maxPrice,
    }));
  }, [maxPrice]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (filters.search) params.set("destination", filters.search);
    else params.delete("destination");

    if (filters.category !== categoryOptions[0].value) params.set("category", filters.category);
    else params.delete("category");

    if (filters.duration !== durationOptions[0].value) params.set("duration", filters.duration);
    else params.delete("duration");

    if (filters.rating !== ratingOptions[0].value) params.set("rating", filters.rating);
    else params.delete("rating");

    if (filters.availability !== availabilityOptions[0].value) params.set("availability", filters.availability);
    else params.delete("availability");

    if (filters.sort !== sortOptions[0].value) params.set("sort", filters.sort);
    else params.delete("sort");

    if (filters.priceMax !== maxPrice) params.set("priceMax", String(filters.priceMax));
    else params.delete("priceMax");

    const query = params.toString();
    window.history.replaceState({}, "", query ? `/tours?${query}` : "/tours");
  }, [filters, maxPrice]);

  const filteredTours = useMemo(() => {
    let nextTours = [...tours];

    if (filters.search.trim()) {
      const search = filters.search.toLowerCase();
      nextTours = nextTours.filter((tour) =>
        [tour.name, tour.location, tour.destinationName, tour.country]
          .join(" ")
          .toLowerCase()
          .includes(search),
      );
    }

    if (filters.category !== categoryOptions[0].value) {
      nextTours = nextTours.filter((tour) => tour.type === filters.category);
    }

    if (filters.duration === "1-3") {
      nextTours = nextTours.filter((tour) => tour.durationDays <= 3);
    } else if (filters.duration === "4-7") {
      nextTours = nextTours.filter((tour) => tour.durationDays >= 4 && tour.durationDays <= 7);
    } else if (filters.duration === "8+") {
      nextTours = nextTours.filter((tour) => tour.durationDays >= 8);
    }

    if (filters.rating !== ratingOptions[0].value) {
      const minimum = Number(filters.rating);
      nextTours = nextTours.filter((tour) => tour.rating >= minimum);
    }

    if (filters.availability !== availabilityOptions[0].value) {
      nextTours = nextTours.filter((tour) => tour.availability === filters.availability);
    }

    nextTours = nextTours.filter((tour) => tour.price <= filters.priceMax);

    if (filters.sort === "price-asc") {
      nextTours.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "top-rated") {
      nextTours.sort((a, b) => b.rating - a.rating);
    } else {
      nextTours.sort((a, b) => b.reviews - a.reviews);
    }

    return nextTours;
  }, [filters, tours]);

  const filtersPanel = (
    <div className="card-surface h-fit p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-bg text-brand-teal">
            <Filter className="h-5 w-5" />
          </span>
          <h2 className="text-lg font-semibold tracking-tight text-brand-text">{t("tours.filters.title")}</h2>
        </div>
        <button
          type="button"
          onClick={() =>
            setFilters({
              search: "",
              category: categoryOptions[0].value,
              duration: durationOptions[0].value,
              rating: ratingOptions[0].value,
              availability: availabilityOptions[0].value,
              sort: sortOptions[0].value,
              priceMax: maxPrice,
            })
          }
          className="text-sm font-semibold text-brand-teal"
        >
          {t("tours.filters.clear")}
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <label className="block">
          <span className="text-sm font-semibold text-brand-text">{t("tours.filters.search")}</span>
          <div className="mt-3 flex h-12 items-center gap-2 rounded-2xl border border-brand-border bg-white px-4">
            <Search className="h-4 w-4 text-brand-muted" />
            <input
              value={filters.search}
              onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
              placeholder={t("tours.filters.searchPlaceholder")}
              className="h-full w-full border-0 bg-transparent p-0 text-sm text-brand-text outline-none placeholder:text-brand-muted"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-brand-text">{t("tours.filters.type")}</span>
          <div className="mt-3">
            <UiSelect
              value={filters.category}
              onValueChange={(next) => setFilters((prev) => ({ ...prev, category: next }))}
              options={categoryOptions.map((option) => ({ value: option.value, label: t(option.labelKey) }))}
              ariaLabel={t("tours.filters.type")}
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-brand-text">{t("tours.filters.duration")}</span>
          <div className="mt-3">
            <UiSelect
              value={filters.duration}
              onValueChange={(next) => setFilters((prev) => ({ ...prev, duration: next }))}
              options={durationOptions.map((option) => ({ value: option.value, label: t(option.labelKey) }))}
              ariaLabel={t("tours.filters.duration")}
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-brand-text">{t("tours.filters.rating")}</span>
          <div className="mt-3">
            <UiSelect
              value={filters.rating}
              onValueChange={(next) => setFilters((prev) => ({ ...prev, rating: next }))}
              options={ratingOptions.map((option) => ({
                value: option.value,
                label: option.labelKey ? t(option.labelKey) : option.label,
              }))}
              ariaLabel={t("tours.filters.rating")}
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-brand-text">{t("tours.filters.availability")}</span>
          <div className="mt-3">
            <UiSelect
              value={filters.availability}
              onValueChange={(next) => setFilters((prev) => ({ ...prev, availability: next }))}
              options={availabilityOptions.map((option) => ({ value: option.value, label: t(option.labelKey) }))}
              ariaLabel={t("tours.filters.availability")}
            />
          </div>
        </label>

        <div>
          <div className="flex items-center justify-between text-sm font-semibold text-brand-text">
            <span>{t("tours.filters.price")}</span>
            <span className="text-brand-muted">
              ${minPrice} - ${filters.priceMax}
            </span>
          </div>
          <div className="mt-4 px-1">
            <UiPriceSlider
              min={minPrice}
              max={maxPrice}
              step={50}
              value={filters.priceMax}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, priceMax: value }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-shell">
      <div className="xl:hidden">
        <button type="button" onClick={() => setFiltersOpen((prev) => !prev)} className="btn-secondary w-full gap-2">
          <span className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            {filtersOpen ? t("tours.filters.hide") : t("tours.filters.show")}
          </span>
        </button>
        {filtersOpen ? <div className="mt-4">{filtersPanel}</div> : null}
      </div>

      <div className="mt-6 grid gap-6 xl:mt-0 xl:grid-cols-[300px_1fr]">
        <aside className="hidden xl:block">{filtersPanel}</aside>

        <section>
          <div className="card-surface p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="eyebrow">{t("tours.results.eyebrow")}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-brand-text">
                  {filteredTours.length} {t("tours.results.available")}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className="btn-secondary">
                  {t("tours.results.map")}
                </button>
                <div className="w-full sm:w-56">
                  <UiSelect
                    value={filters.sort}
                    options={sortOptions.map((option) => ({ value: option.value, label: t(option.labelKey) }))}
                    onValueChange={(next) => setFilters((prev) => ({ ...prev, sort: next }))}
                    ariaLabel={t("tours.results.eyebrow")}
                  />
                </div>
              </div>
            </div>
          </div>

          {filteredTours.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
              {filteredTours.map((tour) => (
                <TourResultCard key={tour.slug} tour={tour} t={t} />
              ))}
            </div>
          ) : (
            <div className="mt-6 card-surface p-8 text-center">
              <p className="eyebrow">{t("tours.results.emptyEyebrow")}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-brand-text">
                {t("tours.results.emptyTitle")}
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-brand-muted">
                {t("tours.results.emptyCopy")}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
