import { FontAwesome5 } from '@expo/vector-icons'
import { VStack } from '@gluestack-ui/themed'
import { useAsyncEffect } from 'ahooks'
import { Text, config } from 'appdeptus/designSystem'
import { supabase } from 'appdeptus/utils'
import { Tabs, useRouter } from 'expo-router'

const tabBarBaseOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: config.tokens.colors.blueGray800,
    padding: 8
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
              iconName='book-dead'
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
              iconName='dice'
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
              iconName='cogs'
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
  iconName,
  title
}: {
  focused: boolean
  iconName: string
  title: string
}) => (
  <VStack alignItems='center'>
    <Text color={focused ? '$white' : '$light400'}>
      <FontAwesome5
        name={iconName}
        size={18}
      />
    </Text>
    <Text
      color={focused ? '$white' : '$light400'}
      size='xs'
    >
      {title}
    </Text>
  </VStack>
)

export default TabsLayout
