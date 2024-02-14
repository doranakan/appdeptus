import { getUserId, type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { armiesSchema } from '../schemas'
import ArmiesApiTag from '../tags'

type GetArmiesResponse = Omit<Army, 'units'>

const getArmies = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.query<GetArmiesResponse[], void>({
    queryFn: async () => {
      const userId = await getUserId()

      const { data, error } = await supabase
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
        .eq('user_id', userId)

      if (error) {
        throw { error }
      }

      const armies = armiesSchema.parse(data)

      return { data: armies }
    },
    providesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default getArmies
