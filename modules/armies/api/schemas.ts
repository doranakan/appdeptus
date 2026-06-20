/* eslint-disable camelcase */
import { type Enhancement, type SelectableUnit } from 'appdeptus/models'
import { z } from 'zod'

const idSchema = z.number()

const codexSchema = z
  .object({
    id: idSchema,
    name: z.union([
      z.literal('Adepta Sororitas'),
      z.literal('Adeptus Custodes'),
      z.literal('Adeptus Mechanicus'),
      z.literal('Aeldari'),
      z.literal('Astra Militarum'),
      z.literal('Black Templars'),
      z.literal('Blood Angels'),
      z.literal('Chaos Daemons'),
      z.literal('Chaos Knights'),
      z.literal('Chaos Space Marines'),
      z.literal('Dark Angels'),
      z.literal('Death Guard'),
      z.literal('Drukhari'),
      z.literal("Emperor's Children"),
      z.literal('Genestealer Cults'),
      z.literal('Grey Knights'),
      z.literal('Imperial Agents'),
      z.literal('Imperial Knights'),
      z.literal('Leagues Of Votann'),
      z.literal('Necrons'),
      z.literal('Orks'),
      z.literal('Space Marines'),
      z.literal('Space Wolves'),
      z.literal("T'au Empire"),
      z.literal('Thousand Sons'),
      z.literal('Tyranids'),
      z.literal('World Eaters')
    ]),
    faction: z.union([
      z.literal('chaos'),
      z.literal('imperium'),
      z.literal('xenos')
    ]),
    expansion_of: idSchema.optional()
  })
  .transform(({ expansion_of, ...rest }) => ({
    ...rest,
    expansionOf: expansion_of
  }))

const baseUnitSchema = z.object({
  id: idSchema,
  name: z.string(),
  warlord: z.boolean().optional()
})

const tierSchema = z.object({
  id: idSchema,
  models: z.number(),
  points: z.number()
})

const upgradeSchema = z.object({
  id: idSchema,
  name: z.string(),
  points: z.number()
})

const enhancementSchema = z.object({
  id: idSchema,
  name: z.string(),
  points: z.number()
})

const baseDetachmentSchema = z.object({
  id: idSchema,
  name: z.string(),
  detachment_points: z.number()
})

const detachmentListSchema = z.array(
  baseDetachmentSchema
    .merge(
      z.object({
        detachment_enhancements: z.array(enhancementSchema)
      })
    )
    .transform(({ detachment_enhancements, detachment_points, ...rest }) => ({
      ...rest,
      enhancements: detachment_enhancements,
      detachmentPoints: detachment_points
    }))
)

const armyUnitSchema = baseUnitSchema.merge(
  z.object({
    selectionId: z.string(),
    tier: tierSchema,
    upgrades: z.array(upgradeSchema)
  })
)

const gameArmyUnitSchema = baseUnitSchema.merge(
  z.object({
    selectionId: z.string(),
    models: z.array(
      z.object({
        wounds: z.number(),
        killed: z.boolean()
      })
    ),
    points: z.number(),
    upgrades: z.array(upgradeSchema)
  })
)

const heroOrEnhanceableSchema = z.discriminatedUnion('hero', [
  z.object({
    hero: z.literal(false),
    enhancement: enhancementSchema.optional()
  }),
  z.object({
    hero: z.literal(true)
  })
])

const baseCharacterSchema = z.literal('character')
const baseLeaderSchema = z.literal('leader')
const baseSquadSchema = z.literal('squad')
const baseTransportSchema = z.literal('transport')
const baseVehicleSchema = z.literal('vehicle')
const baseTeamSchema = z.literal('team')
const baseEmbarkedSchema = z.literal('embarked')

const characterSchema = armyUnitSchema
  .merge(z.object({ type: baseCharacterSchema }))
  .and(heroOrEnhanceableSchema)
const leaderSchema = armyUnitSchema
  .merge(z.object({ type: baseLeaderSchema }))
  .and(heroOrEnhanceableSchema)
const squadSchema = armyUnitSchema.merge(
  z.object({ type: baseSquadSchema, battleline: z.boolean().default(false) })
)
const transportSchema = armyUnitSchema.merge(
  z.object({ type: baseTransportSchema })
)
const vehicleSchema = armyUnitSchema.merge(
  z.object({ type: baseVehicleSchema })
)

const gameCharacterSchema = gameArmyUnitSchema
  .merge(z.object({ type: baseCharacterSchema }))
  .and(heroOrEnhanceableSchema)
const gameLeaderSchema = gameArmyUnitSchema
  .merge(z.object({ type: baseLeaderSchema }))
  .and(heroOrEnhanceableSchema)
const gameSquadSchema = gameArmyUnitSchema.merge(
  z.object({ type: baseSquadSchema, battleline: z.boolean().default(false) })
)
const gameTransportSchema = gameArmyUnitSchema.merge(
  z.object({ type: baseTransportSchema })
)
const gameVehicleSchema = gameArmyUnitSchema.merge(
  z.object({ type: baseVehicleSchema })
)

const unitSchema = z.union([
  characterSchema,
  leaderSchema,
  squadSchema,
  transportSchema,
  vehicleSchema
])

const gameUnitSchema = z.union([
  gameCharacterSchema,
  gameLeaderSchema,
  gameSquadSchema,
  gameTransportSchema,
  gameVehicleSchema
])

const teamSchema = z.object({
  id: z.string(),
  bodyguard: squadSchema,
  leader: leaderSchema,
  type: baseTeamSchema
})

const gameTeamSchema = z.object({
  id: z.string(),
  bodyguard: gameSquadSchema,
  leader: gameLeaderSchema,
  type: baseTeamSchema
})

const embarkedSchema = z.object({
  id: z.string(),
  transport: transportSchema,
  crew: z.array(z.union([unitSchema, teamSchema])),
  type: baseEmbarkedSchema
})

const gameEmbarkedSchema = z.object({
  id: z.string(),
  transport: gameTransportSchema,
  crew: z.array(z.union([gameUnitSchema, gameTeamSchema])),
  type: baseEmbarkedSchema
})

const battleSizeSchema = z.union([
  z.literal('incursion'),
  z.literal('strike_force'),
  z.literal('free')
])

const armyDetachmentSchema = baseDetachmentSchema
  .merge(z.object({ detachment_enhancements: z.array(enhancementSchema) }))
  .transform(({ detachment_enhancements, detachment_points, ...rest }) => ({
    ...rest,
    enhancements: detachment_enhancements,
    detachmentPoints: detachment_points
  }))

const legacyDetachmentSchema = z
  .object({
    id: idSchema,
    name: z.string()
  })
  .transform(({ ...rest }) => ({
    ...rest,
    enhancements: [] as Enhancement[],
    detachmentPoints: 1
  }))

const baseArmySchema = z
  .object({
    codex: codexSchema,
    detachment: legacyDetachmentSchema.optional(),
    detachments: z.array(armyDetachmentSchema).nullable().optional(),
    battle_size: battleSizeSchema,
    id: idSchema,
    name: z.string(),
    points: z.number()
  })
  .transform(({ battle_size, detachment, detachments, ...rest }) => ({
    ...rest,
    battleSize: battle_size,
    detachments: (detachments?.length ? detachments : detachment ? [detachment] : null) as [
      ReturnType<typeof armyDetachmentSchema.parse>,
      ...ReturnType<typeof armyDetachmentSchema.parse>[]
    ]
  }))
  .refine(({ detachments }) => detachments !== null && detachments.length > 0, {
    message: 'Army must have at least one detachment'
  })

const armySchema = z
  .object({
    user_id: z.object({
      id: z.string(),
      name: z.string(),
      created_at: z.string()
    }),
    secret: z.boolean(),
    roster: z.array(z.union([unitSchema, teamSchema, embarkedSchema])),
    valid: z.boolean()
  })
  .and(baseArmySchema)
  .transform(({ user_id, secret, valid, ...rest }) => ({
    ...rest,
    isSecret: secret,
    isValid: valid,
    user: {
      ...user_id,
      createdAt: user_id.created_at
    }
  }))

const gameRosterSchema = z.array(
  z.union([gameUnitSchema, gameTeamSchema, gameEmbarkedSchema])
)

const gameArmySchema = baseArmySchema.and(
  z.object({ roster: gameRosterSchema })
)

const armyListSchema = z.array(armySchema)

const codexListSchema = z.array(codexSchema)

const selectableCharacterSchema = z.object({
  type: baseCharacterSchema,
  hero: z.boolean()
})

const selectableLeaderSchema = z.object({
  type: baseLeaderSchema,
  hero: z.boolean()
})

const selectableSquadSchema = z.object({
  type: baseSquadSchema,
  battleline: z.boolean().default(false)
})
const selectableTransportSchema = z.object({
  type: baseTransportSchema
})
const selectableVehicleSchema = z.object({
  type: baseVehicleSchema
})

const baseSelectableUnitSchema = baseUnitSchema
  .and(
    z.object({
      unit_tiers: z.custom<SelectableUnit['tiers']>(
        (val) => z.array(tierSchema).min(1).safeParse(val).success
      ),
      unit_upgrades: z.array(upgradeSchema)
    })
  )
  .transform(({ unit_tiers, unit_upgrades, ...rest }) => ({
    ...rest,
    tiers: unit_tiers,
    upgrades: unit_upgrades
  }))

const selectableUnitSchema = baseSelectableUnitSchema.and(
  z.discriminatedUnion('type', [
    selectableCharacterSchema,
    selectableLeaderSchema,
    selectableSquadSchema,
    selectableTransportSchema,
    selectableVehicleSchema
  ])
)

const unitListSchema = z.array(selectableUnitSchema)

const invalidUnitsSchema = z.array(
  z.object({
    id: idSchema,
    type: z.union([
      baseCharacterSchema,
      baseLeaderSchema,
      baseSquadSchema,
      baseTransportSchema,
      baseVehicleSchema
    ]),
    hero: z.boolean()
  })
)

const invalidTiersSchema = z.array(tierSchema)

const invalidEnhancementsSchema = z.array(
  z.object({
    id: idSchema,
    points: z.number()
  })
)

export {
  armyListSchema,
  armySchema,
  codexListSchema,
  codexSchema,
  detachmentListSchema,
  gameArmySchema,
  gameRosterSchema,
  invalidEnhancementsSchema,
  invalidTiersSchema,
  invalidUnitsSchema,
  selectableUnitSchema,
  unitListSchema
}
