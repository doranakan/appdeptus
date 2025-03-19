import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community, type UserProfile } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type CommunitiesApiTags } from '../tags'

type UpdateCommunityRequestArgs = {
  communityId: Community['id']
  userId: UserProfile['id']
  accepted: boolean
}

const updateCommunityRequest = (
  builder: CoreEndpointBuilder<CommunitiesApiTags>
) =>
  builder.mutation<null, UpdateCommunityRequestArgs>({
    queryFn: async ({ communityId, userId, accepted }) => {
      try {
        const { error: updateRequestError } = await supabase
          .from(Table.COMMUNITIES_REQUESTS)
          .update({
            accepted
          })
          .eq('community', communityId)
          .eq('user', userId)

        if (updateRequestError) {
          return { error: JSON.stringify(updateRequestError) }
        }

        if (!accepted) {
          return { data: null }
        }

        const { error: addUserError } = await supabase
          .from(Table.COMMUNITIES_USERS)
          .insert({
            community: communityId,
            user: userId
          })

        if (updateRequestError) {
          return { error: JSON.stringify(addUserError) }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, err, { communityId }) =>
      !err
        ? [
            'communities',
            { type: 'communities', id: communityId },
            { type: 'requests', id: communityId }
          ]
        : []
  })

export default updateCommunityRequest
