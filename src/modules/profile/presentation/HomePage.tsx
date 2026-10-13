import type { Project } from "@/modules/projects/domain/project";
import type { Locale } from "@/shared/i18n/locales";
import { SiteShell } from "@/shared/ui/SiteShell";
import { SelectedWork } from "@/modules/projects/presentation/SelectedWork";
import { Hero } from "./Hero";
import { ApproachSection } from "./ApproachSection";
import { AboutSection } from "./AboutSection";
import { ContactSection } from "./ContactSection";

interface HomePageProps {
    locale: Locale;
    projects: readonly Project[];
}

export function HomePage({ locale, projects }: HomePageProps) {
    return (
        <SiteShell locale={locale}>
            <main id="main">
                <Hero locale={locale} featured={projects[0]} />
                <SelectedWork locale={locale} projects={projects} />
                <ApproachSection locale={locale} projects={projects} />
                <AboutSection locale={locale} />
                <ContactSection locale={locale} />
            </main>
        </SiteShell>
    );
}
