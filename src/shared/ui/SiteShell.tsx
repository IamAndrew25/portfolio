import Link from "next/link";
import type { ReactNode } from "react";
import { profile } from "@/modules/profile/profile";
import { getMessages } from "@/shared/i18n/messages";
import { localizedPath, type Locale } from "@/shared/i18n/locales";
import { Arrow } from "./Arrow";

export function SiteShell({ locale, path = "/", children }: { locale: Locale; path?: string; children: ReactNode }) {
    const t = getMessages(locale);
    const home = localizedPath(locale);
    const otherLocale = locale === "en" ? "es" : "en";

    return (
        <>
            <a className="skip-link" href="#main">{t.skip}</a>
            <header className="site-header">
                <div className="container header-inner">
                    <Link className="wordmark" href={home} aria-label={`${profile.name} — ${locale === "en" ? "home" : "inicio"}`}>
                        <span className="monogram">ao<span>.</span></span>
                        <span className="wordmark-name">Andres Obispo Calla<span>Software & AI</span></span>
                    </Link>
                    <nav className="main-nav" aria-label={locale === "en" ? "Main navigation" : "Navegación principal"}>
                        <Link href={`${home}#projects`}>{t.work}</Link>
                        <Link className="nav-approach" href={`${home}#approach`}>{t.approach}</Link>
                        <Link href={`${home}#about`}>{t.about}</Link>
                        <Link className="nav-contact" href={`${home}#contact`}>{t.contact} <Arrow diagonal /></Link>
                        <a className="language-switch" href={localizedPath(otherLocale, path)} hrefLang={otherLocale} lang={otherLocale} aria-label={otherLocale === "es" ? "Cambiar a español" : "Switch to English"}>{otherLocale.toUpperCase()}</a>
                    </nav>
                </div>
            </header>
            {children}
            <footer className="site-footer container">
                <div><span className="monogram">ao<span>.</span></span><p>{t.footer}</p></div>
                <div className="footer-links">
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <Arrow diagonal /></a>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal /></a>
                    <Link href={localizedPath(locale, "/resume/")}>{t.resume} <Arrow diagonal /></Link>
                </div>
                <span className="copyright">© {new Date().getFullYear()} {profile.name}</span>
            </footer>
        </>
    );
}
