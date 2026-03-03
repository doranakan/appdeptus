import {
  Button,
  Card,
  Error,
  HStack,
  Input,
  Loading,
  NavigationHeader,
  ScreenContainer,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Hash } from 'lucide-react-native'
import { useState } from 'react'
import {
  useConfirmMatchMutation,
  useGetTournamentMatchListQuery,
  useUpdateMatchMutation
} from '../../api'

const MatchScreen = () => {
  const { matchId, roundId } = useLocalSearchParams<{
    matchId: string
    roundId: string
  }>()
  const router = useRouter()
  const { show } = useToast()

  const { data: matches, isLoading } = useGetTournamentMatchListQuery(
    Number(roundId)
  )

  const [updateMatch, { isLoading: isUpdating }] = useUpdateMatchMutation()
  const [confirmMatch, { isLoading: isConfirming }] = useConfirmMatchMutation()

  const [scoreOne, setScoreOne] = useState('')
  const [scoreTwo, setScoreTwo] = useState('')

  const match = matches?.find((m) => m.id === Number(matchId))

  if (isLoading) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader
          title='Match'
          variant='backButton'
        />
        <Loading />
      </ScreenContainer>
    )
  }

  if (!match) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader
          title='Match'
          variant='backButton'
        />
        <Error description='Match not found' />
      </ScreenContainer>
    )
  }

  const p1Score = scoreOne !== '' ? Number(scoreOne) : (match.playerOneScore ?? 0)
  const p2Score = scoreTwo !== '' ? Number(scoreTwo) : (match.playerTwoScore ?? 0)
  const winnerId =
    p1Score > p2Score
      ? match.playerOne.id
      : p2Score > p1Score
        ? match.playerTwo.id
        : undefined

  const handleOverride = async () => {
    const result = await updateMatch({
      id: match.id,
      roundId: Number(roundId),
      playerOneScore: p1Score,
      playerTwoScore: p2Score,
      winnerId
    })

    if ('error' in result) {
      show({ title: '⚠️ Error', description: String(result.error) })
      return
    }

    router.back()
  }

  const handleConfirm = async () => {
    const result = await confirmMatch({ id: match.id, roundId: Number(roundId) })

    if ('error' in result) {
      show({ title: '⚠️ Error', description: String(result.error) })
      return
    }

    router.back()
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        title='Match'
        variant='backButton'
      />
      <VStack space='md'>
        <Card>
          <VStack
            className='p-4'
            space='md'
          >
            <HStack className='items-center justify-between'>
              <Text family='body-bold'>{match.playerOne.name}</Text>
              <Text family='body-bold'>vs</Text>
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
          </VStack>
        </Card>

        <Text
          className='uppercase'
          family='body-bold'
        >
          Override scores
        </Text>

        <HStack space='sm'>
          <VStack
            className='flex-1'
            space='xs'
          >
            <Text family='body-regular-italic'>{match.playerOne.name}</Text>
            <Input
              Icon={Hash}
              keyboardType='numeric'
              onChangeText={setScoreOne}
              placeholder={String(match.playerOneScore ?? 0)}
              value={scoreOne}
            />
          </VStack>
          <VStack
            className='flex-1'
            space='xs'
          >
            <Text family='body-regular-italic'>{match.playerTwo.name}</Text>
            <Input
              Icon={Hash}
              keyboardType='numeric'
              onChangeText={setScoreTwo}
              placeholder={String(match.playerTwoScore ?? 0)}
              value={scoreTwo}
            />
          </VStack>
        </HStack>

        <Button
          loading={isUpdating}
          onPress={handleOverride}
          text='Save scores'
          variant='callback'
        />

        {match.status === 'reported' ? (
          <Button
            loading={isConfirming}
            onPress={handleConfirm}
            text='Confirm result'
            variant='callback'
          />
        ) : null}
      </VStack>
    </ScreenContainer>
  )
}

export default MatchScreen
