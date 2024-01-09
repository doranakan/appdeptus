import React from 'react'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { SplashScreen, Stack } from 'expo-router'
import { useMount } from 'ahooks'

SplashScreen.preventAutoHideAsync()

const App = () => {
  useMount(() => {
    SplashScreen.hideAsync()
  })

  return (
    <GluestackUIProvider config={config}>
      <RootLayout />
    </GluestackUIProvider>
  )
}

const RootLayout = () => (
  <Stack initialRouteName='index' screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index' />
    <Stack.Screen name='login' options={{ presentation: 'modal' }} />
  </Stack>
)

export default App
