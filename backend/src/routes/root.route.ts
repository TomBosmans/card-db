import SelectCardsQuery from "src/queries/selectCards.query"
import db from "src/db"
import route from "@utils/route"

export default route(async (app) => {
  app.route({
    url: "/",
    method: "GET",
    handler: async () => {
      const query = new SelectCardsQuery()
      const test = query.build(
        {
          where: {
            id: "60add48b-4fc1-4a33-b56a-4f4da80b4b89",
          },
        },
        db,
      )

      return await test.execute()
    },
  })
})
