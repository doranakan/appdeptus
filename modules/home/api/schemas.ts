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

const tiersSchema = z.array(
  z.object({
    id: z.number().transform(String),
    unit: z.number().transform(String),
    points: z.number()
  })
)

const unitsSchema = z.array(
  z.object({
    id: z.number().transform(String),
    name: z.string(),
    caption: z.string().optional(),
    leader: z.boolean(),
    limit: z.number()
  })
)

export { codexesSchema, factionsSchema, tiersSchema, unitsSchema }
