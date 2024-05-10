import z from "zod"
import collectionSchema from "./collection.schema"
import deckSchema from "./deck.schema"

const baseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  collection: collectionSchema,
  meta: z.object({}),
  imageUrl: z.string().url(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

type Input = z.input<typeof baseSchema> & {
  decks?: Array<z.input<typeof deckSchema>>
}

export type Card = z.output<typeof baseSchema> & {
  decks?: Array<z.output<typeof deckSchema>>
}

const cardSchema: z.ZodType<Card, z.ZodTypeDef, Input> = baseSchema.extend({
  decks: z.lazy(() => deckSchema.array().optional()),
})

export default cardSchema
