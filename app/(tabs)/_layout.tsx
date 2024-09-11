import { Icon } from 'appdeptus/components/ui/icon'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
import { config, useColorMode } from 'appdeptus/designSystem'
import { Tabs } from 'expo-router'
import { Dices, Shield, type LucideIcon } from 'lucide-react-native'
import { MotiView } from 'moti'
import React from 'react'

const tabBarBaseOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: 'transparent',
    elevation: 0
  }
}
const TabsLayout = () => {
  const colorMode = useColorMode()

  return (
    <VStack className='flex-1 justify-end'>
      <MotiView
        animate={{
          backgroundColor:
            colorMode === 'light'
              ? config.tokens.colors.secondary700
              : config.themes[colorMode].colors.secondary700
        }}
        transition={{
          duration: 500
        }}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
      />
      <Tabs
        screenOptions={{ headerShown: false }}
        initialRouteName='armies'
      >
        <Tabs.Screen
          name='armies'
          options={{
            ...tabBarBaseOptions,
            tabBarIcon: ({ focused }) => (
              <TabBarItem
                focused={focused}
                Icon={Shield}
                title='Armies'
              />
            )
          }}
        />
        <Tabs.Screen
          name='games'
          options={{
            ...tabBarBaseOptions,
            tabBarIcon: ({ focused }) => (
              <TabBarItem
                focused={focused}
                Icon={Dices}
                title='Games'
              />
            )
          }}
        />
      </Tabs>
    </VStack>
  )
}

const TabBarItem = ({
  focused,
  Icon: LucideIcon,
  title
}: {
  focused: boolean
  Icon: LucideIcon
  title: string
}) => (
  <VStack className='items-center gap-1'>
    <Icon
      as={LucideIcon}
      size='xs'
      className={` ${focused ? 'text-white' : 'text-light-400'} `}
    />

    <Text
      bold
      size='xs'
      className={` ${focused ? 'text-white' : 'text-light-400'} text-xs `}
    >
      {title}
    </Text>
  </VStack>
)

export default TabsLayout
