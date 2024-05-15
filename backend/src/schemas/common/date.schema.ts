import { z } from "zod"

const dateSchema = z.string().or(z.date()).pipe(z.coerce.date())
export default dateSchema
