import type { Locale } from "@/shared/i18n/locales";
import { getMessages } from "@/shared/i18n/messages";
import { Arrow } from "@/shared/ui/Arrow";
import { profile } from "../profile";

export function ContactSection({ locale }: { locale: Locale }) {
    const t = getMessages(locale);

    return (
        <section className="contact-section container" id="contact">
            <div className="contact-panel">
                <div>
                    <p className="eyebrow">04 / {t.contactLabel}</p>
                    <h2>{t.contactTitle}</h2>
                    <p>{t.contactBody}</p>
                </div>
                <div className="contact-actions">
                    <a className="button button-dark" href={`mailto:${profile.email}`}>{t.email}<Arrow diagonal /></a>
                    <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
                    <div>
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal /></a>
                        <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <Arrow diagonal /></a>
                    </div>
                </div>
                <span className="contact-star" aria-hidden="true">✳</span>
            </div>
        </section>
    );
}
