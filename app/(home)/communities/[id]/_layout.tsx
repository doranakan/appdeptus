import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const CommunityLayout = () => (
  <Stack
    initialRouteName='index'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='index' />
    <Stack.Screen name='armies' />
    <Stack.Screen name='games' />
    <Stack.Screen name='members' />
    <Stack.Screen name='leaderboard' />
  </Stack>
)

export default CommunityLayout
