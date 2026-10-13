import { ResumePage } from "@/modules/profile/presentation/ResumePage";
import { publishedProjects } from "@/app/_composition/projects";
import { pageMetadata } from "@/shared/seo/metadata";

export const metadata = pageMetadata("es", "/resume/", "Currículum — Andres Obispo Calla");

export default async function Page() {
    return <ResumePage locale="es" projects={await publishedProjects()} />;
}
