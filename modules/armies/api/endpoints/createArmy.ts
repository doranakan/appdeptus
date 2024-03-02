/* eslint-disable camelcase */
import { getUserId, type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type ArmyForm } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

const createArmy = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.mutation<null, ArmyForm>({
    queryFn: async ({ codexId, totalPoints, ...army }) => {
      const userId = await getUserId()

      const { data, error: armiesError } = await supabase
        .from(Table.ARMIES)
        .insert({
          ...army,
          codex: codexId,
          total_points: totalPoints,
          user_id: userId
        })

      if (armiesError) {
        throw { error: armiesError }
      }

      return { data }
    },
    invalidatesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default createArmy
