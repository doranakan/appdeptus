import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const UserSettingsLayout = () => (
  <Stack
    initialRouteName='index'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='index' />
    <Stack.Screen name='delete' />
    <Stack.Screen name='edit-image' />
    <Stack.Screen name='edit-name' />
  </Stack>
)

export default UserSettingsLayout
