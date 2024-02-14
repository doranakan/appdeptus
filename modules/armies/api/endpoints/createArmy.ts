/* eslint-disable camelcase */
import { getUserId, type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type CodexUnit, type UnitTier } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

type CreateArmyArgs = {
  name: string
  codexId: string
  totalPoints: number
  units: Record<CodexUnit['id'], UnitTier['id'][]>
}

const createArmy = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.mutation<null, CreateArmyArgs>({
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
