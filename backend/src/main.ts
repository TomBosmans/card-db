import Fastify from "fastify"
import AutoLoad from "@fastify/autoload"
import config from "@config"
import { diContainerClassic, fastifyAwilixPlugin } from "@fastify/awilix"
import { Lifetime, asClass, asFunction, asValue } from "awilix"
import db from "./db"

export default async function run() {
  const app = Fastify({
    logger: true,
  })

  await app.register(AutoLoad, {
    dir: `${__dirname}/routes`,
    ignorePattern: /^.*(?:test|spec).(?:js|ts)$/,
  })

  await app.register(fastifyAwilixPlugin, {
    injectionMode: "CLASSIC",
    disposeOnClose: true,
    disposeOnResponse: true,
    strictBooleanEnforced: true,
  })

  diContainerClassic.register({ config: asValue(config) })
  diContainerClassic.register({ log: asValue(app.log) })
  diContainerClassic.register({ db: asFunction(db) })
  diContainerClassic.loadModules(
    [
      ["queries/**/*.query.ts", { register: asClass, lifetime: Lifetime.SINGLETON }],
      ["repositories/**/*.repository.ts", { register: asClass, lifetime: Lifetime.SINGLETON }],
    ],
    { formatName: "camelCase", cwd: __dirname },
  )

  await app.ready()
  await app.listen({ port: config.port, host: "0.0.0.0" })
}

void run()
