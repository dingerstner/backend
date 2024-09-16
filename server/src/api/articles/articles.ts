
import { createBaseElysia } from "@/base";
import { pool  } from "@/db/tenant/Pool";
import { article } from "@/db/tenant/schema";
import { eq } from "drizzle-orm";


`https://news.google.com/rss/search?q=${keyword}+when:${TimeCount}d&hl=${language}&gl=${country}&ceid=${language}:${country}`

export const articles = createBaseElysia()
.get("/:id", ({ params }) => {
    return pool(params.id ).select().from(article)
})
.post("/", ({ body }) => {
  const [article]=  
})