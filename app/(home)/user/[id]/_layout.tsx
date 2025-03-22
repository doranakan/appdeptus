import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const AdeptLayout = () => (
  <Stack
    initialRouteName='index'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='index' />
  </Stack>
)

export default AdeptLayout
