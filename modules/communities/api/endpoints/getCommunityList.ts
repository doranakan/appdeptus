import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { communityListSchema } from '../schemas'
import { type CommunitiesApiTags } from '../tags'

const getCommunityList = (builder: CoreEndpointBuilder<CommunitiesApiTags>) =>
  builder.query<Community[], void>({
    queryFn: async () => {
      try {
        const userId = await getUserId()

        const { data, error } = await supabase
          .from(Table.COMMUNITIES_USERS)
          .select(
            `
              community (
                id,
                name,
                created_at,
                secret,
                image,
                members: communities_users (
                  *,
                  user (
                    id,
                    name,
                    created_at
                  )
                )
              )
            `
          )
          .eq('user', userId)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const communities = communityListSchema.parse(mapNullToUndefined(data))

        return { data: communities }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: ['communities']
  })

export default getCommunityList
