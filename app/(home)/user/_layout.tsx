import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const UserLayout = () => (
  <Stack
    initialRouteName='index'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='index' />
  </Stack>
)

export default UserLayout
