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
                secret,
                members: communities_users (
                  *,
                  user (
                    *
                  )
                )
            `
          )
          .eq('id', id)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const community = communitySchema.parse(mapNullToUndefined(data[0]))

        community.members = community.members.sort((a, b) => {
          if (b.wins !== a.wins) {
            return b.wins - a.wins // Sort by wins descending
          } else {
            return a.losses - b.losses // if wins are equal, sort by losses ascending
          }
        })

        return { data: community }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: (res) => (res ? [{ type: 'communities', id: res.id }] : [])
  })

export default getCommunity
