import { t } from "elysia";
import { generateId } from "lucia";
import { alphabet, generateRandomString } from "oslo/crypto";
import { password as bunPassword } from "bun";
import { db } from "../../../db/primary";
import {auth } from "../../../auth";
import { user } from "../../../db/primary/schema";
import { createBaseElysia } from "@/src/base";



const signup = createBaseElysia().post(
	"/signup",
	async ({ body: { email, password, name }, cookie, set, env: { PASSWORD_PEPPER: passwordPepper } }) => {
			const existingUser = await db.query.user.findFirst({
				where: (users, { eq }) => eq(users.email, email),
			});

			if (existingUser) {
                throw new Error("User already exists")
			}
            const passwordSalt = generateRandomString(
				16,
				alphabet("a-z", "A-Z", "0-9"),
			);
            const userId = generateId(15);
            const hashedPassword = await bunPassword.hash(passwordSalt + password + passwordPepper);
            
			const data = {
                name: name,
                email: email,
                id: userId,
                hashedPassword: hashedPassword,
				passwordSalt: passwordSalt 
                
              };

			try {
				
                const newUser = await db.insert(user).values(data);
				

				const session = await auth.createSession(userId, {
                    id: "",
                    email: "",
                    name: "",
                    companyId: "",
                    email_verified: false
                });
				const sessionCookie = auth.createSessionCookie(session.id);

				set.status = 201;
				cookie[sessionCookie.name]?.set({
					value: sessionCookie.value,
					...sessionCookie.attributes,
				});

				return newUser;

			} catch (error) {
                console.error(error);
                throw new Error ("Error creating user");
            }
		},
		{
			body: t.Object({
				email: t.String({
					format: "email",
				}),
				password: t.String({
					minLength: 8,
					maxLength: 64,
				}),
				name: t.String({
					minLength: 3,
					maxLength: 32,
				}),
			}),
		},
	);
	
	export { signup };