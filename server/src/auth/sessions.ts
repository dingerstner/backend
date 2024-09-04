import type { Context } from "elysia";
import { auth } from ".";

export type AuthSession = {
  session: {
    user: {
id: string
email? : string
name?: string
email_verified: boolean
    }
  } | null
}

export async function newSession(
  userId: string,
  _: Context /*The context may be needed in the future*/,
): Promise<string> {
  const session = await auth.createSession(userId, {
    companyId: "",
    id: "",
    email: "",
    name: "",
    email_verified: false
  });

  return session.id;
}

export async function deleteSession(sessionId: string) {
  await auth.invalidateSession(sessionId);
}
