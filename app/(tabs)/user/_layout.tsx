import { Stack } from 'expo-router'

const UserLayout = () => (
  <Stack>
    <Stack.Screen
      name='index'
      options={{ headerShown: false }}
    />
  </Stack>
)

export default UserLayout
