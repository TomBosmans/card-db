import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"

type FastifyZod = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  ZodTypeProvider
>

export default function route<App extends FastifyZod>(fn: (app: App) => Promise<void>) {
  return async (app: App) => await fn(app)
}
