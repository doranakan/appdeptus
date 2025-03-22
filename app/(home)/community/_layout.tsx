import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const CommunityLayout = () => (
  <Stack
    initialRouteName='create'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='create' />
  </Stack>
)

export default CommunityLayout
