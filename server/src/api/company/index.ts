
import { createBaseElysia } from "@/base";
import { join } from "./join";
import {create } from "./create";

const company = createBaseElysia({
prefix: "/company",
})
.use(create) 
.use(join)
    
export { company };