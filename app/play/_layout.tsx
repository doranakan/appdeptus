import { Stack } from 'expo-router'

const ArmiesLayout = () => (
  <Stack
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name='new' />
    <Stack.Screen name='active/[gameId]' />
    <Stack.Screen name='join/[gameId]' />
    <Stack.Screen name='ended/[gameId]' />
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
  </Stack>
)

export default ArmiesLayout
