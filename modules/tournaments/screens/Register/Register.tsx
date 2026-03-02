import {
  Button,
  Error,
  Loading,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  SingleDataTable,
  useToast,
  VStack
} from 'appdeptus/components'
import { format } from 'date-fns'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {
  useGetTournamentQuery,
  useRegisterForTournamentMutation
} from '../../api'

const formatLabelMap = {
  single_elimination: 'Single Elimination',
  swiss: 'Swiss'
} as const

const RegisterScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const { show } = useToast()

  const {
    data: tournament,
    isLoading,
    isError
  } = useGetTournamentQuery(Number(id))

  const [registerForTournament, { isLoading: isRegistering }] =
    useRegisterForTournamentMutation()

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

  if (!tournament || isError) {
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

  if (tournament.status !== 'open') {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
        space='md'
      >
        <NavigationHeader
          title='Register'
          variant='backButton'
        />
        <Error description='Tournament registration is closed' />
      </ScreenContainer>
    )
  }

  if (
    tournament.registrationDeadline &&
    new Date(tournament.registrationDeadline) < new Date()
  ) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
        space='md'
      >
        <NavigationHeader
          title='Register'
          variant='backButton'
        />
        <Error description='Registration deadline has passed' />
      </ScreenContainer>
    )
  }

  const tableData = [
    {
      title: 'Date',
      value: format(new Date(tournament.date), 'MMM d, yyyy · HH:mm')
    },
    { title: 'Address', value: tournament.address },
    { title: 'Format', value: formatLabelMap[tournament.format] },
    { title: 'Organizer', value: tournament.organizer.name },
    ...(tournament.pointsLimit
      ? [{ title: 'Points limit', value: String(tournament.pointsLimit) }]
      : []),
    ...(tournament.registrationDeadline
      ? [
          {
            title: 'Registration deadline',
            value: format(
              new Date(tournament.registrationDeadline),
              'MMM d, yyyy · HH:mm'
            )
          }
        ]
      : [])
  ]

  const handleRegister = async () => {
    const result = await registerForTournament({ tournamentId: Number(id) })

    if ('error' in result) {
      show({ title: '⚠️ Error', description: String(result.error) })
      return
    }

    router.replace(`/tournament/${id}`)
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        title='Register'
        variant='backButton'
      />
      <VStack
        className='flex-1'
        space='md'
      >
        <ScreenTitle>{tournament.name}</ScreenTitle>
        <SingleDataTable data={tableData} />
        <Button
          loading={isRegistering}
          onPress={handleRegister}
          text='Register'
          variant='callback'
        />
      </VStack>
    </ScreenContainer>
  )
}

export default RegisterScreen
