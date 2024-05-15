import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely"
import { Config } from "@config"
import { DB } from "kysely-codegen/dist/db"
import { Pool } from "pg"

export type Database = Kysely<DB>

export default function db(config: Config) {
  const dialect = new PostgresDialect({
    pool: new Pool({
      database: config.postgres.database,
      host: config.postgres.host,
      user: config.postgres.user,
      port: config.postgres.port,
      max: config.postgres.pool.max,
    }),
  })

  const db = new Kysely<DB>({ dialect, plugins: [new CamelCasePlugin()] })
  return db
}
