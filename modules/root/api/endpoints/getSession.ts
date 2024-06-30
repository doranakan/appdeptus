import { type Session } from '@supabase/supabase-js'
import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'

const getSession = (builder: SupabaseEndpointBuilder) =>
  builder.query<Session | null, void>({
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        throw { error }
      }

      return { data: data.session }
    }
  })

export default getSession
