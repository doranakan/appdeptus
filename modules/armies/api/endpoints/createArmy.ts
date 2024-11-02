import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type NewArmy } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

const createArmy = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.mutation<null, NewArmy>({
    queryFn: async ({ codex, ...army }) => {
      try {
        const { data, error: armiesError } = await supabase
          .from(Table.ARMIES)
          .insert({
            ...army,
            codex: codex.id
          })

        if (armiesError) {
          return { error: armiesError }
        }

        return { data }
      } catch (error) {
        return { error }
      }
    },
    invalidatesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default createArmy
