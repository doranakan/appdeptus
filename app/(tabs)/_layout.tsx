import React from 'react'
import { Tabs } from 'expo-router'

const TabsLayout = () => (
  <Tabs screenOptions={{ headerShown: false }}>
    <Tabs.Screen name='home' options={{ headerShown: false }} />
    <Tabs.Screen name='settings' options={{ headerShown: false }} />
  </Tabs>
)

export default TabsLayout
