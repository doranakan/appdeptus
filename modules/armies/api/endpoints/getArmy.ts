import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army, type ArmyUnit } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { armySchema, detachmentSchema, unitsSchema } from '../schemas'
import ArmiesApiTag from '../tags'

const getArmy = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.query<Army, string>({
    queryFn: async (armyId) => {
      try {
        const { data: rawArmies, error: armiesError } = await supabase
          .from(Table.ARMIES)
          .select(
            `
          id, 
          name, 
          total_points,
          detachment,
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
          .select(
            `
              id,
              name,
              unit_tiers(
                id,
                models,
                points
              ),
              unit_upgrades(
                id,
                name,
                points
              )
            `
          )
          .in('id', unitIds)

        if (unitsError) {
          return { error: unitsError }
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

        const units = army.units.map<ArmyUnit>(
          ({ tier: tierId, unit: unitId, upgrades: upgradeIds }) => {
            const unit = allUnits.find(({ id }) => id === unitId)

            if (!unit) {
              throw { error: `corrupted data: invalid unitId ${unitId}` }
            }

            const tier = allUnits
              .flatMap(({ tiers }) => tiers)
              .find(({ id }) => id === tierId)

            if (!tier) {
              throw { error: `corrupted data: invalid tierId ${tierId}` }
            }

            const upgrades = allUnits
              .flatMap(({ upgrades }) => upgrades)
              .filter(({ id }) => upgradeIds.includes(id))

            return {
              ...unit,
              tier,
              upgrades
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
            id: army.id,
            codex: army.codex,
            name: army.name,
            totalPoints: army.totalPoints,
            detachment,
            units: sortBy(units, 'name')
          }
        }
      } catch (error) {
        return { error }
      }
    },
    providesTags: (res) => {
      if (!res) {
        return []
      }

      return [
        {
          type: ArmiesApiTag.ARMY_DETAIL,
          id: res.id
        }
      ]
    }
  })

export default getArmy
