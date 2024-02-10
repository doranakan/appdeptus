import { Stack } from 'expo-router'

const ArmyLayout = () => (
  <Stack>
    <Stack.Screen
      name='index'
      options={{ title: 'Your army' }}
    />
  </Stack>
)

export default ArmyLayout
