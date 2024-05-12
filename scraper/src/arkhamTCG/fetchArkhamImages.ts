import axios from "axios"
import cards from "../../data/arkham_tcg_cards.json"
import config from "../config"
import minio from "../minio"

const server = axios.create({
  baseURL: "https://arkhamdb.com",
})

type Card = {
  name: string
  code: string
  imagesrc: string
  backimagesrc: string
}

export default async function fetchArkhamImages() {
  for (const index in cards) {
    const card: Card = cards[index]

    try {
      const responseFront = await server.get(card.imagesrc, {
        responseType: "arraybuffer",
      })

      const uploadFrontpath = `public/arkham_tcg/cards/${card.code}/front.jpg`
      await minio.putObject(config.minio.bucketName, uploadFrontpath, responseFront.data)
      console.log(`${index} Front Image ${card.name}.jpg uploaded to MinIO successfully.`)

      const responseBack = await server.get(card.backimagesrc, {
        responseType: "arraybuffer",
      })
      const uploadBackpath = `public/arkham_tcg/cards/${card.code}/back.jpg`
      await minio.putObject(config.minio.bucketName, uploadBackpath, responseBack.data)
      console.log(`${index} Back Image ${card.name}.jpg uploaded to MinIO successfully.`)
    } catch (error) {
      console.error(`Error processing image ${card.name}.jpg:`, error)
    }
  }
}
