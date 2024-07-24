import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { armiesSchema } from '../schemas'
import ArmiesApiTag from '../tags'

type GetArmiesResponse = Omit<Army, 'units'>

const getArmies = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.query<GetArmiesResponse[], void>({
    queryFn: async () => {
      try {
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
          return { error }
        }

        const armies = armiesSchema.parse(data)

        return { data: armies }
      } catch (error) {
        return { error }
      }
    },
    providesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default getArmies
