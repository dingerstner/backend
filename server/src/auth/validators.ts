
import { emailVerificationTokens, passwordResetTokens } from "../db/primary/schema/user.entity";
import { db } from "../db/primary";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { eq } from "drizzle-orm";


export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }



  
export async function generateEmailVerificationCode(
  userId: string,
  email: string
): Promise<string> {
  await db
    .delete(emailVerificationTokens)
    .where(eq(emailVerificationTokens.userId, userId));

  const token = generateRandomString(6, alphabet("0-9"));
  await db.insert(emailVerificationTokens).values({
    userId: userId,
    email,
    token,
    expires: createDate(new TimeSpan(5, "m")), // 5 minutes
  });
  return token;
}


 
export async function createPasswordResetToken(
  userId: string
): Promise<string> {
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.userId, userId));

  const tokenId = generateRandomString(6, alphabet("0-9"));
  await db.insert(passwordResetTokens).values({
    id: tokenId,
    userId: userId,
    expires: createDate(new TimeSpan(2, "h")),
  });

  return tokenId;
}
