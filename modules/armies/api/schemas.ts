/* eslint-disable camelcase */
import { CodexName } from 'appdeptus/models'
import { z } from 'zod'

const idSchema = z.number().transform(String)

const codexSchema = z.object({
  id: idSchema,
  name: z.nativeEnum(CodexName)
})

const baseArmySchema = z
  .object({
    id: idSchema,
    name: z.string(),
    units: z.array(
      z.object({
        unit: z.string(),
        tier: z.string(),
        options: z.array(
          z.object({
            optionId: z.string(),
            weaponId: z.string()
          })
        )
      })
    ),
    total_points: z.number()
  })
  .transform(({ total_points, ...rest }) => ({
    ...rest,
    totalPoints: total_points
  }))

const armySchema = z
  .object({
    codex: codexSchema
  })
  .and(baseArmySchema)

const armyToEditSchema = z
  .object({
    codex: idSchema
  })
  .and(baseArmySchema)

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

const unitsSchema = z.array(
  z.object({
    id: idSchema,
    name: z.string(),
    caption: z.string().optional(),
    leader: z.boolean()
  })
)

export {
  armiesSchema,
  armySchema,
  armyToEditSchema,
  codexesSchema,
  codexSchema,
  tiersSchema,
  unitsSchema
}
