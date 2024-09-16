import { Elysia, type ElysiaConfig } from "elysia";
import { env } from "../src/lib//env/env";
import { logger as pinoLogger } from "@bogeychan/elysia-logger";

const logger = pinoLogger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  level: process.env.NODE_ENV === "production" ? "error" : "debug",
});

const baseElysia = <const BasePath extends string = "", const Scoped extends boolean = false>(
	config?: ElysiaConfig<BasePath, Scoped>,
  ) => new Elysia(config).use(env).use(Promise.resolve({ default: logger as any as Elysia }));
const createBaseElysia = (config?: Parameters<typeof baseElysia>[0]) =>
  new Elysia(config) as any as ReturnType<typeof baseElysia>;
export { createBaseElysia, baseElysia };