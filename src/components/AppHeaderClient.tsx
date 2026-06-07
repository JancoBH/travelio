import { useEffect, useMemo, useRef, useState } from "react";
import { Globe, Heart, Menu, MapPinned, X, ChevronDown, Check } from "lucide-react";
import { navLinks } from "../data/site";
import { persistLocale, readLocale, useTranslations } from "../i18n/react";
import type { Locale } from "../i18n/messages";
import { useWishlist } from "../lib/use-demo-store";

type HeaderProps = {
  currentPath?: string;
  transparent?: boolean;
};

const isActivePath = (currentPath: string, href: string) =>
  href === "/" ? currentPath === "/" : currentPath === href || currentPath.startsWith(`${href}/`);

function HeaderSettings({
  language,
  transparent = false,
  onLanguageChange,
  t,
}: {
  language: Locale;
  transparent?: boolean;
  onLanguageChange: (next: Locale) => void;
  t: (key: any) => string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const languageOptions: Locale[] = ["en", "es"];

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const languageLabel = language.toUpperCase();

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm transition",
          transparent
            ? "border border-white/20 text-white/90 hover:border-white/35 hover:bg-white/8"
            : "border border-brand-border bg-white text-brand-muted hover:border-brand-teal hover:text-brand-teal",
        ].join(" ")}
      >
        <Globe className="h-4 w-4" />
        <span className="font-semibold">{languageLabel}</span>
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+0.75rem)] z-40 min-w-56 rounded-3xl border border-brand-border/80 bg-white p-3 text-brand-text shadow-2xl">
          <div className="rounded-2xl bg-brand-bg p-2">
            <div className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">{t("header.language")}</div>
            {languageOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onLanguageChange(option);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm text-brand-muted transition hover:bg-white hover:text-brand-text"
              >
                  <span>{option.toUpperCase()}</span>
                  {option === language ? <Check className="h-4 w-4 text-brand-teal" /> : null}
                </button>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function AppHeaderClient({
  currentPath = "/",
  transparent = false,
}: HeaderProps) {
  const { locale, t } = useTranslations();
  const wishlist = useWishlist();
  const headerRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Locale>("en");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const storedSession = window.localStorage.getItem("travelio-demo-session");
    setLanguage(readLocale());
    if (storedSession) setIsLoggedIn(storedSession === "authenticated");
  }, []);

  useEffect(() => {
    setLanguage(locale);
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem(
      "travelio-demo-session",
      isLoggedIn ? "authenticated" : "guest",
    );
  }, [isLoggedIn]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("mousedown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("mousedown", handlePointerDown);
    };
  }, [menuOpen]);

  const headerTone = useMemo(
    () =>
      transparent
        ? "border border-white/20 bg-white/10 text-white backdrop-blur-md"
        : "border border-brand-border/70 bg-white/92 text-brand-text shadow-[0_12px_32px_rgba(6,20,35,0.06)]",
    [transparent],
  );

  const wishlistCount = wishlist.length;
  const handleLanguageChange = (nextLanguage: Locale) => {
    setLanguage(nextLanguage);
    persistLocale(nextLanguage);
  };

  return (
    <header ref={headerRef} className={`inset-x-0 top-0 z-30 ${transparent ? "absolute" : "sticky bg-brand-bg/88 backdrop-blur-md"}`}>
      <div className="container-shell py-4 sm:py-6">
        <div className={`flex items-center justify-between rounded-full px-4 py-3 sm:px-6 ${headerTone}`}>
          <a href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent text-brand-dark">
              <MapPinned className="h-5 w-5" />
            </span>
            <span className="text-lg">Travelio</span>
          </a>

          <nav
            aria-label="Main"
            className={`hidden items-center gap-5 text-sm lg:flex xl:gap-7 ${transparent ? "text-white/88" : "text-brand-muted"}`}
          >
            {navLinks.map((link) => {
              const active = isActivePath(currentPath, link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "transition",
                    transparent ? "hover:text-brand-accent" : "hover:text-brand-text",
                    active ? (transparent ? "font-semibold text-brand-accent" : "font-semibold text-brand-text") : "",
                  ].join(" ")}
                >
                  {t(link.key)}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <HeaderSettings
              language={language}
              transparent={transparent}
              onLanguageChange={handleLanguageChange}
              t={t}
            />
            {isLoggedIn ? (
              <>
                <a
                  href="/account#wishlist"
                  aria-label="Open favorites"
                  className={[
                    "relative inline-flex h-11 w-11 items-center justify-center rounded-full transition",
                    transparent
                      ? "border border-white/20 text-white/90 hover:border-white/35 hover:bg-white/8"
                      : "border border-brand-border bg-white text-brand-muted hover:border-brand-teal hover:text-brand-teal",
                  ].join(" ")}
                >
                  <Heart className="h-4 w-4" />
                  {wishlistCount ? (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-accent px-1 text-[10px] font-bold text-brand-dark">
                      {wishlistCount}
                    </span>
                  ) : null}
                </a>
                <a
                  href="/account"
                  className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:brightness-95"
                >
                  {t("header.myAccount")}
                </a>
              </>
            ) : (
              <a
                href="/account"
                className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:brightness-95"
              >
                {t("header.signUp")}
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {isLoggedIn ? (
              <a
                href="/account#wishlist"
                aria-label="Open favorites"
                className={[
                  "relative inline-flex h-11 w-11 items-center justify-center rounded-full",
                  transparent ? "border border-white/20 text-white" : "border border-brand-border text-brand-text",
                ].join(" ")}
              >
                <Heart className="h-4 w-4" />
                {wishlistCount ? (
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-accent px-1 text-[10px] font-bold text-brand-dark">
                    {wishlistCount}
                  </span>
                ) : null}
              </a>
            ) : null}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className={[
                "inline-flex h-11 w-11 items-center justify-center rounded-full",
                transparent ? "border border-white/20 text-white" : "border border-brand-border text-brand-text",
              ].join(" ")}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="container-shell lg:hidden">
          <div className="mt-3 rounded-[28px] border border-brand-border/80 bg-white p-4 shadow-2xl">
            <nav aria-label="Mobile" className="space-y-1">
              {navLinks.map((link) => {
                const active = isActivePath(currentPath, link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={[
                      "block rounded-2xl px-4 py-3 text-sm transition",
                      active
                        ? "bg-brand-accent text-brand-dark"
                        : "text-brand-muted hover:bg-slate-50 hover:text-brand-text",
                    ].join(" ")}
                  >
                    {t(link.key)}
                  </a>
                );
              })}
            </nav>

            <div className="mt-4 grid gap-3 border-t border-brand-border pt-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <HeaderSettings
                  language={language}
                  onLanguageChange={handleLanguageChange}
                  t={t}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="/account"
                className="flex-1 rounded-2xl bg-brand-accent px-4 py-3 text-center text-sm font-semibold text-brand-dark"
              >
                {isLoggedIn ? t("header.myAccount") : t("header.signUp")}
              </a>
              <button
                type="button"
                onClick={() => setIsLoggedIn((prev) => !prev)}
                className="rounded-2xl border border-brand-border px-4 py-3 text-sm font-semibold text-brand-text transition hover:border-brand-teal hover:text-brand-teal"
              >
                {isLoggedIn ? t("header.signOut") : t("header.demoLogin")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
