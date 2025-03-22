import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community, type UserProfile } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { commonCommunitiesSchema } from '../schemas'
import { type CommunitiesApiTags } from '../tags'

type GetCommonCommunitiesRequest = {
  userOneId: UserProfile['id']
  userTwoId: UserProfile['id']
}

const getCommonCommunities = (
  builder: CoreEndpointBuilder<CommunitiesApiTags>
) =>
  builder.query<Omit<Community, 'members'>[], GetCommonCommunitiesRequest>({
    queryFn: async ({ userOneId, userTwoId }) => {
      try {
        const { data: userOneData, error: userOneError } = await supabase
          .from(Table.COMMUNITIES_USERS)
          .select(
            `
              community(
                *
              )
            `
          )
          .eq('user', userOneId)

        if (userOneError) {
          return { error: JSON.stringify(userOneError) }
        }

        const { data: userTwoData, error: userTwoError } = await supabase
          .from(Table.COMMUNITIES_USERS)
          .select(
            `
              community(
                *
              )
            `
          )
          .eq('user', userTwoId)

        if (userTwoError) {
          return { error: JSON.stringify(userTwoError) }
        }

        const userOneCommunities = commonCommunitiesSchema.parse(
          mapNullToUndefined(userOneData)
        )
        const userTwoCommunities = commonCommunitiesSchema.parse(
          mapNullToUndefined(userTwoData)
        )

        const communities = userOneCommunities.filter(
          ({ id }) => !!userTwoCommunities.find(({ id: i }) => i === id)
        )

        return { data: communities }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default getCommonCommunities
