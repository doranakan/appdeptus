import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const RootLayout = () => (
  <Stack screenOptions={defaultScreenOptions}>
    <Stack.Screen name='root' />
  </Stack>
)

export default RootLayout
