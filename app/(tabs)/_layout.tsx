import { Icon as GSIcon, Text, VStack } from '@gluestack-ui/themed'
import { useAsyncEffect } from 'ahooks'
import { config, useColorMode } from 'appdeptus/designSystem'
import { supabase } from 'appdeptus/utils'
import { Tabs, useRouter } from 'expo-router'
import { Dices, Settings, Shield, type LucideIcon } from 'lucide-react-native'
import React, { useMemo } from 'react'

const TabsLayout = () => {
  const router = useRouter()

  const colorMode = useColorMode()

  const tabBarBaseOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor:
          colorMode === 'light'
            ? config.tokens.colors.secondary700
            : config.themes[colorMode].colors.secondary700
      }
    }),
    [colorMode]
  )

  useAsyncEffect(async () => {
    const { data } = await supabase.auth.getSession()

    if (data.session === null) {
      router.replace('/')
    }
  }, [])

  return (
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
              title='Build'
            />
          )
        }}
      />
      <Tabs.Screen
        name='play'
        options={{
          ...tabBarBaseOptions,
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              focused={focused}
              Icon={Dices}
              title='Play'
            />
          )
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          ...tabBarBaseOptions,
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              focused={focused}
              Icon={Settings}
              title='Settings'
            />
          )
        }}
      />
    </Tabs>
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
  <VStack alignItems='center'>
    <GSIcon
      as={Icon}
      color={focused ? '$white' : '$light400'}
      size='xs'
    />

    <Text
      color={focused ? '$white' : '$light400'}
      size='xs'
    >
      {title}
    </Text>
  </VStack>
)

export default TabsLayout
