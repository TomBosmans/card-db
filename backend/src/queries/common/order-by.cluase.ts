/* eslint-disable @typescript-eslint/no-explicit-any */
import { DB } from "kysely-codegen/dist/db"
import SelectQuery from "../types/select-query.type"

export type OrderBy<Table extends keyof DB> = Partial<Record<keyof DB[Table], "asc" | "desc">>

export default function orderByCluase<Table extends keyof DB>(orderBy?: OrderBy<Table>) {
  return (query: SelectQuery<Table>) => {
    if (!orderBy) return query

    const attributes = Object.keys(orderBy) as Array<keyof OrderBy<Table>>
    for (const attribute of attributes) {
      query = query.orderBy(attribute as any, orderBy[attribute])
    }
    return query
  }
}
