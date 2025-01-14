import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const RootLayout = () => (
  <Stack
    screenOptions={defaultScreenOptions}
    initialRouteName='root'
  >
    <Stack.Screen name='root' />
    <Stack.Screen
      name='registration'
      options={{
        animation: 'slide_from_bottom',
        presentation: 'modal',
        gestureEnabled: false
      }}
    />
    <Stack.Screen
      name='privacy-policy'
      options={{
        animation: 'slide_from_bottom',
        presentation: 'modal'
      }}
    />
    <Stack.Screen
      name='terms-and-conditions'
      options={{
        animation: 'slide_from_bottom',
        presentation: 'modal'
      }}
    />
    <Stack.Screen
      name='email-confirmed'
      options={{
        animation: 'slide_from_bottom',
        presentation: 'modal',
        gestureEnabled: false
      }}
    />
  </Stack>
)

export default RootLayout
