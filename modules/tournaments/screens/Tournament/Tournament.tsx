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
import { format } from 'date-fns'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { RefreshControl } from 'react-native'
import { useGetTournamentQuery } from '../../api'

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

  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch
  } = useGetTournamentQuery(Number(id))

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
