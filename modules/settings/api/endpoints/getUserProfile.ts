import { getUserId, type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type UserProfile } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { userProfileSchema } from '../schemas'

const getUserProfile = (builder: SupabaseEndpointBuilder) =>
  builder.query<UserProfile | null, void>({
    queryFn: async () => {
      try {
        const res = await getUserId()

        if (typeof res === 'object') {
          return { erros: res.error }
        }

        const { data, error } = await supabase.from('').select().eq('id', res)

        if (error) {
          return { error }
        }

        const userProfile = await userProfileSchema.parseAsync(data)

        return { data: userProfile }
      } catch (error) {
        return { error }
      }
    }
  })

export default getUserProfile
