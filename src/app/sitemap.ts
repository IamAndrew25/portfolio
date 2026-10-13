import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/modules/projects/application/queries";
import { localProjectCatalog } from "@/modules/projects/infrastructure/local-project-catalog";
import { locales, localizedPath } from "@/shared/i18n/locales";
import { siteUrl } from "@/shared/seo/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projects = await getPublishedProjects(localProjectCatalog);
    const paths = ["/", "/projects/", "/resume/", ...projects.map(({ slug }) => `/projects/${slug}/`)];
    return paths.flatMap((path) => locales.map((locale) => ({
        url: new URL(localizedPath(locale, path), siteUrl).href,
        alternates: { languages: { en: new URL(path, siteUrl).href, es: new URL(localizedPath("es", path), siteUrl).href } },
    })));
}
