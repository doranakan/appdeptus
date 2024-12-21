import { type Session } from '@supabase/supabase-js'
import { type SessionEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import * as AuthSession from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as WebBrowser from 'expo-web-browser'
import SessionApiTag from '../tags'
import { type Provider } from '../types'

const redirectTo = AuthSession.makeRedirectUri()

const signInWithOauth = (builder: SessionEndpointBuilder<SessionApiTag>) =>
  builder.mutation<Session, Provider>({
    queryFn: async (provider) => {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo,
            skipBrowserRedirect: true
          }
        })

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const res = await WebBrowser.openAuthSessionAsync(
          data?.url ?? '',
          redirectTo
        )

        if (res.type !== 'success') {
          return { error: JSON.stringify(res) }
        }

        const { url } = res
        const session = await createSessionFromUrl(url)

        if (!session || 'error' in session) {
          return { error: JSON.stringify(session?.error) }
        }

        return { data: session }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, error) => (!error ? [SessionApiTag.SESSION] : [])
  })

const createSessionFromUrl = async (url: string) => {
  console.log({ url })

  const { params, errorCode } = QueryParams.getQueryParams(url)

  if (errorCode) {
    return { error: JSON.stringify(errorCode) }
  }

  const { access_token, refresh_token } = params

  if (!access_token || !refresh_token) {
    return { error: 'No access token or refresh token' }
  }

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token
  })

  if (error) {
    return { error: JSON.stringify(errorCode) }
  }

  return data.session
}

export default signInWithOauth
