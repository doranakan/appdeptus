import {
  IBMPlexMono_400Regular,
  IBMPlexMono_400Regular_Italic,
  IBMPlexMono_500Medium,
  IBMPlexMono_500Medium_Italic,
  IBMPlexMono_700Bold,
  IBMPlexMono_700Bold_Italic,
  useFonts
} from '@expo-google-fonts/ibm-plex-mono'
import { Silkscreen_400Regular } from '@expo-google-fonts/silkscreen'

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
    Silkscreen_400Regular,
    IBMPlexMono_400Regular,
    IBMPlexMono_400Regular_Italic,
    IBMPlexMono_500Medium,
    IBMPlexMono_500Medium_Italic,
    IBMPlexMono_700Bold,
    IBMPlexMono_700Bold_Italic
  })

  const colorMode = useSelector(selectColorMode)

  useEffect(() => {
    if (fontLoaded) {
      setTimeout(SplashScreen.hideAsync, 700)
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
