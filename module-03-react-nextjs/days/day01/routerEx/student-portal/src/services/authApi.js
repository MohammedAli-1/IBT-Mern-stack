const API_URL = "/users.json";

export async function loginUser(email, password) {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load users");
  }

  const users = await response.json();

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
}
