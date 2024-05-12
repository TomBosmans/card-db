import axios, { AxiosResponse } from "axios"
import fs from "fs/promises"

type ApiResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Record<string, unknown>[]
}

async function* fetch() {
  let next: string | null =
    "https://api.ashes.live/v2/cards?show_legacy=false&mode=listing&show_summons=false&releases=all&dice_logic=only&sort=name&order=asc&limit=30&offset=0"

  while (next !== null) {
    console.log(`fetching: ${next}`)
    const response: AxiosResponse<ApiResponse> = await axios.get(next)
    next = response.data.next
    yield* response.data.results
  }
}

export default async function fetchAshesRebornCards() {
  const cards = []

  for await (const page of fetch()) {
    cards.push(page)
  }

  await fs.writeFile("data/ashes_reborn_cards.json", JSON.stringify(cards, null, 2))
}
