import { Stack } from 'expo-router'

const ArmyLayout = () => (
  <Stack>
    <Stack.Screen
      name='index'
      options={{ title: 'Army detail' }}
    />
  </Stack>
)

export default ArmyLayout
