import { type CoreEndpointBuilder } from 'appdeptus/api'
import { getCostForPick, type Army, type Unit } from 'appdeptus/models'
import { mapRosterToUnits, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { uniq } from 'lodash'
import {
  invalidEnhancementsSchema,
  invalidTiersSchema,
  invalidUnitsSchema
} from '../schemas'
import { type ArmiesApiTags } from '../tags'

const getInvalidUnits = (builder: CoreEndpointBuilder<ArmiesApiTags>) =>
  builder.query<Unit['selectionId'][], Army>({
    queryFn: async (army) => {
      try {
        const units = mapRosterToUnits(army.roster)

        const ids = units.reduce(
          (acc, unit) => ({
            units: uniq([...acc.units, unit.id]),
            tiers:
              'tier' in unit ? uniq([...acc.tiers, unit.tier.id]) : acc.tiers,
            enhancements:
              'enhancement' in unit && unit.enhancement
                ? uniq([...acc.enhancements, unit.enhancement.id])
                : acc.enhancements
          }),
          {
            units: [] as number[],
            tiers: [] as number[],
            enhancements: [] as number[]
          }
        )

        if (ids.units.length) {
          const { data, error } = await supabase
            .from(Table.UNITS)
            .select(
              `
              id,
              type,
              hero
            `
            )
            .in('id', ids.units)

          if (error) {
            return { error: JSON.stringify(error) }
          }

          const invalidUnits = invalidUnitsSchema.parse(data)
          const returnedUnitIds = new Set(invalidUnits.map(({ id }) => id))
          const deletedUnitIds = ids.units.filter(
            (id) => !returnedUnitIds.has(id)
          )

          ids.units = [
            ...deletedUnitIds,
            ...invalidUnits.reduce<number[]>(
              (acc, { id, hero, type }) => {
                const u = units.filter((unit) => unit.id === id)

                for (const unit of u) {
                  if (
                    unit.type !== type ||
                    ('hero' in unit && unit.hero !== hero)
                  ) {
                    return [...acc, id]
                  }
                }

                return acc
              },
              []
            )
          ]
        }

        if (ids.tiers.length) {
          const { data, error } = await supabase
            .from(Table.TIERS)
            .select(
              `
              id,
              models,
              points,
              points_surcharges
            `
            )
            .in('id', ids.tiers)

          if (error) {
            return { error: JSON.stringify(error) }
          }

          const invalidTiers = invalidTiersSchema.parse(data)
          const returnedTierIds = new Set(invalidTiers.map(({ id }) => id))
          const deletedTierIds = ids.tiers.filter(
            (id) => !returnedTierIds.has(id)
          )

          const pickCounts: Record<string, number> = {}
          const unitPickIndex = new Map<string, number>()
          for (const unit of units) {
            pickCounts[unit.name] = (pickCounts[unit.name] ?? 0) + 1
            if ('selectionId' in unit) {
              unitPickIndex.set(unit.selectionId, pickCounts[unit.name]!)
            }
          }

          ids.tiers = [
            ...deletedTierIds,
            ...invalidTiers.reduce<number[]>(
            (acc, { id, models, points, pointsSurcharges }) => {
              const dbTier = { id, models, points, pointsSurcharges }
              const u = units.filter(
                (unit) => 'tier' in unit && unit.tier.id === id
              )

              for (const unit of u) {
                if (!unit || !('tier' in unit)) continue
                const pickIndex =
                  'selectionId' in unit
                    ? (unitPickIndex.get(unit.selectionId) ?? 1)
                    : 1
                const expectedPoints = getCostForPick(dbTier, pickIndex)

                if (
                  unit.tier.points !== expectedPoints ||
                  unit.tier.models !== models
                ) {
                  return [...acc, id]
                }
              }
              return acc
            },
            []
            )
          ]
        }

        if (ids.enhancements.length) {
          const { data, error } = await supabase
            .from(Table.ENHANCEMENTS)
            .select(
              `
              id,
              points
            `
            )
            .in('id', ids.enhancements)

          if (error) {
            return { error: JSON.stringify(error) }
          }

          const invalidEnhancements = invalidEnhancementsSchema.parse(data)
          const returnedEnhancementIds = new Set(
            invalidEnhancements.map(({ id }) => id)
          )
          const deletedEnhancementIds = ids.enhancements.filter(
            (id) => !returnedEnhancementIds.has(id)
          )

          ids.enhancements = [
            ...deletedEnhancementIds,
            ...invalidEnhancements.reduce<number[]>(
              (acc, { id, points }) => {
                const u = units.filter(
                  (unit) =>
                    unit && 'enhancement' in unit && unit.enhancement?.id === id
                )
                for (const unit of u) {
                  if (
                    'enhancement' in unit &&
                    unit.enhancement &&
                    unit.enhancement.points !== points
                  ) {
                    return [...acc, id]
                  }
                }
                return acc
              },
              []
            )
          ]
        }

        const invalidUnits = units.reduce<string[]>((acc, unit) => {
          if (ids.units.includes(unit.id)) {
            return [...acc, unit.selectionId]
          }
          if ('tier' in unit && ids.tiers.includes(unit.tier.id)) {
            return [...acc, unit.selectionId]
          }
          if (
            'enhancement' in unit &&
            unit.enhancement &&
            ids.enhancements.includes(unit.enhancement.id)
          ) {
            return [...acc, unit.selectionId]
          }
          return acc
        }, [])

        return { data: invalidUnits }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: (_res, _err, { id }) => [
      'army-list',
      { type: 'army-list', id }
    ]
  })

export default getInvalidUnits
