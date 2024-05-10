import z from "zod"
import { CollectionEnum } from "kysely-codegen/dist/db"

const collectionSchema = z.enum<CollectionEnum, [CollectionEnum, ...CollectionEnum[]]>([
  "fab",
  "mtg",
  "ashes_reborn",
  "lotr_the_card_game",
  "arkham_horror_the_card_game",
])

export const Collection = collectionSchema.enum
export type Collection = keyof typeof Collection
export default collectionSchema
