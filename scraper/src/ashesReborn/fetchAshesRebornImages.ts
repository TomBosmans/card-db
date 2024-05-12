import axios from "axios"
import cards from "../../data/ashes_reborn_cards.json"
import minio from "../minio"
import config from "../config"

const server = axios.create({
  baseURL: "https://cdn.ashes.live/images/cards",
})

export default async function fetchAshesRebornImages() {
  for (const index in cards) {
    const card = cards[index]

    try {
      const response = await server.get(`${card.stub}.jpg`, {
        responseType: "arraybuffer",
      })

      const uploadPath = `public/ashes_reborn/cards/${card.stub}.jpg`
      await minio.putObject(config.minio.bucketName, uploadPath, response.data)

      console.log(`${index} Image ${card.stub}.jpg uploaded to MinIO successfully.`)
    } catch (error) {
      console.error(`Error processing image ${card.stub}.jpg:`, error)
    }
  }
}
