import Link from "next/link";
import type { Project } from "../domain/project";
import { projectPath, type Locale } from "@/shared/i18n/locales";
import { getMessages } from "@/shared/i18n/messages";
import { Arrow } from "@/shared/ui/Arrow";
import { DepthSurface } from "@/shared/ui/DepthSurface";
import { ProjectVisual } from "./ProjectVisual";

interface ProjectCardProps {
    project: Project;
    locale: Locale;
    featured?: boolean;
}

export function ProjectCard({ project, locale, featured = false }: ProjectCardProps) {
    const t = getMessages(locale);

    return (
        <DepthSurface className={`project-depth${featured ? " project-depth-featured" : ""}`} intensity={2.5}>
            <article className={`project-card${featured ? " project-card-featured" : ""}`}>
                <div className="project-card-art"><ProjectVisual visual={project.visual} locale={locale} /></div>
                <div className="project-card-copy">
                    <div className="project-overline">
                        <span className="eyebrow">{project.categoryLabel[locale]}</span>
                        <span className="project-number">0{project.order}</span>
                    </div>
                    <h3><Link href={projectPath(locale, project.slug)}>{project.title[locale]}</Link></h3>
                    <p className="project-card-outcome">{project.xyz.outcome[locale]}</p>
                    <div className="tags">{project.stack.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div>
                    <div className="project-card-bottom">
                        <Link className="text-link" href={projectPath(locale, project.slug)}>{t.caseStudy}<Arrow /></Link>
                        <span className="status"><i />{project.status === "in-progress" ? t.inProgress : t.maintained}</span>
                    </div>
                    {project.repository.visibility === "public" && (
                        <a className="source-caption" href={project.repository.url} target="_blank" rel="noopener noreferrer">
                            GitHub <Arrow diagonal />
                        </a>
                    )}
                </div>
            </article>
        </DepthSurface>
    );
}
