import { Stack } from 'expo-router'

const ArmyBuilderLayout = () => {
  return (
    <Stack
      initialRouteName='index'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='index' />
    </Stack>
  )
}

export default ArmyBuilderLayout
