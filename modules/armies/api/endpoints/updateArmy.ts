/* eslint-disable camelcase */
import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type ArmyForm } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

type UpdateArmyArgs = {
  armyId: string
} & ArmyForm

const updateArmy = (builder: SupabaseEndpointBuilder<string>) =>
  builder.mutation<null, UpdateArmyArgs>({
    queryFn: async ({ armyId, totalPoints, codexId, ...restArgs }) => {
      try {
        const { data, error } = await supabase
          .from(Table.ARMIES)
          .update({
            ...restArgs,
            total_points: totalPoints,
            codex: codexId
          })
          .eq('id', armyId)

        if (error) {
          return { error }
        }

        return {
          data
        }
      } catch (error) {
        return { error }
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
