import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type UserProfile } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { userProfileSchema } from '../schemas'
import { type UserApiTags } from '../tags'

const getUserProfile = (builder: CoreEndpointBuilder<UserApiTags>) =>
  builder.query<UserProfile, string | void>({
    queryFn: async (id) => {
      try {
        const res = id ?? (await getUserId())

        if (typeof res === 'object') {
          return { erros: res.error }
        }

        const { data, error } = await supabase
          .from(Table.USERS)
          .select()
          .eq('id', res)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const userProfile = await userProfileSchema.parseAsync(
          mapNullToUndefined(data[0])
        )

        return { data: userProfile }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: (_res, _err, id) =>
      id
        ? [
            {
              type: 'user',
              id
            }
          ]
        : ['user']
  })

export default getUserProfile
