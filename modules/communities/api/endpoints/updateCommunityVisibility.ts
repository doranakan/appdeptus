import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type CommunitiesApiTags } from '../tags'

type UpdateCommunityVisibilityArgs = {
  id: Community['id']
  secret: Community['isSecret']
}

const updateCommunityVisibility = (
  builder: CoreEndpointBuilder<CommunitiesApiTags>
) =>
  builder.mutation<null, UpdateCommunityVisibilityArgs>({
    queryFn: async ({ id, secret }) => {
      try {
        const { data, error } = await supabase
          .from(Table.COMMUNITIES)
          .update({
            secret
          })
          .eq('id', id)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, err, { id }) =>
      !err ? ['communities', { type: 'communities', id }] : []
  })

export default updateCommunityVisibility
