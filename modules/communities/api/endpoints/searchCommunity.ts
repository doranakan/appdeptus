import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { baseCommunitySchema } from '../schemas'
import { type CommunitiesApiTags } from '../tags'

const searchCommunity = (builder: CoreEndpointBuilder<CommunitiesApiTags>) =>
  builder.query<Omit<Community, 'members'> | null, string>({
    queryFn: async (name) => {
      try {
        const { data, error } = await supabase
          .from(Table.COMMUNITIES)
          .select('*')
          .eq('name', name.trim().toLowerCase())

        if (error) {
          return { error: JSON.stringify(error) }
        }

        if (data[0]) {
          const communities = await baseCommunitySchema.parseAsync(data[0])

          return { data: communities }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default searchCommunity
