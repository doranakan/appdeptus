import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const ShareLayout = () => (
  <Stack
    initialRouteName='[id]'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='[id]' />
  </Stack>
)

export default ShareLayout
