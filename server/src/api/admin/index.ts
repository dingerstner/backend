import { adminAuth } from "./auth/index";
import { createBaseElysia } from"@/base";



export const admin = createBaseElysia({
    prefix: "/admin",
})
.use(adminAuth )
;