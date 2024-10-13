/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { coreApi } from 'appdeptus/api'
import { GluestackUIProvider } from 'appdeptus/components/ui'
import 'appdeptus/global.css'
import { useGetSessionQuery } from 'appdeptus/modules/root/api'
import { store } from 'appdeptus/store'
import { SplashScreen, Stack, router } from 'expo-router'
import { type PropsWithChildren, useEffect } from 'react'
import {
  SafeAreaProvider,
  initialWindowMetrics
} from 'react-native-safe-area-context'
import { Provider, useDispatch } from 'react-redux'

const STORYBOOK_ENABLED =
  process.env['EXPO_PUBLIC_STORYBOOK_ENABLED'] === 'true'

if (!STORYBOOK_ENABLED) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  SplashScreen.preventAutoHideAsync()
}

const App = ({ children }: PropsWithChildren) => {
  const [fontLoaded] = useFonts({
    Silkscreen_400Regular,
    IBMPlexMono_400Regular,
    IBMPlexMono_400Regular_Italic,
    IBMPlexMono_500Medium,
    IBMPlexMono_500Medium_Italic,
    IBMPlexMono_700Bold,
    IBMPlexMono_700Bold_Italic
  })

  useEffect(() => {
    if (fontLoaded) {
      setTimeout(SplashScreen.hideAsync, 700)
    }
  }, [fontLoaded])

  if (!fontLoaded) {
    return null
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <GluestackUIProvider>{children}</GluestackUIProvider>
      </Provider>
    </SafeAreaProvider>
  )
}

const RootLayout = () => {
  const dispatch = useDispatch()

  const { data: session, isFetching, isUninitialized } = useGetSessionQuery()

  useEffect(() => {
    switch (true) {
      case isFetching || isUninitialized: {
        return
      }
      case !!session: {
        // router.replace('whatever')
        return
      }
      case !session: {
        while (router.canGoBack()) {
          router.back()
        }
        router.replace('/')

        dispatch(coreApi.util.resetApiState())
      }
    }
  }, [dispatch, isFetching, isUninitialized, session])

  return (
    <Stack
      initialRouteName='index'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='index' />
    </Stack>
  )
}

const EntryPoint = STORYBOOK_ENABLED
  ? require('../.storybook').default
  : RootLayout

const Layout = () => (
  <App>
    <EntryPoint />
  </App>
)

export default Layout
