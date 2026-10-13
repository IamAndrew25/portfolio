import type { Project } from "../domain/project";
import type { Locale } from "@/shared/i18n/locales";
import { getMessages } from "@/shared/i18n/messages";
import { SiteShell } from "@/shared/ui/SiteShell";
import { ProjectCard } from "./ProjectCard";

export function ProjectIndex({ locale, projects }: { locale: Locale; projects: readonly Project[] }) {
    const t = getMessages(locale);
    return <SiteShell locale={locale} path="/projects/"><main id="main" className="container project-index"><header className="section-heading"><div><p className="eyebrow">{t.selected}</p><h1>{t.workTitle}</h1></div><p>{t.workDescription}</p></header><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} featured={index === 0} />)}</div></main></SiteShell>;
}
