import Link from "next/link";
import type { Project } from "@/modules/projects/domain/project";
import { localizedPath, type Locale } from "@/shared/i18n/locales";
import { getMessages } from "@/shared/i18n/messages";
import { Arrow } from "@/shared/ui/Arrow";
import { ProjectShowcase } from "./ProjectShowcase";

export function Hero({ locale, featured }: { locale: Locale; featured?: Project }) {
    const t = getMessages(locale);

    return (
        <section className="hero container">
            <div className="hero-copy">
                <p className="availability"><span />{t.available}</p>
                <h1>
                    <span className="hero-ai">AI</span>{" "}
                    <span className="hero-engineer">Engineer<span className="hero-period">.</span></span>
                </h1>
                <p className="hero-description">{t.tagline}</p>
                <div className="hero-actions">
                    <a className="button button-primary" href="#projects">{t.viewWork}<Arrow /></a>
                    <Link className="button button-quiet" href={localizedPath(locale, "/resume/")}>
                        {t.resume}<Arrow diagonal />
                    </Link>
                </div>
            </div>
            {featured && <ProjectShowcase project={featured} locale={locale} />}
            <div className="hero-bottom">
                <p>{t.intro}</p>
                <a href="#projects" aria-label={t.viewWork}>
                    <span>{t.scrollExplore}</span><Arrow className="arrow-down" />
                </a>
            </div>
        </section>
    );
}
