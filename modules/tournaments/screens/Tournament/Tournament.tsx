import {
  Error,
  Loading,
  NavigationHeader,
  ScreenContainer
} from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useLocalSearchParams } from 'expo-router'
import {
  useGetTournamentQuery,
  useGetUserRegistrationListQuery
} from '../../api'
import OrganizerView from './OrganizerView'
import ParticipantView from './ParticipantView'

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

  if (isOrganizer) {
    return (
      <OrganizerView
        isFetching={isFetching}
        refetch={refetch}
        tournament={data}
      />
    )
  }

  const registration = registrations?.find((r) => r.tournament === Number(id))

  return (
    <ParticipantView
      isFetching={isFetching}
      refetch={refetch}
      registration={registration}
      tournament={data}
    />
  )
}

export default TournamentScreen
