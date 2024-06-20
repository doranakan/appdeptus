import { Icon as GSIcon, VStack } from '@gluestack-ui/themed'
import { useAsyncEffect } from 'ahooks'
import { Text, config } from 'appdeptus/designSystem'
import { supabase } from 'appdeptus/utils'
import { Tabs, useRouter } from 'expo-router'
import { Dices, Settings, Shield, type LucideIcon } from 'lucide-react-native'
import React from 'react'

const tabBarBaseOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: config.tokens.colors.blueGray800
  }
}

const TabsLayout = () => {
  const router = useRouter()

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
