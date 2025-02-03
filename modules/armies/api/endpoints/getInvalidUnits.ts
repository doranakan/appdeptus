import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army, type Unit } from 'appdeptus/models'
import { mapRosterToUnits, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { uniq } from 'lodash'
import {
  invalidEnhancementsSchema,
  invalidTiersSchema,
  invalidUnitsSchema
} from '../schemas'
import ArmiesApiTag from '../tags'

const getInvalidUnits = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.query<Unit['selectionId'][], Army['roster']>({
    queryFn: async (roster) => {
      try {
        const units = mapRosterToUnits(roster)

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

          ids.units = invalidUnits.reduce<number[]>(
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
        }

        if (ids.tiers.length) {
          const { data, error } = await supabase
            .from(Table.TIERS)
            .select(
              `
              id,
              models,
              points
            `
            )
            .in('id', ids.tiers)

          if (error) {
            return { error: JSON.stringify(error) }
          }

          const invalidTiers = invalidTiersSchema.parse(data)

          ids.tiers = invalidTiers.reduce<number[]>(
            (acc, { id, models, points }) => {
              const u = units.filter(
                (unit) => 'tier' in unit && unit.tier.id === id
              )

              for (const unit of u) {
                if (
                  unit &&
                  'tier' in unit &&
                  (unit.tier.points !== points || unit.tier.models !== models)
                ) {
                  return [...acc, id]
                }
              }
              return acc
            },
            []
          )
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

          ids.enhancements = invalidEnhancements.reduce<number[]>(
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
        }

        console.log(ids)

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
    providesTags: [ArmiesApiTag.ARMY_DETAIL]
  })

export default getInvalidUnits
