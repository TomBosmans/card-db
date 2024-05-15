import { Pool } from "pg"
import { Kysely, PostgresDialect } from "kysely"
import { DB, CollectionEnum } from "../../backend/node_modules/kysely-codegen/dist/db"
import config from "./config"

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
export type Collection = CollectionEnum

export type Database = Kysely<DB>
export default db
