import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army, type ArmyUnit } from 'appdeptus/models'
import {
  armySchema,
  detachmentSchema,
  tiersSchema,
  unitsSchema
} from 'appdeptus/modules/armies/api'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import type ArmiesApiTag from '../tags'

const getGameArmy = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.query<Army, string>({
    queryFn: async (armyId) => {
      try {
        const { data: rawArmies, error: armiesError } = await supabase
          .from(Table.GAME_ARMIES)
          .select(
            `
          id, 
          name, 
          total_points, 
          units,
          codex!inner(
            *
          )
        `
          )
          .eq('id', armyId)

        if (armiesError ?? !rawArmies.length) {
          return { error: armiesError ?? 'invalid Id' }
        }

        const army = armySchema.parse(rawArmies[0])

        const unitIds = army.units.map(({ unit }) => unit)
        const { data: unitsData, error: unitsError } = await supabase
          .from(Table.UNITS)
          .select()
          .in('id', unitIds)

        if (unitsError) {
          return { error: unitsError }
        }

        const tierIds = army.units.map(({ tier }) => tier)
        const { data: tiersData, error: tiersError } = await supabase
          .from(Table.UNIT_TIERS)
          .select()
          .in('id', tierIds)

        if (tiersError) {
          return { error: tiersError }
        }

        const { data: detachmentData, error: detachmentError } = await supabase
          .from(Table.DETACHMENTS)
          .select(
            `
            id,
            name,
            detachment_enhancements(
              id,
              name,
              points
            )
          `
          )
          .eq('id', army.detachment.id)

        if (detachmentError) {
          return { error: detachmentError }
        }

        const allUnits = unitsSchema.parse(mapNullToUndefined(unitsData))

        const allTiers = tiersSchema.parse(tiersData)

        const units = army.units.map<ArmyUnit>(
          ({ tier: tierId, unit: unitId }) => {
            const tier = allTiers.find(({ id }) => id === tierId)

            if (!tier) {
              throw { error: `corrupted data: invalid tierId ${tierId}` }
            }

            const unit = allUnits.find(({ id }) => id === unitId)

            if (!unit) {
              throw { error: `corrupted data: invalid unitId ${unitId}` }
            }

            return {
              ...unit,
              tier
            }
          }
        )

        const completeDetachment = detachmentSchema.parse(detachmentData)

        const detachment = {
          ...completeDetachment,
          enhancements: completeDetachment.enhancements.filter(({ id }) =>
            army.detachment.enhancements.includes(id)
          )
        }

        return {
          data: {
            ...army,
            detachment,
            units: sortBy(units, 'name')
          }
        }
      } catch (error) {
        return { error }
      }
    }
  })

export default getGameArmy
