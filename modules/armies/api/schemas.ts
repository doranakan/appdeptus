/* eslint-disable camelcase */
import { type Army } from 'appdeptus/models'
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
  .transform(({ expansion_of: _expansion_of, ...rest }) => rest)

const baseUnitSchema = z.object({
  id: idSchema,
  name: z.string(),
  warlord: z.boolean().optional()
})

const tierSchema = z
  .object({
    id: idSchema,
    models: z.number(),
    points: z.number(),
    points_surcharges: z.array(z.number()).optional()
  })
  .transform(({ points_surcharges, ...rest }) => ({
    ...rest,
    ...(points_surcharges?.length
      ? { pointsSurcharges: points_surcharges }
      : {})
  }))

const upgradeSchema = z
  .object({
    id: idSchema,
    name: z.string(),
    points: z.number(),
    max_quantity: z.number().nullable().optional(),
    quantity_mode: z.enum(['fixed', 'per-model']).default('fixed')
  })
  .transform(({ quantity_mode, max_quantity, ...rest }) => ({
    ...rest,
    maxQuantity: max_quantity ?? null,
    quantityMode: quantity_mode
  }))

const enhancementSchema = z.object({
  id: idSchema,
  name: z.string(),
  points: z.number()
})

const baseDetachmentSchema = z.object({
  id: idSchema,
  name: z.string(),
  enhancements: z.array(enhancementSchema)
})

const legacyDetachmentSchema = baseDetachmentSchema.and(
  z.object({
    detachmentPoints: z.number().nullish().default(1)
  })
)

const detachmentSchema = baseDetachmentSchema.and(
  z.object({
    detachmentPoints: z.number().default(1)
  })
)

const detachmentListSchema = z.array(detachmentSchema)

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
const baseSupportSchema = z.literal('support')
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
const supportSchema = armyUnitSchema
  .merge(z.object({ type: baseSupportSchema }))
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
const gameSupportSchema = gameArmyUnitSchema
  .merge(z.object({ type: baseSupportSchema }))
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
  supportSchema,
  squadSchema,
  transportSchema,
  vehicleSchema
])

const gameUnitSchema = z.union([
  gameCharacterSchema,
  gameLeaderSchema,
  gameSupportSchema,
  gameSquadSchema,
  gameTransportSchema,
  gameVehicleSchema
])

const inferAttachment = (val: unknown) => {
  if (typeof val !== 'object' || val === null || 'attachment' in val) return val
  const v = val as Record<string, unknown>
  if ('leader' in v && 'support' in v) return { ...v, attachment: 'both' }
  if ('support' in v) return { ...v, attachment: 'support' }
  return { ...v, attachment: 'leader' }
}

const teamSchema = z.preprocess(
  inferAttachment,
  z.discriminatedUnion('attachment', [
    z.object({
      id: z.string(),
      type: baseTeamSchema,
      attachment: z.literal('leader'),
      leader: leaderSchema,
      bodyguard: squadSchema
    }),
    z.object({
      id: z.string(),
      type: baseTeamSchema,
      attachment: z.literal('support'),
      support: supportSchema,
      bodyguard: squadSchema
    }),
    z.object({
      id: z.string(),
      type: baseTeamSchema,
      attachment: z.literal('both'),
      leader: leaderSchema,
      support: supportSchema,
      bodyguard: squadSchema
    })
  ])
)

const gameTeamSchema = z.preprocess(
  inferAttachment,
  z.discriminatedUnion('attachment', [
  z.object({
    id: z.string(),
    type: baseTeamSchema,
    attachment: z.literal('leader'),
    leader: gameLeaderSchema,
    bodyguard: gameSquadSchema
  }),
  z.object({
    id: z.string(),
    type: baseTeamSchema,
    attachment: z.literal('support'),
    support: gameSupportSchema,
    bodyguard: gameSquadSchema
  }),
  z.object({
    id: z.string(),
    type: baseTeamSchema,
    attachment: z.literal('both'),
    leader: gameLeaderSchema,
    support: gameSupportSchema,
    bodyguard: gameSquadSchema
  })
  ])
)

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
  z.literal('strike-force'),
  z.literal('free')
])

const baseArmySchema = z
  .object({
    codex: codexSchema,
    battle_size: battleSizeSchema.default('free'),
    id: idSchema,
    name: z.string(),
    points: z.number()
  })
  .and(
    z.union([
      z.object({ detachment: legacyDetachmentSchema }),
      z.object({ detachments: z.array(detachmentSchema).nonempty() })
    ])
  )
  .transform(({ battle_size, ...rest }) => {
    const battleSize = battle_size

    if ('detachment' in rest) {
      return {
        ...rest,
        battleSize,
        detachments: [rest.detachment] as [
          Army['detachments'][0],
          ...Army['detachments'][0][]
        ]
      }
    }

    return {
      ...rest,
      detachments: rest.detachments as [
        Army['detachments'][0],
        ...Army['detachments'][0][]
      ],
      battleSize: battle_size
    }
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

const armyListSchema = z
  .array(armySchema.nullable().catch(null))
  .transform((arr) => arr.filter((a) => a !== null))

const codexListSchema = z
  .array(codexSchema.nullable().catch(null))
  .transform((arr) => arr.filter((c) => c !== null))

const selectableCharacterSchema = z.object({
  type: baseCharacterSchema,
  hero: z.boolean()
})

const selectableLeaderSchema = z.object({
  type: baseLeaderSchema,
  hero: z.boolean()
})

const selectableSupportSchema = z.object({
  type: baseSupportSchema,
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
      unit_tiers: z.array(tierSchema).min(1),
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
    selectableSupportSchema,
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
      baseSupportSchema,
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
