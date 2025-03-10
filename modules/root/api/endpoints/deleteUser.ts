import { type SessionEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { type SessionApiTags } from '../tags'

const deleteUser = (builder: SessionEndpointBuilder<SessionApiTags>) =>
  builder.mutation<null, void>({
    queryFn: async () => {
      try {
        const res = await supabase.functions.invoke('delete-current-user', {
          method: 'POST'
        })

        if ('error' in res && res.error) {
          return { error: JSON.stringify(res.error) }
        }

        const { error: signOutError } = await supabase.auth.signOut({
          scope: 'global'
        })

        if (signOutError) {
          return { error: JSON.stringify(signOutError) }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, error) => (!error ? ['session'] : [])
  })

export default deleteUser
