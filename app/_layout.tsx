import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { Slot, Stack } from 'expo-router'

const shouldSignIn = true

const ThemeProvider = () => (
  <GluestackUIProvider config={config}>
    <AppLayout />
  </GluestackUIProvider>
)

const AppLayout = () => (
  <Stack initialRouteName='index' screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index' />
    <Stack.Screen name='login' options={{ presentation: 'modal' }} />
  </Stack>
)

export default ThemeProvider
