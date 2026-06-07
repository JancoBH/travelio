import { useState } from "react";

type BarDatum = {
  label: string;
  value: number;
};

type DonutDatum = {
  label: string;
  value: number;
  color: string;
};

export function UiBarChart({ data }: { data: BarDatum[] }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="rounded-[28px] bg-brand-bg p-6">
      <div className="flex h-72 items-end gap-4">
        {data.map((item) => {
          const height = Math.max(10, (item.value / maxValue) * 100);

          return (
            <div key={item.label} className="group flex h-full flex-1 flex-col justify-end gap-3">
              <div className="relative flex flex-1 items-end">
                <div
                  className="relative w-full rounded-t-md bg-emerald-600 transition duration-200 group-hover:bg-emerald-500"
                  style={{ height: `${height}%` }}
                >
                  <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-brand-dark/95 px-2.5 py-1.5 text-[10px] font-bold tracking-wide text-white shadow-lg opacity-0 transition duration-200 group-hover:opacity-100 backdrop-blur-xs z-10">
                    ${item.value}k
                  </div>
                </div>
              </div>
              <div className="text-center text-xs font-medium text-brand-muted">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function UiDonutChart({ data }: { data: DonutDatum[] }) {
  const [hoveredSegment, setHoveredSegment] = useState<DonutDatum | null>(null);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
      <div className="relative mx-auto h-52 w-52">
        <svg viewBox="0 0 100 100" role="img" aria-label="Booking status distribution" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="12" />
          {data.map((item) => {
            const dash = (item.value / 100) * circumference;
            const isHovered = hoveredSegment?.label === item.label;
            const segment = (
              <circle
                key={item.label}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={isHovered ? "15" : "12"}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredSegment(item)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            );
            offset += dash;
            return segment;
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center transition-all duration-300">
            <div
              className="text-3xl font-bold tracking-tight transition-colors duration-200"
              style={{ color: hoveredSegment ? hoveredSegment.color : "var(--color-brand-text)" }}
            >
              {hoveredSegment ? `${hoveredSegment.value}%` : "100%"}
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-brand-muted">
              {hoveredSegment ? hoveredSegment.label : "Status"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 text-sm">
        {data.map((item) => {
          const isHovered = hoveredSegment?.label === item.label;
          return (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredSegment(item)}
              onMouseLeave={() => setHoveredSegment(null)}
              className={[
                "flex items-center justify-between rounded-2xl p-4 transition duration-200 cursor-pointer",
                isHovered ? "bg-slate-100 text-brand-text shadow-xs" : "bg-brand-bg text-brand-muted",
              ].join(" ")}
            >
              <span className="inline-flex items-center gap-2 font-medium">
                <span
                  className="h-3 w-3 rounded-full transition-transform duration-200"
                  style={{
                    backgroundColor: item.color,
                    transform: isHovered ? "scale(1.2)" : "scale(1)",
                  }}
                />
                {item.label}
              </span>
              <span className="font-semibold text-brand-text">{item.value}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
