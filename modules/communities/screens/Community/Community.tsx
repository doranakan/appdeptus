import {
  Badge,
  CardMenu,
  Error,
  Loading,
  NavigationHeader,
  Profile,
  ScreenContainer,
  Text,
  themeColors,
  useToast,
  VStack
} from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useLocalSearchParams } from 'expo-router'
import { Check, CircleFadingPlus, Cog } from 'lucide-react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import {
  useGetCommunityQuery,
  useGetCommunityRequestListQuery,
  useSendCommunityRequestMutation
} from '../../api'
import useIsInquisitor from '../../hooks'

const CommunityScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data: user } = useGetUserProfileQuery()

  const {
    data,
    isLoading,
    isFetching: isFetchingCommunity,
    isError,
    refetch: refetchCommunity
  } = useGetCommunityQuery(id)

  const isMember = !!data?.members.find(({ id }) => user?.id === id)

  const [sendRequest, { isLoading: isSendingRequest }] =
    useSendCommunityRequestMutation()

  const isInquisitor = useIsInquisitor(data?.members ?? [])

  const {
    requested,
    notifications,
    refetch: refetchRequests,
    isFetching: isFetchingRequests
  } = useGetCommunityRequestListQuery(id, {
    selectFromResult: ({ data, ...rest }) => {
      const req = !!data?.find(({ user: u }) => u.id === user?.id)

      return {
        ...rest,
        requested: req,
        notifications: isInquisitor && data ? data?.length : 0
      }
    }
  })

  const { show } = useToast()

  if (isLoading) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader variant='backButton' />
        <Loading />
      </ScreenContainer>
    )
  }

  if (!data || isError) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader variant='backButton' />
        <Error description='There was an error with your request' />
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        variant='backButton'
        title='community'
        rightButton={
          isMember
            ? {
                href: `communities/${id}/settings`,
                variant: 'link',
                color: 'secondary',
                icon: Cog,
                notifications
              }
            : {
                onPress: async () => {
                  const res = await sendRequest(data.id)

                  if ('error' in res) {
                    show({ title: '⚠️ error', description: String(res.error) })

                    return
                  }

                  show({
                    title: '✅ Operation success!',
                    description: 'The Inquisitor has been notified.'
                  })
                },
                variant: 'callback',
                icon: requested ? Check : CircleFadingPlus,
                loading: isSendingRequest,
                disabled: requested || isSendingRequest
              }
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={themeColors.default.primary[300]}
            refreshing={isFetchingRequests || isFetchingCommunity}
            onRefresh={async () => {
              await refetchCommunity()
              await refetchRequests()
            }}
          />
        }
      >
        <VStack space='md'>
          <Profile
            date={data.createdAt}
            {...data}
            variant='community'
          />

          {isMember || !data.isSecret ? (
            <CardMenu
              Header={
                <Text
                  className='p-4 uppercase'
                  family='body-bold'
                >
                  Browse community
                </Text>
              }
              items={[
                {
                  href: `communities/${data.id}/members`,
                  title: 'Members',
                  variant: 'internal'
                },
                {
                  href: `communities/${data.id}/armies`,
                  title: 'Armies',
                  variant: 'internal'
                },
                {
                  href: `communities/${data.id}/games`,
                  title: 'Games',
                  variant: 'internal'
                },
                {
                  href: `communities/${data.id}/leaderboard`,
                  title: 'Leaderboard',
                  variant: 'internal'
                }
              ]}
            />
          ) : (
            <VStack
              className='items-center'
              space='md'
            >
              <Badge text='Private community' />
              <Text
                className='text-center'
                family='body-regular-italic'
              >
                {requested
                  ? 'Your request is pending Inquisitor authorization.'
                  : 'To see the content of this community you need to ask to join first.'}
              </Text>
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </ScreenContainer>
  )
}

export default CommunityScreen
