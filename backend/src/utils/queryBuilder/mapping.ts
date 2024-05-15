import * as kysley from "kysely"
import { Operator } from "./types"

export default function mapOperatorExpression<
  Value extends string | number | Date | boolean | null,
>(operator: Operator, value: Value): kysley.ComparisonOperatorExpression {
  if (operator === "$eq" && value === null) return "is"
  if (operator === "$eq") return "="

  if (operator === "$ne" && value === null) return "is not"
  if (operator === "$ne") return "!="

  if (operator === "$lt") return "<"
  if (operator === "$lte") return "<="

  if (operator === "$gt") return ">"
  if (operator === "$gte") return ">="

  if (operator === "$in") return "in"
  if (operator === "$nin") return "not in"

  return "="
}
