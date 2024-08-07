import { Stack } from 'expo-router'

const ArmiesLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index' />
    <Stack.Screen
      name='[armyId]/index'
      options={{
        animation: 'fade'
      }}
    />
  </Stack>
)

export default ArmiesLayout
