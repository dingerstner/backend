import fs from 'fs'
import { Database } from "bun:sqlite";
import { type BunSQLiteDatabase , drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

const Pool = (maxPool = 1000) => {
	const tenants: Record<string, BunSQLiteDatabase> = {}

	return (tenant: string) => {
		if (tenants[tenant]) {
			return tenants[tenant]
		}

		if (Object.keys(tenants).length >= maxPool) {
			delete tenants[Object.keys(tenants)[0]]
		}

		const tenantFile = `sqLite/${tenant}.db`
		let requiresMigration = true

		try {
			fs.accessSync(tenantFile)
			requiresMigration = false
		} catch (error) {
			requiresMigration = true
		}

		const db = new Database(tenantFile)
		tenants[tenant] = drizzle(db)

		if (requiresMigration) {
			migrate(tenants[tenant], { migrationsFolder: '@/db/migrations' })
		}

		return tenants[tenant]
	}
}

export const pool = Pool()