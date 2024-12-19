import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type ArmyBuilder } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

const createArmy = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.mutation<null, ArmyBuilder>({
    queryFn: async ({ codex, units, id: _, ...rest }) => {
      try {
        const { data, error } = await supabase.from(Table.ARMIES).insert({
          codex: codex.id,
          roster: units,
          ...rest
        })

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_, e) => (!e ? [ArmiesApiTag.ARMY_LIST] : [])
  })

export default createArmy
