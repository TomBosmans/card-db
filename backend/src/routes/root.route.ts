import route from "@utils/route"
import CardRepository from "src/repositories/card.repository"

export default route(async (app) => {
  app.route({
    url: "/",
    method: "GET",
    handler: async (request) => {
      const cardRepository = request.diScope.resolve<CardRepository>("cardRepository")
      return await cardRepository.count({
        where: {
          name: {
            $match: "land",
          },
        },
        orderBy: { name: "asc" },
      })
    },
  })
})
