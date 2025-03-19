import {
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  SecurityForm,
  Text,
  useToast
} from 'appdeptus/components'
import { useDeleteUserMutation } from 'appdeptus/modules/root/api'

const DeleteScreen = () => {
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
      <SecurityForm
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
            description: 'It is such a shame to witness a skilled Adept drop.',
            title: '🗑️ Account deleted'
          })
        }}
        securityFrase='delete my account'
        variant='account'
        loading={isLoading}
      />
    </ScreenContainer>
  )
}

export default DeleteScreen
