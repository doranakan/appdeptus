import { Stack } from 'expo-router'

const ArmiesLayout = () => (
  <Stack
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name='[gameId]' />
  </Stack>
)

export default ArmiesLayout
