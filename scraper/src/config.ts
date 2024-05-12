import { z } from "zod"

const config = z
  .object({
    POSTGRES_USER: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z.coerce.number(),
    POSTGRES_PASSWORD: z.string().transform((pw) => (pw.length > 1 ? pw : null)),
    POSTGRES_DATABASE: z.string(),
    POSTGRES_POOL_MAX: z.coerce.number(),

    MINIO_ROOT_USER: z.string(),
    MINIO_ROOT_PASSWORD: z.string(),
    MINIO_HOST: z.string(),
    MINIO_PORT: z.coerce.number(),
    MINIO_BUCKED_NAME: z.string(),
  })
  .transform((env) => ({
    postgres: {
      user: env.POSTGRES_USER,
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DATABASE,
      pool: {
        max: env.POSTGRES_POOL_MAX,
      },
    },

    minio: {
      user: env.MINIO_ROOT_USER,
      password: env.MINIO_ROOT_PASSWORD,
      host: env.MINIO_HOST,
      port: env.MINIO_PORT,
      bucketName: env.MINIO_BUCKED_NAME,
    },
  }))
  .parse(process.env)

export default config
