import { type SessionEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import * as AuthSession from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as WebBrowser from 'expo-web-browser'
import { type SessionApiTags } from '../tags'
import { type Provider, type SignInResponse } from '../types'
import { isNewUser } from '../utils'

const redirectTo = AuthSession.makeRedirectUri()

const signInWithOauth = (builder: SessionEndpointBuilder<SessionApiTags>) =>
  builder.mutation<SignInResponse, Provider>({
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
        const signInData = await createSessionFromUrl(url)

        if ('error' in signInData) {
          return { error: JSON.stringify(signInData?.error) }
        }

        if (signInData.user === null || signInData.session === null) {
          return { error: 'No user or session' }
        }

        return {
          data: {
            isNew: isNewUser(signInData.user),
            session: signInData.session,
            user: signInData.user
          }
        }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, error) => (!error ? ['session'] : [])
  })

const createSessionFromUrl = async (url: string) => {
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

  return data
}

export default signInWithOauth
