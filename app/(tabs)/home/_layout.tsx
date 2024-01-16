import { Stack } from 'expo-router'

const HomeLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index' />
    <Stack.Screen name='army-builder' />
  </Stack>
)

export default HomeLayout
