import { Stack } from 'expo-router'

const ArmiesLayout = () => (
  <Stack>
    <Stack.Screen
      name='codex-selection'
      options={{ headerBackTitle: 'Back', title: 'New army list' }}
    />
    <Stack.Screen
      name='unit-selection'
      options={{ headerBackTitle: 'Back', title: 'Select units' }}
    />
  </Stack>
)

export default ArmiesLayout
