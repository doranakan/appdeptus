import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const JoinGameLayout = () => (
  <Stack
    initialRouteName='[gameId]'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='[gameId]' />
  </Stack>
)

export default JoinGameLayout
