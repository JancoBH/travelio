import { useEffect, useMemo, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

type UiDateFieldProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const minYear = 1900;
const maxYear = 2100;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseIsoDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < minYear || year > maxYear || month < 1 || month > 12 || day < 1 || day > 31) return null;

  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

function formatDisplay(value: string) {
  const date = parseIsoDate(value);
  if (!date) return "";
  return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}`;
}

function parseDisplayDate(value: string) {
  const normalized = value.trim();
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(normalized);
  if (!match) return null;

  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  if (year < minYear || year > maxYear || month < 1 || month > 12 || day < 1 || day > 31) return null;

  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return toIsoDate(date);
}

function formatTypedDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function getMonthDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = Array.from({ length: startOffset }, () => null);

  for (let day = 1; day <= totalDays; day += 1) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function UiDateField({
  id,
  name,
  value,
  onChange,
  ariaLabel,
  className = "",
}: UiDateFieldProps) {
  const selectedDate = parseIsoDate(value);
  const [open, setOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState(formatDisplay(value));
  const [visibleMonth, setVisibleMonth] = useState(
    selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) : new Date(2026, 5, 1),
  );

  const monthDays = useMemo(() => getMonthDays(visibleMonth), [visibleMonth]);

  useEffect(() => {
    setDisplayValue(formatDisplay(value));
    const nextDate = parseIsoDate(value);
    if (nextDate) setVisibleMonth(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
  }, [value]);

  const commitDisplayValue = () => {
    const parsed = parseDisplayDate(displayValue);
    if (parsed) {
      onChange(parsed);
      const parsedDate = parseIsoDate(parsed);
      if (parsedDate) setVisibleMonth(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
      return;
    }

    setDisplayValue(formatDisplay(value));
  };

  const selectDay = (day: number) => {
    const nextDate = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day);
    const nextValue = toIsoDate(nextDate);
    onChange(nextValue);
    setDisplayValue(formatDisplay(nextValue));
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Anchor asChild>
        <div className={`field-surface justify-between ${className}`}>
          <input
            id={id}
            name={name}
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={(event) => {
              setDisplayValue(formatTypedDate(event.target.value));
            }}
            onBlur={commitDisplayValue}
            onFocus={() => setOpen(true)}
            placeholder="MM/DD/YYYY"
            aria-label={ariaLabel}
            className="field-control"
          />
          <button
            type="button"
            aria-label={ariaLabel}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-brand-muted transition hover:bg-white hover:text-brand-teal"
          >
            <Calendar className="h-4 w-4" />
          </button>
        </div>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align="start"
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="z-50 h-auto w-79 rounded-3xl border border-brand-border bg-white p-4 shadow-[0_24px_64px_rgba(6,20,35,0.18)] outline-none"
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-muted transition hover:bg-brand-bg hover:text-brand-text"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="text-sm font-semibold text-brand-text">
              {monthNames[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
            </div>
            <button
              type="button"
              onClick={() =>
                setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-muted transition hover:bg-brand-bg hover:text-brand-text"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase text-brand-muted">
            {weekDays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {monthDays.map((day, index) => {
              const iso = day ? toIsoDate(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day)) : "";
              const active = iso === value;

              return day ? (
                <button
                  key={iso}
                  type="button"
                  onClick={() => selectDay(day)}
                  className={[
                    "inline-flex h-8 items-center justify-center rounded-full text-sm font-medium transition",
                    active
                      ? "bg-brand-accent text-brand-dark"
                      : "text-brand-text hover:bg-brand-bg",
                  ].join(" ")}
                >
                  {day}
                </button>
              ) : (
                <span key={`empty-${index}`} />
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
