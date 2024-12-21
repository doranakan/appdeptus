import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army, type UserProfile } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getArmySchema } from '../schemas'
import ArmiesApiTag from '../tags'

const getArmyList = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.query<
    Army & {
      user: UserProfile
    },
    string
  >({
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

        const armyList = getArmySchema.parse(data[0])

        return { data: armyList }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default getArmyList
