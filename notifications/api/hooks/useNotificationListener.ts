import { useEffect } from 'react'
import { notificationUpdates } from '../realtime'

const useNotificationUpdateListener = (
  args: Parameters<typeof notificationUpdates>[0]
) => {
  useEffect(() => {
    if (!args.userId) {
      return
    }

    const sub = notificationUpdates(args).subscribe()

    return () => {
      sub.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args.userId])
}

export default useNotificationUpdateListener
