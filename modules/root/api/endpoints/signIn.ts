import { type AuthTokenResponsePassword } from '@supabase/supabase-js'
import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type SignInForm } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'

const signIn = (builder: SupabaseEndpointBuilder) =>
  builder.mutation<AuthTokenResponsePassword['data'], SignInForm>({
    queryFn: async ({ email, password }) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) {
          return { error }
        }

        return { data }
      } catch (error) {
        return { error }
      }
    }
  })

export default signIn
