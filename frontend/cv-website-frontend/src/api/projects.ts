// api/projects.ts
import { get } from "./httpClient";
import type { Project } from "../types/project";

export function fetchProjects(): Promise<Project[]> {
  return get<Project[]>("/api/projects");
}
