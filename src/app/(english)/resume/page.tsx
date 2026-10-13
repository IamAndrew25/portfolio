import { ResumePage } from "@/modules/profile/presentation/ResumePage";
import { publishedProjects } from "@/app/_composition/projects";
import { pageMetadata } from "@/shared/seo/metadata";

export const metadata = pageMetadata("en", "/resume/", "Résumé — Andres Obispo Calla");

export default async function Page() {
    return <ResumePage locale="en" projects={await publishedProjects()} />;
}
