import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const CommunityLayout = () => (
  <Stack
    initialRouteName='create'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='create' />
    <Stack.Screen name='delete' />
    <Stack.Screen name='edit-name' />
    <Stack.Screen name='manage-adepts' />
  </Stack>
)

export default CommunityLayout
