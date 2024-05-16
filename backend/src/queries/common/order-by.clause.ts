/* eslint-disable @typescript-eslint/no-explicit-any */
import * as R from "remeda"
import { DB } from "kysely-codegen/dist/db"
import SelectQuery from "../types/select-query.type"

export type OrderBy<Table extends keyof DB> = Partial<Record<keyof DB[Table], "asc" | "desc">>

export default function orderByClause<Table extends keyof DB>(orderBy?: OrderBy<Table>) {
  return (query: SelectQuery<Table>) => {
    if (!orderBy) return query

    const attributes = R.keys.strict(orderBy)
    for (const attribute of attributes) {
      query = query.orderBy(attribute as any, orderBy[attribute])
    }
    return query as SelectQuery<Table>
  }
}
