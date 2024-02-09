import { SupabaseEndpointBuilder, getUserId } from 'appdeptus/api'
import { Unit, UnitTier } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'

type CreateArmyArgs = {
  name: string
  codex: string
  totalPoints: number
  units: Record<Unit['id'], UnitTier['id'][]>
}

const createArmy = (builder: SupabaseEndpointBuilder) =>
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
    }
  })

export default createArmy
