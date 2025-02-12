import { type SessionEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { type SessionApiTags } from '../tags'

const signOut = (builder: SessionEndpointBuilder<SessionApiTags>) =>
  builder.mutation<null, void>({
    queryFn: async () => {
      try {
        const { error } = await supabase.auth.signOut({ scope: 'local' })

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, error) => (!error ? ['session'] : [])
  })

export default signOut
