import { SupabaseEndpointBuilder, getUserId } from 'appdeptus/api'
import { CodexUnit, UnitTier } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

type CreateArmyArgs = {
  name: string
  codex: string
  totalPoints: number
  units: Record<CodexUnit['id'], UnitTier['id'][]>
}

const createArmy = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.mutation<null, CreateArmyArgs>({
    queryFn: async (army) => {
      const userId = await getUserId()

      const { data, error: armiesError } = await supabase
        .from(Table.ARMIES)
        .insert({ ...army, userId: userId })

      if (armiesError) {
        throw { error: armiesError }
      }

      return { data }
    },
    invalidatesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default createArmy