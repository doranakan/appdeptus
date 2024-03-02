/* eslint-disable camelcase */
import { z } from 'zod'

const idSchema = z.number().transform(String)

const codexSchema = z.object({
  id: idSchema,
  name: z.string()
})

const armySchema = z
  .object({
    id: idSchema,
    name: z.string(),
    total_points: z.number(),
    codex: codexSchema,
    units: z.record(z.string(), z.array(z.string()))
  })
  .transform(({ total_points, ...rest }) => ({
    ...rest,
    totalPoints: total_points
  }))

const armiesSchema = z.array(
  armySchema.transform(({ units: _, ...rest }) => rest)
)

const codexesSchema = z.array(codexSchema)

const tiersSchema = z.array(
  z.object({
    id: idSchema,
    models: z.number(),
    points: z.number(),
    unit: idSchema
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
