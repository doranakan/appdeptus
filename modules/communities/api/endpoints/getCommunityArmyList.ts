import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { armyListSchema } from 'appdeptus/modules/armies/api'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type CommunitiesApiTags } from '../tags'

const getCommunityArmyList = (
  builder: CoreEndpointBuilder<CommunitiesApiTags>
) =>
  builder.query<Army[], string | number>({
    queryFn: async (id) => {
      try {
        const { data: users, error: usersError } = await supabase
          .from(Table.COMMUNITIES_USERS)
          .select('user')
          .eq('community', id)

        if (usersError) {
          return { error: JSON.stringify(usersError) }
        }

        const { data: armyList, error: armyListError } = await supabase
          .from('armies')
          .select(
            `
            *,
            codex!inner(
            *       
            ),
            user_id!inner(
            *
          )`
          )
          .in(
            'user_id',
            users.map(({ user }: { user: string }) => user)
          )
          .eq('secret', false)
          .eq('valid', true)

        if (armyListError) {
          return { error: JSON.stringify(armyListError) }
        }

        const armies = armyListSchema.parse(mapNullToUndefined(armyList))

        return { data: armies }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default getCommunityArmyList
