import { RootDocument } from "@/shared/ui/RootDocument";
import { Arrow } from "@/shared/ui/Arrow";
import Link from "next/link";

export const metadata = { title: "Page not found — Andres Obispo Calla", robots: { index: false, follow: false } };

export default function NotFound() {
    return (
        <RootDocument locale="en">
            <main className="not-found container">
                <p className="eyebrow">404 / A DIFFERENT PATH</p>
                <h1>This page took<br />a different path.</h1>
                <p>The project may have moved, or this address doesn&apos;t exist.</p>
                <Link className="button button-primary" href="/">Back to home<Arrow /></Link>
                <Link className="text-link" href="/es/" lang="es">Ir al inicio en español<Arrow /></Link>
            </main>
        </RootDocument>
    );
}
