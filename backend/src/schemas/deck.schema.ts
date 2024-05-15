import z from "zod"
import collectionSchema from "./collection.schema"
import userSchema from "./user.schema"
import cardSchema from "./card.schema"
import dateSchema from "./common/date.schema"

const baseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  cardIds: z.string().uuid().array(),
  collection: collectionSchema,
  name: z.string(),
  meta: z.object({}),
  createdAt: dateSchema,
  updatedAt: dateSchema,
})

type Input = z.input<typeof baseSchema> & {
  user?: z.input<typeof userSchema>
  cards?: Array<z.input<typeof cardSchema>>
}

type Deck = z.output<typeof baseSchema> & {
  user?: z.output<typeof userSchema>
  cards?: Array<z.output<typeof cardSchema>>
}

const deckSchema: z.ZodType<Deck, z.ZodTypeDef, Input> = baseSchema.extend({
  user: z.lazy(() => userSchema.optional()),
  cards: z.lazy(() => cardSchema.array().optional()),
})

export default deckSchema
