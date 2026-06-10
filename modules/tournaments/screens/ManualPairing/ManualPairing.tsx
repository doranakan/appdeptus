import {
  Error,
  Loading,
  NavigationHeader,
  ScreenContainer,
  useToast
} from 'appdeptus/components'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { TapToPairList } from '../../components'
import {
  useCreateManualPairingsMutation,
  useGetTournamentRegistrationListQuery
} from '../../api'

const ManualPairingScreen = () => {
  const { id, roundId } = useLocalSearchParams<{ id: string, roundId: string }>()
  const router = useRouter()
  const { show } = useToast()

  const { data: registrations, isLoading } =
    useGetTournamentRegistrationListQuery(Number(id))

  const [createManualPairings, { isLoading: isSaving }] =
    useCreateManualPairingsMutation()

  const handleSave = async (pairs: [string, string][]) => {
    if (pairs.length === 0) {
      show({ title: '⚠️ Error', description: 'Add at least one match' })
      return
    }

    const result = await createManualPairings({
      roundId: Number(roundId),
      tournamentId: Number(id),
      pairs
    })

    if ('error' in result) {
      show({ title: '⚠️ Error', description: String(result.error) })
      return
    }

    router.back()
  }

  if (isLoading) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader
          title='Manual Pairings'
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
          title='Manual Pairings'
          variant='backButton'
        />
        <Error description='Failed to load players' />
      </ScreenContainer>
    )
  }

  const players = registrations.map((r) => ({ id: r.user.id, name: r.user.name }))

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        title='Manual Pairings'
        variant='backButton'
      />
      <TapToPairList
        isSaving={isSaving}
        onSave={handleSave}
        players={players}
      />
    </ScreenContainer>
  )
}

export default ManualPairingScreen
