import type { Project } from "@/modules/projects/domain/project";

export const trilineaProject = {
    slug: "trilinea", publication: "published", status: "in-progress", category: "software", visual: "architecture", order: 5,
    title: { en: "Trilinea Arquitectura", es: "Trilinea Arquitectura" },
    categoryLabel: { en: "Software engineering · Interactive web", es: "Ingeniería de software · Web interactiva" },
    headline: { en: "Make a space\nyour own.", es: "Explorar un espacio.\nHacerlo propio." },
    description: { en: "An architecture studio website with an interactive material configurator, a 360° tour and protected contact forms. Currently in local development.", es: "Web para un estudio de arquitectura con configurador interactivo de materiales, recorrido 360° y formularios protegidos. En desarrollo local." },
    role: { en: "Web development & interaction design", es: "Desarrollo web y diseño de interacción" },
    stack: ["Astro", "TypeScript", "SVG", "Cloudflare"],
    repository: { visibility: "unavailable" },
    xyz: {
        outcome: { en: "Made it possible to explore material combinations across three configurable rooms.", es: "Hice posible explorar combinaciones de materiales en tres ambientes configurables." },
        evidence: { en: "Three room configurations with independent state, original-view comparison and documented desktop/mobile browser checks.", es: "Tres ambientes con estado independiente, comparación con el original y verificaciones de navegador documentadas en escritorio y móvil." },
        approach: { en: "Combined aligned image layers, SVG masks, deferred loading and a reusable room controller.", es: "Combiné capas de imágenes alineadas, máscaras SVG, carga diferida y un controlador de ambientes reutilizable." },
    },
    stages: [
        { id: "assets", title: { en: "Prepare", es: "Preparar" }, tool: "WebP · SVG masks", description: { en: "Room renders are aligned and split into material layers, with foreground masks to preserve furniture and objects.", es: "Los renders se alinean y dividen en capas de materiales, con máscaras para preservar muebles y objetos." }, decision: { en: "Use perspective alignment where source camera positions differ. Keep source images separate from generated assets.", es: "Usar alineación de perspectiva cuando las cámaras difieren. Separar fuentes de recursos generados." } },
        { id: "compose", title: { en: "Compose", es: "Componer" }, tool: "Astro · SVG", description: { en: "Visitors select a room and change materials by region. Each room keeps its own selections.", es: "El visitante elige un ambiente y cambia materiales por zona. Cada ambiente conserva sus selecciones." }, decision: { en: "A fixed-camera 2D composition is sufficient for material selection. It does not simulate new lighting or reflections.", es: "Una composición 2D de cámara fija basta para elegir materiales. No simula nueva iluminación ni reflejos." } },
        { id: "load", title: { en: "Load on demand", es: "Cargar a demanda" }, tool: "TypeScript", description: { en: "Room layers are loaded when selected, with isolated pending requests and a retry path if assets fail.", es: "Las capas se cargan al elegir el ambiente, con solicitudes pendientes aisladas y reintento si fallan." }, decision: { en: "Keep the previous room visible during a failed load rather than replacing it with an empty view.", es: "Conservar el ambiente anterior ante un fallo de carga en lugar de mostrar una vista vacía." } },
        { id: "verify", title: { en: "Verify", es: "Verificar" }, tool: "Browser checks", description: { en: "Documented checks cover navigation, per-room state, reset, keyboard use and material-mask edges.", es: "Las verificaciones documentadas cubren navegación, estado por ambiente, reinicio, teclado y bordes de máscaras." }, decision: { en: "Check visible results and failure recovery. Production hosting and global form rate limits are still pending.", es: "Verificar resultados visibles y recuperación ante fallos. El hosting de producción y los límites globales de formularios siguen pendientes." } },
    ],
    evidence: [
        { title: { en: "Three-room configurator", es: "Configurador de tres ambientes" }, description: { en: "TV room, dining room and lounge share a controller while retaining independent material selections.", es: "Sala de TV, comedor y sala de estar comparten controlador y mantienen selecciones de materiales independientes." } },
        { title: { en: "Local validation", es: "Validación local" }, description: { en: "The project records 32 passing browser checks for the three-room configurator. A public deployment is still pending.", es: "El proyecto documenta 32 verificaciones de navegador aprobadas para el configurador. La publicación continúa pendiente." } },
    ],
} satisfies Project;
