import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'

const updateArmyVisibility = (builder: CoreEndpointBuilder<string>) =>
  builder.mutation<null, Pick<Army, 'id' | 'isSecret'>>({
    queryFn: async ({ id, isSecret: secret }) => {
      try {
        const { data, error } = await supabase
          .from(Table.ARMIES)
          .update({ secret })
          .eq('id', id)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return {
          data
        }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default updateArmyVisibility
