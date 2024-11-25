import { type BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import dice from 'appdeptus/assets/lotties/dice.json'
import plan from 'appdeptus/assets/lotties/plan.json'
import {
  type Button,
  NavigationHeader,
  Pressable,
  selectThemeName,
  themeColors,
  VStack
} from 'appdeptus/components'
import { defaultScreenOptions } from 'appdeptus/constants'
import { useGetArmyListQuery } from 'appdeptus/modules/armies/api'
import { useGetGameQuery } from 'appdeptus/modules/games/api'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { Tabs } from 'expo-router'
import LottieView, { type AnimationObject } from 'lottie-react-native'
import { Plus, Swords } from 'lucide-react-native'
import {
  type ComponentProps,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useRef
} from 'react'
import { type GestureResponderEvent, StyleSheet } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

const ArmiesLayout = () => {
  const themeName = useSelector(selectThemeName)

  const { bottom } = useSafeAreaInsets()

  return (
    <VStack className='flex-1 bg-primary-950'>
      <SafeAreaView
        edges={['top']}
        style={styles.safeArea}
      >
        <VStack
          className='flex-1'
          space='md'
        >
          <Tabs
            initialRouteName='armies-tab'
            screenOptions={{
              ...defaultScreenOptions,
              header: (props) => <Header {...props} />,
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
              name='armies-tab'
              options={{
                tabBarLabel: '',
                tabBarIcon: ({ focused }) => (
                  <TabIcon
                    focused={focused}
                    routeName='armies-tab'
                  />
                )
              }}
            />
            <Tabs.Screen
              name='games-tab'
              options={{
                tabBarLabel: '',
                tabBarIcon: ({ focused }) => (
                  <TabIcon
                    focused={focused}
                    routeName='games-tab'
                  />
                )
              }}
            />
          </Tabs>
        </VStack>
      </SafeAreaView>
    </VStack>
  )
}

const Header = ({ route }: BottomTabHeaderProps) => {
  const { data: user } = useGetUserProfileQuery()

  const { data: armies } = useGetArmyListQuery()

  const { data: activeGame } = useGetGameQuery()

  const rightButton = useMemo<ComponentProps<typeof Button> | undefined>(() => {
    switch (route.name) {
      case 'armies-tab':
        return {
          href: 'army-builder',
          icon: Plus,
          variant: 'link'
        }
      case 'games-tab':
        return {
          disabled: !armies?.length || !!activeGame,
          href: 'games/new/army-selection',
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
  <Pressable
    className=''
    onPress={onPress}
  >
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
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
  'armies-tab': {
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

export default ArmiesLayout
