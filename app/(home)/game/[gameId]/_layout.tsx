import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const GameLayout = () => (
  <Stack
    initialRouteName='index'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='index' />
    <Stack.Screen name='lobby' />
  </Stack>
)

export default GameLayout
