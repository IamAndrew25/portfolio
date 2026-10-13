export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export type Localized<T = string> = Readonly<Record<Locale, T>>;

export function localizedPath(locale: Locale, path = "/"): string {
    return locale === "en" ? path : `/es${path}`;
}

export function projectPath(locale: Locale, slug: string): string {
    return localizedPath(locale, `/projects/${slug}/`);
}
