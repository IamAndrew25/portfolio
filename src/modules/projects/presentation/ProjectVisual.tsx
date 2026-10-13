import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "../domain/project";
import type { Locale } from "@/shared/i18n/locales";
import { getMessages } from "@/shared/i18n/messages";
import { SystemVisual } from "./SystemVisual";

const waveform = [12, 22, 17, 38, 27, 48, 65, 37, 56, 80, 62, 45, 74, 100, 69, 42, 60, 89, 52, 37, 62, 43, 25, 42, 68, 39, 21, 35, 18, 11, 17, 9];

export function ProjectVisual({ visual, locale, priority = false }: { visual: Project["visual"]; locale: Locale; priority?: boolean }) {
    const t = getMessages(locale);

    if (visual === "rag" || visual === "review") {
        return <SystemVisual kind={visual} locale={locale} />;
    }

    if (visual === "architecture") {
        return (
            <figure className="project-visual architecture-visual">
                <Image src="/projects/trilinea.webp" alt={locale === "en" ? "Trilinea living-room render used in the material configurator" : "Render de sala de Trilinea utilizado en el configurador de materiales"} fill sizes="(max-width: 700px) 100vw, 60vw" priority={priority} />
                <div className="room-overlay" aria-hidden="true"><span className="room-hotspot">+</span><div className="material-samples"><i /><i /><i /><span>Material study / 03</span></div></div>
                <figcaption>{t.roomLabel}</figcaption>
            </figure>
        );
    }

    if (visual === "vision") {
        return (
            <figure className="project-visual vision-visual">
                <div className="vision-frame" aria-hidden="true">
                    <div className="vision-grid" />
                    <svg viewBox="0 0 240 240" fill="none" className="face-wireframe">
                        <path d="M78 43 120 28 162 43 181 78 185 121 166 171 142 201 120 211 98 201 74 171 55 121 59 78Z" />
                        <path d="m78 43 9 51-28-16m28 16 33-66 33 66 28-16M55 121l32-27 33 14 33-14 32 27M87 94l-13 77 46 40 46-40-13-77M74 171l46-16 46 16M120 108v47m-33-61 14 29 19-15 19 15 14-29M101 123l-5 33m43-33 5 33M96 156l24-1 24 1M98 201l6-26h32l6 26m-38-26 16 7 16-7" />
                        {[[87,94],[153,94],[101,123],[139,123],[120,108],[120,155],[74,171],[166,171],[120,28],[120,211]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />)}
                    </svg>
                    <span className="scan-corner top-left" /><span className="scan-corner bottom-right" />
                    <span className="vision-badge">REAL / SYNTHETIC</span>
                </div>
                <div className="split-legend" aria-hidden="true"><div><b>70%</b><span>Train</span></div><div><b>15%</b><span>Validation</span></div><div><b>15%</b><span>Test</span></div></div>
                <figcaption>{t.visionLabel} · RVF10K</figcaption>
            </figure>
        );
    }

    return (
        <figure className="project-visual voice-visual">
            <div className="voice-window" aria-hidden="true">
                <div className="window-chrome"><span className="window-dots"><i /><i /><i /></span><span>opencode / voice-input</span><span>⌘</span></div>
                <div className="voice-command"><span>~/workspace</span><p><b>❯</b> /voz<span className="command-cursor" /></p></div>
                <div className="waveform">{waveform.map((height, index) => <i key={index} style={{ "--bar-height": `${height}%`, "--delay": `${index * 30}ms` } as CSSProperties} />)}</div>
                <div className="wave-caption"><span>16 kHz / mono</span><span>audio → text</span></div>
                <div className="transcript"><span>↳</span><div><small>{locale === "en" ? "PROMPT OUTPUT" : "PROMPT DE SALIDA"}</small><p>{locale === "en" ? "An idea. Spoken. Ready to build." : "Una idea. En voz alta. Lista para construir."}</p></div></div>
            </div>
            <figcaption>{t.visualLabel} · TypeScript + Whisper</figcaption>
        </figure>
    );
}
