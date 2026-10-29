"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Link, usePathname } from "@/i18n/routing";

const subscribeToMountedState = () => () => {};
const getMountedState = () => true;
const getServerMountedState = () => false;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribeToMountedState, getMountedState, getServerMountedState);

  useEffect(() => {
    
    const saved = sessionStorage.getItem("portfolio-locale-scroll");
    if (!saved) return;
    try {
      const position = JSON.parse(saved) as { locale: string; y: number };
      if (position.locale === locale) {
        requestAnimationFrame(() => window.scrollTo({ top: position.y, behavior: "instant" }));
        sessionStorage.removeItem("portfolio-locale-scroll");
      }
    } catch {
      sessionStorage.removeItem("portfolio-locale-scroll");
    }
  }, [locale]);

  const nextLocale = locale === "fr" ? "en" : "fr";
  const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const themeName = t("themeNames." + (theme ?? "system"));
  const nextThemeName = t("themeNames." + nextTheme);

  function rememberPosition() {
    sessionStorage.setItem("portfolio-locale-scroll", JSON.stringify({ locale: nextLocale, y: window.scrollY }));
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">{t("skip")}</a>
      <nav className="nav-shell" aria-label={t("label")}>
        <Link href="/" className="wordmark" onClick={() => setMenuOpen(false)}>
          <span className="wordmark-mark" aria-hidden="true">A<span>.</span></span>
          <span>ARSÈNE<br /><small>{t("brandRole")}</small></span>
        </Link>
        <button className={"menu-toggle" + (menuOpen ? " is-active" : "")} type="button"
          aria-expanded={menuOpen} aria-controls="primary-navigation"
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
        <div id="primary-navigation" className={"nav-content" + (menuOpen ? " is-open" : "")}>
          <div className="nav-links">
            <Link href="/works" onClick={() => setMenuOpen(false)}>{t("works")}</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>{t("about")}</Link>
            <Link href="/lab" onClick={() => setMenuOpen(false)}>{t("lab")}</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>{t("contact")}</Link>
          </div>
          <div className="nav-tools">
            <Link className="locale-toggle" href={pathname} locale={nextLocale} scroll={false}
              onClick={rememberPosition} aria-label={t("switchLanguage", { locale: nextLocale.toUpperCase() })}>
              {nextLocale.toUpperCase()} <span aria-hidden="true">↗</span>
            </Link>
            {mounted && <button className="theme-toggle" type="button" onClick={() => setTheme(nextTheme)}
              aria-label={t("theme", { theme: nextThemeName })} title={t("theme", { theme: nextThemeName })}>
              <span aria-hidden="true">{theme === "light" ? "☼" : theme === "dark" ? "◐" : "◑"}</span>
              <span className="theme-label">{themeName}</span>
            </button>}
          </div>
        </div>
      </nav>
    </header>
  );
}