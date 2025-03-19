import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type CommunitiesApiTags } from '../tags'

const sendCommunityRequest = (
  builder: CoreEndpointBuilder<CommunitiesApiTags>
) =>
  builder.mutation<null, Community['id']>({
    queryFn: async (community) => {
      try {
        const user = await getUserId()

        const { data, error } = await supabase
          .from(Table.COMMUNITIES_REQUESTS)
          .upsert({
            community,
            user,
            accepted: null
          })

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, err, id) =>
      !err ? ['requests', { type: 'requests', id }] : []
  })

export default sendCommunityRequest
