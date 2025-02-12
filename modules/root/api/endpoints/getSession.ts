import { type Session } from '@supabase/supabase-js'
import { type SessionEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { type SessionApiTags } from '../tags'

const getSession = (builder: SessionEndpointBuilder<SessionApiTags>) =>
  builder.query<Session | null, void>({
    queryFn: async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data: data.session }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: ['session']
  })

export default getSession
