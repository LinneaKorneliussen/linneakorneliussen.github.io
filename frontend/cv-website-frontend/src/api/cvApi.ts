import { get } from "./httpClient";
import type { CV } from "../types/cv";  

export function fetchCv(): Promise<CV> {
  return get<CV>("/api/cv");
}
