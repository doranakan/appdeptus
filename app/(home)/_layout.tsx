import dice from 'appdeptus/assets/lotties/dice.json'
import plan from 'appdeptus/assets/lotties/plan.json'
import {
  Pressable,
  selectThemeName,
  themeColors,
  VStack
} from 'appdeptus/components'
import { defaultScreenOptions } from 'appdeptus/constants'
import { Tabs } from 'expo-router'
import LottieView, { type AnimationObject } from 'lottie-react-native'
import {
  type ComponentProps,
  type PropsWithChildren,
  useEffect,
  useRef
} from 'react'
import { type GestureResponderEvent, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

const ArmiesLayout = () => {
  const themeName = useSelector(selectThemeName)

  const { bottom } = useSafeAreaInsets()

  return (
    <Tabs
      initialRouteName='armies-tab'
      screenOptions={{
        ...defaultScreenOptions,
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
