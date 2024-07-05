import { Icon as GSIcon, Heading, VStack } from '@gluestack-ui/themed'
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
    <VStack
      flex={1}
      justifyContent='flex-end'
    >
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
  Icon,
  title
}: {
  focused: boolean
  Icon: LucideIcon
  title: string
}) => (
  <VStack
    alignItems='center'
    gap='$1'
  >
    <GSIcon
      as={Icon}
      color={focused ? '$white' : '$light400'}
      size='xs'
    />

    <Heading
      color={focused ? '$white' : '$light400'}
      size='xs'
      fontSize='$xs'
    >
      {title}
    </Heading>
  </VStack>
)

export default TabsLayout
