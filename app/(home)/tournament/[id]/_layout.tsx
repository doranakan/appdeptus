import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const TournamentDetailLayout = () => (
  <Stack
    initialRouteName='index'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='index' />
    <Stack.Screen name='rounds' />
    <Stack.Screen name='start-pairing' />
    <Stack.Screen name='round-pairing' />
    <Stack.Screen name='match/[matchId]' />
  </Stack>
)

export default TournamentDetailLayout
