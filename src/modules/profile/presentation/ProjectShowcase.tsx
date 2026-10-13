import Link from "next/link";
import type { Project } from "@/modules/projects/domain/project";
import { ProjectVisual } from "@/modules/projects/presentation/ProjectVisual";
import { projectPath, type Locale } from "@/shared/i18n/locales";
import { getMessages } from "@/shared/i18n/messages";
import { Arrow } from "@/shared/ui/Arrow";
import { DepthSurface } from "@/shared/ui/DepthSurface";

export function ProjectShowcase({ project, locale }: { project: Project; locale: Locale }) {
    const t = getMessages(locale);

    return (
        <div className="hero-showcase hero-showcase-depth">
            <span className="showcase-coordinate eyebrow">01 / {t.selectedSystem}</span>
            <div className="showcase-stage" aria-hidden="true">
                <div className="stage-halo" />
                <div className="stage-floor" />
                <div className="stage-shadow" />
            </div>
            <DepthSurface className="hero-depth" intensity={6}>
                <div className="showcase-backplate" aria-hidden="true" />
                <div className="showcase-card">
                    <ProjectVisual visual={project.visual} locale={locale} priority />
                    <Link className="showcase-link" href={projectPath(locale, project.slug)}>
                        <div>
                            <span className="eyebrow">{t.featured}</span>
                            <strong>{project.title[locale]}</strong>
                        </div>
                        <span className="circle-arrow"><Arrow diagonal /></span>
                    </Link>
                </div>
                <div className="showcase-chip" aria-hidden="true">
                    <span className="chip-top">AI<span>ENGINEERING</span></span>
                    <span className="chip-front" />
                    <span className="chip-side" />
                </div>
                <div className="showcase-layer-label" aria-hidden="true">
                    <span className="layer-symbol"><i /><i /><i /></span>
                    <span>{t.systemLayers}</span>
                </div>
            </DepthSurface>
            <div className="showcase-note"><span className="note-line" /><span>{t.showcaseNote}</span></div>
            <p className="depth-hint eyebrow" aria-hidden="true">↗ {t.depthHint}</p>
        </div>
    );
}
