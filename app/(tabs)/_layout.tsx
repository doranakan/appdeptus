import React from 'react'
import { Tabs } from 'expo-router'
import { GripVerticalIcon, SettingsIcon } from '@gluestack-ui/themed'

const TabsLayout = () => (
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

export default TabsLayout
