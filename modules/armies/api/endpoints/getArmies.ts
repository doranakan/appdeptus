import { SupabaseEndpointBuilder, getUserId } from 'appdeptus/api'
import { Army } from 'appdeptus/models'
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
          totalPoints, 
          units,
          codex!inner(
            *
          )
        `
        )
        .eq('userId', userId)

      if (error) {
        throw { error }
      }

      const armies = armiesSchema.parse(data)

      return { data: armies }
    },
    providesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default getArmies
