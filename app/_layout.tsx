import { Grenze_700Bold, useFonts } from '@expo-google-fonts/grenze'
import {
  NotoSerif_400Regular,
  NotoSerif_700Bold
} from '@expo-google-fonts/noto-serif'
import { useAsyncEffect } from 'ahooks'
import { ThemeProvider, config, selectColorMode } from 'appdeptus/designSystem'
import { store } from 'appdeptus/store'
import { supabase } from 'appdeptus/utils'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import {
  SafeAreaProvider,
  initialWindowMetrics
} from 'react-native-safe-area-context'
import { Provider, useSelector } from 'react-redux'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
SplashScreen.preventAutoHideAsync()

const App = () => {
  const router = useRouter()

  const [fontLoaded] = useFonts({
    Grenze_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold
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
        <RootLayout />
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
