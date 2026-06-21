import { supabase } from 'appdeptus/utils'
import { useEffect } from 'react'
import { notificationUpdates } from '../realtime'

const useNotificationUpdateListener = (
  args: Parameters<typeof notificationUpdates>[0]
) => {
  useEffect(() => {
    if (!args.userId) {
      return
    }

    const channel = notificationUpdates(args)
    channel.subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args.userId])
}

export default useNotificationUpdateListener
