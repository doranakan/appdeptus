import { Pressable } from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
import { type ActiveGame } from 'appdeptus/models/game'
import { router } from 'expo-router'
import { Handshake, RedoDot } from 'lucide-react-native'
import { memo, useCallback } from 'react'
import { useEndGameMutation, useNextTurnMutation } from '../../api'

type NextTurnOrEndGameButtonProps = {
  gameId: ActiveGame['id']
  status: ActiveGame['status']
}

const NextTurnOrEndGameButton = ({
  gameId,
  status
}: NextTurnOrEndGameButtonProps) => {
  const [nextTurnMutation, { isLoading: isLoadingNextTurn }] =
    useNextTurnMutation()
  const [endGameMutation, { isLoading: isEndingGame }] = useEndGameMutation()

  const nextTurn = useCallback(
    async () => await nextTurnMutation({ currentStatus: status, gameId }),
    [gameId, nextTurnMutation, status]
  )

  const endGame = useCallback(async () => {
    const res = await endGameMutation(gameId)
    if ('error' in res) {
      return
    }

    router.replace(`play/endedGame/${gameId}`)
  }, [endGameMutation, gameId])

  return (
    <Pressable onPress={status === 'turn5_p2' ? endGame : nextTurn}>
      <Button
        Icon={status === 'turn5_p2' ? Handshake : RedoDot}
        loading={isEndingGame || isLoadingNextTurn}
        text={
          status === 'turn5_p2'
            ? 'End game'
            : status.endsWith('1')
              ? "Defender's turn"
              : 'Next turn'
        }
      />
    </Pressable>
  )
}

export default memo(NextTurnOrEndGameButton)
