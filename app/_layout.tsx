import {
  NotoSerif_400Regular,
  NotoSerif_700Bold,
  useFonts
} from '@expo-google-fonts/noto-serif'
import { RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed'
import { useAsyncEffect } from 'ahooks'
import { AmericanText } from 'appdeptus/assets'
import { ThemeProvider, config, selectColorMode } from 'appdeptus/designSystem'
import { persistor, store } from 'appdeptus/store'
import { supabase } from 'appdeptus/utils'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import {
  SafeAreaProvider,
  initialWindowMetrics
} from 'react-native-safe-area-context'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
SplashScreen.preventAutoHideAsync()

const App = () => {
  const router = useRouter()

  const [fontLoaded] = useFonts({
    AmericanText,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    RobotoCondensed_700Bold
  })

  useAsyncEffect(async () => {
    const { data } = await supabase.auth.getSession()

    if (data.session !== null) {
      router.replace('armies')
    }

    if (fontLoaded) {
      setTimeout(SplashScreen.hideAsync, 500)
    }
  }, [fontLoaded])

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <RootLayout />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}

const RootLayout = () => {
  const colorMode = useSelector(selectColorMode)

  return (
    <ThemeProvider
      config={config}
      colorMode={colorMode}
    >
      <Stack
        initialRouteName='index'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='index' />
      </Stack>
    </ThemeProvider>
  )
}

export default App
