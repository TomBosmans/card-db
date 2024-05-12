import * as Minio from "minio"
import config from "./config"

const minio = new Minio.Client({
  endPoint: config.minio.host,
  port: config.minio.port,
  useSSL: false,
  accessKey: config.minio.user,
  secretKey: config.minio.password,
})

export default minio
