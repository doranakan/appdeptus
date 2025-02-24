import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { communitySchema } from '../schemas'
import { type CommunitiesApiTags } from '../tags'

const getCommunity = (builder: CoreEndpointBuilder<CommunitiesApiTags>) =>
  builder.query<Community, string | number>({
    queryFn: async (id) => {
      try {
        const { data, error } = await supabase
          .from(Table.COMMUNITIES)
          .select(
            `
                id,
                name,
                created_at,
                members: communities_users (
                  role,
                  user (
                    id,
                    name,
                    created_at
                  )
                )
            `
          )
          .eq('id', id)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const communities = communitySchema.parse(mapNullToUndefined(data[0]))

        return { data: communities }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: (res) => (res ? [{ type: 'communities', id: res.id }] : [])
  })

export default getCommunity
