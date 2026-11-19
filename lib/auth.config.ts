import { verify, sign } from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.NEXTAUTH_SECRET || "dev-secret-change-in-production-please";

export interface AuthToken {
  id: string;
  email: string;
  role: string;
}

/** Reads and verifies the auth-token cookie. Returns the decoded payload or null. */
export async function getAuthToken(): Promise<AuthToken | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");
    if (!token) return null;
    return verify(token.value, SECRET) as AuthToken;
  } catch {
    return null;
  }
}

/** Creates a signed JWT for a user. */
export function createToken(payload: AuthToken): string {
  return sign(payload, SECRET, { expiresIn: "7d" });
}
