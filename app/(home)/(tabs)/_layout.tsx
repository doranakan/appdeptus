import { type BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import book from 'appdeptus/assets/lotties/book.json'
import team from 'appdeptus/assets/lotties/competitiveness.json'
import dice from 'appdeptus/assets/lotties/dice.json'
import plan from 'appdeptus/assets/lotties/plan.json'
import {
  type Button,
  Loading,
  NavigationHeader,
  NotificationBadge,
  Pressable,
  resetTheme,
  ScreenContainer,
  selectThemeName,
  themeColors,
  VStack
} from 'appdeptus/components'
import { defaultScreenOptions } from 'appdeptus/constants'
import { type Notifications } from 'appdeptus/models'
import { useGetArmyListQuery } from 'appdeptus/modules/armies/api'
import { useGetGameQuery } from 'appdeptus/modules/games/api'
import { ActiveGameTopBar } from 'appdeptus/modules/games/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useNotifications } from 'appdeptus/notifications'
import { useNotificationsQueryState } from 'appdeptus/notifications/api'
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

const TabsLayout = () => {
  useNotifications()

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
            <Tabs.Screen
              name='communities-tab'
              options={{
                tabBarLabel: '',
                tabBarIcon: CommunitiesTabIcon
              }}
            />
            <Tabs.Screen
              name='tournaments-tab'
              options={{
                tabBarLabel: '',
                tabBarIcon: TournamentsTabIcon
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
      case 'communities-tab':
        return {
          href: 'community/create',
          icon: Plus,
          variant: 'link'
        }
      case 'tournaments-tab':
        return {
          href: 'tournament/create',
          icon: Plus,
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
  routeName: 'index' | 'communities-tab' | 'games-tab' | 'tournaments-tab'
}

const tabNameToNotification: Partial<
  Record<TabIconProps['routeName'], keyof Notifications>
> = {
  'communities-tab': 'communities',
  'games-tab': 'games',
  index: 'armies'
}

const TabIcon = ({ focused, routeName }: TabIconProps) => {
  const { data: notifications } = useNotificationsQueryState()

  const notificationKey = tabNameToNotification[routeName]
  const notificationCount = notificationKey
    ? notifications?.[notificationKey]
    : undefined

  const animation = useRef<LottieView>(null)

  const config = tabNameToIconMap[routeName]

  useEffect(() => {
    if (focused) {
      animation.current?.play()
    }
  })

  return (
    <VStack>
      <LottieView
        loop={false}
        ref={animation}
        style={styles.lottieView}
        source={config?.source}
        colorFilters={!focused ? config?.colorFilters : undefined}
        speed={2}
      />
      {notificationCount ? (
        <VStack className='absolute right-0 top-0'>
          <NotificationBadge count={notificationCount} />
        </VStack>
      ) : null}
    </VStack>
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
const CommunitiesTabIcon = (props: Pick<TabIconProps, 'focused'>) => (
  <TabIcon
    {...props}
    routeName='communities-tab'
  />
)
const TournamentsTabIcon = (props: Pick<TabIconProps, 'focused'>) => (
  <TabIcon
    {...props}
    routeName='tournaments-tab'
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
    source: book,
    colorFilters: [
      {
        color: themeColors.default.primary[300],
        keypath: '*'
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
        keypath: '*'
      }
    ]
  },
  'communities-tab': {
    source: team,
    colorFilters: [
      {
        color: themeColors.default.primary[300],
        keypath: '*'
      }
    ]
  },
  'tournaments-tab': {
    source: plan,
    colorFilters: [
      {
        color: themeColors.default.primary[300],
        keypath: '*'
      }
    ]
  }
}

export default TabsLayout
