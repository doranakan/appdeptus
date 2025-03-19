import { type CoreEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type CommunitiesApiTags } from '../tags'

const createCommunity = (builder: CoreEndpointBuilder<CommunitiesApiTags>) =>
  builder.mutation<string, string>({
    queryFn: async (name) => {
      try {
        const { data, error } = await supabase
          .from(Table.COMMUNITIES)
          .insert({
            name: name.trim().toLowerCase()
          })
          .select('id')

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data: data[0]?.id as string }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, err, id) =>
      !err ? ['communities', { type: 'communities', id }] : []
  })

export default createCommunity
