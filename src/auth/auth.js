import { users } from "../roles";

export function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
  return null;
}

export function logout() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function requireRole(role) {
  const user = getCurrentUser();
  return user && user.role === role;
}