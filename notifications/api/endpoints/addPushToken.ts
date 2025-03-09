import { type NotificationsEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'

const addPushToken = (builder: NotificationsEndpointBuilder<'notifications'>) =>
  builder.mutation<null, string>({
    queryFn: async (pushToken) => {
      try {
        const { data, error } = await supabase
          .from(Table.USERS_PUSH_TOKENS)
          .upsert({
            push_token: pushToken
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
    }
  })

export default addPushToken
