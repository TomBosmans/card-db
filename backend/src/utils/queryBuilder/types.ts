import { DB } from "kysely-codegen/dist/db"
import * as kysley from "kysely"
import { ExtractTableAlias } from "node_modules/kysely/dist/cjs/parser/table-parser"

export type Operator = "$eq" | "$ne" | "$lt" | "$lte" | "$gt" | "$gte" | "$in" | "$nin"
export type WhereParams<Table extends keyof DB> = Partial<{
  [Key in keyof DB[Table]]:
    | {
        $eq?: kysley.OperandValueExpression<DB, Table, Key> | null
        $ne?: kysley.OperandValueExpression<DB, Table, Key> | null
        $lt?: kysley.OperandValueExpression<DB, Table, Key> | null
        $lte?: kysley.OperandValueExpression<DB, Table, Key> | null
        $gt?: kysley.OperandValueExpression<DB, Table, Key> | null
        $gte?: kysley.OperandValueExpression<DB, Table, Key> | null
        $in?: Array<kysley.OperandValueExpression<DB, Table, Key>>
        $nin?: Array<kysley.OperandValueExpression<DB, Table, Key>>
      }
    | kysley.OperandValueExpression<DB, Table, Key>
    | null
}>

export type SelectQueryParams<Table extends keyof DB> = {
  select?: Array<keyof DB[Table]>
  orderBy?: Partial<Record<keyof DB[Table], "asc" | "desc">>
  where?: WhereParams<Table>
}

export type WherableQuery<Table extends keyof DB> = SelectQuery<Table>

export type SelectReturn<Table extends keyof DB> = kysley.Selectable<DB[Table]>
export type SelectQuery<Table extends keyof DB> = kysley.SelectQueryBuilder<
  DB,
  ExtractTableAlias<DB, Table>,
  object
>
