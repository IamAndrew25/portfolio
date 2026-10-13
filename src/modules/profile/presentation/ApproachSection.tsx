import Link from "next/link";
import type { Project } from "@/modules/projects/domain/project";
import { projectPath, type Locale } from "@/shared/i18n/locales";
import { getMessages } from "@/shared/i18n/messages";
import { Arrow } from "@/shared/ui/Arrow";

const examples = [
    { symbol: "↗", slug: "financial-rag", section: "problem" },
    { symbol: "⌘", slug: "code-review-agent", section: "system" },
    { symbol: "◎", slug: "synthetic-face-detector", section: "validation" },
];

export function ApproachSection({ locale, projects }: { locale: Locale; projects: readonly Project[] }) {
    const t = getMessages(locale);

    return (
        <section className="approach-section" id="approach">
            <div className="container">
                <div className="section-heading">
                    <div><p className="eyebrow">02 / {t.approach}</p><h2>{t.approachTitle}</h2></div>
                    <p>{t.approachDescription}</p>
                </div>
                <div className="principles">
                    {t.principles.map((principle, index) => {
                        const example = examples[index];
                        const isPublished = projects.some((project) => project.slug === example.slug);
                        return (
                            <article key={principle.tag}>
                                <span className="principle-symbol" aria-hidden="true">{example.symbol}</span>
                                <p className="eyebrow">{principle.tag}</p>
                                <h3>{principle.title}</h3>
                                <p>{principle.description}</p>
                                {isPublished && (
                                    <Link className="text-link" href={`${projectPath(locale, example.slug)}#${example.section}`}>
                                        {t.caseStudy}<Arrow />
                                    </Link>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
