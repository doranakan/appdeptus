import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const CommunityLayout = () => (
  <Stack
    initialRouteName='index'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='index' />
    <Stack.Screen name='armies' />
    <Stack.Screen name='delete' />
    <Stack.Screen name='edit-name' />
    <Stack.Screen name='games' />
    <Stack.Screen name='leaderboard' />
    <Stack.Screen name='leave' />
    <Stack.Screen name='manage-adepts' />
    <Stack.Screen name='members' />
    <Stack.Screen name='privacy' />
    <Stack.Screen name='request-list' />
    <Stack.Screen name='settings' />
  </Stack>
)

export default CommunityLayout
