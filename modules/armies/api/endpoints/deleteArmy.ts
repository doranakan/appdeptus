import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

const deleteArmy = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.mutation<null, string>({
    queryFn: async (armyId) => {
      try {
        const { data, error } = await supabase
          .from(Table.ARMIES)
          .delete()
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
    invalidatesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default deleteArmy
