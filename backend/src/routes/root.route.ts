import route from "@utils/route"
import db from "src/db"

export default route(async (app) => {
  app.route({
    url: "/",
    method: "GET",
    handler: async () => {
      const result = await db.selectFrom("cards").selectAll().execute()
      return result
    },
  })
})
