import { ProjectIndex } from "@/modules/projects/presentation/ProjectIndex";
import { publishedProjects } from "@/app/_composition/projects";
import { pageMetadata } from "@/shared/seo/metadata";

export const metadata = pageMetadata("es", "/projects/", "Proyectos — Andres Obispo Calla");

export default async function Page() {
    return <ProjectIndex locale="es" projects={await publishedProjects()} />;
}
