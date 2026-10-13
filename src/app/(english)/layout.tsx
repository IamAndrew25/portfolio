import type { ReactNode } from "react";
import { RootDocument } from "@/shared/ui/RootDocument";
import { pageMetadata } from "@/shared/seo/metadata";

export const metadata = pageMetadata("en");

export default function Layout({ children }: { children: ReactNode }) {
    return <RootDocument locale="en">{children}</RootDocument>;
}
