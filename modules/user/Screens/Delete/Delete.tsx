import {
  Button,
  Card,
  Input,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import { useDeleteUserMutation } from 'appdeptus/modules/root/api'
import { TriangleAlert } from 'lucide-react-native'
import { useState } from 'react'

const SECURITY_FRASE = 'DELETE MY ACCOUNT'

const DeleteScreen = () => {
  const [securityFrase, setSecurityFrase] = useState('')

  const [deleteUser, { isLoading }] = useDeleteUserMutation()

  const { show } = useToast()

  return (
    <ScreenContainer
      className='bg-tertiary-900 p-4'
      hideBottomGradient
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader variant='backButton' />
      <ScreenTitle>delete account</ScreenTitle>
      <Text
        className='text-tertiary-100'
        family='body-regular-italic'
      >
        Are you sure to delete your user? This operation is not reversible and
        all your data will be destroyed.
      </Text>
      <Card>
        <VStack
          className='bg-tertiary-950 p-4'
          space='md'
        >
          <Text className='text-tertiary-100'>
            {'If your really want to delete your account type "'}
            <Text family='body-bold'>{SECURITY_FRASE}</Text>
            {'" below.'}
          </Text>
          <Input
            Icon={TriangleAlert}
            onChangeText={setSecurityFrase}
            value={securityFrase}
          />
          <Text size='xs'>Make sure all letters are in UPPER CASE</Text>
          <Button
            variant='callback'
            onPress={async () => {
              const res = await deleteUser()

              if ('error' in res) {
                show({
                  description: String(res.error),
                  title: '⚠️ error'
                })
                return
              }

              show({
                description:
                  'It is such a shame to witness a skilled Adept drop.',
                title: '🗑️ Account deleted'
              })
            }}
            text='delete'
            disabled={securityFrase !== SECURITY_FRASE || isLoading}
            loading={isLoading}
          />
        </VStack>
      </Card>
    </ScreenContainer>
  )
}

export default DeleteScreen
