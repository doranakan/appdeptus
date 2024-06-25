import { Stack } from 'expo-router'

const ArmiesLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index' />
    <Stack.Screen name='army-builder' />
    <Stack.Screen name='[armyId]/index' />
    <Stack.Screen
      name='[armyId]/[...unitDetail]'
      options={{
        gestureEnabled: false,
        animation: 'slide_from_bottom'
      }}
    />
  </Stack>
)

export default ArmiesLayout
