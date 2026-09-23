const API_URL = "/teachers.json";

export async function getTeachers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load teachers");
  }

  return response.json();
}