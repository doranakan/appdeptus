import { type AuthTokenResponsePassword } from '@supabase/supabase-js'
import { type SessionEndpointBuilder } from 'appdeptus/api'
import { type EmailAuthForm } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import SessionApiTag from '../tags'

const signIn = (builder: SessionEndpointBuilder<SessionApiTag>) =>
  builder.mutation<
    AuthTokenResponsePassword['data'],
    Omit<EmailAuthForm, 'name'>
  >({
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
    },
    invalidatesTags: (_res, error) => (!error ? [SessionApiTag.SESSION] : [])
  })

export default signIn
