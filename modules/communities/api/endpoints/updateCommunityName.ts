import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type CommunitiesApiTags } from '../tags'

type UpdateCommunityNameArgs = {
  id: Community['id']
  name: Community['name']
}

const updateCommunityName = (
  builder: CoreEndpointBuilder<CommunitiesApiTags>
) =>
  builder.mutation<null, UpdateCommunityNameArgs>({
    queryFn: async ({ id, name }) => {
      try {
        const { data, error } = await supabase
          .from(Table.COMMUNITIES)
          .update({
            name: name.trim().toLowerCase()
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

export default updateCommunityName
