import { auth } from "@/auth/index";
import {db} from "@/db/primary";
import { password as bunPassword } from "bun";
import { t } from "elysia";
import { isWithinExpirationDate } from "oslo";
import { alphabet, generateRandomString, sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { createBaseElysia } from "@/base";
import { passwordResetTokens, user} from "@/db/primary/schema/user";
import { eq} from "drizzle-orm";
import { admin } from "../..";


const passwordResetConfirm = createBaseElysia().post(
    "/:token",
    async ({ params: { token }, body: { password }, env: { PASSWORD_PEPPER }, set }) => {
      const hashedToken = encodeHex(await sha256(new TextEncoder().encode(token)))
      const resetToken = await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.hashedToken, hashedToken));

      if (!resetToken  ||
        !isWithinExpirationDate(resetToken[0].expires )
      ) {
        throw new Error(" expired token");
      }
      await auth.invalidateSession(resetToken[0].userId);
      const passwordPepper = PASSWORD_PEPPER;
      const passwordSalt = generateRandomString(16, alphabet("a-z", "A-Z", "0-9"));
		  const hashedPassword = await bunPassword.hash(passwordSalt + password + passwordPepper);

		   await db.update(admin)
        .set({
                hashedPassword: hashedPassword,
				passwordSalt: passwordSalt,
              }).where(eq(user.id, resetToken[0].id.toString()));
		

              await auth.invalidateUserSessions(resetToken[0].expires.toISOString());

        await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, resetToken[0].id));
	

        set.status = 204;
	},
	{
		body: t.Object({
			password: t.String(),
		}),
	},
);

export { passwordResetConfirm };