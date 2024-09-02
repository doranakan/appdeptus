/* eslint-disable camelcase */
import { CodexName } from 'appdeptus/models'
import { z } from 'zod'

const idSchema = z.number().transform(String)

const codexSchema = z.object({
  id: idSchema,
  name: z.nativeEnum(CodexName)
})

const detachmentSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    detachment_enhancements: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        points: z.number()
      })
    )
  })
  .transform(({ detachment_enhancements, ...rest }) => ({
    ...rest,
    enhancements: detachment_enhancements
  }))

const baseArmySchema = z
  .object({
    id: idSchema,
    name: z.string(),
    units: z.array(
      z.object({
        unit: idSchema,
        tier: idSchema,
        upgrades: z.array(z.string())
      })
    ),
    detachment: z.object({
      id: idSchema,
      enhancements: z.array(idSchema)
    }),
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
  armySchema.transform(({ detachment: _d, units: _u, ...rest }) => rest)
)

const codexesSchema = z.array(codexSchema)

const tiersSchema = z.array(
  z.object({
    id: idSchema,
    models: z.number(),
    points: z.number()
  })
)

const upgradesSchema = z.array(
  z.object({
    id: idSchema,
    name: z.string(),
    points: z.number()
  })
)

const unitsSchema = z.array(
  z
    .object({
      id: idSchema,
      name: z.string(),
      unit_tiers: tiersSchema,
      unit_upgrades: upgradesSchema
    })
    .transform(({ unit_tiers, unit_upgrades, ...rest }) => ({
      ...rest,
      tiers: unit_tiers,
      upgrades: unit_upgrades
    }))
)

export {
  armiesSchema,
  armySchema,
  armyToEditSchema,
  codexesSchema,
  codexSchema,
  detachmentSchema,
  tiersSchema,
  unitsSchema
}
