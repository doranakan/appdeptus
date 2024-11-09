import { Stack } from 'expo-router'

const ArmyBuilderLayout = () => (
  <Stack
    initialRouteName='[id]'
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name='[id]' />
  </Stack>
)

export default ArmyBuilderLayout
