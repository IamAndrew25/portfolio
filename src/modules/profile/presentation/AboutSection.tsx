import Image from "next/image";
import Link from "next/link";
import { localizedPath, type Locale } from "@/shared/i18n/locales";
import { getMessages } from "@/shared/i18n/messages";
import { Arrow } from "@/shared/ui/Arrow";
import { DepthSurface } from "@/shared/ui/DepthSurface";

export function AboutSection({ locale }: { locale: Locale }) {
    const t = getMessages(locale);

    return (
        <section className="about-section container" id="about">
            <div className="about-visual">
                <DepthSurface className="workspace-depth" intensity={4}>
                    <figure className="workspace-photo">
                        <Image
                            src="/profile/workspace.webp"
                            alt={t.workspaceAlt}
                            width={960}
                            height={1200}
                            sizes="(max-width: 700px) 75vw, 370px"
                        />
                        <figcaption className="eyebrow">{t.workspaceCaption}</figcaption>
                    </figure>
                </DepthSurface>
            </div>
            <div className="about-copy">
                <p className="eyebrow">03 / {t.aboutLabel}</p>
                <h2>{t.aboutTitle}</h2>
                <p>{t.aboutBody}</p>
                <p>{t.aboutSecond}</p>
                <div className="now-note"><span className="eyebrow">{t.now}</span><p>{t.nowText}</p></div>
                <Link className="text-link" href={localizedPath(locale, "/resume/")}>{t.resume}<Arrow diagonal /></Link>
            </div>
        </section>
    );
}
