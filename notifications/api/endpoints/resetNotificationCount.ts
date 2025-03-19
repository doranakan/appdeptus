import { getUserId, type NotificationsEndpointBuilder } from 'appdeptus/api'
import { type Notifications } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { notificationsSchema } from '../schema'

const resetNotificationCount = (
  builder: NotificationsEndpointBuilder<'notifications'>
) =>
  builder.mutation<null, keyof Notifications>({
    queryFn: async (section) => {
      try {
        const user = await getUserId()

        const { data, error: notificationsError } = await supabase
          .from(Table.USER_NOTIFICATIONS)
          .select('notifications')
          .eq('user', user)

        if (notificationsError) {
          return { error: JSON.stringify(notificationsError) }
        }

        const notifications = await notificationsSchema.parseAsync(data[0])

        const { error } = await supabase
          .from(Table.USER_NOTIFICATIONS)
          .update({
            notifications: {
              ...notifications,
              [section]: 0
            }
          })
          .eq('user', user)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return {
          data: null
        }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_, err) => (!err ? ['notifications'] : [])
  })

export default resetNotificationCount
