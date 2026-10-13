import { voiceProject } from "@/content/projects/opencode-voice-input/project";
import { faceProject } from "@/content/projects/synthetic-face-detector/project";
import { trilineaProject } from "@/content/projects/trilinea/project";
import { ragProject } from "@/content/projects/financial-rag/project";
import { reviewProject } from "@/content/projects/code-review-agent/project";
import type { ProjectCatalog } from "../application/project-catalog.port";

export const localProjectCatalog: ProjectCatalog = {
    async list() {
        return [ragProject, reviewProject, voiceProject, faceProject, trilineaProject];
    },
};
