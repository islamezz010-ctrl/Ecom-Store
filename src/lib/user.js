/**
 * Get the current authenticated user from localStorage
 * Returns null if no user is logged in
 */
export function getCurrentUser() {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (err) {
    console.error("Error parsing user info:", err);
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return getCurrentUser() !== null;
}

/**
 * Clear user data (logout)
 */
export function clearUser() {
  localStorage.removeItem("userInfo");
  window.dispatchEvent(new Event("auth:changed"));
}
