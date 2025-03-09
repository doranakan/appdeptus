import {
  CardMenu,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  Text,
  VStack
} from 'appdeptus/components'
import { useSignOutMutation } from 'appdeptus/modules/root/api'
import { useUnregisterForNotifications } from 'appdeptus/notifications'
import { LogOut } from 'lucide-react-native'

const SettingsScreen = () => {
  const [signOut, { isLoading }] = useSignOutMutation()

  const unregisterForNotifications = useUnregisterForNotifications()

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        variant='backButton'
        rightButton={{
          variant: 'callback',
          onPress: async () => {
            unregisterForNotifications()
            await signOut()
          },
          loading: isLoading,
          disabled: isLoading,
          icon: LogOut
        }}
      />
      <ScreenTitle>User settings</ScreenTitle>
      <CardMenu
        Header={
          <Text
            className='p-4 uppercase'
            family='body-bold'
          >
            Edit user
          </Text>
        }
        items={[
          {
            href: 'user/settings/edit-name',
            title: 'Change nickname',
            variant: 'internal'
          }
        ]}
      />
      <CardMenu
        Header={
          <VStack className='bg-tertiary-600 p-4'>
            <Text
              className='uppercase'
              family='body-bold'
            >
              Danger zone
            </Text>
          </VStack>
        }
        items={[
          {
            href: 'user/settings/delete',
            title: 'Delete user',
            variant: 'internal'
          }
        ]}
      />
    </ScreenContainer>
  )
}

export default SettingsScreen
