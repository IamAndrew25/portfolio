import { HomePage } from "@/modules/profile/presentation/HomePage";
import { publishedProjects } from "@/app/_composition/projects";

export default async function Page() {
    return <HomePage locale="en" projects={await publishedProjects()} />;
}
