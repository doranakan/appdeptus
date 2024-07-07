import { Stack } from 'expo-router'

const GamesLayout = () => (
  <Stack
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name='index' />
    <Stack.Screen
      name='new-game'
      options={{ presentation: 'modal' }}
    />
    <Stack.Screen
      name='qr-code'
      options={{
        gestureEnabled: false,
        fullScreenGestureEnabled: false,
        presentation: 'modal'
      }}
    />
  </Stack>
)

export default GamesLayout
