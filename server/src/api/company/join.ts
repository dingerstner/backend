import { eq } from "drizzle-orm";
import { createBaseElysia } from "@/base";
import { redirect}from "@/lib/index";
import { pool } from "@/db/tenant/Pool";
import { companyData } from "@/db/tenant/schema";
import {db} from "@/db/primary/index";
import { user } from "@/db/primary/schema";
import { t } from "elysia";


const join= createBaseElysia().post(
    "/join",
    async ({ body, session, set, headers }: any) => {
      if (!session) {
        redirect(
          {
            set,
            headers,
          },
          "/login",
        );
        return;
      }

      const findCompany = await pool(body.compnyName)
      .select()
      .from(companyData)
      .where(eq(companyData.compnyName, body.compnyName));

      if (!findCompany) {
        set.status = "Not Found";   
        return "Organization not found";
      }
      await db
        .update(user)
        .set({
          companyName: body.compnyName,
        })
        .where(eq(user.id, session.user.id));

     
      redirect(
        {
          set,
          headers,
        },
        "/dashboard",
      );
    },
    {
      body: t.Object({
        compnyName: t.String({
          minLength: 2,
          maxLength: 11,
        }),
      }),
    },
  )

  export {join}