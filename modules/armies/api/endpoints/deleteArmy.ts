import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

const deleteArmy = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.mutation<null, Army['id']>({
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
