export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function minLen(str, n) {
  return typeof str === "string" && str.trim().length >= n;
}
