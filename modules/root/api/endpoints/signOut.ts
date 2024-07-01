import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import apiTags from 'appdeptus/api/tags'
import { supabase } from 'appdeptus/utils'

const signOut = (builder: SupabaseEndpointBuilder<string>) =>
  builder.mutation<null, void>({
    queryFn: async () => {
      const { error } = await supabase.auth.signOut()

      console.log(error)

      if (error) {
        return { error }
      }

      return { data: null }
    },
    invalidatesTags: apiTags
  })

export default signOut
