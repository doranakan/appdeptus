/* eslint-disable camelcase */
import { z } from 'zod'

const idSchema = z.number().transform(String)

const codexSchema = z.object({
  id: idSchema,
  name: z.string()
})

const armySchema = z.object({
  id: idSchema,
  name: z.string(),
  totalPoints: z.number(),
  codex: codexSchema,
  units: z.record(z.string(), z.array(z.string()))
})

const armiesSchema = z.array(armySchema.omit({ units: true }))

const codexesSchema = z.array(codexSchema)

const tiersSchema = z.array(
  z.object({
    id: idSchema,
    unit: idSchema,
    points: z.number()
  })
)

const modelSchema = z.object({
  id: idSchema,
  name: z.string(),
  m: z.number(),
  t: z.number(),
  sv: z.number(),
  w: z.number(),
  ld: z.number(),
  oc: z.number()
})

const tierModelsSchema = z.array(
  z.object({
    unit_tier: idSchema,
    count: z.number(),
    model: modelSchema
  })
)

const unitsSchema = z.array(
  z.object({
    id: idSchema,
    name: z.string(),
    caption: z.string().optional(),
    leader: z.boolean(),
    limit: z.number()
  })
)

export {
  armiesSchema,
  armySchema,
  codexesSchema,
  tierModelsSchema,
  tiersSchema,
  unitsSchema
}
