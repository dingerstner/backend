import { createBaseElysia } from "@/base";
import { articles as article  } from "@/api/articles/articles";


const articles = createBaseElysia({
    prefix: "/article",
})
    .use(article)
    export { articles }

