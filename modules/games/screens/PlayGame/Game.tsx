import { VStack } from '@gluestack-ui/themed'
import { type RealtimePostgresUpdatePayload } from '@supabase/supabase-js'
import { type ActiveGame } from 'appdeptus/models/game'
import { useCallback, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGameUpdateListener, type RealTimeGame } from '../../api'
import Header from './Header'
import NextButton from './NextButton'

type GameProps = {
  game: ActiveGame
}

const Game = ({ game }: GameProps) => {
  const insets = useSafeAreaInsets()

  const [pOneScore, setPOneScore] = useState(game.playerOne.score)
  const [pTwoScore, setPTwoScore] = useState(game.playerTwo.score)
  const [pOneCP, setPOneCP] = useState(game.playerOne.cp)
  const [pTwoCP, setPTwoCP] = useState(game.playerTwo.cp)
  const [status, setStatus] = useState(game.status)

  const updateGameData = useCallback(
    ({ new: updated, old }: RealtimePostgresUpdatePayload<RealTimeGame>) => {
      if (updated.cp_one !== old.cp_one) {
        setPOneCP(updated.cp_one)
      }
      if (updated.cp_two !== old.cp_two) {
        setPTwoCP(updated.cp_two)
      }
      if (updated.score_one !== old.score_one) {
        setPOneScore(updated.score_one)
      }
      if (updated.score_two !== old.score_two) {
        setPTwoScore(updated.score_two)
      }
      if (updated.status !== old.status) {
        setStatus(updated.status)
      }
    },
    []
  )

  useGameUpdateListener({
    eventHandler: updateGameData,
    gameId: game.id
  })

  return (
    <VStack flex={1}>
      <VStack
        flex={1}
        pb={insets.bottom}
        px='$4'
        pt={insets.top}
      >
        <Header status={status} />

        <VStack
          flex={1}
          justifyContent='flex-end'
          py='$4'
        >
          <NextButton
            gameId={game.id}
            status={status}
          />
        </VStack>
      </VStack>
    </VStack>
  )
}

export default Game
