import type { Project } from "@/modules/projects/domain/project";

const repo = "https://github.com/IamAndrew25/Code-review-agent";

export const reviewProject = {
    slug: "code-review-agent",
    publication: "published",
    status: "in-progress",
    category: "ai",
    visual: "review",
    order: 2,
    title: { en: "Code Review Agent", es: "Code Review Agent" },
    categoryLabel: { en: "AI agents · Developer tools", es: "Agentes de IA · Herramientas de desarrollo" },
    headline: { en: "A small agent.\nAn inspectable review loop.", es: "Un agente pequeño.\nUn ciclo de revisión verificable." },
    description: {
        en: "A Python security-review prototype that lets a model explore code through two read-only tools, then propose findings for human review.",
        es: "Prototipo de revisión de seguridad en Python: el modelo explora código mediante dos herramientas de lectura y propone hallazgos para revisión humana.",
    },
    role: { en: "Agent loop, file tools & manual evaluation", es: "Ciclo del agente, herramientas y evaluación manual" },
    stack: ["Python", "OpenAI SDK", "Tool calling", "Qwen"],
    repository: { visibility: "public", url: repo },
    xyz: {
        outcome: { en: "Built a tool-calling reviewer that inspects a chosen folder before reporting possible security issues.", es: "Construí un revisor con herramientas que inspecciona una carpeta antes de reportar posibles problemas de seguridad." },
        evidence: { en: "A public vulnerable fixture, a tool-check script and a manual trial against the financial RAG project.", es: "Ejemplo vulnerable público, script de comprobación de herramientas y prueba manual sobre el proyecto RAG financiero." },
        approach: { en: "Kept model decisions separate from Python execution, with a permitted root and a ten-turn model loop.", es: "Separé las decisiones del modelo de la ejecución en Python, con una raíz permitida y un ciclo de diez turnos." },
    },
    stages: [
        {
            id: "instruct", title: { en: "Instruct", es: "Instrucción" }, tool: "Prompt · OpenAI-compatible API",
            description: { en: "Send the security-review task, conversation history and tool schemas to the configured model endpoint.", es: "Envía la tarea de revisión, el historial y los esquemas de herramientas al endpoint configurado." },
            decision: { en: "Configure endpoint, model and API key through environment variables. The original experiment used a local Qwen server.", es: "Configurar endpoint, modelo y clave mediante variables de entorno. El experimento inicial utilizó un servidor Qwen local." },
            source: `${repo}/blob/main/agent.py`,
        },
        {
            id: "explore", title: { en: "Explore", es: "Exploración" }, tool: "list_files · read_file",
            description: { en: "The model requests a directory listing or file content. Python dispatches only the two registered functions.", es: "El modelo solicita listar un directorio o leer un archivo. Python ejecuta únicamente las dos funciones registradas." },
            decision: { en: "Resolve paths and reject destinations outside target_project. The tools expose no write or shell command capability.", es: "Resolver rutas y rechazar destinos fuera de target_project. Las herramientas no exponen escritura ni comandos de terminal." },
            source: `${repo}/blob/main/tools.py`,
        },
        {
            id: "observe", title: { en: "Observe", es: "Observación" }, tool: "Tool result · call ID",
            description: { en: "Return each result with its tool-call ID, keeping the model's request and the actual filesystem response connected.", es: "Devuelve cada resultado con su ID de llamada, relacionando la petición del modelo con la respuesta real del sistema de archivos." },
            decision: { en: "Bound the loop to ten model turns and return the first 5,000 characters of a file. These limits constrain coverage.", es: "Limitar el ciclo a diez turnos del modelo y devolver los primeros 5.000 caracteres de cada archivo. Estos límites acotan la cobertura." },
            source: `${repo}/blob/main/agent.py`,
        },
        {
            id: "review", title: { en: "Review", es: "Revisión" }, tool: "Finding · Evidence · Human check",
            description: { en: "The model proposes issues, risks and fixes. The developer checks them against the code before acting.", es: "El modelo propone problemas, riesgos y correcciones. El desarrollador los contrasta con el código antes de actuar." },
            decision: { en: "Evaluate both useful findings and false positives. An agent-generated report is not a completed security audit.", es: "Evaluar tanto hallazgos útiles como falsos positivos. El informe del agente no equivale a una auditoría de seguridad completa." },
            source: `${repo}/blob/main/target_project/app.py`,
        },
    ],
    evidence: [
        { title: { en: "Known-issue fixture", es: "Ejemplo con fallos conocidos" }, description: { en: "A deliberately insecure Python file makes SQL injection, eval() and a hardcoded password available as concrete review targets.", es: "Un archivo Python deliberadamente inseguro incluye inyección SQL, eval() y una contraseña fija como objetivos concretos de revisión." }, url: `${repo}/blob/main/target_project/app.py` },
        { title: { en: "Tool boundary check", es: "Comprobación de herramientas" }, description: { en: "try_tools.py exercises listing, reading and a rejected path outside the root. It is a smoke check, not a comprehensive test suite.", es: "try_tools.py comprueba listado, lectura y rechazo de una ruta fuera de la raíz. Es una comprobación básica, no una suite exhaustiva." }, url: `${repo}/blob/main/try_tools.py` },
    ],
} satisfies Project;
