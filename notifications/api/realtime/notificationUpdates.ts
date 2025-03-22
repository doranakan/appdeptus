import { type RealtimePostgresUpdatePayload } from '@supabase/supabase-js'
import { type Notifications, type UserProfile } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'

type NotificationUpdatesParams = {
  eventHandler: (
    payload: RealtimePostgresUpdatePayload<{ notifications: Notifications }>
  ) => void
  userId?: UserProfile['id']
}

const notificationUpdates = ({
  eventHandler,
  userId
}: NotificationUpdatesParams) =>
  supabase.channel(Table.USER_NOTIFICATIONS).on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: Table.USER_NOTIFICATIONS,
      filter: `user=eq.${userId}`
    },
    eventHandler
  )

export default notificationUpdates
