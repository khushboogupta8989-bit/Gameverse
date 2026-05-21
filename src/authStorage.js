/** Session-only auth (clears when browser tab/window closes — not localStorage). */

const KEYS = ['token', 'user', 'gv_profile'];

export function getAuthItem(key) {
  return sessionStorage.getItem(key);
}

export function setAuthItem(key, value) {
  sessionStorage.setItem(key, value);
}

export function removeAuthItem(key) {
  sessionStorage.removeItem(key);
}

export function clearAuth() {
  KEYS.forEach((key) => {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  });
}

/** Remove old persistent login from previous builds */
export function clearLegacyAuth() {
  KEYS.forEach((key) => localStorage.removeItem(key));
}
