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

const unitCompositionsSchema = z.array(
  z.object({
    id: idSchema,
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

const weaponSchema = z.object({
  id: idSchema,
  name: z.string(),
  range: z.string().optional(),
  a: z.string(),
  bs_ws: z.string().optional(),
  s: z.string(),
  ap: z.string(),
  d: z.string()
})

const unitOptionsSchema = z.array(
  z.object({
    id: idSchema,
    count: z.number().optional(),
    unit_composition: idSchema,
    unit_wargear: z.number().transform(String).optional(),
    weapons: z.array(z.number().transform(String))
  })
)

const wargearWeaponsSchema = z.array(
  z.object({
    id: idSchema,
    unit_composition: idSchema,
    weapon: weaponSchema
  })
)

const weaponsSchema = z.array(weaponSchema)

export {
  armiesSchema,
  armySchema,
  armyToEditSchema,
  codexSchema,
  codexesSchema,
  tiersSchema,
  unitCompositionsSchema,
  unitOptionsSchema,
  unitsSchema,
  wargearWeaponsSchema,
  weaponSchema,
  weaponsSchema
}
