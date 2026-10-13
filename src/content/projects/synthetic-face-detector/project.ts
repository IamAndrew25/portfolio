import type { Project } from "@/modules/projects/domain/project";

export const faceProject = {
    slug: "synthetic-face-detector", publication: "published", status: "in-progress", category: "ai", visual: "vision", order: 4,
    title: { en: "Synthetic Face Detector", es: "Detector de Rostros Sintéticos" },
    categoryLabel: { en: "Computer vision · Academic research", es: "Visión por computadora · Proyecto académico" },
    headline: { en: "A model is only as good\nas its evaluation.", es: "Un modelo vale tanto\ncomo su evaluación." },
    description: { en: "A real-vs-synthetic face classification project. Rebuilding a CNN baseline around controlled data splits before comparing transfer-learning models.", es: "Clasificación de rostros reales y sintéticos. Reconstrucción de una CNN base con particiones controladas antes de comparar modelos de transferencia." },
    role: { en: "Dataset protocol & CNN baseline", es: "Protocolo de datos y CNN base" },
    stack: ["Python", "Keras", "CNN", "Google Colab"],
    repository: { visibility: "private" },
    xyz: {
        outcome: { en: "Established a controlled baseline experiment for real-vs-synthetic face classification.", es: "Establecí un experimento base controlado para clasificar rostros reales y sintéticos." },
        evidence: { en: "A versioned split manifest, notebook and evaluation report from the earlier experiment. The new baseline is in progress.", es: "Manifiesto de particiones, notebook e informe versionados del experimento anterior. La nueva línea base está en desarrollo." },
        approach: { en: "Defined separate training, validation and test sets, then trained and evaluated a custom CNN.", es: "Definí conjuntos separados de entrenamiento, validación y prueba, y entrené y evalué una CNN propia." },
    },
    stages: [
        { id: "dataset", title: { en: "Audit data", es: "Auditar datos" }, tool: "RVF10K", description: { en: "The controlled dataset contains 10,000 face images: 5,000 real and 5,000 StyleGAN-generated.", es: "El dataset controlado contiene 10.000 rostros: 5.000 reales y 5.000 generados con StyleGAN." }, decision: { en: "Audit paths and labels before training. This dataset does not establish generalization to every face generator.", es: "Auditar rutas y etiquetas antes de entrenar. Este dataset no demuestra generalización a todos los generadores." } },
        { id: "split", title: { en: "Fix splits", es: "Fijar particiones" }, tool: "7,000 / 1,500 / 1,500", description: { en: "A manifest defines disjoint training, validation and test sets for comparable experiments.", es: "Un manifiesto define conjuntos separados de entrenamiento, validación y prueba para comparar experimentos." }, decision: { en: "Use validation for model selection. Keep the test set out of architecture and hyperparameter decisions.", es: "Usar validación para elegir el modelo. Excluir el test de las decisiones de arquitectura e hiperparámetros." } },
        { id: "train", title: { en: "Train baseline", es: "Entrenar base" }, tool: "Custom CNN", description: { en: "A custom CNN provides the reference experiment. The current academic iteration is being rebuilt from data preparation.", es: "Una CNN propia sirve como experimento de referencia. La iteración académica actual se reconstruye desde la preparación de datos." }, decision: { en: "Establish a reproducible baseline before adding model complexity or claiming improvements.", es: "Establecer una base reproducible antes de añadir complejidad o afirmar mejoras." } },
        { id: "evaluate", title: { en: "Evaluate", es: "Evaluar" }, tool: "Precision · Recall · F1", description: { en: "Inspect class-level performance alongside accuracy. Comparisons with VGG-19, ResNet and MobileNet are planned.", es: "Revisar resultados por clase además de accuracy. Está prevista la comparación con VGG-19, ResNet y MobileNet." }, decision: { en: "Separate historical measurements from the current rebuild and document the limits of the benchmark.", es: "Separar las mediciones históricas de la reconstrucción actual y documentar los límites del benchmark." } },
    ],
    evidence: [
        { title: { en: "Historical baseline", es: "Línea base histórica" }, description: { en: "The previous test reported 76.27% accuracy on RVF10K. This is not a result of the current rebuild or a production claim.", es: "El test anterior reportó 76,27 % de accuracy en RVF10K. No es un resultado de la reconstrucción actual ni una afirmación de desempeño en producción." } },
        { title: { en: "Reproducibility artifacts", es: "Artefactos de reproducibilidad" }, description: { en: "Split manifest, notebook and report are in a private repository. The original Colab checkpoint was not preserved; retraining is necessary.", es: "Manifiesto, notebook e informe en un repositorio privado. El checkpoint original de Colab no se preservó; es necesario reentrenar." } },
    ],
} satisfies Project;
