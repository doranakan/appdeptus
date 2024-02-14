import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { sortBy } from 'lodash'
import { armySchema, tiersSchema, unitsSchema } from '../schemas'
import ArmiesApiTag from '../tags'

const getArmy = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.query<Army, string>({
    queryFn: async (armyId) => {
      const { data: rawArmies, error: armiesError } = await supabase
        .from(Table.ARMIES)
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
        throw { error: armiesError ?? 'invalid Id' }
      }

      const army = armySchema.parse(rawArmies[0])

      const { data: unitsData, error: unitsError } = await supabase
        .from(Table.UNITS)
        .select()

      if (unitsError) {
        throw { error: unitsError }
      }

      const { data: tiersData, error: tiersError } = await supabase
        .from(Table.UNIT_TIERS)
        .select()
        .in('unit', Object.keys(army.units))

      if (tiersError) {
        throw { error: tiersError }
      }

      const allUnits = unitsSchema.parse(mapNullToUndefined(unitsData))

      const allTiers = tiersSchema.parse(tiersData)

      const units = Object.values(army.units)
        .flat()
        .map((tierId) => {
          const tier = allTiers.find(({ id }) => id === tierId)

          if (!tier) {
            throw { error: `corrupted data: invalid tierId ${tierId}` }
          }

          const unit = allUnits.find(({ id }) => id === tier.unit)

          if (!unit) {
            throw { error: `corrupted data: invalid unitId ${tier.unit}` }
          }

          return {
            ...unit,
            tier: {
              id: tier.id,
              points: tier.points
            }
          }
        })

      return {
        data: {
          id: army.id,
          codex: army.codex,
          name: army.name,
          totalPoints: army.totalPoints,
          units: sortBy(units, 'name')
        }
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
