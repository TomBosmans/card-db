import config from "@config"
import { Kysely, PostgresDialect } from "kysely"
import { DB } from "kysely-codegen/dist/db"
import { Pool } from "pg"

const dialect = new PostgresDialect({
  pool: new Pool({
    database: config.postgres.database,
    host: config.postgres.host,
    user: config.postgres.user,
    port: config.postgres.port,
    max: config.postgres.pool.max,
  }),
})

const db = new Kysely<DB>({ dialect })
export default db
