import { Stack } from 'expo-router'

const ArmyBuilderLayout = () => (
  <Stack
    initialRouteName='index'
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name='index' />
    <Stack.Screen name='[gameId]' />
  </Stack>
)

export default ArmyBuilderLayout
