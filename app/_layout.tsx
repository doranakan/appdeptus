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
import { ErrorBoundary } from 'appdeptus/components'
import {
  DevMenuProvider,
  DevMenuSheet,
  DevTrigger,
  useDevMenu
} from 'appdeptus/components/DevMenu'
import { GluestackUIProvider } from 'appdeptus/components/ui'
import { defaultScreenOptions } from 'appdeptus/constants'
import 'appdeptus/global.css'
import { store } from 'appdeptus/store'
import { SplashScreen, Stack, useNavigationContainerRef } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { PostHogProvider } from 'posthog-react-native'
import { Fragment, type PropsWithChildren, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  initialWindowMetrics,
  SafeAreaProvider
} from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
SplashScreen.preventAutoHideAsync()

const App = ({ children }: PropsWithChildren) => {
  const navigationRef = useNavigationContainerRef()
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
            <PostHogProvider
              apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
              options={{
                host: 'https://eu.i.posthog.com',
                disabled: __DEV__
              }}
              autocapture={{
                navigationRef
              }}
            >
              <BottomSheetModalProvider>
                <ErrorBoundary>{children}</ErrorBoundary>
              </BottomSheetModalProvider>
            </PostHogProvider>
          </GestureHandlerRootView>
        </GluestackUIProvider>
      </Provider>
      <StatusBar
        animated
        style='light'
      />
    </SafeAreaProvider>
  )
}

const AppLayout = () => (
  <Stack screenOptions={defaultScreenOptions}>
    <Stack.Screen name='(home)' />
    <Stack.Screen name='(root)' />
  </Stack>
)

// __DEV__ is replaced with `false` by Metro in production builds, so
// the require below is dead code and excluded from the production bundle.
const StorybookApp = __DEV__ ? require('../.storybook').default : null

const DevAwareContent = () => {
  const { storybookActive } = useDevMenu()

  if (storybookActive && StorybookApp) {
    return <StorybookApp />
  }

  return (
    <Fragment>
      <AppLayout />
      <DevTrigger />
      <DevMenuSheet />
    </Fragment>
  )
}

const Layout = () => (
  <App>
    {__DEV__ ? (
      <DevMenuProvider>
        <DevAwareContent />
      </DevMenuProvider>
    ) : (
      <AppLayout />
    )}
  </App>
)

export default Layout
