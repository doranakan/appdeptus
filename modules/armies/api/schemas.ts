/* eslint-disable camelcase */
import { type SelectableUnit } from 'appdeptus/models'
import { z } from 'zod'

const idSchema = z.number()

const codexSchema = z.object({
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
  ])
})

const baseUnitSchema = z.object({
  id: idSchema,
  name: z.string()
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
  name: z.string()
})

const detachmentListSchema = z.array(
  baseDetachmentSchema
    .merge(
      z.object({
        detachment_enhancements: z.array(enhancementSchema)
      })
    )
    .transform(({ detachment_enhancements, ...rest }) => ({
      ...rest,
      enhancements: detachment_enhancements
    }))
)

const armyUnitSchema = baseUnitSchema.merge(
  z.object({
    selectionId: z.string(),
    tier: tierSchema,
    upgrades: z.array(upgradeSchema)
  })
)

const characterSchema = armyUnitSchema.merge(
  z.object({ type: z.literal('character') })
)
const leaderSchema = armyUnitSchema.merge(
  z.object({ type: z.literal('leader') })
)
const squadSchema = armyUnitSchema.merge(z.object({ type: z.literal('squad') }))
const teamSchema = z.object({
  id: z.string(),
  bodyguard: squadSchema,
  leader: leaderSchema,
  type: z.literal('team')
})
const transportSchema = armyUnitSchema.merge(
  z.object({ type: z.literal('transport') })
)
const vehicleSchema = armyUnitSchema.merge(
  z.object({ type: z.literal('vehicle') })
)

const armySchema = z.object({
  codex: codexSchema,
  composition: z.object({
    characters: z.array(characterSchema),
    detachment: baseDetachmentSchema.merge(
      z.object({
        enhancements: z.array(enhancementSchema)
      })
    ),
    leaders: z.array(leaderSchema),
    squads: z.array(squadSchema),
    transports: z.array(transportSchema),
    teams: z.array(teamSchema),
    vehicles: z.array(vehicleSchema),
    warlord: z.discriminatedUnion('type', [
      teamSchema,
      leaderSchema,
      characterSchema
    ])
  }),
  id: idSchema,
  name: z.string(),
  points: z.number()
})

const armyListSchema = z.array(armySchema)

const codexListSchema = z.array(codexSchema)

const codexUnitSchema = baseUnitSchema
  .merge(
    z.object({
      type: z.union([
        z.literal('character'),
        z.literal('leader'),
        z.literal('squad'),
        z.literal('transport'),
        z.literal('vehicle')
      ]),
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

const unitListSchema = z.array(codexUnitSchema)

export {
  armyListSchema,
  armySchema,
  codexListSchema,
  codexSchema,
  codexUnitSchema,
  detachmentListSchema,
  unitListSchema
}
