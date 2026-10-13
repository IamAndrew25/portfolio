import type { Project } from "@/modules/projects/domain/project";

const repo = "https://github.com/IamAndrew25/ET-JAI-ORX-Andres-Obispo-Calla";
const revision = `${repo}/tree/6381c60c0c82dc2bb9afcac99a88f4052799817f`;

export const ragProject = {
    slug: "financial-rag",
    publication: "published",
    status: "maintained",
    category: "ai",
    visual: "rag",
    order: 1,
    title: { en: "Financial RAG API", es: "API RAG financiera" },
    categoryLabel: { en: "Applied AI · Financial documents", es: "IA aplicada · Documentos financieros" },
    headline: { en: "Answers with context.\nSources you can inspect.", es: "Respuestas con contexto.\nFuentes que puedes revisar." },
    description: {
        en: "A document Q&A API built for the Orexe technical challenge: from financial reports to vector retrieval, generated answers and inspectable source excerpts.",
        es: "API de consultas documentales desarrollada para el reto técnico Orexe: de informes financieros a recuperación vectorial, respuestas generadas y fragmentos de fuentes verificables.",
    },
    role: { en: "Backend, RAG pipeline & regression tests", es: "Backend, flujo RAG y pruebas de regresión" },
    stack: ["Python", "FastAPI", "ChromaDB", "LangChain", "Gemini", "Docker"],
    repository: { visibility: "public", url: repo },
    xyz: {
        outcome: { en: "Connected financial-document ingestion, retrieval and source-backed answers in one API.", es: "Integré ingesta documental, recuperación y respuestas con fuentes en una API financiera." },
        evidence: { en: "19 automated tests passed on the hardening revision; source, tests and Docker setup are public.", es: "19 pruebas automatizadas aprobadas en la revisión de seguridad; código, pruebas y configuración Docker públicos." },
        approach: { en: "Separated ingestion, retrieval and generation, then added API-key access, bounded uploads and stable indexing IDs.", es: "Separé ingesta, recuperación y generación; incorporé acceso por API key, límites de carga e IDs estables de indexación." },
    },
    stages: [
        {
            id: "ingest", title: { en: "Ingest", es: "Ingesta" }, tool: "FastAPI · PDF / MD / TXT",
            description: { en: "Upload a document or load the supplied seed corpus. Extract text and attach source metadata before splitting it into chunks.", es: "Carga un documento o utiliza el corpus inicial. Extrae texto y adjunta metadatos de fuente antes de dividirlo en fragmentos." },
            decision: { en: "Keep HTTP validation separate from parsing. Require an API key and validate filenames, extensions and file size.", es: "Separar validación HTTP y extracción. Exigir API key y validar nombres, extensiones y tamaño de los archivos." },
            source: `${repo}/blob/main/app/api/routes/documents.py`,
        },
        {
            id: "index", title: { en: "Index", es: "Indexación" }, tool: "Gemini embeddings · ChromaDB",
            description: { en: "Embed chunks and store them locally in Chroma with document and chunk identifiers.", es: "Genera embeddings y almacena los fragmentos localmente en Chroma, con identificadores de documento y fragmento." },
            decision: { en: "Use stable IDs on reindexing. Add replacements before removing obsolete chunks rather than deleting the old document first.", es: "Usar IDs estables al reindexar. Añadir reemplazos antes de retirar fragmentos obsoletos, en lugar de borrar primero el documento anterior." },
            source: `${repo}/blob/main/app/services/ingestion/indexer.py`,
        },
        {
            id: "retrieve", title: { en: "Retrieve", es: "Recuperación" }, tool: "MMR · LangChain",
            description: { en: "Retrieve candidate passages for the question using maximum marginal relevance, balancing similarity with variety.", es: "Recupera pasajes para la pregunta mediante relevancia marginal máxima, combinando similitud y diversidad." },
            decision: { en: "Keep retrieval behind its own module so context selection can be inspected independently of answer generation.", es: "Mantener la recuperación en su propio módulo para revisar la selección de contexto por separado de la generación." },
            source: `${repo}/blob/main/app/services/retrieval/retriever.py`,
        },
        {
            id: "answer", title: { en: "Answer", es: "Respuesta" }, tool: "Gemini · answer + sources",
            description: { en: "Pass the retrieved context to Gemini and return the answer alongside document names, chunk IDs and excerpts.", es: "Envía el contexto recuperado a Gemini y devuelve la respuesta junto con nombres de documentos, IDs y fragmentos de fuente." },
            decision: { en: "Expose the evidence for inspection. A source list and a grounding prompt support review, but do not guarantee factual correctness.", es: "Exponer la evidencia para su revisión. Las fuentes y el prompt apoyan la verificación, pero no garantizan exactitud factual." },
            source: `${repo}/blob/main/app/services/rag/chain.py`,
        },
    ],
    evidence: [
        { title: { en: "19 regression tests", es: "19 pruebas de regresión" }, description: { en: "The published revision passed isolated tests for access, validation, ingestion, health and startup. External model calls are mocked.", es: "La revisión publicada aprobó pruebas aisladas de acceso, validación, ingesta, salud e inicio. Las llamadas externas al modelo usan mocks." }, url: `${revision}/tests` },
        { title: { en: "Inspectable backend", es: "Backend verificable" }, description: { en: "Explore the pipeline, deployment instructions and API contracts. This is a technical-challenge implementation, not a live financial service.", es: "Revisa el flujo, las instrucciones de despliegue y los contratos de API. Es una implementación de reto técnico, no un servicio financiero en producción." }, url: repo },
    ],
} satisfies Project;
