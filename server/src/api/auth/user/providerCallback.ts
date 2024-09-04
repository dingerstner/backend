
import { getTokens } from "../../../auth/provider/utils";
import { OAuth2RequestError } from "arctic";
import {  t } from "elysia";
import { generateId } from "lucia";
import {auth } from "../../../auth";
import { getAuthAccount } from "../../../auth/provider/utils";
import {db} from "../../../db/primary";
import { createBaseElysia } from "@/base";
import { oauthAccount, user } from "@/db/primary/schema";
import { eq } from "drizzle-orm";

const providerCallback = createBaseElysia().get(
	"/:provider/callback",
	async ({ query: { code, state }, cookie, params: { provider }, set }) => {
		const { oauth_state, oauth_code_verifier, oauth_next } = cookie;
		const next = oauth_next?.value ?? "/";
		const storedState = oauth_state?.value;
		const storedCodeVerifier = oauth_code_verifier?.value;

		if (!storedState || !storedCodeVerifier || state !== storedState) {
			throw new Error("The state provided does not match the state in the cookie.");
		}

		try {
			const userId = generateId(15);
			const tokens = await getTokens(provider, code, storedCodeVerifier);
			const account = await getAuthAccount(provider, tokens.accessToken);

			const existingUser = await db.select().from(user).where(eq(user.email, account.email));

			const existingOAuthAccount = await db.select().from(oauthAccount).where(eq(oauthAccount.userId,account.id)
				
			)
			if (!existingUser) {
				await db.insert(user).values({
					id: userId,
					name: account.username,
					email: account.email,
					iconUrl: account.iconUrl,
					hashedPassword: "",
					passwordSalt: "",
				  })
					.catch(error => {
						throw new Error("Error creating user");
					});
			}

			if (!existingOAuthAccount) {
				await db.insert(oauthAccount).values({
							provider: provider,
							providerAccountId: account.id,
							userId: existingUser === null ? userId :  existingUser[0].id,

						
					})
					.catch(error => {
						throw new Error("Error creating oauth account");
					});
			}

			const session = await auth .createSession(existingUser === null ? userId :existingUser[0]?.id, {
				id: "",
				email: "",
				name: "",
				companyId: "",
				email_verified: false,

			});
			const sessionCookie = auth .createSessionCookie(session.id);

			cookie[sessionCookie.name]?.set({
				value: sessionCookie.value,
				...sessionCookie.attributes,
			});
			set.redirect = next;
		} catch (error) {
			if (error instanceof OAuth2RequestError) {
				throw new Error("Invalid code");
			}
			throw new Error("Error getting tokens");
		}
	},
	{
		query: t.Object(
			{
				code: t.String(),
				state: t.String(),
			},
			{ additionalProperties: true },
		),
		params: t.Object({
			provider: t.Union([ t.Literal("google"), t.Literal("line")]),
		}),
	},
);

export { providerCallback };