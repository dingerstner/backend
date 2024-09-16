import { createBaseElysia } from "@/base";
import { createDatabaseId, redirect}from "@/lib/index";
import { pool } from "@/db/tenant/Pool";
import { companyData } from "@/db/tenant/schema";
import {db} from "@/db/primary/index";
import { admin } from "@/db/primary/schema";
import { eq } from "drizzle-orm";
import { t } from "elysia";



const create = createBaseElysia()
.post(
    "/create",
    async ({  body, companySession, set, headers , }: any) => {
        if (!companySession) {
            redirect(
              {
                set,
                headers,
              },
              "/login",
            );
            return
          }
     const dbid = `company-${createDatabaseId()}`;

     const [newCompany]  = 
     await pool(body.companyName)
     .insert(companyData)
     .values({
        id: dbid,
        compnyName: body.companyName,
     })
     .returning({
        id: companyData.id,
     })
     if (!newCompany) {
        set.status = "Internal Server Error";
        return "Internal Server Error";
      }

      await db
      .update(admin)
      .set({
        id: newCompany.id ,
      })
      .where(eq(admin.id, companySession.user.id));
      redirect(
        {
          set,
          headers,
        },
        "/onboarding",
      );
      {
      body: t.Object({
        compnyName: t.String({
          minLength: 1,
          maxLength: 30,
        }),
    })}
    })

    export { create };