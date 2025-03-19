import {
  Button,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  Text,
  useToast
} from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { router, useGlobalSearchParams } from 'expo-router'
import { useDeleteMemberMutation, useGetCommunityQuery } from '../../api'

const LeaveScreen = () => {
  const { id: communityId } = useGlobalSearchParams<{ id: string }>()

  const { data: user } = useGetUserProfileQuery()

  const { data: community } = useGetCommunityQuery(communityId)

  const [deleteMember, { isLoading }] = useDeleteMemberMutation()

  const { show } = useToast()

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['top']}
      space='md'
    >
      <NavigationHeader variant='backButton' />
      <ScreenTitle>Leave community</ScreenTitle>

      <Text>Are you sure to leave this community?</Text>

      <Button
        href='../'
        text='No, go back'
        variant='link'
        disabled={isLoading}
      />
      <Button
        onPress={async () => {
          if (!user) {
            return
          }

          const res = await deleteMember({
            communityId: Number(communityId),
            memberId: user.id
          })

          if ('error' in res) {
            show({ title: '⚠️ error', description: String(res.error) })
            return
          }

          show({
            title: '✅ Operation success!',
            description: `You left ${community?.name}`
          })

          if (router.canDismiss()) {
            router.dismissAll()
          }

          router.replace('communities-tab')
        }}
        text='Yes'
        variant='callback'
        disabled={isLoading || !user}
        loading={isLoading}
        color='secondary'
      />
    </ScreenContainer>
  )
}

export default LeaveScreen
