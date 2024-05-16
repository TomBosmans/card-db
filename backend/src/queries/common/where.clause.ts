/* eslint-disable @typescript-eslint/no-explicit-any */
import SelectQuery from "../types/select-query.type"
import { DB } from "kysely-codegen/dist/db"
import { OperandValueExpression, sql } from "kysely"
import mapOperatorExpression from "../utils/mapping"

export type Where<Table extends keyof DB> = Partial<{
  [Key in keyof DB[Table]]:
    | {
        $match?: OperandValueExpression<DB, Table, Key>
        $eq?: OperandValueExpression<DB, Table, Key> | null
        $ne?: OperandValueExpression<DB, Table, Key> | null
        $lt?: OperandValueExpression<DB, Table, Key> | null
        $lte?: OperandValueExpression<DB, Table, Key> | null
        $gt?: OperandValueExpression<DB, Table, Key> | null
        $gte?: OperandValueExpression<DB, Table, Key> | null
        $in?: Array<OperandValueExpression<DB, Table, Key>>
        $nin?: Array<OperandValueExpression<DB, Table, Key>>
      }
    | OperandValueExpression<DB, Table, Key>
    | null
}>

export default function whereClause<Table extends keyof DB>(where?: Where<Table>) {
  return (query: SelectQuery<Table>) => {
    if (!where) return query

    const attributes = Object.keys(where) as Array<keyof typeof where>
    for (const attribute of attributes) {
      if (typeof where[attribute] !== "object") {
        const value = where[attribute]
        query = (query as SelectQuery<Table>).where(
          attribute as any,
          mapOperatorExpression("$eq", value as any),
          value,
        )
      } else {
        const operators = Object.keys(where[attribute] as any) as Array<
          keyof (typeof where)[typeof attribute]
        >
        for (const operator of operators) {
          const value = (where?.[attribute] as any)?.[operator]
          if (value !== undefined) {
            if (operator === "$match") {
              query = (query as SelectQuery<Table>).where(
                attribute as any,
                mapOperatorExpression(operator as any, value as any),
                sql.val(`%${value}%`),
              )
            } else {
              query = (query as SelectQuery<Table>).where(
                attribute as any,
                mapOperatorExpression(operator as any, value as any),
                value,
              )
            }
          }
        }
      }
    }

    return query
  }
}
