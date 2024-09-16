import { t } from "elysia";
import {auth } from "../../../auth";
import { createBaseElysia } from "@/base";


const logout = createBaseElysia().post("/logout", async ({ cookie }) => {
	const sessionCookie = cookie[auth.sessionCookieName];

	if (!sessionCookie?.value) {
		throw new Error("Session not found");
	}
	await auth .invalidateSession(sessionCookie.value);
	const blankSessionCookie = auth.createBlankSessionCookie();

	sessionCookie.set({
		value: blankSessionCookie.value,
		...blankSessionCookie.attributes,
	});
});

export { logout };
