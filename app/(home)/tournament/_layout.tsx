import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const TournamentLayout = () => (
  <Stack
    initialRouteName='create'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='create' />
  </Stack>
)

export default TournamentLayout
