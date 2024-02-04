import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { useAsyncEffect } from 'ahooks'
import { store } from 'appdeptus/store'
import { supabase } from 'appdeptus/utils'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import React from 'react'
import {
  SafeAreaProvider,
  initialWindowMetrics
} from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

SplashScreen.preventAutoHideAsync()

const App = () => {
  const router = useRouter()

  useAsyncEffect(async () => {
    const { data } = await supabase.auth.getSession()

    if (data.session !== null) {
      router.replace('/home')
    }

    setTimeout(SplashScreen.hideAsync, 500)
  }, [])

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <GluestackUIProvider config={config}>
          <RootLayout />
        </GluestackUIProvider>
      </Provider>
    </SafeAreaProvider>
  )
}

const RootLayout = () => (
  <Stack initialRouteName='index' screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index' />
  </Stack>
)

export default App
