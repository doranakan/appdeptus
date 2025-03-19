import { themeColors } from 'appdeptus/components'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

const registerForNotifications = async () => {
  let token

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('appdeptus', {
      importance: Notifications.AndroidImportance.MAX,
      lightColor: themeColors.default.tertiary[600],
      name: 'appdeptus',
      sound: 'notification.wav',
      vibrationPattern: [0, 250, 250, 250]
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== Notifications.PermissionStatus.GRANTED) {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== Notifications.PermissionStatus.GRANTED) {
      alert('Failed to get push token for push notification!')
      return
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const projectId = (Constants?.expoConfig?.extra?.['eas']?.projectId ??
        Constants?.easConfig?.projectId) as string
      if (!projectId) {
        throw new Error('Project ID not found')
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId
        })
      ).data
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      token = `${e}`
    }
  } else {
    alert('Must use physical device for Push Notifications')
  }

  return token
}

export default registerForNotifications
