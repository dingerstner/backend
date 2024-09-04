import { defineConfig } from 'drizzle-kit'


export default defineConfig({
    schema: "./src/db/primary/schema/index.ts",
    out: "./sqlite/migrations/primary",
    dialect: "sqlite",
    dbCredentials: { url: "file: sqlite/primary.db" },
  })