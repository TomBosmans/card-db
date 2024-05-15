import { SelectQueryBuilder } from "kysely"
import { DB } from "kysely-codegen/dist/db"
import { ExtractTableAlias } from "node_modules/kysely/dist/cjs/parser/table-parser"

type SelectQuery<Table extends keyof DB> = SelectQueryBuilder<
  DB,
  ExtractTableAlias<DB, Table>,
  object
>

export default SelectQuery
