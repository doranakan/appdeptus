import { Stack } from 'expo-router'

const ArmiesLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index' />
    <Stack.Screen name='army-builder' />
  </Stack>
)

export default ArmiesLayout
