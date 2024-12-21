import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import UserApiTag from '../tags'

const updateUserName = (builder: CoreEndpointBuilder<UserApiTag.USER>) =>
  builder.mutation<null, string>({
    queryFn: async (name) => {
      try {
        const res = await getUserId()

        if (typeof res === 'object') {
          return { erros: res.error }
        }

        const { error } = await supabase
          .from(Table.USERS)
          .update({ name })
          .eq('id', res)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, error) => (!error ? [UserApiTag.USER] : [])
  })

export default updateUserName
