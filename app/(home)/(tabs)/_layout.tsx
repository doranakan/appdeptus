import { type BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import dice from 'appdeptus/assets/lotties/dice.json'
import plan from 'appdeptus/assets/lotties/plan.json'
import {
  type Button,
  Loading,
  NavigationHeader,
  Pressable,
  resetTheme,
  ScreenContainer,
  selectThemeName,
  themeColors,
  VStack
} from 'appdeptus/components'
import { defaultScreenOptions } from 'appdeptus/constants'
import { useGetArmyListQuery } from 'appdeptus/modules/armies/api'
import { useGetGameQuery } from 'appdeptus/modules/games/api'
import { ActiveGameTopBar } from 'appdeptus/modules/games/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useAppDispatch } from 'appdeptus/store'
import {
  Redirect,
  Tabs,
  useFocusEffect,
  useLocalSearchParams
} from 'expo-router'
import LottieView, { type AnimationObject } from 'lottie-react-native'
import { Plus, Swords } from 'lucide-react-native'
import {
  type ComponentProps,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react'
import { type GestureResponderEvent, StyleSheet } from 'react-native'
import Animated, {
  LinearTransition,
  SlideInUp,
  SlideOutUp,
  useAnimatedStyle,
  withDelay,
  withTiming
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

const HomeLayout = () => {
  const { showOnboarding } = useLocalSearchParams<{ showOnboarding: string }>()

  const themeName = useSelector(selectThemeName)

  const { bottom } = useSafeAreaInsets()

  const { data: activeGame } = useGetGameQuery()

  const { top } = useSafeAreaInsets()

  const mainContainerStyle = useAnimatedStyle(
    () => ({
      flex: 1,
      paddingTop: activeGame
        ? withDelay(500, withTiming(0, { duration: 500 }))
        : top
    }),
    [activeGame]
  )

  const dispatch = useAppDispatch()

  useFocusEffect(
    useCallback(() => {
      if (themeName !== 'default') {
        dispatch(resetTheme())
      }
    }, [dispatch, themeName])
  )

  if (showOnboarding) {
    return (
      <ScreenContainer className='items-center justify-center'>
        <Loading />
        <Redirect
          href='onboarding'
          relativeToDirectory={false}
        />
      </ScreenContainer>
    )
  }

  return (
    <VStack
      className='flex-1 bg-primary-950'
      space='md'
    >
      <Animated.View
        layout={LinearTransition.duration(500)}
        entering={SlideInUp.duration(500)}
        exiting={SlideOutUp.duration(500)}
      >
        <ActiveGameTopBar />
      </Animated.View>
      <Animated.View
        layout={LinearTransition.duration(500)}
        style={mainContainerStyle}
      >
        <VStack
          className='flex-1'
          space='md'
        >
          <Tabs
            initialRouteName='index'
            screenOptions={{
              ...defaultScreenOptions,
              header: (props) => <Header {...props} />,
              sceneStyle: {
                backgroundColor: themeColors[themeName].primary['950']
              },
              headerShown: true,
              tabBarButton: TabBarButton,
              tabBarStyle: {
                backgroundColor: themeColors[themeName].primary['950'],
                borderTopWidth: 0,
                height: 60 + bottom
              }
            }}
          >
            <Tabs.Screen
              name='index'
              options={{
                tabBarLabel: '',
                tabBarIcon: ArmiesTabIcon
              }}
            />
            <Tabs.Screen
              name='games-tab'
              options={{
                tabBarLabel: '',
                tabBarIcon: GamesTabIcon
              }}
            />
          </Tabs>
        </VStack>
      </Animated.View>
    </VStack>
  )
}

const Header = ({ route }: BottomTabHeaderProps) => {
  const { data: user } = useGetUserProfileQuery()

  const { data: armies } = useGetArmyListQuery()

  const { data: activeGame } = useGetGameQuery()

  const rightButton = useMemo<ComponentProps<typeof Button> | undefined>(() => {
    switch (route.name) {
      case 'index':
        return {
          href: 'army-builder',
          icon: Plus,
          variant: 'link'
        }
      case 'games-tab':
        return {
          disabled: !armies?.length || !!activeGame,
          href: 'new-game',
          icon: Swords,
          variant: 'link'
        }

      default:
        return undefined
    }
  }, [activeGame, armies?.length, route.name])

  return (
    <VStack className='bg-primary-950 px-4 pb-4'>
      <NavigationHeader
        variant='avatar'
        user={user}
        rightButton={rightButton}
      />
    </VStack>
  )
}

type TabBarButtonProps = PropsWithChildren<{
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
  ) => void
}>

const TabBarButton = ({ children, onPress }: TabBarButtonProps) => (
  <Pressable onPress={onPress}>
    <VStack className='self-center bg-primary-950 py-4'>{children}</VStack>
  </Pressable>
)

type TabIconProps = {
  focused: boolean
  routeName: string
}

const TabIcon = ({ focused, routeName }: TabIconProps) => {
  const animation = useRef<LottieView>(null)

  const config = tabNameToIconMap[routeName]

  useEffect(() => {
    if (focused) {
      animation.current?.play()
    }
  })

  return (
    <LottieView
      loop={false}
      ref={animation}
      style={styles.lottieView}
      source={config?.source}
      colorFilters={!focused ? config?.colorFilters : undefined}
      speed={2}
    />
  )
}

const ArmiesTabIcon = (props: Pick<TabIconProps, 'focused'>) => (
  <TabIcon
    {...props}
    routeName='index'
  />
)
const GamesTabIcon = (props: Pick<TabIconProps, 'focused'>) => (
  <TabIcon
    {...props}
    routeName='games-tab'
  />
)

const styles = StyleSheet.create({
  lottieView: {
    height: 46,
    width: 46
  }
})

const tabNameToIconMap: Record<
  string,
  {
    source: AnimationObject
    colorFilters: NonNullable<ComponentProps<typeof LottieView>['colorFilters']>
  }
> = {
  index: {
    source: plan,
    colorFilters: [
      {
        color: themeColors.default.primary[300],
        keypath: 'Sheet 5'
      },
      {
        color: themeColors.default.primary[300],
        keypath: 'Sheet 4'
      },
      {
        color: themeColors.default.primary[300],
        keypath: 'Sheet 3'
      },
      {
        color: themeColors.default.primary[300],
        keypath: 'Fix'
      }
    ]
  },
  'games-tab': {
    source: dice,
    colorFilters: [
      {
        color: themeColors.default.primary[300],
        keypath: 'dice 1'
      },
      {
        color: themeColors.default.primary[300],
        keypath: 'dice 2'
      },
      {
        color: themeColors.default.primary[300],
        keypath: 'line'
      },
      {
        color: themeColors.default.primary[300],
        keypath: 'line 2'
      }
    ]
  }
}

export default HomeLayout
