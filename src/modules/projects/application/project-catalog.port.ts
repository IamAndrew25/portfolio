import type { Project } from "../domain/project";

export interface ProjectCatalog {
    list(): Promise<readonly Project[]>;
}
