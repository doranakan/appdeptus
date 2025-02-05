import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { armySchema } from '../schemas'
import ArmiesApiTag from '../tags'

const getArmy = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.query<Army, string>({
    queryFn: async (id) => {
      try {
        const { data, error } = await supabase
          .from(Table.ARMIES)
          .select(
            `
              *,
              codex!inner(
                *
              ),
              user_id!inner(
                *
              ) 
            `
          )
          .eq('id', id)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const armyList = armySchema.parse(mapNullToUndefined(data[0]))

        return { data: armyList }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default getArmy
