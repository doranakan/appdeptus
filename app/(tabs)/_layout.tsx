import { FontAwesome5 } from '@expo/vector-icons'
import { Text } from '@gluestack-ui/themed'
import { useAsyncEffect } from 'ahooks'
import { supabase } from 'appdeptus/utils'
import { Tabs, useRouter } from 'expo-router'
import React from 'react'

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
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Text color={focused ? '$info500' : '$light400'}>
              <FontAwesome5
                name='book-dead'
                size={18}
              />
            </Text>
          ),
          title: 'Army builder'
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Text color={focused ? '$info500' : '$light400'}>
              <FontAwesome5
                name='cogs'
                size={18}
              />
            </Text>
          ),
          title: 'Settings'
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
