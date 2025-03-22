import {
  Badge,
  CardMenu,
  Error,
  HStack,
  Loading,
  NavigationHeader,
  OptionButton,
  Profile,
  ScreenContainer,
  Text,
  themeColors,
  useToast,
  VStack
} from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useLocalSearchParams } from 'expo-router'
import {
  Bell,
  Check,
  CircleFadingPlus,
  Cog,
  Share as ShareIcon
} from 'lucide-react-native'
import { Platform, Share } from 'react-native'
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

          <HStack style={{ justifyContent: 'space-around' }}>
            {isMember ? (
              <OptionButton
                icon={Cog}
                href={`community/${id}/settings`}
                text='Settings'
                variant='link'
              />
            ) : (
              <OptionButton
                icon={requested ? Check : CircleFadingPlus}
                onPress={async () => {
                  const res = await sendRequest(data.id)

                  if ('error' in res) {
                    show({ title: '⚠️ error', description: String(res.error) })

                    return
                  }

                  show({
                    title: '✅ Operation success!',
                    description: 'The Inquisitor has been notified.'
                  })
                }}
                text={requested ? 'Pending' : 'Join'}
                loading={isSendingRequest}
                disabled={requested || isSendingRequest}
                variant='callback'
              />
            )}
            <OptionButton
              icon={ShareIcon}
              onPress={() => {
                const url = `https://open.appdeptus.com/share-community.html?id=${id}`

                Share.share({
                  title: `Share ${data.name}`,
                  message: Platform.select({
                    android: `Join ${data.name} on Appdeptus! Connect with other adepts, share your army, and start playing ranked games!\n${url}`,
                    ios: `Join ${data.name} on Appdeptus! Connect with other adepts, share your army, and start playing ranked games!`
                  }),
                  url
                })
              }}
              text='Share'
              variant='callback'
            />
            {isInquisitor ? (
              <OptionButton
                icon={Bell}
                href={`community/${id}/request-list`}
                text='Requests'
                notifications={notifications}
                variant='link'
              />
            ) : null}
          </HStack>

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
                  href: `community/${data.id}/members`,
                  title: 'Members',
                  variant: 'internal'
                },
                {
                  href: `community/${data.id}/armies`,
                  title: 'Armies',
                  variant: 'internal'
                },
                {
                  href: `community/${data.id}/games`,
                  title: 'Games',
                  variant: 'internal'
                },
                {
                  href: `community/${data.id}/leaderboard`,
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
              {!requested ? (
                <Text
                  className='text-center'
                  family='body-regular-italic'
                >
                  To see the content of this community you need to ask to join
                  first.
                </Text>
              ) : null}
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </ScreenContainer>
  )
}

export default CommunityScreen
