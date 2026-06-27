import { type CoreEndpointBuilder } from 'appdeptus/api'
import { getCostForPick, type Army, type Unit } from 'appdeptus/models'
import { mapRosterToUnits, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { uniq } from 'lodash'
import { type ArmiesApiTags } from '../tags'

type DbUnit = { id: number; type: string; hero: boolean }
type DbTier = {
  id: number
  unit: number
  models: number
  points: number
  points_surcharges: number[] | null
}
type DbEnhancement = { id: number; points: number }

const getInvalidUnits = (builder: CoreEndpointBuilder<ArmiesApiTags>) =>
  builder.query<Unit['selectionId'][], Army>({
    queryFn: async (army) => {
      try {
        const units = mapRosterToUnits(army.roster)

        const unitIds = uniq(units.map((u) => u.id))
        const tierIds = uniq(
          units.flatMap((u) => ('tier' in u ? [u.tier.id] : []))
        )
        const enhancementIds = uniq(
          units.flatMap((u) =>
            'enhancement' in u && u.enhancement ? [u.enhancement.id] : []
          )
        )

        const dbUnits = new Map<number, DbUnit>()
        if (unitIds.length) {
          const { data, error } = await supabase
            .from(Table.UNITS)
            .select('id, type, hero')
            .in('id', unitIds)

          if (error) {
            return { error: JSON.stringify(error) }
          }

          for (const u of (data ?? []) as DbUnit[]) {
            dbUnits.set(u.id, u)
          }
        }

        const dbTiers = new Map<string, DbTier>()
        if (tierIds.length) {
          const { data, error } = await supabase
            .from(Table.TIERS)
            .select('id, unit, models, points, points_surcharges')
            .in('id', tierIds)

          if (error) {
            return { error: JSON.stringify(error) }
          }

          for (const t of (data ?? []) as DbTier[]) {
            dbTiers.set(`${t.unit}:${t.id}`, t)
          }
        }

        const dbEnhancements = new Map<number, number>()
        if (enhancementIds.length) {
          const { data, error } = await supabase
            .from(Table.ENHANCEMENTS)
            .select('id, points')
            .in('id', enhancementIds)

          if (error) {
            return { error: JSON.stringify(error) }
          }

          for (const e of (data ?? []) as DbEnhancement[]) {
            dbEnhancements.set(e.id, e.points)
          }
        }

        const pickIndexBySelection = new Map<string, number>()
        const pickCounts: Record<string, number> = {}
        for (const unit of units) {
          const next = (pickCounts[unit.name] ?? 0) + 1
          pickCounts[unit.name] = next
          pickIndexBySelection.set(unit.selectionId, next)
        }

        const invalid: string[] = []
        for (const unit of units) {
          const dbUnit = dbUnits.get(unit.id)
          if (!dbUnit) {
            invalid.push(unit.selectionId)
            continue
          }
          if (dbUnit.type !== unit.type) {
            invalid.push(unit.selectionId)
            continue
          }
          if ('hero' in unit && dbUnit.hero !== unit.hero) {
            invalid.push(unit.selectionId)
            continue
          }

          if ('tier' in unit) {
            const dbTier = dbTiers.get(`${unit.id}:${unit.tier.id}`)
            if (!dbTier) {
              invalid.push(unit.selectionId)
              continue
            }
            if (dbTier.models !== unit.tier.models) {
              invalid.push(unit.selectionId)
              continue
            }
            const pickIndex = pickIndexBySelection.get(unit.selectionId) ?? 1
            const expectedPoints = getCostForPick(
              {
                id: dbTier.id,
                models: dbTier.models,
                points: dbTier.points,
                pointsSurcharges: dbTier.points_surcharges ?? undefined
              },
              pickIndex
            )
            if (unit.tier.points !== expectedPoints) {
              invalid.push(unit.selectionId)
              continue
            }
          }

          if ('enhancement' in unit && unit.enhancement) {
            const dbPoints = dbEnhancements.get(unit.enhancement.id)
            if (dbPoints === undefined) {
              invalid.push(unit.selectionId)
              continue
            }
            if (dbPoints !== unit.enhancement.points) {
              invalid.push(unit.selectionId)
              continue
            }
          }
        }

        return { data: invalid }
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
