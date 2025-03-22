import * as Notifications from 'expo-notifications'
import { useFocusEffect } from 'expo-router'
import { noop } from 'lodash'
import { useCallback, useEffect, useRef } from 'react'
import { useAddPushTokenMutation, useGetNotificationsQuery } from '../api'
import { registerForNotifications } from '../utils'
import useNotificationObserver from './useNotificationObserver'

const useNotifications = () => {
  useNotificationObserver()

  useGetNotificationsQuery()

  const [addPushToken] = useAddPushTokenMutation()

  const notificationListener = useRef<Notifications.EventSubscription>()
  const responseListener = useRef<Notifications.EventSubscription>()

  useEffect(() => {
    registerForNotifications().then((token) => {
      if (token && !token.includes('Error')) {
        addPushToken(token)
      }
    })

    notificationListener.current =
      Notifications.addNotificationReceivedListener(noop)

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(noop)

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [addPushToken])

  useFocusEffect(
    useCallback(() => {
      Notifications.setBadgeCountAsync(0)
      Notifications.dismissAllNotificationsAsync()
    }, [])
  )
}

Notifications.setNotificationHandler({
  // eslint-disable-next-line @typescript-eslint/require-await
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

export default useNotifications
