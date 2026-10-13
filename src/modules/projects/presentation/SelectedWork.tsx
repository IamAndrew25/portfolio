import Link from "next/link";
import type { Project } from "../domain/project";
import { localizedPath, type Locale } from "@/shared/i18n/locales";
import { getMessages } from "@/shared/i18n/messages";
import { Arrow } from "@/shared/ui/Arrow";
import { ProjectCard } from "./ProjectCard";

export function SelectedWork({ locale, projects }: { locale: Locale; projects: readonly Project[] }) {
    const t = getMessages(locale);

    return (
        <section className="work-section container" id="projects">
            <div className="section-heading">
                <div><p className="eyebrow">01 / {t.selected}</p><h2>{t.workTitle}</h2></div>
                <p>{t.workDescription}</p>
            </div>
            <div className="project-grid">
                {projects.slice(0, 3).map((project, index) => (
                    <ProjectCard key={project.slug} project={project} locale={locale} featured={index === 0} />
                ))}
            </div>
            <Link className="text-link project-index-link" href={localizedPath(locale, "/projects/")}>
                {t.allProjects}<Arrow />
            </Link>
        </section>
    );
}
