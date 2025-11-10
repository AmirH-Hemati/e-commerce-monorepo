import { LoginFormInputs, RegisterClient } from "@repo/validation";

export async function getCurrentUser() {
  const res = await fetch("http://localhost:4000/api/v1/users/me", {
    method: "get",
    credentials: "include",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data;
}

export async function signup(data: RegisterClient) {
  const res = await fetch("http://localhost:4000/api/v1/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.message || "Signup failed!");
  }

  return responseData;
}
export async function login(data: LoginFormInputs) {
  const res = await fetch("http://localhost:4000/api/v1/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.message || "Login failed!");
  }

  return responseData;
}
export async function logout() {
  const res = await fetch("http://localhost:4000/api/v1/users/logout", {
    method: "POST",
    credentials: "include",
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.message || "Logout failed!");
  }

  return responseData;
}
