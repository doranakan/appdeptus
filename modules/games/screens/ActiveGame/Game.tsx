import { type RealtimePostgresUpdatePayload } from '@supabase/supabase-js'
import { LinearGradient } from 'appdeptus/components'
import { VStack } from 'appdeptus/components/ui/vstack'
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
    <VStack className='flex-1'>
      <VStack className='h-full absolute w-full'>
        <Background
          codexOne={game.playerOne.army.codex.name}
          codexTwo={game.playerTwo.army.codex.name}
          opacity={0.8}
        />
        <VStack className='flex-1'>
          <LinearGradient colors={['$secondary800', '$transparent']} />
        </VStack>
        <VStack className='flex-1'>
          <LinearGradient colors={['$transparent', '$secondary800']} />
        </VStack>
      </VStack>
      <VStack className={` pt-${insets.top} pb-${insets.bottom} flex-1 px-4 `}>
        <Header status={status} />

        <VStack className='flex-1 gap-4 justify-end py-4'>
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
