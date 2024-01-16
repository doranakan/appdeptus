import { Stack } from 'expo-router'

const SettingsLayout = () => (
  <Stack>
    <Stack.Screen name='index' options={{ headerShown: false }} />
  </Stack>
)

export default SettingsLayout
