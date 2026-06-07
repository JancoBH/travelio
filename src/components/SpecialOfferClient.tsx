import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "../i18n/react";

const targetDate = new Date("2026-08-01T00:00:00");

const getTimeLeft = () => {
  const now = new Date();
  const diff = Math.max(targetDate.getTime() - now.getTime(), 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const initialTimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export default function SpecialOfferClient() {
  const { t } = useTranslations();
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const countdown = useMemo(
    () => [
      { value: String(timeLeft.days).padStart(2, "0"), label: t("offer.days") },
      { value: String(timeLeft.hours).padStart(2, "0"), label: t("offer.hours") },
      { value: String(timeLeft.minutes).padStart(2, "0"), label: t("offer.minutes") },
      { value: String(timeLeft.seconds).padStart(2, "0"), label: t("offer.seconds") },
    ],
    [t, timeLeft],
  );

  return (
    <section className="overflow-hidden rounded-4xl bg-brand-dark">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1800&q=80"
          alt="Palm trees and ocean view for a summer travel promotion"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/72" />
        <div className="relative grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1.1fr_auto] lg:items-center lg:px-14 lg:py-14">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/70">{t("offer.eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t("offer.title")}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/74">
              {t("offer.copy")}
            </p>
            <a
              href="#offers"
              className="mt-8 inline-flex rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-dark transition hover:brightness-95"
            >
              {t("offer.cta")}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {countdown.map((item) => (
              <div key={item.label} className="min-w-24 rounded-3xl border border-white/14 bg-white/10 px-5 py-4 text-center text-white backdrop-blur-sm">
                <div className="text-3xl font-semibold tracking-tight">{item.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/62">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
