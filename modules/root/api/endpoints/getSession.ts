import { type Session } from '@supabase/supabase-js'
import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'

const getSession = (builder: SupabaseEndpointBuilder) =>
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
    }
  })

export default getSession
