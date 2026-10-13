import type { Project } from "../domain/project";
import type { Locale } from "@/shared/i18n/locales";
import { getMessages } from "@/shared/i18n/messages";
import { Arrow } from "@/shared/ui/Arrow";

export function SystemExplorer({ project, locale }: { project: Project; locale: Locale }) {
    const t = getMessages(locale);

    return (
        <section className="system-explorer" id="system" aria-labelledby="system-heading">
            <div className="section-heading">
                <div><p className="eyebrow">{t.insideBuild}</p><h2 id="system-heading">{t.explore}</h2></div>
                <p>{t.exploreDescription}</p>
            </div>
            <div className="system-flow" aria-hidden="true">
                {project.stages.map((stage, index) => (
                    <div key={stage.id}>
                        <span>0{index + 1}</span><b>{stage.title[locale]}</b>
                        {index < project.stages.length - 1 && <Arrow />}
                    </div>
                ))}
            </div>
            <div className="system-details">
                {project.stages.map((stage, index) => (
                    <details key={stage.id} name={`system-${project.slug}`} open={index === 0}>
                        <summary>
                            <span className="stage-index">0{index + 1}</span>
                            <span>{stage.title[locale]}</span>
                            <span className="stage-tool">{stage.tool}</span>
                            <span className="expand-icon" aria-hidden="true">+</span>
                        </summary>
                        <div className="stage-content">
                            <p>{stage.description[locale]}</p>
                            <div>
                                <span className="eyebrow">{t.decision}</span>
                                <p>{stage.decision[locale]}</p>
                                {stage.source && (
                                    <a className="text-link" href={stage.source} target="_blank" rel="noopener noreferrer">
                                        {t.implementation}<Arrow diagonal />
                                    </a>
                                )}
                            </div>
                        </div>
                    </details>
                ))}
            </div>
            <p className="caption">{t.documented}</p>
        </section>
    );
}
