import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type UserApiTags } from '../tags'

const updateUserName = (builder: CoreEndpointBuilder<UserApiTags>) =>
  builder.mutation<null, string>({
    queryFn: async (name) => {
      try {
        const res = await getUserId()

        if (typeof res === 'object') {
          return { erros: res.error }
        }

        const { error } = await supabase
          .from(Table.USERS)
          .update({ name: name.trim() })
          .eq('id', res)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, error) => (!error ? ['user'] : [])
  })

export default updateUserName
