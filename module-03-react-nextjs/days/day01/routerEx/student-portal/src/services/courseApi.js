const API_URL = "/courses.json";

export async function getCourses() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load courses");
  }

  return response.json();
}