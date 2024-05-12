import axios from "axios"
import fs from "fs/promises"

const server = axios.create({
  baseURL: "https://arkhamdb.com/api/public",
})

export default async function fetchArkhamCards() {
  const response = await server.get("cards")
  const cards = response.data
  await fs.writeFile("data/arkham_tcg_cards.json", JSON.stringify(cards, null, 2))
}
