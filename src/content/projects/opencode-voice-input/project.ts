import type { Project } from "@/modules/projects/domain/project";

const repo = "https://github.com/IamAndrew25/opencode-voice-input";

export const voiceProject = {
    slug: "opencode-voice-input",
    publication: "published",
    status: "maintained",
    category: "ai",
    visual: "voice",
    order: 3,
    title: { en: "OpenCode Voice Input", es: "OpenCode Voice Input" },
    categoryLabel: { en: "AI integration · Developer tools", es: "Integración de IA · Herramientas de desarrollo" },
    headline: { en: "From spoken thought\nto a working prompt.", es: "De una idea en voz alta\na un prompt listo." },
    description: {
        en: "A voice-to-prompt workflow that connects microphone capture, silence detection and Whisper transcription directly to OpenCode.",
        es: "Un flujo de voz a prompt que conecta la captura del micrófono, la detección de silencio y la transcripción con Whisper directamente a OpenCode.",
    },
    role: { en: "Design & implementation", es: "Diseño e implementación" },
    stack: ["TypeScript", "Groq Whisper", "ffmpeg", "Node.js"],
    repository: { visibility: "public", url: repo },
    xyz: {
        outcome: { en: "Turned microphone recordings into prompts inside OpenCode.", es: "Convertí grabaciones del micrófono en prompts dentro de OpenCode." },
        evidence: { en: "A documented /voz command and an audio-fixture integration test against Groq.", es: "Comando /voz documentado y prueba de integración con un audio de referencia contra Groq." },
        approach: { en: "Separated audio capture, speech transcription and command integration in TypeScript.", es: "Separé captura de audio, transcripción e integración del comando en TypeScript." },
    },
    stages: [
        {
            id: "capture", title: { en: "Capture", es: "Captura" }, tool: "ffmpeg · WAV",
            description: { en: "The microphone is recorded as mono, 16 kHz PCM audio through ffmpeg on macOS.", es: "ffmpeg graba el micrófono en macOS como audio PCM mono a 16 kHz." },
            decision: { en: "Use a dedicated audio tool; keep recording orchestration separate from the transcription API.", es: "Usar una herramienta especializada en audio y separar la grabación de la API de transcripción." },
            source: `${repo}/blob/main/voz.ts`,
        },
        {
            id: "silence", title: { en: "Detect silence", es: "Detectar silencio" }, tool: "−35 dB · 3 s",
            description: { en: "A three-second silence window ends the recording after an initial four-second guard period.", es: "Una ventana de tres segundos de silencio detiene la grabación después de un margen inicial de cuatro segundos." },
            decision: { en: "Make the recording boundary explicit. The microphone index and silence thresholds remain configuration constraints.", es: "Definir el fin de la grabación explícitamente. El índice del micrófono y los umbrales siguen siendo restricciones de configuración." },
            source: `${repo}/blob/main/voz.ts`,
        },
        {
            id: "transcribe", title: { en: "Transcribe", es: "Transcribir" }, tool: "Groq · Whisper",
            description: { en: "A reusable transcribe(audioPath) function sends the WAV to whisper-large-v3-turbo and returns the text.", es: "La función reutilizable transcribe(audioPath) envía el WAV a whisper-large-v3-turbo y devuelve el texto." },
            decision: { en: "Keep the API boundary independent of OpenCode, propagate HTTP failures and load the key from the environment.", es: "Mantener la API independiente de OpenCode, propagar errores HTTP y cargar la clave desde el entorno." },
            source: `${repo}/blob/main/groq-stt.ts`,
        },
        {
            id: "prompt", title: { en: "Deliver prompt", es: "Entregar prompt" }, tool: "stdout → OpenCode",
            description: { en: "The /voz command passes the transcript to OpenCode. Progress messages go to stderr instead of polluting the prompt.", es: "El comando /voz entrega la transcripción a OpenCode. Los mensajes de progreso van a stderr para no contaminar el prompt." },
            decision: { en: "Use a small command interface with a clear output contract rather than coupling transcription to the editor UI.", es: "Usar una interfaz de comando pequeña con un contrato de salida claro, sin acoplar la transcripción a la interfaz del editor." },
            source: `${repo}/blob/main/setup.sh`,
        },
    ],
    evidence: [
        { title: { en: "Source & setup", es: "Código e instalación" }, description: { en: "Recording, transcription and installation are available in the public repository.", es: "Grabación, transcripción e instalación disponibles en el repositorio público." }, url: repo },
        { title: { en: "Integration check", es: "Prueba de integración" }, description: { en: "The documented test transcribes a committed audio fixture. It needs a Groq key and network access.", es: "La prueba documentada transcribe un audio versionado. Requiere una clave de Groq y acceso a la red." }, url: `${repo}#run-the-test-suite` },
    ],
} satisfies Project;
