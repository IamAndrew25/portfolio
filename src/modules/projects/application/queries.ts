import type { ProjectCatalog } from "./project-catalog.port";

export async function getPublishedProjects(catalog: ProjectCatalog) {
    return (await catalog.list())
        .filter((project) => project.publication === "published")
        .sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(catalog: ProjectCatalog, slug: string) {
    return (await getPublishedProjects(catalog)).find((project) => project.slug === slug);
}
