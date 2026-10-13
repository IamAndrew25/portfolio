import { ProjectIndex } from "@/modules/projects/presentation/ProjectIndex";
import { publishedProjects } from "@/app/_composition/projects";
import { pageMetadata } from "@/shared/seo/metadata";

export const metadata = pageMetadata("en", "/projects/", "Selected work — Andres Obispo Calla");

export default async function Page() {
    return <ProjectIndex locale="en" projects={await publishedProjects()} />;
}
