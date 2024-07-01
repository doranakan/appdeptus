import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type Army, type ArmyUnit } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { compact, sortBy } from 'lodash'
import { armySchema, tiersSchema, unitsSchema, weaponsSchema } from '../schemas'
import ArmiesApiTag from '../tags'
import { parseWeapon } from '../utils'

const getArmy = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
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

        const weaponIds = army.units
          .map(({ options }) => options)
          .flat()
          .map(({ weaponId }) => weaponId)
        const { data: weaponsData, error: weaponsError } = await supabase
          .from(Table.WEAPONS)
          .select()
          .in('id', weaponIds)

        if (weaponsError) {
          return { error: weaponsError }
        }

        const allUnits = unitsSchema.parse(mapNullToUndefined(unitsData))

        const allTiers = tiersSchema.parse(tiersData)

        const allWeapons = weaponsSchema.parse(mapNullToUndefined(weaponsData))

        const units = army.units.map<ArmyUnit>(
          ({ tier: tierId, unit: unitId, options: optionsAndWeapons }) => {
            const tier = allTiers.find(({ id }) => id === tierId)

            if (!tier) {
              throw { error: `corrupted data: invalid tierId ${tierId}` }
            }

            const unit = allUnits.find(({ id }) => id === unitId)

            if (!unit) {
              throw { error: `corrupted data: invalid unitId ${unitId}` }
            }

            const options = compact(
              optionsAndWeapons.map(({ optionId, weaponId }) => {
                const weapon = allWeapons.find(({ id }) => id === weaponId)

                if (!weapon) {
                  throw { error: `corrupted data: invalid tierId ${weaponId}` }
                }

                return {
                  id: optionId,
                  weapon: parseWeapon(weapon)
                }
              })
            )

            return {
              ...unit,
              tier,
              options
            }
          }
        )

        return {
          data: {
            id: army.id,
            codex: army.codex,
            name: army.name,
            totalPoints: army.totalPoints,
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
