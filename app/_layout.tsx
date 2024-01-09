import React from 'react'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { Stack } from 'expo-router'

const App = () => (
  <GluestackUIProvider config={config}>
    <RootLayout />
  </GluestackUIProvider>
)

const RootLayout = () => (
  <Stack initialRouteName='index' screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index' />
    <Stack.Screen name='login' options={{ presentation: 'modal' }} />
  </Stack>
)

export default App
