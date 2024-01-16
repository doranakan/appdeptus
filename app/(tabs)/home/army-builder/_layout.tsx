import { Stack } from 'expo-router'

const ArmyBuilderLayout = () => (
  <Stack>
    <Stack.Screen
      name='faction-selection'
      options={{ title: 'Select faction' }}
    />
    <Stack.Screen
      name='codex-selection'
      options={{ headerBackTitle: 'Back', title: 'Select codex' }}
    />
  </Stack>
)

export default ArmyBuilderLayout
