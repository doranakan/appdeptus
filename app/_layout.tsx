import React from 'react'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import { useAsyncEffect } from 'ahooks'
import { supabase } from 'appdeptus/utils'
import { Provider } from 'react-redux'
import { store } from 'appdeptus/store'

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
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <RootLayout />
      </GluestackUIProvider>
    </Provider>
  )
}

const RootLayout = () => (
  <Stack initialRouteName='index' screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index' />
  </Stack>
)

export default App
