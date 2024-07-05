import { Stack } from 'expo-router'

const GamesLayout = () => (
  <Stack>
    <Stack.Screen
      name='index'
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='new-game'
      options={{ headerShown: false, presentation: 'modal' }}
    />
  </Stack>
)

export default GamesLayout
