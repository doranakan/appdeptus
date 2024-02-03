import { z } from 'zod'

const codexesSchema = z.array(
  z.object({
    id: z.number(),
    faction: z.number(),
    name: z.string()
  })
)

const factionsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string()
  })
)

export { codexesSchema, factionsSchema }
