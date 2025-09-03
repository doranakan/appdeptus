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

  const notificationListener =
    useRef<Notifications.EventSubscription>(undefined)
  const responseListener = useRef<Notifications.EventSubscription>(undefined)

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
      notificationListener.current?.remove()
      responseListener.current?.remove()
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
    shouldSetBadge: true,
    shouldShowBanner: false,
    shouldShowList: false
  })
})

export default useNotifications
