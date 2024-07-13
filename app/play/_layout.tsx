import { Stack } from 'expo-router'

const ArmiesLayout = () => (
  <Stack
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name='new-game' />
    <Stack.Screen name='[gameId]' />
    <Stack.Screen
      name='qr-code'
      options={{
        gestureEnabled: false,
        fullScreenGestureEnabled: false,
        presentation: 'modal'
      }}
    />
    <Stack.Screen
      name='army/[armyId]/index'
      options={{
        presentation: 'modal'
      }}
    />
    <Stack.Screen
      name='army/[armyId]/[...unitDetail]'
      options={{
        presentation: 'modal'
      }}
    />
  </Stack>
)

export default ArmiesLayout
