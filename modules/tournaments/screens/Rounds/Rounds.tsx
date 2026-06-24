import {
  Button,
  Card,
  Error,
  HStack,
  Loading,
  NavigationHeader,
  ScreenContainer,
  Text,
  themeColors,
  useToast,
  VStack
} from 'appdeptus/components'
import { type TournamentMatch, type TournamentRound } from 'appdeptus/models'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Shuffle, Users } from 'lucide-react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import {
  useGetTournamentMatchListQuery,
  useGetTournamentQuery,
  useGetTournamentRoundListQuery,
  useStartNextRoundMutation,
  useUpdateTournamentStatusMutation
} from '../../api'

const statusLabelMap = {
  confirmed: 'Confirmed',
  pending: 'Pending',
  reported: 'Reported'
} as const

type MatchCardProps = {
  match: TournamentMatch
  tournamentId: string
}

const MatchCard = ({ match, tournamentId }: MatchCardProps) => {
  const router = useRouter()

  return (
    <Card>
      <VStack
        className='p-4'
        space='sm'
      >
        <HStack className='items-center justify-between'>
          <Text family='body-bold'>{match.playerOne.name}</Text>
          <Text family='body-regular-italic'>vs</Text>
          <Text family='body-bold'>{match.playerTwo.name}</Text>
        </HStack>

        {match.status !== 'pending' ? (
          <HStack className='items-center justify-between'>
            <Text family='body-regular-italic'>
              {match.playerOneScore ?? '—'}
            </Text>
            <Text family='body-regular-italic'>:</Text>
            <Text family='body-regular-italic'>
              {match.playerTwoScore ?? '—'}
            </Text>
          </HStack>
        ) : null}

        <HStack className='items-center justify-between'>
          <Text
            className='uppercase text-primary-300'
            family='body-regular-italic'
          >
            {statusLabelMap[match.status]}
          </Text>
          <Button
            onPress={() => {
              router.push(
                `/tournament/${tournamentId}/match/${match.id}?roundId=${match.round}`
              )
            }}
            size='sm'
            text='Manage'
            variant='callback'
          />
        </HStack>
      </VStack>
    </Card>
  )
}

type RoundSectionProps = {
  round: TournamentRound
  tournamentId: string
  isLast: boolean
  isFinalRound: boolean
  isStartingNextRound: boolean
  isEndingTournament: boolean
  onNextRound: (
    completedRound: TournamentRound,
    pairingMode: 'auto' | 'manual'
  ) => void
  onTournamentEnd: () => void
}

const RoundSection = ({
  round,
  tournamentId,
  isLast,
  isFinalRound,
  isStartingNextRound,
  isEndingTournament,
  onNextRound,
  onTournamentEnd
}: RoundSectionProps) => {
  const { data: matches, isLoading } = useGetTournamentMatchListQuery(round.id)

  if (isLoading) {
    return <Loading />
  }

  const allConfirmed =
    matches &&
    matches.length > 0 &&
    matches.every((m) => m.status === 'confirmed')

  const isSingleEliminationFinal = matches != null && matches.length === 1
  const isActualFinalRound = isFinalRound || isSingleEliminationFinal

  return (
    <VStack space='sm'>
      <Text
        className='uppercase'
        family='body-bold'
      >
        Round {round.roundNumber}
      </Text>

      {matches?.length === 0 ? (
        <Text
          className='text-primary-300'
          family='body-regular-italic'
        >
          No matches yet
        </Text>
      ) : null}

      {matches?.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          tournamentId={tournamentId}
        />
      ))}

      {isLast && allConfirmed ? (
        isActualFinalRound ? (
          <Button
            loading={isEndingTournament}
            onPress={onTournamentEnd}
            text='End Tournament'
            variant='callback'
          />
        ) : (
          <HStack space='sm'>
            <Button
              className='flex-1'
              icon={Shuffle}
              loading={isStartingNextRound}
              onPress={() => {
                onNextRound(round, 'auto')
              }}
              text='Auto Pair'
              variant='callback'
            />
            <Button
              className='flex-1'
              icon={Users}
              disabled={isStartingNextRound}
              onPress={() => {
                onNextRound(round, 'manual')
              }}
              text='Manual Pair'
              variant='callback'
            />
          </HStack>
        )
      ) : null}
    </VStack>
  )
}

const RoundsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const { show } = useToast()

  const {
    data: tournament,
    isLoading: tournamentLoading,
    isError
  } = useGetTournamentQuery(Number(id))

  const {
    data: rounds,
    isLoading: roundsLoading,
    isFetching,
    refetch
  } = useGetTournamentRoundListQuery(Number(id))

  const [startNextRound, { isLoading: isStartingNextRound }] =
    useStartNextRoundMutation()
  const [updateTournamentStatus, { isLoading: isEndingTournament }] =
    useUpdateTournamentStatusMutation()

  const isLoading = tournamentLoading || roundsLoading

  if (isLoading) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader
          title='Rounds'
          variant='backButton'
        />
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
        <NavigationHeader
          title='Rounds'
          variant='backButton'
        />
        <Error description='There was an error loading the tournament' />
      </ScreenContainer>
    )
  }

  const handleNextRound = async (
    completedRound: TournamentRound,
    pairingMode: 'auto' | 'manual'
  ) => {
    const result = await startNextRound({
      tournamentId: Number(id),
      completedRoundId: completedRound.id,
      nextRoundNumber: completedRound.roundNumber + 1,
      pairingMode
    })

    if ('error' in result) {
      show({ title: '⚠️ Error', description: 'Failed to create next round' })
      return
    }

    if (pairingMode === 'manual' && result.data) {
      router.push(
        `/tournament/${id}/round-pairing?roundId=${result.data.roundId}`
      )
    }
  }

  const handleTournamentEnd = async () => {
    const result = await updateTournamentStatus({
      id: Number(id),
      status: 'ended'
    })

    if ('error' in result) {
      show({ title: '⚠️ Error', description: 'Failed to end the tournament' })
    }
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        title='Rounds'
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
        <VStack space='lg'>
          {rounds?.length === 0 ? (
            <Text
              className='text-primary-300'
              family='body-regular-italic'
            >
              No rounds yet
            </Text>
          ) : null}

          {rounds?.map((round, index) => (
            <RoundSection
              key={round.id}
              isEndingTournament={isEndingTournament}
              isFinalRound={
                tournament.format === 'swiss' &&
                tournament.numberOfRounds != null &&
                round.roundNumber >= tournament.numberOfRounds
              }
              isLast={index === (rounds?.length ?? 0) - 1}
              isStartingNextRound={isStartingNextRound}
              onNextRound={handleNextRound}
              onTournamentEnd={handleTournamentEnd}
              round={round}
              tournamentId={id}
            />
          ))}
        </VStack>
      </ScrollView>
    </ScreenContainer>
  )
}

export default RoundsScreen
