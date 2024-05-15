import route from "@utils/route"
import db from "src/db"
import { SelectCardQuery } from "src/queries/selectCard.query"

export default route(async (app) => {
  app.route({
    url: "/",
    method: "GET",
    handler: async () => {
      const query = new SelectCardQuery()
      const test = query.build(
        {
          where: {
            id: {
              $eq: "60add48b-4fc1-4a33-b56a-4f4da80b4b89",
              $ne: null,
            },
          },
        },
        db,
      )

      return await test.execute()
    },
  })
})
