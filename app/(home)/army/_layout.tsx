import { defaultScreenOptions } from 'appdeptus/constants'
import { Stack } from 'expo-router'

const ArmyBuilderLayout = () => (
  <Stack
    initialRouteName='[id]'
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name='[id]' />
  </Stack>
)

export default ArmyBuilderLayout
