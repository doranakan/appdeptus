import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { searchCommunitySchema } from '../schemas'
import { type CommunitiesApiTags } from '../tags'

const searchCommunities = (builder: CoreEndpointBuilder<CommunitiesApiTags>) =>
  builder.query<Omit<Community, 'members'>[], string>({
    queryFn: async (name) => {
      try {
        const { data, error } = await supabase
          .from(Table.COMMUNITIES)
          .select('*')
          .ilike('name', `%${name.trim().toLowerCase()}%`)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const communities = await searchCommunitySchema.parseAsync(
          mapNullToUndefined(data)
        )

        return { data: communities }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default searchCommunities
