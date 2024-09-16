import { t } from "elysia";
import { generateId } from "lucia";
import { alphabet, generateRandomString } from "oslo/crypto";
import { password as bunPassword } from "bun";
import { db } from "@/db/primary";
import {auth } from "@/auth";
import { company, user } from "@/db/primary/schema";
import { createBaseElysia } from "@/base";
import { eq } from "drizzle-orm";




const signup = createBaseElysia().post(
	"/signup",
	async ({ body: { email, password, CompanyName, invaitePassword }, cookie, set}) => {
			const existingUser = await db.query.user.findFirst({
				where: (users, { eq }) => eq(users.email, email),
			});

			if (existingUser) {
                throw new Error("User already exists")
			}

			const findCompanyByName = await db.query.company.findFirst({
				where: (company, { eq }) => eq(company.name, CompanyName),
			}) 

			if (!findCompanyByName) {
                throw new Error("no such company")
			}

			const getInvaitePassword = await db.select().from(company).where(eq(company.invaitePassword, findCompanyByName.invaitePassword));
            const invaiteHashedPasswordPassword = bunPassword.verify(getInvaitePassword[0].invaiteHashedPassword , invaitePassword);
             
			if (!invaiteHashedPasswordPassword) {
             throw new Error("invaite password is not correct")
             }

            const passwordSalt = generateRandomString(
				16,
				alphabet("a-z", "A-Z", "0-9"),
			);
			
            const userId = generateId(15);
            const hashedPassword = await bunPassword.hash(passwordSalt + password + invaitePassword );
            
			const data = {
				id: "",
                name: "",
                email: email,
                hashedPassword: hashedPassword,
				passwordSalt: passwordSalt ,
                invaitePassword: invaitePassword ,
				CompanyName: CompanyName,
              };

			try {
                const newUser = await db.insert(user).values(data);
				

				const session = await auth.createSession(userId, {
					id: "",
					email: "",
					name: "",
					companyNeme: "",
					email_verified: false,
					expiresAt: "",
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
				invaitePassword: t.String({
					minLength: 8,
					maxLength: 64,
			    }),
				CompanyName: t.String({
					minLength: 3,
					maxLength: 32,
				}),
			}),
		},
	);
	
	export { signup };