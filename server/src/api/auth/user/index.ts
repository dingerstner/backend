import { createBaseElysia } from "@/base";
import { login } from "./login";
import { logout } from "./logout";
import { passwordReset } from "./passwordReset";
import { provider } from "./provider";
import { providerCallback } from "./providerCallback";
import { signup } from "./signup";

const auth = createBaseElysia({
	prefix: "/auth",
})
	.use(provider)
	.use(providerCallback)
	.use(signup)
	.use(login)
	.use(logout)
	.use(passwordReset);

export { auth };