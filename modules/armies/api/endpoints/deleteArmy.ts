import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type ArmiesApiTags } from '../tags'

const deleteArmy = (builder: CoreEndpointBuilder<ArmiesApiTags>) =>
  builder.mutation<null, Army['id']>({
    queryFn: async (armyId) => {
      try {
        const { data, error } = await supabase
          .from(Table.ARMIES)
          .delete()
          .eq('id', armyId)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return {
          data
        }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_, err) => (!err ? ['army-list'] : [])
  })

export default deleteArmy
