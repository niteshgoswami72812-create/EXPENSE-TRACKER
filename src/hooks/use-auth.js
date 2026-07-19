import { useState } from "react";
import {
  authenticateUser,
  endUserSession,
  getSessionUser,
  getUsers,
  registerUser,
  startUserSession,
  updateUserName,
} from "../lib/account-storage";

export function useAuth(showToast) {
  const [currentUser, setCurrentUser] = useState(getSessionUser);
  const [authMode, setAuthMode] = useState(() =>
    getUsers().length > 0 ? "login" : "signup",
  );
  const [loginEmail, setLoginEmail] = useState(
    () => getUsers()[0]?.email ?? "",
  );
  const [name, setName] = useState(() => currentUser?.name ?? "User");
  const [savedName, setSavedName] = useState(() => currentUser?.name ?? "User");

  function signup(details) {
    const result = registerUser(details);
    if (!result.ok) return result;

    setLoginEmail(result.user.email);
    setAuthMode("login");
    return { ok: true };
  }

  function login(credentials) {
    const result = authenticateUser(credentials.email, credentials.password);
    if (!result.ok) return result;

    startUserSession(result.user.id);
    setCurrentUser(result.user);
    setName(result.user.name);
    setSavedName(result.user.name);
    return { ok: true };
  }

  function logout() {
    endUserSession();
    setCurrentUser(null);
    setAuthMode("login");
  }

  function saveProfile(event) {
    event.preventDefault();
    const cleanName = name.trim() || "User";
    const updatedUser = updateUserName(currentUser.id, cleanName);

    setCurrentUser(updatedUser);
    setName(cleanName);
    setSavedName(cleanName);
    showToast("Profile settings saved.");
  }

  return {
    currentUser,
    authMode,
    loginEmail,
    name,
    savedName,
    setAuthMode,
    setName,
    signup,
    login,
    logout,
    saveProfile,
  };
}
