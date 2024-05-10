import route from "@utils/route"

export default route(async (app) => {
  app.route({
    url: "/",
    method: "GET",
    handler: async () => {
      return "hello world"
    },
  })
})
