import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

const deleteArmy = (builder: SupabaseEndpointBuilder<ArmiesApiTag>) =>
  builder.mutation<null, string>({
    queryFn: async (armyId) => {
      const { data, error } = await supabase
        .from(Table.ARMIES)
        .delete()
        .eq('id', armyId)

      if (error) {
        throw { error }
      }

      return {
        data
      }
    },
    invalidatesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default deleteArmy
