import { auth } from "./auth";
import { Elysia, t } from "elysia";
import { type User, verifyRequestOrigin } from "lucia";


const sessionCookieName = auth.sessionCookieName;

const authGuard = new Elysia({
	name: "authGuard",
})
	.guard({
		cookie: t.Object({
			[sessionCookieName]: t.Optional(t.String()),
		}),
		headers: t.Object({
			origin: t.Optional(t.String()),
			host: t.Optional(t.String()),
			authorization: t.Optional(t.String()),
		}),
	})
	.resolve(
		{ as: "scoped" },
		async ({ cookie, headers: { origin, host, authorization }, request: { method } }): Promise<{ user: User }> => {
			const sessionCookie = cookie[sessionCookieName];
			const sessionId: string | null | undefined = auth.readBearerToken(authorization ?? "") ?? sessionCookie?.value;

			if (
				!authorization &&
				method !== "GET" &&
				(!origin || !host || !verifyRequestOrigin(origin, ["http://localhost:3000", "localhost:3000"]))
			) {
				console.log("Invalid origin");
			}

			if (!sessionId) {
				console.log("Invalid session id");
			}

			const { session, user } = await auth.validateSession(sessionId ?? ''); 

			if (!session) {
				const newSessionCookie = auth.createBlankSessionCookie();
				sessionCookie?.set({
					value: newSessionCookie.value,
					...newSessionCookie.attributes,
				});
				console.log("Invalid session");
			}

			if (session?.fresh) {
				const newSessionCookie = auth.createSessionCookie(sessionId ?? '');
				sessionCookie?.set({
					value: newSessionCookie.value,
					...newSessionCookie.attributes,
				});
			}

			return { user: user! };
		},
	);

export { authGuard };