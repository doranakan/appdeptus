import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { armyListSchema } from '../schemas'
import ArmiesApiTag from '../tags'

const getArmyList = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.query<Army[], void>({
    queryFn: async () => {
      try {
        const userId = await getUserId()

        const { data, error } = await supabase
          .from(Table.ARMIES)
          .select(
            `
          *,
          codex!inner(
            *
          )
        `
          )
          .eq('user_id', userId)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const armyList = armyListSchema.parse(data)

        return { data: armyList }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default getArmyList
