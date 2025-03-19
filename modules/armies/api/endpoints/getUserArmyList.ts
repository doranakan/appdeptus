import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army, type UserProfile } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { armyListSchema } from '../schemas'
import { type ArmiesApiTags } from '../tags'

const getUserArmyList = (builder: CoreEndpointBuilder<ArmiesApiTags>) =>
  builder.query<Army[], UserProfile['id']>({
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
          .eq('user_id', id)
          .eq('secret', false)
          .eq('valid', true)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const armyList = armyListSchema.parse(mapNullToUndefined(data))

        return { data: armyList }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default getUserArmyList
