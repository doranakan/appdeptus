import { z } from 'zod'

const codexesSchema = z.array(
  z.object({
    id: z.number().transform(String),
    name: z.string()
  })
)

const factionsSchema = z.array(
  z.object({
    id: z.number().transform(String),
    name: z.string()
  })
)

const unitSchema = z.array(
  z.object({
    id: z.number().transform(String),
    name: z.string(),
    caption: z.string().optional(),
    leader: z.boolean(),
    limit: z.number()
  })
)

export { codexesSchema, factionsSchema, unitSchema }
