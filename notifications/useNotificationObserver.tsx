import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { useEffect } from 'react'

const useNotificationObserver = () => {
  useEffect(() => {
    let isMounted = true

    const redirect = (notification: Notifications.Notification) => {
      if (typeof notification.request.content.data?.['url'] === 'string') {
        const url = notification.request.content.data?.['url']
        if (url) {
          router.push(url)
        }
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return
      }
      redirect(response?.notification)
    })

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification)
      }
    )

    return () => {
      isMounted = false
      subscription.remove()
    }
  }, [])
}

export default useNotificationObserver
