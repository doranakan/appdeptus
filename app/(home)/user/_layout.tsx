import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const UserLayout = () => (
  <Stack
    initialRouteName='index'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='index' />
    <Stack.Screen
      name='privacy-policy'
      options={{
        animation: 'slide_from_bottom',
        presentation: 'modal'
      }}
    />
  </Stack>
)

export default UserLayout
