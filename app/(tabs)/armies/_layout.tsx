import { Stack } from 'expo-router'
import { Platform } from 'react-native'

const ArmiesLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index' />
    <Stack.Screen
      name='[armyId]/index'
      options={{
        animation: 'fade'
      }}
    />
    <Stack.Screen
      name='[armyId]/[...unitDetail]'
      options={{
        animation: Platform.OS === 'android' ? 'slide_from_bottom' : undefined,
        presentation: Platform.OS === 'ios' ? 'modal' : undefined,
        fullScreenGestureEnabled: true
      }}
    />
  </Stack>
)

export default ArmiesLayout
