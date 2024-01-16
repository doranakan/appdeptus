import React from 'react'
import { Tabs, useRouter } from 'expo-router'
import { GripVerticalIcon, SettingsIcon } from '@gluestack-ui/themed'
import { useAsyncEffect } from 'ahooks'
import { supabase } from 'appdeptus/utils'

const TabsLayout = () => {
  const router = useRouter()

  useAsyncEffect(async () => {
    const { data } = await supabase.auth.getSession()

    if (data.session === null) {
      router.replace('/')
    }
  }, [])

  return (
    <Tabs screenOptions={{ headerShown: false }} initialRouteName='home'>
      <Tabs.Screen
        name='home'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <GripVerticalIcon color={focused ? '$info500' : '$light400'} />
          )
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SettingsIcon color={focused ? '$info500' : '$light400'} />
          )
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
