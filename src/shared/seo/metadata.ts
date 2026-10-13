import type { Metadata } from "next";
import type { Locale } from "@/shared/i18n/locales";
import { localizedPath } from "@/shared/i18n/locales";
import { profile } from "@/modules/profile/profile";
import { getMessages } from "@/shared/i18n/messages";

export const siteUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
);

export const isIndexable = process.env.VERCEL_ENV !== "preview" && !["localhost", "127.0.0.1"].includes(siteUrl.hostname);

export function pageMetadata(locale: Locale, path = "/", title = `${profile.name} — AI Engineer`, description = getMessages(locale).tagline, image = "portfolio") : Metadata {
    return {
        metadataBase: siteUrl,
        title,
        description,
        authors: [{ name: profile.name }],
        alternates: {
            canonical: localizedPath(locale, path),
            languages: { en: localizedPath("en", path), es: localizedPath("es", path), "x-default": localizedPath("en", path) },
        },
        openGraph: {
            title, description, type: "website", siteName: `${profile.name} — Portfolio`,
            url: localizedPath(locale, path), locale: locale === "en" ? "en_US" : "es_ES",
            images: [{ url: `/social/${image}.png`, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: [`/social/${image}.png`] },
        robots: { index: isIndexable, follow: isIndexable },
    };
}
