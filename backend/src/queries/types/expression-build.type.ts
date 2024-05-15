import { ExpressionBuilder, Kysely } from "kysely"
import { DB } from "kysely-codegen/dist/db"

export type EB<Table extends keyof DB> = ExpressionBuilder<DB, Table> | Kysely<DB>
