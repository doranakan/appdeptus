import dice from 'appdeptus/assets/lotties/dice.json'
import plan from 'appdeptus/assets/lotties/plan.json'
import { themeColors } from 'appdeptus/components'
import { Tabs } from 'expo-router'
import LottieView, { type AnimationObject } from 'lottie-react-native'
import { type ComponentProps, useEffect, useRef } from 'react'

const ArmiesLayout = () => (
  <Tabs
    initialRouteName='army-library'
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: themeColors.default.primary['950'],
        borderTopWidth: 0
      }
    }}
  >
    <Tabs.Screen
      name='army-library'
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            routeName='army-library'
          />
        )
      }}
    />
    <Tabs.Screen
      name='games'
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            routeName='games'
          />
        )
      }}
    />
  </Tabs>
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
      style={{
        width: 46,
        height: 46
      }}
      source={config?.source}
      colorFilters={!focused ? config?.colorFilters : undefined}
      speed={2}
    />
  )
}

const tabNameToIconMap: Record<
  string,
  {
    source: AnimationObject
    colorFilters: NonNullable<ComponentProps<typeof LottieView>['colorFilters']>
  }
> = {
  'army-library': {
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
  games: {
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
