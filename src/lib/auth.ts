const COOKIE_NAME = "admin_session";

// Simple shared-secret session. For production, replace with a real auth provider.
function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

function getSessionToken(): string {
  return process.env.ADMIN_SESSION_TOKEN || "letmein";
}

export function verifyPassword(password: string): boolean {
  return password === getAdminPassword();
}

export function getExpectedToken(): string {
  return getSessionToken();
}

export function isAuthenticatedFromCookies(cookieStore: {
  get: (name: string) => { value: string } | undefined;
}): boolean {
  return cookieStore.get(COOKIE_NAME)?.value === getSessionToken();
}

export const ADMIN_COOKIE = COOKIE_NAME;
