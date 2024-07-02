import { Stack } from 'expo-router'

const GamesLayout = () => (
  <Stack>
    <Stack.Screen
      name='index'
      options={{ headerShown: false }}
    />
  </Stack>
)

export default GamesLayout
