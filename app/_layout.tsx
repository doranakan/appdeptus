import {
  NotoSerif_400Regular,
  NotoSerif_700Bold,
  useFonts
} from '@expo-google-fonts/noto-serif'
import { RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed'
import { AmericanText } from 'appdeptus/assets'
import { ThemeProvider, config, selectColorMode } from 'appdeptus/designSystem'
import { useGetSessionQuery } from 'appdeptus/modules/root/api'
import { store } from 'appdeptus/store'
import { SplashScreen, Stack, router } from 'expo-router'
import { useEffect } from 'react'
import {
  SafeAreaProvider,
  initialWindowMetrics
} from 'react-native-safe-area-context'
import { Provider, useSelector } from 'react-redux'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
SplashScreen.preventAutoHideAsync()

const App = () => (
  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <Provider store={store}>
      <RootLayout />
    </Provider>
  </SafeAreaProvider>
)

const RootLayout = () => {
  const { data: session, isFetching, isUninitialized } = useGetSessionQuery()

  const [fontLoaded] = useFonts({
    AmericanText,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    RobotoCondensed_700Bold
  })

  const colorMode = useSelector(selectColorMode)

  useEffect(() => {
    if (fontLoaded) {
      setTimeout(SplashScreen.hideAsync, 500)
    }
  }, [fontLoaded])

  useEffect(() => {
    switch (true) {
      case isFetching || isUninitialized: {
        return
      }
      case !!session: {
        router.replace('armies')
        return
      }
      case !session: {
        router.replace('/')
      }
    }
  }, [isFetching, isUninitialized, session])

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
