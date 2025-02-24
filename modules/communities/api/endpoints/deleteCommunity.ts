import { type CoreEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type CommunitiesApiTags } from '../tags'

const deleteMember = (builder: CoreEndpointBuilder<CommunitiesApiTags>) =>
  builder.mutation<null, string>({
    queryFn: async (id) => {
      try {
        const { data, error } = await supabase
          .from(Table.COMMUNITIES)
          .delete()
          .eq('id', id)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, err, id) =>
      !err ? ['communities', { type: 'communities', id }] : []
  })

export default deleteMember
