import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { type AuthTokenResponsePassword } from '@supabase/supabase-js'
import { type SessionEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import SessionApiTag from '../tags'

const signInWithGoogle = (builder: SessionEndpointBuilder<SessionApiTag>) =>
  builder.mutation<AuthTokenResponsePassword['data'], void>({
    queryFn: async () => {
      try {
        await GoogleSignin.hasPlayServices()
        const { data: googleData } = await GoogleSignin.signIn()

        if (googleData?.idToken) {
          const { data: supabaseData, error } =
            await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: googleData.idToken
            })

          if (supabaseData.session && supabaseData.user) {
            return {
              data: supabaseData
            }
          }

          return { error: JSON.stringify(error) }
        }

        return { error: 'no ID token present' }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, error) => (!error ? [SessionApiTag.SESSION] : [])
  })

export default signInWithGoogle
