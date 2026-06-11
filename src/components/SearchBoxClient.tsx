import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import {
  CirclePlus,
  CircleX,
  Calendar,
  ChevronDown,
  Map,
  Trash2,
  MapPin,
  Minus,
  Plus,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import UiSelect from "./ui/UiSelect";
import UiDateField from "./ui/UiDateField";
import { UiPopover } from "./ui/UiPopover";
import { resolveUrl } from "../lib/url";
import { tours } from "../data/tours";
import { destinations } from "../data/destinations";
import { useTranslations } from "../i18n/react";

type TripMode = "single" | "multi";

type TravelerCounts = {
  adults: number;
  children: number;
};

type MultiStop = {
  id: string;
  destination: string;
  date: string;
};

const createStop = (id: string, destination = "", date = ""): MultiStop => ({
  id,
  destination,
  date,
});

const defaultTravelers: TravelerCounts = {
  adults: 2,
  children: 0,
};

const getDefaultStops = () => [createStop("stop-1"), createStop("stop-2")];

const categoryOptions = [
  { value: "all", labelKey: "search.type.all" },
  { value: "Adventure", labelKey: "search.type.adventure" },
  { value: "Nature", labelKey: "search.type.nature" },
  { value: "Cultural", labelKey: "search.type.cultural" },
  { value: "Luxury", labelKey: "search.type.luxury" },
] as const;

const totalTravelers = (travelers: TravelerCounts) => travelers.adults + travelers.children;

const searchSuggestions = Array.from(
  new Set([
    ...destinations.flatMap((destination) => [
      destination.name,
      `${destination.name}, ${destination.country}`,
    ]),
    ...tours.flatMap((tour) => [tour.name, tour.destinationName, tour.location]),
  ]),
).sort((left, right) => left.localeCompare(right));

const getSuggestions = (query: string) => {
  const normalized = query.trim().toLowerCase();
  const prioritized = normalized
    ? searchSuggestions.filter((item) => item.toLowerCase().includes(normalized))
    : searchSuggestions;

  return prioritized.slice(0, 6);
};

function FieldCard({
  icon,
  label,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-visible rounded-[26px] bg-white px-5 py-4 shadow-[inset_0_0_0_1px_rgba(229,231,235,0.8)] transition hover:shadow-[inset_0_0_0_1px_rgba(7,85,107,0.22)] ${className}`}>
      <label className="flex items-center gap-2 text-sm font-semibold text-brand-text">
        <span className="text-brand-teal">{icon}</span>
        {label}
      </label>
      <div className="mt-3">{children}</div>
    </div>
  );
}

type SelectLikeProps = ComponentPropsWithoutRef<"button"> & {
  value: string;
  muted?: boolean;
};

const SelectLike = forwardRef<HTMLButtonElement, SelectLikeProps>(function SelectLike({
  value,
  muted = false,
  className = "",
  onClick,
  ...props
}, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={(event) => {
        onClick?.(event);
      }}
      className={`field-surface text-left text-sm focus-visible:outline-none ${className}`}
      {...props}
    >
      <span className={muted ? "text-brand-muted" : "text-brand-text"}>{value}</span>
      <ChevronDown className="h-4 w-4 shrink-0 text-brand-muted" />
    </button>
  );
});

function TravelerRow({
  label,
  description,
  value,
  onDecrease,
  onIncrease,
}: {
  label: string;
  description: string;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="text-sm font-semibold text-brand-text">{label}</div>
        <div className="text-xs text-brand-muted">{description}</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={onDecrease}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-brand-text transition hover:border-brand-teal hover:text-brand-teal"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-sm font-semibold text-brand-text">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={onIncrease}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-brand-text transition hover:border-brand-teal hover:text-brand-teal"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function SuggestionsMenu({
  suggestions,
  onSelect,
  title,
  emptyText,
}: {
  suggestions: string[];
  onSelect: (value: string) => void;
  title: string;
  emptyText: string;
}) {
  if (!suggestions.length) {
    return (
      <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-40 rounded-3xl border border-brand-border bg-white p-3 shadow-[0_24px_64px_rgba(6,20,35,0.18)]">
        <p className="px-2 py-2 text-sm text-brand-muted">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-40 rounded-3xl border border-brand-border bg-white p-2 shadow-[0_24px_64px_rgba(6,20,35,0.18)]">
      <div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-muted">{title}</div>
      <div className="space-y-1">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSelect(suggestion)}
            className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-sm text-brand-muted transition hover:bg-brand-bg hover:text-brand-text"
          >
            <MapPin className="h-4 w-4 shrink-0 text-brand-teal" />
            <span>{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TravelersField({
  label,
  travelerLabel,
  travelerMenuOpen,
  onTravelerMenuChange,
  travelers,
  onDecrease,
  onIncrease,
  t,
}: {
  label: string;
  travelerLabel: string;
  travelerMenuOpen: boolean;
  onTravelerMenuChange: (open: boolean) => void;
  travelers: TravelerCounts;
  onDecrease: (key: keyof TravelerCounts) => void;
  onIncrease: (key: keyof TravelerCounts) => void;
  t: (key: any) => string;
}) {
  return (
    <FieldCard icon={<Users className="h-4 w-4" />} label={label}>
      <UiPopover
        open={travelerMenuOpen}
        onOpenChange={onTravelerMenuChange}
        align="start"
        trigger={<SelectLike value={travelerLabel} />}
        content={
          <div className="w-[280px]">
            <TravelerRow
              label={t("search.travelers.adults")}
              description={t("search.travelers.adultsDesc")}
              value={travelers.adults}
              onDecrease={() => onDecrease("adults")}
              onIncrease={() => onIncrease("adults")}
            />
            <TravelerRow
              label={t("search.travelers.children")}
              description={t("search.travelers.childrenDesc")}
              value={travelers.children}
              onDecrease={() => onDecrease("children")}
              onIncrease={() => onIncrease("children")}
            />
          </div>
        }
      />
    </FieldCard>
  );
}

export default function SearchBoxClient() {
  const { t } = useTranslations();
  const [tripMode, setTripMode] = useState<TripMode>("single");
  const [destination, setDestination] = useState("");
  const [experienceDate, setExperienceDate] = useState("2026-06-15");
  const [category, setCategory] = useState<string>(categoryOptions[0].value);
  const [travelers, setTravelers] = useState(defaultTravelers);
  const [travelerMenuOpen, setTravelerMenuOpen] = useState(false);
  const [multiStops, setMultiStops] = useState(getDefaultStops);
  const [error, setError] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const multiSearchRef = useRef<HTMLDivElement | null>(null);
  const nextStopNumberRef = useRef(3);

  const handleTravelerMenuChange = (open: boolean) => {
    setTravelerMenuOpen(open);
  };

  const filteredSuggestions = useMemo(() => {
    return getSuggestions(destination);
  }, [destination]);

  const travelerLabel = useMemo(() => {
    const total = totalTravelers(travelers);
    return `${total} ${total > 1 ? t("search.travelers.plural") : t("search.travelers.single")}`;
  }, [t, travelers]);

  const activeStopSuggestions = useMemo(() => {
    const activeStop = multiStops.find((stop) => stop.id === activeStopId);
    return getSuggestions(activeStop?.destination ?? "");
  }, [activeStopId, multiStops]);

  useEffect(() => {
    if (!searchOpen && !activeStopId) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (!multiSearchRef.current?.contains(event.target as Node)) {
        setActiveStopId(null);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, [activeStopId, searchOpen]);

  const updateTraveler = (key: keyof TravelerCounts, delta: number) => {
    setTravelers((prev) => {
      const min = key === "adults" ? 1 : 0;
      return { ...prev, [key]: Math.max(min, prev[key] + delta) };
    });
  };

  const updateStop = (id: string, key: "destination" | "date", value: string) => {
    setMultiStops((prev) =>
      prev.map((stop) => (stop.id === id ? { ...stop, [key]: value } : stop)),
    );
  };

  const addStop = () => {
    const nextStopId = `stop-${nextStopNumberRef.current++}`;
    setMultiStops((prev) => [
      ...prev,
      createStop(nextStopId),
    ]);
  };

  const switchToSingle = (nextDestination = destination, nextDate = experienceDate) => {
    setTripMode("single");
    setDestination(nextDestination);
    setExperienceDate(nextDate);
    setActiveStopId(null);
    setSearchOpen(false);
    setError("");
  };

  const switchToMulti = () => {
    if (tripMode === "multi") return;

    const normalizedDestination = destination.trim();
    const stopOne = createStop("stop-1", normalizedDestination, experienceDate);
    const stopTwo = createStop("stop-2");
    nextStopNumberRef.current = 3;
    setMultiStops([
      stopOne,
      stopTwo,
    ]);
    setTripMode("multi");
    setActiveStopId(null);
    setSearchOpen(false);
    setError("");
  };

  const removeStop = (id: string) => {
    const nextStops = multiStops.filter((stop) => stop.id !== id);
    if (nextStops.length <= 1) {
      const remainingStop = nextStops[0] ?? createStop("stop-1", destination, experienceDate);
      setMultiStops(getDefaultStops());
      nextStopNumberRef.current = 3;
      switchToSingle(remainingStop.destination, remainingStop.date || experienceDate);
      return;
    }

    setMultiStops(nextStops);
  };

  const handleSubmit = (event: Parameters<NonNullable<ComponentPropsWithoutRef<"form">["onSubmit"]>>[0]) => {
    event.preventDefault();

    if (tripMode === "single" && !destination.trim()) {
      setError(t("search.error.destination"));
      return;
    }

    if (
      tripMode === "multi" &&
      multiStops.some((stop) => !stop.destination.trim() || !stop.date.trim())
    ) {
      setError(t("search.error.multi"));
      return;
    }

    setError("");

    const params = new URLSearchParams({
      mode: tripMode,
      category,
      adults: String(travelers.adults),
      children: String(travelers.children),
    });

    if (tripMode === "single") {
      params.set("destination", destination.trim());
      params.set("date", experienceDate);
    } else {
      multiStops.forEach((stop, index) => {
        params.set(`stop${index + 1}`, stop.destination.trim());
        params.set(`date${index + 1}`, stop.date);
      });
    }

    window.location.assign(resolveUrl(`/tours?${params.toString()}`));
  };

  return (
    <form className="panel relative z-20 p-4 sm:p-5" onSubmit={handleSubmit} noValidate>
      <div className="rounded-[26px] bg-brand-bg px-5 py-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-text">{t("search.planSmarter")}</p>
            <p className="mt-1 text-sm text-brand-muted">
              {t("search.copy")}
            </p>
          </div>

          <div className="grid grid-cols-2 rounded-full border border-brand-border bg-white p-1">
            <button
              type="button"
              onClick={() => {
                if (tripMode === "multi") {
                  const firstFilledStop = multiStops.find(
                    (stop) => stop.destination.trim() || stop.date.trim(),
                  );
                  switchToSingle(
                    firstFilledStop?.destination || destination,
                    firstFilledStop?.date || experienceDate,
                  );
                  return;
                }

                switchToSingle();
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tripMode === "single"
                  ? "bg-brand-dark text-white"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              {t("search.mode.single")}
            </button>
            <button
              type="button"
              onClick={() => {
                switchToMulti();
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tripMode === "multi"
                  ? "bg-brand-dark text-white"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              {t("search.mode.multi")}
            </button>
          </div>
        </div>
      </div>

      {tripMode === "single" ? (
        <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.35fr)_minmax(200px,0.82fr)_minmax(200px,0.82fr)_minmax(220px,0.9fr)_170px] xl:items-end">
          <FieldCard icon={<MapPin className="h-4 w-4" />} label={t("search.label.destination")}>
            <div ref={searchRef} className="relative">
              <div className="field-surface">
                <Search className="h-4 w-4 shrink-0 text-brand-muted" />
                <input
                  id="hero-destination"
                  name="destination"
                  type="text"
                  value={destination}
                  onFocus={() => setSearchOpen(true)}
                  onChange={(event) => {
                    setDestination(event.target.value);
                    setSearchOpen(true);
                  }}
                  placeholder={t("search.placeholder.destination")}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "search-destination-error" : undefined}
                  className="field-control"
                />
                {destination ? (
                  <button
                    type="button"
                    onClick={() => {
                      setDestination("");
                      setSearchOpen(true);
                    }}
                    aria-label="Clear destination"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-brand-muted transition hover:bg-brand-bg hover:text-brand-text"
                  >
                    <CircleX className="h-4 w-4" />
                  </button>
                ) : null}
              </div>

              {searchOpen ? (
                <SuggestionsMenu
                  suggestions={filteredSuggestions}
                  title={t("search.suggestions")}
                  emptyText={t("search.noMatches")}
                  onSelect={(suggestion) => {
                    setDestination(suggestion);
                    setSearchOpen(false);
                  }}
                />
              ) : null}
            </div>

            {error ? (
              <p id="search-destination-error" aria-live="polite" className="mt-3 text-xs font-medium text-rose-600">
                {error}
              </p>
            ) : null}
          </FieldCard>

          <FieldCard icon={<Calendar className="h-4 w-4" />} label={t("search.label.date")}>
            <UiDateField
              id="hero-date"
              name="date"
              value={experienceDate}
              onChange={setExperienceDate}
              ariaLabel={t("search.label.date")}
            />
          </FieldCard>

          <TravelersField
            label={t("search.label.travelers")}
            travelerLabel={travelerLabel}
            travelerMenuOpen={travelerMenuOpen}
            onTravelerMenuChange={handleTravelerMenuChange}
            travelers={travelers}
            onDecrease={(key) => updateTraveler(key, -1)}
            onIncrease={(key) => updateTraveler(key, 1)}
            t={t}
          />

          <FieldCard icon={<Map className="h-4 w-4" />} label={t("search.label.type")}>
            <UiSelect
              value={category}
              onValueChange={setCategory}
              options={categoryOptions.map((option) => ({
                value: option.value,
                label: t(option.labelKey),
              }))}
              ariaLabel={t("search.label.type")}
            />
          </FieldCard>

          <button
            type="submit"
            className="inline-flex h-14 items-center justify-center rounded-[20px] bg-brand-accent px-5 text-sm font-semibold text-brand-dark transition hover:brightness-95"
          >
            {t("search.submit.single")}
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.8fr)_minmax(250px,0.9fr)] xl:items-start">
          <FieldCard icon={<Sparkles className="h-4 w-4" />} label={t("search.label.planner")}>
            <div ref={multiSearchRef} className="space-y-3">
              {multiStops.map((stop, index) => (
                <div key={stop.id} className="grid gap-3 rounded-2xl border border-brand-border bg-brand-bg/55 p-3 lg:grid-cols-[minmax(0,1.35fr)_220px_auto] lg:items-end">
                  <div>
                    <label htmlFor={stop.id} className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
                      {t("search.label.stop")} {index + 1}
                    </label>
                    <div className="relative mt-2">
                      <div className="field-surface bg-white">
                        <MapPin className="h-4 w-4 shrink-0 text-brand-muted" />
                        <input
                          id={stop.id}
                          type="text"
                          value={stop.destination}
                          onFocus={() => setActiveStopId(stop.id)}
                          onChange={(event) => {
                            updateStop(stop.id, "destination", event.target.value);
                            setActiveStopId(stop.id);
                          }}
                          placeholder={t("search.placeholder.stop")}
                          className="field-control"
                        />
                        {stop.destination ? (
                          <button
                            type="button"
                            onClick={() => {
                              updateStop(stop.id, "destination", "");
                              setActiveStopId(stop.id);
                            }}
                            aria-label={`Clear stop ${index + 1}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-brand-muted transition hover:bg-brand-bg hover:text-brand-text"
                          >
                            <CircleX className="h-4 w-4" />
                          </button>
                        ) : null}
                      </div>

                      {activeStopId === stop.id ? (
                        <SuggestionsMenu
                          suggestions={activeStopSuggestions}
                          title={t("search.suggestions")}
                          emptyText={t("search.noMatches")}
                          onSelect={(suggestion) => {
                            updateStop(stop.id, "destination", suggestion);
                            setActiveStopId(null);
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`${stop.id}-date`} className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
                      {t("search.label.dateShort")}
                    </label>
                    <UiDateField
                      id={`${stop.id}-date`}
                      value={stop.date}
                      onChange={(value) => updateStop(stop.id, "date", value)}
                      ariaLabel={`${t("search.label.stop")} ${index + 1} ${t("search.label.dateShort")}`}
                      className="mt-2 bg-white"
                    />
                  </div>
                  <div className="flex justify-end lg:pb-0.5">
                    {multiStops.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeStop(stop.id)}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-border bg-white text-brand-muted transition hover:border-rose-300 hover:text-rose-500"
                        aria-label={`Remove stop ${index + 1}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={addStop}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-semibold text-brand-text transition hover:border-brand-teal hover:text-brand-teal"
                >
                  <CirclePlus className="h-4 w-4" />
                  {t("search.addStop")}
                </button>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-[18px] bg-brand-accent px-5 text-sm font-semibold text-brand-dark transition hover:brightness-95"
                >
                  {t("search.submit.multi")}
                </button>
              </div>
            </div>

            {error ? (
              <p aria-live="polite" className="mt-3 text-xs font-medium text-rose-600">
                {error}
              </p>
            ) : null}
          </FieldCard>

          <div className="grid gap-3">
            <TravelersField
              label={t("search.label.travelers")}
              travelerLabel={travelerLabel}
              travelerMenuOpen={travelerMenuOpen}
              onTravelerMenuChange={handleTravelerMenuChange}
              travelers={travelers}
              onDecrease={(key) => updateTraveler(key, -1)}
              onIncrease={(key) => updateTraveler(key, 1)}
              t={t}
            />

            <FieldCard icon={<Map className="h-4 w-4" />} label={t("search.label.type")}>
              <UiSelect
                value={category}
                onValueChange={setCategory}
                options={categoryOptions.map((option) => ({
                  value: option.value,
                  label: t(option.labelKey),
                }))}
                ariaLabel={t("search.label.type")}
              />
            </FieldCard>
          </div>

        </div>
      )}
    </form>
  );
}
