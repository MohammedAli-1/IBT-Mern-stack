const API_URL = "/classes.json";

export async function getClasses() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load classes");
  }

  return response.json();
}
