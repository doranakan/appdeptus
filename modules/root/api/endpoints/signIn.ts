import { type AuthTokenResponsePassword } from '@supabase/supabase-js'
import { type SessionEndpointBuilder } from 'appdeptus/api'
import { type EmailAuthForm } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { type SessionApiTags } from '../tags'

const signIn = (builder: SessionEndpointBuilder<SessionApiTags>) =>
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
          return { error: JSON.stringify(error) }
        }

        return { data }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, error) => (!error ? ['session'] : [])
  })

export default signIn
