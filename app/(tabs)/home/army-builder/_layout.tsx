import { Stack } from 'expo-router'

const ArmyBuilderLayout = () => (
  <Stack>
    <Stack.Screen
      name='codex-selection'
      options={{ headerBackTitle: 'Back', title: 'Select codex' }}
    />
    <Stack.Screen
      name='unit-selection'
      options={{ headerBackTitle: 'Back', title: 'Select units' }}
    />
  </Stack>
)

export default ArmyBuilderLayout
