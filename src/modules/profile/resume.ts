import type { Localized } from "@/shared/i18n/locales";

interface ResumeProject {
    id: string;
    catalogSlug?: string;
    title: Localized;
    context: Localized;
    stack: readonly string[];
    contribution: Localized;
}

interface ResumeContent {
    summary: Localized;
    education: {
        institution: string;
        degree: Localized;
        graduation: Localized;
        distinction: Localized;
    };
    projects: readonly ResumeProject[];
    skills: readonly { label: Localized; items: Localized }[];
    credentials: readonly { provider: string; detail: Localized; year: string }[];
    languages: Localized;
}

// Biographical details come from the owner's 2026 CV. Technical descriptions
// are reconciled with the current project evidence rather than copied verbatim.
export const resume: ResumeContent = {
    summary: {
        en: "Software Engineering student in the ninth semester, focused on applied AI and software engineering opportunities. Project experience with RAG APIs, anomaly detection and voice integration, grounded in Python, data structures, algorithms, databases and testing.",
        es: "Estudiante de Ingeniería de Software de noveno ciclo, enfocado en oportunidades de software e IA aplicada. Experiencia en proyectos de APIs RAG, detección de anomalías e integración de voz, con bases en Python, estructuras de datos, algoritmos, bases de datos y testing.",
    },
    education: {
        institution: "Universidad Tecnológica del Perú",
        degree: { en: "Software Engineering · Ninth semester", es: "Ingeniería de Software · Noveno ciclo" },
        graduation: { en: "Expected graduation: August 2027", es: "Egreso esperado: agosto de 2027" },
        distinction: {
            en: "Academic standing in the top third and top 10% in multiple semesters.",
            es: "Rendimiento académico en Tercio y Décimo Superior en múltiples semestres.",
        },
    },
    projects: [
        {
            id: "financial-rag",
            catalogSlug: "financial-rag",
            title: { en: "Financial-document RAG API", es: "API RAG para documentos financieros" },
            context: { en: "Orexe technical challenge · 2026", es: "Reto técnico Orexe · 2026" },
            stack: ["Python", "FastAPI", "LangChain", "ChromaDB", "Docker"],
            contribution: {
                en: "Built a document Q&A API with vector retrieval and source citations. Packaged ingestion, retrieval and API startup in Docker, with mocked endpoint tests for repeatable verification.",
                es: "Desarrollé una API de consultas documentales con recuperación vectorial y citas de fuentes. Integré ingesta, recuperación e inicio de la API en Docker, con pruebas de endpoints mediante mocks para una verificación repetible.",
            },
        },
        {
            id: "fintechpay-anomalies",
            title: { en: "FintechPay — transaction anomaly detection", es: "FintechPay — detección de anomalías en transacciones" },
            context: { en: "Academic team project · 2026", es: "Proyecto académico grupal · 2026" },
            stack: ["Python", "scikit-learn", "MLflow"],
            contribution: {
                en: "Implemented an anomaly-detection module for financial reconciliation. Tracked experiments in MLflow and documented model configuration and traceability for the team, within a Scrum and CMMI level 2 project context.",
                es: "Implementé un módulo de detección de anomalías para conciliación financiera. Registré experimentos en MLflow y documenté la configuración y trazabilidad del modelo para el equipo, en un proyecto con Scrum y CMMI nivel 2.",
            },
        },
    ],
    skills: [
        {
            label: { en: "Programming & data", es: "Programación y datos" },
            items: { en: "Python, TypeScript, SQL, PostgreSQL, SQLite, Pandas; OOP, data structures and algorithms.", es: "Python, TypeScript, SQL, PostgreSQL, SQLite, Pandas; POO, estructuras de datos y algoritmos." },
        },
        {
            label: { en: "AI & backend", es: "IA y backend" },
            items: { en: "RAG, ChromaDB, scikit-learn, MLflow, LLM APIs, FastAPI, REST APIs, Docker.", es: "RAG, ChromaDB, scikit-learn, MLflow, APIs de LLMs, FastAPI, APIs REST, Docker." },
        },
        {
            label: { en: "Engineering", es: "Ingeniería" },
            items: { en: "Git/GitHub, pytest, debugging, CLI; SOLID, Clean Architecture and MVC.", es: "Git/GitHub, pytest, debugging, CLI; SOLID, Clean Architecture y MVC." },
        },
    ],
    credentials: [
        {
            provider: "Google Cloud Skills Boost",
            detail: { en: "15+ badges in ML engineering, generative AI, cloud security and infrastructure", es: "Más de 15 badges en ML Engineering, IA generativa, seguridad cloud e infraestructura" },
            year: "2025",
        },
        {
            provider: "DSRP",
            detail: { en: "Python for Data Science · 77 hours", es: "Python orientado a la Ciencia de Datos · 77 horas" },
            year: "2026",
        },
        {
            provider: "Cisco Networking Academy",
            detail: { en: "Six course certificates in networking and cybersecurity", es: "Seis certificados de cursos de redes y ciberseguridad" },
            year: "2024",
        },
    ],
    languages: { en: "Spanish · English (intermediate)", es: "Español · Inglés (intermedio)" },
};
