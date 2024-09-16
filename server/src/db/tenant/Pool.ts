import fs from 'fs'
import { Database } from "bun:sqlite";
import { type BunSQLiteDatabase , drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

const Pool = () => {
	const tenants: Record<string, BunSQLiteDatabase> = {}

	return (tenant: string) => {
		if (tenants[tenant]) {
			return tenants[tenant]
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