/* eslint-disable camelcase */
import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type CodexUnit, type UnitTier } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

type UpdateArmyArgs = {
  armyId: string
  name: string
  totalPoints: number
  units: Record<CodexUnit['id'], UnitTier['id'][]>
}

const updateArmy = (builder: SupabaseEndpointBuilder<string>) =>
  builder.mutation<null, UpdateArmyArgs>({
    queryFn: async ({ armyId, totalPoints, ...restArgs }) => {
      const { data, error } = await supabase
        .from(Table.ARMIES)
        .update({ ...restArgs, total_points: totalPoints })
        .eq('id', armyId)

      if (error) {
        throw { error }
      }

      return {
        data
      }
    },
    invalidatesTags: (_res, error, { armyId }) => {
      if (error) {
        return []
      }
      return [
        ArmiesApiTag.ARMY_LIST,
        {
          type: ArmiesApiTag.ARMY_DETAIL,
          id: armyId
        }
      ]
    }
  })

export default updateArmy
