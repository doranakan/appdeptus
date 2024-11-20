import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type ArmyBuilder } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

const updateArmy = (builder: CoreEndpointBuilder<string>) =>
  builder.mutation<null, ArmyBuilder>({
    queryFn: async ({ units, id, codex: _, ...rest }) => {
      try {
        const { data, error } = await supabase
          .from(Table.ARMIES)
          .update({ roster: units, ...rest })
          .eq('id', id)

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
    invalidatesTags: (_res, error, { id }) => {
      if (error) {
        return []
      }
      return [
        ArmiesApiTag.ARMY_LIST,
        {
          type: ArmiesApiTag.ARMY_DETAIL,
          id
        }
      ]
    }
  })

export default updateArmy
