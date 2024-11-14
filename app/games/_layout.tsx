import { Stack } from 'expo-router'

const ArmyBuilderLayout = () => (
  <Stack
    initialRouteName='[gameId]'
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name='[gameId]' />
  </Stack>
)

export default ArmyBuilderLayout
