import type { Localized } from "@/shared/i18n/locales";

export interface SystemStage {
    readonly id: string;
    readonly title: Localized;
    readonly tool: string;
    readonly description: Localized;
    readonly decision: Localized;
    readonly source?: string;
}

export interface Project {
    readonly slug: string;
    readonly publication: "draft" | "published";
    readonly status: "maintained" | "in-progress";
    readonly category: "ai" | "software";
    readonly visual: "voice" | "vision" | "architecture" | "rag" | "review";
    readonly order: number;
    readonly title: Localized;
    readonly categoryLabel: Localized;
    readonly headline: Localized;
    readonly description: Localized;
    readonly role: Localized;
    readonly stack: readonly string[];
    readonly xyz: {
        readonly outcome: Localized;
        readonly evidence: Localized;
        readonly approach: Localized;
    };
    readonly repository:
        | { readonly visibility: "public"; readonly url: string }
        | { readonly visibility: "private" | "unavailable" };
    readonly demo?: string;
    readonly stages: readonly SystemStage[];
    readonly evidence: readonly {
        readonly title: Localized;
        readonly description: Localized;
        readonly url?: string;
    }[];
}
