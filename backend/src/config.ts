import { z } from "zod"

const config = z
  .object({
    BACKEND_PORT: z.coerce.number(),

    POSTGRES_USER: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z.coerce.number(),
    POSTGRES_PASSWORD: z.string().transform((pw) => (pw.length > 1 ? pw : null)),

    MINIO_ROOT_USER: z.string(),
    MINIO_ROOT_PASSWORD: z.string(),
    MINIO_HOST: z.string(),
    MINIO_PORT: z.coerce.number(),
  })
  .transform((env) => ({
    port: env.BACKEND_PORT,

    postgres: {
      user: env.POSTGRES_USER,
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      password: env.POSTGRES_PASSWORD,
    },

    minio: {
      user: env.MINIO_ROOT_USER,
      password: env.MINIO_ROOT_PASSWORD,
      host: env.MINIO_HOST,
      port: env.MINIO_PORT,
    },
  }))
  .parse(process.env)

export default config