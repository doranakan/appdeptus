import {
  Button,
  Card,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  Text,
  VStack
} from 'appdeptus/components'
import { useSignOutMutation } from 'appdeptus/modules/root/api'
import { LogOut } from 'lucide-react-native'

const SettingsScreen = () => {
  const [signOut, { isLoading }] = useSignOutMutation()

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
          onPress: signOut,
          loading: isLoading,
          disabled: isLoading,
          icon: LogOut
        }}
      />
      <ScreenTitle>User settings</ScreenTitle>
      <Card>
        <VStack
          className='p-4'
          space='md'
        >
          <Text
            className='uppercase'
            family='body-bold'
          >
            Edit user
          </Text>
          <Button
            variant='link'
            color='secondary'
            text='change nickname'
            size='sm'
            href='user/settings/edit-name'
          />
        </VStack>
      </Card>
      <Card>
        <VStack
          className='p-4'
          space='md'
        >
          <Text
            className='uppercase'
            family='body-bold'
          >
            Danger zone
          </Text>
          <Button
            variant='link'
            text='delete account'
            size='sm'
            href='user/settings/delete'
          />
        </VStack>
      </Card>
    </ScreenContainer>
  )
}

export default SettingsScreen
