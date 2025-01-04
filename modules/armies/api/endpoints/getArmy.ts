import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { armySchema } from '../schemas'
import ArmiesApiTag from '../tags'

const getArmyList = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
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
    providesTags: [ArmiesApiTag.ARMY_LIST],
    /**
     * FIXME: this is bad workaround
     * if we use cache from this api the edit army flow has a bug:
     * __repro
     * 1. open an army
     * 2. tap edit in the options menu
     * 3. go back
     * 4. tap edit again
     * __result
     * the unit selection screen keeps the rightButton disabled until
     * a change is made. this is due to the fact that the `watch` function
     * in the _layout.tsx file does not refresh after resetting the form
     */
    keepUnusedDataFor: 0
  })

export default getArmyList
