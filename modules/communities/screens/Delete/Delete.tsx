import {
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  SecurityForm,
  Text,
  useToast
} from 'appdeptus/components'
import { router, useGlobalSearchParams } from 'expo-router'
import { useDeleteCommunityMutation } from '../../api'

const DeleteScreen = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()

  const [deleteCommunity, { isLoading }] = useDeleteCommunityMutation()

  const { show } = useToast()

  return (
    <ScreenContainer
      className='bg-tertiary-900 p-4'
      hideBottomGradient
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader variant='backButton' />
      <ScreenTitle>delete community</ScreenTitle>
      <Text
        className='text-tertiary-100'
        family='body-regular-italic'
      >
        Are you sure to delete your community? This operation is not reversible
        and all its game related data will be lost.
      </Text>
      <SecurityForm
        onPress={async () => {
          const res = await deleteCommunity(id)

          if ('error' in res) {
            show({
              description: String(res.error),
              title: '⚠️ error'
            })
            return
          }

          show({
            description: 'And all the its games data with it.',
            title: '🗑️ Community deleted'
          })

          router.dismissTo('/communities-tab')
        }}
        securityFrase='delete community'
        variant='community'
        loading={isLoading}
      />
    </ScreenContainer>
  )
}

export default DeleteScreen
