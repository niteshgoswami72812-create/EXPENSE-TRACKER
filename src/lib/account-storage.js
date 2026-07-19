const USERS_KEY = "paisaflow-users";
const SESSION_KEY = "paisaflow-session-user";

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function createUserId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `user-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function transactionKey(userId) {
  return `paisaflow-transactions:${userId}`;
}

// Converts the previous single-user demo account into the multi-user format.
function migrateLegacyUser() {
  const legacyUser = readJson("paisaflow-user", null);
  if (!legacyUser?.email) return [];

  const migratedUser = {
    id: createUserId(),
    name: legacyUser.name || "User",
    email: legacyUser.email.trim().toLowerCase(),
    password: legacyUser.password,
  };

  const oldTransactions = readJson("paisaflow-transactions", []);
  localStorage.setItem(USERS_KEY, JSON.stringify([migratedUser]));
  localStorage.setItem(
    transactionKey(migratedUser.id),
    JSON.stringify(oldTransactions),
  );

  return [migratedUser];
}

export function getUsers() {
  const users = readJson(USERS_KEY, []);
  if (Array.isArray(users) && users.length > 0) return users;
  return migrateLegacyUser();
}

export function registerUser(details) {
  const users = getUsers();
  const email = details.email.trim().toLowerCase();

  if (users.some((user) => user.email === email)) {
    return {
      ok: false,
      message: "An account with this email already exists. Please log in.",
    };
  }

  const newUser = {
    id: createUserId(),
    name: details.name.trim(),
    email,
    password: details.password,
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  localStorage.setItem(transactionKey(newUser.id), JSON.stringify([]));

  return { ok: true, user: newUser };
}

export function authenticateUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getUsers().find((item) => item.email === normalizedEmail);

  if (!user || user.password !== password) {
    return {
      ok: false,
      message: "Email or password does not match your signup details.",
    };
  }

  return { ok: true, user };
}

export function startUserSession(userId) {
  localStorage.setItem(SESSION_KEY, userId);
}

export function endUserSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSessionUser() {
  const userId = localStorage.getItem(SESSION_KEY);
  if (!userId) return null;
  return getUsers().find((user) => user.id === userId) ?? null;
}

export function getUserTransactions(userId) {
  return readJson(transactionKey(userId), []);
}

export function saveUserTransactions(userId, transactions) {
  localStorage.setItem(transactionKey(userId), JSON.stringify(transactions));
}

export function updateUserName(userId, name) {
  const users = getUsers().map((user) =>
    user.id === userId ? { ...user, name } : user,
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return users.find((user) => user.id === userId);
}
