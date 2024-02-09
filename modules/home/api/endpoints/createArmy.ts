import { SupabaseEndpointBuilder } from 'appdeptus/api'
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
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError) {
        throw { error: userError }
      }

      const { data, error: armiesError } = await supabase
        .from(Table.ARMIES)
        .insert({ ...army, userId: userData.user.id })

      if (armiesError) {
        throw { error: armiesError }
      }

      return { data }
    }
  })

export default createArmy
