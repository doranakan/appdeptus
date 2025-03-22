import { getUserId, type NotificationsEndpointBuilder } from 'appdeptus/api'
import { type Notifications } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { notificationsSchema } from '../schema'

const addPushToken = (builder: NotificationsEndpointBuilder<'notifications'>) =>
  builder.query<Notifications, void>({
    queryFn: async () => {
      try {
        const user = await getUserId()

        const { data, error } = await supabase
          .from(Table.USER_NOTIFICATIONS)
          .select('notifications')
          .eq('user', user)
          .single()

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const notifications = await notificationsSchema.parseAsync(
          data.notifications
        )

        return {
          data: notifications
        }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: ['notifications']
  })

export default addPushToken
