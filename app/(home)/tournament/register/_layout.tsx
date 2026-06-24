import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const RegisterLayout = () => (
  <Stack
    initialRouteName='[id]'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='[id]' />
  </Stack>
)

export default RegisterLayout
