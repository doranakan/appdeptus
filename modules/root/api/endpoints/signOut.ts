import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import apiTags from 'appdeptus/api/tags'
import { supabase } from 'appdeptus/utils'

const signOut = (builder: SupabaseEndpointBuilder<string>) =>
  builder.mutation<null, void>({
    queryFn: async () => {
      try {
        const { error } = await supabase.auth.signOut()

        if (error) {
          return { error }
        }

        return { data: null }
      } catch (error) {
        return { error }
      }
    },
    invalidatesTags: apiTags
  })

export default signOut
