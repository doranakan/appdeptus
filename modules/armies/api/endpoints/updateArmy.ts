import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type ArmyBuilder } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'
import { insertArmyEntries } from '../utils'

const updateArmy = (builder: CoreEndpointBuilder<string>) =>
  builder.mutation<null, ArmyBuilder>({
    queryFn: async ({ units, id, codex: _codex, user: _user, ...rest }) => {
      try {
        const { data, error } = await supabase
          .from(Table.ARMIES)
          .update({ ...rest, roster: units, valid: true })
          .eq('id', id)
          .select('id')

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const { error: deleteError } = await supabase
          .from(Table.ARMY_ENTRIES)
          .delete()
          .eq('army', id)

        if (deleteError) {
          return { error: JSON.stringify(deleteError) }
        }

        const { error: entriesError } = await insertArmyEntries({
          armyId: data[0]?.id as number,
          units
        })

        if (entriesError) {
          return { error: JSON.stringify(entriesError) }
        }

        return {
          data: null
        }
      } catch (error) {
        return { error: JSON.stringify(error) }
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
