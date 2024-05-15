import { Pool } from "pg"
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely"
import { DB } from "kysely-codegen/dist/db"
import config from "@config"

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
export default db
