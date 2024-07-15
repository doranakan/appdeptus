import { VStack } from '@gluestack-ui/themed'
import { type RealtimePostgresUpdatePayload } from '@supabase/supabase-js'
import { LinearGradient } from 'appdeptus/components'
import { type ActiveGame } from 'appdeptus/models/game'
import { useCallback, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGameUpdateListener, type RealTimeGame } from '../../api'
import { Armies, Background } from '../../components'
import Button from './Button'
import Header from './Header'
import ScoreBoard from './ScoreBoard'

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
        h='$full'
        position='absolute'
        w='$full'
      >
        <Background
          codexOne={game.playerOne.army.codex.name}
          codexTwo={game.playerTwo.army.codex.name}
          opacity={0.8}
        />
        <VStack flex={1}>
          <LinearGradient colors={['$secondary800', '$transparent']} />
        </VStack>
        <VStack flex={1}>
          <LinearGradient colors={['$transparent', '$secondary800']} />
        </VStack>
      </VStack>

      <VStack
        flex={1}
        pb={insets.bottom}
        px='$4'
        pt={insets.top}
      >
        <Header status={status} />

        <VStack
          flex={1}
          gap='$4'
          justifyContent='flex-end'
          py='$4'
        >
          <VStack>
            <ScoreBoard
              gameId={game.id}
              pOneCP={pOneCP}
              pOneName={game.playerOne.name}
              pOneScore={pOneScore}
              pTwoCP={pTwoCP}
              pTwoName={game.playerTwo.name}
              pTwoScore={pTwoScore}
            />
            <Armies
              armyOne={game.playerOne.army}
              armyTwo={game.playerTwo.army}
            />
          </VStack>

          <Button
            gameId={game.id}
            status={status}
          />
        </VStack>
      </VStack>
    </VStack>
  )
}

export default Game
