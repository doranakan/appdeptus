import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { armyListSchema } from '../schemas'
import { type ArmiesApiTags } from '../tags'

const getArmyList = (builder: CoreEndpointBuilder<ArmiesApiTags>) =>
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
          ),
          user_id!inner(
          *
          )
        `
          )
          .eq('user_id', userId)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const armyList = armyListSchema.parse(mapNullToUndefined(data))

        return { data: armyList }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: ['army-list']
  })

export default getArmyList
