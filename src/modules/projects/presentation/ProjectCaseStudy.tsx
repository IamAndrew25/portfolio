import type { ReactNode } from "react";
import Link from "next/link";
import type { Project } from "../domain/project";
import { localizedPath, projectPath, type Locale } from "@/shared/i18n/locales";
import { getMessages } from "@/shared/i18n/messages";
import { SiteShell } from "@/shared/ui/SiteShell";
import { Arrow } from "@/shared/ui/Arrow";
import { ProjectVisual } from "./ProjectVisual";
import { SystemExplorer } from "./SystemExplorer";

interface ProjectProps {
    project: Project;
    locale: Locale;
}

function ProjectHeader({ project, locale }: ProjectProps) {
    const t = getMessages(locale);

    return (
        <header className="case-header">
            <div className="case-kicker">
                <span className="eyebrow">{project.categoryLabel[locale]}</span>
                <span className="status"><i />{project.status === "in-progress" ? t.inProgress : t.maintained}</span>
            </div>
            <p className="case-project-name">{project.title[locale]}</p>
            <h1>{project.headline[locale]}</h1>
            <p className="case-description">{project.description[locale]}</p>
            <div className="case-facts">
                <div><span className="eyebrow">{t.role}</span><p>{project.role[locale]}</p></div>
                <div><span className="eyebrow">{t.stack}</span><p>{project.stack.join(" / ")}</p></div>
                <div className="case-links">
                    {project.repository.visibility === "public" ? (
                        <a className="button button-primary" href={project.repository.url} target="_blank" rel="noopener noreferrer">
                            {t.source}<Arrow diagonal />
                        </a>
                    ) : (
                        <span className="source-note">
                            {project.repository.visibility === "private" ? t.privateCode : t.unavailableCode}
                        </span>
                    )}
                    {project.demo && (
                        <a className="text-link" href={project.demo} target="_blank" rel="noopener noreferrer">
                            {t.liveDemo}<Arrow diagonal />
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
}

function ProjectOutcomes({ project, locale }: ProjectProps) {
    const t = getMessages(locale);
    const outcomes = [
        { letter: "X", title: t.outcome, body: project.xyz.outcome[locale] },
        { letter: "Y", title: t.evidence, body: project.xyz.evidence[locale] },
        { letter: "Z", title: t.approachLabel, body: project.xyz.approach[locale] },
    ];

    return (
        <section className="xyz-section" aria-label={t.resultLabel}>
            {outcomes.map(({ letter, title, body }) => (
                <div key={letter}>
                    <span className="xyz-letter">{letter}</span>
                    <h2>{title}</h2>
                    <p>{body}</p>
                </div>
            ))}
        </section>
    );
}

function ProjectEvidence({ project, locale }: ProjectProps) {
    const t = getMessages(locale);

    return (
        <section className="evidence-section">
            <p className="eyebrow">{t.buildVerifyLearn}</p>
            <h2>{t.evidenceTitle}</h2>
            <div className="evidence-grid">
                {project.evidence.map((evidence) => (
                    <article key={evidence.title.en}>
                        <h3>{evidence.title[locale]}</h3>
                        <p>{evidence.description[locale]}</p>
                        {evidence.url && (
                            <a className="text-link" href={evidence.url} target="_blank" rel="noopener noreferrer">
                                GitHub<Arrow diagonal />
                            </a>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}

interface CaseStudyProps extends ProjectProps {
    nextProject?: Project;
    children: ReactNode;
}

export function ProjectCaseStudy({ project, nextProject, locale, children }: CaseStudyProps) {
    const t = getMessages(locale);
    const contents = [
        ["problem", t.problem],
        ["decisions", t.decisions],
        ["validation", t.validation],
        ["next", t.next],
    ];

    return (
        <SiteShell locale={locale} path={`/projects/${project.slug}/`}>
            <main id="main" className="case-page container">
                <Link className="text-link back-link" href={`${localizedPath(locale)}#projects`}>
                    <Arrow />{t.back}
                </Link>
                <ProjectHeader project={project} locale={locale} />
                <div className="case-cover"><ProjectVisual visual={project.visual} locale={locale} priority /></div>
                <ProjectOutcomes project={project} locale={locale} />
                <SystemExplorer project={project} locale={locale} />
                <div className="case-reading">
                    <aside>
                        <nav aria-label={t.onThisPage}>
                            <p className="eyebrow">{t.onThisPage}</p>
                            {contents.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
                        </nav>
                    </aside>
                    <article className="prose">{children}</article>
                </div>
                <ProjectEvidence project={project} locale={locale} />
                {nextProject && (
                    <Link className="next-project" href={projectPath(locale, nextProject.slug)}>
                        <div><span className="eyebrow">{t.nextProject}</span><h2>{nextProject.title[locale]}</h2></div>
                        <span className="circle-arrow"><Arrow diagonal /></span>
                    </Link>
                )}
            </main>
        </SiteShell>
    );
}
