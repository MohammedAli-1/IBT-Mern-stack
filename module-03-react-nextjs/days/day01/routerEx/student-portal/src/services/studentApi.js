const API_URL = "students.json";

export async function getStudents() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load students");
  }

  return response.json();
}