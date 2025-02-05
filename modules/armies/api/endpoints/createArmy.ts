import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type ArmyBuilder } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'
import { insertArmyEntries } from '../utils'

const createArmy = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.mutation<null, ArmyBuilder>({
    queryFn: async ({ codex, units, id: _id, user: _user, ...rest }) => {
      try {
        const { data, error } = await supabase
          .from(Table.ARMIES)
          .insert({
            codex: codex.id,
            roster: units,
            ...rest
          })
          .select('id')

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const { error: entriesError } = await insertArmyEntries({
          armyId: data[0]?.id as number,
          units
        })

        if (entriesError) {
          return { error: JSON.stringify(entriesError) }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_, e) => (!e ? [ArmiesApiTag.ARMY_LIST] : [])
  })

export default createArmy
