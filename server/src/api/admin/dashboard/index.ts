import { createBaseElysia } from "@/base";
import {statistic} from "./statistic";



export const dashboard = createBaseElysia({
    prefix: "dashboard",
})
.use(statistic)