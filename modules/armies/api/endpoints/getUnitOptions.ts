import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type UnitComposition } from 'appdeptus/models'
import { type Wargear } from 'appdeptus/models/wargear'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { compact, groupBy, uniq } from 'lodash'
import {
  unitOptionsSchema,
  wargearWeaponsSchema,
  weaponsSchema
} from '../schemas'
import type ArmiesApiTag from '../tags'
import { parseWeapon } from '../utils'
import { unitCompositionQuery } from './getUnitComposition'

type Composition = Omit<UnitComposition[0], 'tierId' | 'id'>

type UnitOption = Composition & Wargear

const getUnitOptions = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.query<UnitOption[], string>({
    queryFn: async (tierId) => {
      try {
        const { data: unitComposition } = await unitCompositionQuery(tierId)

        const compositionIds = unitComposition?.map(({ id }) => id)

        if (!compositionIds) {
          return { error: `corrupted data: invalid tierId ${tierId}` }
        }

        const { data: wargears, error: wargearsError } = await supabase
          .from(Table.UNIT_WARGEARS)
          .select(
            `
          id,
          unit_composition,
          weapon!inner(
            *
          )
        `
          )
          .in('unit_composition', compositionIds)

        if (wargearsError) {
          return { error: wargearsError }
        }

        const wargearWeapons = groupBy(
          wargearWeaponsSchema.parse(mapNullToUndefined(wargears)),
          'unit_composition'
        )

        const { data: rawOptions, error: optionsError } = await supabase
          .from(Table.UNIT_OPTIONS)
          .select()
          .in('unit_composition', compositionIds)

        if (optionsError) {
          return { error: optionsError }
        }

        const unitOptions = unitOptionsSchema.parse(
          mapNullToUndefined(rawOptions)
        )

        const weaponIds = uniq(unitOptions.map(({ weapons }) => weapons).flat())

        const { data: tierWeapons, error: weaponsError } = await supabase
          .from(Table.WEAPONS)
          .select()
          .in('id', weaponIds)

        if (weaponsError) {
          return { error: weaponsError }
        }

        const allWeapons = weaponsSchema.parse(mapNullToUndefined(tierWeapons))

        const optionalWeapons = groupBy(
          unitOptions.map(({ weapons: ids, ...rest }) => {
            const weapons = compact(
              ids.map((id) =>
                allWeapons.find(({ id: weaponId }) => weaponId === id)
              )
            )

            return {
              ...rest,
              weapons
            }
          }),
          'unit_composition'
        )

        const options = unitComposition?.map<UnitOption>(
          ({ model, count, id: compositionId }) => {
            const { id: modelId, name: modelName, stats } = model

            const modelWargear = wargearWeapons[compositionId]

            const baseWargear =
              modelWargear?.map(({ id, weapon }) => ({
                id,
                weapon: parseWeapon(weapon)
              })) ?? []

            const unitTierOptionalWeapons = optionalWeapons[compositionId]

            const options = unitTierOptionalWeapons?.map(
              ({ unit_wargear: replaces, weapons, ...rest }) => ({
                ...rest,
                replaces,
                weapons: weapons.map(parseWeapon)
              })
            )

            return {
              count,
              model: {
                id: modelId,
                name: modelName,
                stats
              },
              baseWargear,
              options
            }
          }
        )

        return { data: options }
      } catch (error) {
        return { error }
      }
    }
  })

export default getUnitOptions
