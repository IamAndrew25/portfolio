import type { ReactNode } from "react";
import { RootDocument } from "@/shared/ui/RootDocument";
import { pageMetadata } from "@/shared/seo/metadata";

export const metadata = pageMetadata("es");

export default function Layout({ children }: { children: ReactNode }) {
    return <RootDocument locale="es">{children}</RootDocument>;
}
