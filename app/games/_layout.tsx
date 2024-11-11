import { Stack } from 'expo-router'

const ArmyBuilderLayout = () => (
  <Stack
    initialRouteName='new'
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name='new' />
  </Stack>
)

export default ArmyBuilderLayout
