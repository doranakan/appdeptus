import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type CommunityRequest } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { communityRequestListSchema } from '../schemas'
import { type CommunitiesApiTags } from '../tags'

const getCommunityRequestList = (
  builder: CoreEndpointBuilder<CommunitiesApiTags>
) =>
  builder.query<CommunityRequest[], string | number>({
    queryFn: async (id) => {
      try {
        const { data, error } = await supabase
          .from(Table.COMMUNITIES_REQUESTS)
          .select(
            `
          user!inner(
            *
          ),
          updated_at
          `
          )
          .eq('community', id)
          .is('accepted', null)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const requests = await communityRequestListSchema.parseAsync(
          mapNullToUndefined(data)
        )

        return { data: requests }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: (_res, _err, id) => [
      {
        type: 'requests',
        id
      }
    ]
  })

export default getCommunityRequestList
