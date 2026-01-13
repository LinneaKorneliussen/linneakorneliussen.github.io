export const API_BASE_URL = "http://localhost:5199";

export async function get<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error("API error");
  }
  return response.json();
}
