import { z } from 'zod'

const codexesSchema = z.array(
  z.object({
    id: z.number().transform(String),
    faction: z.number().transform(String),
    name: z.string()
  })
)

const factionsSchema = z.array(
  z.object({
    id: z.number().transform(String),
    name: z.string()
  })
)

export { codexesSchema, factionsSchema }
