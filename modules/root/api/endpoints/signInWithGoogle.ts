import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { type SessionEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { type SessionApiTags } from '../tags'
import { type SignInResponse } from '../types'
import { isNewUser } from '../utils'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS,
  forceCodeForRefreshToken: true,
  offlineAccess: true
})

const signInWithGoogle = (builder: SessionEndpointBuilder<SessionApiTags>) =>
  builder.mutation<SignInResponse, void>({
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
              data: { ...supabaseData, isNew: isNewUser(supabaseData.user) }
            }
          }

          return { error: JSON.stringify(error) }
        }

        return { error: 'no ID token present' }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, error) => (!error ? ['session'] : [])
  })

export default signInWithGoogle
