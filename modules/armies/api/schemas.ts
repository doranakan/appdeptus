import { z } from 'zod'

const codexSchema = z.object({
  id: z.number().transform(String),
  name: z.string()
})

const armySchema = z.object({
  id: z.number().transform(String),
  name: z.string(),
  totalPoints: z.number(),
  codex: codexSchema,
  units: z.record(z.string(), z.array(z.string()))
})

const armiesSchema = z.array(armySchema.omit({ units: true }))

const codexesSchema = z.array(codexSchema)

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

export { armiesSchema, armySchema, codexesSchema, tiersSchema, unitsSchema }
