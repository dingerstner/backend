import { db} from "@/db/primary";
import { passwordResetTokens, user} from "@/db/primary/schema/user";
import { t } from "elysia";
import { TimeSpan, generateId } from "lucia";
import nodemailer from "nodemailer" ;
import { createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { createBaseElysia } from "@/base";
import {eq} from "drizzle-orm";

const passwordResetRequest = createBaseElysia().post(
	"/",
	async ({ env, body: { email }, set }) => {
		const users = await db.select().from(user).where(eq(user.email, email));
		if (!users ) {
			set.status = 204;
			return null;
		}
		await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, users[0].id));
		const tokenId = generateId(40);
		const hashedToken = encodeHex(await sha256(new TextEncoder().encode(tokenId)));

		await db.insert(passwordResetTokens).values({
			  id: tokenId,
				hashedToken,
				expires: createDate(new TimeSpan(2, "h")),
        userId: users[0].id,
		});

		const transporter = nodemailer.createTransport({
			service: "gmail",
			port: 465,
			auth: {
				user: env.GMAIL_USER,
				pass: env.GMAIL_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: env.GMAIL_USER,
			to: email,
			subject: "Password Reset",
			text: `Click here to reset your password: http://localhost:3000/password-reset/${tokenId}`,
		});

		set.status = 204;
		return null;
	},
	{
		body: t.Object({
			email: t.String({
				format: "email",
			}),
		}),
	},
);

export { passwordResetRequest };