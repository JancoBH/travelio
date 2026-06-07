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
            <div key={item.label} className="group flex flex-1 flex-col justify-end gap-3">
              <div className="relative flex flex-1 items-end">
                <div
                  className="w-full rounded-t-3xl bg-gradient-to-t from-brand-teal to-brand-accent transition duration-200 group-hover:brightness-105"
                  style={{ height: `${height}%` }}
                />
                <div className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-full bg-brand-dark px-2.5 py-1 text-xs font-semibold text-white shadow-lg group-hover:block">
                  ${item.value}k
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
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
      <div className="relative mx-auto h-52 w-52">
        <svg viewBox="0 0 100 100" role="img" aria-label="Booking status distribution" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="14" />
          {data.map((item) => {
            const dash = (item.value / 100) * circumference;
            const segment = (
              <circle
                key={item.label}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth="14"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                className="cursor-pointer transition duration-200 hover:opacity-80"
              >
                <title>{item.label}: {item.value}%</title>
              </circle>
            );
            offset += dash;
            return segment;
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-semibold text-brand-text">100%</div>
            <div className="text-xs font-medium text-brand-muted">Status</div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 text-sm">
        {data.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-2xl bg-brand-bg p-4 text-brand-muted transition hover:bg-slate-100">
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
            <span className="font-semibold text-brand-text">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
