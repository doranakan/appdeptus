import {
  Error,
  Loading,
  NavigationHeader,
  ScreenContainer,
  useToast
} from 'appdeptus/components'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMemo } from 'react'
import {
  useGetTournamentRegistrationListQuery,
  useStartTournamentMutation
} from '../../api'
import { TapToPairList } from '../../components'
import { pair, shuffle } from './utils'

const StartPairingScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const { show } = useToast()

  const { data: registrations, isLoading } =
    useGetTournamentRegistrationListQuery(Number(id))

  const [startTournament, { isLoading: isStarting }] =
    useStartTournamentMutation()

  const initialPairs = useMemo(() => {
    if (!registrations) return []
    const players = shuffle(
      registrations.map((r) => ({ id: r.user.id, name: r.user.name }))
    )
    return pair(players).map(([p1, p2]) => ({
      p1Id: p1.id,
      p1Name: p1.name,
      p2Id: p2.id,
      p2Name: p2.name
    }))
  }, [registrations])

  const handleSave = async (pairs: [string, string][]) => {
    const result = await startTournament({ id: Number(id), pairs })

    if ('error' in result) {
      show({ title: '⚠️ Error', description: String(result.error) })
      return
    }

    router.push(`/tournament/${id}/rounds`)
  }

  if (isLoading) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader
          title='Round 1 Pairings'
          variant='backButton'
        />
        <Loading />
      </ScreenContainer>
    )
  }

  if (!registrations) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader
          title='Round 1 Pairings'
          variant='backButton'
        />
        <Error description='Failed to load players' />
      </ScreenContainer>
    )
  }

  const players = registrations.map((r) => ({
    id: r.user.id,
    name: r.user.name
  }))

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        title='Round 1 Pairings'
        variant='backButton'
      />
      <TapToPairList
        initialPairs={initialPairs}
        isSaving={isStarting}
        onSave={handleSave}
        players={players}
        saveLabel='Start Tournament'
      />
    </ScreenContainer>
  )
}

export default StartPairingScreen
