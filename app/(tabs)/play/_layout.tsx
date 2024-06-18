import { Stack } from 'expo-router'

const PlayLayout = () => (
  <Stack>
    <Stack.Screen
      name='index'
      options={{ headerShown: false }}
    />
  </Stack>
)

export default PlayLayout
