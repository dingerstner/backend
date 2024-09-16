import { t } from "elysia";
import { db } from "@/db/primary";
import {auth } from "@/auth";
import { password as bunPassword } from "bun";
import { createBaseElysia } from "@/base";



const login = createBaseElysia().post(
	"/login",
	async ({ body: { email, password }, cookie, set }) => {
           
		const user = await db.query.user.findFirst({
				where: (user, { eq }) => eq(user.email, email),
			});
			if (!user || !user.passwordSalt || !user.hashedPassword || !user.invaitePassword) {
                throw new Error("Invalid email");
              }

			  const passwordValid = bunPassword.verify(user.passwordSalt + password + user.invaitePassword, user.hashedPassword);

              if (!passwordValid) {
                throw new Error("User does not have a password");
              }

			  const session = await auth.createSession(user.id, {
				id: "",
				email: "",
				name: "",
				companyNeme: "",
				email_verified: false,	
				expiresAt: "",
				
			  });
			  const sessionCookie = auth.createSessionCookie(session.id);
             
          
              set.status = 200;

			cookie[sessionCookie.name]?.set({
				value: sessionCookie.value,
				...sessionCookie.attributes,
			});

			return user;
		},
		{
			body: t.Object({
				email: t.String({
					format: "email",
				}),
				password: t.String(),
			}),
		},
	);
	
	export { login };