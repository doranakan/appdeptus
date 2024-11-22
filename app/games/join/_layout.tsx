import { Stack } from 'expo-router'

const JoinGameLayout = () => (
  <Stack
    initialRouteName='[gameId]'
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name='[gameId]' />
  </Stack>
)

export default JoinGameLayout
