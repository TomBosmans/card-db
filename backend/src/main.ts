import Fastify from "fastify"
import AutoLoad from "@fastify/autoload"
import config from "@config"

export default async function run() {
  const app = Fastify({
    logger: true,
  })

  await app.register(AutoLoad, {
    dir: `${__dirname}/routes`,
    ignorePattern: /^.*(?:test|spec).(?:js|ts)$/,
  })

  await app.ready()
  await app.listen({ port: config.port, host: "0.0.0.0" })
}

void run()
