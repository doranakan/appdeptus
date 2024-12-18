import { type AuthTokenResponsePassword } from '@supabase/supabase-js'
import { type SessionEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import * as AppleAuthentication from 'expo-apple-authentication'
import SessionApiTag from '../tags'

const signInWithApple = (builder: SessionEndpointBuilder<SessionApiTag>) =>
  builder.mutation<AuthTokenResponsePassword['data'], void>({
    queryFn: async () => {
      try {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL
          ]
        })

        if (credential.identityToken) {
          const { error, data } = await supabase.auth.signInWithIdToken({
            provider: 'apple',
            token: credential.identityToken
          })

          if (error) {
            return { error: JSON.stringify(error) }
          }

          if (!data.session || !data.user) {
            return { error: 'no ID token present' }
          }

          return { data }
        }

        return { error: 'no ID token present' }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, error) => (!error ? [SessionApiTag.SESSION] : [])
  })

export default signInWithApple
