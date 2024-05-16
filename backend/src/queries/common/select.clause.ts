/* eslint-disable @typescript-eslint/no-explicit-any */
import { DB } from "kysely-codegen/dist/db"
import SelectQuery from "../types/select-query.type"

export type Select<Table extends keyof DB> = Array<keyof DB[Table]>
export default function selectClause<Table extends keyof DB>(select?: Select<Table>) {
  return (query: SelectQuery<Table>) =>
    (select ? query.select(select as any) : query.selectAll()) as SelectQuery<Table>
}
