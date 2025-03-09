import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type CommunitiesApiTags } from '../tags'

type DeleteMemberArgs = {
  communityId: Community['id']
  memberId: Community['members'][number]['id']
}

const deleteMember = (builder: CoreEndpointBuilder<CommunitiesApiTags>) =>
  builder.mutation<null, DeleteMemberArgs>({
    queryFn: async ({ memberId, communityId }) => {
      try {
        const { data, error } = await supabase
          .from(Table.COMMUNITIES_USERS)
          .delete()
          .eq('user', memberId)
          .eq('community', communityId)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, err, { communityId: id }) =>
      !err ? ['communities', { type: 'communities', id }] : []
  })

export default deleteMember
