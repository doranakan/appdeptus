import { type SessionEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import SessionApiTag from '../tags'

const signOut = (builder: SessionEndpointBuilder<SessionApiTag>) =>
  builder.mutation<null, void>({
    queryFn: async () => {
      try {
        const { error } = await supabase.auth.signOut({ scope: 'local' })

        if (error) {
          return { error }
        }

        return { data: null }
      } catch (error) {
        return { error }
      }
    },
    invalidatesTags: (_res, error) => (!error ? [SessionApiTag.SESSION] : [])
  })

export default signOut
