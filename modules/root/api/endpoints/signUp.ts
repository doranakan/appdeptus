import { type AuthTokenResponsePassword } from '@supabase/supabase-js'
import { type SessionEndpointBuilder } from 'appdeptus/api'
import { type EmailAuthForm } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import SessionApiTag from '../tags'

const signUp = (builder: SessionEndpointBuilder<SessionApiTag>) =>
  builder.mutation<AuthTokenResponsePassword['data'], EmailAuthForm>({
    queryFn: async ({ email, password }) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        })

        console.log({ data, error })

        if (error) {
          return { error }
        }

        return {
          data: {
            session: data.session,
            user: data.user
          }
        }
      } catch (error) {
        return { error }
      }
    },
    invalidatesTags: (_res, error) => (!error ? [SessionApiTag.SESSION] : [])
  })

export default signUp
