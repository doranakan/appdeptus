import { type AuthResponse } from '@supabase/supabase-js'
import { type SessionEndpointBuilder } from 'appdeptus/api'
import { type EmailAuthForm } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { type SessionApiTags } from '../tags'

const signUp = (builder: SessionEndpointBuilder<SessionApiTags>) =>
  builder.mutation<AuthResponse['data'], EmailAuthForm>({
    queryFn: async ({ email, name, password }) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name }
          }
        })

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return {
          data
        }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, error) => (!error ? ['session'] : [])
  })

export default signUp
