import { z } from 'zod'

const armySchema = z.object({
  id: z.number().transform(String),
  name: z.string(),
  totalPoints: z.number(),
  codex: z.number().transform(String),
  units: z.record(z.string(), z.array(z.string()))
})

const armiesSchema = z.array(armySchema)

const codexesSchema = z.array(
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

export { armiesSchema, codexesSchema, tiersSchema, unitsSchema }
