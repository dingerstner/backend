import { createBaseElysia } from "@/base";
import { login } from "./login";
import { logout } from "./logout";	
import { signup } from "./logout";	
import { passwordReset } from "./passwordReset";







const adminAuth = createBaseElysia({
	prefix: "/admin/auth/",
})
	.use(signup)
	.use(login)
	.use(logout)
	.use(passwordReset);

export { adminAuth };