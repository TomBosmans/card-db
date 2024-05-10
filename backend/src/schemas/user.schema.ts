import z from "zod"
import deckSchema from "./deck.schema"

const baseSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

type Input = z.input<typeof baseSchema> & {
  decks?: Array<z.input<typeof deckSchema>>
}

export type User = z.output<typeof baseSchema> & {
  decks?: Array<z.output<typeof deckSchema>>
}

const userSchema: z.ZodType<User, z.ZodTypeDef, Input> = baseSchema.extend({
  decks: z.lazy(() => deckSchema.array().optional()),
})

export default userSchema
