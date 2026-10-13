import { CaseRoute, caseMetadata, projectParams } from "@/app/_composition/projects";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = projectParams;

export async function generateMetadata({ params }: Props) {
    return caseMetadata("es", (await params).slug);
}

export default async function Page({ params }: Props) {
    return <CaseRoute locale="es" slug={(await params).slug} />;
}
