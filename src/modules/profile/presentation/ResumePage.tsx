import Link from "next/link";
import type { Project } from "@/modules/projects/domain/project";
import { projectPath, type Locale } from "@/shared/i18n/locales";
import { getMessages } from "@/shared/i18n/messages";
import { SiteShell } from "@/shared/ui/SiteShell";
import { profile } from "../profile";
import { resume } from "../resume";
import { PrintButton } from "./PrintButton";

export function ResumePage({ locale, projects }: { locale: Locale; projects: readonly Project[] }) {
    const t = getMessages(locale);
    const voiceProject = projects.find((project) => project.slug === "opencode-voice-input");
    const otherProjects = projects.filter((project) => project.slug !== voiceProject?.slug && !resume.projects.some((entry) => entry.catalogSlug === project.slug));

    return (
        <SiteShell locale={locale} path="/resume/">
            <main id="main" className="resume-page container">
                <div className="resume-toolbar">
                    <p className="eyebrow">{t.resumeTitle}</p><PrintButton label={t.print} />
                </div>
                <article className="resume-sheet">
                    <header>
                        <h1>{profile.fullName}</h1>
                        <p className="resume-role">AI Engineer · Software Engineering</p>
                        <div className="resume-contact">
                            <span>{profile.location[locale]}</span>
                            <a href={`mailto:${profile.email}`}>{profile.email}</a>
                            <a href={`tel:${profile.phone}`}>{profile.phoneLabel}</a>
                            <a href={profile.github}>GitHub / IamAndrew25</a>
                            <a href={profile.linkedin}>LinkedIn</a>
                        </div>
                    </header>
                    <section><h2>{t.profile}</h2><p>{resume.summary[locale]}</p></section>
                    <section>
                        <h2>{t.resumeEducation}</h2>
                        <div className="resume-entry-heading">
                            <h3>{resume.education.institution}</h3>
                            <span>{resume.education.graduation[locale]}</span>
                        </div>
                        <p>{resume.education.degree[locale]}</p>
                        <p>{resume.education.distinction[locale]}</p>
                    </section>
                    <section>
                        <h2>{t.resumeProjects}</h2>
                        {resume.projects.map((project) => (
                            <div className="resume-project" key={project.id}>
                                <h3>
                                    {project.catalogSlug && projects.some((entry) => entry.slug === project.catalogSlug)
                                        ? <Link href={projectPath(locale, project.catalogSlug)}>{project.title[locale]}</Link>
                                        : project.title[locale]}
                                    <span>{project.context[locale]}</span>
                                </h3>
                                <p>{project.contribution[locale]}</p>
                                <p className="resume-stack">{project.stack.join(" · ")}</p>
                            </div>
                        ))}
                        {voiceProject && (
                            <div className="resume-project">
                                <h3>
                                    <Link href={projectPath(locale, voiceProject.slug)}>{voiceProject.title[locale]}</Link>
                                    <span>{t.publicCode} · 2026</span>
                                </h3>
                                <p>{voiceProject.xyz.outcome[locale]} {voiceProject.xyz.approach[locale]}</p>
                                <p className="resume-stack">{voiceProject.stack.join(" · ")}</p>
                            </div>
                        )}
                        {otherProjects.length > 0 && (
                            <p className="resume-additional">
                                <strong>{t.resumeAdditional}: </strong>
                                {otherProjects.map((project, index) => (
                                    <span key={project.slug}>
                                        {index > 0 && " · "}
                                        <Link href={projectPath(locale, project.slug)}>{project.title[locale]}</Link>
                                    </span>
                                ))}
                            </p>
                        )}
                    </section>
                    <section>
                        <h2>{t.resumeSkills}</h2>
                        {resume.skills.map((group) => (
                            <p key={group.label.en}><strong>{group.label[locale]}: </strong>{group.items[locale]}</p>
                        ))}
                    </section>
                    <section>
                        <h2>{t.resumeCredentials}</h2>
                        <ul className="resume-credentials">
                            {resume.credentials.map((credential) => (
                                <li key={credential.provider}>
                                    <strong>{credential.provider}</strong> — {credential.detail[locale]} ({credential.year}).
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section><h2>{t.resumeLanguages}</h2><p>{resume.languages[locale]}</p></section>
                </article>
            </main>
        </SiteShell>
    );
}
