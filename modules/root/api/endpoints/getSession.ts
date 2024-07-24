import { type Session } from '@supabase/supabase-js'
import { type SessionEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import SessionApiTag from '../tags'

const getSession = (builder: SessionEndpointBuilder<SessionApiTag>) =>
  builder.query<Session | null, void>({
    queryFn: async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          return { error }
        }

        return { data: data.session }
      } catch (error) {
        return { error }
      }
    },
    providesTags: [SessionApiTag.SESSION]
  })

export default getSession
