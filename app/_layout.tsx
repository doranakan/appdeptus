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
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { usePrevious } from 'ahooks'
import { GluestackUIProvider } from 'appdeptus/components/ui'
import { defaultScreenOptions } from 'appdeptus/constants'
import 'appdeptus/global.css'
import { useGetSessionQuery } from 'appdeptus/modules/root/api'
import { store, useAppDispatch } from 'appdeptus/store'
import { router, SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { type PropsWithChildren, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  initialWindowMetrics,
  SafeAreaProvider
} from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
SplashScreen.preventAutoHideAsync()

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
        <GluestackUIProvider>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
          </GestureHandlerRootView>
        </GluestackUIProvider>
      </Provider>
      <StatusBar
        animated
        style='light'
        translucent
      />
    </SafeAreaProvider>
  )
}

const RootLayout = () => {
  const dispatch = useAppDispatch()

  const { data: session } = useGetSessionQuery()

  const previous = usePrevious(session)

  useEffect(() => {
    if (session) {
      router.replace('armies-tab')
    }
  }, [dispatch, previous, session])

  return (
    <Stack
      initialRouteName='index'
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen name='index' />
    </Stack>
  )
}

const EntryPoint =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // eslint-disable-next-line @typescript-eslint/dot-notation
  process.env['EXPO_PUBLIC_STORYBOOK_ENABLED'] === 'true'
    ? require('../.storybook').default
    : RootLayout

const Layout = () => (
  <App>
    <EntryPoint />
  </App>
)

export default Layout
