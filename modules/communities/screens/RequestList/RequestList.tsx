import {
  Button,
  ButtonGroup,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  Text,
  UserListItem,
  useToast,
  VStack
} from 'appdeptus/components'
import { router, useGlobalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import {
  useGetCommunityRequestListQuery,
  useUpdateCommunityRequestMutation
} from '../../api'

const RequestListScreen = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()

  const { data } = useGetCommunityRequestListQuery(id)

  const [updateRequest, { isLoading }] = useUpdateCommunityRequestMutation()

  const { show } = useToast()

  useEffect(() => {
    if (!data?.length) {
      if (router.canGoBack()) {
        router.back()
        return
      }
      router.replace('/')
    }
  }, [data?.length])

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader variant='backButton' />
      <ScreenTitle>Requests</ScreenTitle>
      <Text
        className='uppercase'
        family='body-bold'
      >
        Add or Deny users
      </Text>
      <FlatList
        data={data}
        keyExtractor={({ user }) => user.id}
        renderItem={({ item }) => (
          <UserListItem user={item.user}>
            <VStack className='items-center'>
              <ButtonGroup>
                <Button
                  onPress={async () => {
                    const res = await updateRequest({
                      accepted: false,
                      communityId: Number(id),
                      userId: item.user.id
                    })

                    if ('error' in res) {
                      show({
                        title: '⚠️ error',
                        description: String(res.error)
                      })

                      return
                    }

                    show({
                      title: '🚫 Denied!',
                      description:
                        'That adept will not be part of your community, Inquisitor.'
                    })
                  }}
                  variant='callback'
                  text='deny'
                  size='sm'
                  loading={isLoading}
                  disabled={isLoading}
                />
                <Button
                  onPress={async () => {
                    const res = await updateRequest({
                      accepted: true,
                      communityId: Number(id),
                      userId: item.user.id
                    })

                    if ('error' in res) {
                      show({
                        title: '⚠️ error',
                        description: String(res.error)
                      })

                      return
                    }

                    show({
                      title: '✅ Accepted!',
                      description: 'Your community has a new adept, Inquisitor.'
                    })
                  }}
                  variant='callback'
                  text='accept'
                  color='primary'
                  size='sm'
                  loading={isLoading}
                  disabled={isLoading}
                />
              </ButtonGroup>
            </VStack>
          </UserListItem>
        )}
      />
    </ScreenContainer>
  )
}

export default RequestListScreen
