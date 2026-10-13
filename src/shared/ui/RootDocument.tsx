import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import type { Locale } from "@/shared/i18n/locales";
import "@/app/globals.css";
import "@/shared/design-system/depth.css";
import "@/shared/design-system/system-visuals.css";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
    return <html lang={locale}><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
