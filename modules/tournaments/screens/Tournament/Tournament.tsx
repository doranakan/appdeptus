import {
  Card,
  CardMenu,
  Error,
  Loading,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  SingleDataTable,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { format } from 'date-fns'
import { useLocalSearchParams } from 'expo-router'
import { ShareIcon } from 'lucide-react-native'
import { Platform, Share } from 'react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import {
  useGetTournamentQuery,
  useGetUserRegistrationListQuery
} from '../../api'

const formatLabelMap = {
  single_elimination: 'Single Elimination',
  swiss: 'Swiss'
} as const

const statusLabelMap = {
  ended: 'Ended',
  open: 'Open',
  ready: 'Ready',
  started: 'In Progress'
} as const

const TournamentScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isLoading, isError, isFetching, refetch } =
    useGetTournamentQuery(Number(id))

  const { data: profile } = useGetUserProfileQuery()
  const { data: registrations } = useGetUserRegistrationListQuery()

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
        <Error description='There was an error loading the tournament' />
      </ScreenContainer>
    )
  }

  const isOrganizer = profile?.id === data.organizer.id
  const registration = registrations?.find((r) => r.tournament === Number(id))
  const needsArmySelection =
    registration && !registration.army && data.status === 'ready'

  const shareLink = `https://open.appdeptus.com/tournament-register.html?id=${data.id}`

  const handleShare = () => {
    Share.share({
      title: `Join ${data.name}`,
      message: Platform.select({
        android: `You're invited to join ${data.name} on Appdeptus!\n${shareLink}`,
        ios: `You're invited to join ${data.name} on Appdeptus!`
      }),
      url: shareLink
    })
  }

  const tableData = [
    {
      title: 'Date',
      value: format(new Date(data.date), 'MMM d, yyyy · HH:mm')
    },
    { title: 'Address', value: data.address },
    { title: 'Format', value: formatLabelMap[data.format] },
    { title: 'Status', value: statusLabelMap[data.status] },
    ...(data.pointsLimit
      ? [{ title: 'Points limit', value: String(data.pointsLimit) }]
      : []),
    ...(data.price != null
      ? [{ title: 'Entry price', value: `€${data.price}` }]
      : []),
    { title: 'Organizer', value: data.organizer.name }
  ]

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        title='tournament'
        variant='backButton'
        {...(isOrganizer
          ? {
              rightButton: {
                icon: ShareIcon,
                onPress: handleShare,
                variant: 'callback'
              }
            }
          : {})}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            tintColor={themeColors.default.primary[300]}
            onRefresh={refetch}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <VStack space='md'>
          <ScreenTitle>{data.name}</ScreenTitle>

          <SingleDataTable data={tableData} />

          {data.description ? (
            <Card>
              <VStack
                className='p-4'
                space='xs'
              >
                <Text family='body-bold'>Description</Text>
                <Text family='body-regular-italic'>{data.description}</Text>
              </VStack>
            </Card>
          ) : null}

          {needsArmySelection ? (
            <CardMenu
              Header={
                <Text
                  className='p-4 uppercase'
                  family='body-bold'
                >
                  Action required
                </Text>
              }
              items={[
                {
                  href: `tournament/army-selection/${id}`,
                  title: 'Select your army',
                  variant: 'internal'
                }
              ]}
            />
          ) : null}

          {data.community ? (
            <CardMenu
              Header={
                <Text
                  className='p-4 uppercase'
                  family='body-bold'
                >
                  Community
                </Text>
              }
              items={[
                {
                  href: `community/${data.community.id}`,
                  title: data.community.name,
                  variant: 'internal'
                }
              ]}
            />
          ) : null}
        </VStack>
      </ScrollView>
    </ScreenContainer>
  )
}

export default TournamentScreen
