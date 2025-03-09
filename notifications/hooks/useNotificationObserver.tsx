import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { useNotificationUpdates } from '../api'

const useNotificationObserver = () => {
  useNotificationUpdates()

  useEffect(() => {
    const handleNotification = (notification: Notifications.Notification) => {
      if (typeof notification.request.content.data?.['url'] === 'string') {
        const url = notification.request.content.data?.['url']
        if (url) {
          router.push(url)
          Notifications.clearLastNotificationResponseAsync()
        }
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!response?.notification) {
        return
      }
      handleNotification(response?.notification)
    })

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        handleNotification(response.notification)
      }
    )

    return () => {
      subscription.remove()
    }
  }, [])
}

export default useNotificationObserver
